define(['handlebars'], function(Handlebars) {

this["Templates"] = this["Templates"] || {};

this["Templates"]["autoSuggestTemplate"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n<ul class=\"mb-autocomplete-container\">\n    ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.SUGGESTION), {hash:{},inverse:self.noop,fn:self.programWithDepth(2, program2, data, depth0),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</ul>\n";
  return buffer;
  }
function program2(depth0,data,depth1) {
  
  var buffer = "", stack1, options;
  buffer += "\n    <li>\n        <a href=\"/shop/search?keyword="
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "&cm_kws_ac="
    + escapeExpression(((stack1 = (depth1 && depth1.prefix)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" class=\"mb-select-autocomplete\" data-kwac=\""
    + escapeExpression(((stack1 = (depth1 && depth1.prefix)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n            <div class=\"select\">\n                ";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.autoCompleteList || (depth0 && depth0.autoCompleteList)),stack1 ? stack1.call(depth0, depth0, (depth1 && depth1.prefix), options) : helperMissing.call(depth0, "autoCompleteList", depth0, (depth1 && depth1.prefix), options)))
    + "\n            </div>\n        </a>\n    </li>\n    ";
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n<ul class=\"ui-autocomplete ui-front ui-menu ui-widget ui-widget-content ui-corner-all\" id=\"ui-id-1\" tabindex=\"0\" style=\" ";
  if (stack1 = helpers.styleattr) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.styleattr); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n    ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.SUGGESTION), {hash:{},inverse:self.noop,fn:self.programWithDepth(5, program5, data, depth0),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</ul>\n";
  return buffer;
  }
function program5(depth0,data,depth1) {
  
  var buffer = "", stack1, options;
  buffer += "\n    <li class=\"ui-menu-item\" role=\"presentation\">\n        <a href=\"/shop/search?keyword="
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "&cm_kws_ac="
    + escapeExpression(((stack1 = (depth1 && depth1.prefix)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" id=\"ui-id-71\" class=\"ui-corner-all\" tabindex=\"-1\">\n            <div class=\"suggestion\">";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.autoCompleteListdesktop || (depth0 && depth0.autoCompleteListdesktop)),stack1 ? stack1.call(depth0, depth0, (depth1 && depth1.prefix), options) : helperMissing.call(depth0, "autoCompleteListdesktop", depth0, (depth1 && depth1.prefix), options)))
    + "</div>\n        </a>\n    </li>\n    ";
  return buffer;
  }

  stack1 = helpers['if'].call(depth0, (depth0 && depth0.mobile), {hash:{},inverse:self.program(4, program4, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  });

this["Templates"]["footerView"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  return "\n            <a id=\"m-footer-link-simple-signout\" class=\"m-j-cm-link\" href=\"/\">Sign Out</a>\n          ";
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            <a id=\"m-footer-link-simple-signin\" class=\"m-j-cm-link\" href=\"";
  if (stack1 = helpers.secureUrl) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.secureUrl); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "/account/signin\">Sign In</a>\n          ";
  return buffer;
  }

  buffer += "<section id=\"m-footer-container\" class=\"simple\">\n    <div id=\"m-footer-simple\">\n      <ul id=\"m-footer-links-simple\">\n        <li>\n          ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.signedIn), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </li>\n        <li><a id=\"m-footer-link-simple-contact\" class=\"m-j-cm-link\" href=\"";
  if (stack1 = helpers.CUSTOMER_SERVICE_CONTACT_US) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.CUSTOMER_SERVICE_CONTACT_US); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">Contact Us</a></li>\n        <li><a id=\"m-footer-link-simple-desktop\" class=\"m-j-cm-link\" href=\"";
  if (stack1 = helpers.DESKTOP_VERSION_URL) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.DESKTOP_VERSION_URL); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">Desktop Version</a></li>\n      </ul>\n    </div>\n</section>";
  return buffer;
  });

