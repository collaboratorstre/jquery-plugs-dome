var road_datas = [];
var shapedatas = [];
var updateFlag=true;

function queryMapPSPositionFunc(recallDate) {
    $.ajax({
      type : "POST",
      url : contextPathJs + "/trafficState/queryAllTypePosition.do",
      ansyc : true,
      data : {recallDate:recallDate},
      dataType : "json",
      success : function(data) {
        var WIArr = new Array();
        var PSArr = new Array();
        var cogressArr = new Array();      
        if(data!=null && data.length>0){
          var dataList=data[0];
          //警情
          var WiData=dataList.WIPOSITION;
            var valueData = "";
            $.each(WiData,function(i,v){
              valueData = "{'name':'警情_"+v.alarmDesc+"','value':["+v.longitude+","+v.latitude+",2]}";
               var jaon = eval('('+valueData+')');
               WIArr.push(jaon);
            });
            //警力
            var PsData=dataList.PSPOSITION;
            valueData = "";
            $.each(PsData,function(i,v){
              if(v!=null){
                valueData = "{'name':'警力_"+v.policeName+"','value':["+v.longitude+","+v.latitude+",1]}";
                var jaon = eval('('+valueData+')');
                PSArr.push(jaon);
              }
            });
            //拥堵点
            var CogressData=dataList.CONGRESSPOSITION;
            valueData = "";
            $.each(CogressData,function(i,v){
              if(v!=null){
                valueData = "{'name':'拥堵点_"+v.NAME+"','value':["+v.LONGITUDE+","+v.LATITUDE+",3]}";
                var jaon = eval('('+valueData+')');
                cogressArr.push(jaon);
              }
            });
           }
        queryMapAlertAreaFunc(recallDate,WIArr,PSArr,cogressArr);
      }
    });
  }

function queryMapAlertAreaFunc(recallDate,WIArr,PSArr,cogressArr) {
  $.ajax({
    type : "POST",
    url : contextPathJs + "/warningEvent/queryMapAlertArea.do",
    ansyc : true,
    data : {recallDate:recallDate},
    dataType : "json",
    success : function(data) {
      var congestNum = 0;
      var WINum = 0;
      var PSNum = 0;
      var congestNum2 = 0;
      var WINum2 = 0;
      var PSNum2 = 0;
      var AlertAreaArr = new Array();
      var AlertAreaArr2 = new Array();
      var AlertAreaArr3 = new Array();
      var listSize = data.length;
      if (listSize>=2) {
        listSize = 2;
      } 
      $.each(data,function(i,v){
        if (i>1) {
          return;
        }
        var arr = v.split(";");
        if (i==0) {
          for (var i = 0; i < arr.length; i++) {
            var arr2 = new Array();
            var split = arr[i].split(",");
            arr2.push(split[0]);
            arr2.push(split[1]);
            arr2.push(400);
            AlertAreaArr.push(arr2);
            var flag = split[2];
            switch (flag) {
            case "0":
              congestNum++;
              break;
            case "1":
              WINum++;
              break;
            case "2":
              PSNum++;
              break;
            }
          }
        } else {
          for (var i = 0; i < arr.length; i++) {
            var arr2 = new Array();
            var split = arr[i].split(",");
            //var xy = split[0] + "," +  split[1] + ",400";
            arr2.push(split[0]);
            arr2.push(split[1]);
            arr2.push(400);
            //AlertAreaArr2.push(xy);
            AlertAreaArr2.push(arr2);
            var flag = split[2];
            switch (flag) {
            case "0":
              congestNum2++;
              break;
            case "1":
              WINum2++;
              break;
            case "2":
              PSNum2++;
              break;
            }
          }
        }
      })
      $.each(data,function(i,v){
        if (i>1) {
          return;
        }
        var arr = v.split(";");
        for (var i = 0; i < arr.length; i++) {
          var arr2 = new Array();
          var split = arr[i].split(",");
          arr2.push(split[0]);
          arr2.push(split[1]);
          arr2.push(400);
          AlertAreaArr3.push(arr2);
        }
      })
      setMap1(WIArr,PSArr,cogressArr,congestNum,WINum,PSNum,congestNum2,WINum2,PSNum2,AlertAreaArr,AlertAreaArr2,AlertAreaArr3,listSize);   
    }
  });
}

