<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML>
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>组件添加界面</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<link href="<%=basePath%>/board/css/compositeBoard.css" rel="stylesheet">
	<link href="<%=basePath%>showOthers/css/css.css" rel="stylesheet">
	<link href="<%=basePath%>showOthers/css/custom.css" rel="stylesheet">
	<link href="<%=basePath%>/board/css/main.css" rel="stylesheet">
	<!-- 颜色选择器 -->
	<link href="<%=basePath%>/themes/default/css/plugins/spectrum/spectrum.css" rel="stylesheet">
	<link href="<%=basePath%>/themes/default/css/plugins/bootstrap/bootstrap.min.css" rel="stylesheet">
	<link href="<%=basePath%>/themes/default/css/plugins/jqgrid/ui.jqgrid.css" rel="stylesheet">
	<link href="<%=basePath%>/themes/default/css/default.css" rel="stylesheet">
	<script src="<%=basePath%>/themes/default/js/jquery.min.js"></script>
	<script src="<%=basePath%>/themes/default/js/plugins/bootstrap/bootstrap.min.js?v=3.3.6"></script>
	<script src="<%=basePath%>/themes/default/js/plugins/jqgrid/i18n/grid.locale-cn.js"></script>
	<script src="<%=basePath%>/themes/default/js/plugins/jqgrid/jquery.jqGrid.min.js"></script>
	<!-- 颜色选择器 --> 
	<script src="<%=basePath%>/themes/default/js/plugins/spectrum/spectrum.js"></script>
	<script src="<%=basePath%>/themes/default/js/plugins/spectrum/docs.js"></script>
	<!-- echars图表 -->
	<script src="<%=basePath%>/show/echars/echarts.js"></script>
	<script src="<%=basePath%>/board/js/manage/moduleAdd.js"></script>
	<script src="<%=basePath%>/show/echars/esl.js"></script>
	<script type="text/javascript">
    var contextPathJs = "<%=basePath%>";
  </script>

  
  </head>
  
  <body>
<div class="app-editor-top">
        <div class="ant-row">
            <div class="ant-col-8">组件编辑</div>
            <div class="ant-col-8" style="text-align: center;">
                <span></span>
            </div>
            <div class="ant-col-8 app-editor-top-toolbar" style="text-align: right;"></div>
    </div>
 </div>
 
 <div class="modleft">
           <div  class="titpreview">组件预览</div>
           <div id = "show"  class="col-sm-4" ></div>
