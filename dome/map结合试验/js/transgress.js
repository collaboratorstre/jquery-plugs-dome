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
  
  //  var map = new BMap.Map("hebei_map");
	 // var point = new BMap.Point(116.404, 39.915);
  //       // 创建点坐标  
  //   map.centerAndZoom(point, 15);
        //初始化地图，设置中心点坐标和地图级别  
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
        // console.log(chart)
        // var bmap = chart._api.getModel('bmap').getBMap();
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
        
       
        
      var option = {

                  bmap: {
                        center: [116.20, 40.22],
                          zoom: 11,

                          roam: false, // 允许缩放

                          mapStyle: {  // 百度地图自定义样式
                            styleJson: [
                               {
                        "featureType": "water", //水系
                        "elementType": "all",
                        "stylers": {
                            "color": "#044161"
                        }
                    },
                    {
                        "featureType": "land", //陆地
                        "elementType": "all",
                        "stylers": {
                            "color": "#002256"
                        }
                    },
                    {
                        "featureType": "boundary",
                        "elementType": "geometry",
                        "stylers": {
                            "color": "#064f85"
                        }
                    },
                    {
                        "featureType": "railway",
                        "elementType": "all",
                        "stylers": {
                            "visibility": "off"
                        }
                    },
                    {
                        "featureType": "highway", // 国道与高速
                        "elementType": "geometry",
                        "stylers": {
                            "color": "#004981"
                        }
                    },
                    {
                        "featureType": "highway",
                        "elementType": "geometry.fill",
                        "stylers": {
                            "color": "#2b827f",
                            "lightness": 1
                        }
                    },
                    {
                        "featureType": "highway",
                        "elementType": "labels",
                        "stylers": {
                            "visibility": "off"
                        }
                    },
                    {
                        "featureType": "arterial",
                        "elementType": "geometry",
                        "stylers": {
                            "color": "#004981"
                        }
                    },
                    {
                        "featureType": "arterial",
                        "elementType": "geometry.fill",
                        "stylers": {
                            "color": "#00508b"
                        }
                    },
                    {
                        "featureType": "poi",
                        "elementType": "all",
                        "stylers": {
                            "visibility": "off"
                        }
                    },
                    {
                        "featureType": "green",
                        "elementType": "all",
                        "stylers": {
                            "color": "#056197",
                            "visibility": "off"
                        }
                    },
                    {
                        "featureType": "subway",
                        "elementType": "all",
                        "stylers": {
                            "visibility": "off"
                        }
                    },
                    {
                        "featureType": "manmade",
                        "elementType": "all",
                        "stylers": {
                            "visibility": "off"
                        }
                    },
                    {
                        "featureType": "local",
                        "elementType": "all",
                        "stylers": {
                            "visibility": "off"
                        }
                    },
                    {
                        "featureType": "arterial",
                        "elementType": "labels",
                        "stylers": {
                            "visibility": "off"
                        }
                    },
                    {
                        "featureType": "boundary", //边界线
                        "elementType": "geometry.fill",
                        "stylers": {
                            "color": "#f91024"
                        }
                    },
                    {
                        "featureType": "building", //调整建筑物颜色
                        "elementType": "all",
                        "stylers": {
                            "color": "#1a5787"
                        }
                    },
                    {
                        "featureType": "label",  //行政标注
                        "elementType": "all",
                        "stylers": {
                            "visibility": "off"
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
                        // areaColor: '#0b0c45',
                        areaColor: 'transparent',
                        borderColor: '#2b6cbe',
                        borderWidth:3,
                        shadowColor: 'rgba(45,110,192,2)',
                        shadowBlur: 40
                    },
                    emphasis: {
                        // areaColor: '#0b0c45'
                        areaColor: 'transparent'
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
                        // areaColor: '#0b0c45',
                        areaColor: 'transparent',
                        borderColor: '#2b6cbe',
                        borderWidth:1,
                        // shadowColor: 'rgba(45,110,192,2)',
                        // shadowBlur: 30,
                    },
                    emphasis: {
                        // areaColor: '#0b0c45'
                        areaColor: 'transparent'
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
            ]
            
        };

// var bmap = chart.getModel().getComponent('bmap').getBMap();
// function getBoundary(){       
//     var bdary = new BMap.Boundary();
//     bdary.get("北京市海淀区", function(rs){       //获取行政区域
//       bmap.clearOverlays();        //清除地图覆盖物       
//       var count = rs.boundaries.length; //行政区域的点有多少个
//       if (count === 0) {
//         alert('未能获取当前输入行政区域');
//         return ;
//       }
//             var pointArray = [];
//       for (var i = 0; i < count; i++) {
//         var ply = new BMap.Polygon(rs.boundaries[i], {strokeWeight: 2, strokeColor: "#ff0000"}); //建立多边形覆盖物
//         bmap.addOverlay(ply);  //添加覆盖物
//         pointArray = pointArray.concat(ply.getPath());
//       }    
//       bmap.setViewport(pointArray);    //调整视野  
//       addlabel();               
//     });   
//   }

//   setTimeout(function(){
//     getBoundary();
//   }, 2000);

//   function addlabel() {
//       var pointArray = [
//         new BMap.Point(121.716076,23.703799),
//         new BMap.Point(112.121885,14.570616),
//         new BMap.Point(123.776573,25.695422)];
//       var optsArray = [{},{},{}];
//       var labelArray = [];
  
//       for(var i = 0;i < pointArray.length; i++) {
//         optsArray[i].position = pointArray[i];
//         labelArray[i] = new BMap.Label(contentArray[i],optsArray[i]);
//         labelArray[i].setStyle({
//       color : "red",
//       fontSize : "12px",
//          height : "20px",
//          lineHeight : "20px",
//          fontFamily:"微软雅黑"
//        });
//         bmap.addOverlay(labelArray[i]);
//       }   
//   }


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
          console.log(geoCoordMap);
          var geoCoord = geoCoordMap[dataItem.name];
          var coord = chart.convertToPixel('geo',geoCoord);
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