

function facebookShare(heading,subHeading,desc, picture, coremetric_tag) {
    require(['https://connect.facebook.net/en_US/sdk.js'], function() {
        if (!window.fbInit){
          FB.init({
            appId: ENV_CONFIG.CONFIG_FACEBOOK_APP_ID,
            version: 'v2.1',
            status: true,
            xfbml: false
          });
        }
        window.fbInit = true;
        shareURL = window.location.href,
        subHeading = subHeading || "",
        desc = desc || "",
        picture = picture || '',
        heading = heading || "",
        coremetric_tag = coremetric_tag || "ca-staticpages";

        FB.ui({
          method: 'feed',
          link: shareURL,
          caption: subHeading,
          description: desc,
          name: heading,
          display:'popup',
          picture: picture
        }, function() {
        });
      });

}

function twitterShare(heading, coremetric_tag) {
    shareURL = window.location.href,
        heading = heading || "",
        coremetric_tag = coremetric_tag || "ca-staticpages";
    cmCreatePageviewTag(coremetric_tag + ".share.twitter", coremetric_tag + "-share");
    windowPopup("https://twitter.com/intent/tweet/?text=" + heading + "&url=" + shareURL);
}

function pinInterestShare(heading, picture, coremetric_tag) {
    shareURL = window.location.href,
        picture = picture || '',
        heading = heading || "",
        coremetric_tag = coremetric_tag || "ca-staticpages";
    cmCreatePageviewTag(coremetric_tag + ".share.pinInterestShare", coremetric_tag + "-share");
    windowPopup("https://www.pinterest.com/pin/create/button/?url=" + shareURL + "&media=" + picture + "&description=" + heading);
}

function googleShare(coremetric_tag) {
    shareURL = window.location.href,
        coremetric_tag = coremetric_tag || "ca-staticpages";
    cmCreatePageviewTag(coremetric_tag + ".share.googleShare", coremetric_tag + "-share");
    windowPopup("https://plus.google.com/share?url=" + shareURL);
}


function windowPopup(url) {
    var width = 500,
        height = 300;
    // Calculate the position of the popup so
    // it’s centered on the screen.
    var left = (screen.width / 2) - (width / 2),
        top = (screen.height / 2) - (height / 2);

    window.open(
        url,
        "",
        "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,width=" + width + ",height=" + height + ",top=" + top + ",left=" + left
    );
}
