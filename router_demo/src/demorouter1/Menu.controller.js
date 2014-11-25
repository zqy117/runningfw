
jQuery.sap.declare("inspur.gsp.Menu")

sap.ui.core.mvc.Controller.extend("inspur.gsp.Menu", {

	onBt1Click	: function(e) {
		alert("Hello World!");
	},

	goToPage1:function(){
		var router = sap.ui.core.UIComponent.getRouterFor(this);
		router.navTo("p1", null, false);
	},

	goToPage2:function(){
		var router = sap.ui.core.UIComponent.getRouterFor(this);
		router.navTo("p2", null, false);
	},

	goToAnyPage: function(){
		var router = sap.ui.core.UIComponent.getRouterFor(this);
		router.navTo("pn", {id:5}, false);
	},

	goBack:function(){
		window.history.go(-1);
	},

	onInit: function() {
		//alert("controller is inited.");
		var router = sap.ui.core.UIComponent.getRouterFor(this);
		router.attachRoutePatternMatched(this._handler, this);
	},
	_handler: function(evt){
		// alert(evt.getParameter("name"));
	}
})