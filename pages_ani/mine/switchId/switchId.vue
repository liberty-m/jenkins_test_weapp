<template>
	<view class="global-wrap cooperation">
		<view class="person" @tap="toPage('institution')">
			<view class="cell" @tap="switchPartner">
				<view class="mr-20">
					<image class="w-28 h-26 vl-middle" src="../../../static/images/mine/cooperation.png" mode=""></image>
				</view>
				<view class="mr-auto">切换合伙人</view>
				<view class="iconfont fz-28 icon-youjiantou_huaban"></view>
			</view>
		</view>
		<view class="color-red mt-20 pl-80 fz-28">机构用户请移步电脑端后台</view>
	</view>
</template>

<script>
	import { mapGetters } from 'vuex'
	export default {
		data() {
			return {
				
			};
		},
		computed: {
			...mapGetters(['userInfo'])
		},
		methods: {
			switchPartner () {
				// #ifndef MP-WEIXIN
				let url = 'https://lxw-parh5.55edu.net/#/pages/home/home/?'
				let params = `loginType=pass&phone=${this.userInfo.phone}&password=${this.userInfo.password}`
				params = encodeURIComponent(params)
				// console.log(params)
				window.open(url + params)
				// #endif
				// #ifdef MP-WEIXIN
				this.$util.showToast('跳转到合伙人端')
				// #endif
			},
			toPage (page) {
				const pages = {
					'institution': '/pages_ani/mine/cooperationIn/institution/institution'
				}
				for (const key in pages) {
					if (key === page) {
						uni.navigateTo({
							url: pages[key]
						})
					}
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
.cooperation {
	padding-top: 10rpx;
	.person {
		background-color: #fff;
		padding: 20rpx;
		border-radius: 16rpx;
		margin: 20rpx;
		font-size: 28rpx;
		.cell {
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
		.info {
			
		}
	}
}
</style>
