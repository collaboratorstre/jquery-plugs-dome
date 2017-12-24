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

function currentTrafficNum(data) {
      var day="",month="";
      var flagDay="target_up",flagMonth="target_up";
	  day=parseInt(data.day);
      month=parseInt(data.month);
		if(day<0){
			day=-day;
			flagDay="target_down";
		}else if(day==0){
			flagDay="target_no";
		}
		if(month<0){
			month=-month;
			flagMonth="target_down";
		}else if(month==0){
			flagMonth="target_no";
		}
		
		var html='<div><p>交通管理指数</p><p><span>'+data.now+'</span><em></em></p></div>'
		+'<div><ul><li></li><li><span>日环比</span><em>'+day+'</em>'+flagDay+'</li>'
		+'<li><span>周环比</span><em>'+month+'</em>'+flagMonth+'</li>'
		+'</ul></div></div>';
		$("#currentTrafficNum").empty();
      $("#currentTrafficNum").append(html);
   }
/*---------------------调用接口方法-----------------------------------------*/ 
$(function() {
	

	/**还未调通的**/
	//交通管理指数
//	var param={'beginTime':'2017-08-01 00:00','endTime':'2017-08-02 00:00'};
//	ajaxUtil.interfaceUtil(contextPathJs+'/moduleData/queryCurrentTrafficNum.do',param,currentTrafficNum);
	
	
	//本月违法高发地点top5
//	var param={'timeParam':'2017-08-01'};
//	ajaxUtil.interfaceUtil(contextPathJs+'/moduleData/queryFrequentViolationRoadInfos.do',param,vioHight);
	/**已经调通了**/
	
	
	/**修改过时间的**/
	//违法数量和类型分布
//	var param={'violationType':'','beginTime':'2017-08-01 00:00:00','endTime':'2017-08-02 00:00:00'};
//	ajaxUtil.interfaceUtil(contextPathJs+'/moduleData/queryViolationRadia.do',param,vioRadia);
	
	//今日常堵路段top5 不通
//	var param={'timeParam':'2017-08-01 00:00:00'};
//	ajaxUtil.interfaceUtil(contextPathJs+'/moduleData/queryJamRoadRanksByDay.do',param,jamRoadByDay);
	//拥堵专题-今日敏感道路拥堵变化(test01) 不通
//	var param={'timeParam':'2017-08-01 00:00'};
//	ajaxUtil.interfaceUtil(contextPathJs+'/moduleData/querySensitiveRoad01.do',param,sensitiveRoadByDay);
	
	
	//今日拥堵路段数量变化趋势
//	var param={'beginTime':'2017-08-01 00','endTime':'2017-08-02 00'};
//	ajaxUtil.interfaceUtil(contextPathJs+'/moduleData/queryHourlyJamRoadsStatstics.do',param,jamRoadNum);
	//当月违法次数(00)
//	var param={'violationType':'','beginTime':'2017-07-01 00:00','endTime':'2017-08-01 00:00'};
//	ajaxUtil.interfaceUtil(contextPathJs+'/moduleData/queryVioStatusByDay.do',param,vioIndex);
	//当前拥堵指数(00等于号的图标有问题)
//	var param={'beginTime':'2017-08-01 00:00','endTime':'2017-08-02 00:00'};
//	ajaxUtil.interfaceUtil(contextPathJs+'/moduleData/queryCityJamInfosByDay.do',param,jamIndex);
	//当前常堵路段拥堵top5(00数据不正确)
//	var param={'timeParam':'2017-08-01 00:00'};
//	ajaxUtil.interfaceUtil(contextPathJs+'/moduleData/queryJamRoadRanks.do',param,test10);
//	//当前敏感路段拥堵top5(联通了但数据不对)
//	var param={'timeParam':'2017-08-01 00:00'};
//	ajaxUtil.interfaceUtil(contextPathJs+'/moduleData/querySensitiveRoadRanks.do',param,test20);
	//仪表盘11
//	var param={'beginTime':'2017-08-01 00:00','endTime':'2017-08-02 00:00'};
//	ajaxUtil.interfaceUtil(contextPathJs+'/moduleData/queryCityJamInfos.do',param,PointerTable);
	//违法类型数量变化top5 11
	//var param={'violationType':'','beginTime':'2017-08-01 00:00:00','endTime':'2017-08-02 00:00:00'};
	//ajaxUtil.interfaceUtil(contextPathJs+'/moduleData/queryViolationStatisticsByType.do',param,vioTypeNumChange);
	//设备专题11
//	var param={'outdoorParam':'02','deviceTypeId':''};
//	ajaxUtil.interfaceUtil(contextPathJs+'/moduleData/queryDeviceStatusesByType.do',param,equipStatus);
	//今日影响交通的因素11
//	var param={'dateTime':'2017-08-01','isDataValid':''};
//	ajaxUtil.interfaceUtil(contextPathJs+'/moduleData/queryTrafficFactors.do',param,trafficElem);
	
});
function vioHight(data){
	var html='';
	if(data!=null){
		for(var i=0;i<data.length;i++){
			html+='<tr><td  align="left" >西直门外大街</td><td>45</td><td>8</td><td><span class="unblocked">畅通</span></td></tr>';
		}
	}
	$('.vioHight').append(html);
}


