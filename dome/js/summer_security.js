 // 通行车辆
 	
			var myChart = echarts.init(document.getElementById('CurrentVehicle-jh'));
			option= {
				grid: {
			        left: '2%',
			        right: '1%',
			        bottom: '5%',
			        top: '20%',
			        containLabel: true
			    },
		    	legend: {
		    		top: '5%',
		    		itemHeight:5,
		    		itemWidth:15,
		    		data: ["今日","昨日","年度峰值"],
				    textStyle:{
			        	fontSize: 12,
			        	fontWeight:'bold',
			        	color: []
			        	}
				    },
		    	
                   xAxis: {
                   	 	splitLine:{show: false},
                        data: ["北京方向","沈阳方向",],
                        axisLabel: {
				            show: true,
				            textStyle: {color: '#fff',borderColor:'#0052d7',backgroundColor :'#141486',padding:[4, 4, 4, 4]}
			            },
			            axisLine:{
			            	show:false
			            }, 
			            axisTick:{
					        show:false
					    }
                   },
                   yAxis: {
                   		splitLine:{show: false},
                   		
                   		axisLabel: {
				            show: false,
				            textStyle: {color: '#99ccff'}
			                     },
			            axisLine:{
			            	show:false
			            }, 
			            lineStyle: {
			                color: 'rgba(83,155,253,0.2)'
				           },
				        axisTick:{
					        show:false
					    }
                   },
                   series: [
                   {
                        name: '今日',
                        type: 'bar',
                        barWidth :10,
                        barGap:1,
                        data: ["300","200","300"],
                        label: {
				            show: true,
				            position:'top',
				            textStyle: {
				                fontSize: 12,
				                backgroundColor :'rgba(0,0,0,0)'
				            }
				        },
                        itemStyle: {
				            color:'#00ff99'
				        },  
				            
                   },
                   {
                        name: '昨日',
                        type: 'bar',
                        barWidth :10,
                        data: ["200","100","50"],
                        label: {
				            show: true,
				            position:'top',
				            textStyle: {
				                fontSize: 12,
				                backgroundColor :'rgba(0,0,0,0)'
				            }
				        },
                        itemStyle: {
				            color: '#9900ff'
				        },  
				            
                   },
                   {
                        name: '年度峰值',
                        type: 'bar',
                        barWidth :10,
                        data: ["50","100","5"],
                        label: {
				            show: true,
				            position:'top',
				            textStyle: {
				                fontSize: 12,
				                
				                backgroundColor :'rgba(0,0,0,0)'
				            }
				        },
                        itemStyle: {
				            color: '#ffcc33',
				        },  
				            
                   },
                   ]
			};
			myChart.setOption(option);
			window.onresize = myChart.resize;	
  // 通行车辆 
  
  //警卫任务
  
  var myChart1 = echarts.init(document.getElementById('GuardTask1'))
			option1 = {
				title: {
					text: '累计完成 ',
					left: 'center',
					textStyle: {
						fontSize: 12,
						color: '#fff'
					},
					top: '5%',
				},
				grid: {
					left: '0%',
					right: '0%',
					bottom: '5%',
					top: '1%',
					containLabel: true
				},
				legend: {
					left: 'center',
					top: 'bottom',
					itemWidth: 5,
					itemHeight: 5,
					data: ['公路', '铁路', '保障'],
					textStyle: {
						color: ['#eebe05', '#7b29da', '#00ff99'],
						fontSize:12,
						fontWeight:'bold'
					},
					formatter: function(name) {
						var oa = option1.series[1];
						for(var i = 0; i < option1.series[1].data.length; i++) {
							if(name == oa.data[i].name) {
								return name + ':' + oa.data[i].value;
							}
						}
					},
				},
				series: [{
						name: '总量',
						type: 'pie',
						selectedMode: 'single',
						radius: ['0%', '40%'],
						color: ['#010145'],
						label: {
							normal: {
								position: 'center',
								textStyle: {
									color: '#fff',
									fontSize: 14,
									fontWeight: 'bold'
								},
								formatter: '{a}\n\n{c}'
							}
						},

						data: [{
								value: 335,
								name: '直达',
							},

						]
					},
					{
						name: '任务',
						type: 'pie',
						radius: ['40%', '50%'],
						color: ['#ffcc00', '#9933ff', '#00ee92'],
						label: {
							normal: {
								formatter: '{b}：{c}',
								position: 'top',
								show: false,
							}
						},

						data: [{
								value: 18,
								name: '公路'
							},
							{
								value: 23,
								name: '铁路'
							},
							{
								value: 23,
								name: '保障'
							}
						]
					},
				]
			};
			myChart1.setOption(option1);

			var myChart2 = echarts.init(document.getElementById('GuardTask2'));
			option2 = {

				grid: {
					left: '3%',
					right: '4%',
					bottom: '3%',
					top: '20%',
					containLabel: true
				},
				title: {
					text: '今日任务',
					left: 'center',
					textStyle: {
						fontSize: 12,
						color: '#fff'
					},
					top: '5%',
				},
				xAxis: [

					{
						type: 'category',
						show: true,
						data: ['已完成', '执行中', '待执行', ],
						axisTick: {
							alignWithLabel: true
						},
						axisLabel: {
							show: true,
							textStyle: {
								fontWeight: 'bold',
								fontSize: 12,
								color: '#fff'
							}
						},
						axisLine: {
							show: false
						},
						axisTick: {
							show: false
						},
					}
				],
				yAxis: [{
					type: 'value',
					show: false,
				}],
				series: [{
						name: '已完成',
						type: 'bar',
						barWidth: '10',
						color: ['#00ff99'],
						data: [10, 5, 6],
						label: {
							show: true,
							position: 'top',
							textStyle: {
								fontSize: 12,
								fontWeight: 'bold',
								backgroundColor: 'rgba(0,0,0,0)'
							}
						},
						itemStyle: {
							color: function(params) {
								var colorList = ['#00ffcc', '#ffcc00', '#ff3366'];
								return colorList[params.dataIndex];
							}
						},
					},

				]
			};

			myChart2.setOption(option2);
			window.onresize = myChart.resize;

  //警卫任务
  
  //勤务安排
 	
 	var myChart3 = echarts.init(document.getElementById('pavement-service'))
 			option3 = {
				title: {
					text: '路面勤务 ',
					left: 'center',
					textStyle: {
						fontSize: 12,
						color: '#fff'
					},
					top: '5%',
				},
				grid: {
					left: '0%',
					right: '0%',
					bottom: '5%',
					top: '1%',
					containLabel: true
				},
				legend: {
					left: 'center',
					top: 'bottom',
					itemWidth: 5,
					itemHeight: 5,
					data: ['唐山', '保定', '石家庄','承德','张家口','其他'],
					textStyle: {
						color: ['#00f4ae', '#ffb527', '#f83a7b','#8c13d2','#0ab9ff','#ff4b72'],
						fontSize:12,
						fontWeight:'bold'
					},
					// formatter: function(name) {
					// 	var oa = option.series[1];
					// 	for(var i = 0; i < option.series[1].data.length; i++) {
					// 		if(name == oa.data[i].name) {
					// 			return name + ':' + oa.data[i].value;
					// 		}
					// 	}
					// },
				},
				series: [{
						name: '总数',
						type: 'pie',
						selectedMode: 'single',
						radius: ['0%', '40%'],
						color: ['#010145'],
						label: {
							normal: {
								position: 'center',
								textStyle: {
									color: '#fff',
									fontSize: 14,
									fontWeight: 'bold'
								},
								formatter: '{a}\n\n{c}'
							}
						},

						data: [{
								value: 95,
								name: '直达',
							},

						]
					},
					{
						name: '任务',
						type: 'pie',
						radius: ['40%', '50%'],
						color: ['#00f4ae', '#ffb527', '#f83a7b','#8c13d2','#0ab9ff','#ff4b72'],
						label: {
							normal: {
								formatter: '{b}：{c}',
								position: 'top',
								show: false,
							}
						},

						data: [{
								value: 30,
								name: '唐山'
							},
							{
								value: 5,
								name: '保定'
							},
							{
								value: 10,
								name: '石家庄'
							},{
								value: 10,
								name: '承德'
							},{
								value: 10,
								name: '张家口'
							},{
								value: 10,
								name: '其他'
							},
						]
					},
				]
			};
			myChart3.setOption(option3);
			window.onresize = myChart3.resize;

			//第二个图
			
			var myChart4 = echarts.init(document.getElementById('checkpoint-service'))
 			option4 = {
				title: {
					text: '检查站勤务 ',
					left: 'center',
					textStyle: {
						fontSize: 12,
						color: '#fff'
					},
					top: '5%',
				},
				grid: {
					left: '0%',
					right: '0%',
					bottom: '5%',
					top: '1%',
					containLabel: true
				},
				legend: {
					left: 'center',
					top: 'bottom',
					itemWidth: 5,
					itemHeight: 5,
					data: ['唐山', '保定', '石家庄','承德','张家口','其他'],
					textStyle: {
						color: ['#00f4ae', '#ffb527', '#f83a7b','#8c13d2','#0ab9ff','#ff4b72'],
						fontSize:12,
						fontWeight:'bold'
					},
					// formatter: function(name) {
					// 	var oa = option1.series[1];
					// 	for(var i = 0; i < option1.series[1].data.length; i++) {
					// 		console.log(oa.data[i].name);
					// 		if(name == oa.data[i].name) {
					// 			return name + ':' + oa.data[i].value;
					// 		}
					// 	}
					// },
				},
				series: [{
						name: '总数',
						type: 'pie',
						selectedMode: 'single',
						radius: ['0%', '40%'],
						color: ['#010145'],
						label: {
							normal: {
								position: 'center',
								textStyle: {
									color: '#fff',
									fontSize: 14,
									fontWeight: 'bold'
								},
								formatter: '{a}\n\n{c}'
							}
						},

						data: [{
								value: 95,
								name: '直达',
							},

						]
					},
					{
						name: '任务',
						type: 'pie',
						radius: ['40%', '50%'],
						color: ['#00f4ae', '#ffb527', '#f83a7b','#8c13d2','#0ab9ff','#ff4b72'],
						label: {
							normal: {
								formatter: '{b}：{c}',
								position: 'top',
								show: false,
							}
						},

						data: [{
								value: 30,
								name: '唐山'
							},
							{
								value: 5,
								name: '保定'
							},
							{
								value: 10,
								name: '石家庄'
							},{
								value: 10,
								name: '承德'
							},{
								value: 10,
								name: '张家口'
							},{
								value: 10,
								name: '其他'
							},
						]
					},
				]
			};
			myChart4.setOption(option4);
			window.onresize = myChart4.resize;
  
  //勤务安排
  
  //交通事故
  
  	var myChart5 = echarts.init(document.getElementById('TrafficAccident'));
			
			
		option5= {
	    	
		    	grid: {
			        left: '2%',
			        right: '1%',
			        bottom: '3%',
			        top: '15%',
			        containLabel: true
			    },
                   xAxis: {
                   	 	splitLine:{show: false},
                        data: ["碰撞运动车辆","碰撞静止车辆","刮撞行人","碰撞后碾压行人","其他"],
                        axisLabel: {
				            show: true,
				            textStyle: {color: '#fff' },
				            formatter: function(value){
				            	return value.slice(0,4)+"\n"+value.slice(4);
				            }
			            },
			            axisTick:{
			            	show:false
			            },
			            axisLine:{
			            	show:false
			            }, 
                   },
                   yAxis: {
                   	    show:false,
                   		splitLine:{show: false},
                   		
                   		axisLabel: {
				            show: false
			                     },
			            axisLine:{
			            	show:false
			            }, 
			            lineStyle: {
			                color: 'rgba(83,155,253,0.2)'
				            }
                   },
                   series: [
                   {
                        name: '上道',
                        type: 'bar',
                       	center:'50% 60%',
                        barWidth :10,
                        data: ["120","102","6","102","6"],
                        label: {
				            show: true,
				            position:'top',
				            textStyle: {
				                fontSize: 12,
				                color:'#fff',
				                backgroundColor :'rgba(0,0,0,0)'
				            }
				        },
                        itemStyle: {
				            color: function (params){
	                        	var colorList = ['#00f4ae', '#7008c2', '#fe9516','#ae2966','#2451c2'];
	                        	return colorList[params.dataIndex];
	                    	}
				        },  
				            
                   },
                   ]
			};
			
			myChart5.setOption(option5);
			window.onresize = myChart5.resize;
  
  //交通事故
  //
  
  
  //天气和概况
  // 天气与概括切换
		    $("#fact_content").hide();
			$("#wet_content").show();
			$("#qie_wet").click(function(){		  
			     $("#qie_wet").removeClass('btnChecked1').addClass('btnDefault1') ;
			    $("#qie_fact").removeClass('btnDefault1').addClass('btnChecked1') ;
			    $("#fact_content").hide();
			    $("#wet_content").show();
			})
			$("#qie_fact").click(function(){
			     $("#qie_wet").removeClass('btnDefault1').addClass('btnChecked1') ;
			    $("#qie_fact").removeClass('btnChecked1').addClass('btnDefault1') ;
			    $("#fact_content").show();
			    $("#wet_content").hide();
			})
			// 天气与概括切换

