define([
    'backbone',
    "underscore"
], function(Backbone, _) {
    'use strict';

    var bagModel = Backbone.Model.extend({
        initialize: function() {
            _.bindAll(this, "urlUpdate");
            _.bindAll(this, "BagCount");
        },
        urlRoot: '/CE/api/order/v1/bags',
        urlUpdate: function(userId) {
            this.urlRoot = this.urlRoot + '?userId=' + userId;
        },
        BagCount: function() {
            if (this.get("bag") !== undefined) {
                if (this.get("bag").hasOwnProperty("bagSummary") && this.get("bag").bagSummary.hasOwnProperty("itemCount")) {
                    return this.get("bag").bagSummary.itemCount;
                } else {
                    return 0;
                }
            } else {
                return 0;
            }

        }
    });

    return bagModel;
});