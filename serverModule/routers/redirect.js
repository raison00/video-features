var DomainName = require("./../DomainPath"),
    request = require('superagent');

exports.redirect = function (req, res) {
    // http://confluence5/display/CAPSA/AKREQ-CORS+Implementation+for+assets.macysassets.com
    //     prod: assets.macysassets.com
    //     qa code envs: assets.<envaname>.fdsassets.com 
    //     otherwise: assets.<envaname>.fds.com

    // Localhost should have mapping in the host file mapping 172.0.0.0 to FDS.COM to mitigate the CORS issues

    var hostName = req.headers.host.split('.com')[0] || req.headers.host;
    var urlPath = req.url

    if (hostName.indexOf('.macys') > -1 || hostName.indexOf('localhost.fds') > -1) {
        // Production and properly configured localhost
        // CORS is set to macys.com, which works locally with a CORS browser extension
        console.log('asdfasdfasdf')
        res.redirect('https://assets.macysassets.com' + urlPath);
    } else if (hostName.indexOf('codemacys') > -1) {
        // Stage 5 QA Environments
        res.redirect('https://assets.' + hostName + '.fdsassets.com' + urlPath);
    } else if (hostName === 'localhost') {
        // improperly configured localhost
        res.status(404).send('<h1>Please update your host file to inclue the following lines</h1><p>127.0.0.1 localhost.fds.com</p><p>127.0.0.1 localhostmacys.fds.com</p><h2>Then access the server via localhost.fds.com</h2>');
    } else {
        
        try {
            // clean the expected string as seen in creative environments
            // var hostName = 'http://desktop.ce.mcomexternal139.fds'
            var hostArr = hostName.split('.') || hostName;
            hostArr.shift(); //removes desktop
            hostArr.shift(); //removes ce
            hostArr = hostArr.join('.');
            hostArr === '' ? hostName : hostName = hostArr;
        }
        catch (e){
            res.send('<h1>Something broke</h1><p>The real hostname is: ' + hostName + '</p>');
        }
        // Creative QA Environments 
        // Presently HTTPS is not enabled in the creative environments, hence requesting this resource produces an error
        // This will not work due to the lack of SSL certs in creative environments
        res.redirect('https://assets.' + hostName + '.com' + urlPath);
        // As a work around we will be using the production version and setting the headers on the response 
        // Setting the header values here will not work because the root (index.html) is where header value that matters is set at
        // res.header("Access-Control-Allow-Origin", "*");
        // res.header("Access-Control-Allow-Headers", "X-Requested-With");
        // res.redirect('https://assets.macysassets.com' + urlPath);
        // request
        //     // .get('https:\\assets.' + hostName + '.com' + urlPath)
        //     .get('https://assets.macysassets.com/dyn_img/fonts/286ca836-0e48-43ba-9f12-8ba861fafeda.woff')            
        //     .set('Accept', 'application/font-woff')
        //     .end(function(err, resp) {
        //         console.log(resp);
        //         if (!err) {
        //             res.status(200).send(resp);
        //         } else {
        //             res.status(200).send(err);
        //         }
        //     });


    }

};