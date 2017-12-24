<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path;
%>

<!DOCTYPE HTML>
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>大屏管理</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<link href="<%=basePath%>/themes/default/css/plugins/bootstrap/bootstrap.min.css" rel="stylesheet">
	<link href="<%=basePath%>/themes/default/css/plugins/bootstrap/font-awesome.css" rel="stylesheet">
	<link href="<%=basePath%>/themes/default/css/plugins/bootstrap/animate.css" rel="stylesheet">
	<link href="<%=basePath%>/themes/default/css/plugins/bootstrap/style.css" rel="stylesheet">
	<link href="<%=basePath%>/themes/default/css/plugins/bootstrap/customcss.css" rel="stylesheet">
	
	<link href="<%=basePath%>/themes/default/css/plugins/jqgrid/ui.jqgrid.css" rel="stylesheet">
	<link href="<%=basePath%>/themes/default/css/default.css" rel="stylesheet">
	<script src="<%=basePath%>/themes/default/js/jquery.min.js"></script>
	<script src="<%=basePath%>/themes/default/js/plugins/bootstrap/bootstrap.min.js?v=3.3.6"></script>
	<script src="<%=basePath%>/themes/default/js/plugins/bootstrap/bootbox.min.js?v=3.3.6"></script>
	<script src="<%=basePath%>/themes/default/js/plugins/jqgrid/i18n/grid.locale-cn.js"></script>
	<script src="<%=basePath%>/themes/default/js/plugins/jqgrid/jquery.jqGrid.min.js"></script>
	<!-- 业务js -->
	<script src="<%=basePath%>/board/js/manage/boardList.js"></script>
	<script src="<%=basePath%>/board/js/util/checkLen.js"></script>
	
	<script type="text/javascript">
	   var basePath='<%=basePath%>';
	</script>
</head>
 <body>
	
	<div class="title">
        <span><em></em>我的大屏</span>
        <input type="text" title="请输入大屏名称查询" id="descriptionCond" />
        <a href="javascript:;"  onclick="searchBoardInfo();"><em></em>查询</a>
        <a href="javascript:;"  onclick="addModal();"><em>+</em>新建大屏</a>
    </div>
    
	<div class="wrapper wrapper-content  animated fadeInRight">
		<div class="row">
		    <div class="col-sm-12">
		      <div class="ibox float-e-margins">
		        <div class="ibox-title">大屏看板详细信息</div>	        
		          <div class="jqGrid_wrapper">
						<table id="table_list_1"></table>
						<div id="pager_list_bottom"></div>
					</div>
		      </div>
		    </div>
	  	</div>
	</div> 
	
	<div class="modal" id="mymodal-data" tabindex="-1" role="dialog" style="overflow: hidden;"
		aria-labelledby="mySmallModalLabel" aria-hidden="true" data-backdrop="static" >
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h4 class="modal-title">新建大屏</h4>
				</div>
				<div class="modal-body">
					<form class="form-horizontal" role="form">
					 <div class="form-group">
							<label for="name" class="col-sm-3 control-label">名称：</label>
							<div class="col-sm-8">
								<input type="text" class="form-control input-sm" id="name" name="name" required onkeyup="checkLen(this,60)" >
							</div>
						</div>	
<!-- 						<div class="form-group">	 -->
<!-- 							<label for="description" class="col-sm-3 control-label">描述：</label> -->
<!-- 							<div class="col-sm-3"> -->
<!-- 								<textarea rows=""  cols=""  class="form-control input-sm" style="width:320px; height:75px;padding:5px;border-radius: 2px;resize:none;"  id="description" name="description" required ></textarea> -->
<!-- 							</div> -->
<!-- 						</div> -->
						<div class="form-group">
							<div  style="text-align: left;  padding-left: 157px;">
								  <button type="button" class="btn btn-info" onclick="saveBoradFieldInfo();">保存</button>
								  <button type="button" class="btn btn-default" onclick="closeEvent();">关闭</button>
							</div> 
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</body>
</html>
