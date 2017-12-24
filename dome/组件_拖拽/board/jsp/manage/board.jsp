<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ page import="com.ehl.frame.util.ParamManage"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
String map_client_url = ParamManage.getValue("gis","map_client_url");
String map_buffer_service_url = ParamManage.getValue("gis","map_buffer_service_url");
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>研判大屏</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<link href="<%=basePath%>/themes/default/css/plugins/bootstrap/bootstrap.min.css" rel="stylesheet">
	<link href="<%=basePath%>/themes/default/css/plugins/jqgrid/ui.jqgrid.css" rel="stylesheet">
	<!-- 加载地图 -->
	<script type="text/javascript" src="<%=basePath%>/board/js/mapConfig.js"></script>
	<script type="text/javascript" src="<%=map_client_url%>"></script>
	<script src="<%=basePath%>/themes/default/js/jquery.min.js"></script>
	<script src="<%=basePath%>/themes/default/js/plugins/bootstrap/bootstrap.min.js?v=3.3.6"></script>
	<script src="<%=basePath%>/themes/default/js/plugins/jqgrid/i18n/grid.locale-cn.js"></script>
	<script src="<%=basePath%>/themes/default/js/plugins/jqgrid/jquery.jqGrid.min.js"></script>
	
	<!-- echars图表 -->
	<script src="<%=basePath%>/show/echars/echarts.js"></script>
	<script src="<%=basePath%>/board/js/manage/board.js"></script>
	<script src="<%=basePath%>/show/echars/esl.js"></script>
	<script type="text/javascript">
    var contextPathJs = "<%=basePath%>";
  </script>
  
  <style type="text/css">
