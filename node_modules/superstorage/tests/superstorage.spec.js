'use strict';

let inspect = require('inspect.js');
let superstorage = require('../superstorage');

describe('Superstorage', function() {
  describe('Instance', function() {
    it('Should return a Superstorage instance', function() {
      inspect(superstorage('test')).isInstanceOf(superstorage.Superstorage);
    });

    it('Has a get() method', function() {
      inspect(superstorage('test').get).isFunction();
    });

    it('Has a set() method', function() {
      inspect(superstorage('test').set).isFunction();
    });

    it('Has a rem()ove method', function() {
      inspect(superstorage('test').remove).isFunction();
    });

    it('Has a has() method', function() {
      inspect(superstorage('test').has).isFunction();
    });

    it('Has a destroy() method', function() {
      inspect(superstorage('test').destroy).isFunction();
    });
  });

  describe('set()', function() {
    it('Should set data into a storage', function() {
      let storage = superstorage('superstorage-test');
      storage.set('foo', 'Foo');

      inspect(storage.storage).isEql({
        foo: 'Foo'
      });
    });
  });

  describe('get()', function() {
    it('Should get data from a storage', function() {
      let storage = superstorage('superstorage-test');
      inspect(storage.get('foo')).isEql('Foo');
    });

    it('Should get data from a not existing key', function() {
      let storage = superstorage('superstorage-test');
      inspect(storage.get('bar')).isNull();
    });
  });

  describe('has()', function() {
    it('Should has data from a storage', function() {
      let storage = superstorage('superstorage-test');
      inspect(storage.has('foo')).isTrue();
      inspect(storage.has('bar')).isFalse();
    });
  });

  describe('inc()', function() {
    it('Should increment data from a storage', function() {
      let storage = superstorage('superstorage-test');
      storage.set('cnt', 0);
      storage.inc('cnt');
      inspect(storage.get('cnt')).isEql(1);
    });
  });

  describe('dec()', function() {
    it('Should decrement data from a storage', function() {
      let storage = superstorage('superstorage-test');
      storage.set('cnt', 0);
      storage.dec('cnt');
      inspect(storage.get('cnt')).isEql(-1);
    });
  });

  describe('remove()', function() {
    it('Should remove data into a storage', function() {
      let storage = superstorage('superstorage-test');
      storage.remove('foo');
      storage.remove('cnt');
      inspect(storage.storage).isEql({});
    });
  });
});
