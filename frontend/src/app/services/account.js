/**
 * Created by labs-huangf-mac on 23/2/16.
 */

import {log} from '../utils/dev';
import {ApiEndPoint,ServerEndPoint} from '../AppConfig';

class Account {
    /*@ngInject*/
    constructor($http, $state) {
        this.$http = $http;
        this.$state = $state;
    }
}

export default Account;
