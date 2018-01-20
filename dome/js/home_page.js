 //违法类型排名
 var wftlpm = function(containerId,data){
		    $("#"+containerId).empty();
		    if(data && data.length > 0){
		        var maxValue = data[0].count;
		        if(maxValue < 1) maxValue = 1;
		        $.each(data,function(i,n){
		            var progress = $("<div class='progress-container'><div class='progress-title'>" + n.name + "</div>"
		                + "<div class='progress-content'>"
		                + "<div class='legalRate' style='width:" + (n.count/maxValue)*100 + "%;'>"
		                + "<div class='shuzi' style='color: white;'>" + n.count + "</div></div></div>"
		                + "<div style='width: 20%;box-sizing: border-box;padding: 2.4% 6%;'></div></div>");
		           
		            $("#"+containerId).append(progress);
		        })
		    }else{
		        $("#"+containerId).html("<span>暂时没有数据</span>")
		    }
		};

//事故占比
 var sgzb = function(containerId,data){
 	 $("#"+containerId).empty();
	    // console.log(data);
	     var chart_type = echarts.init(document.getElementById(containerId));
	     var arr1 = [];
	    $.each(data,function(i,n){
	        arr1.push(n.name);
	    })
	    // console.log(arr1);
	     option = {
	                 color:["#7bc0f2","#df9499"],

	               tooltip : {
	                          trigger: 'item',
	                          // formatter: "{a}起",
	                          formatter:  function(data){
	                                  return  '全省'+data.name +'事故总量<br><span style="color: yellow;font-size: 20px;margin-left: 40px;">'+data.value + '</span>起';
	                              }
	                      },
	           
	                legend: {
	                    show: true,
	                    data: arr1,
	                    top: '3%',
	                    orient: 'vertical',
	                    x: '4%',
	                    y: '20%',
	                    itemWidth: 45,
	                    itemHeight: 25,
	                    // padding: [20,10,20,10],
	                    textStyle:{
	                        fontSize:28,
	                        color: '#7399cd'
	                    },
	                    formatter: function (name) {
	                        if(name.length >= 8){
	                            return name.substring(0,8);
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
	                      radius : '65%',
	                      center: ['50%', '60%'],  
	                      itemStyle: {
	                              normal : { 
	                                        borderWidth : 10,
	                                        borderColor : 'white'
	                                        },
	                                   },
	                      label: {
	                          normal:{
                                 
	                              formatter: '{c}起  {d}%',
	                              textStyle:{
	                                  color: 'white',
	                                  fontSize: 28
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

var refreshData = function(){
	 $.get("../json/homePage.json",function(data){
        console.log(data);
        //违法类型排名
	 	wftlpm("illegl_type",data.wftlpm);

	 	//事故占比
	 	sgzb("accident_rate",data.sgzb);
	 })
	 
}
    $(document).ready(function(){
    	          refreshData();
		       })  