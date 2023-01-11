<template>
	<view class="main">
		<view v-if="!isFirst" class="tabs">
			<view :class="showType === 'password' && 'active'" @tap="showType = 'password'">通过原密码修改</view>
			<view :class="showType === 'phone' && 'active'" @tap="showType = 'phone'">通过手机号修改</view>
		</view>
		<view v-if="showType === 'password'">
			<view v-if="!isFirst" class="flex-align mt-80 input-box verify-box" :class="{ 'verify-box-err': verify.oriPassword }">
				<text class="text4b">原始密码</text>
				<input v-if="passwordType.oriPassword === 'password'" v-model="oriPassword" class="uni-input-input phone-input error" placeholder="请输入原密码" @blur="oriPasswordFun" type="password" />
				<input v-else v-model="oriPassword" class="uni-input-input phone-input error" placeholder="请输入原密码" @blur="oriPasswordFun" type="text" />
				<u-icon class="eye" :name="passwordType.oriPassword === 'password' ? 'eye' : 'eye-fill'" size="40rpx" @click="changePasswordType('oriPassword')"></u-icon>
				<text class="error-text">请输入原密码</text>
			</view>
			<view class="flex-align mt-80 input-box verify-box" :class="{ 'verify-box-err': verify.password }">
				<text class="text4b">新密码</text>
				<input v-if="passwordType.password === 'password'" v-model="password" class="uni-input-input phone-input error" placeholder="请输入新密码" @blur="passwordFun" type="password" />
				<input v-else v-model="password" class="uni-input-input phone-input error" placeholder="请输入新密码" @blur="passwordFun" type="text" />
				<u-icon class="eye" :name="passwordType.password === 'password' ? 'eye' : 'eye-fill'" size="40rpx" @click="changePasswordType('password')"></u-icon>
				<text class="error-text">8-16个字符，必须包含数字和字母</text>
			</view>
			<view class="flex-align mt-80 input-box verify-box" :class="{ 'verify-box-err': verify.confirmPassword }">
				<text class="text4b">确认密码</text>
				<input v-if="passwordType.confirmPassword === 'password'" v-model="confirmPassword" class="uni-input-input phone-input error" placeholder="请确认新密码" type="password" @blur="confirmPasswordFun" @input="confirmPasswordFun" />
				<input v-else v-model="confirmPassword" class="uni-input-input phone-input error" placeholder="请确认新密码" type="text" @blur="confirmPasswordFun" @input="confirmPasswordFun" />
				<u-icon class="eye" :name="passwordType.confirmPassword === 'password' ? 'eye' : 'eye-fill'" size="40rpx" @click="changePasswordType('confirmPassword')"></u-icon>
				<text class="error-text">两次密码不一致</text>
			</view>
		</view>
		<view v-else>
			<view class="flex-align mt-80 input-box verify-box" :class="{ 'verify-box-err': verify.phone }">
				<text class="text4b">手机号</text>
				<input v-model="phone" :disabled="true" class="phone-input error" placeholder="请输入手机号" type="text" @input="phoneFun" @blur="phoneFun" />
				<text class="error-text">请输入正确的手机号</text>
			</view>
			<view class="flex-align mt-80 input-box">
				<input v-model="smsCode" class="verify-input error" placeholder="请输入验证码" type="text" />
				<button :disabled="verifyDisabled" @tap="sandIdentifyCode" class="verify-code">{{ verifyText }}</button>
			</view>
			<view class="flex-align mt-80 input-box verify-box" :class="{ 'verify-box-err': verify.phoneConfirmPassword }">
				<text class="text4b">确认密码</text>
				<input v-if="passwordType.phoneConfirmPassword === 'password'" v-model="phoneConfirmPassword" class="uni-input-input phone-input error" @blur="phoneConfirmPasswordFun" placeholder="请确认新密码" type="password" />
				<input v-else v-model="phoneConfirmPassword" class="uni-input-input phone-input error" @blur="phoneConfirmPasswordFun" placeholder="请确认新密码" type="text" />
				<u-icon class="eye" :name="passwordType.phoneConfirmPassword === 'password' ? 'eye' : 'eye-fill'" size="40rpx" @click="changePasswordType('phoneConfirmPassword')"></u-icon>
				<text class="error-text">8-16个字符，必须包含数字和字母</text>
			</view>
		</view>
		<view class="mt-200 mb-10"><button type="default" class="phohe-login" @tap="submit">{{isFirst ? '提交保存' : '提交修改'}}</button></view>
		<view v-if="isFirst" class="text-center pt-10" @tap="toHome">
			<text class="c8 fz-24">进入猎学网</text>
		</view>
	</view>
