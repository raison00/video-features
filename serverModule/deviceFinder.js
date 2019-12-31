var DomainName = require("./DomainPath");
exports.device = function(req, res, override) {
    if (req !== null && res !== null && req !== undefined && res !== undefined) {
        if (override !== undefined && override === "mobile" || override === "desktop" || override === "app") {
            return override
        } else {
            var deviceType = findDeviceType(req),
                domain = DomainName.makeCookieDomainName(req.hostname);
            if (deviceType === undefined) {
                // In case we can't detect the device, we will default to desktop
                return "desktop";
            }
            return deviceType;
        }

    } else {
        if (override !== undefined && override === "mobile" || override === "desktop" || override === "app") {
            return override
        } else {
            return "desktop";
        }
    }
}


function findDeviceType(ua) {
    var deviceType = ua.hostname,
        userAgent = ua.headers['user-agent'].toLowerCase();

    if (deviceType.indexOf("desktop.ce") === 0) {
        return "desktop";
    } else if (deviceType.indexOf("mobile.ce") === 0) {
        return "mobile";
    } else {

        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(userAgent)) {
            
            return "mobile";
        }
        
        return "desktop";
    }
}