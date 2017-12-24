var addOrUpdate = "1"; // 新增1，编辑2
var genaralId = ""; // 全局ID
var createTime = "";
/*
 * $(document).ready(function() { initialJQGrid(); });
 */
/**
 * 界面初始化
 */
$(function() {
	function initialJQGrid() {
		var width = $('.jqGrid_wrapper').width();
		$.jgrid.defaults.styleUI = 'Bootstrap';
		$("#table_list_1").jqGrid(
				{
					url : basePath + "/board/getAllBoardInfo.do",
					datatype : "json",
					mtype : "POST",
					width : width,
					height : "auto",
					// styleUI:'Bootstrap',
					shrinkToFit : true,
					rowNum : 10,
					rowList : [ 10, 20, 30 ],
					jsonReader : {
						root : "dataList",
						page : "page",
						total : "total",
						records : "records",
						repeatitems : false,
						id : "0",
						userdata : "userdata"
					},
					// 单元格编辑
					cellEdit : true,
					cellurl : basePath + "/board/updateBoardName.do",
					beforeSubmitCell : function(rowid, cellname, value,iRow, iCol) {
						// 传递参数
						return {
							"name" : value,
							"id" : rowid
						};
					},
					afterSubmitCell : function(serverresponse, rowid, cellname, value, iRow, iCol){
						var response = (serverresponse.responseText).trim().replace('\"','');
						response=response.replace('\"','');
//						bootbox.alert({
//        					size : "small",
//        					title : "提示",
//        					message : response,
//        					closeButton : false,
//        					buttons : {
//        						ok : {
//        							label : "关闭",
//        							className : "btn-info"
//        						}
//        					}
//        				});
						alert(response);
						$("#table_list_1").trigger("reloadGrid");
						return [true,""] ;
					},
					colNames : [ '编号', '名称', '创建时间', '修改时间', '操作' ],
					colModel : [
							{
								name : 'id',
								index : 'id',
								width : 10,
								hidden : true,
								key : true
							},
							{
								name : 'name',
								index : 'name',
								editable : true,
								sortable:false
							},
							{
								name : 'createTime',
								index : 'createTime',
								sortable:false,
								formatter : function(value, grid, rows, state) {
									if (value == null) {
										return "";
									}
									var date = new Date(value).toLocaleString().replace(/:\d{1,2}$/, ' ');
									return date;
								}
							},
							{
								name : 'updateTime',
								index : 'updateTime',
								sortable:false,
								formatter : function(value, grid, rows, state) {
									if (value == null) {
										return "";
									}
									var date = new Date(value).toLocaleString().replace(/:\d{1,2}$/, ' ');
									return date;
								}
							},
							{
								name : 'content',
								index : 'content',
								sortable:false,
								formatter : function(value, grid, rows, state) {
									var df = rows.id;
									var ddd = "editModal('" + df + "')";
									var ccc = "delModal('" + df + "')";
									var bbb = "openModal('" + df + "')";
									var aaa = "openModalFile('" + df + "')";

									return '<input id="yu' + df + '" type="button" name="Submit" value="修改"  onclick="' + ddd + '"/>' + '&nbsp;&nbsp;'
											+ '<input id="yu' + df + '" type="button" name="Submit" value="删除" onclick="' + ccc + '"/>&nbsp;&nbsp;'
											+ '<input id="yu' + df + '" type="button" name="Submit" value="预览" onclick="' + bbb + '"/>&nbsp;&nbsp;'
											+ '<input id="yu' + df + '" type="button" name="Submit" value="预览文件" onclick="' + aaa + '"/>';
								}
							} ],
					loadComplete : function(data) {
					},
					onSelectRow : function(id) {
					},
					pager : '#pager_list_bottom',
					// pagerpos: 'left',
					viewrecords : true,
					hidegrid : false,
					loadonce : false,
					multiselect : false,
					multiboxonly : true
				});
		// 绑定Resize事件
		$(window).bind('resize', function() {
			var width = $('.jqGrid_wrapper').width();
			$('#table_list_1').setGridWidth(width);
		});
	}
	;
	initialJQGrid();
});

function searchBoardInfo(){
	$("#table_list_1").jqGrid("clearGridData");
	var name=$('#descriptionCond').val();
	$("#table_list_1").jqGrid("setGridParam", {
		postData : {
			"name" : name
		}
	});
	$("#table_list_1").trigger("reloadGrid");
}

