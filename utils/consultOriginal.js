/* 咨询代码及链接  */
var zixun_arr=new Array();
//1.猎学网   liexue.cn除hd文件夹以外猎学网主站含手机端
zixun_arr = {"url" : "tb.53kf.com/code/client/53dfb0b6352fe152c47936be258729926/1" , "code" : '<script>(function() {var _53code = document.createElement("script");_53code.src = "https://tb.53kf.com/code/code/53dfb0b6352fe152c47936be258729926/1";var s = document.getElementsByTagName("script")[0]; s.parentNode.insertBefore(_53code, s);})();</script>'};

//咨询代码
window.document.write(zixun_arr['code']);

//判断设备
var ua = navigator.userAgent;
var ipad = ua.match(/(iPad).*OS\s([\d_]+)/),
	isIphone =!ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/),
	isAndroid = ua.match(/(Android)\s+([\d.]+)/),
	isMobile = isIphone || isAndroid;
if(isMobile){
	function open53() {
		var _53 = $53.createApi();
		_53.push('cmd', 'mtalk');
		_53.query();
	}
}else{
	function open53() {
		// window.open('http://chat.555edu.com');
		var _53 = $53.createApi();
		_53.push('cmd', 'kfclient');
		//_53.push('type', 'popup');
		_53.push('type', 'new');
		_53.query();
	}
}
