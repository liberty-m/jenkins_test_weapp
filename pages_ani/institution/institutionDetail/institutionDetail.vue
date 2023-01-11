<template>
	<view>
		<template v-if="!isEmpty">
			<view class="video-photo-wrap">
				<swiper :indicator-dots="brand.photos.length ? true : false" :autoplay="true" class="banner">
					<!-- <swiper-item><video src="http://v.liexue.cn/sv/3347ed99-16fa18c49c6/3347ed99-16fa18c49c6.mp4" controls :enable-progress-gesture="false"></video></swiper-item> -->
					<template v-if="brand.photos.length">
						<swiper-item v-for="(img, index) in brand.photos">
							<image :src="ossUrl + img.picUrl" @tap="previewImage(brand.photos, index)" mode="aspectFill" class="banner"></image>
						</swiper-item>
					</template>
					<template v-else>
						<swiper-item><image :src="ossUrl + brand.mechanismLogo" mode="aspectFill" class="banner"></image></swiper-item>
					</template>
				</swiper>
				<view class="view-photo" @tap="toPhoto">品牌相册</view>
			</view>
			<view class="main">
				<text class="fz-36 bold">{{ detail.managementName }}</text>
				<view class="color-999 mt-20" style="font-size: 14px;">{{ detail.labels }}</view>
				<view class="mt-20 mb-20 flex-between">
					<view>
						<text class="fz-28 color-red mr-20" v-if="detail.aleNumber">已报名 {{ detail.aleNumber }}</text>
					</view>
					<view>
						<text v-if="!detail.ifColl" class="iconfont icon-shoucang fz-40" @tap="merchantOrCancelCourse"></text>
						<text v-else class="iconfont icon-yjshoucang fz-40" @tap="merchantOrCancelCourse"></text>
						<!-- <text class="iconfont icon-zhuanfa fz-40 ml-30"></text> -->
					</view>
				</view>
			</view>
			<view class="line-brach"></view>
			<view class="institution"><merchant-location :isShowTitle="false" :merchant="detail" /></view>
			<view class="line-brach"></view>
			<u-popup :show="showPopup" closeable :round="10" mode="bottom" closeOnClickOverlay @close="closePopup" @open="openPopup">
				<view class="popup-select">
					<view class="fz-32 fw-500 text-center pt-26 mb-20">科目选择</view>
					<view clsas="popup-price" style="display: flex;justify-content: space-between; align-items: center; margin-bottom: 20rpx;">
						<view>
							<text class="color-red fw-500 fz-36">¥9800</text>
							<text class="fz-28">
								（含报名费
								<text class="fw-500 color-red fz-32">¥ 300</text>
								）
							</text>
						</view>
						<view>剩余名额 120</view>
					</view>
				</view>
				<view style="position: relative; top: -40rpx;" class="lx-btn block wb-88 m-auto mt-50 lt-s-4 fz-32">报名</view>
			</u-popup>
			 <!-- tab-line -->
			<view class="pt-30 pl-30 tab-line">
				<view class="fw-500 fz-32 mb-20">课程介绍({{ courseList.length }})</view>
				<u-tabs :list="tabList" @change="tabChange" :activeStyle="{color: '#bc292d', fontWeight: 'bold'}" lineWidth="36" lineHeight="6" lineColor="#CB242B"></u-tabs>
			</view>
			
			<view v-if="tabCurrent === 1"></view>
			<view v-if="tabCurrent === 2"></view>
			<view v-if="tabCurrent === 3"></view>
			<view v-if="tabCurrent === 4"></view>
			<view class="wf-flow">
				<course-list v-if="courseList.length != 0" :list="courseList" showType="institution" @click-item="handleCourseClick"></course-list>
				<view class="color-999 text-center pt-10 pb-20" v-else>该店铺下暂无课程</view>
			</view>
			<view class="color-999 text-center pt-10 pb-20" v-if="courseList.length != 0" @tap="toMore">查看更多课程 ></view>
			<view class="line-brach"></view>
			<view class="brand" @tap="toBrand">
				<view class="flex-between align-between">
					<text class="fw-500 fz-28">品牌资质与介绍</text>
					<text class="iconfont icon-youjiantou_huaban fz-32 fw-500"></text>
				</view>
				<view class="flex mb-20 mt-20">
					<image class="w-128 h-128 border-circle mr-20" :src="ossUrl + brand.mechanismLogo" mode="aspectFill"></image>
					<view class="mt-10 lh-40 u-line-3" style="flex:1; font-size: 14px;">{{ brand.mechanismInstroduce }}</view>
				</view>
			</view>
			<view class="pb-150"></view>
			<view class="footer"><view class="lx-btn wb-70" @tap="handleSubscribe">预约咨询</view></view>
			<subscribe-consult ref="subscribe" showType="institution" :merchant="detail" />
		</template>
		<template v-else>
			<view class="no-id">
				<image class="empty-img" src="/static/images/empty.png" mode=""></image>
				<view class="fz-30 c8 mt-30">当前机构不存在或已下架</view>
				<view class="mt-20">{{ countdown }} 秒后自动 <text @tap="toHome" style="color:#007AFF" class="ml-10">返回首页</text></view>
			</view>
		</template>
	</view>
