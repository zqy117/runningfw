var treemenu;
var selectedNode;
var tabstrip;
var tabindex;
var iframess;
var oSimpleListBox;
var accordionss;
var curlistbox;

jQuery.sap.declare("inspur.gsp.rt.gspwebrouter.Main")
jQuery.sap.require("inspur.gsp.commons.Controller")

inspur.gsp.commons.Controller.extend("inspur.gsp.rt.gspwebrouter.Main", {

	onInit: function(){
		inspur.gsp.commons.Controller.apply(this, arguments)

		tabstrip=this.byId("tabstrip");
		components = new Array()
	},
	
	// 工作重心初始化事件
	// 绑定生成的工作中心
	workCenterInitHandler: function(json) {
		for (var i = 0; i < json.length; i++) {
			myShell.addWorksetItem(new sap.ui.ux3.NavigationItem(
				"item" + json[i].id, {
					key: json[i].id,
					text: json[i].name
				}))
			components[i] = {
				id: json[i].id,
				component: json[i].componentId,
				name: json[i].name
			}
		}

		var worksetItems = myShell.getWorksetItems()

		this.menuTreeInitHandler.apply(this, [components[0].id, components[0].name])
	},

	// 菜单树数据绑定事件
	menuTreeInitHandler: function(componentId, componentTitle) {

		var that = this;
		var accordion = that.byId("accordion")	// 获取accordion控件
		debugger
		accordion.destroySections()	// 删除所有控件进行重新绑定
		$.ajax({
			url: "http://liuning.gsp/app/model/menuDetail.do",
			type: "Get",
			dataType: "json",
			data: {
				name: componentId
			},
			success: function(json) {
				debugger
				for (var i = 0; i < json.length; i++) {
					var childAccordion = new sap.ui.commons.AccordionSection("childAccordion" + json[i].id, {
						title: json[i].name,
						maxHeight : "130px",
					})
					if (json[i].menuList != null) { 
						childAccordion.setMaxHeight="100px"
						var addList = new sap.ui.commons.ListBox("childAccordionList" + json[i].id,{
							select : function() {
								that.selectList.apply(that, arguments)	// 讲对象传入函数的作用域链中
							},
							maxHeight:"200px"
						})
						for (var j = 0; j < json[i].menuList.length; j++) {
							addList.addItem(new sap.ui.core.ListItem("listItem" + json[i].menuList[j].id, {
								text: json[i].menuList[j].name
							}))
						}
						childAccordion.addContent(addList);
					}
					accordion.addSection(childAccordion)
				}
				var introduction = accordion.getSections()[0]

				introduction.scroll = function(){
					console.log("dagas")
				}

				introduction.setMaxHeight("30px");

				accordion.getSections()[0].collapsed = "true" 	// 第一个list展开
			}
		})
	},

	//DOM元素加载完成后
	onAfterRendering:function(){
		// var accordionview=new sap.ui.core.mvc.XMLView({viewName:"inspur.gsp.rt.gspwebrouter.Accordion"});
		myShell=this.byId("myShell")
		var paneid=this.byId("pi_browser").getId()
			, that = this
			, oModelUser = this.getModel("oModelUser")
		// 加载
		$.ajax({
			// url: "http://localhost:8080/user/object",		// 取得menu数据
			url: "http://liuning.gsp/app/model/menuList.do", // 取得menu数据
			// url: "http://liubiao.gsp:18080/app/model/menuList.do",
			type: "Get",
			dataType: "json",
			success: function(data) {
				that.workCenterInitHandler.apply(that, arguments)
			}
		})

		// 获取user信息
		$.ajax({
			url: "http://liuning.gsp/app/model/user.do", // 取得menu数据
			type:"get",
			dataType:"json",
			success:function(json){
				debugger
				oModelUser.setData(json)
        		oModelUser.refresh()
			}
		})
		myShell.openPane(paneid);
		var tabstrip=this.byId("tabstrip");
		tabstrip.attachClose( function (oEvent) {
			tabstrip.closeTab(oEvent.getParameter("index"));
		});
		var flowtabstrip=this.byId("flow-strip");
		flowtabstrip.attachClose( function (oEvent) {
			flowtabstrip.closeTab(oEvent.getParameter("index"));
		});


	},
	//Shell中nav一级导航选项切换
	worksetItemSelected: function(oEvent){
		tabstrip = this.byId("tabstrip")
		var sId = oEvent.getParameter("key") // componentId
		var currentComponent = this.findComponent(sId)
		this.menuTreeInitHandler(sId, currentComponent.name)

	},

	ShowContainer:function(oEvent) {
		var oOverlayContainer=this.byId("overlaycontainer");
		if(!oOverlayContainer.isOpen()){
			oOverlayContainer.open();
		}
	},
	paneClosed : function(oEvent) {
 	    var myShell=this.byId("myShell");
 	    if(!myShell.isPaneOpen()){
			myShell.addStyleClass("wrapss");
		}   
 	},
 	paneBarItemSelected:function(oEvent){
 		var myShell=this.byId("myShell");
		myShell.removeStyleClass("wrapss");
 	},

 	selectList:function(evt){		
		var currentnode = evt.getSource().getSelectedItem()

		if (!currentnode) return
			debugger
		var nodeText = currentnode.getText()
		this.getRuntime().openFunc(this, nodeText, "inspur.gsp.rt.form", {
			formMeta	: new sap.ui.model.json.JSONModel({
				title	: nodeText
				, from	: "运行时框架"
			})
		})
 	},

 	findComponent: function(componentId) {
		for (var i = components.length - 1; i >= 0; i--) {
			if (components[i].id == componentId) {
				return components[i]
			}
		}
	},

 	
})
function addTab(oSimpleListBox){	
	jQuery.each(oSimpleListBox.getSelectedItems(), function(idx,item) {			
			var currentTabTitle=item.getText().substring(1);
            var TextView=new sap.ui.commons.TextView({text:"This is the content of TAB"+currentTabTitle+"\nYou can close it on his right up!"});
       		var oTab= new sap.ui.commons.Tab({title: new sap.ui.core.Title({text:currentTabTitle}), closable: true, content: [TextView]});
				tabstrip.addTab(oTab);
     	});
		tabstrip.setSelectedIndex(tabstrip.getTabs().length - 1) 
}