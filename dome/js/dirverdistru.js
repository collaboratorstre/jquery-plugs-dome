//车辆类型分布
 
 echarts.init(document.getElementById("typ_distru")).setOption({
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    calculable : true,
    series : [
        {
            name:'全市小车总量',
            type:'pie',
            radius : [20, 110],
            roseType : 'radius',
            label: {
                normal: {
                    show: false
                },
                emphasis: {
                    show: true
                }
            },
            lableLine: {
                normal: {
                    show: false
                },
                emphasis: {
                    show: true
                }
            },
            data:[
                {value:10, name:'小型货车'},
                {value:5, name:'大型客车'},
                {value:15, name:'校车'},
                {value:25, name:'渣车'},
                {value:20, name:'大型货车'},
                {value:35, name:'小型客车'},
                {value:30, name:'危险品车'},
                {value:40, name:'春运车'}
            ]
        }
    ]
 });

 //车辆状态排名
 var carstaterank = function(containerId,data){
  $("#"+containerId).empty();
  // console.log(data);
  if(data){
          $.each(data,function(i,n){
             var progressStr = "<div class='progress-container'><div class='progress-title'>"+n.name+"</div>"
                +"<div class='progress-content'>"
                + '<div class="legalRate" style="width:'+ (n.value/1000000)*100 +'%;';
            progressStr+='"><div class="shuzi" style="color: white;">'+n.value+'</div></div></div>'
                +'<div class="progress-amount">'+'</div></div>';
            $("#"+containerId).append($(progressStr));
          })
  }else{
    $("#"+containerId).html("<span>暂时没有数据</span>")
  }
}
//本市各辖区机动车驾驶人分布情况
$.get('json/hezeshi.json', function (heZe) {
        echarts.registerMap('菏泽', heZe);
        var chart = echarts.init(document.getElementById('dirve_distra'));
        
        option = {
            title: {
                text: '本市各辖区机动车驾驶人分布情况',
                x:'center',
                textStyle: {
                  color: "#2c83e0",
                  fontSize: 13 
                }
            },
            tooltip: {
                    show: false,
                    position: ['40%','50%'],
                    trigger: 'item',
                    // formatter: function(){
                    //     return '每年小型车车辆总数<br><span>'+234523+'</span>辆';
                    formatter: '今日{b0}机动车通行总量<br/><span style="color: yellow;">857601</span>辆'
                    // }
                },
            // dataRange:{
            //  min:0,
            //  max:500,
            //  text:['高','低'],
            //  realtime:true,
            //  calculable:true,
            //  color:['orangered','yellow','green']
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
                    areaColor: '#00a2ff'
                  }
                },
                label:{
                  
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
            $.get("json/tongxingye.json",function(data){
                for(var i=0;i<data.regionjam.length;i++) {
                            
                  if(data.regionjam[i].regionname == params.data.name){
                         $("#motaikuang").html(data.regionjam[i].regionname+'当前拥堵指数<br/><div style="font-size:33px; color: yellow;padding-left: 30%">'+data.regionjam[i].jamindex+'</div>');
                                 }   

                     }

                })
           $("#motaikuang").show().css({
                    background:"grey",
                    borderRadius: '8px',
                    color: 'white'
                  })
               
               })
         chart.on('mouseout',function(params){
       $("#motaikuang").hide()
       $("#motaikuang").html("")
      
    })
});

