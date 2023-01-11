<template>
	<view>
		<view class="header pt-20">
			<view class="logo"><image src="../../static/images/home/logo.png" mode=""></image></view>
			<!-- <view class="selected">
				<text class="iconfont icon-xiajiantou pr-10"></text>
				<text class="color-red">福州</text>
			</view> -->
			<view class="search-message">
				<!-- <text class="iconfont icon-sousuo fz-42" @tap="toPage('allSearch')"></text> -->
				<!-- <text class="iconfont icon-xiaoxi fz-44"></text> -->
				<!-- <view class="number"><u-badge type="error" max="10" :value="messageNumber"></u-badge></view> -->
			</view>
		</view>
		<view>
			<view class="pd-20">
				<u-swiper :list="swiperList" height="194" @change="e => (current = e.current)" :autoplay="true">
					<view slot="indicator" class="indicator">
						<view class="indicator__dot" v-for="(item, index) in swiperList" :key="index" :class="[index === current && 'indicator__dot--active']"></view>
					</view>
				</u-swiper>
				<view class="nav-list mt-30">
					<u-scroll-list indicatorActiveColor="#CB242B">
						<view class="scroll-list" style="flex-direction: row;">
							<view
								class="scroll-list__goods-item"
								v-for="(item, index) in navList"
								:key="index"
								:class="[index === 9 && 'scroll-list__goods-item--no-margin-right']"
								@tap="toPageIndica(item.url)"
							>
								<image class="scroll-list__goods-item__image" :src="item.thumb"></image>
								<text class="scroll-list__goods-item__text">{{ item.name }}</text>
							</view>
						</view>
					</u-scroll-list>
				</view>
			</view>
			<view class="recommend">
				<view class="fw-500 fz-34 ml-30">热门院校</view>
				<view class="wrap">
					<course-list :list="courseList"></course-list>
					<!-- <template v-if="currentRecommendIndex === 0">
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
											<view class="mr-10 mb-10" v-for="(label, index) in item.mechCatList" v-if="index < 3">
												<u-tag
													color="#CB242B"
													borderColor="#CB242B"
													size="mini"
													:text="
														label.catFourName
															? label.catFourName
															: label.catThreeName
															? label.catThreeName
															: label.catTwoName
															? label.catTwoName
															: label.catOneName
													"
													plain
													shape="circle"
												></u-tag>
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
									<view class="row" v-for="course in item.courseList" @tap.stop="handleCourseClick(course)">
										<view class="sub_title">
											¥{{ course.money / 100 }}
											<view style="font-size: 20rpx;display: inline-block;" v-if="course.type === 1">起</view>
										</view>
										<view class="course">
											<text>课</text>
											<text class="inline-block u-line-1 w-320" style="font-size: 14px;">{{ course.courName }}</text>
										</view>
									</view>
								</view>
							</view>
						</view>
					</template> -->
				</view>
			</view>
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
import { mapGetters } from 'vuex';
import { ossUrl } from '@/utils/util.js';
import lxLoading from '@/components/busi/lxLoading.vue';
import CourseList from '@/components/busi/courseList.vue';
// import banner1 from '@/static/images/home/banner1.jpg';
// import banner2 from '@/static/images/home/banner2.jpg';
// import banner3 from '@/static/images/home/banner3.jpg';
import xljyIcon from '@/static/images/home/xljyIcon.png';
import xxfdIcon from '@/static/images/home/xxfdIcon.png';
import xqjyIcon from '@/static/images/home/xqjyIcon.png';
import yypxIcon from '@/static/images/home/yypxIcon.png';
import zgksIcon from '@/static/images/home/zgksIcon.png';
import zyjnIcon from '@/static/images/home/zyjnIcon.png';
import itpxIcon from '@/static/images/home/itpxIcon.png';
import wtysIcon from '@/static/images/home/wtysIcon.png';
import qyglIcon from '@/static/images/home/qyglIcon.png';
import cglxIcon from '@/static/images/home/cglxIcon.png';
// import qrzIcon from '@/static/images/home/qrz-icon.jpg';
// import yyxlIcon from '@/static/images/home/yyxl-icon.jpg';
// import zgksIcon from '@/static/images/home/zgks-icon.jpg';
// import zyjnIcon from '@/static/images/home/zyjn-icon.jpg';
// import xqjyIcon from '@/static/images/home/xqjy-icon.jpg';
export default {
	components: { lxLoading, CourseList },
	data() {
		return {
			ossUrl,
			current: 0,
			currentRecommendIndex: 0,
			messageNumber: 8,
			isLoading: false,
			windowHeight: 600,
			topShow: false,
			offset: 0,
			total: 0,
			limit: 10,
			institutionList: [],
			courseList: [],
			wfList: [],
			swiperList: [
				'https://tcsrcz.oss-cn-hangzhou.aliyuncs.com/lxw/base/banner1.jpg',
				'https://tcsrcz.oss-cn-hangzhou.aliyuncs.com/lxw/base/banner2.jpg',
				'https://tcsrcz.oss-cn-hangzhou.aliyuncs.com/lxw/base/banner3.jpg'
			],
			navList: [
				{
					thumb: xljyIcon,
					name: '学历教育',
					url: '../search/searchResult?keyword=&selectIndex=2&tabType=xljy'
				},
				{
					thumb: xxfdIcon,
					name: '学习辅导',
					url: '/pages_ani/search/searchResult?keyword=&selectIndex=2&tabType=xxfd'
				},
				{
					thumb: xqjyIcon,
					name: '学前教育',
					url: '/pages_ani/search/searchResult?keyword=&selectIndex=2&tabType=xqjy'
				},
				{
					thumb: yypxIcon,
					name: '语言培训',
					url: '/pages_ani/search/searchResult?keyword=&selectIndex=2&tabType=yypx'
				},
				{
					thumb: zgksIcon,
					name: '资格考试',
					url: '/pages_ani/search/searchResult?keyword=&selectIndex=2&tabType=zgks'
				},
				{
					thumb: zyjnIcon,
					name: '职业技能',
					url: '/pages_ani/search/searchResult?keyword=&selectIndex=2&tabType=zyjy'
				},
				{
					thumb: itpxIcon,
					name: 'IT培训',
					url: '/pages_ani/search/searchResult?keyword=&selectIndex=2&tabType=itpx'
				},
				{
					thumb: wtysIcon,
					name: '文体艺术',
					url: '/pages_ani/search/searchResult?keyword=&selectIndex=2&tabType=wtys'
				},
				{
					thumb: qyglIcon,
					name: '企业管理',
					url: '/pages_ani/search/searchResult?keyword=&selectIndex=2&tabType=qygl'
				},
				{
					thumb: cglxIcon,
					name: '出国留学',
					url: '/pages_ani/search/searchResult?keyword=&selectIndex=2&tabType=cglx'
				}
			],
			pageNum: 1
		};
	},
	computed: {
		...mapGetters(['userInfo'])
	},
	onLoad() {
		const that = this
		uni.getSystemInfo({
			success: function (res){
				that.swiperHeight = res.windowWidth /16*9
				that.windowHeight = res.windowHeight
			}
		});
		// this.getData();
		this.getSchoolList()
	},
	methods: {
		toTop() {
			uni.pageScrollTo({
				scrollTop: 0,
				duration: 100
			});
		},
		getData() {
			this.getShowList();
			if (this.currentRecommendIndex === 0) {
				this.getCourseList();
			} else {
				this.getInstitutionList();
			}
		},
		getSchoolList() {
			this.$util.showLoading();
			this.isLoading = true;
			const params = {
				pageNum: this.pageNum,
				pageSize: 10
			}
			this.$http
				.get('school_list', params)
				.then(res => {
					if (res.code === 1) {
						const data = res.rows
						if (data.length === 0) {
							console.log('没有数据了');
						} else {
							this.courseList = this.courseList.concat(data);
						}
					} else {
						this.$util.showToast(res.msg);
					}
					this.isLoading = false;
					this.$util.hideLoading();
				})
				.catch(err => {
					console.log(err);
				});
		},
		tabClick(index) {
			this.offset = 0;
			this.total = 0;
			this.currentRecommendIndex = index;
			if (this.currentRecommendIndex === 0) {
				this.courseList = [];
				this.getCourseList();
			} else {
				this.institutionList = [];
				this.getInstitutionList();
			}
		},
		handleCourseClick(item) {
			uni.navigateTo({
				url: `/pages/courseDetail/courseDetail?courseId=${item.id}`
			});
		},
		handleMerchantClick(merchant) {
			uni.navigateTo({
				url: `/pages_ani/institution/institutionDetail/institutionDetail?shopId=${merchant.id}&mechId=${merchant.mechId}`
			});
		},
		getCourseList() {
			this.$util.showLoading();
			this.isLoading = true;
			const params = {
				offset: this.offset,
				limit: this.limit,
				sortCondition: 1,
				short: 2
			};
			this.$http
				.post('stuh5/course/list', params)
				.then(res => {
					if (res.code === 200) {
						const data = res.data.rows;
						if (data.length === 0) {
							console.log('没有数据了');
						} else {
							this.courseList = this.courseList.concat(data);
							this.total = res.data.total;
						}
						this.isLoading = false;
						this.$util.hideLoading();
					} else {
						this.isLoading = true;
						this.$util.showToast(res.msg);
						this.$util.hideLoading();
					}
				})
				.catch(err => {
					console.log(err);
					this.isLoading = false;
					this.$util.hideLoading();
				});
		},
		getInstitutionList() {
			this.$util.showLoading();
			this.isLoading = true;
			const params = {
				offset: this.offset,
				limit: this.limit,
				short: 1
			};
			this.$http
				.post('stuh5/shop/shopList', params)
				.then(res => {
					if (res.code === 200) {
						const data = res.data.rows;
						if (data.length === 0) {
							console.log('没有数据了');
						} else {
							this.institutionList = this.institutionList.concat(data);
							this.total = res.data.total;
						}
						this.isLoading = false;
						this.$util.hideLoading();
					} else {
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
		toPage(page) {
			if (page == 'allSearch') {
				uni.navigateTo({
					url: '/pages_ani/search/allSearch?from=index'
				});
				return;
			}
			this.$util.verifyLogin(() => {
				const pages = {
					find: '/pages_ani/findCourse/findCourse',
					search: '/pages_ani/search/search?from=index',
					allSearch: '/pages_ani/search/allSearch?from=index'
				};
				for (const key in pages) {
					if (key === page) {
						uni.navigateTo({
							url: pages[key]
						});
					}
				}
			});
		},
		toPageIndica(url) {
			uni.navigateTo({
				url: '/pages/searchList/searchList'
			})
			// uni.navigateTo({
			// 	url: url
			// });
		}
	},
	onPageScroll: function(Object) {
		if (this.windowHeight < Object.scrollTop) {
			this.topShow = true;
		} else {
			this.topShow = false;
		}
	},
	onReachBottom() {
		this.pageNum++
		this.getSchoolList()
		// if (this.currentRecommendIndex === 0) {
		// 	if (this.courseList.length < this.total) {
		// 		this.offset += 10;
		// 		this.getData();
		// 	}
		// } else {
		// 	if (this.institutionList.length < this.total) {
		// 		this.offset += 10;
		// 		this.getData();
		// 	}
		// }
	}
};
</script>
<style lang="scss">
page {
	min-height: 100vh;
	background-color: #fff;
}
.header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 20rpx;
	.logo {
		image {
			width: 190rpx;
			height: 64rpx;
		}
	}
	.selected {
		margin-right: auto;
		margin-left: 20rpx;
		border-radius: 40rpx;
		padding: 10rpx 20rpx;
		border: 1rpx solid #ececec;
	}
	.search-message {
		position: relative;
		.number {
			position: absolute;
			right: -6rpx;
			top: -6rpx;
		}
	}
}
.indicator {
	@include flex(row);
	justify-content: center;
	&__dot {
		height: 12rpx;
		width: 12rpx;
		border-radius: 100px;
		background-color: rgba(255, 255, 255, 0.35);
		margin: 0 10rpx;
		transition: background-color 0.3s;

		&--active {
			width: 24rpx;
			background-color: #ffffff;
		}
	}
}
.scroll-list {
	@include flex(column);

	&__goods-item {
		margin-right: 40rpx;
		text-align: center;

		&__image {
			width: 60px;
			height: 60px;
			// border-radius: 8rpx;
			border-radius: 50%;
		}

		&__text {
			text-align: center;
			font-size: 24rpx;
			margin-top: 10rpx;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}
	}
}

.banner {
	width: 100%;
	height: 120rpx;
	position: relative;
	image {
		width: 100%;
		height: 100%;
	}
	.content {
		@include flex(column);
		position: absolute;
		top: 0;
		left: 0;
		padding: 20rpx 0 0 50rpx;
	}
}

.recommend {
	.wrap {
		// background-color: #f6f6f6;
		padding: 20rpx;
	}
	&_tabs {
		display: flex;
		justify-content: space-around;
		font-size: 32rpx;
		font-weight: bold;
		margin-bottom: 10rpx;
		.active {
			color: $color-red;
			position: relative;
			image {
				width: 128rpx;
				height: 12rpx;
				position: absolute;
				left: 0;
				bottom: 0rpx;
			}
		}
	}
	&_institution {
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
					image {
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
					flex-wrap: wrap;
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
