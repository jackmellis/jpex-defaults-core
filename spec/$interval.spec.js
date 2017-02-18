describe("$interval", function () {
  var Jpex, defaults, $interval;
  beforeEach(function () {
    Jpex = require('jpex').extend();
    defaults = require('../src');
    Jpex.use(defaults);
    Jpex.extend(function (_$interval_) {
      $interval = _$interval_;
    })();
  });

  it("should set an interval", function (done) {
    var count = 0;
    var timer = $interval(() => {
      if (count++ > 5){
        $interval.clear(timer);
        done();
      }
    });
  });
});
