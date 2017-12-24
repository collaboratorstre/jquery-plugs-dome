var compositeBoard = new Object();

/*
 * 页面加载时触发
 */
$(document).ready(function () {
	var width = $("#app").width();
	var height = $("#app").height();
	$(".app-container").css("width",width);
	$(".app-container").css("height",height);
	//$(".app-container").css("background-color","rgba(224, 58, 121, 0.51)");
	$(".app-background canvas").css("width",width);
	$(".app-background canvas").css("height",height);
});


/*----------------------------------------------------------------------------------*/
/*
 *拥堵点、警情、警力分布
 */

$(function() {
	compositeBoard.WIPSJamFunc();
	setInterval(function() {
		compositeBoard.WIPSJamFunc();
	}, 1000 * 60 * 5);
});

var wIData;
var psData;
var jamData;
var timeRowArr;
compositeBoard.WIPSJamFunc = function() {
	$.ajax({
		type : "POST",
	  url : contextPathJs + "/moduleData/getHighWITimeRow.do",
    ansyc : false,
    dataType : "json",
    success : function(data) {
      timeRowArr = new Array();
      timeRowArr = data.split(",");
      $.ajax({
        type : "POST",
        url : contextPathJs + "/moduleData/getWIData.do",
        ansyc : false,
        dataType : "json",
        success : function(data) {
          wIData = new Array();
          wIData = data.split(",");
          $.ajax({
            type : "POST",
            url : contextPathJs + "/moduleData/queryPSData.do",
            ansyc : false,
            dataType : "json",
            success : function(data) {
              //alert(data);
              psData = new Array();
              psData = data.split(",");
              $.ajax({
                type : "POST",
                url : contextPathJs + "/moduleData/getJamData.do",
                ansyc : false,
                dataType : "json",
                success : function(data) {
                  jamData = new Array();
                  jamData = data.split(",");
                  setWIPSJamEcharts();
                }
              });
            }
            });
        }
      });
    }
  });
}

function setWIPSJamEcharts(){
	 var barEchartDiv=document.getElementById('areaJam');
	  var myChart = echarts.init(barEchartDiv);
	  var colors = ['#FC403F', '#F1C001', '#33CC33'];
	  var option = {
	        color: colors,
	        tooltip: {
	           trigger : 'axis',  
	                axisPointer : { // 坐标轴指示器，坐标轴触发有效  
	                    type : 'shadow' // 默认为直线，可选为：'line' | 'shadow'  
	                },
	        },
	        legend: {
	          top:'-5%',
	          textStyle:{    //图例文字的样式
	                color:'#1E5FBC',
	                fontSize:12
	            },
	            itemWidth:50,  //图例标记的图形宽度
	            itemHeight:20, //图例标记的图形高度
	            data:[
	                  {
	                      name:'警力',
	                      textStyle:{
	                          fontSize:12,
	                          fontWeight:'bolder',
	                          color:'#8CBBEF'
	                      },
	                  },
	                  {
	                      name:'警情',
	                      textStyle:{
	                          fontSize:12,
	                          fontWeight:'bolder',
	                          color:'#8CBBEF'
	                      },
	                  },
	                  {
	                    name:'拥堵',
	                    textStyle:{
	                      fontSize:12,
	                      fontWeight:'bolder',
	                      color:'#8CBBEF'
	                    },
	                  }
	              ]
	        },
	       grid: {
	          top : '20%',
	            left: '1%',
	            right: '1%',
	            bottom: '1%',
	            containLabel: true
	        },
	        xAxis: [
	            {
	                type: 'category',
	                axisTick: {
	                    alignWithLabel: true
	                },
	                axisLabel: {
	                        show: true,
	                        textStyle: {
	                            color: '#1E5FBC'
	                        }
	                    },
	                    splitLine:{  
	                        show:true,
	                        lineStyle:{
	                    color:'#0C2A85',
	                    width: 2
	                    }
	                    },
	                axisLine: {
	                  show:true,
	                    onZero: false,
	                    lineStyle: {
	                        color: '#0C2A85',
	                        width: 2
	                    }
	                },
	                boundaryGap: false,//设置xY轴在0处起始
	                data:timeRowArr
	            }
	          
	        ],
	        yAxis: [
	            {
	                type: 'value',
	                axisLabel: {
	                        show: false,
	                        textStyle: {
	                            color: '#1E5FBC'
	                        }
	                    },
	                    splitLine:{  
	                        show:true,
	                        lineStyle:{
	                    color:'#0C2A85',
	                    width: 2
	                    }
	                    },
	                    axisLine: {
	                  show:false,
	                    onZero: false,
	                    lineStyle: {
	                        color: '#0C2A85',
	                        width: 2
	                    }
	                }
	            }
	        ],
	        series: [
	            {
	                name:'拥堵',
	                type:'line',
	                smooth: true,
	                data: jamData
	            },
	            {
	                name:'警情',
	                type:'line',
	                smooth: true,
	                data:  wIData
	            },
	             {
	                name:'警力',
	                type:'line',
	                smooth: true,
	                data: psData
	            }
	        ]
	    };
	   myChart.setOption(option);
}

/*--------------------------------------------------------------*/

/*
 * 页面加载事件
 *    触发   加载全局
 */
var width;
var height;
$(function() {
	areaWIFunc();
	 setInterval(function (){
		 areaWIFunc();
	},1000*60*5);
});


var nameArr ;
var idArr ;
var valueArr;
var valueArr2;
function areaWIFunc() {
	$.ajax({
		type : "POST",
		url : contextPathJs + "/moduleData/queryAlarmEventStatisticsByTimeInterval.do",
		ansyc : false,
		dataType : "json",
		success : function(data) {
			nameArr = new Array();
			idArr = new Array();
			valueArr = new Array();
			valueArr2 = new Array();
			var name = "";
			$.each(data,function(i,v){
				idArr.push(v.disposeRegionId);
				valueArr2.push(v.eventCount);
				name += v.disposeRegionName.substring(0, 4) + ",";
				var value = "{value: "+v.eventCount+",itemStyle:{ normal:{color:'#3399FE'} }}";
				var jaon = eval('('+value+')');
				valueArr.push(jaon);
			});
			nameArr = name.substring(0, name.length-1).split(",");
			$.ajax({
				type : "POST",
				url : contextPathJs + "/moduleData/queryAlarmEventByDisposeRegionId.do",
				ansyc : false,
				data:{
					disposeRegionId:JSON.stringify(idArr),
					eventCount:JSON.stringify(valueArr2),
				},
				dataType : "json",
				success : function(data) {
					var yesRateString = data.yesRateString;
					var weekRateString = data.weekRateString;
					//alert(yesRateString);
					//alert(weekRateString);
					var arr = yesRateString.split(",");
					var arr2 = weekRateString.split(",");
					$("#yesRateString").empty();
					$("#weekRateString").empty();
					$.each(arr,function(i,v){
						var html = "";
						html += "<div><span>"+Math.abs(v)+"</span><em ";
						if (v>0) {
							html += " class='target_up'></em></div>";
						} else if(v<0){
							html += " class='target_down'></em></div>";
						} else {
							html += " class='target_no'></em></div>";
						}
						$("#yesRateString").append(html);
					});
					$.each(arr2,function(i,v){
						var html = "";
						html += "<div><span>"+Math.abs(v)+"</span><em ";
						if (v>0) {
							html += " class='target_up'></em></div>";
						} else if(v<0){
							html += " class='target_down'></em></div>";
						} else {
							html += " class='target_no'></em></div>";
						}
						$("#weekRateString").append(html);
					});
					setEcharts2();
				}
			});
		}
	});
}

