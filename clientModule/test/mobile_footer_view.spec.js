define(['backbone', 'jquery', 'underscore', 'mobile_footer','jquerycookie'], function(backbone, $, _, mobileFooter) {
    describe('Mobile Footer', function() {
        var mobilefooter;
        beforeEach(function() {
            var fix = '<footer id="footer"></footer>';
            document.body.insertAdjacentHTML(
                'afterbegin',
                fix);
            mobilefooter=new mobileFooter();
        });
        afterEach(function() {
            document.body.removeChild(document.getElementById('footer'));
        });

        describe('View is constructed', function() {


            it('View should be defined', function() {
                expect(mobilefooter).toBeDefined();
            });
            it('View should be defined with fixtures', function() {
                expect(mobilefooter.el).toBeDefined();
                expect(mobilefooter.el.id).toEqual("footer");
            });

        });

        describe('SignIn link',function(){
            it('shown if signin cookie is false',function(){
                 expect( mobilefooter.$el.find("#m-footer-link-simple-signin")).toBeDefined();
                 $.cookie('SignedIn',1);
                 
            });
            it('not shown if signin cookie is true',function(){
                 var mobilefooterTest=new mobileFooter();
                 expect( mobilefooterTest.$el.find("#m-footer-link-simple-signout")).toBeDefined();
                 $.cookie('SignedIn',0);
                 
            });

        });

    })
});