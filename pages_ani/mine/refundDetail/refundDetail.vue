<template>
	<view class="global-wrap refund-detail">
		<view class="step-status color-999 mb-20">
			<view class="flex-between align-between mb-15">
				<text class="color-red fz-32">{{dicAftersaleStatus[detail.orderAftersale.aftersaleStatus]}}</text>
				<text>{{detail.orderAftersale.time}}</text>
			</view>
			<view class="fz-20" style="font-size: 14px !important;">
				{{orderAfterrecd.desc}}
			</view>
		</view>
		<view class="step">
			<!-- <u-steps current="1" activeColor="#BC292D">
				<u-steps-item title="提交申请"></u-steps-item>
				<u-steps-item title="机构审核"></u-steps-item>
				<u-steps-item title="退款审核"></u-steps-item>
			</u-steps> -->
			
			<view class="status">
				<view class="fz-30">申请退款金额</view>
				<view>
					<text class="fz-28"></text>
					<text class="color-red fz-36 fw-500">￥{{detail.orderAftersale.amount / 100}}</text>
				</view>
			</view>
			<view class="history" @tap="toHistory">
				<text class="fz-28 mr-20">协商历史</text>
				<text class="color-999 u-line-1 w-480">请点击查看协商记录</text>
				<view class="color-999 iconfont icon-youjiantou_huaban"></view>
			</view>
		</view>

		<graphic-list showType="detail" :detail="detail" from="refund"></graphic-list>
		<view class="info-panel mt-20" v-if="detail.orderPayrecds.length">
			<view class="title">
				<view class="gradient"></view>
				<view class="fz-32">支付记录</view>
			</view>
			<view class="info">
				<view class="item" v-for="item in detail.orderPayrecds">
					<view class="circle mr-10"></view>
					<view class="title">{{item.time}}</view>
					<view class="data ml-auto" v-if="item.payItemType === 0">支付报名费 ￥{{item.amount / 100}}</view>
					<view class="data ml-auto" v-if="item.payItemType === 1">支付全款 ￥{{item.amount / 100}}</view>
					<view class="data ml-auto" v-if="item.payItemType === 2">支付尾款 ￥{{item.amount / 100}}</view>
				</view>
			</view>
		</view>
		<view class="info-panel mt-20">
			<view class="title">
				<view class="gradient"></view>
				<view class="fz-32">订单信息</view>
			</view>
			<view class="info">
				<view class="item">
					<view class="title mr-auto">订单编号</view>
					<view class="data">{{ detail.orderNo }}</view>
					<view class="tag">
						<view class="ml-10">
							<u-tag @tap="copyText(detail.orderNo)" color="#CB242B" borderColor="#CB242B" size="mini" text="复制" plain shape="circle"></u-tag>
						</view>
					</view>
				</view>
				<view class="item">
					<view class="title">课程价格</view>
					<view class="data">￥{{detail.orderItems[0].allPrice / 100}}</view>
				</view>
				<view class="item" v-if="detail.orderOprecds[0].operateStatus === 1 || detail.orderOprecds[0].operateStatus === 2">
					<view class="title">实付款</view>
					<view class="data">￥{{detail.payAmount / 100}}</view>
				</view>
				<view class="item">
					<view class="title">下单时间</view>
					<view class="data">{{ detail.time }}</view>
				</view>
				<!-- <view class="item">
					<view class="title">订单状态</view>
					<view class="data">{{dicAftersaleStatus[detail.orderStatus]}}</view>
				</view> -->
			</view>
		</view>
		<view class="info-panel mt-20">
			<view class="title">
				<view class="gradient"></view>
				<view class="fz-32">报读信息</view>
			</view>
			<view class="info">
				<view class="item">
					<view class="title">报读院校</view>
					<view class="data">{{detail.schoolName}}</view>
				</view>
				<view class="item">
					<view class="title">报读年级</view>
					<view class="data">{{detail.gradeName}}</view>
				</view>
				<view class="item">
					<view class="title">报读专业</view>
					<view class="data">{{detail.subjectName}}</view>
				</view>
			</view>
		</view>
		<view class="info-panel mt-20">
			<view class="title">
				<view class="gradient"></view>
				<view class="fz-32">学生信息</view>
			</view>
			<view class="info">
				<view class="item">
					<view class="title">姓名</view>
					<view class="data">{{detail.name}}</view>
				</view>
				<view class="item">
					<view class="title mr-auto">联系电话</view>
					<view class="data">{{detail.phone}}</view>
					<!-- <view class="tag">
						<view class="ml-10"><u-tag color="#CB242B" borderColor="#CB242B" size="mini" text="复制" plain shape="circle"></u-tag></view>
					</view> -->
				</view>
				<view class="item">
					<view class="title mr-auto">身份证号</view>
					<view class="data">{{detail.idCard}}</view>
					<!-- <view class="tag">
						<view class="ml-10"><u-tag color="#CB242B" borderColor="#CB242B" size="mini" text="复制" plain shape="circle"></u-tag></view>
					</view> -->
				</view>
			</view>
		</view>
		<view class="pb-150"></view>
		<!-- <view class="action">
			<view class="left">
				<view class="wrap">
					<view class="iconfont icon-paimaizixun fz-46"></view>
					<view>咨询</view>
				</view>
				<view class="wrap">
					<view class="iconfont icon-dianhua fz-46"></view>
					<view>电话</view>
				</view>
			</view>
			<view class="lx-btn">撤销退款</view>
		</view> -->
		<view class="action">
			<view class="kf" v-if="detail.orderAftersale.aftersaleStatus === 4" @tap="showModal = true">
				<image class="w-32 h-37" src="../../../static/images/kfjr_icon.png" mode=""></image>
				<view>客服介入</view>
			</view>
			<view class="btn ml-auto">
				<view v-if="detail.orderAftersale.aftersaleStatus !== 3 && detail.orderAftersale.aftersaleStatus !== 6"
					  class="lx-btn gray ml-20"
					  @tap="handleButton('refund')">撤销</view>
				<view v-if="detail.orderAftersale.aftersaleStatus === 4 || detail.orderAftersale.aftersaleStatus === 6"
					  @tap="handleButton('reset')" class="lx-btn gray ml-20">
					  重新提交
				</view>
				<view v-if="detail.orderAftersale.aftersaleStatus === 5 && detail.orderAftersale.arbitrateType === 1"
					  @tap="handleButton('reset')" class="lx-btn gray ml-20">
					  重新提交
				</view>
			</view>
		</view>
		
		<u-modal :show="showModal"
				 closeOnClickOverlay
				 showCancelButton
				 confirmColor="#CB242B"
				 @cancel="showModal = false"
				 @close="showModal = false"
				 @confirm="confirmUpdate">
			<view class="slot-content">
				<u--textarea
				    placeholder="请输入备注"
				    border="surround"
					type="text"
				    v-model="memo"
				  ></u--textarea>
			</view>
		</u-modal>
	</view>