function jamRoadNum(data){
	if(data!=null){
		var seriesArr1=data.seriesData1.split(',');
		var seriesArr2=data.seriesData2.split(',');
		var seriesArr3=data.seriesData3.split(',');
		var xAxisDataArr=data.xAxisData.split(',');
		//控件加载
		setEcharts5(xAxisDataArr,seriesArr1,seriesArr2,seriesArr3);
  }
}
	//今日拥堵路段数量变化趋势
	function setEcharts5(xAxisDataArr,seriesArr1,seriesArr2,seriesArr3){
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
			            //data: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]
			            data:xAxisDataArr
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
//			            data: [19, 25, 25, 18, 15, 20, 22, 18, 12, 18, 22, 24 ,18]
			            data:seriesArr1
			        },
			        {
			            name:'昨日',
			            type:'line',
			            smooth: true,
			            areaStyle: {normal: {
			            	color:'red',
			            	opacity:0.2
			            }},
//			            data:  [10, 17, 29, 39, 43, 20, 7, 28, 30, 42, 49, 49,36]
			            data:seriesArr2
			        },
			         {
			            name:'上周',
			            type:'line',
			            smooth: true,
			            areaStyle: {normal: {
			            	color:'green',
			            	opacity:0.2
			            }},
//			            data: [36, 7, 9, 19, 25, 30, 29, 20, 20, 27, 32, 32 ,21]
			            data:seriesArr3
			        }
			    ]
			};
		 myChart.setOption(option);
	}	


	function test01(xAxisDataArr,seriesArr1){
		var option = {
				tooltip : {  
		            trigger : 'axis',  
		            axisPointer : { // 坐标轴指示器，坐标轴触发有效  
		                type : 'shadow' // 默认为直线，可选为：'line' | 'shadow'  
		            },
		            //鼠标移入事件
		            formatter: function (params) {  
				           return params[0].value+" 分钟";  
				    } 
				}, 
				color: ['#3398DB'],
				grid: {
					left: '3%',
					right: '4%',
					bottom: '20%',
					containLabel: true
				},
				xAxis : [
				         {
				        	 type : 'category',
				        	 data : xAxisDataArr,
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
				                            	name:'数据',
				                            	type:'bar',
				                            	barWidth: '20',
				                            	data:seriesArr1
				                            }
				                            ]
		};

		// 使用刚指定的配置项和数据显示图表。
		var clazz=document.getElementById('test01');
		var myChart = echarts.init(clazz);
		myChart.setOption(option);
	}

	function test02(xAxisDataArr,seriesArr1,seriesArr2,seriesArr3){
	    option = {
	        angleAxis: {
	          type: 'category',
//	          data: ['周一', '周二', '周三', '周四', '周五'],
	          data:xAxisDataArr,
	          z: 10,
	          startAngle: 90,
	          minInterval: 20,
//	          axisLabel:{
//	            textStyle:{
//	              color:"#0099FE", //刻度颜色
//	              fontSize:12  //刻度大小
//	            }
//	          }
	        },
//	        radiusAxis: {
//	          axisLine:{
//	            lineStyle:{
//	              color:"#FFF", //刻度颜色
//	            }
//	          }
//	        },
	        polar: {
	          z:0,
	          radius:'50%'
	        },
	        series: [{
	          type: 'bar',
//	          data: [1, 2, 3, 4, 3],
	          data:seriesArr1,
	          coordinateSystem: 'polar',
	          z:0,
	          name: '今日',
	          stack: 'a',
	          itemStyle:{
	            normal:{
	              color: function (value){return "#0099FE"; }
	            }
	          }
	        }, {
	          type: 'bar',
//	          data: [2, 4, 6, 1, 3],
	          data:seriesArr2,
	          coordinateSystem: 'polar',
	          name: '昨日',
	          stack: 'a',
	          itemStyle:{
	            normal:{
	              color: function (value){return "#00FF4B"; }
	            }
	          }
	        }, {
	          type: 'bar',
//	          data: [1, 2, 3, 4, 1],
	          data:seriesArr3,
	          coordinateSystem: 'polar',
	          name: '上周',
	          stack: 'a',
	          itemStyle:{
	            normal:{
	              color: function (value){return "#FFBB00"; }
	            }
	          }
	        }],
	        legend: {
	          show: true,
	          top:'-5%',
	          itemHeight:2,
	          itemWidth:10,
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
	function test03(xAxisData,seriesData1,seriesData2){
		option = {
				legend: {
					data:['上月','本月'],
					textStyle:{    //图例文字的样式
						color:'#006DC7',
						fontSize:12
					},
					itemHeight:2	//图例图形高度
					//itemWidth:40	//图例图形高度
				},
				tooltip : {
			        trigger: 'axis',
			        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
			            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
			        }
			    },
				grid: {
					left: '3%',
					right: '4%',
					bottom: '10%',
					top:"22%",
					containLabel: true
				},
				xAxis : [
				         {
				        	 type : 'category',
				        	 data : xAxisData,//['1月','2月','3月','4月','5月'],
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
				                            	name:'上月',
				                            	type:'bar',
				                            	data:seriesData1,//[2.0, 4.9, 7.0, 23.2, 25.6],
				                            	barGap:'0.5%',
				                            	itemStyle:{
				                            		normal:{
				                            			color: function (value){return "#FFD306"; }
				                            		}
				                            	},
				                              barWidth : 15//柱图宽度
				                            },
				                            {
				                            	name:'本月',
				                            	type:'bar',
				                            	data:seriesData2,//[2.6, 5.9, 9.0, 26.4, 28.7],
				                            	barGap:'0.5%',
				                            	itemStyle:{
				                            		normal:{
				                            			color: function (value){return "#3398DB"; }
				                            		}
				                            	},
				                            	barWidth : 15//柱图宽度
				                            }
				                            ]
		};
//		使用刚指定的配置项和数据显示图表。
		var clazz=document.getElementById('test03');
		var myChart = echarts.init(clazz);
		myChart.setOption(option);
	}

//拥堵专题-今日敏感区域拥堵变化top5
function sensitiveRoadByDay(data){
	if(data!=null){
		var seriesArr1=data.seriesData1.split(',');
		var xAxisDataArr=data.xAxisData.split(',');
		//控件加载
		test01(xAxisDataArr,seriesArr1);
		//日周环比加载
		var dayStr=data.seriesData2.split(','); //日环比数据
		var monthStr=data.seriesData3.split(','); //周环比数据
		var html="<div><div><span>日环比</span></div>",htmlDay="",htmlMonth="";
		var day="",month="";
		for(var i=0;i<dayStr.length;i++){
			var flagDay="target_up",flagMonth="target_up"
			day=parseInt(dayStr[i]);
			month=parseInt(monthStr[i]);
			if(day<0){
				day=-day;
				flagDay="target_down";
			}else if(day==0){
				flagDay="target_no";
			}
			if(month<0){
				month=-month;
				flagMonth="target_down";
			}else if(month==0){
				flagMonth="target_no";
			}
			
			htmlDay+="<div><span>"+day+"</span><em class='"+flagDay+"'></em></div>";
			htmlMonth+="<div><span>"+month+"</span><em class='"+flagMonth+"'></em></div>";
		}
		html+=htmlDay+"</div><div><div><span>周环比</span></div>";
		html+=htmlMonth+"</div>";
		
		$('.jampslist').append(html);
	}
	
}
//违法类型数量变化top5
function vioTypeNumChange(data){
	debugger;
	if(data!=null){
		var seriesArr1=data.seriesData1.split(',');
		var seriesArr2=data.seriesData2.split(',');
		var xAxisDataArr=data.xAxisData.split(',');
		test03(xAxisDataArr,seriesArr1,seriesArr2);
	}
}
//设备专题
function equipStatus(data){
	var len=5;
	var html="";
	debugger;
	if(data!=null){
		if(data.length<5){
			len=data.length;
		}
		html+="<dt>";
		for(var i=0;i<len;i++){
			html+="<p>"+data[i].deviceTypeName.substring(0,4)+"</p>";
		}
		html+="</dt>";
		
		html+="<dd>"+
				  "<table>"+
						"<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>"+
						"<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>"+
						"<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>"+
						"<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>"+
						"<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>"+
				  "</table>"+
				  "<ul>";
		for(var i=0;i<len;i++){
			var widthNow=data[i].width;
			html+="<li><p style='width: "+widthNow+"%';>"+data[i].onlineCount+"</p><span>"+data[i].totalCount+"</span></li>";
		}
		html+="</ul></dd>";
	}
	
	$('.equipStatus').append(html);
}
//当前拥堵指数
function jamIndex(data){
	debugger;
	var now=0,day=0,month=0;
	var dayFlag='<i class="app-conmain-icon-up"></i>';
	var MonthFlag='<i class="app-conmain-icon-down"></i>';
	if(data!=null){
		now=data.now;
		day=data.day;
		month=data.month;
		if(day<0){
			dayFlag='<i class="app-conmain-icon-down"></i>';
		}else if(day==0){
			dayFlag='<i class="app-chart target_no"></i>';
		}
		if(month>0){
			MonthFlag='<i class="app-conmain-icon-up"></i>';
		}else if(month==0){
			MonthFlag='<i class="app-chart target_no"></i>';
		}
	}
	var html='<div><p>当前拥堵指数</p><p><span>'+now+'</span><em></em></p></div>'
		+'<div><ul><li><span>日环比</span><em>'+day+'</em>'+dayFlag+'</li>'
		+'<li><span>周环比</span><em>'+month+'</em>'+MonthFlag+'</li>'
		+'</ul></div></div>';
	
	$('.jamIndex').append(html);
}

//当月违法次数
function vioIndex(data){
	var now=0,month=0;
	var dayFlag='<i class="app-conmain-icon-up"></i>';
	var MonthFlag='<i class="app-conmain-icon-down"></i>';
	if(data!=null){
		now=data.now;
		month=data.month;
		if(month>0){
			MonthFlag='<i class="app-conmain-icon-up"></i>';
		}else if(month==0){
			MonthFlag='<i class="app-conmain-icon-up"></i>';
		}
	}
	var html='<div><p>当月违法次数</p><p><span>'+now+'</span><em></em></p></div>'
		+'<div><ul><li></li>'
		+'<li><span>月环比</span><em>'+month+'</em>'+MonthFlag+'</li>'
		+'</ul></div></div>';
	
	$('.vioIndex').append(html);
}


function jamRoadByDay(data){
	if(data!=null){
		var seriesArr1=data.seriesData1.split(',');
		var seriesArr2=data.seriesData2.split(',');
		var seriesArr3=data.seriesData3.split(',');
		var xAxisDataArr=data.xAxisData.split(',');
		test02(xAxisDataArr,seriesArr1,seriesArr2,seriesArr3)
	}
	
}

function trafficElem(data){
	var html="",len=5;
	var contentArr=data.split(",");
	if(contentArr.length<5){
		len=contentArr.length;
	}
	if(data!=null){
		for(var i=0;i<len;i++){
			html+='<li>'+contentArr[i]+'</li>';
		}
	}
	$('.trafficElem').append(html);
}
//雷达控件
function vioRadia(data){
	debugger;
	if(data!=null){
		var seriesArr1=data.seriesData1.split(',');
		var xAxisDataArr=data.xAxisData.split('_');
		var x=new Array();
		for(var i=0;i<xAxisDataArr.length;i++){
			var json=eval('(' + xAxisDataArr[i] + ')');
			x.push(json);
		}
		test05(x,seriesArr1);
		var vioSumNum=data.seriesData2;
		var html="(违法数量单位："+vioSumNum+"起)";
		$('.vioSumNum').append(html)
	}
};
//仪表盘控件
function PointerTable(data){
	if(data!=null){
		var json = eval('(' + data.seriesData1 + ')'); 
		var seriesArr=[json];
		test11(seriesArr);
	}
};
function test05(xAxisDataArr,seriesArr1){
	  option = {
	      calculable : true,
	      radar: {
	        axisLabel:{
	            textStyle:{
	              color:"#0099FE", //刻度颜色
	              fontSize:14  //刻度大小
	            }
	    },
	        indicator: xAxisDataArr,
	                    radius : '65%',
	                    startAngle:25,
	                    center: ['60%','45%'],
	                    splitLine: {
	                      show:false,
	                      lineStyle: {
	                        color: '#006DC7'
	                      }
	                    },
	                    axisLine: { 
	                      show:false,
	                      lineStyle: {
	                        color: '#006DC7'
	                      }
	                    },
	                    name: {
	                      textStyle: {
	                      //color:'#0099FE',
	                      fontSize:14  //刻度大小
	                    },
	                    formatter: function (value, index) {
	                    	var strArr=value.split("||");
	                        var content = strArr[0]+'\n'+strArr[1];
	                        return content;
	                    }
	            },
	      },
	      series: [{
	        type: 'radar',
//	        areaStyle: {
//	          normal: {
//	            type: 'normal',
//	            color: 'rgba(0, 0, 0, 0.5)',
//	            opacity:0,
//	            shadowBlur:{
//	              shadowColor: 'rgba(0, 0, 0, 0.5)',
//	              shadowBlur: 10
//	            }
//	          }
	//
//	        },
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
	                  value : seriesArr1,
	                  name : '违法数量',
//	                  areaStyle: {
//	                    normal: {
//	                      type: 'normal',
//	                      color: '',
//	                      opacity:0,
//	                      shadowBlur:{
//	                        shadowColor: 'rgba(0, 0, 0, 0.5)',
//	                        shadowBlur: 10
//	                      }
//	                    }
	//
//	                  },
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
	//  使用刚指定的配置项和数据显示图表。
	  var clazz=document.getElementById('test05');
	  var myChart = echarts.init(clazz);
	  myChart.setOption(option);
	}; 
/*--------------------------------------------------------------*/ 
function test10(data){
	var flag="target_up";
	var contrast="";
	var html='<tr bgcolor="#002D70"><th>路段名称</th><th align="center" >拥堵时长（分钟）</th><th>日环比</th></tr>';
	if(data!=null){
		for(var i=0;i<5;i++){
			if(data[i].contrast=="-"){
				flag="target_down";
			}else if(data[i].contrast=="="){
				flag="target_no";
			}
			var progress='<div class="votebox" >'+
			'<dl class="barbox">'+
			'<dd class="barline">'+
			'<div w="'+(data[i].congestTime/2)+'" style="width:0px;" class="charts" value="50"><div style="float: right;color:#FFF;padding: 1px 10px 0px 0px;">'+data[i].congestTime+'</div></div>'+
			'</dd>'+
			'</dl>'+
			'</div>';
			html+='<tr ><td>'+data[i].roadName.substring(0,4)+'</td><td>'+progress+'</td><td>'+data[i].dayForm+'<em  class="'+flag+'"></em></td></tr>';
		}
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
//	test20();
});
function test20(data){
	var flag="target_up";
	var contrast="";
	var html='<tr bgcolor="#002D70"><th>路段名称</th><th align="center" >拥堵时长（分钟）</th><th>日环比</th></tr>';
	if(data!=null){
		for(var i=0;i<5;i++){
			if(data[i].contrast=="-"){
				flag="target_down";
			}else if(data[i].contrast=="="){
				flag="target_no";
			}
			var progress='<div class="votebox" >'+
			'<dl class="barbox">'+
			'<dd class="barline">'+
			'<div w="'+(data[i].congestTime/2)+'" style="width:0px;" class="charts" value="50"><div style="float: right;color:#FFF;padding: 1px 10px 0px 0px;">'+data[i].congestTime+'</div></div>'+
			'</dd>'+
			'</dl>'+
			'</div>';
			html+='<tr ><td>'+data[i].roadName.substring(0,4)+'</td><td>'+progress+'</td><td>'+data[i].dayForm+'<em  class="'+flag+'"></em></td></tr>';
		}
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
function test11(series1){
	var myChart = echarts.init(document.getElementById('test11')); 
	option = { 
			grid: {
				left: '3%',
				right: '4%',
				bottom: '10%',
				top:'1%',
				containLabel: true
			},
			series : [ 
			          
			          { 
			        	  name:'业务指标', 
			        	  type:'gauge',
			        	  radius : '150%',
			              center: ['50%', '80%'],
			        	  detail : {formatter:'{value}'}, //仪表盘显示数据 ,
			        	  min:0,
			        	  max:6,
			        	  splitNumber:6,
			        	  startAngle: 180,  
			        	  endAngle: 0,  
			        	  axisLine: { //仪表盘轴线样式 
			        		  lineStyle: { 
			        			  width: 10,
			        			  color :[[0.34, '#21B96C'], [0.67, '#D8A01F'], [1, '#E01B46']]
			        		  } 
			        	  }, 
			        	  splitLine: { //分割线样式 
			        		  length: 10 
			        	  },
			        	  detail: {
			        		  show : true,
			        		  formatter: '{value}',
			        		  offsetCenter: [0, '3%'],
			        		  textStyle: {
			        			  color: 'auto',
			        			  fontSize: 20
			        		  }
			        	  },
			        	  pointer:{
			        		  show :true,
			        		  length :'30%',
			        		  width:3
			        	  },
			        	  title:{
			        		  show:true,
			        		  offsetCenter : [0, '-30%'],
			        		  textStyle:{
			        			  color :'#009EFF' 
			        		  }
			        	  },
			        	  axisLabel:{
			        		  //distance :-2
			        	  },
//			        	  data:[
//			        	        {
//			        	        	value: 2,
//			        	        	name: '拥堵指数'
//			        	        }],
			        	  data:series1
			          },

			          ] 
	}; 

	myChart.setOption(option);
}
/*--------------------------------------------------------------*/ 
$(function() {
	test12();
});
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
			        	 radius: ['40%', '55%'],

			        	 data:[
			        	       {value:335, name:'直达2%'},
			        	       {value:310, name:'邮件营销'},
			        	       {value:234, name:'联盟广告'},
			        	       {value:135, name:'视频广告'},
			        	       {value:1048, name:'百度'}
			        	       ]
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
	test13();
});
function test13(){
	option = {
			color:['#FFC433', '#FF9024','#0097EF','#00D045','#FF5855'],
			series : [
			          {
			        	  name: '访问来源',
			        	  type: 'pie',
			        	  radius : '35%',
			        	  center: ['50%', '60%'],
			        	  data:[
			        	        {value:335, name:'直接访问10%'},
			        	        {value:310, name:'邮件营销'},
			        	        {value:234, name:'联盟广告'},
			        	        {value:135, name:'视频广告'},
			        	        {value:1548, name:'搜索引擎'}
			        	        ]
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

