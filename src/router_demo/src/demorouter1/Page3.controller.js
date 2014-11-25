
jQuery.sap.declare("inspur.gsp.Page3")

sap.ui.core.mvc.Controller.extend("inspur.gsp.Page3", {

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
		if("pn" !== param){
			return;
		}

		this._bindingData(param, pageId);
	},

	_bindingData: function(routeName, pageId){
		this.byId("textRoute").setText(routeName);
		this.byId("textId").setText(pageId);
	}

})