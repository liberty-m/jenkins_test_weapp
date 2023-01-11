export default {
	methods:{
		$previewImage(urls, current = 0, flag){
			const ossUrl = 'http://tcsrcz.oss-cn-hangzhou.aliyuncs.com'
			const imgs = urls.map(v => ossUrl + v.picUrl)
			console.log(urls instanceof Array)
			if(urls && urls instanceof Array && urls.length>0){
				uni.previewImage({
					urls: flag ? imgs : urls,
					current
				})
			}
		}
	}
}