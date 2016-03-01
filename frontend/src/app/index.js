/**
 * Created by labs-huangf-mac on 23/2/16.
 */
import angular from 'angular';
import {log} from './utils/dev';

import {ApplicationName} from './AppConfig'
import application from './application';

angular.element(document).ready(function () {

    angular.bootstrap(document, [ApplicationName]);
    log(ApplicationName + ' launched');
});

export default application;
