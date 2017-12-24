/**
 * 大屏模块编辑
 */
var boardEdit = new Object();
var currentModuleList = []; // 当前大屏的组件列表维护
var currentBoard; // 当前大屏信息
var recallDate = "";

/**
 * 定义实例中的模块配置信息
 */
function BoardModule() {
	this.id = 0; //组件编号
	this.x = 0; //组件左上角坐标X
	this.y = 0; //组件左上角坐标Y
	this.height = 200; //组件高度
	this.width = 300; //组件宽度
	this.type = "1"; //组件类型
	this.fontSize = 0; //默认字体大小
	this.lineHeight = 1; //行高
	this.color = ""; //前端文字颜色
	this.description = ""; //组件描述
	this.startDelay = 0; //开始延时
	this.startAnimation = 1; //启动动画延时
	this.borderStyle = 1; // 边框类型0无边框,1直角,2点,3无边框无填充
	this.html = ""; //组件前端HTML
	this.script = ""; //组件脚本
	this.moduleId = 0; // 组件id
	this.sourceId = 0; // 原始组件id
}
;

/**
 * 定义实例中的大屏配置信息
 */
function Board() {
	this.id = 0; // 大屏编号
	this.name = "大屏看板"; //看板名称
	this.description = "大屏看板"; //看板描述
	this.width = 1280; // 大屏宽度
	this.height = 800; // 大屏高度
	this.bgColor = "rgba(217, 217, 217, 1)"; // 看板背景色,加透明度可将未设置背景的组件进行透明显示
	this.textColor = "rgba(255, 255, 255, 1)"; // 一般文字颜色
	this.emphasizeColor = "rgba(255, 255, 255, 1)"; // 强调文字颜色
	this.moduleBgColor = "rgba(217, 217, 217, 0)"; // 模板背景色
	this.moduleBorderColor = "rgba(217, 217, 217, 1)"; // 模板边框颜色
	this.moduleTitleBgColor = "rgba(217, 217, 217, 1)"; // 模板标题背景颜色
	this.seriesColor1 = "#d9d9d9"; // 图形序列1颜色
	this.seriesColor2 = "#d9d9d9"; // 图形序列2颜色
	this.syncRefresh = 0; // 是否同步刷新数据
	this.showDuration = 1439; // 大屏显示时长
	this.startTime = 0; // 开始时间
	this.endTime = 1439; // 结束时间
	this.type = "1"; // 类型(0,模板;1实例)
}
;

/**
 * 初始化大屏基本信息
 * 
 * @param id
 */
