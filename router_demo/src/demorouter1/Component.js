jQuery.sap.declare('inspur.gsp.Component') // 命名空间在创建向导中由用户填写。此处为必填项。
jQuery.sap.require('sap.ui.core.UIComponent')

sap.ui.core.UIComponent.extend('inspur.gsp.Component', { // 命名空间与上面定义必须一致。

	metadata: {
		"name": "Hello World",
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
				targetControl: "appContainer",
				targetAggregation:"pages",
				clearTarget: false
			},
			
			routes:[
				{
					pattern: "",
					name: "p1",
					view: "Page1"
				},
				{
					pattern: "Page2",
					name: "p2",
					view: "Page2"
				},
				{
					pattern: "AnyPage/{id}",
					name: "pn",
					view: "Page3"
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
		//this.routeHandler = new sap.m.routing.RouteMatchedHandler(router);
		new sap.m.routing.RouteMatchedHandler(router);
		router.initialize();
	}

	// 以下可以包含用户自由组织的代码
})