<template>
	<view>
		<img class="bgc-img" src="https://tcsrcz.oss-cn-hangzhou.aliyuncs.com/lxw/base/login_bc.jpg" alt="" />
		<view class="main pd-100">
			<view class="text-center mb-40"><image class="logo" src="../../static/logo.png" mode=""></image></view>
			<view class="color-666 text-center">授权绑定微信账户</view>
			<!-- #ifdef MP-WEIXIN -->
			<button class="wx-btn" open-type="getUserInfo" @getuserinfo="getUserInfo" type="default">
				<img class="img-icon" src="../../static/wx_btn.png" alt="" />
				绑定微信账户
			</button>
			<!-- #endif -->
			<!-- #ifdef H5 -->
			<view class="mb-30 mt-100"><button type="default" class="phohe-btn" @tap="toLogin">手机号登录</button></view>
			<!-- #endif -->
			<button class="wx-btn phone" type="default" @tap="toHome">去首页</button>
			<!-- <view class="text-center mt-20 mb-50"> -->
			<!-- <navigator url="/pages/register/register"  hover-class="navigator-hover">
							   <text class="fz-32">申请成为合伙人</text>
				</navigator> -->
			<!-- </view> -->
			<!-- <view class="fz-24 text-center control mt-80">
				<view>
					我已阅读并同意
					<navigator class="inline-block pri-c" url="/pages_ani/agreement/agreement?agreementType=0" hover-class="navigator-hover">《服务协议》</navigator>
					及
					<navigator class="inline-block pri-c" url="/pages_ani/agreement/agreement?agreementType=0" open-type="switchTab" hover-class="other-navigator-hover">《隐私政策》</navigator>
				</view>
			</view> -->
		</view>
	</view>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
export default {
	data() {
		return {
			isAgree: true
		};
	},
	computed: {
		...mapGetters(['userInfo', 'openid'])
	},
	methods: {
		...mapMutations({
			setOpenId: 'SET_OPENID',
			setUserInfo: 'SET_USER_INFO'
		}),
		toLogin() {},
		toHome() {
			uni.switchTab({
				url: '../home/home'
			});
		},
		toPhonePage() {
			uni.navigateTo({
				url: './passLogin'
			});
		},
		registerUser(userInfo, openid) {
			console.log('userInfo: ', userInfo);
			const params = {
				id: this.userInfo.id,
				openid
				// nickname: userInfo.nickName,
				// headUrl: userInfo.avatarUrl
			};
			this.$http
				.post('stuh5/login/updateOpenid', params)
				.then(async res => {
					if (res.code === 200) {
						console.log('更新成功：', res);
						await this.setUserInfo(res.data);
						this.$util.showToast('绑定微信成功');
						setTimeout(() => {
							uni.switchTab({
								url: '../home/home'
							});
						}, 2000);
						this.$util.hideLoading();
					} else {
						this.$util.showToast(res.msg);
					}
				})
				.catch(err => {
					this.$util.showToast(err.msg);
				});
		},
		getUserInfo(event) {
			console.log(event);
			const userInfo = event.detail.userInfo;
			const _self = this;
			_self.$util.showLoading('绑定中...');
			uni.login({
				success({ code }) {
					console.log(code);
					_self.$http
						.post('stuh5/login/getOpenid', { code })
						.then(res => {
							if (res.code === 200) {
								const openid = res.data.openid;
								console.log('openid: ', openid);
								// _self.setOpenId(openid)
								_self.registerUser(userInfo, openid);
								_self.$util.hideLoading();
							} else {
								_self.$util.showToast(res.msg);
							}
						})
						.catch(err => {
							_self.$util.showToast(err.msg);
						});
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.logo {
	width: 258rpx;
	height: 94rpx;
}

.bgc-img {
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 100%;
}

.main {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
}

.wx-btn {
	background-color: #bc292d;
	color: #fff;
	font-size: 36rpx;
	// padding:8rpx 40rpx;
	border-radius: 100rpx;
	margin-top: 40rpx;
	&.phone {
		color: #bc292d;
		background-color: #fff;
		border: 1rpx solid #bc292d;
	}
	&::after {
		border: none;
	}
	.img-icon {
		margin-right: 16rpx;
		vertical-align: middle;
		width: 58rpx;
		height: 48rpx;
	}
}

.phohe-btn {
	border: 1rpx solid #bc292d;
	color: #bc292d;
	background-color: #fff;
	border-radius: 100rpx;
}
</style>
