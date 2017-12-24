var width;
var height;
/*
 * 页面加载时触发
 */
$(document).ready(function () {
	//alert($('body').height());
	var width = $("#app").width();
	var height = $("#app").height();
	$(".app-container").css("width",width);
	$(".app-container").css("height",height);
	//$(".app-container").css("background-color","rgba(224, 58, 121, 0.51)");
	$(".app-background canvas").css("width",width);
	$(".app-background canvas").css("height",height);
	show();
});

function show() {
	var boardId = "1";
	$.ajax({
		type : "POST",
		url : contextPathJs + "/module/getModuleByBoardId.do",
		data:{
			boardId:boardId
		},
		dataType : "json",
		success : function(data) {
			console.log(JSON.stringify(data));
			$.each(data, function(i, v) {
				var h = v.html;
				var html = "";
				if (h.indexOf("xxxxx")>0) {
					html += '<div title="" class="app-block react-draggable" style="left: '+v.x+'; top: '+v.y+'; width: '+v.width+'; height:'+v.height+'; color: '+v.color+'; position: absolute; transform: translate(0px, 0px); touch-action: none;"><!-- 一个案例 -->';
					html += '<div class="app-panel" style="">';
					html += '<div class="app-conmain">';
					html += '<div class="app-conmain-box">';
					html += '<div>';
					html += '<div class="app-conmain-border">';
					html += '<div class="conmain-border-corner-1"></div>';
					html += '<div class="conmain-border-corner-2"></div>';
					html += '<div class="conmain-border-corner-3"></div>';
					html += '<div class="conmain-border-corner-4"></div>';
					html += '</div>';
					html += '<div class="app-chart" style="background: none;">';
					html += v.html;
					html += '</div>';
					html += '</div>';
					html += '</div>';
					html += '</div>';
					html += '</div>';
					html += '</div>';
				} else{
					html += '<div title="" class="app-block react-draggable" style="left: '+v.x+'; top: '+v.y+'; width: '+v.width+'; height:'+v.height+'; color: '+v.color+'; position: absolute; transform: translate(0px, 0px); touch-action: none;"><!-- 一个案例 -->';
					html += '<div class="app-panel app-full-box" style="border-color: ; background-color: rgba(0, 45, 72, 0.909804);">';
					html += '<div class="app-panel-border" style="border-color: ;">';
					html += '<div class="app-panel-corner corner-horizontal corner-left corner-top"></div>';
					html += '<div class="app-panel-corner corner-horizontal corner-right corner-top"></div>';
					html += '<div class="app-panel-corner corner-horizontal corner-right corner-bottom"></div>';
					html += '<div class="app-panel-corner corner-horizontal corner-left corner-bottom"></div>';
					html += '<div class="app-panel-corner corner-vertical corner-left corner-top"></div>';
					html += '<div class="app-panel-corner corner-vertical corner-right corner-top"></div>';
					html += '<div class="app-panel-corner corner-vertical corner-right corner-bottom"></div>';
					html += '<div class="app-panel-corner corner-vertical corner-left corner-bottom"></div>';
					html += '</div>';
					html += '<!-- demo案例 -->';
					html += '<div class="app-chart" style="background: none;" _echarts_instance_="ec_1500861846722">';
					html += v.html;
					html += '</div>';
					html += '</div>';
					html += '</div><!-- 一个案例 -->';
				}
				$("#show").append(html);
				
				width = $(".app-block:eq("+i+")").width();
				height = $(".app-block:eq("+i+")").height();
				$(".app-chart:eq("+i+") div:eq(0)").css("width",parseInt(width));
				$(".app-chart:eq("+i+") div:eq(0)").css("height",parseInt(height));
				$("#show").append("<script type='text/javascript'>"+v.script+"</script>");
			});
		}
	});
}