</template>

<script>
import { mapGetters } from 'vuex';
import { ossUrl } from '@/utils/util.js';
import CourseList from '@/components/busi/courseList.vue';
import merchantLocation from '@/components/busi/merchantLocation.vue';
import subscribeConsult from '@/components/busi/subscribeConsult.vue';
import { addMyTracks } from '@/common/function/myTracks.js'
export default {
	components: { merchantLocation, CourseList, subscribeConsult },
	data() {
		return {
			ossUrl,
			current: 0,
			isEmpty: false,
			countdown:8,
			showPopup: false,
			tabCurrent: 1,
			offset: 0,
			limit: 10,
			status: 'loadmore',
			brand: {},
			detail: {},
			courseList: [],
			tabList: [],
			wfList: [],
			merchantId: '',
			shopId: '',
			mechId: '',
			timer: null
		};
	},
	computed: {
		...mapGetters(['userInfo'])
	},
	onLoad(options) {
		const { shopId, mechId } = options;
		this.shopId = shopId;
		this.mechId = mechId
		// this.merchantId = id
		this.getHeadDetail(shopId);
		this.getMerchantLabel(shopId);
		this.getMerchantCourse(shopId,'');
		this.getBrandDetail(shopId);
	},
	onUnload() {
		this.timer = null
		clearInterval(this.timer)
	},
	methods: {
		previewImage(urls, current) {
			// console.log(urls)
			const imgs = urls.filter(v => !v.videoUrl).map(v => ossUrl + v.picUrl)
			uni.previewImage({
				urls: imgs,
				current
			});
		},
		emptyInit () {
		  this.timer = setInterval(() => {
			this.countdown--
			if (this.countdown <= 0 && this.timer) {
			  clearInterval(this.timer)
			  uni.switchTab({
			  	url: '/pages/home/home'
			  })
			}
		  }, 1000)
		},
		toHome (){
			uni.switchTab({
				url: '/pages/home/home'
			})
		},
		tabChange(item, index) {
			console.log(item);
			this.tabCurrent = item.value;
			this.getMerchantCourse(this.shopId, item.label === '全部' ? '' : item.label);
		},
		handleCourseClick(item) {
			console.log(item);
			uni.navigateTo({
				url: `/pages/courseDetail/courseDetail?courseId=${item.id}`
			});
		},
		toPhoto() {
			uni.navigateTo({
				url: `/pages_ani/institution/brandPhoto/brandPhoto?id=${this.detail.mechanism}`
			});
		},
		toMore() {
			uni.navigateTo({
				url: `/pages_ani/institution/allCource/allCource?id=${this.shopId}`
			});
		},
		toBrand() {
			uni.navigateTo({
				url: `/pages_ani/institution/brandQualification/brandQualification?id=${this.shopId}`
			});
		},
		handleSubscribe() {
			this.$util.verifyLogin(() => {
				this.$refs.subscribe.showPopup();
			});
		},
		getMerchantLabel(id) {
			this.$util.showLoading();
			this.$http
				.post('stuh5/course/label/list', { shopId: id })
				.then(res => {
					if (res.code === 200) {
						console.log('label: ', res);
						this.tabList = res.data.map(v => {
							v.name = v.label;
							return v;
						});
						this.tabList.unshift({ name: '全部', id: '', label: '全部' });
						console.log(this.tabList);
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
					this.$util.hideLoading();
				});
		},
		getMerchantCourse(shopId = '', label = '') {
			this.$util.showLoading();
			this.$http
				.post('stuh5/course/labelCourse', { shopId, label, offset: this.offset, limit: this.limit })
				.then(res => {
					if (res.code === 200) {
						console.log('labelCourse: ', res);
						this.courseList = res.data.rows;
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
					this.$util.hideLoading();
				});
		},
		merchantOrCancelCourse() {
			this.$util.verifyLogin(() => {
				const apiUrl = this.detail.ifColl ? 'stuh5/mech/incCollAmount' : 'stuh5/mech/userColl';
				this.$util.showLoading();
				this.$http
					.post(apiUrl, { id: this.detail.mechanism, userId: this.userInfo.id })
					.then(res => {
						if (res.code === 200) {
							this.$util.showToast('操作成功');
							setTimeout(() => {
								this.getHeadDetail(this.detail.id);
								this.getBrandDetail(this.detail.id);
							}, 1000);
						} else {
							this.$util.showToast(res.msg);
						}
					})
					.catch(err => {
						console.log(err);
					});
			});
			
		},
		getHeadDetail(id) {
			this.$util.showLoading();
			this.$http
				.post('stuh5/shop/selectOne', { id, userId: this.userInfo.id })
				.then(res => {
					if (res.code === 200) {
						console.log('head: ', res);
						this.detail = res.data;
						// 我的足迹添加机构
						addMyTracks(res.data,'mechanism');
						uni.setNavigationBarTitle({
							title: this.detail.managementName
						});
						this.detail.labels = res.data.mechCatList.map(v => v.catThreeName).join('/');
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
					this.$util.hideLoading();
				});
		},
		getBrandDetail(id) {
			this.$util.showLoading();
			this.$http
				.post('stuh5/mech/brandDetail', { id })
				.then(res => {
					if (res.code === 200) {
						console.log(res);
						this.brand = res.data;
						this.$util.hideLoading();
					} else {
						uni.showToast({
							icon: 'none',
							title: res.msg
						});
						this.$util.hideLoading();
						this.isEmpty = true
						this.emptyInit()
					}
				})
				.catch(err => {
					console.log(err);
					this.$util.hideLoading();
					this.isEmpty = true
					this.emptyInit()
				});
		},
		closePopup() {
			this.showPopup = false;
		},
		openPopup() {}
	}
};
</script>

<style lang="scss" scoped>
.video-photo-wrap {
	position: relative;
	.view-photo {
		position: absolute;
		color: #fff;
		right: 20rpx;
		bottom: 20rpx;
		background-color: rgba($color: #000000, $alpha: 0.3);
		border-radius: 16rpx;
		padding: 10rpx;
	}
}
.main {
	width: 92%;
	margin: 0 auto;
	margin-top: 20rpx;
	// margin-left: 5%;
}

.line-brach {
	width: 100vw;
	height: 20rpx;
	background-color: #f2f2f2;
}

.banner {
	width: 100%;
	height: 440rpx;
}

video {
	width: 100%;
}

.gold {
	color: #ab7647;
}

.gold-red {
	color: #bc292d;
}

.table-box {
	padding: 20rpx 24rpx;
	background-color: #f2f2f2;
	border-radius: 8rpx;
	font-size: 28rpx;
	margin-top: 10rpx;
	margin-bottom: 20rpx;
}

.popup-select {
	padding: 0 40rpx;
	// background-color: red;
	// .popup-price {
	// }
	.popup-service {
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-radius: 8rpx;
		height: 72rpx;
		background-color: #f2f2f2;
		padding: 0 20rpx;
	}
}

.tabs-box.popup {
	padding: 40rpx;
}

.tabs-box.popup .tab {
	margin-bottom: 30rpx;
}

.subject-wrap {
	max-height: 270rpx;
	overflow: auto;
}

.line-red {
	margin-top: 16rpx;
	border-top: 2rpx solid #bc292d;
	padding-top: 16rpx;
}

.arrow-after {
	position: absolute;
	display: inline-block;
	width: 16rpx;
	height: 16rpx;
	right: 16rpx;
	top: 20rpx;
	border-right: 6rpx solid #999;
	border-top: 6rpx solid #999;
	transform: rotate(45deg);
}

.institution {
	padding: 20rpx;
	background-color: #fff;
	margin-top: 10rpx;
}

.tab {
	margin-bottom: 12rpx;
	margin-right: 12rpx;
	display: inline-block;
	background-color: #f2f2f2;
	color: #333;
	border-radius: 30rpx;
	padding: 8rpx 24rpx;
	font-size: 28rpx;
	&.active {
		color: $color-red;
		border: 1rpx solid $color-red;
		background-color: #fff;
	}
}
.wf-flow {
	background-color: #fff;
	padding: 20rpx;
}
.brand {
	background-color: #fff;
	padding: 20rpx;
}
.footer {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	height: 110rpx;
	background-color: #fff;
	display: flex;
	align-items: center;
	justify-content: center;
	view {
		margin-right: 30rpx;
	}
}

.no-id {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 80vh;
}

.empty-img {
	width: 300rpx;
	height: 340rpx;
}
</style>
