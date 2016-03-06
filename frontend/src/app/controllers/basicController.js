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
        $scope.store = store;
        this.methodToScope(['load']);
    }

    init() {

    }

    load(params) {
        return this.store.fetchAll(this.modelName, params);
    }

    methodToScope(methodNames) {
        methodNames.forEach(m=>this.$scope[m] = this[m].bind(this));
    }
}


//injector.$inject = '$scope, store, $state, account'.split(',').map(i=>i.trim());

