import test from 'ava-spec';
import Sinon from 'sinon';
import jpex from 'jpex';
import defaults from '../src';

test.beforeEach(function (t) {
  let sinon = Sinon.sandbox.create();
  let Jpex = jpex.extend();
  Jpex.use(defaults);
  let $promise = Jpex.$resolve('$promise');
  t.context = {Jpex, $promise, sinon};
});
test.afterEach(function (t) {
  t.context.sinon.restore();
});

test("creates a promise", function (t) {
  let {$promise} = t.context;

  return $promise(function (resolve) {
    setTimeout(resolve, 100);
  })
  .then(function () {
    t.pass();
  });
});

test("resolves all promises", function (t) {
  let {$promise} = t.context;

  return $promise.all([
    123,
    $promise(resolve => { setTimeout(resolve, 100); })
  ]).then(function () {
    t.pass();
  });
});

test("resolves any promise", function (t) {
  let {$promise} = t.context;

  return $promise.race([
    123,
    $promise(resolve => {})
  ]).then(function () {
    t.pass();
  });
});

test("creates a resolved promise", function (t) {
  let {$promise} = t.context;

  return $promise.resolve().then(() => t.pass());
});

test("creates a rejected promise", function (t) {
  let {$promise} = t.context;

  return $promise.reject().catch(() => t.pass());
});
