describe("$timeout", function () {
  var Jpex, defaults, $timeout;
  beforeEach(function () {
    Jpex = require('jpex').extend();
    defaults = require('../src');
    Jpex.use(defaults);
    Jpex.extend(function (_$timeout_) {
      $timeout = _$timeout_;
    })();
  });

  it("should set a timeout", function (done) {
    $timeout(done, 100);
  });

  it("should clear a timeout", function (done) {
    var called = false;
    var t = $timeout(function () {
      called = true;
    }, 50);

    $timeout.clear(t);

    setTimeout(function () {
      expect(called).toBe(false);
      done();
    }, 200);
  });
});
