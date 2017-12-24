var mapConfig = null;

/*
 * 页面加载时触发
 */
$(document).ready(function () {
	//$("#map").css({"width":$("body").width()-320,"height":$("body").height()-40});
	//加载地图
	mapConfig = new MapConfig();
	mapConfig.loadMap();
	
});

/*
 * 页面加载事件
 *    触发   加载全局
 */
var width;
var height;
$(function() {
	//自适应设置
	width = document.getElementById("areaJam1").style.width;
	height = document.getElementById("areaJam1").style.height;
	document.getElementById("areaJam").style.width=width.substring(0,width.length-2)-20+"px";
	document.getElementById("areaJam").style.height=height.substring(0,height.length-2)-44+"px";
	setEcharts();
});
	

$('#areaJam').resize(function() {
	width = document.getElementById("areaJam1").style.width;
	height = document.getElementById("areaJam1").style.height;
	document.getElementById("areaJam").style.width=width.substring(0,width.length-2)-20+"px";
	document.getElementById("areaJam").style.height=height.substring(0,height.length-2)-44+"px";
}); 

function setEcharts(){
	var barEchartDiv=document.getElementById('areaJam');
	 //自适应
    window.onresize = barEchartDiv.resize;
	var myChart = echarts.init(barEchartDiv);
	var colors = ['#FC403F', '#F1C001', '#33CC33'];
	var option = {
		    color: colors,
		    tooltip: {
		        trigger: 'none',
		        axisPointer: {
		            type: 'cross' //当鼠标放到分割线上不显示信息
		        }
		    },
		    legend: {
		    	x:'right',
		    	y: 'center',
		    	width: 150,
		    	orient : 'vertical',  
		    	textStyle:{    //图例文字的样式
		            color:'#1E5FBC',
		            fontSize:12
		        },
		        itemWidth:70,  //图例标记的图形宽度
		        itemHeight:30, //图例标记的图形高度
		        data:[
		              {
		                  name:'警力',
		                  textStyle:{
		                      fontSize:12,
		                      fontWeight:'bolder',
		                      color:'#021068'
		                  },
		                  icon:'image://'+contextPathJs+'/show/image/警力.png'
		                	  /*icon:'stack'*/   //矩形框
		              },
		              {
		                  name:'警情',
		                  textStyle:{
		                      fontSize:12,
		                      fontWeight:'bolder',
		                      color:'#021068'
		                  },
		                  icon:'image://'+contextPathJs+'/show/image/警情.png'
		              },
		              {
		            	  name:'拥堵',
		            	  textStyle:{
		            		  fontSize:12,
		            		  fontWeight:'bolder',
		            		  color:'#021068'
		            	  },
		            	  icon:'image://'+contextPathJs+'/show/image/拥堵点.png'
		              }
		          ]
		    },
		    grid: {
		        top: 15,
		        left:40,
		        bottom: 20,
		        right: 100,
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
		            data: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]
		        }
		      
		    ],
		    yAxis: [
		        {
		            type: 'value',
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
		            }
		        }
		    ],
		    series: [
		        {
		            name:'拥堵',
		            type:'line',
		            smooth: true,
		            data: [19, 25, 25, 18, 15, 20, 22, 18, 12, 18, 22, 24 ,18]
		        },
		        {
		            name:'警情',
		            type:'line',
		            smooth: true,
		            data:  [36, 32, 35, 39, 43, 49, 49, 42, 39, 42, 49, 49,36]
		        },
		         {
		            name:'警力',
		            type:'line',
		            smooth: true,
		            data: [21, 23, 19, 19, 25, 30, 29, 20, 20, 27, 32, 32 ,21]
		        }
		    ]
		};
	 myChart.setOption(option);
}


/*
 * 页面加载事件
 *    触发   加载全局
 */

$(function() {
	//自适应设置
	width = document.getElementById("areaPsDistribution1").style.width;
	height = document.getElementById("areaPsDistribution1").style.height;
	document.getElementById("areaPsDistribution").style.width=width.substring(0,width.length-2)-70+"px";
	document.getElementById("areaPsDistribution").style.height=height.substring(0,height.length-2)-44+"px";
	setEcharts1();
});

$(window).resize(function() {
	width = document.getElementById("areaPsDistribution1").style.width;
	height = document.getElementById("areaPsDistribution1").style.height;
	document.getElementById("areaPsDistribution").style.width=width.substring(0,width.length-2)-70+"px";
	document.getElementById("areaPsDistribution").style.height=height.substring(0,height.length-2)-44+"px";
}); 

