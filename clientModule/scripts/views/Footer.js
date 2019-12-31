define(['jquery','handlebars','footerTemplate'],function($, Handlebars, FooterTemplate){

	var render = function(){
		if(typeof macysConfig.footerTarget !== "undefined"){
			$(macysConfig.footerTarget).html(FooterTemplate());
		}
	};

	return {render:render};
});
