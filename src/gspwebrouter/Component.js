jQuery.sap.declare('inspur.gsp.rt.gspwebrouter.Component') // 命名空间在创建向导中由用户填写。此处为必填项。
// jQuery.sap.require('sap.ui.core.UIComponent')
jQuery.sap.require('inspur.gsp.commons.RuntimeComponent')

inspur.gsp.commons.RuntimeComponent.extend('inspur.gsp.rt.gspwebrouter.Component', { // 命名空间与上面定义必须一致。

	metadata: {
		"name": "Form Case",
		"version": "0.1.1",
		"include": [],
		"dependencies": {
			"libs": ["sap.ui.core","sap.ui.commons","sap.ui.table","sap.ui.ux3"],
			"components": []
		},
		"rootView": "inspur.gsp.rt.gspwebrouter.Main",
		"config": {
			"resourceBundle": ["i18n/messageBundle.properties"]
		},
		"routing": {
			config: {
				viewType:"XML",
				viewPath: "inspur.gsp.rt.gspwebrouter",		
				clearTarget: true,					
			},

			routes:[
				{
					name: "tab",
					pattern: "tab/{tabtype}"
				}
			]
		}
	},

	init: function() {
		jQuery.sap.require("sap.ui.core.routing.History")
		jQuery.sap.require("sap.m.routing.RouteMatchedHandler")
		sap.ui.core.UIComponent.prototype.init.apply(this, arguments)

		var oModelUser = new sap.ui.model.json.JSONModel()	// User的数据
			, rootPath = jQuery.sap.getModulePath("inspur.gsp.rt.gspwebrouter")
			, mConfig = this.getMetadata().getConfig()
			, i18nModel = new sap.ui.model.resource.ResourceModel({
				bundleUrl: [rootPath, mConfig.resourceBundle].join("/")
			})
		this.setModel(oModelUser, "oModelUser")
		this.setModel(i18nModel, "i18n")
		
		// var router = this.getRouter();	
		// this.routeHandler = new sap.m.routing.RouteMatchedHandler(router); //这一句失败
		// router.initialize();		
	}

	// 以下可以包含用户自由组织的代码
})