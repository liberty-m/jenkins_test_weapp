
/**
 * @param {string} code 需要正则验证的类型
 * @param {string | number} str 需要验证的字符串
 */
const formRegular = (code, str) => {
	let regObj = {
		chinese:/^([\u4E00-\u9FA5])*$/,// 只能输入汉字
		idCard:/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,// 身份证号
		phone:/^((13[0-9])|(14[0-9])|(15[0-9])|(17[0-9])|(18[0-9]))\d{8}$/,// 手机号
		letterAndNumber:/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/,//8-16位字母和数字
		lettersAndNumbers_:/^w+$/, //只能输入由数字、26个英文字母或者下划线组成的字符串
		email:/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/,//验证Email地址
	}
	return regObj[code].test(str)
}
export default formRegular;