function setEcharts2(){
	var barEchartDiv=document.getElementById('areaWI');
	var myChart = echarts.init(barEchartDiv);
	var option = {
			tooltip : {  
	            trigger : 'axis',  
	            axisPointer : { // 坐标轴指示器，坐标轴触发有效  
	                type : 'shadow' // 默认为直线，可选为：'line' | 'shadow'  
	            },
			},  
		    grid: {
		    	top : '5%',
		        left: '1%',
		        right: '40%',
		        bottom: '5%',
		        containLabel: true
		    },
		    xAxis: {
		        type: 'value',
		        axisLine:{  
                    lineStyle:{  
                        color:'#1E5FBC',  
                        width:2  
                    }  
                },
                splitLine:{  
                    show:true,
                    lineStyle:{
	                color:'#0C2A85',
	                width: 2
	                }
                },
                splitNumber:5
		    },
		    yAxis: {
		        type: 'category',
		        axisLine:{  
                    lineStyle:{  
                        color:'#1E5FBC',  
                        width:2  
                    }  
                }, 
		        data: nameArr
		    },
		    series: [
		        {
		            name: '辖区警情',
		            type: 'bar',
		            label: {  
		                normal: {  
		                    show: true,
		                    position: 'right'    
		                    }  
		            },  
		            barWidth : 20,
		            data: valueArr
		        }
		    ]
		};
	 myChart.setOption(option);
}

/*--------------------------------------------------------------*/
/*
 * 在岗警力TOP5
 */

$(function() {
	compositeBoard.areaPsDistributionFunc();
	setInterval(function() {
		compositeBoard.areaPsDistributionFunc();
	}, 1000 * 60 * 5);
});

var areaPsDistributionName;
var areaPsDistributionValue;
compositeBoard.areaPsDistributionFunc = function() {
	$.ajax({
		type : "POST",
		url : contextPathJs + "/moduleData/queryareaPsDistribution.do",
    ansyc : false,
    dataType : "json",
    success : function(data) {
      areaPsDistributionName = new Array();
      areaPsDistributionValue = new Array();
      var html = "";
      $(".areaps").empty();
      $.each(data,function(i,v){
        if (i<data.length-5) {
          return;
        }
        var deptName = "";
        if (v.deptName.length > 4) {
          var name = v.deptName.substring(0,4);
          deptName = name + "..";
        } else {
          deptName = v.deptName ;
        }
        areaPsDistributionName.push(deptName);
        var str = "{value: "+v.dutyCount+",itemStyle:{ normal:{color:'#3399FE'} }}";
        var strJson = eval('(' + str + ')'); 
        areaPsDistributionValue.push(strJson);
	      html += "<div><span>"+Math.abs(v.dayChain)+"</span><em "; 
	      if (v.dayChain>0) {
	        html += "class='target_up'></em></div>";
	      } else if(v.dayChain<0){
	        html += "class='target_down'></em></div>";
	      } else {
	        html += "class='target_no'></em></div>";
	      }
      });
      $(".areaps").append(html);
      compositeBoard.setAreaPsDistributionOption();
    }
  });
}

compositeBoard.setAreaPsDistributionOption = function(){
	var barEchartDiv=document.getElementById('areaPsDistribution');
	  var myChart = echarts.init(barEchartDiv);
	  var option = {
	      tooltip : {  
	              trigger : 'axis',  
	              axisPointer : { // 坐标轴指示器，坐标轴触发有效  
	                  type : 'shadow' // 默认为直线，可选为：'line' | 'shadow'  
	              },
	              //鼠标移入事件
	              formatter: function (params) {  
	                 return params[0].axisValue+":"+params[0].value;  
	          } 
	      },  
	        grid: {
	          top : '1%',
	            left: '1%',
	            right: '15%',
	            bottom: '0%',
	            containLabel: true
	        },
	        xAxis: {
	            type: 'value',
	            boundaryGap:true,
	            axisLabel: { 
	                    show: false,  
	                    textStyle:{
	                        fontSize:10 // 让字体变大
	                    },
	                  },  
	            axisLine:{  
	                    lineStyle:{  
	                        color:'#1E5FBC',  
	                        width:2  
	                    }  
	                },
	                splitLine:{  
	                    show:true,
	                    lineStyle:{
	                  color:'#0C2A85',
	                  width: 2
	                  }
	                },
	                axisTick:{
	                  inside:true
	                }
	        },
	        yAxis: {
	            type: 'category',
	            boundaryGap:true,
	            axisLine:{  
	                    lineStyle:{  
	                        color:'#1E5FBC',  
	                        width:2  
	                    }  
	                },  
	                axisTick:{
	                  inside:true
	                  
	                },
	                axisLabel:{
	                  show:true,
	                  interval:0
	                },
	            data: areaPsDistributionName
	        },
	        series: [
	            {
	                name: '辖区警力分配',
	                type: 'bar',
	                label: {  
	                    normal: {  
	                        show: true,
	                        //圆柱上显示的数字
	                        formatter: function (params) {  
	                      var res =  params.value;  
	                      return res;  
	                   } ,
	                        position: 'right'    
	                        }  
	                },  
	                barWidth : 10,
	                data: areaPsDistributionValue
	            }
	        ]
	    };
	   myChart.setOption(option);
}
/*--------------------------------------------------------------*/ 
/*
 * 今日辖区警情TOP5
 */
$(function() {
	compositeBoard.currentAreaWIFunc();
	setInterval(function() {
		compositeBoard.currentAreaWIFunc();
	}, 1000 * 60 * 5);
});

