define(['backbone', "handlebars", "templates", "jqueryMenu", "jquerycookie"], function (Backbone, Handlebars, templates, $Menu) {
    var MobileHeaderView = Backbone.View.extend({
        initialize: function () {
            this.render();
            this.getUser();

        },
        getCookie: function (cookieName) {
            var cookieArray = document.cookie.split('; ');
            for (var i = 0; i < cookieArray.length; i++) {
                if (cookieArray[i].split('=')[0] === cookieName) {
                    return cookieArray[i].split('=')[1];
                }
            }
            return false;
        },
        render: function () {
            var template = templates["mobile_header_template"];
            if (!this.getCookie('ishop_app')) {
                this.$el.html(template());
            }
        },
        events: {
            "click #mb-j-nav-button": "handleGolbalMenuNav",
            "click #mb-j-search-clear": "clearSearchTextbox"
        },
        getUser: function () {
            var userId = $.cookie("macys_online_uid");

            if (userId) {
                this.model.urlUpdate(userId);
                var _this = this;
                this.model.fetch({
                    success: function () {
                        _this.displayBagCount(_this.model.BagCount())
                    }
                });

            } else {
                this.genarateCountImage(0);
            }

        },

        genarateCountImage: function (bagCount) {
            var canvas = $("#m-bag-count")[0];
            if (canvas) {
                var context = canvas.getContext("2d");
                var strokeWidth = 2;
                var centerX = canvas.width / 2;
                var centerY = canvas.height / 2;
                var radius = canvas.width / 2 - strokeWidth - 1;

                context.beginPath();
                context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
                context.fillStyle = "#000";
                context.fill();
                context.lineWidth = strokeWidth;
                context.strokeStyle = "#aaa";
                context.stroke();
                context.closePath();
                context.font = (bagCount > 99) ? "bold 13px Arial" : "bold 16px Arial";
                context.fillStyle = "white";
                context.textAlign = "center";
                context.textBaseline = "middle";
                context.fillText(bagCount, canvas.width / 2, canvas.height / 2);
            } else {
                // console.log('There is no canvas');
                // This is not an error condition, we are rendering for the App
            }
        },

        displayBagCount: function (count) {
            var bagCount = count;

            if (bagCount >= 0) {
                this.genarateCountImage(bagCount);
            }
        },
        initCategoryToggle: function () {
            $('nav#menu').mmenu();
        },
        handleGolbalMenuNav: function () {

            this.menuToggle();

            if ($('#mb-j-nav-button').hasClass('jmennu-up')) {
                $("#mb-j-nav-button").removeClass('jmennu-up');
            } else {
                if ($("html").hasClass("mm-opening")) {
                    $('nav#menu').mmenu();
                    $('nav#menu').trigger("close.mm");
                }
                $("#mb-j-nav-button").addClass("jmennu-up");
            }
            navToggle();

        },
        menuToggle: function () {
            var menuButton = $('#mb-j-nav-button-icon');

            if (menuButton.length == 0) {
                menuButton = $('#mb-j-nav-button');
            }

            menuButton.toggleClass('mb-icon-selectedMenuButton');
            menuButton.toggleClass('mb-icon-unselectedMenuButton');
        },
    });
    var navToggle = function () {
        $("body").toggleClass("nav-toggle");
        heightEqualizer();
    };

    var heightEqualizer = function () {
        var pageHeight = window.innerHeight;
        var regionMainHeight = pageHeight - $('#mb-region-header').outerHeight();
        $('#mw-region-main-inner').css("min-height", regionMainHeight);
        if ($("body").hasClass("nav-toggle")) {

        } else {
            if (!$("body").hasClass("modal-visible")) {
                $('#mb-page-wrapper').css("height", "");
                $('#mw-region-main-inner').css("height", "");
            }
        }
    };

    Handlebars.registerHelper('mewUrl', function (urlPath) {
        var secureUrl = 'https://www' + makeCookieDomainName(window.location.hostname);
        return secureUrl;
    });
    Handlebars.registerHelper('mewServerAddress', function (urlPath) {
        return 'https://www' + makeCookieDomainName(window.location.hostname);
    });

    return MobileHeaderView;
})