/**
 * Created by labs-huangf-mac on 23/2/16.
 */

import {ApiEndPoint, ApplicationName} from '../AppConfig';
import {Map} from 'immutable';

import {registeredModels, symbol_modelData, symbol_modelSchemaCfg, symbol_modelInitData, descriptor} from './utils';


export default function injector($resource) {

    function setter(obj, key) {

    }

    class BasicModel {

        constructor(name, data) {
            const immutData = Map(data);
            this[symbol_modelData] = immutData;
            this[symbol_modelInitData] = immutData;
            this.resource = $resource(`${ApiEndPoint}/${name}s/:id`, {id: ''}, {
                'query': {method: 'GET', isArray: false},
                'update': {method: 'PUT', isArray: false}
            });
            this.modelName = name;
            this.store = null;

            return this;
        }

        isDirty() {
            return this[symbol_modelData] === this[symbol_modelInitData];
        }

        get(field) {
            return this[symbol_modelData].get(field);
        }

        set(field, value) {
            const schema = this[symbol_modelSchemaCfg];
            if (schema.has(field)) {
                this[symbol_modelData] = this[symbol_modelData].set(field, value);
            }
            return this;
        }

        setData(data) {
            const schema = this[symbol_modelSchemaCfg];
            Object.keys(data).filter(k=>schema.has(k)).forEach(k=>this.set(k, data[k]));
            return this;
        }

        query(params) {
            return this.resource.query(params || {}).$promise;
        }

        save() {
            const id = this.get('id');
            if (id) {
                return this.resource.update({id: this.get('resourceName')}, this.toJson()).$promise;
            } else {
                return this.resource.save({id: this.get('resourceName')}, this.toJson()).$promise;

            }
        }

        destroy() {
            return this.resource.delete({id: this.get('resourceName')}).$promise;
        }


        toJson() {
            const schema = this[symbol_modelSchemaCfg];
            const data = this[symbol_modelData].toJSON();

            for (let [key,type] of schema.entries()) {
                if (!data.hasOwnProperty(key)) {
                    continue;
                }
                if (typeof type === 'object' && type.relationship === 'hasMany') {
                    const keyInStore = key.replace(/s$/g, '');
                    const val = data[key];
                    data[key] = val.map(v=> this.store.peek(keyInStore, v).toJson())
                }
            }
            return data;
        }

        toString() {
            return this.toJson();
        }

        setSchema(schema) {
            this[symbol_modelSchemaCfg] = Map(schema);
            Object.keys(schema).forEach(k=> {
                const desc = descriptor(schema[k]);
                Object.defineProperty(this, k, desc);
            });

        }


    }

    //BasicModel.prototype.name = 'basic';

    return BasicModel;
}

injector.$inject = ['$resource'];

