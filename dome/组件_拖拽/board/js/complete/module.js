var recallDate = "";
$(function() {
	/* <!-- 中1.当前警情数 小组件 --> */
	currentWINum(recallDate);
	setInterval(function() {
		currentWINum(recallDate);
	}, 1000 * 60 * 5);
});

/* <!-- 中1.当前警情数 小组件 --> */
function currentWINum(recallDate) {
	$.ajax({
		type : "POST",
		url : contextPathJs + "/dataStatistics/queryCurrentWINum.do",
		ansyc : false,
		data : {recallDate:"2017-9-3 2:10:00"},
		//data : {recallDate:"2017-9-3 1:32:00"},
		dataType : "json",
		success : function(data) {
		  $("#currentWINum").empty();
	      var html = "";
	      html += "<div><p>当前警情数</p><p><span>"+data.wiNum+"</span><em>起</em></p></div>";
	      html += "<div>";
	      html += "<ul><li></li>";
	      var dayChain = Math.abs(data.dayChain);
	      html += "<li><span>日环比</span><em>"+dayChain+"</em><i ";
	      if (data.dayChain>0) {
	        html += "class='app-conmain-icon-up'></i></li>";
	      } else if(data.dayChain<0){
	        html += "class='app-conmain-icon-down'></i></li>";
	      } else {
	        html += "class='app-conmain-icon-no'></i></li>";
	      }
	      var weekChain = Math.abs(data.weekChain);
	      html += "<li><span>周环比</span><em>"+weekChain+"</em><i ";
	      if (data.weekChain>0) {
	        html += "class='app-conmain-icon-up'></i></li>";
	      } else if(data.weekChain<0){
	        html += "class='app-conmain-icon-down'></i></li>";
	      } else {
	        html += "class='app-conmain-icon-no'></i></li>";
	      }
	      html += "</ul>";
	      html += "</div>";
	      $("#currentWINum").append(html);
    }
  });
};            




$(function() {
	/* <!-- 中1.当前警力 小组件 --> */
	currentPSNum(recallDate);
	setInterval(function() {
		currentPSNum(recallDate);
	}, 1000 * 60 * 5);
});

function currentPSNum(recallDate) {
	  $.ajax({
	    type : "POST",
	    url : contextPathJs + "/dataStatistics/queryCurrentPSNum.do",
	    ansyc : false,
	    data : {recallDate:"2017-9-3 12:00:00"},
	    dataType : "json",
	    success : function(data) {
	      $("#currentPSNum").empty();
	      var html = "";
	      html += "<div><p>当前警力</p><p><span>"+data.psNum+"</span><em>名</em></p></div>";
	      html += "<div>";
	      html += "<ul><li></li>";
	      var dayChain = Math.abs(data.dayChain);
	      html += "<li><span>日环比</span><em>"+dayChain+"</em><i ";
	      if (data.dayChain>0) {
	        html += "class='app-conmain-icon-up'></i></li>";
	      } else if(data.dayChain<0){
	        html += "class='app-conmain-icon-down'></i></li>";
	      } else {
	        html += "class='app-conmain-icon-no'></i></li>";
	      }
	      var weekChain = Math.abs(data.weekChain);
	      html += "<li><span>周环比</span><em>"+weekChain+"</em><i ";
	      if (data.weekChain>0) {
	        html += "class='app-conmain-icon-up'></i></li>";
	      } else if(data.weekChain<0){
	        html += "class='app-conmain-icon-down'></i></li>";
	      } else {
	         html += "class='app-conmain-icon-no'></i></li>";
	      }
	      html += "</ul>";
	      html += "</div>";
	      $("#currentPSNum").append(html);
	    }
	  });
} 




$(function() {
	/* <!-- 右1.在岗警力 组件 --> */
	areaPsDistributionFunc();
	setInterval(function() {
		areaPsDistributionFunc();
	}, 1000 * 60 * 5);
});

var areaPsDistributionName;
var areaPsDistributionValue;
function areaPsDistributionFunc() {
	$.ajax({
		type : "POST",
		url : contextPathJs + "/dataStatistics/queryareaPsDistribution.do",
	    ansyc : false,
	    data : {recallDate:"2017-9-3 13:00:00"},
	    dataType : "json",
	    success : function(data) {
	      areaPsDistributionName = new Array();
	      areaPsDistributionValue = new Array();
	      var html = "";
	      $(".areaps").empty();
	      $.each(data,function(i,v){
	        var deptName = "";
	        if (v.deptName.length > 4) {
	          var name = v.deptName.substring(0,4);
	          deptName = name + "..";
	        } else {
	          deptName = v.deptName ;
	        }
	        areaPsDistributionName.push(deptName);
	        var str = "{value: "+v.dutyCount+",itemStyle:{ normal:{color:'#3399FE'} }}";
	    	var strJson = eval('(' + str + ')'); 
	    	areaPsDistributionValue.push(strJson);
	      });
	      for (var i = data.length; i >= 0; i--) {
	    	  html += "<div><span>"+Math.abs(data[i].dayChain)+"</span><em "; 
	    	  if (data[i].dayChain>0) {
	    		  html += "class='target_up'></em></div>";
	    	  } else if(data[i].dayChain<0){
	    		  html += "class='target_down'></em></div>";
	    	  } else {
	    		  html += "class='target_no'></em></div>";
	    	  }
	      }
	      $(".areaps").append(html);
	      setAreaPsDistributionOption();
	    }
  });
}

