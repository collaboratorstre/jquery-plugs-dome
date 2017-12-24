/**
 * 交通路况专题
 */
var trafficState = new Object();

/**
 * 敏感道路top5
 */
trafficState.sensitiveTime = function(recallDate){
	var param={'timeParam':recallDate};
	ajaxUtil.interfaceUtil(contextPathJs+'/trafficState/querySensitiveRoad.do',param,trafficState.sensitiveRoadByDay);
}

trafficState.sensitiveRoadByDay = function(data){
	$('#sensitiveRoad').empty();
	if(data.xAxisData==""){   
		$("#sensitiveRoadDiv").css("display","none");
		$("#noSensitiveRoadDiv").css("display","block");
		var divshow = $("#noSensitiveRoadDiv");
		divshow.text("");// 清空数据
		divshow.append('<div style="display: table;width: 100%;height: 100%;"><p style="display: table-cell;vertical-align: middle;text-align: center;">暂无数据</p></div>'); // 添加Html内容，不能用Text 或 Val
	}else{
		$("#noSensitiveRoadDiv").css("display","none");
		$("#sensitiveRoadDiv").css("display","block");
		var seriesArr1=data.seriesData1.split(',');
		var xAxisDataArr=data.xAxisData.split(',');
		//控件加载
		trafficState.sensitiveRoadBar(xAxisDataArr,seriesArr1);
		//日周环比加载
		var dayStr=data.seriesData2.split(','); //日环比数据
		var monthStr=data.seriesData3.split(','); //周环比数据
		var html="<div><div><span>日环比</span></div>",htmlDay="",htmlMonth="";
		var day="",month="";
		for(var i=0;i<dayStr.length;i++){
			if(dayStr[i]==""){
				continue;
			}
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
		var cha=5-dayStr.length;
		for(var j=0;j<cha;j++){
			htmlDay+="<div><span></span><em></em></div>";
			htmlMonth+="<div><span></span><em></em></div>";
		}
		html+=htmlDay+"</div><div><div><span>周环比</span></div>";
		html+=htmlMonth+"</div>";
		$('#sensitiveRoad').append(html);
	}
}

trafficState.sensitiveRoadBar = function(xAxisDataArr,seriesArr1){
	var option = {
			tooltip : {  
				trigger : 'axis',  
				axisPointer : { // 坐标轴指示器，坐标轴触发有效  
					type : 'shadow' // 默认为直线，可选为：'line' | 'shadow'  
				},
				//鼠标移入事件
				formatter: function (params) {  
					if(params[0].name!=''&&params[0].name!=null){
						return params[0].name+"<br />拥堵时长："+params[0].value+" 分钟";  
					}
				} 
			},

			color: ['#3398DB'],
			grid: {
				top:'5%',
				left: '10%',
				right: '5%',
				bottom: '15%',
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
			        		 interval:0,
			        		 textStyle:{
			        			 color:"#3398DB", //刻度颜色
			        			 fontSize:12  //刻度大小
			        		 }
			        	 },
			        	 splitLine: {
			        		 show: false,
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
			                			  color:"#4491ff", //刻度颜色
			                			  fontSize:12  //刻度大小
			                		  }
			                	  },
			                	  splitLine: {
			                		  show: false,
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
			                            	barWidth: 20,
			                            	data:seriesArr1
			                            }
			                            ]
	};

//	使用刚指定的配置项和数据显示图表。
	var clazz=document.getElementById('sensitiveRoadDiv');
	var myChart = echarts.init(clazz);
	myChart.setOption(option,true);
} 

/**
 * 常堵路段top5（新版本）
 * html备份
 * <div class="app-area-box">
 * <div class="app-title-box"><i></i><span>常堵路段</span><b>TOP5</b></div>
 * <div id="alwaysJamRoadDiv" style="width: 100%;height:70%;"></div>
 * <div id = "noAlwaysJamRoadDiv" style="width: 100%;height:70%;"></div>
 * <div class="jampslist" id="alwaysJamList" style="width: 100%;height:20%;">
 * </div>
 * </div> 
 **/
trafficState.oftenJamRoad = function(recallDate){
	var param={'timeParam':recallDate};
	ajaxUtil.interfaceUtil(contextPathJs+'/trafficState/queryJamRoadRanksByDayNew.do',param,trafficState.jamRoadByDayNew);
}

