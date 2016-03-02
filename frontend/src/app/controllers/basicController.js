/**
 * Created by labs-huangf-mac on 23/2/16.
 */
import {log} from '../utils/dev';


export default class BasicController {
    /*@ngInject*/
    constructor($scope, store, $state, account) {
        this.$scope = $scope;
        this.store = store;
        this.$state = $state;
        this.account = account;
        this.auth();
        $scope.store = store;
        this.methodToScope(['load']);
    }

    auth() {
        this.account.refreshAuth();
    }

    init() {

    }

    load() {
        return this.store.fetchAll(this.modelName);
    }

    methodToScope(methodNames) {
        methodNames.forEach(m=>this.$scope[m] = this[m].bind(this));
    }
}


//injector.$inject = '$scope, store, $state, account'.split(',').map(i=>i.trim());

