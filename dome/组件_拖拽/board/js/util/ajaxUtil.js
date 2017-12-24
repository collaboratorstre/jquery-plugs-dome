
var ajaxUtil = new Object();

//
/**
 * js调用接口公用方法
 * url:后台controller地址，param:调用controller时的参数，func:成功回馈函数
 */
ajaxUtil.interfaceUtil=function(url,param,func){
	$.ajax({
		type : "POST",
		url : url,
		data : param,
		contentType : "application/x-www-form-urlencoded; charset=UTF-8",
		dataType : "json",
		success : function(data) {
			func(data);
		}
	});
};