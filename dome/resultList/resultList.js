/**
 * Created by Administrator on 2018/1/15.
 */

//二次筛选
$(".inspect_sele").click(function(){
    $(".inspect_nosele").css('visibility','visible');
    $(".inspect_sele").css('visibility','hidden');
})
$(".reject_sele").click(function(){
    $(".reject_nosele").css('visibility','visible');
    $(".reject_sele").css('visibility','hidden');
})
$(".handle_sele").click(function(){
    $(".handle_nosele").css('visibility','visible');
    $(".handle_sele").css('visibility','hidden');
})
$(".inspect_nosele").click(function(){
    $(".inspect_sele").css('visibility','visible');
    $(".inspect_nosele").css('visibility','hidden');
})
$(".reject_nosele").click(function(){
    $(".reject_sele").css('visibility','visible');
    $(".reject_nosele").css('visibility','hidden');
})
$(".handle_nosele").click(function(){
    $(".handle_sele").css('visibility','visible');
    $(".handle_nosele").css('visibility','hidden');
})

//点击切换页面
$(".movetive_car").click(function(){
  $(".info_top").children().removeClass('select_color');
    $(".movetive_car").addClass('select_color');

})
$(".dirver_car").click(function(){
    $(".info_top").children().removeClass('select_color');
    $(".dirver_car").addClass('select_color');

    $(".info_car").hide();
    $(".dirvers_pep").show();
})
$(".company").click(function(){
    $(".info_top").children().removeClass('select_color');
    $(".company").addClass('select_color');
})
$(".roads").click(function(){
    $(".info_top").children().removeClass('select_color');
    $(".roads").addClass('select_color');
})
$(".affair_shi").click(function(){
    $(".info_top").children().removeClass('select_color');
    $(".affair_shi").addClass('select_color');
})
