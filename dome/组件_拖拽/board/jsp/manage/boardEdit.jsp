<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ request.getContextPath();
	String id = request.getParameter("id");
%>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1">
<title>大屏看板编辑界面</title>
<script src="<%=basePath%>/themes/default/js/jquery.min.js"></script>
<script src="<%=basePath%>/frame/utils/common/json2.js"></script>
<script src="<%=basePath%>/frame/utils/common/jquery.resize.js"></script>
<script src="<%=basePath%>/board/js/util/ajaxUtil.js"></script>
<script src="<%=basePath%>/frame/utils/common/ehualu.js"></script>
<script src="<%=basePath%>/board/js/manage/boardEdit.js?t=2017092601"></script>
<script src="<%=basePath%>/frame/utils/echart/echarts.js"></script>
<script src="<%=basePath%>/frame/utils/echart/esl.js"></script>
<!-- 颜色选择器 -->
<link href="<%=basePath%>/themes/default/css/plugins/spectrum/spectrum.css" rel="stylesheet">
<script src="<%=basePath%>/themes/default/js/plugins/spectrum/colorPicker.js"></script>
<script src="<%=basePath%>/themes/default/js/plugins/spectrum/spectrum.js"></script>
<link rel="stylesheet" type="text/css" href="<%=basePath%>/board/css/isoSwitch.css">
<link rel="stylesheet" type="text/css" href="<%=basePath%>/themes/default/css/board.css">
<link rel="stylesheet" type="text/css" href="<%=basePath%>/board/css/main.css">
</head>
<body style="background:#fff;">
	<div id="app" class="app">
		<div data-reactroot="" class="app-editor">
			<div class="app-editor-top">
				<div class="ant-row">
					<div class="ant-col-8">
						<a href="boardManage.jsp"><i class="anticon anticon-left-circle-o"></i>返回列表</a>
					</div>
					<div class="ant-col-8" style="text-align: center;">
						<span></span>
					</div>
					<div class="ant-col-8 app-editor-top-toolbar" style="text-align: right;"></div>
				</div>
			</div>
			<div class="app-editor-main">
				<div class="app-editor-screen-tab">
					<li class="app-editor-screen-tab-item active">看板</li>
					<!-- <li class="app-editor-screen-tab-item ">城市交通实时监测</li> -->
					<li class="app-editor-screen-tab-add"><i class="anticon anticon-plus"></i></li>
				</div>
				<div class="app-editor-render">
					<div class="app-editor-render-container">
						<div class="app-editor-render-content">
							<div class="app-editor-render-wrapper" style="margin-top: 39px;">
								<div class="app-editor-render-scale-wrapper" style="transform: scale(1); transition: all 0.2s linear; transform-origin: 0px 0px 0px;">
									<div class="app-container" style=" background-color: rgba(229, 229, 229, 0.509804);">
										<!-- <div class="app-background">
										<canvas width="1380" height="768" style="width: 1380px; height: 768px;"></canvas>
									</div>
									<div class="app-map"></div> -->
										<div>
											<!-- 组件module -->
											<div class="app-map-overlays">
												<!-- 单个组件start-->
												<!--<div class="app-block app-block-editable app-title-panel react-draggable" title="双击选中组件"
												style="touch-action: none; position: absolute; font-size: 36px; line-height: 2.3; color: rgb(255, 255, 255); left: 0px; top: 0px; width: 1920px; height: 50px; transform: translate(0px, 0px);">
												-->

												<!--组件主体内容 start-->

												<!-- <div class="app-title-panel-bg">
													<div class="app-title-text" style="color: rgb(255, 255, 255);">
														<div class="app-title-text-placeholder">城市交通实时监测</div>
														<div class="app-title-text-bg">
															<svg class="app-full-box app-title-text-bg-svg">
																<defs>
        			<linearGradient id="title-panel-bg-1" x1="0%" y1="0%" x2="0%" y2="100%">
        			<stop offset="0%" style="stop-color: rgba(197, 24, 93, 0.843137); stop-opacity: 1;">
        			</stop>
																<stop offset="100%" style="stop-color: rgba(197, 24, 93, 0.843137); stop-opacity: 0;">
        			</stop></linearGradient></defs>
																<polygon points="0,0 180,0 90,113" style="fill: url(&quot;#title-panel-bg-1&quot;);"></polygon>
        			<polygon points="180,0 467,0 567,133 100,133" style="fill: url(&quot;#title-panel-bg-1&quot;);"></polygon>
																<polygon points="467,0 647,0 557,113" style="fill: url(&quot;#title-panel-bg-1&quot;);"></polygon></svg>
															<div class="app-title-text-real">城市交通实时监测</div>
														</div>
													</div>
												</div>
												<!--组件主体内容 end->
												<div class="app-block-border-helper"></div>
												<div class="app-block-resizer react-draggable" title="调整大小" style="touch-action: none; transform: translate(0px, 0px);"></div>
											 
											 	</div>	-->
												<!-- 单个组件 end-->


											</div>
										</div>

									</div>
								</div>
							</div>
						</div>
						<div class="app-editor-render-toolbar">
							<div class="ant-row">
								<div class="ant-col-1">缩放：</div>
								<div class="ant-col-4">
									<div class="ant-slider">
										<div class="ant-slider-rail"></div>
										<div class="ant-slider-track" style="visibility: hidden; left: 0%; width: 5.55556%;"></div>
										<div class="ant-slider-step"></div>
										<div class="ant-slider-handle" style="left: 5.55556%;"></div>
										<div class="ant-slider-mark"></div>
									</div>
								</div>
								<div class="ant-col-4  ant-col-4-em">
									<!-- react-text: 45 -->
									<em>15%</em>
									<!-- /react-text -->
									<span class="app-editor-render-adaptation"><button type="button" class="ant-btn ant-btn-circle ant-btn-sm ant-btn-icon-only">
											<i class="anticon anticon-scan"></i>
										</button></span>
								</div>
								<div class="ant-col-15" style="text-align: right;">
									<!-- <button title="复制当前屏幕" type="button" class="ant-btn">
										<i class="anticon anticon-copy"></i><span>复 制</span>
									</button>
									<button title="删除当前屏幕" type="button" class="ant-btn">
										<i class="anticon anticon-delete"></i><span>删 除</span>
									</button> -->
									<a class="ant-btn" target="_blank" href="javascript:boardEdit.boardPreview()"><i class="anticon anticon-chrome"></i><span style="margin-left: 5px;">预 览</span></a>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="app-editor-sider">
					<div class="app-editor-editor-panels">
						<div class="ant-tabs ant-tabs-top ant-tabs-mini ant-tabs-line">
							<div role="tablist" class="ant-tabs-bar" tabindex="0">
								<div class="ant-tabs-nav-container">
									<div class="ant-tabs-nav-wrap">
										<div class="ant-tabs-nav-scroll">
											<div class="ant-tabs-nav ant-tabs-nav-animated">
												<div class="ant-tabs-ink-bar ant-tabs-ink-bar-animated" style="display: block; transform: translate3d(0px, 0px, 0px); width: 56px;"></div>
												<div role="tab" aria-disabled="false" aria-selected="true" class="ant-tabs-tab-active ant-tabs-tab">组件</div>
												<!-- <div role="tab" aria-disabled="false" aria-selected="false" class=" ant-tabs-tab">背景</div> -->
												<div role="tab" aria-disabled="false" aria-selected="false" class=" ant-tabs-tab">页面属性</div>
												<div role="tab" aria-disabled="false" aria-selected="false" class=" ant-tabs-tab">全局属性</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="ant-tabs-content ant-tabs-content-animated" style="margin-left: 0%;">
								<div class="ant-tabs-tabpane ant-tabs-tabpane-active">
									<!--选项卡con一显示-->
									<div class="app-editor-editor-overlays-pane">
										<div class="app-editor-editor-overlays-items">
											<!--组件列表-->
											<div>
												<!-- <div class="app-editor-item">
													<div class="ant-row">
														<div class="ant-col-2">
															<div class="app-editor-item-view">
																<span class="iconfont icon-eye"></span>
															</div>
														</div>
														<div class="ant-col-22 app-editor-item-right">
															<div class="ant-row app-editor-item-title">
																<div class="ant-col-20 app-editor-item-title-text">标题</div>
																<div class="ant-col-4 app-editor-item-title-tools">
																	<i class="anticon anticon-delete">删</i>
																</div>
															</div>
															<div class="ant-row" style="margin-bottom: 5px;">
																<div class="ant-col-24">
																	<div class="ant-row">字段名称区域</div>
																	<div class="ant-row app-editor-item-prop-list">字段值区域</div>
																</div>
															</div>
														</div>
													</div>
												</div> -->
											</div>
										</div>
										<div class="app-editor-editor-overlays-add">
											<button type="button" class="ant-btn ant-btn-dashed">
												<i class="anticon anticon-plus"></i><span>添加组件</span>
											</button>
										</div>
									</div>
								</div>
								<!-- <div class="ant-tabs-tabpane ant-tabs-tabpane-inactive">
									选项卡con二隐藏
									背景颜色
								</div> -->
								<div class="ant-tabs-tabpane ant-tabs-tabpane-inactive">
									<!--选项卡con...隐藏-->
									<div class='ant-row' style='margin-bottom: 5px;'>
										<div class='ant-col-24' style="display:none">
											<div class='ant-row app-editor-item-prop-list'>
												<div class='ant-col-8 app-editor-item-prop-label'>一般文字颜色</div>
												<div class='ant-col-16'>
													<input id="textColor" />(暂未开放)
												</div>
											</div>
										</div>
										<div class='ant-col-24' style="display:none">
											<div class='ant-row app-editor-item-prop-list'>
												<div class='ant-col-8 app-editor-item-prop-label'></div>
												<div class='ant-col-16'>应用在内容部分的文字上</div>
											</div>
										</div>
										<br />
										<div class='ant-col-24'>
											<div class='ant-row app-editor-item-prop-list'>
												<div class='ant-col-8 app-editor-item-prop-label'>强调元素颜色</div>
												<div class='ant-col-16'>
													<input id="emphasizeColor" />
												</div>
											</div>
										</div>
										<div class='ant-col-24'>
											<div class='ant-row app-editor-item-prop-list'>
												<div class='ant-col-8 app-editor-item-prop-label'></div>
												<div class='ant-col-16'>应用在强调的文字、图像、图标等。</div>
											</div>
										</div>
										<br />
										<div class='ant-col-24'>
											<div class='ant-row app-editor-item-prop-list'>
												<div class='ant-col-8 app-editor-item-prop-label'>组件背景色</div>
												<div class='ant-col-16'>
													<input id="moduleBgColor" />
												</div>
											</div>
										</div>
										<br />
										<div class='ant-col-24'>
											<div class='ant-row app-editor-item-prop-list'>
												<div class='ant-col-8 app-editor-item-prop-label'>组件边框色</div>
												<div class='ant-col-16'>
													<input id="moduleBorderColor" />
												</div>
											</div>
										</div>
										<br />
										<div class='ant-col-24' style="display:none">
											<div class='ant-row app-editor-item-prop-list'>
												<div class='ant-col-8 app-editor-item-prop-label'>统计图颜色</div>
												<div class='ant-col-16'>
													<input id="seriesColor1" />(暂为开放)
												</div>
											</div>
										</div>
										<div class='ant-col-24' style="display:none">
											<div class='ant-row app-editor-item-prop-list'>
												<div class='ant-col-8 app-editor-item-prop-label'></div>
												<div class='ant-col-16'>统计图的线条颜色等。</div>
											</div>
										</div>
										<br />
										<div class='ant-col-24' style="display:none">
											<div class='ant-row app-editor-item-prop-list'>
												<div class='ant-col-8 app-editor-item-prop-label'>统计图对比色</div>
												<div class='ant-col-16'>
													<input id="seriesColor2" class="colorSelect" />
												</div>
											</div>
										</div>
										<div class='ant-col-24' style="display:none">
											<div class='ant-row app-editor-item-prop-list'>
												<div class='ant-col-8 app-editor-item-prop-label'></div>
												<div class='ant-col-16'>统计图的对比线条颜色等。</div>
											</div>
										</div>
										<br />
										<div class='ant-col-24' style="display:none">
											<div class='ant-row app-editor-item-prop-list'>
												<div class='ant-col-8 app-editor-item-prop-label'>面板标题背景色</div>
												<div class='ant-col-16'>
													<input id="moduleTitleBgColor" />
												</div>
											</div>
										</div>
										<br />
										<div class='ant-col-24' style="display:none">
											<div class='ant-row app-editor-item-prop-list'>
												<div class='ant-col-8 app-editor-item-prop-label'>错开更新时间</div>
												<div class='ant-col-16'>
													<div class="switch" id="syncRefresh"></div>
												</div>
											</div>
										</div>
										<br />
										<div class='ant-col-24' style="display:none">
											<div class='ant-row app-editor-item-prop-list'>
												<div class='ant-col-8 app-editor-item-prop-label'>显示时长（秒）</div>
												<div class='ant-col-16'>
													<input type="text" id="showDuration" name="showDuration" />
												</div>
											</div>
										</div>
										<br />
										<div class='ant-col-24' style="display:none">
											<div class='ant-row app-editor-item-prop-list'>
												<div class='ant-col-8 app-editor-item-prop-label'>开始时间</div>
												<div class='ant-col-16'>
													<input type="text" class="" id="startTime" name="startTime" />
												</div>
											</div>
										</div>
										<br />
										<div class='ant-col-24' style="display:none">
											<div class='ant-row app-editor-item-prop-list'>
												<div class='ant-col-8 app-editor-item-prop-label'>结束时间</div>
												<div class='ant-col-16'>
													<input type="text" class="" id="endTime" name="endTime" />
												</div>
											</div>
										</div>
										<br />

									</div>
								</div>
								<div class="ant-tabs-tabpane ant-tabs-tabpane-inactive">
									<!--选项卡con...隐藏-->
									<div class='ant-col-24'>
										<div class='ant-row app-editor-item-prop-list'>
											<div class='ant-col-8 app-editor-item-prop-label'>大屏宽度</div>
											<div class='ant-col-16'>
												<input type="text" class="boardSize" id="boardWidth" name="boardWidth" />
											</div>
										</div>
									</div>
									<br />
									<div class='ant-col-24'>
										<div class='ant-row app-editor-item-prop-list'>
											<div class='ant-col-8 app-editor-item-prop-label'>大屏高度</div>
											<div class='ant-col-16'>
												<input type="text" class="boardSize" id="boardHeight" name="boardHeight" />
											</div>
										</div>
									</div>
									<br />
									<div class='ant-col-24'>
										<div class='ant-row app-editor-item-prop-list'>
											<div class='ant-col-8 app-editor-item-prop-label'>大屏背景颜色</div>
											<div class='ant-col-16'>
												<input id="boardBgColor" />
											</div>
										</div>
									</div>

								</div>

							</div>
						</div>
					</div>
					<div class="app-editor-editor-toolbar">
						<span style="margin-right: 10px;"><span style="margin-right: 10px;"></span><span class="ant-switch" tabindex="0"><span class="ant-switch-inner"></span></span></span>
						<button type="button" class="ant-btn ant-btn-primary">
							<i class="anticon anticon-cloud"></i><span>保 存</span>
						</button>
					</div>
				</div>
			</div>
			<!-- react-empty: 68 -->
		</div>
	</div>

	<!-- 组件模板列表 -->
	<!-- <div id="divModuleModelList" style="display:none;line-height:20px;padding:10px;position:absolute;right:10px;top:10px;width:300px;height:200px; background-color:#ccc;zindex:10000000;">

		<div id="divModuleModelList"></div>
	</div> -->

	<div id="divOptionalModule" class="ant-popover ant-popover-placement-bottom" style="display:none; position:absolute;right: 10px; top: 10px;zindex:10000000; ">
		<div class="ant-popover-content">
			<div class="ant-popover-arrow"></div>
			<div class="ant-popover-inner">
				<div>
					<div class="ant-popover-title">选择组件</div>
					<div class="ant-popover-inner-content">
						<div class="app-editor-editor-overlays-add-content">
							<!-- <div class="app-editor-editor-overlays-add-content-title">
								<span>通用组件</span>
							</div>
							<div class="app-editor-editor-overlays-add-content-content">
								<button type="button" class="ant-btn">
									<span>矩形区块</span>
								</button>
							</div> -->
							<div class="app-editor-editor-overlays-add-content-title">
								<span>业务组件</span> &nbsp;&nbsp;&nbsp;&nbsp;
								<button type="button" class="ant-btn" onclick="javascript:$(this).parents('.ant-popover-placement-bottom').css('display','none');">
									<span>关闭</span>
								</button>
							</div>
							<div id="divOptionalModuleList" class="app-editor-editor-overlays-add-content-content">
								<button type="button" class="ant-btn">
									<span>行政区排行面板</span>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- js追加 -->
	<div id="jsShow"></div>

