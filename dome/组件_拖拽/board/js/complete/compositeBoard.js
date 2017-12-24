/**
 * 页面加载事件
 */
var compositeBoard = new Object();
$(function() {
	/* <!-- 左1.拥堵专题 组件 --> */
	compositeBoard.congestionProject();
	setInterval(function() {
		compositeBoard.congestionProject();
	}, 1000 * 60 * 5);
	/* <!-- 左2.常堵路段 TOP5--> */
	compositeBoard.oftenWallSections();
	setInterval(function() {
		compositeBoard.oftenWallSections();
	}, 1000 * 60 * 5);
	/* <!-- 左3.今日影响交通的因素 --> */
	compositeBoard.todayInfluenceRoadFactor();
	setInterval(function() {
		compositeBoard.todayInfluenceRoadFactor();
	}, 1000 * 60 * 5);
	/* <!-- 左4.设备专题 组件 --> */
	compositeBoard.equipmentSubject();
	setInterval(function() {
		compositeBoard.equipmentSubject();
	}, 1000 * 60 * 5);
	/* <!-- 中1.当前警情数 小组件 --> */
	compositeBoard.currentWINum();
	setInterval(function() {
		compositeBoard.currentWINum();
	}, 1000 * 60 * 5);
	/* <!-- 中1.当前警力 小组件 --> */
	compositeBoard.currentPSNum();
	setInterval(function() {
		compositeBoard.currentPSNum();
	}, 1000 * 60 * 5);
	/* <!-- 中2.地图-仪表盘-道路小组件 --> */
	compositeBoard.getTotalJamNumFunc();
	setInterval(function() {
		compositeBoard.getTotalJamNumFunc();
	}, 1000 * 60 * 5);
	/* <!-- 中3.拥堵点、警情、警力分布 --> */
	compositeBoard.WIFunc();
	setInterval(function() {
		compositeBoard.WIFunc();
	}, 1000 * 60 * 5);
	/* <!-- 中4.今日重大警情 --> */
	compositeBoard.todayFirstWI();
	setInterval(function() {
		compositeBoard.todayFirstWI();
	}, 1000 * 60 * 5);
	/* <!-- 右1.在岗警力 组件 --> */
	compositeBoard.areaPsDistributionFunc();
	setInterval(function() {
		compositeBoard.areaPsDistributionFunc();
	}, 1000 * 60 * 5);
	/* <!-- 右2.今日辖区警情 TOP5 --> */
	compositeBoard.currentAreaWIFunc();
	setInterval(function() {
		compositeBoard.currentAreaWIFunc();
	}, 1000 * 60 * 5);
	/* <!-- 右3.本月违法数据 TOP5 --> */
	compositeBoard.timeSchedule();
	setInterval(function() {
		compositeBoard.timeSchedule();
	}, 1000 * 60 * 5);
	/* <!-- 右4.违法类型数量变化 TOP5 --> */
	compositeBoard.criminalTypeChange();
	setInterval(function() {
		compositeBoard.criminalTypeChange();
	}, 1000 * 60 * 5);
});

/* <!-- 左1.拥堵专题 组件 --> */
compositeBoard.congestionProject = function() {
	var param = {
		'timeParam' : '2017-08-01 00:00'
	};
	$.ajax({
		type : "POST",
		url : contextPathJs + '/moduleData/querySensitiveRoad01.do',
		data : param,
		contentType : "application/x-www-form-urlencoded; charset=UTF-8",
		dataType : "json",
		success : function(data) {
			compositeBoard.sensitiveRoadByDay(data);
		}
	});
};

compositeBoard.sensitiveRoadByDay = function(data) {
	if (data != null) {
		var seriesArr1 = data.seriesData1.split(',');
		var xAxisDataArr = data.xAxisData.split(',');
		// 控件加载
		compositeBoard.test01(xAxisDataArr, seriesArr1);
		// 日周环比加载
		var dayStr = data.seriesData2.split(','); // 日环比数据
		var monthStr = data.seriesData3.split(','); // 周环比数据
		var html = "<div><div><span>日环比</span></div>", htmlDay = "", htmlMonth = "";
		var day = "", month = "";
		for (var i = 0; i < dayStr.length; i++) {
			var flagDay = "target_up", flagMonth = "target_up";
			day = parseInt(dayStr[i]);
			month = parseInt(monthStr[i]);
			if (day < 0) {
				day = -day;
				flagDay = "target_down";
			} else if (day == 0) {
				flagDay = "target_no";
			}
			if (month < 0) {
				month = -month;
				flagMonth = "target_down";
			} else if (month == 0) {
				flagMonth = "target_no";
			}

			htmlDay += "<div><span>" + day + "</span><em class='" + flagDay
					+ "'></em></div>";
			htmlMonth += "<div><span>" + month + "</span><em class='"
					+ flagMonth + "'></em></div>";
		}
		html += htmlDay + "</div><div><div><span>周环比</span></div>";
		html += htmlMonth + "</div>";
		$('.jampslist').empty();
		$('.jampslist').append(html);
	}
};

