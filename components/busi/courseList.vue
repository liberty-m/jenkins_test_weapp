<template>
	<view>
		<view class="course-list">
			<view class="item" v-for="item in list" @tap="$emit('click-item', item)">
				<!-- <image class="h-190" :src="ossUrl + item.mainPic" mode=""></image> -->
				<view class="info">
					<view class="title u-line-1 w-500 pt-10 fz-28">{{ item.SCHOOL_NAME }}</view>
					<view v-if="showType !== 'institution'" class="text color-666 pb-10 pt-10 u-line-1">
						<text class="iconfont icon-shuyi_xuexiaoguanli mr-5"></text>
						{{ item.SCHOOL_NAME }}
					</view>
					<!-- <view class="flex-between align-between">
						<view>
							已报名
							<text>{{ item.finallyNum || item.signupNum }}</text>
						</view>
						<view class="color-red fw-500 fz-32 ml-auto">
							<text>¥ {{ item.money / 100 }}</text>
						</view>
					</view> -->
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { ossUrl } from '@/utils/util.js';
export default {
	name: 'CourseList',
	props: {
		showType: {
			type: String,
			default: 'course'
		},
		list: {
			type: Array,
			default: () => []
		}
	},
	data() {
		return {
			ossUrl
		};
	}
};
</script>

<style lang="scss" scoped>
.course-list {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	flex-wrap: wrap;
	box-sizing: border-box;
	.item {
		// width: 48.5%;
		margin-bottom: 0rpx;
		image {
			width: 100%;
			border-top-left-radius: 16rpx;
			border-top-right-radius: 16rpx;
		}
		.info {
			background-color: #fff;
			border-bottom: 1rpx solid #f2f2f2;
			// border-top: none;
			padding: 10rpx;
			// margin-top: -10rpx;
			// border-bottom-left-radius: 16rpx;
			// border-bottom-right-radius: 16rpx;
		}
	}
}
</style>
