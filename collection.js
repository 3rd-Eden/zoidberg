'use strict';

/**
 * Get an accurate type check for the given Object.
 *
 * @param {Mixed} obj The object that needs to be detected.
 * @returns {String} The object type.
 * @api private
 */
function type(obj) {
  return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
}

/**
 * Simple iteration helper that allows us to iterate over arrays and objects.
 *
 * @param {Array|Object} collection The collection we need to iterate over.
 * @param {Function} iterator The function that is called for each item.
 * @param {Mixed} context The context/this of the iterator.
 * @api private
 */
function each(collection, iterator, context) {
  if ('function' === typeof collection) {
    return collection.forEach(iterator, context);
  }

  var keys = Object.keys(collection)
    , length = keys.length
    , i = 0
    , key;

  for (; i < length; key = keys[++i]) {
    iterator.call(context, key, collection[key], i, collection, keys);
  }
}

/**
 * Checks if the given object is empty. The only edge case here would be
 * objects. Most object's have a `length` attribute that indicate if there's
 * anything inside the object.
 *
 * @param {Mixed} collection The collection that needs to be checked.
 * @returns {Boolean}
 * @api private
 */
function empty(obj) {
  if (!obj) return false;
  return size(obj) === 0;
}

/**
 * Determine the size of a collection.
 *
 * @param {Mixed} collection The object we want to know the size of.
 * @returns {Number} The size of the collection.
 * @api private
 */
function size(collection) {
  var x, i = 0;

  if ('object' === type(collection)) {
    for (x in collection) i++;
    return i;
  }

  return +collection.length || i;
}

//
// Expose the collection utilities.
//
exports.empty = empty;
exports.size = size;
exports.type = type;
exports.each = each;