compositeBoard.test01 = function(xAxisDataArr, seriesArr1) {
	var option = {
		tooltip : {
			trigger : 'axis',
			axisPointer : { // 坐标轴指示器，坐标轴触发有效
				type : 'shadow' // 默认为直线，可选为：'line' | 'shadow'
			},
			// 鼠标移入事件
			formatter : function(params) {
				return params[0].name + "<br />拥堵时长：" + params[0].value + " 分钟";
			}
		},
		color : [ '#3398DB' ],
		grid : {
			top : '5%',
			left : '5%',
			right : '5%',
			bottom : '15%',
			containLabel : true
		},
		xAxis : [ {
			type : 'category',
			data : xAxisDataArr,
			axisTick : {
				alignWithLabel : true
			},
			axisLabel : {
				textStyle : {
					color : "#3398DB", // 刻度颜色
					fontSize : 12
				// 刻度大小
				}
			},
			splitLine : {
				show : true,
				lineStyle : {
					color : [ "#455" ],
					width : 1,
					type : 'solid'
				}
			}
		} ],
		yAxis : [ {
			type : 'value',
			axisLabel : {
				textStyle : {
					color : "#006DC7", // 刻度颜色
					fontSize : 12
				// 刻度大小
				}
			},
			splitLine : {
				show : true,
				lineStyle : {
					color : [ "#455" ],
					width : 1,
					type : 'solid'
				}
			}
		} ],
		series : [ {
			name : '数据',
			type : 'bar',
			barWidth : '11',
			data : seriesArr1
		} ]
	};
	// 使用刚指定的配置项和数据显示图表。
	var clazz = document.getElementById('test01');
	var myChart = echarts.init(clazz);
	myChart.setOption(option);
};

/* <!-- 左2.常堵路段 TOP5--> */
compositeBoard.oftenWallSections = function() {
	var param = {
		'timeParam' : '2017-08-01 00:00:00'
	};
	ajaxUtil.interfaceUtil(contextPathJs
			+ '/moduleData/queryJamRoadRanksByDay.do', param,
			compositeBoard.jamRoadByDay);
};

compositeBoard.jamRoadByDay = function(data) {
	if (data != null) {
		var seriesArr1 = data.seriesData1.split(',');
		var seriesArr2 = data.seriesData2.split(',');
		var seriesArr3 = data.seriesData3.split(',');
		var xAxisDataArr = data.xAxisData.split(',');
		compositeBoard.test02(xAxisDataArr, seriesArr1, seriesArr2, seriesArr3);
	}
};

compositeBoard.test02 = function(xAxisDataArr, seriesArr1, seriesArr2,
		seriesArr3) {
	option = {
		angleAxis : {
			type : 'category',
			data : xAxisDataArr,
			z : 10,
			startAngle : 90,
			minInterval : 20,
			axisLabel : {
				textStyle : {
					color : "#0099FE", // 刻度颜色
					fontSize : 12
				// 刻度大小
				}
			}
		},
		radiusAxis : {
			axisLine : {
				lineStyle : {
					color : "#FFF", // 刻度颜色
				}
			}
		},
		polar : {
			z : 0,
			radius : '50%'
		},
		series : [ {
			type : 'bar',
			data : seriesArr1,
			coordinateSystem : 'polar',
			z : 0,
			name : '今日',
			stack : 'a',
			itemStyle : {
				normal : {
					color : function(value) {
						return "#0099FE";
					}
				}
			}
		}, {
			type : 'bar',
			data : seriesArr2,
			coordinateSystem : 'polar',
			name : '昨日',
			stack : 'a',
			itemStyle : {
				normal : {
					color : function(value) {
						return "#00FF4B";
					}
				}
			}
		}, {
			type : 'bar',
			data : seriesArr3,
			coordinateSystem : 'polar',
			name : '上周',
			stack : 'a',
			itemStyle : {
				normal : {
					color : function(value) {
						return "#FFBB00";
					}
				}
			}
		} ],
		legend : {
			show : true,
			top : '-5%',
			itemHeight : 2,
			itemWidth : 10,
			data : [ '今日', '昨日', '上周' ],
			textStyle : { // 图例文字的样式
				color : '#0099FE',
				fontSize : 12
			}
		}
	};
	// 使用刚指定的配置项和数据显示图表。
	var clazz = document.getElementById('test02');
	var myChart = echarts.init(clazz);
	myChart.setOption(option);
};

