(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages_ani-mine-applyRefund-applyRefund~pages_ani-mine-collectionCourse-collectionCourse~pages_ani-mi~1efafd14"],{3161:function(t,i,a){var e=a("a477");e.__esModule&&(e=e.default),"string"===typeof e&&(e=[[t.i,e,""]]),e.locals&&(t.exports=e.locals);var s=a("4f06").default;s("5c546419",e,!0,{sourceMap:!1,shadowMode:!1})},3250:function(t,i,a){var e=a("7eb0");e.__esModule&&(e=e.default),"string"===typeof e&&(e=[[t.i,e,""]]),e.locals&&(t.exports=e.locals);var s=a("4f06").default;s("71137994",e,!0,{sourceMap:!1,shadowMode:!1})},"3bb0":function(t,i,a){"use strict";a.r(i);var e=a("ecd5"),s=a.n(e);for(var n in e)["default"].indexOf(n)<0&&function(t){a.d(i,t,(function(){return e[t]}))}(n);i["default"]=s.a},"3c36":function(t,i,a){"use strict";a.r(i);var e=a("45e4"),s=a.n(e);for(var n in e)["default"].indexOf(n)<0&&function(t){a.d(i,t,(function(){return e[t]}))}(n);i["default"]=s.a},"44d6":function(t,i,a){"use strict";var e=a("3161"),s=a.n(e);s.a},"45e4":function(t,i,a){"use strict";a("7a82");var e=a("4ea4").default;Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var s=e(a("668b")),n={name:"u-tag",mixins:[uni.$u.mpMixin,uni.$u.mixin,s.default],data:function(){return{}},computed:{style:function(){var t={};return this.bgColor&&(t.backgroundColor=this.bgColor),this.color&&(t.color=this.color),this.borderColor&&(t.borderColor=this.borderColor),t},textColor:function(){var t={};return this.color&&(t.color=this.color),t},imgStyle:function(){var t="large"===this.size?"17px":"medium"===this.size?"15px":"13px";return{width:t,height:t}},closeSize:function(){var t="large"===this.size?15:"medium"===this.size?13:12;return t},iconSize:function(){var t="large"===this.size?21:"medium"===this.size?19:16;return t},elIconColor:function(){return this.iconColor?this.iconColor:this.plain?this.type:"#ffffff"}},methods:{closeHandler:function(){this.$emit("close",this.name)},clickHandler:function(){this.$emit("click",this.name)}}};i.default=n},"668b":function(t,i,a){"use strict";a("7a82"),Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0,a("a9e3");var e={props:{type:{type:String,default:uni.$u.props.tag.type},disabled:{type:[Boolean,String],default:uni.$u.props.tag.disabled},size:{type:String,default:uni.$u.props.tag.size},shape:{type:String,default:uni.$u.props.tag.shape},text:{type:[String,Number],default:uni.$u.props.tag.text},bgColor:{type:String,default:uni.$u.props.tag.bgColor},color:{type:String,default:uni.$u.props.tag.color},borderColor:{type:String,default:uni.$u.props.tag.borderColor},closeColor:{type:String,default:uni.$u.props.tag.closeColor},name:{type:[String,Number],default:uni.$u.props.tag.name},plainFill:{type:Boolean,default:uni.$u.props.tag.plainFill},plain:{type:Boolean,default:uni.$u.props.tag.plain},closable:{type:Boolean,default:uni.$u.props.tag.closable},show:{type:Boolean,default:uni.$u.props.tag.show},icon:{type:String,default:uni.$u.props.tag.icon}}};i.default=e},"75c0":function(t,i,a){"use strict";a.d(i,"b",(function(){return s})),a.d(i,"c",(function(){return n})),a.d(i,"a",(function(){return e}));var e={uTransition:a("9236").default,uIcon:a("9815").default},s=function(){var t=this,i=t.$createElement,a=t._self._c||i;return a("u-transition",{attrs:{mode:"fade",show:t.show}},[a("v-uni-view",{staticClass:"u-tag-wrapper"},[a("v-uni-view",{staticClass:"u-tag",class:["u-tag--"+t.shape,!t.plain&&"u-tag--"+t.type,t.plain&&"u-tag--"+t.type+"--plain","u-tag--"+t.size,t.plain&&t.plainFill&&"u-tag--"+t.type+"--plain--fill"],style:[{marginRight:t.closable?"10px":0,marginTop:t.closable?"10px":0},t.style],on:{click:function(i){i.stopPropagation(),arguments[0]=i=t.$handleEvent(i),t.clickHandler.apply(void 0,arguments)}}},[t._t("icon",[t.icon?a("v-uni-view",{staticClass:"u-tag__icon"},[t.$u.test.image(t.icon)?a("v-uni-image",{style:[t.imgStyle],attrs:{src:t.icon}}):a("u-icon",{attrs:{color:t.elIconColor,name:t.icon,size:t.iconSize}})],1):t._e()]),a("v-uni-text",{staticClass:"u-tag__text",class:["u-tag__text--"+t.type,t.plain&&"u-tag__text--"+t.type+"--plain","u-tag__text--"+t.size],style:[t.textColor]},[t._v(t._s(t.text))])],2),t.closable?a("v-uni-view",{staticClass:"u-tag__close",class:["u-tag__close--"+t.size],style:{backgroundColor:t.closeColor},on:{click:function(i){i.stopPropagation(),arguments[0]=i=t.$handleEvent(i),t.closeHandler.apply(void 0,arguments)}}},[a("u-icon",{attrs:{name:"close",size:t.closeSize,color:"#ffffff"}})],1):t._e()],1)],1)},n=[]},"7eb0":function(t,i,a){var e=a("24fb");i=e(!1),i.push([t.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */uni-page-body[data-v-57625358]{color:#333;font-size:%?24?%}.global-wrap[data-v-57625358]{background-color:#f6f6f6;min-height:100vh}\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.graphic-wrap .detail-wrap[data-v-57625358]{padding:%?20?%;background-color:#fff}.graphic-wrap .detail-wrap.collection[data-v-57625358]{border-radius:%?20?%;background-color:#fff;padding:%?20?%;margin-bottom:%?20?%}.graphic-wrap .list-wrap[data-v-57625358]{border-radius:%?20?%;background-color:#fff;padding:%?20?%;margin-bottom:%?20?%}.graphic-wrap .header[data-v-57625358]{display:flex;align-items:center;height:%?40?%;margin-bottom:%?20?%}.graphic-wrap .header .title[data-v-57625358]{display:flex;align-items:center;margin-right:auto}.graphic-wrap .header .title uni-image[data-v-57625358]{width:%?32?%;height:%?32?%;margin-right:%?10?%}.graphic-wrap .content[data-v-57625358]{display:flex}.graphic-wrap .content .img-wrap[data-v-57625358]{width:%?254?%;height:%?144?%;margin-right:%?20?%;margin-top:%?8?%}.graphic-wrap .content .img-wrap uni-image[data-v-57625358]{width:100%;height:100%}.graphic-wrap .content .tag[data-v-57625358]{display:flex}.graphic-wrap .content .tag .failure[data-v-57625358]{border-radius:%?40?%;padding:%?5?% %?16?%;color:#999;background-color:#f2f2f2}.graphic-wrap .content .refund-money[data-v-57625358]{display:flex;justify-content:flex-end;align-items:center}.graphic-wrap .g-line[data-v-57625358]{padding-top:%?26?%;margin-bottom:%?20?%;border-bottom:%?1?% solid #f2f2f2}.graphic-wrap .detail-footer[data-v-57625358]{display:flex;justify-content:flex-end}.graphic-wrap .list-footer[data-v-57625358]{display:flex;align-items:center;height:%?62?%;background-color:#fbfbfb;padding:%?5?% %?10?%;border-radius:%?8?%}.graphic-wrap .list-footer uni-view[data-v-57625358]{margin-left:auto}.graphic-wrap .collection-footer[data-v-57625358]{display:flex;justify-content:space-between;align-items:center;margin-top:%?10?%}.graphic-wrap .institution .item[data-v-57625358]{padding:20px 10px 0 10px;background-color:#fff;margin-bottom:%?15?%;border-radius:%?16?%}.graphic-wrap .institution .item uni-image[data-v-57625358]{width:%?180?%;height:%?180?%}.graphic-wrap .institution .item .info[data-v-57625358]{display:flex}.graphic-wrap .institution .item .info .img-wrap[data-v-57625358]{width:%?208?%;position:relative}.graphic-wrap .institution .item .info .img-wrap uni-image[data-v-57625358]{border-radius:%?16?%}.graphic-wrap .institution .item .info .img-wrap .number[data-v-57625358]{position:absolute;left:0;bottom:0;width:%?180?%;height:%?40?%;line-height:%?40?%;text-align:center;color:#fff;border-bottom-left-radius:%?10?%;border-bottom-right-radius:%?10?%;background-color:rgba(51,51,51,.5)}.graphic-wrap .institution .item .info .tag[data-v-57625358]{display:flex;flex-wrap:wrap;margin:%?10?% 0}.graphic-wrap .institution .item .info .tag .u-tag[data-v-57625358]{margin-right:%?10?%}.graphic-wrap .institution .item .location[data-v-57625358]{display:flex;align-items:center;justify-content:space-between;width:100%}.graphic-wrap .institution .item .location uni-text[data-v-57625358]:first-child{color:#333}.graphic-wrap .institution .item .location uni-text[data-v-57625358]:nth-child(2){margin-right:auto;margin-left:%?10?%}.graphic-wrap .institution .item .subject[data-v-57625358]{margin-top:%?10?%;border-top:%?1?% solid #ececec}.graphic-wrap .institution .item .subject .row[data-v-57625358]{display:flex;align-items:center;justify-content:space-between;border-bottom:%?1?% dashed #e2e2e2;padding:%?10?% 0}.graphic-wrap .institution .item .subject .row .sub_title[data-v-57625358]{width:%?208?%;color:#cb242b;font-size:%?32?%;font-weight:500;text-align:right}.graphic-wrap .institution .item .subject .row .course[data-v-57625358]{display:flex;align-items:center;margin-right:auto}.graphic-wrap .institution .item .subject .row .ke[data-v-57625358]{background-color:rgba(203,36,43,.2);color:#cb242b;padding:%?2?% %?4?%;margin-right:8px}.graphic-wrap .institution .item .subject .row[data-v-57625358]:last-child{border:none}.graphic-wrap .order[data-v-57625358]{border-radius:%?16?%}.graphic-wrap .order .img-wrap[data-v-57625358]{height:%?132?%!important;border-radius:%?7?%;overflow:hidden}.graphic-wrap .order .img-wrap uni-image[data-v-57625358]{height:100%}',""]),t.exports=i},"9f7d":function(t,i,a){"use strict";var e=a("3250"),s=a.n(e);s.a},a477:function(t,i,a){var e=a("24fb");i=e(!1),i.push([t.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */uni-page-body[data-v-2cf78b47]{color:#333;font-size:%?24?%}.global-wrap[data-v-2cf78b47]{background-color:#f6f6f6;min-height:100vh}\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */uni-view[data-v-2cf78b47], uni-scroll-view[data-v-2cf78b47], uni-swiper-item[data-v-2cf78b47]{display:flex;flex-direction:column;flex-shrink:0;flex-grow:0;flex-basis:auto;align-items:stretch;align-content:flex-start}.u-tag-wrapper[data-v-2cf78b47]{position:relative}.u-tag[data-v-2cf78b47]{display:flex;flex-direction:row;align-items:center;border-style:solid}.u-tag--circle[data-v-2cf78b47]{border-radius:100px}.u-tag--square[data-v-2cf78b47]{border-radius:3px}.u-tag__icon[data-v-2cf78b47]{margin-right:4px}.u-tag__text--mini[data-v-2cf78b47]{font-size:12px;line-height:12px}.u-tag__text--medium[data-v-2cf78b47]{font-size:13px;line-height:13px}.u-tag__text--large[data-v-2cf78b47]{font-size:15px;line-height:15px}.u-tag--mini[data-v-2cf78b47]{height:22px;line-height:22px;padding:0 5px}.u-tag--medium[data-v-2cf78b47]{height:26px;line-height:22px;padding:0 10px}.u-tag--large[data-v-2cf78b47]{height:32px;line-height:32px;padding:0 15px}.u-tag--primary[data-v-2cf78b47]{background-color:#3c9cff;border-width:1px;border-color:#3c9cff}.u-tag--primary--plain[data-v-2cf78b47]{border-width:1px;border-color:#3c9cff}.u-tag--primary--plain--fill[data-v-2cf78b47]{background-color:#ecf5ff}.u-tag__text--primary[data-v-2cf78b47]{color:#fff}.u-tag__text--primary--plain[data-v-2cf78b47]{color:#3c9cff}.u-tag--error[data-v-2cf78b47]{background-color:#f56c6c;border-width:1px;border-color:#f56c6c}.u-tag--error--plain[data-v-2cf78b47]{border-width:1px;border-color:#f56c6c}.u-tag--error--plain--fill[data-v-2cf78b47]{background-color:#fef0f0}.u-tag__text--error[data-v-2cf78b47]{color:#fff}.u-tag__text--error--plain[data-v-2cf78b47]{color:#f56c6c}.u-tag--warning[data-v-2cf78b47]{background-color:#f9ae3d;border-width:1px;border-color:#f9ae3d}.u-tag--warning--plain[data-v-2cf78b47]{border-width:1px;border-color:#f9ae3d}.u-tag--warning--plain--fill[data-v-2cf78b47]{background-color:#fdf6ec}.u-tag__text--warning[data-v-2cf78b47]{color:#fff}.u-tag__text--warning--plain[data-v-2cf78b47]{color:#f9ae3d}.u-tag--success[data-v-2cf78b47]{background-color:#5ac725;border-width:1px;border-color:#5ac725}.u-tag--success--plain[data-v-2cf78b47]{border-width:1px;border-color:#5ac725}.u-tag--success--plain--fill[data-v-2cf78b47]{background-color:#f5fff0}.u-tag__text--success[data-v-2cf78b47]{color:#fff}.u-tag__text--success--plain[data-v-2cf78b47]{color:#5ac725}.u-tag--info[data-v-2cf78b47]{background-color:#909399;border-width:1px;border-color:#909399}.u-tag--info--plain[data-v-2cf78b47]{border-width:1px;border-color:#909399}.u-tag--info--plain--fill[data-v-2cf78b47]{background-color:#f4f4f5}.u-tag__text--info[data-v-2cf78b47]{color:#fff}.u-tag__text--info--plain[data-v-2cf78b47]{color:#909399}.u-tag__close[data-v-2cf78b47]{position:absolute;z-index:999;top:10px;right:10px;border-radius:100px;background-color:#c6c7cb;display:flex;flex-direction:row;align-items:center;justify-content:center;-webkit-transform:scale(.6) translate(80%,-80%);transform:scale(.6) translate(80%,-80%)}.u-tag__close--mini[data-v-2cf78b47]{width:18px;height:18px}.u-tag__close--medium[data-v-2cf78b47]{width:22px;height:22px}.u-tag__close--large[data-v-2cf78b47]{width:25px;height:25px}',""]),t.exports=i},b827:function(t,i,a){"use strict";a.r(i);var e=a("75c0"),s=a("3c36");for(var n in s)["default"].indexOf(n)<0&&function(t){a.d(i,t,(function(){return s[t]}))}(n);a("44d6");var r=a("f0c5"),o=Object(r["a"])(s["default"],e["b"],e["c"],!1,null,"2cf78b47",null,!1,e["a"],void 0);i["default"]=o.exports},c90c:function(t,i,a){"use strict";a.r(i);var e=a("fb6d"),s=a("3bb0");for(var n in s)["default"].indexOf(n)<0&&function(t){a.d(i,t,(function(){return s[t]}))}(n);a("9f7d");var r=a("f0c5"),o=Object(r["a"])(s["default"],e["b"],e["c"],!1,null,"57625358",null,!1,e["a"],void 0);i["default"]=o.exports},ecd5:function(t,i,a){"use strict";a("7a82"),Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var e=a("6198"),s={props:{showType:{type:String,default:"list"},from:{type:String,default:"detail"},list:{type:Array},detail:{type:Object},track:{type:Boolean,default:!1},isHistory:{type:Boolean,default:!1}},data:function(){return{ossUrl:e.ossUrl,dicAftersaleStatus:{1:"待审核",2:"退款中",3:"退款成功",4:"拒绝退款",5:"客服协商仲裁",6:"售后关闭"},dicOrderStatus:{0:"待支付",1:"待付尾款",2:"付款完成",3:"已入学",4:"已取消",5:"售后",6:"交易关闭"}}}};i.default=s},fb6d:function(t,i,a){"use strict";a.d(i,"b",(function(){return s})),a.d(i,"c",(function(){return n})),a.d(i,"a",(function(){return e}));var e={uTag:a("b827").default},s=function(){var t=this,i=t.$createElement,a=t._self._c||i;return a("v-uni-view",{staticClass:"graphic-wrap"},["list"===t.showType?[a("v-uni-view",{staticClass:"list-wrap"},[a("v-uni-view",{staticClass:"header"},[a("v-uni-view",{staticClass:"title fz-28"},[a("v-uni-image",{attrs:{src:"/static/images/school-icon.png",mode:""}}),a("v-uni-view",{staticClass:"u-line-1 w-420"},[t._v("黎明大学猎学教育中心黎明大学猎学教育中心")])],1),a("v-uni-view",{staticClass:"color-red"},[t._v("待审核")])],1),a("v-uni-view",{staticClass:"content"},[a("v-uni-view",{staticClass:"text"},[a("v-uni-view",{staticClass:"title fz-28 fw-500 mb-5 u-line-1 w-420"},[t._v("2022年大连理工大学网络教2022年大连理工大学网络教")]),a("v-uni-view",{staticClass:"txt color-999 mb-5 u-line-2 w-420"},[t._v("2022学年/计算机网络专业/预缴报 名费2022学年/计算机网络专业/预缴报 名费")]),a("v-uni-view",{staticClass:"refund-money"},[a("v-uni-text",{staticClass:"fz-28 mr-10"},[t._v("申请退款")]),a("v-uni-text",{staticClass:"fz-36 fw-500 color-red"},[t._v("¥ 1380.00")])],1)],1)],1),a("v-uni-view",{staticClass:"g-line"}),a("v-uni-view",{staticClass:"list-footer"},[a("v-uni-text",{staticClass:"fz-28 mr-20"},[t._v("退款中")]),a("v-uni-text",{staticClass:"color-999 u-line-1 w-480"},[t._v("机构已通过您的退款申请，正在退款中机构已通过您的退款申请，正在退款中")]),a("v-uni-view",{staticClass:"color-999 iconfont icon-youjiantou_huaban"})],1)],1)]:"refund"===t.showType?t._l(t.list,(function(i){return a("v-uni-view",{staticClass:"list-wrap",on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.$emit("click-item",i)}}},[a("v-uni-view",{staticClass:"header"},[a("v-uni-view",{staticClass:"title fz-28"},[a("v-uni-image",{attrs:{src:"/static/images/school-icon.png",mode:""}}),a("v-uni-view",{staticClass:"u-line-1 w-420"},[t._v(t._s(i.mechName))])],1),i.orderAftersale?a("v-uni-view",{staticClass:"color-red"},[t._v(t._s(t.dicAftersaleStatus[i.orderAftersale.aftersaleStatus]))]):t._e()],1),a("v-uni-view",{staticClass:"content"},[a("v-uni-view",{staticClass:"img-wrap"},[a("v-uni-image",{attrs:{src:t.ossUrl+i.orderItems[0].mainPic,mode:"scaleToFill"}})],1),a("v-uni-view",{staticClass:"text"},[a("v-uni-view",{staticClass:"title fz-28 fw-500 mb-5 u-line-1 w-420"},[t._v(t._s(i.orderItems[0].courName))]),a("v-uni-view",{staticClass:"txt color-999 mb-5 u-line-2 w-420"},[t._v(t._s(i.orderItems[0].gradeName)+"/"+t._s(i.orderItems[0].subjectName)+"/"+t._s(1===i.payMethod?"全款":"预缴报名费"))]),a("v-uni-view",{staticClass:"refund-money"},[a("v-uni-text",{staticClass:"fz-28 mr-10"},[t._v("申请退款")]),i.orderAftersale?a("v-uni-text",{staticClass:"fz-36 fw-500 color-red"},[t._v("¥ "+t._s(i.orderAftersale.amount/100))]):t._e()],1)],1)],1),a("v-uni-view",{staticClass:"g-line"}),a("v-uni-view",{staticClass:"list-footer flex"},[i.orderAftersale?a("v-uni-text",{staticClass:"fz-28 mr-auto"},[t._v(t._s(t.dicAftersaleStatus[i.orderAftersale.aftersaleStatus]))]):t._e(),a("v-uni-view",{staticClass:"color-999 iconfont icon-youjiantou_huaban"})],1)],1)})):"detail"===t.showType?[a("v-uni-view",{staticClass:"detail-wrap"},[a("v-uni-view",{staticClass:"header"},[a("v-uni-view",{staticClass:"title fz-32 fw-500"},[a("v-uni-view",{staticClass:"gradient"}),a("v-uni-view",{staticClass:"u-line-1 w-420"},[t._v(t._s(t.detail.schoolName))])],1),"refund"!==t.from?a("v-uni-view",{staticClass:"color-red"},[t._v(t._s(t.dicOrderStatus[t.detail.orderStatus]))]):t._e()],1),t.detail.orderItems?a("v-uni-view",{staticClass:"content"},[a("v-uni-view",{staticClass:"img-wrap"},[a("v-uni-image",{attrs:{src:t.ossUrl+t.detail.orderItems[0].mainPic,mode:"scaleToFill"}})],1),a("v-uni-view",{staticClass:"text"},[a("v-uni-view",{staticClass:"title fz-28 fw-500 mb-5 u-line-1 w-420"},[t._v(t._s(t.detail.orderItems[0].courName))]),a("v-uni-view",{staticClass:"txt color-999 mb-5 u-line-2 w-420"},[t._v(t._s(t.detail.orderItems[0].gradeName)+"/"+t._s(t.detail.orderItems[0].subjectName)+"/"+t._s(1===t.detail.payMethod?"全款":"预缴报名费"))]),a("v-uni-view",{staticClass:"tag"},[a("v-uni-view",{staticClass:"mr-10"},[a("u-tag",{attrs:{color:"#CB242B",borderColor:"#CB242B",size:"mini",text:"7天无理由退换货",plain:!0,shape:"circle"}})],1),a("v-uni-view",{staticClass:"mr-10"},[a("u-tag",{attrs:{color:"#CB242B",borderColor:"#CB242B",size:"mini",text:"平台担保",plain:!0,shape:"circle"}})],1)],1)],1)],1):t._e(),a("v-uni-view",{staticClass:"g-line"}),a("v-uni-view",{staticClass:"detail-footer"},[a("v-uni-view",[t._v("总费用 ¥ "+t._s(t.detail.orderItems[0].allPrice/100))]),a("v-uni-view",{staticClass:"ml-15"},[t._v("已支付"),a("v-uni-text",{staticClass:"color-red ml-10"},[t._v("¥ "+t._s(t.detail.payAmount/100))])],1)],1)],1)]:"collection"===t.showType?t._l(t.list,(function(i,e){return a("v-uni-view",{key:e,staticClass:"detail-wrap collection",on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.$emit("click-item",i)}}},[a("v-uni-view",{staticClass:"header"},[a("v-uni-view",{staticClass:"title fz-28"},[a("v-uni-image",{attrs:{src:"/static/images/school-icon.png",mode:""}}),a("v-uni-view",{staticClass:"u-line-1 w-420"},[t._v(t._s(i.courName))])],1),a("v-uni-view",{staticClass:"color-999"}),a("v-uni-view",{staticClass:"color-999 fw-500 iconfont icon-youjiantou_huaban mt-5 ml-5"})],1),a("v-uni-view",{staticClass:"content"},[a("v-uni-view",{staticClass:"img-wrap"},[a("v-uni-image",{attrs:{src:t.ossUrl+i.mainPic,mode:"scaleToFill"}})],1),a("v-uni-view",{staticClass:"text"},[a("v-uni-view",{staticClass:"title fz-28 fw-500 mb-5 u-line-2 w-420"},[t._v(t._s(i.courName))]),a("v-uni-view",{staticClass:"tag"},[1==!i.ifFail?a("v-uni-view",{staticClass:"mr-10"},[0==t.isHistory?a("u-tag",{attrs:{color:"#CB242B",borderColor:"#CB242B",size:"mini",text:"已上架",plain:!0,shape:"circle"}}):a("u-tag",{attrs:{color:"#CB242B",borderColor:"#CB242B",size:"mini",text:i.category4Name?i.category4Name:i.category3Name?i.category3Name:i.category2Name?i.category2Name:i.category1Name,plain:!0,shape:"circle"}})],1):a("v-uni-view",{staticClass:"failure"},[t._v("已失效")])],1)],1)],1),a("v-uni-view",{staticClass:"collection-footer"},[t.track?[a("v-uni-view",{staticClass:"color-999"},[t._v("已报名"+t._s(i.sortNum)+"人")])]:[a("v-uni-view",{staticClass:"color-999"},[t._v("已报名"+t._s(i.signupNum)+"人")])],a("v-uni-view",{staticClass:"color-red fz-32 fw-500"},[t._v("￥"+t._s(i.money/100))])],2)],1)})):"institution"===t.showType?[a("v-uni-view",{staticClass:"institution"},t._l(t.list,(function(i,e){return a("v-uni-view",{staticClass:"item",on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.$emit("click-item",i)}}},[a("v-uni-view",{staticClass:"info"},[a("v-uni-view",{staticClass:"img-wrap mr-20"},[i.mechanismLogo?a("v-uni-image",{attrs:{src:t.ossUrl+i.mechanismLogo,mode:"scaleToFill"}}):a("v-uni-image",{attrs:{src:t.ossUrl+i.shopLogo,mode:""}})],1),a("v-uni-view",[a("v-uni-view",{staticClass:"fz-32 fw-500 u-line-1 w-430"},[t._v(t._s(i.managementName))]),a("v-uni-view",{staticClass:"tag"},t._l(i.lables,(function(e,s){return s<=5?a("v-uni-view",{staticClass:"mr-10 mb-10"},[a("u-tag",{attrs:{color:"#CB242B",borderColor:"#CB242B",size:"mini",text:e,plain:!0,shape:"circle"},on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.$emit("click-item",i)}}})],1):t._e()})),1),i.signupNum?a("v-uni-view",{staticClass:"color-333 pt-10 fz-24 fw-500"},[a("v-uni-text",{staticClass:"u-line-1 w-320"},[t._v("已报名 "+t._s(i.signupNum))])],1):t._e()],1)],1),a("v-uni-view",{staticClass:"color-333 pt-20 location"},[a("v-uni-text",{staticClass:"iconfont icon-weizhi"}),a("v-uni-text",{staticClass:"u-line-1 w-520 inline-block color-999"},[t._v(t._s(i.address))]),a("v-uni-text",{staticClass:"color-999"})],1),a("v-uni-view",{staticClass:"subject"},t._l(i.courseList,(function(i){return a("v-uni-view",{staticClass:"row"},[a("v-uni-view",{staticClass:"ke"},[a("v-uni-text",[t._v("课")])],1),a("v-uni-view",{staticClass:"course fw-500"},[a("v-uni-text",{staticClass:"inline-block u-line-1 w-320"},[t._v(t._s(i.courName))])],1),a("v-uni-view",{staticClass:"sub_title"},[t._v(t._s(i.money/100))])],1)})),1)],1)})),1)]:"order"===t.showType?t._l(t.list,(function(i){return a("v-uni-view",{staticClass:"detail-wrap order mb-15"},[a("v-uni-view",{staticClass:"header"},[a("v-uni-view",{staticClass:"title fz-28"},[a("v-uni-image",{staticClass:"w-32 h-32",attrs:{src:"/static/images/school-icon.png",mode:""}}),a("v-uni-view",{staticClass:"u-line-1 w-420"},[t._v(t._s(i.schoolName))])],1),a("v-uni-view",{class:4===i.orderStatus?"color-999":"color-red"},[t._v(t._s(t.dicOrderStatus[i.orderStatus]))])],1),a("v-uni-view",{staticClass:"content",on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.$emit("click-item",i)}}},[a("v-uni-view",{staticClass:"img-wrap"},[a("v-uni-image",{attrs:{src:t.ossUrl+i.orderItems[0].mainPic,mode:"scaleToFill"}})],1),a("v-uni-view",{staticClass:"text"},[a("v-uni-view",{staticClass:"title fz-28 fw-500 mb-5 u-line-1 w-420"},[t._v(t._s(i.orderItems[0].courName))]),a("v-uni-view",{staticClass:"txt color-999 mb-5 u-line-2 w-420"},[t._v(t._s(i.orderItems[0].gradeName)+"/"+t._s(i.orderItems[0].subjectName)+"/"+t._s(1===i.payMethod?"全款":"预缴报名费"))]),a("v-uni-view",{staticClass:"mt-4 mb-4 color-999"},[t._v(t._s(i.name))]),a("v-uni-view",{staticClass:"tag"},[a("v-uni-view",{staticClass:"mr-10"},[a("u-tag",{attrs:{color:"#CB242B",borderColor:"#CB242B",size:"mini",text:"7天无理由退换货",plain:!0,shape:"circle"}})],1),a("v-uni-view",{staticClass:"mr-10"},[a("u-tag",{attrs:{color:"#CB242B",borderColor:"#CB242B",size:"mini",text:"平台担保",plain:!0,shape:"circle"}})],1)],1)],1)],1),a("v-uni-view",{staticClass:"fz-28 flex-between flex-center mt-10"},[0!==i.orderStatus&&4!==i.orderStatus?a("v-uni-view",{class:1!==i.orderStatus&&"text-right wb-100"},[t._v("已支付"),a("v-uni-text",{staticClass:"color-red fw-500 ml-10"},[t._v("¥ "+t._s(i.payAmount/100))])],1):t._e(),a("v-uni-view",{staticClass:"ml-auto"},[0===i.orderStatus&&1===i.payMethod?[a("v-uni-view",{staticClass:"fw-500 ml-auto"},[t._v("待支付"),a("v-uni-text",{staticClass:"color-red fz-36 ml-10"},[t._v("¥ "+t._s(i.orderItems[0].allPrice/100))])],1)]:t._e(),0===i.orderStatus&&0===i.payMethod?[a("v-uni-view",{staticClass:"fw-500 ml-auto"},[t._v("待支付"),a("v-uni-text",{staticClass:"color-red fz-36 ml-10"},[t._v("¥ "+t._s(i.orderItems[0].price/100))])],1)]:t._e(),1===i.orderStatus?a("v-uni-view",{staticClass:"fw-500"},[t._v("待支付尾款"),a("v-uni-text",{staticClass:"color-red fz-36 ml-10"},[t._v("¥ "+t._s(i.finalPayment/100))])],1):t._e()],2)],1),a("v-uni-view",{staticClass:"color-999 text-right"},[t._v("总费用￥"+t._s(i.orderItems[0].allPrice/100))]),a("v-uni-view",{staticClass:"g-line pt-10 mb-10"}),a("v-uni-view",{staticClass:"detail-footer"},[a("v-uni-view",{staticClass:"lx-btn plain gray h-56 lh-56",on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.$emit("click-button",i,"","view")}}},[t._v("查看详情")]),1===i.orderStatus||2===i.orderStatus?a("v-uni-view",{staticClass:"lx-btn plain gray ml-20 h-56 lh-56",on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.$emit("click-button",i,"","refund")}}},[t._v("售后/退款")]):t._e(),0===i.orderStatus?a("v-uni-view",{staticClass:"lx-btn plain gray ml-20 h-56 lh-56",on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.$emit("click-button",i,"","cancel")}}},[t._v("取消订单")]):t._e(),0===i.orderStatus&&0===i.payMethod?a("v-uni-view",{staticClass:"lx-btn plain ml-20 h-56 lh-56",on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.$emit("click-button",i,"pay","payEntry")}}},[t._v("支付报名费")]):t._e(),0===i.orderStatus&&1===i.payMethod?a("v-uni-view",{staticClass:"lx-btn plain ml-20 h-56 lh-56",on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.$emit("click-button",i,"pay","payAll")}}},[t._v("支付全款")]):t._e(),1===i.orderStatus?a("v-uni-view",{staticClass:"lx-btn plain ml-20 h-56 lh-56",on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.$emit("click-button",i,"pay","payFinal")}}},[t._v("支付尾款")]):t._e(),4===i.orderStatus||6===i.orderStatus?a("v-uni-view",{staticClass:"lx-btn plain ml-20 h-56 lh-56",on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.$emit("click-button",i,"pay","payAgain")}}},[t._v("再次购买")]):t._e()],1)],1)})):t._e()],2)},n=[]}}]);