var firstData;
var secondData;
var threeData;
var dataRow;
var totalCountArr;
compositeBoard.currentAreaWIFunc = function() {
	$.ajax({
		type : "POST",
		url : contextPathJs + "/moduleData/getCurrentAreaWI.do",
		ansyc : false,
		dataType : "json",
		success : function(data) {
			firstData = new Array();
		      secondData = new Array();
		      threeData = new Array();
		      dataRow = new Array();
		      totalCountArr = new Array();
		      firstData.push('');
		      secondData.push('');
		      threeData.push('');
		      dataRow.push('');
		      totalCountArr.push(0);
		      $.each(data,function(i,v){
		        if (i<data.length-5) {
		          return;
		        }
		        if (parseInt(v.eventCount)!=0) {
		          firstData.push(v.eventCount);
		        } else {
		          firstData.push("");
		          
		        }
		        if (parseInt(v.eventCount2)!=0) {
		          secondData.push(v.eventCount2);
		        } else {
		          secondData.push("");
		        }
		        if (parseInt(v.eventCount3)!=0) {
		          threeData.push(v.eventCount3);
				} else {
					threeData.push("");
				}
				dataRow.push(v.disposeRegionName);
				totalCountArr.push(v.totalcount);
			});
			compositeBoard.setCurrentAreaWIOption();
		}
	});
}

compositeBoard.setCurrentAreaWIOption = function(){
	 var barEchartDiv=document.getElementById('currentAreaWI');
	  var myChart = echarts.init(barEchartDiv);
	  var Data =  totalCountArr;
	  var option = {
	       // 提示框
	        tooltip: {
	            backgroundColor: 'rgba(0,0,0,0.7)',     // 提示背景颜色，默认为透明度为0.7的黑色
	            borderColor: '#333',       // 提示边框颜色
	            borderRadius: 4,           // 提示边框圆角，单位px，默认为4
	            borderWidth: 0,            // 提示边框线宽，单位px，默认为0（无边框）
	            padding: 5,                // 提示内边距，单位px，默认各方向内边距为5，
	            textStyle: {
	                color: '#fff'//提示框内容颜色
	            }
	        },
	        angleAxis: {
	          boundaryGap: ['40%', '40%'],
	          axisLine:{
	            show:false
	          },
	          axisTick:{
	            show:true,
	             alignWithLabel:false,
	             interval : 3,
	          },
	          splitLine:{
	            show:false
	          },
	          axisLabel:{
	            show:false
	          }
	        },
	        radiusAxis: {
	            type: 'category',
	            data:dataRow,
	            z: 5,
	            axisLine:{
	              show:false
	            },
	            axisTick:{
	              show:true,
	              interval:2
	            },
	            axisLabel:{
	              show:true,
	              textStyle:{
	                color:'#3399FE',
	                align:'right',
	                baseline:'middle',
	                fontSize:8
	              },
	              formatter: function (value, index) {
	                  if ("" == value) {
	              return;
	            }
	                  var a = value + "     " + Data[index];
	                  return a;
	              }
	            }
	            
	        },
	        polar: {
	          center : ['50%', '50%'],    // 默认全局居中
	            radius : '85%',
	        },
	        series: [{
	            type: 'bar',
	            data: firstData,
	            coordinateSystem: 'polar',
	            barWidth:0,
	            borderWidth: 0,
	            name: '一级警情',
	            stack: 'a',
	            itemStyle : {
	              normal : {  
	                      color:function(){  
	                          return '#FF3334';   
	                          },  
	                      label : {  
	                          show : false  
	                      },  
	                      labelLine : {  
	                          show : false  
	                      }
	                  }
	              }
	        }, {
	            type: 'bar',
	            data: secondData,
	            coordinateSystem: 'polar',
	            name: '二级警情',
	            barWidth:0,
	            borderWidth: 0,
	            stack: 'a',
	            itemStyle : {
	              normal : {  
	                      color:function(){  
	                          return '#FF9933';   
	                          },  
	                      label : {  
	                          show : false  
	                      },  
	                      labelLine : {  
	                          show : false  
	                      }  
	                  }
	              }
	        }, {
	            type: 'bar',
	            //data: ['', '', 20,20,20, 20,20],
	            data: threeData,
	            coordinateSystem: 'polar',
	            name: '三级警情',
	            barWidth:0,
	            borderWidth: 0,
	            stack: 'a',
	            itemStyle : {
	            normal : {  
	                      color:function(){  
	                          return '#FEFF99';   
	                          },  
	                      label : {  
	                          show : false  
	                      },  
	                      labelLine : {  
	                          show : false  
	                      }  
	                  }
	              }
	        }],
	        legend: {
	          x:'right',
	          y: 'center',
	          top:'0%',
	          width: 190,
	          orient : 'vertical',  
	          textStyle:{    //图例文字的样式
	                color:'#1E5FBC',
	                fontSize:14
	            },
	            itemWidth:15,  //图例标记的图形宽度
	            itemHeight:15, //图例标记的图形高度
	             show: true,
	            data: ['一级警情', '二级警情', '三级警情']
	        },
	    };
	  
	   myChart.setOption(option);
}

/*--------------------------------------------------------------*/ 
/*
 * 页面加载事件
 *    触发   加载全局
 */
$(function() {
	setEcharts5();
	setInterval(function (){
		setEcharts5();
	},1000*60*5);
});

function setEcharts5(){
	var barEchartDiv=document.getElementById('jamRoadChange');
	var myChart = echarts.init(barEchartDiv);
	var colors = ['#3399FF', '#33FFFF', '#FF9933'];
	var option = {
		    color: colors,
		    tooltip: {
		        trigger: 'none',
		        axisPointer: {
		            type: 'cross' //当鼠标放到分割线上不显示信息
		        }
		    },
		    legend: {
		    	x:'center',
		    	itemWidth:50,  //图例标记的图形宽度
		        itemHeight:2,
		        data:[
		              {
		                  name:'今日',
		                  textStyle:{
		                      fontSize:12,
		                      fontWeight:'bolder',
		                      color:'#92C3F7'
		                  },
		                icon:'stack'
		              },
		              {
		                  name:'昨日',
		                  textStyle:{
		                      fontSize:12,
		                      fontWeight:'bolder',
		                      color:'#92C3F7'
		                  },
		                  icon:'stack'
		              },
		              {
		            	  name:'上周',
		            	  textStyle:{
		            		  fontSize:12,
		            		  fontWeight:'bolder',
		            		  color:'#92C3F7'
		            	  },
		            	  icon:'stack'
		              }
		          ]
		    },
		    grid: {
		        top: 35,
		        left:40,
		        bottom: 30,
		        right: 20,
		    },
		    xAxis: [
		        {
		            type: 'category',
		            axisTick: {
		                alignWithLabel: true
		            },
		            axisLabel: {
                        show: true,
                        textStyle: {
                            color: '#92C3F7'
                        }
                    },
                    splitLine:{
                        show:true,
                        lineStyle:{
		                color:'#0C2A85',
		                width: 2
		                }
                    },
		            axisLine: {
		            	show:true,
		                onZero: false,
		                lineStyle: {
		                    color: '#0C2A85',
		                    width: 2
		                }
		            },
		            boundaryGap: false,//设置xY轴在0处起始
		            data: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]
		        }
		      
		    ],
		    yAxis: [
		        {
		            type: 'value',
		            axisLabel: {
                        show: true,
                        textStyle: {
                            color: '#92C3F7'
                        }
                    },
                    splitLine:{  
                        show:true,
                        lineStyle:{
		                color:'#0C2A85',
		                width: 2
		                }
                    },
                    axisLine: {
		            	show:true,
		                onZero: false,
		                lineStyle: {
		                    color: '#0C2A85',
		                    width: 2
		                }
		            }
		        }
		    ],
		    series: [
		        {
		            name:'今日',
		            type:'line',
		            smooth: true,
		            areaStyle: {normal: {
		            	color:'blue',
		            	opacity:0.6
		            }},
		            data: [19, 25, 25, 18, 15, 20, 22, 18, 12, 18, 22, 24 ,18]
		        },
		        {
		            name:'昨日',
		            type:'line',
		            smooth: true,
		            areaStyle: {normal: {
		            	color:'red',
		            	opacity:0.2
		            }},
		            data:  [10, 17, 29, 39, 43, 20, 7, 28, 30, 42, 49, 49,36]
		        },
		         {
		            name:'上周',
		            type:'line',
		            smooth: true,
		            areaStyle: {normal: {
		            	color:'green',
		            	opacity:0.2
		            }},
		            data: [36, 7, 9, 19, 25, 30, 29, 20, 20, 27, 32, 32 ,21]
		        }
		    ]
		};
	 myChart.setOption(option);
}

