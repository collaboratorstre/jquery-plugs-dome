/**
 * 警情事件专题
 */
var warningEvent = {};

//---------------------------------------------------------------------

/* <!-- 中1.当前警情数 小组件 --> */
warningEvent.currentWINum = function(recallDate) {
	$.ajax({
		type : "POST",
		url : contextPathJs + "/warningEvent/queryCurrentWINum.do",
	    ansyc : true,
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

//---------------------------------------------------------------------

/*今日重大警情*/
warningEvent.todayFirstWI = function (recallDate) {
	$.ajax({
		type : "POST",
		url : contextPathJs + "/warningEvent/getTodayFirstWI.do",
		ansyc : true,
		data : {recallDate:recallDate},
	   // data : {recallDate:"2017-9-3 2:00:00"},
	    dataType : "json",
	    success : function(data) {
	      $("#pText").empty();
	      var decName = data.split("/");
	      if (data == "") {
	        var  html = "<li><a style='color: #ff3333'>暂无</a></li>";
	              $("#pText").append(html);
	          } else {
	            $.each(decName,function(i,v){
	             
	              var  html = '<li><a style = "color:red;">'+v+'</a></li>';
	              $("#pText").append(html);
	            });
	            warningEvent.jump();
	          }
	      
	      }
	  });
}

var timer2=null;
warningEvent.jump = function(){
    var oDiv = document.getElementById('scroll');
    var oUl = oDiv.getElementsByTagName('ul')[0];
    var aLi = oDiv.getElementsByTagName('li');
    var speed = -1;
    clearInterval(timer2);
    oUl.innerHTML += oUl.innerHTML;
    oUl.style.width = aLi[0].offsetWidth * aLi.length + 'px';
    timer2=setInterval(function(){
	    oUl.style.left = oUl.offsetLeft + speed + 'px';
	    if(oUl.offsetLeft < - oUl.offsetWidth / 2){
	        oUl.style.left = '0';
	    }else if(oUl.offsetLeft > 0){
	        oUl.style.left = - oUl.offsetWidth / 2 + 'px';
	    }
    },60*1);
  }; 
  
//---------------------------------------------------------------------
  
/*今日辖区警情TOP5*/
warningEvent.currentAreaWIFunc = function(recallDate) {
	$.ajax({
		type : "POST",
		url : contextPathJs + "/warningEvent/getCurrentAreaWI.do",
		ansyc : true,
		data : {recallDate:recallDate},
	    //data : {recallDate:"2017-9-3 1:10:00"},
	    dataType : "json",
	    success : function(data) {
	          if (data.length == 0) {
	              $("#currentAreaWI").css("display","none");
	               $("#noCurrentAreaWI").css("display","block");
				        	var divshow = $("#noCurrentAreaWI");
	                divshow.text("");// 清空数据
	                divshow.append('<div style="display: table;width: 100%;height: 100%;"><p style="display: table-cell;vertical-align: middle;text-align: center;">暂无数据</p></div>'); // 添加Html内容，不能用Text 或 Val
				  } else {
	        
	           $("#noCurrentAreaWI").css("display","none");
	           $("#currentAreaWI").css("display","block");
	           var firstData = [];
	           var secondData = [];
	           var threeData = [];
	           var dataRow = [];
	           var totalCountArr = [];
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
	              firstData.push('');
	              
	            }
	            if (parseInt(v.eventCount2)!=0) {
	              secondData.push(v.eventCount2);
	            } else {
	              secondData.push('');
	            }
	            if (parseInt(v.eventCount3)!=0) {
	              threeData.push(v.eventCount3);
	        } else {
	          threeData.push('');
	        }
	        dataRow.push(v.disposeRegionName);
	        totalCountArr.push(v.totalcount);
	        });
	        warningEvent.setCurrentAreaWIOption(firstData,secondData,threeData,dataRow,totalCountArr);
	        }
	      }
	  });
}

warningEvent.setCurrentAreaWIOption = function(firstData,secondData,threeData,dataRow,totalCountArr){
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
            boundaryGap: ['50%', '50%'],
            axisLine:{
              show:false
            },
            axisTick:{
              show:true,
               alignWithLabel:false,
               interval : 5,
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
                    var a = value + "                       " + Data[index];
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
            selectedMode:false,
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