function setEcharts1(){
	var barEchartDiv=document.getElementById('areaPsDistribution');
	 //自适应
    window.onresize = barEchartDiv.resize;
    
	var myChart = echarts.init(barEchartDiv);
	var option = {
			tooltip : {  
	            trigger : 'axis',  
	            axisPointer : { // 坐标轴指示器，坐标轴触发有效  
	                type : 'shadow' // 默认为直线，可选为：'line' | 'shadow'  
	            },
	            //鼠标移入事件
	            formatter: function (params) {  
			           return "";  
			    } 
			},  
		    grid: {
		    	top : '5%',
		        left: '1%',
		        right: '10%',
		        bottom: '10%',
		        containLabel: true
		    },
		    xAxis: {
		        type: 'value',
		        axisLabel: { 
		        	  //rotate:45, 
	                  show: true,  
	                  interval: 0, 
	                  textStyle:{
	                      fontSize:10 // 让字体变大
	                  },
		    		 formatter: '{value}%'
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
                }
		    },
		    yAxis: {
		        type: 'category',
		        axisLine:{  
                    lineStyle:{  
                        color:'#1E5FBC',  
                        width:2  
                    }  
                },  
		        data: ['海淀区','西城区', '昌平区','东城区', '朝阳区']
		    },
		    series: [
				{
				    name:'',
				    type:'bar',
				    itemStyle : { normal: {label : {show: false}}},
				    data:[100]
				},
		        {
		            name: '辖区警力分配',
		            type: 'bar',
		            label: {  
		                normal: {  
		                    show: true,
		                    //圆柱上显示的数字
		                    formatter: function (params) {  
		 			           var res =  params.value*5;  
		 			           //res +=': ' + params[0].data.values_2 + '亿元' + '('+params[0].data.amoListPers+'%'+')';  
		 			           return res;  
		 			        } ,
		                    position: 'right'    
		                    }  
		            },  
		            barWidth : 30,
		            /*
		             * 数值为出勤人数/总人数*100  echarts 自己会算百分比
		             */
		            data: [
							{value: 18,itemStyle:{ normal:{color:'#3399FE'} }}, 
							{value: 43,itemStyle:{ normal:{color:'#3399FE'} }}, 
							{value: 45,itemStyle:{ normal:{color:'#3399FE'} }}, 
							{value: 60,itemStyle:{ normal:{color:'#3399FE'} }}, 
							{value: 73,itemStyle:{ normal:{color:'#3399FE'} }},
		                   ]
		        }
		    ]
		};
	 myChart.setOption(option);
}

/*
 * 页面加载事件
 *    触发   加载全局
 */
var width;
var height;
$(function() {
	//自适应设置
	width = document.getElementById("areaWI1").style.width;
	height = document.getElementById("areaWI1").style.height;
	document.getElementById("areaWI").style.width=width.substring(0,width.length-2)-130+"px";
	document.getElementById("areaWI").style.height=height.substring(0,height.length-2)-70+"px";
	//document.getElementById("today").style.height=height.substring(0,height.length-2)-70+"px";
	setEcharts2();
});

$(window).resize(function() {
	width = document.getElementById("areaWI1").style.width;
	height = document.getElementById("areaWI1").style.height;
	document.getElementById("areaWI").style.width=width.substring(0,width.length-2)-130+"px";
	document.getElementById("areaWI").style.height=height.substring(0,height.length-2)-70+"px";
	document.getElementById("today").style.height=height.substring(0,height.length-2)-70+"px";
}); 

function setEcharts2(){
	var barEchartDiv=document.getElementById('areaWI');
	 //自适应
    window.onresize = barEchartDiv.resize;
    
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
		        right: '10%',
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
		        data: ['海淀区','西城区', '昌平区','东城区', '朝阳区']
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
		            /*
		             * 数值为出勤人数/总人数*100  echarts 自己会算百分比
		             */
		            data: [
							{value: 60,itemStyle:{ normal:{color:'#3399FE'} }}, 
							{value: 87,itemStyle:{ normal:{color:'#3399FE'} }}, 
							{value: 111,itemStyle:{ normal:{color:'#3399FE'} }}, 
							{value: 154,itemStyle:{ normal:{color:'#3399FE'} }}, 
							{value: 168,itemStyle:{ normal:{color:'#3399FE'} }},
		                   ]
		        }
		    ]
		};
	 myChart.setOption(option);
}


/*
 * 页面加载事件
 *    触发   加载全局
 */
var width;
var height;
$(function() {
	width = document.getElementById("currentAreaWI1").style.width;
	height = document.getElementById("currentAreaWI1").style.height;
	document.getElementById("currentAreaWI").style.width=width.substring(0,width.length-2)-20+"px";
	document.getElementById("currentAreaWI").style.height=height.substring(0,height.length-2)-30+"px";
    setEcharts3();
});

$(window).resize(function() {
	width = document.getElementById("currentAreaWI1").style.width;
	height = document.getElementById("currentAreaWI1").style.height;
	document.getElementById("currentAreaWI").style.width=width.substring(0,width.length-2)-20+"px";
	document.getElementById("currentAreaWI").style.height=height.substring(0,height.length-2)-30+"px";
}); 

