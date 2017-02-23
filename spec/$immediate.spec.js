describe("$immediate", function () {
  var Jpex, defaults, $immediate;
  beforeEach(function () {
    Jpex = require('jpex').extend();
    defaults = require('../src');
    Jpex.use(defaults);
    Jpex.extend(function (_$immediate_) {
      $immediate = _$immediate_;
    })();
  });

  it("should set an immediate timeout", function (done) {
    $immediate(done);
  });

  it("should clear an immediate timeout", function (done) {
    var called = false;
    var timer = $immediate(function () {
      called = true;
    });
    $immediate.clear(timer);

    setTimeout(function () {
      expect(called).toBe(false);
      done();
    }, 100);
  });

  it("should polyfil setImmediate", function (done) {
    var i = global.setImmediate;
    global.setImmediate = null;
    Jpex = require('jpex').extend();
    Jpex.use(defaults);
    Jpex.extend(function (_$immediate_) {
      $immediate = _$immediate_;
    })();

    $immediate(function () {
      global.setImmediate = i;
      done();
    });
  });
});
