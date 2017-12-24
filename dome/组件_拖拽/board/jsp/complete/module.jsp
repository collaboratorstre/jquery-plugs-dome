<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ page import="com.ehl.frame.util.ParamManage"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
	String boardId = request.getParameter("boardId");
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<base href="<%=basePath%>">

<title>综合看板</title>

<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">
<link href="<%=basePath%>/board/css/main.css" rel="stylesheet">
<script src="<%=basePath%>/themes/default/js/jquery.min.js"></script>
<script src="<%=basePath%>/board/js/util/ajaxUtil.js"></script>
<!-- echars图表 -->
<script src="<%=basePath%>/show/echars/echarts.js"></script>
<script src="<%=basePath%>/show/echars/esl.js"></script>
<script src="<%=basePath%>/board/js/complete/module.js"></script>
<script type="text/javascript">
   	var contextPathJs = "<%=basePath%>";
   	var boardId = "<%=boardId%>"; 
	/*
	 * 页面加载时触发
	 */
	/* $(document).ready(function() { 
		boardPreview.getBoardInfo();
		boardPreview.show();
	}); */
</script>

</head>
<body>
	<div class="app" id="app">
		<div class="app-container" data-reactroot="">
			<div class="app-background">
				<canvas></canvas>
			</div>
			<!-- 图表 -->
			<div style="position:relative;">
				<div class="app-map-overlays">
					
					<!-- 中1.当前警情数   小组件 -->
					<div class="app-block" style="touch-action:none; position:absolute; color:#021068; left:255; top:5;width: 254; height: 70; transform: translate(0px, 0px);">
						<div class="app-panel app-panel-uite">
							<div class="app-conmain">
								<div class="app-conmain-box">
									<div>
										<div class="app-conmain-border">
											<div class="conmain-border-corner-1"></div>
											<div class="conmain-border-corner-2"></div>
											<div class="conmain-border-corner-3"></div>
											<div class="conmain-border-corner-4"></div>
										</div>
										<!-- demo案例  HTML-->	
										<div class="app-conmain-box"  style="width: 100%;height: 100%;background: #06102f;">
							                <div>
								                <div class="app-conmain-con xxxxx">
								                	<div class="app-conmain-in-box" id = "currentWINum"></div>
								                </div>
							                </div>
						                </div><!-- 保存内容 -->
									</div>	
								</div>	
							</div>	
						</div>
					</div><!-- 一个案例 -->	
					<!-- 中1.当前警力       小组件 -->
					<div class="app-block" style="touch-action:none; position:absolute; color:#021068; left:515; top:5;width: 254; height: 70; transform: translate(0px, 0px);">
						<div class="app-panel app-panel-uite">
							<div class="app-conmain">
								<div class="app-conmain-box">
									<div>
										<div class="app-conmain-border">
											<div class="conmain-border-corner-1"></div>
											<div class="conmain-border-corner-2"></div>
											<div class="conmain-border-corner-3"></div>
											<div class="conmain-border-corner-4"></div>
										</div>
										<!-- demo案例  HTML-->	
										<div class="app-conmain-box" style="width: 100%;height: 100%;background: #06102f;">
							                <div>
								                <div class="app-conmain-con xxxxx">
								               		<div class="app-conmain-in-box" id = "currentPSNum"></div>
								                </div>
							                </div>
						                </div><!-- 保存内容 -->
									</div>	
								</div>	
							</div>	
						</div>
					</div><!-- 一个案例 -->	
					<!-- 中2.地图-仪表盘-道路小组件 -->
					<div title="" class="app-block react-draggable" style="left: 255; top: 85; width: 514; height: 475; color: #021068; position: absolute; transform: translate(0px, 0px); touch-action: none;"><!-- 一个案例 -->
						<div class="app-panel app-full-box">
							<div class="app-panel-border">
								<div class="app-panel-corner corner-horizontal corner-left corner-top"></div>
								<div class="app-panel-corner corner-horizontal corner-right corner-top"></div>
								<div class="app-panel-corner corner-horizontal corner-right corner-bottom"></div>
								<div class="app-panel-corner corner-horizontal corner-left corner-bottom"></div>
								<div class="app-panel-corner corner-vertical corner-left corner-top"></div>
								<div class="app-panel-corner corner-vertical corner-right corner-top"></div>
								<div class="app-panel-corner corner-vertical corner-right corner-bottom"></div>
								<div class="app-panel-corner corner-vertical corner-left corner-bottom"></div>
							</div>
							<div class="app-chart" style="background: none;">
								<!-- demo案例  HTML-->	
								<div style="width: 100%;height:100%;">
				                    <div id="map" style="height:92%;width: 100%;"></div>
				                    <div class="mapinfo mapinfo-line" style=" height: 58px;width:100%;position: absolute;left: 0px;bottom:4px;">
			                            <ul>
			                                <li><div><p id = "currentCarTotal"></p><span id = "currentCarTotalNum"></span><em></em></div></li>
			                                <li><div><p id = "currentCarNum2"></p><span id = "currentCarNum"></span><em></em></div></li>
			                                <li><div><p id = currentAverageCarNum3></p><span id = "currentAverageCarNum2"></span><em></em></div></li>
			                            </ul>
			                        </div>
				                </div><!-- 整个div -->                        
							</div>	
						</div>	
					</div><!-- 一个案例 -->	
					<!-- 中3.拥堵点、警情、警力分布 -->
					<div title="" class="app-block react-draggable" style="left: 255; top: 570; width: 514; height: 151; color: #021068; position: absolute; transform: translate(0px, 0px); touch-action: none;"><!-- 一个案例 -->
						<div class="app-panel app-full-box">
							<div class="app-panel-border">
								<div class="app-panel-corner corner-horizontal corner-left corner-top"></div>
								<div class="app-panel-corner corner-horizontal corner-right corner-top"></div>
								<div class="app-panel-corner corner-horizontal corner-right corner-bottom"></div>
								<div class="app-panel-corner corner-horizontal corner-left corner-bottom"></div>
								<div class="app-panel-corner corner-vertical corner-left corner-top"></div>
								<div class="app-panel-corner corner-vertical corner-right corner-top"></div>
								<div class="app-panel-corner corner-vertical corner-right corner-bottom"></div>
								<div class="app-panel-corner corner-vertical corner-left corner-bottom"></div>
							</div>
							<div class="app-chart" style="background: none;">
								<!-- demo案例  HTML-->	
								<div class="app-area-box">
									<div class="app-title-box"><i></i><span>拥堵点、警情、警力分布</span></div>
							    	<div style="width:95%;height: 80%;margin-left: 10px;color: #1E5FBC;float: left;" id = "areaJam"></div><!-- 辖区拥堵、警情、警力分步echarts图表div -->
							    </div><!-- 整个div -->                           
							</div>	
						</div>	
					</div><!-- 一个案例 -->	
					<!-- 中4.今日重大警情 -->
					<div title="" class="app-block react-draggable" style="left: 255; top: 725; width: 514; height: 40; color: #021068; position: absolute; transform: translate(0px, 0px); touch-action: none;"><!-- 一个案例 -->
						<div class="app-panel app-full-box">
							<div class="app-panel-border">
								<div class="app-panel-corner corner-horizontal corner-left corner-top"></div>
								<div class="app-panel-corner corner-horizontal corner-right corner-top"></div>
								<div class="app-panel-corner corner-horizontal corner-right corner-bottom"></div>
								<div class="app-panel-corner corner-horizontal corner-left corner-bottom"></div>
								<div class="app-panel-corner corner-vertical corner-left corner-top"></div>
								<div class="app-panel-corner corner-vertical corner-right corner-top"></div>
								<div class="app-panel-corner corner-vertical corner-right corner-bottom"></div>
								<div class="app-panel-corner corner-vertical corner-left corner-bottom"></div>
							</div>
							<div class="app-chart" style="background: none;">
								<!-- demo案例  HTML-->	
								<div class="app-panel-title">
			                    	<span class='app-panel-title-icon'>今日重大警情 :</span>
			                        <div id="scroll" >
					                   <ul id = "pText"></ul>
					                </div>
			                  	</div>        
							</div>	
						</div>	
					</div><!-- 一个案例 -->
					<!-- 右1.在岗警力     组件 -->
					<div title="" class="app-block react-draggable" style="left: 775; top: 5; width: 244; height: 180; color: #021068; position: absolute; transform: translate(0px, 0px); touch-action: none;"><!-- 一个案例 -->
						<div class="app-panel app-full-box">
							<div class="app-panel-border">
								<div class="app-panel-corner corner-horizontal corner-left corner-top"></div>
								<div class="app-panel-corner corner-horizontal corner-right corner-top"></div>
								<div class="app-panel-corner corner-horizontal corner-right corner-bottom"></div>
								<div class="app-panel-corner corner-horizontal corner-left corner-bottom"></div>
								<div class="app-panel-corner corner-vertical corner-left corner-top"></div>
								<div class="app-panel-corner corner-vertical corner-right corner-top"></div>
								<div class="app-panel-corner corner-vertical corner-right corner-bottom"></div>
								<div class="app-panel-corner corner-vertical corner-left corner-bottom"></div>
							</div>
							<div class="app-chart" style="background: none;">
								<!-- demo案例  HTML-->	
								<div class="app-area-box">
                                    <div class="app-title-box"><i></i><span>在岗警力</span><b>TOP5</b></div>
							    	<div style="width: 80%;height: 90%;margin-left: 10px;color: #1E5FBC;margin-top: 5px;float: left;" id = "areaPsDistribution"></div><!-- 辖区警力分配echarts图表div -->
				                    <div class="areapsbox" style="position:absolute;top:0;right:4%;">
					                      <div><b>日环比</b></div>
					                      <div class="areaps" style = "height:47%;">
					                    
					                      </div>
				                    </div>                       
			                    </div><!-- demo结束 -->                     
							</div>	
						</div>	
					</div><!-- 一个案例 -->		
					<!-- 右2.今日辖区警情    TOP5 -->
					<div title="" class="app-block react-draggable" style="left: 775; top: 190; width: 244; height: 180; color: #021068; position: absolute; transform: translate(0px, 0px); touch-action: none;"><!-- 一个案例 -->
						<div class="app-panel app-full-box">
							<div class="app-panel-border">
								<div class="app-panel-corner corner-horizontal corner-left corner-top"></div>
								<div class="app-panel-corner corner-horizontal corner-right corner-top"></div>
								<div class="app-panel-corner corner-horizontal corner-right corner-bottom"></div>
								<div class="app-panel-corner corner-horizontal corner-left corner-bottom"></div>
								<div class="app-panel-corner corner-vertical corner-left corner-top"></div>
								<div class="app-panel-corner corner-vertical corner-right corner-top"></div>
								<div class="app-panel-corner corner-vertical corner-right corner-bottom"></div>
								<div class="app-panel-corner corner-vertical corner-left corner-bottom"></div>
							</div>
							<div class="app-chart" style="background: none;">
								<!-- demo案例  HTML-->	
								<div class="app-area-box">
                                    <div class="app-title-box"><i></i><span>今日辖区警情</span><b>TOP5</b></div>
							    	<div style="width: 95%;height: 90%;margin-left: 10px;margin-top: 5px;" id = "currentAreaWI"></div><!-- 今日辖区警情echarts图表div -->
							    </div><!-- 整体div -->                
							</div>	
						</div>	
					</div><!-- 一个案例 -->	
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
				</div>
			</div>
		</div>
	</div>
</body>
</html>
