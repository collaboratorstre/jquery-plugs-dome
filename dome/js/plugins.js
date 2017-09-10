function show_num(n){ 
    var n = n.toString()
    var it = $(".t_num i"); 
    var len = String(n).length;
    var str1 = '';
    for(var i=0;i<len;i++){ 
        if(it.length<=i){ 
            $(".t_num").append("<i></i>");
        } 
        var num=String(n).charAt(i); 
        var y = -parseInt(num)*30; //y轴位置  
         // var y = -parseInt(num)*15.5; //y轴位置  12px
        var obj = $(".t_num i").eq(i); 
        obj.animate({ //滚动动画 
            backgroundPosition :'(0 '+String(y)+'px)'  
            }, 'slow','swing',function(){} 
        ); 
    } 
    // $(".t_num").append(n)
} 


function getdata(){
    show_num(Date.parse(new Date()));
    // console.log(Date.parse(new Date()));
}

// function getdata(){ 
//     $.ajax({ 
//         url: 'json/tongxingye.json', 
//         type: 'GET', 
//         dataType: "json", 
//         cache: false, 
//         timeout: 10000, 
//         error: function(){}, 
//         success: function(data){ 
//             // console.log(data.count)
//             show_num(data.count)
//         } 
//        }); 
// } 

$(function(){ 
    getdata(); 
    setInterval('getdata()', 3000);//每隔3秒执行一次 
}); 
 