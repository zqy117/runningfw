jQuery.sap.require("inspur.gsp.commons.UIComponent")
jQuery.sap.require("inspur.gsp.commons.RuntimeModel")
jQuery.sap.declare("inspur.gsp.commons.RuntimeComponent")

// 运行框架的运行时构件
inspur.gsp.commons.UIComponent.extend('inspur.gsp.commons.RuntimeComponent', {

	// 
	init: function() {
		inspur.gsp.commons.UIComponent.prototype.init.apply(this, arguments)
	}

	// 渲染之前调用的函数
	// 渲染之前把tabstrip取出来，这里为了demo需要写死，这里应该传入一个component的container
	, onBeforeRendering : function() {
		this.rtModel = new inspur.gsp.commons.RuntimeModel(this.getAggregation("rootControl").byId("tabstrip"))
		this.setModel(this.rtModel, "runtime")
	}

})

// 静态方法赋值？
inspur.gsp.commons.RuntimeComponent.getGSPMetaFor = inspur.gsp.commons.UIComponent.getGSPMetaFor
