<template>
	<view class="global-wrap refund-detail">
		<!-- <view class="step mb-20">
			<u-steps current="1" activeColor="#BC292D">
				<u-steps-item title="提交申请"></u-steps-item>
				<u-steps-item title="机构审核"></u-steps-item>
				<u-steps-item title="退款审核"></u-steps-item>
			</u-steps>
			<view class="status">
				<view class="fz-32 color-red fw-500">待审核</view>
				<view>
					<text class="fz-28">申请退款金额</text>
					<text class="color-red fz-36 fw-500">￥300.00</text>
				</view>
			</view>
			<view class="history">
				<text class="fz-28 mr-20">协商历史</text>
				<text class="color-999 u-line-1 w-480">请点击查看协商记录</text>
				<view class="color-999 iconfont icon-youjiantou_huaban"></view>
			</view>
		</view>
 -->
		<graphic-list showType="detail" :detail="detail"></graphic-list>
		<view class="info-panel mt-20" v-if="(detail.orderStatus !== 0 || detail.orderStatus !== 4) && detail.orderPayrecds.length">
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
				<view class="item">
					<view class="title">订单状态</view>
					<view class="data">{{ dicOrderStatus[detail.orderStatus] }}</view>
				</view>
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
					<view class="data">{{ detail.schoolName }}</view>
				</view>
				<view class="item">
					<view class="title">报读年级</view>
					<view class="data">{{ detail.gradeName }}</view>
				</view>
				<view class="item">
					<view class="title">报读专业</view>
					<view class="data">{{ detail.subjectName }}</view>
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
					<view class="data">{{ detail.name }}</view>
				</view>
				<view class="item">
					<view class="title mr-auto">联系电话</view>
					<view class="data">{{ detail.phone }}</view>
					<!-- <view class="tag">
						<view class="ml-10"><u-tag @tap="copyText(detail.phone)" color="#CB242B" borderColor="#CB242B" size="mini" text="复制" plain shape="circle"></u-tag></view>
					</view> -->
				</view>
				<view class="item">
					<view class="title mr-auto">身份证号</view>
					<view class="data">{{ detail.idCard }}</view>
					<!-- <view class="tag">
						<view class="ml-10"><u-tag @tap="copyText(detail.idCard)" color="#CB242B" borderColor="#CB242B" size="mini" text="复制" plain shape="circle"></u-tag></view>
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
			<!-- <view class="kf" v-if="detail.orderStatus === 1 || detail.orderStatus === 2">
				<image class="w-32 h-37" src="../../../static/images/kfjr_icon.png" mode=""></image>
				<view>客服介入</view>
			</view> -->
			<view class="btn">
				<view v-if="detail.orderStatus === 1 || detail.orderStatus === 2" class="lx-btn plain gray mr-20 h-56 lh-56" @tap="handleButton(detail, '', 'refund')">
					售后/退款
				</view>
				<view v-if="detail.orderStatus === 0" class="lx-btn plain gray mr-20 h-56 lh-56" @tap="handleButton(detail, '', 'cancel')">
					取消订单
				</view>
				<view v-if="detail.orderStatus === 0 && detail.payMethod === 0" class="lx-btn plain mr-0 h-56 lh-56" @tap="handleButton(detail, 'pay', 'payEntry')">
					支付报名费
				</view>
				<view v-if="detail.orderStatus === 0 && detail.payMethod === 1" class="lx-btn plain mr-0 h-56 lh-56" @tap="handleButton(detail, 'pay', 'payAll')">
					支付全款
				</view>
				<view v-if="detail.orderStatus === 1" class="lx-btn plain mr-0 h-56 lh-56" @tap="handleButton(detail, 'pay', 'payFinal')">
					支付尾款
				</view>
				<view v-if="detail.orderStatus === 4 || detail.orderStatus === 6" class="lx-btn plain mr-0 h-56 lh-56" @tap="handleButton(detail, 'pay', 'payAgain')">
					再次购买
				</view>
				<!-- <view v-if="detail.orderStatus === 2" class="lx-btn plain mr-0 h-56 lh-56" @tap="handleButton(detail, '', 'enter')">
					确认入学
				</view> -->
			</view>
		</view>
	</view>
