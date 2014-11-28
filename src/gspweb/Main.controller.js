var treemenu
var selectedNode
var tabstrip
var tabindex
jQuery.sap.declare("inspur.gsp.gspweb.Main")

sap.ui.core.mvc.Controller.extend("inspur.gsp.gspweb.Main", {

	// 自定义函数
	findTab: function(tabs, nodeText) {
		for (var i = tabs.length - 1; i >= 0; i--) {
			if (tabs[i].getTitle().getText() == nodeText) {
				return tabs[i]
			}
		}
	},

	//初始化
	init: function() {

	},

	workCenterInitHandler: function(json) {
		for (var i = 0; i < json.length; i++) {
			myShell.addWorksetItem(new sap.ui.ux3.NavigationItem(
				"item" + json[i].id
				, {
					key:json[i].id
					, text:json[i].name
				}))
			components[i]={
				id:json[i].id
				,component:json[i].componentId
				,name:json[i].name
			}
		}

		var worksetItems = myShell.getWorksetItems()

		this.menuTreeInitHandler(components[i].id)
	},

	menuTreeInitHandler: function(componentId) {
		$.ajax({
			url:"http://liuning.gsp/app/model/menuDetail.do",
			type:"Get",
			dataType:"json",
			data:{name:componentId},
			success:function(json){
				var rootNode = new sap.ui.commons.TreeNode("itme" + components[0].id
					, { 
						text: components[0].name
					})
				// this.worksetItemSelected(json.name);
				treemenu.addNode(rootNode)
				// for (var i = 0; i < json.menuList.length; i++) {
				// 	var childNode = new sap.ui.commons.TreeNode(json.menuList[i].name, {
				// 			text: json.menuList[i].name
				// 		})
				// 		// treemenu.addNode(new sap.ui.commons.TreeNode(json.menuList[i].name,{text:json.menuList[i].name}))
				// 	for (var j = 0; j < json.menuList[i].menuList.length; j++) {
				// 		// var lastChild = new sap.ui.commons.TreeNode(json.menuList[i].menuList[j].name,{text:json.menuList[i].menuList[j].name})
				// 		childNode.addNode(new sap.ui.commons.TreeNode(json.menuList[i].menuList[j].name, {
				// 			text: json.menuList[i].menuList[j].name
				// 		}))
				// 	}
				// 	rootNode.addNode(childNode)
				// }
			}
		})
	},

	//DOM元素加载完成后
	onAfterRendering: function() {
		var oView = this.getView()
		myShell = this.byId("myShell")
		num = 0
		components = new Array();
		var treemenu = this.byId("treemenu")
			,paneid = this.byId("pi_browser").getId()
			,that = this
		$.ajax({
			// url: "http://localhost:8080/user/object",		// 取得menu数据
			url: "http://liuning.gsp/app/model/menuList.do", // 取得menu数据
			type: "Get",
			dataType: "json",
			success: that.workCenterInitHandler
			//sync:false,
			// data: {name:"test"},
			/*
			success: function(json) {
				// debugger
				//eval('console.log(myShell)')
				// var treemenu=owner.byId("treemenu")
				
				for (var i = 0; i < json.length; i++) {
					myShell.addWorksetItem(new sap.ui.ux3.NavigationItem(
						"item" + json[i].id
						, {
							key:json[i].id
							, text:json[i].name
						}))
					components[i]={
						id:json[i].id
						,component:json[i].componentId
						,name:json[i].name
					}
				}
				var worksetItems = myShell.getWorksetItems()

				$.ajax({
					url:"http://liuning.gsp/app/model/menuDetail.do",
					type:"Get",
					dataType:"json",
					data:{name:components[0].componentId},
					success:function(json){
						var rootNode = new sap.ui.commons.TreeNode("itme" + components[0].id, {
							text: components[0].name
						})
						// this.worksetItemSelected(json.name);
						treemenu.addNode(rootNode)
						// for (var i = 0; i < json.menuList.length; i++) {
						// 	var childNode = new sap.ui.commons.TreeNode(json.menuList[i].name, {
						// 			text: json.menuList[i].name
						// 		})
						// 		// treemenu.addNode(new sap.ui.commons.TreeNode(json.menuList[i].name,{text:json.menuList[i].name}))
						// 	for (var j = 0; j < json.menuList[i].menuList.length; j++) {
						// 		// var lastChild = new sap.ui.commons.TreeNode(json.menuList[i].menuList[j].name,{text:json.menuList[i].menuList[j].name})
						// 		childNode.addNode(new sap.ui.commons.TreeNode(json.menuList[i].menuList[j].name, {
						// 			text: json.menuList[i].menuList[j].name
						// 		}))
						// 	}
						// 	rootNode.addNode(childNode)
						// }
					}
				})
			}
			//*/
		})
		myShell.openPane(paneid)
		myShell.setPaneContent(treemenu)
		tabstrip = this.byId("tabstrip")
		tabstrip.attachClose(function(oEvent) {
			tabstrip.closeTab(oEvent.getParameter("index"))
		})
		// myShell.worksetItemSelected=this.worksetItemSelected;

	},

	// function handler(evtXHR) {  
	// 	console.log(xhr.responseText); 
	// }

	//Shell中nav一级导航选项切换
	worksetItemSelected: function(oEvent) {
		console.log("test");
		tabstrip = this.byId("tabstrip")
		var oiframe = this.byId("iframecontent")
		var oifram = this.byId("iframeconten")
		var sId = oEvent.getParameter("key")
		var oShell = oEvent.oSource
		switch (sId) {
			case "wi_home":
				oShell.setContent(tabstrip)
				break
			case "wi_1_1":
				oShell.setContent(new sap.ui.commons.TextView({
					text: new Date().toLocaleString()
				}), true)
				break
			case "wi_1_2":
				oShell.setContent(new sap.ui.commons.Button({
					text: "button"
				}))
				break
			case "wi_1_3":
				oShell.setContent(new sap.ui.commons.Image({
					src: "images/logo.jpg"
				}))
				break
			case "wi_api":
				oShell.setContent(oifram)
				break
			default:
				break
		}
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
		if (selectedNode != undefined) {
			switch (nodeText) {
				case "Vegetarian diet":
					var oTab1 = new sap.ui.commons.Tab({
						title: new sap.ui.core.Title({
							text: nodeText
						}),
						closable: true,
						content: [oiframe]
					})
					tabstrip.addTab(oTab1)
					break
				case "Vegetables":
					var oTab2 = new sap.ui.commons.Tab({
						title: new sap.ui.core.Title({
							text: nodeText
						}),
						closable: true,
						content: [oifra]
					})
					tabstrip.addTab(oTab2)
					break
				default:
					// 创建iframe
					// var iframe=new sap.ui.core.HTML({
					// 	content:"<iframe src='http://localhost:9000/index2.html' width='100%' height='100%' scrolling='no' framespacing='0' border='0' frameborder='0'></ifram>"})
					var currentTab = this.findTab(tabstrip.getTabs(), nodeText)
					if (currentTab != undefined)
						selectIndex = tabstrip.indexOfTab(currentTab)
					else {
						var icomp = new sap.ui.core.ComponentContainer({
							name: "inspur.gsp.form"
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
					break
			}

			tabstrip.setSelectedIndex(selectIndex)


		}
	},

	shellLogout :function(){
		window.location.href = "https://liubiao.gsp/sso/logout"
	},

	// 添加工作区函数
	// 这样可以使用myshell的getWorksetItems()函数获取所有的工作区
	addWorksetItem :function(worksetId,worksetName){
		 myShell.addWorksetItem(new sap.ui.ux3.NavigationItem(worksetId,{
			key:worksetId,
			text:worksetName
		}))
		
	}
	
})