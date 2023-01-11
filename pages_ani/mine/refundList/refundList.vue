<template>
	<view class="global-wrap refund-list">
		<!-- <view class="search mt-20"><u-search :show-action="false" actionText="" placeholder="会计"></u-search></view> -->
		<view class="tabs"><lx-tabs :tabs="tabs" @tab-click="tabClick"></lx-tabs></view>
		<view class="redund-wrap">
			<template>
				<graphic-list showType="refund" :list="refundList" @click-item="handleItem"></graphic-list>
			</template>
		</view>
		<lx-loading :isLoading="isLoading"></lx-loading>
	</view>
</template>

<script>
import { mapGetters } from 'vuex';
import graphicList from '@/pages_ani/components/busi/graphicList.vue';
import lxLoading from '@/components/busi/lxLoading.vue';
import lxTabs from '@/components/busi/lxTabs.vue';
export default {
	components: { graphicList, lxLoading, lxTabs },
	data() {
		return {
			isLoading: false,
			offset: 0,
			limit: 10,
			afterSaleOrderStatusList: 'yes',
			ifAftering: 'yes',
			currentTab: { name: '全部', value: 'yes' },
			refundList: [],
			tabs: [{ name: '全部', value: 'yes' }, { name: '售后中', value: [1] }, { name: '退款中', value: [2] }, { name: '售后结束', value: [3,6] }]
		};
	},
	computed: {
		...mapGetters(['userInfo'])
	},
	onLoad() {
	},
	onShow() {
		this.refundList = [];
		this.offset = 0;
		this.getRefundList(this.afterSaleOrderStatusList, this.currentTab);
	},
	onBackPress(e) {
		console.log('返回：', e)
	},
	methods: {
		tabClick(item, index) {
			this.afterSaleOrderStatusList = item.value
			this.currentTab = item
			this.refundList = [];
			this.offset = 0;
			this.getRefundList(this.afterSaleOrderStatusList, item);
		},
		handleItem (item) {
			uni.navigateTo({
				url: `/pages_ani/mine/refundDetail/refundDetail?orderAftersaleId=${item.afterSaleId}`
			})
		},
		getRefundList(afterSaleOrderStatusList = null, tab = {}) {
			// console.log(afterSaleOrderStatusList, 'tab: ', tab)
			this.isLoading = true;
			this.$util.showLoading();
			const params = {
				buyerId: this.userInfo.id,
				afterSaleOrderStatusList,
				offset: this.offset,
				limit: this.limit,
				ifAftering: this.ifAftering,
			};
			if (tab.name === '全部') {
				params.ifAll = 'yes'
				delete params.afterSaleOrderStatusList
			}
			
			if (tab.name == '售后中') {
				params.ifAftering = 'yes'
			} else {
				delete params.ifAftering
			}
			
			this.$http
				.post('stuh5/order/orderAfterSaleList', this.$util.trimForm(params))
				.then(res => {
					if (res.code === 200) {
						console.log('售后列表：', res)
						const data = res.data.rows
						// .map(v => {
						// 	v.orderItems[0].labels = v.orderItems[0].serveMsg.split(',');
						// 	return v;
						// });
						if (data.length === 0) {
							this.isLoading = false;
						} else {
							this.refundList = this.refundList.concat(data);
							this.isLoading = false;
						}
						console.log('列表：', data)
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
	}
};
</script>

<style lang="scss">
.refund-list {
	.search {
		height: 96rpx;
		line-height: 96rpx;
		background-color: #fff;
		padding: 0 80rpx;
	}
	.tabs {
		padding: 20rpx 0 20rpx 30rpx;
		background-color: #fff;
	}
}
.redund-wrap {
	padding: 20rpx;
}
</style>