</body>
<script type="text/javascript">
/**
 *下方放大缩小框--拖动缩放
 */
 function automateSizeRender(){
    var $div = $(".ant-slider-handle"); 
    var oM_W = $(".app-editor-render").width();
    var oM_H = $(".app-editor-render").height(); 
    var oB_W = $(".app-editor-render-scale-wrapper").width($(".app-container").css("width")+"px");
    var oB_H = $(".app-editor-render-scale-wrapper").height($(".app-container").css("height")+"px");
     
    oB_W = oB_W>100?oB_W:oM_W;
    oB_H = oB_H>50?oB_H:oM_H;
    //var oA_W = oM_W-100>oA_W?oA_W:oM_W-100;
    //var oA_H = oM_H-50>oA_H?oA_H:oM_H-50;
    //console.log($(".app-editor-render-scale-wrapper"));
    //console.log("a_"+oA_W);
    //console.log("b_"+oM_H);
    if(oB_H*oM_W/oB_W>oM_H){ 
        var x = ((oM_H-100)/oB_H).toFixed(2);
        $(".app-editor-render-scale-wrapper").css({
          "transform": "scale(" + x +")",
     });
     $(".ant-col-4-em em").text(x*100 + "%");
     var mm = $div.parent(".ant-slider").width();
     $div.css({
         "left":x*mm+"px",
     });
     
     $(".app-editor-render-wrapper").css({
         "width":x*oB_W + "px",
         "height":x*oB_H + "px",
         "margin-top":"20px"
        });
    }else{
        var x = ((oM_W-100)/oB_W).toFixed(2);
        $(".app-editor-render-scale-wrapper").css({
            "transform": "scale(" + x +")",
       });
       $(".ant-col-4-em em").text(x*100 + "%");
       var mm = $div.parent(".ant-slider").width();
       $div.css({
           "left":x*mm+"px",
       });
       
       $(".app-editor-render-wrapper").css({
         "width":x*oB_W + "px",
         "height":x*oB_H + "px",
         "margin-top":"20px"
        });
    }     
 
    $div.bind("mousedown",function(event){
      var oMaxWidth = $(".ant-slider").width();
      var oblack = $(".app-editor-render-scale-wrapper");
      var offset_x = $(this)[0].offsetLeft;
      var mouse_x = event.pageX;
      var mouseMove = function(ev){
        var _x = ev.pageX - mouse_x;
        var now_x = 0;
        if((offset_x + _x)<0){
          now_x = 0;
        }else if((offset_x + _x)>parseInt(oMaxWidth)){
            now_x = oMaxWidth;
        }else{
            now_x = (offset_x + _x ) + "px";
        }
    
        $div.css({
          left:now_x,
        });
        $(".ant-slider-track").css({
          width:now_x,
        });
        var decimals = (parseInt(now_x)/parseInt(oMaxWidth));
        var percentage = parseInt(decimals*100);
        console.log(percentage);
        $(".ant-col-4-em em").text(percentage + "%");
        
        oblack.css({
          "transform": "scale(" + decimals.toFixed(2) +")",
        });
        $(".app-editor-render-wrapper").css({
         "width":(parseInt(oblack.width()))*decimals.toFixed(2) + "px",
         "height":(parseInt(oblack.height()))*decimals.toFixed(2)+"px",
         "margin-top":"20px"
        });
      };

      $(document).bind("mousemove",mouseMove);
      /* 当鼠标左键松开，接触事件绑定 */
      $(document).bind('mouseup',function() {
        $(document).unbind('mousemove',mouseMove);
      });
    }); 
  } 
