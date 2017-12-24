<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
    String basePath = request.getScheme() + "://"
            + request.getServerName() + ":" + request.getServerPort()
            + request.getContextPath();
    String id = request.getParameter("id");
%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
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
<body>
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
</body>
</html>
