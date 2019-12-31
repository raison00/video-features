//window.ENV_CONFIG={mewServerAddress:""};
//window.ENV_CONFIG.mewServerAddress="m.macys.com/"
//oct30
require.config({
    "shim": {
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
        "jqueryMenu": {
            "deps": [
                "jquery"
            ]
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
        },
        "cmcustom-mcom": {
            "deps": [
                "eluminate"
            ]
        },
        "cecustom": {
            "deps": [
                "cmcustom-mcom"
            ]
        },
        "socialMedia": {
            "deps": [
                "cmcustom-mcom"
            ]
        },
        "ResponsiveImageMaps": {
            "deps": [
                "jquery"
            ]
        },
        "modernizr": {
            "deps": [
                "jquery"
            ]
        }

    },
    "paths": {
        "appConstants": "scripts/utils/appConstants",
        "autoCompleteModel": "scripts/models/autoCompleteModel",
        "autoSuggestView": "scripts/views/autoSuggestView",
        "backbone": "scripts/lib/backbone",
        "config": "scripts/utils/config",
        "cecustom": "scripts/coremetrics/cecustom",
        "cookie": "scripts/lib/jquery.cookie",
        "cvEqualTo": "scripts/cescripts/validation/customValidations/CvEqualTo",
        "cmcustom-mcom": "https://assets.macysassets.com/navapp/web20/assets/script/coremetrics/cmcustom",
        "DomainPath": "scripts/utils/DomainPath",
        "eluminate": "https://libs.coremetrics.com/v4.18.130/eluminate",
        "fastclick": "scripts/lib/fastclick",
        "handlebars": "scripts/lib/handlebars",
        "localStorage": "scripts/utils/localStorage",
        "jquery": "scripts/utils/jquerySupport",
        "jqueryMenu": "scripts/lib/jquery.mmenu.min",
        "jquerycookie": "scripts/lib/jquery.cookie",
        "moment": "scripts/lib/moment",
        "requirejs": "scripts/lib/requirejs",
        "ResponsiveImageMaps": "scripts/utils/ResponsiveImageMaps",
        "modernizr": "scripts/utils/modernizr",
        "socialMedia": "scripts/utils/socialMediaIntegration",
        "templates": "scripts/template",
        "underscore": "scripts/lib/lodash",
        "url-parser": "scripts/lib/url-parser",
        "validationManager": 'scripts/cescripts/validation/ValidationManager',
        "inputMask": 'scripts/lib/jquery.mask',
        "formHandlerDisplay": 'scripts/cescripts/formHandler/FormHandlerDisplay',
        "formHandlerMain": 'scripts/cescripts/formHandler/FormHandlerMain',
        "formHandlerRecoveryTexts": 'scripts/cescripts/formHandler/FormHandlerRecoveryTexts',
        "formHandlerRules": 'scripts/cescripts/formHandler/FormHandlerRules',
        "formHandlerUtil": 'scripts/cescripts/formHandler/FormHandlerUtil',
        "formHandlerValidate": 'scripts/cescripts/formHandler/FormHandlerValidate',
        "validation": 'scripts/cescripts/validation/Validation',
        "validationFiles": 'scripts/cescripts/validation',
        "cmDataClientId": 'scripts/cescripts/cmClient',
        "logger": "scripts/utils/Logger",
        "globals":"https://www.macys.com/js/common/util/Globals"
    }
});
require(['backbone', 'handlebars', "ResponsiveImageMaps", "modernizr", "socialMedia", "cecustom"], function (Backbone, Handlebars, respIM) {
    
    if (window.location.href.indexOf('macys.com') > -1) {
        cmSetClientID("90067660", false, "www3.macys.com", "macys.com");
    }
    else {
        // Need to use the non-prod for CM Client ID
        cmSetClientID("80067660", false, "www3.macys.com", "macys.com");
    }

    
    $(document).ready(function () {
        CEcmCreatePageviewTag();

        //$(window).resize(function(){
        //$('[class*="small-"] img, [class*="block-grid-"] img').not('img.no-stretch').css('width', '100%');
        //}).trigger('resize');

        //respIM.makeImageMapsResponsive($('img[usemap=#' + $('area').parent().attr('name') + ']'));
        var $i = $('img[usemap]');
        if ($i.length > 0) {
            $.each($i, function (index, value) {
                $(this).on('mouseover', function() {
                respIM.makeImageMapsResponsive($(this));
                });
                respIM.makeImageMapsResponsive($(this));
            });
            $('area').on('focus', function () {
                respIM.makeImageMapsResponsive($('img[usemap=#' + $('area').parent().attr('name') + ']'));
            });
        }

        Modernizr.addTest('IE', function () {
            return (!!navigator.userAgent.match(/Trident/) || !!navigator.userAgent.match(/MSIE /));
        });

        
        // $('#mb-j-main-content-container').on('touchstart click', function (e) {
        //     $("body").removeClass("nav-toggle")
        // });

        //formhandler
        if (CEconfig.coremetricsValue.formhandler) {
            // require(['formHandlerMain', ], function(FormHandler) {
            require(['formHandlerMain', 'cvEqualTo'], function (FormHandler, cvEqualTo) {
                var fh = new FormHandler("test-sweeps");
                fh.init({
                    useBlur: true,
                    rules: 'validationFiles/Rules', //must be strings
                    recoveryText: 'validationFiles/Messages', //must be strings
                    pageLevelHeader: 'The following error(s) have occurred',
                    onSubmitCallback: function (form) {
                        console.log(form);
                        console.log('submit success');
                        submitSweeps('#test-sweeps');
                    }
                });
            });
        }
    });
})