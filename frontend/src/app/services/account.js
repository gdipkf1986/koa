/**
 * Created by labs-huangf-mac on 23/2/16.
 */

import {log} from '../utils/dev';
import {ServerEndPoint} from '../AppConfig';

class Account {
    constructor($http) {
        this.$http = $http;
        this.lastAuth = null
    }

    refreshAuth() {
        if (this.token) {
            return Promise.resolve(true);
        }
        return this.$http({url: `${ServerEndPoint}/auth`}).then((response)=> {
            this.config = response.data.payload.config;
            this.token = response.data.payload.token;
            return true;
        }, ()=> {
            console.error('login failed');
            //document.location = `${ServerEndPoint}/connect/google`;
        });

    }
}

Account.$inject = ['$http'];

export default Account
