/**
 * Created by labs-huangf-mac on 23/2/16.
 */

import {ApiEndPoint} from '../AppConfig';
import Immutable from 'immutable';
import {DataType} from './utils';

export default function injector(BasicModel, UserModel) {

    class MediaDocModel extends BasicModel {

        constructor(data) {
            super('mediaDoc', data);
            this.setSchema({
                resourceName: 'string',
                description: 'string',
                accessUrl: 'string',
                status: 'integer',
                version: 'integer',
                originalFileName: 'string',
                users: DataType.hasMany('user'),
                fileSize: 'integer',
                id: DataType.readonly('integer')
            });
        }
    }
    return MediaDocModel;
}

injector.$inject = ['BasicModel', 'UserModel'];