boardEdit.getBoardById = function(id) {
	$.ajax({
		type : "POST",
		url : contextPathJs + "/board/getBoardById.do",
		data : {
			"id" : id
		},
		contentType : "application/x-www-form-urlencoded; charset=UTF-8",
		dataType : "json",
		ansyc : false,
		success : function(data) {
			if (data != null) {
				$(".app-container").css("width", data.width);
				$(".app-container").css("height", data.height);
				$('#boardWidth').val(data.width);
				$('#boardHeight').val(data.height);
				$(".app-editor-screen-tab-item").html(data.name);

				// 如果颜色为空，设置默认颜色
				if (typeof (data.bgColor) == "undefined" || data.bgColor == "") {
					data.bgColor = "none";
				}
				if (typeof (data.textColor) == "undefined" || data.textColor == "") {
					data.textColor = "none";
				}
				if (typeof (data.moduleBgColor) == "undefined" || data.moduleBgColor == "") {
					data.moduleBgColor = "rgba(217, 217, 217, 0)";
				}
				if (typeof (data.emphasizeColor) == "undefined" || data.emphasizeColor == "") {
					data.emphasizeColor = "rgba(217, 217, 217, 0)";
				}
				if (typeof (data.moduleBorderColor) == "undefined" || data.moduleBorderColor == "") {
					data.moduleBorderColor = "rgba(217, 217, 217, 0)";
				}
				if (typeof (data.seriesColor1) == "undefined" || data.seriesColor1 == "") {
					data.seriesColor1 = "none";
				}
				if (typeof (data.seriesColor2) == "undefined" || data.seriesColor2 == "") {
					data.seriesColor2 = "none";
				}
				if (typeof (data.seriesColor2) == "undefined" || data.seriesColor2 == "") {
					data.seriesColor2 = "none";
				}
				if (typeof (data.moduleTitleBgColor) == "undefined" || data.moduleTitleBgColor == "") {
					data.moduleTitleBgColor = "none";
				}
				colorInitial("boardBgColor", data.bgColor);
				colorInitial("textColor", data.textColor);
				colorInitial("moduleBgColor", data.moduleBgColor);
				colorInitial("emphasizeColor", data.emphasizeColor);
				colorInitial("moduleBorderColor", data.moduleBorderColor);
				colorInitial("seriesColor1", data.seriesColor1);
				colorInitial("seriesColor2", data.seriesColor2);
				colorInitial("moduleTitleBgColor", data.moduleTitleBgColor);
				$(".app-container").css("background-color", data.bgColor);
				$('#boardBgColor').val(data.bgColor); // 看板背景色
				$('#textColor').val(data.textColor); // 一般文字颜色
				$('#emphasizeColor').val(data.emphasizeColor); // 强调文字颜色
				$('#moduleBgColor').val(data.moduleBgColor); // 组件背景色
				$('#moduleBorderColor').val(data.moduleBorderColor); // 组件边框颜色
				$('#seriesColor1').val(data.seriesColor1); // 图形序列1颜色
				$('#seriesColor2').val(data.seriesColor2); /**/ // 图形序列2颜色
				$('#moduleTitleBgColor').val(data.moduleTitleBgColor); // 面板标题背景色
				currentBoard = data;

				$('.switch').click(function() {
					$(this).toggleClass("switchOn");
					if (isoState == "0") {
						isoState = "1";
					} else {
						isoState = "0";
					}
				});
				$('#showDuration').val(data.showDuration);
				$('#startTime').val(data.startTime);
				$('#endTime').val(data.endTime);
				// iso样式还原
				$("#syncRefresh").removeClass("switch");
				$("#syncRefresh").attr("class", "switch");
				isoState = 0;
				if (data.syncRefresh == "1") {
					$(".switch").trigger("click");
				}
				var createTime = data.createTime;
			}
		}
	});
};

/**
 * 选择基础组件,添加到预览界面及属性配置界面
 */
boardEdit.addBasicModule = function(id, element) {
	$.ajax({
		type : "POST",
		url : contextPathJs + "/module/getModuleById.do",
		data : {
			id : id
		},
		dataType : "json",
		success : function(data) {
			currentModuleList.push(data);
			// 1.添加组件到右侧属性编辑区; 2.添加组件到预览屏幕调整区;添加结束后删除自身添加按钮
			boardEdit.addModuleToItem(data);
			boardEdit.addModuleToBoardView(data);
			$(element).parent().remove();
		}
	});
};

/**
 * 点击模板配置行, 从预览的窗体中找到组件x,y,width,height,显示在配置属性中 显示或隐藏组件属性
 */