trafficState.jamRoadByDayNew = function(data){
	if(data.xAxisData!=""){
		$("#nooftenJamRoadDiv").css("display","none");
		$("#oftenJamRoadDiv").css("display","block");
		var seriesArr1=data.seriesData1.split(','); //今日，昨日，上周
		var xAxisDataArr=data.xAxisData.split(','); //x坐标
		var dataArr=new Array();
		var xDataArr=new Array();
		var valueData = "";
		var flag01=["0","3","6","9","12"];
		var flag02=["1","4","7","10","13"];
		var flag03=["2","5","8","11","14"];
		var roadName=new Array();
		$.each(xAxisDataArr,function(i,v){
			if(v=="''"){
				xDataArr.push("");
			}else{
				xDataArr.push(v);
				roadName.push(v+"_");
			}
		});
		var count=0;
		var roadNameStr="";
		$.each(seriesArr1,function(i,v){
			//取道路名称
			if(flag01.indexOf(i+"")!=-1 && i<(roadName.length*3)){
				roadNameStr=roadName[count];
				count++;
			}

			if(flag01.indexOf(i+"")!=-1){
				valueData = "{name:'"+roadNameStr+"今日',value:"+v+"}";
				var jaon = eval('('+valueData+')');
				dataArr.push(jaon);
			}else if(flag02.indexOf(i+"")!=-1){
				valueData = "{name:'"+roadNameStr+"昨日',value:"+v+"}";
				var jaon = eval('('+valueData+')');
				dataArr.push(jaon);
			}else if(flag03.indexOf(i+"")!=-1){
				valueData = "{name:'"+roadNameStr+"上周',value:"+v+"}";
				var jaon = eval('('+valueData+')');
				dataArr.push(jaon);
			}
		});
		trafficState.oftenJamRoadBar(xDataArr,dataArr);
	}else{
		$("#oftenJamRoadDiv").css("display","none");
		$("#nooftenJamRoadDiv").css("display","block");
		var divshow = $("#nooftenJamRoadDiv");
		divshow.text("");// 清空数据
		divshow.append('<div style="display: table;width: 100%;height: 100%;"><p style="display: table-cell;vertical-align: middle;text-align: center;">暂无数据</p></div>'); // 添加Html内容，不能用Text 或 Val
	}
}

trafficState.oftenJamRoadBar = function(xAxisDataArr,dataJson){
	var option2 = {
			tooltip : {
				trigger : 'item',
				formatter : function(params) {
					var name=params.name;
					if(params.value==0){
						return;
					}else if(params.value!=0 && name.indexOf("_")==-1){
						name=name+"_"+"昨日";
					}
					return name+"<br />拥堵时长："+params.value+" 分钟";
				}
			},
			angleAxis: {
				type: 'category',
				data: xAxisDataArr,
				z: 10,
				axisLabel:{
					textStyle:{
						color:"#0099FE", //刻度颜色
						fontSize:12  //刻度大小
					}
				}
			},
			radiusAxis: {
				show:false,
				axisLine:{
					lineStyle:{
						color:"#0099FE", //刻度颜色
					}
				}
			},
			polar: {
				z:0,
				radius:'75%',
				center: ['50%', '50%']
			},
			series: [{
				type: 'bar',
				data: dataJson,
				coordinateSystem: 'polar',
				name: 'A',
				stack: 'a',
				itemStyle: {
					normal: {
						color: function(params) {
							var colorList = [
							                 '#C1232B','#C1232B','#C1232B','#E87C25','#E87C25',
							                 '#E87C25','#9BCA63','#9BCA63','#9BCA63','#60C0DD',
							                 '#60C0DD','#60C0DD','#F4E001','#F4E001','#F4E001'
							                 ];
							return colorList[params.dataIndex]
						}
					}
				}}]
	};
//	使用刚指定的配置项和数据显示图表。
	var clazz=document.getElementById('oftenJamRoadDiv');
	var myChart = echarts.init(clazz);
	myChart.setOption(option2);
}      

/**
 * 今日影响交通的因素
 **/
trafficState.factorTime = function(recallDate){
	var param={'timeParam':recallDate};
	ajaxUtil.interfaceUtil(contextPathJs+'/trafficState/queryTrafficFactors.do',param,trafficState.trafficElem);
}

