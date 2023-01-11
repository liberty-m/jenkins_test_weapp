<template>
	<view class="global-wrap subscribe">
		<view class="tab"><u-tabs :list="tabList" @change="tabChange" lineColor="#CB242B"></u-tabs></view>
		<view class="collection-list pt-20" v-if="type === 1"><graphic-list :isHistory="true" showType="collection" track :list="courseList" @click-item="handleCourse"></graphic-list></view>
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
	import { getMyTracks } from '@/common/function/myTracks.js'
	
	export default {
		components: {
			filterDropdown,
			graphicList,
			lxLoading
		},
		data() {
			return{
				type:1,
				offset: 0,
				limit: 10,
				tabList: [
					{
						name: '课程',
						value: 1
					},
					{
						name: '机构',
						value: 2
					}
				],
				courseList:[],
				institutionList:[]
			}
		},
		onLoad() {
			this.getData();
		},
		methods:{
			getData() {
				if (this.type === 1) {
					this.getCourseList();
				} else {
					this.getInstitutionList();
				}
			},
			getCourseList(){
				this.isLoading = true
				this.$util.showLoading();
				setTimeout(()=>{
					let data =  getMyTracks('course',{});
					this.courseList = this.courseList.concat(data.rows);
					this.total = data.total;
					this.isLoading = false;
					this.$util.hideLoading();
				},200)
			},
			getInstitutionList(){
				this.isLoading = true
				this.$util.showLoading();
				setTimeout(()=>{
					let data =  getMyTracks('mechanism',{});
					this.institutionList = this.institutionList.concat(data.rows);
					this.institutionList.forEach(v => {
						v.lables = v.mechCatList.map(v => v.catThreeName)
					})
					this.total = data.total;
					this.isLoading = false;
					this.$util.hideLoading();
				},200)
			},
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
			handleInstitution(item) {
				uni.navigateTo({
					url: `/pages_ani/institution/institutionDetail/institutionDetail?shopId=${item.id}`
				});
			},
			handleCourse(item) {
				uni.navigateTo({
					url: `/pages/courseDetail/courseDetail?courseId=${item.id}`
				});
			}
		}
	}
</script>

<style lang="scss">
	.collection-list {
		padding: 20rpx;
	}
	.subscribe {
		.tab {
			flex-shrink:0;
			background-color: #fff;
		}
	}
</style>
