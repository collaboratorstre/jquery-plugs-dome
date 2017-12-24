var road_datas = [];
var shapedatas = [];

$(function () {
  queryMapPSPositionFunc(recallDate) 
   timer = setInterval(function() {
        queryMapPSPositionFunc(recallDate) 
  }, 1000 * 60 * 5);
})



var PSArr;
var WIArr;
var cogressArr;
var AlertAreaArr;
var AlertAreaArr2;
var AlertAreaArr3;
//function queryMapPSPositionFunc(recallDate) {
//  $.ajax({
//      type : "POST",
//      url : contextPathJs + "/dataStatistics/queryMapPSPosition.do",
//      ansyc : false,
//      data : {recallDate:recallDate},
//      dataType : "json",
//      success : function(data) {
//        PSArr = new Array();
//        var valuePS = "";
//        $.each(data,function(i,v){
//          valuePS = "{'name':'警力','value':["+v.longitude+","+v.latitude+",1]}";
//          var jaon = eval('('+valuePS+')');
//        PSArr.push(jaon);
//        });
//        queryMapAlertAreaFunc(recallDate);
//      }
//    });
//}

function queryMapPSPositionFunc(recallDate) {
	  $.ajax({
	    type : "POST",
	    url : contextPathJs + "/dataStatisticsY/queryAllTypePosition.do",
	    ansyc : false,
	    data : {recallDate:recallDate},
	    dataType : "json",
	    success : function(data) {
	    	debugger;
	      if(data!=null && data.length>0){
	    	  var dataList=data[0];
	    	  //警情
	    	  var WiData=dataList.WIPOSITION;
	    	  WIArr = new Array();
	          var valueData = "";
	          $.each(WiData,function(i,v){
	        	  valueData = "{'name':'警情','value':["+v.longitude+","+v.latitude+",2]}";
	             var jaon = eval('('+valueData+')');
	             WIArr.push(jaon);
	          });
	          //警力
	          var PsData=dataList.PSPOSITION;
	          PSArr = new Array();
	          valueData = "";
	          $.each(PsData,function(i,v){
	        	  if(v!=null){
	        		  valueData = "{'name':'警力','value':["+v.longitude+","+v.latitude+",1]}";
	        		  var jaon = eval('('+valueData+')');
	        		  PSArr.push(jaon);
	        	  }
	          });
	          
	          //拥堵点
	          var CogressData=dataList.CONGRESSPOSITION;
	          cogressArr = new Array();
	          valueData = "";
	          $.each(CogressData,function(i,v){
	        	  if(v!=null){
	        		  valueData = "{'name':'拥堵点','value':["+v.LONGITUDE+","+v.LATITUDE+",3]}";
	        		  var jaon = eval('('+valueData+')');
	        		  cogressArr.push(jaon);
	        	  }
	          });
	          //重点关注
//	          var importData=dataList.IMPORTPOSITION;
//	          importArr = new Array();
//	          valueData = "";
//	          $.each(importData,function(i,v){
//	        	valueData = "{'name':'重点关注','value':["+v.LONGITUDE+","+v.LATITUDE+",3]}";
//	            var jaon = eval('('+valueData+')');
//	            importArr.push(jaon);
//	          });
	         }
	      queryMapAlertAreaFunc(recallDate);
	    }
	  });
	}

var congestNum;
var WINum;
var PSNum;
var congestNum2;
var WINum2;
var PSNum2;
var listSize;
function queryMapAlertAreaFunc(recallDate) {
  $.ajax({
    type : "POST",
    url : contextPathJs + "/dataStatistics/queryMapAlertArea.do",
    ansyc : false,
    data : {recallDate:recallDate},
    dataType : "json",
    success : function(data) {
      congestNum = 0;
      WINum = 0;
      PSNum = 0;
      congestNum2 = 0;
      WINum2 = 0;
      PSNum2 = 0;
      AlertAreaArr = new Array();
      AlertAreaArr2 = new Array();
      AlertAreaArr3 = new Array();
      listSize = data.length;
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
            //var xy = split[0] + "," +  split[1] + ",400";
            arr2.push(split[0]);
            arr2.push(split[1]);
            arr2.push(400);
            //AlertAreaArr2.push(xy);
            AlertAreaArr.push(arr2);
            var flag = split[2];
            switch (flag) {
            case "1":
              congestNum++;
              break;
            case "2":
              WINum++;
              break;
            case "3":
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
            case "1":
              congestNum2++;
              break;
            case "2":
              WINum2++;
              break;
            case "3":
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
          //var xy = split[0] + "," +  split[1] + ",400";
          arr2.push(split[0]);
          arr2.push(split[1]);
          arr2.push(400);
          //AlertAreaArr2.push(xy);
          AlertAreaArr3.push(arr2);
        }
      })
      //console.log(AlertAreaArr);
      //alert(AlertAreaArr.length);
      //alert("拥堵点:"+congestNum);
			//alert("警情:"+WINum);
			//alert("警力:"+PSNum);
//			queryMapWIPositionFunc(recallDate);
            setMap1();
		}
	});
}