trafficState.trafficElem = function(data){
	if(data.length>0){
		$(".noTrafficElem").css("display","none");
		$(".trafficElem").css("display","block");
		var html="",len=5;
		if(data.length<5){
			len=data.length;
		}
		if(data!=null){
			for(var i=0;i<data.length;i++){
				html+='<li>'+data[i]+'</li>';
			}
		}
		$('.trafficElem').empty();
		$('.trafficElem').append(html);
	}else{
		$(".trafficElem").css("display","none");
		$(".noTrafficElem").css("display","block");
		var divshow = $(".noTrafficElem");
		divshow.text("");// 清空数据
		divshow.append('<div style="display: table;width: 100%;height: 100%;"><p style="display: table-cell;vertical-align: middle;text-align: center;">暂无数据</p></div>'); // 添加Html内容，不能用Text 或 Val
	}
	
}

/**
 * 拥堵指数（仪表盘）
 **/
trafficState.congressIndexTime = function(recallDate){
	var param={'timeParam':recallDate};
	ajaxUtil.interfaceUtil(contextPathJs+'/trafficState/queryCityJamInfos.do',param,trafficState.PointerTable);
}

trafficState.PointerTable = function(data){
	if(data!=null){
		if(data.seriesData1!=""){    
			var json = eval('(' + data.seriesData1 + ')'); 
			var seriesArr=[json];
			trafficState.pointerTableBar(seriesArr);
		}
	}
};

/*function pointerTableBar(series1){
  var myChart = echarts.init(document.getElementById('pointerTableDiv')); 
  option = { 
      series : [ 
                { 
                  name:'业务指标', 
                  type:'gauge', 
                  radius : '140%',
                  center: ['50%', '80%'],
                  detail : {formatter:'{value}'}, //仪表盘显示数据 ,
                  min:1,
                  max:2.6,
                  splitNumber:4,
                  startAngle: 180,  
                  endAngle: 0,  
                  axisLine: { //仪表盘轴线样式 
                    lineStyle: { 
                      width: 10,
                      color :[[0.25, '#21B96C'], [0.5, '#D8A01F'], [0.75, '#ff6433'],[1, '#E01B46']]
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
                      fontSize: 16
                    }
                  },
                  pointer:{
                    show :true,
                    length :'30%',
                    width:3
                  },
                  title:{
                    show:true,
                    offsetCenter : [0, '-40%'],
                    textStyle:{
                      color :'#009EFF' ,
                      fontSize: 10
                    },
                     offsetCenter: [0, '-30%'] 
                  },
                 data:series1
                },

                ] 
  }; 

  myChart.setOption(option);
}      */
trafficState.pointerTableBar = function(series1){
	var myChart = echarts.init(document.getElementById('pointerTableDiv')); 
	option = { 
			series : [ 
			          { 
			        	  name:'业务指标', 
			        	  type:'gauge', 
			        	  radius : '140%',
			        	  center: ['50%', '80%'],
			        	  detail : {formatter:'{value}'}, //仪表盘显示数据 ,
			        	  min:1,
			        	  max:2.6,
			        	  splitNumber:4,
			        	  startAngle: 180,  
			        	  endAngle: 0,  
			        	  axisLine: { //仪表盘轴线样式 
			        		  lineStyle: { 
			        			  width: 10,
			        			  color :[[0.25, '#21B96C'], [0.5, '#D8A01F'], [0.75, '#ff6433'],[1, '#E01B46']]
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
			        			  fontSize: 16
			        		  }
			        	  },
			        	  pointer:{
			        		  show :true,
			        		  length :'30%',
			        		  width:3
			        	  },
			        	  title:{
			        		  show:true,
			        		  offsetCenter : [0, '-40%'],
			        		  textStyle:{
			        			  color :'#009EFF' ,
			        			  fontSize: 10
			        		  },
			        		  offsetCenter: [0, '-30%'] 
			        	  },
			        	  data:series1
			          },

			          ] 
	}; 

	myChart.setOption(option);
}   

/**
 * 交通管理指数（小组件）
 **/
trafficState.trafficIndexTime = function(recallDate){
	var param={'timeParam':recallDate};
	ajaxUtil.interfaceUtil(contextPathJs+'/trafficState/queryCurrentTrafficNum.do',param,trafficState.currentTrafficNum);
}

