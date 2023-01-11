<template>
	<view class="page-box">
		<view class="flex  mb-32">
			<view class="c999 fz-28 flex-shrink0">企业名称</view>
			<view class="ml-32 c333 fz-28">{{brand.businessName}}</view>
		</view>
		<view class="flex  mb-32">
			<view class="c999 fz-28 flex-shrink0">证件号码</view>
			<view class="ml-32 c333 fz-28">{{brand.businessAccount}}</view>
		</view>
		<view v-if="businessPhotos">
			<view class="c999 fz-28 mb-24 flex-shrink0">营业执照</view>
			<view class="img-box">
				<u-image  width="100%" class="img-opacity" @click="brandPreviewImage(0)" :src="businessPhotos"
					mode="widthFix"></u-image>
			</view>
		</view>
		<view v-if="mechImageJyList && mechImageJyList.length>0">
			<view class="c999 fz-28 mb-24 mt-32 flex-shrink0">办学许可</view>
			<view v-for="(item,index) in mechImageJyList" class="img-box" :key="index">
				<u-image width="100%" class="img-opacity" @click="brandPreviewImage(index+1)"  :src="item" mode="widthFix"></u-image>
			</view>
		</view>
		<view v-if="tnWaterMaterShow" class="tnWaterMater">
			<tnWaterMater @pBackImage="backImage" ref="childWaterMater0"></tnWaterMater>
			<tnWaterMater @pBackImage="backImage" ref="childWaterMater1"></tnWaterMater>
			<tnWaterMater @pBackImage="backImage" ref="childWaterMater2"></tnWaterMater>
		</view>
	</view>
</template>

<script>
	import tnWaterMater from '@/components/tn-waterMark/index.vue'
	import {
		ossUrl
	} from '@/utils/util.js'
	export default {
		components: {
			tnWaterMater
		},
		data() {
			return {
				tnWaterMaterShow:true,
				id: '',
				brand: {},
				mechImageJyList: [],
				businessPhotos: '',
			}
		},
		onLoad({
			id
		}) {
			this.id = id
		},
		onReady() {
			this.getBrandDetail(this.id)
		},
		methods: {
			backImage(e,type){
				console.log('666666666',e,type)
			},
			brandPreviewImage(current){
				this.$previewImage([this.businessPhotos,...this.mechImageJyList],current)
			},
			getBrandDetail(id) {
				this.$util.showLoading();
				this.$http
					.post('stuh5/mech/brandDetail', {
						id
					})
					.then(res => {
						this.$util.hideLoading();
						if (res.code === 200) {
							console.log(res);
							this.brand = res.data;
							uni.showLoading({
								title:'加载中'
							})
							this.addWaterBase64(ossUrl + this.brand.businessPhotos, 'businessPhotos','childWaterMater0',(e,type)=>{
								this.businessPhotos = e;
								this.tnWaterMaterShow = false;
								this.$nextTick(()=>{
									this.tnWaterMaterShow = true;
									setTimeout(()=>{
										this.getMechImageJyList()
									},100)
								})
							})
							
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
			async getMechImageJyList(){
				// uni.hideLoading()
				var sp = 3;
				var ln = Math.ceil(this.brand.mechImageJyList.length/sp)
				if (this.brand.mechImageJyList) {
					for(var j = 0;j<ln;j++){
						for (var i = 0; i < sp; i++) {
							if(j * sp + i==1){
								uni.hideLoading()
							}
							if((j * sp + i)<this.brand.mechImageJyList.length){
								var f = this.brand.mechImageJyList[j * sp + i];
								var childWaterMaterName = 'childWaterMater' + (i)
								await this.asyncImg(f,i,childWaterMaterName)
							}else{
								uni.hideLoading()
								break;
							}	
						}
					}
				}
				uni.hideLoading()
			},
			asyncImg(f,i,childWaterMaterName){
				return new Promise((reslove,reject)=>{
					this.addWaterBase64(ossUrl + f.imageUrl, 'mechImageJy',childWaterMaterName,(e, type)=>{
						this.mechImageJyList.push(e)
						this.tnWaterMaterShow = false;
						this.$nextTick(()=>{
							this.tnWaterMaterShow = true;
							setTimeout(()=>{
								reslove()
							},100)
						})
					})
				})
			},
			addWaterBase64(url, type,childWaterMaterName,fn) {
				let _this = this;
				let model = {};
				model.url = url;
				model.maxSize = 10000;	
				model.watermark = [{
					type: 'text',
					fillStyle: 'rgba(250, 250, 250,1)',
					globalAlpha:1,
					content: '猎学网入驻专用',
					font: '14px',
					repeatWidth: 5000,
					repeatHeight: 5000,
					distanceX: 140,
					distanceY: 50,
					x: -1500,
					y: -1500,
					shadowColor: 'rgba(0, 0, 0, 1)',
					shadowOffsetX: 2,
					shadowOffsetY: 2,
					rotate: 25,
					isRepeat: true
				}];
				console.log(childWaterMaterName)
				this.$refs[childWaterMaterName].addWaterMark(model, type,fn);
			},
		}
	}
</script>

<style lang="scss">
	.page-box {
		padding: 32rpx;
	}

	.c999 {
		color: #999999;
	}

	.c333 {
		color: #333333;
	}

	.img-box {
		width: 90%;
		margin-left: 10%;
		margin-top: 20rpx;
		margin-bottom: 20rpx;
	}

	.flex-shrink0 {
		flex-shrink: 0;
	}

	.tnWaterMater {
		position: fixed;
		top: 0;
		right: 0%;
	}
	.img-opacity{
		opacity: 1;
	}
</style>
