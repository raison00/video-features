define('base', ['jquery'], function($) {
    //constants
    var TOP = "top",
        BOTTOM = "bottom",
        RIGHT = "right",
        LEFT = "left",
        ALIGN_TOP = "alignTop",
        ALIGN_BOTTOM = "alignBottom",
        FLEX_LABEL_PREFIX = "flexLabel_",
        SITE = "SITE",
        REGISTRY = "REGISTRY",
        HTTPS = "https://",
        HTTP = "http://";

    var getCurrentChannel = function(testURL) {
        var url = testURL || window.location.href;
        var channel = !~url.indexOf("registry") ? this.SITE : this.REGISTRY;
        return channel;
    };

    var isThirdParty = function(testHostName) {
        var host = testHostName || window.location.host;
        //var isProd = (host.indexOf("www.macys.com") > -1) || (host.indexOf("www1.macys.com") > -1);
        //var isTestEnv = host.indexOf(".fds.com") > -1;
        //var isLocalTestEnv = host.indexOf("localhost") > -1;
        var isConfigSet = typeof macysConfig === 'object';
        //macysConfig.hostURL="http://"+window.location.hostname;
        return isConfigSet; //!isProd && !isTestEnv && !isLocalTestEnv && isConfigSet;
    };

    //All of macys is either www.macys.com or www1.macys.com"
    var isProduction = function(testHost) {
        var host = testHost || window.location.host;
        return host.indexOf("www.macys.com") > -1 || host.indexOf("www1.macys.com") > -1;
    };

    //navApp pages will NOT have this element, length will be zero
    var isNavApp = function() {
        var len = $("div.globalHiddenDefaultTopNav").length;
        return len === 0;
    };

    var getProtocol = function(testURL) {
        var href = testURL || location.href; //override for testing
        if (href.indexOf(this.HTTPS) > -1) {
            return this.HTTPS;
        } else if (href.indexOf(this.HTTP) > -1) {
            return this.HTTP;
        } else {
            //return everything before double slashes //
            //ftp://
            //ftps://
            if (href.indexOf(":") > -1) {
                var index = href.indexOf(":");
                return href.substr(0, index + 3);
            } else {
                return "";
            }
        }
    };

    var isTouch = function() {
        var touchStart = !!('ontouchstart' in window);
        var msTouch = !!(window.navigator.msMaxTouchPoints) && window.navigator.msMaxTouchPoints > 0; /*IE 10*/
        return touchStart || msTouch;
    };

    var removePrefix = function(str) {
        var id = str.substr(str.indexOf("_") + 1);

        if (id.match(/[a-zA-Z]+/))
            throw new Error("base.removePrefix has failed. Invalid id value.");
        return Number(id);
    };
    //input example:
    //flexLink_<ID>
    //returns ID
    //or
    //flyout_<ID>
    //returns ID
    var getSuffixId = function(str) {
        if (!~str.indexOf("_")) {
            throw new Error("Invalid flyout id format, should be flyout_<ID> for flyouts OR " + this.FLEX_LABEL_PREFIX + "<ID> for topnav " + str);
        } else {
            return this.removePrefix(str);
        }
    };

    var getUserAgent = function() {
        var a = (navigator.userAgent || navigator.vendor || window.opera);
        return a;
    };

    var getIEVersion = function(userAgentStringTest) {
        var ua = userAgentStringTest || this.getUserAgent();
        var groups = ua.match(/(MSIE )([0-9\.b]+)/);
        return groups == null ? false : eval(groups[2].substring(0, groups[2].indexOf(".") + 2));
    };

    var sign = function(p1, p2, p3) {
        return (p1.x - p3.x) * (p2.y - p3.y) - (p2.x - p3.x) * (p1.y - p3.y);
    };

    var pointInTriangle = function(point, v1, v2, v3) {
        if (point == undefined || v1 == undefined || v2 == undefined || v3 == undefined || v1.x == 0 || v1.y == 0) {
            return false;
        }
        var b1, b2, b3;
        b1 = this.sign(point, v1, v2) < 0;
        b2 = this.sign(point, v2, v3) < 0;
        b3 = this.sign(point, v3, v1) < 0;
        return ((b1 == b2) && (b2 == b3));
    };

    var makeIdIfUnknown = function(str) {
        if (typeof str === 'string') {
            if (str.substring(0, 1) != '#' && str.substring(0, 1) != '.') {
                str = '#' + str;
            }
        }
        return str;
    };

    var removeEndSlash = function(str) {
        return str.charAt(str.length - 1) === "/" ? str.substr(0, str.length - 1) : str;
    };

    var getServiceUrl = function(host, port, path, secureHost) {
        var servicePath = path,
            serviceHost = host,
            serviceHostSecure = secureHost || "",
            serviceHostPort = port;


        //Retrieve and construct the autocomplete ajax url from *base*
        var baseURL = serviceHost;
        if (window && window.location && window.location.protocol.indexOf('https') != -1) {
            baseURL = serviceHostSecure;
        }
        if (serviceHostPort != "80" && serviceHostPort != "443" && serviceHostPort != '') {
            baseURL = removeEndSlash(baseURL) + ":" + serviceHostPort;
        }
        baseURL += servicePath;

        //STEP: Clean up URL, remove any double slashes, make certain it ends with a slash
        baseURL = removeEndSlash((baseURL).replace(/([^:]\/)\/+/g, "$1"));
        return baseURL;
    };
    //convert html snippet that contain ROOT relative links to absolute links
    //var example = Base.absoluteLinkatize("<p>html content<br/><a href='/shop/somelink/blah/'>Cool Product</a>", "http://www.macys.com");
    //updated to be: <p>html content<br/><a href='https://www.macys.com/shop/somelink/blah/'>Cool Product</a>
    var absoluteLinkatize = function(str, host) {
        if (!host) {
            throw new Error("Base.absoluteLinkatize failed. Required host parameter is missing.");
        } else {
             var newStr=str.replace(/href=("|')\//g, "href=$1" + host + "/");
            return newStr.replace(/src=("|')\//g, "src=$1" + host + "/");
        }

    }

    return {
        isProduction: isProduction,
        getIEVersion: getIEVersion,
        removePrefix: removePrefix,
        getSuffixId: getSuffixId,
        getUserAgent: getUserAgent,
        getCurrentChannel: getCurrentChannel,
        pointInTriangle: pointInTriangle,
        isThirdParty: isThirdParty,
        isNavApp: isNavApp,
        removeEndSlash: removeEndSlash,
        getServiceUrl: getServiceUrl,
        absoluteLinkatize: absoluteLinkatize,
        makeIdIfUnknown: makeIdIfUnknown,
        isTouch: isTouch,
        sign: sign,
        getProtocol: getProtocol,
        HTTP: HTTP,
        HTTPS: HTTPS,
        FLEX_LABEL_PREFIX: FLEX_LABEL_PREFIX,
        SITE: SITE,
        REGISTRY: REGISTRY
    }
});