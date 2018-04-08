/**
 * Created by Administrator on 2018/1/15.
 */

$("#carInfoModel .info_content p>a").click(function(){
    window.open("webpage/carGear/carGear.jsp?");
})

//二次筛选
// $(".inspect_sele").click(function(){
//     $(".inspect_nosele").css('visibility','visible');
//     $(".inspect_sele").css('visibility','hidden');
// })
// $(".reject_sele").click(function(){
//     $(".reject_nosele").css('visibility','visible');
//     $(".reject_sele").css('visibility','hidden');
// })
// $(".handle_sele").click(function(){
//     $(".handle_nosele").css('visibility','visible');
//     $(".handle_sele").css('visibility','hidden');
// })
// $(".inspect_nosele").click(function(){
//     $(".inspect_sele").css('visibility','visible');
//     $(".inspect_nosele").css('visibility','hidden');
// })
// $(".reject_nosele").click(function(){
//     $(".reject_sele").css('visibility','visible');
//     $(".reject_nosele").css('visibility','hidden');
// })
// $(".handle_nosele").click(function(){
//     $(".handle_sele").css('visibility','visible');
//     $(".handle_nosele").css('visibility','hidden');
// })
$

//点击切换页面
$(".movetive_car").click(function(){
  $(".info_top").children().removeClass('select_color');
    $(".movetive_car").addClass('select_color');

    $(".info_car").show();
    $(".dirvers_pep").hide();
    $(".info_company").hide();


})
$(".dirver_car").click(function(){
    $(".info_top").children().removeClass('select_color');
    $(".dirver_car").addClass('select_color');

    $(".info_car").hide();
    $(".dirvers_pep").show();
    $(".info_company").hide();

})
$(".company").click(function(){
    $(".info_top").children().removeClass('select_color');
    $(".company").addClass('select_color');

    $(".info_car").hide();
    $(".dirvers_pep").hide();
    $(".info_company").show();
})
$(".roads").click(function(){
    $(".info_top").children().removeClass('select_color');
    $(".roads").addClass('select_color');
})
$(".affair_shi").click(function(){
    $(".info_top").children().removeClass('select_color');
    $(".affair_shi").addClass('select_color');
})

$(document).ready(function(){
  $(".main_content #file_search").trigger("click");;
});

//获取首页跳过来的值
//var loc = location.href;
//var n1 = loc.length;//地址的总长度
//var n2 = loc.indexOf("?");//取得=号的位置
//var id = decodeURI(loc.substr(n2+1, n1-n2));//从=号后面的内容
//console.log(id);
//$(".record_search>input").val(id);

$(".main_content #file_search").click(function(){mainsearchcar(1,5)});

function mainsearchcar(currPage,pageSize){
	var params = {};
	params.info = $("#info").val();
	params.pageNumber = currPage;
	params.pageSize = pageSize;
	$.ajax({
        type: "POST",
        url: "./carGear/findFRVehicle",
        cache: false,	//禁用缓存
        async: false,
        data: {param: JSON.stringify(params)},	//传入已封装的参数
        dataType: "json",
        success: function (result) {
        	console.log(result);
            if (result.info != null) {
            	alert(result.info);
            }else{
            	$(".info_car #car_total").text(result.total);
            	$("#carinfo").empty();
            	$("#carInfoModel span").each(function(){
                   if(this.id){$(this).html("")}
            	});
            	$("#carInfoModel .weifa").empty();
            	$("#carInfoModel .result_car").empty();
            	$(result.datalist).each(function(i,n){
            		var model = $("#carInfoModel");
            		if(i>0){
            			model = model.clone();
            		}
            		model.find(".weifa").empty();
	            	model.find(".result_car").empty();
	            	model.find("span").each(function(){
	                    $(this).html(n[this.id]);
	            	});
	            	$(n.tags).each(function(){
	            		var html="<div class=\"car_wei\"><p>"+this+"</p></div>";
	            		model.find(".weifa").append(html);
	            	});
	            	
	            	$(n.wfxx).each(function(){
	            		model.find(".result_car").append(this+"<br/>");
	            	});
	            	model.find(".car_img img").attr("src","./image/imagestream?imgurl="+n.tp1);
	            	if(i>0){
	            		$("#carinfo").append(model.html());
	            	}
            	});
            }
            var totalPage = Math.ceil(result.total/pageSize);
        	$("#pagination_3").whjPaging("setPage", result.pageNumber,totalPage );
        }
    });
}
//分页
$("#pagination_3").whjPaging({
    pageSizeOpt: [
        {'value': 5, 'text': '5条/页', 'selected': true},
        {'value': 10, 'text': '10条/页'},
        {'value': 15, 'text': '15条/页'},
        {'value': 20, 'text': '20条/页'}
    ],
    totalPage: 1,
    showPageNum: 5,
    firstPage: '首页',
    previousPage: '上一页',
    nextPage: '下一页',
    lastPage: '尾页',
    skip: '跳至',
    confirm: '确认',
    refresh: '刷新',
    totalPageText: '共{}页',
    isShowFL: true,
    isShowPageSizeOpt: true,
    isShowSkip: true,
    isShowRefresh: true,
    isShowTotalPage: true,
    isResetPage: false,
    callBack: function (currPage, pageSize) {
        console.log('currPage:' + currPage + ' pageSize:' + pageSize);
        mainsearchcar(currPage, pageSize);
    }
});
$("#pagination_2").whjPaging({
    pageSizeOpt: [
        {'value': 5, 'text': '5条/页', 'selected': true},
        {'value': 10, 'text': '10条/页'},
        {'value': 15, 'text': '15条/页'},
        {'value': 20, 'text': '20条/页'}
    ],
    totalPage: 18,
    showPageNum: 5,
    firstPage: '首页',
    previousPage: '上一页',
    nextPage: '下一页',
    lastPage: '尾页',
    skip: '跳至',
    confirm: '确认',
    refresh: '刷新',
    totalPageText: '共{}页',
    isShowFL: true,
    isShowPageSizeOpt: true,
    isShowSkip: true,
    isShowRefresh: true,
    isShowTotalPage: true,
    isResetPage: false,
    callBack: function (currPage, pageSize) {
        console.log('currPage:' + currPage + '     pageSize:' + pageSize);
    }
});
$("#pagination_4").whjPaging({
    pageSizeOpt: [
        {'value': 5, 'text': '5条/页', 'selected': true},
        {'value': 10, 'text': '10条/页'},
        {'value': 15, 'text': '15条/页'},
        {'value': 20, 'text': '20条/页'}
    ],
    totalPage: 18,
    showPageNum: 5,
    firstPage: '首页',
    previousPage: '上一页',
    nextPage: '下一页',
    lastPage: '尾页',
    skip: '跳至',
    confirm: '确认',
    refresh: '刷新',
    totalPageText: '共{}页',
    isShowFL: true,
    isShowPageSizeOpt: true,
    isShowSkip: true,
    isShowRefresh: true,
    isShowTotalPage: true,
    isResetPage: false,
    callBack: function (currPage, pageSize) {
        console.log('currPage:' + currPage + '     pageSize:' + pageSize);
    }
});