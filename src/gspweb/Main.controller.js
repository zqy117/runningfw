var treemenu;
var selectedNode;
var tabstrip;
var tabindex;
jQuery.sap.declare("inspur.gsp.gspweb.Main")

sap.ui.core.mvc.Controller.extend("inspur.gsp.gspweb.Main", {

	//初始化
	init:function(){
		
		//model
		// treemenu.setVisible("false");
	},
	//DOM元素加载完成后
	onAfterRendering:function(){
		num = 1;
		var oView = this.getView();
		var oModelForMenuTree = oView.getModel("oModelForMenuTree");	// 加载右侧菜单数据
		// var oTransTree = new sap.ui.commons.Tree("treemenu");
		oView.setModel(oModelForMenuTree);
		var myshell=this.byId("myShell");
		var treemenu=this.byId("treemenu");
		var paneid=this.byId("pi_browser").getId();
		var that = this;
		$.ajax({  
        	// url: "http://localhost:8080/user/object",		// 取得menu数据
        	url: "http://localhost:8080/model",		// 取得menu数据
        	type: "Get",
        	dataType: "json",
        	//sync:false,
        	// data: {name:"test"},
       		success: function (json) {
       			// debugger
       			//eval('console.log(myshell)')
       			// var treemenu=owner.byId("treemenu");
       			for (var i = 0; i <json.menuList.length; i++) {
       				var childNode = new sap.ui.commons.TreeNode(json.menuList[i].name,{text:json.menuList[i].name});
       				// treemenu.addNode(new sap.ui.commons.TreeNode(json.menuList[i].name,{text:json.menuList[i].name}));
       				for (var j = 0; j < json.menuList[i].menuList.length; j++) {
       					// var lastChild = new sap.ui.commons.TreeNode(json.menuList[i].menuList[j].name,{text:json.menuList[i].menuList[j].name});
       					childNode.addNode(new sap.ui.commons.TreeNode(json.menuList[i].menuList[j].name,{text:json.menuList[i].menuList[j].name}));
       				};
       				treemenu.addNode(childNode);
       			};
        		oModelForMenuTree.setData(json);
        		oModelForMenuTree.refresh();
    		}
    	})
		myshell.openPane(paneid);
		myshell.setPaneContent(treemenu);
		tabstrip=this.byId("tabstrip");
		tabstrip.attachClose( function (oEvent) {
		tabstrip.closeTab(oEvent.getParameter("index"));

		});
		
	},

	// function handler(evtXHR) {  
	// 	console.log(xhr.responseText); 
	// }

	//Shell中nav一级导航选项切换
	worksetItemSelected: function(oEvent){
		tabstrip=this.byId("tabstrip");
		var oiframe=this.byId("iframecontent");
		var oifram=this.byId("iframeconten");
		var sId = oEvent.getParameter("key");
		var oShell = oEvent.oSource;		
		switch (sId) {
		case "wi_home":
			oShell.setContent(tabstrip);
			break;
		case "wi_1_1":
			oShell.setContent(new sap.ui.commons.TextView({text:new Date().toLocaleString()}), true);
			break;
		case "wi_1_2":
			oShell.setContent(new sap.ui.commons.Button({text:"button"}));
			break;
		case "wi_1_3":
			oShell.setContent(new sap.ui.commons.Image({src:"images/logo.jpg"}));
			break;
		case "wi_api":
			oShell.setContent(oifram);
			break;
		default:
			break;
		}
	},
	//点击树节点
	tree_click:function(oControlEvent){

		var oiframe=this.byId("iframecontent");
		var oifra=this.byId("iframecont");
		var currentnode = oControlEvent.getParameter("node");
		var nodetext=currentnode.getText();
		//var nodeindex=treemenu.getNodes().length;
		var tabstrip=this.byId("tabstrip");
        var selectedNode = currentnode;
        var TextView=new sap.ui.commons.TextView({text:"This is the content of TAB"+nodetext+"\nYou can close it on his right up!"});
        if (selectedNode != undefined) {
        	switch (nodetext) {
				case "Vegetarian diet":
					var oTab1 = new sap.ui.commons.Tab({
						title: new sap.ui.core.Title({text:nodetext})
						, closable: true
						, content: [oiframe]
					});
					tabstrip.addTab(oTab1);
					break;
				case "Vegetables":
					var oTab2 = new sap.ui.commons.Tab({title: new sap.ui.core.Title({text:nodetext}), closable: true, content: [oifra]});
					tabstrip.addTab(oTab2);
					break;
				default:
					// 创建iframe
					// var iframe=new sap.ui.core.HTML({
					// 	content:"<iframe src='http://localhost:9000/index2.html' width='100%' height='100%' scrolling='no' framespacing='0' border='0' frameborder='0'></ifram>"});
					var icomp = new sap.ui.core.ComponentContainer({
						name: "inspur.gsp.form"
					});
					var oTab = new sap.ui.commons.Tab({
						title: new sap.ui.core.Title({text:nodetext}), 
						closable: true, 
						content: [icomp]});
					tabstrip.addTab(oTab);
					break;
				}        	
			tabstrip.setSelectedIndex(tabstrip.getTabs().length - 1)
        	  
        }
	},

})