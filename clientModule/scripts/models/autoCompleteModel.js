define([
    'backbone',
    "underscore",
    "appConstants"
], function(Backbone, _, appConstants) {
    'use strict';

    var autoCompleteModel = Backbone.Model.extend({
        initialize: function() {
            _.bindAll(this, "urlUpdate");
        },
        urlRoot: appConstants.autoComplete,
        urlUpdate: function(prefix) {
            var url = this.urlRoot.split("?");
            this.urlRoot = url[0];

            if (appConstants.autoComplete === "/CE/autosuggest") {
                this.urlRoot = this.urlRoot + '?prefix=' + prefix;

            } else {
                 this.urlRoot = this.urlRoot + '?prefix=' + prefix+"&maxSuggestions=10&bypass_redirect=yes&shippingCountry=US";

            }

        }


    });

    return autoCompleteModel;
});