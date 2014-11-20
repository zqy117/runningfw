/*
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP SE or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/base/ManagedObject','./ComponentMetadata','./Core'],function(q,M,C,a){"use strict";var b=M.extend("sap.ui.core.Component",{constructor:function(i,s){M.apply(this,arguments)},metadata:{stereotype:"component","abstract":true,version:"0.0",includes:[],dependencies:{libs:[],components:[],ui5version:""},config:{},customizing:{},library:"sap.ui.core"}},C);b.activateCustomizing=function(c){};b.deactivateCustomizing=function(c){};b.getOwnerIdFor=function(o){if(o&&(o instanceof b||o instanceof sap.ui.core.mvc.View)){return M.getOwnerIdFor(o)}};b.prototype.getInterface=function(){return this};b.prototype._initCompositeSupport=function(s){this._mMockServers={};this.getMetadata().onInitComponent();this.oComponentData=s&&s.componentData;this.getMetadata().init();this.initComponentModels();if(this.onWindowError){this._fnWindowErrorHandler=q.proxy(function(e){var E=e.originalEvent;this.onWindowError(E.message,E.filename,E.lineno)},this);q(window).bind("error",this._fnWindowErrorHandler)}if(this.onWindowBeforeUnload){this._fnWindowBeforeUnloadHandler=q.proxy(this.onWindowBeforeUnload,this);q(window).bind("beforeunload",this._fnWindowBeforeUnloadHandler)}if(this.onWindowUnload){this._fnWindowUnloadHandler=q.proxy(this.onWindowUnload,this);q(window).bind("unload",this._fnWindowUnloadHandler)}};b.prototype.destroy=function(){if(this._mMockServers){q.each(this._mMockServers,function(n,m){m.stop()});delete this._mMockServers}if(this._fnWindowErrorHandler){q(window).unbind("error",this._fnWindowErrorHandler);delete this._fnWindowErrorHandler}if(this._fnWindowBeforeUnloadHandler){q(window).unbind("beforeunload",this._fnWindowBeforeUnloadHandler);delete this._fnWindowBeforeUnloadHandler}if(this._fnWindowUnloadHandler){q(window).unbind("unload",this._fnWindowUnloadHandler);delete this._fnWindowUnloadHandler}if(this._oEventBus){this._oEventBus.destroy();delete this._oEventBus}M.prototype.destroy.apply(this,arguments);this.getMetadata().onExitComponent()};b.prototype.getComponentData=function(){return this.oComponentData};b.prototype.getEventBus=function(){if(!this._oEventBus){q.sap.require("sap.ui.core.EventBus");this._oEventBus=new sap.ui.core.EventBus()}return this._oEventBus};b.prototype.initComponentModels=function(m,s){var o=this.getMetadata();var c=m||o.getModels(),S=s||o.getServices();if(c){var f=function(n,u,e,g){if(this._mMockServers[n]){this._mMockServers[n].stop()}q.sap.require("sap.ui.core.util.MockServer");this._mMockServers[n]=new sap.ui.core.util.MockServer({rootUri:u});this._mMockServers[n].simulate(e,g);this._mMockServers[n].start()};var d=function(n,e){var u=e.uri,T=e.type;q.sap.require(T);var g=q.sap.getObject(T);var h;if(T==="sap.ui.model.resource.ResourceModel"){h=new g({bundleUrl:u})}else if(T==="sap.ui.model.odata.ODataModel"){if(e.mockserver){f.call(this,n,u,e.mockserver.model,e.mockserver.data)}h=new g(u,e.settings)}else if(T==="sap.ui.model.json.JSONModel"||T==="sap.ui.model.xml.XMLModel"){h=new g();if(u){h.loadData(u)}}return h};var t=this;q.each(c,function(k,e){var g=e.service,h;if(g){var i=S[g];h=d.call(t,k,i)}else if(e.type){h=d.call(t,k,e)}if(h){t.setModel(h,k||undefined)}})}};sap.ui.component=function(c){if(!c){throw new Error("sap.ui.component cannot be called without parameter!")}if(typeof c==="string"){return sap.ui.getCore().getComponent(c)}else{var n=c.name,i=c.id,o=c.componentData,s=n+".Component",S=c.settings;var d=sap.ui.component.load(c,true);var I=new d(q.extend({},S,{id:i,componentData:o}));q.sap.log.info("Component instance Id = "+I.getId());return I}};sap.ui.component.load=function(c,f){var n=c.name,u=c.url,s=n+".Component",p=s+"-preload",P=sap.ui.getCore().getConfiguration().getComponentPreload();if(!n){throw new Error("The name of the component is undefined.")}if(u){q.sap.registerModulePath(n,u)}if(P==="sync"||P==="async"){try{if(!q.sap.isDeclared(s,true)){q.sap.require(p)}}catch(e){q.sap.log.warning("couldn't preload component from "+p+": "+((e&&e.message)||e))}}q.sap.require(s);var o=q.sap.getObject(s);if(!o){if(f){throw new Error("The specified component controller\""+s+"\" could not be found!")}else{q.sap.log.warning("The specified component controller \""+s+"\" could not be found!")}}return o};return b},true);