function setAreaPsDistributionOption(){
	var barEchartDiv=document.getElementById('areaPsDistribution');
	  var myChart = echarts.init(barEchartDiv);
	  var option = {
	      tooltip : {  
	              trigger : 'axis',  
	              axisPointer : { // 坐标轴指示器，坐标轴触发有效  
	                  type : 'shadow' // 默认为直线，可选为：'line' | 'shadow'  
	              },
	              //鼠标移入事件
	              formatter: function (params) {  
	                 return params[0].name+":"+params[0].value;  
	          } 
	      },  
	        grid: {
	          top : '1%',
	            left: '1%',
	            right: '15%',
	            bottom: '0%',
	            containLabel: true
	        },
	        xAxis: {
	            type: 'value',
	            boundaryGap:true,
	            axisLabel: { 
	                    show: false,  
	                    textStyle:{
	                        fontSize:10 // 让字体变大
	                    },
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
	                },
	                axisTick:{
	                  inside:true
	                }
	        },
	        yAxis: {
	            type: 'category',
	            boundaryGap:true,
	            axisLine:{  
	                    lineStyle:{  
	                        color:'#1E5FBC',  
	                        width:2  
	                    }  
	                },  
	                axisTick:{
	                  inside:true
	                  
	                },
	                axisLabel:{
	                  show:true,
	                  interval:0
	                },
	            data: areaPsDistributionName
	        },
	        series: [
	            {
	                name: '辖区警力分配',
	                type: 'bar',
	                label: {  
	                    normal: {  
	                        show: true,
	                        //圆柱上显示的数字
	                        formatter: function (params) {  
	                      var res =  params.value;  
	                      return res;  
	                   } ,
	                        position: 'right'    
	                        }  
	                },  
	                barWidth : 10,
	                /*
	                 * 数值为出勤人数/总人数*100  echarts 自己会算百分比
	                 */
	                data: areaPsDistributionValue
	            }
	        ]
	    };
	   myChart.setOption(option);
}  

$(function () {
	/* <!-- 右2.今日辖区警情 TOP5 --> */
	currentAreaWIFunc();
	setInterval(function() {
		currentAreaWIFunc();
	}, 1000 * 60 * 5);
})

var firstData;
var secondData;
var threeData;
var dataRow;
var totalCountArr;
function currentAreaWIFunc() {
	$.ajax({
		type : "POST",
		url : contextPathJs + "/dataStatistics/getCurrentAreaWI.do",
		ansyc : false,
		data : {recallDate:"2017-9-3 1:10:00"},
		dataType : "json",
		success : function(data) {
			  if (data.length == 0) {
				var divshow = $("#currentAreaWI");
                divshow.text("");// 清空数据
                divshow.append("暂无警情"); // 添加Html内容，不能用Text 或 Val
			  } else {
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
		          $.each(data,function(i,v){
		            if (i<data.length-5) {
		              return;
		            }
		            if (parseInt(v.eventCount)!=0) {
		              firstData.push(v.eventCount);
		            } else {
		              firstData.push("");
		              
		            }
		            if (parseInt(v.eventCount2)!=0) {
		              secondData.push(v.eventCount2);
		            } else {
		              secondData.push("");
		            }
		            if (parseInt(v.eventCount3)!=0) {
		              threeData.push(v.eventCount3);
		        } else {
		          threeData.push("");
		        }
		        dataRow.push(v.disposeRegionName);
		        totalCountArr.push(v.totalcount);
		      });
		      setCurrentAreaWIOption();
			}
	    }
  });
}

