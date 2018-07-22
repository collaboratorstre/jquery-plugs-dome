var datas1 = {   
		    tsForecastList: ["-", "-", "-", "-", "-", "-", "0", "0", "0", "0", "0", "0","3","4","5","0", "0", "0", "0", "0", "0","3","4","2"],
		        tsTrueList: ["0", "0", "0", "0", "6", "0", "0", "-", "-", "-", "-", "-",, "-", "-", "-", "-", "-",, "-", "-", "-", "-", "-"],
			zxForecastList: ["-", "-", "-", "-", "-", "-", "0", "0", "0", "0", "0", "0","0", "0", "0", "0", "0", "0","3","4","5","0", "0", "0"],
			    zxTrueList: ["1", "3", "2", "1", "2", "3", "2", "-", "-", "-", "-", "-","-", "-", "-", "-", "-", "-",, "-", "-", "-", "-", "-"],
			        lkjcfz: ["0", "0", "0", "0", "2", "0", "8", "3", "4", "7", "2", "4","5", "6", "7", "8", "9", "1",, "-", "-", "-", "-", "-"],
			    lgsj: [{ "name":"国内", "value":32383},{ "name":"国际", "value":14479}],
			    lkjcys:{lkwdl:"20%",lkwdrs:1000,zcdgl:"70%",zcdgrs:3500,zclgl:"85%",zclgrs:3879,lkywl:"10%",lkywrs:800},
			    dgjc:{hwdgl:"20%",hzcdgl:"70%",hywdgl:"10%"},
			    lgjc:[{"hbgs":"中空公司","lgbc":"001次","fjxh":"TH001","jclgsj":"9:00","jclksl":"4000"},
					    {"hbgs":"飞夏公司","lgbc":"001次","fjxh":"TH001","jclgsj":"9:20","jclksl":"3300"},
					    {"hbgs":"流行公司","lgbc":"001次","fjxh":"TH001","jclgsj":"9:40","jclksl":"5100"}]
		}

		var tor_direc = function(containerId,data){
		    var tor_direc_chart = echarts.init(document.getElementById(containerId), 'dark');

		    var thisTime = new Date();
		    var thisHour = thisTime.getHours();
		    var tor_direc_option = {
		        tooltip : {
		            trigger: 'axis',
		            // axisPointer: {
		            //     type: 'line',
		            //     lineStyle:{
		            //         color:'#3299fe'
		            //     },
		            //     label: {
		            //         backgroundColor: '#6a7985'
		            //     }
		            // }
		        },
		        legend: {
		            // width:360,
		            // height: 10,
		            // left:'7%',
		            // top:'-10',
		            // bottom:'88%',
		            itemWidth:30,//图例宽度
		            itemHeight:10,//图例高度
		            itemGap:10,//图例间隔
		            // data:['评价','投诉','咨询']
		            data:[
		                {
		                    name:'到港旅客',
		                    textStyle:{
		                        color:'white'
		                    },
		                    icon:'stack'//图例样式（长方形)
		                },
		                {
		                    name:'离港旅客',
		                    textStyle:{
		                        color:'white'
		                    },
		                    icon:'stack'
		                },
		                {
		                    name:'阀值',
		                    textStyle:{
		                        color:'white'
		                    },
		                    icon:'stack'
		                },
		                {
		                    name:'真实值',
		                    textStyle:{
		                        color:'white'
		                    },
		                    icon: 'image:// ./img/solid.png'
		                },
		                {
		                    name:'预测值',
		                    textStyle:{
		                        color:'white'
		                    },
		                    icon: 'image:// ./img/dashed.png'
		                }

		            ]
		        },
		        grid: {
		        	top: '15%',
		            left: '4%',
		            right: '4%',
		            bottom: '1%',
		            // width: '95%',
		            // height: '80%',
		            containLabel: true
		        },
		        xAxis : [
		            {
		                type : 'category',
		                axisPointer: {
		                    value: thisHour,
		                    snap: true,
		                    lineStyle: {
		                        color: '#97cdfc',
		                        opacity: 0.5,
		                        width: 2
		                    },
		                    label: {
		                        backgroundColor: '#6a7985',
		                        formatter:'时间：{value}点'
		                    },
		                    handle: {
		                        show: true,
		                        color: 'transparent'
		                    }
		                },
		                boundaryGap : false,
		                splitLine:{//坐标轴在grid区域中的分隔线
		                    show: true,
		                    lineStyle:{
		                        color: '#021979',
		                        type: 'solid'
		                    }
		                },
		                axisLine:{
		                    lineStyle:{
		                        color:'#021979'
		                    }
		                },
		                axisLabel:{
		                    show: true,//是否显示刻度标签
		                    textStyle:{
		                        color:'#97cdfc'
		                    }
		                },
		                axisTick:{
		                    show: false//是否显示坐标轴刻度
		                },
		                data : ['0','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23']
		                // data:data.timeList
		            }
		        ],
		        yAxis : [
		            {
		            	name : '人数量',
		            	nameTextStyle:{
		            		color:'white'
		            	},
		                type : 'value',
		                splitLine:{
		                    show: true,
		                    lineStyle:{
		                        color: '#021979',
		                        type: 'solid'
		                    }
		                },
		                axisLine:{
		                    lineStyle:{
		                        color:'#021979'
		                    }
		                },
		                axisLabel:{
		                    show: true,//是否显示刻度标签，
		                    formatter: '{value}',
		                    textStyle:{
		                        color:'#97cdfc'
		                    }
		                },
		                axisTick:{
		                    show: false//是否显示坐标轴刻度
		                }
		            }
		        ],
		        series : [
		            {
		                name:'到港旅客',
		                type:'line',
		                areaStyle: {
		                    normal: {
		                        // color:'#65ffff',
		                        opacity:'0.2',
		                       /* color: new echarts.graphic.LinearGradient(//颜色渐变
		                            0, 0, 0, 1,
		                            [
		                                {offset: 0.5, color: '#65ffff'},
		                                {offset: 1, color: 'transparent'}
		                            ]
		                        )*/
		                    }
		                },
		                lineStyle: {
		                    normal:{
		                        color:'#65ffff'
		                    }
		                },
		                itemStyle:{
		                    normal:{
		                        color:'#65ffff'
		                    }
		                },
		                // data:[0,0,0,0,50,200,330,320,310,"-","-","-"]
		                data:data.zxTrueList
		            },
		            {
		                name:'到港旅客预测',
		                type:'line',
		                areaStyle: {
		                    normal: {
		                        // color:'#65ffff',
		                        opacity:'0.2',
		                       /* color: new echarts.graphic.LinearGradient(//颜色渐变
		                            0, 0, 0, 1,
		                            [
		                                {offset: 0.5, color: '#65ffff'},
		                                {offset: 1, color: 'transparent'}
		                            ]
		                        )*/
		                    }
		                },
		                lineStyle: {
		                    normal:{
		                        type:'dotted',
		                        color:'#65ffff'
		                    }
		                },
		                itemStyle:{
		                    normal:{
		                        color:'#65ffff'
		                    }
		                },
		                // data:["-","-","-","-","-","-","-","-",310,326,257,14]
		                data:data.zxForecastList
		            },
		            {
		                name:'离港旅客',
		                type:'line',
		                areaStyle: {
		                    normal: {
		                        // color:'#3399fe',
		                        opacity:'0.2',
		                       /* color: new echarts.graphic.LinearGradient(//颜色渐变
		                            0, 0, 0, 1,
		                            [
		                                {offset: 0.5, color: '#3399fe'},
		                                {offset: 1, color: 'transparent'}
		                            ]
		                        )*/
		                    }
		                },
		                lineStyle: {
		                    normal:{
		                        color:'#3399fe'
		                    }
		                },
		                itemStyle:{
		                    normal:{
		                        color:'#3399fe'
		                    }
		                },
		                data:data.tsTrueList
		            },
		            {
		                name:'离港旅客预测',
		                type:'line',
		                areaStyle: {
		                    normal: {
		                        // color:'#3399fe',
		                        opacity:'0.2',
		                        /*color: new echarts.graphic.LinearGradient(//颜色渐变
		                            0, 0, 0, 1,
		                            [
		                                {offset: 0.5, color: '#3399fe'},
		                                {offset: 1, color: 'transparent'}
		                            ]
		                        )*/
		                    }
		                },
		                lineStyle: {
		                    normal:{
		                        type:'dotted',
		                        color:'#3399fe'
		                    }
		                },
		                itemStyle:{
		                    normal:{
		                        color:'#3399fe'
		                    }
		                },
		                // data:[0,0,0,0,0,0,330,320,200,100,50,"","","",""]
		                // data:[0,10,14,34,80,120,200,320,410,500,200,100]
		                data:data.tsForecastList
		            },
		            {
		                name:'阀值',
		                type:'line',
		                areaStyle: {
		                    normal: {
		                        // color:'#3399fe',
		                        opacity:'0.2',
		                        /*color: new echarts.graphic.LinearGradient(//颜色渐变
		                            0, 0, 0, 1,
		                            [
		                                {offset: 0.5, color: '#3399fe'},
		                                {offset: 1, color: 'transparent'}
		                            ]
		                        )*/
		                    }
		                },
		                lineStyle: {
		                    normal:{
		                        color:'#F7CA43'
		                    }
		                },
		                itemStyle:{
		                    normal:{
		                        color:'#F7CA43'
		                    }
		                },
		                data:data.lkjcfz
		                },
		          
		            {
		                name:'真实值',
		                type:'line',
		                itemStyle:{
		                    normal:{
		                        color:'#ffffff'
		                    }
		                },
		                data:[]
		            },
		            {
		                name:'预测值',
		                type:'line',
		                itemStyle:{
		                    normal:{
		                        color:'#ffffff'
		                    }
		                },
		                data:[]
		            }
		        ]
		    }
		     tor_direc_chart.setOption(tor_direc_option);

		 }   

   var arriv_port = function(containerId,data){
			    $("#"+containerId).empty();
			    // console.log(data);
			     var arriv_port_chart = echarts.init(document.getElementById(containerId));
			     var arr1 = [];
			    $.each(data,function(i,n){
			        arr1.push(n.name);
			    })
			    // console.log(arr1);
			     arriv_port_option = {
			                 color:["#70CF28","#F7CA43","#d27d6b","#bf3037","#2a3f5a","#b99d9f"],

			               tooltip : {
			                          trigger: 'item',
			                            // formatter: "{a} <br/>{b} : {c} ({d}%)",
			                          formatter:  function(data){
			                                  return  data.name +'到港总量<br><span style="color: yellow;font-size: 20px;margin-left: 40px;">'+data.value + '</span>人';
			                              }
			                      },
			           
			                legend: {
			                    show: true,
			                    data: arr1,
			                    orient: 'vertical',
			                    top: '3%',
			                    left: '4%',
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
			                      // radius: ['50%', '70%'],
			                      center: ['50%', '60%'],
			           
			                      itemStyle: {
			                              normal : { 
			                                        borderWidth : 5,
			                                        borderColor : 'white'
			                                        },
			                                   },
			                      label: {
			                          normal:{
			                              formatter: '{b}({c}人)',
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
			     arriv_port_chart.setOption(arriv_port_option);

			  }


var refreshData=function(){ 
	//旅客监测
	tor_direc("tor_direc",datas1);
	//到港监测
	arriv_port("arriv_port",datas1.lgsj);
	//影响旅客监测因素
	$("#tor_table tr td span").each(function(){
		var ids = $(this).attr("id");
		$(this).text(datas1.lkjcys[ids])
	})
	//到港监测
	$(".port_data tr td span").each(function(){
		var ids = $(this).attr("id");
		$(this).text(datas1.dgjc[ids])
	})
	//离港监测
	$.each(datas1.lgjc,function(i,n){
		var data1 = '';
		data1 += '<tr>'+
		 '<td>'+n.hbgs+'</td><td>'+n.lgbc+'</td><td>'+n.fjxh+'</td><td>'+n.jclgsj+'</td><td>'+n.jclksl+'</td>'+
		 '</tr>'
		 $('#depart_cont').append($(data1));
	})
}

$(document).ready(function(){
	refreshData();
    // setInterval(refreshData,5*60*1000);
})