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
        return this.$http({url: `${ServerEndPoint}/auth`}).then((response)=> {
            this.config = response.data.payload.config;
        }, ()=> {
            console.error('login failed');
        });

        //if (!this.lastAuth) {
        //    return this.$http({url: `${ApiEndPoint}/auth`}).then(()=> {
        //    }, ()=> {
        //        document.location = '/login-in';
        //    })
        //} else {
        //    return Promise.resolve({success: true});
        //}
    }
}

Account.$inject = ['$http'];

export default Account
