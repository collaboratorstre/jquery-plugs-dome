var recallDate="2017-09-16 16:47:00";
/**************************************************************设备专题********************************************/
$(function() {
  equipmentTime(recallDate);
  timer=setInterval("equipmentTime("+recallDate+");",1000*60*5);
 });

function equipmentTime(recallDate){
	var param={'timeParam':recallDate};
  ajaxUtil.interfaceUtil(contextPathJs+'/dataStatisticsY/queryDeviceStatusesByType.do',param,equipStatus);
}

function equipStatus(data){
  var len=5;
  var html="";
  if(data!=null){
    if(data.length<5){
      len=data.length;
    }
    html+="<dt>";
    for(var i=0;i<len;i++){
      html+="<p>"+data[i].name.substring(0,4)+"</p>";
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
      html+="<li><p style='width: "+widthNow+"%';>"+data[i].normalcount+"</p><span>"+data[i].totalcount+"</span></li>";
    }
    html+="</ul></dd>";
  }
  $('.equipStatus').empty();
  $('.equipStatus').append(html);
}

/**************************************************************影响交通因素********************************************/
$(function() {
	  factorTime(recallDate);
	  timer=setInterval("factorTime("+recallDate+");",1000*60*5);
	 });
	function factorTime(recallDate){
		var param={'timeParam':recallDate};
	    ajaxUtil.interfaceUtil(contextPathJs+'/dataStatisticsY/queryTrafficFactors.do',param,trafficElem);
	}

	function trafficElem(data){
		
		var html="",len=5;
		if(data.length<5){
	    len=data.length;
	  }
	  if(data!=null){
	    for(var i=0;i<data.length;i++){
	      html+='<li>'+data[i]+'</li>';
	    }
	  }
	  $('.trafficElem').empty();
	  $('.trafficElem').append(html);
	}
/**************************************************************违法数量和类型变化********************************************/
$(function() {
	  vioNumATypeTime(recallDate);
	  timer=setInterval("vioNumATypeTime("+recallDate+");",1000*60*5);
 });

function vioNumATypeTime(recallDate){
	var param={'timeParam':recallDate};
  ajaxUtil.interfaceUtil(contextPathJs+'/dataStatisticsY/queryViolationRadia.do',param,vioRadia);
}

