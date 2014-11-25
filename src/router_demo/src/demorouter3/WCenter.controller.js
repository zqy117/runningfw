
jQuery.sap.declare("inspur.gsp.WCenter")

sap.ui.core.mvc.Controller.extend("inspur.gsp.WCenter", {
	onInit: function(){
		this.router = sap.ui.core.UIComponent.getRouterFor(this);
		this.router.attachRoutePatternMatched(this._routeHandler, this);
	},

	_routeHandler: function(evt) {		
		//获取匹配名称和匹配参数
		var param = evt.getParameter("name");
		var pageId = evt.getParameter("arguments").id;

		//判断是否是本view的匹配，
		//这是必要的，因为从本controller启动后，所有的匹配事件都会告知该监听方法
		if("wcenter" !== param){
			return;
		}	
		//应当执行view的数据绑定工作
		this.byId("wcenterTitle").setText("工作中心" + pageId);
	},

	onSelectTask : function(evt) {
		// get text
		var tabText = evt.getSource().getText();
		// get tab strip control
		var oTabStrip = sap.ui.getCore().byId("__xmlview0--tabstrip");
		// create enw tab
		var oNewTab = new sap.ui.commons.Tab({text:tabText, closable:true});
		oNewTab.addContent(new sap.ui.commons.Label({text:"任务页面: " + tabText }));
		// 增加该Tab并使其打开
		oTabStrip.addTab(oNewTab);
		oTabStrip.setSelectedIndex(oTabStrip.getTabs().length-1);
	},
})