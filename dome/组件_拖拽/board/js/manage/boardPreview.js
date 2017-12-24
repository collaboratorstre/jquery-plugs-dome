/**
 * 大屏预览
 */
var boardPreview = new Object();
var currentModuleList = [];// 当前大屏的组件列表维护
var currentBoard;// 当前大屏信息

/**
 * 大屏预览(此处为大屏实际展示，通过id从数据库配置里获取数据)
 */
boardPreview.show = function(id) {
	//获取看板基本信息
	$.ajax({
		type : "POST",
		url : contextPathJs + "/board/getBoardById.do",
		data : {
			"id" : id
		},
		contentType : "application/x-www-form-urlencoded; charset=UTF-8",
		dataType : "json",
		async : false,
		success : function(data) {
			currentBoard=data;
		}});
	
	//获取看板各个组件基本信息
	$.ajax({
		type : "POST",
		url : contextPathJs + "/module/getModuleByBoardId.do",
		data : {
			boardId : id
		},
		async : false,
		dataType : "json",
		success : function(data) { 
			//alert(data);
			//alert(JSON.stringify(data));
			currentModuleList=data;
		}});
	//console.log(JSON.stringify(currentBoard));
	//console.log(JSON.stringify(currentModuleList));
	boardPreview.preview(JSON.stringify(currentBoard), JSON.stringify(currentModuleList));  
};

/**
 * 大屏预览(此处为预览效果，从localstage获取数据)
 */
boardPreview.preview = function(boardStr, moduleArrayStr) {
	currentBoard = eval("(" + boardStr + ")");
	currentModuleList = eval("(" + moduleArrayStr + ")");
	//console.log(boardStr);
	//console.log(moduleArrayStr);
	$(document).attr("title", currentBoard.name);
	$(".app-container").css("width", currentBoard.width + "px");
	$(".app-container").css("height", currentBoard.height + "px");
	$(".app").css("width", currentBoard.width + "px");
	$(".app").css("height", currentBoard.height + "px");
	$(".app-container").css("background-color", currentBoard.bgColor);
	// $(".app-container").css("width",board.width);
	for (var i = 0; i < currentModuleList.length; i++) {
		var module = currentModuleList[i];
		var position = "left:" + module.x + "px;top:" + module.y + "px;width:" + module.width + "px;height:" + module.height + "px;";
		var borderStyleStr = boardPreview.getModuleBorderStyle(module.borderStyle);
		var moduleBody = "<div class='app-block react-draggable' data-id='"
				+ module.id
				+ "' style='position:absolute;"
				+ position
				+ "touch-action: none;  line-height: 2.3; color: rgb(255, 255, 255);  transform: translate(0px, 0px);'><div class='app-panel app-full-box' style='border-color:"
				+ currentBoard.moduleBorderColor + "; background-color: " + currentBoard.moduleBgColor + ";'><div class='app-chart' style='background: none;'>" + borderStyleStr + module.html
				//+ "</div><div class='app-block-border-helper'></div>"
				+"</div></div>";
		$("#show").append(moduleBody);
		jsValue = "<script type='text/javascript'>" + module.script + "<\/script>";
		//$(".app-map-overlays").append(moduleBody);
		//$(".app-map-overlays").append(jsValue);
		$("#show").append(jsValue);
	}

	boardPreview.resizeModuleView();
};

/**
 * 获取组件边框样式
 */
boardPreview.getModuleBorderStyle = function(borderStyleId) {
	if (borderStyleId == null)
		borderStyleId = "1";
	var boardStyleStr = "";
	if (borderStyleId == "0") {
		boardStyleStr = "";
	} else if (borderStyleId == "1") {
		boardStyleStr = "<div class='app-panel-border border-style-type' style='z-index:-1;border-color: rgb(25, 77, 127);'><div class='app-panel-corner corner-horizontal corner-left corner-top' style='background-color: "
				+ currentBoard.emphasizeColor
				+ ";'>"
				+ "</div><div class='app-panel-corner corner-horizontal corner-right corner-top' style='background-color: "
				+ currentBoard.emphasizeColor
				+ ";'></div>"
				+ "<div class='app-panel-corner corner-horizontal corner-right corner-bottom' style='background-color: "
				+ currentBoard.emphasizeColor
				+ ";'></div>"
				+ "<div class='app-panel-corner corner-horizontal corner-left corner-bottom' style='background-color: "
				+ currentBoard.emphasizeColor
				+ ";'></div>"
				+ "<div class='app-panel-corner corner-vertical corner-left corner-top' style='background-color: "
				+ currentBoard.emphasizeColor
				+ ";'></div>"
				+ "<div class='app-panel-corner corner-vertical corner-right corner-top' style='background-color: "
				+ currentBoard.emphasizeColor
				+ ";'></div>"
				+ "<div class='app-panel-corner corner-vertical corner-right corner-bottom' style='background-color: "
				+ currentBoard.emphasizeColor
				+ ";'></div>"
				+ "<div class='app-panel-corner corner-vertical corner-left corner-bottom' style='background-color: "
				+ currentBoard.emphasizeColor
				+ ";'></div></div>";
	} else if (borderStyleId == "2") {
		boardStyleStr = "<div class='app-conmain-border border-style-type'><div class='conmain-border-corner-1'></div><div class='conmain-border-corner-2'></div>"
				+ "<div class='conmain-border-corner-3'></div><div class='conmain-border-corner-4'></div></div>";
	}
	return boardStyleStr;
};

/**
 * 拉伸放缩组件时,更新组件显示样式
 */
boardPreview.resizeModuleView = function() {
	$(".app-chart").each(function(i) {
		$(this).children("div:first-child").css("width", $(this).width());
		$(this).children("div:first-child").css("height", $(this).height());
		var element = $(this).parents(".app-block");
		element.find(".app-chart").css("width", element.width());
		element.find(".app-chart").css("height", element.height());
		// console.log(element.width());
		element.find(".app-chart").children().eq(0).css("width", element.width());
		element.find(".app-chart").children().eq(0).css("height", element.height());
		element.find(".app-chart").find("div").each(function(i) {
			if (typeof ($(this).attr("_echarts_instance_")) == "undefined") {
			} else {
				var myChart = echarts.getInstanceByDom(document.getElementById($(this).attr("id")));
				myChart.resize();
			}
		});
	});

};