var isoState="0"; //iso没被选中0，被选中1
var genaralId=""; //全局ID
var createTime="";
$(document).ready(function() {
	//颜色版初始化
	colorChoose("boardBgcolor");
	colorChoose("textColor");
	colorChoose("emphasizeColor"); 
	colorChoose("moduleBgColor");
	colorChoose("moduleBorderColor");
	colorChoose("seriesColor1");
	colorChoose("seriesColor2");
	colorChoose("moduleTitlecolor");
	initISO();
}); 

function initISO(){
	$('.switch').click(function() {
		$(this).toggleClass("switchOn");
		if(isoState=="0"){
			isoState="1";
		}else{
			isoState="0";
		}
	});	
	
}

function editModal(id) {
	genaralId=editBoardId;
	setBoardInfo(id);
}


function setBoardInfo(id){
	$.ajax({
		type : "POST",
		url : basePath + "/board/getBoardInfoById.do",
		data : {"id":id},
		contentType : "application/x-www-form-urlencoded; charset=UTF-8",
		dataType : "json",
		success : function(data) {
			if(data!=null){
				$('#boardWidth').val(data.width);
				$('#boardHeight').val(data.height);
				$('#bgcolor').val(data.bgColor);
				$('#textColor').val(data.textColor);
				$('#emphasizeElementsColor').val(data.emphasizeColor);
				$('#panalBgColor').val(data.moduleBgColor);
				$('#panalBorderColor').val(data.moduleBorderColor);
				$('#seriesColor1').val(data.seriesColor1);
				$('#seriesColor2').val(data.seriesColor2);
				$('#panalTitlecolor').val(data.moduleTitleBgColor);
				$('#showTimes').val(data.showDuration);
				$('#panalStartTime').val(data.startTime);
				$('#panalEndTime').val(data.endTime);
				//iso样式还原
				$("#delayUpdateTime").removeClass("switch");
				$("#delayUpdateTime").attr("class","switch");
				isoState=0;
				if(data.syncreFresh=="1"){
					$(".switch").trigger("click");
				}
				createTime=data.createTime;
			}
		}
	});
}

function updateBoardInfo(){
	var param = getFormData();
	$.ajax({
		type : "POST",
		url : basePath + "/board/updateBoardInfo.do",
		data : param,
		contentType : "application/x-www-form-urlencoded; charset=UTF-8",
		dataType : "json",
		success : function(data) {
			alert(data);
		}
	});
}
function colorChage(){
}

//获取页面表单数据
function getFormData(){
	var boardwidth=$('#boardWidth').val();
	var boardheight=$('#boardHeight').val();
	var boardbgcolor=$('#boardBgcolor').val()==""?"#d9d9d9":"#"+$('#boardBgcolor').val();
	var generaltextcolor=$('#generalTextColor').val()==""?"#d9d9d9":"#"+$('#generalTextColor').val();
	var emphasizeelementscolor=$('#emphasizeElementsColor').val()==""?"#d9d9d9":"#"+$('#emphasizeElementsColor').val();
	var panalbgcolor=$('#panalBgColor').val()==""?"#d9d9d9":"#"+$('#panalBgColor').val();
	var panalbordercolor=$('#panalBorderColor').val()==""?"#d9d9d9":"#"+$('#panalBorderColor').val();
	var seriescolor1=$('#seriesColor1').val()==""?"#d9d9d9":"#"+$('#seriesColor1').val();
	var seriescolor2=$('#seriesColor2').val()==""?"#d9d9d9":"#"+$('#seriesColor2').val();
	var panaltitlecolor=$('#panalTitlecolor').val()==""?"#d9d9d9":"#"+$('#panalTitlecolor').val();
	var delayupdatetime=isoState;
	var showtimes=$('#showTimes').val()==""?0:parseInt($('#showTimes').val());
	var panalstarttime=$('#panalStartTime').val()==""?0:parseInt($('#panalStartTime').val());
	var panalendtime=$('#panalEndTime').val()==""?0:parseInt($('#panalEndTime').val());
	
	 return {"id":parseInt(editBoardId),"width":boardwidth,"height":boardheight,"bgColor":boardbgcolor,"textColor":generaltextcolor,
	    "emphasizeColor":emphasizeelementscolor,"moduleBgColor":panalbgcolor,"moduleBorderColor":panalbordercolor,
	    "seriesColor1":seriescolor1,"seriesColor2":seriescolor2,"moduleTitleBgColor":panaltitlecolor,"syncreFresh":delayupdatetime,
	    "showDuration":showtimes,"startTime":panalstarttime,"endTime":panalendtime,
	    "type":"0","addOrUpdate":"2"
	  };
}

function clearContent(){
	$('#boardWidth').val("");
	$('#boardHeight').val("");
	$('#boardBgcolor').val("#d9d9d9");
	$('#generalTextColor').val("#d9d9d9");
	$('#emphasizeElementsColor').val("#d9d9d9");
	$('#panalBgColor').val("#d9d9d9");
	$('#panalBorderColor').val("#d9d9d9");
	$('#seriesColor1').val("#d9d9d9");
	$('#seriesColor2').val("#d9d9d9");
	$('#panalTitlecolor').val("#d9d9d9");
	$('#showTimes').val("");
	$('#panalStartTime').val("");
	$('#panalEndTime').val("");
}