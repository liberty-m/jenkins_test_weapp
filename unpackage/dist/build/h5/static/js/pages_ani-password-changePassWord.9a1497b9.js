(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages_ani-password-changePassWord"],{"0fef":function(s,t,i){"use strict";i.r(t);var e=i("9bad"),o=i.n(e);for(var n in e)["default"].indexOf(n)<0&&function(s){i.d(t,s,(function(){return e[s]}))}(n);t["default"]=o.a},"11db":function(s,t,i){var e=i("24fb");t=e(!1),t.push([s.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */uni-page-body[data-v-2970a686]{color:#333;font-size:%?24?%}.global-wrap[data-v-2970a686]{background-color:#f6f6f6;min-height:100vh}\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.main[data-v-2970a686]{margin-top:%?50?%;width:86%;margin-left:7%}.main .tabs[data-v-2970a686]{display:flex;justify-content:space-between;align-items:center;font-size:%?32?%;color:#7f7f7f;padding:0 %?25?%}.main .tabs .active[data-v-2970a686]{color:#333;font-weight:700;position:relative}.main .tabs .active[data-v-2970a686]::before{content:"";position:absolute;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%);bottom:%?-6?%;width:%?72?%;height:%?8?%;background:#cb242b;border-radius:%?8?%}.title[data-v-2970a686]{position:relative;font-weight:700;font-size:%?36?%}.title[data-v-2970a686]::before{content:"";width:%?8?%;height:%?40?%;top:%?6?%;left:%?-20?%;background:linear-gradient(180deg,#ec2c32,#fff);display:inline-block;position:absolute}.input-box[data-v-2970a686]{width:88%;padding-left:6%}.phone-input[data-v-2970a686]{border-bottom:%?1?% solid #f2f2f2;margin-left:%?10?%;padding:%?4?% %?20?%;width:88%;font-size:14px;line-height:%?56?%;height:%?56?%}.icon-before[data-v-2970a686]{width:%?32?%;height:%?42?%}.phohe-login[data-v-2970a686]{color:#fff;background-color:#bc292d;border-radius:%?100?%}.verify-input[data-v-2970a686]{border-bottom:%?1?% solid #f2f2f2;margin-right:%?30?%;padding:%?4?% %?20?%;line-height:%?56?%;height:%?56?%;font-size:14px;width:56%}.text4b[data-v-2970a686]{font-size:%?28?%;width:%?150?%}.verify-box[data-v-2970a686]{position:relative}.verify-box-err .error[data-v-2970a686]{background-color:rgba(235,9,9,.1);border:%?2?% solid #bc292d;border-radius:%?8?%}.verify-box .error-text[data-v-2970a686]{display:none;position:absolute;bottom:%?-40?%;left:%?170?%;font-size:%?24?%;color:#eb0909}.verify-box-err .error-text[data-v-2970a686]{display:inline-block}.verify-code[data-v-2970a686]{background-color:#e64949;color:#fff;padding:%?20?% %?20?%;display:inline-block;font-size:%?24?%;border-radius:%?30?%;height:%?60?%;line-height:%?24?%}.eye[data-v-2970a686]{position:absolute;right:%?10?%}',""]),s.exports=t},"3db1":function(s,t,i){"use strict";i.r(t);var e=i("b763"),o=i("0fef");for(var n in o)["default"].indexOf(n)<0&&function(s){i.d(t,s,(function(){return o[s]}))}(n);i("da8f");var a=i("f0c5"),r=Object(a["a"])(o["default"],e["b"],e["c"],!1,null,"2970a686",null,!1,e["a"],void 0);t["default"]=r.exports},"4bf5":function(s,t,i){"use strict";i("7a82"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,i("ac1f"),i("00b4");var e=function(s,t){return{chinese:/^([\u4E00-\u9FA5])*$/,idCard:/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,phone:/^((13[0-9])|(14[0-9])|(15[0-9])|(17[0-9])|(18[0-9]))\d{8}$/,letterAndNumber:/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/,lettersAndNumbers_:/^w+$/,email:/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/}[s].test(t)};t.default=e},"9bad":function(s,t,i){"use strict";i("7a82");var e=i("4ea4").default;Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,i("ac1f"),i("00b4");var o=e(i("5530")),n=e(i("023a")),a=i("26cb"),r=e(i("4bf5")),d={data:function(){return{passwordType:{oriPassword:"password",password:"password",confirmPassword:"password",phoneConfirmPassword:"password"},isFirst:!1,showType:"password",verifyText:"获取验证码",phone:"",password:"",oriPassword:"",confirmPassword:"",phonePassword:"",smsCode:"",smsKey:"",phoneConfirmPassword:"",verifyDisabled:!1,data:{newPass:""},verify:{oriPassword:!1,password:!1,confirmPassword:!1,phone:!1,phoneConfirmPassword:!1}}},computed:(0,o.default)({},(0,a.mapGetters)(["userInfo"])),onShow:function(){this.phone=this.userInfo.phone,1===this.userInfo.ifRegister?(uni.setNavigationBarTitle({title:"登录密码设置"}),this.isFirst=!0,this.oriPassword=this.userInfo.password):(uni.setNavigationBarTitle({title:"登录密码修改"}),this.isFirst=!1)},methods:{changePasswordType:function(s){console.log(s),this.passwordType[s]="password"===this.passwordType[s]?"text":"password"},toHome:function(){uni.switchTab({url:"/pages/home/home"})},phoneFun:function(){(0,r.default)("phone",this.phone)?this.verify.phone=!1:this.verify.phone=!0},oriPasswordFun:function(){this.oriPassword?this.verify.oriPassword=!1:this.verify.oriPassword=!0},passwordFun:function(){(0,r.default)("letterAndNumber",this.password)?this.verify.password=!1:this.verify.password=!0},phoneConfirmPasswordFun:function(){(0,r.default)("letterAndNumber",this.phoneConfirmPassword)?this.verify.phoneConfirmPassword=!1:this.verify.phoneConfirmPassword=!0},sandIdentifyCode:function(){var s=this;if(!this.phone)return this.$util.showToast("手机不能为空");this.verifyDisabled=!0,this.$http.post("sms/sendCode",{mobile:this.phone}).then((function(t){200===t.code?(s.smsKey=t.data.smsKey,s.$util.showToast("发送成功,请注意查收短信")):s.$util.showToast(t.msg)})).catch((function(t){s.$util.showToast(t.msg),console.log(t)}));var t=null;t<=0&&(t=null);var i=60;this.verifyText="重发"+i+"秒",t=setInterval((function(){i--,s.verifyText="重发"+i+"秒",i<=0&&(clearInterval(t),s.verifyText="获取验证码",s.verifyDisabled=!1)}),1e3)},confirmPasswordFun:function(){this.verify.confirmPassword=!1},submit:function(){var s=this;if("password"===this.showType){if(this.oriPasswordFun(),this.passwordFun(),this.verify.oriPassword)return!1;if(this.verify.password)return!1;if(this.password!==this.confirmPassword)return this.verify.confirmPassword=!0,!1;this.verify.confirmPassword=!1}else{var t=/^\d{4}$/.test(this.smsCode);if(!t)return this.$util.showToast("请输入正确的验证码");if(!this.smsKey)return this.$util.showToast("请获取验证码");if(this.phoneFun(),this.phoneConfirmPasswordFun(),this.verify.phone)return!1;if(this.verify.phoneConfirmPassword)return!1}var i="password"===this.showType?"stuh5/login/resetPassword":"stuh5/login/resetPasswordByPhone",e={userId:this.userInfo.id,password:(0,n.default)(this.password),oriPassword:this.oriPassword};this.isFirst||(e.oriPassword=(0,n.default)(this.oriPassword));var o={phone:this.phone,smsKey:this.smsKey,password:(0,n.default)(this.phoneConfirmPassword),smsCode:this.smsCode};this.$http.post(i,"password"===this.showType?e:o).then((function(t){200===t.code?s.isFirst?(s.$util.showToast("设置密码成功"),setTimeout((function(){uni.switchTab({url:"/pages/home/home"})}),1e3)):(s.$util.showToast("修改密码成功"),setTimeout((function(){uni.switchTab({url:"/pages/mine/mine"})}),1e3)):s.$util.showToast(t.msg)})).catch((function(t){s.$util.showToast(t.msg)}))}}};t.default=d},b763:function(s,t,i){"use strict";i.d(t,"b",(function(){return o})),i.d(t,"c",(function(){return n})),i.d(t,"a",(function(){return e}));var e={uIcon:i("9815").default},o=function(){var s=this,t=s.$createElement,i=s._self._c||t;return i("v-uni-view",{staticClass:"main"},[s.isFirst?s._e():i("v-uni-view",{staticClass:"tabs"},[i("v-uni-view",{class:"password"===s.showType&&"active",on:{click:function(t){arguments[0]=t=s.$handleEvent(t),s.showType="password"}}},[s._v("通过原密码修改")]),i("v-uni-view",{class:"phone"===s.showType&&"active",on:{click:function(t){arguments[0]=t=s.$handleEvent(t),s.showType="phone"}}},[s._v("通过手机号修改")])],1),"password"===s.showType?i("v-uni-view",[s.isFirst?s._e():i("v-uni-view",{staticClass:"flex-align mt-80 input-box verify-box",class:{"verify-box-err":s.verify.oriPassword}},[i("v-uni-text",{staticClass:"text4b"},[s._v("原始密码")]),"password"===s.passwordType.oriPassword?i("v-uni-input",{staticClass:"uni-input-input phone-input error",attrs:{placeholder:"请输入原密码",type:"password"},on:{blur:function(t){arguments[0]=t=s.$handleEvent(t),s.oriPasswordFun.apply(void 0,arguments)}},model:{value:s.oriPassword,callback:function(t){s.oriPassword=t},expression:"oriPassword"}}):i("v-uni-input",{staticClass:"uni-input-input phone-input error",attrs:{placeholder:"请输入原密码",type:"text"},on:{blur:function(t){arguments[0]=t=s.$handleEvent(t),s.oriPasswordFun.apply(void 0,arguments)}},model:{value:s.oriPassword,callback:function(t){s.oriPassword=t},expression:"oriPassword"}}),i("u-icon",{staticClass:"eye",attrs:{name:"password"===s.passwordType.oriPassword?"eye":"eye-fill",size:"40rpx"},on:{click:function(t){arguments[0]=t=s.$handleEvent(t),s.changePasswordType("oriPassword")}}}),i("v-uni-text",{staticClass:"error-text"},[s._v("请输入原密码")])],1),i("v-uni-view",{staticClass:"flex-align mt-80 input-box verify-box",class:{"verify-box-err":s.verify.password}},[i("v-uni-text",{staticClass:"text4b"},[s._v("新密码")]),"password"===s.passwordType.password?i("v-uni-input",{staticClass:"uni-input-input phone-input error",attrs:{placeholder:"请输入新密码",type:"password"},on:{blur:function(t){arguments[0]=t=s.$handleEvent(t),s.passwordFun.apply(void 0,arguments)}},model:{value:s.password,callback:function(t){s.password=t},expression:"password"}}):i("v-uni-input",{staticClass:"uni-input-input phone-input error",attrs:{placeholder:"请输入新密码",type:"text"},on:{blur:function(t){arguments[0]=t=s.$handleEvent(t),s.passwordFun.apply(void 0,arguments)}},model:{value:s.password,callback:function(t){s.password=t},expression:"password"}}),i("u-icon",{staticClass:"eye",attrs:{name:"password"===s.passwordType.password?"eye":"eye-fill",size:"40rpx"},on:{click:function(t){arguments[0]=t=s.$handleEvent(t),s.changePasswordType("password")}}}),i("v-uni-text",{staticClass:"error-text"},[s._v("8-16个字符，必须包含数字和字母")])],1),i("v-uni-view",{staticClass:"flex-align mt-80 input-box verify-box",class:{"verify-box-err":s.verify.confirmPassword}},[i("v-uni-text",{staticClass:"text4b"},[s._v("确认密码")]),"password"===s.passwordType.confirmPassword?i("v-uni-input",{staticClass:"uni-input-input phone-input error",attrs:{placeholder:"请确认新密码",type:"password"},on:{blur:function(t){arguments[0]=t=s.$handleEvent(t),s.confirmPasswordFun.apply(void 0,arguments)},input:function(t){arguments[0]=t=s.$handleEvent(t),s.confirmPasswordFun.apply(void 0,arguments)}},model:{value:s.confirmPassword,callback:function(t){s.confirmPassword=t},expression:"confirmPassword"}}):i("v-uni-input",{staticClass:"uni-input-input phone-input error",attrs:{placeholder:"请确认新密码",type:"text"},on:{blur:function(t){arguments[0]=t=s.$handleEvent(t),s.confirmPasswordFun.apply(void 0,arguments)},input:function(t){arguments[0]=t=s.$handleEvent(t),s.confirmPasswordFun.apply(void 0,arguments)}},model:{value:s.confirmPassword,callback:function(t){s.confirmPassword=t},expression:"confirmPassword"}}),i("u-icon",{staticClass:"eye",attrs:{name:"password"===s.passwordType.confirmPassword?"eye":"eye-fill",size:"40rpx"},on:{click:function(t){arguments[0]=t=s.$handleEvent(t),s.changePasswordType("confirmPassword")}}}),i("v-uni-text",{staticClass:"error-text"},[s._v("两次密码不一致")])],1)],1):i("v-uni-view",[i("v-uni-view",{staticClass:"flex-align mt-80 input-box verify-box",class:{"verify-box-err":s.verify.phone}},[i("v-uni-text",{staticClass:"text4b"},[s._v("手机号")]),i("v-uni-input",{staticClass:"phone-input error",attrs:{disabled:!0,placeholder:"请输入手机号",type:"text"},on:{input:function(t){arguments[0]=t=s.$handleEvent(t),s.phoneFun.apply(void 0,arguments)},blur:function(t){arguments[0]=t=s.$handleEvent(t),s.phoneFun.apply(void 0,arguments)}},model:{value:s.phone,callback:function(t){s.phone=t},expression:"phone"}}),i("v-uni-text",{staticClass:"error-text"},[s._v("请输入正确的手机号")])],1),i("v-uni-view",{staticClass:"flex-align mt-80 input-box"},[i("v-uni-input",{staticClass:"verify-input error",attrs:{placeholder:"请输入验证码",type:"text"},model:{value:s.smsCode,callback:function(t){s.smsCode=t},expression:"smsCode"}}),i("v-uni-button",{staticClass:"verify-code",attrs:{disabled:s.verifyDisabled},on:{click:function(t){arguments[0]=t=s.$handleEvent(t),s.sandIdentifyCode.apply(void 0,arguments)}}},[s._v(s._s(s.verifyText))])],1),i("v-uni-view",{staticClass:"flex-align mt-80 input-box verify-box",class:{"verify-box-err":s.verify.phoneConfirmPassword}},[i("v-uni-text",{staticClass:"text4b"},[s._v("确认密码")]),"password"===s.passwordType.phoneConfirmPassword?i("v-uni-input",{staticClass:"uni-input-input phone-input error",attrs:{placeholder:"请确认新密码",type:"password"},on:{blur:function(t){arguments[0]=t=s.$handleEvent(t),s.phoneConfirmPasswordFun.apply(void 0,arguments)}},model:{value:s.phoneConfirmPassword,callback:function(t){s.phoneConfirmPassword=t},expression:"phoneConfirmPassword"}}):i("v-uni-input",{staticClass:"uni-input-input phone-input error",attrs:{placeholder:"请确认新密码",type:"text"},on:{blur:function(t){arguments[0]=t=s.$handleEvent(t),s.phoneConfirmPasswordFun.apply(void 0,arguments)}},model:{value:s.phoneConfirmPassword,callback:function(t){s.phoneConfirmPassword=t},expression:"phoneConfirmPassword"}}),i("u-icon",{staticClass:"eye",attrs:{name:"password"===s.passwordType.phoneConfirmPassword?"eye":"eye-fill",size:"40rpx"},on:{click:function(t){arguments[0]=t=s.$handleEvent(t),s.changePasswordType("phoneConfirmPassword")}}}),i("v-uni-text",{staticClass:"error-text"},[s._v("8-16个字符，必须包含数字和字母")])],1)],1),i("v-uni-view",{staticClass:"mt-200 mb-10"},[i("v-uni-button",{staticClass:"phohe-login",attrs:{type:"default"},on:{click:function(t){arguments[0]=t=s.$handleEvent(t),s.submit.apply(void 0,arguments)}}},[s._v(s._s(s.isFirst?"提交保存":"提交修改"))])],1),s.isFirst?i("v-uni-view",{staticClass:"text-center pt-10",on:{click:function(t){arguments[0]=t=s.$handleEvent(t),s.toHome.apply(void 0,arguments)}}},[i("v-uni-text",{staticClass:"c8 fz-24"},[s._v("进入猎学网")])],1):s._e()],1)},n=[]},ce9a:function(s,t,i){var e=i("11db");e.__esModule&&(e=e.default),"string"===typeof e&&(e=[[s.i,e,""]]),e.locals&&(s.exports=e.locals);var o=i("4f06").default;o("05f2731e",e,!0,{sourceMap:!1,shadowMode:!1})},da8f:function(s,t,i){"use strict";var e=i("ce9a"),o=i.n(e);o.a}}]);