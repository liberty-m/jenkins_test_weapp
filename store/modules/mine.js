import { http } from '@/utils/request'
import util from '@/utils/util.js'
const mine = {
	state: {
		token: '',
		openid: '',
		userInfo: {},
		orderStatusNum: {},
		wxLoginData: {
			code: '',
			sessionKey: '',
			openid: '',
			phoneNumber: ''
		}
	},
	mutations: {
		SET_TOKEN (state, token) {
			state.token = token
		},
		SET_OPENID (state, openid) {
			console.log('vuex openid: ', openid)
			state.openid = openid
		},
		SET_USER_INFO: (state, userInfo) => {
			state.userInfo = userInfo
		},
		getOrderStatusNum (state, data) {
			http.post('stuh5/order/orderStatusNum', { buyerId: state.userInfo.id }).then(res => {
				if (res.code === 200) {
					state.orderStatusNum = res.data
				} else {
					util.showToast(res.msg)
				}
			})
			.catch(err => {
				console.log(err)
				// util.showToast(err.msg)
			});
		},
		getWxLoginData(state, data) {
			uni.login({
				success({ code }) {
					state.wxLoginData.code = code;
					console.log('code: ', state.wxLoginData.code);
					http.post('stuh5/login/getOpenid', { code: state.wxLoginData.code })
						.then(res => {
							if (res.code === 200) {
								const { sessionKey, openid } = res.data;
								// state.openid = openid
								state.wxLoginData.openid = openid;
								state.wxLoginData.sessionKey = sessionKey;
								// console.log('wxLoginData: ', state.wxLoginData)
							} else {
								util.showToast(res.msg);
							}
						})
						.catch(err => {
							util.showToast(err.msg);
						});
				}
			});
		},
		getPhoneNumber (state, data) {
			if (data.detail.errMsg == 'getPhoneNumber:fail user deny') {
				util.showToast('用户已拒绝');
			} else {
				const params = {
					sessionKey: state.wxLoginData.sessionKey,
					encryptedData: data.detail.encryptedData,
					iv: data.detail.iv
				}
				http.post('stuh5/login/getWeixinGetPhoneNumber', params)
					.then(res => {
						if (res.code === 200) {
							const { phoneNumber } = res.data
							state.wxLoginData.phoneNumber = phoneNumber
						} else {
							util.showToast(res.msg);
						}
					})
					.catch(err => {
						util.showToast(err.msg);
					});
			}
		}
	},
	actions: {
		registerByPhone ({ commit }, data) {
			return new Promise((resolve, reject) => {
				commit('SET_OPENID', data.openid)
				const params = {
					phone: data.phoneNumber,
					openid: data.openid
				}
				http.post('stuh5/login/registerByPhoneAndOpenid', params)
					.then(res => {
						if (res.code === 200) {
							console.log('注册: ', res)
							commit('SET_USER_INFO', res.data)
							commit('SET_TOKEN', res.data.token)
							util.showToast('登录成功');
							if (res.data.ifRegister === 1) {
								setTimeout(() => {
									uni.reLaunch({
										url: '/pages_ani/password/changePassWord'
									})
								}, 2000)
							} else {
								setTimeout(() => {
									uni.switchTab({
										url: '/pages/home/home'
									})
								}, 2000)
							}
							resolve(res)
						} else {
							util.showToast(res.msg);
							reject(res)
						}
					})
					.catch(err => {
						util.showToast(err.msg);
						reject(res)
					});
			})
		},
		login ({ commit }, data) {
			// const apiUrl = data.loginType === 'pass' ? 'stuh5/login/login' : 'stuh5/login/loginByPhone'
			// const recommendInfo = uni.getStorageSync('recommendInfo')
			// delete data.loginType
			util.showLoading()
			const options = {
				header: {
					"content-type": 'application/x-www-form-urlencoded'
				}
			}
			http.post('fcs/login/login', data, options).then(res => {
				// console.log('登录： ', res)
				if (res.code === 10000) {
					util.hideLoading()
					util.showToast('登录成功')
					commit('SET_USER_INFO', res.object)
					commit('SET_TOKEN', res.token)
					setTimeout(() => {
						uni.navigateTo({
							url: '/pages/collectionList/collectionList'
						})
					}, 2000)
					// if (res.data.ifRegister === 1) {
					// 	setTimeout(() => {
					// 		uni.reLaunch({
					// 			url: '/pages_ani/password/changePassWord'
					// 		})
					// 	}, 2000)
					// } else {
					// 	if (recommendInfo.generalPartnerId) {
					// 		const { courseId, generalPartnerId, seniorPartnerId, seniorPartnerProp, generalPartnerProp, seniorPartnerName, generalPartnerName } = recommendInfo
					// 		setTimeout(() => {
					// 			uni.reLaunch({
					// 				url: `/pages/courseDetail/courseDetail?courseId=${courseId}&generalPartnerId=${generalPartnerId}&generalPartnerName=${generalPartnerName}&generalPartnerProp=${generalPartnerProp}&seniorPartnerId=${seniorPartnerId}&seniorPartnerProp=${seniorPartnerProp}&seniorPartnerName=${seniorPartnerName}`
					// 			})
					// 		}, 2000)
					// 	} else {
					// 		setTimeout(() => {
					// 			uni.switchTab({
					// 				url: '/pages/home/home'
					// 			})
					// 		}, 2000)
					// 	}
					// }
				} else {
					util.hideLoading()
					util.showToast(res.message)
				}
			})
			.catch(err => {
				console.log(err)
				util.hideLoading()
				util.showToast(err.message)
			});
		},
		logout ({ commit }, data) {
			commit('SET_USER_INFO', {})
			commit('SET_TOKEN', '')
			// http.post('stuh5/login/logout', data).then(res => {
			// 	if (res.code === 200) {
			// 		util.showToast('退出成功')
			// 		commit('SET_USER_INFO', {})
			// 		commit('SET_TOKEN', '')
			// 		setTimeout(() => {
			// 			uni.switchTab({
			// 				url: '/pages/home/home'
			// 			})
			// 		}, 2000)
			// 	} else {
			// 		util.showToast(res.msg)
			// 	}
			// })
			// .catch(err => {
			// 	console.log(err)
			// 	util.showToast(err.msg)
			// });
		}
	},
	getters: {
		token: state => state.token,
		userInfo: state => state.userInfo,
		openid: state => state.userInfo.openid,
		orderStatusNum: state => state.orderStatusNum,
		wxLoginData: state => state.wxLoginData
	}
};

export default mine;