boardEdit.addModuleAttribute = function(moduleId, element) {
	var module = boardEdit.getModuleViewById(moduleId);
	var x = module.css("left").replace("px", "");
	var y = module.css("top").replace("px", "");
	var width = module.css("width").replace("px", "");
	var height = module.css("height").replace("px", "");
	var borderStyleId = boardEdit.getModuleViewBorderId(module);
	var borderSelect = "<select name='moduleBoardStyle' onchange='boardEdit.moduleBorderOnChange(this)' class='moduleBorder'><option "
		+ (borderStyleId == 0 ? "selected = 'selected'" : "") + " value='0'>无边框有背景</option><option " + (borderStyleId == 1 ? "selected = 'selected'" : "")
		+ "value='1'>折线角</option><option " + (borderStyleId == 2 ? "selected = 'selected'" : "") + " value='2'>点</option><option "
		+ (borderStyleId == 3 ? "selected = 'selected'" : "") + " value='3'>无边框无背景</option></select>";
	element.find(".app-editor-item-right").children().eq(1).remove();
	element.find(".app-editor-item-right").append(
		"<div class='ant-row' style='margin-bottom: 5px;'>" + "<div class='ant-col-24'>"
		+ "<div class='ant-row'><div class='ant-col-24 app-editor-item-prop-group-title'>位置</div>"
		+ "<div class='ant-row app-editor-item-prop-list'>" + "<div class='ant-col-2 app-editor-item-prop-label'>x</div><div class='ant-col-10'>"
		+ "<input name='x' type='text' style='width:100px' value='"
		+ x
		+ "'></div>"
		+ "<div class='ant-col-2 app-editor-item-prop-label'>y</div><div class='ant-col-10'>"
		+ "<input name='y' type='text' style='width:100px' value='"
		+ y
		+ "'></div>"
		+ "</div>"
		+ "<div class='ant-row'><div class='ant-col-24 app-editor-item-prop-group-title'>大小</div>"
		+ "<div class='ant-row app-editor-item-prop-list'>"
		+ "<div class='ant-col-2 app-editor-item-prop-label'>宽</div><div class='ant-col-10'>"
		+ "<input name='width' type='text' style='width:100px' value='"
		+ width
		+ "'></div>"
		+ "<div class='ant-col-2 app-editor-item-prop-label'>高</div><div class='ant-col-10'>"
		+ "<input name='height' type='text' style='width:100px' value='"
		+ height
		+ "'></div>"
		+ "</div>"
		+ "<div class='ant-row'><div class='ant-col-24 app-editor-item-prop-group-title'>样式</div>"
		+ "<div class='ant-row app-editor-item-prop-list'>"
		+ "<div class='ant-col-10 app-editor-item-prop-label'>边框类型</div><div class='ant-col-14'>" + borderSelect + "</div>" + "</div>" + "</div>");
	// 在预览窗体中,添加组件选中样式--虚边框
	var border = module.find(".app-block-border-helper");
	module.siblings().each(function(i) {
		$(this).find(".app-block-border").remove();
	});
	$("<svg width='100%' height='100%' class='app-block-border'><rect width='100%' height='100%'></rect></svg>").insertBefore(border);
	// 去除配置其他组件的配置属性和激活状态
	element.addClass("active");
	element.siblings().removeClass("active");
	element.siblings().each(function(i) {
		$(this).find(".app-editor-item-right").children().eq(1).remove();
	});
};

/**
 * 显示或隐藏组件属性 点击模板配置行, 从预览的窗体中找到组件x,y,width,height,显示在配置属性中
 */
boardEdit.editModuleView = function(moduleId) {
	var element = boardEdit.getModuleItemById(moduleId);
	boardEdit.addModuleAttribute(moduleId, element); // 单击组件时，右侧属性显示
};

/**
 * 拉伸放缩组件时,更新组件显示样式
 */
boardEdit.resizeModuleView = function(moduleId) {
	var element = boardEdit.getModuleViewById(moduleId);
	element.find(".app-chart").css("width", element.width());
	element.find(".app-chart").css("height", element.height());
	element.find(".app-chart").children().eq(0).css("width", element.width());
	element.find(".app-chart").children().eq(0).css("height", element.height());
	element.find(".app-chart").find("div").each(function(i) {
		if (typeof ($(this).attr("_echarts_instance_")) != "undefined") {
			var myChart = echarts.getInstanceByDom(document.getElementById($(this).attr("id")));
			myChart.resize();
		}
	});
};

/**
 * 加载可选择添加的组件 注:同一组件不允许多次添加,所以此处会去除重复
 */
boardEdit.loadOptionalModule = function() {
	$("#divModuleModelList").html("");
	$.ajax({
		type : "POST",
		url : contextPathJs + "/module/getBasicModule.do",
		data : {},
		dataType : "json",
		success : function(data) {
			// console.log(JSON.stringify(data));
			$("#divOptionalModuleList").html("");
			for (var i = 0; i < data.length; i++) {
				// 如果面板中已经存在此模板，则不允许重复添加，此处不再显示；
				var module = boardEdit.getModuleItemById(data[i].id);
				if (typeof (module) == "undefined") {
					$("#divOptionalModuleList").append(
						"<div style='display:inline;padding:3px;'><button type='button' class='ant-btn' onclick='boardEdit.addBasicModule(\"" + data[i].id
						+ "\",this)'><span>" + data[i].name + "</span></button></div>");
				}
			}
		}
	});
};

