// function getRootPath_web() {
//     //获取当前网址，如： http://localhost:8083/uimcardprj/share/meun.jsp
//     var curWwwPath = window.document.location.href;
//     //获取主机地址之后的目录，如： uimcardprj/share/meun.jsp
//     var pathName = window.document.location.pathname;
//     var pos = curWwwPath.indexOf(pathName);
//     //获取主机地址，如： http://localhost:8083
//     var localhostPaht = curWwwPath.substring(0, pos);
//     //获取带"/"的项目名，如：/uimcardprj
//     var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
//     return (localhostPaht + projectName);
// }
// var basePath = getRootPath_web();

 // 路径配置
// require.config({
//     paths : {
//         echarts : basePath + '/frame/charts/echarts-2.2.7/build/dist'
//     }
// });
var myChart;
var rainbow_chart_option;


// function drawMap(ec) {

// var zrColor = require('zrender/tool/color');
// var colorList = [
//   '#ff7f50','#87cefa','#da70d6','#32cd32','#6495ed',
//   '#ff69b4','#ba55d3','#cd5c5c','#ffa500','#40e0d0'
// ];
// var itemStyle = {
//     normal: {
//         color: function(params) {
//           if (params.dataIndex < 0) {
//             // for legend
//             return zrColor.lift(
//               colorList[colorList.length - 1], params.seriesIndex * 0.1
//             );
//           }
//           else {
//             // for bar
//             return zrColor.lift(
//               colorList[params.dataIndex], params.seriesIndex * 0.1
//             );
//           }
//         }
//     }
// };
//     myChart = ec.init(document.getElementById('id_rainbow_chart'));
// rainbow_chart_option = {
//     title: {
//         text: '卡点通行过车量统计分析',
//     },
//     color:  [
//   '#ff7f50','#87cefa','#da70d6','#32cd32','#6495ed',
//   '#ff69b4','#ba55d3','#cd5c5c','#ffa500','#40e0d0'
// ],
//     tooltip: {
//         trigger: 'axis',
//         backgroundColor: 'rgba(255,255,255,0.7)',
//         axisPointer: {
//             type: 'shadow'
//         },
//         formatter: function(params) {
//             // for text color
//             var color = colorList[params[0].dataIndex];
//             var res = '<div style="color:' + color + '">';
//             res += '<strong>' + '单位时间' + '过车（辆）</strong>'
//             for (var i = 0, l = params.length; i < l; i++) {
//                 res += '<br/>' + params[i].seriesName + ' : ' + params[i].value 
//             }
//             res += '</div>';
//             return res;
//         }
//     },
//     legend: {
//         x: 'right',
//         data:['卡点1','卡点2','卡点3','卡点4','卡点5']
//     },
//     toolbox: {
//         show: true,
//         orient: 'vertical',
//         y: 'center',
//         feature: {
//             mark: {show: true},
//             dataView: {show: true, readOnly: false},
//             restore: {show: true},
//             saveAsImage: {show: true}
//         }
//     },
//     calculable: true,
//     grid: {
//         y: 80,
//         y2: 40,
//         x2: 40
//     },
//     xAxis: [
//         {
//             type: 'category',
//             data: ['2017/3/14 7:00','2017/3/14 8:00','2017/3/14 9:00','2017/3/14 10:00','2017/3/14 11:00','2017/3/14 12:00','2017/3/14 13:00','2017/3/14 14:00']
//         }
//     ],
//     yAxis: [
//         {
//             type: 'value'
//         }
//     ],
//     series: [
//         {
//             name: '卡点1',
//             type: 'bar',
//             itemStyle: itemStyle,
//             data: [480,1444,1332,908,871,1987,1276,499]
//         },
//         {
//             name: '卡点2',
//             type: 'bar',
//             itemStyle: itemStyle,
//             data: [5506,1674,1405,1023,969,2149,1851,581]
//         },
//         {
//             name: '卡点3',
//             type: 'bar',
//             itemStyle: itemStyle,
//             data: [6040,1823,1484,1116,1063,245,2033,657]
//         },
//         {
//             name: '卡点4',
//             type: 'bar',
//             itemStyle: itemStyle,
//             data: [6311,1902,1745,1215,1118,273,2294,699]
//         },
//         {
//             name: '卡点5',
//             type: 'bar',
//             itemStyle: itemStyle,
//             data: [631,1902,1745,1215,118,273,2294,699]
//         }
//     ]
// };
                
