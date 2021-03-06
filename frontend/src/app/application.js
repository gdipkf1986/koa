import angular from 'angular';
import router from 'angular-ui-router';
import stateHelper from 'angular-ui-router.statehelper'
import ngResource from 'angular-resource';
import ngTagsInput from 'ng-tags-input';
import ngFileUpload from 'ng-file-upload';
import contenteditable from 'angular-contenteditable';
import ngAnimate from 'angular-animate';
import ngBootstrap from 'angular-ui-bootstrap';

import {log} from './utils/dev';
import register from './utils/register';
import {ApplicationName} from './AppConfig';


log('defining ', ApplicationName);
const application = angular
    .module(ApplicationName, [router, 'ui.router.stateHelper', 'ngResource', 'ngTagsInput', 'ngFileUpload', 'contenteditable', 'ngAnimate', 'ui.bootstrap'])
    .run(['$rootScope', '$urlRouter', ($rootScope, $urlRouter)=> {

        log(ApplicationName + ' running');

        $rootScope.$on('$stateChangeError', ()=> {
            throw "state changed error";
        });

        $rootScope.$on('$stateChange', () => {
            throw "state changed";
        });

        $rootScope.$on('$stateChangeSuccess', (evt, toState, toParams, fromState, fromParams)=> {
            $rootScope.$stateParams = toParams;
        });

        $rootScope.$on('$stateChangeStart', (evt, to, params) => {
            if (to.redirectTo) {
                evt.preventDefault();
                $state.go(to.redirectTo, params)
            }
        });
    }]);

application
    .config([
        '$stateProvider', '$urlRouterProvider', '$locationProvider', 'stateHelperProvider'
        , ($stateProvider, $urlRouterProvider, $locationProvider, stateHelperProvider) => {

            let html5_mode = true;
            $locationProvider.html5Mode(html5_mode);
            log(`start config routes in ${ApplicationName} `);


            const templateUrl = (state)=> {
                let [module, model, action] = state.split('.');
                return function ($stateParams, $location) {
                    let action_map = {
                        'article_add': 'edit'
                    };
                    let mapper = action_map[$stateParams.model + '_' + action];
                    if (mapper) {
                        action = mapper;
                    }
                    log(`loading template /${model}.${action}.html`);
                    return `/${model}.${action}.html`;
                }
            };

            const controllerGetter = (state)=> {
                let [module, model, action] = state.split('.');
                return `${model}Controller`;
            };

            stateHelperProvider

                .state({
                    name: 'root'
                    , url: '/v1/views'
                    , template: '<ui-view/>'
                    , children: [{
                        name: 'mediaDocs'
                        , url: '/mediaDocs'
                        , template: '<ui-view/>'
                        , children: [{
                            name: 'list'
                            , url: '/'
                            , controller: 'MediaDocController'
                            , templateUrl: templateUrl('resource.mediaDocs.list')
                        }, {
                            name: 'detail'
                            , url: '/:resourceName'
                            , controller: 'MediaDocController'
                            , templateUrl: templateUrl('resource.mediaDocs.detail')
                        }, {
                            name: 'versions'
                            , url: '/:resourceName/versions'
                            , controller: 'MediaDocController'
                            , templateUrl: templateUrl('resource.mediaDocs.versions')
                        }]
                    }, {
                        name: 'comingSoon'
                        , url: '/comingSoon'
                        , template: '<div class="alert alert-warning">This feature is not release to public yet</div>'
                    }]
                });

            $urlRouterProvider
                .rule(($injector, $location)=> {
                    let path = $location.url();

                    // check to see if the path already has a slash where it should be
                    if (path[path.length - 1] === '/' || path.indexOf('/?') > -1) {
                        return;
                    }

                    if (path.indexOf('?') > -1) {
                        return path.replace('?', '/?');
                    }

                    return path + '/';
                }).otherwise('/v1/views/mediaDocs/');


        }
    ])
    .config(['$resourceProvider', '$httpProvider', ($resourceProvider, $httpProvider)=> {
        $resourceProvider.defaults.stripTrailingSlashes = false;
        const interceptor = ($q)=> {
            return {
                'request': (config)=> {
                    if (config.url.indexOf('/cms/v1/api') > -1) {
                        log('requesting:', config.url, config);
                    }
                    return config;
                },

                'response': (response)=> {
                    if (response.config.url.indexOf('/cms/v1/api') > -1) {
                        log('response from :', response.config.url, response);
                    }
                    return response;
                },

                'responseError': (rejection)=> {
                    // called if HTTP CODE != 2xx
                    log('errorResponse:', rejection);
                    return $q.reject(rejection);
                }
            };
        };
        interceptor.$inject = ['$q'];

        $httpProvider.defaults.withCredentials = true;
        delete $httpProvider.defaults.headers.common["X-Requested-With"];

        $httpProvider.interceptors.push(interceptor);
    }])
;
log('defined ', ApplicationName);

import store from './services/store'
import account from './services/account'

import BasicController from './controllers/basicController';
import MediaDocController from './controllers/mediaDocController';

import BasicModel from './models/basicModel';
import MediaDocModel from './models/mediaDocModel';
import UserModel from './models/userModel';


register().service('store', store);
register().service('account', account);

register().controller('BasicController', BasicController);
register().controller('MediaDocController', MediaDocController);

register().factory('BasicModel', BasicModel);
register().factory('MediaDocModel', MediaDocModel);
register().factory('UserModel', UserModel);


export default application;
