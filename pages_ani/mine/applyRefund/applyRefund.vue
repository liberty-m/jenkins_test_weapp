<template>
	<view class="global-wrap apply-refund">
		<view class="mb-20">
			<graphic-list show-type="detail" :detail="detail"></graphic-list>
		</view>
		<view class="cell">
			<view class="row">
				<view class="fz-28 fw-500">退款金额</view>
				<view>
					<view class="price">
						<view v-if="isUpdateAmount" class="color-red fz-28 fw-500" style="font-size: 16px;">¥ {{editPayAmount}}</view>
						<view v-else class="color-red fz-28 fw-500" style="font-size: 16px;">¥ {{detail.payAmount / 100}}</view>
						<view class="iconfont color-999 ml-10 mr-10 icon-bianji" style="font-size: 14px !important;" @tap="handleShowModal"></view>
						<view class="fz-20 color-999" style="font-size: 14px !important;" @tap="handleShowModal">修改</view>
					</view>
					<view class="fz-20">可修改，最多可退￥{{detail.payAmount / 100}}元，详情可咨询店家</view>
				</view>
			</view>
			<view class="c-line"></view>
			<view class="row" @tap="showPicker = true">
				<view class="fz-28 fw-500">退款原因</view>
				<view class="color-999 fz-28">
					{{selectPickerData.name ? selectPickerData.name : '请选择（必填）'}}
					<text class="iconfont icon-youjiantou_huaban"></text>
				</view>
			</view>
		</view>
		<view class="instruction">
			<view class="fz-28 fw-500 mb-20">补充说明</view>
			<view><u--textarea v-model="remark" height="110" count maxlength="200" placeholder="补充说明，有助于更好的处理售后问题~" border="surround"></u--textarea></view>
		</view>
		<view class="upload mt-16 pl-20 pr-20 pb-20 pt-20">
			<view class="fz-28 fw-500 mb-20">上传凭证</view>
			<view>
				<u-upload :fileList="fileList1" :previewFullImage="false" @afterRead="afterRead" @delete="deletePic" name="1" :maxCount="1">
					<!-- <image src="../../../static/images/upload-bg.png" 
						mode="widthFix" class="w-144 h-144"></image> -->
				</u-upload>
			</view>
		</view>
		<view class="pb-150"></view>
		<view class="action">
			<view class="left">
				<!-- <view class="wrap">
					<view class="iconfont icon-paimaizixun fz-46"></view>
					<view>咨询</view>
				</view> -->
				<view class="wrap" @tap="callPhone">
					<view class="iconfont icon-dianhua fz-46"></view>
					<view>电话</view>
				</view>
			</view>
			<view class="lx-btn-wrap">
				<u-button :loading="isLoading" class="lx-btn" type="primary" text="提交" @tap="submit"></u-button>
			</view>
			<!-- <view class="lx-btn" @tap="submit">提交</view> -->
		</view>
		
		<u-modal :show="showModal"
				 closeOnClickOverlay
				 title="修改金额"
				 showCancelButton
				 confirmColor="#CB242B"
				 @cancel="close"
				 @close="close"
				 @confirm="confirmUpdate">
			<view class="slot-content">
				<u--input
				    placeholder="请输入要修改的金额"
				    border="surround"
					type="number"
				    v-model="editPayAmount"
					@input="handleInputAmount"
				  ></u--input>
				<!-- <rich-text :nodes="content"></rich-text> -->
			</view>
		</u-modal>
		<u-picker
			:show="showPicker"
			@close="showPicker = false"
			@cancel="showPicker = false"
			closeOnClickOverlay
			ref="refundPicker"
			keyName="name"
			confirmColor="#BC292D"
			:columns="refundColumns"
			@confirm="(e) => pickerConfirm(e, 'refund')">
		</u-picker>
	</view>
</template>

