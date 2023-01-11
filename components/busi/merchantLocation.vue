<template>
	<view>
		<template v-if="showType === 'course'">
			<view class="flex-between">
				<view class="fz-28 fw-500 mb-20">所属机构</view>
				<!-- <view class="color-red ml-20">距离您1.3km</view> -->
			</view>
			<view class="location">
				<view class="flex-between">
					<view style="flex-shrink: 0;">
						<image class="w-84 h-84 border-circle" :src="ossUrl + merchant.shopLogo" @tap="previewImage(ossUrl + merchant.shopLogo)" mode=""></image>
					</view>
					<view @tap="$emit('click-name', merchant)">
						<view class="ml-26 mb-10 u-line-1 w-420">
							<view class="fz-28 fw-500 flex flex-align">
								<view style="max-width:440rpx;" class="u-line-1">{{ merchant.managementName }}</view>
								<view @click.stop="toBrand" class="ml-10" style="flex-shrink: 0;">
									<u-image  width="39rpx" height="23rpx" src="/static/images/brand_icon.png"></u-image>
								</view>
							</view>
						</view>
						<view class="detailed mb-10 ml-26 flex-between">
							<text class="iconfont icon-dingwei fz-30 color-333 fw-500 mr-5"></text>
							<text class="inline-block u-line-1 w-400" style="font-size: 14px;">{{ merchant.address }}</text>
						</view>
					</view>
				</view>
				<view class="phone" @tap="callPhone">
					<text class="iconfont icon-dianhua fz-38 pb-4"></text>
					<text>电话</text>
				</view>
			</view>
		</template>
		<template v-else>
			<view v-if="isShowTitle" class="fz-28 fw-500 mb-20">门店信息</view>
			<view class="location">
				<view style="max-width: 540rpx;">
					<view class="detailed mb-10 u-line-1">
						<text class="iconfont icon-dingwei fz-30 color-red fw-500 mr-10"></text>
						<text style="font-size: 14px;">{{merchant.address}}</text>
					</view>
					<view class="ml-38">
						<!-- <text class="fz-28">福州大学/西禅寺</text> -->
						<!-- <text class="color-red ml-20">距离您1.3km</text> -->
					</view>
				</view>
				<view class="phone" @tap="callPhone">
					<text class="iconfont icon-dianhua fz-38 pb-4"></text>
					<text>电话</text>
				</view>
			</view>
		</template>
	</view>
</template>

<script>
import { ossUrl } from '@/utils/util.js'
import { jsonp } from 'vue-jsonp';
export default {
	name: 'merchantLocation',
	props: {
		showType: {
			type: String,
			default: 'location'
		},
		isShowTitle: {
			type: Boolean,
			default: true
		},
		merchant: {
			type: Object,
			default: () => {}
		}
	},
	data() {
		return {
			ossUrl
		};
	},
	created() {
		this.getDistance();
	},
	methods: {
		toBrand(){
			uni.navigateTo({
				url: `/pages_ani/institution/brandQualification/brandQualification?id=${this.merchant.id}`
			});
		},
		previewImage(urls) {
			uni.previewImage({
				urls: [urls]
			});
		},
		callPhone () {
			uni.makePhoneCall({
				phoneNumber: this.merchant.contactPhone
			})
		},
		getDistance() {
			// https://lbs.qq.com/service/webService/webServiceGuide/webServiceDistance
			// if (navigator.geolocation){ 
			// 	console.log('定位')
			// 	navigator.geolocation.getCurrentPosition((location)=> {
			// 		console.log(location)
			// 	}, (err) => {
			// 		console.log(err)
			// 	}, {
			// 		// enableHighAcuracy : true,// 指示浏览器获取高精度的位置，默认为false  
			// 		// timeout : 5000,// 指定获取地理位置的超时时间，默认不限时，单位为毫秒  
			// 		// maximumAge : 2000 // 最长有效期，在重复获取地理位置时，此参数指定多久再次获取位置。  
			// 	})
			//   }else{ 
			//     alert("浏览器不支持地理定位。"); 
			//   } 
			// uni.getLocation({
			//     type: 'gcj02',
			//     altitude: true,
			//     success: function (res) {
			//         console.log('当前位置的经度：' + res.longitude);
			//         console.log('当前位置的纬度：' + res.latitude);
			//     }
			// });
			// uni.getLocation({
			//     type: 'gcj02', //返回可以用于uni.openLocation的经纬度
			//     success: (res) => {
			// 		console.log('获取定位：', res)
			//         const latitude = res.latitude;
			//         const longitude = res.longitude;
			// 		jsonp('https://apis.map.qq.com/ws/distance/v1/?mode=walking', {
			// 			from: `${latitude},${longitude}`,
			// 			to: `${this.merchant.latitude},${this.merchant.preciseLongitude}`,
			// 			key: 'V63BZ-5AHLW-L5PRI-OCUXL-4ATRS-GUFSN', //  创建应用的key
			// 			output: 'jsonp'
			// 		}).then(res => {
			// 			console.log('距离：', res);
			// 			let hw = res.result.elements[0].distance; //拿到距离(米)
			// 			if (hw && hw !== -1) {
			// 				if (hw < 1000) {
			// 					hw = hw + 'm';
			// 				}
			// 				//转换成公里
			// 				else {
			// 					hw = (hw / 2 / 500).toFixed(2) + 'km';
			// 				}
			// 			} else {
			// 				hw = '距离太近或请刷新重试';
			// 			}
			// 			console.log(hw);
			// 		});
			//         uni.openLocation({
			//             latitude: latitude,
			//             longitude: longitude,
			//             success: function () {
			//                 console.log('success');
			//             }
			//         });
			//     },
			// 	fail(err) {
			// 		console.log('失败: ', err)
			// 	}
			// });
			
		}
	}
};
</script>

<style lang="scss" scoped>
.location {
	display: flex;
	justify-content: space-between;
	align-items: center;
	.detailed {
		color: #7f7f7f;
	}
	.phone {
		display: flex;
		flex-direction: column;
		align-items: center;
		position: relative;
		margin-right: 20rpx;
		&::after {
			content: '';
			position: absolute;
			left: -40rpx;
			top: 0;
			width: 2rpx;
			height: 100%;
			background-color: #bc292d;
		}
	}
}
</style>
