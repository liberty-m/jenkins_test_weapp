<template>
	<view class="global-wrap subscribe">
		<view class="tab"><u-tabs :list="tabList" @change="tabChange" lineColor="#CB242B"></u-tabs></view>
		<view class="collection-list pt-20" v-if="type === 1"><graphic-list showType="collection" :list="courseList" @click-item="handleCourse"></graphic-list></view>
		<view class="collection-list pt-20" v-else><graphic-list showType="institution" :list="institutionList" @click-item="handleInstitution"></graphic-list></view>
		<lx-loading :isLoading="isLoading"></lx-loading>
	</view>
</template>

<script>
import { mapGetters } from 'vuex';
import filterDropdown from '@/components/filterDropdown/filterDropdown.vue';
import graphicList from '@/pages_ani/components/busi/graphicList.vue';
import lxLoading from '@/components/busi/lxLoading.vue';
import filterData from '@/utils/filterData.js'; //筛选菜单数据

export default {
	components: {
		filterDropdown,
		graphicList,
		lxLoading
	},
	data() {
		return {
			indexArr: '',
			valueArr: '',
			defaultSelected: [[0, 0], [0, 0], [0]],
			filterData: [],
			courseList: [],
			institutionList: [],
			list: [],
			isLoading: true,
			type: 1,
			offset: 0,
			limit: 4,
			total: 0,
			page: {
				pageIndex: 1,
				pageSize: 5
			},
			tabList: [
				{
					name: '课程',
					value: 1
				},
				{
					name: '机构',
					value: 2
				}
			]
		};
	},
	computed: {
		...mapGetters({
			userInfo: 'userInfo'
		})
	},
	onReady() {
		this.filterData = filterData;
		this.defaultSelected = [[0, 0, 0], [0, 0, 0], [0]];
	},
	onLoad() {
		this.getData();
	},
	methods: {
		tabChange(tab) {
			this.tabCurrent = this.type = tab.value;
			if (this.type === 1) {
				this.courseList = []
			} else {
				this.institutionList = []
			}
			this.offset = 0;
			this.getData();
		},
		getData() {
			if (this.type === 1) {
				this.getCourseList();
			} else {
				this.getInstitutionList();
			}
		},
		handleInstitution(item) {
			uni.navigateTo({
				url: `/pages_ani/institution/institutionDetail/institutionDetail?shopId=${item.shopId}`
			});
		},
		handleCourse(item) {
			uni.navigateTo({
				url: `/pages/courseDetail/courseDetail?courseId=${item.courseId}`
			});
		},
		//接收菜单结果
		confirm(e) {
			console.log(e);
			console.log(e.index);
			this.indexArr = e.index;
			this.valueArr = e.value;
		},
		// 获取机构列表
		getInstitutionList() {
			this.isLoading = true
			this.$util.showLoading();
			const params = {
				userId: this.userInfo.id,
				offset: this.offset,
				limit: this.limit
			};
			this.$http
				.post('stuh5/appointment/mech/list', params)
				.then(res => {
					if (res.code === 200) {
						const data = res.data.rows.map(v => {
							v.lables = v.lable && v.lable.split('/')
							return v
						});
						if (data.length === 0) {
						} else {
							this.institutionList = this.institutionList.concat(data);
							this.total = res.data.total
						}
						this.isLoading = false
						this.$util.hideLoading();
					} else {
						this.isLoading = false
						this.$util.showToast(res.msg);
						this.$util.hideLoading();
					}
				})
				.catch(err => {
					console.log(err);
					this.$utils.hideLoading();
				});
		},
		// 获取课程列表
		getCourseList() {
			this.isLoading = true
			this.$util.showLoading();
			const params = {
				userId: this.userInfo.id,
				offset: this.offset,
				limit: this.limit
			};
			this.$http
				.post('stuh5/appointment/course/list', params)
				.then(res => {
					if (res.code === 200) {
						const data = res.data.rows;
						if (data.length === 0) {
						} else {
							this.courseList = this.courseList.concat(data);
							this.total = res.data.total
						}
						this.isLoading = false
						this.$util.hideLoading();
					} else {
						this.isLoading = false
						this.$util.showToast(res.msg);
						this.$util.hideLoading();
					}
				})
				.catch(err => {
					this.$utils.hideLoading();
				});
		}
	},
	onReachBottom() {
		if (this.type === 1) {
			if(this.courseList.length < this.total){
				this.offset += 4;
				this.getData()
			}
		} else {
			if(this.institutionList.length < this.total){
				this.offset += 4;
				this.getData()
			}
		}
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
