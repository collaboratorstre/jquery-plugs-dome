<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path;
%>
<!DOCTYPE html>
<html style="height: 100%">
<head>
<meta charset="utf-8">
<link href="<%=basePath%>/board/css/main.css" rel="stylesheet">
<style type="text/css">
.mapbox{ width: 900px; height: 300px; background-color:rgba(125, 162, 255, 0.18); position: absolute; margin-left: 200px;}
#datesbox{
    width: 100%;
    height: 0px;
    position: absolute;
    bottom: 56px;
    left: 0;
}
.sorbtn{
    width: 50px;
    background:url(../../images/open_date.png) 13px 6px / 43% 66% no-repeat;
    height: 32px;
    position: absolute;
    bottom: 0;
    left: 0;
    cursor: pointer;
    opacity: 0.3;
}
.sorbtn:hover{
    opacity: 0.7;
}
.dates{
    width: 50px;
    position: absolute;
    bottom: 33px;
    display: none;
}
.dates ul{}
.dates ul li{
    text-align: center;
    line-height: 32px;
    /*border:1px solid rgba(255, 255, 255, 0);*/
    background:rgba(0, 192, 255, 0.53);
    cursor: pointer;
    margin-top: -1px;
    font-weight: 100;
    font-size: 12px;
    margin: 0 0px 1px 0;
}
.dates ul li.active{
    background:rgba(255, 240, 130, 0.86);
    color: #000f35;
}
.dates ul li:hover{
    background:rgba(255, 224, 132, 0.59);
    color: #000f35;
}
.hours{
    margin-top: -32px;
    margin-left: 49px;
    display: none;
}
.hours dl{
    display: -webkit-box;
    margin-left: 1px;
}
.hours dl>*{
    white-space: nowrap;
    -webkit-box-flex: 1;
    -moz-box-flex: 1;
    -ms-flex: 1;
    text-align: center;
    padding:0;
    width: 20%;
    -ms-flex: 1;
    line-height: 32px;
    /*border:1px solid rgba(255, 255, 255, 0);*/
    background:rgba(0, 192, 255, 0.53);
    cursor: pointer;
    margin-left: -1px;
    font-weight: 100;
    margin: 0 0px 0 1px;
}
.hours dl>*.active{
    background:rgba(255, 240, 130, 0.86);
    color: #000f35;
}
.hours dl>*:hover{
    background:rgba(255, 240, 130, 0.60);
    color: #000f35;
}
.atlose{ opacity: 0.3;}

</style>
</head>
<body style="height: 100%; margin: 0;background:#fff;">
	<!-- <div id="map" style="height:690px;width: 930px;"></div>
	<div class="mapinfo" style="width:930px;height:690px;"></div> -->


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
                                <div   style="height:690px;width: 930px;position: relative;">
                                    <div id="map" style="height:92%;width: 100%;"></div>
                                    <div class="mapinfo mapinfo-line" style=" height: 32px;width: 98%;position: absolute;left: 5px;bottom: 4px;">
                                    <ul>
                                        <li><div><p >今日机动车总量(万辆)</p><span >182.4</span><em></em></div></li>
                                        <li><div><p id = "currentCarNum2"></p><span id = "currentCarNum"></span><em></em></div></li>
                                        <li><div><p id = currentAverageCarNum3></p><span id = "currentAverageCarNum2"></span><em></em></div></li>
                                    </ul>
                                    </div>
                                    <!-- <div class="mapbox"> -->
									    <div id="datesbox">
									        <div class="sorbtn"></div>
									        <div class="dates">
									            <ul></ul>
									        </div>
									        <div class="hours">
									            <dl>
									                <dt>◀</dt><dt>▶</dt>
									            </dl>
									        </div>
									    </div>
									<!-- </div> -->
                                </div><!-- 整个div -->                     
                            </div>  
                        </div>  
     </div>

	<!-- 新添加的jQuery -->
	<script src="<%=basePath%>/themes/default/js/jquery.min.js"></script>
	<script src="<%=basePath%>/show/echars/echarts.js"></script>
	<script src="<%=basePath%>/show/echars/esl.js"></script>
	
	<script type="text/javascript">
       var basePath="<%=basePath%>";
       var contextPathJs="<%=basePath%>";
		// JSON
		// 使用刚指定的配置项和数据显示图表。
	</script>

	<script src="<%=basePath%>/board/js/module/mapFour.js?v=1.2"></script>
	

	

<!-- 第三方插件 --> 

</body>
</html>