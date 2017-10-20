 // 卡口排名
          var zdcllpm = function(containerId,data){
		    $("#"+containerId).empty();
		    if(data && data.length > 0){
		        var maxValue = data[0].count;
		        if(maxValue < 1) maxValue = 1;
		        $.each(data,function(i,n){
		            var progress = $("<div class='progress-container'><div class='progress-title'>" + n.name + "</div>"
		                + "<div class='progress-content'>"
		                + "<div class='legalRate' style='width:" + (n.count/maxValue)*100 + "%;'>"
		                + "<div class='shuzi' style='color: white;'>" + n.count + "</div></div></div>"
		                + "<div style='width: 20%;box-sizing: border-box;padding: 2.4% 6%;'><i class='fa fa-lg'></i></div></div>");
		            if(n.trend > 0) {
		                var icon = progress.find("i");
		                icon.addClass("fa-arrow-up");
		                icon.css("color", "red");
		            }
		            else if(n.trend < 0) {
		                var icon = progress.find("i");
		                icon.addClass("fa-arrow-down");
		                icon.css("color", "green");
		            }
		            else {
		                var icon = progress.find("i");
		                icon.addClass("fa-minus");
		                icon.css("color", "#2678d7");
		            }
		            $("#"+containerId).append(progress);
		        })
		    }else{
		        $("#"+containerId).html("<span>暂时没有数据</span>")
		    }
		};
  //重点车检车量排名
    var zdcjclpm = function(containerId,data){
		    $("#"+containerId).empty();
		    if(data && data.length > 0){
		        var maxValue = data[0].count;
		        if(maxValue < 1) maxValue = 1;
		        $.each(data,function(i,n){
		            var progress = $("<div class='progress-container'><div class='progress-title'>" + n.name + "</div>"
		                + "<div class='progress-content'>"
		                + "<div class='legalRate' style='width:" + (n.count/maxValue)*100 + "%;'>"
		                + "<div class='shuzi' style='color: white;'>" + n.count + "</div></div></div>"
		                + "<div style='width: 20%;box-sizing: border-box;padding: 2.4% 6%;'><i class='fa fa-lg'></i></div></div>");
		            if(n.trend > 0) {
		                var icon = progress.find("i");
		                icon.addClass("fa-arrow-up");
		                icon.css("color", "red");
		            }
		            else if(n.trend < 0) {
		                var icon = progress.find("i");
		                icon.addClass("fa-arrow-down");
		                icon.css("color", "green");
		            }
		            else {
		                var icon = progress.find("i");
		                icon.addClass("fa-minus");
		                icon.css("color", "#2678d7");
		            }
		            $("#"+containerId).append(progress);
		        })
		    }else{
		        $("#"+containerId).html("<span>暂时没有数据</span>")
		    }
		};

		//重点车辆类型分布
		 var zdcllxfb = function(containerId,data){
			    $("#"+containerId).empty();
			    console.log(data);
			     var chart_type = echarts.init(document.getElementById(containerId));
			     var arr1 = [];
			    $.each(data,function(i,n){
			        arr1.push(n.name);
			    })
			    console.log(arr1);
			     option = {
			                 color:["#f7ca43","#fd6354","#79a5c7","#46d3be","#70cf28","#c78127","#d27d6b","#bf3037","#2a3f5a","#b99d9f"],

			               tooltip : {
			                          trigger: 'item',
			                            // formatter: "{a} <br/>{b} : {c} ({d}%)",
			                          formatter:  function(data){
			                                  return  '今日全省'+data.name +'通行总量<br><span style="color: yellow;font-size: 20px;margin-left: 40px;">'+data.value + '</span>辆';
			                              }
			                      },
			           
			                legend: {
			                    show: true,
			                    data: arr1,
			                    orient: 'vertical',
			                    top: '3%',
			                    
			                    x: 'left',
			                    y: 'top',
			                    textStyle:{
			                        fontSize:14,
			                        color: 'white'
			                    },
			                    formatter: function (name) {
			                        if(name.length >= 8){
			                            return name.substring(0,8) + "...";
			                        }else{
			                            return name;
			                        }
			                        //return echarts.format.truncateText(name, 150, '14px Microsoft Yahei', '...');
			                    },
			                  },
			              series : [
			                  {
			                      name: '访问来源',
			                      type: 'pie',
			                      radius: ['50%', '70%'],
			                      center: ['50%', '60%'],
			           
			                      itemStyle: {
			                              normal : { 
			                                        borderWidth : 5,
			                                        borderColor : 'white'
			                                        },
			                                   },
			                      label: {
			                          normal:{
			                              formatter: '{b}({c}辆)',
			                              textStyle:{
			                                  color: 'white'
			                              },
			                              fontFamily: 'Microsoft YaHei'
			                          }
			                      },
			                      labelLine: {
			                              normal: {
			                                lineStyle: {
			                                  color: 'white'
			                                }
			                              }
			                            },
			                      data:data,
			                      itemStyle: {
			                          emphasis: {
			                              shadowBlur: 10,
			                              shadowOffsetX: 0,
			                              shadowColor: 'rgba(0, 0, 0, 0.5)'
			                          }
			                      }
			                  }
			              ]
			     }
			     chart_type.setOption(option);

			  }
 //重点车辆违法类型分布
          var zdclwflxfb = function(containerId,data){
			    $("#"+containerId).empty();
			    console.log(data);
			     var chart_type = echarts.init(document.getElementById(containerId));
			     var arr1 = [];
			    $.each(data,function(i,n){
			        arr1.push(n.name);
			    })
			    console.log(arr1);
			     option = {
			                 color:["#91c7ae","#c23531","#2f4554","#61a0a8","#d48265","#c78127","#d27d6b","#bf3037","#2a3f5a","#b99d9f"],

			               tooltip : {
			                          trigger: 'item',
			                            // formatter: "{a} <br/>{b} : {c} ({d}%)",
			                          formatter:  function(data){
			                                  return  '今日全省'+data.name +'通行总量<br><span style="color: yellow;font-size: 20px;margin-left: 40px;">'+data.value + '</span>辆';
			                              }
			                      },
			           
			                legend: {
			                    show: true,
			                    data: arr1,
			                    orient: 'vertical',
			                    top: '3%',
			                    
			                    x: 'left',
			                    y: 'top',
			                    textStyle:{
			                        fontSize:14,
			                        color: 'white'
			                    },
			                    formatter: function (name) {
			                        if(name.length >= 8){
			                            return name.substring(0,8) + "...";
			                        }else{
			                            return name;
			                        }
			                        //return echarts.format.truncateText(name, 150, '14px Microsoft Yahei', '...');
			                    },
			                  },
			              series : [
			                  {
			                      name: '访问来源',
			                      type: 'pie',
			                      radius: ['50%', '70%'],
			                      center: ['50%', '60%'],
			           
			                      itemStyle: {
			                              normal : { 
			                                        borderWidth : 5,
			                                        borderColor : 'white'
			                                        },
			                                   },
			                      label: {
			                          normal:{
			                              formatter: '{b}({c}辆)',
			                              textStyle:{
			                                  color: 'white'
			                              },
			                              fontFamily: 'Microsoft YaHei'
			                          }
			                      },
			                      labelLine: {
			                              normal: {
			                                lineStyle: {
			                                  color: 'white'
			                                }
			                              }
			                            },
			                      data:data,
			                      itemStyle: {
			                          emphasis: {
			                              shadowBlur: 10,
			                              shadowOffsetX: 0,
			                              shadowColor: 'rgba(0, 0, 0, 0.5)'
			                          }
			                      }
			                  }
			              ]
			     }
			     chart_type.setOption(option);

			  }