/* <!-- 左3.今日影响交通的因素 --> */
compositeBoard.todayInfluenceRoadFactor = function() {
	var param = {
		'dateTime' : '2017-08-01',
		'isDataValid' : ''
	};
	ajaxUtil.interfaceUtil(
			contextPathJs + '/moduleData/queryTrafficFactors.do', param,
			compositeBoard.trafficElem);
};

compositeBoard.trafficElem = function(data) {
	var html = "", len = 5;
	var contentArr = data.split(",");
	if (contentArr.length < 5) {
		len = contentArr.length;
	}
	if (data != null) {
		for (var i = 0; i < len; i++) {
			html += '<li>' + contentArr[i] + '</li>';
		}
	}
	$('.trafficElem').empty();
	$('.trafficElem').append(html);
};

/* <!-- 左4.设备专题 组件 --> */
compositeBoard.equipmentSubject = function() {
	var param = {
		'outdoorParam' : '02',
		'deviceTypeId' : ''
	};
	ajaxUtil.interfaceUtil(contextPathJs
			+ '/moduleData/queryDeviceStatusesByType.do', param,
			compositeBoard.equipStatus);
};

compositeBoard.equipStatus = function(data) {
	var len = 5;
	var html = "";
	if (data != null) {
		if (data.length < 5) {
			len = data.length;
		}
		html += "<dt>";
		for (var i = 0; i < len; i++) {
			html += "<p>" + data[i].deviceTypeName.substring(0, 4) + "</p>";
		}
		html += "</dt>";
		html += "<dd>"
				+ "<table>"
				+ "<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>"
				+ "<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>"
				+ "<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>"
				+ "<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>"
				+ "<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>"
				+ "</table>" + "<ul>";
		for (var i = 0; i < len; i++) {
			var widthNow = data[i].width;
			html += "<li><p style='width: " + widthNow + "%';>"
					+ data[i].onlineCount + "</p><span>" + data[i].totalCount
					+ "</span></li>";
		}
		html += "</ul></dd>";
	}
	$('.equipStatus').empty();
	$('.equipStatus').append(html);
};

/* <!-- 中1.当前警情数 小组件 --> */
compositeBoard.currentWINum = function() {
	$.ajax({
		type : "POST",
		url : contextPathJs + "/moduleData/queryCurrentWINum.do",
		ansyc : false,
		dataType : "json",
		success : function(data) {
			$("#currentWINum").empty();
			var html = "";
			html += "<div><p style='color: #2471CF'>当前警情数</p><p><span>"
					+ data.wiNum + "</span><em>起</em></p></div>";
			html += "<div>";
			html += "<ul>";
			var dayChain = Math.abs(data.dayChain);
			html += "<li><span style='color: #2471CF'>日环比</span><em>"
					+ dayChain + "</em><i ";
			if (data.dayChain > 0) {
				html += "class='app-conmain-icon-up'></i></li>";
			} else if (data.dayChain < 0) {
				html += "class='app-conmain-icon-down'></i></li>";
			} else {
				html += "class='class='target_no'></i></li>";
			}
			var weekChain = Math.abs(data.weekChain);
			html += "<li><span style='color: #2471CF'>周环比</span><em>"
					+ weekChain + "</em><i ";
			if (data.weekChain > 0) {
				html += "class='app-conmain-icon-up'></i></li>";
			} else if (data.weekChain < 0) {
				html += "class='app-conmain-icon-down'></i></li>";
			} else {
				html += "class='class='target_no'></i></li>";
			}
			html += "</ul>";
			html += "</div>";
			$("#currentWINum").append(html);
		}
	});
};