/**
 * 根据大屏编号获取组件
 */
boardEdit.getModuleByBoardId = function(boardId) {
	$.ajax({
		type : "POST",
		url : contextPathJs + "/module/getModuleByBoardId.do",
		data : {
			boardId : boardId
		},
		dataType : "json",
		success : function(data) {
			// console.log(JSON.stringify(data));
			$(".app-editor-editor-overlays-items>div").html("");
			for (var i = 0; i < data.length; i++) {
				//debugger;
				// 1.添加组件到右侧属性编辑区; 2.添加组件到预览屏幕调整区;
				currentModuleList.push(data[i]);
				boardEdit.addModuleToItem(data[i]);
				boardEdit.addModuleToBoardView(data[i]);
			}
		}
	});
};

/**
 * 在组件列表中删除组件, 并在编辑预览区内删除组件
 */
boardEdit.deleteModuleItem = function(moduleItem) {
	var moduleId = moduleItem.attr("data-id");
	var module = boardEdit.getModuleViewById(moduleId);
	module.remove();
	moduleItem.remove();
	for (var i = 0; i < currentModuleList.length; i++) {
		if (currentModuleList[i].id == moduleId) {
			currentModuleList.splice(i, 1);
		}
	}
};

/**
 * 添加组件到右侧属性编辑区
 */
boardEdit.addModuleToItem = function(data) {
	$(".app-editor-editor-overlays-items>div").append(
		"<div class='app-editor-item' data-id='" + data.id + "'>" + "<div class='ant-row'>" + "<div class='ant-col-2'>"
		+ "<div class='app-editor-item-view'><span class='iconfont icon-eye'></span></div>" + "</div>"
		+ "<div class='ant-col-22 app-editor-item-right'> "
		+ "<div class='ant-row app-editor-item-title'><div class='ant-col-20 app-editor-item-title-text' data-id='" + data.id + "'>" + data.name
		+ "</div><div class='ant-col-4 app-editor-item-title-tools'><i class='anticon anticon-delete'>删</i></div></div>" + "</div>" + "</div>"
		+ "</div>" + "</div>");
};

/**
 * 添加组件到预览屏幕调整区
 */
boardEdit.addModuleToBoardView = function(data) {
	// 边框颜色
	var moduleBorder = boardEdit.getModuleBorderStyle(data.borderStyle);
	var position = "left:" + data.x + "px;top:" + data.y + "px;width:" + data.width + "px;height:" + data.height + "px;";
	var moduleBody = "<div class='app-block app-block-editable app-title-panel react-draggable' title='双击选中组件' data-id='" + data.id + "' style='" + position
		+ "touch-action: none;  line-height: 2.3; color: rgb(255, 255, 255);  transform: translate(0px, 0px);'>"
		// +"<div class='app-panel app-full-box' style='border-color:rgb(33,
		// 100, 165); background-color: rgba(2, 45, 72, 0.909804);'>"
		// //组件背景色,后续有指标定义后再添加变量
		+ "<div class='app-panel app-full-box'><div class='app-chart' style='border-color:" + currentBoard.moduleBorderColor + ";background-color: "
		+ currentBoard.moduleBgColor + ";width:" + data.width + "px;height:" + data.height + "px'>"
		// + moduleBorder
		+ data.html + "</div><div class='app-block-border-helper' style='z-index:1000000'></div>"
		+ "<div class='app-block-resizer react-draggable' title='调整大小' style='touch-action: none; transform: translate(0px, 0px); z-index:1000001'></div>"
		+ moduleBorder + "</div>" + "</div>";
	$(".app-map-overlays").append(moduleBody);
	// 调整chart的宽度和高度
	boardEdit.stretchChart();
	var jsValue = "<script type='text/javascript'>" + data.script + "<\/script>";
	$("#jsShow").append(jsValue);
};

/**
 * 修改边框样式，更新预览显示
 */
