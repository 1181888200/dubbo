
// 解析HTML请求页面url中的参数
function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null)
		return unescape(r[2]);
	return null;
}

//获取URL里的中文
function request(paras){ 
    var url = location.href;  
    var paraString = url.substring(url.indexOf("?")+1,url.length).split("&");  
    var paraObj = {}; 
    for (var i=0; j=paraString[i]; i++){  
        paraObj[j.substring(0,j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=")+1,j.length);  
    }  
    var returnValue = paraObj[paras.toLowerCase()]; 
    if(typeof(returnValue)=="undefined"){  
        return "";  
    }else{  
        return returnValue;  
    } 
} 


//获取参数
function getData(){
	var urlPath = location.href;
	urlPath = urlPath.split("?")[1];
	urlPath = decodeURI(decodeURI(urlPath));
	return urlPath;
}

 