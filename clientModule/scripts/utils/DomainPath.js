function makeCookieDomainName(hostname) {
    var cookieDomain;
    var tokens = hostname.split('.'),
        domaintoken;

    //Please note that you cannot set cookie domain to localhost
    //and need additional special processing before setting
    if (hostname === 'localhost') {
        return hostname;
    }

    cookieDomain = '';
    if (hostname.indexOf("mcomexternal")>-1 || hostname.indexOf("qa")>-1) {
        domaintoken = tokens.slice(-3);
    } else {
        domaintoken = tokens.slice(-2);
    }

    for (var i = 0; i < domaintoken.length; i++) {
        cookieDomain += '.';
        cookieDomain += domaintoken[i];
    }



    return cookieDomain;
}