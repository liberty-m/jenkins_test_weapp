/* eslint-disable */
import baseUrl from './baseUrl.js'
import Request from './request';
import store from '@/store'
import util from '../util.js'
import { Base64 } from 'js-base64'
const http = new Request();
// request全局参数设置
http.setConfig(config => {
	/* 设置全局配置 */
	config.baseUrl = baseUrl
	const systemInfo = uni.getSystemInfoSync();
	const systemInfoHeaders = {
		'device-name': systemInfo.brand, // 设备名称
		width: systemInfo.screenWidth, // 屏幕宽度
		height: systemInfo.screenHeight, // 屏幕高度2
		os: systemInfo.platform, // 客户端平台
		'os-version': systemInfo.system // 操作系统版本
	};
	config.header = {
		...config.header,
		// ...systemInfoHeaders
	};
	return config;
});

let isRefreshing = false;
let requests = [];
http.interceptor.request(
	config => {
		config.header['token'] = store.state.mine.token
		// if (process.env.NODE_ENV === 'production' && config.url !== 'oss/upload') {
		// if (config.url !== 'oss/upload') {
		// 	const currentTime = new Date().getTime()
		// 	config.data = Base64.encode(JSON.stringify(config.data))
		// 	config.header.requestTime = currentTime
		// 	config.header['content-type'] = 'application/json; charset=utf-8'
		// }
		return config;
	},
	error => {
		return Promise.reject(error);
	}
);
http.interceptor.response(
	async response => {
			/* 请求之后拦截器 */
			// if (process.env.NODE_ENV === 'production') {
			  // const currentTime = new Date().getTime()
			  // config.data = encode(JSON.stringify(config.data))
			  // config.headers.requestTime = currentTime
			  // config.headers['content-type'] = 'application/json; charset=utf-8'
			// }
			const msg = '服务器出小差啦～'
			switch (response.data.code) {
				case 10000:
					return response.data;
				case 400:
					uni.showToast({
						icon: 'none',
						title: response.data.message || msg
					})
					return Promise.reject(response.data);
					break;
				case 401:
					store.dispatch('logout')
					util.verifyLogin(() => {
						console.log('验证登录')
					}, true)
					// return Promise.reject(response.data);
					break;
				case 405:
					return Promise.reject(response.data);
				case 404:
					return Promise.reject(response.data);
				case 429:
					return Promise.reject(response.data);
				case 500:
					uni.showToast({
						icon: 'none',
						title: msg
					})
					return Promise.reject(response.data);
				case -10000:
				// console.log('-111', response)
					uni.showToast({
						icon: 'none',
						title: response.data.message || msg
					})
					return Promise.reject(response.data);
				default:
					return Promise.reject(response.data);
			}
			
		},
		error => {
			console.log('err:', error)
			const msg = '服务器出小差啦～'
			if (!('statusCode' in error)) {
				uni.showToast({
					icon: 'none',
					title: msg
				})
			} else if (error.statusCode === 500) {
				uni.showToast({
					icon: 'none',
					title: error.data.msg || msg
				})
			} else if (error.statusCode === 404) {
				uni.showToast({
					icon: 'none',
					title: '服务器出小差啦'
				})
			} else if (error.statusCode === 303) {
				uni.showToast({
					icon: 'none',
					title: '当前登录权限已过期'
				})
				util.verifyLogin(() => {
					console.log('当前登录权限已过期')
				}, true)
			} else {
				uni.showToast({
					icon: 'none',
					title: msg
				})
			}
			Promise.reject(error)
		}
);

export {
	http
};
