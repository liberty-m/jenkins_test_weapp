<template>
	<view>
		<!-- @click-item="handleCourseClick" -->
		<course-list :list="courseList"></course-list>
	</view>
</template>

<script>
import CourseList from '@/components/busi/courseList.vue';
export default {
	components: { CourseList },
	data() {
		return {
			courseList: []
		};
	},
	onLoad() {
		this.getList();
	},
	methods: {
		getList() {
			this.$util.showLoading();
			const params = {
				pageNum: 1,
				pageSzie: 1030
			};
			this.$http
				.post('school_list', params)
				.then(res => {
					this.courseList = res.rows;
					this.$util.hideLoading();
					// if (res.code === 1) {
					// 	console.log('school_list123: ', res.rows)
					// 	// const data = res.data;
					// 	this.courseList = res.rows
					// } else {
					// 	this.$util.showToast(res.msg);
					// }
				})
				.catch(err => {
					console.log(err);
				});
		}
	}
};
</script>

<style scoped>
page {
	padding: 10px;
}
</style>
