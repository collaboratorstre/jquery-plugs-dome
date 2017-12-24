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
<script src="<%=basePath%>/frame/utils/echart/echarts.js"></script>
<script src="<%=basePath%>/frame/utils/echart/esl.js"></script>
<script src="<%=basePath%>/board/js/manage/boardShow.js?v=1.0"></script>
<!-- 加载警情、警力、拥堵、设备、违法JS文件 -->
<script src="<%=basePath%>/board/js/module/warningEvent.js"></script>
<script src="<%=basePath%>/board/js/module/dutyDispatch.js"></script>
<script src="<%=basePath%>/board/js/module/trafficState.js"></script>
<script src="<%=basePath%>/board/js/module/equipment.js"></script>
<script src="<%=basePath%>/board/js/module/violation.js"></script>
<script src="<%=basePath%>/board/js/module/map.js"></script>

<script type="text/javascript">
   	var contextPathJs = "<%=basePath%>";
   	var boardId = "<%=boardId%>"; 
	/*
	 * 页面加载时触发
	 */
	$(document).ready(function() { 
 		boardPreview.getBoardInfo();
		boardPreview.show();
	});
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
				<div class="app-map-overlays" id = "show"></div>
				<!-- <div class="mapinfo" style="width:800px;height:100px;">
                    <ul id = "PFWINum">
                       <li><div><p>石景山大队警情数量</p><span>528</span><em></em></div></li>
                        <li><div><p>石景山大队警情数量</p><span>528</span><em></em></div></li>
                        <li><div><p>石景山大队警情数量</p><span>528</span><em></em></div></li>
                    </ul>
                </div> -->
			</div>
		</div>
	</div>
</body>
</html>
