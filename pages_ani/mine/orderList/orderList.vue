<template>
	<view class="global-wrap subscribe">
		<!-- <view style="position: sticky;z-index: 999999;right: 0;width: 100%;">
			<hs-search placeholder="会计" @tab-input="handleSearchClick" button="inside" :selectList="[]" @search="doSearch" @confirm="doSearch" v-model="keyword" />
		</view> -->
		<view class="tab mt-20 pl-20 pb-20">
			<view><lx-tabs :tabs="tabs" showType="normal" :current="tabCurrent" @tab-click="tabClick"></lx-tabs></view>
		</view>
		<!-- <view class="tab mt-80"><u-tabs :list="tabList" @change="tabChange" lineColor="#CB242B"></u-tabs></view> -->
		<view class="collection-list pt-20">
			<graphic-list showType="order" :list="orderList" @click-item="handleOrder" @click-button="handleButton">
				<!-- <view class="lx-btn plain gray mr-30 h-56 lh-56" @tap.stop="toRefund">售后/退款</view>
				<view class="lx-btn plain mr-0 h-56 lh-56">付款</view> -->
			</graphic-list>
		</view>
		<view class="pb-20 text-center">
			<u-loading-icon v-if="isLoading" size="20" textSize="14" :show="isLoading" text="努力加载中"></u-loading-icon>
			<view v-else class="color-999 fz-28">没有更多了</view>
		</view>
	</view>
</template>

<script>
import { mapGetters } from 'vuex';
import graphicList from '@/pages_ani/components/busi/graphicList.vue';
import hsSearch from '@/pages_ani/components/search/search.vue';
import lxTabs from '@/components/busi/lxTabs.vue';
export default {
	components: {
		graphicList,
		hsSearch,
		lxTabs
	},
	data() {
		return {
			keyword: '',
			isLoading: true,
			tabCurrent: 0,
			type: 1,
			status: {
				0: null,
				1: [0],
				2: [1],
				3: [2,3],
				4: [4]
			},
			orderList: [],
			orderStatus: null, // 订单状态（0：待支付，1：待付尾款，2：付款完成，3：已入学，4：已取消，5：售后中，6：交易关闭）
			offset: 0,
			limit: 10,
			tabs: [{ name: '全部', value: null }, { name: '待付款', value: [0] }, { name: '待付尾款', value: [1] }, { name: '付款完成', value: [2,3] }, { name: '已取消', value: [4,6] }]
		};
	},
	computed: {
		...mapGetters(['userInfo', 'openid', 'optionList'])
	},
	onLoad(options) {
		console.log(options)
		this.tabCurrent = +options.current
		console.log(this.tabCurrent)
		// this.orderList = [];
		// this.offset = 0;
		// this.getOrderList(this.status[this.tabCurrent]);
		// document.addEventListener('visibilitychange', this.handleVisibilityState, false);
	},
	// beforeDestroy() {
	// 	document.removeEventListener('visibilitychange', this.handleVisibilityState, false)
	// },
	onShow() {
		this.orderList = [];
		this.offset = 0;
		this.getOrderList(this.status[this.tabCurrent]);
	},
	methods: {
		handleVisibilityState() {
			let state = document.visibilityState
			if (state == 'hidden') {
				console.log('用户离开了');
			}
			if (state == 'visible') {
				console.log('显示了');
				this.orderList = [];
				this.offset = 0;
				this.getOrderList(this.status[this.tabCurrent]);
			}
		},
		tabClick(item, index) {
			console.log(item)
			this.orderStatus = item.value
			this.tabCurrent = index
			this.orderList = [];
			this.offset = 0;
			this.getOrderList(this.status[this.tabCurrent]);
		},
		doSearch(searchQuery) {
			console.log('searchQuery', searchQuery);
		},
		handleSearchClick() {
			console.log('input click');
		},
		handleOrder(item) {
			console.log(item);
			console.log(JSON.stringify(item))
			// #ifdef MP-WEIXIN
			if (!this.openid) {
				uni.navigateTo({
					url: '/pages/login/login'
				})
				return
			}
			// #endif
			if (item.orderStatus === 5) {
				uni.navigateTo({
					url: `/pages_ani/mine/refundDetail/refundDetail?orderAftersaleId=${item.afterSaleId}`
				});
			} else {
				// console.log('详情: ', item.id)
				uni.navigateTo({
					url: `/pages_ani/mine/orderDetail/orderDetail?courseId=${item.id}`
				});
			}
			
		},
		handleButton (item, pay = '', type) {
			console.log(item, pay, type)
			console.log(JSON.stringify(item))
			// #ifdef MP-WEIXIN
			if (!this.openid) {
				uni.navigateTo({
					url: '/pages/login/login'
				})
				return
			}
			// #endif
			
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
				gradeName: item.gradeName,
				businessId: item.orderItems[0].businessId,
				schoolId: item.schoolId,
				gradeId: item.gradeId
			}
			const selectCourse = {
				payIndex: item.payMethod,
				subject: {
					subjectName: item.subjectName,
					subjectId: item.subjectId
					// price: item.payAmount,
					// allPrice: item.payAmount
				}
			}
			const orderInfo = {
				orderId: item.id,
				id: item.orderItems[0].id,
				orderNo: item.orderNo,
				orderStatus: item.orderStatus
			}
			if (type === 'payEntry') { // 支付报名费
				selectCourse.subject.price = item.orderItems[0].price
			}
			
			if (type === 'payFinal') { // 支付尾款
				selectCourse.subject.price = item.finalPayment
			}
			
			if (type === 'payAll') { // 支付全款
				selectCourse.subject.allPrice = item.orderItems[0].allPrice
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
					url: `/pages/courseDetail/orderConfirm/orderConfirm?form=${JSON.stringify(form)}&detail=${JSON.stringify(detail)}&selectCourse=${JSON.stringify(selectCourse)}&orderInfo=${JSON.stringify(orderInfo)}`
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
						this.offset = 0
						this.orderList = []
						setTimeout(() => {
							this.getOrderList(this.status[this.tabCurrent]);
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
		getOrderList(orderStatus = this.orderStatus) {
			this.isLoading = true;
			this.$util.showLoading();
			const params = {
				buyerId: this.userInfo.id,
				orderStatusList: orderStatus,
				offset: this.offset,
				limit: this.limit
			};

			this.$http
				.post('stuh5/order/orderList', this.$util.trimForm(params))
				.then(res => {
					if (res.code === 200) {
						const data = res.data.rows
						// .map(v => {
						// 	v.orderItems[0].serveMsg.split(',').map(label => {
						// 		const option = this.optionList.filter(v => label == v.optionKey)[0].optionValue
						// 	})
						// 	return v
						// });
						if (data.length === 0) {
							this.isLoading = false;
						} else {
							this.orderList = this.orderList.concat(data);
							this.isLoading = false;
						}
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
		}
	},
	onReachBottom() {
		this.offset += 10;
		this.getOrderList(this.status[this.tabCurrent]);
	}
};
</script>

<style lang="scss" scoped>
.collection-list {
	padding: 20rpx;
}
.subscribe {
	.tab {
		background-color: #fff;
	}
}
</style>