/*--------------------------------------------------------------*/ 
/*
 * 页面加载事件
 *    触发   加载全局
 */
$(function() {
	getTodayWIPSFunc();
	setInterval(function (){
		getTodayWIPSFunc();
	},1000*60*5);
});

var TodayWIPSData;
var TodayWIPSData2;
var TodayWIPSDataName;
function getTodayWIPSFunc() {
	$.ajax({
		type : "POST",
		url : contextPathJs + "/moduleData/getTodayWIPSName.do",
		ansyc : false,
		dataType : "json",
		success : function(data) {
			//alert(data);
			TodayWIPSDataName = new Array();
			TodayWIPSDataName = data.split(",");
			$.ajax({
				type : "POST",
				url : contextPathJs + "/moduleData/getTodayWIPS2.do",
				ansyc : false,
				dataType : "json",
				success : function(data) {
					TodayWIPSData = new Array();
					TodayWIPSData = data.split(",");
					$.ajax({
						type : "POST",
						url : contextPathJs + "/moduleData/getTodayWIPS.do",
						dataType : "json",
						ansyc : false,
						success : function(data) {
							TodayWIPSData2 = new Array();
							TodayWIPSData2 = data.split(",");
							setEcharts6();
						}
					});
				}
			});
		}
	});
}

function setEcharts6(){
	var barEchartDiv=document.getElementById('todayWIPS');
	var myChart = echarts.init(barEchartDiv);
	var option = {
		    tooltip : {
		        trigger: 'axis',
		        axisPointer: {
		            type: 'cross',
		            label: {
		                backgroundColor: '#6a7985'
		            }
		        }
		    },
		    legend: {
		    	show:false,
		        data:[
		        	{
		                  name:'警力',
		                  textStyle:{
		                      fontSize:12,
		                      fontWeight:'bolder',
		                      color:'#236AC7'
		                  }
		              },
		              {
		                  name:'警情',
		                  textStyle:{
		                      fontSize:12,
		                      fontWeight:'bolder',
		                      color:'#5AE1ED'
		                  }
		              }
		        ]
		    },
		    grid: {
		    	top : '5%',
		        left: '5%',
		        right: '5%',
		        bottom: '8%',
		        containLabel: true
		    },
		    xAxis : [
		        {
		            type : 'category',
		            boundaryGap : false,
		            axisLine:{  
	                    lineStyle:{  
	                        color:'#0C2A85',  
	                        //width:2  
	                    }  
	                }, 
	                axisLabel:{  
	                	textStyle:{  
	                		color:'#99CCFF',  
	                		//width:2  
	                	}  
	                }, 
	                splitLine:{  
	                    show:true,
	                    lineStyle:{
		                color:'#0C2A85',
		                //width: 2
		                }
	                },
	                axisTick:{
	                	show:false
	                },
	                data:TodayWIPSDataName
		            //data : ['0','1','2','3','4','5','6','7','8','9','10','11','12']
		        }
		    ],
		    yAxis : [
		        {
		            type : 'value',
		            axisLine:{  
	                    lineStyle:{  
	                        color:'#0C2A85',  
	                        //width:2  
	                    }  
	                }, 
	                axisLabel:{  
	                	textStyle:{  
	                		color:'#99CCFF',  
	                		//width:2  
	                	}  
	                }, 
	                axisTick:{
	                	show:false
	                },
	                splitLine:{  
	                    show:true,
	                    lineStyle:{
		                color:'#0C2A85',
		                //width: 2
		                }
	                }
		        }
		    ],
		    series : [
		        {
		            name:'警情',
		            type:'line',
		            stack: '总数',
		            smooth:true,
		            areaStyle: {normal: {
		            	color:'#5AE1ED',
		            	opacity:0.5
		            }},
		            label:{
		            	normal:{
		            		show:true,
		            		position:['50%', '90%'],
		            		//offset:[0, 20],
		            		textStyle:{
		            			color:'#5AE2EA',
		            			fontSize:18
		            		},
		            		formatter:function(dataIndex){
		            			if (dataIndex.dataIndex == 8) {
		            				return '警情';
								}
		            			return '';
		            		}
		            	}
		            },
		            data:TodayWIPSData2,
		            //data:[34, 33, 35, 40, 38, 31, 31,33,31,30,32,32,34]
		        },
		        {
		            name:'警力',
		            type:'line',
		            stack: '总数',
		            smooth:true,
		            label:{
		            	normal:{
		            		show:true,
		            		position:['50%', '90%'],
		            		//offset:[0, 20],
		            		textStyle:{
		            			color:'#236AC7',
		            			fontSize:18
		            		},
		            		formatter:function(dataIndex){
		            			if (dataIndex.dataIndex == 8) {
		            				return '警力';
								}
		            			return '';
		            		}
		            	}
		            },
		            areaStyle: {normal: {
		            	color:'#2C85E9',
		            	opacity:0.2
		            }},//data值为警力总数-警情数量
		            data:TodayWIPSData,
		           //data:[26, 29, 30, 25, 22, 28, 28,27,31,32,28,27,26]
		        }
		    ]
		};
	
	 myChart.setOption(option);
}

