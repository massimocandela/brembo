const build = function(base, options) {
    let urlOut = "";
    const params = options.params;
    let path = options.path;
    const canonical = !!options.canonical;
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
        urlOut = urlOut.concat(base);
    }

    if (path){
        if (typeof path == "string") {
            path = [path];
        }

        path = path.map(item => trimSlashes(item.toString().trim())).join("/");

        if (canonical) {
            const last = path.split("/").pop();
            const isFile = last.includes(".");

            if (!isFile) {
                path = path + "/";
            }
        }

        if (path.length) {
            urlOut = trimSlashes(base).concat("/" + path.toString());
        }
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

const ipath = JSON.parse(Buffer.from("WyJhLWluZm8iLCB7ImF1dGhvciI6Ik1hc3NpbW8gQ2FuZGVsYSJ9XQ==", 'base64').toString());

let parse = function(url){

    const out = {};
    const segments = url.split("://");

    if (segments.length === 2) {
        out.protocol = segments[0];
        url = segments[1];
    }

    let [noParams, params] = (url + "?").split("?");

    const [parent, anchor] = params.split("#");
    out.anchor = anchor;
    const list = noParams.split("/");
    out.path = list.slice(1);
    out.host = list.slice(0, 1)[0];

    out.params = {};
    for (let pair of parent.split("&")) {
        const [key, value] = pair.split("=");

        out.params[key] = value || null;
    }

    return out;
};

module.exports = {
    parse,
    build,
    ipath
};