this["Templates"]["headerTemplate"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            <li><a id=\"globalMastheadUserSalutation\">Welcome ";
  if (stack1 = helpers.userName) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.userName); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "</a></li>\n            ";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                <a id=\"globalMastheadSignout\" class=\"\" target=\"_top\" href=\"";
  if (stack1 = helpers.macysBaseUrl) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.macysBaseUrl); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "/signin/signout.ognc?cm_sp=navigation-_-top_nav-_-signin\">(sign out)</a>                ";
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                <a id=\"globalMastheadSignIn\" class=\"selected\" target=\"_top\" href=\"";
  if (stack1 = helpers.macysBaseUrl) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.macysBaseUrl); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "/account/signin?cm_sp=navigation-_-top_nav-_-signin\">sign in</a>                ";
  return buffer;
  }

  buffer += "<header id=\"globalMastheadContainer\">\n    <nav id=\"topnav\" class=\"hide-for-small\">\n        <ul>\n            ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.userName), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            <li class=\"user\">\n                ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.signedIn), {hash:{},inverse:self.program(5, program5, data),fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            </li>\n            <li id=\"dropDownABTest\" class=\"dropdownExperiment\"><a id=\"href_myAccountHeader\" class=\"noTextDecoration\" target=\"_top\" href=\"/account/myaccount?cm_sp=navigation-_-top_nav-_-account\">my account</a>\n                <ul role=\"group\" aria-labelledby=\"href_myAccountHeader\">\n                    <li><a href=\"/creditservice/gateway?cm_sp=navigation-_-top_nav-_-my_credit_card\">My Macy's Credit Card</a></li>\n                    <li><a href=\"/service/order-status?cm_sp=navigation-_-top_nav-_-my_order_history\">My Order History</a></li>\n                    <li><a href=\"/account/profile?cm_sp=cm_sp=navigation-_-top_nav-_-my_profile\">My Profile</a></li>\n                    <li><a href=\"/account/wallet?cm_sp=top_nav-_-guest-_-my_wallet_personalized\">My Wallet</a></li>\n                    <li><a href=\"/loyalty/summary?cm_sp=top_nav-_-guest-_-my_plenti_points\">My Plenti</a></li>\n                    <li><a href=\"/wishlist/mylist?cm_sp=navigation-_-top_nav-_-my_lists\">My Lists</a></li>\n                </ul>\n            </li>\n            <li><a id=\"stores\" href=\"";
  if (stack1 = helpers.macysBaseUrl) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.macysBaseUrl); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "/store/index.ognc?cm_sp=navigation-_-top_nav-_-stores-_-n\">stores</a></li>\n            <li><a href=\"";
  if (stack1 = helpers.macysBaseUrl) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.macysBaseUrl); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "/service/index.jsp\">customer service</a></li>\n            <li class=\"right\">\n                <div id=\"globalMastheadPool\">\n                    <div class=\"macysGlobalNavAdLink\" id=\"navAdOne\">\n                        <a href=\"javascript:pop('/ce/splash/free-shipping/index','myDynaPop','scrollbars=yes,width=950,height=900')\">\n                            <img src=\"https://assets.macysassets.com/navapp/dyn_img/site_ads/120816_PROMO_FF_THURS_HOMEPAGE_GNA2_1271055.png\" alt=\"Free Shipping, With $99 Purchase + Free Returns, U.S, only, Exclusions\"\n                                height=\"40\" width=\"307\" border=\"0\">\n                        </a>\n                    </div>\n                    <div class=\"macysGlobalNavAdLink\" id=\"navAdTwo\">\n                        <a href=\"javascript:pop('/ce/splash/buy-online-pickup-in-store/index','myDynaPop','scrollbars=yes,width=950,height=900')\">\n                            <img src=\"https://assets.macysassets.com/navapp/dyn_img/site_ads/120816_PROMO_FF_THURS_HOMEPAGE_GNA1_1271054.png\" alt=\"Buy Online, Pick up in Store and Get Extra 20 percent off! Find out More\"\n                                height=\"40\" width=\"307\" border=\"0\">\n                        </a>\n                    </div>\n                </div>\n            </li>\n        </ul>\n    </nav>\n    <div id=\"globalMastheadSearchMenu\">\n        <div id=\"globalMastheadBrandLogo\" class=\"left\">\n            <a target=\"_top\" href=\"";
  if (stack1 = helpers.macysBaseUrl) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.macysBaseUrl); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "/index.ognc?cm_sp=navigation-_-top_nav-_-macys_icon\">\n                <div alt=\"Macy's\" title=\"Macy's\"></div>\n            </a>\n        </div>\n        <div id=\"nav-search-box\" role=\"search\" class=\"left\">\n            <form onsubmit=\"javascript: cmCreateManualLinkClickTag(this.action + \\\" ?cm_sp=navigation-_-top_nav-_-search\\\",this.name);return isValidSubmit(this.name);\" target=\"_top\" name=\"keywordSearch\" method=\"GET\" action=\"";
  if (stack1 = helpers.macysBaseUrl) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.macysBaseUrl); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "/shop/search\">\n                <span>\n                    <label style=\"position:absolute!important; height: 1px; width: 1px; overflow: hidden;clip: rect(1px, 1px, 1px, 1px)\" for=\"globalSearchInputField\">Search or enter web ID</label>\n                    <input size=\"9\" maxlength=\"72\" type=\"text\" id=\"globalSearchInputField\" class=\"globalSearchInputField\" name=\"keyword\" value=\"\" placeholder=\"Search or enter web ID\">\n                    <span role=\"status\" aria-live=\"polite\" class=\"ui-helper-hidden-accessible\"></span>\n                </span>\n\n                <input alt=\"Search Now\" id=\"subnavSearchSubmit\" value=\"KEYWORD_GO_BUTTON\" type=\"image\" name=\"KEYWORD_GO_BUTTON\" border=\"0\"\n                    src=\"https://assets.macys.com/navapp/web20/assets/img/nav/header-search-button.gif\" aria-label=\"Submit product search\">\n                <input value=\"*\" name=\"SearchTarget\" type=\"hidden\">\n                <input type=\"hidden\" name=\"cm_sp\" value=\"navigation-_-top_nav-_-search\">\n                <input type=\"hidden\" id=\"searchAutoCompleteEnabled\" value=\"false\">\n                <input type=\"hidden\" id=\"mobileSearchAutoCompleteEnabled\" value=\"false\">\n                <input type=\"hidden\" id=\"apolloHost\" value=\"https://32.83.67.97:80/\">\n                <input type=\"hidden\" id=\"autoCompleteApolloServiceEndpoint\" value=\"suggester/\">\n                <input type=\"hidden\" id=\"autoCompleteMaxSuggestions\" value=\"10\">\n                <input type=\"hidden\" id=\"autoCompletePulseRate\" value=\"300\">\n                <input type=\"hidden\" id=\"autoCompleteRetryAttempt\" value=\"2\">\n                <input type=\"hidden\" id=\"autoCompleteRequestTimeout\" value=\"3000\">\n            </form>\n        </div>\n\n        <div id=\"globalMastheadBag\">\n            <div id=\"quickBagHeader\" class=\"quickBagFlyoutHeader\" aria-haspopup=\"true\">\n                <a id=\"checkoutLink\" href=\"";
  if (stack1 = helpers.macysBaseUrl) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.macysBaseUrl); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "/bag/index.ognc?cm_sp=navigation-_-top_nav-_-bag\"><span id=\"itemInfo\">my bag</span><span id=\"itemCount\">&nbsp;<span>(</span>0<span>)</span></span><button class=\"hide-for-screenreader\" tabindex=\"0\" id=\"openQbAccessibile\">Opens QuickBag flyout</button></a>\n                <div id=\"qbFlyout\" class=\"quickBagFlyout\" aria-hidden=\"true\">\n                    <div class=\"quickBagEmpty\">\n                        <div class=\"zeroItemCount\">0 items in your bag. Shop great deals now!</div>\n                    </div>\n                </div>\n            </div>\n        </div>\n\n        <div class=\"clear\"></div>\n    </div>\n    <div id=\"globalMastheadBlackBg\"></div>\n\n    <div id=\"globalMastheadCategoryMenu\" role=\"navigation\" class=\"clearFloats macysDynFlyout\">";
  if (stack1 = helpers.fobNav) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.fobNav); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div>\n\n    <div id=\"featureNav\">\n        <ul class=\"nav nav-pills\">\n            <li>\n                <a id=\"globalMastheadFeatureMenuWeddingRegistry\" href=\"/wedding-registry?cm_sp=global_nav_reg-_-wedding_registry-_-n\">wedding registry</a>\n            </li>\n            <li>\n                <a id=\"giftCards\" href=\"/catalog/index.ognc?CategoryID=1405&amp;PageID=6036169698215&amp;cm_sp=global_nav_reg-_-gift_cards-_-n\">gift cards</a>\n            </li>\n            <li>\n                <a id=\"dealsPromotionHref\" href=\"/shop/coupons-deals?cm_sp=navigation-_-top_nav-_-dealsandpromos\">deals &amp; promotions</a>\n            </li>\n            <li>\n                <a id=\"wishListHref\" href=\"/wishlist/mylist?cm_sp=navigation-_-top_nav-_-wish_list\">lists</a>\n            </li>\n            <li>\n                <a class=\"secondaryBolder\" href=\"/gifts?cm_sp=navigation-_-top_nav-_-giftguide\">\n                    The Mother's Day Gift Guide\n                </a>\n            </li>\n            <li>\n                <a class=\"secondaryBolder\" href=\"/ce/splash/trend-report/index?cm_sp=navigation-_-top_nav-_-trend-report\">Trend Report\n                </a>\n            </li>\n        </ul>\n    </div>\n</header>";
  return buffer;
  });

