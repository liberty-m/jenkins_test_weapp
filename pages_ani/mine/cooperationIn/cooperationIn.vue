<template>
	<view class="global-wrap cooperation">
		<view>
			<image src="https://tcsrcz.oss-cn-hangzhou.aliyuncs.com/lxw/base/cooperation_in.png"></image>
		</view>
		<view class="person" @tap="toPage('institution')">
			<view class="cell info">
				<view class="mr-auto">合伙人注册</view>
				<view class="iconfont fz-28 icon-youjiantou_huaban"></view>
			</view>
		</view>
		<view class="person" @tap="copyText()">
			<view class="cell info">
				<view class="mr-auto">机构入驻</view>
				<view class="iconfont fz-28 icon-youjiantou_huaban"></view>
			</view>
		</view>
	</view>
</template>

<script>
import { mapGetters } from 'vuex';
	export default {
		data() {
			return {
				
			};
		},
		computed: {
			...mapGetters(['userInfo'])
		},
		methods: {
			copyText() {
				if(this.userInfo.type === 2 || this.userInfo.type === 3) {
					this.$util.showToast('当前账号已入驻');
				} else {
					const _self = this;
					uni.setClipboardData({
						data:'https://jg.liexuew.com/#/firstLogin?userId='+this.userInfo.id+'&phone='+this.userInfo.phone+'&account='+this.userInfo.account,
						// data:'https://lxw-group.55edu.net/#/firstLogin?userId='+this.userInfo.id+'&phone='+this.userInfo.phone+'&account='+this.userInfo.account,
						success() {
							_self.$util.showToast('已复制入驻链接，建议在PC端打开进行申请');
						},
						fail() {
							_self.$util.showToast('复制失败');
						}
					});
				}
				
			},
			toPage (page) {
				if(this.userInfo.type === 1 || this.userInfo.type === 3) {
					this.$util.showToast('当前账号已是合伙人');
				} else {
					const pages = {
						'institution': '/pages_ani/mine/partnerRegister/partnerRegister'
					}
					for (const key in pages) {
						if (key === page) {
							uni.navigateTo({
								url: pages[key]
							})
						}
					}
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
.cooperation {
	image {
		width: 100%;
		height: 320rpx;
		opacity: .4;
	}
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
			padding-left: 20rpx;
		}
		.info {
			
		}
	}
}
</style>
