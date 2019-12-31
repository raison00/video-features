var DomainName = require("./../DomainPath"),
request = require('superagent');

exports.bagApi = function(req, res) {
    var reURL = req.url.replace("/CE", "");
    // api.macys.com/order/v1/bags?userId=2158802869
    reURL = reURL.replace("/api", "/api" + DomainName.makeCookieDomainName(req.hostname));
    var apiURL = "http:/" + reURL + "&bagCount=true";
        request
            .get(apiURL)
            .set('x-macys-webservice-client-id', process.env.apiKey)
            
            .set('Accept', 'application/json')
            .end(function(err, resp) {
                console.log(err);
                if (!err) {
                    res.status(200).json(resp.body);
                } else {
                    res.status(200).json({
                        error: err

                    });
                }
            });

};