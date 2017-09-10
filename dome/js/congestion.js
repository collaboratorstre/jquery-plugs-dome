
//卡点对旅行时间排名

var traveltime = function(containerId,data){
 
        $("#"+containerId).empty();
          if(data){
            $.each(data,function(i,n){
               progressStr = "<tr><td>"+(i+1)+"</td><td>卡点.No."+(i+1)+" - 卡点.No.2</td><td>"+n.time+"</td></tr>"
              $("#"+containerId).append($(progressStr));
            })
    }else{
      $("#"+containerId).html("<span>暂时没有数据</span>")
    }
 }
 
//本市各辖区卡点OD拥堵延迟指数
// var BJData = [
//   [{name:'牡丹区'},{name:'牡丹区',value: 20}]
// ]
var rawData = [
    {name:'牡丹区',value:[10.6]},
    {name:'鄄城县',value:[ 90.1]},
    {name:'曹县',value:[101.6]}
];
var geoCoordMap = {
  "牡丹区":[115.4231225000,35.2575260046],
  "鄄城县":[115.5166712692,35.5691801963],
  "曹县":[115.5486273308,34.8316376196],
  "陶区":[115.5712688711,35.0799378114],
  "单县":[116.0938209482,34.8001368920],
  "郓城县":[115.9500457019,35.6060749361],
  "巨野县":[116.1015347225,35.4020821605],
  "东明县":[115.0965807297,35.2958747106],
  "成武县":[115.8961774224,34.9583706200]
}

  // var convertData = function (data) {  
  //       var res = [];  
  //       for (var i = 0; i < data.length; i++) {  
  //           var dataItem = data[i];  
  //           var fromCoord = geoCoordMap[dataItem[0].name];  
  //           var toCoord = geoCoordMap[dataItem[1].name];  
  //           if (fromCoord && toCoord) {  
  //               res.push({  
  //                   fromName: dataItem[0].name,  
  //                   toName: dataItem[1].name,  
  //                   coords: [fromCoord, toCoord]  
  //               });  
  //           }  
  //       }  
  //       return res;  
  //   };  
    // var option = null;
    // 
//     var namearr = ['1'];
//     var colorarr = ['#1921ff'];
// $.get('json/菏泽市.json', function (heZe) {
//         echarts.registerMap('菏泽', heZe);
//         var myChart = echarts.init(document.getElementById('conge_delay'));

//        option = {
//                 backgroundColor:'#010b43',
//                 top : '-40%',
//                 bottom : '-40%',
//                 tooltip: {
//                     trigger: 'axis'
//                 },
//                 geo : {
//                     type : 'map',
//                     map : '菏泽',
//                     label : {
//                         normal : {
//                             textStyle : {
//                                 color : '#fff'
//                             },
//                             show : false
//                         },
//                         emphasis : {
//                             textStyle : {
//                                 color : '#C6A300'
//                             },
//                             show : false
//                         }
//                     },
//                     itemStyle : {
//                         normal : {
//                             areaColor : "rgba(0,0,0,0)",
//                             borderColor : "#126cc4",
//                             borderWidth : 1.3
//                         },
//                         emphasis : {
//                             areaColor : "rgba(233,0,200,0.3)"
//                         }
//                     }
//                 },
//                 series : []
//             }

//               function renderEachCity() {
//                                     var options = {
//                                         legend:[],
//                                         xAxis : [],
//                                         yAxis : [],
//                                         grid : [],
//                                         series : []
//                                     };
//         echarts.util.each(rawData, function(dataItem, idx) {
//         var geoCoord = geoCoordMap[dataItem.name];
//          console.log(geoCoord);
//          console.log(idx);
//         var coord = myChart.convertToPixel('geo', geoCoord);
//         console.log(coord);
//         idx += '';
        
