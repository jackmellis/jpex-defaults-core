module.exports = function (Promise) {
  var $promise = function (fn) {
    return new Promise(fn);
  };
  $promise.all = Promise.all.bind(Promise);
  $promise.race = Promise.race.bind(Promise);
  $promise.reject = Promise.reject.bind(Promise);
  $promise.resolve = Promise.resolve.bind(Promise);

  return $promise;
};
