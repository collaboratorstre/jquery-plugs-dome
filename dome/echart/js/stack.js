function getRootPath_web() {
    //获取当前网址，如： http://localhost:8083/uimcardprj/share/meun.jsp
    var curWwwPath = window.document.location.href;
    //获取主机地址之后的目录，如： uimcardprj/share/meun.jsp
    var pathName = window.document.location.pathname;
    var pos = curWwwPath.indexOf(pathName);
    //获取主机地址，如： http://localhost:8083
    var localhostPaht = curWwwPath.substring(0, pos);
    //获取带"/"的项目名，如：/uimcardprj
    var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
    return (localhostPaht + projectName);
}
var basePath = getRootPath_web();

 // 路径配置
require.config({
	paths : {
		echarts : basePath + '/frame/charts/echarts-2.2.7/build/dist'
	}
});
var myChart;
var stack_chart_option;


function drawMap(ec) {

	myChart = ec.init(document.getElementById('id_stack_chart'));
    stack_chart_option = {
    tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    legend: {
        data:['通过车次', '检查车次']
    },
    toolbox: {
        show : true,
        feature : {
            mark : {show: true},
            dataView : {show: true, readOnly: false},
            magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
            restore : {show: true},
            saveAsImage : {show: true}
        }
    },
    calculable : true,
    xAxis : [
        {
            type : 'value'
        }
    ],
    yAxis : [
        {
            type : 'category',
            data : ['衡水','沧州','廊坊','承德','唐山','邢台','保定','秦皇岛','张家口','邯郸','石家庄']
        }
    ],
    series : [
        {
            name:'通过车次',
            type:'bar',
            stack: '总量',
            itemStyle : { normal: {label : {show: true, position: 'insideRight'}}},
            data:[320, 302, 301, 334, 390, 330, 320, 302, 301, 334, 390]
        },
        {
            name:'检查车次',
            type:'bar',
            stack: '总量',
            itemStyle : { normal: {label : {show: true, position: 'insideRight'}}},
            data:[120, 132, 101, 134, 90, 230, 210, 132, 101, 134, 90]
        }
        
    ]
};
                      
               	
	myChart.setOption(stack_chart_option);
}
$(document).ready(function () {
	document.getElementsByTagName("*").item(0).style.cursor="pointer";
    require([
        'echarts',
        'echarts/chart/bar'
    ], drawMap);


    
});