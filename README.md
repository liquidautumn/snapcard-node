SNAPCARD
========

Node.js client library for the [Snapcard API](https://docs.snapcard.io/).

Install
-------

```
npm install snapcard
```

Usage
-----

```javascript
var snapcard = require('snapcard')({
    apiKey: 'a8OLGw7rrzsVjK8soHSnKOjLmqDGCTKW',
    secretKey: 'f7f09FbpEIjzBlRNT2yTfZVmZ0cBqpx0'
});

snapcard('GET', '/account')
    .then(function(data) {
    },
    function(data) {
    });

snapcard('POST', '/transfer', {
    source: 'wallet:2ef8mls9v9ovvqimiv2jmn0d33nf30dt',
    sourceAmount: 0.01,
    sourceCurrency: 'BTC',
    dest: 'email:test@snapcard.io'
})
    .then(successCallback, errorCallback);
```

Ability to override options used by the Request client on both constructor and per invocation:

```javascript
var snapcard = require('snapcard')({
    apiKey: 'a8OLGw7rrzsVjK8soHSnKOjLmqDGCTKW',
    secretKey: 'f7f09FbpEIjzBlRNT2yTfZVmZ0cBpqx0',
    options: {
        timeout: 1500
    }
});
```

```javascript
snapcard('GET', '/rates', {}, {
    timeout: 1500
})
    .then(successCallback, errorCallback);
```
