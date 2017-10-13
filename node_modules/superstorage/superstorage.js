'use strict';

if (!global.__superstorage) {
  global.__superstorage = {};
}

let storages = global.__superstorage;

class Superstorage {
  constructor(name) {
    if (!storages[name]) {
      storages[name] = {};
    }

    this.storage = storages[name];
  }

  get(key) {
    return this.storage[key] || null;
  }

  set(key, value) {
    this.storage[key] = value;
  }

  has(key) {
    return this.storage.hasOwnProperty(key);
  }

  inc(key) {
    this.storage[key]++;
  }

  dec(key) {
    this.storage[key]--;
  }

  remove(key) {
    if (this.has(key)) {
      delete this.storage[key];
    }
  }

  destroy() {
    delete storages[this.__name];
  }
}

module.exports = function(name) {
  return new Superstorage(name);
}

module.exports.Superstorage = Superstorage;