/* <!-- 中1.当前警力 小组件 --> */
compositeBoard.currentPSNum = function() {
	$.ajax({
		type : "POST",
		url : contextPathJs + "/moduleData/queryCurrentPSNum.do",
		ansyc : false,
		dataType : "json",
		success : function(data) {
			$("#currentPSNum").empty();
			var html = "";
			html += "<div><p>当前警力</p><p><span>" + data.psNum
					+ "</span><em>名</em></p></div>";
			html += "<div>";
			html += "<ul>";
			var dayChain = Math.abs(data.dayChain);
			html += "<li><span style='color: #2471CF'>日环比</span><em>"
					+ dayChain + "</em><i ";
			if (data.dayChain > 0) {
				html += "class='app-conmain-icon-up'></i></li>";
			} else if (data.dayChain < 0) {
				html += "class='app-conmain-icon-down'></i></li>";
			} else {
				html += "></i></li>";
			}
			var weekChain = Math.abs(data.weekChain);
			html += "<li><span style='color: #2471CF'>周环比</span><em>"
					+ weekChain + "</em><i ";
			if (data.weekChain > 0) {
				html += "class='app-conmain-icon-up'></i></li>";
			} else if (data.weekChain < 0) {
				html += "class='app-conmain-icon-down'></i></li>";
			} else {
				html += "></i></li>";
			}
			html += "</ul>";
			html += "</div>";
			$("#currentPSNum").append(html);
		}
	});
};

/* <!-- 中2.地图-仪表盘-道路小组件 --> */
$(function() {
	$.getJSON(contextPathJs + '/showOthers/jsp/jinan2.json', function(data) {
		echarts.registerMap('jinan', data);
		var chart = echarts.init(document.getElementById('map'));
		chart.setOption(optionMap);
	});
});

var geoCoordMap = {
	"历下区" : [ 117.081309, 36.671439 ],
	"市中区" : [ 117.002545, 36.656617 ],
	"历城区" : [ 117.190818, 36.612688 ],
	"商河县" : [ 117.161858, 37.314123 ],
	"章丘市" : [ 117.530225, 36.685982 ],
	"长清区" : [ 116.759284, 36.559828 ]
};

var convertData = function(data) {
	var res = [];
	for (var i = 0; i < data.length; i++) {
		var geoCoord = geoCoordMap[data[i].name];
		if (geoCoord) {
			res.push({
				name : data[i].name,
				value : geoCoord.concat(data[i].value)
			});
		}
	}
	return res;
};

var optionMap = {
	backgroundColor : '',// '#404a59',
	title : {
		text : '当前整体交通态势',
		x : 'center',
		textStyle : {
			color : '#0098FF'
		}
	},
	tooltip : {
		trigger : 'item',
		formatter : function(params) {
			return params.name + ' : ' + params.value[2];
		}
	},
	color : [ '#00BE46', '#FFC500', '#FE0925' ],
	legend : {
		orient : 'vertical',
		y : 'bottom',
		x : 'left',
		data : [ {
			name : '拥堵点',
			// 强制设置图形为圆。
			icon : 'circle',
			// 设置文本为红色
			textStyle : {
				color : '#00BE46'
			}
		}, {
			name : '警情分布',
			icon : 'circle',
			textStyle : {
				color : '#FFC500'
			}
		}, {
			name : '警力分布',
			icon : 'circle',
			textStyle : {
				color : '#FE0925'
			}
		}, {
			name : '警戒区域',
			icon : 'circle',
			textStyle : {
				color : '#FE0925'
			}
		}, {
			name : '重点关注',
			icon : 'circle',
			textStyle : {
				color : '#00BE46'
			},
			icon : 'image://showOthers/jsp/sanjiao.png'
		} ],
		textStyle : {
			color : '#ff0'
		}
	},
	visualMap : {
		show : false,
		min : 0,
		max : 3,
		splitNumber : 3,
		color : [ '#00BE46', '#FFC500', '#FE0925' ],
		textStyle : {
			color : '#fff'
		}
	},
	geo : {
		map : 'jinan',
		roam : true,
		label : {
			emphasis : {
				show : false
			}
		},
		itemStyle : {
			normal : {
				areaColor : '#002257',
				borderColor : '#008CED',
				borderWidth : 2
			},
			emphasis : {
				areaColor : '#002257'
			}
		}
	},
	series : [ {
		name : '拥堵点',
		type : 'scatter',
		coordinateSystem : 'geo',
		data : convertData([ {
			name : "历下区",
			value : 1
		} ]),
		symbolSize : 10,
		label : {
			normal : {
				show : false
			},
			emphasis : {
				show : false
			}
		},
		itemStyle : {
			emphasis : {
				borderColor : '#fff',
				borderWidth : 1
			}
		}
	}, {
		name : '警情分布',
		type : 'scatter',
		coordinateSystem : 'geo',
		data : convertData([ {
			name : "市中区",
			value : 2
		} ]),
		symbolSize : 10
	}, {
		name : '警力分布',
		type : 'scatter',
		coordinateSystem : 'geo',
		data : convertData([ {
			name : "历城区",
			value : 3
		}, {
			name : "商河县",
			value : 3
		} ]),
		symbolSize : 10
	}, {
		name : '警戒区域',
		type : 'heatmap',
		hoverable : false,
		coordinateSystem : 'geo',
		data : convertData([ {
			name : "章丘市",
			value : 100
		} ]),
		symbolSize : 10
	}, {
		name : '重点关注',
		type : 'scatter',
		coordinateSystem : 'geo',
		data : convertData([ {
			name : "长清区",
			value : 3
		} ]),
		symbolSize : 20,
		symbol : 'image://showOthers/jsp/sanjiao.png'
	} ]
};

