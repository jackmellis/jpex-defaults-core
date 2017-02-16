module.exports = function () {
  function timeout(cb, delay){
    return setTimeout(cb, delay);
  };
  timeout.clear = function(t){
    return clearTimeout(t);
  };
  return timeout;
};
