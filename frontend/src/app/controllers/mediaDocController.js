/**
 * Created by labs-huangf-mac on 22/2/16.
 */
import {log} from '../utils/dev';
import BasicController from './basicController'

export default class AppController extends BasicController {
    constructor($scope) {
        super(...arguments);

        this.processing = false;
        this.modelName = 'mediaDoc';

        this.load();

        this.methodToScope(['active', 'update']);

    }

    active(id) {
        //const app = this.store.peek('app', id);
        //if (app.users) {
        //    app.bindUsers = app.users.map(uid=>this.store.peek('user', uid.id || uid));
        //}
        //this.$scope.app = app;
    }

    load() {
        super.load(...arguments).then(data=> {
            this.$scope.mediaDocs = data.MediaDoc.map(m=>m.toJson());
        })
    }

    update(appId) {
        const app = this.$scope.app;
        this.store.save(app).then(()=> {
            log('app saved')
        }, ()=> {
            log('app saving failed')
        });
    }

}






