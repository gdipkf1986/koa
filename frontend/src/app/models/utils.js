/**
 * Created by labs-huangf-mac on 25/2/16.
 */

export const symbol_modelData = Symbol('data');
export const symbol_modelInitData = Symbol('initData');
export const symbol_modelSchemaCfg = Symbol('schema');

export const registeredModels = {'mediaDoc': true, 'user': true};

export const DataType = {

    hasMany(modelCls) {
        return {relationship: 'hasMany', target: modelCls}
    },

    readonly(type){
        return {readonly: true}
    }
};


export function descriptor(type) {
    const t = typeof type;
    if (t === 'string') {
        return {}
    } else if (t === 'object') {
        if (type.readonly) {
            return {
                writeable: false
            }
        }
        return {}
    }
    return {}
}
