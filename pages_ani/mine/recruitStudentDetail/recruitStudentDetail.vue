<template>
	<view class="global-wrap recruit-student-detail">
		<view class="header">
			<image :src="ossUrl + detail.topicCover" mode="aspectFill"></image>
		</view>
		<view class="content">
			<view class="title-desc">
				<view class="title fz-32 fw-500 lh-46 u-line-2 w-520 pd-5">
					{{detail.topicName}}
				</view>
				<view class="d-line"></view>
				<!-- <view class="desc color-999 u-line-3 text-indent-45 lh-40">
				</view> -->
			</view>
			<view class="comeing-soon" v-if="detail.topicType == 2">
				<view class="clock">
					<text class="iconfont icon-im_naozhong color-red fz-40 fw-500 mr-10"></text>
					<text class="fz-28 fw-500 color-red">{{dicStatus[detail.actStatus]}}</text>
				</view>
				<view>
					活动时间：<text>{{detail.startTime}} - {{detail.endTime}}</text>
				</view>
			</view>
			<view class="detail" :class="detail.topicType == 2 && 'mt-30'">
				<view>
					<mp-html :content="detail.content" />
					<!-- <rich-text :nodes="detail.content"></rich-text> -->
				</view>
				<!-- <image src="../../../static/images/test/detail.png" mode="aspectFill"></image> -->
				<view class="tag-wrap mt-20">
					<view class="tag">
						<text class="mr-20 color-999 fz-26">标签</text>
						<view class="mr-10" v-for="tag in detail.labels">
							<u-tag color="#CB242B" borderColor="#CB242B" size="mini" :text="tag.label" plain shape="circle"></u-tag>
						</view>
					</view>
					<view class="views color-red">
						<text class="iconfont icon-zhengyan fz-28 mr-4"></text>
						<text>{{detail.click | numberFormat}}</text>
					</view>
				</view>
			</view>
			
			<view class="pb-50"></view>
		</view>
	</view>
</template>

<script>
	import dayjs from 'dayjs'
	import mpHtml from '@/components/mp-html/mp-html.vue'
	import { ossUrl } from '@/utils/util.js'
	export default {
		components: { mpHtml },
		data() {
			return {
				ossUrl,
				detail: {},
				dicStatus: {
					0: '未开始',
					1: '进行中',
					2: '已结束'
				},
				tabType: null
			}
		},
		onLoad(data) {
			this.tabType = data.tabType
			this.getDetail(data.id)
		},
		methods: {
			getDetail (id) {
				this.$util.showLoading()
				this.$http
					.post('stuh5/Topic/selectOne', { id })
					.then(res => {
						if (res.code === 200) {
							this.detail = res.data
							this.detail.startTime = dayjs(this.detail.actStart).format('YYYY-MM-DD')
							this.detail.endTime = dayjs(this.detail.actEnd).format('YYYY-MM-DD')
							this.$util.hideLoading()
						} else {
							uni.showToast({
								icon: "none",
								title: res.msg
							})
							this.$util.hideLoading()
						}
					})
					.catch(err => {
						console.log(err);
						this.$utils.hideLoading()
					});
			}
		}
	}
</script>

<style lang="scss" scoped>
.recruit-student-detail {
	.header {
		image {
			width: 100%;
			height: 422rpx;
		}
	}
	.content {
		width: 90%;
		margin: 0 auto;
		.title-desc {
			background-color: #fff;
			border-radius: 16rpx;
			padding: 20rpx;
			position: relative;
			top: -50rpx;
			.d-line {
				border-bottom: 1rpx solid $color-red;
				margin: 20rpx 0;
			}
		}
		.comeing-soon {
			display: flex;
			justify-content: space-between;
			align-items: center;
			background-color: #fff;
			border-radius: 16rpx;
			padding: 20rpx;
			margin-top: -20rpx;
			.clock {
				display: flex;
				justify-content: space-between;
				align-items: center;
			}
		}
		.detail {
			background-color: #fff;
			border-radius: 16rpx;
			padding: 20rpx;
			margin-top: -20rpx;
			image {
				width: 100%;
			}
		}
		.tag-wrap {
			display: flex;
			justify-content: space-between;
			align-items: center;
			background-color: #FBFBFB;
			padding: 20rpx;
			border-radius: 8rpx;
			.tag {
				display: flex;
				justify-content: space-between;
				align-items: center;
			}
			.views {
				display: flex;
				justify-content: space-between;
				align-items: center;
			}
		}
	}
}
</style>