.block{position:absolute;left:0;top:100px;border:0px solid red;background:red;width:0px;height:0px;z-index: 10000;}
.block0{position:absolute;left:0;top:100px;border:0px solid red;background:red;width:0px;height:0px;z-index: 10000;}
.block1{position:absolute;left:0;top:100px;border:0px solid red;background:red;width:0px;height:0px;z-index: 10000;}
.block2{position:absolute;left:0;top:100px;border:0px solid red;background:red;width:0px;height:0px;z-index: 10000;}
.block3{position:absolute;left:0;top:100px;border:0px solid red;background:red;width:0px;height:0px;z-index: 10000;}
.block4{position:absolute;left:0;top:100px;border:0px solid red;background:red;width:0px;height:0px;z-index: 10000;}
.block5{position:absolute;left:0;top:100px;border:0px solid red;background:red;width:0px;height:0px;z-index: 10000;}
#map{width:100%;height: 100%;border:2px inset #fff;background:#fff;position:relative;overflow:hidden;float: left;}
</style>
</head>
<body style="width:100%;height:100%" >
	<div id = "map" style="border:1px solid red;">
		<div id="main" class="block">
			<div style="width: 360px;height:265px;background-color: #021068;border: 1px solid #F00;margin-left: 0px;margin-top:0px;" id = "areaJam1">
		    	<div style="margin-left: 20px;color: #1E5FBC;margin-top: 5px;"><i></i>辖区拥堵点、警情、警力分布</div><!-- top标题div -->
		    	<div style="margin-left: 10px;color: #1E5FBC;margin-top: 5px;float: left;" id = "areaJam"></div><!-- 辖区拥堵、警情、警力分步echarts图表div -->
		    </div><!-- 整个div -->
		</div>
		
		<div id="main0" class="block0">
			<div style="width: 360px;height:265px;background-color: #021068;border: 1px solid #F00;" id = "jamRoadChange1">
		    	<div style="margin-left: 20px;color: #1E5FBC;margin-top: 5px;"><i></i>今日拥堵路段数量变化趋势</div><!-- top标题div -->
		    	<div style="margin-left: 10px;color: #1E5FBC;margin-top: 5px;float: left;" id = "jamRoadChange"></div><!-- 辖区拥堵、警情、警力分步echarts图表div -->
		    </div><!-- 整个div -->
		</div>
		
		<div id="main5" class="block5">
			<div style="width: 360px;height:280px;background-color: #021068;border: 1px solid #F00;" id = "todayWIPS1">
		    	<div style="margin-left: 20px;color: #1E5FBC;margin-top: 10px;height: 30px;"><i></i>今日警情与警力变化趋势</div><!-- top标题div -->
		    	<div style="margin-left: 10px;color: #1E5FBC;margin-top: 5px;float: left;" id = "todayWIPS"></div><!-- 辖区警力分配echarts图表div -->
		    </div><!-- 整个div -->
		</div>
		
		<div id="main2" class="block2">
			<div style="width: 360px;height:260px;background-color: #021068;border: 1px solid #F00;" id = "currentAreaWI1">
		    	<div style="margin-left: 20px;color: #1E5FBC;margin-top: 5px;"><i></i>今日辖区警情<b style="color: #33FDFD;font-size: 18px;">TOP5</b></div><!-- top标题div -->
		    	<div style="margin-left: 10px;margin-top: 5px;" id = "currentAreaWI"></div><!-- 今日辖区警情echarts图表div -->
		    </div><!-- 整体div -->
		</div>
		
		<div id="main3" class="block3">
			<div style="width: 360px;height:280px;background-color: #021068;border: 1px solid #F00;" id = "areaWI1">
		    	<div style="margin-left: 20px;color: #1E5FBC;margin-top: 10px;height: 30px;"><i></i>辖区警情<b style="color: #33FDFD;font-size: 18px;">TOP5</b><b style="color: #99CCFF;font-size: 10px;">(近一小时之内数据)</b></div><!-- top标题div -->
		    	<div style="background: #061C72;height: 20px;"><b style="color: #1E5FBC;margin-left: 70%;font-size: 80%;">日环比 &nbsp;&nbsp;周环比</b></div><!-- 日环比div -->
		    	<div style="margin-left: 10px;color: #1E5FBC;margin-top: 5px;float: left;" id = "areaWI"></div><!-- 辖区警力分配echarts图表div -->
		    	<div style="background: #061C72;text-align: center;margin-left: 84%;height: 10%;margin-right: 3%;margin-top: 5%;">
		    		<b style="color: #434A7B;font-size: 14px;">39</b>
		    	</div>
		    	<div style="background: #061C72;text-align: center;margin-left: 84%;height: 10%;margin-right: 3%;margin-top: 2%;">
		    		<b style="color: #434A7B;font-size: 14px;">32</b>
		    	</div>
		    	<div style="background: #061C72;text-align: center;margin-left: 84%;height: 10%;margin-right: 3%;margin-top: 2%;">
		    		<b style="color: #434A7B;font-size: 14px;">30</b>
		    	</div>
		    	<div style="background: #061C72;text-align: center;margin-left: 84%;height: 10%;margin-right: 3%;margin-top: 2%;">
		    		<b style="color: #434A7B;font-size: 14px;">26</b>
		    	</div>
		    	<div style="background: #061C72;text-align: center;margin-left: 84%;height: 10%;margin-right: 3%;margin-top: 2%;">
		    		<b style="color: #434A7B;font-size: 14px;">22</b>
		    	</div>
		    </div><!-- 整个div -->
		</div>
		
		<div id="main4" class="block4">
			 <div style="width: 360px;height:280px;background-color: #021068;border: 1px solid #F00;" id = "areaPsDistribution1">
		    	<div style="margin-left: 20px;color: #1E5FBC;margin-top: 5px;"><i></i>辖区警力分配<b style="color: #33FDFD;font-size: 18px;">TOP5</b></div><!-- top标题div -->
		    	<div style="background: #061C72;"><b style="color: #1E5FBC;margin-left: 85%;font-size: 80%;">日环比</b></div><!-- 日环比div -->
		    	<div style="margin-left: 10px;color: #1E5FBC;margin-top: 5px;float: left;" id = "areaPsDistribution"></div><!-- 辖区警力分配echarts图表div -->
		    	<div style="background: #061C72;text-align: center;margin-left: 84%;height: 10%;margin-right: 3%;margin-top: 5%;">
		    		<b style="color: #434A7B;font-size: 10px;">39</b>
		    	</div>
		    	<div style="background: #061C72;text-align: center;margin-left: 84%;height: 10%;margin-right: 3%;margin-top: 2%;">
		    		<b style="color: #434A7B;font-size: 10px;">32</b>
		    	</div>
		    	<div style="background: #061C72;text-align: center;margin-left: 84%;height: 10%;margin-right: 3%;margin-top: 2%;">
		    		<b style="color: #434A7B;font-size: 10px;">30</b>
		    	</div>
		    	<div style="background: #061C72;text-align: center;margin-left: 84%;height: 10%;margin-right: 3%;margin-top: 2%;">
		    		<b style="color: #434A7B;font-size: 10px;">26</b>
		    	</div>
		    	<div style="background: #061C72;text-align: center;margin-left: 84%;height: 10%;margin-right: 3%;margin-top: 2%;">
		    		<b style="color: #434A7B;font-size: 10px;">22</b>
		    	</div>
		    	<div style="margin-top: 2%;">
		    		<b style="color: #1E5FBC;font-size: 10px;">(到岗率)</b>
		    	</div>
		    </div><!-- 整个div -->
		</div>
		
		<div id="main1" class="block1">
			<div style="width: 800px;height:265px;background-color: #021068;border: 1px solid #F00;" >
    	<div style="margin-left: 20px;color: #1E5FBC;margin-top: 5px;"><i></i>高发警情区域<b style="color: #33FDFD;font-size: 18px;">TOP5</b></div><!-- top标题div -->
    	<div style="margin-left: 10px;color: #1E5FBC;margin-top: 25px;float: left;"  class = "highWI">
    		<table width="690" height = "200" border="0"  cellspacing="1px;" cellpadding="1px;" >
    			<tr>
    				<th style="color: #8CBBEF;">南锣鼓巷</th>
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
    				<th style="color: #8CBBEF;">后海</th>
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
    				<th style="color: #8CBBEF;">王府井</th>
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
    				<th style="color: #8CBBEF;">西单</th>
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
    				<th style="color: #8CBBEF;">CBD</th>
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
    			</tr>
    			<tr style="color: #8CBBEF;">
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
    			</tr>
    		</table>
    	</div><!-- 辖区拥堵、警情、警力分步echarts图表div -->
    	<div style="margin-top: 20px;margin-left: 710px;">
    		<table style="height: 180px; border-collapse:separate;border-spacing:10px; ">
    			<tr >
    				<th  style="color: #8CBBEF;font-size: 14px;">警情数量</th>
    			</tr>
    			<tr >
    				<th style="background-color: #217F47;color: white;">0~100</th>
    				
    			</tr>
    			<tr>
    				<th style="background-color: #9B7F47;color: white;">100~200</th>
    				
    			</tr>
    			<tr>
    				<th style="background-color: #9B2347;color: white;">200~300</th>
    				
    			</tr>
    			<tr>
    				<th style="background-color: #5D0527;color: white;">300~400</th>
    			</tr>
    		</table>
    	</div>
    	
    </div><!-- 整个div -->
		    
		</div>
	</div>
