jQuery.sap.declare("inspur.gsp.myhelloworld.Main")

sap.ui.core.mvc.Controller.extend("inspur.gsp.myhelloworld.Main", {

	// onInit : function() {
	// }

	onBt1Click	: function(e) {
		var oView = this.getView();
		var oModel = this.getView().getModel("oModel");
		oView.setModel(oModel);
		$.ajax({  
		        	url: "http://localhost:8080/user/object",
		        	type: "Get",
		        	dataType: "json",
		        	data: {name:this.byId("textField1").getValue()},
		       		success: function (json) {  
		        		console.log(json);
		        		oModel.setData(json);
		        		oModel.refresh()
	        		}
	        	}); 

	}

})