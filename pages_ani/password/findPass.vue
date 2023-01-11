<template>
	<view class="main">
		<view v-if="step === 1">
			<text class="title fz-36">找回密码</text>
			<view class="flex-align mt-80 input-box">
				<img class="icon-before" src="../../static/icon/phone.png" alt="">
				<input class="phone-input"  v-model="phone" placeholder="请输入手机号" type="text" value="" />
			</view>
			<view class="mt-100 mb-10">
				<button type="default" class="phohe-login" @tap="toNextStep(2)">下一步</button>
			</view>
		</view>
		<view v-else-if="step === 2">
			<text class="title fz-36">找回密码</text>
			<view class="mt-30 input-box">
				<text class="c9" style="font-size: 14px;">为了您的账户安全，需要验证您的手机号： {{phone.substring(0, 3)+"****"+phone.substr(phone.length-4)}}</text>
			</view>
			<view class="flex-align mt-80 input-box">
				<input class="verify-input" v-model="smsCode" placeholder="请输入验证码" type="text" value="" />
				<button :disabled="verifyDisabled" @tap="sandIdentifyCode" class="verify-code">{{verifyText}}</button>
			</view>
			<view class="mt-100 mb-10">
				<button type="default" class="phohe-login" @tap="toNextStep(3)">下一步</button>
			</view>
		</view>
		<view v-else>
			<text class="title fz-36">设置新密码</text>
			<view class="flex-align mt-80 input-box verify-box" :class="{'verify-box-err':verify.password}" >
				<text class="text4b">新密码</text>
				<input v-if="passwordType.password === 'password'" class="uni-input-input phone-input error" placeholder="请输入新密码" v-model="password" type="password" @blur="passFun" />
				<input v-else class="uni-input-input phone-input error" placeholder="请输入手机号" v-model="password" type="text" @blur="passFun" />
				<u-icon class="eye" :name="passwordType.password === 'password' ? 'eye' : 'eye-fill'" size="40rpx" @click="changePasswordType('password')"></u-icon>
				<text class="error-text">8-16个字符，必须包含数字和字母</text>
			</view>
			<view class="flex-align mt-80 input-box verify-box" :class="{'verify-box-err':verify.passwordAgain}" >
				<text class="text4b">确认密码</text>
				<input v-if="passwordType.passwordAgain === 'password'" class="uni-input-input phone-input error" placeholder="请输入新密码" v-model="passwordAgain" type="password" @blur="passwordAgainFun" @input="passwordAgainFun" />
				<input v-else class="uni-input-input phone-input error" placeholder="请输入新密码" v-model="passwordAgain" type="text" @blur="passwordAgainFun" @input="passwordAgainFun" />
				<u-icon class="eye" :name="passwordType.passwordAgain === 'password' ? 'eye' : 'eye-fill'" size="40rpx" @click="changePasswordType('passwordAgain')"></u-icon>
				<text class="error-text">两次密码不一致</text>
			</view>
			<view class="mt-100 mb-10">
				<button type="default" class="phohe-login" @tap="resetPasswordByPhone">保存</button>
			</view>
		</view>
	</view>
</template>