</template>

<script>
import { mapGetters } from 'vuex'
import graphicList from '@/pages_ani/components/busi/graphicList.vue';
import dayjs from 'dayjs'
export default {
	components: { graphicList },
	data() {
		return {
			showModal: false,
			memo: '',
			orderAftersaleId: '',
			detail: {},
			list: [],
			orderAfterrecd: {},
			dicAftersaleStatus: {
				1: '待审核',
				2: '退款中',
				3: '退款成功',
				4: '拒绝退款',
				5: '客服协商仲裁',
				6: '售后关闭',
			},
		};
	},
	computed: {
		...mapGetters(['userInfo', 'dicMap'])
	},
	onShow() {
		this.getDetail(this.orderAftersaleId)	
	},
	onLoad(options) {
		this.orderAftersaleId = options.orderAftersaleId
	},
	methods: {
		confirmUpdate () {
			if (!this.memo) return this.$util.showToast('请输入备注')
			const params = {
				orderAftersaleId: this.orderAftersaleId,
				memo: this.memo
			}
			this.$util.showLoading();
			this.$http
				.post('stuh5/order/stuApplyPlatArbitrate', params)
				.then(res => {
					if (res.code === 200) {
						this.$util.showToast('提交申请成功');
						this.showModal = false
						setTimeout(() => {
							this.getDetail(this.orderAftersaleId)
						}, 1000)
						this.$util.hideLoading();
					} else {
						this.$util.showToast(res.msg);
						this.$util.hideLoading();
					}
				})
				.catch(err => {
					console.log(err);
					this.$util.hideLoading();
				});
		},
		toHistory () {
			uni.navigateTo({
				url: `/pages_ani/mine/negotiationHistory/negotiationHistory?list=${JSON.stringify(this.detail.orderAfterrecds)}`
			})
		},
		copyText(data) {
			console.log('copy:', data);
			const _self = this;
			uni.setClipboardData({
				data,
				success() {
			 	console.log('success');
					_self.$util.showToast('复制成功');
				},
				fail() {
					console.log('error');
					_self.$util.showToast('复制失败');
				}
			});
		},
		handleButton (type) {
			if (type === 'reset') {
				uni.navigateTo({
					url: `/pages_ani/mine/applyRefund/applyRefund?detail=${JSON.stringify(this.detail)}&from=detail`
				})
			}
			const _self = this
			const getApi = {
				'refund': 'stuh5/order/revokeRefund',
				'platform': 'stuh5/order/stuApplyPlatArbitrate'
			}
			const tips = {
				'refund': '关闭退费',
				'platform': '平台介入'
			}
			const params = {
				orderAftersaleId: this.orderAftersaleId,
				userId: this.userInfo.id,
				userType: 0
			}
			if (type === 'platform') {
				delete params.userId
				delete params.userType
			}
			for (const key in getApi) {
				if (key === type) {
					uni.showModal({
						title: '提示',
						content: `确定${tips[key]}?`,
						confirmColor: '#CB242B',
						success: res => {
							if (res.confirm) {
								console.log('用户点击确定');
								_self.handleButtonEvent(getApi[key], params, tips[key])
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
				}
			}
		},
		handleButtonEvent(api, params = {}, msg) {
			console.log(api, params)
			this.$http
				.post(api, params)
				.then(res => {
					if (res.code === 200) {
						this.$util.showToast(`${msg}成功`);
						setTimeout(() => {
							this.getDetail(this.orderAftersaleId)
						}, 1000)
						this.$util.hideLoading();
					} else {
						this.isLoading = false;
						this.$util.showToast(res.msg);
						this.$util.hideLoading();
					}
				})
				.catch(err => {
					console.log(err);
					this.$util.hideLoading();
				});
		},
		getDetail(orderAftersaleId) {
			this.$util.showLoading();
			this.$http
				.post('stuh5/order/orderAfterSaleDetail', { orderAftersaleId })
				.then(res => {
					if (res.code === 200) {
						// const data = res.data;
						console.log('售后详情：', res);
						this.detail = res.data.data;
						// this.detail.labels = this.detail.serveMsg.split(',')
						this.orderAfterrecd = this.detail.orderAfterrecds[this.detail.orderAfterrecds.length - 1]
						this.orderAfterrecd.desc = this.dicMap.orderAfterrecdOperateTypeDescribe.filter(v => v.value == this.detail.orderAfterrecds[0].operateTypeDescribe)[0].name
						this.detail.time = dayjs(this.detail.gmtCreate).format('YYYY-MM-DD HH:mm:ss');
						this.detail.orderAftersale.time = dayjs(this.detail.orderAftersale.gmtCreate).format('YYYY-MM-DD HH:mm:ss');
						this.detail.orderPayrecds = this.detail.orderPayrecds.filter(v => v.tradeType === 0)
						if (this.detail.orderPayrecds.length) {
							for (const key in this.detail.orderPayrecds) {
								this.detail.orderPayrecds[key].time = dayjs(this.detail.orderPayrecds[key].gmtCreate).format('YYYY-MM-DD HH:mm:ss');
							}
						}
						this.$util.hideLoading();
					} else {
						this.$util.showToast(res.msg);
						this.$util.hideLoading();
					}
				})
				.catch(err => {
					console.log(err);
					this.$util.hideLoading();
				});
		}
	}
};
</script>

<style lang="scss" scoped>
.refund-detail {
	.step-status {
		padding: 20rpx;
		background-color: #fff;
	}
	.step {
		background-color: #fff;
		padding: 0rpx 0 20rpx 0;
		.status {
			display: flex;
			justify-content: space-between;
			align-items: center;
			background-color: #fff;
			padding: 20rpx 30rpx 10rpx 30rpx;
		}
		.history {
			display: flex;
			align-items: center;
			height: 62rpx;
			background-color: #fbfbfb;
			padding: 5rpx 10rpx;
			border-radius: 8rpx;
			margin: 0 20rpx;
			margin-top: 20rpx;
			view {
				margin-left: auto;
			}
		}
	}
	.action {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		height: 110rpx;
		line-height: 100rpx;
		border-top: 1px solid #f2f2f2;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: #fff;
		padding: 0 30rpx;
		.left {
			display: flex;
			.wrap {
				height: 110rpx;
				view:first-child {
					height: 40rpx;
					margin-right: 40rpx;
					margin-bottom: 5rpx;
					margin-top: 15rpx;
				}
				display: flex;
				flex-direction: column;
				justify-content: center;
			}
		}
		.kf {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			line-height: 0;
			margin-top: -8rpx;
			image {
				margin-bottom: 26rpx;
			}
		}
		.btn {
			display: flex;
		}
	}
}
</style>