boardEdit.moduleBorderOnChange = function(element) {
	var moduleId = $(element).parents(".app-editor-item").attr("data-id");
	// 根据moduleId获取预览的module
	var module = boardEdit.getModuleViewById(moduleId);
	var borderStyleId = $(element).find("option:selected").val();
	boardEdit.moduleBorderChange(module, borderStyleId);
};

/**
 * 修改边框样式，更新预览显示
 */
boardEdit.moduleBorderChange = function(moduleView, borderStyleId) {
	moduleView.find(".border-style-type").remove();
	var boardStyleStr = boardEdit.getModuleBorderStyle(borderStyleId);
	moduleView.find(".app-panel").append(boardStyleStr);
};

/**
 * 查询当前组件的边框样式
 */
boardEdit.getModuleViewBorderId = function(module) {
	if (module.find(".app-panel-border").length > 0) { // 折角
		return 1;
	} else if (module.find(".app-conmain-border").length > 0) { // 点
		return 2;
	} else if (module.find(".panel-transparency").length > 0) { // 背景透明 
		return 3;
	} else { // 无边框
		return 0;
	}
};

/**
 * 获取组件边框样式
 * 说明:0.无边框但有背景;1.直角边框;2.点边框;3.无边框透明背景;
 */
boardEdit.getModuleBorderStyle = function(borderStyleId) {
	if (borderStyleId == null)
		borderStyleId = "1";
	var boardStyleStr = "";
	if (borderStyleId == "0") {
		boardStyleStr = "";
	} else if (borderStyleId == "1") {
		boardStyleStr = "<div class='app-panel-border border-style-type' style='border-color: rgb(25, 77, 127);z-index:10'><div class='app-panel-corner corner-horizontal corner-left corner-top' style='background-color: "
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
	} else if (borderStyleId == "3") {
		boardStyleStr = "";
	}
	return boardStyleStr;
};

/**
 * 子元素的echart控件自动填充
 */
boardEdit.stretchChart = function() {
	$(".app-chart").each(function() {
		$(this).children("div:first-child").css("width", $(this).width());
		$(this).children("div:first-child").css("height", $(this).height());
	});
};

/**
 * 根据moduleId获取预览的module
 */
boardEdit.getModuleViewById = function(moduleId) {
	var overlays = $(".app-map-overlays")[0];
	var module = $(overlays).find(".app-block-editable");
	for (var i = 0; i < module.length; i++) {
		if ($(module[i]).attr("data-id") == moduleId) {
			return $(module[i]);
		}
	}
	return undefined;
};

/**
 * 根据moduleId获取右侧边栏的module
 */
boardEdit.getModuleItemById = function(moduleId) {
	var overlaysItems = $(".app-editor-editor-overlays-items");
	var item = $(overlaysItems).find(".app-editor-item");
	for (var i = 0; i < item.length; i++) {
		if ($(item[i]).attr("data-id") == moduleId) {
			return $(item[i]);
		}
	}
	return undefined;
};

/**
 * 大屏看板组件保存(保存大屏的基本信息,并保存相关组件信息)
 */
boardEdit.saveBoardModule = function() {
	var url = contextPathJs + "/module/addBoardModule.do";
	if (boardId.length > 0) {
		url = contextPathJs + "/module/updateBoardModule.do";
	}
	var board = boardEdit.getSaveBoardInfo();
	var moduleArray = boardEdit.getSaveModuleInfo();
	// 后台数据库添加
	$.ajax({
		type : "POST",
		url : url,
		dataType : "json",
		data : {
			board : JSON.stringify(board),
			moduleArray : JSON.stringify(moduleArray)
		},
		success : function(data) {
			if (data > 0) {
				alert("保存成功!");
			} else {
				alert("保存失败!");
			}
		}
	});
};

/**
 * 获取要保存的大屏信息
 */
