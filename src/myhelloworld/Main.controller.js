jQuery.sap.declare("inspur.gsp.myhelloworld.Main")

sap.ui.core.mvc.Controller.extend("inspur.gsp.myhelloworld.Main", {

	// onInit : function() {
	// }

	onBt1Click	: function(e) {
		var oView = this.getView();
		//oModel = new sap.ui.model.json.JSONModel();
		// var oModel = new sap.ui.model.json.JSONModel();
		// // load data from URL
		var oModel = this.getView().getModel("oModel");
		oView.setModel(oModel);
		// oModel.loadData('http://localhost:8080/user/zqy'); //+ this.byId("textField1").getValue());
		// sap.ui.getCore().setModel(oModel);
		// this.byId("textView1").setModel(this.getModel("oModel"));
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