//本范例用于展示在TabStrip中导航

jQuery.sap.declare('inspur.gsp.Component') // 命名空间在创建向导中由用户填写。此处为必填项。
jQuery.sap.require('sap.ui.core.UIComponent')

sap.ui.core.UIComponent.extend('inspur.gsp.Component', { // 命名空间与上面定义必须一致。

	metadata: {
		"name": "Demo router2",
		"version": "0.1.1",
		"include": [],
		"dependencies": {
			"libs": ["sap.ui.core", "sap.ui.commons"],
			"components": []
		},
		"rootView": "inspur.gsp.App",
		"config": {
			"resourceBundle": ["i18n/messageBundle.properties"]
		},
		"routing": {
			config: {
				viewType:"XML",
				viewPath: "inspur.gsp",			
				targetControl : "homeTab",		
				targetAggregation : "content",		
				clearTarget: true
			},

			routes:[
				{
					pattern: "wcenter/{id}",
					name: "wcenter",
					view: "WCenter"
				}
			]
		}
	},



	init: function() {


		jQuery.sap.require("sap.ui.core.routing.History");
		jQuery.sap.require("sap.m.routing.RouteMatchedHandler");
		sap.ui.core.UIComponent.prototype.init.apply(this, arguments);

		var rootPath = jQuery.sap.getModulePath("inspur.gsp");
		var mConfig = this.getMetadata().getConfig();

		var i18nModel = new sap.ui.model.resource.ResourceModel({
			bundleUrl: [rootPath, mConfig.resourceBundle].join("/")
		});
		this.setModel(i18nModel, "i18n");

		// 启动Router
		var router = this.getRouter();
		this.routeHandler = new sap.m.routing.RouteMatchedHandler(router);
		router.initialize();
	},

	destroy : function () {
		if (this.routeHandler) {
			this.routeHandler.destroy();
		}
		// call overridden destroy
		sap.ui.core.UIComponent.prototype.destroy.apply(this, arguments);
	}
	
})