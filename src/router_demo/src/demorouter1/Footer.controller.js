
jQuery.sap.declare("inspur.gsp.Footer")

sap.ui.core.mvc.Controller.extend("inspur.gsp.Footer", {

	goBack:function(){
		window.history.go(-1);
	},
	goForward:function(){
		window.history.go(1);
	}

})