</body>
<script type="text/javascript">
function Drag(title,body,range){
    var w=window,win=body||title,x,y,_left,_top,range=range||function(x){return x};
    title.style.cursor='move';
    title.onmousedown=function (e){
        e=e||event;
        x=e.clientX,y=e.clientY,_left=win.offsetLeft,_top=win.offsetTop;
        this.ondragstart=function(){return false};
        document.onmousemove=e_move;
        document.onmouseup=undrag
    };
    function e_move(e){
        e=e||event;
        var cl=range(_left+e.clientX-x,'x'),ct=range(_top+e.clientY-y,'y');
        win.style.left=cl+'px';
        win.style.top=ct+'px';
        w.getSelection?w.getSelection().removeAllRanges():
            document.selection.empty();        
    };
    function undrag(){this.onmousemove=null};
};

function $(x){return typeof x=='string'?document.getElementById(x):x};
var map=$("map"),main=$('main');
var max={
    x:map.offsetWidth-main.offsetWidth-4,
    y:map.offsetHeight-main.offsetHeight-4
}

Drag(
    main,
    false,
    function(x,type){return Math.max(0,Math.min(max[type],x))}
) 
</script>
<script type="text/javascript">
function Drag(title,body,range){
    var w=window,win=body||title,x,y,_left,_top,range=range||function(x){return x};
    title.style.cursor='move';
    title.onmousedown=function (e){
        e=e||event;
        x=e.clientX,y=e.clientY,_left=win.offsetLeft,_top=win.offsetTop;
        this.ondragstart=function(){return false};
        document.onmousemove=e_move;
        document.onmouseup=undrag
    };
    function e_move(e){
        e=e||event;
        var cl=range(_left+e.clientX-x,'x'),ct=range(_top+e.clientY-y,'y');
        win.style.left=cl+'px';
        win.style.top=ct+'px';
        w.getSelection?w.getSelection().removeAllRanges():
            document.selection.empty();        
    };
    function undrag(){this.onmousemove=null};
};

