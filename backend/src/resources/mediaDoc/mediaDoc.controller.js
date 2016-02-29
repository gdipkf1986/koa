'use strict';

const list = ()=> {
  return [];
};


Object.assign(exports, {
  index: function*(next) {
    this.status = 200;
    this.body = [];
  },
  list: function*(next) {
    this.status = 200;
    this.body = list();
    yield next;
  },
  get: function*(next) {

  },
  post: function*(next) {

  },
  put: function*(next) {

  },
  destroy: function*(next) {

  }
});
