<template>
	<view class="global-wrap setting">
		<view class="person mb-20">
			<view class="cell flex-start pd-0 pl-20">
				<view class="mr-10"><image class="w-40 h-46" src="../../../static/images/mine/account_icon.png" mode=""></image></view>
				<view class="fz-48 fw-500 ml-10 lt-s-4">{{formatPhone}}</view>
			</view>
		</view>
		<!-- <view class="person">
			<view class="cell info pb-30">
				<view class="mr-auto">更换手机号</view>
				<view class="iconfont fz-28 icon-youjiantou_huaban"></view>
			</view>
			<view class="cell">
				<view class="mr-auto">绑定微信</view>
				<view class="color-red fz-24 ml-auto">尚未绑定</view>
				<view class="iconfont fz-28 icon-youjiantou_huaban"></view>
			</view>
		</view> -->
		<view class="person mt-20" @tap="toPage('/pages_ani/password/changePassWord')">
			<view class="cell pd-0">
				<view class="mr-auto">修改密码</view>
				<view class="iconfont fz-28 icon-youjiantou_huaban"></view>
			</view>
		</view>
		<view class="person mt-20" @tap="unBindWx">
			<view class="cell pd-0">
				<view class="mr-auto">解除微信绑定</view>
				<view class="iconfont fz-28 icon-youjiantou_huaban"></view>
			</view>
		</view>
	</view>
</template>

<script>
import { mapGetters } from 'vuex'
import util from '@/utils/util.js'
export default {
	data() {
		return {};
	},
	computed: {
		...mapGetters(['userInfo', 'openid']),
		formatPhone () {
			return util.formatNumber(this.userInfo.phone)
		}
	},
	methods: {
		unBindWx() {
			this.$http
				.post('stuh5/login/unbindOpenid', { id: this.userInfo.id })
				.then(res => {
					if (res.code === 200) {
						this.$util.showToast('解除微信绑定成功');
					} else {
						this.$util.showToast(res.msg);
					}
				})
				.catch(err => {
					console.log(err);
					this.$util.showToast(res.msg);
				});
		},
		toPage(url) {
			uni.navigateTo({
				url
			});
		}
	}
};
</script>

<style lang="scss">
.setting {
	padding: 20rpx;
	font-size: 28rpx;
	.person {
		background-color: #fff;
		padding: 20rpx;
		border-radius: 16rpx;
		.cell {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 20rpx 0;
			&.info {
				border-bottom: 1rpx solid #f2f2f2;
			}
		}
		.info {
		}
	}
}
</style>