</div>
 <div class="row" style="  padding-top: 35px;" >
        
    	
    	
    	<div class="modright">
    		<div id = "jsShow"  style="border: 1px solid red;height: 100%;display: none;"></div>
    		<div class="modname">
    			<span>组件名称 : </span><input type="text" id = "name">
    		</div>
    		<div style="margin: 10 auto;background: #F8F8F8;">组件描述</div>
            <div>
                <textarea id = "description" style="width: 100%;"></textarea>
            </div>
    		<div>
    			html:<textarea style="width: 100%;" id="html" onchange="htmlChange()"></textarea>
    			javascript:<textarea style="width: 100%;" id="javaS" onchange="jsChange()"></textarea>
    		</div>
    		<div style="margin: 10 auto;background: #F8F8F8">位置</div>
			<div class="row">
				<div class="col-sm-6">
					<label><span>X: </span><input type="text" id = "xPosition" onchange="xChange()"style="width:120px;"/></label>
				</div>
				<div class="col-sm-6">
					<label><span>Y: </span><input type="text" id = "yPosition" onchange="yChange()"style="width:120px;"/></label>
				</div>
			</div>
			<div style="margin: 10 auto;background: #F8F8F8">大小</div>
			<div class="row">
				<div class="col-sm-6">
					<label><span>宽: </span><input type="text" id = "wPosition" onchange="wChange()" style="width:120px;"/></label>
				</div>
				<div class="col-sm-6">
					<label><span>高: </span><input type="text" id = "hPosition" onchange="hChange()" style="width:120px;"/></label>
				</div>
			</div>
			<div style="margin: 10 auto;background: #F8F8F8;">文字</div>
			<div class="row">
				<div class="col-sm-3 col-sm-zt100">基准大小</div>
				<div class="scroll col-sm-9" id="fScroll" style="margin: 5px 16px;">
			      
			      <div id = "textInner" style="margin-left: 295px; margin-top: -8px;"></div>
			      <div class="mask" id="mask"></div>
			      <div class="bar" id="bar"></div>
			    </div>
			</div>
			<div class="row" style="margin-top: 10px;;">
				<div class="col-sm-3 col-sm-zt100">基准行高</div>
				<div class="scroll col-sm-9" id="hScroll" style="margin: 5px 16px;">
			      
			      <div id = "hTextInner" style="margin-left: 295px; margin-top: -8px;"></div>
			      <div class="mask" id="hMask"></div>
			      <div class="bar" id="hBar"></div>
			    </div>
			</div>
			<div class="row" style="margin-top: 10px;;">
				<div class="col-sm-3 col-sm-zt100">颜色</div>
				<div class="col-sm-9" style="margin-left: 0px;">
					<input id="full" class="form-control" onchange="addYS(this.value)"/>
					<input type="hidden" id = "color">
				</div>
			</div>
			<div style="margin: 10 auto;background: #F8F8F8;">出场</div>
			<div class="row" style="margin-top: 10px;;">
				<div class="col-sm-3 col-sm-zt100">出场延迟</div>
				<div class="col-sm-9">
					<input type="text" id = "startDelay" value="0.0" style="width: 40;"/>
				</div>
			</div>
			<div class="row" style="margin-top: 10px;;">
				<div class="col-sm-3 col-sm-zt100">出场动画</div>
				<div class="col-sm-9">
					<input type="text" id = "startAnimation" value="无" style="width: 40;"/>
				</div>
			</div>
			<div class="row" style="margin-top: 10px;;">
				<div class="col-sm-3 col-sm-zt100">动画时间</div>
				<div class="col-sm-9">
					<input type="text" id = "animationTime" value="0.0" style="width: 40;"/>
				</div>
			</div>
			
			<div style="margin: 10 auto;text-align: center;">
				<input type="submit" value="保存" class="btn" style="width: 100px;" onclick="saveModule()"/>
			</div>
			
    	</div>
   </div>
    	
    	

   
  </body>
  
   <script>  
    var scroll = document.getElementById('fScroll');
    var bar = document.getElementById('bar');
    var mask = document.getElementById('mask');
    var textInner = document.getElementById('textInner');
    var ptxt = document.getElementsByTagName('p')[0];
    var barleft = 0;
    var fontSize = 0;
    bar.onmousedown = function(event){
      var event = event || window.event;
      var leftVal = event.clientX - this.offsetLeft;
      var that = this;
       // 拖动一定写到 down 里面才可以
      document.onmousemove = function(event){
        var event = event || window.event;
        barleft = event.clientX - leftVal;     
        if(barleft < 0)
          barleft = 0;
        else if(barleft > scroll.offsetWidth - bar.offsetWidth)
          barleft = scroll.offsetWidth - bar.offsetWidth;
        
        mask.style.width = barleft +'px' ;
        that.style.left = barleft + "px";
        fontSize = parseInt(barleft/(scroll.offsetWidth-bar.offsetWidth) * 60);
       	if (fontSize < 10) {
			fontSize = 10;
        	textInner.innerHTML = fontSize;
		}else{
       		textInner.innerHTML = fontSize;
		}
 
 	   $("#show div:eq(0)").css("font-size",fontSize);
        //防止选择内容--当拖动鼠标过快时候，弹起鼠标，bar也会移动，修复bug
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
      }
 
    }
    document.onmouseup = function(){
      document.onmousemove = null; //弹起鼠标不做任何操作
    }
  </script>
   <script>  
    var hScroll = document.getElementById('hScroll');
    var hBar = document.getElementById('hBar');
    var hMask = document.getElementById('hMask');
    var hTextInner = document.getElementById('hTextInner');
    var hBarleft = 0;
    var rowHeight = 0;
    hBar.onmousedown = function(event){
      var event = event || window.event;
      var leftVal = event.clientX - this.offsetLeft;
      var that = this;
       // 拖动一定写到 down 里面才可以
      document.onmousemove = function(event){
        var event = event || window.event;
        hBarleft = event.clientX - leftVal;     
        if(hBarleft < 0)
          hBarleft = 0;
        else if(hBarleft > hScroll.offsetWidth - hBar.offsetWidth)
          hBarleft = hScroll.offsetWidth - hBar.offsetWidth;
        
        hMask.style.width = hBarleft +'px' ;
        that.style.left = hBarleft + "px";
        rowHeight = (hBarleft/(hScroll.offsetWidth-hBar.offsetWidth) * 3).toFixed(1);
       	hTextInner.innerHTML = rowHeight;
 
        //防止选择内容--当拖动鼠标过快时候，弹起鼠标，bar也会移动，修复bug
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
      }
 
    }
    document.onmouseup = function(){
    document.onmousemove = null; //弹起鼠标不做任何操作
    }
  </script>
</html>