<script>
import { mapGetters } from 'vuex'
import { debounce } from '@/utils/util.js'
import baseUrl from '@/utils/request/baseUrl.js'
import graphicList from '@/pages_ani/components/busi/graphicList.vue'
export default {
	components: { graphicList },
	data() {
		return {
			remark: '',
			fileList1: [],
			detail: {},
			isLoading: false,
			isUpdateAmount: false,
			showPicker: false,
			showModal: false,
			selectPickerData: {},
			refundColumns: [],
			editPayAmount: '',
			isUploadSuccess: false,
		};
	},
	computed: {
		...mapGetters(['userInfo', 'dicMap'])
	},
	onReady() {
	},
	onLoad(options) {
		console.log('申请退款', options)
		this.detail = JSON.parse(options.detail)
		this.from = options.from
		this.editPayAmount = this.detail.payAmount / 100
		console.log(this.detail)
		this.refundColumns = [this.dicMap.orderRefundReason]
	},
	methods: {
		close () {
			this.editPayAmount = this.detail.payAmount / 100
			this.showModal = false
		},
		handleShowModal () {
			this.showModal = true
		},
		confirmUpdate () {
			const editAmount = this.editPayAmount
			const payAmount = this.detail.payAmount / 100
			if (!editAmount) return this.$util.showToast('请输入要修改的金额')
			if (editAmount > payAmount) {
				return this.$util.showToast('修改的金额不能大于支付金额')
			}
			this.isUpdateAmount = true
			this.showModal = false
			// setTimeout(() => {
			// 	this.isUpdateAmount = false
			// }, 500)
		},
		handleInputAmount (value) {
			// this.editPayAmount = value
		},
		pickerConfirm (e, type) {
			console.log(e, type)
			this.selectPickerData = e.value[0]
			console.log(this.selectPickerData)
			this.showPicker = false
		},
		callPhone () {
			uni.makePhoneCall({
				phoneNumber: '4000-360-980'
			})
		},
		submit: debounce(function () {
			if (!this.selectPickerData.name) return this.$util.showToast('请选择退款原因')
			if (!this.remark) return this.$util.showToast('请填写补充说明')
			// if (!this.fileList1.length) return this.$util.showToast('请上传凭证')
			if (this.fileList1.length) {
				if (!this.isUploadSuccess) return this.$util.showToast('凭证上传中')
			}
			// this.$util.showLoading()
			this.isLoading = true
			const { id, orderItems, payMethod, orderStatus } = this.detail
			const imgs = this.fileList1.map(v => v.url).join(';')
			const params = {
				orderId: id,
				orderItemId: orderItems[0].id,
				userId: this.userInfo.id,
				userType: 0,
				// userType: this.userInfo.type,
				operateType: 0,
				type: orderStatus === 1 ? 0 : 1,
				picVoucher: imgs,
				remark: this.remark,
				refundReason: this.selectPickerData.value,
				amount: this.editPayAmount * 100
			}
			console.log('params: ', params)
			this.$http
				.post('stuh5/order/applyRefund', params)
				.then(res => {
					if (res.code === 200) {
						console.log('退款：', res);
						// const data = res.data;
						this.$util.showToast('提交申请退款成功');
						setTimeout(() => {
							if (this.from === 'detail') {
								uni.navigateBack({
									delta: 2
								})
							} else {
								uni.navigateBack({
									delta: 1
								})
							}
						}, 2000)
					} else {
						// this.$util.hideLoading();
						this.$util.showToast(res.msg);
					}
					setTimeout(() => {
						this.isLoading = false
					}, 3000)
				})
				.catch(err => {
					console.log(err);
					// this.$util.hideLoading();
					this.isLoading = false
				});
		}, 300),
		// 删除图片
		deletePic(event) {
			this[`fileList${event.name}`].splice(event.index, 1);
			console.log('delete: ', this.$data)
		},
		// 新增图片
		async afterRead(event) {
			// 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
			let lists = [].concat(event.file);
			console.log(this.$data)
			let fileListLen = this[`fileList${event.name}`].length;
			lists.map(item => {
				this[`fileList${event.name}`].push({
					...item,
					status: 'uploading',
					message: '上传中'
				});
			});
			for (let i = 0; i < lists.length; i++) {
				const result = await this.uploadFilePromise(lists[i].thumb);
				let item = this[`fileList${event.name}`][fileListLen];
				this[`fileList${event.name}`].splice(
					fileListLen,
					1,
					Object.assign(item, {
						status: 'success',
						message: '',
						url: result
					})
				);
				fileListLen++;
			}
			setTimeout(() => {
				this.isUploadSuccess = true
			}, 500)
		},
		uploadFilePromise(url) {
			this.isUploadSuccess = false
			return new Promise((resolve, reject) => {
				let a = uni.uploadFile({
					url: baseUrl + 'oss/upload',
					filePath: url,
					name: 'file',
					formData: {
						pathType: 14,
					},
					success: res => {
						const data = JSON.parse(res.data)
						setTimeout(() => {
							resolve(data.data.savePath);
						}, 1000);
					}
				});
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.apply-refund {
	.cell {
		.row {
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 80rpx;
			.price {
				display: flex;
				justify-content: flex-end;
				align-items: center;
			}
		}
		.c-line {
			border-bottom: 1rpx solid #ececec;
			width: 90%;
			margin: 0 auto;
			padding: 10rpx 0;
		}

		padding: 20rpx;
		background-color: #fff;
	}
	.instruction {
		padding: 20rpx;
		background-color: #fff;
		margin-top: 16rpx;
		/deep/ .u-textarea {
			background-color: #fbfbfb;
			border-color: #f2f2f2 !important;
			border-radius: 20rpx !important;
		}
		/deep/ .input-placeholder {
			font-size: 28rpx;
			color: #999;
		}
		/deep/ .u-textarea__count {
			color: #999;
			background-color: initial !important;
		}
	}
	.upload {
		background-color: #fff;
	}
	.action {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		height: 110rpx;
		line-height: 100rpx;
		border-top: 1px solid #f2f2f2;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: #fff;
		padding: 0 30rpx;
		.left {
			display: flex;
			.wrap {
				height: 110rpx;
				view:first-child {
					height: 40rpx;
					margin-right: 40rpx;
					margin-bottom: 5rpx;
					margin-top: 15rpx;
				}
				display: flex;
				flex-direction: column;
				justify-content: center;
			}
		}
	}
}
</style>
