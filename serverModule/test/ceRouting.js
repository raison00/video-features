var request = require('superagent'),
    express = require('express'),
    chai = require('chai'),
    expect = chai.expect,
    should = chai.should(),
    server = require('../../app'),
    deviceType = require('../../serverModule/deviceFinder'),
    helpers = require('../../serverModule/routers/ceRouting');

describe('Verifying ceRouting.js is functioning as expected for', function() {
    var app;
    beforeEach(function() {
        app = server();
    });
    afterEach(function() {
        app.close();
    });

    it('localhost desktop Helpers', function(done) {
        // Stubbed test data
        var stubbedRequest = {hostname: "localhost", headers:{host:"localhost"}};
        var device = 'desktop';
        var expectedResult = {  domainUrl: 'https://wwwlocalhost',
                                imageUrl: '/ce/assets',
                                imageUrlAssets: 'http://assets.mpre-03.tbe.zeus.fds.com/dyn_img/creativepages',
                                assetsServer: '//assets.macysassets.com',
                                agnosticDomainUrl: '//wwwlocalhost' } 

        // Calling the function via a stubbed hook
        var result = helpers.unitTestingHook(stubbedRequest, device).helpers;
        // Asserting expectations
        expect(result.domainUrl(stubbedRequest, device)).to.equal(expectedResult.domainUrl);
        expect(result.imageUrl(stubbedRequest, device)).to.equal(expectedResult.imageUrl);
        expect(result.imageUrlAssets(stubbedRequest, device)).to.equal(expectedResult.imageUrlAssets);
        expect(result.assetsServer(stubbedRequest, device)).to.equal(expectedResult.assetsServer);
        expect(result.agnosticDomainUrl(stubbedRequest, device)).to.equal(expectedResult.agnosticDomainUrl);
        // Exiting test
        done();
    });

    it('localhost mobile Helpers', function(done) {
        // Stubbed test data
        var stubbedRequest = {hostname: "localhost", headers:{host:"localhost"}};
        var device = 'mobile';
        var expectedResult = {  domainUrl: 'https://wwwlocalhost',
                                imageUrl: '/ce/assets',
                                imageUrlAssets: 'http://assets.mpre-03.tbe.zeus.fds.com/dyn_img/creativepages',
                                assetsServer: '//assets.macysassets.com',
                                agnosticDomainUrl: '//wwwlocalhost' } 

        // Calling the function via a stubbed hook
        var result = helpers.unitTestingHook(stubbedRequest, device).helpers;
        // Asserting expectations
        expect(result.domainUrl(stubbedRequest, device)).to.equal(expectedResult.domainUrl);
        expect(result.imageUrl(stubbedRequest, device)).to.equal(expectedResult.imageUrl);
        expect(result.imageUrlAssets(stubbedRequest, device)).to.equal(expectedResult.imageUrlAssets);
        expect(result.assetsServer(stubbedRequest, device)).to.equal(expectedResult.assetsServer);
        expect(result.agnosticDomainUrl(stubbedRequest, device)).to.equal(expectedResult.agnosticDomainUrl);
        // Exiting test
        done();
    });

    it('Akamai QA desktop Helpers', function(done) {
        // Stubbed test data
        var stubbedRequest = {hostname: "www.qa12codemacys.fds.com", headers:{host:"www.qa12codemacys.fds.com"}};
        var device = 'desktop';
        var expectedResult = {  domainUrl: 'https://www.qa12codemacys.fds.com',
                                imageUrl: '/ce/assets',
                                imageUrlAssets: 'https://assets.macysassets.com/dyn_img/creativepages',
                                assetsServer: '//assets.qa12codemacys.fdsassets.com',
                                agnosticDomainUrl: '//www.qa12codemacys.fds.com' } 

        // Calling the function via a stubbed hook
        var result = helpers.unitTestingHook(stubbedRequest, device).helpers;
        // Asserting expectations
        expect(result.domainUrl(stubbedRequest, device)).to.equal(expectedResult.domainUrl);
        expect(result.imageUrl(stubbedRequest, device)).to.equal(expectedResult.imageUrl);
        expect(result.imageUrlAssets(stubbedRequest, device)).to.equal(expectedResult.imageUrlAssets);
        expect(result.assetsServer(stubbedRequest, device)).to.equal(expectedResult.assetsServer);
        expect(result.agnosticDomainUrl(stubbedRequest, device)).to.equal(expectedResult.agnosticDomainUrl);
        // Exiting test
        done();
    });

    it('Akamai QA mobile Helpers', function(done) {
        // Stubbed test data
        var stubbedRequest = {hostname: "www.qa12codemacys.fds.com", headers:{host:"m.qa12codemacys.fds.com"}};
        var device = 'mobile';
        var expectedResult = {  domainUrl: 'https://www.qa12codemacys.fds.com',
                                imageUrl: '/ce/assets',
                                imageUrlAssets: 'https://assets.macysassets.com/dyn_img/creativepages',
                                assetsServer: '//assets.qa12codemacys.fdsassets.com',
                                agnosticDomainUrl: '//www.qa12codemacys.fds.com' } 

        // Calling the function via a stubbed hook
        var result = helpers.unitTestingHook(stubbedRequest, device).helpers;
        // Asserting expectations
        expect(result.domainUrl(stubbedRequest, device)).to.equal(expectedResult.domainUrl);
        expect(result.imageUrl(stubbedRequest, device)).to.equal(expectedResult.imageUrl);
        expect(result.imageUrlAssets(stubbedRequest, device)).to.equal(expectedResult.imageUrlAssets);
        expect(result.assetsServer(stubbedRequest, device)).to.equal(expectedResult.assetsServer);
        expect(result.agnosticDomainUrl(stubbedRequest, device)).to.equal(expectedResult.agnosticDomainUrl);
        // Exiting test
        done();
    });

    it('non-Akamai QA desktop Helpers', function(done) {
        // Stubbed test data
        var stubbedRequest = {hostname: "ce.qa12codemacys.fds.com", headers:{host:"ce.qa12codemacys.fds.com"}};
        var device = 'desktop';
        var expectedResult = {  domainUrl: 'https://www.qa12codemacys.fds.com',
                                imageUrl: '/ce/assets',
                                imageUrlAssets: 'https://assets.macysassets.com/dyn_img/creativepages',
                                assetsServer: '//assets.qa12codemacys.fdsassets.com',
                                agnosticDomainUrl: '//www.qa12codemacys.fds.com' } 

        // Calling the function via a stubbed hook
        var result = helpers.unitTestingHook(stubbedRequest, device).helpers;
        // Asserting expectations
        expect(result.domainUrl(stubbedRequest, device)).to.equal(expectedResult.domainUrl);
        expect(result.imageUrl(stubbedRequest, device)).to.equal(expectedResult.imageUrl);
        expect(result.imageUrlAssets(stubbedRequest, device)).to.equal(expectedResult.imageUrlAssets);
        expect(result.assetsServer(stubbedRequest, device)).to.equal(expectedResult.assetsServer);
        expect(result.agnosticDomainUrl(stubbedRequest, device)).to.equal(expectedResult.agnosticDomainUrl);
        // Exiting test
        done();
    });

    it('non-Akamai QA mobile Helpers', function(done) {
        // Stubbed test data
        var stubbedRequest = {hostname: "ce.qa12codemacys.fds.com", headers:{host:"ce.qa12codemacys.fds.com"}};
        var device = 'mobile';
        var expectedResult = {  domainUrl: 'https://www.qa12codemacys.fds.com',
                                imageUrl: '/ce/assets',
                                imageUrlAssets: 'https://assets.macysassets.com/dyn_img/creativepages',
                                assetsServer: '//assets.qa12codemacys.fdsassets.com',
                                agnosticDomainUrl: '//www.qa12codemacys.fds.com' } 

        // Calling the function via a stubbed hook
        var result = helpers.unitTestingHook(stubbedRequest, device).helpers;
        // Asserting expectations
        expect(result.domainUrl(stubbedRequest, device)).to.equal(expectedResult.domainUrl);
        expect(result.imageUrl(stubbedRequest, device)).to.equal(expectedResult.imageUrl);
        expect(result.imageUrlAssets(stubbedRequest, device)).to.equal(expectedResult.imageUrlAssets);
        expect(result.assetsServer(stubbedRequest, device)).to.equal(expectedResult.assetsServer);
        expect(result.agnosticDomainUrl(stubbedRequest, device)).to.equal(expectedResult.agnosticDomainUrl);
        // Exiting test
        done();
    });

    it('Creative Environment desktop Helpers', function(done) {
        // Stubbed test data
        var stubbedRequest = {hostname: "desktop.ce.mcre-05.tbe.zeus.fds.com", headers:{host:"desktop.ce.mcre-05.tbe.zeus.fds.com"}};
        var device = 'desktop';
        var expectedResult = {  domainUrl: 'https://www.mcre-05.tbe.zeus.fds.com',
                                imageUrl: '/ce/assets',
                                imageUrlAssets: 'https://assets.mcre-05.tbe.zeus.fds.com/dyn_img/creativepages',
                                assetsServer: '//assets.mcre-05.tbe.zeus.fds.com',
                                agnosticDomainUrl: '//www.mcre-05.tbe.zeus.fds.com' } 

        // Calling the function via a stubbed hook
        var result = helpers.unitTestingHook(stubbedRequest, device).helpers;
        // Asserting expectations
        expect(result.domainUrl(stubbedRequest, device)).to.equal(expectedResult.domainUrl);
        expect(result.imageUrl(stubbedRequest, device)).to.equal(expectedResult.imageUrl);
        expect(result.imageUrlAssets(stubbedRequest, device)).to.equal(expectedResult.imageUrlAssets);
        expect(result.assetsServer(stubbedRequest, device)).to.equal(expectedResult.assetsServer);
        expect(result.agnosticDomainUrl(stubbedRequest, device)).to.equal(expectedResult.agnosticDomainUrl);
        // Exiting test
        done();
    });

    it('Creative Environment mobile Helpers', function(done) {
        // Stubbed test data
        var stubbedRequest = {hostname: "mobile.ce.mcre-05.tbe.zeus.fds.com", headers:{host:"mobile.ce.mcre-05.tbe.zeus.fds.com"}};
        var device = 'NOT USED IN THE ROUTER HERE';
        var expectedResult = {  domainUrl: 'https://www.mcre-05.tbe.zeus.fds.com',
                                imageUrl: '/ce/assets',
                                imageUrlAssets: 'https://assets.mcre-05.tbe.zeus.fds.com/dyn_img/creativepages',
                                assetsServer: '//assets.mcre-05.tbe.zeus.fds.com',
                                agnosticDomainUrl: '//www.mcre-05.tbe.zeus.fds.com' } 

        // Calling the function via a stubbed hook
        var result = helpers.unitTestingHook(stubbedRequest, device).helpers;
        // Asserting expectations
        expect(result.domainUrl(stubbedRequest, device)).to.equal(expectedResult.domainUrl);
        expect(result.imageUrl(stubbedRequest, device)).to.equal(expectedResult.imageUrl);
        expect(result.imageUrlAssets(stubbedRequest, device)).to.equal(expectedResult.imageUrlAssets);
        expect(result.assetsServer(stubbedRequest, device)).to.equal(expectedResult.assetsServer);
        expect(result.agnosticDomainUrl(stubbedRequest, device)).to.equal(expectedResult.agnosticDomainUrl);
        // Exiting test
        done();
    });

    it('Google Cloud Environment Helpers', function(done) {
        // Stubbed test data
        var stubbedRequest = {hostname: "mcom-frictionr.c4d.devops.fds.com", headers:{host:"mcom-frictionr.c4d.devops.fds.com"}};
        var device = 'NOT USED IN THE ROUTER HERE';
        var expectedResult = {  domainUrl: 'https://mcom-frictionr.c4d.devops.fds.com',
                                imageUrl: '/ce/assets',
                                imageUrlAssets: 'https://assets.macysassets.com/dyn_img/creativepages',
                                assetsServer: '//assets.macysassets.com',
                                agnosticDomainUrl: '//mcom-frictionr.c4d.devops.fds.com' } 

        // Calling the function via a stubbed hook
        var result = helpers.unitTestingHook(stubbedRequest, device).helpers;
        // Asserting expectations
        expect(result.domainUrl(stubbedRequest, device)).to.equal(expectedResult.domainUrl);
        expect(result.imageUrl(stubbedRequest, device)).to.equal(expectedResult.imageUrl);
        expect(result.imageUrlAssets(stubbedRequest, device)).to.equal(expectedResult.imageUrlAssets);
        expect(result.assetsServer(stubbedRequest, device)).to.equal(expectedResult.assetsServer);
        expect(result.agnosticDomainUrl(stubbedRequest, device)).to.equal(expectedResult.agnosticDomainUrl);
        // Exiting test
        done();
    });

    it('Zeus Environment Helpers', function(done) {
        // Stubbed test data
        var stubbedRequest = {hostname: "www.mcom-163.tbe.zeus.fds.com", headers:{host:"www.mcom-163.tbe.zeus.fds.com"}};
        var device = 'desktop';
        var expectedResult = {  domainUrl: 'https://www.mcom-163.tbe.zeus.fds.com',
                                imageUrl: '/ce/assets',
                                imageUrlAssets: 'https://assets.mcom-163.tbe.zeus.fds.com/dyn_img/creativepages',
                                assetsServer: '//assets.mcom-163.tbe.zeus.fds.com',
                                agnosticDomainUrl: '//www.mcom-163.tbe.zeus.fds.com' } 

        // Calling the function via a stubbed hook
        var result = helpers.unitTestingHook(stubbedRequest, device).helpers;
        // Asserting expectations
        expect(result.domainUrl(stubbedRequest, device)).to.equal(expectedResult.domainUrl);
        expect(result.imageUrl(stubbedRequest, device)).to.equal(expectedResult.imageUrl);
        expect(result.imageUrlAssets(stubbedRequest, device)).to.equal(expectedResult.imageUrlAssets);
        expect(result.assetsServer(stubbedRequest, device)).to.equal(expectedResult.assetsServer);
        expect(result.agnosticDomainUrl(stubbedRequest, device)).to.equal(expectedResult.agnosticDomainUrl);
        // Exiting test
        done();
    });
});