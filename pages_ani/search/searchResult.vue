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
		<filterDropdown v-if="searchQuery.selectIndex == 2" :filterData="filterDataCourse" :defaultSelected="defaultSelectedCourse" :updateMenuName="true" @confirm="confirm" dataFormat="Object" @click-menu="handleClickMenuCourse" />
		<filterDropdown v-else :filterData="filterDataMech" :defaultSelected="defaultSelectedMech" :updateMenuName="true" @confirm="confirm" dataFormat="Object" @click-menu="handleClickMenuMech" />
		<view class="content mt-180">
			<template v-if="searchQuery.selectIndex == 2">
				<course-list :list="courseList" @click-item="handleCourseClick"></course-list>
			</template>
			<template v-else>
				<view class="recommend_institution">
					<view class="item" v-for="item in institutionList" @tap="handleMerchantClick(item)">
						<view class="info">
							<view class="img-wrap">
								<image :src="ossUrl + item.shopLogo" mode=""></image>
								<view class="number" v-if="item.alesign">
									<text>已报名{{ item.alesign }}</text>
								</view>
							</view>
							<view>
								<view class="fz-28 fw-500 u-line-1 w-430">{{ item.managementName }}</view>
								<view class="tag">
									<view class="mr-10 mb-10" v-for="(label,index) in item.mechCatList" v-if="index < 3">
										<u-tag color="#CB242B" borderColor="#CB242B" size="mini" :text="label.catFourName ? label.catFourName : (label.catThreeName ? label.catThreeName : (label.catTwoName ? label.catTwoName : label.catOneName))" plain shape="circle"></u-tag>
									</view>
								</view>
								<view class="color-999 pt-20 location">
									<text class="iconfont icon-weizhi"></text>
									<text class="u-line-1 w-320">{{ item.address }}</text>
									<text></text>
								</view>
							</view>
						</view>
						<view class="subject">
							<view class="row" v-for="course in item.courseList">
								<view class="sub_title">¥{{ course.money / 100  }}<view style="font-size: 20rpx;display: inline-block;" v-if="course.type === 1">起</view></view>
								<view class="course">
									<text>课</text>
									<text class="inline-block u-line-1 w-320" style="font-size: 14px;">{{ course.courName }}</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</template>
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
			selectList: [[
				{
					id: 2,
					label: '课程'
				},
				{
					id: 1,
					label: '机构'
				}
			]],
			selectValue: {},
			isLoading: false,
			defaultSelectedCourse: [[0,0],[0]],
			defaultSelectedMech: [[0,0],[0]],
			selected: [
				[],
				[]
			],
			filterDataCourse: [],
			filterDataMech: [],
			offset: 0,
			limit: 10,
			total: 0,
			courseList: [],
			institutionList: [],
			wfList: [],
			categoryListAllAddItem: [],
			cityDataAddItem: [],
			tabId: '',
			postParams:{},
			windowHeight: 600,
			topShow: false,
		};
	},
	computed: {
		getVuex(){
			// #ifdef H5
			return JSON.parse(localStorage.getItem('vuex')).home
			// #endif
			// #ifdef MP-WEIXIN
			console.log(JSON.parse(uni.getStorageSync('vuex')))
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
		console.log('options: ', options)
		const { keyword, selectIndex, tabId } = options;
		this.searchQuery = {
			keyword: keyword,
			selectIndex: selectIndex
		}
		this.tabId = tabId
		this.categoryListAllAddItem = this.addItem(this.getVuex.categoryListAll, '不限')
		this.filterDataMech = this.getVuex.mechCategoryList;
		this.filterDataMech[0].submenu = this.categoryListAllAddItem;
		this.filterDataMech[1].submenu = [{name: '全部',value:null}].concat(this.getVuex.cityData);
		this.addItem(this.getVuex.cityData, '不限')
		this.filterDataCourse = this.getVuex.courseCategoryList;
		this.filterDataCourse[0].submenu = this.categoryListAllAddItem;
		this.selectValue = this.selectList[0].find(v => v.id == this.searchQuery.selectIndex)
		this.defaultSelectedCourse = this.tabId ? [[this.categoryListAllAddItem.findIndex(v => { return v.value == this.tabId }),0],[0]] : [[0,0],[0]]
		this.defaultSelectedMech = [[0,0],[0]]
	},
	onReady() {
	},
	methods: {
		...mapActions({
			async getCondition(commit) {
				await commit('SET_CATEGORY')
				await commit('SET_STU')
				await commit('SET_CITY')
				await commit('SET_GRADE')
			}
		}),
		toTop(){
			uni.pageScrollTo({
				scrollTop: 0,
				duration: 100
			});
		},
		cancel () {
			uni.switchTab({
				url: '../home/home'
			})
		},
		getData () {
			console.log('获取数据：', this.searchQuery)
			if (this.searchQuery.selectIndex == 2) {
				this.getCourseList();
			} else {
				this.getInstitutionList();
			}
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
			// if (data.flag === 'categoryList') {
			// 	this.filterDataCourse[index].submenu = this.categoryListAllAddItem;
			// }
		},
		handleClickMenuMech(data, index) {
			// if (data.flag === 'categoryList') {
			// 	this.filterDataMech[index].submenu = this.categoryListAllAddItem;
			// }
			// if (data.flag === 'city') {
			// 	this.filterDataMech[index].submenu = this.cityData;
			// }
		},
		changeSelect(searchQuery) {
			console.log('searchQuery: ', searchQuery, this.selectList)
			this.institutionList = []
			this.courseList = []
			this.offset = 0
			this.limit = 10
			this.total = 0
			this.selectValue = this.selectList[0].find(v => v.id == searchQuery.id)
			this.searchQuery.selectIndex = searchQuery.id
			console.log('selectValue: ', this.selectValue)
			console.log('searchQuery: ', this.searchQuery)
			// #ifdef MP-WEIXIN
			// this.selectValue = searchQuery
			// this.selectValue.selectIndex = searchQuery.id === 2 ? 2 : 1
			// this.doSearch(searchQuery)
			// #endif
		},
		getCourseList() {
			this.$util.showLoading();
			this.isLoading = true;
			const params = {
				courName: this.searchQuery.keyword,
				category1: this.selected[0][0],
				category2: this.selected[0][1],
				category3: this.selected[0][2],
				offset: this.offset,
				limit: this.limit,
				sortCondition: this.selected[1][0]
			};
			if(JSON.stringify(params)==JSON.stringify(this.postParams)){
				return;
			}
			this.$http
				.post('stuh5/course/list', params)
				.then(res => {
					this.postParams = {}
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
					this.postParams = {}
					console.log(err);
					this.isLoading = false;
					this.$util.hideLoading();
				});
		},
		getInstitutionList() {
			this.$util.showLoading();
			this.isLoading = true
			const params = {
				managementName: this.searchQuery.keyword,
				offset: this.offset,
				limit: this.limit,
				short: 1,
				city: this.selected[1][1],
				category1: this.selected[0][0],
				category2: this.selected[0][1],
				category3: this.selected[0][2]
			};
			if (!this.selected[1][1]) {
				params.province = this.selected[1][0]
			}
			if(JSON.stringify(params)==JSON.stringify(this.postParams)){
				return;
			}
			this.$http
				.post('stuh5/shop/shopList', params)
				.then(res => {
					this.postParams = {}
					if (res.code === 200) {
						const data = res.data.rows;
						if (data.length === 0) {
							console.log('没有数据了');
						} else {
							this.institutionList = this.institutionList.concat(data)
							this.total = res.data.total
						}
						this.isLoading = false
						this.$util.hideLoading();
					} else {
						this.isLoading = false
						this.$util.hideLoading();
					}
				})
				.catch(err => {
					console.log(err);
					this.isLoading = false
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
			// console.log('searchQuery: ', searchQuery)
			this.selectValue = this.selectList[0].find(v => v.id == searchQuery.selectIndex)
			this.searchQuery = searchQuery
			this.institutionList = []
			this.courseList = []
			this.offset = 0
			this.limit = 10
			this.total = 0
		    this.getData();
		},
		//接收菜单结果
		confirm(e) {
			this.selected = e.value
			console.log('confirm: ', this.selected)
			this.institutionList = []
			this.courseList = []
			this.offset = 0
			this.limit = 10
			this.total = 0
			this.getData()
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
			if (this.searchQuery.selectIndex == 2) {
				if(this.courseList.length < this.total){
					this.offset += 10;
					this.getData();
				}
			} else {
				if(this.institutionList.length < this.total){
					this.offset += 10;
					this.getData()
				}
			}
		}
	}
};
</script>

<style lang="scss" scoped>
page {
	background-color: #f7f7f7;
	.content {
		padding: 20rpx;
	}
	.recommend_institution {
		.item {
			padding: 20px 10px 0px 10px;
			background-color: #fff;
			margin-bottom: 16rpx;
			border-radius: 16rpx;
			image {
				width: 180rpx;
				height: 180rpx;
			}
			.info {
				padding-bottom: 16rpx;
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
