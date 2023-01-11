<template>
	<view class="page">
		<view class="userInfo">
			<image class="header-img" src="https://tcsrcz.oss-cn-hangzhou.aliyuncs.com/lxw/base/header.png" mode="aspectFill"></image>
			<view class="user">
				<view class="name fw-500">{{user.NAME}}</view>
				<view class="phone">{{user.MOBILE}}</view>
			</view>
		</view>

		<view class="list-card pt-160">
			<!-- <view class="left flex-center"><image src="../../static/myIcon/qiu.png" mode="aspectFit"></image></view> -->
			<view class="card" @tap="toApply">
				<view class="item item-bottom-solid">
					<view class="center"><text>我报名的</text></view>
					<view class="right flex-center"><u-icon class="icon" name="arrow-right"></u-icon></view>
				</view>
			</view>
		</view>
		<view class="lx-btn-wrap lx-btn-90"><u-button class="lx-btn block wb-88 m-auto mt-50 lt-s-4 fz-32" type="primary" text="退出登录"></u-button></view>
		<!-- <view class="quit flex-center"><view class="btn flex-center">退出登录</view></view> -->
	</view>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
	data() {
		return {
			user: {}
		};
	},
	computed: {
		...mapGetters(['userInfo'])
	},
	onLoad() {
		console.log('userInfo: ', this.userInfo);
		// this.user = this.userInfo
		this.getUserInfo()
	},
	methods: {
		getUserInfo() {
			this.$util.showLoading();
			const params = {
				ID: this.userInfo.ID
			};
			this.$http
				.get('user_center', params)
				.then(res => {
					if (res.code === 1) {
						console.log('用户信息：', res);
						// const data = res.data.rows;
						this.user = res.user
						this.$util.hideLoading();
					} else {
						this.$util.hideLoading();
					}
				})
				.catch(err => {
					console.log(err);
					this.$util.hideLoading();
				});
		},
		toApply () {
			uni.navigateTo({
				url: './myApply/myApply'
			})
		}
	}
};
</script>
<style lang="scss" scoped>
.top {
	height: 250rpx;
	position: relative;
	.background {
		background-color: #5199ff;
		border-bottom-left-radius: 22px;
		border-bottom-right-radius: 22px;
		position: absolute;
		height: 180rpx;
		width: 100%;
	}
}
.icon {
	color: #96a1ae;
	font-size: 40rpx;
}
.userInfo {
	position: relative;
	.header-img {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 160rpx;
		z-index: 1;
		// border-radius: 8rpx;
	}
	.user {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 10;
		border-radius: 5px;
		padding: 20px 25px;
		margin-bottom: 10px;
		.name {
			font-size: 32rpx;
			margin-bottom: 5px;
		}
		.phone {
			color: #666;
			font-size: 26rpx;
			letter-spacing: 1rpx;
		}
	}
}
.user-card {
	// height: 30rpx;
	// padding: 0 15px;
	margin-bottom: 10px;
	.card {
		position: relative;
		bottom: 62px;
		height: 250rpx;
		background-color: white;
		border-radius: 5px;
		background-color: red;
		.top {
			height: 30%;
			position: relative;
			.userImage {
				position: absolute;
				bottom: 24%;
				left: 10%;
				width: 150rpx;
				height: 150rpx;
				overflow: hidden;
				border-radius: 50%;
				border: 2px solid white;
			}
		}
		.bottom {
			display: flex;
			height: 50%;
			.left {
				width: 80%;
				height: 100%;
				position: relative;
				.user-text {
					width: 100%;
					font-size: 1.6em;
					padding-left: 80rpx;
					height: 50%;
				}
				.user-phone {
					color: #96a1ae;
					padding-left: 80rpx;
					height: 50%;
					width: 100%;
					font-size: 0.9em;
				}
			}
			.right {
				width: 20%;
				height: 50%;
			}
		}
	}
}
.list-card {
	padding: 0 15px;
	.card {
		border-radius: 5px;
		position: relative;
		background-color: white;
		border-radius: 5px;
		padding: 5px 10px;
		.item {
			display: flex;
			height: 100rpx;
			.left {
				width: 10%;
				image {
					width: 70rpx;
					height: 70rpx;
				}
			}
			.center {
				width: 65%;
				display: flex;
				justify-content: start;
				align-items: center;
				font-size: 1.1em;
			}
			.right {
				width: 40%;
				justify-content: flex-end;
			}
		}
	}
}
.item-bottom-solid {
	border-bottom: 1rpx solid #eee;
}
.quit {
	height: 100rpx;
	margin-top: 50px;
	.btn {
		background-color: #4f99ff;
		border-radius: 30px;
		width: 80%;
		color: white;
		font-size: 1.2em;
		height: 100%;
	}
}
.flex-center {
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