//function queryMapWIPositionFunc(recallDate) {
//  $.ajax({
//    type : "POST",
//    url : contextPathJs + "/dataStatistics/queryMapWIPosition.do",
//    ansyc : false,
//    data : {recallDate:"2017-9-7 15:00:00"},
//    dataType : "json",
//    success : function(data) {
//      WIArr = new Array();
//      var valueWI = "";
//      $.each(data,function(i,v){
//        valueWI = "{'name':'警情','value':["+v.longitude+","+v.latitude+",2]}";
//         var jaon = eval('('+valueWI+')');
//         WIArr.push(jaon);
//      });
//       setMap1();
//    }
//  });
//}

function setMap1() {

  // 弹出气泡加载
  $.ajaxSettings.async = false;
  $.getJSON(contextPathJs + '/board/data/tip1.json', function(shapes) {
    shapesobj = shapes;
    userClick();
    //console.log(shapes.geometries.length);//一个气泡的length为8，两个气泡length为16,0个气泡length为0
    var geometries = shapes.geometries;
    var sf = 0;
    var sk = 300 / (geometries.length);
    //console.log(shapes.geometries[8].coordinates[0]);
    //console.log(shapes.geometries[15].coordinates[0]);
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
    setMap();
  });
}
/** 拥堵点位置点信息* */
var getGISJamData = function() {
  return eval('[{"name":"拥堵点","value":[116.982470,36.639298,3]},{"name":"拥堵点","value":[ 117.166927,36.642385,3]},{"name":"拥堵点","value":[117.068154,36.645799,3]},{"name":"拥堵点","value":[116.964639,36.646490,3]},{"name":"拥堵点","value":[117.007174,36.791248,3]},{"name":"拥堵点","value":[116.982470,36.639298,3]},{"name":"拥堵点","value":[117.093613,36.715588,3]},{"name":"拥堵点","value":[116.91389,36.65138,3]},{"name":"拥堵点","value":[116.92804,36.66057,3]},{"name":"拥堵点","value":[116.91884,36.69168,3]},{"name":"拥堵点","value":[116.90824,36.68036,3]},{"name":"拥堵点","value":[116.93298,36.68107,3]},{"name":"拥堵点","value":[116.93192,36.67082,3]},{"name":"拥堵点","value":[116.97117,36.70511,3]},{"name":"拥堵点","value":[116.91814,36.67471,3]},{"name":"拥堵点","value":[116.92697,36.65385,3]},{"name":"拥堵点","value":[116.92485,36.65774,3]},{"name":"拥堵点","value":[116.92662,36.66127,3]},{"name":"拥堵点","value":[116.93122,36.66516,3]},{"name":"拥堵点","value":[116.98725,36.65052,3]},{"name":"拥堵点","value":[116.98814,36.64857,3]},{"name":"拥堵点","value":[116.99397,36.64963,3]},{"name":"拥堵点","value":[116.99132,36.64946,3]},{"name":"拥堵点","value":[116.9432,36.65096,3]},{"name":"拥堵点","value":[116.99114,36.64486,3]},{"name":"拥堵点","value":[116.98743,36.64098,3]}]');
  //return eval('[]');
};
/** 重点关注信息* */
var getGISFocusAreaData = function() {
  return eval('[{"name":"千佛山","value":[117.04269,36.645042, "千佛山"]},{"name":"趵突泉","value":[117.022388,36.667454, "趵突泉"]},{"name":"大明湖","value":[117.032954,36.683592, "大明湖"]}]');
  //return eval('[]');
};
/** 政府中心信息* */
var getGISKRGAreaData = function() {
   return eval('[{"name":"山东省政府","value":[117.02681,36.677611, "山东省政府"]},{"name":"济南市政府","value":[117.126488,36.658194, "济南市政府"]}]');
 
  //return eval('[{"name":"山东省政府","value":[117.02681,36.677611, 3]}]');
  //return eval('[]');
};
/** 警戒区域位置点信息* */
var getGISWarningAreaData = function() {
  return eval('[[116.76, 36.81, 191],[116.982470, 36.639298,300],[116.984, 36.648,630],[116.987, 36.648,530], [116.989, 36.648,430], [116.994, 36.648,330], [116.921, 36.652, 621],[116.924, 36.655,600],[116.927, 36.659,730],[116.925, 36.663,730]]');
  //return eval('[[116.76, 36.81, 191],[116.982470, 36.639298,300]]');
   
  //return eval('[]');
};
/** 境界区域提示气泡信息* */

