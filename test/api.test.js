describe('zoidberg', function () {
  'use strict';

  /**
   * Assertations.
   */
  var chai = require('chai')
    , expect = chai.expect;

  chai.Assertion.includeStack = true;

  /**
   * whoopwhoopwhoop.
   */
  var zoidberg = require('../zoidberg');

  describe('#forEach', function () {
    var obj = { one: 1, two: 2, three: 3, four: 4 }
      , arr = [1, 2, 3, 4];

    it('accepts Arrays', function (done) {
      zoidberg.forEach(arr, function forEach(item, callback) {
        expect(item).to.be.a('number');
        expect(callback).to.be.a('function');

        callback();
      }, done);
    });

    it('captures sync thrown errors', function (done) {
      zoidberg.forEach(arr, function forEach(item, callback) {
        throw new Error('throw an error');
      }, function processed(err) {
        expect(err).to.be.a('error');
        expect(err.message).to.equal('throw an error');

        done();
      });
    });

    it('captures async thrown errors', function (done) {
      zoidberg.forEach(arr, function forEach(item, callback) {
        process.nextTick(function () {
          throw new Error('throw an error');
        });
      }, function processed(err) {
        expect(err).to.be.a('error');
        expect(err.message).to.equal('throw an error');

        done();
      });
    });

    it('accepts Objects', function (done) {
      zoidberg.forEach(obj, function forEach(key, callback) {
        callback();
      }, done);
    });
  });
});