</template>

<script>
import md5 from 'js-md5';
import { mapGetters } from 'vuex';
import formRegular from '@/utils/formRegular.js'
export default {
	data() {
		return {
			passwordType: {
				oriPassword: 'password',
				password: 'password',
				confirmPassword: 'password',
				phoneConfirmPassword: 'password'
			},
			isFirst: false,
			showType: 'password',
			verifyText: '获取验证码',
			phone: '',
			password: '',
			oriPassword: '',
			confirmPassword: '',
			phonePassword: '',
			smsCode: '',
			smsKey: '',
			phoneConfirmPassword: '',
			verifyDisabled: false,
			data: {
				newPass: ''
			},
			verify: {
				oriPassword: false,
				password: false,
				confirmPassword: false,
				phone: false,
				phoneConfirmPassword: false
			}
		};
	},
	computed: {
		...mapGetters(['userInfo'])
	},
	onShow() {
		this.phone = this.userInfo.phone
		if (this.userInfo.ifRegister === 1) {
			uni.setNavigationBarTitle({
				title: '登录密码设置'
			});
			this.isFirst = true
			this.oriPassword = this.userInfo.password
		} else {
			uni.setNavigationBarTitle({
				title: '登录密码修改'
			});
			this.isFirst = false
		}
	},
	methods: {
		changePasswordType(type){
			console.log(type)
			this.passwordType[type] = this.passwordType[type] === 'password' ? 'text' : 'password'
		},
		toHome () {
			uni.switchTab({
				url: '/pages/home/home'
			})
		},
		phoneFun() {
			if (formRegular('phone',this.phone)) {
				this.verify.phone = false;
			} else {
				this.verify.phone = true;
			}
		},

		oriPasswordFun() {
			if (this.oriPassword) {
				this.verify.oriPassword = false;
			} else {
				this.verify.oriPassword = true;
			}
		},

		passwordFun() {
			if (formRegular('letterAndNumber',this.password)) {
				this.verify.password = false;
			} else {
				this.verify.password = true;
			}
		},

		phoneConfirmPasswordFun() {
			// const reg = /^(?=.*\d)(?=.*[a-zA-Z])[\da-zA-Z~!@#$%^&*]{6,18}$/;
			if (formRegular('letterAndNumber',this.phoneConfirmPassword)) {
				this.verify.phoneConfirmPassword = false;
			} else {
				this.verify.phoneConfirmPassword = true;
			}
		},
		//  Identify code
		sandIdentifyCode() {
			if (!this.phone) return this.$util.showToast('手机不能为空');
			this.verifyDisabled = true;
			this.$http
				.post('sms/sendCode', { mobile: this.phone })
				.then(res => {
					if (res.code === 200) {
						this.smsKey = res.data.smsKey;
						this.$util.showToast('发送成功,请注意查收短信');
					} else {
						this.$util.showToast(res.msg);
					}
				})
				.catch(err => {
					this.$util.showToast(err.msg);
					console.log(err);
				});
			let timer = null;
			if (timer <= 0) timer = null;
			let countdown = 60;
			this.verifyText = '重发' + countdown + '秒';
			timer = setInterval(() => {
				countdown--;
				this.verifyText = '重发' + countdown + '秒';
				if (countdown <= 0) {
					clearInterval(timer);
					this.verifyText = '获取验证码';
					this.verifyDisabled = false;
				}
			}, 1000);
		},
		confirmPasswordFun() {
			this.verify.confirmPassword = false
		},
		submit() {
			if (this.showType === 'password') {
				this.oriPasswordFun();
				this.passwordFun();
				if (this.verify.oriPassword) {
					return false;
				}

				if (this.verify.password) {
					return false;
				}
				if(this.password === this.confirmPassword){
					this.verify.confirmPassword = false
				} else {
					this.verify.confirmPassword = true
					return false
				}
			} else {
				let verReg = /^\d{4}$/
				const regVerify = verReg.test(this.smsCode)
				if (!regVerify ) return this.$util.showToast('请输入正确的验证码')
				if (!this.smsKey) return this.$util.showToast('请获取验证码')
				this.phoneFun();
				this.phoneConfirmPasswordFun();
				if (this.verify.phone) {
					return false;
				}
				if (this.verify.phoneConfirmPassword) {
					return false;
				}
			}
			const apiUrl = this.showType === 'password' ? 'stuh5/login/resetPassword' : 'stuh5/login/resetPasswordByPhone';
			const passwordParams = {
				userId: this.userInfo.id,
				password: md5(this.password),
				oriPassword: this.oriPassword
			};
			if (!this.isFirst) {
				passwordParams.oriPassword = md5(this.oriPassword)
			}
			const phoneParams = {
				// userId: this.userInfo.id,
				phone: this.phone,
				smsKey: this.smsKey,
				password: md5(this.phoneConfirmPassword),
				smsCode: this.smsCode
			};
			this.$http
				.post(apiUrl, this.showType === 'password' ? passwordParams : phoneParams)
				.then(res => {
					if (res.code === 200) {
						if (this.isFirst) {
							this.$util.showToast('设置密码成功');
							setTimeout(() => {
								uni.switchTab({
									url: '/pages/home/home'
								});
							}, 1000);
						} else {
							this.$util.showToast('修改密码成功');
							setTimeout(() => {
								uni.switchTab({
									url: '/pages/mine/mine'
								});
							}, 1000);
						}
						
					} else {
						this.$util.showToast(res.msg);
					}
				})
				.catch(err => {
					this.$util.showToast(err.msg);
				});
		}
	}
};
</script>