/*--------------------------------------------------------------*/ 
$(function() {
	test01();  //简单柱状图
});

function test01(){
	var option = {
			color: ['#3398DB'],
			grid: {
				top:'5%',
				left: '5%',
				right: '5%',
				bottom: '20%',
				containLabel: true
			},
			xAxis : [
			         {
			        	 type : 'category',
			        	 data : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
			        	 axisTick: {
			        		 alignWithLabel: true
			        	 },
			        	 axisLabel:{
			        		 textStyle:{
			        			 color:"#3398DB", //刻度颜色
			        			 fontSize:12  //刻度大小
			        		 }
			        	 },
			        	 splitLine: {
			        		 show: true,
			        		 lineStyle:{
			        			 color: ["#455"],
			        			 width: 1,
			        			 type: 'solid'
			        		 }
			        	 }
			         }
			         ],
			         yAxis : [
			                  {
			                	  type : 'value',
			                	  axisLabel:{
			                		  textStyle:{
			                			  color:"#006DC7", //刻度颜色
			                			  fontSize:12  //刻度大小
			                		  }
			                	  },
			                	  splitLine: {
			                		  show: true,
			                		  lineStyle:{
			                			  color: ["#455"],
			                			  width: 1,
			                			  type: 'solid'
			                		  }
			                	  }
			                  }
			                  ],
			                  series : [
			                            {
			                            	name:'直接访问',
			                            	type:'bar',
			                            	barWidth: '20',
			                            	data:[390,334,200,52,10]
			                            }
			                            ]
	};

	// 使用刚指定的配置项和数据显示图表。
	var clazz=document.getElementById('test01');
	var myChart = echarts.init(clazz);
	myChart.setOption(option);
}

$(function () {
	test02();
});
function test02(){
	option = {
			angleAxis: {
				type: 'category',
				data: ['周一', '周二', '周三', '周四', '周五'],
				z: 10,
				startAngle: 90,
				minInterval: 20,
				axisLabel:{
					textStyle:{
						color:"#0099FE", //刻度颜色
						fontSize:12  //刻度大小
					}
				}
			},
			radiusAxis: {
				splitLine:{
					show:true,
					lineStyle:{
						color:'#6A70A3',
						opacity:0.3,
						shadowColor:'red'
					}
				},
				axisLine:{
					show:true,
					lineStyle:{
						color:'#6A70A3',
						opacity:1
					}
				},
				axisLabel:{
					textStyle:{
						color:'white',
						align:'right',
						fontSize:10
					}
				},
				splitArea:{
					show:false,
					areaStyle:{
						color:'#09217B',
					}
				}
				//nameLocation:'middle'
			},
			polar: {
				z:0,
				radius:'60%'
			},
			series: [{
				type: 'bar',
				data: [1, 2, 3, 4, 3],
				coordinateSystem: 'polar',
				z:0,
				name: '今日',
				stack: 'a',
				itemStyle:{
					normal:{
						color: function (){return "#0099FE"; }
					}
				}
			}, {
				type: 'bar',
				data: [2, 4, 6, 1, 3],
				coordinateSystem: 'polar',
				name: '昨日',
				stack: 'a',
				itemStyle:{
					normal:{
						color: function (){return "#00FF4B"; }
					}
				}
			}, {
				type: 'bar',
				data: [1, 2, 3, 4, 1],
				coordinateSystem: 'polar',
				name: '上周',
				stack: 'a',
				itemStyle:{
					normal:{
						color: function (){return "#FFBB00"; }
					}
				}
			}],
			legend: {
				show: true,
				data: ['今日', '昨日', '上周'],
				textStyle:{    //图例文字的样式
					color:'#0099FE',
					fontSize:12
				}
			}
	};

	//使用刚指定的配置项和数据显示图表。
	var clazz=document.getElementById('test02');
	var myChart = echarts.init(clazz);
	myChart.setOption(option);
}
/*--------------------------------------------------------------*/ 
$(function() {
	test03();
});

