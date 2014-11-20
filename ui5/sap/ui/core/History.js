/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP SE or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/base/Object'],function(q,B){"use strict";var H=B.extend("sap.ui.core.History",{constructor:function(i,s){B.apply(this);if(!s){s={}}var h=s.prefix?s.prefix:document.location.pathname;this._iMaxHistory=s.max?s.max:100;this._sHistoryId=h+i;q.sap.require("jquery.sap.storage");this._oStorage=q.sap.storage(q.sap.storage.Type.local);this._fFilter=s.filter?s.filter:function(a,v){return a&&(!v||(v&&q.sap.startsWithIgnoreCase(a,v)))};this._fCheckHistory=s.checkHistory?s.checkHistory:function(a){return a}},_initHistory:function(){if(!this._aHistory){var h=this._oStorage.get(this._sHistoryId);if(typeof(h)==="string"){h=h.split(",")}else if(!h){h=[]}this._aHistory=this._fCheckHistory(h)}return this._aHistory},get:function(v){var h=this._initHistory();var r=[];for(var i=0;i<h.length;i++){if(this._fFilter(h[i],v)){r.push(h[i])}}return r},remove:function(v){var h=this._initHistory();for(var i=0;i<h.length;i++){if(h[i]==v){h.splice(i,1);break}}},add:function(v){var h=this._initHistory();for(var i=0;i<h.length;i++){if(h[i]===v){h.splice(i,1);break}}h.unshift(v);if(h.length>this._iMaxHistory){h.splice(this._iMaxHistory)}this._oStorage.put(this._sHistoryId,h)},clear:function(){this._oStorage.remove(this._sHistoryId);this._aHistory=null}});return H},true);