$(function(){
				$(".summer-weathe-inner ul:nth-child(2) li").mouseover(function(){
						var k=$(this).index();
						$(this).css({"color":"#d2535f"}).siblings().css({"color":"#61234d"});
						$(".summer-weathe-inner ul:nth-child(1) li").eq(k).fadeToggle(500).siblings().css({"display":"none"});
				})
				
				$.ajax({
				type : "POST",
				url :  "weather/getWeather.do",
				Ansyc : false,
				data : {
					'timeParam' : recallDate
				},
				dataType : "json",
				success : function(data) {
						var cityWeather = data.weatherSituationList;
						for(var i = 0;i < cityWeather.length; i ++){
								var cityName =  cityWeather[i].city;
								var weatherNo = cityWeather[i].weather;
								switch(cityName){
										case '北京': 
												var weatherName = transformText(weatherNo);
												$('#beijingWeather').html(weatherName);
												var imgPath = weatherToImg(weatherNo);
												$('#beijingWeatherImg').attr('src',imgPath);break;
										case '天津': 
												var weatherName = transformText(weatherNo);
												$('#tianjinWeather').html(weatherName);
												var imgPath = weatherToImg(weatherNo);
												$('#tianjinWeatherImg').attr('src',imgPath);break;
										case '香河': 
												var weatherName = transformText(weatherNo);
												$('#xiangheWeather').html(weatherName);
												var imgPath = weatherToImg(weatherNo);
												$('#xiangheWeatherImg').attr('src',imgPath);break;
										case '唐山': 
												var weatherName = transformText(weatherNo);
												$('#tangshanWeather').html(weatherName);
										
												var imgPath = weatherToImg(weatherNo);
												//$('#tangshanWeatherImg').attr('src',imgPath);break;
										case '秦皇岛': 
												var weatherName = transformText(weatherNo);
												$('#qinhuangdaoWeather').html(weatherName);
												var imgPath = weatherToImg(weatherNo);
												$('#qinhuangdaoWeatherImg').attr('src',imgPath);break;
										default:break;
								}
							
						}
						if (data.weatherBadInfoList.length === 0) {
							var divshow = $(".summer-weathe-inner");
							divshow.text("");// 清空数据
							divshow.append('暂无数据'); // 添加Html内容，不能用Text 或 Val
						}else{
							$(".summer-weathe-inner").empty();
							var html = "";
							var index = 0;
							$(".summer-weathe-inner").html(data.weatherBadInfoList[index].badInfo);
							setInterval(function() {
									index++;
									if (index == data.weatherBadInfoList.length) {
											index = 0;
									}
									html = data.weatherBadInfoList[index].badInfo;
									$(".summer-weathe-inner").html(html);
							}, 1000 * 5);
				}
		}
	});
	
	});
	
	
	
	
	
	
