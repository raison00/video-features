require.config({
    "shim": {
        "underscore": {
            "exports": "_"
        },
         "jquerycookie": {
            "deps": [
                "jquery"
            ],
            "exports": "jquerycookie"
        },
        "jqueryui":{
            "deps": [
                "jquery"
            ]
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
                "eluminate",
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
        },
         "globals":{
           "deps":[
             "jquery"
           ]
        }

    },
    "paths": {
        "appConstants": "scripts/utils/appConstants",
        "autoCompleteModel": "scripts/models/autoCompleteModel",
        "autoSuggestView": "scripts/views/autoSuggestView",
        "backbone": "scripts/lib/backbone",
        "base": 'scripts/views/base',
        "cmcustom-mcom": "https://assets.macysassets.com/navapp/web20/assets/script/coremetrics/cmcustom",
        "cecustom": "scripts/coremetrics/cecustom",
        "cookie": "scripts/lib/jquery.cookie",
        "cvEqualTo": "scripts/cescripts/validation/customValidations/CvEqualTo",
        "domReady": 'scripts/lib/domReady',
        "DomainPath": "scripts/utils/DomainPath",
        "eluminate": "https://libs.coremetrics.com/v4.18.130/eluminate",
        "handlebars": "scripts/lib/handlebars",
        "jquery": "scripts/utils/jquerySupport",
        'jqueryui': 'scripts/lib/jquery-ui-1.10.2.custom',
        "jquerycookie": "scripts/lib/jquery.cookie",
        "requirejs": "scripts/lib/requirejs",
        "ResponsiveImageMaps": "scripts/utils/ResponsiveImageMaps",
        "modernizr": "scripts/utils/modernizr",
        "socialMedia": "scripts/utils/socialMediaIntegration",
        "templates": "scripts/template",
        "underscore": "scripts/lib/lodash",
        "webfont": "scripts/lib/webfont",
        "validationManager": 'scripts/cescripts/validation/ValidationManager',
        "inputMask": 'scripts/lib/jquery.mask',
        "formHandlerDisplay": 'scripts/cescripts/formHandler/FormHandlerDisplay',
        "formHandlerMain": 'scripts/cescripts/formHandler/FormHandlerMain',
        "formHandlerRecoveryTexts": 'scripts/cescripts/formHandler/FormHandlerRecoveryTexts',
        "formHandlerRules": 'scripts/cescripts/formHandler/FormHandlerRules',
        "formHandlerUtil": 'scripts/cescripts/formHandler/FormHandlerUtil',
        "formHandlerValidate": 'scripts/cescripts/formHandler/FormHandlerValidate',
        "validation": 'scripts/cescripts/validation/Validation',
        "validationFiles":'scripts/cescripts/validation',
        "logger": "scripts/utils/Logger",
        "globals":"https://www.macys.com/js/common/util/Globals"

    }
});

require(['domReady', 'base', 'ResponsiveImageMaps', 'modernizr', "handlebars", "templates", "socialMedia", "DomainPath","cecustom"], function(dom, Base, respIM) {
    
    if (window.location.href.indexOf('macys.com') > -1) {
        cmSetClientID("90067660", false, "www3.macys.com", "macys.com");
    }
    else {
        // Need to use the non-prod for CM Client ID
        cmSetClientID("80067660", false, "www3.macys.com", "macys.com");
    }


    $(document).ready(function() { 
        CEcmCreatePageviewTag();
        var $i = $('img[usemap]');
        if ($i.length > 0) {
            $.each($i, function(index, value) {
                $(this).on('mouseover', function() {
                    respIM.makeImageMapsResponsive($(this));
                });
                respIM.makeImageMapsResponsive($(this));
            });
            $('area').on('focus', function() {
                respIM.makeImageMapsResponsive($('img[usemap=#' + $('area').parent().attr('name') + ']'));
            });
        }

        Modernizr.addTest('IE', function () {
            return (!!navigator.userAgent.match(/Trident/) || !!navigator.userAgent.match(/MSIE /));
        });

        if (macysConfig.thirdParty === undefined) {
            macysConfig.hostURL= "//www" + makeCookieDomainName(window.location.hostname);
        }
        if (dom.dynamicHeaderIsReady !== undefined) {
            return;
        } else {
            dom.dynamicHeaderIsReady = true;
        }

        var USE_AB_TESTING = false,
            HeaderFlyoutKillSwitch = false;

        //access KILL SWITCHES HERE
        if (!Base.isThirdParty()) {
            HeaderFlyoutKillSwitch = typeof MACYS.topnav.killswitchFlyout == "string" ? eval(MACYS.topnav.killswitchFlyout) : true; //true means flyouts are enabled
        } else {
            HeaderFlyoutKillSwitch = true; //enable for third party sites
        }
        //disable flyouts if touchDevice AND killswitch is set to true(enabled)
        if (Base.isTouch() && HeaderFlyoutKillSwitch) {
            HeaderFlyoutKillSwitch = false;
        }

        if (CEconfig.coremetricsValue.formhandler) {
            // require(['formHandlerMain', ], function(FormHandler) {
            require(['formHandlerMain', 'cvEqualTo'], function(FormHandler, cvEqualTo) {
                var fh = new FormHandler("test-sweeps");
                fh.init({
                    useBlur: true,
                    rules: 'validationFiles/Rules', //must be strings
                    recoveryText: 'validationFiles/Messages', //must be strings
                    pageLevelHeader: 'The following error(s) have occurred',
                    onSubmitCallback: function(form){
                        console.log(form);
                        console.log('submit success');
                        submitSweeps('#test-sweeps');
                    }
                });
            });
        }
    });
});
