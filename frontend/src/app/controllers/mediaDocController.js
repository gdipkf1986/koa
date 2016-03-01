/**
 * Created by labs-huangf-mac on 22/2/16.
 */
import {log} from '../utils/dev';
import BasicController from './basicController'

export default class MediaDocController extends BasicController {
    constructor($scope) {
        super(...arguments);

        this.processing = false;
        this.modelName = 'mediaDoc';

        this.load();

        this.methodToScope(['active', 'update', 'uploadNew']);

    }

    active(id) {

    }

    load() {
        super.load(...arguments).then(data=> {
            this.$scope.mediaDocs = data.MediaDoc.map(m=>m.toJson());
        })
    }

    uploadNew() {

    }

    update(mediaDoc) {
        console.log(mediaDoc.id);
    }

}






