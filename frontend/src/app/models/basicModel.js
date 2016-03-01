/**
 * Created by labs-huangf-mac on 23/2/16.
 */

import {ApiEndPoint, ApplicationName} from '../AppConfig';
import {Map} from 'immutable';

import {registeredModels, symbol_modelData, symbol_modelSchemaCfg, descriptor} from './utils';


export default function injector($resource) {

    class BasicModel {

        constructor(name, data) {
            this[symbol_modelData] = Map(data);
            this.resource = $resource(`${ApiEndPoint}/${name}s/:id`, {id: '@id'}, {
                'query': {method: 'GET', isArray: false}
            });

            this.store = null;

            return this;
        }


        query() {
            return this.resource.query().$promise;
        }


        toJson() {
            const schema = this[symbol_modelSchemaCfg];
            const json = this[symbol_modelData].toJSON();

            for (let [key,type] of schema.entries()) {
                if (!json.hasOwnProperty(key)) {
                    continue;
                }
                if (typeof type === 'object' && type.relationship === 'hasMany') {
                    const keyInStore = key.replace(/s$/g, '');
                    const val = json[key];
                    json[key] = val.map(v=> this.store.peek(keyInStore, v).toJson())
                }
            }
            return json;
        }

        toString() {
            return this.toJson();
        }

        setSchema(schema) {
            this[symbol_modelSchemaCfg] = Map(schema);
            Object.keys(schema).forEach(k=> {
                Object.defineProperty(this, k, descriptor(schema[k]));
            });

        }


    }

    //BasicModel.prototype.name = 'basic';

    return BasicModel;
}

injector.$inject = ['$resource'];

