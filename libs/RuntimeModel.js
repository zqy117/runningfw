jQuery.sap.declare("inspur.gsp.commons.RuntimeModel")
jQuery.sap.require("sap.ui.model.json.JSONModel")

sap.ui.model.json.JSONModel.extend("inspur.gsp.commons.RuntimeModel", {

	// 构造函数
	constructor : function(arg) {
		if (arg.constructor == sap.ui.commons.TabStrip) {
			this.container = arg
			sap.ui.model.json.JSONModel.apply(this)
		} else {
			sap.ui.model.json.JSONModel.apply(this, arguments)
		}
	}

	, openFunc  : function(parent, sTitle, sComponentId, oModels, oGSPMeta) {
		//debugger
		var tabstrip = this.container
			, currentTab = this.findTab(tabstrip.getTabs(), sTitle)
			, models = jQuery.extend({}, oModels, { runtime: this })
			, gspMeta = jQuery.extend(true, {}, oGSPMeta, { models : models })
			, settings = { "__gsp_meta__"	: gspMeta }
		// var currentTab = tabstrip.getTabs().filter(function)
		if (currentTab != undefined)
			tabstrip.setSelectedIndex(tabstrip.indexOfTab(currentTab))
		else {
			var subComponent = new sap.ui.core.ComponentContainer({
					name		: sComponentId
					,settings	: settings
				})
			, oTab = new sap.ui.commons.Tab({
					sId: sTitle,
					title: new sap.ui.core.Title({
						text: sTitle
					}),
					closable: true,
					content: [subComponent]
				})
			tabstrip.addTab(oTab)
			tabstrip.setSelectedIndex(tabstrip.getTabs().length - 1)
		}

		/*
		if (parent.onSubComponentLoaded) {
			parent.onSubComponentLoaded()
		}
		//*/
		return subComponent
	}

	// 自定义函数
	, findTab: function(tabs,nodeText) {
		for (var i = tabs.length - 1; i >= 0; i--) {
			if (tabs[i].getTitle().getText() == nodeText) {
				return tabs[i]
			}
		}
	}

	
})