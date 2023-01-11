
/**
 * @param {object} data 浏览的足迹数据 浏览课程或机构详情数据
 * @param {string} type 足迹类型 course:课程  mechanism:机构
 * @param {object} options 配置参数 deWeightThree:boolean 是否去重  | 
 */
export const addMyTracks = (data,type,options)=>{
	options = {
		deWeightThree:true,//默认去重
		deWeightThreeField:'id',//去重匹配字段
		length:50,//限制条数
		...options
	}
	
	const myTracksData = uni.getStorageSync('myTracksData') || {};
	// 如果足迹里没有此分类 则添加此分类
	let tracksList = myTracksData[type] || [];
	tracksList.unshift(data)
	// 是否去重
	if(options.deWeightThree){
		tracksList = deWeightThree(tracksList,options.deWeightThreeField)
	}
	// 如果超过限制条数则删除最后一条
	if(tracksList.length>options.length){
		tracksList.pop()
	}
	myTracksData[type] = tracksList;
	uni.setStorageSync('myTracksData', myTracksData);
}

export const getMyTracks = (type,params)=>{
	const myTracksData = uni.getStorageSync('myTracksData') || {};
	var tracksList = myTracksData[type] || []
	let data = {
		rows:tracksList,
		total:tracksList.length
	}
	return data;
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