<script>
	import md5 from 'js-md5'
	import formRegular from '@/utils/formRegular.js'
	export default {
		data() {
			return {
				passwordType: {
					password: 'password',
					passwordAgain: 'password'
				},
				step:1,
				phone:'',
				verifyText:'获取验证码',
				verifyDisabled:false,
				smsKey:'',
				smsCode:'',
				password:'',
				passwordAgain:'',
				data: {
					newPass:''
				},
				verify:{
					password:false,
					passwordAgain:false
				}
			};
		},
		methods: {
			changePasswordType(type){
				this.passwordType[type] = this.passwordType[type] === 'password' ? 'text' : 'password'
			},
			passFun(){
				if (formRegular('letterAndNumber',this.password)) {
					this.verify.password = false
				} else {
					this.verify.password = true
				}
			},
			passwordAgainFun(){
				this.verify.passwordAgain = false
			},
			toNextStep(step){
				if(step === 2){
					let myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(17[0-9]{1})|(15[0-3]{1})|(15[4-9]{1})|(18[0-9]{1})|(199))+\d{8})$/;
					const reg = myreg.test(this.phone)
					if (!this.phone || !reg ) return this.$util.showToast('请输入正确的手机号')
					this.$http
						.post('stuh5/login/isPhoneExist',{phone:this.phone})
						.then(res => {
							if(res.code === 200) {
								this.step = step
							} else {
								this.$util.showToast(res.msg)
							}
						})
						.catch(err => {
							this.$util.showToast(err.msg)
							console.log(err);
						});
				}
				
				if(step === 3){
					let verReg = /^\d{4}$/
					const regVerify = verReg.test(this.smsCode)
					if (!regVerify ) return this.$util.showToast('请输入正确的验证码')
					const smsParams = {
						smsKey: this.smsKey,
						smsCode: this.smsCode,
						callback: async (flag) => {
							console.log('回调验证码状态: ', flag)
							if (flag) {
								this.step = step
							}
						}
					}
					this.$store.dispatch('VERIFY_CODE', smsParams);
				}
			},
			resetPasswordByPhone (){
				if (!this.password) {
					return this.$util.showToast('请输入密码')
				}
				if(this.verify.passwordAgain){
					return false
				}
				if(this.verify.password){
					return false
				}
				if(this.password === this.passwordAgain){
					this.verify.passwordAgain = false
				} else {
					this.verify.passwordAgain = true
					return false
				}
				this.$http
					.post('stuh5/login/resetPasswordByPhone',
					{
					phone:this.phone,
					password:md5(this.password),
					smsKey: this.smsKey,
					smsCode: this.smsCode
					})
					.then(res => {
						if(res.code === 200) {
							this.$util.showToast('修改成功,将返回登录页登录')
							setTimeout(()=>{
								uni.navigateTo({
									url: '/pages/login/passLogin'
								})
							},2000)
						} else {
							this.$util.showToast(res.msg)
						}
					})
					.catch(err => {
									this.$util.showToast(err.msg)
						console.log(err);
					});
			},
			
			//  Identify code
			sandIdentifyCode () {
			this.verifyDisabled = true
			  this.$http
			  	.post('sms/sendCode',{mobile:this.phone})
			  	.then(res => {
			  		if(res.code === 200) {
			  			this.smsKey = res.data.smsKey
						this.$util.showToast('发送成功,请注意查收短信')
			  		} else {
						this.$util.showToast(res.msg)
					}
			  	})
			  	.catch(err => {
					this.$util.showToast(err.msg)
			  		console.log(err);
			  	});
				  let timer = null
				  if (timer <= 0) timer = null
				  let countdown = 60
				  this.verifyText = '重发'+countdown+'秒'
				  timer = setInterval(() => {
					countdown--
					this.verifyText = '重发'+countdown+'秒'
					if (countdown <= 0) {
					  clearInterval(timer)
					  this.verifyText = '获取验证码'
					  this.verifyDisabled = false
					}
				  }, 1000)
			}

		}
	}
</script>

<style scoped>

.main {
	margin-top: 50rpx;
	width:86%;
	margin-left: 7%;
}	

.title {
	position: relative;
	font-weight: bold;
}

.title::before {
	content: '';
	width: 8rpx;
	height: 40rpx;
	top: 5rpx;
	left:-20rpx;
	background: linear-gradient(to bottom, #EC2C32, #fff);
	display: inline-block;
	position: absolute;
}

.input-box {
	width: 88%;
	padding-left: 6%;
}

.phone-input {
	border-bottom: 1rpx solid #F2F2F2;
	margin-left:10rpx;
	padding:4rpx 20rpx;
	width: 88%;
	font-size: 28rpx;
	line-height: 56rpx;
	height: 56rpx;
	
}

.icon-before {
	width: 32rpx;
	height: 42rpx;
}

.phohe-login {
	color:#fff;
	background-color: #BC292D;
	border-radius: 100rpx;
}


.verify-input {
	border-bottom: 1rpx solid #F2F2F2;
	margin-right:30rpx;
	padding:4rpx 20rpx;
	line-height: 56rpx;
	height: 56rpx;
	font-size: 14px;
	width: 56%;
}

.text4b {
	font-size: 28rpx;
	width: 150rpx;
}

.verify-box {
	position: relative;
}

.verify-box-err .error{
	background-color: rgba(235, 9, 9, .1);
	border:2rpx solid #BC292D;
	border-radius: 8rpx;
}


.verify-box .error-text {
	display: none;
	position: absolute;
	bottom: -40rpx;
	right:10rpx;
	font-size: 24rpx;
	color: #EB0909;
}

.verify-box-err .error-text {
	display: inline-block;
}


.verify-code {
	background-color: #E64949;
	color: #fff;
	padding:20rpx 20rpx;
	display: inline-block;
	font-size: 24rpx;
	border-radius: 30rpx;
	height: 60rpx;
	line-height: 24rpx;
}
.eye {
	position: absolute;
	right: 10rpx;
}


	
</style>