function test03(){
	option = {
			legend: {
				data:['昨天','今天'],
				textStyle:{    //图例文字的样式
					color:'#006DC7',
					fontSize:12
				},
				itemHeight:2	//图例图形高度
				//itemWidth:40	//图例图形高度
			},
			 grid: {
	    	top : '15%',
	        left: '5%',
	        right: '5%',
	        bottom: '5%',
	        containLabel: true
	    },
			xAxis : [
			         {
			        	 type : 'category',
			        	 data : ['1月','2月','3月','4月','5月'],
			        	 axisLabel:{
			        		 textStyle:{
			        			 color:"#006DC7", //刻度颜色
			        			 fontSize:12  //刻度大小
			        		 }
			        	 },
			        	 splitLine: {
			        		 show: true,
			        		 lineStyle:{
			        			 color: ["#455"],
			        			 width: 1,
			        			 type: 'solid'
			        		 }
			        	 }
			         }
			         ],
			         yAxis : [
			                  {
			                	  type : 'value',
			                	  axisLabel:{
			                		  textStyle:{
			                			  color:"#006DC7", //刻度颜色
			                			  fontSize:12  //刻度大小
			                		  }
			                	  },
			                	  splitLine: {
			                		  show: true,
			                		  lineStyle:{
			                			  color: ["#455"],
			                			  width: 1,
			                			  type: 'solid'
			                		  }
			                	  }
			                  }
			                  ],
			                  series : [
			                            {
			                            	name:'昨天',
			                            	type:'bar',
			                            	data:[2.0, 4.9, 7.0, 23.2, 25.6],
			                            	barGap:'0.5%',
			                            	itemStyle:{
			                            		normal:{
			                            			color: function (){return "#FFD306"; }
			                            		}
			                            	}
			                            },
			                            {
			                            	name:'今天',
			                            	type:'bar',
			                            	data:[2.6, 5.9, 9.0, 26.4, 28.7],
			                            	barGap:'0.5%',
			                            	itemStyle:{
			                            		normal:{
			                            			color: function (){return "#3398DB"; }
			                            		}
			                            	},
			                            	barWidth : 15//柱图宽度
			                            }
			                            ]
	};
//	使用刚指定的配置项和数据显示图表。
	var clazz=document.getElementById('test03');
	var myChart = echarts.init(clazz);
	myChart.setOption(option);
}
/*--------------------------------------------------------------*/ 
$(function() {
	test05();
});
function test05(){
	option = {
			calculable : true,
			//backgroundColor: '#F9713C',
			radar: {
				// shape: 'circle',
				indicator: [
				            { name: '销售', max: 6500},
				            { name: '管理', max: 16000},
				            { name: '信息技术', max: 30000,axisLabel: {show: true, textStyle: {fontSize: 12, color: '#FDFFFF'}}},
				            { name: '客服', max: 38000},
				            { name: '研发', max: 52000},
				            { name: '市场', max: 25000}
				            ],
				            radius : '70%',
				            startAngle:0,
				            center:["50%","45%"],
				            splitLine: {
				            	show:true,
				            	lineStyle: {
				            		color: '#006DC7'
				            	}
				            },
				            axisLine: { 
				            	show:true,
				            	lineStyle: {
				            		color: '#006DC7'
				            	}
				            }
			},
			series: [{
				type: 'radar',
//				areaStyle: {
//					normal: {
//						type: 'normal',
//						color: 'rgba(0, 0, 0, 0.5)',
//						opacity:0,
//						shadowBlur:{
//							shadowColor: 'rgba(0, 0, 0, 0.5)',
//							shadowBlur: 10
//						}
//					}
//
//				},
				itemStyle: {
	                normal: {
	                    areaStyle: {
	                        type: 'default',
	                        color: '#006DC7'
	                    }
	                }
	            },
				data : [
				        {
				        	value : [5000, 14000, 28000, 31000, 42000, 21000],
				        	name : '实际开销',
//				        	areaStyle: {
//				        		normal: {
//				        			type: 'normal',
//				        			color: '',
//				        			opacity:0,
//				        			shadowBlur:{
//				        				shadowColor: 'rgba(0, 0, 0, 0.5)',
//				        				shadowBlur: 10
//				        			}
//				        		}
//
//				        	},
				        	lineStyle:{
				        		normal: {
				        			type: 'normal',
				        			color: '#006DC7'
				        		}
				        	}
				         }
				        ]
			}]
	};
//	使用刚指定的配置项和数据显示图表。
	var clazz=document.getElementById('test05');
	var myChart = echarts.init(clazz);
	myChart.setOption(option);
}
/*--------------------------------------------------------------*/ 
$(function() {
	test10();
});
function test10(){
	var html='<tr bgcolor="#002D70"><td style="width:50%;">路段名称</td><td>&nbsp;&nbsp;</td><td align="center" >拥堵时长（分钟）</td><td>&nbsp;&nbsp;</td><td style="width:40%;">日环比</td></tr>';
	for(var i=0;i<6;i++){
		var progress='<div class="votebox" >'+
		'<dl class="barbox">'+
		'<dd class="barline">'+
		'<div w="70" style="width:0px;" class="charts" value="50"><div style="float: right;color:#FFF;padding: 1px 10px 0px 0px;">150</div></div>'+
		'</dd>'+
		'</dl>'+
		'</div>';
		html+='<tr ><td>名称'+i+'</td><td></td><td>'+progress+'</td><td></td><td>日环比</td></tr>';
	}
	$('#test10 table').html(html);
	animate();
}
function animate(){
	$(".charts").each(function(i,item){
		var a=parseInt($(item).attr("w"));
		$(item).animate({
			width: a+"%"
		},1000);
	});
}

$(function() {
	test20();
});
function test20(){
	var html='<tr><th>路段名称</th><th align="center" >拥堵时长（分钟）</th><th>日环比</th></tr>';
	for(var i=0;i<6;i++){
		var progress='<div class="votebox" >'+
		'<dl class="barbox">'+
		'<dd class="barline">'+
		'<div w="70" style="width:0px;" class="charts" value="50"><div style="float: right;color:#FFF;padding: 1px 10px 0px 0px;">150</div></div>'+
		'</dd>'+
		'</dl>'+
		'</div>';
		html+='<tr ><td>名称'+i+'</td><td>'+progress+'</td><td>38<em  class="target_up"></em></td></tr>';
	}
	$('#test20 table').html(html);
	animate2();
}
function animate2(){
	$(".charts").each(function(i,item){
		var a=parseInt($(item).attr("w"));
		$(item).animate({
			width: a+"%"
		},1000);
	});
}
/*--------------------------------------------------------------*/ 

/*--------------------------------------------------------------*/ 
$(function() {
	getWIProportionFunc();
	setInterval(function (){
		getWIProportionFunc();
	},1000*60*5);
});

var WIProportionValue;
function getWIProportionFunc() {
	$.ajax({
		type : "POST",
		url : contextPathJs + "/moduleData/getWIProportion.do",
		ansyc : false,
		dataType : "json",
		success : function(data) {
			WIProportionValue = new Array();
			$.each(data,function(i,v){
				var value = '{value:'+v.totalcount+', name:"'+v.disposeRegionName+'"}';
				var json = eval('('+value+')');
				WIProportionValue.push(json);
			});
			$.ajax({
				type : "POST",
				url : contextPathJs + "/moduleData/getHighWINum.do",
				ansyc : false,
				dataType : "json",
				success : function(data) {
					$("#WINumRate").empty();
					$("#WINumRate").empty();
					$("#WINumRate").append(data.count);
					$("#WINumRates").append(data.rate);
					test12();
				}
			});
		}
	});
}

function test12(){
	option = {
			color:['#FFC433', '#FF9024','#0097EF','#00D045','#FF5855'],
			series: [
			         {
			        	 name:'访问来源',
			        	 type:'pie',
			        	 selectedMode: 'single',
			        	 radius: [0, '30%'],

			        	 label: {
			        		 normal: {
			        			 position: 'inner'
			        		 }
			        	 },
			        	 labelLine: {
			        		 normal: {
			        			 show: false
			        		 }
			        	 }
			         },
			         {
			        	 name:'访问来源',
			        	 type:'pie',
			        	 radius: ['40%', '30%'],

			        	 data:WIProportionValue
			         }
			         ]
	};
//	使用刚指定的配置项和数据显示图表。
	var clazz=document.getElementById('test12');
	var myChart = echarts.init(clazz);
	myChart.setOption(option);
}
/*--------------------------------------------------------------*/ 
$(function() {
	getPSNoDutyRateFunc();
	setInterval(function (){
		getPSNoDutyRateFunc();
	},1000*60*5);
});

var PSDutyRateValue;
function getPSNoDutyRateFunc() {
	$.ajax({
		type : "POST",
		url : contextPathJs + "/moduleData/getPSNoDutyRate.do",
		ansyc : false,
		dataType : "json",
		success : function(data) {
			$("#noDutyRate").empty();
			$("#noDutyRate").append(data);
			$.ajax({
				type : "POST",
				url : contextPathJs + "/moduleData/getPSDutyRate.do",
				ansyc : false,
				dataType : "json",
				success : function(data) {
					PSDutyRateValue = new Array();
					$.each(data,function(i,v){
						var value = '{value:'+v.dutyCount+', name:"'+v.deptName+'"}';
						var json = eval('('+value+')');
						PSDutyRateValue.push(json);
					});
					test13();
				}
			});
		}
	});
}


