jQuery.sap.declare("inspur.gsp.rt.gspweb.Main")
jQuery.sap.require("inspur.gsp.commons.Controller")

var component = function(cId, componentId, cName, component) {
	this.id = cId
	this.componentId = componentId
	this.cName = cName
	this.component = component
}

inspur.gsp.commons.Controller.extend("inspur.gsp.rt.gspweb.Main", {


	findComponent: function(componentId) {
		for (var i = components.length - 1; i >= 0; i--) {
			if (components[i].id == componentId) {
				return components[i]
			}
		}
	},
	//初始化
	init: function() {

	},

	workCenterInitHandler: function(json) {
		for (var i = 0; i < json.length; i++) {
			myShell.addWorksetItem(new sap.ui.ux3.NavigationItem(
				"item" + json[i].id, {
					key: json[i].id,
					text: json[i].name
				}))
			// components.set(json[i].id, new component)
			components[i] = {
				id: json[i].id,
				component: json[i].componentId,
				name: json[i].name
			}
		}

		var worksetItems = myShell.getWorksetItems()

		this.menuTreeInitHandler.apply(this, [components[0].id, components[0].name])
	},


	menuTreeInitHandler: function(componentId, componentTitle) {

		var that = this;
		var treeMenu = that.byId("treemenu")
		treeMenu.destroyNodes()
		$.ajax({
			url: "http://liubiao.gsp:18080/app/model/menuDetail.do",
			// url: "http://liuning.gsp/app/model/menuDetail.do",
			type: "Get",
			dataType: "json",
			data: {
				name: componentId
			},
			success: function(json) {
				var rootNode = new sap.ui.commons.TreeNode("rootNode" + componentId, {
						text: componentTitle
					})
					// var treeMenu = that.byId("treemenu")
				treeMenu.addNode(rootNode)
				for (var i = 0; i < json.length; i++) {
					var childNode = new sap.ui.commons.TreeNode("childNode" + json[i].id, {
						text: json[i].name
					})
					if (json[i].menuList != null) { // treemenu.addNode(new sap.ui.commons.TreeNode(json.menuList[i].name,{text:json.menuList[i].name}))
						for (var j = 0; j < json[i].menuList.length; j++) {
							childNode.addNode(new sap.ui.commons.TreeNode("childNode" + json[i].menuList[j].id, {
								text: json[i].menuList[j].name
							}))
						}
					}
					rootNode.addNode(childNode)
				}

				// components[i]
			}
		})
	},

	//DOM元素加载完成后
	onAfterRendering: function() {
		myShell = this.byId("myShell")
		// components = new Map()
		components = new Array()
		var treeMenu = this.byId("treemenu"),
			paneid = this.byId("pi_browser").getId(),
			that = this
		$.ajax({
			// url: "http://localhost:8080/user/object",		// 取得menu数据
			// url: "http://liuning.gsp/app/model/menuList.do", // 取得menu数据
			url: "http://liubiao.gsp:18080/app/model/menuList.do",
			type: "Get",
			dataType: "json",
			success: function(data) {
				that.workCenterInitHandler.apply(that, arguments)
			}
		})
		myShell.openPane(paneid)
		myShell.setPaneContent(treeMenu)
		tabstrip = this.byId("tabstrip")
		tabstrip.attachClose(function(oEvent) {
			tabstrip.closeTab(oEvent.getParameter("index"))
		})

	},

	//Shell中nav一级导航选项切换
	worksetItemSelected: function(oEvent) {
		// console.log("test");
		tabstrip = this.byId("tabstrip")
			// var oiframe = this.byId("iframecontent")
			// var oifram = this.byId("iframeconten")
		var sId = oEvent.getParameter("key") // componentId
		var currentComponent = this.findComponent(sId)
		this.menuTreeInitHandler(sId, currentComponent.name)

		// var oShell = oEvent.oSource
		// switch (sId) {
		// 	case "wi_home":
		// 		oShell.setContent(tabstrip)
		// 		break
		// 	case "wi_1_1":
		// 		oShell.setContent(new sap.ui.commons.TextView({
		// 			text: new Date().toLocaleString()
		// 		}), true)
		// 		break
		// 	case "wi_1_2":
		// 		oShell.setContent(new sap.ui.commons.Button({
		// 			text: "button"
		// 		}))
		// 		break
		// 	case "wi_1_3":
		// 		oShell.setContent(new sap.ui.commons.Image({
		// 			src: "images/logo.jpg"
		// 		}))
		// 		break
		// 	case "wi_api":
		// 		oShell.setContent(oifram)
		// 		break
		// 	default:
		// 		break
		// }
	},
	//点击树节点
	tree_click: function(oControlEvent) {

		var oiframe = this.byId("iframecontent")
		var oifra = this.byId("iframecont")
		var currentnode = oControlEvent.getParameter("node")
		var nodeText = currentnode.getText()
			//var nodeindex=treemenu.getNodes().length
		var tabstrip = this.byId("tabstrip")
		var selectedNode = currentnode
		var TextView = new sap.ui.commons.TextView({
			text: "This is the content of TAB" + nodeText + "\nYou can close it on his right up!"
		})

		if (!selectedNode) return

		this.getRuntime().openFunc(this, nodeText, "inspur.gsp.rt.form", {
			formMeta	: new sap.ui.model.json.JSONModel({
				title	: nodeText
				, from	: "运行时框架"
			})
		})

		/*
		var rt = this.getRuntime()

		var currentTab = this.findTab(tabstrip.getTabs(), nodeText)
		if (currentTab != undefined)
			selectIndex = tabstrip.indexOfTab(currentTab)
		else {
			var icomp = new sap.ui.core.ComponentContainer({
				name: "inspur.gsp.rt.form"
				,settings	: {
					"__gsp_meta__"	: {
						models	: {
							runtime	: rt
						}
					}
				}
			})
			var oTab = new sap.ui.commons.Tab({
				sId: nodeText,
				title: new sap.ui.core.Title({
					text: nodeText
				}),
				closable: true,
				content: [icomp]
			})
			tabstrip.addTab(oTab)
			selectIndex = tabstrip.getTabs().length - 1
		}

		tabstrip.setSelectedIndex(selectIndex)
		//*/
	},

	shellLogout: function() {
		window.location.href = "https://liubiao.gsp/sso/logout"
	},

	// 添加工作区函数
	// 这样可以使用myshell的getWorksetItems()函数获取所有的工作区
	addWorksetItem: function(worksetId, worksetName) {
		myShell.addWorksetItem(new sap.ui.ux3.NavigationItem(worksetId, {
			key: worksetId,
			text: worksetName
		}))

	}

})