$("#time_chuli").focus(function(){
	$(".time_select").css("display","block");

})
// $("#time_chuli").blur(function(){
// 	$(".time_select").css("display","none");
	
// })
var chk_value =[]; //选中时间点
var s=''; //显示在页面的时间点
var falgs = false; //是否为周末的标识
//取消
$("#time_cancel").click(function(){
	$(".time_select").css("display","none");
	$(".time_select input").each(function(){
		$(this).attr("checked", false); 
	})
	$("#time_chuli").val('');
	chk_value = [];
	
})

// 确定
$("#time_sure").click(function(){
	$(".time_select").css("display","none");
	$(".time_select input:checked").each(function(){
		chk_value.push($(this).val()); 
	})
	// var obj = $(".time_select input:checked");
	// for(var i=0; i<obj.length; i++){ 
	// 	if(obj[i].checked) s+=obj[i].value+','; //如果选中，将value添加到变量s中 
	// 	} 
	chk_value =  $.unique(chk_value); //数组去重
	s = chk_value.join();
	$("#time_chuli").val(s);
	s = "";
})

//搜索
function search(){
	var data;
	
	if($("#weeks:checked") == true){
		falgs = true;
	}
	var time1 = $('#time1').val();
	var time2 = $('#time2').val();
	var numbers = $("#nums").val();
	data = {
		time1:time1,
		time2:time2,
		flag:falgs,
		arr1:chk_value,
		numbs:numbers

	}
	console.log(data);
}
