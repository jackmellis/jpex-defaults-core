module.exports = function ($promise) {
    function timeout(cb, delay){
        if (typeof cb !== 'function'){
            delay = cb;
            cb = null;
        }
        delay = delay || 0;

        if (!cb){
            return $promise(function (resolve) {
                setTimeout(resolve, delay);
            });
        }else{
            return setTimeout(cb, delay);
        }
    }
    timeout.clear = function(t){
        return clearTimeout(t);
    };
    return timeout;
};
