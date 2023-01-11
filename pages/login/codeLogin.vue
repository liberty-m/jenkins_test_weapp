<template>
	<view class="bgc-img" style="background-image: url('https://tcsrcz.oss-cn-hangzhou.aliyuncs.com/lxw/base/login_bc.jpg');">
		<view class="main">
			<view class="align-between"><image class="logo" src="../../static/logo.png" mode=""></image></view>
			<view class="align-between mt-60">
				<view class="c9 fz-34">登录/注册</view>
				<view class="pri-c fz-28" @tap="toPage('pass')">密码登录</view>
			</view>
			<view class="flex mt-30">
				<!-- <text class="expand">+86</text> -->
				<input v-model="phone" :disabled="!agreement" class="phone-input" placeholder="请输入手机号" type="number" />
			</view>
			<view class="flex mt-30">
				<input v-model="smsCode" :disabled="!agreement" class="verify-input" placeholder="请输入验证码" type="number" />
				<text v-if="!verifyDisabled" class="verify-code" @tap="sendCode">获取验证码</text>
				<text v-else class="verify-code" style="background: #999">{{verifyText}}</text>
			</view>
			<view class="mb-80 mt-100" v-if="agreement"><button type="default" class="phohe-login" @tap="toLogin">登录</button></view>
			<view class="mb-80 mt-100" v-else><button type="default" class="phohe-login" style="background-color: #E5E5E5">登录</button></view>
			<view class="fz-28 text-center control mt-80 flex-align uni-checkbox">
				<image @tap="agreement = true" v-if="!agreement" class="w-30 h-30 mr-10" src="/static/no_select.png" mode=""></image>
				<image @tap="agreement = false" v-if="agreement" class="w-30 h-30 mr-10" src="/static/select.png" mode=""></image>
				<!-- <checkbox-group v-else @change="radioChange">
					<checkbox :checked="agreement" style="transform:scale(0.7);" color="#BC292D" />
				</checkbox-group> -->
				<view>我已阅读并同意
					<navigator class="control-a" url="/pages_ani/agreement/agreement?agreementType=1"  hover-class="navigator-hover">
								   《服务协议》
					</navigator>及
					<navigator class="control-a" url="/pages_ani/agreement/agreement?agreementType=0" hover-class="other-navigator-hover">
								   《隐私政策》
					</navigator>
				</view>
			</view>
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
import { mapActions, mapGetters, mapMutations } from 'vuex';
export default {
	data() {
		return {
			phone: '',
			smsCode: '', // 验证码
			verifyText: '获取验证码',
			verifyDisabled: false,
			agreement: true
		};
	},
	computed: {
		...mapGetters(['smsKey', 'wxLoginData'])
	},
	onShow() {
		this.getWxLoginData()
	},
	methods: {
		...mapMutations(['getWxLoginData', 'getPhoneNumber']),
		...mapActions({
			async toLogin(commit) {
				if (!this.agreement) return this.$util.showToast('请确保已阅读并同意协议')
				if (!this.phone) return this.$util.showToast('手机号不能为空');
				if (!this.smsCode) return this.$util.showToast('验证码不能为空');
				const data = {
					phone: this.phone,
					smsKey: this.smsKey,
					smsCode: this.smsCode,
					loginType: 'code'
				};
				const smsParams = {
					smsKey: this.smsKey,
					smsCode: this.smsCode,
					callback: async (flag) => {
						console.log('回调验证码状态: ', flag)
						if (flag) {
							await commit('login', data);
							commit('SET_CONSTANT', { fieldName: 'subjectDegree' })
							commit('SET_CONSTANT', { fieldName: 'subjectLen' })
							commit('SET_CONSTANT', { fieldName: 'orderRefundReason' })
							commit('SET_CONSTANT', { fieldName: 'orderAfterrecdOperateTypeDescribe' })
							commit('SET_STU')
							commit('SET_CITY')
							commit('SET_GRADE')
							commit('SET_CATEGORY')
						}
					}
				}
				await commit('VERIFY_CODE', smsParams);
			},
			async getPhone(commit, e) {
				if (!this.agreement) return this.$util.showToast('请确保已阅读并同意协议');
				if (e.detail.errMsg == 'getPhoneNumber:ok') {
					await this.getPhoneNumber(e)
					await commit('registerByPhone', this.wxLoginData)
				} else {
					this.$util.showToast('用户已拒绝');
				}
			},
			async sendCode(commit) {
				if (!this.agreement) return this.$util.showToast('请确保已阅读并同意协议');
				if (!this.phone) return this.$util.showToast('手机号码不能为空')
				const reg = /^(?:(?:\+|00)86)?1\d{10}$/
				if (!reg.test(this.phone)) return this.$util.showToast('手机号码不正确')
				this.verifyDisabled = true
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
				await commit('SEND_CODE', this.phone)
			}
		}),
		radioChange(evt){
			this.agreement = false
		},
		getUserInfo(e) {
			console.log(e);
		},
		toPage(page) {
			uni.navigateTo({
				url: 'passLogin'
			})
			// uni.navigateBack({
			// 	delta: 1
			// });
		}
	}
};
</script>

<style lang="scss" scoped>
.main {
	margin-top: 50rpx;
	width: 80%;
	margin-left: 10%;
}

.logo {
	width: 258rpx;
	height: 94rpx;
}

.control {
	display: flex;
	justify-content: center;
}

.control-a {
	display: inline-block;
	color: #bc292d;
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
	top: 16rpx;
	color: #bc292d;
	vertical-align: bottom;
}

.expand::after {
	display: inline-block;
	position: absolute;
	content: '';
	width: 10rpx;
	height: 10rpx;
	top: 10rpx;
	right: -30rpx;
	transform: rotate(-135deg);
	border-top: 2rpx solid #bc292d;
	border-left: 2rpx solid #bc292d;
}

.phone-input {
	border-bottom: 1rpx solid #f2f2f2;
	// margin-left: 50rpx;
	padding: 4rpx 20rpx;
	width: 100%;
	// width: 74%;
	font-size: 14px;
	line-height: 56rpx;
	height: 56rpx;
}

.bgc-img {
	background-position: bottom;
	background-repeat: no-repeat;
	background-size: 100% 100%;
	height: 100vh;
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

.wx-icon {
	width: 100rpx;
	height: 100rpx;
}
</style>
