<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ page import="com.ehl.frame.util.ParamManage"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>看板展示</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<link href="<%=basePath%>/board/css/main.css" rel="stylesheet">
	<script src="<%=basePath%>/themes/default/js/jquery.min.js"></script>
	
	<!-- echars图表 -->
	<script src="<%=basePath%>/show/echars/echarts.js"></script>
	<script src="<%=basePath%>/show/echars/esl.js"></script>
	<script src="<%=basePath%>/board/js/manage/compositeBoardTwo.js"></script>
	<script src="<%=basePath%>/board/js/util/ajaxUtil.js"></script>
	<script type="text/javascript">
   		 var contextPathJs = "<%=basePath%>";
    </script>
  
</head>
<body style="background: #06102F;">
	<div class="app" id="app">
		<div class="app-container" data-reactroot="">
			<div class="app-background">
				<canvas></canvas>
			</div>
			<!-- 图表 -->
			<div>
				<div class="app-map-overlays">
				     <!-- 今日重大警情 :-->
				    <div class="app-block" style="touch-action:none; position:absolute; color:#fff;left: 1940px; top: 1500px; width: 820px;  transform: translate(0px, 0px);">
				        <div class="app-panel">
				            <div class="app-panel-border">
				                <div class="police_alarm_info_icon"></div>
				                <div class="police_alarm_info_bottom_left"></div>
				            </div>
				            <div class="app-panel-side">
				                <div class="app-panel-title" >
				                	<span class='app-panel-title-icon'>今日重大警情 :</span>
				                    <div id="scrollInline"><ul id="pText"></ul></div>
				                </div>
				            </div>
				        </div>
				    </div>
				    <!-- 一个案例 -->
                    
                    
                    
                    
					<div title="" class="app-block react-draggable" style="left: 0px; top: 0px; width: 800px; height: 220px; color: rgb(255, 255, 255); position: absolute; transform: translate(0px, 0px); touch-action: none;"><!-- 一个案例 -->
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
							<!-- demo案例 -->
							<div class="app-chart" style="background: none;" _echarts_instance_="ec_1500861846722">
								<div class="app-area-box">
									<div class="app-title-box"><i></i><span>拥堵点、警情、警力分布</span></div>
							    	<div style="width:95%;height: 80%;margin-left: 10px;color: #1E5FBC;float: left;" id = "areaJam"></div><!-- 辖区拥堵、警情、警力分步echarts图表div -->
							    </div><!-- 整个div -->
							</div>
						</div>
					</div><!-- 一个案例 -->
					
					<div title="" class="app-block react-draggable" style="left: 0px; top: 630px; width: 360px; height: 260px; color: rgb(255, 255, 255); position: absolute; transform: translate(0px, 0px); touch-action: none;"><!-- 一个案例 -->
						<div class="app-panel app-full-box">
							<div class="app-panel-border" >
								<div class="app-panel-corner corner-horizontal corner-left corner-top"></div>
								<div class="app-panel-corner corner-horizontal corner-right corner-top"></div>
								<div class="app-panel-corner corner-horizontal corner-right corner-bottom"></div>
								<div class="app-panel-corner corner-horizontal corner-left corner-bottom"></div>
								<div class="app-panel-corner corner-vertical corner-left corner-top"></div>
								<div class="app-panel-corner corner-vertical corner-right corner-top"></div>
								<div class="app-panel-corner corner-vertical corner-right corner-bottom"></div>
								<div class="app-panel-corner corner-vertical corner-left corner-bottom"></div>
							</div>
							<!-- demo案例 -->
							<div class="app-chart" style="background: none;" _echarts_instance_="ec_1500861846722">
								<div class="app-area-box">
                                    <div class="app-title-box"><i></i><span>辖区警情</span><b>TOP5</b><b class="min-i-hint">(近一小时之内数据)</b></div>
							    	<div style="background: #061C72;height: 20px;"><b style="color: #1E5FBC;margin-left: 70%;font-size: 80%;">日环比 &nbsp;&nbsp;周环比</b></div><!-- 日环比div -->
							    	<div style="width:95%;height:80%;margin-left: 10px;color: #1E5FBC;margin-top: 5px;float: left;" id = "areaWI"></div><!-- 辖区警力分配echarts图表div -->
							    	<div class="areapslist">
								    	<div id="yesRateString">
									    	<!-- <div><span>39</span><em class="target_up"></em></div>
									    	<div><span>39</span><em class="target_up"></em></div>
									    	<div><span>39</span><em class="target_down"></em></div>
									    	<div><span>39</span><em class="target_up"></em></div>
									    	<div><span>39</span><em class="target_up"></em></div> -->
								    	</div>
								    	<div id="weekRateString">
									    	<!-- <div><span>39</span><em class="target_up"></em></div>
									    	<div><span>39</span><em class="target_up"></em></div>
									    	<div><span>39</span><em class="target_up"></em></div>
									    	<div><span>39</span><em class="target_up"></em></div>
									    	<div><span>39</span><em class="target_up"></em></div> -->
								    	</div>
							    	</div>
							    </div><!-- 整个div -->
							</div>
						</div>
					</div><!-- 一个案例 -->
					
					<div title="" class="app-block react-draggable" style="left: 800px; top: 1500px; width: 245px; height: 184px; color: rgb(255, 255, 255); position: absolute; transform: translate(0px, 0px); touch-action: none;"><!-- 一个案例 -->
						<div class="app-panel app-full-box">
							<div class="app-panel-border" style="border-color: ;">
								<div class="app-panel-corner corner-horizontal corner-left corner-top"></div>
								<div class="app-panel-corner corner-horizontal corner-right corner-top"></div>
								<div class="app-panel-corner corner-horizontal corner-right corner-bottom"></div>
								<div class="app-panel-corner corner-horizontal corner-left corner-bottom"></div>
								<div class="app-panel-corner corner-vertical corner-left corner-top"></div>
								<div class="app-panel-corner corner-vertical corner-right corner-top"></div>
								<div class="app-panel-corner corner-vertical corner-right corner-bottom"></div>
								<div class="app-panel-corner corner-vertical corner-left corner-bottom"></div>
							</div>
							<!-- demo案例 -->
							<div class="app-chart" style="background: none;" _echarts_instance_="ec_1500861846722">
								<div class="app-area-box">
                                    <div class="app-title-box"><i></i><span>在岗警力</span><b>TOP5</b></div>
							    	<div style="background: #061C72;"><b style="color: #1E5FBC;margin-left: 85%;font-size: 80%;">日环比</b></div><!-- 日环比div -->
							    	<div style="width: 80%;height: 90%;margin-left: 10px;color: #1E5FBC;margin-top: 5px;float: left;" id = "areaPsDistribution"></div><!-- 辖区警力分配echarts图表div -->
							    	<div class="areaps">
								    	<!-- <div><span>39</span><em class="target_up"></em></div>
								    	<div><span>39</span><em class="target_up"></em></div>
								    	<div><span>39</span><em class="target_up"></em></div>
								    	<div><span>39</span><em class="target_up"></em></div>
								    	<div><span>39</span><em class="target_down"></em></div> -->
							    	</div>
							    	<!-- <div style="right: 4%; bottom: 5%;position:absolute;">
							    		<b style="color: #1E5FBC;font-size: 10px;">(到岗率)</b>
							    	</div> -->
							    </div><!-- 整个div -->
							</div>
						</div>
					</div><!-- 一个案例 -->
					
					<div title="" class="app-block react-draggable" style="left: 400px; top: 1115px; width: 360px; height: 260px; color: rgb(255, 255, 255); position: absolute; transform: translate(0px, 0px); touch-action: none;"><!-- 一个案例 -->
						<div class="app-panel app-full-box">
							<div class="app-panel-border" style="border-color: ;">
								<div class="app-panel-corner corner-horizontal corner-left corner-top"></div>
								<div class="app-panel-corner corner-horizontal corner-right corner-top"></div>
								<div class="app-panel-corner corner-horizontal corner-right corner-bottom"></div>
								<div class="app-panel-corner corner-horizontal corner-left corner-bottom"></div>
								<div class="app-panel-corner corner-vertical corner-left corner-top"></div>
								<div class="app-panel-corner corner-vertical corner-right corner-top"></div>
								<div class="app-panel-corner corner-vertical corner-right corner-bottom"></div>
								<div class="app-panel-corner corner-vertical corner-left corner-bottom"></div>
							</div>
							<!-- demo案例 -->
							<div class="app-chart" style="background: none;" _echarts_instance_="ec_1500861846722">
								<div class="app-area-box">
                                    <div class="app-title-box"><i></i><span>今日辖区警情</span><b>TOP5</b></div>
							    	<div style="width: 95%;height: 90%;margin-left: 10px;margin-top: 5px;" id = "currentAreaWI"></div><!-- 今日辖区警情echarts图表div -->
							    </div><!-- 整体div -->
							</div>
						</div>
					</div><!-- 一个案例 -->
					
					<div title="" class="app-block react-draggable" style="left: 400px; top: 800px; width: 360px; height: 265px; color: rgb(255, 255, 255); position: absolute; transform: translate(0px, 0px); touch-action: none;"><!-- 一个案例 -->
						<div class="app-panel app-full-box">
							<div class="app-panel-border" style="border-color: ;">
								<div class="app-panel-corner corner-horizontal corner-left corner-top"></div>
								<div class="app-panel-corner corner-horizontal corner-right corner-top"></div>
								<div class="app-panel-corner corner-horizontal corner-right corner-bottom"></div>
								<div class="app-panel-corner corner-horizontal corner-left corner-bottom"></div>
								<div class="app-panel-corner corner-vertical corner-left corner-top"></div>
								<div class="app-panel-corner corner-vertical corner-right corner-top"></div>
								<div class="app-panel-corner corner-vertical corner-right corner-bottom"></div>
								<div class="app-panel-corner corner-vertical corner-left corner-bottom"></div>
							</div>
							<!-- demo案例 -->
							<div class="app-chart" style="background: none;" _echarts_instance_="ec_1500861846722">
								 <div class="app-area-box">
                                    <div class="app-title-box"><i></i><span>今日拥堵路段数量变化趋势</span></div>
							    	<div style="width:100%;height: 80%;" id = "jamRoadChange"></div><!-- 辖区拥堵、警情、警力分步echarts图表div -->
							    </div><!-- 整个div -->
							</div>
						</div>
					</div><!-- 一个案例 -->
					
					<div title="" class="app-block react-draggable" style="left: 1900px; top: 115px; width: 360px; height: 280px; color: rgb(255, 255, 255); position: absolute; transform: translate(0px, 0px); touch-action: none;"><!-- 一个案例 -->
						<div class="app-panel app-full-box">
							<div class="app-panel-border" style="border-color: ;">
								<div class="app-panel-corner corner-horizontal corner-left corner-top"></div>
								<div class="app-panel-corner corner-horizontal corner-right corner-top"></div>
								<div class="app-panel-corner corner-horizontal corner-right corner-bottom"></div>
								<div class="app-panel-corner corner-horizontal corner-left corner-bottom"></div>
								<div class="app-panel-corner corner-vertical corner-left corner-top"></div>
								<div class="app-panel-corner corner-vertical corner-right corner-top"></div>
								<div class="app-panel-corner corner-vertical corner-right corner-bottom"></div>
								<div class="app-panel-corner corner-vertical corner-left corner-bottom"></div>
							</div>
							<!-- demo案例 -->
							<div class="app-chart" style="background: none;" _echarts_instance_="ec_1500861846722">
								  <div class="app-area-box">
                                    <div class="app-title-box"><i></i><span>今日警情与警力变化趋势</span></div>
								    <div style="width: 100%;height: 80%;" id = "todayWIPS"></div><!-- 辖区警力分配echarts图表div -->
								  </div><!-- 整个div -->
							</div>
						</div>
					</div><!-- 一个案例 -->
					
					<div title="" class="app-block react-draggable" style="left:1200px; top: 1000px; width: 360px; height: 265px; color: rgb(255, 255, 255); position: absolute; transform: translate(0px, 0px); touch-action: none;"><!-- 一个案例 -->
					<div class="app-panel app-full-box">
							<div class="app-panel-border" style="border-color: ;">
								<div class="app-panel-corner corner-horizontal corner-left corner-top"></div>
								<div class="app-panel-corner corner-horizontal corner-right corner-top"></div>
								<div class="app-panel-corner corner-horizontal corner-right corner-bottom"></div>
								<div class="app-panel-corner corner-horizontal corner-left corner-bottom"></div>
								<div class="app-panel-corner corner-vertical corner-left corner-top"></div>
								<div class="app-panel-corner corner-vertical corner-right corner-top"></div>
								<div class="app-panel-corner corner-vertical corner-right corner-bottom"></div>
								<div class="app-panel-corner corner-vertical corner-left corner-bottom"></div>
							</div>
							<!-- demo案例 -->
							<div class="app-chart" style="background: none;" _echarts_instance_="ec_1500861846722">
								 <div class="app-area-box">
                                    <div class="app-title-box"><i></i><span>拥堵专题</span></div>
							    	<div id="test01" style="width: 100%;height:70%;"></div>
							    	<div class="jampslist" style="width: 100%;height:20%;">
							    	</div>
							    </div><!-- 整个div --> 
							</div>
						</div>
					</div><!-- 一个案例 -->
					
					
					
					<div title="" class="app-block react-draggable" style="left:1200px; top: 1500px; width: 360px; height: 265px; color: rgb(255, 255, 255); position: absolute; transform: translate(0px, 0px); touch-action: none;"><!-- 一个案例 -->
						<div class="app-panel app-full-box">
							<div class="app-panel-border" style="border-color: ;">
								<div class="app-panel-corner corner-horizontal corner-left corner-top"></div>
								<div class="app-panel-corner corner-horizontal corner-right corner-top"></div>
								<div class="app-panel-corner corner-horizontal corner-right corner-bottom"></div>
								<div class="app-panel-corner corner-horizontal corner-left corner-bottom"></div>
								<div class="app-panel-corner corner-vertical corner-left corner-top"></div>
								<div class="app-panel-corner corner-vertical corner-right corner-top"></div>
								<div class="app-panel-corner corner-vertical corner-right corner-bottom"></div>
								<div class="app-panel-corner corner-vertical corner-left corner-bottom"></div>
							</div>
							<!-- demo案例 -->
							<div class="app-chart" style="background: none;" _echarts_instance_="ec_1500861846722">
							    <div class="app-area-box">
                                    <div class="app-title-box"><i></i><span>常堵路段</span><b>TOP5</b></div>
				                    <div id="test02" style="width: 100%;height: 90%;margin-top:-15px;margin-left:-50px;" ></div>
				                  </div><!-- 整个div -->   
							</div>
						</div>
					</div><!-- 一个案例 -->
					
					<div title="" class="app-block react-draggable" style="left:1800px; top: 1500px; width: 360px; height: 265px; color: rgb(255, 255, 255); position: absolute; transform: translate(0px, 0px); touch-action: none;"><!-- 一个案例 -->
						<div class="app-panel app-full-box">
							<div class="app-panel-border" style="border-color: ;">
								<div class="app-panel-corner corner-horizontal corner-left corner-top"></div>
								<div class="app-panel-corner corner-horizontal corner-right corner-top"></div>
								<div class="app-panel-corner corner-horizontal corner-right corner-bottom"></div>
								<div class="app-panel-corner corner-horizontal corner-left corner-bottom"></div>
								<div class="app-panel-corner corner-vertical corner-left corner-top"></div>
								<div class="app-panel-corner corner-vertical corner-right corner-top"></div>
								<div class="app-panel-corner corner-vertical corner-right corner-bottom"></div>
								<div class="app-panel-corner corner-vertical corner-left corner-bottom"></div>
							</div>
							<!-- demo案例 -->
							<div class="app-chart" style="background: none;" _echarts_instance_="ec_1500861846722">
							    <div class="app-area-box">
                                    <div class="app-title-box"><i></i><span>常堵路段新版</span><b>TOP5</b></div>
				                    <div id="oftenJamRoadDiv" style="width: 100%;height: 90%;margin-top:-15px;" ></div>
				                  </div><!-- 整个div -->   
							</div>
						</div>
					</div><!-- 一个案例 -->
					
					<div title="" class="app-block react-draggable" style="left:0px; top: 1500px; width: 360px; height: 265px; color: rgb(255, 255, 255); position: absolute; transform: translate(0px, 0px); touch-action: none;"><!-- 一个案例 -->
						<div class="app-panel app-full-box">
							<div class="app-panel-border" style="border-color: ;">
								<div class="app-panel-corner corner-horizontal corner-left corner-top"></div>
								<div class="app-panel-corner corner-horizontal corner-right corner-top"></div>
								<div class="app-panel-corner corner-horizontal corner-right corner-bottom"></div>
								<div class="app-panel-corner corner-horizontal corner-left corner-bottom"></div>
								<div class="app-panel-corner corner-vertical corner-left corner-top"></div>
								<div class="app-panel-corner corner-vertical corner-right corner-top"></div>
								<div class="app-panel-corner corner-vertical corner-right corner-bottom"></div>
								<div class="app-panel-corner corner-vertical corner-left corner-bottom"></div>
							</div>
							<!-- demo案例 -->
							<div class="app-chart" style="background: none;" _echarts_instance_="ec_1500861846722">
							    <div class="app-area-box">
                                    <div class="app-title-box"><i></i><span>今日影响交通的因素</span></div>
					                  <div class="app-panel-area-table-container" id="case">
					                    <div class="app-list">
					                      <ul class="app-ul-list trafficElem">
					                      </ul>
					                    </div>
					                  </div>
					                  </div><!-- 整个div -->
							</div>
						</div>
					</div><!-- 一个案例 -->
					
					

                    
                    
					
					<div title="" class="app-block react-draggable" style="left:3400px; top: 390px; width: 360px; height: 260px; color: rgb(255, 255, 255); position: absolute; transform: translate(0px, 0px); touch-action: none;"><!-- 一个案例 -->
						<div class="app-panel app-full-box">
							<div class="app-panel-border" style="border-color: ;">
								<div class="app-panel-corner corner-horizontal corner-left corner-top"></div>
								<div class="app-panel-corner corner-horizontal corner-right corner-top"></div>
								<div class="app-panel-corner corner-horizontal corner-right corner-bottom"></div>
								<div class="app-panel-corner corner-horizontal corner-left corner-bottom"></div>
								<div class="app-panel-corner corner-vertical corner-left corner-top"></div>
								<div class="app-panel-corner corner-vertical corner-right corner-top"></div>
								<div class="app-panel-corner corner-vertical corner-right corner-bottom"></div>
								<div class="app-panel-corner corner-vertical corner-left corner-bottom"></div>
							</div>
							<!-- demo案例 -->
							<div class="app-chart" style="background: none;" _echarts_instance_="ec_1500861846722">
								 <div class="app-area-box">
                                    <div class="app-title-box"><i></i><span>违法类型数量变化</span><b>TOP5</b></div>
				                    <div style="margin-left: 10px;color: #1E5FBC;margin-top: 5px;"> </div>
				                    <div id="test03" style="width: 95%;height: 90%;"></div>
				                  </div><!-- 整个div -->                                                
							</div>
						</div>
					</div><!-- 一个案例 -->
					
					<div title="" class="app-block react-draggable" style="left:900px; top: 580px; width: 360px; height: 260px; color: rgb(255, 255, 255); position: absolute; transform: translate(0px, 0px); touch-action: none;"><!-- 一个案例 -->
						<div class="app-panel app-full-box">
							<div class="app-panel-border" style="border-color: ;">
								<div class="app-panel-corner corner-horizontal corner-left corner-top"></div>
								<div class="app-panel-corner corner-horizontal corner-right corner-top"></div>
								<div class="app-panel-corner corner-horizontal corner-right corner-bottom"></div>
								<div class="app-panel-corner corner-horizontal corner-left corner-bottom"></div>
								<div class="app-panel-corner corner-vertical corner-left corner-top"></div>
								<div class="app-panel-corner corner-vertical corner-right corner-top"></div>
								<div class="app-panel-corner corner-vertical corner-right corner-bottom"></div>
								<div class="app-panel-corner corner-vertical corner-left corner-bottom"></div>
							</div>
							<!-- demo案例 -->
							<div class="app-chart" style="background: none;" _echarts_instance_="ec_1500861846722">
								 <div class="app-area-box">
                                    <div class="app-title-box"><i></i><span>本月违法数据</span><b>TOP5</b><div style="position:absolute;right:15px;top:5px;" class="vioSumNum"></div></div>
				                    <div id="test05" style="width: 100%;height: 100%;margin-left:-25px;"></div>
				                  </div><!-- 整个div -->                                             
							</div>
						</div>
					</div><!-- 一个案例 -->
					
					<div title="" class="app-block react-draggable" style="left:400px; top: 1800px; width: 370px; height: 260px; color: rgb(255, 255, 255); position: absolute; transform: translate(0px, 0px); touch-action: none;"><!-- 一个案例 -->
						<div class="app-panel app-full-box">
							<div class="app-panel-border" style="border-color: ;">
								<div class="app-panel-corner corner-horizontal corner-left corner-top"></div>
								<div class="app-panel-corner corner-horizontal corner-right corner-top"></div>
								<div class="app-panel-corner corner-horizontal corner-right corner-bottom"></div>
								<div class="app-panel-corner corner-horizontal corner-left corner-bottom"></div>
								<div class="app-panel-corner corner-vertical corner-left corner-top"></div>
								<div class="app-panel-corner corner-vertical corner-right corner-top"></div>
								<div class="app-panel-corner corner-vertical corner-right corner-bottom"></div>
								<div class="app-panel-corner corner-vertical corner-left corner-bottom"></div>
							</div>
							<!-- demo案例 -->
							<div class="app-chart" style="background: none;" _echarts_instance_="ec_1500861846722">
								 <div class="app-area-box">
                                    <div class="app-title-box"><i></i><span>当前常堵路段拥堵</span><b>TOP5</b></div>
							    	<div id="test10" class = "test20">
							    		<table style="border-collapse:separate; border-spacing:0px 10px;" ></table>
							    	</div>
							    </div><!-- 整个div -->
							</div>
						</div> 
					</div><!-- 一个案例 -->
					
					<div title="" class="app-block react-draggable" style="left:300px; top: 3300px; width: 370px; height: 260px; color: rgb(255, 255, 255); position: absolute; transform: translate(0px, 0px); touch-action: none;"><!-- 一个案例 -->
						<div class="app-panel app-full-box">
							<div class="app-panel-border" style="border-color: ;">
								<div class="app-panel-corner corner-horizontal corner-left corner-top"></div>
								<div class="app-panel-corner corner-horizontal corner-right corner-top"></div>
								<div class="app-panel-corner corner-horizontal corner-right corner-bottom"></div>
								<div class="app-panel-corner corner-horizontal corner-left corner-bottom"></div>
								<div class="app-panel-corner corner-vertical corner-left corner-top"></div>
								<div class="app-panel-corner corner-vertical corner-right corner-top"></div>
								<div class="app-panel-corner corner-vertical corner-right corner-bottom"></div>
								<div class="app-panel-corner corner-vertical corner-left corner-bottom"></div>
							</div>
							<!-- demo案例 -->
							<div class="app-chart" style="background: none;" _echarts_instance_="ec_1500861846722">
								 <div class="app-area-box">
                                    <div class="app-title-box"><i></i><span>设备专题</span></div>
					                    <div id="test22" class = "test22">
					                        <div>
					                            <p><span></span><span>在线服务设备总量</span></p>
					                            <p><span></span><span>设备总量</span></p>
					                        </div>
					                        <dl class="equipStatus">
					                      </dl>
					                    </div>
					                  </div><!-- 整个div -->        
							</div>
						</div>
					</div><!-- 一个案例 -->
					
					
					<div title="" class="app-block react-draggable" style="left:800px; top: 1800px; width: 370px; height: 260px; color: rgb(255, 255, 255); position: absolute; transform: translate(0px, 0px); touch-action: none;"><!-- 一个案例 -->
                        <div class="app-panel app-full-box">
                            <div class="app-panel-border" style="border-color: ;">
                                <div class="app-panel-corner corner-horizontal corner-left corner-top"></div>
                                <div class="app-panel-corner corner-horizontal corner-right corner-top"></div>
                                <div class="app-panel-corner corner-horizontal corner-right corner-bottom"></div>
                                <div class="app-panel-corner corner-horizontal corner-left corner-bottom"></div>
                                <div class="app-panel-corner corner-vertical corner-left corner-top"></div>
                                <div class="app-panel-corner corner-vertical corner-right corner-top"></div>
                                <div class="app-panel-corner corner-vertical corner-right corner-bottom"></div>
                                <div class="app-panel-corner corner-vertical corner-left corner-bottom"></div>
                            </div>
                            <!-- demo案例 -->
                            <div class="app-chart" style="background: none;" _echarts_instance_="ec_1500861846722">
                                 <div class="app-area-box">
                                    <div class="app-title-box"><i></i><span>敏感道路</span><b>TOP5</b></div>
				                    <div id="test01" style="width: 100%;height:70%;"></div>
				                    <div class="jampslist" style="width: 100%;height:20%;">
				                    </div>
				                 </div><!-- 整个div -->  
                            </div>
                        </div>
                    </div><!-- 一个案例 -->
					
                    
                    <div title="" class="app-block react-draggable" style="left:1180px; top: 1800px; width: 370px; height: 260px; color: rgb(255, 255, 255); position: absolute; transform: translate(0px, 0px); touch-action: none;"><!-- 一个案例 -->
                        <div class="app-panel app-full-box">
                            <div class="app-panel-border" style="border-color: ;">
                                <div class="app-panel-corner corner-horizontal corner-left corner-top"></div>
                                <div class="app-panel-corner corner-horizontal corner-right corner-top"></div>
                                <div class="app-panel-corner corner-horizontal corner-right corner-bottom"></div>
                                <div class="app-panel-corner corner-horizontal corner-left corner-bottom"></div>
                                <div class="app-panel-corner corner-vertical corner-left corner-top"></div>
                                <div class="app-panel-corner corner-vertical corner-right corner-top"></div>
                                <div class="app-panel-corner corner-vertical corner-right corner-bottom"></div>
                                <div class="app-panel-corner corner-vertical corner-left corner-bottom"></div>
                            </div>
                            <!-- demo案例 -->
                            <div class="app-chart" style="background: none;" _echarts_instance_="ec_1500861846722">
                                 <div class="app-area-box">
                                    <div class="app-title-box"><i></i><span>本月违法高发地点</span><b>TOP5</b></div>
                                    <div id="test23" class = "test23">
                                        <table>
	                                        <thead>
	                                            <tr><th>地点名称</th><th>警情数量</th><th>警力数量 </th><th>交通状态</th></tr>
                                            </thead>
                                            <tbody class="vioHight">
	                                            <tr><td  align="left" >西直门外大街</td><td>45</td><td>8</td><td><span class="unblocked">畅通</span></td></tr>
	                                            <tr><td  align="left" >德胜门外大街</td><td>34</td><td>6</td><td><span class="slow">缓慢</span></td></tr>
	                                            <tr><td  align="left" >北三环中路</td><td>21</td><td>8</td><td><span class="blocked">拥堵</span></td></tr>
	                                            <tr><td  align="left" >北苑路</td><td>18</td><td>7</td><td><span class="blocked">拥堵</span></td></tr>
	                                            <tr><td  align="left" >长椿街大道</td><td>12</td><td>8</td><td><span class="unblocked">畅通</span></td></tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div><!-- 整个div -->
                            </div>
                        </div>
                    </div><!-- 一个案例 -->
                    
                    <div title="" class="app-block react-draggable" style="left:1180px; top: 2100px; width: 370px; height: 260px; color: rgb(255, 255, 255); position: absolute; transform: translate(0px, 0px); touch-action: none;"><!-- 一个案例 -->
                        <div class="app-panel app-full-box">
                            <div class="app-panel-border" style="border-color: ;">
                                <div class="app-panel-corner corner-horizontal corner-left corner-top"></div>
                                <div class="app-panel-corner corner-horizontal corner-right corner-top"></div>
                                <div class="app-panel-corner corner-horizontal corner-right corner-bottom"></div>
                                <div class="app-panel-corner corner-horizontal corner-left corner-bottom"></div>
                                <div class="app-panel-corner corner-vertical corner-left corner-top"></div>
                                <div class="app-panel-corner corner-vertical corner-right corner-top"></div>
                                <div class="app-panel-corner corner-vertical corner-right corner-bottom"></div>
                                <div class="app-panel-corner corner-vertical corner-left corner-bottom"></div>
                            </div>
                            <!-- demo案例 -->
                            <div class="app-chart" style="background: none;" _echarts_instance_="ec_1500861846722">
                                 <div class="app-area-box">
                                    <div class="app-title-box"><i></i><span>今日重大警情和处理情况</span></div>
                                    <div id="test24" class = "test24">
                                        <table >
                                            <thead>
                                                <tr><th>&nbsp;</th><th>警情详细内容</th><th>处理状态</th></tr>
                                            </thead>
                                            <tbody id = "highWIResult">
                                                <!-- <tr><td><em>1</em></td><td  align="left" >朝阳区北三环中路车牌京A.23456事故起火</td><td><span class="tips_red">以派警</span></td></tr>
                                                <tr><td><em>2</em></td><td  align="left" >朝阳区北三环中路车牌京A.23456事故起火</td><td><span class="tips_green">已处结</span></td></tr>
                                                <tr><td><em>3</em></td><td  align="left" >朝阳区北三环中路车牌京A.23456事故起火</td><td><span class="tips_green">已处结</span></td></tr>
                                                <tr><td><em>4</em></td><td  align="left" >朝阳区北三环中路车牌京A.23456事故起火</td><td><span class="tips_green">已处结</span></td></tr>
                                                <tr><td><em>5</em></td><td  align="left" >朝阳区北三环中路车牌京A.23456事故起火</td><td><span class="tips_yellow">处理中</span></td></tr> -->
                                            </tbody>
                                        </table>
                                    </div>
                                </div><!-- 整个div -->
                            </div>
                        </div>
                    </div><!-- 一个案例 -->
					
					<div title="" class="app-block react-draggable" style="left:0px; top: 4300px; width: 360px; height: 260px; color: rgb(255, 255, 255); position: absolute; transform: translate(0px, 0px); touch-action: none;"><!-- 一个案例 -->
						<div class="app-panel app-full-box">
							<div class="app-panel-border" style="border-color: ;">
								<div class="app-panel-corner corner-horizontal corner-left corner-top"></div>
								<div class="app-panel-corner corner-horizontal corner-right corner-top"></div>
								<div class="app-panel-corner corner-horizontal corner-right corner-bottom"></div>
								<div class="app-panel-corner corner-horizontal corner-left corner-bottom"></div>
								<div class="app-panel-corner corner-vertical corner-left corner-top"></div>
								<div class="app-panel-corner corner-vertical corner-right corner-top"></div>
								<div class="app-panel-corner corner-vertical corner-right corner-bottom"></div>
								<div class="app-panel-corner corner-vertical corner-left corner-bottom"></div>
							</div>
							<!-- demo案例 -->
							<div class="app-chart" style="background: none;" _echarts_instance_="ec_1500861846722">
								 <div class="app-area-box" style="z-index:9999999">
                                    <div class="app-title-box box-point"></div>
				                    <div id="test11" style="width: 100%;height: 100%;background:#021068;" ></div>
				                    <div id="dashBoard"><span></span><span>1.5</span><span>1.8</span><span>2.2</span><span></span>
				                    <em></em><em></em><em></em><em></em><em></em></div>
				                  </div><!-- 整个div -->
							</div>
						</div>
					</div><!-- 一个案例 -->
					
					<div title="" class="app-block react-draggable" style="left:0px; top: 900px; width: 200px; height: 260px; color: rgb(255, 255, 255); position: absolute; transform: translate(0px, 0px); touch-action: none;"><!-- 一个案例 -->
						<div class="app-panel app-full-box">
							<div class="app-panel-border" style="border-color: ;">
								<div class="app-panel-corner corner-horizontal corner-left corner-top"></div>
								<div class="app-panel-corner corner-horizontal corner-right corner-top"></div>
								<div class="app-panel-corner corner-horizontal corner-right corner-bottom"></div>
								<div class="app-panel-corner corner-horizontal corner-left corner-bottom"></div>
								<div class="app-panel-corner corner-vertical corner-left corner-top"></div>
								<div class="app-panel-corner corner-vertical corner-right corner-top"></div>
								<div class="app-panel-corner corner-vertical corner-right corner-bottom"></div>
								<div class="app-panel-corner corner-vertical corner-left corner-bottom"></div>
							</div>
							<!-- demo案例 -->
							<div class="app-chart" style="background: none;" _echarts_instance_="ec_1500861846722">
								 <div class="app-area-box">
                                    <div class="app-title-box"><i></i><span>辖区警情占比</span></div>
							    	<div id="test12" style="width:100%;height: 70%;"></div>
							    	<div class="areawipie01" style="width:100%;height: 25%;">
							    	    <p><span>重点警情数量：</span><span id = "WINumRate"></span></p>
							    	    <p><span>警情处理完成率：</span><span id = "WINumRates"></span></p>
							    	</div>
							    </div><!-- 整个div -->
							</div>
						</div>
					</div><!-- 一个案例 -->
					
					<div title="" class="app-block react-draggable" style="left:0px; top: 1170px; width: 200px; height: 260px; color: rgb(255, 255, 255); position: absolute; transform: translate(0px, 0px); touch-action: none;"><!-- 一个案例 -->
						<div class="app-panel app-full-box">
							<div class="app-panel-border" style="border-color: ;">
								<div class="app-panel-corner corner-horizontal corner-left corner-top"></div>
								<div class="app-panel-corner corner-horizontal corner-right corner-top"></div>
								<div class="app-panel-corner corner-horizontal corner-right corner-bottom"></div>
								<div class="app-panel-corner corner-horizontal corner-left corner-bottom"></div>
								<div class="app-panel-corner corner-vertical corner-left corner-top"></div>
								<div class="app-panel-corner corner-vertical corner-right corner-top"></div>
								<div class="app-panel-corner corner-vertical corner-right corner-bottom"></div>
								<div class="app-panel-corner corner-vertical corner-left corner-bottom"></div>
							</div>
							<!-- demo案例 -->
							<div class="app-chart" style="background: none;" _echarts_instance_="ec_1500861846722">
								 <div class="app-area-box">
                                    <!--div class="app-title-box"><i></i><span>版块暂无标题</span></div-->
                                    <div class="areawipie02" style="width:100%;height: 25%;">
                                        <p><span>当前警力到岗率：</span><span id = "noDutyRate"></span></p>
                                        <p><span>各辖区未到岗率：</span><span>TOP5</span></p>
                                    </div>
							    	<div  id="test13" style="width:100%;height: 70%;"></div>
							    </div><!-- 整个div -->
							</div>
						</div>
					</div><!-- 一个案例 -->
					
					
					<div title="" class="app-block react-draggable" style="left:1800px; top: 1170px; width: 600px; height: 50px; color: rgb(255, 255, 255); position: absolute; transform: translate(0px, 0px); touch-action: none;"><!-- 一个案例 -->
						<div class="app-panel app-full-box">
							<div class="app-panel-border" style="border-color: ;">
								<div class="app-panel-corner corner-horizontal corner-left corner-top"></div>
								<div class="app-panel-corner corner-horizontal corner-right corner-top"></div>
								<div class="app-panel-corner corner-horizontal corner-right corner-bottom"></div>
								<div class="app-panel-corner corner-horizontal corner-left corner-bottom"></div>
								<div class="app-panel-corner corner-vertical corner-left corner-top"></div>
								<div class="app-panel-corner corner-vertical corner-right corner-top"></div>
								<div class="app-panel-corner corner-vertical corner-right corner-bottom"></div>
								<div class="app-panel-corner corner-vertical corner-left corner-bottom"></div>
							</div>
							<!-- demo案例 -->
							<div class="app-chart" style="background: none;" >
								 <div class="uite-line">
									<ul>
										<li><dl><dt>当日每公里平均车辆数</dt><dd><span id = "currentAverageCarNum"></span><em>辆</em></dd></dl></li>
										<li><dl><dt>当前交通综合指数</dt><dd><span>96</span><em></em></dd></dl></li>
										<li><dl><dt>当前道路活跃车辆总数</dt><dd><span id = "currentRoadCarNum"></span><em>辆</em></dd></dl></li>
									</ul>
								</div>
							</div>
						</div>
					</div><!-- 一个案例 -->
					

					
					<div title="" class="app-block react-draggable" style="left: 0px; top: 2365px; width: 800px; height: 260px; color: rgb(255, 255, 255); position: absolute; transform: translate(0px, 0px); touch-action: none;"><!-- 一个案例 -->
						<div class="app-panel app-full-box">
							<div class="app-panel-border" style="border-color: ;">
								<div class="app-panel-corner corner-horizontal corner-left corner-top"></div>
								<div class="app-panel-corner corner-horizontal corner-right corner-top"></div>
								<div class="app-panel-corner corner-horizontal corner-right corner-bottom"></div>
								<div class="app-panel-corner corner-horizontal corner-left corner-bottom"></div>
								<div class="app-panel-corner corner-vertical corner-left corner-top"></div>
								<div class="app-panel-corner corner-vertical corner-right corner-top"></div>
								<div class="app-panel-corner corner-vertical corner-right corner-bottom"></div>
								<div class="app-panel-corner corner-vertical corner-left corner-bottom"></div>
							</div>
							<!-- demo案例 -->
							<div class="app-chart" style="background: none;" _echarts_instance_="ec_1500861846722">
								<div class="app-area-box">
                                    <div class="app-title-box"><i></i><span>高发警情区域</span><b>TOP5</b></div>
                                    <div class="fury">
							    	<div class = "furye highWI">
							    		<table id = "highWIArea">
							    			<!-- <tr>
							    				<th style="color: #8CBBEF;">历下大队</th>
							    				<th style="background-color: #9B2347;color: white;" >220</th>
							    				<th style="background-color: #9B7F47;color: white;">170</th>
							    				<th style="background-color: #9B7F47;color: white;">160</th>
							    				<th style="background-color: #9B7F47;color: white;">140</th>
							    				<th style="background-color: #9B7F47;color: white;">160</th>
							    				<th style="background-color: #9B7F47;color: white;">120</th>
							    				<th style="background-color: #217F47;color: white;">96</th>
							    				<th style="background-color: #217F47;color: white;">80</th>
							    				<th style="background-color: #217F47;color: white;">90</th>
							    				<th style="background-color: #9B7F47;color: white;">120</th>
							    				<th style="background-color: #9B2347;color: white;">210</th>
							    				<th style="background-color: #5D0527;color: white;">308</th>
							    			</tr>
							    			<tr>
							    				<th style="color: #8CBBEF;">天桥大队</th>
							    				<th style="background-color: #217F47;color: white">100</th>
							    				<th style="background-color: #9B7F47;color: white">120</th>
							    				<th style="background-color: #9B7F47;color: white">160</th>
							    				<th style="background-color: #9B7F47;color: white">190</th>
							    				<th style="background-color: #9B2347;color: white">220</th>
							    				<th style="background-color: #9B2347;color: white">240</th>
							    				<th style="background-color: #9B2347;color: white">210</th>
							    				<th style="background-color: #9B7F47;color: white">120</th>
							    				<th style="background-color: #9B7F47;color: white">110</th>
							    				<th style="background-color: #217F47;color: white">100</th>
							    				<th style="background-color: #217F47;color: white">90</th>
							    				<th style="background-color: #217F47;color: white">80</th>
							    			</tr>
							    			<tr>
							    				<th style="color: #8CBBEF;">市中大队</th>
							    				<th style="background-color: #217F47;color: white">90</th>
							    				<th style="background-color: #217F47;color: white">94</th>
							    				<th style="background-color: #217F47;color: white">98</th>
							    				<th style="background-color: #9B7F47;color: white">140</th>
							    				<th style="background-color: #9B7F47;color: white">160</th>
							    				<th style="background-color: #9B7F47;color: white">190</th>
							    				<th style="background-color: #9B2347;color: white">280</th>
							    				<th style="background-color: #9B2347;color: white">298</th>
							    				<th style="background-color: #5D0527;color: white">330</th>
							    				<th style="background-color: #5D0527;color: white">320</th>
							    				<th style="background-color: #9B2347;color: white">290</th>
							    				<th style="background-color: #9B2347;color: white">240</th>
							    			</tr>
							    			<tr>
							    				<th style="color: #8CBBEF;">槐荫大队</th>
							    				<th style="background-color: #9B7F47;color: white">190</th>
							    				<th style="background-color: #9B7F47;color: white">170</th>
							    				<th style="background-color: #217F47;color: white">90</th>
							    				<th style="background-color: #217F47;color: white">60</th>
							    				<th style="background-color: #217F47;color: white">80</th>
							    				<th style="background-color: #217F47;color: white" >50</th>
							    				<th style="background-color: #217F47;color: white">96</th>
							    				<th style="background-color: #217F47;color: white">80</th>
							    				<th style="background-color: #9B7F47;color: white">140</th>
							    				<th style="background-color: #9B7F47;color: white">160</th>
							    				<th style="background-color: #9B7F47;color: white">180</th>
							    				<th style="background-color: #9B7F47;color: white">190</th>
							    			</tr>
							    			<tr>
							    				<th style="color: #8CBBEF;">长清大队</th>
							    				<th style="background-color: #5D0527;color: white">320</th>
							    				<th style="background-color: #5D0527;color: white">306</th>
							    				<th style="background-color: #9B2347;color: white">260</th>
							    				<th style="background-color: #9B7F47;color: white">180</th>
							    				<th style="background-color: #9B7F47;color: white">160</th>
							    				<th style="background-color: #9B7F47;color: white">120</th>
							    				<th style="background-color: #217F47;color: white">96</th>
							    				<th style="background-color: #217F47;color: white">80</th>
							    				<th style="background-color: #217F47;color: white">90</th>
							    				<th style="background-color: #9B2347;color: white">240</th>
							    				<th style="background-color: #9B2347;color: white">240</th>
							    				<th style="background-color: #9B7F47;color: white">170</th>
							    			</tr> -->
							    			<!-- <tr style="color: #8CBBEF;">
							    				<th></th>
							    				<th>1</th>
							    				<th>2</th>
							    				<th>3</th>
							    				<th>4</th>
							    				<th>5</th>
							    				<th>6</th>
							    				<th>7</th>
							    				<th>8</th>
							    				<th>9</th>
							    				<th>10</th>
							    				<th>11</th>
							    				<th>12</th>
							    			</tr>  -->
							    		</table>
							    	</div><!-- 辖区拥堵、警情、警力分步echarts图表div -->
							    	<div class="furyr">
							    		<dl>
							    			<dt  style="color: #8CBBEF;">警情数量</dt>
							    			<dd style="background-color: #217F47;color: white;">0~100</dd>
							    			<dd style="background-color: #9B7F47;color: white;">100~200</dd>
							    			<dd style="background-color: #9B2347;color: white;">200~300</dd>
							    			<dd style="background-color: #5D0527;color: white;">300~400</dd>
							    		</dl>
							    	</div>
							    	</div>
							    </div><!-- 整个div -->
							</div>
						</div>
					</div><!-- 一个案例 -->
					
					<div class="app-block" style="touch-action:none; position:absolute; color:#fff; left:600px; top: 2220px;width: 185px; height: 80px; transform: translate(0px, 0px);">
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
										<div class="app-conmain-con">
											<div class="app-conmain-in-box xxxxx" id = "currentWINum">
												
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					
					<div style="touch-action:none; position:absolute; color:#fff; left:1000px; top: 0px;width: 600px; height: 100px; transform: translate(0px, 0px);">
						<div class="app-container" data-reactroot="">
							<div class="app-background">
								<canvas></canvas>
							</div>
							<!-- 图表 -->
							<div style="position:relative;">
								<div class="mapinfo" >
				                    <ul id = "PFWINum">
				                       <!--  <li><div><p>石景山大队警情数量</p><span>528</span><em></em></div></li>
				                        <li><div><p>石景山大队警情数量</p><span>528</span><em></em></div></li>
				                        <li><div><p>石景山大队警情数量</p><span>528</span><em></em></div></li>
				                        <li><div><p>石景山大队警情数量</p><span>528</span><em></em></div></li>
				                        <li><div><p>石景山大队警情数量</p><span>528</span><em></em></div></li>
				                        <li><div><p>石景山大队警情数量</p><span>528</span><em></em></div></li> -->
				                    </ul>
				                </div>
							</div>
						</div>
					</div>	
					
					
					<div style="touch-action:none; position:absolute; color:#fff; left:1800px; top: 0px;width: 600px; height:20px; transform: translate(0px, 0px);">
						<div class="app-container" data-reactroot="">
							<div class="app-background">
								<canvas></canvas>
							</div>
							<!-- 图表 -->

								<div class="mapinfo" style="height:30px;width:600px;">
				                    <ul>
				                        <li><div><p >今日机动车总量(万辆)</p><span >182.4</span><em></em></div></li>
				                        <li><div><p id = "currentCarNum2"></p><span id = "currentCarNum"></span><em></em></div></li>
				                        <li><div><p id = currentAverageCarNum3></p><span id = "currentAverageCarNum2"></span><em></em></div></li>
				                    </ul>
				                </div>

						</div>
					</div>	
					
					
					<div class="app-block" style="touch-action:none; position:absolute; color:#fff; left:800px; top: 2220px;width: 185px; height: 80px; transform: translate(0px, 0px);">
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
										<div class="app-conmain-con">
											<div class="app-conmain-in-box xxxxx" id = "currentPSNum">
												
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					
					<!-- 当前拥堵指数 -->
					<div class="app-block" style="touch-action:none; position:absolute; color:#fff; left:800px; top: 2220px;width: 185px; height: 80px; transform: translate(0px, 0px);">
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
										<div class="app-conmain-con">
												<div class="app-conmain-in-box jamIndex">
												</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					
					<!-- 当月违法次数 -->
					<div class="app-block" style="touch-action:none; position:absolute; color:#fff; left:3800px; top: 2220px;width: 185px; height: 80px; transform: translate(0px, 0px);">
						<div class="app-panel app-panel-uite">
							<div class="app-conmain">
								<div class="app-conmain-box">
				                  <div>
				                    <div class="app-conmain-con xxxxx">
				                        <div class="app-conmain-in-box vioIndex">
				                        </div>
				                    </div>
				                  </div>
				                </div>
							</div>
						</div>
					</div>
					
					
					<!-- 当月违法次数 -->
					<div class="app-block" style="touch-action:none; position:absolute; color:#fff; left:2800px; top: 3220px;width: 185px; height: 80px; transform: translate(0px, 0px);">
						<div class="app-panel app-panel-uite">
							<div class="app-conmain">
								<div class="app-conmain-box"  style="width: 100%;height: 100%;background: #06102f;">
				                  <div>
				                    <div class="app-conmain-con xxxxx">
				                        <div class="app-conmain-in-box" id = "currentTrafficNum">
				                        </div>
				                    </div>
				                  </div>
                        		</div>
							</div>
						</div>
					</div>
					
					
				</div>
			</div>
		</div>
	</div>
	
</body>
</html>
