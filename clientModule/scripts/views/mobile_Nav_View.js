define(['backbone', "handlebars", "templates","url-parser","DomainPath"], function(Backbone, Handlebars, Templates) {
    var NavView = Backbone.View.extend({
        el: "#mb-j-navigation-container",

        render: function() {
            var template = Templates["mobile_Header_Navigation"];
            $(this.el).html(template);
        }
    });
    Handlebars.registerHelper('getMewDomainURL', function() {
        return 'https://www'+makeCookieDomainName(window.location.hostname);
    });

    Handlebars.registerHelper('highlightNavItem', function(path, options) {
        var pathParam = $.url().attr('path');
        if (pathParam && pathParam === path) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    });
    return NavView;

});
