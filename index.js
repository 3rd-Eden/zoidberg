'use strict';

var zoidberg = require('./zoidberg')(exports);

zoidberg('each', 'forEach')
  .replace('{name}', 'each')
  .replace('{run}', 'each')
  .replace('{iterator}', function iterator(obj) {

  })({ /* option */ });
