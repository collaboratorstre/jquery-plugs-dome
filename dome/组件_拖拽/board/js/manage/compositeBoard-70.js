//拥堵指数-仪表盘
/**
 * <div class="app-area-box" style="z-index:9999999">
                                    <div class="app-title-box box-point"></div>
                    <div id="test11" style="width: 100%;height: 100%;background:#021068;" ></div>
                    <div id="dashBoard"><span></span><span>1.5</span><span>1.8</span><span>2.2</span><span></span>
                    <em></em><em></em><em></em><em></em><em></em></div>
                  </div><!-- 整个div -->   
 * **/
$(function() {
	timeSchedule();
	setInterval("timeSchedule();",1000*60*5);
});

function timeSchedule(){
	var param={'beginTime':'2017-08-01 00:00','endTime':'2017-08-02 00:00'};
	ajaxUtil.interfaceUtil(contextPathJs+'/moduleData/queryCityJamInfos.do',param,PointerTable);
}

function PointerTable(data){
	if(data!=null){
		var json = eval('(' + data.seriesData1 + ')'); 
		var seriesArr=[json];
		test11(seriesArr);
	}
};

function test11(series1){
	var myChart = echarts.init(document.getElementById('test11')); 
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
			        	  axisLabel:{
			        		  //distance :-2
			        	  },
			        	  //   data:[
			        	  //      {
			        	  //        value: 2,
			        	  //      name: '拥堵延时指数'
			        	  //   }],
			        	  data:series1
			          },

			          ] 
	}; 

	myChart.setOption(option);
}          

//交通管理指数-小组件
/**
 * <div class="app-conmain-box"  style="width: 100%;height: 100%;background: #06102f;">
				                  <div>
				                    <div class="app-conmain-con xxxxx">
				                        <div class="app-conmain-in-box" id = "currentTrafficNum">
				                        </div>
				                    </div>
				                  </div>
                        </div>
 * 
 */
$(function() {
	timeSchedule();
	setInterval("timeSchedule();",1000*60*5);
});

function timeSchedule(){
	var param={'beginTime':'2017-08-01 00:00','endTime':'2017-08-02 00:00'};
	ajaxUtil.interfaceUtil(contextPathJs+'/moduleData/queryCurrentTrafficNum.do',param,currentTrafficNum);
}

