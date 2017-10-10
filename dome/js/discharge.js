
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
var geoCoordMap = {
    "牡丹区":[115.4231225000,35.2575260046],
    "鄄城县":[115.5166712692,35.5691801963],
    "曹县":[115.5486273308,34.8316376196],
    "定陶区":[115.5712688711,35.0799378114],
    "单县":[116.0938209482,34.8001368920],
    "郓城县":[115.9500457019,35.6060749361],
    "巨野县":[116.1015347225,35.4020821605],
    "东明县":[115.0965807297,35.2958747106],
    "成武县":[115.8961774224,34.9583706200]
}
var convertData = function (data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
        var geoCoord = geoCoordMap[data[i].name];
        if (geoCoord) {
            res.push(geoCoord.concat(data[i].value));
        }
    }
    // console.log(res);
    return res;
};

$.get("json/tongxingye.json",function(data1){
        console.log(data1);
    
$.get('json/hezeshi.json', function (heZe) {
    echarts.registerMap('菏泽', heZe);
    var chart = echarts.init(document.getElementById('flux_distra'));
    var arr1 = [];

    $.each(data1.regionjam,function(i,n){
         var obj = {};
         obj.name = n.regionname;
         obj.value = n.jamindex;
         arr1.push(obj)
       
        // arr1.push('{name:"' + n.regionname + '",value:' + n.jamindex + '}');
    })
    console.log(arr1)
     
    // arr1[0].replace(/\"/g, );
     console.log(arr1);

    option = {
        title: {
            text: '本市各辖区拥堵延迟指数',
            x:'center',
            textStyle: {
                color: "#2c83e0",
                fontSize: 13,
                fontFamily: 'Microsoft YaHei'
            },

        },
        tooltip: {
            show: false,
            trigger: 'item',
            textStyle:{
                fontFamily: 'Microsoft YaHei'
            }
        },

        visualMap: {
            type: 'continuous',
            min: 0,
            max: 5,
            text: ['严重拥堵','畅通'],
            // inRange: {
            //     color: ['#d94e5d','#eac736','#50a3ba'].reverse()
            // },
            textStyle: {
                color: '#fff'
            },

            itemWidth: 11,
            itemHeight: 117,
            realtime: false,
            // calculable: true,
            color: ['#fe150b','#ffee01','#35ff00']
        },
               geo: [
            {
                map: '菏泽',
                label: {
                    emphasis: {
                        show: false
                    }
                },
                roam: false,
                itemStyle: {
                    normal: {
                        areaColor: '#0b0c45',
                        borderColor: '#2b6cbe',
                        borderWidth:3,
                        shadowColor: 'rgba(45,110,192,2)',
                        shadowBlur: 40
                    },
                    emphasis: {
                        areaColor: '#0b0c45'
                    }
                }
            },
            {
                map: '菏泽',
                label: {
                    emphasis: {
                        show: false
                    }
                },
                roam: false,
                itemStyle: {
                    normal: {
                        areaColor: '#0b0c45',
                        borderColor: '#2b6cbe',
                        borderWidth:1,
                        // shadowColor: 'rgba(45,110,192,2)',
                        // shadowBlur: 30,
                    },
                    emphasis: {
                        areaColor: '#0b0c45'
                    }
                }
            }
        ],
        series: [
            {
                name: '菏泽',
                type: 'heatmap',
                textStyle: {
                    color: 'white',
                    fontFamily: 'Microsoft YaHei'

                },
                zlevel: 1,
                coordinateSystem: 'geo',
                data: convertData(arr1)
            },
              {
               name:'机动车总量分布图',
               type:'map',
               map:'菏泽',
                zlevel: 3,
                label: {
                  normal:{
                    show: false
                  },
                  emphasis:{
                    show: true,
                    
                  }
                },
                itemStyle: {
                  normal:{
                 
                    areaColor: 'transparent',
                    borderColor: 'transparent'
                  },
                 
                  emphasis:{
                    areaColor: '#00a2ff',
                    borderColor: 'red',
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
    chart.on('mouseover',function(params){
      // console.log(params);
      console.log(params.name);
       $.get("json/tongxingye.json",function(data){
        for(var i=0;i<data.yczspm.length;i++) {
          // console.log(params.name);
          // console.log(data.yczspm[0]);
          if(data.yczspm[i].name == params.name){
             $("#motaikuang").html(params.name+'当前拥堵指数<br/><div style="font-size:33px; color: yellow;padding-left: 30%">'+data.yczspm[i].indexs+'</div>');
          }
        }
         $("#motaikuang").show().css({
         background:"grey",
         borderRadius: '8px',
         color: 'white'
         })
       })
       
    })
    chart.on('mouseout',function(params){
      // console.log(params.name)
      // alert(params.name+params.value);
       $("#motaikuang").hide()
       $("#motaikuang").html("")
      
    })
    
});
 })

// $.get('json/菏泽市.json', function (heZe) {
//         echarts.registerMap('菏泽', heZe);
//         var chart = echarts.init(document.getElementById('flux_distra'));
        
//         option = {
//                 // backgroundColor: '#0b0c45',
//         tooltip : {
//             trigger: 'item',
//              formatter: '今日{b0}机动车通行总量<br/><span style="color: yellow;">857601</span>辆',
//              alwaysShowContent: true
//         },
//         geo: [
//             {
//                 map: '菏泽',
//                 label: {
//                     emphasis: {
//                         show: false
//                     }
//                 },
//                 roam: false,
//                 itemStyle: {
//                     normal: {
//                         areaColor: '#0b0c45',
//                         borderColor: '#2b6cbe',
//                         borderWidth:3,
//                         shadowColor: 'rgba(45,110,192,2)',
//                         shadowBlur: 40
//                     },
//                     emphasis: {
//                         areaColor: '#0b0c45'
//                     }
//                 }
//             },
//             {
//                 map: '菏泽',
//                 label: {
//                     emphasis: {
//                         show: false
//                     }
//                 },
//                 roam: false,
//                 itemStyle: {
//                     normal: {
//                         areaColor: '#0b0c45',
//                         borderColor: '#2b6cbe',
//                         borderWidth:1,
//                         // shadowColor: 'rgba(45,110,192,2)',
//                         // shadowBlur: 30,
//                     },
//                     emphasis: {
//                         areaColor: '#0b0c45'
//                     }
//                 }
//             }
//         ],




            // title: {
            //     text: '各辖区实时流量分布情况',
            //     x:'center',
            //     textStyle: {
            //       color: "#2c83e0",
            //       fontSize: 13 
            //     }
            // },
            // tooltip: {
            //         position: ['40%','50%'],
            //         trigger: 'item',
            //         // formatter: function(){
            //         //     return '每年小型车车辆总数<br><span>'+234523+'</span>辆';
            //         formatter: '今日{b0}机动车通行总量<br/><span style="color: yellow;">857601</span>辆'
            //         // }
            //     },
            // dataRange:{
            // 	min:0,
            // 	max:500,
            // 	text:['高','低'],
            // 	realtime:true,
            // 	calculable:true,
            // 	color:['orangered','yellow','green']
            // },
          


//             series:[
//             	{
//             		name:'机动车总量分布图',
//             		type:'map',
//             		map:'菏泽',
//                 zlevel: 3,
//                 itemStyle: {
//                   normal:{
                 
//                     areaColor: '#0b0c45',
//                     borderColor: '#2b6cc0'
//                   },
//                   emphasis:{
//                      color: 'blue',
//                     areaColor: 'refreshData'
//                   }
//                 },
//             		mapLocation:{
//             			y:60
//             		},
//             		data:[
//                     {
//                       name: '牡丹区',
//                       selected: true,
//                       tooltip: {
//                         trigger: 'item',
//                         formatter: '今日{b0}机动车通行总量<br/><span style="color: yellow;">888881</span>辆'
//                       }

//                     }

//             		]
//             	}
//             ],
            
//         };
//         chart.setOption(option);
// });

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
              // if(n.name == '曹县'){
              //     n.name = '曹<span style="display: inline-block;width: 12px;"></span>县'
              // }else if(n.name == '单县'){
              //     n.name = '单<span style="display: inline-block;width: 12px;"></span>县'
              // }
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
         xiaquflow('xiaqu_flux',data.zlxqfb);
             
        

         var len = $('#xiaqu_flux .progress-title').length;

        
         for(var i=0;i<len;i++){
          
            if($('#xiaqu_flux').find('.progress-title')[i].innerHTML == '曹县'){
                  $('#xiaqu_flux').find('.progress-title')[i].innerHTML = '曹<span style="display: inline-block;width: 12px;"></span>县'
              }else if($('#xiaqu_flux').find('.progress-title')[i].innerHTML == '单县'){
                  $('#xiaqu_flux').find('.progress-title')[i].innerHTML = '单<span style="display: inline-block;width: 12px;"></span>县'
              }
         }
         
          

    	// traveltime('hour_content',data.lxpm);
    	// congestindex('exponent_content',data.ydzs);
     //    delayindex("index_content",data.yczspm)
    	    });
};
// console.log($);

$(document).ready(function(){
    refreshData();


    // setInterval(function(){
    //     refreshData();
    // },30*1000);
});
    // console.log($("#flux_pmtab").html())

    if ( $("#flux_pmtab>tr").length > 0 ) { 
    $("#flux_pmtab>tr").text("hi"); 

 }