this["Templates"]["mobile_Header_Navigation"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, stack2, options, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  
  return "headerRow";
  }

  buffer += "    <nav id=\"mw-nav-container\">\n    <ul id=\"mw-nav-menu\" class=\"nav nav-tabs nav-stacked menu\" data-animating=\"false\">\n      <li id=\"top\" class=\"headerRow fobTop\">\n        <a class='mw-nav-link'>\n          Menu\n        </a>\n      </li>\n      <li id=\"shop\" class=\"fobShop firstlevel\">\n        <a class='mw-nav-link' href=\"";
  if (stack1 = helpers.getMewDomainURL) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.getMewDomainURL); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "/?aen=true\" data-integration-link=\"absolutize\">\n          Shop\n        </a>\n      </li>\n      <li id=\"offers\" class=\"fobOffers firstlevel\">\n        <a class='mw-nav-link' href=\"";
  if (stack1 = helpers.getMewDomainURL) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.getMewDomainURL); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "/shop/coupons-deals\" data-integration-link=\"absolutize\">\n          Deals\n        </a>\n      </li>\n      <li id=\"myAccount\" class=\"fobmyAccount firstlevel\">\n        <a class='mw-nav-link' href=\"";
  if (stack1 = helpers.getMewDomainURL) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.getMewDomainURL); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "/account/myaccount?cm_sp=navigation--top_nav--account\" data-integration-link=\"absolutize\">\n          My Account\n        </a>\n      </li>\n      <li id=\"myWallet\" class=\"";
  options = {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data};
  stack2 = ((stack1 = helpers.highlightNavItem || (depth0 && depth0.highlightNavItem)),stack1 ? stack1.call(depth0, "/account/wallet", options) : helperMissing.call(depth0, "highlightNavItem", "/account/wallet", options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += " fobmyWallet firstlevel\">\n        <a class='mw-nav-link' href=\"";
  if (stack2 = helpers.getMewDomainURL) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = (depth0 && depth0.getMewDomainURL); stack2 = typeof stack2 === functionType ? stack2.call(depth0, {hash:{},data:data}) : stack2; }
  buffer += escapeExpression(stack2)
    + "/account/wallet\" data-integration-link=\"absolutize\">\n          My Wallet\n        </a>\n      </li>\n      <li id=\"myWishlist\" class=\"fobmyWishlist firstlevel\">\n        <a class='mw-nav-link' href=\"";
  if (stack2 = helpers.getMewDomainURL) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = (depth0 && depth0.getMewDomainURL); stack2 = typeof stack2 === functionType ? stack2.call(depth0, {hash:{},data:data}) : stack2; }
  buffer += escapeExpression(stack2)
    + "/wishlist/mylist\">\n          My Lists\n        </a>\n      </li>\n      <li id=\"mcom-stores\" class=\"fobStores firstlevel\">\n        <a class='mw-nav-link' href=\"";
  if (stack2 = helpers.getMewDomainURL) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = (depth0 && depth0.getMewDomainURL); stack2 = typeof stack2 === functionType ? stack2.call(depth0, {hash:{},data:data}) : stack2; }
  buffer += escapeExpression(stack2)
    + "/shop/store/search\">\n          Stores\n        </a>\n      </li>\n\n      <li id=\"registry\" class=\" fobRegistry firstlevel\">\n        <a class='mw-nav-link' href=\"";
  if (stack2 = helpers.getMewDomainURL) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = (depth0 && depth0.getMewDomainURL); stack2 = typeof stack2 === functionType ? stack2.call(depth0, {hash:{},data:data}) : stack2; }
  buffer += escapeExpression(stack2)
    + "/registry/wedding/registryhome\">\n          Registry\n        </a>\n      </li>\n\n      <li id=\"mcom-customerService\" class=\"fobCustomerService firstlevel\">\n        <a class='mw-nav-link' href=\"https://customerservice.macys.com/\">\n          Customer Service\n        </a>\n      </li>\n\n      <li id=\"more\" class=\"fobMore firstlevel\">\n      	<a class=\"mw-nav-link\">\n      		More\n      	</a>\n      </li>\n\n      <ul id=\"more_children\" class=\"no-show children_wrapper\">\n        <li id=\"catalog\" class=\"fobMore children\">\n          <a class='mw-nav-link' href=\"https://macys.circularhub.com/mobile/macys/postal?locale=en-US&type=1&cm_sp=mew_navigation-_-more-_-catalog\">\n            Catalog\n          </a>\n        </li>\n        <li id=\"legalPolicies\" class=\"fobMore children\">\n          <a class='mw-nav-link' href=\"https://customerservice.macys.com/app/answers/list/c/15?cm_sp=mew_navigation-_-more-_-legal%20policies\">\n            Legal Policies\n          </a>\n        </li>\n      </ul>\n\n    </ul>\n</nav>\n";
  return buffer;
  });

