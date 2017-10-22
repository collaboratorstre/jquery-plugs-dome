// $.get('json/hezeshi.json', function (heZe) {
//     echarts.registerMap('菏泽', heZe);
// });
//通行机动车车辆类型分布
echarts.init(document.getElementById("tpy_shan")).setOption({
          tooltip: {
	        trigger: 'item',
	        // formatter: function(data){
	        //     return '每年'+data.name+'车辆总数<br>'+data.value+'辆';
	        // }
           formatter: '今日{b0}机动车通行总量<br/><span style="color: yellow;font-size: 20px;margin-left: 60px;">{c0}</span>辆' 
         
	    }, 
	    series: [
	        {
	            name:'访问来源',
	            type:'pie',
	              grid: {
			                top: '-10%'
			            },
	            radius: ['45%', '80%'],
	            avoidLabelOverlap: false,
	            label: {
	                normal: {
	                    show: false,
	                    position: 'center'
	                }
	            },
	            labelLine: {
	                normal: {
	                    show: false
	                },
                  emphasis: {
                    show: true
                  }
	            },
	            data:[
	                {value:335, name:'大型货车'},
	                {value:310, name:'小型货车'},
	                {value:234, name:'校车'},
	                {value:135, name:'客运车'},
	                {value:335, name:'渣土车'},
	                {value:310, name:'大型客车'},
	                {value:234, name:'小型客车'},
	                {value:135, name:'出租车'},
	                {value:310, name:'大型货车'},
	                {value:234, name:'小型货车'},
	                {value:135, name:'校车'},
	                {value:335, name:'客运车'},
	                {value:310, name:'渣土车'},
	                {value:234, name:'出租车'},
	                {value:135, name:'小型客车'}
	            ]
	        }
	    ]
});

//通行机动车卡口排名TOP10
var kakoupaiming = function(containerId,data){
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

//今日各辖区通行机动车总量分布情况
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
     
 $.get('json/hezeshi.json', function (heZe) {
        echarts.registerMap('菏泽', heZe);
        var chart = echarts.init(document.getElementById('total_distra'));
         

        var dataShow = [
                      {value:8335, name:'牡丹区'},
                      {value:7310, name:'定陶区'},
                      {value:6234, name:'巨野县'},
                      {value:5135, name:'曹县'},
                      {value:7335, name:'成武县'},
                      {value:4310, name:'单县'},
                      {value:3234, name:'郓城县'},
                      {value:6135, name:'鄄城县'},
                      {value:4310, name:'东明县'}
                       ]
        
        option = {
            title: {
                text: '今天各辖区通行机动车总量分布情况',
                x:'center',
                textStyle: {
                  color: "#2c83e0",
                  fontSize: 13 
                }
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              top: '10%'
            },
            tooltip: {
                    position: ['40%','50%'],
                    trigger: 'item',
                    // formatter: function(){
                    //     return '每年小型车车辆总数<br><span>'+234523+'</span>辆';
                    formatter: '今日{b0}机动车通行总量<br/><span style="color: yellow;font-size: 20px;margin-left: 60px;">{c0}</span>辆'
                    // }
                },
            geo: [
                   {
                    // type: 'map',
                    map: '菏泽',
                    label: {
                      emphasis: {
                        show : true,
                        color: 'transparent'
                      }
                    },
                    roam: false,
                    itemStyle: {
                      normal: {
                        areaColor: '#0b0c45',
                        borderColor: '#2b5cbe',
                        borderWidth: 3,
                        shadowColor: 'rgba(45,110,192,2)',
                        shadowBlur: 40
                      },
                      emphasis: {
                        areaColor: '#0b0c45'
                      }
                     }
                    },
                    {
                      type: 'map',
                      map: '菏泽',
                      itemStyle: {
                        normal: {
                          color: 'blue',
                          areaColor: '#0b0c45',
                          borderColor: '#2b6cc0'
                        },
                        emphasis: {
                          color: 'blue',
                          areaColor: 'transparent'
                        }
                      },
                      label: {
                        normal: {
                          fontFamily: 'Microsoft YaHei'
                        },
                        emphasis: {
                          fontFamily: 'Microsoft YaHei'
                        }
                      }
                    }
            ],
            series: [
                  {
                      name: '机动车总量分布图',
                      map: '菏泽',
                      type: 'map',
                      itemStyle: {
                        normal: {
                          color: 'red',
                        areaColor: '#0b0c45',
                        borderColor: '#2b6cc0'
                      },
                      emphasis: {
                        color: 'transparent',
                        areaColor: '#00a2ff'
                      }
                     },
                     label:{
                      normal:{
                        color: 'blue',
                        fontFamily: 'Microsoft YaHei'
                      },
                      emphasis: {
                        color: 'blue',
                        fontFamily: 'Microsoft YaHei'
                      }
                     },
                     mapLocation:{
                      y: 60
                     },
                   
                    data: dataShow
                  }
              ]       
            
        }
        chart.setOption(option);
       chart.on("mouseover", function (params){   
            console.log(params);
            console.log(params.componentType);
                if(params.componentType == "geo"){
                chart.dispatchAction({  
                type: 'downplay'  
                });  
             }
        });


        var options = {
          xAxis: [],
          yAxis: [],
          grid: [],
          series: []
        }

        $.each(dataShow,function(idx,dataItem){
          if(!(dataItem.name in  geoCoordMap))return;
          var geoCoord = geoCoordMap[dataItem.name];
          var coord = chart.convertToPixel('geo',geoCoord);
          idx += '';

          options.xAxis.push({
            id: idx,
            gridId: idx,
            type: 'category',
            name: dataItem.name,  //柱状图下面的名字
            nameStyle: {
              color: 'white',
              fontSize: 12
            },
            nameTextStyle: {
              color: 'white'
            },
            nameLocation: 'middle',
            mameGap: 3,
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: '#bbb'
              }
            },
            data: [dataItem.name]
          });

         options.yAxis.push({
          id: idx,
          gridId: idx,
          show: false
         });

         options.grid.push({
          id: idx,
          width: 30,
          height: 50,
          left: coord[0] - 15,
          top: coord[1] - 35
         });

         options.series.push({
          name: dataItem.name,
          type: 'bar',
          stack: 'bar' + idx,
          xAxisId: idx,
          yAxisId: idx,
          barWidth: 12,
          itemStyle: {
            normal: {
              color: 'rgba(254,0,255,0.5)'
            }
          },
          data: [dataItem.value]
         })
        })
        chart.setOption(options);
          chart.on("mouseover", function (params){   
                
                chart.dispatchAction({  
                type: 'downplay'  
                });  
             
        });
});