trafficState.currentTrafficNum = function(data) {
	var now=0,month=0;
	var dayFlag='';
	var MonthFlag='';
	if(data!=null){
		now=data.now;
		month=parseInt(data.month);
		if(month<0){
			month=-month;
			MonthFlag='<i class="app-conmain-icon-down"></i>';
		}else if(month==0){
			MonthFlag='<i class="app-conmain-icon-no"></i>';
		}else{
			MonthFlag='<i class="app-conmain-icon-up"></i>';
		}
		day=parseInt(data.day);
		if(day<0){
			day=-day;
			dayFlag='<i class="app-conmain-icon-down"></i>';
		}else if(day==0){
			dayFlag='<i class="app-conmain-icon-no"></i>';
		}else{
			dayFlag='<i class="app-conmain-icon-up"></i>';
		}
	}
	var html='<div><p>交通管理指数</p><p><span>'+now+'</span><em></em></p></div>'
	+'<div><ul><li></li>'
	+'<li><span>日环比</span><em>'+day+'</em>'+dayFlag+'</li>'
	+'<li><span>月环比</span><em>'+month+'</em>'+MonthFlag+'</li></ul></div></div>';
	$("#currentTrafficNum").empty();
	$("#currentTrafficNum").append(html);
}


/*拥堵点、警情、警力分布*/
trafficState.JamWIPSFunc = function (recallDate) {
	$.ajax({
		type : "POST",
	    url : contextPathJs + "/trafficState/getJamWIPSDis.do",
	    ansyc : true,
	    data : {recallDate:recallDate},
      //data : {recallDate:"2017-9-3 12:00:00"},
	    dataType : "json",
	    success : function(data) {
		      var timeRowArr = new Array();
		      timeRowArr = data.timeRow.split(",");
		      var wIData = new Array();
          wIData = data.warningCount.split(",");
          var psData = new Array();
          psData = data.dutyCount.split(",");
          var jamData = new Array();
          jamData = data.jamCount.split(",");
          trafficState.setWIPSJamEcharts(timeRowArr,wIData,psData,jamData);
      }
  });
}

