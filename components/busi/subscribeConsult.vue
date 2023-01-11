<template>
	<view>
		<u-popup :show="showSubscribePopup" closeable :round="10" mode="bottom" closeOnClickOverlay @close="closeSubscribePopup" @open="openSubscribePopup">
			<view class="popup-select"><view class="fz-32 fw-500 text-center pt-26 mb-20">预约咨询</view></view>
			<view v-if="!isEdit" class="subscribe-main">
				<text class="color-999 fz-28">预约后机构将通过电话联系您</text>
				<view class="mb-20 mt-20">
					<text>{{ formatPhone }}</text>
					<text @tap="isEdit = true" class="iconfont icon-bianji color-999 fz-30 ml-15 mr-5 vl-middle"></text>
					<text @tap="isEdit = true" class="color-999">修改</text>
				</view>
				<view class="flex">
					<view class="flex mr-40">
						<text class="iconfont icon-dagouyouquan fz-32 color-red mr-10"></text>
						<text>无强行推销</text>
					</view>
					<view class="flex">
						<text class="iconfont icon-dagouyouquan fz-32 color-red mr-10"></text>
						<text>不泄露用户手机号码</text>
					</view>
				</view>
			</view>
			<view v-else class="subscribe-main">
				<text class="fz-28">预约后机构将通过电话联系您</text>
				<view class="flex mt-30">
					<!-- <text class="expand">+86</text> -->
					<input v-model="phone" class="phone-input" placeholder="请输入手机号" type="text" />
				</view>
				<view class="flex mt-30">
					<input v-model="smsCode" class="verify-input" placeholder="请输入验证码" type="text" />
					<text v-if="!verifyDisabled" class="verify-code" @tap="sendCode">获取验证码</text>
					<text v-else class="verify-code" style="background: #999">{{verifyText}}</text>
				</view>
				<view class="flex mt-30">
					<view class="flex mr-40">
						<text class="iconfont icon-dagouyouquan fz-32 color-red mr-10"></text>
						<text>无强行推销</text>
					</view>
					<view class="flex">
						<text class="iconfont icon-dagouyouquan fz-32 color-red mr-10"></text>
						<text>不泄露用户手机号码</text>
					</view>
				</view>
			</view>
			<view class="lx-btn-wrap lx-btn-80">
				<u-button :loading="isLoading" style="position: relative; top: -40rpx;" class="lx-btn block wb-88 m-auto mt-50 lt-s-4 fz-32" type="primary" text="立即预约" @tap="subscribeConsult"></u-button>
			</view>
			<!-- <view style="position: relative; top: -40rpx;" class="lx-btn block wb-88 m-auto mt-50 lt-s-4 fz-32" @click="subscribeConsult">立即预约</view> -->
		</u-popup>
	</view>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { debounce } from '@/utils/util.js'
import util from '@/utils/util.js';
export default {
	name: 'subscribeConsult',
	props: {
		showType: {
			type: String,
			default: 'cource'
		},
		merchant: {
			type: Object,
			default: () => {}
		}
	},
	data() {
		return {
			isLoading: false,
			showSubscribePopup: false,
			isEdit: false,
			verifyDisabled: false,
			verifyText: '',
			phone: '',
			smsCode: ''
		};
	},
	computed: {
		...mapGetters(['userInfo', 'smsKey']),
		formatPhone() {
			return util.formatNumber(this.userInfo.phone);
		}
	},
	created() {
		console.log('this.showType: ', this.showType);
		console.log(this.merchant);
	},
	methods: {
		...mapActions({
			sendCode(commit) {
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
				commit('SEND_CODE', this.phone)
			},
			subscribeConsult: debounce(function (commit) {
				this.isLoading = true
				if (!this.isEdit) {
					this.hadnleSubmit();
					return;
				}
				if (!this.smsCode) return this.$util.showToast('请输入验证码')
				this.submit(commit);
			}, 300)
		}),
		hadnleSubmit () {
			let courceParams = {};
			let institutionParams = {};
			if (this.showType === 'cource') {
				courceParams = {
					account: this.userInfo.account,
					way: 1,
					courseId: this.merchant.id,
					courseName: this.merchant.courName,
					mechId: this.merchant.mechId,
					mechName: this.merchant.mechName,
					shopId: this.merchant.shop.id,
					shopName: this.merchant.shop.managementName,
					reservePhone: this.phone ? this.phone : this.userInfo.phone
				};
			} else {
				console.log(this.merchant);
				institutionParams = {
					account: this.userInfo.account,
					way: 2,
					mechId: this.merchant.mechanism,
					mechName: this.merchant.mechName,
					shopId: this.merchant.id,
					shopName: this.merchant.managementName,
					reservePhone: this.phone ? this.phone : this.userInfo.phone
				};
			}
			this.$http
				.post('stuh5/appointment/save', this.showType === 'cource' ? courceParams : institutionParams)
				.then(res => {
					if (res.code === 200) {
						console.log(res);
						this.$util.showToast('预约信息提交成功');
						setTimeout(() => {
							this.isEdit = false;
							this.showSubscribePopup = false;
							this.$util.hideLoading();
						}, 2000)
					} else {
						this.$util.showToast(res.msg);
						this.$util.hideLoading();
					}
					setTimeout(() => {
						this.isLoading = false
					}, 3000)
				})
				.catch(err => {
					console.log(err);
					this.$util.hideLoading();
					this.isLoading = false
				});
		},
		async submit(commit) {
			const smsParams = {
				smsKey: this.smsKey,
				smsCode: this.smsCode,
				callback: async (flag) => {
					console.log('回调验证码状态: ', flag)
					if (flag) {
						this.hadnleSubmit()
					} else {
						this.isLoading = false
					}
				}
			}
			await commit('VERIFY_CODE', smsParams);
		},
		closeSubscribePopup() {
			this.isEdit = false;
			this.showSubscribePopup = false;
		},
		showPopup() {
			this.isEdit = false;
			this.showSubscribePopup = true;
		}
	}
};
</script>

<style lang="scss" scoped>
.subscribe-main {
	padding: 60rpx 80rpx;
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
		font-size: 14px;
		line-height: 56rpx;
		height: 56rpx;
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
	.verify-input {
		border-bottom: 1rpx solid #f2f2f2;
		margin-right: 30rpx;
		padding: 4rpx 20rpx;
		line-height: 56rpx;
		height: 56rpx;
		font-size: 14px;
		width: 60%;
	}
}
</style>
