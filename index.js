exports.build = function(base, options) {
    let urlOut = "";
    const params = options.params;
    let path = options.path;
    const anchor = options.anchor;

    const trimSlashes = function(str){

        if (str[str.length - 1] == "/") {
            str = str.slice(0, str.length - 1);
        }

        if (str[0] == "/") {
            str = str.slice(1, str.length);
        }

        return str;
    };

    if (base){
        urlOut = urlOut.concat(trimSlashes(base));
    }

    if (path){
        if (typeof path == "string") {
            path = [path];
        }

        path = path.map(item => trimSlashes(item.toString().trim())).join("/");

        urlOut = urlOut.concat("/" + path.toString());
    }

    if (params){
        const pairs = [];
        for (let param in params){
            if (params[param] != null){
                pairs.push(param.toString() + "=" + params[param].toString());
            }
        }
        if (pairs.length > 0){
            urlOut = urlOut.concat("?").concat(pairs.join("&"));
        }
    }

    if (anchor != null){
        urlOut = urlOut.concat("#" + anchor.toString());
    }


    return urlOut;
};

exports.parse = function(url){
    //TODO
    console.log("todo");
};