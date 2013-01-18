'use strict';

var specify = require('specify');

/**
 * (\/)(;,,;)(\/) whoopwhoopwhoop.
 */
var zoidberg = require('../zoidberg');

/**
 * Testing data
 */
var obj = { one: 1, two: 2, three: 3, four: 4 }
  , arr = [1, 2, 3, 4];

specify('zoidberg#forEach accepts Arrays', function (assert) {
  zoidberg.forEach(arr, function forEach(item, callback) {
    assert.ok(typeof item === 'number');
    assert.ok(typeof callback === 'function');

    callback();
  }, function (err) {
    assert.ok(!!err);
  });
});

specify('zoidberg#forEach captures sync thrown errors', function (assert) {
  zoidberg.forEach(arr, function forEach(item, callback) {
    throw new Error('throw an error');
  }, function processed(err) {
    assert.ok(err instanceof Error);
    assert.equal(err.message, 'throw an error');
  });
});

specify('zoidberg#forEach captures async thrown errors', function (assert) {
  zoidberg.forEach(arr, function forEach(item, callback) {
    process.nextTick(function async() {
      throw new Error('throw an error');
    });
  }, function processed(err) {
    assert.ok(err instanceof Error);
    assert.equal(err.message, 'throw an error');
  });
});

specify('zoidberg#forEach accepts Objects', function (assert) {
  zoidberg.forEach(obj, function forEach(key, callback) {
    callback();
  }, function (err) {
    assert.ok(!!err);
  });
});

specify.run();
