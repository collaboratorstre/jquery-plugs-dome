
//5分钟实时报警台
 var realalarm = function(containerId,data){
 
        $("#"+containerId).empty();
          if(data){
            $.each(data,function(i,n){
               progressStr = "<tr><td>"+n.times+"</td><td>卡点.No."+(i+1)+" </td><td>"+n.statuk+"</td></tr>"
              $("#"+containerId).append($(progressStr));
            })
    }else{
      $("#"+containerId).html("<span>暂时没有数据</span>")
    }
 }

//本市浏览卡口排名TOP10
var fluxpai = function(containerId,data){
	$("#"+containerId).empty();
	if(data){
          $.each(data,function(i,n){
          	 var progressStr = "<div class='progress-container'><div class='progress-title'>卡口No."+(i+1)+"</div>"
                +"<div class='progress-content'>"
                + '<div class="legalRate" style="width:'+ (n.value/574742)*100 +'%;';
            progressStr+='"><div class="shuzi" style="color: white;">'+n.value+'</div></div></div>'
                +'<div class="progress-amount">'+'</div></div>';
          	$("#"+containerId).append($(progressStr));
          })
	}else{
		$("#"+containerId).html("<span>暂时没有数据</span>")
	}
}
//各辖区实时流量分布情况
$.get('json/菏泽市.json', function (heZe) {
        echarts.registerMap('菏泽', heZe);
        var chart = echarts.init(document.getElementById('flux_distra'));
        
        option = {
            title: {
                text: '各辖区实时流量分布情况',
                x:'center',
                textStyle: {
                  color: "#2c83e0",
                  fontSize: 13 
                }
            },
            tooltip: {
                    position: ['40%','50%'],
                    trigger: 'item',
                    // formatter: function(){
                    //     return '每年小型车车辆总数<br><span>'+234523+'</span>辆';
                    formatter: '今日{b0}机动车通行总量<br/><span style="color: yellow;">857601</span>辆'
                    // }
                },
            // dataRange:{
            // 	min:0,
            // 	max:500,
            // 	text:['高','低'],
            // 	realtime:true,
            // 	calculable:true,
            // 	color:['orangered','yellow','green']
            // },
            series:[
            	{
            		name:'机动车总量分布图',
            		type:'map',
            		map:'菏泽',
                itemStyle: {
                  normal:{
                 
                    areaColor: '#0b0c45',
                    borderColor: '#2b6cc0'
                  },
                  emphasis:{
                     color: 'blue',
                    areaColor: 'refreshData'
                  }
                },
            		mapLocation:{
            			y:60
            		},
            		data:[


            		]
            	}
            ],
            
        };
        chart.setOption(option);
});

