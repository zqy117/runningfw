
jQuery.sap.declare("inspur.gsp.Menu")

sap.ui.core.mvc.Controller.extend("inspur.gsp.Menu", {

	onClick	: function(e) {
		alert("Hello World!");
	},

	goToLogin:function(){
		var router = sap.ui.core.UIComponent.getRouterFor(this);
		router.navTo("login", null, false);
	},

	goToRegister:function(){
		var router = sap.ui.core.UIComponent.getRouterFor(this);
		router.navTo("register", null, false);
	}
})