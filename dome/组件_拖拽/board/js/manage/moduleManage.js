var moduleManager = {};
var format = function(time, format) {
	var t = new Date(time);
	var tf = function(i) {
		return (i < 10 ? '0' : '') + i
	};
	return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a) {
		switch (a) {
		case 'yyyy':
			return tf(t.getFullYear());
		case 'MM':
			return tf(t.getMonth() + 1);
		case 'mm':
			return tf(t.getMinutes());
		case 'dd':
			return tf(t.getDate());
		case 'HH':
			return tf(t.getHours());
		case 'ss':
			return tf(t.getSeconds());
		default :
			break;
		};
	});
};

$(function() {
	// 加载表格数据
	var width = $('.jqGrid_wrapper').width() - 20;
	$.ajax({
		type : "POST",
		url : contextPathJs + "/module/getBoardType.do",
		async : false,
		dataType : "json",
		success : function(data) {
			var html = "<option value='-5'>--------请选择--------</option>";
			$.each(data,function(i,v){
				html+="<option value="+v.id+">"+v.name+"</option>"
			});
			$("#boardType").append(html);
		}
	});
	$.jgrid.defaults.styleUI = 'Bootstrap';
	$("#table_list_1").jqGrid(
			{
				url : contextPathJs + "/module/getModuleManage.do",
				mtype : "GET",
				width : width,
				height : "auto",
				datatype : "json",
				page : 1,
				rowNum : 10,// 设置每一个grid的页做多显示多少条记录。
				rowList : [ 10, 20, 30 ],
				colModel : [
						{
							label : '组件id',
							name : 'id',
							key : true
							//hidden : true
						},
						{
							label : '名称',
							name : 'name'
						}, 
						{
							label : '组件类型',
							name : 'type',
							formatter : function(value) {
								if (value == 0) {
									return "模板";
								} else if (value == 1) {
									return "实例";
								}else if (value == 9) {
									return "备用组件";
								}
								return "";
							}
						},
						{
							label : '添加时间',
							name : 'addTime',
							formatter : function(value) {
								if (value == null) {
									return "";
								}
								return format(value, 'yyyy-MM-dd HH:mm:ss');
							}
						},
						{
							label : '修改时间',
							name : 'updateTime',
							formatter : function(value) {
								if (value == null) {
									return "";
								}
								var date = format(value, 'yyyy-MM-dd HH:mm:ss');
								return date;
							}
						},
						{
							label : '操作',
							name : 'sy',
							formatter : function(value, grid, rows, state) {
								var df = rows.id;
								var ddd = "moduleManager.editModal('" + df + "')";
								var ccc = "moduleManager.delModal('" + df + "')";
								return '<input id="yu' + df + '" type="button" name="Submit" value="修改"  onclick="' + ddd + '"/>' + '&nbsp;&nbsp;'
										+ '<input id="yu' + df + '" type="button" name="Submit" value="删除" onclick="' + ccc + '"/>';
							}
						} ],
				pager : '#pager_list_bottom',
				loadonce : true,
				recordpos : "right",
				viewrecords : true,
			});
	// 绑定Resize事件
	$(window).bind('resize', function() {
		var width = $('.jqGrid_wrapper').width();
		$('#table_list_1').setGridWidth(width);
	});
});

function addModal() {
	window.open("board/jsp/manage/moduleAdd.jsp");
}

moduleManager.editModal = function (id) {
	window.open("board/jsp/manage/moduleEdit.jsp?id=" + id);
}

moduleManager.delModal = function (id) {
	bootbox.confirm({  
        buttons: {  
            confirm: {  
                label: '确认',  
            },  
            cancel: {  
                label: '取消',  
            }  
        },  
        message: '确认删除该组件吗？',  
        callback: function(result) {  
            if(result) {  
            	$.ajax({
        			type : "POST",
        			url : contextPathJs + "/module/delModule.do",
        			async : false,
        			data : {
        				id : id
        			},
        			dataType : "json",
        			success : function() {
        				window.location.reload();
        			}
        		});
            }
        },  
        title: "提示",  
        });   
}

/**
 * 点击查询按钮触发查询
 * 重新加载jqgrid
 */
function reloadBoardModule () {
	var moduleName = $("#moduleName").val();
	var moduleType = $("#moduleType").val();
	var boardType = $("#boardType").val();
	if("2" == moduleType){
		moduleType = "";
	}
	$.ajax({
		type : "POST",
		url : contextPathJs + "/module/getModuleManage.do",
		async : false,
		data : {
			name : moduleName,
			type : moduleType,
			boardId : boardType
		},
		dataType : "json",
		success : function(data) {
			$("#table_list_1").jqGrid('clearGridData');  //清空表格
			$("#table_list_1").jqGrid('setGridParam',{  // 重新加载数据
			      datatype:'local',
			      data : data,   //  data 是符合格式要求的需要重新加载的数据 
			      page:1
			}).trigger("reloadGrid");
		}
	});
	
}