function weatherToImg(weatherNo){
	var weatherImg = "";
	switch(weatherNo){
			case '1':weatherImg = "../images/board/Clear.png";break;
			case '2':weatherImg = "../images/board/Overcast.png";break;
			case '3':weatherImg = "../images/board/Shower.png";break;
			default:weatherImg = "../images/board/Shower.png";break;
	}
	return weatherImg;

} 

var showNo = 0;//显示全部高速
function showHighWay(obj){
			//展示那条高速
      if(showNo == 1 && $('#roadId').val() == obj){
      		//判断是否选择的跟显示的为同一路段，如果是，则显示全部高速公路
      		$('#roadId').val('00001,21300,21100,00025,21200');
      		showNo = 0; 
      		changeFontColor('xx');//任意字符
      }else{
      		$('#roadId').val(obj);
      		showNo = 1;//显示所选路段
      		changeFontColor(obj);
      }
      searchData('csdlw_pl');
      
}	


function changeFontColor(obj){
		$('#jhHighWayTd').css('color','white');
		$('#tjHighWayTd').css('color','white');
		$('#yhHighWayTd').css('color','white');
		switch(obj){
				case('00001'):$('#jhHighWayTd').css('color','#00FE9A');break;
				case('21300'):$('#tjHighWayTd').css('color','#00FE9A');break;
				case('21100'):$('#yhHighWayTd').css('color','#00FE9A');break;
				default:break;
		}
}	
	

		
$(function(){

		$.ajax({
		type : "POST",
		url :  "summerVacation/queryCrowdedNo",
		Ansyc : false,
		data : {
			
		},
		dataType : "json",
		success : function(data) {
			var allProvinceData = data[0].allProvinceData;
			for(var i = 0;i<data.length;i++){
					var roadName = data[i].roadName;
					switch(roadName){
							case '京哈高速':$('#jhHighWay').html(data[i].crowdedNo);break;
							case '沿海高速':$('#tjHighWay').html(data[i].crowdedNo);break;
							case '唐津高速':$('#yhHighWay').html(data[i].crowdedNo);break;
					}
			}
			$('#wholeProvinceCrowded').html(allProvinceData);
		}
	});

})

