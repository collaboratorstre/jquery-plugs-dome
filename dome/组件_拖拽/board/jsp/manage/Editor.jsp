<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ request.getContextPath();
    String id=request.getParameter("id");
%>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1">
<title>大屏看板编辑界面</title>
<script src="../../../themes/default/js/jquery.min.js"></script>
<script src="../../../board/js/manage/boardEdit.js"></script>
<link rel="stylesheet" type="text/css" href="../../../themes/default/css/board.css">

<!-- 业务js -->
<script src="<%=basePath%>/board/js/manage/boardManage.js"></script>

<!-- 颜色选择器 -->
<link href="<%=basePath%>/themes/default/css/plugins/spectrum/spectrum.css" rel="stylesheet">
<script src="<%=basePath%>/themes/default/js/plugins/spectrum/docs.js"></script>
<script src="<%=basePath%>/themes/default/js/plugins/spectrum/spectrum.js"></script>

<!-- iso效果 -->
<link href="<%=basePath%>/board/css/board.css" rel="stylesheet">
</head>
<body>


 <div id="app" class="app">
   <div data-reactroot="" class="app-editor">
    <div class="app-editor-top">
     <div class="ant-row">
      <div class="ant-col-8">
       <a href="#"><i class="anticon anticon-left-circle-o"></i>
        <!-- react-text: 21 --> 返回列表
        <!-- /react-text --></a>
      </div>
      <div class="ant-col-8" style="text-align: center;">
       <span>111</span>
      </div>
      <div class="ant-col-8 app-editor-top-toolbar" style="text-align: right;"></div>
     </div>
    </div>
    <div class="app-editor-main">
     <div class="app-editor-screen-tab"><li class="app-editor-screen-tab-item active">城市交通实时监测</li><li class="app-editor-screen-tab-item ">城市交通实时监测</li><li class="app-editor-screen-tab-add"><i class="anticon anticon-plus"></i></li></div>
     <div class="app-editor-render">
      <div class="app-editor-render-container">
       <div class="app-editor-render-content">
        <div class="app-editor-render-wrapper" style="width: 288px; height: 162px; margin-top: 39px;">
         <div class="app-editor-render-scale-wrapper" style="width: 1920px; height: 1080px; transform: scale(0.15); transition: all 0.2s linear; transform-origin: 0px 0px 0px;"></div>
        	<div class="app-container1"></div>
        </div>
       </div>
       <div class="app-editor-render-toolbar">
        <div class="ant-row">
         <div class="ant-col-1">
          缩放：
         </div>
         <div class="ant-col-4">
          <div class="ant-slider">
           <div class="ant-slider-rail"></div>
           <div class="ant-slider-track" style="visibility: hidden; left: 0%; width: 5.55556%;"></div>
           <div class="ant-slider-step"></div>
           <div class="ant-slider-handle" style="left: 5.55556%;"></div>
           <div class="ant-slider-mark"></div>
          </div>
         </div>
         <div class="ant-col-4">
          <!-- react-text: 45 -->15%
          <!-- /react-text -->
          <span class="app-editor-render-adaptation"><button type="button" class="ant-btn ant-btn-circle ant-btn-sm ant-btn-icon-only"><i class="anticon anticon-scan"></i></button></span>
         </div>
         <div class="ant-col-15" style="text-align: right;">
          <button title="复制当前屏幕" type="button" class="ant-btn"><i class="anticon anticon-copy"></i><span>复 制</span></button>
          <button title="删除当前屏幕" type="button" class="ant-btn"><i class="anticon anticon-delete"></i><span>删 除</span></button>
          <a class="ant-btn" target="_blank" href="./index.html?styleId=596c7d978989dabdf4216ea2"><i class="anticon anticon-chrome"></i><span style="margin-left: 5px;">打 开</span></a>
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
                     <div role="tab" aria-disabled="false" aria-selected="true" class="ant-tabs-tab-active ant-tabs-tab">
                      组件
                     </div>
                     <div role="tab" aria-disabled="false" aria-selected="false" class=" ant-tabs-tab">
                      背景
                     </div>
                     <div role="tab" aria-disabled="false" aria-selected="false" class=" ant-tabs-tab">
                      页面属性
                     </div>
                     <div role="tab" aria-disabled="false" aria-selected="false" class=" ant-tabs-tab">
                      全局属性
                     </div>
                    </div>
                   </div>
                  </div>
                 </div>
              </div>
              <div class="ant-tabs-content ant-tabs-content-animated" style="margin-left: 0%;">
                  <div class="ant-tabs-tabpane ant-tabs-tabpane-active"><!--选项卡con一显示-->
                    <div class="app-editor-editor-overlays-pane">
                        <div class="app-editor-editor-overlays-items"><!--组件列表-->
                            <div>
                                  <div class="app-editor-item">
                                    <div class="ant-row">
                                      <div class="ant-col-2">
                                          <div class="app-editor-item-view"><span class="iconfont icon-eye"></span></div>
                                      </div>
                                      <div class="ant-col-22 app-editor-item-right"> 
                                          <div class="ant-row app-editor-item-title"><div class="ant-col-20 app-editor-item-title-text">标题</div><div class="ant-col-4 app-editor-item-title-tools"><i class="anticon anticon-delete">删</i></div></div>
                                          <div class="ant-row" style="margin-bottom: 5px;">
                                              <div class="ant-col-24">
                                                  <div class="ant-row">字段名称区域</div>
                                                  <div class="ant-row app-editor-item-prop-list">字段值区域</div>
                                              </div>
                                          </div>
                                      </div>
                                    </div>
                                  </div>
                            </div>
                        </div>
                        <div class="app-editor-editor-overlays-add"><button type="button" class="ant-btn ant-btn-dashed"><i class="anticon anticon-plus"></i><span>添加组件</span></button></div>
                    </div>
                  </div>
                  <div class="ant-tabs-tabpane ant-tabs-tabpane-inactive"><!--选项卡con二隐藏-->背景颜色
                  </div>
                  <div class="ant-tabs-tabpane ant-tabs-tabpane-inactive"><!--选项卡con...隐藏-->
                     <div class='ant-row' style='margin-bottom: 5px;'>
                     	<div class='ant-col-24'>
                           <div class='ant-row app-editor-item-prop-list'>
                              <div class='ant-col-8 app-editor-item-prop-label'>一般文字颜色</div>
                              <div class='ant-col-16'><input id="generalTextColor" onchange="colorChage();" /></div>
                           </div>
                        </div>
                        <div class='ant-col-24'>
                           <div class='ant-row app-editor-item-prop-list'>
                              <div class='ant-col-8 app-editor-item-prop-label'></div>
                              <div class='ant-col-16'>应用在内容部分的文字上</div>
                           </div>
                        </div>
                        <br/>
                        <div class='ant-col-24'>
                           <div class='ant-row app-editor-item-prop-list'>
                              <div class='ant-col-8 app-editor-item-prop-label'>强调元素颜色</div>
                              <div class='ant-col-16'><input id="emphasizeElementsColor" onchange="colorChage();" /></div>
                           </div>
                        </div>
                        <div class='ant-col-24'>
                           <div class='ant-row app-editor-item-prop-list'>
                              <div class='ant-col-8 app-editor-item-prop-label'></div>
                              <div class='ant-col-16'>应用在强调的文字、图像、图标等。</div>
                           </div>
                        </div>
                        <br/>
                        <div class='ant-col-24'>
                           <div class='ant-row app-editor-item-prop-list'>
                              <div class='ant-col-8 app-editor-item-prop-label'>面板背景色</div>
                              <div class='ant-col-16'><input id="panalBgColor" onchange="colorChage();" /></div>
                           </div>
                        </div>
                        <br/>
                        <div class='ant-col-24'>
                           <div class='ant-row app-editor-item-prop-list'>
                              <div class='ant-col-8 app-editor-item-prop-label'>面板边框色</div>
                              <div class='ant-col-16'><input id="panalBorderColor" onchange="colorChage();" /></div>
                           </div>
                        </div>
                        <br/>
                        <div class='ant-col-24'>
                           <div class='ant-row app-editor-item-prop-list'>
                              <div class='ant-col-8 app-editor-item-prop-label'>统计图颜色</div>
                              <div class='ant-col-16'><input id="seriesColor1" onchange="colorChage();" /></div>
                           </div>
                        </div>
                        <div class='ant-col-24'>
                           <div class='ant-row app-editor-item-prop-list'>
                              <div class='ant-col-8 app-editor-item-prop-label'></div>
                              <div class='ant-col-16'>统计图的线条颜色等。</div>
                           </div>
                        </div>
                        <br/>
                        <div class='ant-col-24'>
                           <div class='ant-row app-editor-item-prop-list'>
                              <div class='ant-col-8 app-editor-item-prop-label'>统计图对比色</div>
                              <div class='ant-col-16'><input id="seriesColor2" onchange="colorChage();" /></div>
                           </div>
                        </div>
                        <div class='ant-col-24'>
                           <div class='ant-row app-editor-item-prop-list'>
                              <div class='ant-col-8 app-editor-item-prop-label'></div>
                              <div class='ant-col-16'>统计图的对比线条颜色等。</div>
                           </div>
                        </div>
                        <br/>
                        <div class='ant-col-24'>
                           <div class='ant-row app-editor-item-prop-list'>
                              <div class='ant-col-8 app-editor-item-prop-label'>面板标题背景色</div>
                              <div class='ant-col-16'><input id="panalTitlecolor" onchange="colorChage();" /></div>
                           </div>
                        </div>
                        <br/>
                        <div class='ant-col-24'>
                           <div class='ant-row app-editor-item-prop-list'>
                              <div class='ant-col-8 app-editor-item-prop-label'>错开更新时间</div>
                              <div class='ant-col-16'><div class="switch" id="delayUpdateTime"></div></div>
                           </div>
                        </div>
                        <br/>
                        <div class='ant-col-24'>
                           <div class='ant-row app-editor-item-prop-list'>
                              <div class='ant-col-8 app-editor-item-prop-label'>显示时长（秒）</div>
                              <div class='ant-col-16'><input type="text" id="showTimes" name="showTime" /></div>
                           </div>
                        </div>
                        <br/>
                        <div class='ant-col-24'>
                           <div class='ant-row app-editor-item-prop-list'>
                              <div class='ant-col-8 app-editor-item-prop-label'>开始时间</div>
                              <div class='ant-col-16'><input type="text" class="" id="panalStartTime" name="panalStartTime" /></div>
                           </div>
                        </div>
                        <br/>
                        <div class='ant-col-24'>
                           <div class='ant-row app-editor-item-prop-list'>
                              <div class='ant-col-8 app-editor-item-prop-label'>结束时间</div>
                              <div class='ant-col-16'><input type="text" class="" id="panalEndTime" name="panalEndTime" /></div>
                           </div>
                        </div>
                        <br/>
                        
                     </div>
                  </div>
                  <div class="ant-tabs-tabpane ant-tabs-tabpane-inactive"><!--选项卡con...隐藏-->
                    <div class='ant-col-24'>
                       <div class='ant-row app-editor-item-prop-list'>
                          <div class='ant-col-8 app-editor-item-prop-label'>大屏宽度</div>
                          <div class='ant-col-16'><input type="text" class="" id="boardWidth" name="boardWidth" /></div>
                       </div>
                    </div>
                    <br/>
                    <div class='ant-col-24'>
                       <div class='ant-row app-editor-item-prop-list'>
                          <div class='ant-col-8 app-editor-item-prop-label'>大屏高度</div>
                          <div class='ant-col-16'><input type="text" class="" id="boardHeight" name="boardHeight" /></div>
                       </div>
                    </div>
                    <br/>
                    <div class='ant-col-24'>
                       <div class='ant-row app-editor-item-prop-list'>
                          <div class='ant-col-8 app-editor-item-prop-label'>大屏背景颜色</div>
                          <div class='ant-col-16'><input id="boardBgcolor" onchange="colorChage();" /></div>
                       </div>
                    </div>
                  
                  </div>
              </div>
        </div>
      </div>
      <div class="app-editor-editor-toolbar">
       <span style="margin-right: 10px;"><span style="margin-right: 10px;">每隔60s自动保存配置</span><span class="ant-switch" tabindex="0"><span class="ant-switch-inner"></span></span></span>
       <button type="button" class="ant-btn ant-btn-primary" onclick="boardEdit.saveBoardInfo();"><i class="anticon anticon-cloud"></i><span>保 存</span></button>
      </div>
     </div>
    </div>
    <!-- react-empty: 68 -->
   </div>
  </div>
  
  <!-- 组件模板列表 -->
  <div id="divModuleModelList" style="display:none;position:absolute;right:10px;top:10px;width:300px;height:200px; background-color:#ccc;zindex:10000000;">
  	
  		<div id="divModuleModelList"></div>
  </div>


