jQuery.sap.declare('inspur.gsp.rt.form.Component') // 命名空间在创建向导中由用户填写。此处为必填项。
jQuery.sap.require('inspur.gsp.commons.ModuleComponent')

inspur.gsp.commons.ModuleComponent.extend('inspur.gsp.rt.form.Component', { // 命名空间与上面定义必须一致。

	metadata: {
		"name": "Form",
		"version": "0.1.1",
		"include": [],
		"dependencies": {
			"libs": ["sap.ui.core", "sap.ui.commons","sap.ui.table"],
			"components": []
		},
		"rootView": "inspur.gsp.rt.form.Form",
		"config": {
			"resourceBundle": ["i18n/messageBundle.properties"]
		},
		"routing": {}
	},

	init: function() {

		sap.ui.core.UIComponent.prototype.init.apply(this, arguments);

		var oModel = new sap.ui.model.json.JSONModel();
		this.setModel(oModel, "oModel");
		
		var rootPath = jQuery.sap.getModulePath("inspur.gsp.rt.form");
		var mConfig = this.getMetadata().getConfig();

		var i18nModel = new sap.ui.model.resource.ResourceModel({
			bundleUrl: [rootPath, mConfig.resourceBundle].join("/")
		});
		this.setModel(i18nModel, "i18n");
	}

	// 以下可以包含用户自由组织的代码
})