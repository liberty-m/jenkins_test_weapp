<template>
	<view>
		<image class="bgc-img" src="https://tcsrcz.oss-cn-hangzhou.aliyuncs.com/lxw/base/login_bc.jpg" alt="" />
		<view class="main">
			<view class="align-between">
				<image class="logo" src="../../static/logo.png" mode=""></image>
				<!-- <text class="to-partner">申请成为合伙人</text> -->
			</view>
			<!-- <view class="align-between mt-60">
				<view class="c9 fz-34"></view>
				<view class="pri-c fz-28 mr-20" @tap="registry">注册</view>
			</view> -->

			<view class="flex-align mt-30">
				<image class="icon-before" style="width: 34rpx;" src="../../static/icon/account.png" alt="" />
				<input v-model="account" :disabled="!agreement" class="phone-input" placeholder="请输入账号"  />
			</view>
			<view class="flex-align mt-30">
				<image class="icon-before" src="../../static/icon/pass.png" alt="" />
				<input v-if="passwordType.password === 'password'" :disabled="!agreement" v-model="password" class="uni-input-input phone-input" placeholder="请输入密码" type="password" />
				<input v-else v-model="password" :disabled="!agreement" class="uni-input-input phone-input" placeholder="请输入密码" type="text" />
				<u-icon class="eye" :name="passwordType.password === 'password' ? 'eye' : 'eye-fill'" size="40rpx" @click="changePasswordType('password')"></u-icon>
			</view>
			<view class="mt-60 mb-10"><button type="default" class="phohe-login" @tap="toLogin">登录</button></view>
			<!-- <view class="mt-100 mb-10" v-else><button type="default" class="phohe-login" style="background-color: #E5E5E5">登录</button></view> -->
			<!-- <view class="text-right">
				<text class="c8 fz-28" @tap="toPage('phone')">测试手机号登录</text>
			</view> -->
			<!-- <view class="text-right"><text class="c8 fz-28" @tap="toPage('forget')">忘记密码</text></view> -->
			<!--  -->
			<!-- #ifdef MP-WEIXIN -->
			<view class="text-center mt-80">
				<view class="c9 fz-28 mb-30">微信登录</view>
				<button class="wx-btn" v-if="agreement" open-type="getPhoneNumber" @getphonenumber="getPhone" type="default"><img class="wx-icon" src="../../static/wx.png" alt="" /></button>
				<button class="wx-btn" v-else type="default"><img class="wx-icon" src="../../static/wx.png" alt="" /></button>
			</view>
			<!-- #endif -->
		</view>
	</view>
</template>

<script>
import md5 from 'js-md5';
import { mapActions, mapGetters, mapMutations } from 'vuex';
export default {
	data() {
		return {
			passwordType: {
				password: 'password'
			},
			agreement: true,
			account: '',
			password: '',
			recommendInfo: {},
			code: '',
			sessionKey: '',
			openid: ''
		};
	},
	onShow() {
		this.getWxLoginData()
		this.logout()
	},
	computed: {
		...mapGetters(['wxLoginData'])
	},
	onLoad (options) {
		// console.log(options);
	},
	methods: {
		...mapMutations(['getWxLoginData', 'getPhoneNumber']),
		...mapActions({
			async toLogin(commit) {
				if (!this.agreement) return this.$util.showToast('请确保已阅读并同意协议');
				if (!this.account) return this.$util.showToast('帐号不能为空');
				if (!this.password) return this.$util.showToast('密码不能为空');
				const data = {
					userAlias: this.account,
					password: md5(this.password),
					// NAME: 'Liberty'
					// loginType: 'pass'
					// recommendInfo: this.recommendInfo
				};
				await commit('login', data);
				// commit('SET_CONSTANT', { fieldName: 'subjectDegree' });
				// commit('SET_CONSTANT', { fieldName: 'subjectLen' });
				// commit('SET_CONSTANT', { fieldName: 'orderRefundReason' });
				// commit('SET_CONSTANT', { fieldName: 'orderAfterrecdOperateTypeDescribe' });
				// commit('SET_STU');
				// commit('SET_CITY');
				// commit('SET_GRADE');
				// commit('SET_CATEGORY');
			},
			registry () {
				console.log('registry')
				uni.navigateTo({
					url: './register'
				})
			},
			async logout (commit) {
				await commit('logout');
			},
			async getPhone(commit, e) {
				if (!this.agreement) return this.$util.showToast('请确保已阅读并同意协议');
				if (e.detail.errMsg == 'getPhoneNumber:ok') {
					await this.getPhoneNumber(e)
					await commit('registerByPhone', this.wxLoginData)
				} else {
					this.$util.showToast('用户已拒绝');
				}
			}
		}),
		changePasswordType(type) {
			this.passwordType[type] = this.passwordType[type] === 'password' ? 'text' : 'password';
		},
		getUserInfo(e) {
			console.log(e);
		},
		radioChange(evt) {
			this.agreement = !this.agreement;
		},
		toPage(page) {
			console.log(page);
			if (page === 'code') {
				uni.navigateBack({
					delta: 1
				});
				return;
			}
			const pages = {
				forget: '/pages_ani/password/findPass',
				code: 'codeLogin',
				phone: 'login'
			};
			for (const key in pages) {
				if (key === page) {
					uni.navigateTo({
						url: pages[key]
					});
				}
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.main {
	margin-top: 50rpx;
	width: 80%;
	margin-left: 10%;
	position: absolute;
	z-index: 2;
}

.logo {
	width: 258rpx;
	height: 94rpx;
}

.control {
	display: flex;
	justify-content: center;
}

.wx-btn {
	width: 150rpx;
	margin: 0 auto;
	&::after {
		border: none;
		background-color: transparent;
	}
	background-color: transparent;
	.img-icon {
		width: 84rpx;
		height: 84rpx;
	}
}

.to-partner {
	display: inline-block;
	padding: 8rpx 24rpx;
	font-size: 28rpx;
	color: #bc292d;
	background-color: #f2f2f2;
	border-radius: 30rpx;
}

.expand {
	position: relative;
	color: #bc292d;
	vertical-align: bottom;
}

.expand::after {
	display: inline-block;
	position: absolute;
	content: '';
	width: 10rpx;
	height: 10rpx;
	top: 16rpx;
	right: -30rpx;
	transform: rotate(-135deg);
	border-top: 2rpx solid #bc292d;
	border-left: 2rpx solid #bc292d;
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

// .bgc-img {
// 	background: url(../../static/login_bc.jpg) top no-repeat;
// 	background-size: 100% 100%;
// 	background-color: #f0f2f5;
// 	height: 100vh;
// 	position: relative;
// }
.bgc-img {
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 1;
}

.verify-input {
	border-bottom: 1rpx solid #f2f2f2;
	margin-right: 30rpx;
	padding: 4rpx 20rpx;
	line-height: 56rpx;
	height: 56rpx;
	font-size: 14px;
	width: 60%;
}

.verify-code {
	background-color: #e64949;
	color: #fff;
	padding: 10rpx 20rpx;
	display: inline-block;
	font-size: 24rpx;
	border-radius: 30rpx;
	height: 40rpx;
}

.phohe-login {
	color: #fff;
	background-color: #bc292d;
	border-radius: 100rpx;
}

.icon-before {
	width: 32rpx;
	height: 42rpx;
}

.wx-icon {
	width: 100rpx;
	height: 100rpx;
	vertical-align: middle;
}

.control-a {
	display: inline-block;
	color: #bc292d;
}

.eye {
	position: absolute;
	right: 10rpx;
}
</style>
