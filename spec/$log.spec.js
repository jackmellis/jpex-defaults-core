describe('$log', function(){
  var Jpex, defaults, BaseClass, $log;

  beforeEach(function(){
    $log = null;
    Jpex = require('jpex').extend();
    defaults = require('../src');
    Jpex.use(defaults);
    BaseClass = Jpex.extend(function(_$log_){
      $log = _$log_;
    });
    BaseClass();
  });

  it("should log a message", function () {
    spyOn(console, "log");
    $log('direct');
    $log.log('indirect');

    expect(console.log).toHaveBeenCalledWith('direct');
    expect(console.log).toHaveBeenCalledWith('indirect');
  });

  it("should log info", function () {
    spyOn(console, "info");
    $log.info('information');

    expect(console.info).toHaveBeenCalledWith('information');
  });

  it("should log a warning", function () {
    spyOn(console, "warn");
    $log.warn('warning');

    expect(console.warn).toHaveBeenCalledWith('warning');
  });

  it("should log an error", function () {
    spyOn(console, "error");
    $log.error('error');

    expect(console.error).toHaveBeenCalledWith('error');
  });
});
