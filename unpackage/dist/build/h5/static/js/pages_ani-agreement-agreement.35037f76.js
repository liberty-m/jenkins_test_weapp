(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages_ani-agreement-agreement"],{"77bd":function(t,e,n){"use strict";n.r(e);var a=n("c6d6"),i=n.n(a);for(var r in a)["default"].indexOf(r)<0&&function(t){n.d(e,t,(function(){return a[t]}))}(r);e["default"]=i.a},c6d6:function(t,e,n){"use strict";n("7a82"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;e.default={data:function(){return{agreementType:0,content:""}},onLoad:function(t){var e=t.agreementType;this.agreementType=e,this.getAgreement()},methods:{getAgreement:function(){var t=this;this.$http.post("stuh5/agreement/selectOne",{agreementType:this.agreementType}).then((function(e){200==e.code?t.content=e.data.content:t.$util.showToast(e.msg)})).catch((function(e){t.$util.showToast(e.msg)}))}}}},f44f:function(t,e,n){"use strict";n.r(e);var a=n("f887"),i=n("77bd");for(var r in i)["default"].indexOf(r)<0&&function(t){n.d(e,t,(function(){return i[t]}))}(r);var u=n("f0c5"),c=Object(u["a"])(i["default"],a["b"],a["c"],!1,null,"d9bf4246",null,!1,a["a"],void 0);e["default"]=c.exports},f887:function(t,e,n){"use strict";n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return i})),n.d(e,"a",(function(){}));var a=function(){var t=this.$createElement,e=this._self._c||t;return e("v-uni-view",{staticClass:"pd-20"},[e("v-uni-rich-text",{attrs:{nodes:this.content}})],1)},i=[]}}]);