function test13(){
	option = {
			color:['#FFC433', '#FF9024','#0097EF','#00D045','#FF5855'],
			series : [
			          {
			        	  name: '访问来源',
			        	  type: 'pie',
			        	  radius : '35%',
			        	  center: ['50%', '60%'],

			        	  data:PSDutyRateValue

			          ,
			          itemStyle: {
			        	  emphasis: {
			        		  shadowBlur: 10,
			        		  shadowOffsetX: 0,
			        		  shadowColor: 'rgba(0, 0, 0, 0.5)'
			        	  }
			          }
			          }
			          ]
	};

//	使用刚指定的配置项和数据显示图表。
	var clazz=document.getElementById('test13');
	var myChart = echarts.init(clazz);
	myChart.setOption(option);
}
/*--------------------------------------------------------------*/ 

$(function () {
	currentWINum();
	setInterval(function (){
		currentWINum();
	},1000*60*5);
});

function currentWINum() {
	$.ajax({
		type : "POST",
		url : contextPathJs + "/moduleData/queryCurrentWINum.do",
		ansyc : false,
		dataType : "json",
		success : function(data) {
			$("#currentWINum").empty();
			var html = "";
			html += "<div><p style='color: #2471CF'>当前警情数</p><p><span>"+data.wiNum+"</span><em>起</em></p></div>";
			html += "<div>";
			html += "<ul>";
			var dayChain = Math.abs(data.dayChain);
			html += "<li><span style='color: #2471CF'>日环比</span><em>"+dayChain+"</em><i ";
			if (data.dayChain>0) {
				html += "class='app-conmain-icon-up'></i></li>";
			} else if(data.dayChain<0){
				html += "class='app-conmain-icon-down'></i></li>";
			} else {
				html += "class='class='target_no'></i></li>";
			}
			var weekChain = Math.abs(data.weekChain);
			html += "<li><span style='color: #2471CF'>周环比</span><em>"+weekChain+"</em><i ";
			if (data.weekChain>0) {
				html += "class='app-conmain-icon-up'></i></li>";
			} else if(data.weekChain<0){
				html += "class='app-conmain-icon-down'></i></li>";
			} else {
				html += "class='class='target_no'></i></li>";
			}
			html += "</ul>";
			html += "</div>";
			$("#currentWINum").append(html);
		}
	});
}
/*--------------------------------------------------------------*/ 

$(function () {
	currentPSNum();
	setInterval(function (){
		currentPSNum();
	},1000*60*5);
});

function currentPSNum() {
	$.ajax({
		type : "POST",
		url : contextPathJs + "/moduleData/queryCurrentPSNum.do",
		ansyc : false,
		dataType : "json",
		success : function(data) {
			$("#currentPSNum").empty();
			var html = "";
			html += "<div><p>当前警力</p><p><span>"+data.psNum+"</span><em>名</em></p></div>";
			html += "<div>";
			html += "<ul>";
			var dayChain = Math.abs(data.dayChain);
			html += "<li><span style='color: #2471CF'>日环比</span><em>"+dayChain+"</em><i ";
			if (data.dayChain>0) {
				html += "class='app-conmain-icon-up'></i></li>";
			} else if(data.dayChain<0){
				html += "class='app-conmain-icon-down'></i></li>";
			} else {
				html += "></i></li>";
			}
			var weekChain = Math.abs(data.weekChain);
			html += "<li><span style='color: #2471CF'>周环比</span><em>"+weekChain+"</em><i ";
			if (data.weekChain>0) {
				html += "class='app-conmain-icon-up'></i></li>";
			} else if(data.weekChain<0){
				html += "class='app-conmain-icon-down'></i></li>";
			} else {
				html += "></i></li>";
			}
			html += "</ul>";
			html += "</div>";
			$("#currentPSNum").append(html);
		}
	});
}
/*--------------------------------------------------------------*/ 
/*
 * 今日重大警情
 */
$(function(){
	compositeBoard.todayFirstWI();
	setInterval(function() {
	  compositeBoard.todayFirstWI();
	}, 1000 * 60 * 5);
});

var scrollIndex=0;
var startTimer=null;

compositeBoard.todayFirstWI = function() {
	$.ajax({
		type : "POST",
		url : contextPathJs + "/moduleData/getTodayFirstWI.do",
		ansyc : false,
		dataType : "json",
		success : function(data) {
			$("#pText").empty();
			var decName = data.split("/");
			if (data == "") {
				var  html = "<li>暂无</li>";
			    $("#pText").append(html);
			} else {
				$.each(decName,function(i,v){
					var  html = "<li>"+v+"</li>";
					$("#pText").append(html);
				});
			}
		}
	});
}


/*--------------------------------------------------------------*/ 
/*
 * 高发警情区域 top5
 */
var HighWIName;
$(function () {
	getHighWIFunc();
	setInterval(function (){
		getHighWIFunc();
	},1000*60*5);
});

function getHighWIFunc() {
	$.ajax({
		type : "POST",
		url : contextPathJs + "/moduleData/getHighWITimeRow.do",
		ansyc : false,
		dataType : "json",
		success : function(data) {
			HighWIName = new Array();
			HighWIName = data.split(",");
			$.ajax({
				type : "POST",
				url : contextPathJs + "/moduleData/getHighWI.do",
				ansyc : false,
				dataType : "json",
				success : function(data) {
					$("#highWIArea").empty();
					var count1 = data.count1;
					//alert(count1);
					var count1Arr = count1.split(",");
					var count2 = data.count2;
					var count2Arr = count2.split(",");
					var count3 = data.count3;
					var count3Arr = count3.split(",");
					var count4 = data.count4;
					var count4Arr = count4.split(",");
					var count5 = data.count5;
					var count5Arr = count5.split(",");
					var html = '';
					html += '<tr>';
					$.each(count1Arr,function(j,va){
						if (j == 0) {
							html += "<th style='color: #8CBBEF;'>"+va+"</th>";
						} else {
							html += '<th style="background-color: #9B2347;color: white;" >'+va+'</th>';
						}
					});
					html += '</tr>';
					html += '<tr>';
					$.each(count2Arr,function(j,va){
						if (j == 0) {
							html += "<th style='color: #8CBBEF;'>"+va+"</th>";
						} else {
							html += '<th style="background-color: #9B2347;color: white;" >'+va+'</th>';
						}
					});
					html += '</tr>';
					html += '<tr>';
					$.each(count3Arr,function(j,va){
						if (j == 0) {
							html += "<th style='color: #8CBBEF;'>"+va+"</th>";
						} else {
							html += '<th style="background-color: #9B2347;color: white;" >'+va+'</th>';
						}
					});
					html += '</tr>';
					html += '<tr>';
					$.each(count4Arr,function(j,va){
						if (j == 0) {
							html += "<th style='color: #8CBBEF;'>"+va+"</th>";
						} else {
							html += '<th style="background-color: #9B2347;color: white;" >'+va+'</th>';
						}
					});
					html += '</tr>';
					html += '<tr>';
					$.each(count5Arr,function(j,va){
						if (j == 0) {
							html += "<th style='color: #8CBBEF;'>"+va+"</th>";
						} else {
							html += '<th style="background-color: #9B2347;color: white;" >'+va+'</th>';
						}
					});
					html += '</tr>';
					
					html += "<tr style='color: #8CBBEF;'>";
					html += "<th></th>";
					$.each(HighWIName,function(i,v){
						html += "<th>"+v+"</th>";
					});
					//html += "<th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th><th>8</th><th>9</th><th>10</th><th>11</th><th>12</th>";
					html += "</tr> ";
					$("#highWIArea").append(html);
				}
			});
		}
	});
}

