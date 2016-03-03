/**
 * Created by labs-huangf-mac on 23/2/16.
 */

import register from '../utils/register';
import {log} from '../utils/dev';
import {ApiEndPoint} from '../AppConfig';

function injector(MediaDocModel, UserModel) {

    const NameToModel = {
        'mediaDoc': MediaDocModel,
        'user': UserModel
    };

    class Store {
        constructor() {
            this._cache = {
                '_models': {},
                '_data': {}
            };
        }

        addToCache(inst) {
            const modelName = inst.modelName;
            if (!this._cache._data.hasOwnProperty(modelName)) {
                this._cache._data[modelName] = {};
            }
            const id = inst.id || (inst.get && inst.get('id'));
            if (id) {
                this._cache._data[modelName][id] = inst;
            }
            return this;
        }

        create(modelName, modelData) {
            const modelCls = NameToModel[modelName];
            const model = new modelCls(modelData);
            model.store = this; //todo: get rid of this, store should auto inject into model instance
            this.addToCache(model);
            return model;
        }

        save(instance) {

        }

        peek(modelName, id) {
            if (!this._cache._data.hasOwnProperty(modelName)) {
                return null;
            }
            const c = this._cache._data[modelName];
            if (typeof id === 'function') {
                return id(c);
            }
            return c[id];
        }

        fetch(modelName, params) {

        }

        fetchAll(modelName, params) {
            const modelCls = NameToModel[modelName];
            if (!modelCls) {
                throw `${modelName} is not existing`;
            }
            return new modelCls()
                .query(params || {})
                .then(data=> {
                    const keys = Object.keys(data.payload);
                    keys.forEach(k=> {
                        data.payload[k] = data.payload[k].map(modelData=> {
                            const id = modelData['id'];
                            return this.create(modelName, modelData);
                        })
                    });
                    return data.payload;
                });
        }

        destroy(instance) {

        }

        unload(instance) {
            const modelName = instance.modelName;
            if (!this._cache._data.hasOwnProperty(modelName)) {
                return;
            }
            const c = this._cache._data[modelName];
            Object.keys(c).filter(id=>c[id] === instance).forEach(id=>delete c[id]);


        }
    }

    const store = new Store();
    return store;
}

injector.$inject = ['MediaDocModel', 'UserModel'];


export default injector
