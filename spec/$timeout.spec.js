import test from 'ava-spec';
import Sinon from 'sinon';
import jpex from 'jpex';
import defaults from '../src';

test.beforeEach(function (t) {
  let sinon = Sinon.sandbox.create();
  let Jpex = jpex.extend();
  Jpex.use(defaults);
  let $timeout = Jpex.$resolve('$timeout');
  t.context = {Jpex, $timeout, sinon};
});
test.afterEach(function (t) {
  t.context.sinon.restore();
});


test("should set a timeout", function (t) {
  let {$timeout} = t.context;

  return new Promise(resolve => {
    $timeout(() => {
      t.pass();
      resolve();
    }, 100);
  });
});

test("should clear a timeout", function (t) {
  let {$timeout} = t.context;

  return new Promise(resolve => {
    var called = false;
    var t2 = $timeout(function () {
      called = true;
    }, 50);

    $timeout.clear(t2);

    setTimeout(function () {
      t.false(called);
      resolve();
    }, 200);
  });
});

test('should promisify a timeout', function (t) {
  let {$timeout} = t.context;

  return $timeout(50).then(() => t.pass());
});
