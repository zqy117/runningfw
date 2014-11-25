
jQuery.sap.declare("inspur.gsp.App")

sap.ui.core.mvc.Controller.extend("inspur.gsp.App", {
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
		//使第一个homeTab处于打开
		this.byId("homeTab").setText("工作中心" + pageId);
		this._openHomeTab();
	},

	_openHomeTab: function() {
		//使第一个homeTab处于打开
		var oTabStrip = this.byId("tabstrip");	
		oTabStrip.setSelectedIndex(0);		
	},

	onSelectWCenter : function(evt) {
		// get wcenter id
		var rawId = evt.getSource().getId();
		var centerId = rawId.substring(rawId.length-1);
		// alert("You select " + centerId);
		this.router.navTo("wcenter", {id:centerId}, false);	
		this._openHomeTab();
		return;		
	},

	onCloseTab : function(evt) {
		// alert("You close tab:" + evt.getParameter("index"));
		// 后面是需要的
		var oTabStrip = evt.oSource;
		oTabStrip.closeTab(evt.getParameter("index"));
		// oTabStrip.removeTab(evt.getParameter("index"));
	},

	onSelectTab : function(evt) {
		// alert("You select tab:" + evt.getParameter("index"));
		// 后面是不必要的
		// var oTabStrip = evt.oSource;
		// oTabStrip.setSelectedIndex(evt.getParameter("index"));				
	}
})