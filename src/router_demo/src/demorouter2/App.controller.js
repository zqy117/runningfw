
jQuery.sap.declare("inspur.gsp.App")

sap.ui.core.mvc.Controller.extend("inspur.gsp.App", {
	onTest : function(){
		alert(sap.ui.getCore().byId("__xmlview0--appContainer"));
		alert(this.byId("appContainer"));
	}
})