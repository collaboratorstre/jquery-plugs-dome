function show_num(n){ 
    // console.log(n);
    var n = n.toString()
    // for(var j=0,len=n.length; j<len; j++){
    //     console.log(n[j]);
    // }
    var it = $(".t_num i"); 
    var len = String(n).length;
    // console.log(n);
    // console.log(typeof(n));
    var str1 = '';
    for(var i=0;i<len;i++){ 
        if(it.length<=i){ 
            $(".t_num").append("<i>" + n[i] + "</i>");
        } 
        var num=String(n).charAt(i); 
        var y = -parseInt(num)*30; //y轴位置  
        var obj = $(".t_num i").eq(i); 
        obj.animate({ //滚动动画 
            backgroundPosition :'(0 '+String(y)+'px)'  
            }, 'slow','swing',function(){} 
        ); 
    } 
    // $(".t_num").append(n)
} 
function getdata(){ 
    $.ajax({ 
        url: 'json/tongxingye.json', 
        type: 'GET', 
        dataType: "json", 
        cache: false, 
        timeout: 10000, 
        error: function(){}, 
        success: function(data){ 
            // console.log(data.count)
            show_num(data.count)
        } 
       }); 
} 

$(function(){ 
    getdata(); 
    setInterval('getdata()', 3000);//每隔3秒执行一次 
}); 
 // getdata(); 