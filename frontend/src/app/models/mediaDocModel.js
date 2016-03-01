/**
 * Created by labs-huangf-mac on 23/2/16.
 */

import {ApiEndPoint} from '../AppConfig';
import Immutable from 'immutable';
import {DataType} from './utils'

export default function injector(BasicModel, UserModel) {

    class MediaDocModel extends BasicModel {

        constructor(data) {
            super('mediaDoc', data);
            this.setSchema({
                id: DataType.readonly('number'),
                originalFileName: 'string',
                users: DataType.hasMany('user'),
                fileSize: 'integer'
            })
        }
    }
    return MediaDocModel;
}

injector.$inject = ['BasicModel', 'UserModel'];

