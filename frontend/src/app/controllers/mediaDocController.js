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


        this.methodToScope(['update', 'uploadFiles']);

    }

    load() {
        super.load(...arguments).then(data=> {
            this.$scope.mediaDocs = data.MediaDoc.map(m=>m.toJson());
        })
    }

    uploadFiles(file, invalidFiles, data) {
        if (file) {

            this.$scope.processing = true;
            let url = `${ApiEndPoint}/mediaDocs/`;
            let method = 'POST';
            if (data) {
                url = `${ApiEndPoint}/mediaDocs/${data.resourceName}`;
                method = 'PUT';
            }
            this.Upload.upload({
                url,
                method,
                data: {file}
            }).then((result)=> {
                if (data) {
                    const newData = result.data.payload[0][0];
                    this.$scope.mediaDocs.forEach(m=> {
                        if (m.resourceName === newData.resourceName) {
                            const inst = this.store.peek('mediaDoc', m.id);
                            inst.setData(newData);
                            Object.assign(m, newData);
                        }
                    })
                } else {
                    result.data.payload[0].forEach(r=> {
                        this.store.create('mediaDoc', r);
                    });
                    this.$scope.mediaDocs = result.data.payload[0].concat(this.$scope.mediaDocs);
                }
                this.$scope.processing = false;


            }, ()=> {
                this.$scope.processing = false;
                alert('Error occur when upload')
            })

        }
    }

    update(proxy) {
        const id = proxy.id;
        const model = this.store.peek('mediaDoc', id);
        this.$scope.processing = proxy;
        model.set('description', proxy.description).save({id}).then(()=> {
            this.$scope.processing = false;
        })
    }

}
