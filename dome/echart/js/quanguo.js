
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
var area_chart_option;

function drawMap(ec) {

    require('echarts/util/mapData/params').params.CH = {
        getGeoJson: function (callback) {
            $.getJSON(basePath+'/frame/charts/echarts-2.2.7/doc/example/geoJson/china-main-city/110100.json',callback);
        }
    }

	myChart = ec.init(document.getElementById('id_area_chart'));
	area_chart_option = {
    title : {
        text: 'iphone销量',
        subtext: '纯属虚构',
        x:'center'
    },
    tooltip : {
        trigger: 'item'
    },
    legend: {
        orient: 'vertical',
        x:'left',
        data:['iphone3','iphone4','iphone5']
    },
    dataRange: {
        min: 0,
        max: 2500,
        x: 'left',
        y: 'bottom',
        text:['高','低'],           // 文本，默认为数值文本
        calculable : true
    },
    toolbox: {
        show: true,
        orient : 'vertical',
        x: 'right',
        y: 'center',
        feature : {
            mark : {show: true},
            dataView : {show: true, readOnly: false},
            restore : {show: true},
            saveAsImage : {show: true}
        }
    },
    roamController: {
        show: true,
        x: 'right',
        mapTypeControl: {
            'china': true
        }
    },
    series : [
        {
            name: 'iphone3',
            type: 'map',
            mapType: 'china',
            roam: false,
            itemStyle:{
                normal:{label:{show:true}},
                emphasis:{label:{show:true}}
            },
            data:[
                {name: '北京',value: Math.round(Math.random()*1000)},
                {name: '天津',value: Math.round(Math.random()*1000)},
                {name: '上海',value: Math.round(Math.random()*1000)},
                {name: '重庆',value: Math.round(Math.random()*1000)},
                {name: '河北',value: Math.round(Math.random()*1000)},
                {name: '河南',value: Math.round(Math.random()*1000)},
                {name: '云南',value: Math.round(Math.random()*1000)},
                {name: '辽宁',value: Math.round(Math.random()*1000)},
                {name: '黑龙江',value: Math.round(Math.random()*1000)},
                {name: '湖南',value: Math.round(Math.random()*1000)},
                {name: '安徽',value: Math.round(Math.random()*1000)},
                {name: '山东',value: Math.round(Math.random()*1000)},
                {name: '新疆',value: Math.round(Math.random()*1000)},
                {name: '江苏',value: Math.round(Math.random()*1000)},
                {name: '浙江',value: Math.round(Math.random()*1000)},
                {name: '江西',value: Math.round(Math.random()*1000)},
                {name: '湖北',value: Math.round(Math.random()*1000)},
                {name: '广西',value: Math.round(Math.random()*1000)},
                {name: '甘肃',value: Math.round(Math.random()*1000)},
                {name: '山西',value: Math.round(Math.random()*1000)},
                {name: '内蒙古',value: Math.round(Math.random()*1000)},
                {name: '陕西',value: Math.round(Math.random()*1000)},
                {name: '吉林',value: Math.round(Math.random()*1000)},
                {name: '福建',value: Math.round(Math.random()*1000)},
                {name: '贵州',value: Math.round(Math.random()*1000)},
                {name: '广东',value: Math.round(Math.random()*1000)},
                {name: '青海',value: Math.round(Math.random()*1000)},
                {name: '西藏',value: Math.round(Math.random()*1000)},
                {name: '四川',value: Math.round(Math.random()*1000)},
                {name: '宁夏',value: Math.round(Math.random()*1000)},
                {name: '海南',value: Math.round(Math.random()*1000)},
                {name: '台湾',value: Math.round(Math.random()*1000)},
                {name: '香港',value: Math.round(Math.random()*1000)},
                {name: '澳门',value: Math.round(Math.random()*1000)}
            ]
        },
        {
            name: 'iphone4',
            type: 'map',
            mapType: 'china',
            itemStyle:{
                normal:{label:{show:true}},
                emphasis:{label:{show:true}}
            },
            data:[
                {name: '北京',value: Math.round(Math.random()*1000)},
                {name: '天津',value: Math.round(Math.random()*1000)},
                {name: '上海',value: Math.round(Math.random()*1000)},
                {name: '重庆',value: Math.round(Math.random()*1000)},
                {name: '河北',value: Math.round(Math.random()*1000)},
                {name: '安徽',value: Math.round(Math.random()*1000)},
                {name: '新疆',value: Math.round(Math.random()*1000)},
                {name: '浙江',value: Math.round(Math.random()*1000)},
                {name: '江西',value: Math.round(Math.random()*1000)},
                {name: '山西',value: Math.round(Math.random()*1000)},
                {name: '内蒙古',value: Math.round(Math.random()*1000)},
                {name: '吉林',value: Math.round(Math.random()*1000)},
                {name: '福建',value: Math.round(Math.random()*1000)},
                {name: '广东',value: Math.round(Math.random()*1000)},
                {name: '西藏',value: Math.round(Math.random()*1000)},
                {name: '四川',value: Math.round(Math.random()*1000)},
                {name: '宁夏',value: Math.round(Math.random()*1000)},
                {name: '香港',value: Math.round(Math.random()*1000)},
                {name: '澳门',value: Math.round(Math.random()*1000)}
            ]
        },
        {
            name: 'iphone5',
            type: 'map',
            mapType: 'china',
            itemStyle:{
                normal:{label:{show:true}},
                emphasis:{label:{show:true}}
            },
            data:[
                {name: '北京',value: Math.round(Math.random()*1000)},
                {name: '天津',value: Math.round(Math.random()*1000)},
                {name: '上海',value: Math.round(Math.random()*1000)},
                {name: '广东',value: Math.round(Math.random()*1000)},
                {name: '台湾',value: Math.round(Math.random()*1000)},
                {name: '香港',value: Math.round(Math.random()*1000)},
                {name: '澳门',value: Math.round(Math.random()*1000)}
            ]
        }
    ]
};
                    
	myChart.setOption(area_chart_option);
}

