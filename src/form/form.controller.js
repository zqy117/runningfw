jQuery.sap.declare("inspur.gsp.rt.form.Form")
jQuery.sap.require("inspur.gsp.commons.Controller")

inspur.gsp.commons.Controller.extend("inspur.gsp.rt.form.Form", {

	onBt1Click:function(e) {
		var data = this.getView().getModel("oModel").getData();
		alert("Model : name " + data.name + " key " + data.key);
		// var oView = this.getView();
		// var oModel = this.getView().getModel("oModel");
		// oView.setModel(oModel);
		// var myName = this.byId("name").getValue();
		// oModel.getData().name = myName;
		// oModel.refresh();
	},

	Init:function(){
	},

	onOpenFuncBtnClick	: function () {
		var rt = this.getRuntime()
			, newModuleTitle = "新开模块" + (++window.openedModuleCount)
			, subComp = rt.openFunc(newModuleTitle, "inspur.gsp.rt.form", {
				formMeta	: new sap.ui.model.json.JSONModel({
					title	: newModuleTitle
					, from	: this.getModel("formMeta").getData().title
				})
			})

		this.subComponent = subComp

	}

})