function currentTrafficNum(data) {
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

//今日影响交通的因素
/**
 * <div class="app-area-box">
                                    <div class="app-title-box"><i></i><span>今日影响交通的因素</span></div>
                  <div class="app-panel-area-table-container" id="case">
                    <div class="app-list">
                      <ul class="app-ul-list trafficElem">
                      </ul>
                    </div>
                  </div>
                  </div><!-- 整个div -->                                                       
 */
$(function() {
	timeSchedule();
	setInterval("timeSchedule();",1000*60*5);
});
function timeSchedule(){
	var param={'dateTime':'2017-08-01','isDataValid':''};
	ajaxUtil.interfaceUtil(contextPathJs+'/moduleData/queryTrafficFactors.do',param,trafficElem);
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
	$('.trafficElem').empty();
	$('.trafficElem').append(html);
}

//设备专题
/**
 * <div class="app-area-box">
                                    <div class="app-title-box"><i></i><span>设备专题</span></div>
                    <div id="test22" class = "test22">
                        <div>
                            <p><span></span><span>在线服务设备总量</span></p>
                            <p><span></span><span>设备总量</span></p>
                        </div>
                        <dl class="equipStatus">
                      </dl>
                    </div>
                  </div><!-- 整个div -->    
 */
$(function() {
	timeSchedule();
	setInterval("timeSchedule();",1000*60*5);
});

function timeSchedule(){
	var param={'outdoorParam':'02','deviceTypeId':''};
	ajaxUtil.interfaceUtil(contextPathJs+'/moduleData/queryDeviceStatusesByType.do',param,equipStatus);
}

function equipStatus(data){
	var len=5;
	var html="";
	//debugger;
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
	$('.equipStatus').empty();
	$('.equipStatus').append(html);
}
//当月违法小组件
/**
 * <div class="app-conmain-box">
                  <div>
                    <div class="app-conmain-con xxxxx">
                        <div class="app-conmain-in-box vioIndex">
                        </div>
                    </div>
                  </div>
                </div>
 */
$(function() {
	timeSchedule();
	setInterval("timeSchedule();",1000*60*5);
});

function timeSchedule(){
	var param={'violationType':'','beginTime':'2017-07-01 00:00','endTime':'2017-08-01 00:00'};
	ajaxUtil.interfaceUtil(contextPathJs+'/moduleData/queryVioStatusByDay.do',param,vioIndex);
}

function vioIndex(data){
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
//地图
/**
 * <div style="width: 100%;height:100%;">

                  <div id="map" style="height:92%;width: 100%;"></div>
                  <div class="mapinfo mapinfo-line" style=" height: 58px;width:100%;position: absolute;left: 0px;bottom:4px;">
                            <ul>
                                <li><div><p >今日机动车总量(万辆)</p><span >182.4</span><em></em></div></li>
                                <li><div><p id = "currentCarNum2"></p><span id = "currentCarNum"></span><em></em></div></li>
                                <li><div><p id = currentAverageCarNum3></p><span id = "currentAverageCarNum2"></span><em></em></div></li>
                            </ul>
                        </div>
                  </div><!-- 整个div -->                                           
 */
var road_datas = [];
var shapedatas = [];
$(function() {
	// 行政区划加载
	$.ajaxSettings.async = true;
	var mapChart;
	$.getJSON(contextPathJs + '/board/data/jinan_center_xzqh.json', function(data) {
		echarts.registerMap('jinan', data);
		mapChart = echarts.init(document.getElementById('map'));
		mapChart.setOption(mapOption);
		// 添加地图缩放事件
		mapChart.on("geoRoam", function(prm) {
			// console.log(chart.getOption().geo[0].zoom);
		});
	});

	$.ajaxSettings.async = false;
	// 主干道加载
	$.getJSON(contextPathJs + '/board/data/jinan_center_zgd.json', function(multiline) {
		var geometries = multiline.geometries;
		var sf = 0;
		var sk = 300 / (geometries.length);
		geometries.forEach(function(value) {
			sf++;
			var lines = [];
			var t = value.coordinates;
			t.forEach(function(v) {
				lines.push(v);
			});
			road_datas.push({
				coords : lines,
				lineStyle : {
					normal : {
						color : echarts.color.modifyHSL('#5A94DF', Math.round(sk * sf))
					}
				},
				visualMap : false
			});
		});
	});

	// 弹出气泡加载
	$.ajaxSettings.async = false;
	$.getJSON(contextPathJs + '/board/data/tip.json', function(shapes) {
		var geometries = shapes.geometries;
		var sf = 0;
		var sk = 300 / (geometries.length);
		geometries.forEach(function(value) {
			sf++;
			var shapedatas = [];
			var t = value.coordinates;
			t.forEach(function(v) {
				shapedatas.push(v);
			});
			road_datas.push({
				coords : shapedatas,
				lineStyle : {
					normal : {
						color : echarts.color.modifyHSL('#5A94DF', Math.round(sk * sf))
					}
				},
				visualMap : false
			});
		});
	});
});

/** 警力位置点信息* */
var getGISPoliceData = function() {
	return eval('[{"name":"警力","value":[117.201628,36.7290726,1]},{"name":"警力","value":[117.000833,36.658234,1]},{"name":"警力","value":[117.216090,36.738488,1]},{"name":"警力","value":[117.118669,36.670961,1]},{"name":"警力","value":[117.107232,36.722169,1]},{"name":"警力","value":[116.92097,36.66516,1]},{"name":"警力","value":[116.91814,36.66269,1]},{"name":"警力","value":[116.93122,36.66728,1]},{"name":"警力","value":[116.92344,36.65208,1]},{"name":"警力","value":[116.93263,36.67718,1]},{"name":"警力","value":[116.91990,36.67082,1]},{"name":"警力","value":[116.91354,36.55986,1]},{"name":"警力","value":[116.98601,36.65193,1]},{"name":"警力","value":[116.98990,36.65211,1]},{"name":"警力","value":[116.98654,36.64592,1]},{"name":"警力","value":[116.99627,36.65211,1]},{"name":"警力","value":[116.99255,36.65016,1]},{"name":"警力","value":[116.99362,36.54504,1]},{"name":"警力","value":[116.98495,36.54628,1]},{"name":"警力","value":[116.98407,36.64398,1]},{"name":"警力","value":[116.98354,36.65069,1]},{"name":"警力","value":[116.98937,36.65087,1]},{"name":"警力","value":[116.98814,36.64415,1]},{"name":"警力","value":[116.99220,36.64962,1]}]');
};
/** 警情位置点信息* */
var getGISAlarmData = function() {
	return eval('[{"name":"警情","value":[117.219101  ,36.672078,2]},{"name":"警情","value":[ 117.088031,36.76933,2]},{"name":"警情","value":[117.072527,36.684862,2]},{"name":"警情","value":[116.981474,36.643565,2]},{"name":"警情","value":[117.111071,36.767979,2]},{"name":"警情","value":[116.948661,36.783606,2]},{"name":"警情","value":[117.09276,36.694569,2]},{"name":"警情","value":[116.92627,36.66658,2]},{"name":"警情","value":[116.93228,36.66340,2]},{"name":"警情","value":[116.92980,36.66587,2]},{"name":"警情","value":[116.92273,36.65562,2]},{"name":"警情","value":[116.98654,36.64663,2]},{"name":"警情","value":[116.99397,36.65034,2]},{"name":"警情","value":[116.99309,36.64681,2]},{"name":"警情","value":[116.99008,36.64981,2]},{"name":"警情","value":[116.98460,36.65016,2]},{"name":"警情","value":[116.99574,36.65052,2]},{"name":"警情","value":[116.98301,36.65069,2]},{"name":"警情","value":[116.98407,36.64716,2]},{"name":"警情","value":[116.97806,36.64698,2]}]');
};
/** 拥堵点位置点信息* */
var getGISJamData = function() {
	return eval('[{"name":"拥堵点","value":[116.982470,36.639298,3]},{"name":"拥堵点","value":[ 117.166927,36.642385,3]},{"name":"拥堵点","value":[117.068154,36.645799,3]},{"name":"拥堵点","value":[116.964639,36.646490,3]},{"name":"拥堵点","value":[117.007174,36.791248,3]},{"name":"拥堵点","value":[116.982470,36.639298,3]},{"name":"拥堵点","value":[117.093613,36.715588,3]},{"name":"拥堵点","value":[116.91389,36.65138,3]},{"name":"拥堵点","value":[116.92804,36.66057,3]},{"name":"拥堵点","value":[116.91884,36.69168,3]},{"name":"拥堵点","value":[116.90824,36.68036,3]},{"name":"拥堵点","value":[116.93298,36.68107,3]},{"name":"拥堵点","value":[116.93192,36.67082,3]},{"name":"拥堵点","value":[116.97117,36.70511,3]},{"name":"拥堵点","value":[116.91814,36.67471,3]},{"name":"拥堵点","value":[116.92697,36.65385,3]},{"name":"拥堵点","value":[116.92485,36.65774,3]},{"name":"拥堵点","value":[116.92662,36.66127,3]},{"name":"拥堵点","value":[116.93122,36.66516,3]},{"name":"拥堵点","value":[116.98725,36.65052,3]},{"name":"拥堵点","value":[116.98814,36.64857,3]},{"name":"拥堵点","value":[116.99397,36.64963,3]},{"name":"拥堵点","value":[116.99132,36.64946,3]},{"name":"拥堵点","value":[116.9432,36.65096,3]},{"name":"拥堵点","value":[116.99114,36.64486,3]},{"name":"拥堵点","value":[116.98743,36.64098,3]}]');
};
/** 重点关注信息* */
var getGISFocusAreaData = function() {
	return eval('[{"name":"重点关注","value":[116.984, 36.658, 3]}]');
};
/** 警戒区域位置点信息* */
var getGISWarningAreaData = function() {
	return eval('[[116.977, 36.648, 191],[116.980, 36.648,300],[116.984, 36.648,630],[116.987, 36.648,530], [116.989, 36.648,430], [116.994, 36.648,330], [116.921, 36.652, 621],[116.924, 36.655,600],[116.927, 36.659,730],[116.925, 36.663,730]]');
};
/** 境界区域提示气泡信息* */
var getWarningAreaDataTip = function() {
	var leftTopTip = '{"name":"拥堵点:8","value":[116.57,36.83,3]},{"name":"警情:4","value":[116.57,36.81,2]},{"name":"警力:6","value":[116.57,36.79,1]}';
	var rightBottomTip = '{"name":"拥堵点:7","value":[117.50,36.48,3]},{"name":"警情:10","value":[117.50,36.46,2]},{"name":"警力:10","value":[117.50,36.44,1]}';
	return eval("[" + leftTopTip + "," + rightBottomTip + "]"); 
};

/** 地图总体配置* */
var mapOption = {
		//backgroundColor : '#00115C',// '#404a59',
		title : {
			text : '当前城区整体交通态势',
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
		color : [ '#2EBA37', '#D7C316', '#DC0F2D', "#0101FF", "#FE6000" ],// [
		// '#2EBA37',
		// '#D7C316',
		// '#DC0F2D',
		// '#01FFFF'
		// ],//,
		// '#F19D10'
		legend : {
			orient : 'vertical',
			y : 'bottom',
			x : 'left',
			itemWidth : 15,
			itemHeight : 15,
			data : [ {
				name : '警力分布',
				icon : 'circle',
				textStyle : {
					color : '#FFF'
				}
			}, {
				name : '警情分布',
				icon : 'circle',
				textStyle : {
					color : '#FFF'
				}
			}, {
				name : '拥堵点',
				// 强制设置图形为圆。
				icon : 'circle',
				// 设置文本为红色
				textStyle : {
					color : '#FFF'
				}
			}, {
				name : '重点关注',
				icon : 'circle',
				textStyle : {
					color : '#FFF'
				},
				//icon:'path://../../images/triangle.svg'
				icon : 'image://board/images/triangleicon.png'
			}, {
				name : '警戒区域',
				icon : 'circle',
				textStyle : {
					color : '#FFF'
				},
				icon : 'image://board/images/heatmapicon.png'
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
			color : [ '#FE0925', '#FFC500', '#00BE46' ],// 警力、警情、拥堵 0,1,2
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
			name : '警力分布',
			type : 'scatter',
			coordinateSystem : 'geo',
			data : getGISPoliceData(),
			symbolSize : 6
		}, {
			name : '警情分布',
			type : 'scatter',
			coordinateSystem : 'geo',
			data : getGISAlarmData(),
			symbolSize : 5,
			itemStyle : {
				normal : {
					shadowBlur : 10,
					shadowColor : '#333'
				}
			}
		}, {
			name : '拥堵点',
			type : 'scatter',
			coordinateSystem : 'geo',
			data : getGISJamData(),
			symbolSize : 4
		}, {
			name : '重点关注',
			type : 'scatter',
			coordinateSystem : 'geo',
			data : getGISFocusAreaData(),
			//icon : 'image://../../images/sanjiao.png', 
			symbol: 'image://../../images/triangleicon.png',
			symbolSize : 20,
		}, {
			name : '警戒区域',
			type : 'heatmap',
			hoverable : false,
			coordinateSystem : 'geo',
			data : getGISWarningAreaData(),
			pointSize : 5,
			blurSize : 6,
			symbolSize : 10
		}, {
			type : 'lines',
			polyline : true,
			data : road_datas,
			silent : true,
			lineStyle : {
				normal : {
					opacity : 0.3,
					width : 2
				}
			},
			progressiveThreshold : 500,
			progressive : 200
		}, {
			name : 'warningTip',
			type : 'scatter',
			coordinateSystem : 'geo',
			data : getWarningAreaDataTip(),
			symbolSize : 10,
			label : {
				normal : {
					show : true,
					formatter : '{b}',
					position : 'right',
					offset :[5,-7],
					textStyle:{
						fontWeight:'bold',
						fontSize:12
					}
				}
			} 
		}, ]
};


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
			var todayCarNum = "0";
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
//违法数量和类型分布
/**
 * <div class="app-area-box">
                                    <div class="app-title-box"><i></i><span>本月违法数据</span><b>TOP5</b><div style="position:absolute;right:15px;top:5px;" class="vioSumNum"></div></div>
                    <div id="test05" style="width: 100%;height: 100%;margin-left:-25px;"></div>
                  </div><!-- 整个div -->                                             
 */
$(function() {
	timeSchedule();
	setInterval("timeSchedule();",1000*60*5);
});

function timeSchedule(){
	var param={'violationType':'','beginTime':'2017-08-01 00:00:00','endTime':'2017-08-02 00:00:00'};
	ajaxUtil.interfaceUtil(contextPathJs+'/moduleData/queryViolationRadia.do',param,vioRadia);
}

function vioRadia(data){
	if(data!=null){
		var seriesArr1=data.seriesData1.split(',');
		var xAxisDataArr=data.xAxisData.split('_');
		var x=new Array();
		for(var i=0;i<xAxisDataArr.length;i++){
			var json=eval('(' + xAxisDataArr[i] + ')');
			x.push(json);
		}
		test05(x,seriesArr1);
		//var vioSumNum=data.seriesData2;
		var html="(单位：起)";
		$('.vioSumNum').empty();
		$('.vioSumNum').append(html);
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
				radius : '60%',
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
//				areaStyle: {
//				normal: {
//				type: 'normal',
//				color: 'rgba(0, 0, 0, 0.5)',
//				opacity:0,
//				shadowBlur:{
//				shadowColor: 'rgba(0, 0, 0, 0.5)',
//				shadowBlur: 10
//				}
//				}
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
				        	value : seriesArr1,
				        	name : '违法数量',
//				        	areaStyle: {
//				        	normal: {
//				        	type: 'normal',
//				        	color: '',
//				        	opacity:0,
//				        	shadowBlur:{
//				        	shadowColor: 'rgba(0, 0, 0, 0.5)',
//				        	shadowBlur: 10
//				        	}
//				        	}
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
	//  使用刚指定的配置项和数据显示图表。
	var clazz=document.getElementById('test05');
	var myChart = echarts.init(clazz);
	myChart.setOption(option);
};                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
//违法类型数量变化
/****
 * <div class="app-area-box">
                                    <div class="app-title-box"><i></i><span>违法类型数量变化</span><b>TOP5</b></div>
                    <div style="margin-left: 10px;color: #1E5FBC;margin-top: 5px;"> </div><!-- 辖区拥堵、警情、警力分步echarts图表div -->
                    <div id="test03" style="width: 95%;height: 90%;"></div>
                  </div><!-- 整个div --> 
 */
$(function() {
	timeSchedule();
	setInterval("timeSchedule();",1000*60*5);
});

function timeSchedule(){
	var param={'violationType':'','beginTime':'2017-08-01 00:00:00','endTime':'2017-08-02 00:00:00'};
	ajaxUtil.interfaceUtil(contextPathJs+'/moduleData/queryViolationStatisticsByType.do',param,vioTypeNumChange);  
}

function vioTypeNumChange(data){
	if(data!=null){
		var seriesArr1=data.seriesData1.split(',');
		var seriesArr2=data.seriesData2.split(',');
		var xAxisDataArr=data.xAxisData.split(',');
		var xAxisDataArr_=new Array();
		var seriesArr1_=new Array();
		var seriesArr2_=new Array();
		for(var i=xAxisDataArr.length-1;i>=0;i--){
			xAxisDataArr_.push(xAxisDataArr[i]);
			seriesArr1_.push(seriesArr1[i]);
			seriesArr2_.push(seriesArr2[i]);
		}
		test03(xAxisDataArr_,seriesArr1_,seriesArr2_);
	}
}

function test03(xAxisData,seriesData1,seriesData2){
	option = {
			tooltip : {  
				trigger : 'axis',  
				axisPointer : { // 坐标轴指示器，坐标轴触发有效  
					type : 'shadow' // 默认为直线，可选为：'line' | 'shadow'  
				}
	//鼠标移入事件
	//formatter: function (params) {  
	//  return params[0].value+"起";  
	//} 
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
					color:'#1E5FBC',
					fontSize:14
				},
				itemWidth:15,  //图例标记的图形宽度
				itemHeight:15, //图例标记的图形高度
				show: true,
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
			                			  color:"#006DC7", //刻度颜色
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
			                            	data:seriesData1,//[2.0, 4.9, 7.0, 23.2, 25.6],
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
			                            	data:seriesData2,//[2.6, 5.9, 9.0, 26.4, 28.7],
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
	var clazz=document.getElementById('test03');
	var myChart = echarts.init(clazz);
	myChart.setOption(option);
}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
//拥堵专题 
/*****
 * <div class="app-area-box">
                                    <div class="app-title-box"><i></i><span>敏感道路</span><b>TOP5</b></div>
                    <div id="test01" style="width: 100%;height:70%;"></div>
                    <div class="jampslist" style="width: 100%;height:20%;">
                    </div>
                  </div><!-- 整个div -->    
 */
$(function() {
	timeSchedule();
	setInterval("timeSchedule();",1000*60*5);
});

function timeSchedule(){
	var param={'timeParam':'2017-08-01 00:00'};
	//ajaxUtil.interfaceUtil(',param,sensitiveRoadByDay);
	$.ajax({
		type : "POST",
		url : contextPathJs+'/moduleData/querySensitiveRoad01.do',
		data : param,
		contentType : "application/x-www-form-urlencoded; charset=UTF-8",
		dataType : "json",
		success : function(data) {
			sensitiveRoadByDay(data);
		}
	});
}

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
		$('.jampslist').empty();
		$('.jampslist').append(html);
	}

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
					return params[0].name+"<br />拥堵时长："+params[0].value+" 分钟";  
				} 
			},

			color: ['#3398DB'],
			grid: {
				top:'5%',
				left: '5%',
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
			                			  color:"#006DC7", //刻度颜色
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

	// 使用刚指定的配置项和数据显示图表。
	var clazz=document.getElementById('test01');
	var myChart = echarts.init(clazz);
	myChart.setOption(option);
}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
//今日常堵路段
/*****
 * <div class="app-area-box">
                                    <div class="app-title-box"><i></i><span>常堵路段</span><b>TOP5</b></div>

                    <div id="test02" style="width: 100%;height: 90%;margin-top:-15px;margin-left:-50px;" ></div>
                  </div><!-- 整个div -->                                                                                                                    
 */
$(function() {
	timeSchedule();
	setInterval("timeSchedule();",1000*60*5);
});

function timeSchedule(){
	var param={'timeParam':'2017-08-01 00:00:00'};
	ajaxUtil.interfaceUtil(contextPathJs+'/moduleData/queryJamRoadRanksByDay.do',param,jamRoadByDay);
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

function test02(xAxisDataArr,seriesArr1,seriesArr2,seriesArr3){
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
	var clazz=document.getElementById('test02');
	var myChart = echarts.init(clazz);
	myChart.setOption(option);
}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
