<template>
	<view class="global-wrap negotiation-history">
		<view class="history-wrap">
			<view class="history-list" v-for="item in list">
				<view class="user-info">
					<view class="avatart">
						<!-- 类型 0学生 1合伙人 2机构 3合伙人+机构 9管理员 -->
						<image v-if="item.userType === 2" src="../../../static/images/mine/history_jg_icon.png" mode=""></image>
						<image v-if="item.userType === 0" src="../../../static/images/mine/history_stu_icon.png" mode=""></image>
						<image v-if="item.userType === 9" src="../../../static/images/mine/history_kf_icon.png" mode=""></image>
					</view>
					<view class="user">
						<view>{{item.userName}}</view>
						<view>{{item.time}}</view>
					</view>
				</view>
				<view class="content">
					<!-- <view class="pt-10 pb-10 fz-28 fw-500">发起了本次退款申请。</view> -->
					<view class="pb-10">
						<text>{{item.feedback}}</text>
					</view>
					<template v-if="item.operateType === 0">
						<view class="pb-10">
							金额：
							<text class="color-red">¥ {{ item.amount / 100 }}</text>
						</view>
						<view class="pb-10">
							说明：
							<text>{{ item.remark }}</text>
						</view>
						<view class="upload" v-if="item.picVoucher">
							<view>凭证图片：</view>
							<image :src="ossUrl + item.picVoucher" mode="aspectFill"></image>
						</view>
					</template>
					<template v-else-if="item.operateType !== 3 && item.operateType !== 0">
						<view class="pb-10">
							描述：
							<text>{{ item.memo || item.remark }}</text>
						</view>
					</template>
				</view>
			</view>
			<!-- <view class="history-list">
				<view class="user-info">
					<view class="avatart">
						<image src="../../../static/images/test/x1.png" mode=""></image>
					</view>
					<view class="user">
						<view>用户15060008888</view>
						<view>2021-12-13 17:12:11</view>
					</view>
				</view>
				<view class="content">
					<view class="pt-10 pb-10 fz-28 fw-500">已审核</view>
					<view class="pb-10">
						审核状态：<text>已通过，并设置退款金额为220.00元</text>
					</view>
					<view class="pb-10">
						退款金额：<text class="color-red">¥ 220.00</text> 元
					</view>
					<view class="pb-10">
						说明：<text>已缴报考费80元</text>
					</view>
				</view>
			</view> -->
		</view>
		<view class="pb-50"></view>
		<!-- <view class="footer">
			<view class="lx-btn gray">问客服</view>
			<view class="lx-btn plain">电话咨询</view>
		</view> -->
	</view>
</template>

<script>
import { ossUrl } from '@/utils/util.js'
import { mapGetters } from 'vuex'
import dayjs from 'dayjs'
export default {
	data() {
		return {
			ossUrl,
			list: []
		};
	},
	computed: {
		...mapGetters(['dicMap'])
	},
	onLoad(options) {
		this.list = JSON.parse(options.list);
		this.list.forEach(item => {
			item.time = dayjs(item.gmtCreate).format('YYYY-MM-DD HH:mm:ss');
			item.feedback = this.dicMap.orderAfterrecdOperateTypeDescribe.filter(v => v.value == item.operateTypeDescribe)[0].name
		})
	}
};
</script>

<style lang="scss">
.global-wrap {
	padding: 40rpx;
}
.negotiation-history {
	.history-wrap {
		font-size: 28rpx;
		.history-list {
			margin-bottom: 60rpx;
			.user-info {
				display: flex;
				align-items: center;
				.avatart {
					width: 64rpx;
					height: 64rpx;
					margin-right: 10rpx;
					image {
						width: 100%;
						height: 100%;
						border-radius: 50%;
						border: 1rpx solid $color-red;
					}
				}
			}
			.content {
				background-color: #fff;
				border-radius: 16rpx;
				padding: 20rpx;
				margin-top: 30rpx;
				position: relative;
				&::after {
					content: '';
					position: absolute;
					left: 32rpx;
					top: -12rpx;
					width: 0;
					height: 0;
					border-left: 12rpx solid transparent;
					border-right: 12rpx solid transparent;
					border-bottom: 12rpx solid #fff;
				}
				.upload {
					display: flex;
					image {
						width: 300rpx;
						height: 246rpx;
						border-radius: 8rpx;
					}
				}
			}
		}
	}
	.footer {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		height: 110rpx;
		background-color: #fff;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		view {
			margin-right: 30rpx;
		}
	}
}
</style>
