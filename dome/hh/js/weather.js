/**
 * 天气专题对象
 */
var weather = {};

/**
 * 通行车辆组件
 * 
 * @param recallDate
 *            时间回调参数
 */
weather.getWeather = function(recallDate) {
	if (timeout)
		return;
	var param = {
		'timeParam' : recallDate
	};
	ajaxUtil.interfaceUtil(contextPathJs + '/weather/getWeather.do', param,
			weather.currentWeather);
}

weather.currentWeather = function(data) {
	console.log(data)
	if (data.weatherSituationList.length === 0) {
		$(".weather-box").css("display", "none");
		$(".noWeather-box").css("display", "block");
		var divshow = $(".noWeather-box");
		divshow.text("");// 清空数据
		divshow
				.append('<div style="display: table;width: 100%;height: 100%;"><p style="display: table-cell;vertical-align: middle;text-align: center;">暂无数据</p></div>'); // 添加Html内容，不能用Text
		// 或
		// Val
	} else {

		$(".weather-box").empty();
		var html = "";
		var cityList = [];
		var maxTempList = [];
		var minTempList = [];
		var disTempList = [];
		var yAxisMinValue = 100;
		$.each(data.weatherSituationList, function(i, v) {
			html += "<div>";
			// html += "<div style='height: 15%;'>"+v.windPower+"</div><div
			// style='height: 15%;'>"+transformText(v.weather)+"</div><div
			// style='height: 15%;'>"+v.maxTemp+"</div><div
			// class='weather-change' style='height: 15%;'></div><div
			// style='height: 15%;'>"+v.minTemp+"</div><div style='height:
			// 15%;'>"+v.city+"</div>";
			//html += "<div>" + v.windPower + "</div><div>"
			html += "<div>"
					+ transformText(v.weather) + "</div>";
		//	html += "<div style='color : #3fa7da'><span>"
		//			+ v.maxTemp + "</span></div>";
			html += "</div>";

			cityList.push(v.city);
			if (parseInt(v.minTemp.replace('°C', '')) < yAxisMinValue) {
				yAxisMinValue = parseInt(v.minTemp.replace('°C', ''));
			}
			maxTempList.push(v.maxTemp.split('°C')[0]);
			minTempList.push(v.minTemp.split('°C')[0]);
			disTempList.push(v.maxTemp.split('°C')[0]
					- v.minTemp.split('°C')[0]);
		})
		$(".weather-box").append(html);
		var weatherChart = echarts
				.init(document.getElementById('weatherChart'));
		var weatherOption = {
			title : {
				text : '',
			},
			grid : {
				top : '15',
				left : '-18',
				right : '8',
				bottom : '0%',
				containLabel : true
			},
			xAxis : {
				type : 'category',
				splitLine : {
					show : false
				},
				axisLine : {
					show : false,
				},
				position : {
					offset : -5
				},
				axisLabel : {
					margin : 20,
					interval : 0,
					formatter : function(value) {
						return value.split("").join("\n");
					},
					textStyle : {
						color : '#fff',
							fontSize:12
					}
				},
				axisTick : {
					show : false,
				},
				data : function() {
					return cityList;
				}()
			},
			yAxis : {
				type : 'value',
				//min : yAxisMinValue,
				splitLine : {
					show : false
				},
				show : false,
			},
			series : [
					{
						name : '辅助',
						type : 'bar',
						stack : '温差',
						barMaxHeight:'0',
						barMinHeight:'0',
						itemStyle : {
							normal : {
								//barBorderColor : 'rgba(0,0,0,0)',
								barBorderColor : '#3fa7da',
								//color : 'rgba(0,0,0,0)'
								color : '#3fa7da'
							},
							emphasis : {
								barBorderColor : 'rgba(0,0,0,0)',
								color : 'rgba(0,0,0,0)'
							}
						},
						 //data: [0, 0, 10,2, 8, 15,2, 8, 15,2, 8]
						//data : minTempList
					},
					{
						name : '低温',
						type : 'bar',
						stack : '温差',
						barHeight:10,
						barMinHeight:'0',
						label : {
							normal : {
								show : true,
								position : 'bottom',
								formatter : function(value) {
									return minTempList[value.dataIndex] + '°';
								}
							// formatter:'{c}°C',
							}
						},
						itemStyle : {
							normal : {
								color : '#3fa7da',
								shadowColor : 'rgba(0, 0, 0, 0.4)',
								barBorderRadius : [ 0, 0, 20, 20 ]
							}
						},
						barWidth : 5,
						data : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
					// data: minTempList
					},
					{
						name : '高温',
						type : 'bar',
						stack : '温差',
						barHeight:'0',
					//	barMinHeight:'0',
						label : {
							normal : {
								show : true,
								position : 'top',
								color : '#99d9ea',
								formatter : function(value) {
									return maxTempList[value.dataIndex] + '°';
								}
							// formatter:'{c}°C'
							}
						},
						itemStyle : {
							normal : {
								color : new echarts.graphic.LinearGradient(0,
										0, 0, 1, [ {
											offset : 0,
											color : '#99d9ea'
										}, {
											offset : 1,
											color : '#3fa7dc'
										} ]),
								shadowColor : 'rgba(0, 0, 0, 0.4)',
								barBorderRadius : [ 20, 20, 20, 20 ]
							}
						},
						barWidth : 10,
						data: [20, 20, 20,20, 20, 20,20, 20, 20,20, 20]
					//	data : disTempList
					} ]
		};
		weatherChart.setOption(weatherOption);
		weatherChart.resize();
	}

	if (data.weatherBadInfoList.length === 0) {
		var divshow = $(".weather-text");
		divshow.text("");// 清空数据
		divshow.append('暂无数据'); // 添加Html内容，不能用Text 或 Val
	} else {
		$(".weather-text").empty();
		var html = "";
		var index = 0;
		$(".weather-text").html(data.weatherBadInfoList[index].badInfo);
		setInterval(function() {
			index++;
			if (index == data.weatherBadInfoList.length) {
				index = 0;
			}
			html = data.weatherBadInfoList[index].badInfo;
			$(".weather-text").html(html);
		}, 1000 * 5);

	}
}
function transformText(weather) {

	if (weather == 1) {
		return '晴';
	} else if (weather == 2) {
		return '多 云';
	} else if (weather == 3) {
		return '阴';
	} else if (weather == 11) {
		return '小 雨';
	} else if (weather == 12) {
		return '中 雨';
	} else if (weather == 13) {
		return '大 雨';
	} else if (weather == 14) {
		return '暴 雨';
	} else if (weather == 21) {
		return '小 雪';
	} else if (weather == 22) {
		return '中 雪';
	}  else if (weather == 23) {
		return '大 雪';
	} else if (weather == 24) {
		return '暴 雪';
	} else if (weather == 20) {
		return '雨夹雪';
	} else if (weather == 31) {
		return '轻 雾';
	} else if (weather == 32) {
		return '雾';
	} else if (weather == 33) {
		return '大 雾';
	} else if (weather == 34) {
		return '浓 雾';
	} else if (weather == 35) {
		return '强浓雾';
	} else if (weather == 0) {
		return '未 知';
	} 
}