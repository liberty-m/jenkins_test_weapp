<template>
	<view class="global-wrap">
		<view class="course">
			<view class="content">
				<view class="img-wrap">
					<image :src="ossUrl + detail.mainPic" mode="scaleToFill"></image>
				</view>
				<view class="text">
					<view class="title fz-28 fw-500 mb-5 u-line-2 w-420">{{ detail.courName }}</view>
					<view class="tag flex-wrap">
						<view class="mr-10 mb-6" v-for="label in detail.labels">
							<u-tag color="#CB242B" borderColor="#CB242B" size="mini" :text="label" plain shape="circle"></u-tag>
						</view>
					</view>
					<view class="txt color-999 mb-5 u-line-1 w-420">已报名 {{ detail.signupNum }}</view>
				</view>
			</view>

			<view class="c_footer mt-10">
				<view>
					<image class="w-26 h-26 vl-middle mr-10" src="../../../static/images/apple_icon.png" mode=""></image>
					<text style="position: relative; top: 8rpx;" class="w-230 u-line-1 inline-block">{{ detail.shop.managementName }}</text>
				</view>
				<view class="ml-28"></view>
				<view v-if="selectCourse.pay.value === 1" class="color-red fz-32 fw-500 ml-auto">¥{{ selectCourse.subject.allPrice / 100 }}</view>
				<view v-else class="color-red fz-32 fw-500 ml-auto">¥{{ selectCourse.subject.price / 100 }}</view>
			</view>
		</view>
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
			<view>
				<view class="flex-align mt-40 input-box verify-box" :class="{ 'verify-box-err': verify.name }">
					<text class="text4b">姓名</text>
					<input class="phone-input error" placeholder="请输入姓名（必填）" placeholder-style="font-size:28rpx;"
						type="text" maxlength="10" @input="passFun('name')" @blur="passFun('name')"
						v-model="form.name" />
					<text v-if="!form.name" class="error-text">请输入姓名</text>
					<text v-else-if="verify.verifyChineseName" class="error-text">请输入中文</text>
				</view>
				<view class="flex-align mt-60 input-box verify-box" :class="{ 'verify-box-err': verify.idCard }">
					<text class="text4b">身份证号</text>
					<input class="phone-input error" placeholder="请输入您的身份证号（必填）" placeholder-style="font-size:28rpx;"
						type="idcard" maxlength="18" @input="passFun('idCard')" @blur="passFun('idCard')"
						v-model="form.idCard" />
					<text v-if="!form.idCard" class="error-text">请输入您的身份证号</text>
					<text v-else-if="verify.verifyIdCard" class="error-text">请输入正确的身份证号</text>
				</view>
				<view class="flex-align mt-60 input-box verify-box" :class="{ 'verify-box-err': verify.phone || form.verifyPhone }">
					<text class="text4b pr-30">联系电话</text>
					<input
						class="phone-input error wb-70"
						placeholder="请输入联系电话（必填）"
						placeholder-style="font-size:28rpx;"
						type="text"
						@input="passFun('phone')"
						:disabled="!verify.verifyPhone"
						@blur="passFun('phone')"
						v-model="form.phone"
					/>
					<text v-if="!form.phone" class="error-text">请输入手机号</text>
					<text v-else-if="verify.verifyPhone" class="error-text">手机号码不正确，请重新输入</text>
					<text class="verify-code" @tap="verify.verifyPhone = true">
						修改
					</text>
				</view>
				<!-- <view v-if="form.phone != userInfo.phone && !verify.verifyPhone" class="flex-align mt-60 pb-20 input-box"> -->
				<view v-if="verify.verifyPhone" class="flex-align mt-60 pb-20 input-box">
					<text class="text4b">验证码</text>
					<input v-model="smsCode" class="verify-input" placeholder="请输入验证码" placeholder-style="font-size:28rpx;" type="text" />
					<text v-if="!verifyDisabled" class="verify-code" @tap="sendCode">获取验证码</text>
					<text v-else class="verify-code" style="background: #999">{{verifyText}}</text>
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
					<view class="data" v-if="selectCourse.pay.value === 1">全款</view>
					<view class="data" v-else>先缴报名费</view>
				</view>
				<view class="item">
					<view class="title">缴费金额</view>
					<view v-if="selectCourse.pay.value === 1" class="data fw-500 color-red">¥{{ selectCourse.subject.allPrice / 100 }}</view>
					<view v-else class="data fw-500 color-red">¥{{ selectCourse.subject.price / 100 }}</view>
				</view>
			</view>
		</view>
		<view class="lx-btn-wrap lx-btn-90 mt-40">
			<u-button :loading="isLoading" class="lx-btn m-auto" type="primary" text="下一步" @tap="submit"></u-button>
		</view>
		<!-- <view class="lx-btn block mt-40 block wb-80 m-auto" @tap="submit">下一步</view> -->
		<view class="pb-50"></view>
	</view>
