<template>
	<view class="global-wrap subject-wrap">
		<view class="tab">
			<view><lx-tabs :tabs="tabs" showType="big" @tab-click="tabClick"></lx-tabs></view>
		</view>
		<view class="subject-list">
			<view class="item mb-30" v-for="(item, index) in list" @tap="toDetail(item)">
				<view class="img-wrap">
					<image :src="ossUrl + item.topicCover" mode="aspectFill"></image>
					<view class="comming-soon" v-if="tabType === 2">
						<text class="iconfont icon-im_naozhong color-red fw-500 fz-28 mr-8"></text>
						<text>{{dicStatus[item.actStatus]}}</text>
					</view>
					<view class="tag-wrap">
						<view class="tag" v-for="tag in item.tags">{{tag}}</view>
					</view>
				</view>
				<view class="footer">
					<view class="u-line-1 w-510 fz-28 fw-500 mt-16">
						{{item.topicName}}
					</view>
					<view class="views color-red mt-16">
						<text class="iconfont icon-zhengyan fz-28 mr-4"></text>
						<text>{{item.click | numberFormat}}</text>
					</view>
				</view>
			</view>
		</view>
		<lx-loading :isLoading="isLoading"></lx-loading>
		<view class="pb-50"></view>
	</view>
</template>

<script>
	import lxTabs from '@/components/busi/lxTabs.vue'
	import { ossUrl } from '@/utils/util.js'
	import lxLoading from '@/components/busi/lxLoading.vue';
	export default {
		components: { lxTabs,lxLoading },
		data() {
			return {
				ossUrl,
				tabs: [
					{ name: '推荐', value: null },
					{ name: '招生简章', value: 1 },
					{ name: '活动', value: 2 },
					{ name: '其他', value: 3 }
				],
				isLoading: false,
				dicStatus: {
					0: '未开始',
					1: '进行中',
					2: '已结束'
				},
				list: [],
				tabType: null,
				page: {
					offset: 0,
					limit: 10
				}
				
			}
		},
		onShow() {
			this.page.offset = 0
			this.list = []
			this.getList(this.tabType)
		},
		methods: {
			tabClick (item, index) {
				this.list = []
				this.page.offset = 0
				this.tabType = item.value
				this.getList(item.value)
			},
			toDetail (item) {
				uni.navigateTo({
					url: `/pages_ani/mine/recruitStudentDetail/recruitStudentDetail?id=${item.id}&tabType=${this.tabType}`
				})
			},
			getList (type = null) {
				this.$util.showLoading()
				this.isLoading = true;
				const data = {
					topicType: type,
					...this.page
				}
				if (!type) delete data.topicType
				this.$http
					.post('stuh5/Topic/list', data)
					.then(res => {
						if (res.code === 200) {
							const data = res.data.rows
							if (data.length === 0) {
								console.log('没有数据了')
							} else {
								res.data.rows.forEach((v) => {
									if (v.label) {
										v.tags = v.label.split(',')
									}
								})
								this.list = this.list.concat(data)
							}
							this.$util.hideLoading()
						} else {
							uni.showToast({
								icon: "none",
								title: res.msg
							})
							this.$util.hideLoading()
						}
						this.isLoading = false;
					})
					.catch(err => {
						console.log(err);
						this.$utils.hideLoading()
					});
			}
		},
		onReachBottom() {
			this.page.offset += 10
			this.getList()
		}
	}
</script>

<style lang="scss" scoped>
.subject-wrap {
	.tab {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: #fff;
		padding: 20rpx;
		margin-bottom: 20rpx;
	}
	.subject-list {
		.item {
			padding: 20rpx;
			background: #fff;
			.img-wrap {
				position: relative;
				image {
					width: 100%;
					height: 388rpx;
					border-radius: 16rpx;
				}
				.comming-soon {
					display: flex;
					align-items: center;
					position: absolute;
					top: 16rpx;
					left: 0;
					background-color: #fff;
					padding: 10rpx;
					border-top-right-radius: 8rpx;
					border-bottom-right-radius: 8rpx;
					opacity: 0.8;
				}
				.tag-wrap {
					display: flex;
					align-items: center;
					position: absolute;
					right: 20rpx;
					bottom: 30rpx;
					.tag {
						background-color: rgba($color: #333, $alpha: 0.6);
						border-radius: 24rpx;
						padding: 5rpx 10rpx;
						color: #fff;
						margin-left: 10rpx;
						font-size: 20rpx;
					}
				}
			}
		}
		.footer {
			display: flex;
			align-items: center;
			justify-content: space-between;
			.views {
				display: flex;
				align-items: center;
				justify-content: space-between;
			}
		}
	}
}
</style>