<template>
	<view>
		<view style="position: sticky;z-index: 999999;right: 0;width: 100%;">
			<hs-search 
				:selectList="selectList"
				placeholder="福州成人高考(函授)计算机"
				@tab-input="handleSearchClick"
				@select="searchSelect"
				@changeSelect="changeSelect"
				:selectValue="selectValue"
				button="inside"
				@search="doSearch"
				@confirm="doSearch"
				@cancel="cancel"
				:showMask="false"
				v-model="searchQuery.keyword" />
		</view>
		<filterDropdown :filterData="filterDataCourse" :defaultSelected="defaultSelectedCourse" :updateMenuName="true" @confirm="confirm" dataFormat="Object" @click-menu="handleClickMenuCourse" />
		<view class="content mt-180">
			<course-list :list="courseList" @click-item="handleCourseClick"></course-list>
		</view>
		<!-- #ifdef H5 -->
		<view v-if="topShow" class="to-top" @tap="toTop">TOP</view>
		<!-- #endif -->
		<!-- #ifdef MP-WEIXIN -->
		<view v-if="topShow" class="to-top-wx" @tap="toTop">TOP</view>
		<!-- #endif -->
		<lx-loading :isLoading="isLoading"></lx-loading>
	</view>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import CourseList from '@/components/busi/courseList.vue';
import filterDropdown from '@/components/filterDropdown/filterDropdown.vue';
import hsSearch from '@/components/search/allSearch.vue'
import lxLoading from '@/components/busi/lxLoading.vue';
import { ossUrl } from '@/utils/util.js';
export default {
	components: { CourseList, filterDropdown, hsSearch, lxLoading },
	data() {
		return {
			ossUrl,
			searchQuery: {},
			windowHeight: 600,
			topShow: false,
			selectList: [[
				{
					id: 2,
					label: '课程'
				},
				{
					id: 1,
					label: '专业'
				},
				
			]],
			selectValue: {
				id: 2,
				label: '课程'
			},
			isLoading: false,
			defaultSelectedCourse: [
				[],
				[],
				[]
			],
			selected: [
				[],
				[],
				[]
			],
			filterDataCourse: [],
			offset: 0,
			limit: 10,
			total: 0,
			courseList: [],
			institutionList: [],
			wfList: [],
			stuListAddItem: []
		};
	},
	computed: {
		getVuex(){
			// #ifdef H5
			return JSON.parse(localStorage.getItem('vuex')).home
			// #endif
			// #ifdef MP-WEIXIN
			return JSON.parse(uni.getStorageSync('vuex')).home
			// #endif
		}
	},
	async onLoad(options) {
		const that = this
		uni.getSystemInfo({
			success: function (res){
				that.swiperHeight = res.windowWidth /16*9
				that.windowHeight = res.windowHeight
			}
		});
		await this.getCondition()
		const { keyword, selectIndex } = options;
		this.searchQuery = {
			keyword: keyword,
			selectIndex: selectIndex
		}
		// this.stuListAddItem = this.addItem(JSON.parse(JSON.stringify(this.getVuex.stuList)), '不限')
		this.stuListAddItem = this.addItem(this.getVuex.stuList, '不限')
		this.filterDataCourse = this.getVuex.educationCategoryList;
		this.filterDataCourse[0].submenu = this.stuListAddItem;
		this.filterDataCourse[1].submenu = [{name: '全部',value:null}].concat(this.getVuex.dicMap.subjectDegree);
		this.filterDataCourse[2].submenu = [{name: '全部',value:null}].concat(this.getVuex.dicMap.subjectLen);
		this.getCourseList();
	},
	// watch: {
	// 	stuList: {
	// 		handler(newVal){
	// 			console.log('stuList: ', newVal)
	// 			console.log('this.stuList: ', this.stuList)
	// 			this.stuList = newVal
	// 		},
	// 		immediate:true
	// 	}
	// },
	onReady() {
	},
	methods: {
		...mapActions({
			async getCondition(commit) {
				await commit('SET_CATEGORY')
				await commit('SET_STU')
				await commit('SET_CITY')
				await commit('SET_GRADE')
				await commit('SET_CONSTANT', { fieldName: 'subjectDegree' })
				await commit('SET_CONSTANT', { fieldName: 'subjectLen' })
			}
		}),
		toTop(){
			uni.pageScrollTo({
				scrollTop: 0,
				duration: 100
			});
		},
		addItem(arr, name) {
			let newArr = [{name: name,value:null}].concat(arr)
			return newArr.map(item => {
				if (item.submenu) {
					item.submenu = this.addItem(item.submenu, name)
				}
				return item
			})
		},
		handleClickMenuCourse(data, index) {
			// for (const key in this.filterDataCourse) {
			// 	if (this.filterDataCourse[key].flag === data.flag) {
			// 		this.filterDataCourse[index].submenu = [{name: '全部',value:null}].concat(this.dicMap[data.flag]);
			// 	}
			// }
			// if (data.flag === 'stuList') {
			// 	this.filterDataCourse[index].submenu = this.stuListAddItem;
			// }
		},
		cancel () {
			this.defaultSelectedCourse = [
				[],
				[],
				[]
			],
			this.selected = [
				[],
				[],
				[]
			],
			this.institutionList = []
			this.courseList = []
			this.offset = 0
			this.limit = 10
			this.total = 0
			this.searchQuery.keyword = ''
			this.getCourseList()
		},
		changeSelect(searchQuery) {
			this.selectValue = this.selectList[0].find(v => v.id == searchQuery.id)
			this.searchQuery.selectIndex = searchQuery.id
			this.institutionList = []
			this.courseList = []
			this.offset = 0
			this.limit = 10
			this.total = 0
			// #ifdef MP-WEIXIN
			// this.selectValue = searchQuery
			// this.selectValue.selectIndex = searchQuery.id === 2 ? 2 : 1
			// #endif
		    this.getCourseList();
		},
		getCourseList() {
			this.$util.showLoading();
			this.isLoading = true;
			let params = {}
			if(this.searchQuery.selectIndex == 1) {
				params = {
					subjectName: this.searchQuery.keyword,
					// category1: 1,
					category2: this.selected[0][0],
					category3: this.selected[0][1],
					subjectDegree: this.selected[1][0],
					subjectLen: this.selected[2][0],
					offset: this.offset,
					limit: this.limit,
					sortCondition: 1
				}
			}else{
				params = {
					courName: this.searchQuery.keyword,
					// category1: 1,
					category2: this.selected[0][0],
					category3: this.selected[0][1],
					subjectDegree: this.selected[1][0],
					subjectLen: this.selected[2][0],
					offset: this.offset,
					limit: this.limit,
					sortCondition: 1
				}
			}
			this.$http
				.post('stuh5/course/typeCourse', params)
				.then(res => {
					if (res.code === 200) {
						const data = res.data.rows;
						if (data.length === 0) {
						} else {
							this.courseList = this.courseList.concat(data);
							this.total = res.data.total
						}
						this.isLoading = false;
						this.$util.hideLoading();
					} else {
						this.$util.showToast(res.msg);
						this.isLoading = false;
						this.$util.hideLoading();
					}
				})
				.catch(err => {
					console.log(err);
					this.isLoading = false;
					this.$util.hideLoading();
				});
		},
		handleSearchClick() {
			console.log('input click');
			uni.navigateTo({
				url: '/pages_ani/search/search'
			});
		},
		searchSelect(data, index) {
			console.log(data, index);
		},
		doSearch(searchQuery) {
			this.selectValue = this.selectList[0].find(v => v.id == searchQuery.selectIndex)
			this.searchQuery = searchQuery
			this.institutionList = []
			this.courseList = []
			this.offset = 0
			this.limit = 10
			this.total = 0
		    this.getCourseList();
		},
		//接收菜单结果
		confirm(e) {
			this.selected = e.value
			this.institutionList = []
			this.courseList = []
			this.offset = 0
			this.limit = 10
			this.total = 0
			this.getCourseList()
		},
		handleCourseClick(item) {
			uni.navigateTo({
				url: `/pages/courseDetail/courseDetail?courseId=${item.id}`
			});
		},
		handleMerchantClick(merchant) {
			uni.navigateTo({
				url: `/pages_ani/institution/institutionDetail/institutionDetail?shopId=${merchant.id}`
			});
		},
		onPageScroll: function(Object) {
			if (this.windowHeight < Object.scrollTop) {
				this.topShow = true;
			} else {
				this.topShow = false;
			}
		},
		onReachBottom() {
			if(this.courseList.length < this.total){
				this.offset += 10;
				this.getCourseList();
			}
		}
	}
};
</script>

