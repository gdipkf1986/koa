/**
 * Created by labs-huangf-mac on 23/2/16.
 */

import {ApiEndPoint} from '../AppConfig';
import Immutable from 'immutable';

export default function injector(BasicModel) {

    class UserModel extends BasicModel {
        constructor(data) {
            super('user', data);
        }
    }

    //UserModel.prototype.name = 'user';

    return UserModel;
}

injector.$inject = ['BasicModel'];

