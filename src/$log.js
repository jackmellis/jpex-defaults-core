module.exports = function () {
    /* eslint-disable no-console*/
    var $log = function () {
        return $log.log.apply(null, arguments);
    };
    $log.log = function () {
        return console.log.apply(null, arguments);
    };
    $log.info = function () {
        return console.info.apply(null, arguments);
    };
    $log.warn = function () {
        return console.warn.apply(null, arguments);
    };
    $log.error = function () {
        return console.error.apply(null, arguments);
    };
    return $log;
};
