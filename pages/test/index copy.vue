<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>
		<u-button text="渐变色按钮" color="linear-gradient(to right, rgb(66, 83, 216), rgb(213, 51, 186))"></u-button>
		<tui-cascade-selection checkMarkColor="red" textColor="red" textActiveColor="red" color="red" activeColor="red" lineColor="red" height="200px" :itemList="itemList" @complete="complete"></tui-cascade-selection>
	</view>
</template>

<script>
	import cityData from '@/utils/picker.city.js';
	import tButton from '@/components/thorui/tui-button/tui-button.vue'
	import tuiCascadeSelection from "@/pages_ani/components/thorui/tui-cascade-selection/tui-cascade-selection"
	export default {
		components: { tButton, tuiCascadeSelection },
		data() {
			return {
				title: 'Hello',
				itemList: cityData
			}
		},
		onLoad() {

		},
		methods: {
			complete(e) {
				console.log(e);
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
