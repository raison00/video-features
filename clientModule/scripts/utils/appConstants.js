define([
    'jquery',
    "DomainPath"
], function($) {
    var mewServerAddress;
    if (window.ENV_CONFIG === undefined) {
        mewServerAddress = "www.macys.com";
    } else if (window.ENV_CONFIG.mewServerAddress === undefined) {
        mewServerAddress = "www.macys.com";
    } else {
        mewServerAddress = window.ENV_CONFIG.mewServerAddress;
    }

    if (window.ENV_CONFIG === undefined) {
        autoComplete = "/CE/autosuggest";
    } else if (window.ENV_CONFIG.domainOrigin === undefined) {
        autoComplete = "/CE/autosuggest";
    } else if (window.ENV_CONFIG.domainOrigin === "qacode") {

        autoComplete = "https://www"+makeCookieDomainName(window.location.hostname)+"/suggester";
    }else{
        autoComplete = "https://www.macys.com/suggester";
    }
    var AppConstants = {
        MEW_SERVER_ADDRESS: mewServerAddress,
        RELATIVE_SEARCH_URL: "/shop/search",
        autoComplete:autoComplete
    }

    return AppConstants;
});
