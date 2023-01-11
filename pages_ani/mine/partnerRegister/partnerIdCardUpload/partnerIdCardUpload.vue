<template>
	<view class="idcard">
		<view class="fz-36 fw-500 text-center mb-20">请上传您的二代身份证</view>
		<view class="fz-26 color-999 text-center mb-30">确保证件清晰完整、属于本人</view>
		<view class="card-wrap">
			<image class="w-610 h-395" src="https://tcsrcz.oss-cn-hangzhou.aliyuncs.com/lxw/base/idcard_front.png" mode=""></image>
			<image class="w-124 h-124 add" src="../../../../static/images/mine/idcard_add.png" mode=""></image>
			<text>上传人像面</text>
		</view>
		<view class="card-wrap">
			<image class="w-610 h-395" src="https://tcsrcz.oss-cn-hangzhou.aliyuncs.com/lxw/base/idcard_back.png" mode=""></image>
			<image class="w-124 h-124 add" src="../../../../static/images/mine/idcard_add.png" mode=""></image>
			<text>上传国徽面</text>
		</view>
		<view class="lx-btn block wb-88 m-auto mt-80 lt-s-4 fz-32">确认提交</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	}
};
</script>

<style lang="scss" scoped>
.idcard {
	padding: 40rpx;
	.card-wrap {
		border-radius: 8rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
		margin-bottom: 40rpx;
		.add {
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
		}
		text {
			position: absolute;
			left: 50%;
			top: 74%;
			transform: translate(-50%, -74%);
			// color: #fff;
			font-size: 28rpx;
		}
	}
}
</style>
