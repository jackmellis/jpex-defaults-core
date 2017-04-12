import test from 'ava-spec';
import jpex from 'jpex';
import defaults from '../src';

test.beforeEach(function (t) {
  let Jpex = jpex.extend();
  Jpex.use(defaults);
  let $copy = Jpex.$resolve('$copy');
  t.context = {Jpex, $copy};
});

test('should copy a primitive', function (t) {
  let {$copy} = t.context;
  t.is($copy('abcd'), 'abcd');
});
test('should copy a date', function (t) {
  let {$copy} = t.context;

  var d = new Date();
  var d2 = $copy(d);

  t.not(d, d2);
  t.true(d2 instanceof Date);
  t.is(d.toString(), d2.toString());
});
test('should copy a regular expression', function (t) {
  let {$copy} = t.context;

  var r = /abd/g;
  var r2 = $copy(r);

  t.not(r, r2);
  t.deepEqual(r, r2);
  t.true(r2.global);
  t.not(r2.ignoreCase, true);
});
test('should copy an array', function (t) {
  let {$copy} = t.context;

  var arr = ['a', 'b', 'c', 'd'];
  var arr2 = $copy(arr);

  t.not(arr2, arr);
  t.deepEqual(arr2, arr);
});
test('should copy an object', function (t) {
  let {$copy} = t.context;

  var o = {
    a : 'apple',
    b : 'bean'
  };
  var o2 = $copy(o);

  t.not(o2, o);
  t.deepEqual(o2, o);
});
test('should not copy sub properties of an object', function (t) {
  let {$copy} = t.context;

  var o = { obj : {} };
  var o2 = $copy.shallow(o);

  t.not(o2, o);
  t.deepEqual(o2, o);
  t.is(o2.obj, o.obj);
});

test('should deep copy an array', function (t) {
  let {$copy} = t.context;

  var arr = [
    [1, 2, 3],
    { obj : {} },
    'string'
  ];
  var arr2 = $copy.deep(arr);

  t.not(arr2, arr);
  t.not(arr2[0], arr[0]);
  t.not(arr2[1], arr[1]);
  t.deepEqual(arr2, arr);
});
test('should deep copy an object', function (t) {
  let {$copy} = t.context;

  var o = { obj : {} };
  var o2 = $copy.deep(o);

  t.not(o2, o);
  t.deepEqual(o2, o);
  t.not(o2.obj, o.obj);
  t.deepEqual(o2.obj, o.obj);
});

test('should copy multiple objects into a target object', function (t) {
  let {$copy} = t.context;

  var o1 = {a : 'first'};
  var o2 = {a : 'second', b : 'second'};
  var o3 = {b : 'third', c : 'third'};
  var o4 = {b : 'fourth', d : 'fourth'};

  var o5 = $copy.extend(o1, o2, o3, o4);

  t.is(o5.a, 'second');
  t.is(o5.b, 'fourth');
  t.is(o5.c, 'third');
  t.is(o5.d, 'fourth');
});
test('should mutate the target', function (t) {
  let {$copy} = t.context;

  var o1 = {a : 'first'};
  var o2 = {a : 'second', b : 'second'};
  var o3 = {b : 'third', c : 'third'};
  var o4 = {b : 'fourth', d : 'fourth'};

  var o5 = $copy.extend(o1, o2, o3, o4);

  t.is(o5, o1);
});
test('should deep copy', function (t) {
  let {$copy} = t.context;

  var o1 = { obj : {
    x : 'first'
  } };
  var o2 = { obj : {
    x : 'second'
  } };
  $copy.extend(o1, o2);

  t.is(o1.obj.x, 'second');
});
test('should combine objects', function (t) {
  let {$copy} = t.context;

  var o1 = {obj : {a : 'first'}};
  var o2 = {obj : {b : 'second'}};
  var o3 = {obj : {c : 'third'}};
  $copy.extend(o1, o2, o3);

  t.is(o1.obj.a, 'first');
  t.is(o1.obj.b, 'second');
  t.is(o1.obj.c, 'third');
});
test("should overwrite array elements", function (t) {
  let {$copy} = t.context;

  var o1 = { arr : [1, 2, 3]};
  var o2 = { arr : [4, 5, 6]};
  var o3 = { arr : [7, 8, 9]};
  var o4 = $copy.extend({}, o1, o2, o3);
  t.deepEqual(o4, o3);
});
test('should not overflow if object contains self references', function (t) {
  let {$copy} = t.context;

  var obj = {};
  obj.child = {};
  obj.child.obj = obj;

  var copy = $copy.deep(obj);

  t.notThrows(() => $copy.deep(obj));

  obj = [];
  obj.push(1, 2, 3, obj);

  t.notThrows(() => $copy.deep(obj));
});
