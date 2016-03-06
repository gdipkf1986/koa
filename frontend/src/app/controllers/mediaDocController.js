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

        const stateName = $state.current.name;
        this.methodToScope(['update', 'uploadFiles', 'delete', 'getHints']);
        if (stateName === 'root.mediaDocs.list') {
            this.load();
        } else if (stateName === 'root.mediaDocs.versions') {
            this.loadVersions($state.params.resourceName);
        }

    }

    load(params) {
        this.processing = true;
        return super.load(params).then(data=> {
            this.processing = false;
            this.$scope.mediaDocs = data.MediaDoc.map(m=>m.toJson());
            return this.$scope.mediaDocs;
        });
    }

    loadVersions(resourceName) {
        this.processing = true;
        this.$scope.mediaDocs = [];
        this.store.fetchAll('mediaDoc', {resourceName: resourceName, version: -1}).then(data=> {
            this.processing = false;
            this.$scope.mediaDocs = data.MediaDoc.map(m=>m.toJson());
            return this.$scope.mediaDocs;
        });
    }

    uploadFiles(files, invalidFiles, data, replace = true) {
        if (!files || !files.length) {
            return;
        }
        const validFiles = [];
        const allowedMime = ['image', 'audio', 'video'];
        for (let i = 0; i < files.length; i++) {
            let file = files[i];
            if (!file.type) {
                console.log(`could not access ${file.name} mime info`);
                continue;
            }
            const fileMime = file.type.toLowerCase().replace(/\/.+$/g, '');
            if (allowedMime.indexOf(fileMime) > -1) {
                validFiles.push(file);
            }
        }

        if (validFiles.length < 1) {
            alert(`no valid file`);
            return;
        } else if (validFiles.length != files.length && !confirm('Some of your files are not valid, do you wanna continue as ignore them?')) {
            return;
        }
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
            data: {validFiles}
        }).then((result)=> {
            if (data) {
                const newData = result.data.payload[0][0];
                if (replace) {
                    this.$scope.mediaDocs.forEach(m=> {
                        if (m.resourceName === newData.resourceName) {
                            const inst = this.store.peek('mediaDoc', m.id);
                            //inst.setData(newData);
                            this.store.unload(inst);
                            this.store.create('mediaDoc', newData);
                            Object.assign(m, newData);
                        }
                    });
                } else {
                    this.store.create('mediaDoc', newData);
                    this.$scope.mediaDocs.push(newData);
                }

            } else {
                result.data.payload[0].forEach(r=> {
                    this.store.create('mediaDoc', r);
                });
                this.$scope.mediaDocs = result.data.payload[0].concat(this.$scope.mediaDocs);
            }
            this.$scope.processing = false;

        }, ()=> {
            this.$scope.processing = false;
            alert('Error occur when upload');
        });

    }

    update(proxy) {
        const id = proxy.id;
        const model = this.store.peek('mediaDoc', id);
        if (model.get('description') === proxy.description) {
            return;
        }
        this.$scope.processing = proxy;
        model.set('description', proxy.description).save().then(()=> {
            this.$scope.processing = false;
        });
    }

    delete(proxy) {
        if (!confirm(`Are you sure to delete ${proxy.resourceName}`)) {
            return;
        }
        const id = proxy.id;
        const model = this.store.peek('mediaDoc', id);
        this.$scope.processing = proxy;
        model.destroy().then(()=> {
            this.$scope.processing = false;
            this.$scope.mediaDocs = this.$scope.mediaDocs.filter(m=>m.id !== id);
            this.store.unload(model);
        }, (response)=> {
            this.$scope.processing = false;
            alert(response.data);
        });
    }

    getHints(val) {
        return this.store.fetchAll('mediaDoc', {filename: val}).then(data=> {
            const data1 = data.MediaDoc.map(m=>m.toJson());
            log(data1);
            return data1;
        });
    }

}
