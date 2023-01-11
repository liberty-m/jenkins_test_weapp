
/**
 * 搜索历史记录
 * @param {object} options 配置参数 deWeightThree:boolean 是否去重  | 
 */
export const saveHistoryList = (data,options)=>{
	if (!data.text) return
	options = {
		deWeightThree:true,//默认去重
		deWeightThreeField:'text',//去重匹配字段
		length:10,//限制条数
		...options
	}
	let historyList = uni.getStorageSync('searchHistoryList') || [];
	historyList.unshift(data)
	// 是否去重
	if(options.deWeightThree){
		historyList = deWeightThree(historyList,options.deWeightThreeField)
	}
	// 如果超过限制条数则删除最后一条
	if(historyList.length>options.length){
		historyList.pop()
	}
	uni.setStorageSync('searchHistoryList', historyList);
}

export const getHistoryList = (params)=>{
	const historyList = uni.getStorageSync('searchHistoryList') || [];
	return historyList;
}

export const delHistoryList = (params)=>{
	uni.setStorageSync('searchHistoryList', [])
}

/**
 * 数组去重
 * @param {string} field 去重字段
 */
let deWeightThree = (data,field) => {
    let map = new Map();
    for (let item of data) {
        if (!map.has(item[field])) {
            map.set(item[field], item);
        }
    }
    return [...map.values()];
}
