(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages_ani-institution-brandQualification-qualificationsDetail"],{"1c19":function(t,e,a){"use strict";var n=a("e24b"),i=a.n(n);i.a},2485:function(t,e,a){"use strict";a.r(e);var n=a("3130"),i=a.n(n);for(var o in n)["default"].indexOf(o)<0&&function(t){a.d(e,t,(function(){return n[t]}))}(o);e["default"]=i.a},2909:function(t,e,a){"use strict";a("7a82"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(t){return(0,n.default)(t)||(0,i.default)(t)||(0,o.default)(t)||(0,r.default)()};var n=s(a("6005")),i=s(a("db90")),o=s(a("06c5")),r=s(a("3427"));function s(t){return t&&t.__esModule?t:{default:t}}},3130:function(t,e,a){"use strict";a("7a82");var n=a("4ea4").default;Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,a("99af"),a("d3b7"),a("14d9");var i=n(a("c7eb")),o=n(a("1da1")),r=n(a("2909")),s=n(a("bc3a")),d=a("6198"),u={components:{tnWaterMater:s.default},data:function(){return{tnWaterMaterShow:!0,id:"",brand:{},mechImageJyList:[],businessPhotos:""}},onLoad:function(t){var e=t.id;this.id=e},onReady:function(){this.getBrandDetail(this.id)},methods:{backImage:function(t,e){console.log("666666666",t,e)},brandPreviewImage:function(t){this.$previewImage([this.businessPhotos].concat((0,r.default)(this.mechImageJyList)),t)},getBrandDetail:function(t){var e=this;this.$util.showLoading(),this.$http.post("stuh5/mech/brandDetail",{id:t}).then((function(t){e.$util.hideLoading(),200===t.code?(console.log(t),e.brand=t.data,uni.showLoading({title:"加载中"}),e.addWaterBase64(d.ossUrl+e.brand.businessPhotos,"businessPhotos","childWaterMater0",(function(t,a){e.businessPhotos=t,e.tnWaterMaterShow=!1,e.$nextTick((function(){e.tnWaterMaterShow=!0,setTimeout((function(){e.getMechImageJyList()}),100)}))}))):(uni.showToast({icon:"none",title:t.msg}),e.$util.hideLoading())})).catch((function(t){console.log(t),e.$util.hideLoading()}))},getMechImageJyList:function(){var t=this;return(0,o.default)((0,i.default)().mark((function e(){var a,n,o,r,s,d;return(0,i.default)().wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(a=3,n=Math.ceil(t.brand.mechImageJyList.length/a),!t.brand.mechImageJyList){e.next=23;break}o=0;case 4:if(!(o<n)){e.next=23;break}r=0;case 6:if(!(r<a)){e.next=20;break}if(o*a+r==1&&uni.hideLoading(),!(o*a+r<t.brand.mechImageJyList.length)){e.next=15;break}return s=t.brand.mechImageJyList[o*a+r],d="childWaterMater"+r,e.next=13,t.asyncImg(s,r,d);case 13:e.next=17;break;case 15:return uni.hideLoading(),e.abrupt("break",20);case 17:r++,e.next=6;break;case 20:o++,e.next=4;break;case 23:uni.hideLoading();case 24:case"end":return e.stop()}}),e)})))()},asyncImg:function(t,e,a){var n=this;return new Promise((function(e,i){n.addWaterBase64(d.ossUrl+t.imageUrl,"mechImageJy",a,(function(t,a){n.mechImageJyList.push(t),n.tnWaterMaterShow=!1,n.$nextTick((function(){n.tnWaterMaterShow=!0,setTimeout((function(){e()}),100)}))}))}))},addWaterBase64:function(t,e,a,n){var i={};i.url=t,i.maxSize=1e4,i.watermark=[{type:"text",fillStyle:"rgba(250, 250, 250,1)",globalAlpha:1,content:"猎学网入驻专用",font:"14px",repeatWidth:5e3,repeatHeight:5e3,distanceX:140,distanceY:50,x:-1500,y:-1500,shadowColor:"rgba(0, 0, 0, 1)",shadowOffsetX:2,shadowOffsetY:2,rotate:25,isRepeat:!0}],console.log(a),this.$refs[a].addWaterMark(i,e,n)}}};e.default=u},3342:function(t,e,a){var n=a("24fb");e=n(!1),e.push([t.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */uni-page-body[data-v-7af15787]{color:#333;font-size:%?24?%}.global-wrap[data-v-7af15787]{background-color:#f6f6f6;min-height:100vh}\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.content[data-v-7af15787]{width:0;height:0;overflow:hidden}',""]),t.exports=e},3353:function(t,e,a){var n=a("799a");n.__esModule&&(n=n.default),"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var i=a("4f06").default;i("1eb9e2c4",n,!0,{sourceMap:!1,shadowMode:!1})},3427:function(t,e,a){"use strict";a("7a82"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")},a("d9e2"),a("d401")},"3aa6":function(t,e,a){"use strict";a("7a82"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,a("a9e3");var n={props:{src:{type:String,default:uni.$u.props.image.src},mode:{type:String,default:uni.$u.props.image.mode},width:{type:[String,Number],default:uni.$u.props.image.width},height:{type:[String,Number],default:uni.$u.props.image.height},shape:{type:String,default:uni.$u.props.image.shape},radius:{type:[String,Number],default:uni.$u.props.image.radius},lazyLoad:{type:Boolean,default:uni.$u.props.image.lazyLoad},showMenuByLongpress:{type:Boolean,default:uni.$u.props.image.showMenuByLongpress},loadingIcon:{type:String,default:uni.$u.props.image.loadingIcon},errorIcon:{type:String,default:uni.$u.props.image.errorIcon},showLoading:{type:Boolean,default:uni.$u.props.image.showLoading},showError:{type:Boolean,default:uni.$u.props.image.showError},fade:{type:Boolean,default:uni.$u.props.image.fade},webp:{type:Boolean,default:uni.$u.props.image.webp},duration:{type:[String,Number],default:uni.$u.props.image.duration},bgColor:{type:String,default:uni.$u.props.image.bgColor}}};e.default=n},"481d":function(t,e,a){"use strict";a.r(e);var n=a("91d8"),i=a.n(n);for(var o in n)["default"].indexOf(o)<0&&function(t){a.d(e,t,(function(){return n[t]}))}(o);e["default"]=i.a},5126:function(t,e,a){"use strict";a.d(e,"b",(function(){return i})),a.d(e,"c",(function(){return o})),a.d(e,"a",(function(){return n}));var n={uTransition:a("9236").default,uIcon:a("9815").default},i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("u-transition",{attrs:{mode:"fade",show:t.show,duration:t.fade?1e3:0}},[a("v-uni-view",{staticClass:"u-image",style:[t.wrapStyle,t.backgroundStyle],on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.onClick.apply(void 0,arguments)}}},[t.isError?t._e():a("v-uni-image",{staticClass:"u-image__image",style:{borderRadius:"circle"==t.shape?"10000px":t.$u.addUnit(t.radius),width:t.$u.addUnit(t.width),height:t.$u.addUnit(t.height)},attrs:{src:t.src,mode:t.mode,"show-menu-by-longpress":t.showMenuByLongpress,"lazy-load":t.lazyLoad},on:{error:function(e){arguments[0]=e=t.$handleEvent(e),t.onErrorHandler.apply(void 0,arguments)},load:function(e){arguments[0]=e=t.$handleEvent(e),t.onLoadHandler.apply(void 0,arguments)}}}),t.showLoading&&t.loading?a("v-uni-view",{staticClass:"u-image__loading",style:{borderRadius:"circle"==t.shape?"50%":t.$u.addUnit(t.radius),backgroundColor:this.bgColor,width:t.$u.addUnit(t.width),height:t.$u.addUnit(t.height)}},[t._t("loading",[a("u-icon",{attrs:{name:t.loadingIcon,width:t.width,height:t.height}})])],2):t._e(),t.showError&&t.isError&&!t.loading?a("v-uni-view",{staticClass:"u-image__error",style:{borderRadius:"circle"==t.shape?"50%":t.$u.addUnit(t.radius),width:t.$u.addUnit(t.width),height:t.$u.addUnit(t.height)}},[t._t("error",[a("u-icon",{attrs:{name:t.errorIcon,width:t.width,height:t.height}})])],2):t._e()],1)],1)},o=[]},"591b":function(t,e,a){var n=a("3342");n.__esModule&&(n=n.default),"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var i=a("4f06").default;i("30ec66f0",n,!0,{sourceMap:!1,shadowMode:!1})},"59c8":function(t,e,a){"use strict";a.r(e);var n=a("9470"),i=a("2485");for(var o in i)["default"].indexOf(o)<0&&function(t){a.d(e,t,(function(){return i[t]}))}(o);a("c574");var r=a("f0c5"),s=Object(r["a"])(i["default"],n["b"],n["c"],!1,null,"ae576efa",null,!1,n["a"],void 0);e["default"]=s.exports},"5fab":function(t,e,a){"use strict";a.d(e,"b",(function(){return n})),a.d(e,"c",(function(){return i})),a.d(e,"a",(function(){}));var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-uni-view",{staticClass:"content"},t._l(t.canvasArr,(function(e){return a("v-uni-view",[a("v-uni-canvas",{style:{width:t.canvasWidth+"px",height:t.canvasHeight+"px"},attrs:{"canvas-id":"myCanvas"}})],1)})),1)},i=[]},6005:function(t,e,a){"use strict";a("7a82"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(t){if(Array.isArray(t))return(0,n.default)(t)};var n=function(t){return t&&t.__esModule?t:{default:t}}(a("6b75"))},6103:function(t,e,a){"use strict";var n=a("591b"),i=a.n(n);i.a},"75c6":function(t,e,a){"use strict";a.r(e);var n=a("5126"),i=a("481d");for(var o in i)["default"].indexOf(o)<0&&function(t){a.d(e,t,(function(){return i[t]}))}(o);a("1c19");var r=a("f0c5"),s=Object(r["a"])(i["default"],n["b"],n["c"],!1,null,"7283d812",null,!1,n["a"],void 0);e["default"]=s.exports},"799a":function(t,e,a){var n=a("24fb");e=n(!1),e.push([t.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */uni-page-body[data-v-ae576efa]{color:#333;font-size:%?24?%}.global-wrap[data-v-ae576efa]{background-color:#f6f6f6;min-height:100vh}\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.page-box[data-v-ae576efa]{padding:%?32?%}.c999[data-v-ae576efa]{color:#999}.c333[data-v-ae576efa]{color:#333}.img-box[data-v-ae576efa]{width:90%;margin-left:10%;margin-top:%?20?%;margin-bottom:%?20?%}.flex-shrink0[data-v-ae576efa]{flex-shrink:0}.tnWaterMater[data-v-ae576efa]{position:fixed;top:0;right:0}.img-opacity[data-v-ae576efa]{opacity:1}',""]),t.exports=e},"91d8":function(t,e,a){"use strict";a("7a82");var n=a("4ea4").default;Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=n(a("3aa6")),o={name:"u-image",mixins:[uni.$u.mpMixin,uni.$u.mixin,i.default],data:function(){return{isError:!1,loading:!0,opacity:1,durationTime:this.duration,backgroundStyle:{},show:!1}},watch:{src:{immediate:!0,handler:function(t){t?(this.isError=!1,this.loading=!1):this.isError=!0}}},computed:{wrapStyle:function(){var t={};return t.borderRadius="circle"==this.shape?"10000px":uni.$u.addUnit(this.radius),t.overflow=this.borderRadius>0?"hidden":"visible",uni.$u.deepMerge(t,uni.$u.addStyle(this.customStyle))}},mounted:function(){this.show=!0},methods:{onClick:function(){this.$emit("click")},onErrorHandler:function(t){this.loading=!1,this.isError=!0,this.$emit("error",t)},onLoadHandler:function(){this.loading=!1,this.isError=!1,this.$emit("load"),this.removeBgColor()},removeBgColor:function(){this.backgroundStyle={backgroundColor:"transparent"}}}};e.default=o},9470:function(t,e,a){"use strict";a.d(e,"b",(function(){return i})),a.d(e,"c",(function(){return o})),a.d(e,"a",(function(){return n}));var n={uImage:a("75c6").default},i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-uni-view",{staticClass:"page-box"},[a("v-uni-view",{staticClass:"flex  mb-32"},[a("v-uni-view",{staticClass:"c999 fz-28 flex-shrink0"},[t._v("企业名称")]),a("v-uni-view",{staticClass:"ml-32 c333 fz-28"},[t._v(t._s(t.brand.businessName))])],1),a("v-uni-view",{staticClass:"flex  mb-32"},[a("v-uni-view",{staticClass:"c999 fz-28 flex-shrink0"},[t._v("证件号码")]),a("v-uni-view",{staticClass:"ml-32 c333 fz-28"},[t._v(t._s(t.brand.businessAccount))])],1),t.businessPhotos?a("v-uni-view",[a("v-uni-view",{staticClass:"c999 fz-28 mb-24 flex-shrink0"},[t._v("营业执照")]),a("v-uni-view",{staticClass:"img-box"},[a("u-image",{staticClass:"img-opacity",attrs:{width:"100%",src:t.businessPhotos,mode:"widthFix"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.brandPreviewImage(0)}}})],1)],1):t._e(),t.mechImageJyList&&t.mechImageJyList.length>0?a("v-uni-view",[a("v-uni-view",{staticClass:"c999 fz-28 mb-24 mt-32 flex-shrink0"},[t._v("办学许可")]),t._l(t.mechImageJyList,(function(e,n){return a("v-uni-view",{key:n,staticClass:"img-box"},[a("u-image",{staticClass:"img-opacity",attrs:{width:"100%",src:e,mode:"widthFix"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.brandPreviewImage(n+1)}}})],1)}))],2):t._e(),t.tnWaterMaterShow?a("v-uni-view",{staticClass:"tnWaterMater"},[a("tnWaterMater",{ref:"childWaterMater0",on:{pBackImage:function(e){arguments[0]=e=t.$handleEvent(e),t.backImage.apply(void 0,arguments)}}}),a("tnWaterMater",{ref:"childWaterMater1",on:{pBackImage:function(e){arguments[0]=e=t.$handleEvent(e),t.backImage.apply(void 0,arguments)}}}),a("tnWaterMater",{ref:"childWaterMater2",on:{pBackImage:function(e){arguments[0]=e=t.$handleEvent(e),t.backImage.apply(void 0,arguments)}}})],1):t._e()],1)},o=[]},bc3a:function(t,e,a){"use strict";a.r(e);var n=a("5fab"),i=a("efa7");for(var o in i)["default"].indexOf(o)<0&&function(t){a.d(e,t,(function(){return i[t]}))}(o);a("6103");var r=a("f0c5"),s=Object(r["a"])(i["default"],n["b"],n["c"],!1,null,"7af15787",null,!1,n["a"],void 0);e["default"]=s.exports},bcfe:function(t,e,a){"use strict";a("7a82"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,a("a434"),a("d3b7"),a("14d9");var n={props:{},data:function(){return{type:"",canvasArr:[],platformType:"other",canvasWidth:"",canvasHeight:"",pixelRatio:1,fn:null}},mounted:function(){var t=this;t.platformType="h5",wx.getSystemInfo({success:function(e){console.log(e),t.pixelRatio=e.pixelRatio}})},methods:{addWaterMark:function(t,e,a){this.fn=a;this.type=e,"h5"==this.platformType?this.h5CanvasDraw(t):this.otherCanvasReady(t)},otherCanvasReady:function(t){var e=this;uni.getImageInfo({src:t.url,success:function(a){var n=t.maxSize||0;t.maxSize?a.width>a.height?(a.width<n?n=a.width/e.pixelRatio:n/=e.pixelRatio,e.canvasWidth=n,e.canvasHeight=a.height/(a.width/n)):(a.height<n?n=a.height/e.pixelRatio:n/=e.pixelRatio,e.canvasHeight=n,e.canvasWidth=a.width/(a.height/n)):(e.canvasWidth=a.width/e.pixelRatio,e.canvasHeight=a.height/e.pixelRatio),e.canvasArr.splice(0,1,1),e.$nextTick((function(){e.otherCanvasDraw(t,a)}))}})},otherCanvasDraw:function(t,e){var a=this,n=uni.createCanvasContext("myCanvas",a);n.drawImage(e.path,0,0,a.canvasWidth,a.canvasHeight),n.textAlign=t.textAlign||"top",n.textBaseline=t.textBaseline||"top";var i=[],o=[];t.watermark.some((function(t,e){"image"==t.type&&i.push(t),"text"==t.type&&o.push(t)})),o.some((function(t,e){n.font=(t.font||"16px")+" Arial",n.shadowColor=t.shadowColor||"#000",n.shadowOffsetX=t.shadowOffsetX||0,n.shadowOffsetY=t.shadowOffsetY||0,n.fillStyle=t.fillStyle||"#fff",n.globalAlpha=t.globalAlpha||1;n.measureText(t.content).width;var i=t.rotate||0;if(t.x=t.x||0,t.y=t.y||0,t.isRepeat){t.repeatWidth=t.repeatWidth||a.canvasWidth,t.repeatHeight=t.repeatHeight||a.canvasHeight,t.distanceX=t.distanceX||100,t.distanceY=t.distanceY||50,n.rotate(-i*Math.PI/180);for(var o=t.x;o<t.repeatWidth;o+=t.distanceX)for(var r=t.y;r<t.repeatHeight;r+=t.distanceY)console.log(t.x,t.y),n.fillText(t.content,o,r);n.rotate(i*Math.PI/180)}else n.rotate(-i*Math.PI/180),n.fillText(t.content,t.x,t.y),n.rotate(i*Math.PI/180)})),i.length?i.some((function(e,r){uni.getImageInfo({src:e.path,success:function(s){var d=e.rotate||0;if(e.x=e.x||0,e.y=e.y||0,e.width=e.width||s.width/a.pixelRatio,e.height=e.height||s.height/a.pixelRatio,e.isRepeat){e.repeatWidth=e.repeatWidth||a.canvasWidth,e.repeatHeight=e.repeatHeight||a.canvasHeight,e.distanceX=e.distanceX||100,e.distanceY=e.distanceY||50,n.rotate(-d*Math.PI/180);for(var u=e.x;u<e.repeatWidth;u+=e.distanceX)for(var c=e.y;c<e.repeatHeight;c+=e.distanceY)console.log(e.x,e.y),n.drawImage(s.path,u,c,e.width,e.height);n.rotate(d*Math.PI/180)}else n.rotate(-d*Math.PI/180),n.drawImage(s.path,e.x,e.y,e.width,e.height),n.rotate(d*Math.PI/180);i.length!=r+1&&o.length!=r+1||a.otherGenerateBase64(t,n)}})})):a.otherGenerateBase64(t,n)},otherGenerateBase64:function(t,e){var a=this;e.draw(!0,(function(e){uni.canvasToTempFilePath({canvasId:"myCanvas",quality:t.quality||1,complete:function(t){var e=t.tempFilePath,n=plus.io.convertLocalFileSystemURL(e),i=new plus.io.FileReader;i.readAsDataURL(n),i.onloadend=function(t){a.$emit("pBackImage",t.target.result,a.type),a.fn(t.target.result,a.type)}}},a)}))},h5CanvasDraw:function(t){var e=this,a=new Image;a.src=t.url,a.crossOrigin="anonymous",a.onload=function(){var n=document.createElement("canvas"),i=t.maxSize||0;t.maxSize?a.width>a.height?(a.width<i&&(i=a.width),e.canvasWidth=i,e.canvasHeight=a.height/(a.width/i)):(a.height<i&&(i=a.height),e.canvasHeight=i,e.canvasWidth=a.width/(a.height/i)):(e.canvasWidth=a.width,e.canvasHeight=a.height),n.width=e.canvasWidth,n.height=e.canvasHeight;var o=n.getContext("2d");o.drawImage(a,0,0),o.textAlign=t.textAlign||"top",o.textBaseline=t.textBaseline||"top";var r=[],s=[];if(t.watermark.some((function(t,e){"image"==t.type&&r.push(t),"text"==t.type&&s.push(t)})),s.some((function(t,a){o.font=(t.font||"16px")+" Arial",o.shadowColor=t.shadowColor||"#000",o.shadowOffsetX=t.shadowOffsetX||0,o.shadowOffsetY=t.shadowOffsetY||0,o.fillStyle=t.fillStyle||"#fff",o.globalAlpha=t.globalAlpha||1;o.measureText(t.content).width;var n=t.rotate||0;if(t.x=t.x||0,t.y=t.y||0,t.isRepeat){t.repeatWidth=t.repeatWidth||e.canvasWidth,t.repeatHeight=t.repeatHeight||e.canvasHeight,t.distanceX=t.distanceX||100,t.distanceY=t.distanceY||50,o.rotate(-n*Math.PI/180);for(var i=t.x;i<t.repeatWidth;i+=t.distanceX)for(var r=t.y;r<t.repeatHeight;r+=t.distanceY)console.log(t.x,t.y),o.fillText(t.content,i,r);o.rotate(n*Math.PI/180)}else o.rotate(-n*Math.PI/180),o.fillText(t.content,t.x,t.y),o.rotate(n*Math.PI/180)})),r.length)r.some((function(t,a){var i=new Image;i.src=t.path,i.crossOrigin="anonymous",i.onload=function(){var d=t.rotate||0;if(t.x=t.x||0,t.y=t.y||0,t.width=t.width||i.width,t.height=t.height||i.height,t.isRepeat){t.repeatWidth=t.repeatWidth||e.canvasWidth,t.repeatHeight=t.repeatHeight||e.canvasHeight,t.distanceX=t.distanceX||100,t.distanceY=t.distanceY||50,o.rotate(-d*Math.PI/180);for(var u=t.x;u<t.repeatWidth;u+=t.distanceX)for(var c=t.y;c<t.repeatHeight;c+=t.distanceY)console.log(t.x,t.y),o.drawImage(i,u,c,t.width,t.height);o.rotate(d*Math.PI/180)}else o.rotate(-d*Math.PI/180),o.drawImage(i,t.x,t.y,t.width,t.height),o.rotate(d*Math.PI/180);if(r.length==a+1||s.length==a+1){var l=n.toDataURL();e.$emit("pBackImage",l,e.type),e.fn(l,e.type)}}}));else{var d=n.toDataURL();e.$emit("pBackImage",d,e.type),e.fn(d,e.type)}}}}};e.default=n},c574:function(t,e,a){"use strict";var n=a("3353"),i=a.n(n);i.a},db90:function(t,e,a){"use strict";a("7a82"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(t){if("undefined"!==typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)},a("a4d3"),a("e01a"),a("d3b7"),a("d28b"),a("3ca3"),a("ddb0"),a("a630")},e24b:function(t,e,a){var n=a("f3c7");n.__esModule&&(n=n.default),"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var i=a("4f06").default;i("62fab554",n,!0,{sourceMap:!1,shadowMode:!1})},efa7:function(t,e,a){"use strict";a.r(e);var n=a("bcfe"),i=a.n(n);for(var o in n)["default"].indexOf(o)<0&&function(t){a.d(e,t,(function(){return n[t]}))}(o);e["default"]=i.a},f3c7:function(t,e,a){var n=a("24fb");e=n(!1),e.push([t.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */uni-page-body[data-v-7283d812]{color:#333;font-size:%?24?%}.global-wrap[data-v-7283d812]{background-color:#f6f6f6;min-height:100vh}\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */uni-view[data-v-7283d812], uni-scroll-view[data-v-7283d812], uni-swiper-item[data-v-7283d812]{display:flex;flex-direction:column;flex-shrink:0;flex-grow:0;flex-basis:auto;align-items:stretch;align-content:flex-start}.u-image[data-v-7283d812]{position:relative;transition:opacity .5s ease-in-out}.u-image__loading[data-v-7283d812], .u-image__error[data-v-7283d812]{position:absolute;top:0;left:0;width:100%;height:100%;display:flex;flex-direction:row;align-items:center;justify-content:center;background-color:#f3f4f6;color:#909193;font-size:%?46?%}',""]),t.exports=e}}]);