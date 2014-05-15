'use strict';

var c = require('./collection')
  , d = require('domain');

//
// Pointless nope function for when people don't supply a callback or to
// override a callback when it's been called with an error.
//
function nope() {}

/**
 * Iterate over the given collection.
 *
 * @param {Array|Object} collection The collection we iterate over.
 * @param {Function} iterator The function that is called for every item.
 * @param {Function} callback Completion callback.
 * @param {Mixed} context The context/this of the iterator.
 * @api public
 */
function forEach(collection, iterator, callback, context) {
  if (!callback) callback = nope;

  var size = c.size(collection)
    , domain = d.create()
    , completed = 0
    , timeout;

  function error(err) {
    domain.dispose();
    callback.call(context, err);
    callback = nope;
    if (timeout) clearTimeout(timeout);
  }

  function forEaching(item) {
    iterator.call(context, item, function iterating(err) {
      if (err) return error(err);

      if (++completed === size) {
        domain.dispose();
        callback.call(context);
        callback = nope;
        if (timeout) clearTimeout(timeout);
      }
    });
  }

  domain.once('error', error);
  domain.run(function run() {
    c.each(collection, forEaching);
  });

  //
  // Optional timeout for when the operation takes to long.
  //
  if (callback.timeout) timeout = setTimeout(function kill() {
    callback(new Error('Operation timed out'));
    callback = nope;
  }, callback.timeout);
}
