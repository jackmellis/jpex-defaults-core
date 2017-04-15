# jpex-defaults
Core factories for Jpex

This package contains a number of injectable factories for *Jpex*.  

## Installation  
Install via npm  
```
npm install jpex-defaults --save
```

## Usage  
Node:  
```javascript
const Jpex = require('jpex');
const defaults = require('jpex-defaults');
Jpex.use(defaults);

// Default factories are now available
const t = Jpex.$resolve('$timeout');
```

Webpack/Browserify:  
```javascript
var Jpex = require('jpex');
var defaults = require('jpex-defaults');
Jpex.use(defaults);
```
or...
```javascript
var Jpex = require('jpex');
var defaults = require('jpex-defaults/dist/jpex-defaults');
Jpex.use(defaults);
```

HTML/Javascript
```html
<script src="node_modules/jpex/dist/jpex.js"></script>
<script src="node_modules/jpex-defaults/dist/jpex-defaults.js"></script>
<script>
// jpex-defaults is automatically registered when imported via script tags
var t = Jpex.$resolve('$timeout');
</script>
```

## API  
### $timeout  
`$timeout(callback, delay)`  
`$timeout` is the equivalent of the `setTimeout` function. The callback function is called after the value of *delay* has passed. The callback function is only called once.  If no `callback` function is provided, `$timeout` will return a promise that will be resolved after the specified timeout.

### $interval
`$interval(callback, delay)`  
`$interval` is the equivalent of the `setInterval` function. `$interval` will be called repeatedly at the interval set by *delay*.  

### $immediate
`$immediate(callback)`
`$immediate` calls the callback function on the next available event loop. This is the equivalent of `setImmediate` in *NodeJs* or `setTimeout(fn, 0)` in a browser. If no `callback` function is provided, `$immediate` will return a promise.

### $log  
`$log(message, [message2, message3...])`  
This is a wrapper for the console functions
```javascript
$log('I am console.log');
```
#### $log.log
```javascript
$log.log('I am also console.log');
```
#### $log.warn
```javascript
$log.warn('I am console.warn');
```
#### $log.error
```javascript
$log.error('I am console.error');
```

### $promise  
`$promise(callback)`  
This wraps up the native `Promise` class, without the need for the `new` keyword. If using $promise in a browser that doesn't support the *Promise* object, a polyfill must be attached to the *window* object. The plugin *jpex-web* (which also includes this package) automatically sets a polyfill if needed.  

Calling $promise will create a new Promise with the provided constructor function.  
The function takes two parameters: resolve and reject.
```javascript
return $promise(function(resolve, reject){
  resolve(123);
});
```

#### $promise.resolve  
Returns a resolved promise.
```javascript
return $promise.resolve(123);
```

#### $promise.reject
Returns a rejected promise.
```javascript
return $promise.reject().catch(...);
```

#### $promise.all
Accepts an array of promises and resolves once all promises have been resolved. If any of the promises is rejected, `$promise.all` will be rejected.
```javascript
$promise.all([$promise(...), $promise.resolve(), 123]);
```

#### $promise.race
Accepts an array of promises and resolves when any of the promises has been resolved. If any of the promises is rejected, `$promise.all` will be rejected.
```javascript
$promise.race([$promise(...), $promise.resolve(), 123]);
```

### $typeof  
`$typeof(any)`  
`$typeof` provides a function that returns the type of any object. The possible return values are:  
- string  
- number  
- boolean  
- function  
- array  
- object  
- date  
- regexp  
- null  
- undefined

```javascript
var t = $typeof(/a/); // 'regexp'
```

### $copy  
`$copy(object)`  
The $copy factory allows you to create a copy any object. It can be used as a function, or as an object which contains shallow and deep copy functions.  
The shallow copy will copy an object but will not create copies of its properties. So if an object has a property `x` which is an object itself, the copied object will have the exact same instance of x.  
```javascript
var obj = { x : [1, 2, 3] };
var shallow = $copy(obj);
```

#### $copy.shallow  
`$copy.shallow(object)`  
```javascript
var obj = { x : [1, 2, 3] };
var shallow = $copy.shallow(obj);
```

#### $copy.deep  
`$copy.deep(object)`  
The deep copy will copy an object and then copy all of that object's properties.  
```javascript
var obj = { x : [1, 2, 3] };
var deep = $copy.deep(obj);
```

#### $copy.extend  
`$copy.extend(target, [obj1, obj2...])`  
The extend method takes any number of arguments and will deep copy the properties of the last arguments onto the first argument. i.e. `$copy.extend(a, b, c)` will copy the properties of `b` onto `a` and then `c` onto `a`. If `b` and `c` have the same property, `c`'s property wins.  
There are a couple of rules to keep in mind:  
If two objects have the same property, and the type of that property is an *object*, its properties will be combined. i.e. if `b.x.foo` is set and `c.x.bah` is set, then `a.x` will get both properties `foo` and `bah`.  
If two objects have the same property, and the type of that property is an *array*, its elements will be overwritten. i.e. if `b.x = [1, 2, 3]` and `c.x = [4, 5]` then `a.x` will be `[4,5]`.  

```javascript
var obj = { x : [1, 2, 3] };
var extended = $copy.extend(0, 1); // 1

extended = $copy.extend({}, obj); // { x : [1,2,3] }

extended = $copy.extend({}, obj, {y : 'why'}); // { x : [1,2,3], y : 'why' }

extended = $copy.extend({}, {x : 'first'}, {x : 'second'}); // { x : 'second' }

extended = $copy.extend({}, {x : [1, 2, 3]}, {x : [4, 5, 6]}); // { x : [1, 2, 3, 4, 5, 6]}
```
