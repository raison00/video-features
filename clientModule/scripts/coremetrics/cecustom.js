function cmCreateLinkClickTag(obj, name, pageId, href, hostingUrl, referingUrl) {
    var pageID = pageId || ((CEconfig.coremetricsValue === undefined) ? null : CEconfig.coremetricsValue.pageId) || null,
        pageType = ((CEconfig.coremetricsValue === undefined) ? null : CEconfig.coremetricsValue.pageType) || null;
    if (pageID == null) {
        pageID = cmGetDefaultPageID();
    }

    /* added the parameter for findtypeofpage function for getting custom pagetype */
     pageType = findTypeOfPage(pageType, CEconfig.coremetricsValue.overridePageType);

    if (href === undefined) {
        var cm_sp=" ",
            customCmPageId=CEconfig.coremetricsValue.customCmPageId,
            objHref = obj.href;
        /* added if statement for generating cm_sp string with custom pageID for cm_sp pageID */
        if(customCmPageId){
         cm_sp = "cm_sp=" + (/\.lp$/.test(customCmPageId) ? customCmPageId.slice(0, -3) : customCmPageId) + "-_-" + (/^ca-/.test(pageType) ? pageType.substring(3) : pageType) + "-_-" + name;
        } else{
         cm_sp = "cm_sp=" + (/\.lp$/.test(pageID) ? pageID.slice(0, -3) : pageID) + "-_-" + (/^ca-/.test(pageType) ? pageType.substring(3) : pageType) + "_-" + name;

        }

        href = objHref + (~objHref.indexOf("?") ? (/\?$/.test(objHref) ? "" : "&") : "?") + cm_sp;
    }
    pageID = findTypeOfPage(pageType) + pageID;
    cmCreateManualLinkClickTag(href, null, pageID);
}

function CEcmCreatePageviewTag(pageID, categoryID, searchString, searchResults, cm_ven, cm_cat, cm_pla, cm_ite, linkShareID, custID, refURL, attributes) {
    var pageID = pageID || ((CEconfig.coremetricsValue === undefined) ? null : CEconfig.coremetricsValue.pageId) || null,
        categoryID = categoryID || ((CEconfig.coremetricsValue === undefined) ? null : CEconfig.coremetricsValue.categoryID) || null,
        pageType = ((CEconfig.coremetricsValue === undefined) ? null : CEconfig.coremetricsValue.pageType) || null;
    if (pageID == null) {
        pageID = cmGetDefaultPageID();
    }
    pageID = findTypeOfPage(pageType) + pageID;
    categoryID = findTypeOfPage(pageType) + categoryID;
    cmCreatePageviewTag(pageID, categoryID, searchString, searchResults, cm_ven, cm_cat, cm_pla, cm_ite, linkShareID, custID, refURL, attributes);
}

function CEcmCreateTechPropsTag(pageID, categoryID, cm_ven, cm_cat, cm_pla, cm_ite, linkShareID, custID, refURL, attributes) {
    var pageID = pageID || CEconfig.coremetricsValue.pageId || null,
        categoryID = categoryID || CEconfig.coremetricsValue.categoryID || null,
        pageType = CEconfig.coremetricsValue.pageType || null;

    if (pageID == null) {
        pageID = br();
    }
    pageID = findTypeOfPage(pageType) + pageID;
    categoryID = findTypeOfPage(pageType) + categoryID;
    cmCreateTechPropsTagcmCreateTechPropsTag(pageID, categoryID, cm_ven, cm_cat, cm_pla, cm_ite, linkShareID, custID, refURL, attributes);
}


