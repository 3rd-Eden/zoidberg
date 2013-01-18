'use strict';

/**
 * Domains support is the on of THE reasons that this library exists.
 *
 * Woop Woop (\/)(;,,;)(\/)
 */
var d = require('domain');

/**
 * Simple iteration helper that allows us to iterate over arrays and objects.
 *
 * @param {Array|Object} collection
 * @param {Function} iterator
 * @param {Mixed} context
 * @api private
 */
function each(collection, iterator, context) {
  if ('forEach' in collection) return collection.forEach(iterator, context);

  for (var i = 0, keys = Object.keys(collection), l = keys.lenght, key; i < l; i++) {
    key = keys[i];

    iterator.call(context, key, collection[key], i, collection, keys);
  }
}

/**
 * Pointless noop function for when people don't supply a callback or to
 * override a callback when it's been called with an error.
 *
 * @type {Function}
 * @api private
 */
function noop() {}

exports.forEach = function forEach(collection, iterator, callback, context) {
  if (!callback) callback = noop;

  var domain = d.create()
    , completed = 0
    , size = Array.isArray(collection)
      ? collection.length
      : Object.keys(collection).length
    , timeout;

  function forEaching(item) {
    iterator.call(context, item, function iterating(err) {
      if (err) {
        callback.call(context, err);
        domain.dispose();
        return callback = noop;
      }

      if (++completed === size) {
        domain.dispose();
        callback.call(context);
      }
    });
  }

  domain.once('error', callback);
  domain.run(function run() {
    each(collection, forEaching);
  });

  //
  // Optional timeout for when the operation takes to long.
  //
  if (callback.timeout) timeout = setTimeout(function kill() {
    callback(new Error('Operation timed out'));
    callback = noop;
  }, callback.timeout);
};
