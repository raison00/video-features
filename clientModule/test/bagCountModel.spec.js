define(['backbone', 'jquery', 'underscore', 'bagModelTest'], function (backbone, $, _, bagCountModel) {
    describe('Bag count model', function () {
        var bagCountModeltest;
        beforeEach(function () {
            bagCountModeltest = new bagCountModel();
        });
        describe('#urlRoot', function () {

            it('should have the correct `urlRoot`', function () {

                expect(bagCountModeltest.urlRoot).toBe('/CE/api/order/v1/bags');
            });
        });
        describe('#urlUpdate ', function () {

            it('should have the correct `userID`', function () {

                bagCountModeltest.urlUpdate("12232");
                expect(bagCountModeltest.urlRoot).toBe('/CE/api/order/v1/bags?userId=12232');
            });
        });
    });
});