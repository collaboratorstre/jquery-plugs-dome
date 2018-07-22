var datas1 = {   
		    tsForecastList: ["-", "-", "-", "-", "-", "-", "0", "0", "0", "0", "0", "0","3","4","5","0", "0", "0", "0", "0", "0","3","4","2"],
		        tsTrueList: ["49.8", "19", "68.9", "261.6", "212.6", "250.1", "131.1", "92.1", "77.7", "38.1", "75.5", "99.7"],
			zxForecastList: ["-", "-", "-", "-", "-", "-", "0", "0", "0", "0", "0", "0","0", "0", "0", "0", "0", "0","3","4","5","0", "0", "0"],
			    zxTrueList: ["1741.9", "977", "1742.2", "1431.1", "1636.2", "1447", "1711.7", "1921.2", "2609.6", "3332.6", "3647.3", "2498.1"],
			        lkjcfz: ["0", "0", "0", "0", "2", "0", "8", "3", "4", "7", "2", "4","5", "6", "7", "8", "9", "1",, "-", "-", "-", "-", "-"],
			    lgsj: [{ "name":"当地", "value":3238},{ "name":"外地", "value":1447}],
			    lkjcys:{lkwdl:5000,lkwdrs:1000,zcdgl:8000,zcdgrs:3500,zclgrs:3879,lkywrs:8800},
			    dgjc:{hwdgl:"20%",hzcdgl:"70%",hywdgl:"10%"},
			    lgjc:[{"hbgs":"熊熊公司","lgbc":"001次","fjxh":"京B A001","jclgsj":"9:10","jclksl":"80"},
					    {"hbgs":"速巴公司","lgbc":"002次","fjxh":"冀B C001","jclgsj":"9:15","jclksl":"90"},
					    {"hbgs":"新余公司","lgbc":"003次","fjxh":"冀B V403","jclgsj":"9:20","jclksl":"85"}],
				bsyl:2

		}

		var tor_direc = function(containerId,data){
		    var tor_direc_chart = echarts.init(document.getElementById(containerId), 'dark');

		    var tor_direc_option = {
			    
			    tooltip: {                          // 提示框组件
			        trigger: 'axis',
			        axisPointer: { // 坐标轴指示器，坐标轴触发有效
			            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
			        }
			    },
			    legend: {
			        data: [
			        	 {
		                    name:'游客',
		                    textStyle:{
		                        color:'white'
		                    }
		                },
		                 {
		                    name:'运力',
		                    textStyle:{
		                        color:'white'
		                    }
		                }
			        ],
			        top:'18'
			    },
			    grid: {
			        left: '3%',
			        right: '5%',
			        bottom: '3%',
			        containLabel: true,
			        show: false                 // 网格边框是否显示，上和右边框 
			    },
			    xAxis: {
			        type: 'category',
			        boundaryGap: true,          // 坐标轴两边留白
			         lineStyle: {
		                        color: '#97cdfc',
		                        opacity: 0.5,
		                        width: 2
		                    },

		             axisLabel:{
		                    show: true,//是否显示刻度标签
		                    textStyle:{
		                        color:'#97cdfc'
		                    }
		                },
		                  axisLine:{
		                    lineStyle:{
		                        color:'#021979'
		                    }
		                },
		                 axisTick:{
		                    show: false//是否显示坐标轴刻度
		                },
			        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
			    },
			    yAxis: [                            // 双y坐标轴
			        {
			        name: '人数',
			        nameTextStyle:{
		            		color:'white'
		            	},
			        type: 'value',
			        splitLine: {                // 网格线 y轴对应的是否显示
			            show: false
			        },
			         axisTick:{
		                    show: false//是否显示坐标轴刻度
		                },
		             axisLine:{
		                    lineStyle:{
		                        color:'#021979'
		                    }
		                },
			        axisLabel: { 
			            formatter: '{value}',
			               show: true,//是否显示刻度标签
		                    textStyle:{
		                        color:'#97cdfc'
		                    }
			        }
			    },
			        {
			            show:false,
			            axisLine: {
			                lineStyle: {
			                    color: '#2f4554'
			                }
			        }
			    }],
			    
			    series: [
			        {
			            name:'游客',
			            type:'bar',
			           	color:'#65ffff',
			            //stack: '总量',
			           
			            data:datas1.zxTrueList
			        },
			        {
			            name:'运力',
			            type:'line',
			            yAxisIndex: 1,              // yAxisIndex 1 表示第二个y轴，默认为0
			            color:'yellow',
			            //stack: '总量',
			            data:datas1.tsTrueList
			        }
			    ]
		    }
		     tor_direc_chart.setOption(tor_direc_option);

		 }   

var refreshData=function(){ 
	//出租车监测  折线图
	tor_direc("tor_direc",datas1);
	
	//运力监测
	$("#tor_table tr td span").each(function(){
		var ids = $(this).attr("id");
		$(this).text(datas1.lkjcys[ids])
	})
	if(datas1.bsyl == 0){
		$("#spo_color").css("background","#66CC33");
		$("#spo_wen").text('充足');
	}else if(datas1.bsyl == 1){
		$("#spo_color").css("background","#FFCC00");
		$("#spo_wen").text('紧促');
	}else if(datas1.bsyl == 2){
		$("#spo_color").css("background","#DE0000");
		$("#spo_wen").text('不足');
	}
	//到港监测
	// $(".port_data tr td span").each(function(){
	// 	var ids = $(this).attr("id");
	// 	$(this).text(datas1.dgjc[ids])
	// })
	
	//巴士出站监测
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