compositeBoard.getTotalJamNumFunc = function() {
	$.ajax({
		type : "POST",
		url : contextPathJs + "/moduleData/getTotalJamNum.do",
		ansyc : false,
		dataType : "json",
		success : function(data) {
			$("#currentCarNum").empty();
			$("#currentAverageCarNum2").empty();
			$("#currentCarNum2").empty();
			$("#currentAverageCarNum3").empty();
			var currentCarNum = "0";
			var currentAverageCarNum = "0";
			$.each(data, function(i, v) {
				if (i > 0) {
					return;
				}
				currentCarNum = v.activeVehicle;
				currentAverageCarNum = v.vehicleInMiles;
			});
			if (currentCarNum.length > 5) {
				var wan = parseInt(currentCarNum) / 10000;
				$("#currentCarNum2").append("当前活动车辆(万辆)");
				$("#currentCarNum").append(wan.toFixed(2));
			} else {
				$("#currentCarNum2").append("当前活动车辆(辆)");
				$("#currentCarNum").append(currentCarNum);

			}
			if (currentAverageCarNum.length > 5) {
				var wan = parseInt(currentAverageCarNum) / 10000;
				$("#currentAverageCarNum3").append("当前车辆数(万辆)/公里");
				$("#currentAverageCarNum2").append(wan.toFixed(2));
			} else {
				$("#currentAverageCarNum3").append("当前车辆数(辆)/公里");
				$("#currentAverageCarNum2").append(currentAverageCarNum);

			}
		}
	});
};

/* <!-- 中3.拥堵点、警情、警力分布 --> */
var wIData;
var psData;
var jamData;
var timeRowArr;
compositeBoard.WIFunc = function() {
	$.ajax({
		type : "POST",
		url : contextPathJs + "/moduleData/getWIPSJam.do",
		ansyc : false,
		dataType : "json",
		success : function(data) {
			timeRowArr = new Array();
			timeRowArr = data.timeRow.split(",");
			wIData = new Array();
			wIData = data.WI.split(",");
			psData = new Array();
			psData = data.ps.split(",");
			jamData = new Array();
			jamData = data.jam.split(",");
			compositeBoard.setAreaJamOption();
		}
	});
};

compositeBoard.setAreaJamOption = function() {
	var barEchartDiv = document.getElementById('areaJam');
	var myChart = echarts.init(barEchartDiv);
	var colors = [ '#FC403F', '#F1C001', '#33CC33' ];
	var option = {
		color : colors,
		tooltip : {
			trigger : 'none',
			axisPointer : {
				type : 'cross' // 当鼠标放到分割线上不显示信息
			}
		},
		legend : {
			top : '-5%',
			textStyle : { // 图例文字的样式
				color : '#1E5FBC',
				fontSize : 12
			},
			itemWidth : 50, // 图例标记的图形宽度
			itemHeight : 20, // 图例标记的图形高度
			data : [ {
				name : '警力',
				textStyle : {
					fontSize : 12,
					fontWeight : 'bolder',
					color : '#8CBBEF'
				}
			}, {
				name : '警情',
				textStyle : {
					fontSize : 12,
					fontWeight : 'bolder',
					color : '#8CBBEF'
				}
			}, {
				name : '拥堵',
				textStyle : {
					fontSize : 12,
					fontWeight : 'bolder',
					color : '#8CBBEF'
				}
			} ]
		},
		grid : {
			top : '20%',
			left : '1%',
			right : '1%',
			bottom : '1%',
			containLabel : true
		},
		xAxis : [ {
			type : 'category',
			axisTick : {
				alignWithLabel : true
			},
			axisLabel : {
				show : true,
				textStyle : {
					color : '#1E5FBC'
				}
			},
			splitLine : {
				show : true,
				lineStyle : {
					color : '#0C2A85',
					width : 2
				}
			},
			axisLine : {
				show : true,
				onZero : false,
				lineStyle : {
					color : '#0C2A85',
					width : 2
				}
			},
			boundaryGap : false,// 设置xY轴在0处起始
			data : timeRowArr
		}

		],
		yAxis : [ {
			type : 'value',
			axisLabel : {
				show : false,
				textStyle : {
					color : '#1E5FBC'
				}
			},
			splitLine : {
				show : true,
				lineStyle : {
					color : '#0C2A85',
					width : 2
				}
			},
			axisLine : {
				show : true,
				onZero : false,
				lineStyle : {
					color : '#0C2A85',
					width : 2
				}
			}
		} ],
		series : [ {
			name : '拥堵',
			type : 'line',
			smooth : true,
			data : jamData
		}, {
			name : '警情',
			type : 'line',
			smooth : true,
			data : wIData
		}, {
			name : '警力',
			type : 'line',
			smooth : true,
			data : psData
		} ]
	};
	myChart.setOption(option);
};

