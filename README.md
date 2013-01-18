# Flow control? Why not zoidberg?

### Module status: Work in progress

First of all, fuck yea, this module name wasn't taken, (\/)(;,,;)(\/) whoop
whoop whoop.

What zoidberg makes special is that is everything is run inside a domain. This
ensures that the callback is ALWAYS called even when the iterators throw a
function. No more worries, fucking awesome yo.

Also, a flow control library is something you should have build once in your
Node.js career.

### API

```js
var zoidberg = require('zoidberg');

// iterate over an array
zoidberg.forEach(arrayish, function forEach(item, callback) {
  callback(new Error('Foo Bar'));
}, function done(err) {
  // Error...
});

function done(err) {
  console.log(err.message); // Operation timed out
}

// if the callback is not fired in x then it will return with an error
done.timeout = 987429;

// iterate over an array with timeout
zoidberg.forEach(arrayish, function forEach(item, callback) {
  callback(new Error('Foo Bar'));
}, done);
```

### LICENSE

MIT
