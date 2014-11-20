jQuery.sap.declare("inspur.gsp.helloworld.Main")

sap.ui.core.mvc.Controller.extend("inspur.gsp.helloworld.Main", {

	onBt1Click	: function(e) {
		this.byId("textView1").setText("Hello " + this.byId("textField1").getValue() + " !")
	}

})