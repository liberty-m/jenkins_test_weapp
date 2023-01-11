<template>
	<view class="container">
		<view class="info">
			<view class="item">
				<view>商户编号：</view>
				<view>{{detailData.merchantNo}}</view>
			</view>
			<view class="item">
				<view>终端号：</view>
				<view>{{detailData.terminalNo}}</view>
			</view>
			<view class="item" v-if="detailData.business == 1">
				<view>{{detailData.business == 1 ? "院校名称：" : "中心名称："}}</view>
				<view v-if="detailData.business == 2">{{detailData.entryAccountName == -1 ? '' : detailData.entryAccountName}}</view>
				<view v-if="detailData.business == 1">{{detailData.schoolName == -1 ? '' : detailData.schoolName}}</view>
			</view>
			<view class="item" v-if="detailData.business == 2">
				<view>{{detailData.business == 1 ? "院校名称：" : "中心名称："}}</view>
				<view>{{detailData.centerName == -1 ? '' : detailData.centerName}}</view>
			</view>
			<view class="item">
				<view>金额：</view>
				<view>{{detailData.amount / 100}} 元</view>
			</view>
			<view class="item">
				<view>负责人：</view>
				<view>{{detailData.personName == -1 ? '' : detailData.personName}}</view>
			</view>
			<view class="item">
				<view>二维码标题：</view>
				<view>{{detailData.qrCodeTile == -1 ? '' : detailData.qrCodeTile}}</view>
			</view>
			<view class="item">
				<view>备注：</view>
				<view>{{detailData.remark == -1 ? '' : detailData.remark}}</view>
			</view>
			<view class="item">
				<view>二维码：</view>
				<view></view>
			</view>
		</view>
		<view class="qrimg">
			<view class="qrimg-i">
				<!-- <view class="fz-36 text-center fw-500 mb-30">{{detailData.schoolName}}</view> -->
				<image :src="prevData.qrCodeUrl" style="width: 220px"></image>
				<!-- <tki-qrcode v-if="ifShow" cid="qrcode1" ref="qrcode" :val="val" :size="size" :unit="unit" :icon="icon"
					:iconSize="iconsize" :lv="lv" :onval="onval" :loadMake="loadMake" :usingComponents="true"
					@result="qrR" /> -->
			</view>
		</view>
		
		<view class="fw-500 fz-32 mt-20" v-if="detailData.business == 1">已配置年级专业信息</view>
		<view class="mt-20 config-info" v-if="detailData.business == 1">
			<view class="fz-30 fw-500 title">
				<view>年级</view>
				<view>专业</view>
			</view>
			<view class="fz-28 mt-40 content" v-for="item in detailData.entrySetDetailList">
				<view>{{item.gradeName}}</view>
				<view>{{item.subjectName}}</view>
			</view>
		</view>
		<view style="padding-bottom: 140px;"></view>
		
		<view class="lx-btn-wrap lx-btn-80" style="position: fixed;bottom: 30px;left: 0;width: 100%;">
			<u-button style="position: relative; top: 40rpx;" class="lx-btn block wb-88 m-auto mt-50 lt-s-4 fz-32" type="primary" text="下载二维码" @tap="downloadQrcode"></u-button>
		</view>
		
	</view>
</template>
<script>
import tkiQrcode from 'tki-qrcode';
import wchat from '@/static/wx.png';
export default {
	components: {
		tkiQrcode
	},
	data() {
		return {
			ifShow: true,
			val: '二维码', // 要生成的二维码值
			size: 400, // 二维码大小
			unit: 'upx', // 单位
			// background: '#b4e9e2', // 背景色
			// foreground: '#309286', // 前景色
			// pdground: '#32dbc6', // 角标色
			icon: wchat, // 二维码图标
			iconsize: 40, // 二维码图标大小
			lv: 3, // 二维码容错级别 ， 一般不用设置，默认就行
			onval: false, // val值变化时自动重新生成二维码
			loadMake: true, // 组件加载完成后自动生成二维码
			src: '', // 二维码生成后的图片地址或base64
			detailData: {},
			detailId: '',
			prevData: {}
		};
	},
	onLoad(query) {
		const detailData = JSON.parse(query.data);
		console.log(detailData);
		this.prevData = detailData;
		this.detailId = detailData.id
		uni.setNavigationBarTitle({
			title: detailData.schoolName != -1 ? detailData.schoolName : '收款详情'
		});
		this.getDetail()
	},
	methods: {
		getDetail() {
			this.$util.showLoading();
			const params = {
				id: this.detailId
			};
			this.$http
				.post('fcs/entry/set/detail', params)
				.then(res => {
					if (res.code === 10000) {
						this.detailData = res.object.info
					} else {
						this.$util.showToast(res.message);
					}
					this.$util.hideLoading();
				})
				.catch(err => {
					console.log(err);
					this.$util.hideLoading();
				});
		},
		downloadQrcode (){
			const qrCodeUrl = this.detailData.qrCodeUrl
			const _self = this
			uni.downloadFile({
				url: qrCodeUrl,
				success: (res) => {
					if (res.statusCode === 200) {
						console.log('下载成功: ', res);
						let a = document.createElement('a')
						a.download = `${_self.detailData.qrCodeTile}_${_self.detailData.amount}元二维码.jpg`
						a.href = res.tempFilePath
						a.click()
						a.remove()
					}
				}
			});
		},
		sliderchange(e) {
			this.size = e.detail.value;
		},
		creatQrcode() {
			this.$refs.qrcode._makeCode();
		},
		saveQrcode() {
			this.$refs.qrcode._saveCode();
		},
		qrR(res) {
			this.src = res;
		},
		clearQrcode() {
			this.$refs.qrcode._clearCode();
			this.val = '';
		},
		ifQrcode() {
			this.ifShow = !this.ifShow;
		},
		selectIcon() {
			let that = this;
			uni.chooseImage({
				count: 1, //默认9
				sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album'], //从相册选择
				success: function(res) {
					that.icon = res.tempFilePaths[0];
					setTimeout(() => {
						that.creatQrcode();
					}, 100);
					// console.log(res.tempFilePaths);
				}
			});
		}
	},
	components: {
		tkiQrcode
	}
};
</script>

<style lang="scss">
/* @import "../../../common/icon.css"; */
.container {
	display: flex;
	flex-direction: column;
	width: 100%;
	padding: 10px;
	.info {
		.item {
			display: flex;
			align-items: center;
			margin-bottom: 10rpx;
			view:first-child {
				width: 240rpx;
				font-size: 36rpx;
				text-align: right;
			}
			view:last-child {
				font-size: 28rpx;
			}
		}
	}
	.config-info {
		.title {
			display: flex;
			text-align: center;
			view:first-child {
				width: 45%;
				// background-color: red;
			}
			view:last-child {
				width: 55%;
				// background-color: green;
			}
			// justify-content: space-between;
		}
		.content {
			display: flex;
			text-align: center;
			view:first-child {
				width: 45%;
				// background-color: red;
			}
			view:last-child {
				width: 55%;
				// background-color: green;
			}
		}
		
	}
}

.qrimg {
	display: flex;
	justify-content: center;
	margin: 10px 0 0 60px;
	/* margin-top: 60px; */
}

.qrimg-i {
	margin-right: 10px;
}

slider {
	width: 100%;
}

input {
	width: 100%;
	margin-bottom: 20upx;
}

.btns {
	display: flex;
	flex-direction: column;
	width: 100%;
}

button {
	width: 100%;
	margin-top: 10upx;
}
</style>