//         options.xAxis.push({
//             id : idx,
//             gridId : idx,
//             type : 'category',
//             name : dataItem.name,
//             nameStyle : {
//                 color : '#ddd',
//                 fontSize : 12
//             },
//             nameLocation : 'middle',
//             nameGap : 3,
//             splitLine : {
//                 show : false
//             },
//             axisTick : {
//                 show : false
//             },
//             axisLabel : {
//                 show : false
//             },
//             axisLine : {
//                 show : false,
//                 lineStyle : {
//                     color : '#bbb'
//                 }
//             },
//             data : [ dataItem.name ],
//         });
//         options.yAxis.push({
//             id : idx,
//             gridId : idx,
//             show : false
//         });
//         options.grid.push({
//             id : idx,
//             width : 30,
//             height : 50,
//             left : coord[0] - 15,
//             top : coord[1] - 35,
//         });

//         for (var i = 0; i < namearr.length; i++) {
//             options.series.push({
//                 name : namearr[i],
//                 type : 'bar',
//                 stack : 'bar' + idx,
//                 xAxisId : idx,
//                 yAxisId : idx,
//                 barWidth: 20,
//                 itemStyle : {
//                     normal : {
//                         color : colorarr[i]
//                     }
//                 },
//                 data : [ dataItem.value[i] ]
//             });
//         }

//     });
//     myChart.setOption(options);
// }
// setTimeout(function(){
//     renderEachCity();
// },1);

        // var color = ['#a6c84c', '#ffa022', '#46bee9'];  
        //  var series = [];  
        //    [['牡丹区', BJData]].forEach(function (item, i) {  
        //           series.push(  
        //           {  
        //               name: item[0] + ' 客运流出量 ',  
        //               type: 'lines',  
        //               zlevel: 2,  
        //               lineStyle: {  
        //                   normal: {  
        //                       color: '#b0e24b',  
        //                       width: 20,  
        //                       opacity: 2  
        //                   }  
        //               },  
        //               data: convertData(item[1])  
        //           });  
              
        //         option = {  
        //           backgroundColor: '#ffffff',  
        //           title : {  
        //               text: '',  
        //               subtext: '',  
        //               left: 'center',  
        //               textStyle : {  
        //                   color: '#fff'  
        //               }  
        //           },  
        //           tooltip : {  
        //               trigger: 'item'  
        //           },  
        //           legend: {  
        //               orient: 'vertical',  
        //               top: 'bottom',  
        //               left: 'right',  
        //               data:[''],  
        //               textStyle: {  
        //                   color: '#fff'  
        //               },  
        //               selectedMode: 'single'  
        //           },  
        //           geo: {  
        //               map: '菏泽',  
        //               label: {  
        //                   emphasis: {  
        //                       show: false  
        //                   }  
        //               },  
        //               roam: true,  
        //               itemStyle: {  
        //             normal: {  
        //                 areaColor: '#5c8bb7',  
        //                 borderColor: '#404a59'  
        //             },  
        //             emphasis: {  
        //                 areaColor: '#3897c5'  
        //             }  
        //         }  
        //           },  
        //           series: series  
        //       }; 

        //       if (option && typeof option === "object") {  
        //           myChart.setOption(option, true);  
        //       }  
    // });
   

//本市拥堵延迟指数随时间变化趋势

// echarts.init(document.getElementById("delaytime_change")).setOption({
//      title: {
//                 text: '本市拥堵延迟指数随时间变化趋势',
//                 x:'center',
//                 textStyle: {
//                   color: "#2c83e0",
//                   fontSize: 13 
//                 }
//             },
//       tooltip : {
//         trigger: 'axis',
//         formatter: '今日{b0}:00本市拥堵延迟指数为<br/> <span style="color:#ffb401;font-size: 20px;margin-left: 90px;">{c0}</span>',
//         axisPointer: {
//             type: 'line',
//             label: {
//                 backgroundColor: 'orange'
//             }
//         }
//     },
//     grid: {
//         left: '3%',
//         right: '4%',
//         bottom: '3%',
//         containLabel: true
//     },
//     xAxis : [
//         {
//             type : 'category',
//             boundaryGap : false,
//             axisTick: {
//                         show: false
//                     },
//              axisLabel: {
//                     interval: 0,
                    
