/**
 * Created by labs-huangf-mac on 23/2/16.
 */

import {log} from '../utils/dev';
import {ApiEndPoint} from '../AppConfig';

class Account {
    constructor($http) {
        this.$http = $http;
        this.lastAuth = null
    }

    refreshAuth() {
        return Promise.resolve({success: true});

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