boardEdit.getSaveBoardInfo = function() {
	var board = new Board();
	if (boardId.length > 0) {
		board.id = boardId;
	}
	board.name = currentBoard.name;
	board.description = currentBoard.description;
	board.width = $('#boardWidth').val();
	board.height = $('#boardHeight').val();
	board.bgColor = $('#boardBgColor').spectrum("get") == "" ? "#d9d9d9" : $('#boardBgColor').spectrum("get"); // 看板背景色
	board.textColor = $('#textColor').val() == "" ? "#d9d9d9" : $('#textColor').val(); // 一般文字颜色
	board.emphasizeColor = $('#emphasizeColor').spectrum("get") == "" ? "#d9d9d9" : $('#emphasizeColor').spectrum("get"); // 强调文字颜色$(this).spectrum("get");
	board.moduleTitleBgColor = $('#moduleTitleBgColor').spectrum("get") == "" ? "#d9d9d9" : $('#moduleTitleBgColor').spectrum("get"); // 组件标题背景色
	board.moduleBorderColor = $('#moduleBorderColor').spectrum("get") == "" ? "#d9d9d9" : $('#moduleBorderColor').spectrum("get"); // 组件边框颜色
	board.moduleBgColor = $('#moduleBgColor').spectrum("get") == "" ? "#d9d9d9" : $('#moduleBgColor').spectrum("get"); // 组件边框颜色
	board.seriesColor1 = $('#seriesColor1').val() == "" ? "#d9d9d9" : $('#seriesColor1').val(); // 图形序列1颜色
	board.seriesColor2 = $('#seriesColor2').val() == "" ? "#d9d9d9" : $('#seriesColor2').val(); // 图形序列2颜色
	board.syncRefresh = 0; // 是否同步刷新数据
	board.showDuration = $('#showDuration').val() == "" ? 0 : parseInt($('#showDuration').val()); // 大屏显示时长
	board.startTime = $('#startTime').val() == "" ? 0 : parseInt($('#startTime').val()); // 开始时间
	board.endTime = $('#endTime').val() == "" ? 0 : parseInt($('#endTime').val()); // 结束时间
	board.type = "1";
	//alert(JSON.stringify(board));
	console.log(board);
	return board;
};

/**
 * 获取保存的大屏组件信息
 */
boardEdit.getSaveModuleInfo = function() {
	var overlays = $(".app-map-overlays")[0];
	var moduleView = $(overlays).find(".app-block-editable");
	var moduleArray = [];
	for (var i = 0; i < moduleView.length; i++) {
		var moduleId = $(moduleView[i]).attr("data-id");
		var x = $(moduleView[i]).css("left").replace("px", "");
		var y = $(moduleView[i]).css("top").replace("px", "");
		var width = $(moduleView[i]).css("width").replace("px", "");
		var height = $(moduleView[i]).css("height").replace("px", "");
		var module = new BoardModule();
		module.id = moduleId; // 只是作为查询模板用，真正插入的id是自增长产生
		module.boardId = boardId;
		module.x = x;
		module.y = y;
		module.height = height;
		module.width = width;
		module.type = "1"; // 表示实例
		module.borderStyle = boardEdit.getModuleViewBorderId($(moduleView[i]));

		// script和html从备份列表中赋值，后续升级会从配置界面做数据提取保存
		for (var j = 0; j < currentModuleList.length; j++) {
			if (currentModuleList[j].id == moduleId) {
				module.fontSize = currentModuleList[j].fontSize;
				module.lineHeight = currentModuleList[j].lineHeight;
				module.color = currentModuleList[j].color;
				module.name = currentModuleList[j].name;
				module.description = currentModuleList[j].description;
				module.startDelay = currentModuleList[j].startDelay;
				module.startAnimation = currentModuleList[j].startAnimation;
				module.html = currentModuleList[j].html;
				module.script = currentModuleList[j].script;
				// 一定找到最原始的组件Id,便于后续基础组件的基础属性修改后，更新同步到调用的实例组件
				module.sourceId = currentModuleList[j].sourceId;
			}
		}
		moduleArray.push(module);
	}
	return moduleArray;
};

/**
 * 大屏看板预览
 */
boardEdit.boardPreview = function() {
	var board = boardEdit.getSaveBoardInfo();
	var moduleArray = boardEdit.getSaveModuleInfo();
	ehualu.utils.localStorage.set("board", JSON.stringify(board));
	ehualu.utils.localStorage.set("moduleArray", JSON.stringify(moduleArray));
	window.open("boardPreview.jsp", "_blank");
};