function setMap1(WIArr,PSArr,cogressArr,congestNum,WINum,PSNum,congestNum2,WINum2,PSNum2,AlertAreaArr,AlertAreaArr2,AlertAreaArr3,listSize) {

  // 弹出气泡加载
  $.ajaxSettings.async = false;
  $.getJSON(contextPathJs + '/board/data/tip1.json', function(shapes) { 
	    road_datas.length = 0;
	    shapesobj = shapes;
	    userClick(AlertAreaArr,AlertAreaArr2,AlertAreaArr3,listSize,congestNum,WINum,PSNum,congestNum2,WINum2,PSNum2);
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
    setMap(WIArr,PSArr,cogressArr,congestNum,WINum,PSNum,congestNum2,WINum2,PSNum2,AlertAreaArr,AlertAreaArr2,AlertAreaArr3,listSize);
  });
}
/** 拥堵点位置点信息* */
var getGISJamData = function() {
  return eval('[{"name":"拥堵点","value":[116.982470,36.639298,3]},{"name":"拥堵点","value":[ 117.166927,36.642385,3]},{"name":"拥堵点","value":[117.068154,36.645799,3]},{"name":"拥堵点","value":[116.964639,36.646490,3]},{"name":"拥堵点","value":[117.007174,36.791248,3]},{"name":"拥堵点","value":[116.982470,36.639298,3]},{"name":"拥堵点","value":[117.093613,36.715588,3]},{"name":"拥堵点","value":[116.91389,36.65138,3]},{"name":"拥堵点","value":[116.92804,36.66057,3]},{"name":"拥堵点","value":[116.91884,36.69168,3]},{"name":"拥堵点","value":[116.90824,36.68036,3]},{"name":"拥堵点","value":[116.93298,36.68107,3]},{"name":"拥堵点","value":[116.93192,36.67082,3]},{"name":"拥堵点","value":[116.97117,36.70511,3]},{"name":"拥堵点","value":[116.91814,36.67471,3]},{"name":"拥堵点","value":[116.92697,36.65385,3]},{"name":"拥堵点","value":[116.92485,36.65774,3]},{"name":"拥堵点","value":[116.92662,36.66127,3]},{"name":"拥堵点","value":[116.93122,36.66516,3]},{"name":"拥堵点","value":[116.98725,36.65052,3]},{"name":"拥堵点","value":[116.98814,36.64857,3]},{"name":"拥堵点","value":[116.99397,36.64963,3]},{"name":"拥堵点","value":[116.99132,36.64946,3]},{"name":"拥堵点","value":[116.9432,36.65096,3]},{"name":"拥堵点","value":[116.99114,36.64486,3]},{"name":"拥堵点","value":[116.98743,36.64098,3]}]');
};
/** 重点关注信息* */
var getGISFocusAreaData = function() {
  return eval('[{"name":"千佛山","value":[117.04269,36.645042, "千佛山"]},{"name":"趵突泉","value":[117.022388,36.667454, "趵突泉"]},{"name":"大明湖","value":[117.032954,36.683592, "大明湖"]}]');
};
/** 政府中心信息* */
var getGISKRGAreaData = function() {
   return eval('[{"name":"山东省政府","value":[117.02681,36.677611, "山东省政府"]},{"name":"济南市政府","value":[117.126488,36.658194, "济南市政府"]}]');
};
/** 警戒区域位置点信息* */
var getGISWarningAreaData = function() {
  return eval('[[116.76, 36.81, 191],[116.982470, 36.639298,300],[116.984, 36.648,630],[116.987, 36.648,530], [116.989, 36.648,430], [116.994, 36.648,330], [116.921, 36.652, 621],[116.924, 36.655,600],[116.927, 36.659,730],[116.925, 36.663,730]]');
};
/** 境界区域提示气泡信息* */

