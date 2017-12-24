<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%><%@ page
	import="com.ehl.frame.util.ParamManage"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
	String boardId = request.getParameter("boardId");
%><!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<base href="<%=basePath%>">
<title>综合看板</title>
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<link href="<%=basePath%>/board/css/main.css" rel="stylesheet">
<script src="<%=basePath%>/themes/default/js/jquery.min.js"></script>
<script src="<%=basePath%>/board/js/util/ajaxUtil.js"></script>
<script src="<%=basePath%>/show/echars/echarts.js"></script>
<script src="<%=basePath%>/show/echars/esl.js"></script>
<script type="text/javascript">var contextPathJs = "<%=basePath%>";var boardId = "<%=boardId%>";</script>
</head>
<body>
	<div class="app" id="app">
		<div class="app-container" data-reactroot=""
			style="width: 1920; height: 1080">
			<div class="app-background">
				<canvas></canvas>
			</div>
			<div style="position: relative;">
				<div class="app-map-overlays" id="show"></div>
				<div title="" class="app-block react-draggable"
					style="left: 20; top: 20; width: 465; height: 252; color: #021068; position: absolute; transform: translate(0px, 0px); touch-action: none;">
					<div class="app-panel app-full-box">
						<div class="app-panel-border">
							<div
								class="app-panel-corner corner-horizontal corner-left corner-top"></div>
							<div
								class="app-panel-corner corner-horizontal corner-right corner-top"></div>
							<div
								class="app-panel-corner corner-horizontal corner-right corner-bottom"></div>
							<div
								class="app-panel-corner corner-horizontal corner-left corner-bottom"></div>
							<div
								class="app-panel-corner corner-vertical corner-left corner-top"></div>
							<div
								class="app-panel-corner corner-vertical corner-right corner-top"></div>
							<div
								class="app-panel-corner corner-vertical corner-right corner-bottom"></div>
							<div
								class="app-panel-corner corner-vertical corner-left corner-bottom"></div>
						</div>
						<div class="app-chart" style="background: none;">
							<div class="app-area-box">
								<div class="app-title-box">
									<i></i><span>敏感道路</span><b>TOP5</b>
								</div>
								<div id="test01" style="width: 100%; height: 70%;"></div>
								<div class="jampslist" style="width: 100%; height: 20%;">
								</div>
							</div>
							<!-- 整个div -->
						</div>
					</div>
				</div>
				<script type='text/javascript'>width = $(".app-block:eq(0)").width();height = $(".app-block:eq(0)").height();$(".app-chart:eq(0) div:eq(0)").css("width", parseInt(width));$(".app-chart:eq(0) div:eq(0)").css("height", parseInt(height));</script>
				<script type='text/javascript'> var recallDate='2017-09-07 15:00:00'</script>
				<script type='text/javascript'>$(function() {
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
  }                                                                                                                                                                                                      </script>
				<div title="" class="app-block react-draggable"
					style="left: 20; top: 282; width: 465; height: 252; color: #021068; position: absolute; transform: translate(0px, 0px); touch-action: none;">
					<div class="app-panel app-full-box">
						<div class="app-panel-border">
							<div
								class="app-panel-corner corner-horizontal corner-left corner-top"></div>
							<div
								class="app-panel-corner corner-horizontal corner-right corner-top"></div>
							<div
								class="app-panel-corner corner-horizontal corner-right corner-bottom"></div>
							<div
								class="app-panel-corner corner-horizontal corner-left corner-bottom"></div>
							<div
								class="app-panel-corner corner-vertical corner-left corner-top"></div>
							<div
								class="app-panel-corner corner-vertical corner-right corner-top"></div>
							<div
								class="app-panel-corner corner-vertical corner-right corner-bottom"></div>
							<div
								class="app-panel-corner corner-vertical corner-left corner-bottom"></div>
						</div>
						<div class="app-chart" style="background: none;">
							<div class="app-area-box">
								<div class="app-title-box">
									<i></i><span>常堵路段</span><b>TOP5</b>
								</div>

								<div id="test02"
									style="width: 100%; height: 90%; margin-top: -15px; margin-left: -50px;"></div>
							</div>
							<!-- 整个div -->
						</div>
					</div>
				</div>
				<script type='text/javascript'>width = $(".app-block:eq(1)").width();height = $(".app-block:eq(1)").height();$(".app-chart:eq(1) div:eq(0)").css("width", parseInt(width));$(".app-chart:eq(1) div:eq(0)").css("height", parseInt(height));</script>
				<script type='text/javascript'> var recallDate='2017-09-07 15:00:00'</script>
				<script type='text/javascript'>$(function() {
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
  }                                                                                                                                                                                     </script>
				<div title="" class="app-block react-draggable"
					style="left: 20; top: 545; width: 465; height: 252; color: #021068; position: absolute; transform: translate(0px, 0px); touch-action: none;">
					<div class="app-panel app-full-box">
						<div class="app-panel-border">
							<div
								class="app-panel-corner corner-horizontal corner-left corner-top"></div>
							<div
								class="app-panel-corner corner-horizontal corner-right corner-top"></div>
							<div
								class="app-panel-corner corner-horizontal corner-right corner-bottom"></div>
							<div
								class="app-panel-corner corner-horizontal corner-left corner-bottom"></div>
							<div
								class="app-panel-corner corner-vertical corner-left corner-top"></div>
							<div
								class="app-panel-corner corner-vertical corner-right corner-top"></div>
							<div
								class="app-panel-corner corner-vertical corner-right corner-bottom"></div>
							<div
								class="app-panel-corner corner-vertical corner-left corner-bottom"></div>
						</div>
						<div class="app-chart" style="background: none;">
							<div class="app-area-box">
								<div class="app-title-box">
									<i></i><span>今日影响交通的因素</span>
								</div>
								<div class="app-panel-area-table-container" id="case">
									<div class="app-list">
										<ul class="app-ul-list trafficElem">
										</ul>
									</div>
								</div>
							</div>
							<!-- 整个div -->
						</div>
					</div>
				</div>
				<script type='text/javascript'>width = $(".app-block:eq(2)").width();height = $(".app-block:eq(2)").height();$(".app-chart:eq(2) div:eq(0)").css("width", parseInt(width));$(".app-chart:eq(2) div:eq(0)").css("height", parseInt(height));</script>
				<script type='text/javascript'> var recallDate='2017-09-07 15:00:00'</script>
				<script type='text/javascript'>$(function() {
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
  }</script>
				<div title="" class="app-block react-draggable"
					style="left: 20; top: 807; width: 465; height: 252; color: #021068; position: absolute; transform: translate(0px, 0px); touch-action: none;">
					<div class="app-panel app-full-box">
						<div class="app-panel-border">
							<div
								class="app-panel-corner corner-horizontal corner-left corner-top"></div>
							<div
								class="app-panel-corner corner-horizontal corner-right corner-top"></div>
							<div
								class="app-panel-corner corner-horizontal corner-right corner-bottom"></div>
							<div
								class="app-panel-corner corner-horizontal corner-left corner-bottom"></div>
							<div
								class="app-panel-corner corner-vertical corner-left corner-top"></div>
							<div
								class="app-panel-corner corner-vertical corner-right corner-top"></div>
							<div
								class="app-panel-corner corner-vertical corner-right corner-bottom"></div>
							<div
								class="app-panel-corner corner-vertical corner-left corner-bottom"></div>
						</div>
						<div class="app-chart" style="background: none;">
							<div class="app-area-box">
								<div class="app-title-box">
									<i></i><span>设备专题</span>
								</div>
								<div id="test22" class="test22">
									<div>
										<p>
											<span></span><span>在线服务设备总量</span>
										</p>
										<p>
											<span></span><span>设备总量</span>
										</p>
									</div>
									<dl class="equipStatus">
									</dl>
								</div>
							</div>
							<!-- 整个div -->
						</div>
					</div>
				</div>
				<script type='text/javascript'>width = $(".app-block:eq(3)").width();height = $(".app-block:eq(3)").height();$(".app-chart:eq(3) div:eq(0)").css("width", parseInt(width));$(".app-chart:eq(3) div:eq(0)").css("height", parseInt(height));</script>
				<script type='text/javascript'> var recallDate='2017-09-07 15:00:00'</script>
				<script type='text/javascript'>$(function() {
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
}</script>
				<div class="app-block"
					style="touch-action: none; position: absolute; color: ' #021068 '; left:495px; top:20px; width: 225; height: 76; transform: translate(0px, 0px);">
					<div class="app-panel app-panel-uite">
						<div class="app-conmain">
							<div class="app-conmain-box">
								<div>
									<div class="app-conmain-border">
										<div class="conmain-border-corner-1"></div>
										<div class="conmain-border-corner-2"></div>
										<div class="conmain-border-corner-3"></div>
										<div class="conmain-border-corner-4"></div>
									</div>
									<div class="app-conmain-box"
										style="width: 100%; height: 100%; background: #06102f;">
										<div>
											<div class="app-conmain-con xxxxx">
												<div class="app-conmain-in-box" id="currentTrafficNum">
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<script type='text/javascript'>width = $(".app-block:eq(4)").width();height = $(".app-block:eq(4)").height();$(".app-chart:eq(4) div:eq(0)").css("width", parseInt(width));$(".app-chart:eq(4) div:eq(0)").css("height", parseInt(height));</script>
				<script type='text/javascript'> var recallDate='2017-09-07 15:00:00'</script>
				<script type='text/javascript'>$(function() {
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
}                          </script>
				<div class="app-block"
					style="touch-action: none; position: absolute; color: ' #021068 '; left: 730px; top:20px; width: 225; height: 76; transform: translate(0px, 0px);">
					<div class="app-panel app-panel-uite">
						<div class="app-conmain">
							<div class="app-conmain-box">
								<div>
									<div class="app-conmain-border">
										<div class="conmain-border-corner-1"></div>
										<div class="conmain-border-corner-2"></div>
										<div class="conmain-border-corner-3"></div>
										<div class="conmain-border-corner-4"></div>
									</div>
									<div class="app-conmain-box"
										style="width: 100%; height: 100%; background: #06102f;">
										<div>
											<div class="app-conmain-con xxxxx">
												<div class="app-conmain-in-box" id="currentWINum"></div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<script type='text/javascript'>width = $(".app-block:eq(5)").width();height = $(".app-block:eq(5)").height();$(".app-chart:eq(5) div:eq(0)").css("width", parseInt(width));$(".app-chart:eq(5) div:eq(0)").css("height", parseInt(height));</script>
				<script type='text/javascript'> var recallDate='2017-09-07 15:00:00'</script>
				<script type='text/javascript'>
$(function() {
	/* <!-- 中1.当前警情数 小组件 --> */
	currentWINum(recallDate);
  timer = setInterval(function() {
	currentWINum(recallDate);
	}, 1000 * 60 * 5);
});

/* <!-- 中1.当前警情数 小组件 --> */
function currentWINum(recallDate) {
	$.ajax({
		type : "POST",
		url : contextPathJs + "/dataStatistics/queryCurrentWINum.do",
    ansyc : false,
    data : {recallDate:recallDate},
    //data : {recallDate:"2017-9-3 1:32:00"},
    dataType : "json",
    success : function(data) {
      $("#currentWINum").empty();
        var html = "";
        html += "<div><p>当前警情数</p><p><span>"+data.wiNum+"</span><em>起</em></p></div>";
        html += "<div>";
        html += "<ul><li></li>";
        var dayChain = Math.abs(data.dayChain);
        html += "<li><span>日环比</span><em>"+dayChain+"</em><i> ";
        if (data.dayChain>0) {
          html += "class='app-conmain-icon-up'></i></li>";
        } else if(data.dayChain<0){
          html += "class='app-conmain-icon-down'></i></li>";
        } else {
          html += "class='app-conmain-icon-no'></i></li>";
        }
        var weekChain = Math.abs(data.weekChain);
        html += "<li><span>周环比</span><em>"+weekChain+"</em><i> ";
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
};                                                                                                                               </script>
				<div class="app-block"
					style="touch-action: none; position: absolute; color: ' #021068 '; left: 965; top: 20; width: 225; height: 76; transform: translate(0px, 0px);">
					<div class="app-panel app-panel-uite">
						<div class="app-conmain">
							<div class="app-conmain-box">
								<div>
									<div class="app-conmain-border">
										<div class="conmain-border-corner-1"></div>
										<div class="conmain-border-corner-2"></div>
										<div class="conmain-border-corner-3"></div>
										<div class="conmain-border-corner-4"></div>
									</div>
									<div class="app-conmain-box">
										<div>
											<div class="app-conmain-con xxxxx">
												<div class="app-conmain-in-box vioIndex"></div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<script type='text/javascript'>width = $(".app-block:eq(6)").width();height = $(".app-block:eq(6)").height();$(".app-chart:eq(6) div:eq(0)").css("width", parseInt(width));$(".app-chart:eq(6) div:eq(0)").css("height", parseInt(height));</script>
				<script type='text/javascript'> var recallDate='2017-09-07 15:00:00'</script>
				<script type='text/javascript'>$(function() {
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
}                   </script>
				<div class="app-block"
					style="touch-action: none; position: absolute; color: ' #021068 '; left: 1200; top: 20; width: 225; height: 76; transform: translate(0px, 0px);">
					<div class="app-panel app-panel-uite">
						<div class="app-conmain">
							<div class="app-conmain-box">
								<div>
									<div class="app-conmain-border">
										<div class="conmain-border-corner-1"></div>
										<div class="conmain-border-corner-2"></div>
										<div class="conmain-border-corner-3"></div>
										<div class="conmain-border-corner-4"></div>
									</div>
									<div class="app-conmain-box"
										style="width: 100%; height: 100%; background: #06102f;">
										<div>
											<div class="app-conmain-con xxxxx">
												<div class="app-conmain-in-box" id="currentPSNum"></div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<script type='text/javascript'>width = $(".app-block:eq(7)").width();height = $(".app-block:eq(7)").height();$(".app-chart:eq(7) div:eq(0)").css("width", parseInt(width));$(".app-chart:eq(7) div:eq(0)").css("height", parseInt(height));</script>
				<script type='text/javascript'> var recallDate='2017-09-07 15:00:00'</script>
				<script type='text/javascript'>$(function() {
	/* <!-- 中1.当前警力 小组件 --> */
	currentPSNum(recallDate);
	timer = setInterval(function() {
		currentPSNum(recallDate);
	}, 1000 * 60 * 5);
});

function currentPSNum(recallDate) {
    $.ajax({
      type : "POST",
      url : contextPathJs + "/dataStatistics/queryCurrentPSNum.do",
      ansyc : false,
      data : {recallDate:recallDate},
      //data : {recallDate:"2017-9-3 12:00:00"},
      dataType : "json",
      success : function(data) {
        $("#currentPSNum").empty();
        var html = "";
        html += "<div><p>当前警力</p><p><span>"+data.psNum+"</span><em>名</em></p></div>";
        html += "<div>";
        html += "<ul><li></li>";
        var dayChain = Math.abs(data.dayChain);
        html += "<li><span>日环比</span><em>"+dayChain+"</em><i> ";
        if (data.dayChain>0) {
          html += "class='app-conmain-icon-up'></i></li>";
        } else if(data.dayChain<0){
          html += "class='app-conmain-icon-down'></i></li>";
        } else {
          html += "class='app-conmain-icon-no'></i></li>";
        }
        var weekChain = Math.abs(data.weekChain);
        html += "<li><span>周环比</span><em>"+weekChain+"</em><i> ";
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
}                                                                             </script>
				<div title="" class="app-block react-draggable"
					style="left: 495; top: 106; width: 930; height: 690; color: #021068; position: absolute; transform: translate(0px, 0px); touch-action: none;">
					<div class="app-panel app-full-box">
						<div class="app-panel-border">
							<div
								class="app-panel-corner corner-horizontal corner-left corner-top"></div>
							<div
								class="app-panel-corner corner-horizontal corner-right corner-top"></div>
							<div
								class="app-panel-corner corner-horizontal corner-right corner-bottom"></div>
							<div
								class="app-panel-corner corner-horizontal corner-left corner-bottom"></div>
							<div
								class="app-panel-corner corner-vertical corner-left corner-top"></div>
							<div
								class="app-panel-corner corner-vertical corner-right corner-top"></div>
							<div
								class="app-panel-corner corner-vertical corner-right corner-bottom"></div>
							<div
								class="app-panel-corner corner-vertical corner-left corner-bottom"></div>
						</div>
						<div class="app-chart" style="background: none;">
							<div style="width: 100%; height: 100%;">

								<div id="map" style="height: 92%; width: 100%;"></div>
								<div class="mapinfo mapinfo-line"
									style="height: 58px; width: 100%; position: absolute; left: 0px; bottom: 4px;">
									<ul>
										<li><div>
												<p>今日机动车总量(万辆)</p>
												<span>182.4</span><em></em>
											</div></li>
										<li><div>
												<p id="currentCarNum2"></p>
												<span id="currentCarNum"></span><em></em>
											</div></li>
										<li><div>
												<p id=currentAverageCarNum3></p>
												<span id="currentAverageCarNum2"></span><em></em>
											</div></li>
									</ul>
								</div>
							</div>
							<!-- 整个div -->
						</div>
					</div>
				</div>
				<script type='text/javascript'>width = $(".app-block:eq(8)").width();height = $(".app-block:eq(8)").height();$(".app-chart:eq(8) div:eq(0)").css("width", parseInt(width));$(".app-chart:eq(8) div:eq(0)").css("height", parseInt(height));</script>
				<script type='text/javascript'> var recallDate='2017-09-07 15:00:00'</script>
				<script type='text/javascript'> var road_datas = [];
var shapedatas = [];

$(function () {
  queryMapPSPositionFunc(recallDate);
})

var PSArr;
var WIArr;
function queryMapPSPositionFunc(recallDate) {
  $.ajax({
      type : "POST",
      url : contextPathJs + "/dataStatistics/queryMapPSPosition.do",
      ansyc : false,
      data : {recallDate:recallDate},
      dataType : "json",
      success : function(data) {
        PSArr = new Array();
        var valuePS = "";
        $.each(data,function(i,v){
          valuePS = "{'name':'警力','value':["+v.longitude+","+v.latitude+",1]}";
          var jaon = eval('('+valuePS+')');
        PSArr.push(jaon);
        });
        queryMapWIPositionFunc(recallDate);
      }
    });
}
function queryMapWIPositionFunc(recallDate) {
  $.ajax({
    type : "POST",
    url : contextPathJs + "/dataStatistics/queryMapWIPosition.do",
    ansyc : false,
    data : {recallDate:recallDate},
    dataType : "json",
    success : function(data) {
      WIArr = new Array();
      var valueWI = "";
      $.each(data,function(i,v){
        valueWI = "{'name':'警情','value':["+v.longitude+","+v.latitude+",2]}";
         var jaon = eval('('+valueWI+')');
         WIArr.push(jaon);
      });
       setMap();
    }
  });
}

/** 拥堵点位置点信息* */
var getGISJamData = function() {
  return eval('[{"name":"拥堵点","value":[116.982470,36.639298,3]},{"name":"拥堵点","value":[ 117.166927,36.642385,3]},{"name":"拥堵点","value":[117.068154,36.645799,3]},{"name":"拥堵点","value":[116.964639,36.646490,3]},{"name":"拥堵点","value":[117.007174,36.791248,3]},{"name":"拥堵点","value":[116.982470,36.639298,3]},{"name":"拥堵点","value":[117.093613,36.715588,3]},{"name":"拥堵点","value":[116.91389,36.65138,3]},{"name":"拥堵点","value":[116.92804,36.66057,3]},{"name":"拥堵点","value":[116.91884,36.69168,3]},{"name":"拥堵点","value":[116.90824,36.68036,3]},{"name":"拥堵点","value":[116.93298,36.68107,3]},{"name":"拥堵点","value":[116.93192,36.67082,3]},{"name":"拥堵点","value":[116.97117,36.70511,3]},{"name":"拥堵点","value":[116.91814,36.67471,3]},{"name":"拥堵点","value":[116.92697,36.65385,3]},{"name":"拥堵点","value":[116.92485,36.65774,3]},{"name":"拥堵点","value":[116.92662,36.66127,3]},{"name":"拥堵点","value":[116.93122,36.66516,3]},{"name":"拥堵点","value":[116.98725,36.65052,3]},{"name":"拥堵点","value":[116.98814,36.64857,3]},{"name":"拥堵点","value":[116.99397,36.64963,3]},{"name":"拥堵点","value":[116.99132,36.64946,3]},{"name":"拥堵点","value":[116.9432,36.65096,3]},{"name":"拥堵点","value":[116.99114,36.64486,3]},{"name":"拥堵点","value":[116.98743,36.64098,3]}]');
  //return eval('[]');
};
/** 重点关注信息* */
var getGISFocusAreaData = function() {
  return eval('[{"name":"重点关注","value":[116.984, 36.658, 3]}]');
  //return eval('[]');
};
/** 警戒区域位置点信息* */
var getGISWarningAreaData = function() {
  return eval('[[116.977, 36.648, 191],[116.980, 36.648,300],[116.984, 36.648,630],[116.987, 36.648,530], [116.989, 36.648,430], [116.994, 36.648,330], [116.921, 36.652, 621],[116.924, 36.655,600],[116.927, 36.659,730],[116.925, 36.663,730]]');
  //return eval('[]');
};
/** 境界区域提示气泡信息* */
var getWarningAreaDataTip = function() {
  var leftTopTip = '{"name":"拥堵点:8","value":[116.57,36.83,3]},{"name":"警情:4","value":[116.57,36.81,2]},{"name":"警力:6","value":[116.57,36.79,1]}';
  var rightBottomTip = '{"name":"拥堵点:7","value":[117.50,36.48,3]},{"name":"警情:10","value":[117.50,36.46,2]},{"name":"警力:10","value":[117.50,36.44,1]}';
  return eval("[" + leftTopTip + "," + rightBottomTip + "]");
  //return eval('[]');
};

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
        data : getGISJamData(),
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
    for (var i = 0; i < 7; i++) {
        this.dateTemp = (this._weekDay[myDate.getDay()]);
        this.dateArray.push(this.dateTemp);
        myDate.setDate(myDate.getDate() + this.flag);
        this._reTimeArr.push( myDate.getFullYear() +"-"+ (myDate.getMonth()+1) +"-"+ (myDate.getDate()-1) +" "+ myDate.getHours() +":"+ myDate.getMinutes() +":"+ myDate.getSeconds());
    }
    this._draw_day();
    this._draw_hour();
    },

    _returnTime:function(){
       myDate = new Date(); //获取今天日期
      debugger; 
      var atdateTemp = myDate.getFullYear() +"-"+ (myDate.getMonth()+1) +"-"+ (class_date.indexDay+5) +" "+ (class_date.indexhour) +":"+ myDate.getMinutes() +":"+ myDate.getSeconds();
     // alert(atdateTemp);
      
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
    importRoadTime(recallDate);
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

});                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             </script>
				<div title="" class="app-block react-draggable"
					style="left: 495; top: 807; width: 930; height: 202; color: #021068; position: absolute; transform: translate(0px, 0px); touch-action: none;">
					<div class="app-panel app-full-box">
						<div class="app-panel-border">
							<div
								class="app-panel-corner corner-horizontal corner-left corner-top"></div>
							<div
								class="app-panel-corner corner-horizontal corner-right corner-top"></div>
							<div
								class="app-panel-corner corner-horizontal corner-right corner-bottom"></div>
							<div
								class="app-panel-corner corner-horizontal corner-left corner-bottom"></div>
							<div
								class="app-panel-corner corner-vertical corner-left corner-top"></div>
							<div
								class="app-panel-corner corner-vertical corner-right corner-top"></div>
							<div
								class="app-panel-corner corner-vertical corner-right corner-bottom"></div>
							<div
								class="app-panel-corner corner-vertical corner-left corner-bottom"></div>
						</div>
						<div class="app-chart" style="background: none;">
							<div class="app-area-box">
								<div class="app-title-box">
									<i></i><span>拥堵点、警情、警力分布</span>
								</div>
								<div
									style="width: 95%; height: 80%; margin-left: 10px; color: #1E5FBC; float: left;"
									id="areaJam"></div>
								<!-- 辖区拥堵、警情、警力分步echarts图表div -->
							</div>
							<!-- 整个div -->
						</div>
					</div>
				</div>
				<script type='text/javascript'>width = $(".app-block:eq(9)").width();height = $(".app-block:eq(9)").height();$(".app-chart:eq(9) div:eq(0)").css("width", parseInt(width));$(".app-chart:eq(9) div:eq(0)").css("height", parseInt(height));</script>
				<script type='text/javascript'> var recallDate='2017-09-07 15:00:00'</script>
				<script type='text/javascript'>$(function () {
	/* <!-- 中3.拥堵点、警情、警力分布 --> */
	JamWIPSFunc(recallDate);
	timer = setInterval(function() {
		JamWIPSFunc(recallDate);
	}, 1000 * 60 * 5);
})

var wIData;
var psData;
var jamData;
var timeRowArr;
function JamWIPSFunc(recallDate) {
	$.ajax({
		type : "POST",
      url : contextPathJs + "/dataStatistics/getJamWIPSDis.do",
      ansyc : false,
      data : {recallDate:recallDate},
      //data : {recallDate:"2017-9-3 12:00:00"},
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
}                                                                                                                                                                                                                                                                                                                                 </script>
				<div title="" class="app-block react-draggable"
					style="left: 1225; top: 610; width: 190; height: 115; position: absolute; transform: translate(0px, 0px); touch-action: none;">
					<div class="app-chart" style="background: none;">
						<div class="app-area-box" style="z-index: 9999999">
							<div class="app-title-box box-point"></div>
							<div id="test11"
								style="width: 100%; height: 100%; background: #021068;"></div>
							<div id="dashBoard">
								<span></span><span>1.5</span><span>1.8</span><span>2.2</span><span></span>
								<em></em><em></em><em></em><em></em><em></em>
							</div>
						</div>
						<!-- 整个div -->
					</div>
				</div>
				<script type='text/javascript'>width = $(".app-block:eq(10)").width();height = $(".app-block:eq(10)").height();$(".app-chart:eq(10) div:eq(0)").css("width", parseInt(width));$(".app-chart:eq(10) div:eq(0)").css("height", parseInt(height));</script>
				<script type='text/javascript'> var recallDate='2017-09-07 15:00:00'</script>
				<script type='text/javascript'>$(function() {
	  congressIndexTime(recallDate);
	  timer=setInterval("congressIndexTime("+recallDate+");",1000*60*5);
 });

function congressIndexTime(recallDate){
	var param={'timeParam':recallDate};
  ajaxUtil.interfaceUtil(contextPathJs+'/dataStatisticsY/queryCityJamInfos.do',param,PointerTable);
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
                 data:series1
                },

                ] 
  }; 

  myChart.setOption(option);
}                                                </script>
				<div title="" class="app-block react-draggable"
					style="left: 495; top: 1019; width: 930; height: 40; color: #021068; position: absolute; transform: translate(0px, 0px); touch-action: none;">
					<div class="app-panel app-full-box">
						<div class="app-panel-border">
							<div
								class="app-panel-corner corner-horizontal corner-left corner-top"></div>
							<div
								class="app-panel-corner corner-horizontal corner-right corner-top"></div>
							<div
								class="app-panel-corner corner-horizontal corner-right corner-bottom"></div>
							<div
								class="app-panel-corner corner-horizontal corner-left corner-bottom"></div>
							<div
								class="app-panel-corner corner-vertical corner-left corner-top"></div>
							<div
								class="app-panel-corner corner-vertical corner-right corner-top"></div>
							<div
								class="app-panel-corner corner-vertical corner-right corner-bottom"></div>
							<div
								class="app-panel-corner corner-vertical corner-left corner-bottom"></div>
						</div>
						<div class="app-chart" style="background: none;">
							<div class="app-panel-title">
								<span class="app-panel-title-icon">今日重大警情 :</span>
								<p class="app-panel-title-list-con" id="pText"></p>
							</div>
						</div>
					</div>
				</div>
				<script type='text/javascript'>width = $(".app-block:eq(11)").width();height = $(".app-block:eq(11)").height();$(".app-chart:eq(11) div:eq(0)").css("width", parseInt(width));$(".app-chart:eq(11) div:eq(0)").css("height", parseInt(height));</script>
				<script type='text/javascript'> var recallDate='2017-09-07 15:00:00'</script>
				<script type='text/javascript'>/*
 * 今日重大警情
 */
$(function () {
	todayFirstWI();
	setInterval(function (){
		todayFirstWI();
	},1000*60*5);
});

function todayFirstWI() {
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
}            </script>
				<div title="" class="app-block react-draggable"
					style="left: 1435; top: 20; width: 465; height: 252; color: #021068; position: absolute; transform: translate(0px, 0px); touch-action: none;">
					<div class="app-panel app-full-box">
						<div class="app-panel-border">
							<div
								class="app-panel-corner corner-horizontal corner-left corner-top"></div>
							<div
								class="app-panel-corner corner-horizontal corner-right corner-top"></div>
							<div
								class="app-panel-corner corner-horizontal corner-right corner-bottom"></div>
							<div
								class="app-panel-corner corner-horizontal corner-left corner-bottom"></div>
							<div
								class="app-panel-corner corner-vertical corner-left corner-top"></div>
							<div
								class="app-panel-corner corner-vertical corner-right corner-top"></div>
							<div
								class="app-panel-corner corner-vertical corner-right corner-bottom"></div>
							<div
								class="app-panel-corner corner-vertical corner-left corner-bottom"></div>
						</div>
						<div class="app-chart" style="background: none;">
							<div class="app-area-box">
								<div class="app-title-box">
									<i></i><span>在岗警力</span><b>TOP5</b>
								</div>

								<div
									style="width: 80%; height: 90%; margin-left: 10px; color: #1E5FBC; margin-top: 5px; float: left;"
									id="areaPsDistribution"></div>
								<!-- 辖区警力分配echarts图表div -->
								<div class="areapsbox"
									style="position: absolute; top: 0; right: 4%;">
									<div>
										<b>日环比</b>
									</div>
									<div class="areaps">
										<!-- <div><span>39</span><em class="target_up"></em></div>
								    	<div><span>39</span><em class="target_up"></em></div>
								    	<div><span>39</span><em class="target_up"></em></div>
								    	<div><span>39</span><em class="target_up"></em></div>
								    	<div><span>39</span><em class="target_down"></em></div> -->
									</div>
								</div>
								<!-- <div style="right: 4%; bottom: 5%;position:absolute;">
                      <b style="color: #1E5FBC;font-size: 10px;">(到岗率)</b>
                    </div> -->
							</div>
							<!-- 整个div -->
						</div>
					</div>
				</div>
				<script type='text/javascript'>width = $(".app-block:eq(12)").width();height = $(".app-block:eq(12)").height();$(".app-chart:eq(12) div:eq(0)").css("width", parseInt(width));$(".app-chart:eq(12) div:eq(0)").css("height", parseInt(height));</script>
				<script type='text/javascript'> var recallDate='2017-09-07 15:00:00'</script>
				<script type='text/javascript'>$(function() {
	/* <!-- 右1.在岗警力 组件 --> */
	areaPsDistributionFunc(recallDate);
	timer = setInterval(function() {
		areaPsDistributionFunc(recallDate);
	}, 1000 * 60 * 5);
});

var areaPsDistributionName;
var areaPsDistributionValue;
function areaPsDistributionFunc(recallDate) {
  $.ajax({
    type : "POST",
    url : contextPathJs + "/dataStatistics/queryareaPsDistribution.do",
      ansyc : false,
      data : {recallDate:recallDate},
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
        //debugger;
        for (var i = data.length-1; i >= 0; i--) {
          html += "<div><span>"+Math.abs(data[i].dayChain)+"</span><em> "; 
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
}                                                                                                                                                                                                                                                                                                      </script>
				<div title="" class="app-block react-draggable"
					style="left: 1435; top: 285; width: 465; height: 252; color: #021068; position: absolute; transform: translate(0px, 0px); touch-action: none;">
					<div class="app-panel app-full-box">
						<div class="app-panel-border">
							<div
								class="app-panel-corner corner-horizontal corner-left corner-top"></div>
							<div
								class="app-panel-corner corner-horizontal corner-right corner-top"></div>
							<div
								class="app-panel-corner corner-horizontal corner-right corner-bottom"></div>
							<div
								class="app-panel-corner corner-horizontal corner-left corner-bottom"></div>
							<div
								class="app-panel-corner corner-vertical corner-left corner-top"></div>
							<div
								class="app-panel-corner corner-vertical corner-right corner-top"></div>
							<div
								class="app-panel-corner corner-vertical corner-right corner-bottom"></div>
							<div
								class="app-panel-corner corner-vertical corner-left corner-bottom"></div>
						</div>
						<div class="app-chart" style="background: none;">
							<div class="app-area-box">
								<div class="app-title-box">
									<i></i><span>今日辖区警情</span><b>TOP5</b>
								</div>
								<div
									style="width: 95%; height: 90%; margin-left: 10px; margin-top: -5px;"
									id="currentAreaWI"></div>
								<!-- 今日辖区警情echarts图表div -->
							</div>
							<!-- 整体div -->
						</div>
					</div>
				</div>
				<script type='text/javascript'>width = $(".app-block:eq(13)").width();height = $(".app-block:eq(13)").height();$(".app-chart:eq(13) div:eq(0)").css("width", parseInt(width));$(".app-chart:eq(13) div:eq(0)").css("height", parseInt(height));</script>
				<script type='text/javascript'> var recallDate='2017-09-07 15:00:00'</script>
				<script type='text/javascript'>$(function () {
	/* <!-- 右2.今日辖区警情 TOP5 --> */
	currentAreaWIFunc(recallDate);
	timer = setInterval(function() {
		currentAreaWIFunc(recallDate);
	}, 1000 * 60 * 5);
})

var firstData;
var secondData;
var threeData;
var dataRow;
var totalCountArr;
function currentAreaWIFunc(recallDate) {
  $.ajax({
    type : "POST",
    url : contextPathJs + "/dataStatistics/getCurrentAreaWI.do",
    ansyc : false,
    data : {recallDate:recallDate},
    //data : {recallDate:"2017-9-3 1:10:00"},
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
}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       </script>
				<div title="" class="app-block react-draggable"
					style="left: 1435; top: 545; width: 465; height: 252; color: #021068; position: absolute; transform: translate(0px, 0px); touch-action: none;">
					<div class="app-panel app-full-box">
						<div class="app-panel-border">
							<div
								class="app-panel-corner corner-horizontal corner-left corner-top"></div>
							<div
								class="app-panel-corner corner-horizontal corner-right corner-top"></div>
							<div
								class="app-panel-corner corner-horizontal corner-right corner-bottom"></div>
							<div
								class="app-panel-corner corner-horizontal corner-left corner-bottom"></div>
							<div
								class="app-panel-corner corner-vertical corner-left corner-top"></div>
							<div
								class="app-panel-corner corner-vertical corner-right corner-top"></div>
							<div
								class="app-panel-corner corner-vertical corner-right corner-bottom"></div>
							<div
								class="app-panel-corner corner-vertical corner-left corner-bottom"></div>
						</div>
						<div class="app-chart" style="background: none;">
							<div class="app-area-box">
								<div class="app-title-box">
									<i></i><span>本月违法数据</span><b>TOP5</b>
									<div style="position: absolute; right: 15px; top: 5px;"
										class="vioSumNum"></div>
								</div>
								<div id="test05"
									style="width: 100%; height: 100%; margin-left: -25px;"></div>
							</div>
							<!-- 整个div -->
						</div>
					</div>
				</div>
				<script type='text/javascript'>width = $(".app-block:eq(14)").width();height = $(".app-block:eq(14)").height();$(".app-chart:eq(14) div:eq(0)").css("width", parseInt(width));$(".app-chart:eq(14) div:eq(0)").css("height", parseInt(height));</script>
				<script type='text/javascript'> var recallDate='2017-09-07 15:00:00'</script>
				<script type='text/javascript'>$(function() {
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
      var json=eval('(' + xAxisDataArr[i] + ')');
      x.push(json);
    }
    test05(x,seriesArr1);
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
};                                                                                             </script>
				<div title="" class="app-block react-draggable"
					style="left: 1435; top: 807; width: 465; height: 252; color: #021068; position: absolute; transform: translate(0px, 0px); touch-action: none;">
					<div class="app-panel app-full-box">
						<div class="app-panel-border">
							<div
								class="app-panel-corner corner-horizontal corner-left corner-top"></div>
							<div
								class="app-panel-corner corner-horizontal corner-right corner-top"></div>
							<div
								class="app-panel-corner corner-horizontal corner-right corner-bottom"></div>
							<div
								class="app-panel-corner corner-horizontal corner-left corner-bottom"></div>
							<div
								class="app-panel-corner corner-vertical corner-left corner-top"></div>
							<div
								class="app-panel-corner corner-vertical corner-right corner-top"></div>
							<div
								class="app-panel-corner corner-vertical corner-right corner-bottom"></div>
							<div
								class="app-panel-corner corner-vertical corner-left corner-bottom"></div>
						</div>
						<div class="app-chart" style="background: none;">
							<div class="app-area-box">
								<div class="app-title-box">
									<i></i><span>违法类型数量变化</span><b>TOP5</b>
								</div>
								<div style="margin-left: 10px; color: #1E5FBC; margin-top: 5px;">
								</div>
								<!-- 辖区拥堵、警情、警力分步echarts图表div -->
								<div id="test03" style="width: 95%; height: 90%;"></div>
							</div>
							<!-- 整个div -->
						</div>
					</div>
				</div>
				<script type='text/javascript'>width = $(".app-block:eq(15)").width();height = $(".app-block:eq(15)").height();$(".app-chart:eq(15) div:eq(0)").css("width", parseInt(width));$(".app-chart:eq(15) div:eq(0)").css("height", parseInt(height));</script>
				<script type='text/javascript'> var recallDate='2017-09-07 15:00:00'</script>
				<script type='text/javascript'>$(function() {
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
//          使用刚指定的配置项和数据显示图表。
    var clazz=document.getElementById('test03');
    var myChart = echarts.init(clazz);
    myChart.setOption(option);
  }                                                                                                                                                                                                               </script>
			</div>
		</div>
	</div>
</body>
</html>