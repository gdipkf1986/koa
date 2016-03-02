/**
 * Created by labs-huangf-mac on 22/2/16.
 */
import {log} from '../utils/dev';
import BasicController from './basicController';
import {ApiEndPoint} from '../AppConfig';

export default class MediaDocController extends BasicController {
    /*@ngInject*/
    constructor($scope, store, $state, account, Upload) {
        super(...arguments);

        this.processing = false;
        this.modelName = 'mediaDoc';
        this.Upload = Upload;

        this.load();


        this.methodToScope(['active', 'update', 'uploadFiles']);

    }

    active(id) {

    }

    load() {
        super.load(...arguments).then(data=> {
            this.$scope.mediaDocs = data.MediaDoc.map(m=>m.toJson());
        })
    }

    uploadFiles(file, invalidFiles, data) {
        if (file) {
            let url = `${ApiEndPoint}/mediaDocs/`;
            let method = 'POST';
            if (data) {
                url = `${ApiEndPoint}/mediaDocs/${data.id}`
            }
            this.Upload.upload({
                url,
                method: method,
                data: {file: file}
            }).then((result)=> {
                debugger;
            }, ()=> {
                alert('Error occur when upload')
            })

        }
    }

    update(mediaDoc) {
        console.log(mediaDoc.id);
    }

}
