jQuery.sap.declare("inspur.gsp.commons.Controller")

// 运行框架总的控制基类
sap.ui.core.mvc.Controller.extend("inspur.gsp.commons.Controller", {

	//重载getModel函数
	getModel  : function() {
		var view = this.getView()
		return view.getModel.apply(view, arguments)
	}

	// 返回Key值为runtime的model
	// 在这个函数例子中，js的function定义可以有参数也可以没有参数，如果不指定参数
	// 则会出现在arguments中，arguments是自己封装的一种数据结构，与数组类似
	, getRuntime: function() {
		return this.getModel("runtime")
	}

})