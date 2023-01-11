<template>
	<view class="search-wrap">
		<view>
			<hs-search :selectList="selectList"
					placeholder="福州成人高考(函授)计算机"
					@tab-input="handleSearchClick"
					@select="searchSelect"
					button="inside"
					@search="doSearch"
					@confirm="doSearch"
					:showMask="false"
					autoFocus
					v-model="searchQuery" />
		</view>
		<view class="search-content mt-80">
			<view class="flex-between align-between">
				<text class="fw-500 title">历史搜索</text>
				<text class="iconfont icon-youjiantou_huaban color-red fz-32"></text>
			</view>
			<view class="search-tag">
				<view class="s-tag">钢琴</view>
				<view class="s-tag">黎明职业大学</view>
				<view class="s-tag">会计资格考试</view>
				<view class="s-tag">火星时代教育</view>
				<view class="s-tag">集美大学</view>
			</view>
		</view>
		<view class="search-content mt-30">
			<view class="flex-between align-between">
				<text class="fw-500 title">热门搜索</text>
			</view>
			<view class="search-tag">
				<view class="s-tag hot">钢琴</view>
				<view class="s-tag hot">黎明职业大学</view>
				<view class="s-tag hot">会计资格考试</view>
				<view class="s-tag">火星时代教育</view>
				<view class="s-tag">集美大学</view>
			</view>
		</view>
	</view>
</template>

<script>
	import hsSearch from '@/pages_ani/components/search/search.vue'
	export default {
		name: 'search',
		components: { hsSearch },
		data() {
			return {
				searchQuery: '',
				from: '',
				selectList: [{
						id: 1,
						name: '学校'
					},
					{
						id: 2,
						name: '课程'
					},
				],
			};
		},
		onLoad(options) {
			this.from = options.from
		},
		methods: {
			handleSearchClick () {
				console.log('input click')
			},
			searchSelect (data, index) {
				console.log(data, index)
			},
			doSearch(searchQuery) {
				this.$eventBus.$emit('search', searchQuery)
				if (this.from === 'index') {
					uni.switchTab({
						url: '../education/education'
					})
				} else {
					uni.navigateBack({
						delta: 1
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
.search-wrap {
	padding: 20rpx;
	.search-content {
		padding: 0 30rpx;
		.title {
			margin-bottom: 20rpx;
		}
		.search-tag {
			display: flex;
			flex-wrap: wrap;
			.s-tag {
				margin-right: 30rpx;
				margin-bottom: 20rpx;
				padding: 5rpx 20rpx;
				text-align: center;
				border-radius: 30rpx;
				background-color: #F2F2F2;
				font-size: 28rpx;
				&.hot {
					color: $color-red;
					background-color: rgba(237, 63, 20, 0.2);
				}
			}
		}
	}
	
	
}
</style>