function $(x){return typeof x=='string'?document.getElementById(x):x};
var map=$("map"),main1=$('main1');
var max={
    x:map.offsetWidth-main1.offsetWidth-4,
    y:map.offsetHeight-main1.offsetHeight-4
}

Drag(
    main1,
    false,
    function(x,type){return Math.max(0,Math.min(max[type],x))}
) 
</script>
<script type="text/javascript">
function Drag(title,body,range){
    var w=window,win=body||title,x,y,_left,_top,range=range||function(x){return x};
    title.style.cursor='move';
    title.onmousedown=function (e){
        e=e||event;
        x=e.clientX,y=e.clientY,_left=win.offsetLeft,_top=win.offsetTop;
        this.ondragstart=function(){return false};
        document.onmousemove=e_move;
        document.onmouseup=undrag
    };
    function e_move(e){
        e=e||event;
        var cl=range(_left+e.clientX-x,'x'),ct=range(_top+e.clientY-y,'y');
        win.style.left=cl+'px';
        win.style.top=ct+'px';
        w.getSelection?w.getSelection().removeAllRanges():
            document.selection.empty();        
    };
    function undrag(){this.onmousemove=null};
};

function $(x){return typeof x=='string'?document.getElementById(x):x};
var map=$("map"),main2=$('main2');
var max={
    x:map.offsetWidth-main2.offsetWidth-4,
    y:map.offsetHeight-main2.offsetHeight-4
}

Drag(
    main2,
    false,
    function(x,type){return Math.max(0,Math.min(max[type],x))}
) 
</script>
<script type="text/javascript">
function Drag(title,body,range){
    var w=window,win=body||title,x,y,_left,_top,range=range||function(x){return x};
    title.style.cursor='move';
    title.onmousedown=function (e){
        e=e||event;
        x=e.clientX,y=e.clientY,_left=win.offsetLeft,_top=win.offsetTop;
        this.ondragstart=function(){return false};
        document.onmousemove=e_move;
        document.onmouseup=undrag
    };
    function e_move(e){
        e=e||event;
        var cl=range(_left+e.clientX-x,'x'),ct=range(_top+e.clientY-y,'y');
        win.style.left=cl+'px';
        win.style.top=ct+'px';
        w.getSelection?w.getSelection().removeAllRanges():
            document.selection.empty();        
    };
    function undrag(){this.onmousemove=null};
};

