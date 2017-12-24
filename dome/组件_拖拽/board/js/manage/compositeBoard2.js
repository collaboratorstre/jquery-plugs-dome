var boardPreview = new Object();

/**
 * 初始化大屏基本信息
 * 
 * @param id
 */
boardPreview.getBoardInfo = function() {
	$.ajax({
		type : "POST",
		url : contextPathJs + "/board/getBoardById.do",
		data : {
			"id" : boardId
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
				$(".app-container").css("background-color", data.bgColor);
			}
		}
	});
};

boardPreview.show = function() {
	// alert(boardId);
	$.ajax({
		type : "POST",
		url : contextPathJs + "/module/getModuleByBoardId.do",
		data : {
			boardId : boardId
		},
		dataType : "json",
		success : function(data) {
			console.log(JSON.stringify(data));
			$.each(data, function(i, v) {
				var h = v.html;
				var html = "";
				// 边框类型(0无边框1直角2点)
				if (v.borderStyle == 0) {
					html += '<div title="" class="app-block react-draggable" style="left: ' + v.x + '; top: ' + v.y + '; width: ' + v.width + '; height:'
							+ v.height + '; color: ' + v.color + '; position: absolute; transform: translate(0px, 0px); touch-action: none;"><!-- 一个案例 -->';
					html += '<div class="app-panel app-full-box">';
					html += '<div class="app-chart" style="background: none;" _echarts_instance_="ec_1500861846722">';
					html += v.html;
					html += '</div>';
					html += '</div>';
					html += '</div>';
				} else if (v.borderStyle == 1) {
					html += '<div title="" class="app-block react-draggable" style="left: ' + v.x + '; top: ' + v.y + '; width: ' + v.width + '; height:'
							+ v.height + '; color: ' + v.color + '; position: absolute; transform: translate(0px, 0px); touch-action: none;"><!-- 一个案例 -->';
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
					html += '<div class="app-chart" style="background: none;" _echarts_instance_="ec_1500861846722">';
					html += v.html;
					html += '</div>';
					html += '</div>';
					html += '</div>';
				} else if (v.borderStyle == 2) {
					html += '<div class="app-block" style="touch-action:none; position:absolute; color:' + v.color + '; left:' + v.x + '; top: ' + v.y
							+ ';width: ' + v.width + '; height: ' + v.height + '; transform: translate(0px, 0px);">';
					html += '<div class="app-panel app-panel-uite">';
					html += '<div class="app-conmain">';
					html += '<div class="app-conmain-box">';
					html += '<div>';
					html += '<div class="app-conmain-border">';
					html += '<div class="conmain-border-corner-1"></div>';
					html += '<div class="conmain-border-corner-2"></div>';
					html += '<div class="conmain-border-corner-3"></div>';
					html += '<div class="conmain-border-corner-4"></div>';
					html += '</div>';
					html += '<!-- demo案例 -->';
					//html += '<div class="app-conmain-con">';
					html += v.html;
					//html += '</div>';
					html += '</div>';
					html += '</div>';
					html += '</div>';
					html += '</div>';
					html += '</div><!-- 一个案例 -->';
				} else if(h.indexOf("box-point") > 0){
					html += '<div title="" class="app-block react-draggable" style="left: ' + v.x + '; top: ' + v.y + '; width: ' + v.width + '; height:'
					+ v.height + ';  position: absolute; transform: translate(0px, 0px); touch-action: none;"><!-- 一个案例 -->';
					//html += '<div class="app-panel app-full-box">';
					html += '<div class="app-chart" style="background: none;">';
					html += v.html;
					html += '</div>';
					//html += '</div>';
					html += '</div>';
				}
				/*if (h.indexOf("xxxxx") > 0) {
					html += '<div class="app-block" style="touch-action:none; position:absolute; color:' + v.color + '; left:' + v.x + '; top: ' + v.y
							+ ';width: ' + v.width + '; height: ' + v.height + '; transform: translate(0px, 0px);">';
					html += '<div class="app-panel app-panel-uite">';
					html += '<div class="app-conmain">';
					html += '<div class="app-conmain-box">';
					html += '<div>';
					html += '<div class="app-conmain-border">';
					html += '<div class="conmain-border-corner-1"></div>';
					html += '<div class="conmain-border-corner-2"></div>';
					html += '<div class="conmain-border-corner-3"></div>';
					html += '<div class="conmain-border-corner-4"></div>';
					html += '</div>';
					html += '<!-- demo案例 -->';
					html += '<div class="app-conmain-con">';
					html += v.html;
					html += '</div>';
					html += '</div>';
					html += '</div>';
					html += '</div>';
					html += '</div>';
					html += '</div><!-- 一个案例 -->';
				} else {
					html += '<div title="" class="app-block react-draggable" style="left: ' + v.x + '; top: ' + v.y + '; width: ' + v.width + '; height:'
					+ v.height + '; color: ' + v.color + '; position: absolute; transform: translate(0px, 0px); touch-action: none;"><!-- 一个案例 -->';
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
					html += v.html;
					html += '</div>';
					html += '</div>';
					html += '</div>';
				}*/
				$("#show").append(html);

				width = $(".app-block:eq(" + i + ")").width();
				height = $(".app-block:eq(" + i + ")").height();
				$(".app-chart:eq(" + i + ") div:eq(0)").css("width", parseInt(width));
				$(".app-chart:eq(" + i + ") div:eq(0)").css("height", parseInt(height));
				$("#show").append("<script type='text/javascript'>" + v.script + "</script>");
			});
		}
	});
}
