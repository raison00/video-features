define(['jquery', 'backbone', "handlebars", "templates", "appConstants", "autoCompleteModel", "DomainPath"], function ($, Backbone, Handlebars, Templates, AppConstants, autoCompleteModel) {
    'use strict';

    var autoSuggestView = Backbone.View.extend({
        el: "#mb-j-autocomplete-container",
        initialize: function () {
            this.model = new autoCompleteModel();
        },
        clearTimer: function () {
            clearTimeout(this.timer);
            this.timer = -1;
        },
        getAutosuggest: function (searchText, deviceType) {
            var template;
            var that = this;
            this.clearTimer();
            this.timer = setTimeout(_.bind(function () {
                if (searchText !== "" && searchText.length >= 2) {
                    this.model.urlUpdate(searchText);
                    this.model.fetch({
                        success: function (data) {
                            var modelVal = that.model.attributes;
                            if (deviceType === 'desktop') {
                                modelVal.desktop = true;
                                modelVal.styleattr = that.desktopStyles();
                                that.renderModel(modelVal);
                                that.clearDesktop();
                            } else {
                                modelVal.mobile = true;
                                that.renderModel(modelVal);
                            }
                        }
                    });
                } else {
                    this.clearResults();
                }
            }, this), 250);
        },
        renderModel: function (modelAttributes) {
            var template = Templates["autoSuggestTemplate"](modelAttributes);
            $("#mb-j-autocomplete-container").html(template);
        },
        clearResults: function () {
            $('#mb-j-autocomplete-container').html('');
        },
        clearDesktop: function () {
            $("#ui-id-1").mouseleave(function () {
                //     $('#mb-j-autocomplete-container').html('');
            });
            $("#mb-j-autocomplete-container").mouseleave(function () {
                //     $('#mb-j-autocomplete-container').html('');
            });
        },
        desktopStyles: function () {
            var contwidth = $("#globalSearchInputField").css("width"),
                conttop = $("#globalSearchInputField").height() + $("#globalSearchInputField").offset().top + 2,
                contleft = $("#globalSearchInputField").offset().left;
            //$(".ui-menu-item").css("width",contwidth+"px");
            return "width: " + contwidth + "!important; top: " + conttop + "px; left: " + contleft + "px;";
        }
    });

    Handlebars.registerHelper('autoCompleteList', function (searchSuggestion, prefix) {
        var matchRegex = new RegExp('\\b' + prefix.replace(/([()[\]{}*+.$^\\|?])/g, '\\$1'), 'gim');
        return new Handlebars.SafeString(searchSuggestion.replace(matchRegex, '<span class="match">$&</span>'));
    });

    Handlebars.registerHelper('autoCompleteListdesktop', function (searchSuggestion, prefix) {
        var matchRegex = new RegExp('\\b' + prefix.replace(/([()[\]{}*+.$^\\|?])/g, '\\$1'), 'gim');
        var suggestArr = searchSuggestion.split(matchRegex);
        for (var i = 0; i < suggestArr.length; i++) {
            suggestArr[i] = '<span class="ui-keyword-highlight">' + suggestArr[i] + '</span>';
        }

        var resultstr = suggestArr.join(prefix);
        return new Handlebars.SafeString(resultstr);
    });

    return autoSuggestView;
});