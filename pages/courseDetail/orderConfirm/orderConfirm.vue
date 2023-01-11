<template>
	<view class="global-wrap">
		<view class="info-panel">
			<view class="title">
				<view class="mr-5"><image class="w-22 h-18" src="../../../static/images/grade_icon.png" mode=""></image></view>
				<view class="fz-32 fw-500">报读信息</view>
			</view>
			<view class="info">
				<view class="item">
					<view class="title">报读院校</view>
					<view class="data">{{ detail.schoolName }}</view>
				</view>
				<view class="item">
					<view class="title">报读年级</view>
					<view class="data">{{ detail.gradeName }}</view>
				</view>
				<view class="item">
					<view class="title">报读专业</view>
					<view class="data">{{ selectCourse.subject.subjectName }}</view>
				</view>
			</view>
		</view>
		<view class="info-panel mt-20">
			<view class="title">
				<view class="mr-5"><image class="w-22 h-18" src="../../../static/images/grade_icon.png" mode=""></image></view>
				<view class="fz-32 fw-500">基本信息</view>
			</view>
			<view class="info">
				<view class="item">
					<view class="title">姓名</view>
					<view class="data">{{ form.name }}</view>
				</view>
				<view class="item">
					<view class="title">身份证号</view>
					<view class="data">{{ form.idCard }}</view>
				</view>
				<view class="item">
					<view class="title">联系电话</view>
					<view class="data">{{ form.phone }}</view>
				</view>
			</view>
		</view>

		<view class="info-panel mt-20">
			<view class="title">
				<view class="mr-5"><image class="w-22 h-18" src="../../../static/images/grade_icon.png" mode=""></image></view>
				<view class="fz-32 fw-500">支付方式</view>
			</view>
			<view class="info">
				<view class="item">
					<u-radio-group v-model="radiovalue1" activeColor="#CB242B" placement="column" iconPlacement="right" @change="groupChange">
						<template v-for="(item, index) in radiolist1">
							<view class="flex-between flex-align">
								<view>
									<text :class="item.icon"></text>
									<text class="ml-10 fz-28">{{ item.name }}</text>
								</view>
								<u-radio :customStyle="{ marginBottom: '8px' }" :key="index" :name="item.value" @change="radioChange"></u-radio>
							</view>
						</template>
					</u-radio-group>
				</view>
			</view>
		</view>
		<view class="info-panel mt-20">
			<view class="info pt-0">
				<!-- <view class="item">
					<view class="title">推荐码</view>
					<view class="data"></view>
				</view> -->
				<view class="item">
					<view class="title">缴费方式</view>
					<view class="data">{{ selectCourse.payIndex === 0 ? '先缴报名费' : '全额' }}</view>
				</view>
				<view class="item">
					<view class="title">缴费金额</view>
					<view class="data fw-500 color-red" v-if="selectCourse.payIndex === 0">¥{{ selectCourse.subject.price / 100 }}</view>
					<view class="data fw-500 color-red" v-else>¥{{ selectCourse.subject.allPrice / 100 }}</view>
				</view>
			</view>
		</view>

		<view class="footer">
			<view class="flex-between flex-center wb-100">
				<view class="fz-28">
					应支付：
					
					<!-- {{detail.orderStatus}}
					<template v-if="detail.orderStatus === 1">
						11
						{{(detail.orderItems[0].allPrice - detail.payAmount) / 100}}
					</template> -->
					<template>
						<text class="fz-36 fw-500 color-red" v-if="selectCourse.payIndex === 0">¥{{ selectCourse.subject.price / 100 }}</text>
						<text class="fz-36 fw-500 color-red" v-else>¥{{ selectCourse.subject.allPrice / 100 }}</text>
					</template>
					
				</view>
				<view class="lx-btn" @tap="toPay">确认支付</view>
			</view>
		</view>
	</view>
</template>

