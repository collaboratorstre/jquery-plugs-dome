var trafficFactor = {};
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
	$.jgrid.defaults.styleUI = 'Bootstrap';
	$("#table_list_1").jqGrid(
			{
				url : contextPathJs + "/module/getTrafficFactor.do",
				mtype : "GET",
				width : width,
				height : "auto",
				datatype : "json",
				page : 1,
				rowNum : 10,// 设置每一个grid的页做多显示多少条记录。
				rowList : [ 10, 20, 30 ],
				shrinkToFit:true,
				autowidth:true,
				colModel : [
						{
							label : 'id',
							name : 'id',
							key : true,
							width:120
							//hidden : true
						},
						{
							label : '标题',
							name : 'title',
							width:150
						}, 
						{
							label : '内容',
							name : 'content',
							width:150
						}, 
						{
							label : '事件分类',
							name : 'type',
							width:50,
							formatter : function(value) {
								switch (value) {
								case "1":
									return "大型活动";
								case "2":
									return "交通管制";
								case "3":
									return "施工占道";
								case "9":
									return "其他";
								default:
									return "";
								}
							}
						},
						{
							label : '数据来源',
							name : 'dataSource',
							width:50,
							formatter : function(value) {
								switch (value) {
								case "0":
									return "人工录入";
								case "1":
									return "互联网抓取";
								default:
									return "";
								}
							}
						},
						{
							label : '录入时间',
							name : 'dateTime',
							width:70,
							formatter : function(value) {
								if (value == null) {
									return "";
								}
								return format(value, 'yyyy-MM-dd HH:mm');
							}
						},
						{
							label : '生效时间',
							name : 'beginDate',
							width:70,
							formatter : function(value) {
								if (value == null) {
									return "";
								}
								return format(value, 'yyyy-MM-dd HH:mm');
							}
						},
						{
							label : '失效时间',
							name : 'expireDay',
							width:70,
							formatter : function(value) {
								if (value == null) {
									return "";
								}
								return format(value, 'yyyy-MM-dd HH:mm');
							}
						},
						{
							label : '操作',
							name : 'sy',
							width:80,
							formatter : function(value, grid, rows, state) {
								var df = rows.id;
								var ddd = "trafficFactor.editTrafficFactor('" + df + "')";
								var ccc = "trafficFactor.delTrafficFactor('" + df + "')";
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

function addTrafficFactor() {
	$("#trafficFactorModalAdd").modal();
}

function trafficFactorSave() {
	var title = $("#titleId").val();
	var content = $("#contentsId").val();
	var dataSource = $("#dataSourceId").val();
	var type = $("#typeId").val();
	var beginDate = $("#beginDayId").val();
	var expireDay = $("#expireDayId").val();
	if (title == "") {
		alert("标题不能为空!");
		return;
	}
	if (beginDate == "" || expireDay == "") {
		alert("有效时间和失效时间不能为空!");
		return;
	}
	var time1 = new Date(beginDate).getTime();
	var time2 = new Date(expireDay).getTime();
	if (time1>time2) {
		alert("生效日期要小于失效日期!");
		return;
	}
	$.ajax({
		type : "POST",
		url : contextPathJs + "/module/addTrafficFactor.do",
		async : false,
		data : {
			title : title,
			content : content,
			dataSource : dataSource,
			type : type,
			beginDate : beginDate,
			expireDay : expireDay
		},
		dataType : "json",
		success : function() {
			window.location.reload();
		}
	});
}

trafficFactor.editTrafficFactor = function (id) {
	$.ajax({
		type : "POST",
		url : contextPathJs + "/module/editTrafficFactor.do",
		async : false,
		data : {
			id : id
		},
		dataType : "json",
		success : function(data) {
			$("#editId").val(data.id);
			$("#titleEdit").val(data.title);
			$("#contentsEdit").val(data.content);
			$("#dataSourceEdit").val(data.dataSource);
			$("#typeEdit").val(data.type);
			$("#beginDayEdit").val(format(data.beginDate, 'yyyy-MM-dd HH:mm'));
			$("#expireDayEidt").val(format(data.expireDay, 'yyyy-MM-dd HH:mm'));
			$("#trafficFactorModalEdit").modal();
		}
	});
}

function trafficFactorEditSave() {
	var id = $("#editId").val();
	var title = $("#titleEdit").val();
	var content = $("#contentsEdit").val();
	var dataSource = $("#dataSourceEdit").val();
	var type = $("#typeEdit").val();
	var beginDate = $("#beginDayEdit").val();
	alert(beginDate);
	var expireDay = $("#expireDayEidt").val();
	if (title == "") {
		alert("标题不能为空!");
		return;
	}
	if (beginDate == "" || expireDay == "") {
		alert("有效时间和失效时间不能为空!");
		return;
	}
	var time1 = new Date(beginDate).getTime();
	var time2 = new Date(expireDay).getTime();
	if (time1>time2) {
		alert("生效日期要小于失效日期!");
		return;
	}
	$.ajax({
		type : "POST",
		url : contextPathJs + "/module/trafficFactorEditSave.do",
		async : false,
		data : {
			id : id,
			title : title,
			content : content,
			dataSource : dataSource,
			type : type,
			beginDate : beginDate,
			expireDay : expireDay
		},
		dataType : "json",
		success : function() {
			window.location.reload();
		}
	});
}

trafficFactor.delTrafficFactor = function (id) {
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
        			url : contextPathJs + "/module/delTrafficFactor.do",
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

function reloadTrafficFactor() {
	var dataSource = $("#dataSourceType").val();
	if("2" == dataSource){
		dataSource = "";
	}
	$.ajax({
		type : "POST",
		url : contextPathJs + "/module/getTrafficFactor.do",
		async : false,
		data : {
			dataSource : dataSource
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