var getWarningAreaDataTip = function(congestNum,WINum,PSNum,congestNum2,WINum2,PSNum2) {
  var leftTopTip = '{"name":"拥堵点:'+congestNum+'","value":[116.57,36.83,3]},{"name":"警情:'+WINum+'","value":[116.57,36.81,2]},{"name":"警力:'+PSNum+'","value":[116.57,36.79,1]}';
  var rightBottomTip = '{"name":"拥堵点:'+congestNum2+'","value":[117.50,36.48,3]},{"name":"警情:'+WINum2+'","value":[117.50,36.46,2]},{"name":"警力:'+PSNum2+'","value":[117.50,36.44,1]}';
  return eval("[" + leftTopTip + "," + rightBottomTip + "]");
};

var shapesobj;
var newWarningAreaDataTip;
function userClick(AlertAreaArr,AlertAreaArr2,AlertAreaArr3,listSize,congestNum,WINum,PSNum,congestNum2,WINum2,PSNum2){
	newWarningAreaDataTip = new Array();
	var warningnum = listSize;
	if (warningnum == 0)
	  {
		shapesobj.geometries.length=0;
	  	console.log(shapesobj.geometries.length);
	  	return shapesobj.geometries.length = 0;
	  }
	else if (warningnum == 1)
	  {
		shapesobj.geometries.length=8;
		shapesobj.geometries[7].coordinates[1][0] = AlertAreaArr[0][0];
		shapesobj.geometries[7].coordinates[1][1] = AlertAreaArr[0][1];
		newWarningAreaDataTip[0] = getWarningAreaDataTip(congestNum,WINum,PSNum,congestNum2,WINum2,PSNum2)[0];
		newWarningAreaDataTip[1] = getWarningAreaDataTip(congestNum,WINum,PSNum,congestNum2,WINum2,PSNum2)[1];
		newWarningAreaDataTip[2] = getWarningAreaDataTip(congestNum,WINum,PSNum,congestNum2,WINum2,PSNum2)[2];
		return shapesobj.geometries.length = 8;
	  }
	else
	  {
		shapesobj.geometries.length=16;
		shapesobj.geometries[7].coordinates[1][0] = AlertAreaArr[0][0];
		shapesobj.geometries[7].coordinates[1][1] = AlertAreaArr[0][1];
		shapesobj.geometries[14].coordinates[0][0] = AlertAreaArr2[0][0];
		shapesobj.geometries[14].coordinates[0][1] = AlertAreaArr2[0][1];
		newWarningAreaDataTip[0] = getWarningAreaDataTip(congestNum,WINum,PSNum,congestNum2,WINum2,PSNum2)[0];
		newWarningAreaDataTip[1] = getWarningAreaDataTip(congestNum,WINum,PSNum,congestNum2,WINum2,PSNum2)[1];
		newWarningAreaDataTip[2] = getWarningAreaDataTip(congestNum,WINum,PSNum,congestNum2,WINum2,PSNum2)[2];
		newWarningAreaDataTip[3] = getWarningAreaDataTip(congestNum,WINum,PSNum,congestNum2,WINum2,PSNum2)[3];
		newWarningAreaDataTip[4] = getWarningAreaDataTip(congestNum,WINum,PSNum,congestNum2,WINum2,PSNum2)[4];
		newWarningAreaDataTip[5] = getWarningAreaDataTip(congestNum,WINum,PSNum,congestNum2,WINum2,PSNum2)[5];
		return shapesobj.geometries.length = 16;
	  }
	

}

