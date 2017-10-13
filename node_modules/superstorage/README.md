Superstorage
============

Superstorage is a simple storage system to share data between modules

Usage
-----

```js
// myconf.js
let superstorage = require('superstorage');
let store = superstorage('myconf');

// store data
store.set('foo', 'Foo');

// get data
store.get('foo');

// remove data
store.remove('foo');

// check for existance
store.has('foo');
```

Get access in other modules to the stored data

```js
// othermodule.js
let superstorage = require('superstorage');
let store = superstorage('myconf');

store.get('foo'); // returns 'Foo'
```