function setCurrentAreaWIOption(){
   var barEchartDiv=document.getElementById('currentAreaWI');
    var myChart = echarts.init(barEchartDiv);
    var Data =  totalCountArr;
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
               alignWithLabel:false,
               interval : 3,
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
              data:dataRow,
              z: 5,
              axisLine:{
                show:false
              },
              axisTick:{
                show:true,
                interval:2
              },
              axisLabel:{
                show:true,
                textStyle:{
                  color:'#3399FE',
                  align:'right',
                  baseline:'middle',
                  fontSize:8
                },
                formatter: function (value, index) {
                    if ("" == value) {
                return;
              }
                    var a = value + "     " + Data[index];
                    return a;
                }
              }
              
          },
          polar: {
            center : ['50%', '50%'],    // 默认全局居中
              radius : '85%',
          },
          series: [{
              type: 'bar',
              data: firstData,
              coordinateSystem: 'polar',
              barWidth:0,
              borderWidth: 0,
              name: '一级警情',
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
          }, {
              type: 'bar',
              data: secondData,
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
              //data: ['', '', 20,20,20, 20,20],
              data: threeData,
              coordinateSystem: 'polar',
              name: '三级警情',
              barWidth:0,
              borderWidth: 0,
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
          }],
          legend: {
            x:'right',
            y: 'center',
            top:'0%',
            width: 190,
            orient : 'vertical',  
            textStyle:{    //图例文字的样式
                  color:'#1E5FBC',
                  fontSize:14
              },
              itemWidth:15,  //图例标记的图形宽度
              itemHeight:15, //图例标记的图形高度
               show: true,
              data: ['一级警情', '二级警情', '三级警情']
          },
      };
    
     myChart.setOption(option);
} 

$(function () {
	/* <!-- 中3.拥堵点、警情、警力分布 --> */
	JamWIPSFunc();
	setInterval(function() {
		JamWIPSFunc();
	}, 1000 * 60 * 5);
})

var wIData;
var psData;
var jamData;
var timeRowArr;
function JamWIPSFunc() {
	$.ajax({
		type : "POST",
	    url : contextPathJs + "/dataStatistics/getJamWIPSDis.do",
	    ansyc : false,
	    data : {recallDate:"2017-9-3 12:00:00"},
	    dataType : "json",
	    success : function(data) {
		      timeRowArr = new Array();
		      timeRowArr = data.timeRow.split(",");
		      wIData = new Array();
		      wIData = data.warningCount.split(",");
		      psData = new Array();
		      psData = data.dutyCount.split(",");
		      jamData = new Array();
		      jamData = data.jamCount.split(",");
		      setWIPSJamEcharts();
	    }
  });
}

function setWIPSJamEcharts(){
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
	        },
	        legend: {
	          top:'-5%',
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
              left: '1%',
              right: '1%',
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

$(function () {
	/* <!-- 中4.今日重大警情 --> */
	todayFirstWI();
	setInterval(function() {
		todayFirstWI();
	}, 1000 * 60 * 5);
})

function todayFirstWI() {
	$.ajax({
		type : "POST",
		url : contextPathJs + "/dataStatistics/getTodayFirstWI.do",
		ansyc : false,
		data : {recallDate:"2017-9-3 2:00:00"},
		dataType : "json",
		success : function(data) {
			$("#pText").empty();
			var decName = data.split("/");
			if (data == "") {
				var  html = "<li><a  style='color: #ff3333'>暂无</a></li>";
	            $("#pText").append(html);
	        } else {
		        $.each(decName,function(i,v){
		          var  html = '<li><a  style = "color:red;">'+v+'</a></li>';
		          $("#pText").append(html);
		        });
	        }
			jump();
	    }
  });
}

function  jump(){
    var oDiv = document.getElementById('scroll');
    var oUl = oDiv.getElementsByTagName('ul')[0];
    var aLi = oDiv.getElementsByTagName('li');
    var aBtn = oDiv.getElementsByTagName('a');
    var speed = -1;
    var timer = null;
    oUl.innerHTML += oUl.innerHTML;
    oUl.style.width = aLi[0].offsetWidth * aLi.length + 'px';
    timer = setInterval(function(){
      oUl.style.left = oUl.offsetLeft + speed + 'px';
      if(oUl.offsetLeft < - oUl.offsetWidth / 2){
        oUl.style.left = '0';
      }else if(oUl.offsetLeft > 0){
        oUl.style.left = - oUl.offsetWidth / 2 + 'px';
      }
    },60*2);
    aBtn[0].onclick = function(){
      speed = -1;
    };
    aBtn[1].onclick = function(){
      speed = 1;
    };
    oUl.onmouseover = function(){
      clearInterval(timer);
    };
    oUl.onmouseout = function(){
      timer = setInterval(function(){
        oUl.style.left = oUl.offsetLeft + speed + 'px';
        if(oUl.offsetLeft < -oUl.offsetWidth / 2){
          oUl.style.left = '0';
        }else if(oUl.offsetLeft > 0){
          oUl.style.left = - oUl.offsetWidth / 2 + 'px';
        }
      },60*2);
    };
  };   
 
  
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
    setInterval(function() {
    	 getTotalJamNumFunc();
	}, 1000 * 60 * 5);
  });


  function getTotalJamNumFunc() {
    $.ajax({
      type : "POST",
      url : contextPathJs + "/dataStatistics/getTotalJamNum.do",
      ansyc : false,
      data : {recallDate:"2017-9-3 3:00:00"},
      dataType : "json",
      success : function(data) {
        $("#currentAverageCarNum2").empty();
        $("#currentCarNum2").empty();
        $("#currentCarNum").empty();
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
  
  
  function name() {
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
}