//停车场静态数据
var parkingAreas = new Array('东城区','西城区','朝阳区','海淀区','丰台区','石景山区','门头沟区','房山区','通州区','顺义区','大兴区','昌平区','平谷区','怀柔区','密云县','延庆县');
var totalCounts = new Array(568,825,1580,1372,820,220,110,195,320,86,250,282,40,36,80,38);
//路测
var rodesideCounts = new Array(84,188,74,87,31,27,1,3,12,0,1,0,0,0,0,13);
// 立交桥下
var underBridgeCounts = new Array(4,6,9,1,1,0,6,0,0,0,0,0,0,0,0,0);
//路外公共
var rodePublicCounts = new Array(87,62,584,78,159,20,40,75,100,25,34,93,26,16,28,25);
//居住小区
var housingCounts = new Array(149,190,659,528,391,110,63,107,206,49,139,188,14,5,39,0);
//公建配建
var public2Counts = new Array(157,166,170,551,146,44,0,2,1,12,75,0,0,0,8,0);
//单位大院
var yardCounts = new Array(86,135,84,126,40,19,0,3,0,0,0,0,0,0,5,0);
//其他类型
var otherCounts = new Array(1,78,0,1,52,0,0,5,1,0,1,1,0,15,0,0);

function refreshData(flag){

    var param = new optionParam(0, 200, wrapData(parkingAreas, rodesideCounts));
    chartUpdate(param)
}
function optionParam(min, max, seriesData) {
	this.min = min;
	this.max = max;
	this.seriesData = seriesData;
}
function chartUpdate(optionParam) {
    area_chart_option.dataRange.min= optionParam.min;
    area_chart_option.dataRange.max= optionParam.max;
    area_chart_option.series[0].data=optionParam.seriesData;

    myChart.setOption(area_chart_option);
}

function wrapData(names, counts) {
    var data=new Array();
    for (var i = 0; i< names.length; i++){
        var o = new Object();
        o.name = names[i];
        o.value=counts[i];
        data.push(o);
    }
    return data;
}

$(document).ready(function () {
	document.getElementsByTagName("*").item(0).style.cursor="pointer";
    require([
        'echarts',
        'echarts/chart/map'
    ], drawMap);


    
});