function setEcharts3(){
	var barEchartDiv=document.getElementById('currentAreaWI');
	 //自适应
    window.onresize = barEchartDiv.resize;
	var myChart = echarts.init(barEchartDiv);
	var Data =  [0, 0, 20,20,20, 20,20];
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
		    		length:5
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
		        data: ['','','昌平区', '石景山区', '朝阳区', '东城区' , '海淀区'],
		        z: 5,
		        axisLine:{
		        	show:false
		        },
		        axisTick:{
		        	show:false
		        },
		        axisLabel:{
		        	show:true,
		        	textStyle:{
		        		color:'#3399FE',
		        		align:'right',
		        		baseline:'middle',
		        	},
		        	formatter: function (value, index) {
	        		    if ("" == value) {
							return;
						}
	        		    var a = value + " ———— " + Data[index];
	        		    return a;
	        		}
		        }
		        
		    },
		    polar: {
		    	center : ['50%', '50%'],    // 默认全局居中
		        radius : '80%',
		    },
		    series: [{
		        type: 'bar',
		        data: ['', '', 20,20,20, 20,20],
		        coordinateSystem: 'polar',
		        barWidth:0,
		        borderWidth: 0,
		        name: '一级警情',
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
		    }, {
		        type: 'bar',
		        data: ['', '', 20,20,20, 20,20],
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
		        data: ['', '', 20,20,20, 20,20],
		        coordinateSystem: 'polar',
		        name: '三级警情',
		        barWidth:0,
		        borderWidth: 0,
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
		    }],
		    legend: {
		        show: true,
		        top:'-5%',
		        textStyle:{
		            color:'#1E5FBC'
		        },
		        data: ['一级警情', '二级警情', '三级警情']
		    }
		};
	
	 myChart.setOption(option);
}

/*
 * 页面加载事件
 *    触发   加载全局
 */
var width;
var height;
$(function() {
	width = document.getElementById("jamRoadChange1").style.width;
	height = document.getElementById("jamRoadChange1").style.height;
	document.getElementById("jamRoadChange").style.width=width.substring(0,width.length-2)-20+"px";
	document.getElementById("jamRoadChange").style.height=height.substring(0,height.length-2)-44+"px";
	setEcharts0();
});

$(window).resize(function() {
	width = document.getElementById("jamRoadChange1").style.width;
	height = document.getElementById("jamRoadChange1").style.height;
	document.getElementById("jamRoadChange").style.width=width.substring(0,width.length-2)-20+"px";
	document.getElementById("jamRoadChange").style.height=height.substring(0,height.length-2)-44+"px";
}); 

function setEcharts0(){
	var barEchartDiv=document.getElementById('jamRoadChange');
	 //自适应
    window.onresize = barEchartDiv.resize;
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
		        bottom: 20,
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


/*
 * 页面加载事件
 *    触发   加载全局
 */
var width;
var height;
$(function() {
	//自适应设置
	width = document.getElementById("todayWIPS1").style.width;
	height = document.getElementById("todayWIPS1").style.height;
	document.getElementById("todayWIPS").style.width=width.substring(0,width.length-2)-30+"px";
	document.getElementById("todayWIPS").style.height=height.substring(0,height.length-2)-40+"px";
	setEcharts5();
});

$(window).resize(function() {
	width = document.getElementById("todayWIPS1").style.width;
	height = document.getElementById("todayWIPS1").style.height;
	document.getElementById("todayWIPS").style.width=width.substring(0,width.length-2)-30+"px";
	document.getElementById("todayWIPS").style.height=height.substring(0,height.length-2)-40+"px";
}); 

function setEcharts5(){
	var barEchartDiv=document.getElementById('todayWIPS');
	 //自适应
    window.onresize = barEchartDiv.resize;
    
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
	                        width:2  
	                    }  
	                }, 
	                axisLabel:{  
	                	textStyle:{  
	                		color:'#99CCFF',  
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
	                	show:false
	                },
		            data : ['0','1','2','3','4','5','6','7','8','9','10','11','12']
		        }
		    ],
		    yAxis : [
		        {
		            type : 'value',
		            axisLine:{  
	                    lineStyle:{  
	                        color:'#0C2A85',  
	                        width:2  
	                    }  
	                }, 
	                axisLabel:{  
	                	textStyle:{  
	                		color:'#99CCFF',  
	                		width:2  
	                	}  
	                }, 
	                axisTick:{
	                	show:false
	                },
	                splitLine:{  
	                    show:true,
	                    lineStyle:{
		                color:'#0C2A85',
		                width: 2
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
		            		offset:[0, 20],
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
		            data:[34, 33, 35, 40, 38, 31, 31,33,31,30,32,32,34]
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
		            		offset:[0, 20],
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
		            data:[26, 29, 30, 25, 22, 28, 28,27,31,32,28,27,26]
		        }
		    ]
		};
	
	 myChart.setOption(option);
}