function CEcmCreateProductviewTag(productID, productName, categoryID, cm_ven, cm_cat, cm_pla, cm_ite, linkShareID, custID, refURL, cmCrossSell, totalReviewCount, avgRating, numberRatingsOnlyReviews, buyAgainPercentage, attributes) {
    var categoryID = categoryID || ((CEconfig.coremetricsValue === undefined) ? null : CEconfig.coremetricsValue.categoryID) || null,
        pageType = ((CEconfig.coremetricsValue === undefined) ? null : CEconfig.coremetricsValue.pageType) || null;
    categoryID = findTypeOfPage(pageType) + categoryID;

    CEcmCreateProductviewTag(productID, productName, categoryID, cm_ven, cm_cat, cm_pla, cm_ite, linkShareID, custID, refURL, cmCrossSell, totalReviewCount, avgRating, numberRatingsOnlyReviews, buyAgainPercentage, attributes)
}

function CEcmCreateBazaarViewTag(productID, productName, categoryID) {
    var categoryID = categoryID || ((CEconfig.coremetricsValue === undefined) ? null : CEconfig.coremetricsValue.categoryID) || null,
        pageType = ((CEconfig.coremetricsValue === undefined) ? null : CEconfig.coremetricsValue.pageType) || null;
    categoryID = findTypeOfPage(pageType) + categoryID;
    cmCreateBazaarViewTag(productID, productName, categoryID)
}

function findTypeOfPage(pageType, overridePageType) {
    var typeOfPage = "",
        typeOfPagePrefix = "";

    if (overridePageType){
        typeOfPage = pageType;
    } else if (pageType === "seo") {
        typeOfPage = "ca-contenthub-";
    } else if (pageType === "sitelet") {
        typeOfPage = "ca-sitelet-";
    } else if (pageType === "remove") {
        return "";
    } else if (pageType === "mew-enabled") {
        typeOfPage = "";
    } else {
        typeOfPage = "ca-staticpages-";
    }

    // Prepend for Macy's App or MEW
    var mobile = (/iphone|ipad|ipod|android|iemobile|WPDesktop|Windows Phone/i.test(navigator.userAgent.toLowerCase()));
    if (document.cookie.indexOf('ishop_app') > -1 ){
        typeOfPagePrefix = "MAPP_";
    } else if (mobile) {
        typeOfPagePrefix = "MEW_";
    }

    return typeOfPagePrefix + typeOfPage;
}

function CEcmCreateShopAction5Tag(productID, productName, productQuantity, productPrice, categoryID, MasterProductID, MasterProductName, MasterCatID, IsMaster, cmCrossSell, attributes) {

    var categoryID = categoryID || ((CEconfig.coremetricsValue === undefined) ? null : CEconfig.coremetricsValue.categoryID) || null,
        pageType = ((CEconfig.coremetricsValue === undefined) ? null : CEconfig.coremetricsValue.pageType) || null;
    categoryID = findTypeOfPage(pageType) + categoryID;
    cmCreateShopAction5Tag(productID, productName, productQuantity, productPrice, categoryID, MasterProductID, MasterProductName, MasterCatID, IsMaster, cmCrossSell, attributes);
}

function CEcmCreateUserErrorTag(pageID, categoryID, mMsgCode, mMsgType, mMsgClass, mMsgDesc, mServerName, mCloneName) {
    var pageID = pageID || CEconfig.coremetricsValue.pageId || null,
        categoryID = categoryID || CEconfig.coremetricsValue.categoryID || null,
        pageType = CEconfig.coremetricsValue.pageType || null;
    if (pageID == null) {
        pageID = cmGetDefaultPageID();
    }
    categoryID = findTypeOfPage(pageType) + categoryID;
    pageID = findTypeOfPage(pageType) + pageID;
    cmCreateUserErrorTag(pageID, categoryID, mMsgCode, mMsgType, mMsgClass, mMsgDesc, mServerName, mCloneName);
}

function CEcmCreateDelayedShopTag(productID, productName, productQuantity, productPrice, categoryID, cmReason, cmShipDays) {
    var categoryID = categoryID || CEconfig.coremetricsValue.categoryID || null,
        pageType = CEconfig.coremetricsValue.pageType || null;
    categoryID = findTypeOfPage(pageType) + categoryID;
    cmCreateDelayedShopTag(productID, productName, productQuantity, productPrice, categoryID, cmReason, cmShipDays);
}

