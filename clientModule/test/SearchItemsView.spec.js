window.ENV_CONFIG = {
    mewServerAddress: "www.macys.com/"
};
define(['backbone', 'jquery', 'underscore', 'mobile_header_navigation', 'mobile_header_view', 'mobile_search'], function(backbone, $, _, MobileHeaderNavigation, MobileHeaderView, MobileSearch) {
    describe('Mobile Header Search', function() {
        var mobileheadersearch,
            mobileheadernavigation,
            mobileheaderview;

        beforeEach(function() {
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
            mobileheadersearch = new MobileSearch();
            mobileheadersearch.render()
        });
        afterEach(function() {
            document.body.removeChild(document.getElementById('HeaderContainer'));
            document.body.removeChild(document.getElementById('content'));
        });

        describe('View is constructed', function() {


            it('View should be defined', function() {
                expect(mobileheadersearch).toBeDefined();
            });
            it('View should be defined with fixtures', function() {
                expect(mobileheadersearch.el).toBeDefined();
                expect(mobileheadersearch.el.id).toEqual("mb-page-content-container");
            });

        });

        describe('Add clear button if text is entered', function() {
            it('input text entered', function() {
                mobileheadersearch.$el.find("#globalSearchInputField").val("test");
                mobileheadersearch.$el.find("#globalSearchInputField").on('input');
                mobileheadersearch.$el.find("#globalSearchInputField").trigger('input');
                expect(mobileheadersearch.$el.find("#mb-j-search-clear").hasClass('hide')).toEqual(false);
            });
            it('input text cleared', function() {
                mobileheadersearch.$el.find("#globalSearchInputField").val('');
                mobileheadersearch.$el.find("#globalSearchInputField").on('input');
                mobileheadersearch.$el.find("#globalSearchInputField").trigger('input');
                expect(mobileheadersearch.$el.find("#mb-j-search-clear").hasClass('hide')).toEqual(true);
            });
        });






    })
});