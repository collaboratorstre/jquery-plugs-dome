/**
 * 违法专题
 */
var violation = {};

/**
 * 当月违法小组件
 **/
violation.vioNumTime = function(recallDate){
	var param={'timeParam':recallDate};
	ajaxUtil.interfaceUtil(contextPathJs+'/violation/queryVioStatusByDay.do',param,violation.vioIndex);
}

violation.vioIndex = function(data){
	var now=0,month=0;
	var dayFlag='<i class="app-conmain-icon-up"></i>';
	var MonthFlag='<i class="app-conmain-icon-up"></i>';
	if(data!=null){
		now=data.now;
		month=parseInt(data.month);
		if(month<0){
			month=-month
			MonthFlag='<i class="app-conmain-icon-down"></i>';
		}else if(month==0){
			MonthFlag='<i class="app-conmain-icon-no"></i>';
		}
	}
	var html='<div><p>当月违法次数</p><p><span>'+now+'</span><em></em></p></div>'
	+'<div><ul><li></li>'
	+'<li><span>月环比</span><em>'+month+'</em>'+MonthFlag+'</li>'
	+'<li></li></ul></div></div>';
	$('.vioIndex').empty();
	$('.vioIndex').append(html);
}  

/**
 * 违法类型数量变化
 **/

violation.vioNumDTypeTime = function(recallDate){
	var param={'timeParam':recallDate};
	ajaxUtil.interfaceUtil(contextPathJs+'/violation/queryViolationStatisticsByType.do',param,violation.vioTypeNumChange);  
}

violation.vioTypeNumChange = function(data){
	if(data.xAxisData!=""){
		$("#noVioTypeNumChangeDiv").css("display","none");
		$("#vioTypeNumChangeDiv").css("display","block");
		var seriesArr1=data.seriesData1.split(',');
		var seriesArr2=data.seriesData2.split(',');
		var xAxisDataArr=data.xAxisData.split(',');
		violation.vioTypeNumChangeBar(xAxisDataArr,seriesArr1,seriesArr2);
	}else{
		$("#vioTypeNumChangeDiv").css("display","none");
		$("#noVioTypeNumChangeDiv").css("display","block");
		var divshow = $("#noVioTypeNumChangeDiv");
		divshow.text("");// 清空数据
		divshow.append('<div style="display: table;width: 100%;height: 100%;"><p style="display: table-cell;vertical-align: middle;text-align: center;">暂无数据</p></div>'); // 添加Html内容，不能用Text 或 Val
	}
}

violation.vioTypeNumChangeBar = function(xAxisData,seriesData1,seriesData2){
	option = {
			tooltip : {  
				trigger : 'axis',  
				axisPointer : { // 坐标轴指示器，坐标轴触发有效  
					type : 'shadow' // 默认为直线，可选为：'line' | 'shadow'  
				} 
			},
			grid: {
				left: '5%',
				right: '-3%',
				bottom: '10%',
				top:"7%",
				containLabel: true
			},
			legend: {
				data:['近两月','近一月'],
				x:'right',
				y: 'center',
				top:'-5%',
				right:'5%',
				width: 190,
				//orient : 'vertical',  
				textStyle:{    //图例文字的样式
					color:'#4491ff',
					fontSize:14
				},
				itemWidth:15,  //图例标记的图形宽度
				itemHeight:15, //图例标记的图形高度
				show: true,
			},
			xAxis : [
			         {
			        	 type : 'category',
			        	 data : xAxisData,
			        	 axisLabel:{
			        		 interval:0,
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
			                            	name:'近两月',
			                            	type:'bar',
			                            	data:seriesData2,
			                            	barGap:'30%',
			                            	itemStyle:{
			                            		normal:{
			                            			color: function (value){return "#FFD306"; }
			                            		}
			                            	},
			                            	barWidth : 15//柱图宽度
			                            },
			                            {
			                            	name:'近一月',
			                            	type:'bar',
			                            	data:seriesData1,
			                            	barGap:'30%',
			                            	itemStyle:{
			                            		normal:{
			                            			color: function (value){return "#3398DB"; }
			                            		}
			                            	},
			                            	barWidth : 15//柱图宽度
			                            }
			                            ]
	};
//	使用刚指定的配置项和数据显示图表。
	var clazz=document.getElementById('vioTypeNumChangeDiv');
	var myChart = echarts.init(clazz);
	myChart.setOption(option);
}   

/**
 * 违法数量和类型分布
 **/

violation.vioNumATypeTime = function(recallDate){
	var param={'timeParam':recallDate};
	ajaxUtil.interfaceUtil(contextPathJs+'/violation/queryViolationRadia.do',param,violation.vioRadia);
}

violation.vioRadia = function(data){
	if(data.xAxisData!=""){
		$("#noVioRadiaDiv").css("display","none");
		$("#vioRadiaDiv").css("display","block");
		var seriesArr1=data.seriesData1.split(',');
		var xAxisDataArr=data.xAxisData.split('_');
		var x=new Array();
		for(var i=0;i<xAxisDataArr.length;i++){
			if(xAxisDataArr[i]==""){
				continue;
			}
			var json=eval('(' + xAxisDataArr[i] + ')');
			x.push(json);
		}
		if(x.length>0){
			violation.vioRadiaBar(x,seriesArr1);
			var html="(单位：起)";
			$('.vioSumNum').empty();
			$('.vioSumNum').append(html);
		}
	}else{
		$("#vioRadiaDiv").css("display","none");
		$("#noVioRadiaDiv").css("display","block");
		var divshow = $("#noVioRadiaDiv");
		divshow.text("");// 清空数据
		divshow.append('<div style="display: table;width: 100%;height: 100%;"><p style="display: table-cell;vertical-align: middle;text-align: center;">暂无数据</p></div>'); // 添加Html内容，不能用Text 或 Val
	}
};

violation.vioRadiaBar = function(xAxisDataArr,seriesArr1){
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
				radius : '60%',
				startAngle:25,
				center: ['60%','45%'],
				splitLine: {
					show:true,
					lineStyle: {
						color: '#4491ff',
						opacity:0.3
					}
				},
				axisLine: { 
					show:true,
					lineStyle: {
						color: '#4491ff',
						opacity:0.3
					}
				},
				splitArea : {
					show : true,   
					areaStyle : {
						color: ["rgba(227, 232, 252, 0.15)"],  // 图表背景网格的颜色
						opacity:0.6
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
				itemStyle: {
					normal: {
						areaStyle: {
							type: 'default',
							color: '#4491ff'
						}
					}
				},
				data : [
				        {
				        	value : seriesArr1,
				        	name : '违法数量',
				        	lineStyle:{
				        		normal: {
				        			type: 'normal',
				        			color: '#4491ff'
				        		}
				        	}
				        }
				        ]
			}]
	};
//	使用刚指定的配置项和数据显示图表。
	var clazz=document.getElementById('vioRadiaDiv');
	var myChart = echarts.init(clazz);
	myChart.setOption(option);
}; 

