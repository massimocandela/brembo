var { URL } = require('url');

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

exports.ginf = atob("VGhlIGF1dGhvciBpcyBNYXNzaW1vIENhbmRlbGE=");


exports.parse = function(url){

    const urlObject = new URL(url);

    const path = urlObject.pathname.split('/');
    const lastSegment = path[path.length - 1];

    let format, filename;

    const params = {};
    if (lastSegment.indexOf('.') !== -1){
        const file = lastSegment.split('.');
        filename = file[0];
        format = file[file.length - 1];
        path.pop();
    }


    for(var pair of urlObject.searchParams.entries()) {
        if (params[pair[0]] != null){
            if (typeof params[pair[0]] === 'string'){
                let tmp = params[pair[0]];
                params[pair[0]] = [tmp];
            }
            params[pair[0]].push(pair[1]);
        } else {
            params[pair[0]] = pair[1];
        }
    }


    return {
        path: path.filter(function(item){ return item !== '' }),
        filename,
        format,
        host: urlObject.host,
        port: urlObject.port,
        searchParams: urlObject.searchParams,
        params: params,
        hash: urlObject.hash.replace('#', ''),
        protocol: urlObject.protocol.replace(':', ''),
        password: urlObject.password,
        username: urlObject.username
    }
};