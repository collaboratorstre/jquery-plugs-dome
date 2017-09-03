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
 $.get('json/菏泽市.json', function (heZe) {
        echarts.registerMap('菏泽', heZe);
        var chart = echarts.init(document.getElementById('total_distra'));
        
        option = {
            title: {
                text: '今天各辖区通行机动车总量分布情况',
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
                    formatter: '今日{b0}机动车通行总量<br/><span style="color: yellow;font-size: 20px;margin-left: 60px;">{c0}</span>辆'
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
                    color: 'red',
                    areaColor: '#0b0c45',
                    borderColor: '#2b6cc0'
                  },
                  emphasis:{
                    areaColor: '#00a2ff'
                  }
                },
            		mapLocation:{
            			y:60
            		},
            		data:[
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
            	}
            ],
            
        };
        chart.setOption(option);
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