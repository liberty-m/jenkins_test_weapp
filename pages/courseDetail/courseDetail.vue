<template>
	<view>
		<view v-if="!isEmpty">
			<swiper :indicator-dots="true" :autoplay="true" class="banner">
				<swiper-item v-for="(item, index) in detail.headerPicList" :key="index">
					<video :enable-progress-gesture="false" v-if="item.videoUrl" :src="ossUrl + item.videoUrl" controls></video>
					<image v-else :src="ossUrl + item.picUrl" mode="" class="banner" @tap="previewImage(detail.headerPicList, index)"></image>
				</swiper-item>
			</swiper>
			<view class="main">
				<text class="fz-40 bold">{{ detail.courName }}</text>
				<view class="mt-20 flex-between">
					<view>
						<text class="fw-500 fz-32 color-red mr-20">¥{{ detail.money / 100 }} 起</text>
						<text class="fz-24 color-999">剩余名额 {{ detail.remainNum }}</text>
					</view>
					<view>
						<text v-if="!detail.ifColl" class="iconfont icon-shoucang fz-40" @tap="collectionOrCancelCourse"></text>
						<text v-else class="iconfont icon-yjshoucang fz-40" @tap="collectionOrCancelCourse"></text>
						<!-- <text class="iconfont icon-zhuanfa fz-40 ml-30"></text> -->
					</view>
				</view>
				<view class="mt-30 mb-30 align-between">
					<view class="c3">
						{{ detail.serveMsg }}
					</view>
					<view class="color-red fz-24" v-if="detail.sortNum">已报名 {{ detail.sortNum }}</view>
				</view>
				<view class="table-box" v-if="detail.type === 1">
					<view class="align-between c8">
						<text class="text-width">学习类型</text>
						<text class="text-width">招生对象</text>
						<text class="text-width">最快毕业</text>
					</view>
					<view class="align-between c3 line-red">
						<text class="text-width" v-if="detail.businessId === 1">全日制</text>
						<text class="text-width" v-else-if="detail.businessId === 2">业余学历</text>
						<text class="text-width" v-else></text>
						<view class="flex flex-column">
							<text class="u-line-1 mb-6 inline-block text-center" v-for="label in detail.recruitList">
								  {{ label }}
							</text>
						</view>
						<text class="text-width">{{ detail.subjectLenName }}年</text>
					</view>
				</view>
				<view class="table-box" v-else>
					<view class="align-between c8">
						<text class="text-width">授课形式</text>
						<text class="text-width">适合基础</text>
						<text class="text-width">上课人数</text>
					</view>
					<view class="align-between c3 line-red" style="align-items: flex-start !important">
						<text class="text-width">{{ detail.interTeachFrom }}</text>
						<view class="flex flex-column">
							<text class="text-width u-line-1">{{ detail.fitBase }}</text>
						</view>
						<text class="text-width">{{ detail.interClassNum }}</text>
					</view>
				</view>
			</view>
			<view class="line-brach" v-if="detail.type === 1"></view>
			<view class="main" @tap="handleCourse" v-if="detail.type === 1">
				<view class="rel mb-30 flex-between">
					<view><text class="fz-28 mr-10 fw-500">科目选择</text></view>
					<text class="iconfont icon-youjiantou_huaban fz-34 fw-500"></text>
					<!-- <text class="arrow-after"></text> -->
				</view>
				<view class="tabs-box">
					<!-- {{subjectOrPay}} -->
					<view class="mb-20">
						<view class="mb-10">
							<image class="w-32 h-26 mr-10" src="../../static/images/grade_icon.png" mode=""></image>
							<text class="fz-28 fw-500">年级</text>
						</view>
						<text class="tab">{{ detail.gradeName }}</text>
					</view>
					<view class="mb-20">
						<view class="mb-10">
							<image class="w-32 h-26 mr-10" src="../../static/images/subject_icon.png" mode=""></image>
							<text class="fz-28 fw-500 mr-10">专业</text>
							<text class="color-red fz-22" v-if="detail.infoList">共{{ detail.infoList.length }}个专业可供选择</text>
						</view>
						<template v-for="(item, index) in detail.infoList">
							<text class="tab mb-20">{{ item.subjectName }}</text>
						</template>
					</view>
					<view class="mb-10 pb-10">
						<view class="mb-10">
							<image class="w-32 h-26 mr-10" src="../../static/images/pay_icon.png" mode=""></image>
							<text class="fz-28 fw-500">缴费方式</text>
						</view>
						<!-- 1 学历 其它非学历 -->
						<!-- <view v-if="detail.type === 1">
							<template v-for="(item, index) in detail.infoList">
								<text class="tab">{{ item.feeItemName }}</text>
							</template>
						</view> -->
						<view>
							<text class="tab">预缴报名费</text>
							<text class="tab">缴全款</text>
						</view>
					</view>
				</view>
			</view>
			<view class="line-brach"></view>
			<view class="institution" v-if="detail.shop"><merchant-location showType="course" :merchant="detail.shop" @click-name="handleMerchantName" /></view>
			<view class="line-brach"></view>
			<u-popup :show="showPopup" closeable :round="10" mode="bottom" closeOnClickOverlay @close="closePopup" @open="openPopup">
				<view class="popup-select">
					<view class="fz-32 fw-500 text-center pt-26 mb-20">科目选择</view>
					<view clsas="popup-price" style="display: flex;justify-content: space-between; align-items: center; margin-bottom: 20rpx;">
						<view class="flex-between align-between wb-100">
							<!-- {{subjectOrPay}} -->
							<template v-if="subjectOrPay.isSelect">
								<view>
									<text v-if="subjectOrPay.payIndex === 0" class="color-red fw-500 fz-34">
										¥{{ subjectOrPay.subject.price / 100 }}
									</text>
									<text v-if="subjectOrPay.payIndex === 1" class="color-red fw-500 fz-34">
										¥{{ subjectOrPay.subject.allPrice / 100 }}
									</text>
									<text v-if="subjectOrPay.payIndex === 1" class="fz-28">
										（含报名费
										<text class="fw-500 color-red fz-32">¥ {{ subjectOrPay.subject.price / 100 }}</text>
										）
									</text>
								</view>
								
								<view class="text-right">
									<text>剩余名额 {{ subjectOrPay.subject.remainNum }}</text>
								</view>
							</template>
							<template v-else>
								<view>
									<!-- <text v-if="subjectOrPay.payIndex === 0" class="color-red fw-500 fz-34">¥{{ detail.minSigUpMoney / 100 }} ~ {{ detail.maxSigUpMoney / 100 }}</text> -->
									<text class="color-red fw-500 fz-34">¥{{ detail.minSigUpMoney / 100 }} ~ {{ detail.maxPaymentPrice / 100 }}</text>
									<!-- <text class="fz-28">
										（含报名费
										<text class="fw-500 color-red fz-32">¥ {{ detail.money / 100 }}</text>
										）
									</text> -->
								</view>
								<view>
									<text>剩余名额 {{ detail.remainNum }}</text>
								</view>
							</template>
						</view>
					</view>
					<view class="popup-service">
						<view>
							<image class="w-24 h-24 mr-10 vl-middle" src="../../static/images/gongyi_icon.png" mode=""></image>
							服务保障
						</view>
						<view>
							<text>{{ detail.serveMsg }}</text>
						</view>
					</view>
				</view>
				<view class="tabs-box popup">
					<view class="mb-20">
						<view class="mb-10">
							<image class="w-32 h-26 mr-10" src="../../static/images/grade_icon.png" mode=""></image>
							<text class="fz-28 fw-500">年级</text>
						</view>
						<text class="tab active">{{ detail.gradeName }}</text>
					</view>
					<view class="mb-20">
						<view class="mb-10">
							<image class="w-32 h-26 mr-10" src="../../static/images/subject_icon.png" mode=""></image>
							<text class="fz-28 fw-500 mr-10">专业</text>
							<text class="color-red fz-22" v-if="detail.infoList">共{{ detail.infoList.length }}个专业可供选择</text>
						</view>
						<view class="subject-wrap">
							<template v-for="(item, index) in detail.infoList">
								<text class="tab" :class="subjectOrPay.subjectIndex === index && 'active'" @tap="selectSubjectOrPay(item, 'subject', index)">
									{{ item.subjectName }}
								</text>
							</template>
						</view>
					</view>
					<view class="mb-10 pb-10">
						<view class="mb-10">
							<image class="w-32 h-26 mr-10" src="../../static/images/pay_icon.png" mode=""></image>
							<text class="fz-28 fw-500">缴费方式</text>
						</view>
						<view v-if="detail.type === 1">
							<template v-for="(item, index) in payList">
								<text class="tab" :class="subjectOrPay.payIndex === index && 'active'" @tap="selectSubjectOrPay(item, 'pay', index)">{{ item.name }}</text>
							</template>
						</view>
						<view v-else>
							<text class="tab">预缴报名费</text>
							<text class="tab">缴全款</text>
						</view>
						<!-- <text class="tab active">预缴报名费</text> -->
					</view>
				</view>
				<view v-if="detail.courType === 1 || detail.type===0" class="">
					<view class="lx-btn block wb-88 text-center m-auto mb-20" @tap="handleSubscribe">预约咨询</view>
				</view>
				<view v-else>
					<template v-if="subjectOrPay.isSelect">
						<view v-if=" subjectOrPay.subject.remainNum > 0"
							  style="position: relative; top: -40rpx;"
							  class="lx-btn block wb-88 m-auto mt-50 lt-s-4 fz-32"
							  @tap="toApply">
							报名
						</view>
						<view v-else
							  style="position: relative; top: -40rpx; background-color: #E5E5E5 !important;"
							  class="lx-btn block wb-88 m-auto mt-50 lt-s-4 fz-32">已满员</view>
					</template>
					<template v-else>
						<view v-if="detail.remainNum > 0"
							  style="position: relative; top: -40rpx;"
							  class="lx-btn block wb-88 m-auto mt-50 lt-s-4 fz-32"
							  @tap="toApply">
							报名
						</view>
						<view v-else
							  style="position: relative; top: -40rpx; background-color: #E5E5E5 !important;"
							  class="lx-btn block wb-88 m-auto mt-50 lt-s-4 fz-32">已满员</view>
					</template>
					
				</view>
			</u-popup>
			<u-tabs :list="tabList" @change="tabChange" lineColor="#CB242B"></u-tabs>
			<view class="pd-40 pt-20">
				<!-- 课程详情 -->
				<view v-if="tabCurrent === 1">
					<mp-html :content="detail.picDetailContent" containerStyle="font-size:14px" />
				</view>
				<!-- 毕业证书 -->
				<view v-if="tabCurrent === 4">
					<view v-if="detail.gradBookMsg != 0" class="mb-10">{{ detail.gradBookMsg }}</view>
					
					<view class="mb-10 fw-500" style="font-size: 17px;">毕业证书样本</view>
					<view><image :src="ossUrl + detail.gradBookUrl" @tap="previewImage(ossUrl + detail.gradBookUrl, 0, true)" mode="aspectFit"></image></view>
				
					<template v-if="detail.teachBookUrl">
						<view class="mb-10 fw-500" style="font-size: 17px;">学位证书样本</view>
						<view><image :src="ossUrl + detail.teachBookUrl" @tap="previewImage(ossUrl + detail.teachBookUrl, 0, true)" mode="aspectFit"></image></view>
					</template>
				</view>
				<!-- 考试安排 -->
				<view v-if="tabCurrent === 3">
					<mp-html :content="detail.examArrContent" containerStyle="font-size:14px"/>
				</view>
				<!-- 报名须知 -->
				<view v-if="tabCurrent === 2">
					<mp-html :content="detail.signMsgContent" containerStyle="font-size:14px"/>
				</view>
				
			</view>
			<view class="pb-150"></view>
			<view v-if="detail.courType === 1 || detail.type===0" class="footer one"><view class="lx-btn block wb-88 text-center m-auto mb-20" @tap="handleSubscribe">预约咨询</view></view>
			<view v-else class="footer">
				<view class="lx-btn plain mr-30" @tap="handleSubscribe">预约咨询</view>
				<view v-if="detail.remainNum > 0" class="lx-btn mr-30" @tap="handleCourse">报名并支付</view>
				<view v-else class="lx-btn mr-30" style="background: #E5E5E5 !important">报名并支付</view>
			</view>
			<subscribe-consult ref="subscribe" showType="cource" :merchant="detail" />
		</view>
		<view v-else class="no-id">
			<image class="empty-img" src="../../static/images/empty.png" mode=""></image>
			<view class="fz-30 c8 mt-30">当前课程不存在或已下架</view>
			<view class="mt-20">{{ countdown }} 秒后自动 <text @tap="toHome" style="color:#007AFF" class="ml-10">返回首页</text></view>
		</view>
	</view>
