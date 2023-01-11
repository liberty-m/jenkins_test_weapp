<template>
	<view class="global-wrap">
		<!-- <filterDropdown :menuTop="88" :filterData="filterData" :defaultSelected="defaultSelected"
			:updateMenuName="true" @confirm="confirm" dataFormat="Object" /> -->
		<view class="collection-list pt-20">
			<graphic-list showType="collection" :list="list" @click-item="handleCourse"></graphic-list>
			</view>
		<lx-loading :isLoading="isLoading"></lx-loading>
	</view>
</template>

<script>
// import filterDropdown from '@/components/filterDropdown/filterDropdown.vue';
import lxLoading from '@/components/busi/lxLoading.vue';
import graphicList from '@/pages_ani/components/busi/graphicList.vue';
import filterData from '@/utils/filterData.js'; //筛选菜单数据
export default {
	components: {
		lxLoading,
		graphicList
	},
	data() {
		return {
			indexArr: '',
			valueArr: '',
			defaultSelected: [[0, 0], [0, 0], [0]],
			filterData: [],
			list: [],
			page: {
				pageIndex: 1,
				pageSize: 5
			}
		};
	},
	onReady() {
		this.filterData = filterData;
		this.defaultSelected = [[0, 0, 0], [0, 0, 0], [0]];
	},
	onLoad() {
		this.getList();
	},
	methods: {
		handleCourse(item) {
			uni.navigateTo({
				url: `/pages/courseDetail/courseDetail?courseId=${item.courseId}`
			});
		},
		//接收菜单结果
		confirm(e) {
			this.indexArr = e.index;
			this.valueArr = e.value;
		},
		getList(type = null) {
			this.$util.showLoading();
			// const data = {
			// 	topicType: type,
			// 	...this.page
			// }
			// if (!type) delete data.topicType
			this.$http
				.post('stuh5/courseColl/list', {})
				.then(res => {
					if (res.code === 200) {
						const data = res.data.rows;
						if (data.length === 0) {
							console.log('没有数据了');
						} else {
							this.list = res.data.rows;
						}
						this.$util.hideLoading();
					} else {
						uni.showToast({
							icon: 'none',
							title: res.msg
						});
						this.$util.hideLoading();
					}
				})
				.catch(err => {
					console.log(err);
					this.$utils.hideLoading();
				});
		}
	},
	onReachBottom() {
		this.page.pageIndex++;
		this.getList(this.tabType);
		console.log('触底');
	}
};
</script>

<style lang="scss" scoped>
.collection-list {
	padding: 20rpx;
}
</style>
