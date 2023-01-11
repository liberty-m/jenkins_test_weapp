<script>
	import jump_url from '@/utils/jump_url.js'
	export default {
		provide () {
			return {
				ossUrl: 'http://tcsrcz.oss-cn-hangzhou.aliyuncs.com/'
			}
		},
		onLaunch: function() {
			// #ifdef H5
			jump_url(window.location.search)
			// #endif
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "@/uni_modules/uview-ui/index.scss";
	@import "@/static/css/iconfont/iconfont.css";
	@import "@/static/css/common.scss";
	@import "@/static/css/base.css";
</style>
