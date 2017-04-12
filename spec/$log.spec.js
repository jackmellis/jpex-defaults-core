import test from 'ava-spec';
import Sinon from 'sinon';
import jpex from 'jpex';
import defaults from '../src';

test.beforeEach(function (t) {
  let sinon = Sinon.sandbox.create();
  let Jpex = jpex.extend();
  Jpex.use(defaults);
  let $log = Jpex.$resolve('$log');
  t.context = {Jpex, $log, sinon};
});
test.afterEach(function (t) {
  t.context.sinon.restore();
});

test("should log a message", function (t) {
  let {$log, sinon} = t.context;

  sinon.stub(console, "log");
  $log('direct');
  $log.log('indirect');

  t.true(console.log.calledWith('direct'));
  t.true(console.log.calledWith('indirect'));
});

test("should log info", function (t) {
  let {$log, sinon} = t.context;

  sinon.stub(console, "info");
  $log.info('information');

  t.true(console.info.calledWith('information'));
});

test("should log a warning", function (t) {
  let {$log, sinon} = t.context;

  sinon.stub(console, "warn");
  $log.warn('warning');

  t.true(console.warn.calledWith('warning'));
});

test("should log an error", function (t) {
  let {$log, sinon} = t.context;

  sinon.stub(console, "error");
  $log.error('error');

  t.true(console.error.calledWith('error'));
});
