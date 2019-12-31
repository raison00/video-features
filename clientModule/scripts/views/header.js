define('header', ['jquery', 'base', 'headerFOBNav', 'headerFlyout', 'trafficSplitter', 'webfont', 'require', 'cookie', "DomainPath"], function ($, Base, HeaderFOBNav, HeaderFlyout, TrafficSplitter, Webfont, require) {
    var NAME = "Header",
        SEARCH_BOX_HINT = "Search or enter web ID",
        SITE_CHANNEL = "SITE",
        REGISTRY_CHANNEL = "REGISTRY",
        tid, /*   timeout id   */
        pauseOnMoveDetection = false,
        DEFAULT_SPLIT_DATA_URL = 'http://netstorage.macys.com/netstorage/ABTesting/headerFlyouts.json',
        HTTPS_SPLIT_DATA_URL = 'https://secure-netstorage.macys.com/netstorage/ABTesting/headerFlyouts.json',
        SPLIT_DATA_URL,
        selectedID,
        /*
            vars to support mouse direction movement
            used w/Base.pointInTriangle() call
            if moving towards open flyout return true
            else false
        */
        point,
        vert1 = {
            x: 0,
            y: 0
        },
        vert2,
        vert3,
        toFlyoutIntent = false; //whether or not moving in direction of open flyout

    function splitCB(json) {
        return json;
    }

    setInterval (function(){
        $("#navAdOne").is(":visible") ? $("#navAdOne").hide() : $("#navAdOne").show(); $("#navAdTwo").is(":visible") ? $("#navAdTwo").hide() : $("#navAdTwo").show();
    },5000);

    return {
        SITE: SITE_CHANNEL,
        REGISTRY: REGISTRY_CHANNEL,
        getName: function () {
            return NAME;
        },
        getCurrentChannel: function (testURL) {
            //Channel getter method
            var url = testURL || window.location.href;
            return ~url.indexOf("registry") ? REGISTRY_CHANNEL : SITE_CHANNEL;
        },
        useFlyouts: function (bool) {
            var enable = bool === undefined ? HeaderFlyout.DEFAULT_FLYOUTS_ENABLED : bool; //defualt is true, use flyouts!
            if (enable) {
                HeaderFlyout.enable();
            } else {
                HeaderFlyout.disable();
            }
        },
        setSplitDataUrl: function (url) {
            SPLIT_DATA_URL = url || window.location.href.indexOf("https") > -1 ? HTTPS_SPLIT_DATA_URL : DEFAULT_SPLIT_DATA_URL;
        },
        getSplitDataUrl: function () {
            return SPLIT_DATA_URL || window.location.href.indexOf("https") > -1 ? HTTPS_SPLIT_DATA_URL : DEFAULT_SPLIT_DATA_URL;
        },
        //"parsererror loading: http://netstorage.macys.com/netstorage/flyoutABTesting/split.json"
        getSplitData: function (callback, timeout) {
            var to = timeout || 1000;
            var url = this.getSplitDataUrl();
            $.ajax({
                url: url,
                type: 'GET',
                dataType: 'jsonp',
                timeout: to,
                jsonpCallback: 'splitCB',
                success: function (json) {
                    callback(true, json);
                },
                error: function (x, t, m) {
                    callback(false, {
                        error: t + ",message:" + m.message + " loading: " + url
                    });
                }
            });
        },
        pdfFixToggle: function (openFlag) {
            var iev = Base.getIEVersion();
            var margin = openFlag ? "412px" : "0px";
            if (iev && iev < 10 && (window.location.href.indexOf("privacy_dnsbank.jsp") > -1)) {
                //fixed height
                $("div#bd").css("margin-top", margin);
            }
        },
        preInit: function (flyoutsKillSwitch, timeoutMS) {
            var _this = this;
            //killswitch turned off go to default condition init()
            if (!flyoutsKillSwitch) {
                _this.init(flyoutsKillSwitch);
            } else {
                this.getSplitData(function (success, json) {
                    if (success && json.enabled) {
                        _this.applytABTestLogic(json.trafficSplit); //test
                    } else {
                        //loading split.json failed goto default init()
                        _this.init(flyoutsKillSwitch);
                    }
                });
            }
        },
        applytABTestLogic: function (json) {
            var cookieValue = Cookie.get("flyoutEnabled");
            var useFlyouts = true;
            //already have flyoutEnabledCookie
            if (!cookieValue) {
                //new user; no cookie set
                useFlyouts = TrafficSplitter.getTestValue(json) || false;
                var exp = new Date(2013, 7, 31); //per business Sat, 31 Aug 2013 07:00:00 GMT
                Cookie.setExpires(exp.toGMTString());
                Cookie.set("flyoutEnabled", useFlyouts);
            } else {
                useFlyouts = eval(cookieValue);
            }
            this.init(useFlyouts);
        },
        searchHintToggle: function (bool, input) {
            if (bool && input.val() === SEARCH_BOX_HINT) {
                input.val("");
            }

            if (!bool && input.val() === "") {
                input.val(SEARCH_BOX_HINT);
            }

            input.css("color", (bool) ? '#333' : '#8C8C8C');
        },
        initSearchHint: function () {
            var _this = this,
                searchTextBox = $("#nav-search-box input#globalSearchInputField");
            if (searchTextBox) {
                searchTextBox.val(SEARCH_BOX_HINT);
                searchTextBox.css("color", '#8C8C8C');

                searchTextBox.on("focus", function () {
                    _this.searchHintToggle(true, searchTextBox);
                });

                searchTextBox.on("blur", function () {
                    _this.searchHintToggle(false, searchTextBox);
                });

                searchTextBox.parent().parent().on("submit", function (e) {
                    if (searchTextBox.val() === "" || searchTextBox.val() === SEARCH_BOX_HINT) {
                        e.preventDefault();
                        searchTextBox.focus();
                        return false;
                    }
                    return true;
                });
            }
        },
        loadFont: function (cb) {
            var fontBaseUrl = (typeof macysConfig == "object") ? macysConfig.fontBaseUrl || "" : "";
            var cssurl = "https://secure-netstorage.macys.com/netstorage/css/";

            if (Base.getIEVersion() >= 9) {
                cssurl = macysConfig.fontRootRelativePath + "avenirblack_ie9.css";
            } else {
                cssurl += "avenirblack.css";
            }

            WebFont.load({
                custom: {
                    families: ['Avenir Black', 'Avenir Black:n'],
                    urls: [cssurl]
                },
                loading: function () {
                    //console.log("font loading");
                    //cb();
                },
                active: function () {},
                inactive: function () {
                    //console.log("unable to render font");
                },
                fontloading: function (familyName, fvd) {},
                fontactive: function (familyName, fvd) {
                    //console.log("fontactive");
                    cb();
                },
                fontinactive: function (familyName, fvd) {
                    //console.log("fontinactive");
                    //console.log(familyName);
                    //console.log(fvd);
                    cb();
                }
            });
        },
        init: function (flyoutsKillSwitch) {
            var _this = this;
            this.useFlyouts(flyoutsKillSwitch);
            if (Base.isThirdParty()) {
                try {
                    if ((typeof macysConfig == "undefined") || (typeof macysConfig.headerTarget == "undefined") || (typeof macysConfig.footerTarget == "undefined")) {
                        throw new Error("Third Party Header/Footer failed! Missing required 'macysConfig' object. Please reference guide: http://ui-standards.herokuapp.com/components/header");
                    }
                } catch (e) {
                    return;
                }
                require(["handlebars", "templates", (location.href.indexOf("https") > -1 ? 'https://secure-netstorage.macys.com' : 'http://netstorage.macys.com') + '/netstorage/components/TextBoxAutoComplete.js', "autoSuggestView"], function (Handlebars, templates, TextBoxAutoComplete, autoSuggestView) {
                    var macysBaseUrl = macysConfig.fontBaseUrl || "";

                    // new variable for setting (presently) search bar endpoint domain
                    // in test and local, static non-SSL www.macys.com, prod is dynamic
                    if (location.hostname.indexOf("mcomexternal" || "localhost" || "social-preprod") !== -1) {
                        var hostnameUrl = macysConfig.hostURL;
                    } else {
                        var hostnameUrl = macysConfig.fontBaseUrl;
                    }

                    var autosuggest = new autoSuggestView();
                    //render header component
                    Handlebars.partials = Handlebars.templates;
                    console.log("$(macysConfig)");
                    console.log($(macysConfig));
                    console.log(macysConfig.headerTarget);
                    if (macysConfig.headerTarget !== undefined) {
                        var template = templates["headerTemplate"]({
                            macysBaseUrl: macysConfig.hostURL || "https://www.macys.com",
                            signedIn: _this.isSignedIn(),
                            userName: _this.getUserName()
                        });
                        $(macysConfig.headerTarget).html(template);

                        _this.getBagCount();
                        setTimeout(function () {
                            _this.initSearchHint();
                        }, 100); //let DOM render
                    } else {
                        throw new Error("Third party header failed! Missing required headerTarget configuration property");
                    }

                    $("#globalSearchInputField").on('input', function () {
                        autosuggest.getAutosuggest($('#globalSearchInputField').val(), "desktop");
                    });
                    $("#globalMastheadQuickBagHeader").on('mouseenter', function () {
                        $(this).addClass("open");
                    });

                    //let's wait 1/4 of a sec to allow DOM elements to render before w/try to attach
                    //autocomplete component
                    setTimeout(function () {
                        //does not support jsonp! for our 3rd Party Partners
                        //TextBoxAutoComplete.setConfig({serviceHost:'http://www.macys.com',serviceHostPort:'80', servicePath:'/suggester'});
                        //TextBoxAutoComplete.attachTo("globalSearchInputField");
                        //TextBoxAutoComplete.setSource();
                    }, 250);

                    //get back on track with the regular Header flow of things
                    _this.start();
                });
            } else {
                this.start();
            }
        },
        getUserName: function () {
            var miscgcs = $.cookie("MISCGCs"),
                signedinCookie = $.cookie('SignedIn'),
                userName;
            if (miscgcs && signedinCookie === "1" && miscgcs.indexOf("CartItem1_92_03_87_UserName1_92_4_02_") === -1) {
                userName = miscgcs.replace("CartItem1_92_", "").split("3_87_")[1].replace("UserName1_92_", "");
            }
            if (userName !== undefined && userName.indexOf("BazaarVoiceId") !== -1) {
                return;
            }
            return userName;
        },
        isSignedIn: function () {
            var signedinCookie = $.cookie('SignedIn');
            //$.cookie("FORWARDPAGE_KEY", window.location.href);
            this.setForwardPageCookie();
            if (signedinCookie === "0" || signedinCookie === null) {
                return false;
            } else {
                return true;
            }
        },
        setForwardPageCookie: function () {
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
        logout: function (e) {
            e.preventDefault();
            var cookieDomain = makeCookieDomainName(document.location.hostname);
            //console.log('https://secure-m'+cookieDomain+'/api/v1/signout');
            $.ajax({
                type: "get",
                url: 'https://secure-m' + cookieDomain + '/api/v1/signout?callback=jsonpexp',
                dataType: 'jsonp',
                success: function (json) {
                    window.location.reload(true);
                },
                error: function (json) {
                }
            });
        },
        getBagCount: function () {
            var userId = $.cookie("macys_online_uid");

            if (userId) {
                $.ajax({
                    url: "/CE/api/order/v1/bags?userId=" + userId,
                    type: 'GET',
                    dataType: 'json',
                    cache: true,
                    timeout: 2000,
                    success: function (data) {
                        if (data.hasOwnProperty("bag") && data.bag.hasOwnProperty("bagSummary") && data.bag.bagSummary.hasOwnProperty("itemCount")) {
                            $("#itemCount").html("(" + data.bag.bagSummary.itemCount + ")");
                        }
                    }
                });
            }
        },
        removeHiddenClass: function () {
            var m = $("div#globalMastheadCategoryMenu");

            if (m.hasClass("globalHiddenDefaultTopNav")) {
                m.removeClass("globalHiddenDefaultTopNav");
            }
        },
        start: function () {
            var _this = this;
            HeaderFOBNav.onReady(function (success) {
                if (success) {
                    if (HeaderFlyout.enabled()) {
                        var catIDs;
                        catIDs = HeaderFOBNav.getCategoryIds();
                        HeaderFlyout.init(catIDs, Base.ALIGN_BOTTOM);
                    } else {
                        //we have dynamic topnav but flyouts are disabled
                        _this.removeHiddenClass();
                        if (Base.isNavApp()) {
                            if ($("header#globalMastheadContainer div#globalMastheadCategoryMenu").hasClass(HeaderFOBNav.TOPNAV_CLASS)) {
                                $("header#globalMastheadContainer div#globalMastheadCategoryMenu").removeClass(HeaderFOBNav.TOPNAV_CLASS);
                            }
                            //add old css
                            $("header#globalMastheadContainer div#globalMastheadCategoryMenu > ul").addClass("nav").addClass("nav-pills");
                        }

                        //ensure all FOB items show and links are uppercase
                        $("header#globalMastheadContainer div#globalMastheadCategoryMenu > ul > li > a").css({
                            textTransform: "uppercase",
                            paddingRight: "0px",
                            paddingLeft: "0px"
                        });
                        _this.loadFont(function () {
                            HeaderFOBNav.distributeWidths();
                        });
                    }
                } else {
                    _this.removeHiddenClass();
                }
            });

            //this will get triggered hover:desktop click:touchDevices
            HeaderFOBNav.onOver(function (id, totalFOBs, selectedIndex, offset, domElement) {
                //adding support for autocomplete
                //close autocomplete on hover
                //try{
                //MACYS.AutoComplete.globalSearchInputField.autocomplete("close");
                // }catch(e){}
                var domid = domElement.attr("id");
                selectedID = Base.getSuffixId(domid);
                clearTimeout(tid);
                if (!domElement.hasClass("selected-flyout")) {
                    //short delay to allow user to mouseover corner of adjacent topnav FOB items on way to flyout
                    //onmouse enter on flyout we'll clear the timeoutID, because we know it wasn't the intention of the use to select
                    if (toFlyoutIntent) {
                        tid = setTimeout(function () {
                            pauseOnMoveDetection = false;
                            domElement.addClass("selected-flyout");
                            HeaderFOBNav.deselectOthers(selectedID, "selected-flyout");
                            HeaderFlyout.closeAll();
                            _this.pdfFixToggle(selectedID, true);
                            HeaderFlyout.open(selectedID, totalFOBs, selectedIndex, offset, domElement.width());
                        }, 500);
                    } else {
                        HeaderFOBNav.deselectOthers(selectedID, "selected-flyout");
                        HeaderFlyout.closeAll();
                        domElement.addClass("selected-flyout");
                        selectedID = Base.getSuffixId(domElement.attr("id"));
                        _this.pdfFixToggle(selectedID, true);
                        HeaderFlyout.open(selectedID, totalFOBs, selectedIndex, offset, domElement.width());
                    }
                } else {
                    clearTimeout(tid);
                    //console.log("open don't close");
                    //dont close flyout
                }
                if ($("#sortBy").length > 0 && $("#ppp").length > 0) {
                    $('#sortBy, #ppp').each(function () {
                        var parent = $(this).parent();
                        var combo = parent.html();
                        parent.html('');
                        parent.html(combo);
                    });
                    try {
                        var arr = MACYS.Faceted.facetCtrl.newHashString.split("&");
                        for (var x = 0; x < arr.length; x++) {
                            if (arr[x].indexOf("sortBy") > -1) {
                                YAHOO.util.Dom.get("sortBy").value = arr[x].split("=")[1];
                            }
                            if (arr[x].indexOf("productsPerPage") > -1) {
                                YAHOO.util.Dom.get("ppp").value = arr[x].split("=")[1];
                            }
                        }
                        MACYS.Pagination.init();
                    } catch (e) {}
                }
            });

            HeaderFOBNav.onOut(function (id) {
                clearTimeout(tid);
                //console.log("toFlyoutIntent fob.onOut: "+toFlyoutIntent);
                //moving in direction of open flyout
                if (toFlyoutIntent) {
                    pauseOnMoveDetection = true;
                    clearTimeout(tid);
                    tid = setTimeout(function () {
                        //console.log("timeout onOut call");
                        HeaderFOBNav.deselectOthers();
                        _this.pdfFixToggle();
                        HeaderFlyout.closeAll();
                    }, 250);
                } else {
                    //console.log("no timeout onOut call");
                    HeaderFOBNav.deselect(id);
                    _this.pdfFixToggle();
                    HeaderFlyout.closeAll();
                }
            });
            HeaderFOBNav.onMove(function (e) {
                if (!selectedID || pauseOnMoveDetection) return;

                var p = HeaderFOBNav.getMouseCoords();
                var tmp = HeaderFlyout.getEdgeCoords(selectedID, Base.TOP);

                //mouse movemnent is towards flyout
                toFlyoutIntent = Base.pointInTriangle(p, vert1, tmp.vert2, tmp.vert3) || false;

                //do not entire object, updates to p will also update vert1
                vert1.x = p.x;
                vert1.y = p.y;
            });

            //ONLY TOUCH DEVICES WILL FIRE THIS CALLBCK
            HeaderFOBNav.onClick(function (id, totalFOBs, selectedIndex, offset, domElement) {
                if (!domElement.hasClass("selected-flyout")) {
                    domElement.addClass("selected-flyout");
                    selectedID = Base.getSuffixId(domElement.attr("id"));
                    HeaderFOBNav.deselectOthers(selectedID, "selected-flyout");
                    HeaderFlyout.closeAll();
                    HeaderFlyout.open(selectedID, totalFOBs, selectedIndex, offset, domElement.width());
                } else {
                    HeaderFOBNav.deselectOthers(selectedID, "selected-flyout");
                    HeaderFlyout.closeAll();
                    domElement.removeClass("selected-flyout");
                }
            });

            if (HeaderFlyout.enabled()) {
                //callback function for ajax support of when flyouts are loaded
                HeaderFlyout.onReady(function (success) {
                    var isFlyoutPresent = $("#globalMastheadFlyout").length > 0;
                    if (success && isFlyoutPresent) {
                        //if (!Base.isThirdParty()) {
                        HeaderFlyout.replaceCoreMetrics();
                        //}
                        HeaderFOBNav.bind();
                        HeaderFlyout.bind();
                        _this.removeHiddenClass();

                        $("div#globalMastheadCategoryMenu").addClass("macysDynFlyout");
                        $("div#globalMastheadCategoryMenu > ul").removeClass("nav").removeClass("nav-pills");
                        //ensure all FOB items show and links are uppercase
                        $("div#globalMastheadCategoryMenu > ul > li > a").css({
                            textTransform: "uppercase",
                            paddingRight: "0px",
                            paddingLeft: "0px"
                        });
                        _this.loadFont(function () {
                            HeaderFOBNav.distributeWidths();
                        });

                    } else {
                        $("div#globalMastheadCategoryMenu").removeClass("macysDynFlyout");
                        $("div#globalMastheadCategoryMenu > ul").addClass("nav").addClass("nav-pills");
                        _this.removeHiddenClass();
                        _this.loadFont(function () {
                            HeaderFOBNav.distributeWidths();
                        });
                    }
                    //dont bind events if this fails
                });

                HeaderFlyout.onOver(function () {
                    clearTimeout(tid);
                    //console.log("flyout over: toFlyoutIntent "+ toFlyoutIntent);
                    pauseOnMoveDetection = toFlyoutIntent = false;
                });

                HeaderFlyout.onOut(function (id) {
                    clearTimeout(tid);
                    tid = setTimeout(function () {
                        _this.pdfFixToggle();
                        HeaderFlyout.closeAll();
                        HeaderFOBNav.deselectOthers();
                    }, 400);
                });

                /*$("#globalMastheadSignout").click(function(e){
                    _this.logout(e);
                });*/
            }
            //start application
            HeaderFOBNav.init(HeaderFlyout.enabled());
        }
    };
});
