<template>
	<view class="pb-20 pt-20 text-center">
		<view v-if="isLoading">
			<u-loading-icon size="20" textSize="14" :show="isLoading" text="努力加载中"></u-loading-icon>
		</view>
		<view v-else class="color-999 fz-28">没有更多了</view>
	</view>
</template>

<script>
export default {
	name: 'lxLoading',
	props: {
		isLoading: {
			type: Boolean,
			default: false
		}
	}
};
</script>

<style></style>
