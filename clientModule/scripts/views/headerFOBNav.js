define('headerFOBNav', ['jquery', 'base'], function($, Base) {
    //when
    var fobCategoryIds = [],
        IS_TOUCH,
        FLYOUTS_ENABLED,
        fobListItems,
        CLIENT_Y = 0,
        MOUSEMOVE_VDIR,
        MAX_FLYOUT_COLUMNS = 4,
        readyCallback,
        onOverCallback,
        onOutCallback,
        onMoveCallback,
        channelOverride,
        mouseCoords,
        presstimeout;

    return {
        UP: "up",
        DOWN: "down",
        TOPNAV_CLASS: "macysDynFlyout",
        onReady: function(callback) {
            readyCallback = callback;
        },

        fetchFOBList: function() {
            var _this = this,
                base = Base.isThirdParty() ? (location.href.indexOf("https") > -1) ? "https://www.macys.com" : "https://www.macys.com" : "";

            var url = base + "/shop/topnav?application=" + (channelOverride || Base.getCurrentChannel())+"&stop_mobi=yes";

            $.ajax({
                url: url,
                type: 'GET',
                crossDomain: true,
                dataType: 'jsonp',
                jsonpCallback: 'flyoutCallback',
                cache: true,
                timeout: 2000,
                success: function(data, textStatus, xhr) {
                    var topLinks = Base.isThirdParty() ? Base.absoluteLinkatize(data.html, macysConfig.hostURL || "https://www.macys.com") : data.html;
                    _this.fetchFOBListSuccess(topLinks, textStatus, xhr);
                },
                error: function(xhr, textStatus, errorThrown) {
                    _this.fetchFOBListError(xhr, textStatus, errorThrown);
                }
            });
        },
        flyoutCallback: function(data, textStatus, xhr) {
            var topLinks = Base.isThirdParty() ? Base.absoluteLinkatize(data.html, macysConfig.hostURL || "https://www.macys.com") : data.html;
            _this.fetchFOBListSuccess(topLinks, textStatus, xhr);
        },

        //distribute topnav elements if more than 50px difference
        distributeWidths: function() {

            var ulWidth = $("header#globalMastheadContainer div#globalMastheadCategoryMenu > ul").width(),
                elementWidths = 0,
                totalElements = 0,
                padding = 0,
                margin = 0,
                adjMargin = 0,
                defaultPaddingPerSide = 5;

            //registry pages are duplicating entire header block
            //both dynamic header AND static header
            //this collection will account for that
            var collection = $("header#globalMastheadContainer").length > 1 ? $("header#globalMastheadContainer div#globalMastheadCategoryMenu > ul:not('.nav') > li") : $("header#globalMastheadContainer div#globalMastheadCategoryMenu > ul > li");

            collection.each(function(index) {
                var $el = $(this);
                elementWidths += $el.width();
                elementWidths += 10.5; //5px padding on right & left // UPDATE: increased below value by 0.5 for Mac Firefox fix
                totalElements++;
            });
            //add right margin to each except last one
            margin = Math.floor((ulWidth - elementWidths) / (totalElements - 1));

            if (margin < 0) {
                //reduce padding
                var paddingAdj = Math.ceil(((elementWidths - ulWidth) / totalElements) / 2);
                defaultPaddingPerSide = defaultPaddingPerSide - paddingAdj;

            } else {
                $("header#globalMastheadContainer div#globalMastheadCategoryMenu > ul > li").each(function(index) {
                    if (index < (totalElements - 1)) {
                        $(this).css("margin-right", margin + "px");
                    }
                });
            }

            $("header#globalMastheadContainer div#globalMastheadCategoryMenu > ul > li").css("padding-right", defaultPaddingPerSide + "px").css("padding-left", defaultPaddingPerSide + "px");
        },
        fetchFOBListSuccess: function(data, textStatus, xhr) {
            var _this = this;
            if (data.length > 0) {
                var menu = $("div#globalMastheadCategoryMenu");
                menu.html(data);
                setTimeout(function() {
                    fobListItems = $("div#globalMastheadCategoryMenu > ul > li");
                    readyCallback(true);
                }, 25);

            } else {
                readyCallback(false);
            }
        },
        getFOBSelectorId: function(id) {
            return Base.FLEX_LABEL_PREFIX + id;
        },
        fetchFOBListError: function(xhr, textStatus, errorThrown) {
            readyCallback(false);
        },
        //number will be passed in
        deselect: function(id) {
            var selector = "li#" + this.getFOBSelectorId(id);
            $(selector).removeClass("selected-flyout");
            if (Base.getIEVersion() < 10) {
                $(this).removeClass("flyout-iefix");
            }
        },
        //de-couple css class names from component
        deselectOthers: function(id, className) {
            var _this = this;
            if (className === undefined) {
                className = "selected-flyout";
            }
            if (id === undefined) {
                fobListItems.removeClass(className);
            } else {
                fobListItems.each(function(index) {
                    if (_this.getFOBSelectorId(id) != $(this).attr("id")) {
                        $(this).removeClass(className);
                    }
                });
            }
        },
        getCategoryIds: function(str) {
            var arr, i, ids = [], s, tmp;
            s = str || $("div#globalMastheadCategoryMenu > ul").html();
            s = s.toLowerCase();
            arr = s.match(/id=("|')?(f|F)lexlabel_[0-9]+("|')?/g); //IE 7 makes tags uppercase

            if (arr !== null && arr.length > 0) {
                for (i = 0; i < arr.length; i++) {
                    tmp = arr[i];
                    if (tmp[tmp.length - 1] === '"')
                        tmp = tmp.substring(0, tmp.length - 1);
                    var catId = tmp.substr(tmp.indexOf("_") + 1);
                    if (!isNaN(catId)) {
                        ids.push(eval(catId));
                    }
                }
            }
            return ids;
        },
        getVerticalMouseMoveDirection: function() {
            return MOUSEMOVE_VDIR || this.UP;
        },
        trackVerticalMouseDirection: function(event) {
            if (!FLYOUTS_ENABLED)
                return;

            //ignore horizontal movement
            if (event.clientY != CLIENT_Y) {
                MOUSEMOVE_VDIR = event.clientY < CLIENT_Y ? this.UP : this.DOWN;
                CLIENT_Y = event.clientY;
            }
            return;
        },
        init: function(flyoutsEnabled, override) {
            channelOverride = override || false;
            IS_TOUCH = Base.isTouch();
            FLYOUTS_ENABLED = flyoutsEnabled || false; //fallback to false

            if (!Base.isNavApp() || Base.isThirdParty()) {
                this.fetchFOBList();
            } else {
                readyCallback(this.getCategoryIds().length > 0);
            }
        },
        bind: function() {
            //don't bind events if Flyouts are NOT enabled
            if (!FLYOUTS_ENABLED)
                return;
            //Top FOB collection of <li>'s should already be on page
            fobListItems = $("div#globalMastheadCategoryMenu > ul > li");
            if (fobListItems.length === 0) {
                throw new Error("Top FOB navigation bar is empty.");
            } else {
                if (IS_TOUCH) {
                    this.bindTouchEvents();
                } else {
                    this.bindEvents();
                }
            }
        },
        bindTouchEvents: function() {
            var _this = this;
            //over & out
            fobListItems.click(function(e) {
                e.preventDefault();
                _this.doEnter($(this), onClickCallback);
            });
            //long press for TOUCH DEVICES; double tap work around
            $("div#globalMastheadCategoryMenu > ul > li > a").mouseup(function(e) {
                e.preventDefault();
                clearTimeout(presstimeout);
                return false;
            });
            $("div#globalMastheadCategoryMenu > ul > li > a").mousedown(function(e) {
                e.preventDefault();
                var _this = this;
                presstimeout = window.setTimeout(function() {
                    window.location.href = $(_this).attr("href");
                }, 1000);
                return false;
            });
        },
        onOver: function(cb) {
            onOverCallback = cb;
        },
        onOut: function(cb) {
            onOutCallback = cb;
        },
        onMove: function(cb) {
            onMoveCallback = cb;
        },
        onClick: function(cb) {
            onClickCallback = cb;
        },
        getMouseCoords: function() {
            return mouseCoords;
        },
        doEnter: function(obj, cb) {
            if (typeof cb === "function") {
                var id = Base.getSuffixId(obj.attr("id"));
                var totalFOBs = obj.context.parentNode.childElementCount;
                var selectedIndex = obj.index();
                var offset = obj.offset();
                cb(id, totalFOBs, selectedIndex, offset, obj);
            }
        },
        bindEvents: function() {
            var _this = this;
            fobListItems.bind('mouseover', function(e) {
                //_this.trackVerticalMouseDirection(e);
                mouseCoords = {
                    x: e.clientX,
                    y: e.clientY
                };
                onMoveCallback(e);
            });
            //over
            fobListItems.mouseenter(function(e) {
                _this.doEnter($(this), onOverCallback);
            });


            //out
            fobListItems.mouseleave(function(e) {
                var id = $(this).attr("id"),
                    numericID;
                numericID = Base.getSuffixId(id);
                onOutCallback(numericID);
            });
        }
    };
});