function vioRadia(data){
	
  if(data!=null){
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
    if(x!=null){
    	test05(x,seriesArr1);
    	var html="(单位：起)";
    	$('.vioSumNum').empty();
    	$('.vioSumNum').append(html);
    }
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
                    splitArea : {
                        show : true,   
                        areaStyle : {
                            color: ["rgba(227, 232, 252, 0.15)"]  // 图表背景网格的颜色
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
                          color: '#006DC7'
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
/**************************************************************违法类型数量变化********************************************/	
$(function() {
	  vioNumDTypeTime(recallDate);
	  timer=setInterval("vioNumDTypeTime("+recallDate+");",1000*60*5);
 });

function vioNumDTypeTime(recallDate){
	var param={'timeParam':recallDate};
     ajaxUtil.interfaceUtil(contextPathJs+'/dataStatisticsY/queryViolationStatisticsByType.do',param,vioTypeNumChange);  
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
                   data : xAxisData,
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
                                      data:seriesData1,
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
                                      data:seriesData2,
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
//			    使用刚指定的配置项和数据显示图表。
    var clazz=document.getElementById('test03');
    var myChart = echarts.init(clazz);
    myChart.setOption(option);
  }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
/**************************************************************当月违法小组件********************************************/
$(function() {
	  vioNumTime(recallDate);
	  timer=setInterval("vioNumTime("+recallDate+");",1000*60*5);
 });

function vioNumTime(recallDate){
	var param={'timeParam':recallDate};
  ajaxUtil.interfaceUtil(contextPathJs+'/dataStatisticsY/queryVioStatusByDay.do',param,vioIndex);
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
/**************************************************************交通管理指数********************************************/
$(function() {
	  trafficIndexTime(recallDate);
	  timer=setInterval("trafficIndexTime("+recallDate+");",1000*60*5);
	 });

	function trafficIndexTime(recallDate){
		var param={'timeParam':recallDate};
	  ajaxUtil.interfaceUtil(contextPathJs+'/dataStatisticsY/queryCurrentTrafficNum.do',param,currentTrafficNum);
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
/**************************************************************拥堵指数（仪表盘）********************************************/
$(function() {
	  congressIndexTime(recallDate);
	  timer=setInterval("congressIndexTime("+recallDate+");",1000*60*5);
 });

function congressIndexTime(recallDate){
	var param={'timeParam':recallDate};
  ajaxUtil.interfaceUtil(contextPathJs+'/dataStatisticsY/queryCityJamInfos.do',param,PointerTable);
}

function PointerTable(data){
  if(data!=null){
	$("#test11").empty();
	if(data.seriesData1!=""){
    	 var json = eval('(' + data.seriesData1 + ')'); 
    	 var seriesArr=[json];
    	 test11(seriesArr);
    }else{
    	$("#test11").html("没有数据");
    }
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
                 data:series1
                },

                ] 
  }; 

  myChart.setOption(option);
}  
/**************************************************************今日敏感区域拥堵变化********************************************/
$(function() {
	  sensitiveTime(recallDate);
	  timer=setInterval("sensitiveTime("+recallDate+");",1000*60*5);
 });

function sensitiveTime(recallDate){
	var param={'timeParam':recallDate};
     ajaxUtil.interfaceUtil(contextPathJs+'/dataStatisticsY/querySensitiveRoad.do',param,sensitiveRoadByDay);
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
      if(dayStr[i]==""){
    	  continue;
      }
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
/**************************************************************今日常堵路段top5********************************************/
$(function() {
	  importRoadTime(recallDate);
	  timer=setInterval("importRoadTime("+recallDate+");",1000*60*5);
 });

function importRoadTime(recallDate){
	var param={'timeParam':recallDate};
    ajaxUtil.interfaceUtil(contextPathJs+'/dataStatisticsY/queryJamRoadRanksByDay.do',param,jamRoadByDay);
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
/**********************************************************常堵路段（新版）*************************************************************************/
$(function() {
	  oftenJamRoad(recallDate);
	  timer=setInterval("oftenJamRoad("+recallDate+");",1000*60*5);
});

function oftenJamRoad(recallDate){
	var param={'timeParam':recallDate};
ajaxUtil.interfaceUtil(contextPathJs+'/dataStatisticsY/queryJamRoadRanksByDayNew.do',param,jamRoadByDayNew);
}

function jamRoadByDayNew(data){
  if(data.xAxisData!=""){
  $("#nooftenJamRoadDiv").css("display","none");
  $("#oftenJamRoadDiv").css("display","block");
  var seriesArr1=data.seriesData1.split(','); //今日，昨日，上周
  var xAxisDataArr=data.xAxisData.split(','); //x坐标
  var dataArr=new Array();
  var xDataArr=new Array();
  var valueData = "";
  var flag01=["0","3","6","9","12"];
  var flag02=["1","4","7","10","13"];
  var flag03=["2","5","8","11","14"];
  var roadName=new Array();
  $.each(xAxisDataArr,function(i,v){
    if(v=="''"){
      xDataArr.push("");
    }else{
      xDataArr.push(v);
      roadName.push(v+"_");
    }
  });
  var count=0;
  $.each(seriesArr1,function(i,v){
    //取道路名称
    var roadNameStr="";
    if(flag01.indexOf(i+"")!=-1 && i<(roadName.length*3)){
      roadNameStr=roadName[count];
      count++;
    }
    
    if(flag01.indexOf(i+"")!=-1){
      valueData = "{name:'"+roadNameStr+"今日',value:"+v+"}";
      var jaon = eval('('+valueData+')');
      dataArr.push(jaon);
    }else if(flag02.indexOf(i+"")!=-1){
      valueData = "{name:'"+roadNameStr+"昨日',value:"+v+"}";
      var jaon = eval('('+valueData+')');
      dataArr.push(jaon);
    }else if(flag03.indexOf(i+"")!=-1){
      valueData = "{name:'"+roadNameStr+"上周',value:"+v+"}";
      var jaon = eval('('+valueData+')');
      dataArr.push(jaon);
    }
  });
  oftenJamRoadBar(xDataArr,dataArr);
}else{
  $("#oftenJamRoadDiv").css("display","none");
  $("#nooftenJamRoadDiv").css("display","block");
  var divshow = $("#nooftenJamRoadDiv");
  divshow.text("");// 清空数据
  divshow.append('<div style="display: table;width: 100%;height: 100%;"><p style="display: table-cell;vertical-align: middle;text-align: center;">暂无数据</p></div>'); // 添加Html内容，不能用Text 或 Val
}
}

function oftenJamRoadBar(xAxisDataArr,dataJson){
var option2 = {
tooltip : {
  trigger : 'item',
  formatter : function(params) {
	  var name=params.name;
	  if(params.value==0){
		  return;
	  }else if(params.value!=0 && name.indexOf("_")==-1){
		  name=name+"_"+"昨日";
	  }
      return name+"<br />拥堵时长："+params.value+" 分钟";
  }
},
angleAxis: {
    type: 'category',
    data: xAxisDataArr,
    z: 10,
    axisLabel:{
      textStyle:{
        color:"#0099FE", //刻度颜色
        fontSize:12  //刻度大小
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
    data: dataJson,
    coordinateSystem: 'polar',
    name: 'A',
    stack: 'a',
    itemStyle: {
            normal: {
                color: function(params) {
                    var colorList = [
                      '#C1232B','#C1232B','#C1232B','#E87C25','#E87C25',
                       '#E87C25','#9BCA63','#9BCA63','#9BCA63','#60C0DD',
                       '#60C0DD','#60C0DD','#F4E001','#F4E001','#F4E001'
                    ];
                    return colorList[params.dataIndex]
                }
            }
}}]
};
//使用刚指定的配置项和数据显示图表。
var clazz=document.getElementById('oftenJamRoadDiv');
var myChart = echarts.init(clazz);
myChart.setOption(option2);
}                                                                                                                                                                                                                                                                                                                                                    