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
    
    <title>交通因素管理界面</title> 
	<meta http-equiv="description" content="This is my page">
	<link href="<%=basePath%>/board/css/bootstrap.css" rel="stylesheet">
	<link href="<%=basePath%>/themes/default/css/plugins/jqgrid/ui.jqgrid.css" rel="stylesheet">
	<link href="<%=basePath%>/themes/default/css/default.css" rel="stylesheet">
	<link href="<%=basePath%>/board/css/bootstrap-datetimepicker.css" rel="stylesheet">
	<script src="<%=basePath%>/themes/default/js/jquery.min.js"></script>
	<script src="<%=basePath%>/themes/default/js/plugins/bootstrap/bootstrap.min.js?v=3.3.6"></script>
	<script src="<%=basePath%>/themes/default/js/plugins/bootstrap/bootbox.min.js?v=3.3.6"></script>
	<script src="<%=basePath%>/themes/default/js/plugins/jqgrid/i18n/grid.locale-cn.js"></script>
	<script src="<%=basePath%>/themes/default/js/plugins/jqgrid/jquery.jqGrid.min.js"></script> 
	<script src="<%=basePath%>/board/js/bootstrap-datetimepicker.min.js"></script> 
	<script src="<%=basePath%>/board/js/bootstrap-datetimepicker.zh-CN.js"></script> 
	
	<script src="<%=basePath%>/board/js/manage/trafficFactor.js"></script> 
  </head>
  
  <body>
	 <div class="title">
	    <span>交通因素管理</span>
	    <a href="javascript:;" onclick="addTrafficFactor();"><em>+</em>新建交通因素</a>
	    <select id = "dataSourceType" style="margin-left: 10px;margin-top: 5px;height: 27px;text-align: center;">
	    	<option value="2">--请选择--</option>
	    	<option value="0">人工录入</option>
	    	<option value="1">互联网抓取</option>
	    </select>
	    <input type="button" value="查询" onclick="reloadTrafficFactor()"/>
    </div>
    <div class="jqGrid_wrapper" style="margin: 10px 20px;border-left: 1px solid #ececec; border-right: 1px solid #ececec;">
		<table id="table_list_1"></table>
		<div id="pager_list_bottom"></div>
	</div>
    
    <!-- bootstrap 模态框 -->
	<div class="modal fade" id="trafficFactorModalAdd" style="z-index: 10000;">  
	  <div class="modal-dialog">  
	    <div class="modal-content message_align">  
	      <div class="modal-header">  
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>  
	        <h4 class="modal-title">交通因素添加</h4>  
	      </div>  
	      <div class="modal-body">
	      <form class="form-horizontal" id="updateform"> 
		      <div class="form-group">
					<label for="" class="col-sm-2 control-label">标题:</label>
					<div class="col-sm-10">
						<input id="titleId" name = "titleId"  type="text" class="form-control" style="height: 30px;" placeholder="影响交通因素的标题" required/>
					</div>
			 </div>
		      <div class="form-group">
					<label for="" class="col-sm-2 control-label">内容:</label>
					<div class="col-sm-10">
						<input id="contentsId" name = "contentsId"  type="text" class="form-control" style="height: 30px;" placeholder="影响交通因素的内容" />
					</div>
			 </div>
			 <div class="form-group">
					<label for="" class="col-sm-2 control-label">数据来源:</label>
					<div class="col-sm-10">
						<select id = "dataSourceId" style="height: 30px;width: 205px;">
					    	<option value="0">人工录入</option>
					    	<option value="1">互联网抓取</option>
					    </select>
					</div>
			 </div>
			 <div class="form-group">
					<label for="" class="col-sm-2 control-label">事件分类:</label>
					<div class="col-sm-10">
						<select id = "typeId" style="height: 30px;width: 205px;">
					    	<option value="1">大型活动</option>
					    	<option value="2">交通管制</option>
					    	<option value="3">施工占道</option>
					    	<option value="9">其他</option>
					    </select>
					</div>
			 </div>
			 <div class="form-group">
				<label for="" class="col-sm-2 control-label">生效日期:</label>
				<div class="col-sm-10">
					<div class="input-append date form_datetime" data-date="" data-date-format="yyyy-MM-dd" data-link-field="dtp_input2" data-link-format="yyyy-mm-dd HH24:mi:ss">
	                    <input id = "beginDayId" size="16" class="add-on valtype" type="text" value="" style="height: 30px;" readonly>
	                    <span class="add-on" style="height: 30px;"><i class="icon-remove"></i></span>
						<span class="add-on" style="height: 30px;"><i class="icon-th"></i></span>
	                </div>
				</div>
			 </div>
			 <div class="form-group">
				<label for="" class="col-sm-2 control-label">失效日期:</label>
				<div class="col-sm-10">
					<div class="input-append date form_datetime" data-date="" data-date-format="yyyy-MM-dd" data-link-field="dtp_input2" data-link-format="yyyy-mm-dd HH24:mi:ss">
	                    <input id = "expireDayId" size="16" class="add-on valtype" type="text" value="" style="height: 30px;" readonly>
	                    <span class="add-on" style="height: 30px;"><i class="icon-remove"></i></span>
						<span class="add-on" style="height: 30px;"><i class="icon-th"></i></span>
	                </div>
				</div>
			 </div>
			</form>
	      </div>  
	      <div class="modal-footer">  
	         <input type="hidden" id="url"/>  
	         <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>  
	         <button onclick="trafficFactorSave()" type="button" class="btn btn-default">保存</button>
	      </div>  
	    </div><!-- /.modal-content -->  
	  </div><!-- /.modal-dialog -->  
	</div><!-- /.modal -->  
	
	<!-- bootstrap 模态框 -->
	<div class="modal fade" id="trafficFactorModalEdit" style="z-index: 10000;">  
	  <div class="modal-dialog">  
	    <div class="modal-content message_align">  
	      <div class="modal-header">  
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>  
	        <h4 class="modal-title">交通因素修改</h4>  
	      </div>  
	      <div class="modal-body">
	      <input type="hidden" id = "editId" />
	      <form class="form-horizontal"> 
	      	 <div class="form-group">
					<label for="" class="col-sm-2 control-label">标题:</label>
					<div class="col-sm-10">
						<input id="titleEdit" name = "titleEdit"  type="text" class="form-control" style="height: 30px;" placeholder="影响交通因素的标题" required/>
					</div>
			 </div>
		     <div class="form-group">
					<label for="" class="col-sm-2 control-label">内容:</label>
					<div class="col-sm-10">
						<input id="contentsEdit"  type="text" class="form-control" style="height: 30px;" placeholder="影响交通因素的内容">
					</div>
			 </div>
			 <div class="form-group">
					<label for="" class="col-sm-2 control-label">数据来源:</label>
					<div class="col-sm-10">
						<select id = "dataSourceEdit" style="height: 30px;width: 205px;">
					    	<option value="0">人工录入</option>
					    	<option value="1">互联网抓取</option>
					    </select>
					</div>
			 </div>
			 <div class="form-group">
					<label for="" class="col-sm-2 control-label">事件分类:</label>
					<div class="col-sm-10">
						<select id = "typeEdit" style="height: 30px;width: 205px;">
					    	<option value="1">大型活动</option>
					    	<option value="2">交通管制</option>
					    	<option value="3">施工占道</option>
					    	<option value="9">其他</option>
					    </select>
					</div>
			 </div>
			 <div class="form-group">
				<label for="" class="col-sm-2 control-label">生效日期:</label>
				<div class="col-sm-10">
					<div class="input-append date form_datetime" data-date="" data-date-format="yyyy-MM-dd HH24:mi:ss" data-link-field="dtp_input2" data-link-format="yyyy-mm-dd  HH24:mi:ss">
	                    <input id = "beginDayEdit" size="16" class="add-on valtype" type="text" value="" style="height: 30px;" readonly>
	                    <span class="add-on" style="height: 30px;"><i class="icon-remove"></i></span>
						<span class="add-on" style="height: 30px;"><i class="icon-th"></i></span>
	                </div>
				</div>
			 </div>
			 <div class="form-group">
				<label for="" class="col-sm-2 control-label">失效日期:</label>
				<div class="col-sm-10">
					<div class="input-append date form_datetime " data-date="" data-date-format="yyyy-MM-dd HH24:mi:ss" data-link-field="dtp_input2" data-link-format="yyyy-mm-dd HH24:mi:ss">
	                    <input id = "expireDayEidt" size="16" class="add-on valtype" type="text" value="" style="height: 30px;" readonly>
	                    <span class="add-on" style="height: 30px;"><i class="icon-remove"></i></span>
						<span class="add-on" style="height: 30px;"><i class="icon-th"></i></span>
	                </div>
				</div>
			 </div>
			</form>
	      </div>  
	      <div class="modal-footer">  
	         <input type="hidden" id="url"/>  
	         <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>  
	         <a  onclick="trafficFactorEditSave()" class="btn btn-blue" >保存</a>  
	      </div>  
	    </div><!-- /.modal-content -->  
	  </div><!-- /.modal-dialog -->  
	</div><!-- /.modal -->  
  </body>
  
  <script type="text/javascript">
    var contextPathJs = "<%=basePath%>";
  </script>
  <script type="text/javascript">
  	 $(".form_datetime").datetimepicker({
  	 	autoclose: 1,
        format: "yyyy-mm-dd hh:ii"
    });
    $('.form_date').datetimepicker({
     	weekStart: 1,
        todayBtn:  1,
		autoclose: 1,
		todayHighlight: 1,
		startView: 2,
		minView: 2,
		forceParse: 0,
   		format: 'yyyy-mm-dd hh:ii:ss'
});
</script>
</html>
