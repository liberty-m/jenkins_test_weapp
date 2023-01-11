<template>
	<view>
		
	</view>
</template>

<script>
	// import Base64 from 'base-64';
	import jump_url from '@/utils/jump_url.js'
	export default {
		data(){
			return{
				q:'',
				scancode_time:'',
			}
		},
		onLoad(query){
			let q = '';
			// 如果scene存在 则判断是扫小程序码进来
			if(query.scene){
				// q = Base64.decode(query.scene);
			}
			q = decodeURIComponent(q || query.q) // 获取到二维码原始链接内容
			this.q = q;
			jump_url(this.q)
		},
		methods:{
			
		}
	}
</script>

<style lang="scss">
	
</style>
