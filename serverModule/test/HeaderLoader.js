var request = require('superagent'),
    express = require('express'),
    chai = require('chai'),
    expect = chai.expect,
    should = chai.should(),
    server = require('../../app'),
    deviceType = require('../../serverModule/deviceFinder');

describe('Check express routing functionality', function() {
    var app;
    beforeEach(function() {
        app = server();
    });
    afterEach(function() {
        app.close();
    });
    it('responds to /', function(done) {
        request.get('http://localhost:3000/').end(function(err, res) {
            console.log(err);
            //expect(err).to.eql(null);
            expect(res.status).to.equal(200);

            done();
        });
    });

    it('response if campaign folder exists', function(done) {
        request.get('http://localhost:3000/ce/pagenotfound/404notFound').end(function(err, res) {
            console.log(err);
           // expect(err).to.eql(null);
            expect(res.status).to.equal(200);
            
            done();
        });
    });

    it('if campaign folder does not exists should redirect to default folder', function testSlash(done) {
        request.get('http://localhost:3000/ce/campaign/test').end(function(err, res) {
           // expect(err).to.eql(null);
            expect(res.status).to.equal(200);
            done();
        });
    });
    it('if campaign folder exists but sub file is missing then it should redirect to default folder', function testSlash(done) {
        request.get('http://localhost:3000/ce/campaign/default/test').end(function(err, res) {
            //expect(err).to.eql(null);
            expect(res.status).to.equal(200);
            done();
        });
    });


});

describe('Check device detection functionality', function() {
    var app;
    beforeEach(function() {
        app = server();
    });
    afterEach(function() {
        app.close();
    });
   // it('device detect override functionality testcase', function(done) {
   //      request.get('http://localhost:3000/ce/pagenotfound/404notFound?override=mobile').set('Accept', 'application/vnd.burgers.api+json')
   //          .query("override=mobile")
   //          .end(function(err, res) {
   //              var reqParam = res.request.qs,
   //              queryParam=res.request.qsRaw;
   //              var device = deviceType.device(null, null, queryParam[0].split("=")[1]);
   //              //expect(err).to.eql(null);
   //              expect(device).to.eql(queryParam[0].split("=")[1]);
   //              expect(res.status).to.equal(200);
   //              done();
   //          });
   //  });
    it('device detect with empty parameters', function(done) {
        request.get('http://localhost:3000/ce/pagenotfound/404notFound').end(function(err, res) {
            var device = deviceType.device();
            //expect(err).to.eql(null);
            expect(device).to.eql("desktop");
            expect(res.status).to.equal(200);
            done();
        });
    });




   /* it('device detect with mobile device', function(done) {
        var req = {
            headers: {
                "user-agent": "Mozilla/5.0 (Linux; U; Android 4.0.3; ko-kr; LG-L160L Build/IML74K) AppleWebkit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30"
            }
        };
        var res = {
            cookie: function(name, value, opt) {

            }
        };
        var device = deviceType.device(req, res);
        expect(device).to.eql("mobile");
        done();
    });
    it('device detect with Desktop', function(done) {

        var req = {
            headers: {
                "user-agent": "Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0)"
            }
        };
        var res = {
            cookie: function(name, value, opt) {

            }
        };
        var device = deviceType.device(req, res);
        expect(device).to.eql("desktop");
        done();

    });*/
});