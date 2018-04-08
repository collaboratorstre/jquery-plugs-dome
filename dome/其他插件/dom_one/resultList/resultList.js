/**
 * Created by Administrator on 2018/1/15.
 */

var data=[
    {tp1: contextPath + "/ehlib/img/small_car.png", hphm: "冀A12345", hpzlms: "小型汽车", hpzl: "2",
        cllx: "小型轿车", jdclzt: "正常", syxz:"非营运", jdcsyr: "张三", lxfs: "13333333333",
        wfxx: ["2017年9月1日扣6分；超速违法；张三；扣6分", "2017年9月1日扣6分；超速违法；张三；扣6分", "2017年9月1日扣6分；超速违法；张三；扣6分"],
        tags: ["多次违法未处理", "逾期未年检","逾期未报废"]},
    {tp1: contextPath + "/ehlib/img/small_car.png", hphm: "冀A12345", hpzlms: "小型汽车", hpzl: "2",
        cllx: "小型轿车", jdclzt: "正常", syxz:"非营运", jdcsyr: "张三", lxfs: "13333333333",
        wfxx: ["2017年9月1日扣6分；超速违法；张三；扣6分", "2017年9月1日扣6分；超速违法；张三；扣6分", "2017年9月1日扣6分；超速违法；张三；扣6分"],
        tags: ["多次违法未处理", "逾期未年检","逾期未报废"]}
];

$(document).ready(function(){
    // 绑定事件
    initEvents();

    // 初始化机动车结果列表
    initVehicleResultList();

    //$("#file_search").trigger("click");
});

//隐藏和显示更多
$(".bian_huan").click(function(){
    console.log($(this).text());
    if($(this).text() == '更多标签'){
        $(this).text('隐藏');
        $("#showdiv").css("display","block");
    }else if($(this).text() == '隐藏'){
        $(this).text('更多标签');
        $("#showdiv").css("display","none");
    }
})

//获取首页跳过来的值
//var loc = location.href;
//var n1 = loc.length;//地址的总长度
//var n2 = loc.indexOf("?");//取得=号的位置
//var id = decodeURI(loc.substr(n2+1, n1-n2));//从=号后面的内容
//console.log(id);
//$(".record_search>input").val(id);

$("#file_search").click(function(){
    //mainsearchcar(1,5);
    refreshVehicleData(data);
});

// 更多标签
$("#btn_more").click(function () {
    var text = $(this).html();
    if(text == "更多标签"){
        $(this).html("隐藏");
        $("#div_label_selecting").css("height", "auto");
    }
    else{
        $(this).html("更多标签");
        $("#div_label_selecting").css("height", "50px");
    }
});

// 初始化绑定事件
var initEvents = function () {
    // 点击待选标签
    $("#selecting_labels .label-container").on("click", "label", function () {
        // 将标签添加到已选框中
        var label = $(this).clone();
        label.removeClass("label-normal").addClass("label-primary").addClass("deletable");
        label.append("<a class='fa fa-times'></a>");
        $("#selected_labels .label-container").append(label);

        // 隐藏当前标签
        $(this).hide();
    });

    // 删除已选标签
    $("#selected_labels .label-container").on("click", "a", function () {
        // 显示待选标签
        var labelId = $(this).parent().attr("labelId");
        $("#selecting_labels .label-container label[labelId=" + labelId + "]").show();

        // 删除已选标签
        $(this).parent().remove();
    });
};

// 机动车结果列表
var vehicleResultList;

// 初始化机动车结果列表
var initVehicleResultList = function () {
    vehicleResultList = $("#result_vehicle .result-data").FileResultList({
        img: {field: "tp1", width: "190px", height: "115px"},
        headField: "hphm",
        showFields: [
            {head: "号牌种类", field: "hpzlms"},
            {head: "车辆类型", field: "cllx"},
            {head: "机动车辆状态", field: "jdclzt"},
            {head: "使用性质", field: "syxz"},
            {head: "机动车所有人", field: "jdcsyr"},
            {head: "联系方式", field: "lxfs"}
        ],
        textField: "wfxx",
        labelField: "tags",
        detailClicked: function (item, data, index) {
            window.open("/web-rsap/carGear?hphm=" + data.hphm + "&zl=" + data.hpzl);
        }
    });
};

// 刷新机动车数据
var refreshVehicleData = function (data) {
    vehicleResultList.RefreshData(data);
};


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

function showcargear(_this){
	var hphm = $(_this).parent().parent().find("span#hphm").text();
	var hpzl = parseInt($(_this).parent().parent().find("span#hpzl").text());
	document.location.href="/web-rsap/carGear?hphm="+hphm+"&zl="+hpzl;
}
