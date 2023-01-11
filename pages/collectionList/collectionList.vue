<template>
	<view class="collection">
		<u-search v-model="qrCodeTile" :showAction="true" actionText="搜索" :animation="true" @search="search" @custom="search"></u-search>
		<view class="dropdown">
			<ren-dropdown-filter :filterData="filterData" :defaultIndex="defaultIndex" @ed="ed" @onSelected="onSelected"></ren-dropdown-filter>
		</view>
		<view class="entry-set-list flex flex-between flex-center" v-for="item in entrySetList" @click="toDetail(item)">
			<div>{{ item.qrCodeTile }}_{{ item.amount }}元</div>
			<div>></div>
		</view>
	</view>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import RenDropdownFilter from '@/components/ren-dropdown-filter/ren-dropdown-filter.vue';
export default {
	components: {
		RenDropdownFilter
	},
	data() {
		return {
			filterData: [
				[{ text: '全日制', value: 1 }, { text: '业余学历', value: 2 }],
				[{ text: '所有类型', value: '' }]
			],
			defaultIndex: [0, 0],
			entrySetList: [],
			entryAccountList: [],
			business: '',
			qrCodeTile: ''
		};
	},
	computed: {
		...mapGetters(['userInfo'])
	},
	async mounted() {
		await this.getRightInfo();
		// await this.getList()
		await this.getEntryAccountTree();
		await this.getEntrySetList(1);
		// if (this.userInfo.businessId == 2) {
		// 	await this.getEntrySetList(2);
		// 	// this.defaultIndex = [1, 0]
		// 	this.$set(this, 'defaultIndex', [1, 0])
		// 	console.log('userinfo == 2: ', this.defaultIndex)
		// } else {
		// 	await this.getEntrySetList(1);
		// 	this.defaultIndex = [0, 0]
		// }
	},
	methods: {
		ed(res) {
			console.log(res);
			// this.getEntrySetList(res[0][0].value)
		},
		onSelected(data, index) {
			console.log('onSelected:', data, index)
			this.getEntrySetList(data[0][0].value, data[1][0].id, '')
		},
		dateChange(d) {
			uni.showToast({
				icon: 'none',
				title: d
			});
		},
		getList() {
			// this.$util.showLoading();
			// const params = {
			// 	pageNum: 1,
			// 	pageSzie: 10
			// };
			// fcs/login/getRightInfo
			// fcs/school/list
			// .post('fcs/entry/account/tree', params)
			this.$http
				.post('fcs/school/list', {})
				.then(res => {
					// this.courseList = res.rows;
					// this.$util.hideLoading();
					// if (res.code === 1) {
					// 	console.log('school_list123: ', res.rows)
					// 	// const data = res.data;
					// 	this.courseList = res.rows
					// } else {
					// 	this.$util.showToast(res.msg);
					// }
				})
				.catch(err => {
					console.log(err);
				});
		},
		search (value) {
			this.getEntrySetList(1, '', value)
		},
		getEntrySetList(business, entryAccountId, qrCodeTile) {
			console.log(business, entryAccountId, qrCodeTile);
			this.$util.showLoading();
			const params = {
				business,
				entryAccountId,
				currentPage: 1,
				pageSize: 100
			};
			const params1 = {
				business,
				qrCodeTile: this.qrCodeTile ? this.qrCodeTile : qrCodeTile,
				currentPage: 1,
				pageSize: 100
			};
			const params2 = {
				business,
				entryAccountId,
				qrCodeTile: this.qrCodeTile ? this.qrCodeTile : qrCodeTile,
				currentPage: 1,
				pageSize: 100
			};
			// if (business == 1) {
			// 	delete params.entryAccountId
			// }
			this.$http
				.post('fcs/entry/set/list', entryAccountId == '' ? params1 : params2)
				.then(res => {
					if (res.code === 10000) {
						this.entrySetList = res.object.list.map(v => {
							v.amount = v.amount / 100
							return v
						})
					} else {
						this.$util.showToast(res.message);
					}
					this.$util.hideLoading();
				})
				.catch(err => {
					console.log(err);
					this.$util.hideLoading();
				});
		},
		getEntryAccountTree() {
			this.$http
				.post('fcs/entry/account/tree', {})
				.then(res => {
					if (res.code === 10000) {
						const filterData = res.object.list
							.map(v => {
								v.text = v.name
								if (v.id != 0) {
									return v;
								}
							}).filter(Boolean);
						this.filterData[1].push(...filterData)
					} else {
						this.$util.showToast(res.message);
					}
				})
				.catch(err => {
					console.log(err);
				});
		},
		getRightInfo() {
			this.$http
				.post('fcs/login/getRightInfo', {})
				.then(res => {})
				.catch(err => {
					console.log(err);
				});
		},
		toDetail(item) {
			uni.navigateTo({
				url: `./collectionDetail/collectionDetail?data=${JSON.stringify(item)}`
			});
		}
	}
};
</script>

<style lang="less">
.collection {
	padding: 10px;
	view {
		// margin: 10px;
	}
	.dropdown {
		// margin-bottom: 10px;
	}
	.entry-set-list {
		height: 30px;
		line-height: 30px;
		border-bottom: 1rpx solid #ccc;
		padding: 10px 0;
	}
}
</style>
