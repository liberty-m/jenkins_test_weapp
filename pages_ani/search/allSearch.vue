<template>
	<view class="search-wrap">
		<view>
			<hs-search ref="hsSearch" :selectList="selectList"
					placeholder="福州成人高考(函授)计算机"
					@tab-input="handleSearchClick"
					@select="searchSelect"
					button="inside"
					@search="doSearch"
					@confirm="doSearch"
					@cancel="cancel"
					:showMask="false"
					autoFocus
					v-model="searchQuery.keyword" />
		</view>
		<view class="search-content mt-80" v-if="historyList.length>0">
			<view class="flex-between align-between">
				<text class="fw-500 title">历史搜索</text>
				<text @tap="delHistory" class="iconfont icon-shanchu color-red fz-32"></text>
			</view>
			<view class="search-tag">
				<view @tap="goSearch(item)" class="s-tag" v-for="(item,index) in historyList" :key="index">{{item.text}}</view>
			</view>
		</view>
		<!-- <view class="search-content mt-30">
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
		</view> -->
	</view>
</template>

<script>
	import { saveHistoryList,getHistoryList,delHistoryList } from '@/common/function/searchHistoryList.js'
	import hsSearch from '@/components/search/allSearch.vue'
	export default {
		name: 'search',
		components: { hsSearch },
		data() {
			return {
				searchQuery: {},
				from: '',
				selectList: [[
					{
						id: 2,
						label: '课程'
					},
					{
						id: 1,
						label: '机构'
					}
				]],
				historyList:[
					
				]
			};
		},
		onLoad(options) {
			this.from = options.from;
		},
		onShow(){
			this.historyList = getHistoryList();
		},
		methods: {
			// 点击缓存列表
			goSearch(item){
				this.$refs.hsSearch.setInputVal(item.text);
				var select =this.selectList[0].filter(f=>f.id==item.id)
				this.$refs.hsSearch.setInSelectValue(select[0]);
				this.searchQuery = {
					keyword:item.text,
					selectIndex:item.id
				}
				this.doSearch(this.searchQuery);
			},
			handleSearchClick () {
				console.log('input click')
			},
			searchSelect (data, index) {
				console.log(data, index)
			},
			cancel () {
				uni.navigateBack({
					delta: 1
				})
			},
			delHistory () {
				delHistoryList()
				this.historyList = getHistoryList();
			},
			doSearch(searchQuery) {
				// this.$eventBus.$emit('allSearch', searchQuery)
				if (this.from === 'index') {
					// 如果不是点击列表触发的则保持缓存
					uni.navigateTo({
						url: '/pages_ani/search/searchResult?keyword=' + searchQuery.keyword + '&selectIndex=' + searchQuery.selectIndex
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
