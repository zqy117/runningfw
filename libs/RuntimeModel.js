jQuery.sap.declare("inspur.gsp.commons.RuntimeModel")

sap.ui.model.json.JSONModel.extend("inspur.gsp.commons.RuntimeModel", {

  constructor : function(arg) {
    if (arg.constructor == sap.ui.commons.TabStrip) {
      this.container = arg
      sap.ui.model.json.JSONModel.apply(this)
    } else {
      sap.ui.model.json.JSONModel.apply(this, arguments)
    }
  }

  , openFunc  : function(sTitle, sComponentId, oCallbacks) {
    var tabstrip = this.container
    var subComponent = new sap.ui.core.ComponentContainer({
        name: "inspur.gsp.rt.form"
      })
    var oTab = new sap.ui.commons.Tab({
        sId: sTitle,
        title: new sap.ui.core.Title({
          text: sTitle
        }),
        closable: true,
        content: [subComponent]
      })
    tabstrip.addTab(oTab)
    tabstrip.setSelectedIndex(rt.getTabs().length - 1)
    // tabstrip
  }
  
})