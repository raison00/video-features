var allTestFiles = [];
var TEST_REGEXP = /(spec|test)\.js$/i;

// Get a list of all the test files to include
Object.keys(window.__karma__.files).forEach(function(file) {
    if (TEST_REGEXP.test(file)) {
        // Normalize paths to RequireJS module names.
        // If you require sub-dependencies of test files to be loaded as-is (requiring file extension)
        // then do not normalize the paths
        var normalizedTestModule = file.replace(/^\/base\/|\.js$/g, '');
        allTestFiles.push(normalizedTestModule);
    }
});

require.config({
    // Karma serves files under /base, which is the basePath from your config file
    baseUrl: '/base',

    shim: {
        "jqueryMenu": {
            "deps": [
                "jquery"
            ],
            "exports": "jqueryMenu"
        },
        "jquerycookie": {
            "deps": [
                "jquery"
            ],
            "exports": "jquerycookie"
        },
        "url-parser": {
            "deps": [
                "jquery"
            ]
        },
        "handlebars": {
            "exports": "Handlebars"
        },
        "underscore": {
            "exports": "_"
        },
        "backbone": {
            "deps": [
                "underscore",
                "jquery"
            ],
            "exports": "Backbone"
        },
        "templates": {
            "deps": [
                "handlebars"
            ],
            "exports": "templates"
        }
    },
    paths: {
        "autoCompleteModel": "clientModule/scripts/models/autoCompleteModel",
        "autoSuggestView":"clientModule/scripts/views/autoSuggestView",
        "backbone": "clientModule/scripts/lib/backbone",
        "handlebars": "clientModule/scripts/lib/handlebars",
        "jquery": "clientModule/scripts/lib/jquery",
        "requirejs": "clientModule/scripts/lib/requirejs",
        "underscore": "clientModule/scripts/lib/lodash",
        "fastclick": "clientModule/scripts/lib/fastclick",
        "url-parser": "clientModule/scripts/lib/url-parser",
        "moment": "clientModule/scripts/lib/moment",
        "jqueryMenu": "clientModule/scripts/lib/jquery.mmenu.min",
        "jquerycookie": "clientModule/scripts/lib/jquery.cookie",
        "bagModelTest":"clientModule/scripts/models/bagCountModel",
        "mobile_header_view": "clientModule/scripts/views/mobile_header_view",
        "mobile_header_navigation": "clientModule/scripts/views/mobile_Nav_View",
        "mobile_search": "clientModule/scripts/views/SearchItemsView",
        "mobile_footer": "clientModule/scripts/views/mobile_footer_view",
        "localStorage": "clientModule/scripts/utils/localStorage",
        "templates": "clientModule/scripts/template",
        "appConstants": "clientModule/scripts/utils/appConstants",
        "config":"clientModule/scripts/utils/config",
        "DomainPath":"clientModule/scripts/utils/DomainPath"
    },

    // dynamically load all test files
    deps: allTestFiles,

    // we have to kickoff jasmine, as it is asynchronous
    callback: window.__karma__.start
});