//本市流量随时间变化趋势
echarts.init(document.getElementById("times_trend")).setOption({
     title: {
                text: '本市流量随时间变化趋势',
                x:'center',
                textStyle: {
                  color: "#2c83e0",
                  fontSize: 13 
                }
            },
      legend: {
                 data: ['由南向北','由北向南','由东向西','由西向东'],
                 top: '17%',
                 textStyle: {
                  color: 'white'
                 },
                 // data: [
                 //    {
                 //      name: '由南向北',
                 //      icon: 'rect'
                 //    }
                 // ]
            },
      tooltip : {
        trigger: 'axis',
        // formatter: '今日{b0}:00本市拥堵延迟指数为<br/> <span style="color:#ffb401;font-size: 20px;margin-left: 90px;">{c0}</span>',
        axisPointer: {
            type: 'line',
            label: {
                backgroundColor: 'orange'
            }
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis : [
        {
            type : 'category',
            boundaryGap : false,
            axisTick: {
                        show: false
                    },
             axisLabel: {
                    interval: 0,
                    
                },
              splitLine: {
                show: true,
                lineStyle: {
                       color: '#0e1450'
                }
              },
              axisLine: {
                onZero: false,
                lineStyle: {
                    color: '#98cdff'
                }
            },
            data :[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]
        }
    ],
    yAxis : [
        {
            type : 'value',
            symbol: 'none',
            axisTick: {
              show: false
            },
            axisLabel:{
              show: false
            },
            splitLine: {
              lineStyle: {
                color: '#0e1450'
              }
            },
            axisLine: {
              show: true,
              lineStyle:{
                color: '#16377e'
              }
            }
        }
    ],
    series : [
        {
            name:'由南向北',
            type:'line',
            symbol: 'none',
            stack: '总量',
            label: {
                normal: {
                    show: false,
                    position: 'top'
                }
            },
             itemStyle : {  
               normal : {  
                           lineStyle:{  
                             color:'#fef200' 
                         },
              color: new echarts.graphic.LinearGradient(
                             0, 0, 0, 1,
                [
                    {offset: 0, color: '#fef200'},
                    {offset: 0.3, color: '#fef200'},
                    {offset: 1, color: '#0f0f43'}
                ]
            )
                                }  
                            },  
            areaStyle: {normal: {}},
            data:[0,0,0,0,0,1254444,1263423,1274475,1282342,1295456,1357601,1359456,1263453,1257601,11234,51234,12343,12345,12342,1234125,12346,1234127,12344,123421]
        },
         {
            name:'由北向南',
            type:'line',
            symbol: 'none',
            stack: '总量',
            label: {
                normal: {
                    show: false,
                    position: 'top'
                }
            },
             itemStyle : {  
               normal : {  
                           lineStyle:{  
                             color:'#ff00ff' 
                         },
              color: new echarts.graphic.LinearGradient(
                             0, 0, 0, 1,
                [
                    {offset: 0, color: '#ff00ff'},
                    {offset: 0.3, color: '#ff00ff'},
                    {offset: 1, color: '#0f0f43'}
                ]
            )
                                }  
                            },  
            areaStyle: {normal: {}},
            data:[0,0,0,0,0,1233,1234,12344,123411,21234,231234,221234,31234,1257601,142134,51234,31234,51325,21234,51234,61234,71234,212354,11234]
        },
         {
            name:'由东向西',
            type:'line',
            symbol: 'none',
            stack: '总量',
            label: {
                normal: {
                    show: false,
                    position: 'top'
                }
            },
             itemStyle : {  
               normal : {  
                           lineStyle:{  
                             color:'#00a0ea' 
                         },
              color: new echarts.graphic.LinearGradient(
                             0, 0, 0, 1,
                [
                    {offset: 0, color: '#00a0ea'},
                    {offset: 0.3, color: '#00a0ea'},
                    {offset: 1, color: '#0f0f43'}
                ]
            )
                                }  
                            },  
            areaStyle: {normal: {}},
            data:[0,0,0,0,0,3141,12341,21234,452345,12343,123412,212134,31234,1257601,15432,51234,31234,51234,21234,534523,61234,72345,21234,112342]
        },
         {
            name:'由西向东',
            type:'line',
            symbol: 'none',
            stack: '总量',
            label: {
                normal: {
                    show: false,
                    position: 'top'
                }
            },
             itemStyle : {  
               normal : {  
                           lineStyle:{  
                             color:'#00ff00' 
                         },
              color: new echarts.graphic.LinearGradient(
                             0, 0, 0, 1,
                [
                    {offset: 0, color: '#00ff00'},
                    {offset: 0.3, color: '#00ff00'},
                    {offset: 1, color: '#0f0f43'}
                ]
            )
                                }  
                            },  
            areaStyle: {normal: {}},
            data:[0,0,0,0,0,123213,34234,12313,23453,245345,45322,23451,12341,1257601,12341,12341,12341,43251,1234,12342,1234,12341,12341,32453]
        }
    ]
 });

//今日卡点流量排行TOP10
 var todayflux = function(containerId,data){
 
        $("#"+containerId).empty();
          if(data){
            $.each(data,function(i,n){
               progressStr = "<tr><td>"+(i+1)+"</td><td>卡点No."+(i+1)+"</td><td>"+n.direc+"</td><td>"+n.role+"</td><td><span>"+n.totel+"</span>辆</td></tr>"
              $("#"+containerId).append($(progressStr));
            })
    }else{
      $("#"+containerId).html("<span>暂时没有数据</span>")
    }
 }

//本市车流量随辖区分布
 var xiaquflow = function(containerId,data){
  $("#"+containerId).empty();
  // console.log(data);
  if(data){
          $.each(data,function(i,n){
             var progressStr = "<div class='progress-container'><div class='progress-title'>"+n.name+"</div>"
                +"<div class='progress-content'>"
                + '<div class="legalRate" style="width:'+ (n.value/1000000)*100 +'%;';
            progressStr+='"><div class="xianqu" style="color: white;">'+n.value+'</div></div></div>'
                +'<div class="progress-amount">'+'</div></div>';
            $("#"+containerId).append($(progressStr));
          })
  }else{
    $("#"+containerId).html("<span>暂时没有数据</span>")
  }
}

//数据的统一处理
 var refreshData = function(){
    $.get("json/tongxingye.json",function(data){
        
         realalarm('time_content',data.realpolice);
         fluxpai('flow_content',data.kopm);
         todayflux('flux_pmtab',data.zlph);
         xiaquflow('xiaqu_flux',data.zlxqfb)

    	// traveltime('hour_content',data.lxpm);
    	// congestindex('exponent_content',data.ydzs);
     //    delayindex("index_content",data.yczspm)
    	    });
};
console.log($);

$(document).ready(function(){
    refreshData();
    // setInterval(function(){
    //     refreshData();
    // },30*1000);
});