var jsCode = "";

$(function () {
	colorInitial("full","#021068");
});

function htmlChange() {
	var value = $("#html").val();
	if (value == "") {
		$("#show").empty();
	}
	if (jsCode == "") {
		$("#show").append(value);
	} else {
		$("#show").append(value);
		$("#show div:eq(0)").css("width",300);
		$("#show div:eq(0)").css("height",300);
		$("#show div:eq(0)").css("margin-top",20);
		$("#show div:eq(0)").css("margin-left",20);
		$("#hPosition").val("300");
		$("#wPosition").val("300");
		$("#xPosition").val("20");
		$("#yPosition").val("20");
		$("#jsShow").append(jsCode);
	}
}

function jsChange() {
	$("#jsShow").empty();
	jsCode = "";
	var value = $("#javaS").val();
	value = "<script type='text/javascript'>"+value+"</script>";
	var htmlValue = $("#html").val();
	if (htmlValue == "") {
		jsCode = value;
		return;
	}
	$("#jsShow").append(value);
	$("#show div:eq(0)").css("margin-top",20);
	$("#show div:eq(0)").css("margin-left",20);
	$("#hPosition").val("300");
	$("#wPosition").val("300");
	$("#xPosition").val("20");
	$("#yPosition").val("20");
}


function xChange() {
	var xPosition = $("#xPosition").val();
	$("#show div:eq(0)").css("margin-Left",parseInt(xPosition));
}

function yChange() {
	var yPosition = $("#yPosition").val();
	$("#show div:eq(0)").css("margin-top",parseInt(yPosition));
}

function wChange() {
	var wPosition = $("#wPosition").val();
	$("#show div:eq(0)").css("width",wPosition);
}

function hChange() {
	var hPosition = $("#hPosition").val();
	$("#show div:eq(0)").css("height",hPosition);
}

var color = "#021068";
function addYS(hexColor){
	color = hexColor;
	$("#show div:eq(0)").css("background-color",hexColor);
}

var fontSize = "0";
var rowHeight = "0";
function saveModule() {
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
	$.ajax({
		type : "POST",
		url : contextPathJs + "/module/addModule.do",
		async : false,
		data : {
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
	
	
	
	