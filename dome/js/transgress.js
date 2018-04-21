 // 违法类型排名top10
 var wflxpm = function(containerId,data){
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
	                                  return  data.name +'车辆总量<br><span style="color: yellow;font-size: 20px;margin-left: 40px;">'+data.value + '</span>辆';
	                              }
	                      },
	           
	                legend: {
	                    show: true,
	                    data: arr1,
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
	                      radius : [20,90],
	                      center: ['50%', '60%'],
	                       roseType : 'radius',
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
   //事故类型排名top10
    var sglxpm = function(containerId,data){
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
	                                  return  data.name +'车辆总量<br><span style="color: yellow;font-size: 20px;margin-left: 40px;">'+data.value + '</span>辆';
	                              }
	                      },
	           
	                legend: {
	                    show: true,
	                    data: arr1,
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
	                      radius : [20,90],
	                      center: ['50%', '60%'],
	                       roseType : 'radius',
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
 //违法路段排名top10
   var wfldpm = function(containerId,data){
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
 //事故路段排名top10
 var sgldpm = function(containerId,data){
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

	//违法事故分布情况
	
	var geoCoordMap = {
       '石家庄市': [114.514793,38.042228],
       '唐山市': [118.180193,39.630867],
       '张家口市': [114.886252,40.768493],
       '秦皇岛市': [119.518197,39.888701],
       '邯郸市': [114.538959,36.625594],
       '邢台市': [114.504677,37.070834],
       '保定市': [115.464589,38.874434],
       '承德市': [117.962749,40.952942],
       '沧州市': [116.838834,38.304477],
       '廊坊市': [116.683752,39.538047],
       '衡水市': [115.670177,37.73892]
	}
	
	$.get('../json/hebei.json', function (heZe) {
        echarts.registerMap('河北', heZe);
        var chart = echarts.init(document.getElementById('hebei_map'));
          var dataShow = [
                      {value1:8335, name:'石家庄市', value2: 10535},
                      {value1:7310, name:'唐山市',value2: 10535},
                      {value1:8310, name:'张家口市',value2: 10535},
                      {value1:6234, name:'秦皇岛市',value2: 10535},
                      {value1:5135, name:'邯郸市',value2: 10535},
                      {value1:7335, name:'邢台市',value2: 10535},
                      {value1:4310, name:'保定市',value2: 10535},
                      {value1:3234, name:'承德市',value2: 10535},
                      {value1:6135, name:'沧州市',value2: 10535},
                      {value1:4310, name:'廊坊市',value2: 10535},
                      {value1:3335, name:'衡水市',value2: 10535}
                      // {value1:10535, name:'石家庄市'},
                      // {value1:3510, name:'唐山市'},
                      // {value1:2310, name:'张家口市'},
                      // {value1:8634, name:'秦皇岛市'},
                      // {value1:2735, name:'邯郸市'},
                      // {value1:3835, name:'邢台市'},
                      // {value1:1410, name:'保定市'},
                      // {value1:8534, name:'承德市'},
                      // {value1:1835, name:'沧州市'},
                      // {value1:3310, name:'廊坊市'},
                      // {value1:2335, name:'衡水市'},
                       ]
        
       
        
        option = {

                  bmap: {
                        center: [116.307698, 40.056975],
                          zoom: 5,

                          roam: true, // 允许缩放

                          mapStyle: {  // 百度地图自定义样式
                            styleJson: [
                              // 陆地
                                  {
                          "featureType": "land",
                                        "elementType": "all",
                                        "stylers": {
                                            "color": "#073763"
                                        }
                                    },
                                    // 水系
                                    {
                                        "featureType": "water",
                                        "elementType": "all",
                                        "stylers": {
                                            "color": "#073763",
                                            "lightness": -54
                                        }
                                    },
                                    // 国道与高速
                                    {
                                        "featureType": "highway",
                                        "elementType": "all",
                                        "stylers": {
                                            "color": "#45818e"
                                        }
                                    },
                                    // 边界线
                                    {
                                        "featureType": "boundary",
                                        "elementType": "all",
                                        "stylers": {
                                            "color": "#ffffff",
                                            "lightness": -62,
                                            "visibility": "on"
                                        }
                                    },
                                    // 行政标注
                                    {
                                        "featureType": "label",
                                        "elementType": "labels.text.fill",
                                        "stylers": {
                                            "color": "#ffffff",
                                            "visibility": "on"
                                        }
                                    },
                                    {
                                        "featureType": "label",
                                        "elementType": "labels.text.stroke",
                                        "stylers": {
                                            "color": "#444444",
                                            "visibility": "on"
                                        }
                                    }
                            ]
                          }
                    },
          
            tooltip: {
                    show: true,
                    position: ['40%','50%'],
                    trigger: 'item',
                    // formatter: function(){
                    //     return '每年小型车车辆总数<br><span>'+234523+'</span>辆';
                    // formatter: '今日{b0}机动车通行总量<br/><span style="color: yellow;">857601</span>辆'
                    // }
                },
                    geo: [
            {
                map: '河北',
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
                map: '河北',
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
            series:[
              {
                name:'机动车总量分布图',
                type:'map',
                map:'河北',
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

          var options = {
          xAxis: [],
          yAxis: [],
          grid: [],
          series: [],
          legend: [],
          tooltip: []
        }
        
         

         $.each(dataShow,function(idx,dataItem){
          console.log(">>><><><",idx,dataShow)
          if(!(dataItem.name in  geoCoordMap))return;
          console.log(dataItem.name);
          console.log(geoCoordMap);
          var geoCoord = geoCoordMap[dataItem.name];
          console.log(geoCoord);
        //   var coord1 = chart.convertToPixel('geo',[118.8062, 31.9208]);
        // console.log(coord1)
          var coord = chart.convertToPixel('geo',geoCoord);
          console.log(coord)
          idx += '';
          // console.log(idx);
          
          options.tooltip.push({
                   show: true,
                    position: ['40%','50%'],
                    trigger: 'item',
                    // formatter: function(){
                    //     return '每年小型车车辆总数<br><span>'+234523+'</span>辆';
                    formatter: '<div style="font-size: 18px;">{b0}{a0}总量<br/><span style="color: yellow; font-size: 20px;">{c0}</span>起</div>'
                    // }
          })
          
          options.legend.push({
            show: true,
            orient: 'vertical',
             // top: '15%',
             x: 'left',
             y: '90%',
            textStyle:{
              fontSize: 14,
              color: 'white'
            },
            data: ['违法','事故']
          })

          options.xAxis.push({
            id: idx,
            gridId: idx,
            type: 'category',
            name:   ['违法','事故'],  //柱状图下面的名字
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
          
        options.series.push( {
          name: '违法',
          type: 'bar',
          stack: 'bar' + idx,
          xAxisId: idx,
          yAxisId: idx,
          barWidth: 12,
          itemStyle: {
            normal: {
              color: '#b16a65'
            }
          },
          data: [dataItem.value1]
         });
        
        options.series.push( {
          name: '事故',
          type: 'bar',
          stack: 'bar' + (idx+1),
          xAxisId: idx,
          yAxisId: idx,
          barWidth: 12,
          itemStyle: {
            normal: {
              color: '#c15f16'
            }
          },
          data: [dataItem.value2]
          // data: [10000,9000,8000,7000,6000,5000,4000,3000,2000,1000]
         });
        })
        chart.setOption(options);
      
});


 


 //数据的统一处理
  var refreshData = function(){
    $.get("../json/hebeishuju.json",function(data){
      console.log(data);
       $('#weifa_total').html(data.weifashu);
       $('#shigu_total').html(data.shigushu);

     // 违法类型排名top10
        wflxpm("wflxpm",data.wflxpm); 
     // 事故类型排名top10
        sglxpm("sglxpm",data.wflxpm);
     //违法路段排名top10
        wfldpm('wfldpm',data.wfldpm); 
     //事故路段排名top10
        sgldpm("sgldpm",data.wfldpm);

    	    });
};

    $(document).ready(function(){
    	          refreshData();
		        
		       })  


    // var geoCoordMap = {
//     '石家庄': [114.48,38.03],
//     '山东': [117.1582,36.8701],
//     '河北': [114.4995,38.1006],
//     '吉林': [125.8154,44.2584],
//     '黑龙江': [127.9688,45.368],
//     '辽宁': [123.1238,42.1216],
//     '内蒙古': [111.4124,40.4901],
//     '新疆': [87.9236,43.5883],
//     '甘肃': [103.5901,36.3043],
//     '宁夏': [106.3586,38.1775],
//     '山西': [112.3352,37.9413],
//     '陕西': [109.1162,34.2004],
//     '河南': [113.4668,34.6234],
//     '安徽': [117.29,32.0581],
//     '江苏': [118.8062,31.9208],
//     '浙江': [119.5313,29.8773],
//     '福建': [119.4543,25.9222],
//     '广东': [113.5107,23.2196],
//     '江西': [116.0046,28.6633],
//     '海南': [110.3893,19.8516],
//     '广西': [108.479,23.1152],
//     '贵州': [106.6992,26.7682],
//     '湖南': [113.0823,28.2568],
//     '湖北': [114.3896,30.6628],
//     '四川': [103.9526,30.7617],
//     '云南': [102.9199,25.4663],
//     '西藏': [91.1865,30.1465],
//     '青海': [101.4038,36.8207],
//     '天津': [117.4219,39.4189],
//     '上海': [121.4648,31.2891],
//     '重庆': [107.7539,30.1904],
//     '北京': [116.4551,40.2539],
//     '台湾': [121.50,25.05],
//     '香港': [114.10,22.20],
//     '澳门': [113.33,22.13]
// };