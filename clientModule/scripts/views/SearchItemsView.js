define(['jquery', 'backbone', "handlebars", "templates", "appConstants", "autoCompleteModel", "autoSuggestView", "DomainPath"], function ($, Backbone, Handlebars, Templates, AppConstants, autoCompleteModel, autoSuggestView) {
    'use strict';
    var SearchItemsView = Backbone.View.extend({
        el: "#mb-page-content-container",
        events: {
            "input #globalSearchInputField": "fetchSuggestionList",
            "keydown #globalSearchInputField": "handleSubmit",
            "click #m-search-go": "handleSubmit",
            'click #mb-j-search-clear': 'clearSearchField',
            'touchstart #mb-j-search-clear': 'clearSearchField',
        },

        initialize: function () {
            this.template = Templates["searchView"]();
            this.autosuggest = new autoSuggestView();
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
            if (!this.getCookie('ishop_app')) {
                this.$el.html(Templates["searchView"]());
            }
        },
        fetchSuggestionList: function () {
            var searchVal = $("#globalSearchInputField").val();
            if (searchVal.length > 0) {
                $("#mb-j-search-clear").removeClass("hide");
            } else {
                $("#mb-j-search-clear").addClass("hide");
            }
            this.autosuggestload();
        },

        handleFailure: function (model, response, xhr) {
            console.log(response);
        },

        handleSubmit: function (event) {

            if (event.keyCode == 13 || event.target.id == "m-search-go") {
                event.preventDefault();
                this.loadSearchPage($("#globalSearchInputField").val());
            }
        },

        loadSearchPage: function (keyWord) {
            keyWord = $.trim(keyWord);
            var MEW_SERVER_ADDRESS = "https://www" + makeCookieDomainName(window.location.hostname);
            // $(location).attr("href",MEW_SERVER_ADDRESS + AppConstants.RELATIVE_SEARCH_URL +
            //    "?keyword=" + encodeURIComponent(keyWord) + "&cm_kws_ac=" + encodeURIComponent(keyWord));
            window.location.href = MEW_SERVER_ADDRESS + AppConstants.RELATIVE_SEARCH_URL + "?keyword=" + encodeURIComponent(keyWord) + "&cm_kws_ac=" + encodeURIComponent(keyWord);
            return false;
        },

        clearSearchField: function () {
            $('#globalSearchInputField').val('');
            var searchTerms = $('#globalSearchInputField').val();
            $('#mb-j-search-clear').toggleClass('hide', searchTerms === '');
            $('#mb-j-autocomplete-container').html('');
        },
        autosuggestload: function (event) {
            // call subview
            this.autosuggest.getAutosuggest($('#globalSearchInputField').val(), "mobile");
        }
    });

    Handlebars.registerHelper('autoCompleteList', function (searchSuggestion, prefix) {
        var matchRegex = new RegExp('\\b' + prefix.replace(/([()[\]{}*+.$^\\|?])/g, '\\$1'), 'gim');
        return new Handlebars.SafeString(searchSuggestion.replace(matchRegex, '<span class="match">$&</span>'));
    });

    return SearchItemsView;
});