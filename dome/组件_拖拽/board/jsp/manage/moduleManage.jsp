<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML>
<html>
  <head>
  	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
    <base href="<%=basePath%>">
    
    <title>组件管理界面</title> 
	<meta http-equiv="description" content="This is my page">
	<link href="<%=basePath%>/themes/default/css/plugins/bootstrap/bootstrap.min.css" rel="stylesheet">
	<link href="<%=basePath%>/themes/default/css/plugins/jqgrid/ui.jqgrid.css" rel="stylesheet">
	<link href="<%=basePath%>/themes/default/css/default.css" rel="stylesheet">
	<script src="<%=basePath%>/themes/default/js/jquery.min.js"></script>
	<script src="<%=basePath%>/themes/default/js/plugins/bootstrap/bootstrap.min.js?v=3.3.6"></script>
	<script src="<%=basePath%>/themes/default/js/plugins/bootstrap/bootbox.min.js?v=3.3.6"></script>
	<script src="<%=basePath%>/themes/default/js/plugins/jqgrid/i18n/grid.locale-cn.js"></script>
	<script src="<%=basePath%>/themes/default/js/plugins/jqgrid/jquery.jqGrid.min.js"></script> 
	 <script src="<%=basePath%>/board/js/manage/moduleManage.js"></script> 
  </head>
  
  <body>
	 <div class="title">
	    <span>组件管理</span>
	    <a href="javascript:;" onclick="addModal();"><em>+</em>新建组件</a>
	    <input type="text" id = "moduleName" placeholder="组件名称模糊查询"/>
	    <select id = "moduleType">
	    	<option value="2">--请选择--</option>
	    	<option value="0">基础组件</option>
	    	<option value="1">实体组件</option>
	    </select>
	    <select id = "boardType">
	    	
	    </select>
	    <input type="button" value="查询" onclick="reloadBoardModule()"/>
    </div>
    <div class="jqGrid_wrapper" style="margin: 10px 20px;border-left: 1px solid #ececec; border-right: 1px solid #ececec;">
		<table id="table_list_1"></table>
		<div id="pager_list_bottom"></div>
	</div>
    
	
  </body>
  
  <script type="text/javascript">
    var contextPathJs = "<%=basePath%>";
  </script>
</html>
