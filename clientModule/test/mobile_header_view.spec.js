define(['backbone', 'jquery', 'underscore','mobile_header_view','bagModelTest'], function(backbone, $, _,MobileHeaderView,bagCountModel) {
    describe('Mobile header', function() {
        var mobileheaderview,bagCountModeltest;
        beforeEach(function() {
            bagCountModeltest=new bagCountModel();
            //fixture.setBase('/public/test/fixtures');
            //this.fix=fixture.load('mobileheader.html')
            var fix = '<div id="HeaderContainer"></div>' +
                '<section id="content">' +
                '<div id="mw-region-main-inner">' +
                '<div id="mb-j-navigation-container"></div>' +
                '<div id="mb-j-main-content-container">' +
                '<div id="mb-page-content-container"></div> ' +

                '</div> ' +
                '</div>' +
                '</section>';
            document.body.insertAdjacentHTML(
                'afterbegin',
                fix);
           mobileheaderview = new MobileHeaderView({
                el: $("#HeaderContainer"),
                model:bagCountModeltest
            });
        });
        afterEach(function() {
            document.body.removeChild(document.getElementById('HeaderContainer'));
        });

        describe('View is constructed', function() {


            it('View should be defined', function() {
                expect(mobileheaderview).toBeDefined();
            });
            it('View should be defined with fixtures', function() {
                expect(mobileheaderview.el).toBeDefined();
                expect(mobileheaderview.el.id).toEqual("HeaderContainer");
            });

        });

        describe('View is rendered', function() {
            it('View is rendered', function() {
                expect(mobileheaderview.$el.find("#mb-page-wrapper")).toBeDefined();
            });
        });

        describe('View menu toggle', function() {
            it('View menu nav toggle functionality', function() {
            	mobileheaderview.$el.find("#mb-j-nav-button").click();
                expect( mobileheaderview.$el.find("#mb-j-nav-button").hasClass( 'jmennu-up' ) ).toEqual( true );
                expect( mobileheaderview.$el.find("#mb-j-nav-button-icon").hasClass( 'mb-icon-selectedMenuButton' ) ).toEqual( true );
            });
        });

         describe('View has bag count displayed if cookie is set', function() {
            it('bag count displayed functionality', function() {
            	expect(mobileheaderview.$el.find("#m-bag-count")).toBeDefined();
            });
        });



    })
});