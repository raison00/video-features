define([
    'jquery'
], function($) {
    return {
        cookies: {
            onlineUid: 'macys_online_uid',
            onlineGuid: 'macys_online_guid',
            bagId: 'macys_bagid',
            bagGuid: 'macys_bagguid',
            FORWARDPAGE_KEY: {
                // should we encode the URL when setting the FORWARDPAGE_KEY cookie?
                encode: true
            }
        }
    }
});