var getWarningAreaDataTip = function() {
  var leftTopTip = '{"name":"拥堵点:'+congestNum+'","value":[116.57,36.83,3]},{"name":"警情:'+WINum+'","value":[116.57,36.81,2]},{"name":"警力:'+PSNum+'","value":[116.57,36.79,1]}';
  var rightBottomTip = '{"name":"拥堵点:'+congestNum2+'","value":[117.50,36.48,3]},{"name":"警情:'+WINum2+'","value":[117.50,36.46,2]},{"name":"警力:'+PSNum2+'","value":[117.50,36.44,1]}';
  return eval("[" + leftTopTip + "," + rightBottomTip + "]");
  //return eval('[]');
};

var shapesobj;
var newWarningAreaDataTip = [];
function userClick(){
  var warningnum = listSize;
  //alert(params.value[0]+","+params.value[1]);
  //console.log(shapes.geometries.length);//一个气泡的length为8，两个气泡length为16,0个气泡length为0
  
  if (warningnum == 0)
    {
    shapesobj.geometries.length=0;
      console.log(shapesobj.geometries.length);
    }
  else if (warningnum == 1)
    {
    shapesobj.geometries.length=8;
    //console.log(getGISWarningAreaData()[0]);
    //console.log(shapesobj.geometries[7].coordinates[0]);
    //console.log(shapesobj.geometries.length);
    shapesobj.geometries[7].coordinates[1][0] = AlertAreaArr[1][0];
    shapesobj.geometries[7].coordinates[1][1] = AlertAreaArr[1][1];
    //console.log(getWarningAreaDataTip().length);//6
    newWarningAreaDataTip[0] = getWarningAreaDataTip()[0];
    newWarningAreaDataTip[1] = getWarningAreaDataTip()[1];
    newWarningAreaDataTip[2] = getWarningAreaDataTip()[2];
    }
  else
    {
    shapesobj.geometries.length=16;
    shapesobj.geometries[7].coordinates[1][0] = AlertAreaArr[1][0];
    shapesobj.geometries[7].coordinates[1][1] = AlertAreaArr[1][1];
    shapesobj.geometries[14].coordinates[0][0] = AlertAreaArr2[1][0];
    shapesobj.geometries[14].coordinates[0][1] = AlertAreaArr2[1][1];
    newWarningAreaDataTip[0] = getWarningAreaDataTip()[0];
    newWarningAreaDataTip[1] = getWarningAreaDataTip()[1];
    newWarningAreaDataTip[2] = getWarningAreaDataTip()[2];
    newWarningAreaDataTip[3] = getWarningAreaDataTip()[3];
    newWarningAreaDataTip[4] = getWarningAreaDataTip()[4];
    newWarningAreaDataTip[5] = getWarningAreaDataTip()[5];
    }

}

