/**
 * Created by Administrator on 2018/1/15.
 */
$(".content_log").on("click",".log_info li",function(){
    $(this).toggleClass("log_color");
    $(this).next().toggle();

})

$(".content_title").on("click","li",function(){

    if($(this).text() == "车主信息"){
        $(".content_log .log_info:first-of-type li").toggleClass("log_color");
        $(".content_log .log_info:first-of-type div").toggle();
    }else if($(this).text() == "登录信息"){
        $(".content_log .log_info:nth-of-type(2) li").toggleClass("log_color");
        $(".content_log .log_info:nth-of-type(2) div").toggle();
    }else if($(this).text() == "物理特征/外观信息"){
        $(".content_log .log_info:nth-of-type(3) li").toggleClass("log_color");
        $(".content_log .log_info:nth-of-type(3) div").toggle();
    }else if($(this).text() == "行驶轨迹信息"){
        $(".content_log .log_info:nth-of-type(4) li").toggleClass("log_color");
        $(".content_log .log_info:nth-of-type(4) div").toggle();
    }else if($(this).text() == "违法信息"){
        $(".content_log .log_info:nth-of-type(5) li").toggleClass("log_color");
        $(".content_log .log_info:nth-of-type(5) div").toggle();
    }else if($(this).text() == "事故信息"){
        $(".content_log .log_info:nth-of-type(6) li").toggleClass("log_color");
        $(".content_log .log_info:nth-of-type(6) div").toggle();
    }else if($(this).text() == "业务办理信息"){
        $(".content_log .log_info:last-of-type li").toggleClass("log_color");
        $(".content_log .log_info:last-of-type div").toggle();
    }
})



