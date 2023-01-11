import { http } from '@/utils/request'
import util from '@/utils/util.js'

const home = {
	state: {
		smsKey: '',
		courseCategoryList: [
			{
				name: '全部分类',
				value: 1,
				flag: 'categoryList',
				type: "hierarchy-column",
				submenu: [{ name: '-1', value: '-1' }]
			},
			{
				name: '人气排序',
				submenu: [
					{
						name: "人气排序",
						value: 1
					},
					{
						name: "价格高到低",
						value: 2
					},
					{
						name: "价格低到高",
						value: 3
					}
				],
				type: "hierarchy-column"
			}
		],
		mechCategoryList: [
			{
				name: '全部分类',
				value: 1,
				flag: 'categoryList',
				type: "hierarchy-column",
				submenu: [{ name: '-1', value: '-1' }]
			},
			{
				name: '省市',
				value: 2,
				flag: 'city',
				type: "hierarchy",
				submenu: [{ name: '-1', value: '-1' }]
			}
		],
		educationCategoryList: [
			{
				name: '全部分类',
				value: 1,
				flag: 'stuList',
				type: "hierarchy-column",
				submenu: [{ name: '-1', value: '-1' }]
			},
			{
				name: '学历层次',
				value: 2,
				flag: 'subjectDegree',
				type: "hierarchy-column",
				submenu: [{ name: '-1', value: '-1' }]
			},
			{
				name: '学制',
				value: 3,
				flag: 'subjectLen',
				type: "hierarchy-column",
				submenu: [{ name: '-1', value: '-1' }]
			}
		],
		categoryList: [
			{
				name: '学习类型',
				value: 1,
				flag: 'school',
				type: "hierarchy-column",
				submenu: [{ name: '-1', value: '-1' }]
			},
			{
				name: '学历层次',
				value: 2,
				flag: 'subjectDegree',
				type: "hierarchy-column",
				submenu: [{ name: '-1', value: '-1' }]
			},
			{
				name: '省市',
				value: 3,
				flag: 'city',
				type: "hierarchy",
				submenu: [{ name: '-1', value: '-1' }]
			},
			{
				name: '学制',
				value: 4,
				flag: 'subjectLen',
				type: "hierarchy-column",
				submenu: [{ name: '-1', value: '-1' }]
			},
			{
				name: '年级',
				value: 5,
				flag: 'grade',
				type: "hierarchy-column",
				submenu: [{ name: '-1', value: '-1' }]
			},
		],
		dicMap: {
			subjectDegree: [], // 学历层次
			subjectLen: [], // 学制
			orderRefundReason: [] ,// 退款原因
			orderAfterrecdOperateTypeDescribe: [], // 售后详情说明列表
		},
		stuList: [], // 学习类型列表
		cityData: [], // 省份/城市
		gradeList: [] ,// 年级列表
		categoryListAll: [],
		optionList: [] // 所有字典
	},
	mutations: {
		SET_CODE (state, code) {
			state.smsKey = code
		},
		SET_DIC_MAP (state, data) {
			const fieldName = data.fieldName
			for (const key in state.dicMap) {
				if (key === fieldName) {
					state.dicMap[key] = data.fieldData
				}
			}
			console.log(state.dicMap)
		},
		SET_STU (state, data) {
			state.stuList = data
		},
		SET_CITY (state, data) {
			state.cityData = data
		},
		SET_GRADE (state, data) {
			state.gradeList = data
		},
		SET_CATEGORY (state, data) {
			state.categoryListAll = data
		},
		SET_OPTION (state, data) {
			state.optionList = data
		}
		
	},
	actions: {
		SEND_CODE ({ commit }, phone) {
			if (!phone) return util.showToast('手机号码不能为空')
			const reg = /^(?:(?:\+|00)86)?1\d{10}$/
			if (!reg.test(phone)) return util.showToast('手机号码不正确')
			http.post('sms/sendCode', { mobile: phone })
				.then(res => {
					if (res.code === 200) {
						util.showToast('发送成功')
						commit('SET_CODE', res.data.smsKey)
					} else {
						util.showToast(res.msg)
					}
				})
				.catch(err => {
					console.log(err);
					util.showToast(err.msg)
				});
		},
		VERIFY_CODE({ commit }, paylod) {
			http.post('sms/verifyCode', paylod).then(res => {
				if (res.code === 200) {
					console.log('校验验证码：', res)
					paylod.callback(true)
				} else {
					paylod.callback(false)
					util.showToast(res.msg)
				}
			})
			.catch(err => {
				console.log(err);
				paylod.callback(false)
				util.showToast(err.msg)
			});
		},
		SET_CONSTANT ({ commit }, paylod) {
			return new Promise((resolve, reject) => {
				const params = {
					fieldName: paylod.fieldName
				}
				http.post('stuh5/constantForm/getConstantForm', params).then(res => {
					if (res.code === 200) {
						const data = {
							fieldName: paylod.fieldName,
							fieldData: res.data
						}
						commit('SET_DIC_MAP', data)
						resolve(data)
					} else {
						util.showToast(res.msg)
						reject(res)
					}
				})
				.catch(err => {
					console.log(err);
					util.showToast(err.msg)
					reject(err)
				});
			})
			
		},
		SET_STU ({ commit }, paylod) {
			return new Promise((resolve, reject) => {
				http.post('stuh5/category/querySelect', { parentId: 1 }).then(res => {
					if (res.code === 200) {
						const data = res.data
						commit('SET_STU', data)
						resolve(data)
					} else {
						util.showToast(res.msg)
						reject(res)
					}
				})
				.catch(err => {
					console.log(err);
					util.showToast(err.msg)
					reject(err)
				});
			})
		},
		SET_CITY ({ commit }, paylod) {
			return new Promise((resolve, reject) => {
				http.post('stuh5/cityAndPro/all').then(res => {
					if (res.code === 200) {
						const data = res.data
						commit('SET_CITY', data)
						resolve(data)
					} else {
						util.showToast(res.msg)
						reject(res)
					}
				})
				.catch(err => {
					console.log(err);
					util.showToast(err.msg)
					reject(err)
				});
			})
		},
		SET_GRADE ({ commit }, paylod) {
			http.post('stuh5/course/typeCourse/gradeList').then(res => {
				if (res.code === 200) {
					const data = res.data.map((v) => {
						v.name = v.gradeName
						v.value = v.gradeId
						return v
					})
					commit('SET_GRADE', data)
				} else {
					util.showToast(res.msg)
				}
			})
			.catch(err => {
				console.log(err);
				util.showToast(err.msg)
			});
		},
		SET_CATEGORY ({ commit }, paylod) {
			return new Promise((resolve, reject) => {
				http.post('stuh5/category/querySelect', {}).then(res => {
					if (res.code === 200) {
						const data = res.data
						commit('SET_CATEGORY', data)
						resolve(data)
					} else {
						util.showToast(res.msg)
						reject(res)
					}
				})
				.catch(err => {
					console.log(err);
					util.showToast(err.msg)
					reject(err)
				});
			})
		},
		SET_OPTION ({ commit }, paylod) {
			http.post('option/getAllOption').then(res => {
				if (res.code === 200) {
					console.log('options')
					const data = res.data
					console.log(data)
					commit('SET_OPTION', data)
				} else {
					util.showToast(res.msg)
				}
			})
			.catch(err => {
				console.log(err);
				util.showToast(err.msg)
			});
		}
	},
	getters: {
		smsKey: state => state.smsKey,
		categoryList: state => state.categoryList,
		dicMap: state => state.dicMap,
		stuList:  state => state.stuList,
		cityData: state => state.cityData,
		gradeList: state => state.gradeList,
		courseCategoryList: state => state.courseCategoryList,
		mechCategoryList: state => state.mechCategoryList,
		categoryListAll: state => state.categoryListAll,
		educationCategoryList: state => state.educationCategoryList,
		optionList: state => state.optionList
	}
};

export default home