/* <!-- 中4.今日重大警情 --> */
compositeBoard.todayFirstWI = function() {
	$.ajax({
		type : "POST",
		url : contextPathJs + "/moduleData/getTodayFirstWI.do",
		ansyc : false,
		dataType : "json",
		success : function(data) {
			$("#pText").empty();
			$("#pText").append(data);
		}
	});
};
/* <!-- 右1.在岗警力 组件 --> */
var areaPsDistributionName;
var areaPsDistributionValue;
var deptIdArr;
var dutyCountArr;
compositeBoard.areaPsDistributionFunc = function() {
	$.ajax({
		type : "POST",
		url : contextPathJs + "/moduleData/queryareaPsDistribution.do",
		ansyc : false,
		dataType : "json",
		success : function(data) {
			areaPsDistributionName = new Array();
			areaPsDistributionValue = new Array();
			deptIdArr = new Array();
			dutyCountArr = new Array();
			$.each(data, function(i, v) {
				var deptName = "";
				if (v.deptName.length > 4) {
					var name = v.deptName.substring(0, 4);
					deptName = name + "..";
				} else {
					deptName = v.deptName;
				}
				areaPsDistributionName.push(deptName);
				deptIdArr.push(v.deptId);
				dutyCountArr.push(v.dutyCount);
				var str = "{value: " + v.dutyCount
						+ ",itemStyle:{ normal:{color:'#3399FE'} }}";
				var strJson = eval('(' + str + ')');
				areaPsDistributionValue.push(strJson);
			});
			$.ajax({
				type : "POST",
				url : contextPathJs + "/moduleData/queryDayChainByDeptId.do",
				data : {
					deptId : JSON.stringify(deptIdArr),
					arr : JSON.stringify(dutyCountArr)
				},
				ansyc : false,
				dataType : "json",
				success : function(data) {
					var html = "";
					$(".areaps").empty();
					$.each(data, function(i, v) {
						html += "<div><span>" + Math.abs(v) + "</span><em ";
						if (v > 0) {
							html += "class='target_up'></em></div>";
						} else if (v < 0) {
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
	});
};

compositeBoard.setAreaPsDistributionOption = function() {
	var barEchartDiv = document.getElementById('areaPsDistribution');
	var myChart = echarts.init(barEchartDiv);
	var option = {
		tooltip : {
			trigger : 'axis',
			axisPointer : { // 坐标轴指示器，坐标轴触发有效
				type : 'shadow' // 默认为直线，可选为：'line' | 'shadow'
			},
			// position: ['50%', '50%'],
			// 鼠标移入事件
			formatter : function(params) {
				return params[0].axisValue + ":" + params[0].value * 5 + "名";
			}
		},
		grid : {
			top : '5%',
			left : '1%',
			right : '20%',
			bottom : '10%',
			containLabel : true
		},
		xAxis : {
			type : 'value',
			boundaryGap : true,
			axisLabel : {
				show : false,
				textStyle : {
					fontSize : 10
				// 让字体变大
				},
			},
			axisLine : {
				lineStyle : {
					color : '#1E5FBC',
					width : 2
				}
			},
			splitLine : {
				show : false,
				lineStyle : {
					color : '#0C2A85',
					width : 2
				}
			},
			axisTick : {
				inside : true
			}
		},
		yAxis : {
			type : 'category',
			boundaryGap : true,
			axisLine : {
				lineStyle : {
					color : '#1E5FBC',
					width : 2
				}
			},
			axisTick : {
				inside : true,
				interval : 0,
				length : 2
			},
			axisLabel : {
				show : true,
				interval : 0
			},
			data : areaPsDistributionName
		},
		series : [ {
			name : '辖区警力分配',
			type : 'bar',
			label : {
				normal : {
					show : true,
					// 圆柱上显示的数字
					formatter : function(params) {
						return params.value * 5;
					},
					position : 'right'
				}
			},
			barWidth : 10,
			/*
			 * 数值为出勤人数/总人数*100 echarts 自己会算百分比
			 */
			data : areaPsDistributionValue
		} ]
	};
	myChart.setOption(option);
};

/* <!-- 右2.今日辖区警情 TOP5 --> */
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
			$.each(data, function(i, v) {
				firstData.push(v.eventCount);
				secondData.push(v.eventCount2);
				threeData.push(v.eventCount3);
				dataRow.push(v.disposeRegionName);
				totalCountArr.push(v.totalcount);
			});
			compositeBoard.setCurrentAreaWIOption();
		}
	});
};

compositeBoard.setCurrentAreaWIOption = function() {
	var barEchartDiv = document.getElementById('currentAreaWI');
	var myChart = echarts.init(barEchartDiv);
	var Data = totalCountArr;
	var option = {
		// 提示框
		tooltip : {
			backgroundColor : 'rgba(0,0,0,0.7)', // 提示背景颜色，默认为透明度为0.7的黑色
			borderColor : '#333', // 提示边框颜色
			borderRadius : 4, // 提示边框圆角，单位px，默认为4
			borderWidth : 0, // 提示边框线宽，单位px，默认为0（无边框）
			padding : 5, // 提示内边距，单位px，默认各方向内边距为5，
			textStyle : {
				color : '#fff'// 提示框内容颜色
			}
		},
		angleAxis : {
			boundaryGap : [ '40%', '40%' ],
			axisLine : {
				show : false
			},
			axisTick : {
				show : true,
				length : 5
			},
			splitLine : {
				show : false
			},
			axisLabel : {
				show : false
			}
		},
		radiusAxis : {
			type : 'category',
			data : dataRow,
			z : 5,
			axisLine : {
				show : false
			},
			axisTick : {
				show : true,
				interval : 2
			},
			axisLabel : {
				show : true,
				textStyle : {
					color : '#3399FE',
					align : 'right',
					baseline : 'middle',
					fontSize : 8
				},
				formatter : function(value, index) {
					if ("" == value) {
						return;
					}
					var a = value + " —— " + Data[index];
					return a;
				}
			}
		},
		polar : {
			center : [ '50%', '50%' ], // 默认全局居中
			radius : '70%',
		},
		series : [ {
			type : 'bar',
			data : firstData,
			coordinateSystem : 'polar',
			barWidth : 0,
			borderWidth : 0,
			name : '一级警情',
			stack : 'a',
			itemStyle : {
				normal : {
					color : function() {
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
			type : 'bar',
			data : secondData,
			coordinateSystem : 'polar',
			name : '二级警情',
			barWidth : 0,
			borderWidth : 0,
			stack : 'a',
			itemStyle : {
				normal : {
					color : function() {
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
			type : 'bar',
			data : threeData,
			coordinateSystem : 'polar',
			name : '三级警情',
			barWidth : 0,
			borderWidth : 0,
			stack : 'a',
			itemStyle : {
				normal : {
					color : function() {
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
		} ],
		legend : {
			show : true,
			top : '-5%',
			textStyle : {
				color : '#1E5FBC'
			},
			itemHeight : 2, // 图例图形高度
			itemWidth : 10, // 图例图形高度
			data : [ '一级警情', '二级警情', '三级警情' ]
		},
	};

	myChart.setOption(option);
};
/* <!-- 右3.本月违法数据 TOP5 --> */
compositeBoard.timeSchedule = function() {
	var param = {
		'violationType' : '',
		'beginTime' : '2017-08-01 00:00:00',
		'endTime' : '2017-08-02 00:00:00'
	};
	ajaxUtil.interfaceUtil(
			contextPathJs + '/moduleData/queryViolationRadia.do', param,
			compositeBoard.vioRadia);
};

compositeBoard.vioRadia = function(data) {
	if (data != null) {
		var seriesArr1 = data.seriesData1.split(',');
		var xAxisDataArr = data.xAxisData.split('_');
		var x = new Array();
		for (var i = 0; i < xAxisDataArr.length; i++) {
			var json = eval('(' + xAxisDataArr[i] + ')');
			x.push(json);
		}
		compositeBoard.test05(x, seriesArr1);
		var html = "(单位：万起)";
		$('.vioSumNum').empty();
		$('.vioSumNum').append(html);
	}
};

compositeBoard.test05 = function(xAxisDataArr, seriesArr1) {
	option = {
		calculable : true,
		radar : {
			indicator : xAxisDataArr,
			radius : '50%',
			startAngle : 25,
			center : [ '60%', '40%' ],
			splitLine : {
				show : true,
				lineStyle : {
					color : '#006DC7'
				}
			},
			axisLine : {
				show : true,
				lineStyle : {
					color : '#006DC7'
				}
			}
		},
		series : [ {
			type : 'radar',
			itemStyle : {
				normal : {
					areaStyle : {
						type : 'default',
						color : '#006DC7'
					}
				}
			},
			data : [ {
				value : seriesArr1,
				name : '违法数量',
				lineStyle : {
					normal : {
						type : 'normal',
						color : '#006DC7'
					}
				}
			} ]
		} ]
	};
	// 使用刚指定的配置项和数据显示图表。
	var clazz = document.getElementById('test05');
	var myChart = echarts.init(clazz);
	myChart.setOption(option);
};
/* <!-- 右4.违法类型数量变化 TOP5 --> */
compositeBoard.criminalTypeChange = function() {
	var param = {
		'violationType' : '',
		'beginTime' : '2017-08-01 00:00:00',
		'endTime' : '2017-08-02 00:00:00'
	};
	ajaxUtil.interfaceUtil(contextPathJs
			+ '/moduleData/queryViolationStatisticsByType.do', param,
			compositeBoard.vioTypeNumChange);
};

compositeBoard.vioTypeNumChange = function(data) {
	if (data != null) {
		var seriesArr1 = data.seriesData1.split(',');
		var seriesArr2 = data.seriesData2.split(',');
		var xAxisDataArr = data.xAxisData.split(',');
		compositeBoard.test03(xAxisDataArr, seriesArr1, seriesArr2);
	}
};

compositeBoard.test03 = function(xAxisData, seriesData1, seriesData2) {
	option = {
		tooltip : {
			trigger : 'axis',
			axisPointer : { // 坐标轴指示器，坐标轴触发有效
				type : 'shadow' // 默认为直线，可选为：'line' | 'shadow'
			}
		},
		grid : {
			left : '7%',
			right : '4%',
			bottom : '10%',
			top : "22%",
			containLabel : true
		},
		legend : {
			data : [ '上月', '本月' ],
			top : '-5%',
			textStyle : { // 图例文字的样式
				color : '#006DC7',
				fontSize : 12
			},
			itemHeight : 2
		// 图例图形高度
		// itemWidth:40 //图例图形高度
		},
		xAxis : [ {
			type : 'category',
			data : xAxisData,// ['1月','2月','3月','4月','5月'],
			axisLabel : {
				textStyle : {
					color : "#006DC7", // 刻度颜色
					fontSize : 12
				// 刻度大小
				}
			},
			splitLine : {
				show : true,
				lineStyle : {
					color : [ "#455" ],
					width : 1,
					type : 'solid'
				}
			}
		} ],
		yAxis : [ {
			type : 'value',
			axisLabel : {
				textStyle : {
					color : "#006DC7", // 刻度颜色
					fontSize : 12
				// 刻度大小
				}
			},
			splitLine : {
				show : true,
				lineStyle : {
					color : [ "#455" ],
					width : 1,
					type : 'solid'
				}
			}
		} ],
		series : [ {
			name : '上月',
			type : 'bar',
			data : seriesData1,// [2.0, 4.9, 7.0, 23.2, 25.6],
			barGap : '0.5%',
			itemStyle : {
				normal : {
					color : function(value) {
						return "#FFD306";
					}
				}
			},
			barWidth : 11
		// 柱图宽度
		}, {
			name : '本月',
			type : 'bar',
			data : seriesData2,// [2.6, 5.9, 9.0, 26.4, 28.7],
			barGap : '0.5%',
			itemStyle : {
				normal : {
					color : function(value) {
						return "#3398DB";
					}
				}
			},
			barWidth : 11
		// 柱图宽度
		} ]
	};
	// 使用刚指定的配置项和数据显示图表。
	var clazz = document.getElementById('test03');
	var myChart = echarts.init(clazz);
	myChart.setOption(option);
};