//                 },
//               splitLine: {
//                 show: true,
//                 lineStyle: {
//                        color: '#0e1450'
//                 }
//               },
//               axisLine: {
//                 onZero: false,
//                 lineStyle: {
//                     color: '#98cdff'
//                 }
//             },
//             data :[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]
//         }
//     ],
//     yAxis : [
//         {
//             type : 'value',
//             symbol: 'none',
//             axisTick: {
//               show: false
//             },
//             axisLabel:{
//               show: false
//             },
//             splitLine: {
//               lineStyle: {
//                 color: '#0e1450'
//               }
//             },
//             axisLine: {
//               show: true,
//               lineStyle:{
//                 color: '#16377e'
//               }
//             }
//         }
//     ],
//     series : [
//         {
//             name:'搜索引擎',
//             type:'line',
//             symbol: 'none',
//             stack: '总量',
//             label: {
//                 normal: {
//                     show: false,
//                     position: 'top'
//                 }
//             },
//              itemStyle : {  
//                normal : {  
//                            lineStyle:{  
//                              color:'#00f7fc' 
//                          },
//               color: new echarts.graphic.LinearGradient(
//                              0, 0, 0, 1,
//                 [
//                     {offset: 0, color: '#055ba8'},
//                     {offset: 0.3, color: '#055ba8'},
//                     {offset: 1, color: '#0f0f43'}
//                 ]
//             )
//                                 }  
//                             },  
//             areaStyle: {normal: {}},
//             data:[0,0,0,0,0,0.6,0.8,2.8,2.6,2.4,2.3,2.2,3,4,1,5,3,5,2,5,6,7,2,1]
//         }
//     ]
//  });

 //本周拥堵延迟指数排名	
var congestindex = function(containerId,data){
  console.log("datatatatat",data)
        $("#"+containerId).empty();
          if(data){
            $.each(data,function(i,n){
               progressStr = "<tr><td>"+(i+1)+"</td><td>"+n.showtime+"</td><td>"+n.ydzs+"</td></tr>"
              $("#"+containerId).append($(progressStr));
              if(n.ydzs>=3){
                 $("#"+containerId).find("tr").eq(i).find("td").eq(2).css("color","red")
              }else if(n.ydzs>=2){
                $("#"+containerId).find("tr").eq(i).find("td").eq(2).css("color","#feb300")
              }else if(n.ydzs<2){
                $("#"+containerId).find("tr").eq(i).find("td").eq(2).css("color","#07ee14")
              }
            })
    }else{
      $("#"+containerId).html("<span>暂时没有数据</span>")
    }
 }
//本市辖区拥堵延迟指数排名
var delayindex = function(containerId,data){
       
        $("#"+containerId).empty();
          if(data){
            $.each(data,function(i,n){
               progressStr = "<tr><td>"+n.name+"</td><td>"+n.indexs+" </td><td></td></tr>"
              $("#"+containerId).append($(progressStr));
               if(n.indexs>=3){
                 $("#"+containerId).find("tr").eq(i).find("td").eq(1).css("color","red")
              }else if(n.indexs>=2){
                $("#"+containerId).find("tr").eq(i).find("td").eq(1).css("color","#feb300")
              }else if(n.indexs<2){
                $("#"+containerId).find("tr").eq(i).find("td").eq(1).css("color","#07ee14")
              }
            })
    }else{
      $("#"+containerId).html("<span>暂时没有数据</span>")
    }
 }

//数据的统一处理
 var refreshData = function(){
    $.get("json/tongxingye.json",function(data){

    	traveltime('hour_content',data.lxpm);
    	congestindex('exponent_content',data.ydyczs);
        delayindex("index_content",data.yczspm)
    	    });
};
// console.log($);

$(document).ready(function(){
    refreshData();
    // setInterval(function(){
    //     refreshData();
    // },30*1000);
});


