jQuery.sap.declare("inspur.gsp.myhelloworld.Main")

sap.ui.core.mvc.Controller.extend("inspur.gsp.myhelloworld.Main", {

	// onInit : function() {
	// 	this.bindView(this.);
	// 	this.getView().setBusy(false);
	// 	this.oInitialLoadFinishedDeferred.resolve();
	// }

	onBt1Click	: function(e) {
		var oView = this.getView();
		//oModel = new sap.ui.model.json.JSONModel();
		oView.setModel(oModel);
		// var oModel = new sap.ui.model.json.JSONModel();
		// // load data from URL
		var oModel = this.getView().getModel("oModel")
		// oModel.loadData('http://localhost:8080/user/zqy'); //+ this.byId("textField1").getValue());
		// sap.ui.getCore().setModel(oModel);
		// this.byId("textView1").setModel(this.getModel("oModel"));
		$.ajax({  
		        	url: "http://localhost:8080/user/" + this.byId("textField1").getValue(), 
		        	type: "Get",

		       		success: function (json) {  

		        		console.log(json.title);
		        		oModel.setData(json);
		        		oModel.refresh()
		        		// this.byId("textView1").setText(json.name+json.title);
		        		// oModel.refresh();

	        		}
	        	}); 
		// var oTable1 = new sap.ui.table.Table({  
  //                       title : "Players List",  
  //                       visibleRowCount : 3,  
  //                       selectionMode : sap.ui.table.SelectionMode.Single,  
  //                       navigationMode : sap.ui.table.NavigationMode.Paginator,  
  //                   });

  //       //Define the columns and the control templates to be used    
  //       oTable1.addColumn(new sap.ui.table.Column({  
  //           label : new sap.ui.commons.Label({  
  //           text : "Player Name"  
  //       }),  
  //       template : new sap.ui.commons.TextView().bindProperty(  
  //       "text", "name"),  
  //       width : "10px"  
  //       }));

  //       oTable1.setModel(oModel);  
  //       oTable1.bindRows("/oModel");  
  //       oTable1.placeAt('table_cont');  
		// this.byId("textView1").setText(oModel.name+oModel.title);
	}

})