$(function(){
		initIntimeRoad();
		initIntimeManager();
});
var IntimeCrowdedArr = [];
var IntimeManagerArr = [];

function initIntimeManager(){
		IntimeManagerArr = [];
		$.ajax({
	      type: "POST",
	      url:"summerVacation/queryManagerInfo",
	      cache : false,	//禁用缓存
	      dataType: "json",
	      async:false,
	      data: {
	      	
	      },	//传入已封装的参数
	      success:function(data){
	    	for (var i = 0; i < data.length; i++) {
	    	  	IntimeManagerArr.push({"name":data[i].managerType,"value":data[i].managerNo});	
	    	  	 /*var managerType = data[i].managerType;
	    	  	 switch(managerType){
	    	  	 		case "关闭站口":$('#closeBayonet').html(data[i].managerNo);break;
	    	  	 		case "分方向同行":$('#divideDirection').html(data[i].managerNo);break;
	    	  	 		case "重点车限行":$('#keyVehicleForbidden').html(data[i].managerNo);break;
	    	  	 		case "分流":$('#divideFlow').html(data[i].managerNo);break;
	    	  	 		default:break;
	    	  	 }*/
	    		   
		 	}
		 	initManagerInfoChart();
	      },
	      error: function(XMLHttpRequest, textStatus, errorThrown) {
	          sweetAlert("查询失败","","error");
	      }
			})
}

