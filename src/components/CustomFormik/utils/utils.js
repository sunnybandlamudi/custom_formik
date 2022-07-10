

function isString( obj ){
    return typeof(obj) == "string"
}

function isObject( obj ){
    return typeof(obj) == "object"
}

function isFunction( obj ){
    return typeof(obj) == "function"
}

function objectByString(o, s) {
    s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
    s = s.replace(/^\./, '');           // strip a leading dot
    var a = s.split('.');
    for (var i = 0, n = a.length; i < n; ++i) {
        var k = a[i];
        if (k in o) {
            o = o[k];
        } else {
            return;
        }
    }
    return o;
}

export {isString,isFunction,isObject, objectByString}