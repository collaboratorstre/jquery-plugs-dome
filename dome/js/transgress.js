 // 违法类型排名top10
 var wflxpm = function(containerId,data){
	    $("#"+containerId).empty();
	    console.log(data);
	     var chart_type = echarts.init(document.getElementById(containerId));
	     var arr1 = [];
	    $.each(data,function(i,n){
	        arr1.push(n.name);
	    })
	    console.log(arr1);
	     option = {
	                 color:["#f7ca43","#fd6354","#79a5c7","#46d3be","#70cf28","#c78127","#d27d6b","#bf3037","#2a3f5a","#b99d9f"],

	               tooltip : {
	                          trigger: 'item',
	                            // formatter: "{a} <br/>{b} : {c} ({d}%)",
	                          formatter:  function(data){
	                                  return  data.name +'车辆总量<br><span style="color: yellow;font-size: 20px;margin-left: 40px;">'+data.value + '</span>辆';
	                              }
	                      },
	           
	                legend: {
	                    show: true,
	                    data: arr1,
	                    top: '3%',
	                    
	                    x: 'left',
	                    y: 'top',
	                    textStyle:{
	                        fontSize:14,
	                        color: 'white'
	                    },
	                    formatter: function (name) {
	                        if(name.length >= 8){
	                            return name.substring(0,8) + "...";
	                        }else{
	                            return name;
	                        }
	                        //return echarts.format.truncateText(name, 150, '14px Microsoft Yahei', '...');
	                    },
	                  },
	              series : [
	                  {
	                      name: '访问来源',
	                      type: 'pie',
	                      radius : [20,90],
	                      center: ['50%', '60%'],
	                       roseType : 'radius',
	                      itemStyle: {
	                              normal : { 
	                                        borderWidth : 5,
	                                        borderColor : 'white'
	                                        },
	                                   },
	                      label: {
	                          normal:{
	                              formatter: '{b}({c}辆)',
	                              textStyle:{
	                                  color: 'white'
	                              },
	                              fontFamily: 'Microsoft YaHei'
	                          }
	                      },
	                      labelLine: {
	                              normal: {
	                                lineStyle: {
	                                  color: 'white'
	                                }
	                              }
	                            },
	                      data:data,
	                      itemStyle: {
	                          emphasis: {
	                              shadowBlur: 10,
	                              shadowOffsetX: 0,
	                              shadowColor: 'rgba(0, 0, 0, 0.5)'
	                          }
	                      }
	                  }
	              ]
	     }
	     chart_type.setOption(option);

	  }
   //事故类型排名top10
    var sglxpm = function(containerId,data){
	    $("#"+containerId).empty();
	    console.log(data);
	     var chart_type = echarts.init(document.getElementById(containerId));
	     var arr1 = [];
	    $.each(data,function(i,n){
	        arr1.push(n.name);
	    })
	    console.log(arr1);
	     option = {
	                 color:["#f7ca43","#fd6354","#79a5c7","#46d3be","#70cf28","#c78127","#d27d6b","#bf3037","#2a3f5a","#b99d9f"],

	               tooltip : {
	                          trigger: 'item',
	                            // formatter: "{a} <br/>{b} : {c} ({d}%)",
	                          formatter:  function(data){
	                                  return  data.name +'车辆总量<br><span style="color: yellow;font-size: 20px;margin-left: 40px;">'+data.value + '</span>辆';
	                              }
	                      },
	           
	                legend: {
	                    show: true,
	                    data: arr1,
	                    top: '3%',
	                    
	                    x: 'left',
	                    y: 'top',
	                    textStyle:{
	                        fontSize:14,
	                        color: 'white'
	                    },
	                    formatter: function (name) {
	                        if(name.length >= 8){
	                            return name.substring(0,8) + "...";
	                        }else{
	                            return name;
	                        }
	                        //return echarts.format.truncateText(name, 150, '14px Microsoft Yahei', '...');
	                    },
	                  },
	              series : [
	                  {
	                      name: '访问来源',
	                      type: 'pie',
	                      radius : [20,90],
	                      center: ['50%', '60%'],
	                       roseType : 'radius',
	                      itemStyle: {
	                              normal : { 
	                                        borderWidth : 5,
	                                        borderColor : 'white'
	                                        },
	                                   },
	                      label: {
	                          normal:{
	                              formatter: '{b}({c}辆)',
	                              textStyle:{
	                                  color: 'white'
	                              },
	                              fontFamily: 'Microsoft YaHei'
	                          }
	                      },
	                      labelLine: {
	                              normal: {
	                                lineStyle: {
	                                  color: 'white'
	                                }
	                              }
	                            },
	                      data:data,
	                      itemStyle: {
	                          emphasis: {
	                              shadowBlur: 10,
	                              shadowOffsetX: 0,
	                              shadowColor: 'rgba(0, 0, 0, 0.5)'
	                          }
	                      }
	                  }
	              ]
	     }
	     chart_type.setOption(option);

	  }
 //违法路段排名top10
   var wfldpm = function(containerId,data){
	  $("#"+containerId).empty();
	  // console.log(data);
	  if(data){
	          $.each(data,function(i,n){
	             var progressStr = "<div class='progress-container'><div class='progress-title'>"+n.name+"</div>"
	                +"<div class='progress-content'>"
	                + '<div class="legalRate" style="width:'+ (n.value/1000000)*100 +'%;';
	            progressStr+='"><div class="shuzi" style="color: white;">'+n.value+'</div></div></div>'
	                +'<div class="progress-amount">'+'</div></div>';
	            $("#"+containerId).append($(progressStr));
	          })
	  }else{
	    $("#"+containerId).html("<span>暂时没有数据</span>")
	  }
	}
 //事故路段排名top10
 var sgldpm = function(containerId,data){
	  $("#"+containerId).empty();
	  // console.log(data);
	  if(data){
	          $.each(data,function(i,n){
	             var progressStr = "<div class='progress-container'><div class='progress-title'>"+n.name+"</div>"
	                +"<div class='progress-content'>"
	                + '<div class="legalRate" style="width:'+ (n.value/1000000)*100 +'%;';
	            progressStr+='"><div class="shuzi" style="color: white;">'+n.value+'</div></div></div>'
	                +'<div class="progress-amount">'+'</div></div>';
	            $("#"+containerId).append($(progressStr));
	          })
	  }else{
	    $("#"+containerId).html("<span>暂时没有数据</span>")
	  }
	}

	//违法事故分布情况
	$.get('../json/hebei.json', function (heZe) {
        echarts.registerMap('河北', heZe);
        var chart = echarts.init(document.getElementById('hebei_map'));
        
        option = {
          
            tooltip: {
                    show: false,
                    position: ['40%','50%'],
                    trigger: 'item',
                    // formatter: function(){
                    //     return '每年小型车车辆总数<br><span>'+234523+'</span>辆';
                    formatter: '今日{b0}机动车通行总量<br/><span style="color: yellow;">857601</span>辆'
                    // }
                },
                    geo: [
            {
                map: '河北',
                label: {
                    emphasis: {
                        show: false
                    }
                },
                roam: false,
                itemStyle: {
                    normal: {
                        areaColor: '#0b0c45',
                        borderColor: '#2b6cbe',
                        borderWidth:3,
                        shadowColor: 'rgba(45,110,192,2)',
                        shadowBlur: 40
                    },
                    emphasis: {
                        areaColor: '#0b0c45'
                    }
                }
            },
            {
                map: '河北',
                label: {
                    emphasis: {
                        show: false
                    }
                },
                roam: false,
                itemStyle: {
                    normal: {
                        areaColor: '#0b0c45',
                        borderColor: '#2b6cbe',
                        borderWidth:1,
                        // shadowColor: 'rgba(45,110,192,2)',
                        // shadowBlur: 30,
                    },
                    emphasis: {
                        areaColor: '#0b0c45'
                    }
                }
            }
        ],
            series:[
              {
                name:'机动车总量分布图',
                type:'map',
                map:'河北',
                itemStyle: {
                  normal:{
                    areaColor: '#0b0c45',
                    borderColor: '#2b6cc0'
                  },
                  emphasis:{
                    color: 'blue',
                    areaColor: '#00a2ff'
                  }
                },
                label:{
                  
                },
                mapLocation:{
                  y:60
                },
                data:[


                ]
              }
            ],
            
        };
        chart.setOption(option);
});
 
 //数据的统一处理
  var refreshData = function(){
    $.get("../json/hebeishuju.json",function(data){
      console.log(data);
 
     // 违法类型排名top10
        wflxpm("wflxpm",data.wflxpm); 
     // 事故类型排名top10
        sglxpm("sglxpm",data.wflxpm);
     //违法路段排名top10
        wfldpm('wfldpm',data.wfldpm); 
     //事故路段排名top10
        sgldpm("sgldpm",data.wfldpm);

    	    });
};

    $(document).ready(function(){
    	          refreshData();
		        
		       })  