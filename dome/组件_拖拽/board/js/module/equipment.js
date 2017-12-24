/**
 * 设备专题
 */
var equipment = {};

equipment.equipmentTime = function(recallDate){
	var param={'timeParam':recallDate};
	ajaxUtil.interfaceUtil(contextPathJs+'/equipment/queryDeviceStatusesByType.do',param,equipment.equipStatus);
}

equipment.equipStatus = function(data){
	if(data.length>0){
		$('#noEquipStatusDiv').css("display","none");
		$("#equipStatusDiv").css("display","block");
		var len=5;
		var html="";
		if(data.length<5){
			len=data.length;
		}
		html+="<dt>";
		for(var i=0;i<len;i++){
			html+="<p>"+data[i].name.substring(0,4)+"</p>";
		}
		html+="</dt>";

		html+="<dd>"+
		"<table>"+
		"<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>"+
		"<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>"+
		"<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>"+
		"<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>"+
		"<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>"+
		"</table>"+
		"<ul>";
		for(var j=0;j<len;j++){
			var widthNow=data[j].width;
			html+="<li><p style='width: "+widthNow+"%';>"+data[j].normalcount+"</p><span>"+data[j].totalcount+"</span></li>";
		}
		html+="</ul></dd>";
		$('.equipStatus').empty();
		$('.equipStatus').append(html);
	}else{
		$('#equipStatusDiv').css("display","none");
		$("#noEquipStatusDiv").css("display","block");
		var divshow = $("#noEquipStatusDiv");
		divshow.text("");// 清空数据
		divshow.append('<div style="display: table;width: 100%;height: 100%;"><p style="display: table-cell;vertical-align: middle;text-align: center;">暂无数据</p></div>'); // 添加Html内容，不能用Text 或 Val
	
	}
}