/** 地图总体配置* */
function setMap() {
  //loadMap();
  //var barEchartDiv=document.getElementById('map');
  //var myChart = echarts.init(barEchartDiv);
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
    mapChart.on('click', function (params) {
        // 控制台打印数据的名称
      //if(params.componentSubType=="scatter"){
      //  userClick(params);
      //}
        //console.log(params);
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
						borderColor : 'rgba(0, 140, 237, 0.8)',
						borderWidth : 2,
						shadowColor: 'rgba(0, 140, 237, 0.6)',
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
        coordinateSystem : 'geo',
        data : getGISFocusAreaData(),
        //icon : 'image://../../images/sanjiao.png', 
            symbol: 'image://board/images/triangleicon.png',
        symbolSize : 20,
      }, {
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
  //myChart.setOption(mapOption);
}  



 /*
   * 综合看板地图下方组件
   */
  $(function () {
    getTotalJamNumFunc(recallDate);
    timer = setInterval(function() {
       getTotalJamNumFunc(recallDate);
  }, 1000 * 60 * 5);
  });


  function getTotalJamNumFunc(recallDate) {
    $.ajax({
      type : "POST",
      url : contextPathJs + "/dataStatistics/getTotalJamNum.do",
      ansyc : false,
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
  
  
  
  
  

/******兼容 toggle******/
$.fn.toggle = function( fn, fn2 ) {
    var args = arguments,guid = fn.guid || $.guid++,i=0,
    toggle = function( event ) {
      var lastToggle = ( $._data( this, "lastToggle" + fn.guid ) || 0 ) % i;
      $._data( this, "lastToggle" + fn.guid, lastToggle + 1 );
      event.preventDefault();
      return args[ lastToggle ].apply( this, arguments ) || false;
    };
    toggle.guid = guid;
    while ( i < args.length ) {
      args[ i++ ].guid = guid;
    }
    return this.click( toggle );
  };
/******兼容 toggle******/

//设置日期，当前日期的前七天
var myDate = new Date(); //获取今天日期
atHour = myDate.getHours();
myDate.setDate(myDate.getDate() - 6);
var _hindex=atHour;


var class_date = {
  allDateArray : [],
  dateArray:[],
  dateTemp:'',
  _reTimeArr:[],
  flag:1, 
  indexDay:0,
  indexhour:0,
  _daybox:$(".dates ul"),
  _nextbtn:$(".hours dt:last-child"),
  _weekDay:["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
  addZero:function(sum){ 
      if(sum >= 10){
        return sum; 
      }else{
        return "0"+sum; 
      }
  },

  _init:function(){
    /*for (var i = 0; i < 7; i++) {
        this.dateTemp = (this.addZero(myDate.getMonth()+1))+"-"+this.addZero(myDate.getDate());
        this.dateArray.push(this.dateTemp);
        myDate.setDate(myDate.getDate() + this.flag);
    }*/
    var mtody = myDate.getDay();
		for (var i = 0; i < 7; i++) {
		    if(mtody==7){
		    	mtody = 0; 
		    }
		    var smyDate = new Date(myDate);
		    smyDate.setDate(myDate.getDate()+i);
		    this.dateArray.push(this._weekDay[mtody]);
		    this.allDateArray.push(smyDate.getFullYear()+"-"+(smyDate.getMonth()+1)+"-"+smyDate.getDate());
		    mtody++;
		}
		//console.log(this.allDateArray);
    
    this._draw_day();
    this._draw_hour();
    },

    _returnTime:function(){
      myDate = new Date(); //获取今天日期
      var atdateTemp = class_date.allDateArray[class_date.indexDay] +" "+ (class_date.indexhour) +":"+ myDate.getMinutes() +":"+ myDate.getSeconds();
      //alert(atdateTemp);
      console.log(atdateTemp);
      recallDateStart(atdateTemp);
    },

  _draw_day:function(){
    for(var i=0;i<this.dateArray.length;i++){
        if (i==(this.dateArray.length-1)) {
          class_date.indexDay= i;
          this._daybox.append("<li class=active>"+this.dateArray[i]+"</li>");
        }else{
          this._daybox.append("<li>"+this.dateArray[i]+"</li>");
        }
    }
  },
  _draw_hour:function(){
    for(var i=0;i<24;i++){
      if ($(".dates li:last-child").hasClass("active") && atHour<i) {
        this._nextbtn.before('<dd id="hour_'+i+'" class="atlose">'+i+'</dd>');
      }else{
        if(_hindex==i){
          _hindex = i;
          class_date.indexhour= i;
          this._nextbtn.before('<dd id="hour_'+i+'" class="active">'+i+'</dd>');
        }else{
          this._nextbtn.before('<dd id="hour_'+i+'" >'+i+'</dd>');
        }
      }
      $("#hour_"+i).on('click',function(){
        if ($(".dates li:last-child").hasClass("active")) {
            if (atHour<=$(this).html()) {return false;}
          }
          $(this).addClass("active").siblings().removeClass("active");
          _hindex = $(this).index()-1;
          class_date.indexhour= $(this).index()-1;
          class_date._returnTime();
      });
    }
  },

}

function recallDateStart(recallDate) {
    clearInterval(timer); 
      /* <!-- 中1.当前警情 小组件 --> */
      currentWINum(recallDate);
    /* <!-- 中1.当前警力 小组件 --> */
    currentPSNum(recallDate);
    /* <!-- 右1.在岗警力 组件 --> */
    areaPsDistributionFunc(recallDate);
    /* <!-- 右2.今日辖区警情 TOP5 --> */
    currentAreaWIFunc(recallDate);
    /* <!-- 中3.拥堵点、警情、警力分布 --> */
    JamWIPSFunc(recallDate);
    /* <!-- 中4.今日重大警情 --> */
    todayFirstWI(recallDate);
    /* <!-- 中2.地图下小组件 --> */
    getTotalJamNumFunc(recallDate);
    /*****************************/
    /* <!-- 设备专题 --> */
    equipmentTime(recallDate);
    /* <!-- 影响交通因素 --> */
    factorTime(recallDate);
    /* <!-- 违法数量和类型变化 --> */
    vioNumATypeTime(recallDate);
    /* <!-- 违法类型数量变化 --> */
    vioNumDTypeTime(recallDate);
    /* <!-- 当月违法小组件 --> */
    vioNumTime(recallDate);
    /* <!-- 交通管理指数 --> */
    trafficIndexTime(recallDate);
    /* <!-- 拥堵指数（仪表盘） --> */
    congressIndexTime(recallDate);
    /* <!-- 今日敏感区域拥堵变化 --> */
    sensitiveTime(recallDate);
    /* <!-- 今日常堵路段top5 --> */
    oftenJamRoad(recallDate);
    /* <!-- 地图警情警力警戒区域 --> */
   // debugger;
    queryMapPSPositionFunc(recallDate);
}

$(function(){
    /*$(".sorbtn").on('click',function(){
      $(".dates").toggle();
      $(".hours").toggle();
    }); */

    $(".sorbtn").toggle(
      function(){
          $(this).css({"background":"url("+contextPathJs+"board/images/close_date.png) 13px 6px / 43% 66% no-repeat"});
          $(".dates").show();
        $(".hours").show();
      },function(){
          $(this).css({"background":"url("+contextPathJs+"board/images/open_date.png) 13px 6px / 43% 66% no-repeat"});
          $(".dates").hide();
          $(".hours").hide();
          window.location.reload();//刷新当前页面
      }
    );

    class_date._init();
    $(".dates li").on('click',function(){
      class_date.indexDay= $(this).index();
      $(this).addClass("active").siblings().removeClass("active");
      $(".hours dd").remove();
      class_date._draw_hour();
    }); 

    $(".hours dt:first-child").on('click',function(){
      if ($(".hours dd.active").index()==1) {
        return false;
      }
      $(".hours dd.active").removeClass("active").prev().addClass("active");
      _hindex = $(".hours dd.active").prev().index();
      class_date.indexhour=$(".hours dd.active").prev().index();
      class_date._returnTime();
    }); 

    $(".hours dt:last-child").on('click',function(){
      if ($(".hours dd.active").index()==24) {
        return false;
      }
      if ($(".hours dd.active").next().hasClass("atlose")) {
        return false;
      }
      $(".hours dd.active").removeClass("active").next().addClass("active");
      _hindex = $(".hours dd.active").next().index()-2;
      class_date.indexhour= $(".hours dd.active").next().index()-2;
      class_date._returnTime();
    }); 

});                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                