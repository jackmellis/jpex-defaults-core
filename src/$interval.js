module.exports = function(){
    function interval(cb, delay){
        return setInterval(cb, delay);
    }
    interval.clear = function (t) {
        return clearInterval(t);
    };
    return interval;
};
