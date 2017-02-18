describe('Jpex - Default Factories', function(){
  describe('$promise', function(){
    var Jpex, defaults, BaseClass, $promise;

    beforeEach(function(){
      Jpex = require('jpex');
      defaults = require('../src');
      Jpex.use(defaults);

      BaseClass = Jpex.extend(function(_$promise_){
        $promise = _$promise_;
      });
      BaseClass();
    });

    it("creates a promise", function (done) {
      $promise(function (resolve) {
        setTimeout(resolve, 100);
      })
      .then(function () {
        done();
      });
    });

    it("resolves all promises", function (done) {
      $promise.all([
        123,
        $promise(resolve => { setTimeout(resolve, 100); })
      ]).then(function () {
        done();
      });
    });

    it("resolves any promise", function (done) {
      $promise.race([
        123,
        $promise(resolve => {})
      ]).then(function () {
        done();
      });
    });

    it("creates a resolved promise", function (done) {
      $promise.resolve().then(done);
    });

    it("creates a rejected promise", function (done) {
      $promise.reject().catch(done);
    });
  });
});
