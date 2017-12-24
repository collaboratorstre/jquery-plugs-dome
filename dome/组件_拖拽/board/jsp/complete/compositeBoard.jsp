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
<script src="<%=basePath%>/board/js/complete/compositeBoard.js"></script>
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
					<!-- 左1.拥堵专题      组件 -->
					<div title="" class="app-block react-draggable" style="left: 5; top: 5; width: 244; height: 180; color: #021068; position: absolute; transform: translate(0px, 0px); touch-action: none;"><!-- 一个案例 -->
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
                                    <div class="app-title-box"><i></i><span>拥堵专题</span></div>
				                    <div id="test01" style="width: 100%;height:70%;"></div>
				                    <div class="jampslist" style="width: 100%;height:20%;">
				                    </div>
				                 </div><!-- 整个div -->       
							</div>	
						</div>	
					</div><!-- 一个案例 -->		
					<!-- 左2.常堵路段      TOP5-->
					<div title="" class="app-block react-draggable" style="left: 5; top: 189; width: 244; height: 180; color: #021068; position: absolute; transform: translate(0px, 0px); touch-action: none;"><!-- 一个案例 -->
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
                                    <div class="app-title-box"><i></i><span>常堵路段</span><b>TOP5</b></div>
				                    <div style="margin-left: 10px;color: #1E5FBC;float: left;"></div><!-- 辖区拥堵、警情、警力分步echarts图表div -->
				                    <div id="test02" style="width: 100%;height: 90%;" ></div>
				                </div><!-- 整个div -->                                                                                    
							</div>	
						</div>	
					</div><!-- 一个案例 -->		
					<!-- 左3.今日影响交通的因素 -->
					<div title="" class="app-block react-draggable" style="left: 5; top: 370; width: 244; height: 188; color: #021068; position: absolute; transform: translate(0px, 0px); touch-action: none;"><!-- 一个案例 -->
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
	                                <div class="app-title-box"><i></i><span>今日影响交通的因素</span></div>
					                <div class="app-panel-area-table-container" id="case">
						                <div class="app-list" id = "scroll">
						                	<ul class="app-ul-list trafficElem"></ul>
						                </div>
					                </div>
				                </div><!-- 整个div -->                      
							</div>	
						</div>	
					</div><!-- 一个案例 -->		
					<!-- 左4.设备专题      组件 -->
					<div title="" class="app-block react-draggable" style="left: 5; top: 570; width: 244; height: 194; color: #021068; position: absolute; transform: translate(0px, 0px); touch-action: none;"><!-- 一个案例 -->
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
                                    <div class="app-title-box"><i></i><span>设备专题</span></div>
				                    <div id="test22" class = "test22">
					                    <div>
						                    <p><span></span><span>在线服务设备总量</span></p>
						                    <p><span></span><span>设备总量</span></p>
					                    </div>
					                    <dl class="equipStatus"></dl>
				                    </div>
				                </div><!-- 整个div -->                  
							</div>	
						</div>	
					</div><!-- 一个案例 -->		
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
					                <div class="mapinfo mapinfo-line" style=" height: 32px;width: 98%;position: absolute;left: 5px;bottom: 4px;">
	                                <ul>
		                                <li><div><p >今日机动车总量(万辆)</p><span >182.4</span><em></em></div></li>
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
				                    <span class="app-panel-title-icon">今日重大警情 :</span>
				                    <p class="app-panel-title-list-con" id="pText"></p>
				                </div><!-- 整个div -->      
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
							    	<div ><b style="color: #1E5FBC;margin-left: 85%;font-size: 80%;">日环比</b></div><!-- 日环比div -->
							    	<div style="width: 80%;height: 90%;margin-left: 10px;color: #1E5FBC;margin-top: 5px;float: left;" id = "areaPsDistribution"></div><!-- 辖区警力分配echarts图表div -->
							    	<div class="areaps"></div>
							    </div><!-- 整个div -->                       
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
					<!-- 右3.本月违法数据     TOP5 -->
					<div title="" class="app-block react-draggable" style="left: 775; top: 375; width: 244; height: 188; color: #021068; position: absolute; transform: translate(0px, 0px); touch-action: none;"><!-- 一个案例 -->
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
                                    <div class="app-title-box"><i></i><span>本月违法数据</span><b>TOP5</b></div>
				                    <div style="margin-left: 10px;color: #1E5FBC;margin-top: 5px;float: left;width: 95%;"><div style="float: right;" class="vioSumNum"></div></div><!-- 辖区拥堵、警情、警力分步echarts图表div -->
				                    <div id="test05" style="width: 90%;height: 90%;"></div>
				                </div><!-- 整个div -->                                                                         
							</div>	
						</div>	
					</div><!-- 一个案例 -->		
					<!-- 右4.违法类型数量变化     TOP5 -->
					<div title="" class="app-block react-draggable" style="left: 775; top: 570; width: 244; height: 194; color: #021068; position: absolute; transform: translate(0px, 0px); touch-action: none;"><!-- 一个案例 -->
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
                                    <div class="app-title-box"><i></i><span>违法类型数量变化</span><b>TOP5</b></div>
				                    <div style="margin-left: 10px;color: #1E5FBC;margin-top: 5px;"> </div><!-- 辖区拥堵、警情、警力分步echarts图表div -->
				                    <div id="test03" style="width: 95%;height: 90%;"></div>
				                </div><!-- 整个div -->                        
							</div>	
						</div>	
					</div><!-- 一个案例 -->		
					
					
					
					
					
					
					
					
					
					
					
					
				</div>
			</div>
		</div>
	</div>
</body>
</html>
