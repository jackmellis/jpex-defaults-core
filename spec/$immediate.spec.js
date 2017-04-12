import test from 'ava-spec';
import jpex from 'jpex';
import defaults from '../src';

test.beforeEach(function (t) {
  let Jpex = jpex.extend();
  Jpex.use(defaults);
  let $immediate = Jpex.$resolve('$immediate');
  t.context = {Jpex, $immediate};
});

test("should set an immediate timeout", function (t) {
  let {$immediate} = t.context;

  return new Promise(resolve => {
    $immediate(resolve);
  }).then(() => t.pass());
});

test("should clear an immediate timeout", function (t) {
  let {$immediate} = t.context;

  var called = false;
  var timer = $immediate(function () {
    called = true;
  });
  $immediate.clear(timer);

  return new Promise(resolve => {
    setTimeout(function () {
      t.false(called);
      resolve();
    }, 10);
  });
});

test('should promisify a immediate', async function (t) {
  let {$immediate} = t.context;

  await $immediate().then(() => t.pass());
});
