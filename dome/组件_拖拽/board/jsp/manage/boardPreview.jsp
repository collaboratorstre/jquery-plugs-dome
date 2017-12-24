<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<!DOCTYPE HTML>
<html>
<head>
<base href="<%=basePath%>">
<title>看板预览</title>
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<link rel="stylesheet" type="text/css" href="<%=basePath%>/board/css/main.css">
<script src="<%=basePath%>/themes/default/js/jquery.min.js"></script>
<script src="<%=basePath%>/frame/utils/common/json2.js"></script>
<script src="<%=basePath%>/board/js/util/ajaxUtil.js"></script>
<script src="<%=basePath%>/frame/utils/common/ehualu.js"></script>
<script src="<%=basePath%>/show/echars/echarts.js"></script>
<script src="<%=basePath%>/show/echars/esl.js"></script>
<script src="<%=basePath%>/board/js/manage/boardPreview.js"></script>
<%-- <link rel="stylesheet" type="text/css" href="<%=basePath%>/board/css/compositeBoard.css"> --%>
<style type="text/css">
body {
	margin: 0 auto;
	background: #c1c1c1;
}

.container {
	margin: 0 auto;
	background: #c1c1c1;
}
</style>
</head>
<body>
	<div id="app" class="app">
		<div class="app-container" style="background-color: rgba(193, 193, 193);">
			<div class="app-background">
				<canvas></canvas>
				<!-- <canvas style="width: 1920px; height: 1080px;"></canvas> -->
			</div>
			<div style="position:relative;">
				<div class="app-map-overlays" id="show"></div>
			</div>
			<div id="jsShow"></div>
		</div>
	</div>
</body>
<script language="javascript" type="text/javascript"> 
	var contextPathJs="<%=basePath%>";
	$(document).ready(function() {
		var id = ehualu.utils.URLUtil.getURLParam(this.location, "id");
		//console.log(id);
		if (typeof (id) == "undefined") {//没有id代表预览
			var boardStr = ehualu.utils.localStorage.get("board");
			var moduleArrayStr = ehualu.utils.localStorage.get("moduleArray");
			boardPreview.preview(boardStr, moduleArrayStr);
		} else {//有id代表，实际展示
			boardPreview.show(id);
		}
	});
</script>
</html>
