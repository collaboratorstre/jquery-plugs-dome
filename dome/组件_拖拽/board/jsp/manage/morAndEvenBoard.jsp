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
    
    <title>综合看板</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<link href="<%=basePath%>/board/css/compositeBoard.css" rel="stylesheet">
	<link href="<%=basePath%>showOthers/css/css.css" rel="stylesheet">
	<link href="<%=basePath%>showOthers/css/custom.css" rel="stylesheet">
	<link href="<%=basePath%>/board/css/main.css" rel="stylesheet">
	<script src="<%=basePath%>/themes/default/js/jquery.min.js"></script>
	
	<!-- echars图表 -->
	<script src="<%=basePath%>/show/echars/echarts.js"></script>
	<script src="<%=basePath%>/show/echars/esl.js"></script>
	<script src="<%=basePath%>/board/js/manage/morAndEvenBoard.js"></script>
	<script type="text/javascript">
   		 var contextPathJs = "<%=basePath%>";
    </script>
  
</head>
<body>
	<div class="app" id="app">
		<div class="app-container" data-reactroot="">
			<div class="app-background">
				<canvas></canvas>
			</div>
			<!-- 图表 -->
			<div>
				<div class="app-map-overlays" id = "show">
				
					
				</div>
			</div>
		</div>
	</div>
</body>
</html>