var tipArrData = [];
/** 地图总体配置* */
function setMap(WIArr,PSArr,cogressArr,congestNum,WINum,PSNum,congestNum2,WINum2,PSNum2,AlertAreaArr,AlertAreaArr2,AlertAreaArr3,listSize) {
  $.ajaxSettings.async = true;
  var mapChart;
  $.getJSON(contextPathJs + '/board/data/city_center_district.json', function(data) {
    echarts.registerMap('jinan', data);
    mapChart = echarts.init(document.getElementById('map'));
    mapChart.setOption(mapOption);
    var zoom = 3;
    // 添加地图缩放事件
    mapChart.on("geoRoam", function(params) {
    	zoom = params.zoom*3;
    });
    mapChart.on('click', function (params) {
    	
    });
    mapChart.on('legendselectchanged', function (params) {
          if(params.selected.警戒区域 == false){
        	  $.getJSON(contextPathJs + '/board/data/tip1.json', function(shapes) { 
        		    road_datas.length = 0;
        		    shapesobj = shapes;
        		    userClick(AlertAreaArr,AlertAreaArr2,AlertAreaArr3,0,congestNum,WINum,PSNum,congestNum2,WINum2,PSNum2);
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
        	  // 主干道加载
        	  $.getJSON(contextPathJs + '/board/data/city_center_road.json', function(multiline) {
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
        	  //alert(zoom);
        	  
        	  tipArrData = mapOption.series[7].data;
        	  mapOption.geo.zoom = zoom;
        	  mapOption.series[7].data = [];
        	  mapOption.series[7].label.normal.show = false;
        	  mapChart.setOption(mapOption);
          } else if (params.selected.警戒区域){
	        	  $.getJSON(contextPathJs + '/board/data/tip1.json', function(shapes) { 
	      		    road_datas.length = 0;
	      		    shapesobj = shapes;
	      		    userClick(AlertAreaArr,AlertAreaArr2,AlertAreaArr3,listSize,congestNum,WINum,PSNum,congestNum2,WINum2,PSNum2);
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
	      	  // 主干道加载
	      	  $.getJSON(contextPathJs + '/board/data/city_center_road.json', function(multiline) {
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
        	  mapOption.series[7].data = tipArrData;
        	  mapOption.series[7].label.normal.show = true;
        	  mapChart.setOption(mapOption);
          }
    });
  });

  $.ajaxSettings.async = false;
  // 主干道加载
  $.getJSON(contextPathJs + '/board/data/city_center_road.json', function(multiline) {
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

   var mapOption = {
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
            var name = params.name;
          var arr = name.split("_");
         
          if (arr.length>1) {
            return arr[0] + ' : ' + arr[1];
          } else {
            return "";
          }
        }
      },
      color : [ '#2EBA37', '#D7C316', '#DC0F2D', "#0101FF", "#FE6000" ], 
      legend : {
        orient : 'vertical',
        y : 'top',
        x : 'right',
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
        zoom : 3,
        scaleLimit:{
            min:0.5,
            max:20
        },
        label : {
          emphasis : {
            show : false
          }
        },
       itemStyle : {
          normal : {
            areaColor : '#002257',
            borderColor : 'rgba(0, 140, 237, 0.6)',
            borderWidth : 2,
            shadowColor: 'rgba(0, 140, 237, 0.5)',
            shadowBlur:15
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
        data : PSArr,
        symbolSize : 6
      }, {
        name : '警情分布',
        type : 'scatter',
        coordinateSystem : 'geo',
        data : WIArr,
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
        data : cogressArr,//getGISJamData(),
        symbolSize : 4
      }, {
        name : '重点关注',
        type : 'scatter',
        tooltip:{
              formatter:"{b}"
        },
        coordinateSystem : 'geo',
        data : getGISFocusAreaData(),
        //icon : 'image://../../images/sanjiao.png', 
            symbol: 'image://board/images/triangleicon.png',
        symbolSize : 10
      },{
      name : '政府中心',
          type : 'scatter',
          tooltip:{
              formatter:"{b}"
          },
          coordinateSystem : 'geo',
          data : getGISKRGAreaData(),
          //icon : 'image://../../images/sanjiao.png', 
          symbol: 'image://board/images/pentagon.png',
          symbolSize : 10
    },{
        name : '警戒区域',
        type : 'heatmap',
        hoverable : false,
        coordinateSystem : 'geo',
        data : AlertAreaArr3,
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
            opacity : 0.6,
            width : 2
          }
        },
        progressiveThreshold : 500,
        progressive : 200
      }, {
        name : 'warningTip',
        type : 'scatter',
        coordinateSystem : 'geo',
        data : newWarningAreaDataTip,
       // data : getWarningAreaDataTip(),
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
}  



 


  function getTotalJamNumFunc(recallDate) {
    $.ajax({
      type : "POST",
      url : contextPathJs + "/trafficState/getTotalJamNum.do",
      ansyc : true,
      data : {recallDate:recallDate},
      //data : {recallDate:"2017-9-3 3:00:00"},
      dataType : "json",
      success : function(data) {
        $("#currentAverageCarNum2").empty();
        $("#currentCarNum").empty();
        $("#currentCarNum2").empty();
        $("#currentAverageCarNum3").empty();
        $("#currentCarTotal").empty();
        $("#currentCarTotalNum").empty();
        var currentCarTotal = "0";
        var currentCarNum = "0";
        var currentAverageCarNum = "0";
        $.each(data,function(i,v){
          if (i>0) {
            return;
          }
          currentCarTotal = v.totalcount + "";
          currentCarNum = v.activeVehicle;
          currentAverageCarNum = v.vehicleInMiles;
        });
        if (currentCarTotal.length>4) {
          var wan =parseInt(currentCarTotal)/10000;
          $("#currentCarTotal").append("今日机动车总量(万辆)");
          $("#currentCarTotalNum").append(wan.toFixed(2));
        } else {
          $("#currentCarTotal").append("今日机动车总量(辆)");
          $("#currentCarTotalNum").append(currentCarTotal);
          
        }
        if (currentCarNum.length>4) {
          var wan =parseInt(currentCarNum)/10000;
          $("#currentCarNum2").append("当前活动车辆(万辆)");
          $("#currentCarNum").append(wan.toFixed(2));
        } else {
          $("#currentCarNum2").append("当前活动车辆(辆)");
          $("#currentCarNum").append(currentCarNum);
          
        }
        if (currentAverageCarNum.length>4) {
          var wan =parseInt(currentAverageCarNum)/10000;
          $("#currentAverageCarNum3").append("当前车辆数(万辆/公里)");
          $("#currentAverageCarNum2").append(wan.toFixed(2));
        } else {
          $("#currentAverageCarNum3").append("当前车辆数(辆/公里)");
          $("#currentAverageCarNum2").append(currentAverageCarNum);
          
        }
      }
    });
  }   
  
  
  
  
  

///******兼容 toggle******/
//$.fn.toggle = function( fn, fn2 ) {
//    var args = arguments,guid = fn.guid || $.guid++,i=0,
//    toggle = function( event ) {
//      var lastToggle = ( $._data( this, "lastToggle" + fn.guid ) || 0 ) % i;
//      $._data( this, "lastToggle" + fn.guid, lastToggle + 1 );
//      event.preventDefault();
//      return args[ lastToggle ].apply( this, arguments ) || false;
//    };
//    toggle.guid = guid;
//    while ( i < args.length ) {
//      args[ i++ ].guid = guid;
//    }
//    return this.click( toggle );
//  };
///******兼容 toggle******/
//
////设置日期，当前日期的前七天
//var myDate = new Date(); //获取今天日期
//atHour = myDate.getHours();
//myDate.setDate(myDate.getDate() - 6);
//var _hindex=atHour;
//var mtody=myDate.getDay();;
//
//
//var class_date = {
//  allDateArray : [],
//  dateArray:[],
//  dateTemp:'',
//  _reTimeArr:[],
//  flag:1, 
//  indexDay:0,
//  indexhour:0,
//  _minute:-1,
//  _daybox:$(".dates ul"),
//  _nextbtn:$(".hours dt:last-child"),
//  _weekDay:["日", "一", "二", "三", "四", "五", "六"],
//  addZero:function(sum){ 
//      if(sum >= 10){
//        return sum; 
//      }else{
//        return "0"+sum; 
//      }
//  },
//
//  _init:function(){
//
//    this.dateArray = [];
//    for (var i = 0; i < 7; i++) {
//        if(mtody==7){
//          mtody = 0; 
//        }
//        var smyDate = new Date(myDate);
//        smyDate.setDate(myDate.getDate()+i);
//        this.dateArray.push(this._weekDay[mtody]);
//        this.allDateArray.push(smyDate.getFullYear()+"-"+(smyDate.getMonth()+1)+"-"+smyDate.getDate());
//        mtody++;
//    }
//    //console.log(this.allDateArray);
//    
//    this._draw_day();
//    this._amAndpm();
//    this._draw_hour();
//    this._draw_minute();
//
//    },
//
//    _returnTime:function(){
//      myDate = new Date(); //获取今天日期
//      var temph = -1;
//      // console.log(_hindex); //13
//      if ($(".subsection .current em").html()==$(".select em:first-child").html()) {
//      	temph = class_date.indexhour;
//      }else{
//      	temph = class_date.indexhour+12;
//      }
//      console.log(temph); //13
//      var atdateTemp = class_date.allDateArray[class_date.indexDay] +" "+ (temph) +":"+ ( (class_date._minute>=0)?class_date._minute:myDate.getMinutes() ) +":"+ myDate.getSeconds();
//      //alert(atdateTemp);
//      console.log(atdateTemp);
//      recallDateStart(atdateTemp);
//    },
//
//  _draw_day:function(){
//	$(".dates ul li").remove();
//    for(var i=0;i<this.dateArray.length;i++){
//        if (i==(this.dateArray.length-1)) {
//          class_date.indexDay= i;
//          this._daybox.append("<li class=active>"+this.dateArray[i]+"</li>");
//        }else{
//          this._daybox.append("<li>"+this.dateArray[i]+"</li>");
//        }
//    }
//    $(".dates li").on('click',function(){
//      class_date.indexDay= $(this).index();
//      $(this).addClass("active").siblings().removeClass("active");
//      $(".hours dd").remove();
//      class_date._draw_hour();
//      class_date._minute=-1;
//      $(".minute dl dd").removeClass("active");
//      class_date._returnTime();
//
//    }); 
//  },
//  _amAndpm:function(){
//  			var currentapm = $(".subsection .current");
//  			if (_hindex>11) {
//				currentapm.find("em").html($(".select em:last-child").html());
//			}
//  			currentapm.toggle(
//	    	      function(){
//	    	        $(".select").show();
//	    	      },function(){
//	    	          $(".select").hide();
//	    	      }
//		    );
//		    $(".select em").on('click',function(){
//		    	currentapm.find("em").html($(this).html());
//		    	$(".select").hide();
//		    	if ($(".dates li:last-child").hasClass("active")) {
//		    		class_date._draw_hour();
//		    	}
//		    });
//		    
//  },
//  _draw_hour:function(){
//  			function drawFun(){
//
//  				$("#hour_"+i).on('click',function(){
//			        if ($(".dates li:last-child").hasClass("active")) {
//			            if ($(this).hasClass("atlose")) {return false;}
//			            
//			          }
//			          $(this).addClass("active").siblings().removeClass("active");
//			          class_date.indexhour= $(this).index()-1;
//			          class_date._returnTime();
//
//			      });
//  			}
//  			function creathourFun(){
//  				if ($(".dates li:last-child").hasClass("active") && _hindexIn<i) {
//			        class_date._nextbtn.before('<dd id="hour_'+i+'" class="atlose">'+i+'</dd>');
//			      }else{
//			        if(_hindexIn==i){
//			          class_date._nextbtn.before('<dd id="hour_'+i+'" class="active">'+i+'</dd>');
//			          class_date.indexhour= i;
//			        }else{
//			          class_date._nextbtn.before('<dd id="hour_'+i+'" >'+i+'</dd>');
//			        }
//			      }
//  			}
//  			function creathourFunlose(){
//  				if(_hindexIn==i){
//			          class_date._nextbtn.before('<dd id="hour_'+i+'" class="active">'+i+'</dd>');
//			          class_date.indexhour= i;
//			    }else{
//			          class_date._nextbtn.before('<dd id="hour_'+i+'" >'+i+'</dd>');
//			    }
//  			}
//			$(".hours dd").remove();
//		    for(var i=0;i<12;i++){
//		    	  var _hindexIn = 0;
//		    	  if (_hindex>11) {
//		    		_hindexIn = _hindex-12;
//		    	  }else{
//		    	  	_hindexIn = _hindex;
//		    	  }
//			      creathourFun();
//			      drawFun();
//			      
//		    }
//
//		    if ($(".dates li:last-child").hasClass("active")) {
//
//				    if (_hindex<=11 ) {//上午
//				    		if ($(".subsection .current em").html()==$(".select em:first-child").html()) {
//							        $(".hours dd").remove();
//								    for(var i=0;i<12;i++){
//								    	  var _hindexIn = 0;
//								    	  if (_hindex>11) {
//								    		_hindexIn = _hindex-12;
//								    	  }else{
//								    	  	_hindexIn = _hindex;
//								    	  }
//									      creathourFun();
//
//									      drawFun();
//								    }
//				    		}else{
//				    			$(".hours dd").remove();
//								for(var i=0;i<12;i++){
//				    				this._nextbtn.before('<dd id="hour_'+i+'" class="atlose">'+i+'</dd>');
//				    				drawFun();
//				    			}
//				    		}
//
//					}else{//下午
//						if ($(".subsection .current em").html()==$(".select em:first-child").html()) {
//							$(".hours dd").remove();
//							for(var i=0;i<12;i++){
//								creathourFunlose();
//						        drawFun();
//						    }
//						}else{
//								$(".hours dd").remove();
//							    for(var i=0;i<12;i++){
//							    	  var _hindexIn = 0;
//							    	  if (_hindex>11) {
//							    		_hindexIn = _hindex-12;
//							    	  }else{
//							    	  	_hindexIn = _hindex;
//							    	  }
//								      creathourFun();
//
//								      drawFun();
//							    }
//						}
//
//					}
//		    }else{
//		    			$(".hours dd").remove();
//						for(var i=0;i<12;i++){
//								creathourFunlose();
//						        drawFun();
//						}	
//		    }
//
//  },
//  _draw_minute:function(){
//  		var minute_index = 0;
//  			$(".minute dl dd").on('click',function(){
//	        	class_date._minute = $(this).html();
//	        	$(this).addClass("active").siblings().removeClass("active");
//	        	class_date._returnTime();
//		    });
//
//  }
//
//}
//
//
//$(function(){
//
//
//    class_date._init();
//
//    $(".hours dt:first-child").on('click',function(){
//      if ($(".hours dd.active").index()==1) {
//        return false;
//      }
//      $(".hours dd.active").removeClass("active").prev().addClass("active");
//      _hindex = $(".hours dd.active").prev().index();
//      class_date.indexhour=$(".hours dd.active").prev().index();
//      class_date._returnTime();
//    }); 
//
//    $(".hours dt:last-child").on('click',function(){
//      if ($(".hours dd.active").index()==24) {
//        return false;
//      }
//      if ($(".hours dd.active").next().hasClass("atlose")) {
//        return false;
//      }
//      console.log($(".hours dd.active").index());
//      $(".hours dd.active").removeClass("active").next().addClass("active");
//      _hindex = $(".hours dd.active").next().index()-2;
//      class_date.indexhour= $(".hours dd.active").next().index()-2;
//      class_date._returnTime();
//    }); 
//    
//    
//    $(".sorbtn").toggle(
//    	      function(){
//    	          //$(this).css({"background":"url("+contextPathJs+"board/images/close_date.png) 13px 6px / 43% 66% no-repeat"});
//    	          $(".dates").show();
//    	        $(".hours").show();
//    	        $(".minute").show();
//    	      },function(){
//    	    	  class_date._init();
//    	          //$(this).css({"background":"url("+contextPathJs+"board/images/open_date.png) 13px 6px / 43% 66% no-repeat"});
//    	          $(".dates").hide();
//    	          $(".hours").hide();
//    	          $(".minute").hide();
//    	          //window.location.reload();//Ë¢ÐÂµ±Ç°Ò³Ãæ
//    	          myDate = new Date(); //»ñÈ¡½ñÌìÈÕÆÚ
//    	          var atdateTemp = myDate.getFullYear()+"-"+(myDate.getMonth()+1)+"-"+myDate.getDate()+" "+ myDate.getHours() +":"+ myDate.getMinutes() +":"+ myDate.getSeconds();
//    	          var getHour = _hindex = myDate.getHours();
//    	          //timeRollHide(atdateTemp);
//    	          $(".dates ul li:last-child").addClass("active").siblings().removeClass("active");
//    	          $(".hours dl dd").removeClass("active");
//    	          $("#hours_"+getHour).addClass("active");
//    	          
//    	          class_date._draw_hour();
//    	          class_date._minute=-1;
//    	          $(".minute dl dd").removeClass("active");
//
//    	      
//    	      }
//    );
//
//});               
//
//function recallDateStart(recallDate) {
//    clearInterval(timer);
//    initMethod(recallDate);
//}
//
////隐藏时间轴-定时器重新加载
//function timeRollHide(recallDate) { 
//  initMethod(recallDate);
//  //新一轮定时器
//  timer = setInterval(function() {
//    initMethod(recallDate);
//  }, 1000 * 60 *5);
//
//}
//
//function initMethod(recallDate){
//  /* <!-- 中1.当前警情 小组件 --> */
//	warningEvent.currentWINum(recallDate);
//    /* <!-- 中1.当前警力 小组件 --> */
//    dutyDispatch.currentPSNum(recallDate);
//    /* <!-- 右1.在岗警力 组件 --> */
//    dutyDispatch.areaPsDistributionFunc(recallDate);
//    /* <!-- 右2.今日辖区警情 TOP5 --> */
//    warningEvent.currentAreaWIFunc(recallDate);
//    /* <!-- 中3.拥堵点、警情、警力分布 --> */
//    trafficState.JamWIPSFunc(recallDate);
//    /* <!-- 中4.今日重大警情 --> */
//    warningEvent.todayFirstWI(recallDate);
//    /* <!-- 中2.地图下小组件 --> */
//    getTotalJamNumFunc(recallDate);
//    /*****************************/
//    /* <!-- 设备专题 --> */
//    equipment.equipmentTime(recallDate);
//    /* <!-- 影响交通因素 --> */
//    trafficState.factorTime(recallDate);
//    /* <!-- 违法数量和类型变化 --> */
//    violation.vioNumATypeTime(recallDate);
//    /* <!-- 违法类型数量变化 --> */
//    violation.vioNumDTypeTime(recallDate);
//    /* <!-- 当月违法小组件 --> */
//    violation.vioNumTime(recallDate);
//    /* <!-- 交通管理指数 --> */
//    trafficState.trafficIndexTime(recallDate);
//    /* <!-- 拥堵指数（仪表盘） --> */
//    trafficState.congressIndexTime(recallDate);
//    /* <!-- 今日敏感区域拥堵变化 --> */
//    trafficState.sensitiveTime(recallDate);
//    /* <!-- 今日常堵路段top5 --> */
//    trafficState.oftenJamRoad(recallDate);
//    /* <!-- 地图警情警力警戒区域 --> */
//    queryMapPSPositionFunc(recallDate);
//}