</template>

<script>
import { ossUrl } from '@/utils/util.js';
import { mapGetters, mapActions } from 'vuex';
import { debounce } from '@/utils/util.js'
import formRegular from '@/utils/formRegular.js'
export default {
	name: 'confirmApply',
	data() {
		return {
			ossUrl,
			form: {
				name: '',
				idCard: '',
				phone: ''
			},
			isLoading: false,
			smsCode: '',
			verifyDisabled: false,
			verifyText: '',
			verify: {
				name: false,
				verifyChineseName: false,
				idCard: false,
				verifyIdCard: false,
				verifyPhone: false
			},
			detail: {},
			selectCourse: {},
			recommendInfo: {}
		};
	},
	computed: {
		...mapGetters(['userInfo', 'openid', 'smsKey'])
	},
	onLoad(options) {
		const detail = uni.getStorageSync('detail');
		detail.labels = detail.recruitObject.split(',');
		const selectCourse = JSON.parse(options.selectCourse);
		let recommendInfo = JSON.parse(options.recommendInfo);
		this.detail = detail;
		this.selectCourse = selectCourse;
		this.recommendInfo = recommendInfo;
		// seniorPartnerCommission seniorPartnerId seniorPartnerName
		if (this.recommendInfo.seniorPartnerCommission == null || this.recommendInfo.seniorPartnerCommission == 'undefined') {
			delete this.recommendInfo.seniorPartnerCommission
		}
		if (this.recommendInfo.seniorPartnerId == null || this.recommendInfo.seniorPartnerId == 'undefined') {
			delete this.recommendInfo.seniorPartnerId
		}
		if (this.recommendInfo.seniorPartnerName == null || this.recommendInfo.seniorPartnerName == 'undefined') {
			delete this.recommendInfo.seniorPartnerName
		}
		this.form.phone = this.userInfo.phone;
		// console.log(detail)
		// console.log(selectCourse)
		console.log('recommendInfo: ', recommendInfo);
		console.log('options: ', options);
	},
	methods: {
		...mapActions({
			async sendCode(commit) {
				if (!this.form.phone) return this.$util.showToast('手机号码不能为空')
				const reg = /^(?:(?:\+|00)86)?1\d{10}$/
				if (!reg.test(this.form.phone)) return this.$util.showToast('手机号码不正确')
				this.verifyDisabled = true
				let timer = null
				if (timer <= 0) timer = null
				let countdown = 60
				this.verifyText = '重发'+countdown+'秒'
				timer = setInterval(() => {
					countdown--
					this.verifyText = '重发'+countdown+'秒'
					if (countdown <= 0) {
					  clearInterval(timer)
					  this.verifyText = '获取验证码'
					  this.verifyDisabled = false
					}
				}, 1000)
				await commit('SEND_CODE', this.form.phone);
			},
			submit: debounce(function (commit) {
				if (!this.form.name || this.verify.name) return this.$util.showToast('请输入姓名');
				if (!this.form.idCard || this.verify.idCard) return this.$util.showToast('请输入身份证号');
				if (!this.form.phone) return this.$util.showToast('请输入手机号');
				if (this.form.phone != this.userInfo.phone && !this.smsCode) return this.$util.showToast('请输入验证码');
				// if (!this.smsCode) return this.$util.showToast('请输入验证码');
				this.isLoading = true
				const smsParams = {
					smsKey: this.smsKey,
					smsCode: this.smsCode,
					callback: (flag) => {
						console.log('回调验证码状态: ', flag)
						if (flag) {
							this.submitRegister()
						} else {
							this.isLoading = false
						}
					}
				}
				if (!this.form.phone) {
					commit('VERIFY_CODE', smsParams);
				}
				this.submitRegister()
			}, 300)
		}),
		submitRegister () {
			const detail = JSON.stringify(this.detail);
			const selectCourse = JSON.stringify(this.selectCourse);
			const form = JSON.stringify(this.form);
			// this.$util.showLoading();
			const params = {
				payMethod: this.selectCourse.payIndex === 0 ? 0 : 1, //（0：先缴纳报名费，1：全款）
				...this.form,
				buyerAccount: this.userInfo.account,
				buyerId: this.userInfo.id,
				buyerNickname: this.userInfo.nickname,
				buyerPhone: this.userInfo.phone,
				payAmount: this.selectCourse.subject.price,
				mechId: this.detail.mechId,
				mechName: this.detail.mechName,
				shopId: this.detail.shopId,
				shopName: this.detail.shopName,
				degreeType: 0,
				orderItems: [
					{
						businessId: this.detail.businessId,
						...this.recommendInfo,
						courId: this.detail.id,
						courName: this.detail.courName,
						courCode: this.detail.courCode,
						// businessId: this.detail.businessId,
						price: this.selectCourse.subject.price,
						allPrice: this.selectCourse.subject.allPrice,
						// allPrice: this.selectCourse.payIndex === 0 ? this.selectCourse.subject.price : this.selectCourse.subject.allPrice,
						schoolId: this.detail.schoolId,
						schoolName: this.detail.schoolName,
						studyId: this.detail.studyId,
						gradeId: this.detail.gradeId,
						gradeName: this.detail.gradeName,
						courInfoId: this.selectCourse.subject.id,
						subjectId: this.selectCourse.subject.subjectId,
						subjectName: this.selectCourse.subject.subjectName
					}
				]
			};
			this.$http
				.post('stuh5/order/register', params)
				.then(res => {
					if (res.code === 200) {
						console.log('提交订单');
						let orderInfo = res.data.orderItems[0];
						orderInfo.orderStatus = 0
						const orderInfoStr = JSON.stringify(orderInfo)
						
						this.$util.showToast('提交订单成功');
						setTimeout(() => {
							uni.navigateTo({
								url: `../orderConfirm/orderConfirm?detail=${detail}&selectCourse=${selectCourse}&form=${form}&orderInfo=${orderInfoStr}`
							});
						}, 2000);
					} else {
						this.$util.showToast(res.msg);
					}
					setTimeout(() => {
						this.isLoading = false
					}, 3000)
					// this.$util.hideLoading();
				})
				.catch(err => {
					console.log(err);
					this.isLoading = false
					// this.$util.hideLoading();
				});
		},
		passFun(name) {
			if (!this.form[name]) {
				this.verify[name] = true;
			} else {
				this.verify[name] = false;
			}
			console.log(this.form[name])
			// 姓名验证
			if (this.form[name] && name === 'name') {
				// 是否全中文
				if (formRegular('chinese',this.form[name])) {
					this.verify[name] = false;
					this.verify.verifyChineseName = false;
				} else {
					this.verify[name] = true;
					this.verify.verifyChineseName = true;
				}
			}
			// 身份证验证 
			if (this.form[name] && name === 'idCard') {
				if (formRegular('idCard',this.form[name])) {
					this.verify[name] = false;
					this.verify.verifyIdCard = false;
				} else {
					this.verify[name] = true;
					this.verify.verifyIdCard = true;
				}
			}
			if (name === 'phone') {
				if (formRegular('phone',this.form[name])) {
					this.verify[name] = false;
				} else {
					this.verify[name] = true;
				}
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.course {
	padding: 20rpx;
	background-color: #fff;
	margin-bottom: 20rpx;
	.content {
		display: flex;
		.img-wrap {
			width: 311rpx;
			height: 190rpx;
			margin-right: 20rpx;
			margin-top: 8rpx;
			image {
				width: 100%;
				height: 100%;
			}
		}
		.tag {
			display: flex;
			margin: 10rpx 0;
			.failure {
				border-radius: 40rpx;
				padding: 5rpx 16rpx;
				color: #999;
				background-color: #f2f2f2;
			}
		}
		.refund-money {
			display: flex;
			justify-content: flex-end;
			align-items: center;
		}
	}
	.c_footer {
		color: #7f7f7f;
		font-size: 24rpx;
		display: flex;
		align-items: center;
	}
}
.input-box {
	// width: 98%;
	padding: 0 10rpx;
}

.phone-input {
	border-bottom: 1rpx solid #f2f2f2;
	margin-left: 10rpx;
	padding: 4rpx 20rpx;
	width: 88%;
	font-size: 14px;
	line-height: 56rpx;
	height: 56rpx;
}

.icon-before {
	width: 32rpx;
	height: 42rpx;
}

.phohe-login {
	color: #fff;
	background-color: #bc292d;
	border-radius: 100rpx;
}

.verify-input {
	border-bottom: 1rpx solid #f2f2f2;
	margin-right: 30rpx;
	padding: 4rpx 20rpx;
	line-height: 56rpx;
	height: 56rpx;
	font-size: 24rpx;
	width: 56%;
}

.text4b {
	font-size: 28rpx;
	width: 170rpx;
	color: #999;
}

.verify-box {
	position: relative;
}

.verify-box-err .error {
	background-color: rgba(235, 9, 9, 0.1);
	border: 2rpx solid #bc292d;
	border-radius: 8rpx;
}

.verify-box .error-text {
	display: none;
	position: absolute;
	bottom: -40rpx;
	left: 160rpx;
	font-size: 24rpx;
	color: #eb0909;
}

.verify-box-err .error-text {
	display: inline-block;
}

.verify-code {
	background-color: #e64949;
	color: #fff;
	padding: 10rpx;
	display: inline-block;
	font-size: 24rpx;
	border-radius: 30rpx;
	width: 180rpx;
	height: 40rpx;
	line-height: 40rpx;
	text-align: center;
}
</style>
