module.exports = function ($timeout) {
  var native = (typeof setImmediate === 'function');
  function immediate(cb) {
    return native ? setImmediate(cb) : $timeout(cb, 0);
  };
  immediate.clear = function (t) {
    return native ? clearImmediate(t) : $timeout.clear(t);
  };
  return immediate;
};
