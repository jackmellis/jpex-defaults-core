import test from 'ava-spec';
import Sinon from 'sinon';
import jpex from 'jpex';
import defaults from '../src';

test.beforeEach(function (t) {
  let sinon = Sinon.sandbox.create();
  let Jpex = jpex.extend();
  Jpex.use(defaults);
  let $typeof = Jpex.$resolve('$typeof');
  t.context = {Jpex, $typeof, sinon};
});
test.afterEach(function (t) {
  t.context.sinon.restore();
});


test('should return the type of a primitive', function (t) {
  let {$typeof} = t.context;

  var arr = [
    [123, 'number'],
    ['str', 'string'],
    [true, 'boolean'],
    [function(){}, 'function'],
    [() => {}, 'function'],
    [/abcdefg/ig, 'regexp'],
    [new Date(), 'date']
  ];

  arr.forEach(function (el) {
    t.is($typeof(el[0]), el[1]);
  });
});
test('should return the type of an array', function (t) {
  let {$typeof} = t.context;

  var arr = [
    [],
    new Array(4)
  ];

  arr.forEach(function (el) {
    t.is($typeof(el), 'array');
  });
});
test('should return the type of an object', function (t) {
  let {$typeof} = t.context;

  t.is($typeof({}), 'object');
});
test('should return the type of a constructed primitive', function (t) {
  let {$typeof} = t.context;

  var arr = [
    [new Number(123), 'number'],
    [new String('str'), 'string'],
    [new Boolean(true), 'boolean'],
    [new RegExp('abcdef'), 'regexp'],
  ];

  arr.forEach(function (el) {
    t.is($typeof(el[0]), el[1]);
  });
});
test('should return object for classes', function (t) {
  let {$typeof} = t.context;

  var arr = [
    Math,
    JSON,
    new ReferenceError()
  ];

  arr.forEach(function (el, i) {

    t.is($typeof(el), 'object');
  });
});
test('should return the type of a class (Math/JSON/Error)', function (t) {
  let {$typeof} = t.context;
  
  var arr = [
    [Math, 'math'],
    [JSON, 'json'],
    [new ReferenceError(), 'error']
  ];

  arr.forEach(function (el) {
    t.is($typeof(el[0], true), el[1]);
  });
});