//重点流量时间变化趋势
 var zdclsjbhqs = function(containerId,data){
			    $("#"+containerId).empty();
			    console.log(data);
			     var chart_type = echarts.init(document.getElementById(containerId));
			     var arr1 = [];
			     var arr2 = [];
			    $.each(data,function(i,n){
			        arr1.push(n.time);
			        arr2.push(n.value);
			    })
			     option = {
			            title: {
                text: '重点车流量时间变化趋势',
                x:'center',
                textStyle: {
                  color: "#2c83e0",
                  fontSize: 15 
                }
            },
      tooltip : {
        trigger: 'axis',
        formatter: '今日{b0}:00全省重点车辆总量<br/> <span style="color:#ffb401;font-size: 20px;margin-left: 90px;">{c0}</span>辆',
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
            data :arr1
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
            data:arr2
        }
    ]
			     }
			     chart_type.setOption(option);

}


 //数据的统一处理
  var refreshData = function(){
    $.get("../json/hebeishuju.json",function(data){
      console.log(data);

     // 卡口排名
        zdcllpm("zdcllpm",data.kkllpm); 
      //重点车检车量排名
        zdcjclpm("zdcjclpm",data.sfzllpm);
      //重点车辆类型分布
        zdcllxfb("zdcllxfb",data.zdcllxfb);
      //重点车辆违法类型分布
        zdclwflxfb("zdclwflxfb",data.zdclwflxfb)

       //重点流量时间变化趋势
         zdclsjbhqs("zdclsjbhqs",data.zdclsjbhqs)
    	    });
};

    $(document).ready(function(){
    	          refreshData();
		         
		        
		       })  