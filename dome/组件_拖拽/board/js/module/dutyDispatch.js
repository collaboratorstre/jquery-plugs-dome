/**
 * 勤务指挥调度专题
 */
var dutyDispatch = {};

/*当前警力小组件*/
dutyDispatch.currentPSNum = function (recallDate) {
    $.ajax({
      type : "POST",
      url : contextPathJs + "/dutyDispatch/queryCurrentPSNum.do",
      ansyc : true,
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

//----------------------------------------------------------------------------------

/*在岗警力TOP5*/
dutyDispatch.areaPsDistributionFunc = function (recallDate) {
	$.ajax({
		type : "POST",
		url : contextPathJs + "/dutyDispatch/queryareaPsDistribution.do",
	    ansyc : true,
	    data : {recallDate:recallDate},
	    dataType : "json",
	    success : function(data) {
	     var areaPsDistributionName = [];
	     var areaPsDistributionValue = [];
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
	      for (var i = data.length-1; i >= 0; i--) {
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
	      dutyDispatch.setAreaPsDistributionOption(areaPsDistributionName,areaPsDistributionValue);
	    }
  });
}

dutyDispatch.setAreaPsDistributionOption = function (areaPsDistributionName,areaPsDistributionValue){
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

//---------------------------------------------------------------------------