//     myChart.setOption(rainbow_chart_option);
// }
// $(document).ready(function () {
//     document.getElementsByTagName("*").item(0).style.cursor="pointer";
//     require([
//         'echarts',
//         'echarts/chart/bar'
//     ], drawMap);


    
// });


echarts.init(document.getElementById("id_rainbow_chart")).setOption({
      title: {
        text: '卡点通行过车量统计分析',
                },
      color:  [
  '#ff7f50','#87cefa','#da70d6','#32cd32','#6495ed',
  '#ff69b4','#ba55d3','#cd5c5c','#ffa500','#40e0d0'
                ],
      tooltip: {
             trigger: 'axis',
        backgroundColor: 'rgba(255,255,255,0.7)',
        axisPointer: {
               type: 'shadow'
                    }
               },
      legend: {
        x: 'right',
         textStyle:{
                          color: 'white'
                      },
        data:['卡点1','卡点2','卡点3','卡点4','卡点5']
    },
      grid: {
        y: 80,
        y2: 40,
        x2: 40
    },
    calculable: true,
    xAxis: [
        {
            type: 'category',
            axisLabel: {
                show: true,
                textStyle: {
                  color:  'white'
                }
              },
              axisLine: {
                onZero: false,
                lineStyle: {
                    color: 'white'
                }
             },
            data: ['2017/3/14 7:00','2017/3/14 8:00','2017/3/14 9:00','2017/3/14 10:00','2017/3/14 11:00','2017/3/14 12:00','2017/3/14 13:00','2017/3/14 14:00']
        }
    ],
     yAxis: [
        {
            type: 'value',
             axisLabel: {
                show: true,
                textStyle: {
                  color:  'white'
                }
              },
            axisLine: {
                onZero: false,
                lineStyle: {
                    color: 'white'
                }
            },
        }
    ],
     series: [
        {
            name: '卡点1',
            type: 'bar',
            itemStyle: {
                  normal:{
                    // color: 'red',
                    areaColor: '#0b0c45',
                    borderColor: '#2b6cc0'
                  },
                  emphasis:{
                    areaColor: '#00a2ff'
                  }
                },
            data: [480,1444,1332,908,871,1987,1276,499]
        },
        {
            name: '卡点2',
            type: 'bar',
             itemStyle: {
                  normal:{
                    // color: 'red',
                    areaColor: '#0b0c45',
                    borderColor: '#2b6cc0'
                  },
                  emphasis:{
                    areaColor: '#00a2ff'
                  }
                },
            data: [5506,1674,1405,1023,969,2149,1851,581]
        },
        {
            name: '卡点3',
            type: 'bar',
             itemStyle: {
                  normal:{
                    // color: 'red',
                    areaColor: '#0b0c45',
                    borderColor: '#2b6cc0'
                  },
                  emphasis:{
                    areaColor: '#00a2ff'
                  }
                },
            data: [6040,1823,1484,1116,1063,245,2033,657]
        },
        {
            name: '卡点4',
            type: 'bar',
             itemStyle: {
                  normal:{
                    // color: 'red',
                    areaColor: '#0b0c45',
                    borderColor: '#2b6cc0'
                  },
                  emphasis:{
                    areaColor: '#00a2ff'
                  }
                },
            data: [6311,1902,1745,1215,1118,273,2294,699]
        },
        {
            name: '卡点5',
            type: 'bar',
             itemStyle: {
                  normal:{
                    // color: 'red',
                    areaColor: '#0b0c45',
                    borderColor: '#2b6cc0'
                  },
                  emphasis:{
                    areaColor: '#00a2ff'
                  }
                },
            data: [631,1902,1745,1215,118,273,2294,699]
        }
    ]
}) 