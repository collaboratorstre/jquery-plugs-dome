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
			    // console.log(data);
			     var chart_type = echarts.init(document.getElementById(containerId));
			     var arr1 = [];
			    $.each(data,function(i,n){
			        arr1.push(n.name);
			    })
			    // console.log(arr1);
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
			    // console.log(data);
			     var chart_type = echarts.init(document.getElementById(containerId));
			     var arr1 = [];
			    $.each(data,function(i,n){
			        arr1.push(n.name);
			    })
			    // console.log(arr1);
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
			    // console.log(data);
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

//外省来源迁徙图
var otherProvMigration_in = function(containerId,data) {
    var otherProvMigrationIn_chart = echarts.init(document.getElementById(containerId), 'dark');
    // console.log(data);
    var geoCoordMap = {
        '石家庄': [114.48,38.03],
        '山东': [117.1582,36.8701],
        '河北': [114.4995,38.1006],
        '吉林': [125.8154,44.2584],
        '黑龙江': [127.9688,45.368],
        '辽宁': [123.1238,42.1216],
        '内蒙古': [111.4124,40.4901],
        '新疆': [87.9236,43.5883],
        '甘肃': [103.5901,36.3043],
        '宁夏': [106.3586,38.1775],
        '山西': [112.3352,37.9413],
        '陕西': [109.1162,34.2004],
        '河南': [113.4668,34.6234],
        '安徽': [117.29,32.0581],
        '江苏': [118.8062,31.9208],
        '浙江': [119.5313,29.8773],
        '福建': [119.4543,25.9222],
        '广东': [113.5107,23.2196],
        '江西': [116.0046,28.6633],
        '海南': [110.3893,19.8516],
        '广西': [108.479,23.1152],
        '贵州': [106.6992,26.7682],
        '湖南': [113.0823,28.2568],
        '湖北': [114.3896,30.6628],
        '四川': [103.9526,30.7617],
        '云南': [102.9199,25.4663],
        '西藏': [91.1865,30.1465],
        '青海': [101.4038,36.8207],
        '天津': [117.4219,39.4189],
        '上海': [121.4648,31.2891],
        '重庆': [107.7539,30.1904],
        '北京': [116.4551,40.2539],
        '台湾': [121.50,25.05],
        '香港': [114.10,22.20],
        '澳门': [113.33,22.13]
    };

    // var HZData = [
    //     [{name:'菏泽'}, {name:'河北',value:42380}],
    //     [{name:'菏泽'}, {name:'河南',value:41560}],
    //     [{name:'菏泽'}, {name:'天津',value:41356}],
    //     [{name:'菏泽'}, {name:'北京',value:39799}],
    //     [{name:'菏泽'}, {name:'陕西',value:38380}],
    //     [{name:'菏泽'}, {name:'辽宁',value:37174}],
    //     [{name:'菏泽'}, {name:'江苏',value:35267}],
    //     [{name:'菏泽'}, {name:'安徽',value:34741}],
    //     [{name:'菏泽'}, {name:'浙江',value:32789}],
    //     [{name:'菏泽'}, {name:'湖北',value:31987}],
    //     [{name:'菏泽'}, {name:'上海',value:22295}],
    //     [{name:'菏泽'}, {name:'西藏',value:33380}],
    //     [{name:'菏泽'}, {name:'湖南',value:11160}],
    //     [{name:'菏泽'}, {name:'新疆',value:23250}],
    //     [{name:'菏泽'}, {name:'台湾',value:32240}],
    //     [{name:'菏泽'}, {name:'广东',value:11130}],
    //     [{name:'菏泽'}, {name:'重庆',value:33220}],
    //     [{name:'菏泽'}, {name:'黑龙江',value:43110}],
    //     [{name:'菏泽'}, {name:'青海',value:13320}],
    //     [{name:'菏泽'}, {name:'四川',value:3210}],
    //     [{name:'菏泽'}, {name:'海南',value:2210}],
    //     [{name:'菏泽'}, {name:'内蒙古',value:1110}],
    //     [{name:'菏泽'}, {name:'云南',value:22310}]
    // ];

    var centerCity = {name:'石家庄'};
    var HZData = new Array();  //先声明一维
    for(var i=0; i<data.length; i++){    //一维长度为i,i为变量，可以根据实际情况改变
        HZData[i]=new Array();  //声明二维，每一个一维数组里面的一个元素都是一个数组；
        HZData[i][0]= centerCity;
        HZData[i][1]= data[i];
    }
    console.log(HZData);

    var x = HZData[0][1].todayamount;
    console.log(x);
    var convertData = function (data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
            var dataItem = data[i];
            var fromCoord = geoCoordMap[dataItem[1].name];
            var toCoord = geoCoordMap[dataItem[0].name];
            if (fromCoord && toCoord) {
                res.push({
                    fromName: dataItem[1].name,
                    toName: dataItem[0].name,
                    coords: [fromCoord, toCoord]
                });
            }
        }
        return res;

    };
    
    
    var series = [];
    [['石家庄', HZData]].forEach(function (item, i) {
    	// console.log(item)
    	console.log(item[1])
        series.push({
                name: item[0] + ' Top10',
                type: 'lines',
                zlevel: 1,
                tooltip : {
                    show: false
                },
                effect: {
                    show: true,
                    period: 6,
                    trailLength: 0.7,
                    color: '#7bb4d2',
                    symbolSize: 3
                },
                lineStyle: {
                    normal: {
                        color: '#ffffff',
                        width: 0,
                        curveness: 0.2
                    }
                },
                data: convertData(item[1])
            },
            {
                name: item[0] + ' Top10',
                type: 'lines',
                zlevel: 2,
                tooltip : {
                    show: false
                },
                symbol: ['none', 'circle'],
                symbolSize: 1,
                effect: {
                    show: true,
                    period: 6,
                    trailLength: 0,
                    symbol: 'diamond',
                    symbolSize: 6,
                    color:'#7bb4d2'
                },
                lineStyle: {
                    normal: {
                        color: '#7bb4d2',
                        width: 1,
                        opacity: 0.6,
                        curveness: 0.2
                    }
                },
                data: convertData(item[1])
            },
            {
                name: item[0] + ' Top10',
                type: 'effectScatter',
                coordinateSystem: 'geo',
                zlevel: 2,
                tooltip : {
                    show: true,
                    // formatter: "{a} <br/>{b} : {c}"
                },
                rippleEffect: {
                    brushType: 'stroke'
                },
                label: {
                    normal: {
                        show: true,
                        position: 'right',
                        formatter: function(params){
                            return params.data[2];
                        }
                    }
                },
                symbolSize: function (val) {
                    if(val[2]==0){
                        return 0.5;
                    }else{
                        return val[2]/Math.pow(10, x.toString().length-1);
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#7bb4d2'
                    }
                },
                data: item[1].map(function (dataItem) {
                    return {
                        name: dataItem[1].name,
                        value: geoCoordMap[dataItem[1].name].concat([dataItem[1].todayamount])
                    };
                })
            });
    });
    console.log(series);
    var otherProvMigrationIn_option = {
        backgroundColor: '#0b0c45',
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c}",
        },
        geo: [
            {
                map: 'china',
                label: {
                    emphasis: {
                        show: false
                    }
                },
                roam: true,
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
                map: 'china',
                label: {
                    emphasis: {
                        show: false
                    }
                },
                roam: true,
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
        series: series
    };

    otherProvMigrationIn_chart.setOption(otherProvMigrationIn_option);
}

 //外省外埠车辆来源排名
var traveltime = function(containerId,data){
 
        $("#"+containerId).empty();
       data = data.sort(function(a,b){
        return a.value<b.value;
        })
          if(data){
            $.each(data,function(i,n){
               progressStr = "<tr><td>"+(i+1)+"</td><td>"+n.name+"</td><td>"+n.value+"</td></tr>"
              $("#"+containerId).append($(progressStr));
            })
    }else{
      $("#"+containerId).html("<span>暂时没有数据</span>")
    }
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

       //外省来源迁徙图
        otherProvMigration_in("lyqxtu",data.outsideProvincesResident);
         //外省外埠车辆来源排名
        traveltime('hour_content',data.wswbclpm);
    	    });

       
};

    $(document).ready(function(){
    	          refreshData();
		         
		        
		       })  