/****拖动缩放*****/ 
</script>
<script type="text/javascript">
	var contextPathJs="<%=basePath%>";
	var boardId="<%=id%>";
	var basePath = contextPathJs;
	/**
	 * 初始化画布时加载过程
	 */
	$(document).ready(
			function() {
				boardEdit.getBoardById(boardId);
				boardEdit.getModuleByBoardId(boardId);
				//点击单个组件		
				$(".app-editor-editor-overlays-items").on("click", ".app-editor-item-title-text", function() {
					var moduleId = $(this).parents(".app-editor-item").attr("data-id");
					var moduleItem = $(this).parents(".app-editor-item");
					if (moduleItem.find(".app-editor-item-right").children().length < 2) { //添加属性 //属性展开,并设置active
						boardEdit.addModuleAttribute(moduleId, moduleItem);
					} else {//删除显示当前属性
						var module = boardEdit.getModuleViewById(moduleId);
						module.find(".app-block-border").remove();
						$(this).parents(".app-editor-item").removeClass("active");
						$(this).parents(".app-editor-item").find(".app-editor-item-right").children().eq(1).remove();
					}
				});

				//右侧属性列表编辑文本框变化时候--预览窗口的样式同步更新
				$(".app-editor-editor-overlays-items").on("change", "input", function() {
					var val = $(this).val();
					var moduleId = $(this).parents(".app-editor-item").attr("data-id");
					//根据moduleId获取预览的module
					var module = boardEdit.getModuleViewById(moduleId);
					if ($(this).attr("name") == "x") {
						module.css("left", val + "px");
					}
					if ($(this).attr("name") == "y") {
						module.css("top", val + "px");
					}
					if ($(this).attr("name") == "height") {
						module.css("height", val + "px");
					}
					if ($(this).attr("name") == "width") {
						module.css("width", val + "px");
					}
				});
				//右侧属性列表下拉列表值改变时--预览窗口的样式同步更新
			/* 	$(".moduleBorder").bind("change",function() {
					console.log("select change.....");
					var val = $(this).val();
					var moduleId = $(this).parents(".app-editor-item").attr("data-id");
					//根据moduleId获取预览的module
					var module = boardEdit.getModuleViewById(moduleId);
					if ($(this).attr("name") == "moduleBorderStyle") { 
						boardEdit.moduleBorderChange(module, $(this).val());
					} 
				}); 
				
				$(".moduleBorder").on("change",function() {
					console.log("select change...111111..");
				});

				$(".moduleBorder").change(function() {
					console.log("select change...333..");
				}); */
				//单个组件删除		
				$(".app-editor-editor-overlays-items>div").on("click", ".anticon-delete", function() {
					if (confirm("确定要删除该组件么?")) {
						var moduleItem = $(this).parents(".app-editor-item");
						boardEdit.deleteModuleItem(moduleItem);
					}
				});

				//监听输入的配置数据只能为数字(x,y,width,height)
				$(".app-editor-editor-overlays-items>div").on("keypress", "input", function(event) {
					var keyCode = event.which;
					if (keyCode == 46 || (keyCode >= 48 && keyCode <= 57)) {
						return true;
					} else {
						return false;
					}
				}).focus(function() {
					this.style.imeMode = 'disabled';
				});

				//大屏宽度和高度设置
				$(".boardSize").keypress(function(event) {
					var keyCode = event.which;
					if (keyCode == 46 || (keyCode >= 48 && keyCode <= 57)) {
						return true;
					} else
						return false;
				}).focus(function() {
					this.style.imeMode = 'disabled';
				});

				//看板配置的属性修改，同步修改预览界面
				$(".ant-tabs-content").on("change", "input", function() {
					//console.log("ttt"+$(this).attr("name"));
					//console.log("ttt    " + $(this).attr("id"));
					//console.log("ttt    " + $(this).val());
					if ($(this).attr("name") == "boardWidth") {//看板宽度修改
						$(".app-container").css("width", $(this).val());
						$(".app-editor-render-scale-wrapper").css("width", $(this).val());
						currentBoard.width = $(this).val();
					} else if ($(this).attr("name") == "boardHeight") {//看板高度修改
						$(".app-container").css("height", $(this).val());
						$(".app-editor-render-scale-wrapper").css("height", $(this).val());
						currentBoard.height = $(this).val();
					} else if ($(this).attr("id") == "boardBgColor") {//看板背景色修改
						$(".app-container").css("background-color", $(this).spectrum("get"));
						currentBoard.bgColor = $(this).spectrum("get");
					} else if ($(this).attr("id") == "moduleBgColor") {//组件背景色修改
						$(".app-chart").css("background-color", $(this).spectrum("get")); 
						currentBoard.moduleBgColor =$(this).spectrum("get");
					} else if ($(this).attr("id") == "moduleBorderColor") {//组件边框色修改
						$(".app-chart").css("border-color", $(this).spectrum("get"));
						currentBoard.moduleBorderColor = $(this).spectrum("get");
					} else if ($(this).attr("id") == "emphasizeColor") {//强调元素色修改
						$(".app-panel-corner").css("background-color", $(this).spectrum("get"));
						currentBoard.emphasizeColor = $(this).spectrum("get");
					}
					//console.log($(".app-chart").css("background-color"));
					//console.log($(".app-chart").css("border-color")); 
				});

				//背景颜色切换改变
				$("#boardBgColor").change(function() {
					$(".app-container").css("background-color", $(this).val());
				});

				//添加新组件		
				$(".app-editor-editor-overlays-add").on("click", ".ant-btn-dashed", function() {
					$("#divOptionalModule").css("display", "block");
					$("#divOptionalModule").css("right", "10");
					$("#divOptionalModule").css("top", "10");
					$("#divOptionalModule").css("width", "300");
					boardEdit.loadOptionalModule();
				});

				//保存大屏配置模块
				$(".app-editor-editor-toolbar").on("click", ".ant-btn-primary", function() {
					boardEdit.saveBoardModule();
				});

				//tab切换配置类型(组件、页面属性、全局属性)
				$(".ant-tabs-nav-animated .ant-tabs-tab").click(
						function() {
							var _index = $(this).index();
							$(".ant-tabs-nav-animated .ant-tabs-tab").eq($(this).index() - 1).addClass("ant-tabs-tab-active").siblings(".ant-tabs-tab")
									.removeClass('ant-tabs-tab-active');
							$(".ant-tabs-content-animated .ant-tabs-tabpane").hide().removeClass("ant-tabs-tabpane-inactive").eq(_index - 1).show().addClass(
									"ant-tabs-tabpane-active");
							$(".ant-tabs-nav-animated .ant-tabs-tab").eq($(this).index() - 1).attr("aria-selected", "true").siblings(".ant-tabs-tab").attr(
									"aria-selected", "false");
							var left = $(".ant-tabs-nav-animated .ant-tabs-tab").eq($(this).index() - 1).position().left;
							var width = $(".ant-tabs-nav-animated .ant-tabs-tab").eq($(this).index() - 1).css("width");
							$(".ant-tabs-ink-bar-animated").css("width", width);
							$(".ant-tabs-ink-bar-animated").css({
								"transform" : "translate3d(" + left + "px, 0px, 0px)"
							});
						});
			});

	//单个组件的放大缩小及位置移动操作
	$(function() {
		//是否移动
		var mFlag = false;
		var isResizing = false;
		//鼠标与div左上角相对位置
		var divX, divY;
		var mouseStartX, mouseStartY;
		var selectedModule;
		var moduleId;
		var eTarget = "";//标记是移动动作还是放大缩小动作app-panel-border
		//$(".app-map-overlays").on("click mousedown", ".app-panel-border", function(e) {
		$(".app-map-overlays").on("click mousedown", ".app-block-editable", function(e) {
			if (event.type == 'click') {
			} else if (event.type == 'mousedown') {
				mFlag = true;
				isResizing = true;
				if (e.target.className == "app-block-border-helper") {//标识移动位置
					eTarget = "move";
				} else if (e.target.className.indexOf("app-block-resizer") > -1) {//标识拖动大小
					eTarget = "resizer";
				}
				selectedModule = $(this);
				moduleId = $(this).attr("data-id");
				boardEdit.editModuleView(moduleId);
				//console.log("move  ---- moduleId:" + moduleId);
				divX = e.pageX - parseInt($(this).css("left"));
				divY = e.pageY - parseInt($(this).css("top"));
				if (eTarget == "resizer") { //放大或缩小组件
					mouseStartX = e.clientX;
					mouseStartY = e.clientY;
				}
				$(this).fadeTo(20, 0.6);//点击后开始拖动并透明
				//$(".app-block-editable").fadeTo(20, 0.6);//点击后开始拖动并透明
			}
		});
		//移动动作
		$(document).mousemove(function(e) {
			if (mFlag) {
				var moduleItem = boardEdit.getModuleItemById(moduleId);
				if (eTarget == "move") {
					selectedModule.css({
						top : e.pageY - divY,
						left : e.pageX - divX
					});
					moduleItem.find("input[name='x']").val(e.pageX - divX);
					moduleItem.find("input[name='y']").val(e.pageY - divY);
				} else if (eTarget == "resizer") { //放大
					if (isResizing) {
						selectedModule.css("width", (selectedModule.width() + e.clientX - mouseStartX) + "px");
						selectedModule.css("height", (selectedModule.height() + e.clientY - mouseStartY) + "px");
						mouseStartX = e.clientX;
						mouseStartY = e.clientY;
						moduleItem.find("input[name='width']").val(selectedModule.width() + e.clientX - mouseStartX);
						moduleItem.find("input[name='height']").val(selectedModule.height() + e.clientY - mouseStartY);
						boardEdit.resizeModuleView(moduleId);
					}
				}
			}
		}).mouseup(function(e) {
			mFlag = false;
			isResizing = false;
			$(".app-block-editable").fadeTo("fast", 1);//松开鼠标后停止移动并恢复成不透明
		});
		automateSizeRender();
	});
</script>


</html>