//今日本市通行机动车随时间变化趋势

 echarts.init(document.getElementById("temp_change")).setOption({
     title: {
                text: '今日本市通行机动车随时间变化趋势',
                x:'center',
                textStyle: {
                  color: "#2c83e0",
                  fontSize: 13 
                }
            },
      tooltip : {
        trigger: 'axis',
        formatter: '今日{b0}:00本市通行机动车总量<br/> <span style="color:#ffb401;font-size: 20px;margin-left: 90px;">{c0}</span>辆',
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
            name:'搜索引擎',
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
                             color:'#d4c40d' 
                         },
              color: new echarts.graphic.LinearGradient(
                             0, 0, 0, 1,
                [
                    {offset: 0, color: '#d4c40d'},
                    {offset: 0.3, color: '#d4c40d'},
                    {offset: 1, color: '#0f0f43'}
                ]
            )
                                }  
                            },  
            areaStyle: {normal: {}},
            data:[0,0,0,0,1234,4523,5345,6435,1234,3424,2345,4545,4354,6563,6523,3124,6523,1323,2454,2342,1234,4534,1343]
        }
    ]
 });

 //通行机动车总量排名
  var totelpaiming = function(containerId,data){
 
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

 //本市通行机动总量随辖区分布
 var xiaqufenbu = function(containerId,data){
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


//数据的统一请求
 var refreshData = function(){
    $.get("json/tongxingye.json",function(data){
      // console.log(data);
   // $.getJSON(contextPaths+"/webpage/data/msgv2.json",function(data){
     
           kakoupaiming("bay_rank",data.kopm);
           xiaqufenbu("xiaqu_distru",data.zlxqfb);
           totelpaiming("totel_pmtab",data.zlph);

          // delayTrend("delayTrend",data.delayTimeList);
          // activeDistribute("activeDistribute",data.activeVehList);
          // accidentLastweek("busySpeed",data.keyareaPeak);
           // keypathRealFlowRank("realtimeFlowRank",data.monthTravel);
           // mainCityEmphasisVio("emphasisVio",data.correction);
           // mainCityAlarm("busySpeed",data.trafficAlarm);
           // customPathRealGrade("pathRealGradeRank",data.top5IndexInfoList);
           // realtimeSpeedInfo("realtimeSpeedInfo",data.regionspeedInfo);
           // mainCrossVio("mainCrossVio",data.roadLawrate);
           // districtRealtime("districtRealtime",data.administrativeRegionZhiShuInfo);
       
    });
};

$(document).ready(function(){
    refreshData();
    // setInterval(function(){
    //     refreshData();
    // },30*1000);
});