<style lang="scss" scoped>
.main {
	margin-top: 50rpx;
	width: 86%;
	margin-left: 7%;
	.tabs {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 32rpx;
		color: #7f7f7f;
		padding: 0 25rpx;
		.active {
			color: #333;
			font-weight: bold;
			position: relative;
			&::before {
				content: '';
				position: absolute;
				left: 50%;
				transform: translateX(-50%);
				bottom: -6rpx;
				width: 72rpx;
				height: 8rpx;
				background: $color-red;
				border-radius: 8rpx;
			}
		}
	}
}

.title {
	position: relative;
	font-weight: bold;
	font-size: 36rpx;
}

.title::before {
	content: '';
	width: 8rpx;
	height: 40rpx;
	top: 6rpx;
	left: -20rpx;
	background: linear-gradient(to bottom, #ec2c32, #fff);
	display: inline-block;
	position: absolute;
}

.input-box {
	width: 88%;
	padding-left: 6%;
}

.phone-input {
	border-bottom: 1rpx solid #f2f2f2;
	margin-left: 10rpx;
	padding: 4rpx 20rpx;
	width: 88%;
	font-size: 14px;
	line-height: 56rpx;
	height: 56rpx;
}

.icon-before {
	width: 32rpx;
	height: 42rpx;
}

.phohe-login {
	color: #fff;
	background-color: #bc292d;
	border-radius: 100rpx;
}

.verify-input {
	border-bottom: 1rpx solid #f2f2f2;
	margin-right: 30rpx;
	padding: 4rpx 20rpx;
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

.verify-box-err .error {
	background-color: rgba(235, 9, 9, 0.1);
	border: 2rpx solid #bc292d;
	border-radius: 8rpx;
}

.verify-box .error-text {
	display: none;
	position: absolute;
	bottom: -40rpx;
	left: 170rpx;
	font-size: 24rpx;
	color: #eb0909;
}

.verify-box-err .error-text {
	display: inline-block;
}

.verify-code {
	background-color: #e64949;
	color: #fff;
	padding: 20rpx 20rpx;
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
