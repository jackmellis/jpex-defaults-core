import test from 'ava-spec';
import jpex from 'jpex';
import defaults from '../src';

test.beforeEach(function (t) {
  let Jpex = jpex.extend();
  Jpex.use(defaults);
  let $interval = Jpex.$resolve('$interval');
  t.context = {Jpex, $interval};
});


test("should set an interval", function (t) {
  let {$interval} = t.context;

  return new Promise(resolve => {
    var count = 0;
    var timer = $interval(() => {
      if (count++ > 5){
        $interval.clear(timer);
        t.pass();
        resolve();
      }
    });
  });
});