this["Templates"]["mobile_header_template"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<style>\nul#ui-id-1 {\n    top: 93px !important;\n    width: 100% !important;\n    left: 0px !important;\n}\n</style>\n\n<div id=\"mb-page-wrapper\">\n    <section id=\"mb-region-header\" class=\"m-brandindex-search--is-hidden\">\n        <div id=\"mb-j-header-container\">\n            <div class=\"m-header-side\">\n                <div id=\"mb-j-nav-button\" class=\"icon-selectedMenuButton\" class=\"jmennu-up\">\n                    <i id=\"mb-j-nav-button-icon\" class=\"mb-icon-unselectedMenuButton\" style=\"margin:0px\"></i>\n                </div>\n            </div>\n\n            <div class=\"m-header-mid\">\n                <a class=\"m-j-cm-link\" style=\"display: block\" href=";
  if (stack1 = helpers.mewServerAddress) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.mewServerAddress); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "> <img\n                    id=\"mb-j-header-image\" src=\"https://assets.moovweb.net/macys/macys-prod/v81/images/mew2_images/logo_macys.svg\">\n                </a>\n            </div>\n            \n            <div class=\"m-header-side\">\n                <div id=\"mb-bag-count-container\" class=\"m-j-cm-manual-link\"\n                data-cm-manual-link=\"MEW_navigation-_-top_nav-_-bag\">\n                    <canvas id=\"m-bag-count\" width=\"32\" height=\"32\" class=\"mc-bag-count\"></canvas>\n                    <a id=\"m-bag-count-anchor\" href=\"";
  if (stack1 = helpers.mewUrl) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.mewUrl); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "/bag/index.ognc?cm_sp=navigation_mew--top_nav--bag-n-n\">\n                        <img id=\"m-shopping-bag-image\" src=\"https://assets.macys.com/dyn_img/creativepages/icon_bag_flat_white_flat.svg\">\n                    </a>\n                </div>\n            </div>\n        </div>\n    </section>\n</div>\n";
  return buffer;
  });

this["Templates"]["searchView"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "\n\n<section id=\"mb-j-search-container\" class=\"m-brandindex-search--is-hidden\">\n  <form id=\"mb-keyword-search-form\" action=\"";
  if (stack1 = helpers.searchURL) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.searchURL); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" method=\"get\">\n    <input type=\"hidden\" name=\"cm_sp\" value=\"navigation_mew--gn--search-n-n\">\n    <div id=\"m-search-input-wrapper\">\n      <input id=\"globalSearchInputField\" name=\"keyword\" type=\"text\" value=\"";
  if (stack1 = helpers.searchPhrase) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.searchPhrase); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" maxlength=\"50\" autocorrect=\"off\"  autocomplete=\"off\" placeholder=\"Search or enter web ID\" class=\"m-j-cm-manual-link\" data-cm-manual-link=\"mew_navigation-_-top_nav-_-search\"/>\n      <div id=\"mb-j-search-clear\" class=\"hide\"></div>\n      <button id=\"m-search-go\" type=\"submit\" value=\"GO\">&nbsp;</button>\n    </div>\n  </form>\n</section>\n<section id=\"mb-j-autocomplete-container\"></section>  ";
  return buffer;
  });

return this["Templates"];

});