function editModal(id) {
	// window.open(basePath+"/board/jsp/manage/boardEdit.jsp?id="+id);
	location.href = basePath + "/board/jsp/manage/boardEdit.jsp?id=" + id;
}

function openModal(id) {
	window.open(basePath + "/board/jsp/manage/boardShow.jsp?boardId=" + id, "_blank");
}

function openModalFile(id) {
	$.ajax({
		type : "POST",
		url : basePath + "/board/getBoardFilePath.do",
		data : {"id" : id},
		contentType : "application/x-www-form-urlencoded; charset=UTF-8",
		dataType : "json",
		success : function(filePath) {
            if(filePath!='null'){
            	window.open(basePath+"/"+filePath+"?boardId=" + id, "_blank");
            }else{
            	alert("大屏没有内容，请先编辑大屏！！！");
            }
		}
	});
	
}

function delModal(id) {	
	bootbox.confirm({  
        buttons: {  
            confirm: {  
                label: '确认',  
                //className: 'btn-myStyle'  
            },  
            cancel: {  
                label: '取消',  
                //className: 'btn-default'  
            }  
        },  
        message: '确认删除该看板么？',  
        callback: function(result) {  
            if(result) {  
            	$.ajax({
        			type : "POST",
        			url : basePath + "/board/deleteBoardInfoById.do",
        			data : {
        				"id" : id
        			},
        			contentType : "application/x-www-form-urlencoded; charset=UTF-8",
        			dataType : "json",
        			success : function(data) {
//        				bootbox.alert({
//        					size : "small",
//        					title : "提示",
//        					message : data,
//        					callback : function() {
//        						if (data == "删除成功！") {
//        							$('#mymodal-data').modal('hide');
//        							$("#table_list_1").trigger("reloadGrid");
//        						}
//        					},
//        					closeButton : false,
//        					buttons : {
//        						ok : {
//        							label : "关闭",
//        							className : "btn-info"
//        						}
//        					}
//        				});
        				alert(data);
        				if (data == "删除成功！") {
							$('#mymodal-data').modal('hide');
							$("#table_list_1").trigger("reloadGrid");
						}
        			}
        		});
            } else {    
            }  
        },  
        title: "提示",  
        });   
}

function addModal() {
	clearContent();
	addOrUpdate = "1";
	$('#mymodal-data').modal('show'); // 模态弹出框
}

function setBoardInfo(id) {
	$.ajax({
		type : "POST",
		url : basePath + "/board/getBoardInfoById.do",
		data : {
			"id" : id
		},
		contentType : "application/x-www-form-urlencoded; charset=UTF-8",
		dataType : "json",
		success : function(data) {
			if (data != null) {
				$('#name').val(data.name);
				$('#description').val(data.description);
				$('#mymodal-data').modal('show'); // 模态弹出框
				createTime = data.createTime;
				addOrUpdate = "2"; // 编辑标示
			}
		}
	});
}

function saveBoradFieldInfo() {
	var param = getFormData();
	if (param == "") {
		return;
	}
	$.ajax({
		type : "POST",
		url : basePath + "/board/saveBoardInfo.do",
		data : param,
		contentType : "application/x-www-form-urlencoded; charset=UTF-8",
		dataType : "json",
		success : function(data) {
//			bootbox.alert({
//				size : "small",
//				title : "提示",
//				message : data,
//				callback : function() {
//					if (data == "保存成功！") {
//						$('#mymodal-data').modal('hide');
//						$("#table_list_1").trigger("reloadGrid");
//					}
//				},
//				closeButton : false,
//				buttons : {
//					ok : {
//						label : "关闭",
//						className : "btn-info"
//					}
//				}
//			});
			alert(data);
			if (data == "保存成功！") {
				$('#mymodal-data').modal('hide');
				$("#table_list_1").trigger("reloadGrid");
			}
		}
	});
}
function colorChage() {
}

// 获取页面表单数据
function getFormData() {
	var name = $('#name').val();
	var description = $('#description').val();
	if (name == "") {
		alert("大屏名称不能为空！");
		return "";
	}

	if (addOrUpdate == "1") {
		return {
			"name" : name,
			"description" : description,
			"type" : "0",
			"addOrUpdate" : "1"
		};
	} else {
		return {
			"id" : parseInt(genaralId),
			"name" : name,
			"description" : description,
			"type" : "0",
			"addOrUpdate" : "2",
			"createTime" : createTime
		};
	}
}

function closeEvent() {
	$('#mymodal-data').modal('hide');
	clearContent();
}

function clearContent() {
	$('#name').val("");
	$('#description').val("");
}