</body>
<script type="text/javascript">
	var contextPathJs="<%=basePath%>";
	var basePath=contextPathJs;
	var editBoardId="<%=id%>";
	/**
	 * 初始化地图时加载过程
	 */
	$(document).ready(function() { 
		//boardEdit.getBasicModule();
		var boardId=0;//动态传入
		boardEdit.getModuleByBoardId(boardId);

		//点击单个组件		
		$(".app-editor-editor-overlays-items").on("click", ".app-editor-item-title-text", function() { 
			var moduleId = $(this).attr("data-moduleId");
			boardEdit.addAttribute(moduleId, $(this));
		});

		//单个组件删除		
		$(".app-editor-editor-overlays-items>div").on("click", ".anticon-delete", function() {
			if(confirm('确定要删除该组件么?')){ 
				var item = $(this).parent().parent().parent().parent().parent();
				item.remove();
			 }
		});		
		
		//添加新组件		
		$(".app-editor-editor-overlays-add").on("click", ".ant-btn-dashed", function() {   
			$("#divModuleModelList").css("display","block");
			$("#divModuleModelList").css("right","10");
			$("#divModuleModelList").css("top","10");
			$("#divModuleModelList").css("width","300");
			boardEdit.loadModule();
		});
		
		//tab切换
		$(".ant-tabs-nav-animated .ant-tabs-tab").click(function(){
        var _index = $(this).index();
        $(".ant-tabs-nav-animated .ant-tabs-tab").eq($(this).index()-1).addClass("ant-tabs-tab-active").siblings(".ant-tabs-tab").removeClass('ant-tabs-tab-active');
        $(".ant-tabs-content-animated .ant-tabs-tabpane").hide().removeClass("ant-tabs-tabpane-inactive").eq(_index-1).show().addClass("ant-tabs-tabpane-active");
	  });
		
	});
</script>
</html>