</template>

<script>
import { mapGetters } from 'vuex';
import { ossUrl } from '@/utils/util.js'
import mpHtml from '@/components/mp-html/mp-html.vue'
import merchantLocation from '@/components/busi/merchantLocation.vue';
import subscribeConsult from '@/components/busi/subscribeConsult.vue';
import { addMyTracks } from '@/common/function/myTracks.js'
export default {
	name: 'courseDetail',
	components: { mpHtml, merchantLocation, subscribeConsult },
	data() {
		return {
			isEmpty:false,
			countdown:8,
			ossUrl,
			current: 0,
			showPopup: false,
			tabCurrent: 1,
			status: 'loadmore',
			detail: {},
			payList: [
				{
					name: '先缴报名费',
					value: 0
				},
				{
					name: '全款',
					value: 1
				}
			],
			subjectOrPay: {
				isSelect: false,
				subjectIndex: -1,
				subject: {},
				payIndex: 0,
				pay: {}
			},
			tabList: [
				{
					name: '课程详情',
					value: 1
				}, {
					name: '毕业证书',
					value: 4
				}, {
					name: '考试安排',
					value: 3
				}, {
					name: '报名须知',
					value: 2
				}
			],
			recommendInfo: {
				// referralCode: '', // 推荐码
				commission: '', // 总佣金
				seniorPartnerId: '', // 高级合伙人id-没有可传空
				seniorPartnerName: '', // 高级合伙人名称-没有可传空
				seniorPartnerCommission: '', // 高级合伙人佣金-没有可传空
				generalPartnerId: '', // 普通合伙人id
				generalPartnerName: '', // 普通合伙人名称
				generalPartnerCommission: '', // 普通合伙人佣金
				buyerAccount: '', // 买家账号
			},
			recommendInitInfo: {},
			timer: null
		};
	},
	computed: {
		...mapGetters(['userInfo', 'openid'])
	},
	onLoad(options) {
		console.log(options);
		// moneyType 1 固定
		this.recommendInitInfo = options
		const { courseId, generalPartnerId, seniorPartnerId, seniorPartnerProp, generalPartnerProp, seniorPartnerName, generalPartnerName } = options
		this.recommendInfo.buyerAccount = this.userInfo.account
		this.recommendInfo.generalPartnerId = generalPartnerId
		this.recommendInfo.seniorPartnerId = seniorPartnerId
		this.recommendInfo.seniorPartnerName = seniorPartnerName
		this.recommendInfo.generalPartnerName = generalPartnerName
		uni.setStorageSync('recommendInfo', this.recommendInitInfo)
		this.getDetail(courseId);
	},
	onUnload() {
		this.timer = null
		clearInterval(this.timer)
	},
	methods: {
		previewImage(urls, index = 0, flag) {
			let imgs = []
			if (!flag) {
				imgs = urls.filter(v => !v.videoUrl).map(v => ossUrl + v.picUrl)
			}
			uni.previewImage({
				urls: flag ? [urls] : imgs,
				current: flag ? 0 : --index
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
		handleMerchantName(merchant) {
			uni.navigateTo({
				url: `/pages_ani/institution/institutionDetail/institutionDetail?courseId=${this.detail.id}&shopId=${this.detail.shopId}`
			});
		},
		selectSubjectOrPay(item, type, index) {
			if (type === 'subject') {
				this.subjectOrPay.isSelect = true;
				this.subjectOrPay.subject = item;
				this.subjectOrPay.subjectIndex = index;
				if (this.recommendInitInfo.generalPartnerId) {
					if (this.detail.moneyType == 0) {
						this.recommendInfo.commission = this.subjectOrPay.subject.allPrice * this.detail.moneyProp	
						this.recommendInfo.seniorPartnerCommission = (this.subjectOrPay.subject.allPrice * this.detail.moneyProp) * (this.recommendInitInfo.seniorPartnerProp / 100)
						this.recommendInfo.generalPartnerCommission = (this.subjectOrPay.subject.allPrice * this.detail.moneyProp) * (this.recommendInitInfo.generalPartnerProp / 100)
					} else {
						this.recommendInfo.commission = this.detail.fixedMoney
						this.recommendInfo.seniorPartnerCommission = this.detail.fixedMoney * (this.recommendInitInfo.seniorPartnerProp / 100)
						this.recommendInfo.generalPartnerCommission = this.detail.fixedMoney * (this.recommendInitInfo.generalPartnerProp / 100)
					}
				}
				console.log('计算金额：', this.recommendInfo)
			} else {
				this.subjectOrPay.pay = item;
				this.subjectOrPay.payIndex = index;
			}
		},
		handleCourse() {
			this.$util.verifyLogin(() => {
				// #ifdef MP-WEIXIN
				if (!this.openid) {
					uni.navigateTo({
						url: '../login/login'
					})
					return
				}
				// #endif
				this.showPopup = true;
			});
			// const { courseId, generalPartnerId, generalPartnerName, generalPartnerProp } = this.$route.query
			// const { path } = this.$route
			// const params = `courseId=${courseId}&generalPartnerId=${generalPartnerId}&generalPartnerName=${generalPartnerName}&generalPartnerProp=${generalPartnerProp}`
			// this.$util.verifyLogin(() => {
			// 	this.showPopup = true;
			// }, false, params, path);
		},
		handleSubscribe() {
			this.$util.verifyLogin(() => {
				// #ifdef MP-WEIXIN
				if (!this.openid) {
					uni.navigateTo({
						url: '../login/login'
					})
					return
				}
				// #endif
				this.$refs.subscribe.showPopup();
			});
		},
		collectionOrCancelCourse() {
			this.$util.verifyLogin(() => {
				const apiUrl = this.detail.ifColl ? 'stuh5/courseColl/delete' : 'stuh5/courseColl/save';
				this.$util.showLoading();
				this.$http
					.post(apiUrl, { courseId: this.detail.id })
					.then(res => {
						if (res.code === 200) {
							console.log('收藏');
							this.$util.showToast('操作成功');
							setTimeout(() => {
								this.getDetail(this.detail.id);
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
		getDetail(id) {
			this.$util.showLoading();
			this.$http
				.post('stuh5/course/detail', { id })
				.then(res => {
					if (res.code === 200) {
						console.log(res);
						this.detail = res.data;
						// uni.setNavigationBarTitle({
						// 	title: this.detail.courName
						// });
						// 我的足迹添加课程
						addMyTracks(res.data,'course');
						if (res.data.videoUrl) {
							this.detail.headerPicList.unshift({
								type: 'video',
								videoUrl: res.data.videoUrl
							});
						}
						if (this.detail.serveMsg) {
							this.detail.serveMsg = this.detail.serveMsg.split(',').join(' | ')
						}
						if (this.detail.recruitObject) {
							this.detail.recruitList = this.detail.recruitObject.split(',')
						}
						this.tabList = [{
							name: '课程详情',
							value: 1
						}]
						if (this.detail.type === 0){
							if (this.detail.signMsgContent) {
								this.tabList.push({
									name: '报名须知',
									value: 2
								})
							}
						} else {
							if (this.detail.gradBookMsg != '0' || this.detail.gradBookUrl || this.detail.teachBookUrl) {
								this.tabList.push({
									name: '毕业证书',
									value: 4
								})
							}
							if (this.detail.examArrContent) {
								this.tabList.push({
									name: '考试安排',
									value: 3
								})
							}
							if (this.detail.signMsgContent) {
								this.tabList.push({
									name: '报名须知',
									value: 2
								})
							}
						}
						this.$util.hideLoading();
						
					} else {
						// uni.showToast({
						// 	icon: 'none',
						// 	title: res.msg
						// });
						this.isEmpty = true
						this.emptyInit()
						this.$util.hideLoading();
					}
				})
				.catch(err => {
					console.log(err);
					this.isEmpty = true
					this.emptyInit()
					this.$util.hideLoading();
				});
		},
		toApply() {
			console.log('报名: ');
			if (this.subjectOrPay.subjectIndex === -1) return this.$util.showToast('请选择专业');
			let detail = JSON.parse(JSON.stringify(this.detail));
			const recommendInfo = JSON.stringify(this.recommendInfo)
			delete detail.headerPicList;
			delete detail.infoList;
			delete detail.picDetailContent;
			delete detail.examArrContent;
			delete detail.gradBookMsg;
			delete detail.gradBookUrl;
			console.log(detail);
			uni.setStorageSync('detail', detail)
			uni.navigateTo({
				url: `confirmApply/confirmApply?selectCourse=${JSON.stringify(this.subjectOrPay)}&recommendInfo=${recommendInfo}`
			});
		},
		closePopup() {
			this.showPopup = false;
			// this.subjectOrPay.isSelect = false
		},
		openPopup() {},
		tabChange(tab) {
			this.tabCurrent = tab.value;
		}
	}
};
</script>

<style lang="scss" scoped>
.main {
	width: 92%;
	margin: 0 auto;
	margin-top: 20rpx;
	// margin-left: 5%;
}
.lx-btn {
	padding: 0 32rpx !important;
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
	padding: 0 30rpx;
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
.text-width {
	width: 140rpx;
	text-align: center;
	display: inline-block;
}
.tabs-box.popup {
	padding: 30rpx;
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
.footer {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	height: 110rpx;
	background-color: #fff;
	display: flex;
	align-items: center;
	justify-content: flex-end;
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
