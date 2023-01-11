export default (url)=>{
	if(url){
		try{
			// 类型是url
			if(url.indexOf('?type=url')!=-1){
				var data = url.split('?type=url&url=');
				if(data.length==2){
					var routerUrl = data[1];
					uni.reLaunch({
						url:routerUrl
					})
					return
				}
			}
			throw new Error('地址错误')
		}catch(err){
			uni.switchTab({
				url:'/pages/home/home'	
			})
		}
	}
}