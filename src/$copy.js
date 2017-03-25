module.exports = function ($typeof) {
    var exists;
    var alreadyCopied = function (obj, hash) {
        for (var x = 0, l = hash.length; x < l; x++){
            if (hash[x].from === obj){
                return obj;
            }
        }
    };
    var copier = function (from, to, recur, hash) {
        hash = hash || [];

        switch($typeof(from)){
        case 'string':
        case 'number':
        case 'boolean':
        case 'function':
        case 'null':
        case 'undefined':
            return from;

        case 'date':
            return new Date(from);

        case 'regexp':
            var flags = [];
            if (from.global){flags.push('g');}
            if (from.ignoreCase){flags.push('i');}
            return new RegExp(from.source, flags.join(''));

        case 'array':
            exists = alreadyCopied(from, hash);
            if (exists){
                return exists.to;
            }else{
                to = [];
                hash.push({from : from, to : to});
                from.forEach(function (item) {
                    to.push(recur ? copier(item, undefined, true, hash) : item);
                });
                return to;
            }

        case 'object':
            exists = alreadyCopied(from, hash);
            if (exists){
                return exists.to;
            }else{
                to = to || {};
                hash.push({from : from, to : to});
            }

            Object.keys(from).forEach(function (key) {
                to[key] = recur ? copier(from[key], to[key], recur, hash) : from[key];
            });
            return to;

        default:
            throw new Error('Unexpected type: ' + $typeof(from));
        }
    };

    var $copy = function (obj) {
        return $copy.shallow(obj);
    };
    $copy.shallow = function (obj) {
        return copier(obj);
    };
    $copy.deep = function (obj) {
        return copier(obj, null, true);
    };
    $copy.extend = function () {
        var args = Array.prototype.slice.call(arguments);
        var target = args.shift();
        args.forEach(function (arg) {
            copier(arg, target, true);
        });
        return target;
    };
    return $copy;
};
