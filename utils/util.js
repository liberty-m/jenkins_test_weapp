import store from '@/store'

function showToast(message, timer = 4000, icon = "none") {
	// #ifdef MP-WEIXIN
	wx.showToast({
		title: message,
		icon,
		duration: timer
	})
	// #endif
	// #ifdef H5
	uni.showToast({
		title: message,
		icon,
		duration: timer
	})
	// #endif
}

function showLoading(title = '加载中...', mask = false) {
	uni.showLoading({
		title,
		mask
	})
}

function hideLoading() {
	uni.hideLoading()
}

function formatNumber (num) {
	return num.length === 11 ? num.replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2') : num;
}

function isType (val, typeName) {
	return Object.prototype.toString.call(val).slice(8, -1).toLowerCase() === typeName
}

function isEmpty (val) {
  if (isType(val, 'null')) return !0
  if (isType(val, 'function')) return !0
  if (isType(val, 'undefined')) return !0
  if (isType(val, 'string') && val.trim().length === 0) return !0
  if (isType(val, 'array') && val.length === 0) return !0
  if (isType(val, 'object') && Object.keys(val).length === 0) return !0
  if (isType(val, 'number') && isNaN(val)) return !0
  if (isType(val, 'string') && val.length === 0) return !0
  return !1
}

function trimForm (form) {
  const temp = {}
  Object.keys(form).map((key) => {
    if (!isEmpty(form[key])) {
      temp[key] = isType(form[key], 'string') ? form[key].trim() : form[key]
    }
  })
  return temp
}

function debounce(func, wait, immediate) {
	let timeout
	return function(...args) {
		let context = this
		if (timeout) clearTimeout(timeout)

		if (immediate) {
			let callNow = !timeout
			timeout = setTimeout(function() {
				timeout = null
			}, wait)
			if (callNow) func.apply(context, args)
		} else {
			timeout = setTimeout(function() {
				func.apply(context, args)
			}, wait)
		}
	}
}

function verifyLogin (callback, isFailure, params, path) {
	const userInfo = store.getters.userInfo
	if (path) {
		uni.setStorageSync('path', path)
	}
	if (isFailure || !userInfo.id) {
		uni.showModal({
			title: '提示',
			content: '是否立即前往登录?',
			confirmColor: '#CB242B',
			success: res => {
				if (res.confirm) {
					if (params) {
						uni.navigateTo({
							url: `/pages/login/codeLogin?${params}`
						})
					} else {
						uni.navigateTo({
							url: '/pages/login/codeLogin'
						})
					}
					console.log('用户点击确定');
				} else if (res.cancel) {
					console.log('用户点击取消');
				}
			}
		});
	} else {
		callback()
	}
	
}

/**
 * 5+App支付,仅支持支付宝以及微信支付
 *
 * 支付宝Sdk集成,微信sdk未集成
 *
 * @param : provider(String) ->被支付方
 * @param : orderInfo(String) ->订单信息
 * @param : success,fail(Json) ->回调后的json信息
 *
 */
const requestPayment = (provider, orderInfo, success, fail) => (
	uni.requestPayment({
		provider,
		orderInfo, //订单数据
		success(res) {
			success(JSON.stringify(res))
		},
		fail(err) {
			fail(JSON.stringify(err))
		}
	})
)

// 微信支付
function wxPay(data, success, fail, complete) {
	wx.requestPayment({
		timeStamp: data.timeStamp,
		nonceStr: data.nonceStr,
		package: data.package,
		signType: data.signType,
		paySign: data.paySign,
		success: res => {
			success(res)
		},
		fail: res => {
			fail(res)
		},
		complete: res => {
			complete(res)
		}
	})
}

const ossUrl = 'https://tcsrcz.oss-cn-hangzhou.aliyuncs.com/'

module.exports = {
	ossUrl,
	trimForm,
	showToast,
	showLoading,
	hideLoading,
	formatNumber,
	debounce,
	verifyLogin,
	requestPayment,
	wxPay
	
}
