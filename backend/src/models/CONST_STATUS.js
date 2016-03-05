/**
 * Created by jovi on 3/2/16.
 */
const STATUS = {
    MEDIADOC: {
        underReview: 0,
        active: 1,
        destroyed: 2
    },
    USER: {
        active: 0,
        inactive: 1
    }

};
module.exports = STATUS;

const VALUES = {};
Object.keys(STATUS).forEach(m=> {
    VALUES[m] = Object.keys(STATUS[m]).map(k=>STATUS[m][k]);
});
module.exports.values = VALUES;
