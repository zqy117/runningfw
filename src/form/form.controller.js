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
		rt.openFunc("myTestTab","inspur.gsp.rt.form")
	}
})