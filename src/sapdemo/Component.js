jQuery.sap.declare("inspur.gsp.sapdemo.Component");
jQuery.sap.require("inspur.gsp.sapdemo.MyRouter");

sap.ui.core.UIComponent.extend("sap.ui.sapdemo.Component", {

	metadata: {
		name: "sapdemo App",
		version: "1.0",
		includes: [],
		dependencies: {
			libs: ["sap.m", "sap.ui.layout"],
			components: []
		},
		// rootView是关键字，关联的是声明的View，xml形式的
		rootView: inspur.gsp.sapdemo.Main,
		config: {
			resourceBundle: ["i18n/messageBundle.properties"],
			serviceConfig: {
				name: "Northwind",
				serviceUrl: "/uilib-sample/proxy/http/services.odata.org/V2/(S(sapdemo))/OData/OData.svc/"
			}
		},
		routing: {
			config: {
				routerClass: sap.ui.sapdemo.MyRouter,
				viewType: "XML",
				viewPath: sap.ui.sapdemo.view,
				targetAggregation: "detailPages",
				clearTarget: false
			},
			routes: [{
				pattern: "",
				name: "main",
				view: "Master",
				targetAggregation: "masterPages",
				targetControl: "idAppControl",
				subroutes: [{
					pattern: "{product}/:tab:",
					name: "product",
					view: "Detail"
				}]
			}, {
				name: "catchallMaster",
				view: "Master",
				targetAggregation: "masterPages",
				targetControl: "idAppControl",
				subroutes: [{
					pattern: ":all*:",
					name: "catchallDetail",
					view: "NotFound"
				}]
			}]
		}
	},
	init: function() {

		sap.ui.core.UIComponent.prototype.init.apply(this, arguments);

		var mConfig = this.getMetadata().getConfig();

		// always use absolute paths relative to our own component
		// (relative paths will fail if running in the Fiori Launchpad)
		var rootPath = jQuery.sap.getModulePath("sap.ui.sapdemo");

		// set i18n model
		var i18nModel = new sap.ui.model.resource.ResourceModel({
			bundleUrl: [rootPath, mConfig.resourceBundle].join("/")
		});
		this.setModel(i18nModel, "i18n");

		// Create and set domain model to the component
		var sServiceUrl = mConfig.serviceConfig.serviceUrl;
		var oModel = new sap.ui.model.odata.ODataModel(sServiceUrl, true);
		this.setModel(oModel);

		// set device model
		var deviceModel = new sap.ui.model.json.JSONModel({
			isTouch: sap.ui.Device.support.touch,
			isNoTouch: !sap.ui.Device.support.touch,
			isPhone: sap.ui.Device.system.phoutilne,
			isNoPhone: !sap.ui.Device.system.phone,
			listMode: sap.ui.Device.system.phone ? "None" : "SingleSelectMaster",
			listItemType: sap.ui.Device.system.phone ? "Active" : "Inactive"
		});
		deviceModel.setDefaultBindingMode("OneWay");
		this.setModel(deviceModel, "device");

		this.getRouter().initialize(); // 初始化router文件

	},
});