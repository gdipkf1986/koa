/**
 * Created by labs-huangf-mac on 23/2/16.
 */

import {log} from '../utils/dev';
import {ServerEndPoint} from '../AppConfig';

class Account {
    /*@ngInject*/
    constructor($http, $state) {
        this.$http = $http;
        this.$state = $state;
    }

    refreshAuth() {
        if (!this.token) {
            return this.$http({url: `${ServerEndPoint}/auth`, method: 'POST'}).then((response)=> {
                this.config = response.data.payload.config;
                this.token = response.data.payload.token;
                return true;
            }, ()=> {
                console.error('login failed');
                document.location = '/login.html';
                //document.location = `${ServerEndPoint}/connect/google`;
            });
        } else {
            return Promise.resolve(true);
        }


    }


}


export default Account
