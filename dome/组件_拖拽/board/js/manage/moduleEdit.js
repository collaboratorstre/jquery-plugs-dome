var recallDate = "";
var color = "";
function init() {
	$.ajax({
		type : "POST",
		url : contextPathJs + "/module/getEditModuleManageById.do",
		async : false,
		data : {
			id:id
		},
		dataType : "json",
		success : function(data) {
			$("#editModuleId").val(data.id);
			$("#name").val(data.name);
			$("#html").val(data.html);
			$("#javaS").val(data.script);
			$("#xPosition").val(data.x);
			$("#yPosition").val(data.y);
			$("#wPosition").val(data.width);
			$("#hPosition").val(data.height);
			$("#textInner").html(data.fontSize);
			var font = (data.fontSize)*300/60;
			font = Math.round(font);
			$("#mask").css("width",font);
			$("#bar").css("left",font);
			$("#hTextInner").html(data.lineHeight);
			var line = (data.lineHeight)*300/3;
			line = Math.round(line);
			$("#hMask").css("width",line);
			$("#hBar").css("left",line);
			color = data.color;
			colorInitial("full",color);
			$("#startDelay").val(data.startDelay);
			$("#animationTime").val(data.animationDuration);
			$("#description").val(data.description);
			showLeft();
		}
	});
};

function showLeft() {
	var html = "";
	html += '<div title="" class="app-block react-draggable" style="left: ' + $("#xPosition").val() + '; top: ' + $("#yPosition").val() + '; width: ' + $("#wPosition").val() + '; height:'
	+ $("#hPosition").val() + '; color: ' + color + '; position: absolute; transform: translate(0px, 0px); touch-action: none;"><!-- 一个案例 -->';
	html += '<div class="app-panel app-full-box">';
	html += '<div class="app-panel-border">';
	html += '<div class="app-panel-corner corner-horizontal corner-left corner-top"></div>';
	html += '<div class="app-panel-corner corner-horizontal corner-right corner-top"></div>';
	html += '<div class="app-panel-corner corner-horizontal corner-right corner-bottom"></div>';
	html += '<div class="app-panel-corner corner-horizontal corner-left corner-bottom"></div>';
	html += '<div class="app-panel-corner corner-vertical corner-left corner-top"></div>';
	html += '<div class="app-panel-corner corner-vertical corner-right corner-top"></div>';
	html += '<div class="app-panel-corner corner-vertical corner-right corner-bottom"></div>';
	html += '<div class="app-panel-corner corner-vertical corner-left corner-bottom"></div>';
	html += '</div>';
	html += '<div class="app-chart" style="background: none;">';
	html += $("#html").val();
	html += '</div>';
	html += '</div>';
	html += '</div>';
	
	var javas = $("#javaS").val();
	javas = "<script type='text/javascript'>"+javas+"</script>";
	$("#show").append(html);
	var x = $("#xPosition").val();
	var y = $("#yPosition").val();
	var width = $("#wPosition").val();
	var height = $("#hPosition").val();
	$("#show div:eq(0)").css("background-color",color);
	$("#show div:eq(0)").css("width",width);
	$("#show div:eq(0)").css("height",height);
	$("#show div:eq(0)").css("margin-top",parseInt(y));
	$("#show div:eq(0)").css("margin-left",parseInt(x));
	$("#jsShow").append(javas);
}

function htmlChange() {
	$("#show").empty();
	$("#jsShow").empty();
	var value = $("#html").val();
	var jsValue = $("#javaS").val();
	jsValue = "<script type='text/javascript'>"+jsValue+"</script>";
	$("#show").append(value);
	$("#jsShow").append(jsValue);
	var x = $("#xPosition").val();
	var y = $("#yPosition").val();
	var width = $("#wPosition").val();
	var height = $("#hPosition").val();
	$("#show div:eq(0)").css("width",width);
	$("#show div:eq(0)").css("height",height);
	$("#show div:eq(0)").css("margin-top",y);
	$("#show div:eq(0)").css("margin-left",x);
}

function jsChange() {
	$("#show").empty();
	$("#jsShow").empty();
	var value = $("#html").val();
	var jsValue = $("#javaS").val();
	jsValue = "<script type='text/javascript'>"+jsValue+"</script>";
	$("#show").append(value);
	$("#jsShow").append(jsValue);
	var x = $("#xPosition").val();
	var y = $("#yPosition").val();
	var width = $("#wPosition").val();
	var height = $("#hPosition").val();
	$("#show div:eq(0)").css("width",width);
	$("#show div:eq(0)").css("height",height);
	$("#show div:eq(0)").css("margin-top",y);
	$("#show div:eq(0)").css("margin-left",x);
}

function xChange() {
	var xPosition = $("#xPosition").val();
	$("#show div:eq(0)").css("margin-left",xPosition+"px");
}

function yChange() {
	var yPosition = $("#yPosition").val();
	$("#show div:eq(0)").css("margin-top",yPosition+"px");
}

function wChange() {
	var wPosition = $("#wPosition").val();
	$("#show div:eq(0)").css("width",wPosition);
}

function hChange() {
	var hPosition = $("#hPosition").val();
	$("#show div:eq(0)").css("height",hPosition);
}

function addYS(hexColor){
	color = hexColor;
	$("#show div:eq(0)").css("background-color",hexColor);
}

var fontSize = "0";
var rowHeight = "0";
function saveEditModule() {
	var name = $("#name").val();
	if (name == "") {
		alert("组件名称不能为空!");
		return;
	}
	var html = $("#html").val();
	var script = $("#javaS").val();
	var xPosition = $("#xPosition").val();
	if (xPosition == "") {
		alert("x不能为空!");
		return;
	}
	var yPosition = $("#yPosition").val();
	if (yPosition == "") {
		alert("y不能为空!");
		return;
	}
	var wPosition = $("#wPosition").val();
	if (wPosition == "") {
		alert("宽不能为空!");
		return;
	}
	var hPosition = $("#hPosition").val();
	if (hPosition == "") {
		alert("高不能为空!");
		return;
	}
	var startDelay = $("#startDelay").val();
	var animationTime = $("#animationTime").val();
	var description = $("#description").val();
	var id = $("#editModuleId").val();
	$.ajax({
		type : "POST",
		url : contextPathJs + "/module/updateModuleById.do",
		async : false,
		data : {
			id:id,
			name:name,
			description:description,
			x:xPosition,
			y:yPosition,
			width:wPosition,
			height:hPosition,
			fontSize:fontSize,
			lineHeight:rowHeight,
			color:color,
			startDelay:startDelay,
			//startAnimation:startAnimation,
			animationDuration:animationTime,
			html:html,
			script:script
		},
		dataType : "json",
		success : function() {
			window.opener.location.reload();
			window.close();
		}
	});
	
}