define('headerFlyout', ["jquery", "base"], function($, Base) {
    var IS_TOUCH = false,
        DEFAULT_COLUMNS = 4,
        MAX_FLYOUT_COLUMNS = DEFAULT_COLUMNS,
        DEFAULT_FLYOUT_COLUMN_WIDTH = 225,
        FLYOUT_COLUMN_WIDTH = DEFAULT_FLYOUT_COLUMN_WIDTH,
        FLYOUT_LAST_COLUMN_EXTRA_SPACE = 0,
        DEFAULT_FLYOUT_COLUMN_LEFT_PADDING = 12,
        FLYOUT_COLUMN_LEFT_PADDING = DEFAULT_FLYOUT_COLUMN_LEFT_PADDING,
        DEFAULT_FLYOUT_COLUMN_WIDTHS = ['100%', '100%', '47%', '30%', '23.25%', '18%'],
        COLUMN_WIDTHS = DEFAULT_FLYOUT_COLUMN_WIDTHS,
        DEFAULT_FLYOUTS_ENABLED = true,
        USE_FLYOUT = DEFAULT_FLYOUTS_ENABLED,
        readyCallback,
        onOverCallback,
        onOutCallback,
        flyoutAlignment = Base.ALIGN_BOTTOM,
        channelOverride,
        flyoutRequestUrl, /*used for testing only*/
        PROTOCOL = "https://";




    return {
        DEFAULT_FLYOUTS_ENABLED: DEFAULT_FLYOUTS_ENABLED,
        DEFAULT_COLUMNS: DEFAULT_COLUMNS,
        DEFAULT_FLYOUT_COLUMN_LEFT_PADDING: DEFAULT_FLYOUT_COLUMN_LEFT_PADDING,
        DEFAULT_FLYOUT_COLUMN_WIDTH: DEFAULT_FLYOUT_COLUMN_WIDTH,
        getFlyoutRequestUrl: function() {
            return flyoutRequestUrl;
        },
        setMaxFlyoutColumns: function(num) {
            MAX_FLYOUT_COLUMNS = num || DEFAULT_COLUMNS;
        },
        setFlyoutColumnWidth: function(num) {
            FLYOUT_COLUMN_WIDTH = num || DEFAULT_FLYOUT_COLUMN_WIDTH;
        },
        setFlyoutColumnLeftPadding: function(num) {
            FLYOUT_COLUMN_LEFT_PADDING = num || DEFAULT_FLYOUT_COLUMN_LEFT_PADDING;
        },
        setFlyoutColumnWidths: function(arr) {
            FLYOUT_COLUMN_WIDTHS = typeof arr === "object" && typeof arr.length === "number" ? arr : DEFAULT_FLYOUT_COLUMN_WIDTHS;
        },
        enabled: function() {
            return USE_FLYOUT;
        },
        disable: function() {
            USE_FLYOUT = false;
        },
        enable: function() {
            USE_FLYOUT = true;
        },
        getEdgeCoords: function(id, edge) {
            var sel = this.getFlyoutSelectorId(id);
            var obj = $(sel);
            var coords = {
                v1: {},
                v2: {}
            };
            //flyout does not exist
            if (obj.length == 0) return false;
            //flyout is not visible
            if (obj.css("display") == "none") return false;
            if (edge == Base.TOP) {
                coords.vert2 = {
                    x: obj.offset().left,
                    y: obj.offset().top
                };
                coords.vert3 = {
                    x: obj.offset().left + obj.width(),
                    y: obj.offset().top
                };
            }
            return coords;
        },
        closeAll: function() {
            if ($("div.flyout-on").length > 0) {
                $("div.flyout-on").addClass("flyout-off");
                $("div.flyout-on").removeClass("flyout-on");
            }
        },
        close: function(id) {
            var fid = this.getFlyoutSelectorId(id);
            var flyoutObj = $(fid);
            flyoutObj.removeClass("flyout-on");
            flyoutObj.addClass("flyout-off");
        },
        getRightAlignment: function(columns, topNavLeftPosition) {
            if (columns > MAX_FLYOUT_COLUMNS)
                throw new Error("header.getRightAlignment Failed! Columns argument has exceeded MAXIMUM.");

            var w = FLYOUT_COLUMN_WIDTH * columns;
            var p = FLYOUT_COLUMN_LEFT_PADDING * columns;
            var offset = ((MAX_FLYOUT_COLUMNS * FLYOUT_COLUMN_WIDTH) + (MAX_FLYOUT_COLUMNS * FLYOUT_COLUMN_LEFT_PADDING)) - (w + p)
            return topNavLeftPosition + offset;
        },
        /*
        http://mingle/projects/seo/cards/3548
        OLD LOGIC :: DOES NOT SUPPORT VARIABLE NUMBER OF TOPNAV ITEMS

        Placement       Current Category        1 column        2 columns       3-4 columns
        FOB 1           FOR THE HOME            left            left            left
        FOB 2           BED & BATH              with FOB        with FOB        left
        FOB 3           WOMEN                   with FOB        with FOB        left
        FOB 4           MEN                     with FOB        with FOB        left
        FOB 5           JUNIORS                 with FOB        with FOB        left
        FOB 6           KIDS                    with FOB        with FOB        left
        FOB 7           BEAUTY                  with FOB        with FOB        right
        FOB 8           SHOES                   with FOB        right           right
        FOB 9           HANDBAGS & ACCESSORIES  with FOB        right           right
        FOB 10          JEWELRY & WATCHES       right           right           right
        FOB 11          SALE                    right           right           right

        selectedIndex is zero based index


        NEW :: UPDATED 4 JUNE 2013

        The follow variables are required to calculate flyout left position;
        Flyout megamenu will be positioned based on topnav items index
        LOGIC

        * left of center FOB items selected *
            if FOB_SELECTED_ITEM_INDEX < (FOB_TOTAL_ITEMS/2)

                if FOB_SELECTED_ITEM_LEFT > FLYOUT_MIDPOINT
                    FLYOUT_LEFT = (TOPNAV_WIDTH - FLYOUT_WIDTH) * (FOB_SELECTED_ITEM_INDEX/TOTAL_FOB_ITEMS)
                else
                    FLYOUT_LEFT = TOPNAV_LEFT

        * right of center FOB items selected *
            else
                if (FOB_SELECTED_ITEM_LEFT + FOB_SELECTED_ITEM_WIDTH) - TOPNAV_WIDTH) < (FLYOUT_LEFT + FLYOUT_MIDPOINT)
                    FLYOUT_LEFT =

        TOPNAV_WIDTH
        FOB_LEFT
        FLYOUT_LEFT
        FLYOUT_WIDTH

        //ulOffset = $("div#globalMastheadCategoryMenu ul").offset()

        //align left
        //if selectedIndex == 0 || (selectedFOBWidth/2 + ulOffset) < (FlyoutWidth/2 + ulOffset)



        //align right
        //else if selectedIndex == totalFOB-1 || (selectedFOBWidth/2) > (flyoutWidth/2)+ + ((ulWitdh-flyoutWIdth)+ulOffsetLeft)


        //else
        //center align


        */
        //(flyout.width(),selectedIndex,fobOffset)
        getLeftPosition: function(flyoutWidth, selectedIndex, fobOffsetLeft, totalFOBs, fobWidth) {
            var ulOffsetLeft = $("#globalMastheadCategoryMenu > ul").offset().left;
            var ulWidth = $("#globalMastheadCategoryMenu > ul").width();
            var fobMid = fobWidth / 2;
            var flyoutMid = flyoutWidth / 2;


            //align left
            if ((fobMid + fobOffsetLeft) < (flyoutMid + ulOffsetLeft)) {
                return ulOffsetLeft;
            }
            //align right
            else if ((fobMid + fobOffsetLeft) > (ulOffsetLeft + (ulWidth - flyoutWidth) + flyoutMid)) {
                return ulOffsetLeft + (ulWidth - flyoutWidth);
            }
            //center over FOB midpoint
            else {
                return fobOffsetLeft - (flyoutMid - fobMid);
            }
        },
        init: function(categoryIDs, alignment, override) {
            flyoutAlignment = alignment || Base.ALIGN_BOTTOM;
            channelOverride = override || false;
            IS_TOUCH = Base.isTouch() || false;
            if ((!Base.isNavApp() && USE_FLYOUT) || Base.isThirdParty()) {
                this.fetchFlyouts(categoryIDs || []);
            } else {
                readyCallback(true);
            }
            return true;
        },
        bind: function() {
            if (!IS_TOUCH) {
                this.bindEvents();
            }
            //touch will toggle flyout with clicks, do not bind mouse events
        },
        bindEvents: function() {
            var _this = this;
            $("div.subnav").mouseenter(function(e) {
                onOverCallback($(this));
            });

            $("div.subnav").mouseleave(function(e) {
                var obj = $(this),
                    id = Base.getSuffixId(obj.attr("id")); //numeric portion only flyout_XXXX
                onOutCallback(id);
            });
        },
        hideExtraColumns: function(flyout) {
            flyout.find("div div").each(function(index) {
                if (index >= MAX_FLYOUT_COLUMNS) {
                    $(this).css("display", "none");
                }
            });
        },
        adjustFlyoutWidth: function(flyout, columns) {
            var width = columns * FLYOUT_COLUMN_WIDTH; //column width per spec
            var padding = columns * FLYOUT_COLUMN_LEFT_PADDING; //column left padding per spec
            var w = (width + padding + FLYOUT_LAST_COLUMN_EXTRA_SPACE) + "px";


            flyout.css("width", w);
            flyout.find("div div").css("width", COLUMN_WIDTHS[columns]);

            var lastColumn = flyout.find("div div:last-child");
            if (lastColumn.has("img").length > 0) {
                lastColumn.css("background", "none").css("padding-left", "0px").css("width", (FLYOUT_COLUMN_WIDTH + FLYOUT_COLUMN_LEFT_PADDING + FLYOUT_LAST_COLUMN_EXTRA_SPACE) + "px");
            } else {
                lastColumn.css("width", (FLYOUT_COLUMN_WIDTH + FLYOUT_LAST_COLUMN_EXTRA_SPACE) + "px");
            }
            return true;
        },
        //flyoutObj, totalFOBs, selectedIndex, offset, cols, fobWidth
        adjustFlyoutPosition: function(flyout, totalFOBs, selectedIndex, fobOffset, columns, fobWidth) {
            if (flyoutAlignment === Base.ALIGN_BOTTOM) {
                var left = this.getLeftPosition(flyout.width(), selectedIndex, fobOffset.left, totalFOBs, fobWidth); //this.getLeftPosition(totalFOBs,selectedIndex,fobOffset.left,columns);
                flyout.css("left", left + "px");
            }
            //add other alignments here if NEEDED ...RIGHT, LEFT, TOP
        },
        fetchFlyouts: function(categoryIDs) {
            var i = 0,
                tmpStr = "",
                tmp;
            if (categoryIDs == undefined || categoryIDs.length == 0)
                throw new Error("HeaderFlyout.fetchFlyouts(ids) failed! ids are empty.");
            if (typeof categoryIDs.push == "undefined")
                throw new Error("HeaderFlyout.fetchFlyouts(ids) failed! ids must be an array.");
            var _this = this,
                base = Base.isThirdParty() ? (location.href.indexOf("https") > -1) ? "https://www.macys.com" : "https://www.macys.com" : "";

            flyoutRequestUrl = base + "/shop/flyout?application=" + (channelOverride || Base.getCurrentChannel());


            for (i = 0; i < categoryIDs.length; i++) {
                tmp = categoryIDs[i];
                if (typeof tmp != "number") {
                    if (tmp.match(/[^[0-9]/).length > 0)
                        throw new Error("HeaderFlyout.fetchFlyouts(ids) failed! id in ids is not valid id: " + tmp);
                    else
                        tmpStr += tmp;
                } else {
                    tmpStr += tmp;
                    if (i < categoryIDs.length - 1)
                        tmpStr += ",";
                }
            }
            flyoutRequestUrl += "&categoryIds=" + tmpStr;


            //var url = "https://realtime-shopping.herokuapp.com/jsonp-test";

            $.ajax({
                url: flyoutRequestUrl,
                type: 'GET',
                crossDomain: true,
                dataType: 'jsonp',
                jsonpCallback: 'flyoutCallback',
                cache: true,
                timeout: 2000,
                success: function(data, textStatus, xhr) {
                    var contents = Base.isThirdParty() ? Base.absoluteLinkatize(data.html, macysConfig.hostURL||"https://www.macys.com") : data.html;
                    _this.flyoutsLoadedSuccess(contents, textStatus, xhr);
                },
                error: function(xhr, textStatus, errorThrown) {
                    _this.flyoutsLoadedError(xhr, textStatus, errorThrown);
                }
            });
            return true;
        },
        flyoutsLoadedSuccess: function(data, textStatus, xhr) {
            var topnav = $("#globalMastheadCategoryMenu"),
                _this = this;


            if (!~data.indexOf("Flyout_")) {
                readyCallback(false);
            } else {
                $("body").append("<div id='globalMastheadFlyout'></div>");
                setTimeout(function() {
                    $("div#globalMastheadFlyout").html(data);
                    readyCallback(true);
                }, 50);
            }
        },
        flyoutsLoadedError: function(xhr, textStatus, errorThrown) {
            readyCallback(false);
        },
        getFlyoutSelectorId: function(numericID) {
            if (typeof numericID != "number" || !numericID)
                throw new Error("header.getFlyoutSelectorId() failed! Required number is invalid or missing.");

            return "div#globalMastheadFlyout > div#Flyout_" + numericID;
        },
        open: function(id, totalFOBs, selectedIndex, offset, fobWidth) {
            var fid = this.getFlyoutSelectorId(id);
            var flyoutObj = $(fid);
            var cols = flyoutObj.find("div div").length;
            if (cols > MAX_FLYOUT_COLUMNS) {
                cols = MAX_FLYOUT_COLUMNS;
                this.hideExtraColumns(flyoutObj);
            }

            this.adjustFlyoutWidth(flyoutObj, cols);

            this.adjustFlyoutPosition(flyoutObj, totalFOBs, selectedIndex, offset, cols, fobWidth);


            flyoutObj.removeClass("flyout-off");
            flyoutObj.addClass("flyout-on");
        },
        onReady: function(callback) {
            readyCallback = callback;
        },
        onOver: function(callback) {
            onOverCallback = callback;
        },
        onOut: function(callback) {
            onOutCallback = callback;
        },

        replaceCoreMetrics: function() {
            $("div#globalMastheadCategoryMenu>ul>li").each(function(index) {
                var category_name = $(this).text();
                category_name = $.trim(category_name);
                category_name = category_name.replace(/ - /g, "-");
                category_name = category_name.replace(/ /g, "-");
                category_name = category_name.toLowerCase();
                category_name = category_name.replace(/'/g, "%27");
                category_name = encodeURIComponent(category_name);

                $("div#Flyout_" + Base.getSuffixId($(this).attr("id"))).find("a").each(
                    function(index) {
                        $(this).attr("href", $(this).attr("href").replace("FYtrackingBreadcrumb", category_name));
                    }
                );
            });
        }
    }
});
