define('trafficSplitter', ["jquery", "cookie"], function($, Cookie) {
    var DEFAULT_SPLIT_DATA_URL = 'http://netstorage.macys.com/netstorage/ABTesting/@CAMPAIGN@.json',
        HTTPS_SPLIT_DATA_URL = 'https://secure-netstorage.macys.com/netstorage/ABTesting/@CAMPAIGN@.json',
        SPLIT_DATA_URL = "",
        MISCGCS = "MISCGCs",
        EXP = "_exp";

    //initCB add global function to handle hard-coded 'initCB' in jsonp response  
    //static callback function defined in trafficSplitter json configuration file on netstorage  
    var initCB = function() {
        window.splitCB = function(json) {
            return json;
        };
    };

    //getTestValue uses native javascript randomization to 'pick' value from array  
    //some simple validations happen here, weights must add up to 1  
    //arr can not be larger than 100  
    //arr: [value:'foo',weight:.5},{value:'bar',weight:.5}]  
    //return weighted value  

    var getTestValue = function(arr) {
        var v = 0,
            i = 0;
        for (i = 0; i < arr.length; i++) {
            v += arr[i].weight;
        }
        if (arr.length > 100) {
            throw new Error("MacysTester.getTestValue(arr) is invalid. arr length can not be greater than 100.");
        }
        if (v != 1) {
            throw new Error("MacysTester.getTestValue(arr) is invalid. arr element weights must equal 1");
        } else {
            if (arr.length == 1) {
                return arr[0].value;
            } else {
                var key = Math.round(Math.random() * 99);
                var flattened = this.flatten(arr);
                return flattened[key];
            }
        }
    };
    var flatten = function(arr) {
        var newArr = [];
        for (var i = 0; i < arr.length; i++) {
            var num = arr[i].weight * 100;
            while (num > 0) {
                newArr.push(arr[i].value);
                num--;
            }
        }
        return newArr;
    };


    var getSplitData = function(campaignName, callback, timeout) {
        this.initCB();
        if (!campaignName || !callback) {
            throw new Error("TrafficSplitter.getSplitData failure. Invalid inputs.");
        }
        var to = timeout || 1000,
            _this = this;
        var u = this.getSplitDataUrl(campaignName);
        $.ajax({
            url: u,
            type: 'GET',
            dataType: 'jsonp',
            timeout: to,
            jsonp: false,
            jsonpCallback: "splitCB",
            success: function(json) {
                callback(true, json);
            },
            error: function(x, t, m) {
                callback(false, {
                    error: t + ",message:" + m.message + " loading: " + u
                });
            }
        });
    };

    var getSplitDataUrl = function(campaignName, testURL) {
        if (!campaignName) {
            throw new Error("TrafficSplitter.getSplitDataUrl failure, invalid or missing 'campaignName'.");
        }
        var url = testURL || window.location.href;
        return url.indexOf("https") > -1 ? HTTPS_SPLIT_DATA_URL.replace("@CAMPAIGN@", campaignName) : DEFAULT_SPLIT_DATA_URL.replace("@CAMPAIGN@", campaignName);
    };
    //inputs  
    //cookieName:String  
    //expirationDate:object (Date object)  
    //json:object traffic splitter config json response  
    var applyABTestLogic = function(cookieName, expirationDate, json, defaultValue) {
        if (!cookieName || !expirationDate || !json || (typeof expirationDate != "object") || defaultValue === undefined) {
            throw new Error("TrafficSplitter.applyABTestLogic failure. Invalid inputs. applyABTestLogic(cookieName, expirationDate, json, defaultValue)");
        }
        var today = new Date(),
            exp = new Date(),
            gcExpDateStr = Cookie.get(cookieName + EXP, MISCGCS),
            cookieValue = Cookie.get(cookieName, MISCGCS),
            value = "";


        if (today > expirationDate) {
            //clean up group cookie
            Cookie.remove(cookieName, MISCGCS); //key/value
            Cookie.remove(cookieName + EXP, MISCGCS); //expiration date
            return defaultValue;
        }

        //clone our date object w/o help of jquery
        //extend MISCGCs expiration date by 1 month  
        //to prevent group cookie expiring before campaign expiration date
        exp.setMonth(expirationDate.getMonth() + 1);
        exp.setFullYear(expirationDate.getFullYear());
        exp.setDate(expirationDate.getDate());

        //no campaign cookie set
        if (!cookieValue) {
            value = this.getTestValue(json) || defaultValue;

            //push out group cookie expiration to match this, so it does not expire bofore
            Cookie.setExpires(exp.toUTCString());
            Cookie.set(cookieName, value, MISCGCS); //key/value
            Cookie.set(cookieName + EXP, expirationDate.toUTCString(), MISCGCS); //expiration date
        } else {
            //we're supporting the ability to extend campaign
            var gcExpDate = new Date(gcExpDateStr);
            if (expirationDate > gcExpDate) {
                Cookie.set(cookieName + EXP, expirationDate.toUTCString(), MISCGCS);
            }
            value = cookieValue;

        }

        return value;
    };

    return {
        initCB: initCB,
        getTestValue: getTestValue,
        flatten: flatten,
        getSplitData: getSplitData,
        getSplitDataUrl: getSplitDataUrl,
        applyABTestLogic: applyABTestLogic
    };
});