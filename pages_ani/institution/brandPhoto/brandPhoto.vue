<template>
	<view class="global-wrap brand-photo">
		<!-- <view class="tab">
			<view><lx-tabs :tabs="tabs" showType="small" @tab-click="tabClick"></lx-tabs></view>
		</view> -->
		<view class="tab tab-line"><u-tabs :list="tabList" @change="tabChange" :activeStyle="{color: '#bc292d', fontWeight: 'bold'}" lineWidth="36" lineHeight="6" lineColor="#CB242B"></u-tabs></view>
		<view class="photo pt-20">
			<view class="item" v-for="(brand, index) in brandList">
				<view class="img">
					<image v-if="brand.videoUrl" class="icon" src="../../../static/images/play_icon.png" mode=""></image>
					<video v-if="brand.videoUrl" class="w-322 h-182" :src="ossUrl + brand.videoUrl" mode=""></video>
					<image v-else class="w-322 h-182" :src="ossUrl + brand.headerPicUrl" @tap="previewImage(brandList, index)" mode=""></image>
					<!-- :src="item.sp_url+ '?x-oss-process=video/snapshot,t_0,f_jpg'" -->
				</view>
				<!-- <view v-if="!brand.videoUrl">品牌介绍品牌视频品牌视牌...</view> -->
			</view>
		</view>
		<lx-loading :isLoading="isLoading"></lx-loading>
	</view>
</template>

<script>
import lxTabs from '@/components/busi/lxTabs.vue';
import lxLoading from '@/components/busi/lxLoading.vue';
import { ossUrl } from '@/utils/util.js'
export default {
	components: { lxTabs, lxLoading },
	data() {
		return {
			ossUrl,
			tabList: [{ name: '全部', value: '' }, { name: '视频', value: 1 }, { name: '图片', value: 2 }],
			mechId: '',
			isLoading: false,
			offset: 0,
			limit: 10,
			total: 0,
			brandList: []
		};
	},
	onLoad(options) {
		this.mechId = options.id
		this.getBrandList()
	},
	methods: {
		previewImage(urls, current) {
			const videos = urls.filter(v => v.videoUrl)
			const imgs = urls.filter(v => !v.videoUrl).map(v => ossUrl + v.headerPicUrl)
			let start = current
			if (videos.length) {
				start = start -= videos.length
			}
			uni.previewImage({
				urls: imgs,
				current: start
			});
		},
		tabChange(item, index) {
			this.offset = 0
			this.brandList = []
			this.getBrandList(item.value);
		},
		getBrandList(labelButton = '') { // 1视频、2图片 不传查全部
			this.$util.showLoading();
			const params = {
				mechId: this.mechId,
				labelButton,
				offset: this.offset,
				limit: this.limit
			}
			this.$http
				.post('stuh5/course/brandPhoto', params)
				.then(res => {
					if (res.code === 200) {
						console.log(res)
						const data = res.data.rows
						if (data.length === 0) {
							console.log('没有数据了');
						} else {
							this.brandList = this.brandList.concat(data);
							this.total = res.data.total
						}
						this.isLoading = false;
						this.$util.hideLoading();
					} else {
						this.$util.showToast(res.msg);
						this.$util.hideLoading();
					}
				})
				.catch(err => {
					console.log(err);
					this.$util.hideLoading();
				});
		},
	},
	onReachBottom() {
		if(this.brandList.length < this.total){
			this.offset += 10;
			this.getBrandList()
		}
		this.offset += 10
	}
};
</script>

<style lang="scss" scoped>
.brand-photo {
	.tab {
		background-color: #fff;
		// position: fixed;
		// top: 88rpx;
		// left: 0;
		// right: 0;
		z-index: 9999;
		padding-bottom: 10rpx;
	}
	// .tab {
	// 	background-color: #fff;
	// 	padding: 20rpx;
	// 	padding-left: 40rpx;
	// 	margin-bottom: 15rpx;
	// }
	.photo {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		padding: 0 26rpx;
		.item {
			padding: 5px;
			background-color: #fff;
			margin-bottom: 15rpx;
			border-radius: 8rpx;
			.img {
				position: relative;
				.icon {
					width: 54rpx;
					height: 54rpx;
					position: absolute;
					left: 50%;
					top: 50%;
					transform: translate(-50%, -50%);
				}
			}
		}
	}
}
</style>