</template>

<script>
import graphicList from '@/pages_ani/components/busi/graphicList.vue';
import dayjs from 'dayjs';
export default {
	components: { graphicList },
	data() {
		return {
			detail: {},
			dicOrderStatus: {
				0: '待支付',
				1: '待付尾款',
				2: '付款完成',
				3: '已入学',
				4: '已取消',
				5: '售后',
				6: '交易关闭'
			},
			id: ''
		};
	},
	onLoad(options) {
		console.log(options);
		const { courseId } = options;
		this.id = courseId
		
	},
	onShow() {
		this.getDetail(this.id);
	},
	methods: {
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
		handleButton (item, pay = '', type) {
			console.log(item, pay, type)
			console.log(JSON.stringify(item))
			if (type === 'view') {
				this.handleOrder(item)
				return
			}
			if (type === 'refund') {
				const detail = JSON.stringify(item)
				uni.navigateTo({
					url: `/pages_ani/mine/applyRefund/applyRefund?id=${item.id}&detail=${detail}`
				})
				return
			}
			if (type === 'payAgain') {
				uni.navigateTo({
					url: `/pages/courseDetail/courseDetail?courseId=${item.orderItems[0].courId}`
				});
				return
			}
			const form = {
				name: item.name,
				phone: item.phone,
				idCard: item.idCard
			}
			const detail = {
				schoolName: item.schoolName,
				gradeName: item.gradeName
			}
			const selectCourse = {
				payIndex: item.payMethod,
				subject: {
					subjectName: item.subjectName
					// price: item.payAmount,
					// allPrice: item.payAmount
				}
			}
			const orderInfo = {
				orderId: item.id,
				id: item.orderItems[0].id,
				orderNo: item.orderNo
			}
			if (type === 'payEntry') { // 支付报名费
				selectCourse.subject.price = item.orderItems[0].price
				orderInfo.orderStatus = 0
			}
			
			if (type === 'payFinal') { // 支付尾款
				selectCourse.subject.price = item.orderItems[0].allPrice - item.orderItems[0].price
			}
			
			if (type === 'payAll') { // 支付全款
				selectCourse.subject.allPrice = item.orderItems[0].allPrice
				orderInfo.orderStatus = 0
			}
			
			
			const _self = this
			const getApi = {
				'enter': 'stuh5/order/updateEnter',
				'cancel': 'stuh5/order/cancel'
			}
			const tips = {
				'enter': '入学',
				'cancel': '取消'
			}
			const params = {
				id: item.id
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
			
			if (pay === 'pay') {
				uni.navigateTo({
					url: `../../courseDetail/orderConfirm/orderConfirm?form=${JSON.stringify(form)}&detail=${JSON.stringify(detail)}&selectCourse=${JSON.stringify(selectCourse)}&orderInfo=${JSON.stringify(orderInfo)}`
				})
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
							this.getDetail(this.id)
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
		getDetail(id) {
			this.$util.showLoading();
			this.$http
				.post('stuh5/order/orderDetail', { id })
				.then(res => {
					if (res.code === 200) {
						// const data = res.data;
						console.log('订单详情：', res);
						this.detail = res.data;
						this.detail.labels = this.detail.serveMsg.split(',')
						this.detail.time = dayjs(this.detail.gmtCreate).format('YYYY-MM-DD HH:mm:ss');
						this.detail.orderPayrecds = this.detail.orderPayrecds.filter(v => v.tradeType === 0)
						if (this.detail.orderPayrecds.length) {
							for (const key in this.detail.orderPayrecds) {
								this.detail.orderPayrecds[key].time = dayjs(this.detail.orderPayrecds[key].gmtCreate).format('YYYY-MM-DD HH:mm:ss');
							}
						}
						console.log(this.detail)
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
	.step {
		background-color: #fff;
		padding: 50rpx 0 20rpx 0;
		.status {
			display: flex;
			justify-content: space-between;
			align-items: center;
			background-color: #fff;
			padding: 80rpx 30rpx 10rpx 30rpx;
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
			margin-left: auto;
		}
	}
}
</style>
