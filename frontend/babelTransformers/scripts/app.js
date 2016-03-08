/**
 * Created by labs-huangf-mac on 8/3/16.
 */

import features from './features';

export default function () {
    if (features('f2')) {
        console.log('yes f2 1');
        console.log('yes f2 2')
    } else {
        console.log('no f2 1');
        console.log('no f2 2');
    }
    if (!features('f1')) {
        console.log('no f1 1');
        console.log('no f1 2')
    } else {
        console.log('yes f1 1');
        console.log('yes f1 2');
    }
    console.log('hello world');
}
