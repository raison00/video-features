var request = require('superagent'),
    express = require('express'),
    chai = require('chai'),
    expect = chai.expect,
    should = chai.should(),
    server = require('../../app'),
    domainPathHelper = require('../../serverModule/DomainPath');


describe('DomainPath.js is functioning as expected for', function() {
    var app;
    beforeEach(function() {
        app = server();
    });
    afterEach(function() {
        app.close();
    });

    it('localhost', function(done) {
        // Stubbed test data
        var hostname = 'localhost';
        var expectedResult = 'localhost'
        // Calling the function via a stubbed hook
        var result = domainPathHelper.makeCookieDomainName(hostname);
        // Asserting expectations
        expect(result).to.equal(expectedResult)

        // Exiting test
        done();
    });

    it('Akamaized QA Environments', function(done) {
        var hostname = 'www.qa20codemacys.fds.com';
        var expectedResult = '.qa20codemacys.fds.com'
        // Calling the function via a stubbed hook
        var result = domainPathHelper.makeCookieDomainName(hostname);
        // Asserting expectations
        expect(result).to.equal(expectedResult)

        // Exiting test
        done();
    });


    it('non-Akamaized QA Environments', function(done) {
        // Stubbed test data
      
        var hostname = 'ce.qa20codemacys.fds.com';
        var expectedResult = '.qa20codemacys.fds.com'
        // Calling the function via a stubbed hook
        var result = domainPathHelper.makeCookieDomainName(hostname);
        // Asserting expectations
        expect(result).to.equal(expectedResult)

        // Exiting test
        done();
    });

    it('Desktop for Creative Environment', function(done) {

        var hostname = 'desktop.ce.mcomexternal135.fds.com';
        var expectedResult = '.mcomexternal135.fds.com'
        // Calling the function via a stubbed hook
        var result = domainPathHelper.makeCookieDomainName(hostname);
        // Asserting expectations
        expect(result).to.equal(expectedResult)

        // Exiting test
        done();
    });

    it('Desktop 2 for Creative Environment', function(done) {
      
        var hostname = 'desktop2.ce.mcomexternal135.fds.com';
        var expectedResult = '.mcomexternal135.fds.com'
        // Calling the function via a stubbed hook
        var result = domainPathHelper.makeCookieDomainName(hostname);
        // Asserting expectations
        expect(result).to.equal(expectedResult)

        // Exiting test
        done();
    });

});