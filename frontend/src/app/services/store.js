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

        create(modelName, modelData) {
            const modelCls = NameToModel[modelName];
            const model = new modelCls(modelData);
            model.store = this; //todo: get rid of this, store should auto inject into model instance
            return model;
        }

        save(instance) {

        }

        peek(modelName, id) {
            if (!this._cache._data.hasOwnProperty(modelName)) {
                return null;
            }
            const c = this._cache._data[modelName];
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
                .query()
                .then(data=> {
                    const keys = Object.keys(data.payload);
                    keys.forEach(k=> {
                        const c = this._cache._data;
                        data.payload[k] = data.payload[k].map(modelData=> {
                            const id = modelData['id'];
                            const model = this.create(modelName, modelData);
                            if (!c[k]) {
                                c[k] = {};
                            }
                            c[k][id] = model;
                            return model;
                        })
                    });
                    return data.payload;
                });
        }

        destroy(instance) {

        }

        unload(instance) {

        }
    }

    const store = new Store();
    return store;
}

injector.$inject = ['MediaDocModel', 'UserModel'];


export default injector