/*--------------------------------------------------------------*/ 
/*
 * 今日重大警情和处理结果
 */
$(function () {
	getHighWIResult();
	setInterval(function (){
		getHighWIResult();
	},1000*60*5);
});


function getHighWIResult() {
	$.ajax({
		type : "POST",
		url : contextPathJs + "/moduleData/getHighWIResult.do",
		ansyc : false,
		dataType : "json",
		success : function(data) {
			$("#highWIResult").empty();
			var html = "";
			$.each(data,function(i,v){
				if (i>4) {
					return;
				}
				html += "<tr><td><em>"+(i+1)+"</em></td><td  align='left'>"+v.alarmDesc+"</td><td><span";
				if (v.alarmStatus == "派警") {
					html += " class='tips_red'>已派警</span></td></tr>";
				} else if(v.alarmStatus == "处结"){
					html += " class='tips_green'>已处结</span></td></tr>";
				} else {
					html += " class='tips_yellow'>处理中</span></td></tr>";
				}
			});
			$("#highWIResult").append(html);
		}
	});
}

/*--------------------------------------------------------------*/ 
/*
 * 平峰警情数量地图下小组件
 */
$(function () {
	getPFWIFunc();
	setInterval(function (){
		getPFWIFunc();
	},1000*60*5);
});


function getPFWIFunc() {
	$.ajax({
		type : "POST",
		url : contextPathJs + "/moduleData/getPFWINum.do",
		ansyc : false,
		dataType : "json",
		success : function(data) {
			$("#PFWINum").empty();
			var html = "";
			$.each(data,function(i,v){
				html += "<li><div><p>"+v.disposeRegionName+"</p><span>"+v.totalcount+"</span><em></em></div></li>";
			});
			$("#PFWINum").append(html);
		}
	});
}
/*--------------------------------------------------------------*/ 
/*
 * 平峰地图上方组件
 */
$(function () {
	getJamNumFunc();
	setInterval(function (){
		getJamNumFunc();
	},1000*60*5);
});


function getJamNumFunc() {
	$.ajax({
		type : "POST",
		url : contextPathJs + "/moduleData/getJamNum.do",
		ansyc : false,
		dataType : "json",
		success : function(data) {
			$("#currentAverageCarNum").empty();
			$("#currentRoadCarNum").empty();
			var activeVehicle = "";
			var vehicleInMiles = "";
			$.each(data,function(i,v){
				if (i>0) {
					return;
				}
				activeVehicle = v.activeVehicle;
				vehicleInMiles = v.vehicleInMiles; 
			});
			$("#currentRoadCarNum").append(vehicleInMiles);
			$("#currentAverageCarNum").append(activeVehicle);
		}
	});
}
/*--------------------------------------------------------------*/ 
/*
 * 综合看板地图下方组件
 */
$(function () {
	getTotalJamNumFunc();
	setInterval(function (){
		getTotalJamNumFunc();
	},1000*60*5);
});


function getTotalJamNumFunc() {
	$.ajax({
		type : "POST",
		url : contextPathJs + "/moduleData/getTotalJamNum.do",
		ansyc : false,
		dataType : "json",
		success : function(data) {
			$("#todayCarNum").empty();
			$("#currentCarNum").empty();
			$("#currentAverageCarNum2").empty();
			$("#todayCarNum2").empty();
			$("#currentCarNum2").empty();
			$("#currentAverageCarNum3").empty();
			//var todayCarNum = "0";
			var currentCarNum = "0";
			var currentAverageCarNum = "0";
			$.each(data,function(i,v){
				if (i>0) {
					return;
				}
				//todayCarNum = v.totalVehicle;
				currentCarNum = v.activeVehicle;
				currentAverageCarNum = v.vehicleInMiles;
			});
			/*if (todayCarNum.length>5) {
				var wan =parseInt(todayCarNum)/10000;
				$("#todayCarNum2").append("今日机动车总量(万辆)");
				$("#todayCarNum").append(wan.toFixed(2));
			} else {
				$("#todayCarNum2").append("今日机动车总量(辆)");
				$("#todayCarNum").append(todayCarNum);
				
			}*/
			if (currentCarNum.length>5) {
				var wan =parseInt(currentCarNum)/10000;
				$("#currentCarNum2").append("当前活动车辆(万辆)");
				$("#currentCarNum").append(wan.toFixed(2));
			} else {
				$("#currentCarNum2").append("当前活动车辆(辆)");
				$("#currentCarNum").append(currentCarNum);
				
			}
			if (currentAverageCarNum.length>5) {
				var wan =parseInt(currentAverageCarNum)/10000;
				$("#currentAverageCarNum3").append("当前车辆数(万辆)/公里");
				$("#currentAverageCarNum2").append(wan.toFixed(2));
			} else {
				$("#currentAverageCarNum3").append("当前车辆数(辆)/公里");
				$("#currentAverageCarNum2").append(currentAverageCarNum);
				
			}
		}
	});
}


$(function() {
	scrollTime();
});

function scrollTime() {
	 var scrollIndex=0;
	 var startTimer=null;
	 function scroll_f(){
	  clearInterval(startTimer);
	  var ul=$("#scroll ul");
	  var li=ul.children("li");
	  var h=li.height();
	  //var index=0;
	  ul.css("height",h*li.length*2);
	  ul.html(ul.html()+ul.html());    
	     function run()
	         {
		         if(scrollIndex>=li.length){
		          ul.css({top:0});
		          scrollIndex=1;
		          ul.animate({top:-scrollIndex*h},500);
		          console.log("x"+ -scrollIndex*h);
		         } 
		         else{
		          scrollIndex++; 
		 
		          ul.animate({top:-scrollIndex*h},500);
		          console.log("Y"+ -scrollIndex*h);
		         }
	         }
	     startTimer=setInterval(run,1500); 
	 }
	 $(function(){
	  scroll_f();
	 });
}
	
		

		
