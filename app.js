var express = require('express'),
    cors = require('cors'),
    app = express(),
    fs = require('fs'),
    path = require('path'),
    deviceType = require('./serverModule/deviceFinder'),
    cookieParser = require('cookie-parser'),
    expressHbs = require('express-handlebars'),
    request = require('superagent'),
    session = require('express-session'),
    DomainName = require("./serverModule/DomainPath"),
    cluster = require('cluster'),
    compress = require('compression'), // enabling gzip
    routers = {};



app.use(compress()); // enabling gzip, must be first middleware loaded
app.set('case sensitive routing', false);
app.use(cookieParser());


//set template path.
app.engine('hbs', expressHbs({
    extname: 'hbs',
    layoutsDir: __dirname + '/serverModule/expressTemplates/layouts',
    partialsDir: [__dirname + '/serverModule/expressTemplates/partials', __dirname + '/ce']
}));

app.set('view engine', 'hbs');

// set directory path
app.use('/ce/cemew', express.static(__dirname + '/clientModule'));
app.use('/ce/assets', express.static(__dirname + '/ce'));

//Loading routers using modular approach
routers.ce = require('./serverModule/routers/ceRouting');
routers.bag = require('./serverModule/routers/bagapi');
routers.stores = require('./serverModule/routers/storesApi');
routers.proxy = require('./serverModule/routers/postMethodProxyPassThrough');
routers.redirect = require('./serverModule/routers/redirect');
// routers.geo = require('./serverModule/routers/geolocate');

///////////////////////// bestsellers
routers.bestsellers = require('./serverModule/routers/bestsellers');

app.get("/", function (req, res) {
    res.status(200).send('<h1>Welcome to CE</h1>');
});

// api/order/v1
app.get("/CE/api/order/v1/bags", routers.bag.bagApi);
app.get("/CE/api/store/v2/stores", routers.stores.storesApi);
app.post("/CE/api/order/v1/bags", routers.proxy.passThrough);
// app.get("/CE/api/location", routers.geo.locate);
// redirect for the fonts being requested locally
app.get("/dyn_img/fonts/*", routers.redirect.redirect);

//////////////////////// bestsellers
app.get("/CE/api/bestsellers", routers.bestsellers.getBestSellers);

app.get('/CE/autosuggest', function (req, res) {
    var prefix = req.query.prefix,
        domain = DomainName.makeCookieDomainName(req.hostname);
    request
        .get("https://www" + domain + "/suggester?prefix=" + prefix + "&maxSuggestions=10&bypass_redirect=yes&shippingCountry=US")
        .set('Accept', 'application/json')
        .end(function (err, resp) {
            //console.log(err);
            if (!err) {
                res.status(200).json(resp.body);
            } else {
                // console.log(resp);
                res.status(200).json({
                    error: true
                });
            }
        });
});

app.get('/CE/404notFound', routers.ce.pageNotFound);
app.get('/CE/*', routers.ce.ceRouting);

// enable CORS
// app.use(cors());

app.listen(process.env.PORT || 5000, function () {
    console.log('Server listening on ', process.env.PORT || 5000);
});

var CreateServer = function () {
    return app.listen(3000);
};

module.exports = CreateServer;