<script>
import { mapGetters } from 'vuex';
import { debounce } from '@/utils/util.js'
export default {
	name: 'orderConfirm',
	data() {
		return {
			// 基本案列数据
			radiolist1: [
				{
					name: '微信',
					value: 1,
					icon: 'iconfont icon-weixin fz-32',
					disabled: false
				}
				// {
				// 	name: '支付宝',
				// 	value: 2,
				// 	icon: 'iconfont icon-zhifubao fz-32',
				// 	disabled: false
				// },
				// {
				// 	name: '银行卡',
				// 	value: 3,
				// 	icon: 'iconfont icon-qia fz-32',
				// 	disabled: false
				// }
			],
			// u-radio-group的v-model绑定的值如果设置为某个radio的name，就会被默认选中
			radiovalue1: 1,
			selectCourse: {},
			detail: {},
			form: {},
			orderInfo: {}
		};
	},
	computed: {
		...mapGetters(['userInfo', 'openid'])
	},
	onLoad(options) {
		const detail = uni.getStorageSync('detail');
		const selectCourse = JSON.parse(options.selectCourse);
		const form = JSON.parse(options.form);
		const orderInfo = JSON.parse(options.orderInfo);
		console.log(detail, selectCourse, form);
		console.log('orderInfo: ', orderInfo);
		this.detail = detail;
		this.selectCourse = selectCourse;
		this.form = form;
		this.orderInfo = orderInfo;
	},
	methods: {
		toPay: debounce(function () {
			if(this.orderInfo.orderStatus == 0) {
				this.$util.showLoading('支付中...');
				const paramsVerifyStu = {
					businessId: this.detail.businessId,
					schoolId: this.detail.schoolId,
					subjectId: this.selectCourse.subject.subjectId,
					gradeId: this.detail.gradeId,
					paperworkNumber: this.form.idCard
				};
				this.$http
					.post('stuh5/order/verifyStu', paramsVerifyStu)
					.then(res => {
						if (res.code === 200) {
							const _self = this
							const params = {
								openid: this.openid,
								amount: this.selectCourse.payIndex === 0 ? this.selectCourse.subject.price : this.selectCourse.subject.allPrice,
								payType: 2,
								payItemType: this.selectCourse.payIndex === 0 ? 0 : 1, //（0：先缴纳报名费，1：全款）
								orderId: this.orderInfo.orderId,
								orderItemId: this.orderInfo.id,
								orderNo: this.orderInfo.orderNo
							};
							if (this.orderInfo.orderStatus === 1) {
								params.payItemType = 2
							}
							// #ifdef H5
							params.wechatPayType = 1
							// #endif
							// #ifdef MP-WEIXIN
							params.wechatPayType = 0
							// #endif
							console.log('支付参数：', params);
							this.$http
								.post('stuh5/order/pay', params)
								.then(res => {
									if (res.code === 200) {
										console.log('支付');
										const data = res.data;
										// #ifdef H5
										window.location.href = `${res.data.h5Url}&redirect_url=${encodeURI(window.location.origin)}/pages_ani/mine/orderList/orderList?current=1`;
										// #endif
										// #ifdef MP-WEIXIN
										this.$util.wxPay(
											data,
											success => {
												console.log('支付成功：', success);
												// this.$util.showToast('支付成功');
												this.$util.hideLoading();
												setTimeout(() => {
													uni.navigateTo({
														url: '/pages_ani/mine/orderList/orderList'
													});
												}, 1000);
											},
											error => {
												console.log('支付失败：', error);
												this.$util.showToast('支付失败');
												this.$util.hideLoading();
											},
											complete => {}
										);
										// #endif
									} else {
										this.$util.hideLoading();
										this.$util.showToast(res.msg);
									}
								})
								.catch(err => {
									console.log(err);
									this.$util.hideLoading();
								});
						} else {
							this.$util.hideLoading();
							this.$util.showToast(res.msg);
						}
					})
					.catch(err => {
						console.log(err);
						this.$util.hideLoading();
					});
			}else{
				this.$util.showLoading('支付中...');
				const _self = this
				const params = {
					openid: this.openid,
					amount: this.selectCourse.payIndex === 0 ? this.selectCourse.subject.price : this.selectCourse.subject.allPrice,
					payType: 2,
					payItemType: this.selectCourse.payIndex === 0 ? 0 : 1, //（0：先缴纳报名费，1：全款）
					orderId: this.orderInfo.orderId,
					orderItemId: this.orderInfo.id,
					orderNo: this.orderInfo.orderNo
				};
				if (this.orderInfo.orderStatus === 1) {
					params.payItemType = 2
				}
				// #ifdef H5
				params.wechatPayType = 1
				// #endif
				// #ifdef MP-WEIXIN
				params.wechatPayType = 0
				// #endif
				console.log('支付参数：', params);
				this.$http
					.post('stuh5/order/pay', params)
					.then(res => {
						if (res.code === 200) {
							console.log('支付');
							const data = res.data;
							// #ifdef H5
							window.location.href = `${res.data.h5Url}&redirect_url=${encodeURI(window.location.origin)}/pages_ani/mine/orderList/orderList?current=1`;
							// #endif
							// #ifdef MP-WEIXIN
							this.$util.wxPay(
								data,
								success => {
									console.log('支付成功：', success);
									// this.$util.showToast('支付成功');
									this.$util.hideLoading();
									setTimeout(() => {
										uni.navigateTo({
											url: '/pages/mine/orderList/orderList'
										});
									}, 1000);
								},
								error => {
									console.log('支付失败：', error);
									this.$util.showToast('支付失败');
									this.$util.hideLoading();
								},
								complete => {}
							);
							// #endif
						} else {
							this.$util.showToast(res.msg);
							this.$util.hideLoading();
						}
					})
					.catch(err => {
						console.log(err);
						this.$util.hideLoading();
					});
			}
			
		}, 300),
		groupChange(n) {
			console.log('groupChange', n);
		},
		radioChange(n) {
			console.log('radioChange', n);
		}
	}
};
</script>

<style lang="scss" scoped>
.footer {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	height: 110rpx;
	padding: 0 30rpx;
	background-color: #fff;
	display: flex;
	justify-content: space-between;
}
</style>