trafficState.setWIPSJamEcharts = function(timeRowArr,wIData,psData,jamData){
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
             formatter: function(params) {
            	var timeRow = params[0].name;
 				var jamValue = params[0].value;
 				var jamName = params[0].seriesName;
 				var jamMarker = params[0].marker;
 				var wiValue = params[1].value;
 				var wiName = params[1].seriesName;
 				var wiMarker = params[1].marker;
 				var psValue = params[2].value*3;
 				var psName = params[2].seriesName;
 				var psMarker = params[2].marker;
 				return timeRow + "<br/>" + jamMarker  + jamName + ":" + jamValue + "<br/>" + wiMarker + wiName + ":" + wiValue + "<br/>" + psMarker  + psName + ":" + psValue;
			 }
          },
          legend: {
            top:'-5%',
            //selectedMode:false,
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
              left: '0%',
              right: '2%',
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
/**
 * 常堵路段top5（老版本）
 **/

trafficState.importRoadTime = function(recallDate){
	var param={'timeParam':recallDate};
	ajaxUtil.interfaceUtil(contextPathJs+'/trafficState/queryJamRoadRanksByDay.do',param,trafficState.jamRoadByDay);
}

trafficState.jamRoadByDay = function(data){
	if(data.xAxisData==""){
		$("#oftenJamRoadDiv").css("display","none");
		$("#nooftenJamRoadDiv").css("display","block");
		var divshow = $("#nooftenJamRoadDiv");
		divshow.text("");// 清空数据
		divshow.append('<div style="display: table;width: 100%;height: 100%;"><p style="display: table-cell;vertical-align: middle;text-align: center;">暂无数据</p></div>'); // 添加Html内容，不能用Text 或 Val
	}else{
		$("#nooftenJamRoadDiv").css("display","none");
		$("#oftenJamRoadDiv").css("display","block");
		var seriesArr1=data.seriesData1.split(',');
		var seriesArr2=data.seriesData2.split(',');
		var seriesArr3=data.seriesData3.split(',');
		var xAxisDataArr=data.xAxisData.split(',');
		trafficState.test02(xAxisDataArr,seriesArr1,seriesArr2,seriesArr3);
		
	}

}

trafficState.test02 = function(xAxisDataArr,seriesArr1,seriesArr2,seriesArr3){
	option = {
			tooltip : {  
				trigger : 'axis',  
				axisPointer : { // 坐标轴指示器，坐标轴触发有效  
					type : 'shadow' // 默认为直线，可选为：'line' | 'shadow'  
				}
			},
			angleAxis: {
				type: 'category',
				data:xAxisDataArr,
				z: 10,
				startAngle: 90,
				minInterval: 20,
				axisLabel:{
					textStyle:{
						color:"#0099FE", //刻度颜色
						fontSize:14  //刻度大小
					}
				}
			},
			radiusAxis: {
				show:false,
				axisLine:{
					lineStyle:{
						color:"#0099FE", //刻度颜色
					}
				}
			},
			polar: {
				z:0,
				radius:'75%',
				center: ['50%', '50%']
			},
			series: [{
				type: 'bar',
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
				data: ['今日', '昨日', '上周'],
				x:'right',
				y: 'center',
				top:'15%',
				right:-30,
				width: 190,
				orient : 'vertical',  
				textStyle:{    //图例文字的样式
					color:'#1E5FBC',
					fontSize:14
				},
				itemWidth:15,  //图例标记的图形宽度
				itemHeight:15, //图例标记的图形高度
				show: true
			}
	};

	//使用刚指定的配置项和数据显示图表。
	var clazz=document.getElementById('oftenJamRoadDiv');
	var myChart = echarts.init(clazz);
	myChart.setOption(option);
}    

/**
 * 常堵路段top5（第三版：参照敏感道路样式）
 */
trafficState.alwaysJamRoadTime = function(recallDate){
	var param={'timeParam':recallDate};
	ajaxUtil.interfaceUtil(contextPathJs+'/trafficState/queryAlwaysJamRoad.do',param,trafficState.alwaysJamRoad);
}

trafficState.alwaysJamRoad = function(data){
	$('#alwaysJamList').empty();
	if(data.xAxisData==""){   
		$("#alwaysJamRoadDiv").css("display","none");
		$("#noAlwaysJamRoadDiv").css("display","block");
		var divshow = $("#noAlwaysJamRoadDiv");
		divshow.text("");// 清空数据
		divshow.append('<div style="display: table;width: 100%;height: 100%;"><p style="display: table-cell;vertical-align: middle;text-align: center;">暂无数据</p></div>'); // 添加Html内容，不能用Text 或 Val
	}else{
		$("#noAlwaysJamRoadDiv").css("display","none");
		$("#alwaysJamRoadDiv").css("display","block");
		var seriesArr1=data.seriesData1.split(',');
		var xAxisDataArr=data.xAxisData.split(',');
		//控件加载
		trafficState.alwaysJamRoadBar(xAxisDataArr,seriesArr1);
		//日周环比加载
		var dayStr=data.seriesData2.split(','); //日环比数据
		var monthStr=data.seriesData3.split(','); //周环比数据
		var html="<div><div><span>日环比</span></div>",htmlDay="",htmlMonth="";
		var day="",month="";
		for(var i=0;i<dayStr.length;i++){
			if(dayStr[i]==""){
				continue;
			}
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
		var cha=5-dayStr.length;
		for(var j=0;j<cha;j++){
			htmlDay+="<div><span></span><em></em></div>";
			htmlMonth+="<div><span></span><em></em></div>";
		}
		html+=htmlDay+"</div><div><div><span>周环比</span></div>";
		html+=htmlMonth+"</div>";
		$('#alwaysJamList').append(html);
	}
}

trafficState.alwaysJamRoadBar = function(xAxisDataArr,seriesArr1){
	var option = {
			tooltip : {  
				trigger : 'axis',  
				axisPointer : { // 坐标轴指示器，坐标轴触发有效  
					type : 'shadow' // 默认为直线，可选为：'line' | 'shadow'  
				},
				//鼠标移入事件
				formatter: function (params) {  
					if(params[0].name!=''&&params[0].name!=null){
						return params[0].name+"<br />拥堵时长："+params[0].value+" 分钟";  
					}
				} 
			},

			color: ['#3398DB'],
			grid: {
				top:'5%',
				left: '10%',
				right: '5%',
				bottom: '15%',
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
			        		 interval:0,
			        		 textStyle:{
			        			 color:"#3398DB", //刻度颜色
			        			 fontSize:12  //刻度大小
			        		 }
			        	 },
			        	 splitLine: {
			        		 show: false,
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
			                			  color:"#4491ff", //刻度颜色
			                			  fontSize:12  //刻度大小
			                		  }
			                	  },
			                	  splitLine: {
			                		  show: false,
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
			                            	barWidth: 20,
			                            	data:seriesArr1
			                            }
			                            ]
	};

//	使用刚指定的配置项和数据显示图表。
	var clazz=document.getElementById('alwaysJamRoadDiv');
	var myChart = echarts.init(clazz);
	myChart.setOption(option,true);
} 