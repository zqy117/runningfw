// 类似于import
jQuery.sap.require("sap.ui.core.mvc.View")	// sap自己封装的类似require.js的框架
jQuery.sap.declare("inspur.gsp.commons.UIComponent")

// 这种继承方式与正常的逻辑想反，父类在前，子类在后
// 暂时还不明白这种写法，只知道是继承
sap.ui.core.UIComponent.extend('inspur.gsp.commons.UIComponent', {

	// 构造函数
	constructor			: function(settings) {
		this.transientModels = []
		if (settings) {
			this["__gsp_meta__"] = jQuery.extend(true, {}, settings["__gsp_meta__"])
			delete settings["__gsp_meta__"]
		}
		sap.ui.core.UIComponent.apply(this, arguments)
		this.restoreModels()
		window.onbeforeunload = this.onBeforeWindowClosed
		window.onunload = this.onWindowClosed
	}

	// 初始化
	, init				: function() {
		sap.ui.core.UIComponent.prototype.init.apply(this, arguments)
	}

	// 离开这个Component前调用
	, onBeforeWindowClosed	: function() {
		return "正在离开应用...\n\n你可以通过重载Component中的'onBeforeWindowClosed'、'onWindowClosed'两个方法来实现自定义销毁。";
	}

	, onWindowClosed	: function() {
		jQuery.ajax({url:"http://www.baidu.com"})
	}

	/*
	, _fetchProxClass: function(fullName) {
		var ns = fullName.split('.'),
			c = window
		for (var i in ns) {
			c = c[ns[i]]
		}
		return c
	}
	//*/

	// 获取元数据
	// "__gsp_meta__"为元数据的Key值
	, getGSPMeta		: function(key) {
		if (!key)
			return this["__gsp_meta__"]
		else
			return this["__gsp_meta__"][key]
	}

	// 存储models
	// 如果model在瞬时态model数组中，则不会保存
	, restoreModels		: function() {

		var models = this.getGSPMeta("models")

		if (!models) return

		for (var n in models) {
			if (this.transientModels[n]) continue
			this.setModel(models[n], n === "DEFAULT" ? undefined : n)
		}

	}

	// 获取持久化model
	, getPersitenceModels	: function() {

		var allModels = this.oModels
			, persisModel = {}
		for (var n in allModels) {
			if (this.transientModels[n]) continue
			persisModel[n] = allModels[n]
		}

		return persisModel
		
	}

	// set瞬时态的model
	, setTransientModel	: function(model, name) {
		this.transientModels[name || "DEFAULT"] = true
		this.setModel(model, name)
	}

})

// 类似静态方法，不需要实例化就可以调用的方法命名方式
inspur.gsp.commons.UIComponent.getGSPMetaFor = function(oControllerOrView) {

	var oView = oControllerOrView;
	if (oView instanceof sap.ui.core.mvc.Controller) {
		oView = oView.getView();
	}
	if (oView instanceof sap.ui.core.mvc.View) {
		var sOwner = sap.ui.core.Component.getOwnerIdFor(oView),
			oComponent = sap.ui.component(sOwner);

		if (oComponent) {
			return oComponent.getGSPMeta();
		} else {
			return undefined;
		}
	}

}