<style lang="scss" scoped>
page {
	background-color: #fff;
	.content {
		padding: 20rpx;
	}
	.recommend_institution {
		.item {
			padding: 20px 10px 0px 10px;
			image {
				width: 180rpx;
				height: 180rpx;
			}
			.info {
				.img-wrap {
					image{
						border-radius: 10rpx;
					}
					width: 208rpx;
					height: 180rpx;
					position: relative;
					.number {
						position: absolute;
						left: 0;
						bottom: 0;
						width: 180rpx;
						height: 40rpx;
						line-height: 40rpx;
						text-align: center;
						color: #fff;
						border-bottom-left-radius: 10rpx;
						border-bottom-right-radius: 10rpx;
						background-color: rgba($color: #333, $alpha: 0.5);
					}
				}
				display: flex;
				.tag {
					display: flex;
					margin: 10rpx 0;
					.u-tag {
						margin-right: 10px;
					}
				}
				.location {
					display: flex;
					align-items: center;
					text:first-child {
						color: #333;
					}
					text:nth-child(2) {
						margin-right: auto;
						margin-left: 10rpx;
					}
				}
			}
	
			.subject {
				.row {
					display: flex;
					border-bottom: 1rpx dashed #e2e2e2;
					padding: 10px 0;
					.sub_title {
						width: 208rpx;
						color: $color-red;
						font-size: 32rpx;
						font-weight: bold;
					}
					.course {
						display: flex;
						align-items: center;
						// border-bottom-left-radius: 10rpx;
						// border-bottom-right-radius: 10rpx;
						// background-color: red;
						.wf-wrap {
							background-color: red;
						}
					}
					.course text:first-child {
						background-color: rgba($color: $color-red, $alpha: 0.2);
						color: $color-red;
						padding: 2rpx 4rpx;
						margin-right: 8px;
					}
				}
				.row:last-child {
					border: none;
				}
			}
		}
	}
}
</style>
