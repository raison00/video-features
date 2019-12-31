define(['jquery', 'backbone', "handlebars", "templates", "config", "DomainPath"], function($, Backbone, Handlebars, templates, config) {
    'use strict';

    var FooterView = Backbone.View.extend({
        el: "#footer",
        initialize: function() {

            this.render();
        },
        events: {
            "click #m-footer-link-simple-signout": "logout"
        },
        getCookie: function(cookieName) {
            var cookieArray = document.cookie.split('; ');
            for (var i = 0; i < cookieArray.length; i++) {
                if (cookieArray[i].split('=')[0] === cookieName) {
                    return cookieArray[i].split('=')[1];
                }
            }
            return false;
        },
        render: function() {
            if (!this.getCookie('ishop_app')) {
                this.$el.html(Templates.footerView({
                    signedIn: this.isSignedIn()
                }));
            }
        },

        isSignedIn: function() {
            var signedinCookie = $.cookie('SignedIn');
            //$.cookie("FORWARDPAGE_KEY", window.location.href);
            this.setForwardPageCookie();
            if (signedinCookie !== null) {
                if (signedinCookie === "0") {
                    return false;
                } else {
                    return true;
                }
            }

        },
        getDesktopUrl: function() {
            var pageURl = document.location.href;

            return pageURl.split("?")[0] + "?override=desktop";
        },
        setForwardPageCookie: function() {
            var cookieDomain = makeCookieDomainName(document.location.hostname);
            if (cookieDomain) {
                //If we are creating cookie for an href - it will be passed as a parameter
                //otherwise we are creating it for current page (deep link)
                var pageUrl = document.location.href;
                var previousEncodingValue = $.cookie.raw;
                $.cookie('FORWARDPAGE_KEY', pageUrl, {
                    domain: cookieDomain,
                    path: '/'
                });
                //$.cookie.raw = previousEncodingValue;
            }
        },
        logout: function(e) {
            e.preventDefault();
            var url = makeCookieDomainName(document.location.hostname);
            $.ajax({
                url: 'https://secure-m' + url + '/api/v1/signout',
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true,
                success: function(data, textStatus, xhr) {
                    window.location.reload(true);
                },
                error: function(xhr, textStatus, errorThrown) {

                }
            });

        }

    });

    Handlebars.registerHelper('CUSTOMER_SERVICE_CONTACT_US', function() {
        if (window.ENV_CONFIG === undefined) {
            return 'https://customerservice.macys.com/app/contact?cm_sp=MEW_navigation-_-bottom_nav-_-contact_us';
        } else if (window.ENV_CONFIG.secureUrl === undefined) {
            return 'https://customerservice.macys.com/app/contact?cm_sp=MEW_navigation-_-bottom_nav-_-contact_us';
        } else {
            return 'https://' + window.ENV_CONFIG.CUSTOMER_SERVICE_CONTACT_US;
        }
    });
    Handlebars.registerHelper('DESKTOP_VERSION_URL', function() {
        var pageURl = document.location.href;
        if (pageURl.indexOf("mcomexternal") > 0) {
            pageURl = pageURl.replace("mobile", "desktop");
        } else {
            pageURl = pageURl.replace("m", "www");

        }
        //return pageURl.split("?")[0] + "?override=desktop&stop_mobi=yes";
        return pageURl + "?override=desktop&stop_mobi=yes";
    });


    Handlebars.registerHelper('secureUrl', function(urlPath) {
        var secureUrl
        if (window.ENV_CONFIG === undefined) {
            secureUrl = 'https://secure-m.macys.com';
        } else if (window.ENV_CONFIG.secureUrl === undefined) {
            secureUrl = 'https://secure-m.macys.com';
        } else {
            secureUrl = 'https://' + window.ENV_CONFIG.secureUrl + makeCookieDomainName(window.location.hostname);
        }


        return secureUrl;
    });

    return FooterView;

});
