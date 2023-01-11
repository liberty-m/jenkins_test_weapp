<template>
	<view class="global-wrap brand">
		<view class="banner">
			<!-- <image :src="ossUrl + brand.mechanismLogo" mode=""></image> -->
			<image src="/static/images/brand_banner.png" mode=""></image>
		</view>
		<view class="institution">
			<image class="w-200" :src="ossUrl + brand.mechanismLogo" @tap="previewImage([ossUrl + brand.mechanismLogo])"
				mode="scaleToFill"></image>
			<view class="ins-name">
				<text class="fz-32 fw-500 mb-10">{{ brand.managementName }}</text>
				<text class="fz-24 u-line-2">{{ brand.mechanismInstroduce }}</text>
			</view>
		</view>
		<view class="story brand-space" v-if="brand.content">
			<view class="fz-28 fw-500 mb-10">品牌故事</view>
			<view class="content">
				<u-read-more closeText="查看更多" showHeight="180" :toggle="true" ref="uReadMore" color="#999999"
					textIndent="0">
					<rich-text :nodes="brand.content"></rich-text>
				</u-read-more>
			</view>
		</view>
		<!-- <view class="features brand-space">
			<view class="fz-28 fw-500 mb-20">办学特色</view>
			<view class="wrap">
				<view class="item" v-for="item in brand.bxts">
					<view class="circle"></view>
					<view>{{ item }}</view>
				</view>
			</view>
		</view> -->
		<view class="honor brand-space" v-if="mechImageList1 && mechImageList1.length">
			<view class="fz-28 fw-500 mb-20">荣誉资质({{ mechImageList1.length }})</view>
			<u-scroll-list indicatorActiveColor="#CB242B" :indicator="false">
				<view class="scroll-list" style="flex-direction: row;">
					<view class="scroll-list__goods-item" v-for="(item, index) in mechImageList1" :key="index"
						:class="[index === 9 && 'scroll-list__goods-item--no-margin-right']">
						<image class="scroll-list__goods-item__image" :src="ossUrl + item.imageUrl"
							@tap="previewImage(mechImageList1, index, true)"></image>
						<text class="scroll-list__goods-item__text u-line-1">{{ item.name }}</text>
					</view>
				</view>
			</u-scroll-list>
		</view>

		<view @click="lookQualifications" class="qualification brand-space flex flex-align flex-between">
			<view class="fz-28 fw-500">经营资质</view>
			<u-icon name="arrow-right"></u-icon>
			<!-- <view class="history-list">
				<view class="content">
					<view class="pb-10 item">
						<view class="title">企业名称</view>
						<text class="u-line-1 inline-block w-420">{{ brand.businessName }}</text>
					</view>
					<view class="pb-10 item">
						<view class="title">证件号码</view>
						<text>{{ brand.businessAccount }}</text>
					</view>
					<view class="pb-10 upload item">
						<view class="title">营业执照</view>
						<image :src="ossUrl + brand.businessPhotos" @tap="previewImage([ossUrl + brand.businessPhotos])"
							mode="aspectFill"></image>
					</view>
					<view v-if="mechImageList2.length" class="upload item">
						<view class="title">办学许可({{ mechImageList2.length }})</view>
					</view>
				</view>
				<view v-if="mechImageList2.length" class="img-preview">
					<u-scroll-list indicatorActiveColor="#CB242B" :indicator="false">
						<view class="scroll-list" style="flex-direction: row;">
							<view class="scroll-list__goods-item" v-for="(item, index) in mechImageList2" :key="index"
								:class="[index === 9 && 'scroll-list__goods-item--no-margin-right']">
								<image class="scroll-list__goods-item__image" :src="ossUrl + item.imageUrl"
									@tap="previewImage(mechImageList2, index, true)"></image>
							</view>
						</view>
					</u-scroll-list>
				</view>
			</view> -->
		</view>

		<view class="localtion brand-space">
			<merchant-location :merchant="brand" />
		</view>
		<u-popup :show="qualificationsPopupShow" round="16" closeable @close="qualificationsPopupClose">
			<view class="qualificationsPopup">
				<view class="text-center title">查看经营资质</view>
				<view class="code-box">
					<view class="tips">请输入校验码查看证照信息</view>
					<view class="flex">
						<input v-model="inputCode" maxlength="4" type="number" class="code-input" placeholder="请输入验证码">
						<view hover-class="u-hover-class" @tap="getCode" class="get-code-text">
							<text class="fz-32" style="color: #333333;">{{String(code).slice(0,1)}}</text>
							<text class="fz-32" style="color: #2E9F9B;">{{String(code).slice(1,2)}}</text>
							<text class="fz-24" style="color: #AB7647;">{{String(code).slice(2,3)}}</text>
							<text class="fz-24" style="color: #BC292D;">{{String(code).slice(3)}}</text>
						</view>
					</view>
				</view>
				<view @tap="toQualifications" class="ver-code-btn">确定</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {
		ossUrl
	} from '@/utils/util.js'
	import merchantLocation from '@/components/busi/merchantLocation.vue';
	export default {
		components: {
			merchantLocation
		},
		data() {
			return {
				qualificationsPopupShow: false,
				ossUrl,
				content: '大宝贝科技股份有限黎明大学猎学教育中心是黎明职业大学继续教育学院与猎学网共同组建的成人继续教育学习的教育中心,中心秉持“以服务为宗网共同组建的成人继续教育黎育明续教育黎育',
				navList: [{
						thumb: 'https://cdn.uviewui.com/uview/goods/1.jpg',
						name: '2021年度德国iF设计大奖2021年度德国iF设计大奖'
					},
					{
						thumb: 'https://cdn.uviewui.com/uview/goods/2.jpg',
						name: '2021年度德国iF设计大奖2021年度德国iF设计大奖'
					},
					{
						thumb: 'https://cdn.uviewui.com/uview/goods/3.jpg',
						name: '2021年度德国iF设计大奖2021年度德国iF设计大奖'
					},
					{
						thumb: 'https://cdn.uviewui.com/uview/goods/4.jpg',
						name: '2021年度德国iF设计大奖2021年度德国iF设计大奖'
					},
					{
						thumb: 'https://cdn.uviewui.com/uview/goods/5.jpg',
						name: '2021年度德国iF设计大奖2021年度德国iF设计大奖'
					}
				],
				brand: {},
				mechImageList1: [],
				mechImageList2: [],
				code:'',
				inputCode:'',
				brandId:''
			};
		},
		onLoad(options) {
			setTimeout(() => {
				// this.content = `山不在高，有仙则名。水不在深，有龙则灵。斯是陋室，惟吾德馨。
				// 苔痕上阶绿，草色入帘青。谈笑有鸿儒，往来无白丁。可以调素琴，阅金经。
				// 无丝竹之乱耳，无案牍之劳形。南阳诸葛庐，西蜀子云亭。孔子云：何陋之有？`,
				this.$nextTick(() => {
					this.$refs.uReadMore.init();
				});
			}, 2000);
			this.brandId = options.id;
			this.getBrandDetail(options.id);
		},
		methods: {
			codeChange(text) {
				this.tips = text;
			},
			getCode() {
				this.code = Math.floor(Math.random()*9000)+1000
			},
			qualificationsPopupClose() {
				this.qualificationsPopupShow = false;
			},
			lookQualifications() {
				this.getCode()
				this.qualificationsPopupShow = true;
			},
			toQualifications() {
				if(!this.inputCode){
					uni.showToast({
						title:'请输入验证码',
						icon:'none'
					})
					return
				}
				if(this.inputCode == this.code){
					this.inputCode = '';
					this.qualificationsPopupClose()
					uni.navigateTo({
						url: '/pages_ani/institution/brandQualification/qualificationsDetail?id=' + this.brandId
					})
				}else{
					uni.showToast({
						title:'验证码错误',
						icon:'none'
					})
				}
			},
			previewImage(urls, current, flag) {
				const imgs = urls.map(v => ossUrl + v.imageUrl)
				uni.previewImage({
					urls: flag ? imgs : urls,
					current
				});
			},
			getBrandDetail(id) {
				this.$util.showLoading();
				this.$http
					.post('stuh5/mech/brandDetail', {
						id
					})
					.then(res => {
						if (res.code === 200) {
							console.log(res);
							console.log(res.data.mechImageList.filter(v => v.type == 1))
							this.mechImageList1 = res.data.mechImageList.filter(v => v.type == 1)
							this.mechImageList2 = res.data.mechImageList.filter(v => v.type == 2)
							this.brand = res.data;
							this.brand.bxts = this.brand.bxts.split(',');
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
			}
		}
	};
</script>

<style lang="scss">
	.brand-space {
		padding: 20rpx 40rpx;
		background-color: #fff;
		margin-top: 15rpx;
	}

	.scroll-list {
		@include flex(column);

		&__goods-item {
			margin-right: 40rpx;
			text-align: center;

			&__image {
				width: 228px;
				height: 142px;
				// border-radius: 8rpx;
			}

			&__text {
				text-align: center;
				font-size: 24rpx;
				margin-top: 10rpx;
				width: 450rpx;
				display: inline-block;
			}
		}
	}

	.brand {
		.banner {
			image {
				width: 100%;
				height: 216rpx;
				// filter: blur(16px);
			}
		}

		.institution {
			display: flex;
			height: 170rpx;
			background-color: #fff;
			padding: 20rpx 40rpx;

			image {
				height: 194rpx;
				margin-right: 30rpx;
				position: relative;
				top: -60rpx;
				box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 12px 0 rgba(0, 0, 0, 0.19);
				border-radius: 8rpx;
			}

			.ins-name {
				display: flex;
				flex-direction: column;
				flex: 1;
			}
		}

		.story {
			.content {
				padding: 10rpx 20rpx;
				font-size: 28rpx;
				line-height: 50rpx;
			}
		}

		.features {
			.wrap {
				display: flex;
				flex-wrap: wrap;

				.item {
					width: 300rpx;
					display: flex;
					align-items: center;
					color: #999;
					font-size: 28rpx;
					margin-bottom: 10rpx;

					.circle {
						width: 8rpx;
						height: 8rpx;
						border-radius: 50%;
						margin-right: 20rpx;
						background-color: $color-red;
					}
				}
			}
		}

		.qualification {
			.history-list {
				// margin-bottom: 0rpx;
				font-size: 28rpx;

				.content {
					background-color: #fff;
					border-radius: 16rpx;
					padding: 20rpx;
					margin-top: 30rpx;
					position: relative;
					color: #999;

					text {
						color: #333;
					}

					.item {
						display: flex;
						margin-bottom: 15rpx;

						.title {
							width: 160rpx;
						}
					}

					&::after {
						content: '';
						position: absolute;
						left: 32rpx;
						top: -12rpx;
						width: 0;
						height: 0;
						border-left: 12rpx solid transparent;
						border-right: 12rpx solid transparent;
						border-bottom: 12rpx solid #fff;
					}

					.upload {
						display: flex;

						image {
							width: 426rpx;
							height: 308rpx;
							// border-radius: 8rpx;
						}
					}
				}
			}
		}

		.localtion {
			padding-bottom: 40rpx;
		}
	}

	.qualificationsPopup {
		height: 600rpx;

		.title {
			height: 90rpx;
			line-height: 90rpx;
			font-size: 32rpx;
			color: #333333;
			font-weight: bold;
		}

		.code-box {
			margin: 90rpx 120rpx 0;

			.tips {
				color: #333333;
				font-size: 28rpx;
				font-weight: 400;
				margin-bottom: 60rpx;
			}

			.code-input {
				width: 320rpx;
				height: 52rpx;
				border-bottom: 1px solid #7F7F7F;
				padding-left: 32rpx;
			}

			.get-code-text {
				margin-left: 46rpx;
				text-align: center;
				line-height: 52rpx;
				width: 156rpx;
				height: 52rpx;
				border-radius: 40rpx;
				color: #000;
				font-size: 24rpx;
				border: 1px solid #BC292D;
				letter-spacing: 6rpx;
			}
		}

		.ver-code-btn {
			width: 628rpx;
			height: 84rpx;
			background: #BC292D;
			border-radius: 56rpx;
			font-size: 32rpx;
			color: #FFFFFF;
			text-align: center;
			line-height: 84rpx;
			margin: 102rpx auto 0 auto;
			
		}
	}
</style>
