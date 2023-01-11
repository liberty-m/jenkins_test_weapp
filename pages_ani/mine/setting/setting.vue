<template>
	<view class="global-wrap setting">
		<view class="person">
			<view class="fz-24 fw-500 pb-20 ">个人设置</view>
			<view class="cell info pb-30" @tap="toPage('info')">
				<view class="mr-20">
					<image class="w-28 h-26 vl-middle" src="../../../static/images/mine/s_person.png" mode=""></image>
				</view>
				<view class="mr-auto">个人信息</view>
				<view class="iconfont fz-28 icon-youjiantou_huaban"></view>
			</view>
			<view class="cell" @tap="toPage('account')">
				<view class="mr-20">
					<image class="w-28 h-26 vl-middle" src="../../../static/images/mine/s_manage.png" mode=""></image>
				</view>
				<view class="mr-auto">帐号管理</view>
				<view class="iconfont fz-28 icon-youjiantou_huaban"></view>
			</view>
		</view>
		<view class="person mt-30">
			<view class="cell pd-0" @tap="toPage('about')">
				<view class="mr-20">
					<image class="w-28 h-26 vl-middle" src="../../../static/images/mine/s_about.png" mode=""></image>
				</view>
				<view class="mr-auto">关于我们</view>
				<view class="iconfont fz-28 icon-youjiantou_huaban"></view>
			</view>
		</view>
		<view class="lx-btn plain block mt-120 wb-90 m-auto" @tap="logout">退出登录</view>
	</view>
</template>

<script>
	import { mapActions, mapGetters } from 'vuex'
	export default {
		data() {
			return {
				
			};
		},
		computed: {
			...mapGetters({
				userInfo: 'userInfo'
			})
		},
		methods: {
			...mapActions({
				logout(commit) {
					commit('logout', { account: this.userInfo.account })
				}
			}),
			toPage (page) {
				const pages = {
					'info': '/pages_ani/mine/personInfo/personInfo',
					'account': '/pages_ani/mine/accountManage/accountManage',
					'about': '/pages_ani/mine/aboutUs/aboutUs'
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
</script>

<style lang="scss">
.setting {
	padding: 20rpx;
	font-size: 28rpx;
	.person {
		background-color: #fff;
		padding: 20rpx;
		border-radius: 16rpx;
		.cell {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 20rpx 0;
			&.info {
				border-bottom: 1rpx solid #F2F2F2;
			}
		}
		.info {
			
		}
	}
}
</style>