//本市机动车和驾驶人最近5年变化趋势
echarts.init(document.getElementById("change_trend")).setOption({
	    title: {
                text: '本市机动车和驾驶人最近5年变化趋势',
                x:'center',
                textStyle: {
                  color: "#2c83e0",
                  fontSize: 13 
                          }
               },
	    color: ['#febe14', '#287cdc'],
	    tooltip: {
	        trigger: 'axis',
	        axisPointer: {
	            type: 'shadow'
	        }
	    },
	     grid: {
			        left: '3%',
			        right: '4%',
			        bottom: '3%',
			        containLabel: true
			    },
	    legend: {
	    	top: '15%',
	        data: ['机动车(辆)', '驾驶人(人)'],
	        textStyle: {
	        	color: '#9bcafe'
	        }
	    },
	    calculable: true,
	    xAxis: [
	        {
	            type: 'category',
	            axisTick: {show: false},
	            data: [ '2013年', '2014年', '2015年', '2016年','2017年'],
	            axisLabel: {
	            	show: true,
	            	textStyle: {
	            		color:  '#7ea7db'
	            	}
	            	
	            }
	        }
	    ],
	    yAxis: [
	        {
	            type: 'value',
	            splitLine: {
	            	lineStyle: {
	            		color: '#0e1654'
	            	}
	            },
	            axisLine: {
	            	lineStyle: {
	            		color: '#0b0c45'
	            	}
	            }

	        }
	    ],
	    series: [
	        {
	            name: '机动车(辆)',
	            type: 'bar',
	             barWidth: '20%',
	            barGap: 0,
	            data: [98, 77, 101, 99, 40]
	        },
	      
	        {
	            name: '驾驶人(人)',
	            type: 'bar',
	             barWidth: '20%',
	            data:   [320, 332, 301, 334, 390]
	          
	        }
	    ]
})
//机动车号牌种类分布
 echarts.init(document.getElementById("haopai_distru")).setOption({
      tooltip : {
        trigger: 'item',
        formatter:  function(data){
                return '全市'+ data.name +'总量<br><span style="color: yellow;font-size: 20px;margin-left: 40px;">'+data.value + '</span>辆';
              }
    },
    series : [
        {
            name: '访问来源',
            type: 'pie',
            radius : '55%',
            center: ['50%', '50%'],
            itemStyle: {
                    normal : { 
                              borderWidth : 5,
                              borderColor : 'white'
                              },
                         },
            label: {
                             normal:{
                               textStyle:{
                                 color: 'white'
                               }
                             }
                  },
            labelLine: {
                    normal: {
                      lineStyle: {
                        color: 'white'
                      }
                    }
                  },
            data:[
                {value:12335, name:'小型汽车号牌'},
                {value:12310, name:'大型汽车号牌'},
                {value:33234, name:'小轿车号牌'},
                {value:12135, name:'校车汽车号牌'},
                {value:11548, name:'公交车汽车号牌'}
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]

 })
// $(function () {
   
//     if (!Highcharts.theme) {
//         Highcharts.setOptions({
//             chart: {
//                 backgroundColor: 'blue'
//             },
//             colors: ['#ff3433', '#ff3433', '#ff3433','#ff3433','#ff3433','#ff3433'],
//             title: {
//                 style: {
//                     color: 'silver'
//                 }
//             },
//             tooltip: {
//                 style: {
//                     color: 'white'
//                 }
//             }
//         });
//     }
//     Highcharts.chart('haopai_distru', {
//         chart: {
//             type: 'solidgauge',
//             marginTop: 50
//         },
//         credits: {
//             text: 'hcharts.cn',
//         },
//         title: {
//             text: '',
//             style: {
//                 fontSize: '24px'
//             }
//         },
//         tooltip: {
//             borderWidth: 0,
//             backgroundColor: 'none',
//             style: {
//                 fontSize: '10px',
//                 color: 'white'
//             },
//             pointFormat: '{series.name}<br><span style="font-size:2em; color: {point.color}; font-weight: bold">{point.y}%</span>',
//             positioner: function (labelWidth, labelHeight) {
//                 return {
//                     x: 50,
//                     y: 350
//                 };
//             }
//         },
//         pane: {
//             startAngle: 0,
//             endAngle: 360,
//             background: [{ // Track for Move
//                 outerRadius: '',
//                 innerRadius: '',
//                 backgroundColor: Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0.3).get(),
//                 borderWidth: 0
//             }, { // Track for Exercise
//                 outerRadius: '',
//                 innerRadius: '',
//                 backgroundColor: Highcharts.Color(Highcharts.getOptions().colors[1]).setOpacity(0.3).get(),
//                 borderWidth: 0
//             }, { // Track for Exercise
//                 outerRadius: '',
//                 innerRadius: '',
//                 backgroundColor: Highcharts.Color(Highcharts.getOptions().colors[2]).setOpacity(0.3).get(),
//                 borderWidth: 0
//             }, { // Track for Exercise
//                 outerRadius: '',
//                 innerRadius: '',
//                 backgroundColor: Highcharts.Color(Highcharts.getOptions().colors[3]).setOpacity(0.3).get(),
//                 borderWidth: 0
//             }, { // Track for Exercise
//                 outerRadius: '',
//                 innerRadius: '',
//                 backgroundColor: Highcharts.Color(Highcharts.getOptions().colors[4]).setOpacity(0.3).get(),
//                 borderWidth: 0
//             }, { // Track for Stand
//                 outerRadius: '',
//                 innerRadius: '',
//                 backgroundColor: Highcharts.Color(Highcharts.getOptions().colors[5]).setOpacity(0.3).get(),
//                 borderWidth: 0
//             }]
//         },
//         yAxis: {
//             min: 0,
//             max: 100,
//             lineWidth: 0,
//             tickPositions: []
//         },
//         plotOptions: {
//             solidgauge: {
//                 borderWidth: '4px',
//                 dataLabels: {
//                     enabled: false
//                 },
//                 linecap: 'round',
//                 stickyTracking: false
//             }
//         },
//         series: [{
//             name: '全市大型汽车号牌总量',
//             borderColor: Highcharts.getOptions().colors[0],
//             data: [{
//                 color: Highcharts.getOptions().colors[0],
//                 radius: '100%',
//                 innerRadius: '100%',
//                 y: 60
//             }]
//         }, {
//             name: '全市小型汽车号牌总量',
//             borderColor: Highcharts.getOptions().colors[1],
//             data: [{
//                 color: Highcharts.getOptions().colors[1],
//                 radius: '85%',
//                 innerRadius: '85%',
//                 y: 50
//             }]
//         },{
//             name: '全市校车号牌总量',
//             borderColor: Highcharts.getOptions().colors[1],
//             data: [{
//                 color: Highcharts.getOptions().colors[1],
//                 radius: '70%',
//                 innerRadius: '70%',
//                 y: 45
//             }]
//         }, {
//             name: '全市大型货车总量',
//             borderColor: Highcharts.getOptions().colors[2],
//             data: [{
//                 color: Highcharts.getOptions().colors[2],
//                 radius: '60%',
//                 innerRadius: '60%',
//                 y: 40
//             }]
//         },
//                  {
//                      name: '全市小型货车总量',
//                      borderColor: Highcharts.getOptions().colors[3],
//                      data: [{
//                          color: Highcharts.getOptions().colors[3],
//                          radius: '50%',
//                          innerRadius: '50%',
//                          y: 35
//                      }]
//                  }, {
//                      name: '全市轧车数量',
//                      borderColor: Highcharts.getOptions().colors[4],
//                      data: [{
//                          color: Highcharts.getOptions().colors[4],
//                          radius: '40%',
//                          innerRadius: '40%',
//                          y: 30
//                      }]
//                  }]
//     },
//                      /**
//      * In the chart load callback, add icons on top of the circular shapes
//      */
//                      function callback() {
//         // Move icon
//         // Stand icon
//     });
// });


//机动车保有量辖区排名
 var carxiaqurank = function(containerId,data){
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
// chart.on('mouseover',function(params){
// $.get("json/tongxingye.json",function(data){
//   console.log(data);
//       $.each(data.regionjam,function(i,n){
//                     if(n.regionname == '牡丹区'){
//                         $("#motaikuang").html(n.regionname+'当前拥堵指数<br/><div style="font-size:33px; color: yellow;padding-left: 30%">'+n.jamindex+'</div>');
//                     }
//                     if(n.regionname == '曹县'){
//                         $("#motaikuang").html(n.regionname+'当前拥堵指数<br/><div style="font-size:33px; color: yellow;padding-left: 30%">'+n.jamindex+'</div>');
//                     }
//                     if(n.regionname == '定陶区'){
//                         $("#motaikuang").html(n.regionname+'当前拥堵指数<br/><div style="font-size:33px; color: yellow;padding-left: 30%">'+n.jamindex+'</div>');
//                     }
//                 })

//       })
//    })
 //数据统一处理
 var refreshData = function(){
    $.get("json/tongxingye.json",function(data){

    	carstaterank('typ_rank',data.zlztpm);
    	carxiaqurank('xiaqu_rank',data.zlxqfb);

    	    });
};

$(document).ready(function(){
    refreshData();
    // setInterval(function(){
    //     refreshData();
    // },30*1000);
});