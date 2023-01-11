<template>
	<view class="all-cource global-wrap">
		<view class="tab tab-line"><u-tabs :list="tabList" @change="tabChange" :activeStyle="{color: '#bc292d', fontWeight: 'bold'}" lineWidth="36" lineHeight="6" lineColor="#CB242B"></u-tabs></view>
		<view class="content pt-120">
			<course-list :list="courseList" showType="institution" @click-item="handleCourseClick"></course-list>
		</view>
		<lx-loading :isLoading="isLoading"></lx-loading>
	</view>
</template>

<script>
import lxTabs from '@/components/busi/lxTabs.vue';
import lxLoading from '@/components/busi/lxLoading.vue';
import CourseList from '@/components/busi/courseList.vue';
export default {
	components: { lxTabs, lxLoading, CourseList },
	data() {
		return {
			tabList: [],
			merchantId: '',
			offset: 0,
			limit: 10,
			isLoading: false,
			courseList: []
		};
	},
	onLoad(options) {
		console.log(options);
		const { id } = options;
		this.merchantId = id
		this.getMerchantLabel(id);
		this.getMerchantCourse(id);
	},
	methods: {
		tabChange(item, index) {
			this.offset = 0;
			this.courseList = []
			this.getMerchantCourse(this.merchantId, item.label === '全部' ? '' : item.label);
		},
		handleCourseClick(item) {
			console.log(item);
			uni.navigateTo({
				url: `/pages/courseDetail/courseDetail?courseId=${item.id}`
			});
		},
		getMerchantLabel(id) {
			this.$util.showLoading();
			this.$http
				.post('stuh5/course/label/list', { shopId: id })
				.then(res => {
					if (res.code === 200) {
						this.tabList = res.data.map(v => {
							v.name = v.label;
							return v;
						});
						this.tabList.unshift({ name: '全部', id: '', label: '全部' });
						this.$util.hideLoading();
					} else {
						this.$util.showToast(res.msg);
						this.$util.hideLoading();
					}
				})
				.catch(err => {
					console.log(err);
					this.$util.hideLoading();
				});
		},
		getMerchantCourse(shopId = '', label = '') {
			this.$util.showLoading();
			this.isLoading = true
			this.$http
				.post('stuh5/course/labelCourse', { shopId, label, offset: this.offset, limit: this.limit })
				.then(res => {
					if (res.code === 200) {
						const data = res.data.rows
						if (data.length === 0) {
							this.isLoading = false
						} else {
							this.courseList = this.courseList.concat(data);
							this.isLoading = false
						}
						this.$util.hideLoading();
					} else {
						this.isLoading = false
						this.$util.showToast(res.msg);
						this.$util.hideLoading();
					}
				})
				.catch(err => {
					console.log(err);
					this.isLoading = false
					this.$util.hideLoading();
				});
		},
	},
	onReachBottom() {
		this.offset += 10;
		this.getMerchantCourse(this.merchantId)
	}
};
</script>

<style lang="scss" scoped>
.all-cource {
	.tab {
		background-color: #fff;
		position: fixed;
		// #ifdef MP-WEIXIN
		top: 0rpx;
		// #endif
		// #ifndef MP-WEIXIN
		top: 88rpx;
		// #endif
		left: 0;
		right: 0;
		z-index: 9999;
		padding-bottom: 10rpx;
	}
	.content {
		padding: 20rpx;
	}
	.wf-wrap {
		background-color: #fff;
	}
}
</style>
