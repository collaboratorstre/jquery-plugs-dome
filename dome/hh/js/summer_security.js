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
			     tooltip: {
			        trigger: 'item'
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
					type: 'scroll',
					top:'75%',
			        // height:10,
			        // width:100,
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
 				 tooltip: {
			        trigger: 'item'
			    },
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
					type: 'scroll',
					top:'80%',
			        // height:10,
			        // width:100,
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
					
					type: 'scroll',
					top:'80%',
			        // height:10,
			        // width:100,
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
	    		tooltip:{
	    			trigger: 'item'
	    		},
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
  
  $('.wea_sele select').on('change',function(){
  	switch($(this).val()){
					case '秦皇岛': 
							
							$('#wea_cond').html('晴转多云');
							
							$('#wea_temp').html('18~24℃');break;
					case '天津': 
							$('#wea_cond').html('晴');
							
							$('#wea_temp').html('18~34℃');break;
					case '香河': 
							$('#wea_cond').html('多云');
							
							$('#wea_temp').html('18~30℃');break;
					case '唐山': 
							$('#wea_cond').html('多云转阵雨');
							
							$('#wea_temp').html('18~25℃');break;
							//$('#tangshanWeatherImg').attr('src',imgPath);break;
					default:break;
			}
    if($(this).val()){
        var selectText = $(this).find('option:selected').text();
        var index = selectText.indexOf('-');
        var price = selectText.substring(index+1);
        $('#price_buy').val(price);
    }else{


        $('#price_buy').val('');
    }
});

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
					console.log(data);
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
			   title: {
                        "text": '37段',
                        itemGap:3,
                        "x": '49%',
                        "y": '62%',
                        textAlign: "center",
                        "textStyle": {
                            "fontWeight": 'normal',
                            "fontSize": 18,
                            color:'#aaaaaa',

                        },
                        "subtextStyle": {
                            "fontWeight": 'normal',
                            "fontSize": 12,
                            color:'#aaaaaa',
                            lineHeight:14
                        },

                    },

                
                  /*  legend: {

                        x: 'left',
                        data:['视频','影院','直播']
                    },*/
                    "color": ["#C72626","#5016d7","#FDBB00", "transparent"],
                    "startAngle": 180,
                    series: [
                        {
                            name:'',
                            type:'pie',
                            radius: ['60%', '90%'],
                            avoidLabelOverlap: false,
                            startAngle: 180,
                            center:["50%","70%"],
                            //stillShowZeroSum:0,
                            label: {

                                normal: {
                                    show:false,
                                    position: 'inner',
                                    textStyle: {
                                        color: '#fff',
                                        fontSize: 12
                                    }
                                },
                                emphasis: {
                                    show: false,
                                    textStyle: {
                                        fontSize: '12',
                                        fontWeight: 'bold'
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data:[{value:79, name:'严重拥堵'},{value:31, name:'拥堵'},{value:12, name:'缓行'},{value:122, name:'',tooltip:{formatter:function(a){return ""}}}]
                        },

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
           grid: {
           			 // show: true,
            		// borderColor:'red',
					left: '0%',
					right: '0%',
					bottom: '0%',
					top: '1%',
					containLabel: true
				},
            color: ['#FDA119', '#6F14EE', '#FF4F7E','#00DCDD'],
          
           series: [
			        {
			            name:'访问来源',
			            type:'pie',
			            radius: ['50%', '70%'],
			         
			          
			           label: {
			                normal: {
			                	 formatter: '{b}\n{c}',
			                    textStyle: {
			                        color: 'white'
			                    }
			                }
			            },
			            labelLine: {
			                normal: {

			                    lineStyle: {
			                        color: 'white'
			                    },
			                    smooth: 0.2,
			                    length: 1,
			                    length2: 1
			                }
			            },
			            
			            data:[
			                {value:79, name:'重点车限行'},
			                {value:12, name:'关闭站口'},
			                {value:31, name:'分流'},
			                {value:120, name:'分方向通行'}
			                
			            ]
			        }
			    ]
        };
			chart9.setOption(option9);
//天气和概况



//高速列表

// $(".serial_number").hide();
// 			$(".search_inner").on("click","li",function(){
// 				$(".serial_number").show();
// 				$(".high_speed").hide();
// 			})
// 			$(".out_page").click(function(){
// 				$(".serial_number").hide();
// 				$(".high_speed").show();
// 			})

//高速列表

//饱和度

var chart5 = echarts.init(document.getElementById('yinyue'))
 			var option5 = {
				  grid: {
				        left: '10%',
				        right: '10%',
				        bottom: '0%',
				        top: '70%',
				        containLabel: true
				    },
				    
				    
				    
				tooltip: {
			        trigger: 'item',
			        formatter: function(data) {
			        	console.log(data);
			            return '通行量：'+ data.value; //提示框显示信息
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
				        top: '30%',
				        containLabel: true
				    },
				    
				    
				    
				tooltip: {
			        trigger: 'item',
			        formatter: function(data) {
			          return '通行量：'+ data.value; //提示框显示信息
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
///
///

// 新增高速
           // $(".launch").hide();
           $("#tj_bord").hide();
           $("#yh_bord").hide();



			$(".high_speed").on("click",".name_high .launch",function(){
			
				var val = $(this).text();
				var cons = $(this).parent().next();
				if(val == '展开'){
					cons.show();
					val = $(this).text('收起')
				}else{
					cons.hide();
					val = $(this).text('展开')
				}
			})






		var datas = {
			京哈:[
				{
					kkmc:"绿景路-星星花园路段（西往东）",x:"113.100972",y:"23.004361",zbzt:"1",cloudid:"2194",ssdlid:"0001"
				},
				{
					kkmc:"激化路-莲塘村路段（东往西）",x:"113.100972",y:"23.004361",zbzt:"0",cloudid:"2194",ssdlid:"0001"
				}
			],
			唐津:[
				{
					kkmc:"asdf-asdf（rr）",x:"113.100972",y:"23.004361",zbzt:"1",cloudid:"2194",ssdlid:"0001"
				},
				{
					kkmc:"asdf-fasd（ff）",x:"113.100972",y:"23.004361",zbzt:"0",cloudid:"2194",ssdlid:"0001"
				}
			]

		}


		for(var i=0;i<datas['京哈'].length;i++){

			  var data1= '';
			  data1 += '<li>'+
			   '<div class="name_ser">'+
				'<div class="name_cons">'+datas['京哈'][i].kkmc+'</div>'+
				'<div class="ser_status">';
			  if(datas['京哈'][i].sbzt=='0'){
				data1 += '<img src="./images/nor.png" alt="" style="vertical-align: middle;"></div>';
			  }else{
				data1 += '<img src="./images/guz.png" alt="" style="vertical-align: middle;"></div>';
			  }
			  data1 += '</div><div class="infer_dir">'+
	             '京哈高速150km+900 沈阳方向'+ 
			     '</div>'+
			     '<button class="control" >监控</button>'+	
				  '</li>';
				
				    
				  
			 $("#jing_ha").append($(data1));
			 $("#tang_jin").append($(data1));
			 $("#yan_hai").append($(data1));    
			
		}
		
			$(".high_speed").on("click",".search_content .search_inner .control",function(){
			
				var val = $(this).text();
				if(val == '监控'){
					
					
				}else{
				
					val = $(this).text('监控')
				}
			})

		
//高速列表
//
//卡口和视频
$(".bayonet_conts").hide();
$(".videos_conts").hide();
$(".hq_kakou").hide();
$(".hs_kakou").hide();
$(".shipin_kou").hide();

$(".bay_vid").on("click","div",function(){
	$(".bay_vid>div").removeClass("btnDefault1").addClass("btnChecked1");

	// $(".bayonet_conts>div").removeClass("bay_vid_checked").addClass("bay_vid_def");
	// $(".videos_conts>div").removeClass("bay_vid_checked").addClass("bay_vid_def");
	$(this).addClass("btnDefault1").removeClass("btnChecked1");
	if($(this).text() == "卡口"){
		$(".bayonet_conts").show();
		$(".videos_conts").hide();
		$(".hs_kakou").hide();
		$(".gaosu_load").show();
		$(".hq_kakou").hide();
		$(".shipin_kou").hide();
		$(".bayonet_conts>div").removeClass("bay_vid_checked").addClass("bay_vid_def");
		$(".bayonet_conts>div:last-child").addClass("bay_vid_checked")
	}else if($(this).text() == "视频"){
		$(".bayonet_conts").hide();
		$(".videos_conts").show();
		$(".hs_kakou").hide();
		$(".gaosu_load").hide();
		$(".hq_kakou").hide();
		$(".shipin_kou").show();
	}
})
$(".bayonet_conts").on("click","div",function(){
	$(".bayonet_conts>div").removeClass("bay_vid_checked").addClass("bay_vid_def");
	// $(".bay_vid>div").removeClass("btnDefault1").addClass("btnChecked1");
	$(this).addClass("bay_vid_checked").removeClass("bay_vid_def");
	if($(this).text() == "环秦"){
		$(".hq_kakou").show();
		$(".gaosu_load").hide();
		$(".hs_kakou").hide();
		$(".shipin_kou").hide();
	}else if($(this).text() == "环暑"){
		$(".hs_kakou").show();
		$(".gaosu_load").hide();
		$(".hq_kakou").hide();
		$(".shipin_kou").hide();
	}else if($(this).text() == "高速公路"){
		$(".hs_kakou").hide();
		$(".gaosu_load").show();
		$(".hq_kakou").hide();
		$(".shipin_kou").hide();
	}
})
$(".videos_conts").on("click","div",function(){
	$(".videos_conts>div").removeClass("bay_vid_checked").addClass("bay_vid_def");
	$(this).addClass("bay_vid_checked").removeClass("bay_vid_def");
	if($(this).text() == "高速公路"){
		$(".hs_kakou").hide();
		$(".gaosu_load").hide();
		$(".hq_kakou").hide();
		$(".shipin_kou").show();
	}
})

var datas1 = {
			环秦:[
				{
					kkmc:"秦皇岛东开放式卡口",x:"113.100972",y:"23.004361",zbzt:"1",cloudid:"2194",ssdlid:"0001"
				},
				{
					kkmc:"秦皇岛被开放式卡口",x:"113.100972",y:"23.004361",zbzt:"0",cloudid:"2194",ssdlid:"0001"
				},
				{
					kkmc:"秦皇岛开发区卡口",x:"113.100972",y:"23.004361",zbzt:"0",cloudid:"2194",ssdlid:"0001"
				},
				{
					kkmc:"北戴河开放式卡口",x:"113.100972",y:"23.004361",zbzt:"0",cloudid:"2194",ssdlid:"0001"
				},{
					kkmc:"昌黎东开放式卡口",x:"113.100972",y:"23.004361",zbzt:"0",cloudid:"2194",ssdlid:"0001"
				},
				{
					kkmc:"南戴河开放式卡口",x:"113.100972",y:"23.004361",zbzt:"0",cloudid:"2194",ssdlid:"0001"
				}
			],
			环暑:[
				{
					kkmc:"万家收费站-京哈高速301KM北京方向",x:"113.100972",y:"23.004361",zbzt:"1",cloudid:"2194",ssdlid:"0001"
				},
				{
					kkmc:"承秦主线站-承秦高速165KM秦皇岛方向",x:"113.100972",y:"23.004361",zbzt:"0",cloudid:"2194",ssdlid:"0001"
				},
				{
					kkmc:"承唐主线站-承唐主线站开放式卡口",x:"113.100972",y:"23.004361",zbzt:"0",cloudid:"2194",ssdlid:"0001"
				},{
					kkmc:"香河主线站-42KM+95M沈阳方向",x:"113.100972",y:"23.004361",zbzt:"0",cloudid:"2194",ssdlid:"0001"
				},{
					kkmc:"丰南西主线站-丰南西开放式卡口（进省）",x:"113.100972",y:"23.004361",zbzt:"0",cloudid:"2194",ssdlid:"0001"
				},{
					kkmc:"涧河主线站-涧河开放式卡口（入省）",x:"113.100972",y:"23.004361",zbzt:"1",cloudid:"2194",ssdlid:"0001"
				}
			],
			视频:[
				{
					kkmc:"京哈高速125km+240m处枪机1 沈阳方向",xjdm:"130229000013100065106",x:"113.100972",y:"23.004361",zbzt:"1",cloudid:"2194",ssdlid:"0001"
				},
				{
					kkmc:"京哈高速125km+240m处枪机2 沈阳方向",xjdm:"130229000013100065107",x:"113.100972",y:"23.004361",zbzt:"1",cloudid:"2194",ssdlid:"0001"
				},
				{
					kkmc:"京哈高速125km+240m处枪机3 沈阳方向",xjdm:"130229000013100065108",x:"113.100972",y:"23.004361",zbzt:"1",cloudid:"2194",ssdlid:"0001"
				},
				{
					kkmc:"京哈高速125km+240m处枪机4 沈阳方向",xjdm:"130229000013100065109",x:"113.100972",y:"23.004361",zbzt:"1",cloudid:"2194",ssdlid:"0001"
				},
				{
					kkmc:"京哈高速125km+240m处球机 沈阳方向",xjdm:"130229000013100006561",x:"113.100972",y:"23.004361",zbzt:"1",cloudid:"2194",ssdlid:"0001"
				},
				{
					kkmc:"京哈高速125km+400m处枪机 北京方向",xjdm:"130229000013100065100",x:"113.100972",y:"23.004361",zbzt:"1",cloudid:"2194",ssdlid:"0001"
				},
				{
					kkmc:"京哈高速125km+400m处球机 北京方向",xjdm:"130229000013100006557",x:"113.100972",y:"23.004361",zbzt:"1",cloudid:"2194",ssdlid:"0001"
				},
				{
					kkmc:"京哈高速125km+400m处违停球 北京方向",xjdm:"130229000013100006556",x:"113.100972",y:"23.004361",zbzt:"1",cloudid:"2194",ssdlid:"0001"
				},
				{
					kkmc:"京哈高速北戴河服务区球机1 北京方向",xjdm:"13030400001310005462",x:"113.100972",y:"23.004361",zbzt:"1",cloudid:"2194",ssdlid:"0001"
				},
				{
					kkmc:"京哈高速北戴河服务区球机1 沈阳方向",xjdm:"13030400001310005464",x:"113.100972",y:"23.004361",zbzt:"1",cloudid:"2194",ssdlid:"0001"
				},
				{
					kkmc:"京哈高速北戴河服务区球机2 北京方向",xjdm:"13030400001310005463",x:"113.100972",y:"23.004361",zbzt:"1",cloudid:"2194",ssdlid:"0001"
				},
				{
					kkmc:"京哈高速北戴河服务区球机2 沈阳方向",xjdm:"13030400001310005465",x:"113.100972",y:"23.004361",zbzt:"1",cloudid:"2194",ssdlid:"0001"
				},
				{
					kkmc:"京哈高速秦皇岛G25860枪机1 沈阳方向",xjdm:"13030400001310054106",x:"113.100972",y:"23.004361",zbzt:"1",cloudid:"2194",ssdlid:"0001"
				},
				{
					kkmc:"京哈高速秦皇岛G25860枪机2 沈阳方向",xjdm:"13030400001310054107",x:"113.100972",y:"23.004361",zbzt:"1",cloudid:"2194",ssdlid:"0001"
				},
				{
					kkmc:"京哈高速秦皇岛G25860枪机3 沈阳方向",xjdm:"13030400001310054108",x:"113.100972",y:"23.004361",zbzt:"1",cloudid:"2194",ssdlid:"0001"
				},
				{
					kkmc:"京哈高速秦皇岛G25860枪机4 沈阳方向",xjdm:"13030400001310054109",x:"113.100972",y:"23.004361",zbzt:"1",cloudid:"2194",ssdlid:"0001"
				},
				{
					kkmc:"京哈高速唐山119KM米处枪机 北京方向",xjdm:"130229000013100006589",x:"113.100972",y:"23.004361",zbzt:"1",cloudid:"2194",ssdlid:"0001"
				},
				{
					kkmc:"京哈高速唐山119KM米处球 北京方向",xjdm:"130229000013100006549",x:"113.100972",y:"23.004361",zbzt:"1",cloudid:"2194",ssdlid:"0001"
				},
				{
					kkmc:"京哈高速唐山130km处枪机 北京方向",xjdm:"130229000013100006588",x:"113.100972",y:"23.004361",zbzt:"1",cloudid:"2194",ssdlid:"0001"
				},
				{
					kkmc:"京哈高速唐山130km米处球机 北京方向",xjdm:"130229000013100006548",x:"113.100972",y:"23.004361",zbzt:"1",cloudid:"2194",ssdlid:"0001"
				},
				{
					kkmc:"京哈高速唐山K120米处枪机 沈阳方向",xjdm:"130229000013100006590",x:"113.100972",y:"23.004361",zbzt:"0",cloudid:"2194",ssdlid:"0001"
				},
				{
					kkmc:"京哈高速唐山K120米处球 沈阳方向",xjdm:"130229000013100006550",x:"113.100972",y:"23.004361",zbzt:"0",cloudid:"2194",ssdlid:"0001"
				},
				{
					kkmc:"京哈高速唐山K130处枪 沈阳方向",xjdm:"130229000013100006591",x:"113.100972",y:"23.004361",zbzt:"0",cloudid:"2194",ssdlid:"0001"
				},
				{
					kkmc:"京哈高速唐山K130米处球 沈阳方向",xjdm:"130229000013100006551",x:"113.100972",y:"23.004361",zbzt:"0",cloudid:"2194",ssdlid:"0001"
				},
				{
					kkmc:"京哈高速香河55KM+600米处枪机1 北京方向",xjdm:"13102400001310006970",x:"113.100972",y:"23.004361",zbzt:"0",cloudid:"2194",ssdlid:"0001"
				},
				{
					kkmc:"京哈高速香河55KM+600米处枪机2 北京方向",xjdm:"13102400001310006971",x:"113.100972",y:"23.004361",zbzt:"0",cloudid:"2194",ssdlid:"0001"
				},
				{
					kkmc:"京哈高速香河55KM+600米处枪机3 北京方向",xjdm:"13102400001310006972",x:"113.100972",y:"23.004361",zbzt:"0",cloudid:"2194",ssdlid:"0001"
				},
				{
					kkmc:"京哈高速香河55KM+600米处枪机4 北京方向",xjdm:"13102400001310006973",x:"113.100972",y:"23.004361",zbzt:"0",cloudid:"2194",ssdlid:"0001"
				},
				{
					kkmc:"京哈高速香河55KM+600米处球机 北京方向",xjdm:"13102400001310006941",x:"113.100972",y:"23.004361",zbzt:"0",cloudid:"2194",ssdlid:"0001"
				},
				{
					kkmc:"京哈高速香河服务区出口1枪机 北京方向",xjdm:"13102400001310006967",x:"113.100972",y:"23.004361",zbzt:"0",cloudid:"2194",ssdlid:"0001"
				},
				{
					kkmc:"京哈高速香河服务区出口1球机 北京方向",xjdm:"13102400001310006937",x:"113.100972",y:"23.004361",zbzt:"0",cloudid:"2194",ssdlid:"0001"
				},
				{
					kkmc:"京哈高速香河服务区出口2处枪机 北京方向",xjdm:"13102400001310006966",x:"113.100972",y:"23.004361",zbzt:"0",cloudid:"2194",ssdlid:"0001"
				},
				{
					kkmc:"京哈高速香河服务区出口2球机 北京方向",xjdm:"13102400001310006936",x:"113.100972",y:"23.004361",zbzt:"0",cloudid:"2194",ssdlid:"0001"
				},
				{
					kkmc:"京哈高速香河服务区出口处枪机 沈阳方向",xjdm:"13102400001310006969",x:"113.100972",y:"23.004361",zbzt:"0",cloudid:"2194",ssdlid:"0001"
				},
				{
					kkmc:"京哈高速香河服务区出口处球机 沈阳方向",xjdm:"13102400001310006939",x:"113.100972",y:"23.004361",zbzt:"0",cloudid:"2194",ssdlid:"0001"
				},
				{
					kkmc:"京哈高速香河服务区进口枪机 沈阳方向",xjdm:"13102400001310006968",x:"113.100972",y:"23.004361",zbzt:"0",cloudid:"2194",ssdlid:"0001"
				},
				{
					kkmc:"京哈高速香河服务区入口处球机 沈阳方向",xjdm:"13102400001310006938",x:"113.100972",y:"23.004361",zbzt:"0",cloudid:"2194",ssdlid:"0001"
				},
				{
					kkmc:"京哈与S9960枢纽违球机 沈阳方向",xjdm:"13030400001310005461",x:"113.100972",y:"23.004361",zbzt:"0",cloudid:"2194",ssdlid:"0001"
				},
				{
					kkmc:"京哈与S9960枢纽违停球 北京方向",xjdm:"13030400001310005458",x:"113.100972",y:"23.004361",zbzt:"0",cloudid:"2194",ssdlid:"0001"
				}

			]

		}

		for(var i=0;i<datas1['环秦'].length;i++){

			  var data2= '';
			  data2 += '<li>'+datas1['环秦'][i].kkmc+'</li>';
				
				    
				  
			 $("#hq_kakou").append($(data2));
			
		};
		for(var i=0;i<datas1['环暑'].length;i++){

			  var data3= '';
			  data3 += '<li>'+datas1['环暑'][i].kkmc+'</li>';
				
				    
				  
			 $("#hs_kakou").append($(data3));
			
		};
		for(var i=0;i<datas1['视频'].length;i++){

			  var data4= '';
			  data4 += '<li rel="'+datas1['视频'][i].xjdm+'">'+datas1['视频'][i].kkmc+'</li>';
				
				    
				  
			 $("#shipin_kou").append($(data4));
			
		};
		$("#shipin_kou").on("click","li",function(){
			 var shi_id =  $(this).attr("rel");
			 $("#video_box").removeClass("hide_vid").addClass("video_box");
			 $("#jh_videos").text(shi_id);
		})
		$(".video_close").click(function(){
			$("#video_box").removeClass("video_box").addClass("hide_vid");
		})

//卡口和视频
$(".serial_number").hide();
			// $(".search_inner").on("click","li",function(){
			// 	$(".serial_number").show();
			// 	$(".high_speed").hide();
			// })
			// $(".out_page").click(function(){
			// 	$(".serial_number").hide();
			// 	$(".high_speed").show();
			// })

//高速列表

//应到  到岗
            $("#all_chart").hide();
			$("#dao_chart").show();
			$("#duty_tod").click(function(){		  
			     $("#duty_tod").removeClass('duty_def').addClass('duty_checked') ;
			    $("#duty_all").removeClass('duty_checked').addClass('duty_def') ;
			    $("#all_chart").hide();
			    $("#dao_chart").show();
			})
			$("#duty_all").click(function(){
			     $("#duty_all").removeClass('duty_def').addClass('duty_checked') ;
			    $("#duty_tod").removeClass('duty_checked').addClass('duty_def') ;
			    $("#all_chart").show();
			    $("#dao_chart").hide();
			})

//交通事故  今日与累计
	        $("#all_traffic").hide();
			$("#TrafficAccident").show();
			$("#traf_tody").click(function(){		  
			     $("#traf_tody").removeClass('duty_def').addClass('duty_checked') ;
			    $("#traf_all").removeClass('duty_checked').addClass('duty_def') ;
			    $("#all_traffic").hide();
			    $("#TrafficAccident").show();
			})
			$("#traf_all").click(function(){
			     $("#traf_all").removeClass('duty_def').addClass('duty_checked') ;
			    $("#traf_tody").removeClass('duty_checked').addClass('duty_def') ;
			    $("#all_traffic").show();
			    $("#TrafficAccident").hide();
			})

//安保工作  今日与累计

		    $("#all_secur").hide();
			$("#todys_secur").show();
			$("#secur_tody").click(function(){		  
			     $("#secur_tody").removeClass('duty_def').addClass('duty_checked') ;
			    $("#secur_all").removeClass('duty_checked').addClass('duty_def') ;
			    $("#all_secur").hide();
			    $("#todys_secur").show();
			})
			$("#secur_all").click(function(){
			     $("#secur_all").removeClass('duty_def').addClass('duty_checked') ;
			    $("#secur_tody").removeClass('duty_checked').addClass('duty_def') ;
			    $("#all_secur").show();
			    $("#todys_secur").hide();
			})

//通行车辆 tab 切换

		    $("#CurrentVehicle-hs").hide();
		    $("#CurrentVehicle-hq").hide();
		    $("#CurrentVehicle-yh").hide();
			$("#CurrentVehicle-jh").show();
			$("#car_ha").click(function(){		  
			     $("#car_ha").removeClass('duty_def').addClass('duty_checked') ;
			    $("#car_shu").removeClass('duty_checked').addClass('duty_def') ;
			    $("#car_qin").removeClass('duty_checked').addClass('duty_def') ;
			    $("#car_yan").removeClass('duty_checked').addClass('duty_def') ;
			    $("#CurrentVehicle-hs").hide();
			    $("#CurrentVehicle-hq").hide();
			    $("#CurrentVehicle-yh").hide();
				$("#CurrentVehicle-jh").show();
			})
			$("#car_shu").click(function(){		  
				     $("#car_shu").removeClass('duty_def').addClass('duty_checked') ;
				    $("#car_ha").removeClass('duty_checked').addClass('duty_def') ;
				    $("#car_qin").removeClass('duty_checked').addClass('duty_def') ;
				    $("#car_yan").removeClass('duty_checked').addClass('duty_def') ;
				    $("#CurrentVehicle-hs").show();
				    $("#CurrentVehicle-hq").hide();
				    $("#CurrentVehicle-yh").hide();
					$("#CurrentVehicle-jh").hide();
				})
			$("#car_qin").click(function(){		  
				     $("#car_qin").removeClass('duty_def').addClass('duty_checked') ;
				    $("#car_shu").removeClass('duty_checked').addClass('duty_def') ;
				    $("#car_ha").removeClass('duty_checked').addClass('duty_def') ;
				    $("#car_yan").removeClass('duty_checked').addClass('duty_def') ;
				    $("#CurrentVehicle-hs").hide();
				    $("#CurrentVehicle-hq").show();
				    $("#CurrentVehicle-yh").hide();
					$("#CurrentVehicle-jh").hide();
				})
			$("#car_yan").click(function(){		  
				     $("#car_yan").removeClass('duty_def').addClass('duty_checked') ;
				    $("#car_shu").removeClass('duty_checked').addClass('duty_def') ;
				    $("#car_qin").removeClass('duty_checked').addClass('duty_def') ;
				    $("#car_ha").removeClass('duty_checked').addClass('duty_def') ;
				    $("#CurrentVehicle-hs").hide();
				    $("#CurrentVehicle-hq").hide();
				    $("#CurrentVehicle-yh").show();
					$("#CurrentVehicle-jh").hide();
				})

			// head = $("<div class='info-head'><span>" + headText + "</span></div>");
   //          itemContainer.append(head);
			var testData = {
				    event: {
				        dx: "平原", dlxx: "一般弯", dkljlx: "三枝分叉口", dlwlgl: "无隔离",
				        lmjg: "沥青", fhsslx: "无防护", qs: "0", js: "10",
				        xqlc: "10", cjr: "保定", gxsj: "2017-5-15"
				    },
				    clients:[{
				        sblx: "主线卡口", sbbh: "10001000", sbmc: "京港澳高速涿州北省界卡口", ssjg: "涿州高速大队",
				        sccj: "宇视", pzzb: "29", sbzt: "正常"}, { sblx: "电子警察", sbbh: "10001000", sbmc: "京港澳高速涿州北省界卡口", ssjg: "涿州高速大队",
				        sccj: "宇视", pzzb: "27", sbzt: "正常"}]
				};


	//表格页面
	//流量溯源地 横合计
		var trList = $("#customers tbody").children("tr");
		var tdList = $("#customers tbody").children("tr").children("td");

    //横向总和
    for (var i=0;i<trList.length-2;i++) {
	  	var num3 = 0;
	  	var nums = trList.eq(i).find("td");	
	  	for(var j=0;j<nums.length-2;j++){
	  		// console.log(nums.eq(j))
	  		num3 += parseFloat(nums.eq(j).text());
	  		// console.log(num3);
	  		if(j == nums.length-3) {

	  			nums.eq(j+1).text(num3)
	  			
	  		}
  	}
  } 
	//流量溯源地 纵向和
	 for (var i=0;i<nums.length-1;i++) {
		  	var num_p = 0;
		  	for(var j=0;j<trList.length-2;j++){
		  		
		  		num_p += parseFloat(trList.eq(j).find("td").eq(i).text());
		  		// console.info(trList.eq(j+1).find("td").eq(i-1))
		  		
		  		if(j == trList.length-3) {
		  			trList.eq(j+1).find("td").eq(i).text(num_p);
		  			
		  		}
		  	}
		  }	 
	//流量溯源地 横向百分比
	 for (var i=0;i<trList.length-2;i++) {
		  	var num2 = 0;
		  	var nums1 = trList.eq(i).find("td");	
		  	for(var j=0;j<nums1.length-2;j++){
		  
		  		num2 += parseFloat(nums1.eq(j).text());
		  		
		  		if(j == nums1.length-3) {
		  			// console.log(num2)
		  			var num4_bh1 = ((num2/num_p)*100).toFixed(2)+'%';
		  			nums1.eq(j+2).text(num4_bh1);
		  			
		  		}
		  	}
		  }	 

	//流量溯源地 纵向百分比
	  for (var i=0;i<tdList.length;i++) {
		  	var num_s = 0;
		  	for(var j=0;j<trList.length-2;j++){
		  		
		  		num_s += parseFloat(trList.eq(j).find("td").eq(i).text());
		  		
		  		if(j == trList.length-3) {
		  			var num4_bh = ((num_s/num_p)*100).toFixed(2)+'%';
		  			
		  			trList.eq(j+2).find("td").eq(i).text(num4_bh);
		  		
		  		}
		  	}
		  }

	
		
 
		  //流量车型 客车 和 货车 合计
 		var trList1 = $("#customers_u tbody").children("tr");
		var tdList1 = $("#customers_u tbody").children("tr").children("td");
		var puke = $(".pu_ke");
		for(var i=0;i<puke.length;i++){	
		 $(".ke_he")[i].innerHTML = parseFloat(puke[i].innerHTML) + parseFloat($(".lia_ke")[i].innerHTML); 
		 $(".huo_he")[i].innerHTML = parseFloat($(".wei_huo")[i].innerHTML) + parseFloat($(".pu_huo")[i].innerHTML); 
		}

		//流量车型  横行和
		 for (var i=0;i<trList1.length-2;i++) {
		  	var num3 = 0;
		  	var nums7 = trList1.eq(i).find("td");	
		  	for(var j=0;j<nums7.length-2;j++){
		  		// console.info(nums7.eq(j))
		  		num3 += parseFloat(nums7.eq(j).text());
		  		// console.log(num3);
		  		if(j == nums7.length-3) {

		  			nums7.eq(j+1).text(num3)
		  			
		  		}
	  	}
	  }  
	  //流量车型  纵行和
	  	 for (var i=0;i<nums7.length-1;i++) {
		  	var num_p = 0;
		  	for(var j=0;j<trList1.length-2;j++){
		  		
		  		num_p += parseFloat(trList1.eq(j).find("td").eq(i).text());
		  		// console.info(trList1.eq(j+1).find("td").eq(i-1))
		  		
		  		if(j == trList1.length-3) {
		  			trList1.eq(j+1).find("td").eq(i).text(num_p);
		  			
		  		}
		  	}
		  }	 

   //流量车型 横向百分比
	 for (var i=0;i<trList1.length-2;i++) {
		  	var num2 = 0;
		  	var nums1 = trList1.eq(i).find("td");	
		  	for(var j=0;j<nums1.length-2;j++){
		  
		  		num2 += parseFloat(nums1.eq(j).text());
		  		
		  		if(j == nums1.length-3) {
		  			// console.log(num2)
		  			var num4_bh1 = ((num2/num_p)*100).toFixed(2)+'%';
		  			nums1.eq(j+2).text(num4_bh1);
		  			
		  		}
		  	}
		  }	 
	//流量车型 纵向百分比
	  for (var i=0;i<tdList1.length;i++) {
		  	var num_s = 0;
		  	for(var j=0;j<trList1.length-2;j++){
		  		
		  		num_s += parseFloat(trList1.eq(j).find("td").eq(i).text());
		  		
		  		if(j == trList1.length-3) {
		  			var num4_bh = ((num_s/num_p)*100).toFixed(2)+'%';
		  			
		  			trList1.eq(j+2).find("td").eq(i).text(num4_bh);
		  		
		  		}
		  	}
		  }	  
		

		
   
		
		  //流量户籍 横向合计
		var trList5 = $("#customers_ji tbody").children("tr");
		var tdList5 = $("#customers_ji tbody").children("tr").children("td");

			for (var i=0;i<trList5.length-1;i++) {
		  	var num4 = 0;
		  	var nums4 = trList5.eq(i).find("td");	
		  	for(var j=2;j<nums4.length-2;j++){
		  		// console.log(nums4.eq(j))
		  		num4 += parseFloat(nums4.eq(j).text());
		  		// console.log(num4);
		  		if(j == nums4.length-3) {

		  			nums4.eq(j+1).text(num4)
		  			
		  		}
	  	}
	  } 

	  	//流量户籍 纵向和
	 for (var i=2;i<nums4.length-1;i++) {
		  	var num_h = 0;
		  	for(var j=0;j<trList5.length-2;j++){
		  		
		  		num_h += parseFloat(trList5.eq(j).find("td").eq(i).text());
		  		 // console.info(trList5.eq(j+1).find("td").eq(i-1))
		  		
		  		if(j == trList5.length-3) {
		  			trList5.eq(j+1).find("td").eq(i).text(num_h);
		  			
		  		}
		  	}
		  }	 
    	
		  //流量户籍 横向百分比
	 for (var i=0;i<trList5.length-1;i++) {
		  	var num2 = 0;
		  	var nums1 = trList5.eq(i).find("td");	
		  	for(var j=2;j<nums1.length-1;j++){
		  
		  		num2 += parseFloat(nums1.eq(j).text());
		  		// console.log(num2);
		  		if(j == nums1.length-3) {
		  			// console.log(num2)
		  			var num4_bh1 = ((num2/num_h)*100).toFixed(2)+'%';
		  			nums1.eq(j+2).text(num4_bh1);
		  			
		  		}
		  	}
		  }	 

		//流量户籍  纵向百分比
	  for (var i=2;i<tdList5.length;i++) {
		  	var num_s = 0;
		  	for(var j=0;j<trList5.length-2;j++){
		  		
		  		num_s += parseFloat(trList5.eq(j).find("td").eq(i).text());
		  		
		  		if(j == trList5.length-3) {
		  			var num4_bh = ((num_s/num_h)*100).toFixed(2)+'%';
		  			
		  			trList5.eq(j+2).find("td").eq(i).text(num4_bh);
		  		
		  		}
		  	}
		  }  

		//表格页面显示
		 $("#che_tables").click(function(){
		 	$("#table_page").show();
		 })
		 //表格页面关闭
		 $(".page_close").click(function(){
		 	$("#table_page").hide();
		 })

					