function $(x){return typeof x=='string'?document.getElementById(x):x};
var map=$("map"),main3=$('main3');
var max={
    x:map.offsetWidth-main3.offsetWidth-4,
    y:map.offsetHeight-main3.offsetHeight-4
}

Drag(
    main3,
    false,
    function(x,type){return Math.max(0,Math.min(max[type],x))}
) 
</script>
<script type="text/javascript">
function Drag(title,body,range){
    var w=window,win=body||title,x,y,_left,_top,range=range||function(x){return x};
    title.style.cursor='move';
    title.onmousedown=function (e){
        e=e||event;
        x=e.clientX,y=e.clientY,_left=win.offsetLeft,_top=win.offsetTop;
        this.ondragstart=function(){return false};
        document.onmousemove=e_move;
        document.onmouseup=undrag
    };
    function e_move(e){
        e=e||event;
        var cl=range(_left+e.clientX-x,'x'),ct=range(_top+e.clientY-y,'y');
        win.style.left=cl+'px';
        win.style.top=ct+'px';
        w.getSelection?w.getSelection().removeAllRanges():
            document.selection.empty();        
    };
    function undrag(){this.onmousemove=null};
};

function $(x){return typeof x=='string'?document.getElementById(x):x};
var map=$("map"),main4=$('main4');
var max={
    x:map.offsetWidth-main4.offsetWidth-4,
    y:map.offsetHeight-main4.offsetHeight-4
}

Drag(
    main4,
    false,
    function(x,type){return Math.max(0,Math.min(max[type],x))}
) 
</script>
<script type="text/javascript">
function Drag(title,body,range){
    var w=window,win=body||title,x,y,_left,_top,range=range||function(x){return x};
    title.style.cursor='move';
    title.onmousedown=function (e){
        e=e||event;
        x=e.clientX,y=e.clientY,_left=win.offsetLeft,_top=win.offsetTop;
        this.ondragstart=function(){return false};
        document.onmousemove=e_move;
        document.onmouseup=undrag
    };
    function e_move(e){
        e=e||event;
        var cl=range(_left+e.clientX-x,'x'),ct=range(_top+e.clientY-y,'y');
        win.style.left=cl+'px';
        win.style.top=ct+'px';
        w.getSelection?w.getSelection().removeAllRanges():
            document.selection.empty();        
    };
    function undrag(){this.onmousemove=null};
};

function $(x){return typeof x=='string'?document.getElementById(x):x};
var map=$("map"),main0=$('main0');
var max={
    x:map.offsetWidth-main0.offsetWidth-4,
    y:map.offsetHeight-main0.offsetHeight-4
}

Drag(
    main0,
    false,
    function(x,type){return Math.max(0,Math.min(max[type],x))}
) 
</script>
<script type="text/javascript">
function Drag(title,body,range){
    var w=window,win=body||title,x,y,_left,_top,range=range||function(x){return x};
    title.style.cursor='move';
    title.onmousedown=function (e){
        e=e||event;
        x=e.clientX,y=e.clientY,_left=win.offsetLeft,_top=win.offsetTop;
        this.ondragstart=function(){return false};
        document.onmousemove=e_move;
        document.onmouseup=undrag
    };
    function e_move(e){
        e=e||event;
        var cl=range(_left+e.clientX-x,'x'),ct=range(_top+e.clientY-y,'y');
        win.style.left=cl+'px';
        win.style.top=ct+'px';
        w.getSelection?w.getSelection().removeAllRanges():
            document.selection.empty();        
    };
    function undrag(){this.onmousemove=null};
};

function $(x){return typeof x=='string'?document.getElementById(x):x};
var map=$("map"),main5=$('main5');
var max={
    x:map.offsetWidth-main5.offsetWidth-4,
    y:map.offsetHeight-main5.offsetHeight-4
}

Drag(
    main5,
    false,
    function(x,type){return Math.max(0,Math.min(max[type],x))}
) 
</script>
</html>