function initIntimeRoad(){
	IntimeCrowdedArr = [];
	$.ajax({
	    type: "POST",
	    url:"summerVacation/queryCrowdedAmount",
	    cache : false,	//禁用缓存
	    dataType: "json",
	    async:false,
	    data: {
	      	
		},	//传入已封装的参数
	    success:function(data){
	    	for (var i = 0; i < data.length; i++) {
	    	  	IntimeCrowdedArr.push({"name":data[i].crowdedType,"value":data[i].crowdedAmount});	
	    	  	var crowdedType = data[i].crowdedType;
	    	  	/*switch(crowdedType){
	    	  	 		case "站口":$('#bayonetCrowdedAmount').html(data[i].crowdedAmount);break;
	    	  	 		case "服务区":$('#serverZoneCrowdedAmount').html(data[i].crowdedAmount);break;
	    	  	 		case "路段":$('#roadCrowdedAmount').html(data[i].crowdedAmount);break;
	    	  	 		default:break;
	    	  	 }*/
	    		   
		 	}
		 	initCrowdedAmountChart();
	      },
	      error: function(XMLHttpRequest, textStatus, errorThrown) {
	          sweetAlert("查询失败","","error");
	      }
			})
			
}			

  var chart7 = echarts.init(document.getElementById('congest_pie'))
		var	option7 = {
			     color:['#00ebc2','#5016d7','#ffc02d'],
			    tooltip : {
			        show:false
			    },
			    legend: {
			        show:false
			    },
			    series : [
			        {
			            name: '访问来源',
			            type: 'pie',
			            radius : '55%',
			            center: ['62%', '50%'],
			            data:[
			              
			                {value:1, name:'联盟广告'},
			                {value:1, name:'视频广告'},
			                {value:1, name:'搜索引擎'}
			            ],
			            label:{
			                 normal: {
			                    show: false
			                }
			            },
			             labelLine: {
			                normal: {
			                    show: false
			                }
			            },
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
			chart7.setOption(option7);

var chart9 = echarts.init(document.getElementById('congestone'))
		   var hideStyle = {
            normal: {
                color: '#060a46', //未完成的圆环的颜色
                label: {
                    show: false
                },
                labelLine: {
                    show: false
                }
            },
            emphasis: {
                show: false
            }
        };
        var option9 = {
            //backgroundColor: '#fff',
            
            series: [{
                name: '武警',
                type: 'pie',
                clockWise: true, //顺时针
                radius: ['60%', '65%'],
                label: {
                    normal: {
                        show: false,
                        position: 'inside'
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                hoverAnimation: false,
                itemStyle:{
                    color:'#00ff99'
                },
                data: [{
                    value: 65,
                    name: 'B'
                }, {
                    value: 35,
                    name: 'hide',
                    itemStyle: hideStyle
                }]
            }, {
                name: '民警',
                type: 'pie',
                clockWise: true, //顺时针
                radius: ['45%', '50%'],
                label: {
                    normal: {
                        show: false,
                        position: 'inside'
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                hoverAnimation: false,
                itemStyle:{
                    color:'#00ccff'
                },
                data: [{
                    value: 55,
                    name: 'C'
                }, {
                    value: 45,
                    name: 'hide',
                    itemStyle: hideStyle
                }]
            }, {
                name: '协警',
                type: 'pie',
                clockWise: true, //顺时针
                radius: ['30%', '35%'],
                label: {
                    normal: {
                        show: false,
                        position: 'inside'
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                hoverAnimation: false,
                itemStyle:{
                    color:'#5228e0'
                },
                data: [{
                    value: 45,
                    name: 'D'
                }, {
                    value: 55,
                    name: 'hide',
                    itemStyle: hideStyle
                }]
            }]
        };
			chart9.setOption(option9);
//天气和概况



//高速列表

$(".serial_number").hide();
			$(".search_inner").on("click","li",function(){
				$(".serial_number").show();
				$(".high_speed").hide();
			})
			$(".out_page").click(function(){
				$(".serial_number").hide();
				$(".high_speed").show();
			})

//高速列表

//饱和度

var chart5 = echarts.init(document.getElementById('yinyue'))
 			var option5 = {
				  grid: {
				        left: '10%',
				        right: '10%',
				        bottom: '0%',
				        top: '0%',
				        containLabel: true
				    },
				    
				    
				    
				tooltip: {
			        trigger: 'item',
			        formatter: function(data) {
			        	console.log(data);
			            return data.seriesName +'上道：'+ data.value+'下道：'+ data.value; //提示框显示信息
			        },
			        triggerOn: 'mousemove'
			    },
			    xAxis : [
			        {
			            type : 'value',
			            axisLabel: {
				            show: false,
				            textStyle: {color: '#fff' },
				            rotate:-90,
			            },
			            axisTick: {
					        show: false
					    },
			            splitLine: {show:false},
			            
			            axisLine:{
			            	show:false,
			            	lineStyle: {
			                	color: 'rgba(83,155,253,0.2)'
				            }
			            }
			        }
			    ],
			    yAxis : [
			        {
			            show:false,
			            type : 'category',
			            splitLine: {
			            	show:false,
			            },
			            axisTick: {
					        show: false
					    },
			            data :['北京方向'],
			            axisLabel: {
				            show: true,
				            textStyle: {color: '#fff' }
			            },
			            axisLine:{
			            	show:false,
			            	lineStyle: {
			                	color: 'rgba(83,155,253,0.2)'
				            }
			            }
			            
			        }
			    ],
			    series : [
			        
			        {
			            name:'香河',
			            type:'bar',
			            stack: '总量',
			            barWidth:10,
			            barGap:0,
			            itemStyle : { 
			            	normal: {
			                    color:'#0d0d65'
			            			 }
			            },
			            label: {
			                normal: {
			                    show: false,
			                    position: 'bottom',
			                    formatter:'{a}',
			                    color:'#fff'
			                }
			            },
			            data:[900,]
			        },
			        {
			            name:'玉田',
			            type:'bar',
			            stack: '总量',
			            barWidth:20,
			            barGap:0,
			            itemStyle : { 
			            	normal: {
			                    color:'#f6ae2f'
			            			 }
			            },
			            label: {
			                normal: {
			                    show: false,
			                    position: 'bottom',
			                    formatter:'{a}',
			                    color:'#fff'
			                }
			            },
			            data:[900,]
			        },
			        {
			            name:'丰润',
			            type:'bar',
			            stack: '总量',
			            barWidth:20,
			            barGap:0,
			            itemStyle : { 
			            	normal: {
			                    color:'#f08109'
			            			 }
			            },
			            label: {
			                normal: {
			                    show: false,
			                    position: 'bottom',
			                    formatter:'{a}',
			                    color:'#fff'
			                }
			            },
			            data:[900,]
			        },
			        {
			            name:'榛子镇',
			            type:'bar',
			            stack: '总量',
			            barWidth:20,
			            barGap:0,
			            itemStyle : { 
			            	normal: {
			                    color:'#cc3333'
			            			 }
			            },
			            label: {
			                normal: {
			                    show: false,
			                    position: 'bottom',
			                    formatter:'{a}',
			                    color:'#fff'
			                }
			            },
			            data:[900,]
			        },
			        {
			            name:'迁安',
			            type:'bar',
			            stack: '总量',
			            barWidth:20,
			            barGap:0,
			            itemStyle : { 
			            	normal: {
			                    color:'#33cc66'
			            			 }
			            },
			            label: {
			                normal: {
			                    show: false,
			                    position: 'bottom',
			                    formatter:'{a}',
			                    color:'#fff'
			                }
			            },
			            data:[900,]
			        },
			        {
			            name:'抚宁',
			            type:'bar',
			            stack: '总量',
			            barWidth:20,
			            barGap:0,
			            itemStyle : { 
			            	normal: {
			                    color:'#f08109'
			            			 }
			            },
			            label: {
			                normal: {
			                    show: false,
			                    position: 'bottom',
			                    formatter:'{a}',
			                    color:'#fff'
			                }
			            },
			            data:[900,]
			        },
			        {
			            name:'承秦京哈互通',
			            type:'bar',
			            stack: '总量',
			            barWidth:20,
			            barGap:0,
			            itemStyle : { 
			            	normal: {
			                    color:'#33cc66'
			            			 }
			            },
			            label: {
			                normal: {
			                    show: false,
			                    position: 'bottom',
			                    formatter:'{a}',
			                    color:'#fff'
			                }
			            },
			            data:[900,]
			        },
			        {
			            name:'山海关',
			            type:'bar',
			            stack: '总量',
			            barWidth:20,
			            barGap:0,
			            itemStyle : { 
			            	normal: {
			            		show:false,
			                    color:'#f6ae2f',
			                    
			            			 }
			            	
			            },
			            label: {
			                normal: {
			                    show: false,
			                    position: 'bottom',
			                    formatter:'{a}',
			                    color:'#fff'
			                }
			            },
			            data:[900,]
			        },
			    ]
			};
                    
			chart5.setOption(option5);

			var chart6 = echarts.init(document.getElementById('yinyue1'))
 			var option6 = {
				  grid: {
				        left: '10%',
				        right: '10%',
				        bottom: '0%',
				        top: '0%',
				        containLabel: true
				    },
				    
				    
				    
				tooltip: {
			        trigger: 'item',
			        formatter: function(data) {
			            return data.seriesName +'上道：'+ data.value+'下道：'+ data.value; //提示框显示信息
			        },
			        triggerOn: 'mousemove'
			    },
			    xAxis : [
			        {
			            type : 'value',
			            axisLabel: {
				            show: false,
				            textStyle: {color: '#fff' },
				            rotate:-90,
			            },
			            axisTick: {
					        show: false
					    },
			            splitLine: {show:false},
			            
			            axisLine:{
			            	show:false,
			            	lineStyle: {
			                	color: 'rgba(83,155,253,0.2)'
				            }
			            }
			        }
			    ],
			    yAxis : [
			        {
			            show:false,
			            type : 'category',
			            splitLine: {
			            	show:false,
			            },
			            axisTick: {
					        show: false
					    },
			            data :['北京方向'],
			            axisLabel: {
				            show: true,
				            textStyle: {color: '#fff' }
			            },
			            axisLine:{
			            	show:false,
			            	lineStyle: {
			                	color: 'rgba(83,155,253,0.2)'
				            }
			            }
			            
			        }
			    ],
			    series : [
			        
			        {
			            name:'香河',
			            type:'bar',
			            stack: '总量',
			            barWidth:10,
			            barGap:0,
			            itemStyle : { 
			            	normal: {
			                    color:'#0d0d65'
			            			 }
			            },
			            label: {
			                normal: {
			                    show: true,
			                    position: 'bottom',
			                    formatter:'{a}',
			                    color:'#fff'
			                }
			            },
			            data:[900,]
			        },
			        {
			            name:'玉田',
			            type:'bar',
			            stack: '总量',
			            barWidth:20,
			            barGap:0,
			            itemStyle : { 
			            	normal: {
			                    color:'#f6ae2f'
			            			 }
			            },
			            label: {
			                normal: {
			                    show: true,
			                    position: 'bottom',
			                    formatter:'{a}',
			                    color:'#fff'
			                }
			            },
			            data:[900,]
			        },
			        {
			            name:'丰润',
			            type:'bar',
			            stack: '总量',
			            barWidth:20,
			            barGap:0,
			            itemStyle : { 
			            	normal: {
			                    color:'#f08109'
			            			 }
			            },
			            label: {
			                normal: {
			                    show: true,
			                    position: 'bottom',
			                    formatter:'{a}',
			                    color:'#fff'
			                }
			            },
			            data:[900,]
			        },
			        {
			            name:'榛子镇',
			            type:'bar',
			            stack: '总量',
			            barWidth:20,
			            barGap:0,
			            itemStyle : { 
			            	normal: {
			                    color:'#cc3333'
			            			 }
			            },
			            label: {
			                normal: {
			                    show: true,
			                    position: 'bottom',
			                    formatter:'{a}',
			                    color:'#fff'
			                }
			            },
			            data:[900,]
			        },
			        {
			            name:'迁安',
			            type:'bar',
			            stack: '总量',
			            barWidth:20,
			            barGap:0,
			            itemStyle : { 
			            	normal: {
			                    color:'#33cc66'
			            			 }
			            },
			            label: {
			                normal: {
			                    show: true,
			                    position: 'bottom',
			                    formatter:'{a}',
			                    color:'#fff'
			                }
			            },
			            data:[900,]
			        },
			        {
			            name:'抚宁',
			            type:'bar',
			            stack: '总量',
			            barWidth:20,
			            barGap:0,
			            itemStyle : { 
			            	normal: {
			                    color:'#f08109'
			            			 }
			            },
			            label: {
			                normal: {
			                    show: true,
			                    position: 'bottom',
			                    formatter:'{a}',
			                    color:'#fff'
			                }
			            },
			            data:[900,]
			        },
			        {
			            name:'承秦京哈互通',
			            type:'bar',
			            stack: '总量',
			            barWidth:20,
			            barGap:0,
			            itemStyle : { 
			            	normal: {
			                    color:'#33cc66'
			            			 }
			            },
			            label: {
			                normal: {
			                    show: true,
			                    position: 'bottom',
			                    formatter:'{a}',
			                    color:'#fff'
			                }
			            },
			            data:[900,]
			        },
			        {
			            name:'山海关',
			            type:'bar',
			            stack: '总量',
			            barWidth:20,
			            barGap:0,
			            itemStyle : { 
			            	normal: {
			                    color:'#f6ae2f',
			                    
			            			 }
			            	
			            },
			            label: {
			                normal: {
			                    show: true,
			                    position: 'bottom',
			                    formatter:'{a}',
			                    color:'#fff'
			                }
			            },
			            data:[900,]
			        },
			    ]
			};
                    
			chart6.setOption(option6);

////饱和度