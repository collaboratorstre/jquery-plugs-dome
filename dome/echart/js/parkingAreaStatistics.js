
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
			text : '北京各区停车分布',
			// subtext : '人口密度数据来自Wikipedia',
			// sublink : 'http://'
		},
		tooltip : {
			trigger : 'item',
			formatter : '{b}<br/>{c} (个)'
		},
		toolbox : {
			show : false,
			orient : 'vertical',
			x : 'right',
			y : 'center',
			feature : {
				mark : {
					show : true
				},
				dataView : {
					show : true,
					readOnly : false
				},
				restore : {
					show : true
				},
				saveAsImage : {
					show : true
				}
			}
		},
		dataRange : {
			min : 30,
			max : 1600,
			text : [ 'High', 'Low' ],
			realtime : false,
			calculable : true,
			color : [ 'orangered', 'yellow', 'lightskyblue' ]
		},
		series : [ {
			name : '北京各区停车分布',
			type : 'map',
			mapType : 'CH', // 自定义扩展图表类型
			itemStyle : {
				normal : {
					label : {
						show : true
					}
				},
				emphasis : {
					label : {
						show : true
					}
				}
			},
			data : [
                {name:'东城区',value:568 },
                {name:'西城区',value:825 },
                {name:'朝阳区',value:1580},
                {name:'海淀区',value:1372},
                {name:'丰台区',value:820 },
                {name:'石景山区',value:220 },
                {name:'门头沟区',value:110 },
                {name:'房山区',value:195 },
                {name:'通州区',value:320 },
                {name:'顺义区',value:86  },
                {name:'大兴区',value:250 },
                {name:'昌平区',value:282 },
                {name:'平谷区',value:40  },
                {name:'怀柔区',value:36  },
                {name:'密云县',value:80  },
                {name:'延庆县',value:38  }],
			// 自定义名称映射
			/*nameMap : {
				'Central and Western' : '中西区',
				'Eastern' : '东区',
				'Islands' : '离岛',
				'Kowloon City' : '九龙城',
				'Kwai Tsing' : '葵青',
				'Kwun Tong' : '观塘',
				'North' : '北区',
				'Sai Kung' : '西贡',
				'Sha Tin' : '沙田',
				'Sham Shui Po' : '深水埗',
				'Southern' : '南区',
				'Tai Po' : '大埔',
				'Tsuen Wan' : '荃湾',
				'Tuen Mun' : '屯门',
				'Wan Chai' : '湾仔',
				'Wong Tai Sin' : '黄大仙',
				'Yau Tsim Mong' : '油尖旺',
				'Yuen Long' : '元朗'
			},*/
			// 文本位置修正
			textFixed : {
				'Yau Tsim Mong' : [ -10, 0 ]
			},
			// 文本直接经纬度定位
			geoCoord : {
				'Islands' : [ 113.95, 22.26 ]
			}
		} ]
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
function updataTable(counts) {
	var count = 0;
	var tb = document.getElementById('id_table'); //获取表格的dom节点
    $("table tbody").html("");
	var tbs = document.createElement("tbody");
	tb.appendChild(tbs);

	for(var i = 0; i < counts.length; i++) {
		var tr = document.createElement("tr");
		tr.className = "success";
		var td1 = document.createElement("td");
		td1.innerHTML = parkingAreas[i];
		tr.appendChild(td1);
		var td2 = document.createElement("td");
		td2.innerHTML = counts[i];
		tr.appendChild(td2);
		tbs.appendChild(tr);
		count = count + counts[i];
	}
	document.getElementById("id_p_count").innerHTML = count;

}
$(document).ready(function () {
	document.getElementsByTagName("*").item(0).style.cursor="pointer";
    require([
        'echarts',
        'echarts/chart/map'
    ], drawMap);
    updataTable(totalCounts);

    $('ul li').click(function(){
    	
    	var id = this.id;

    	var counts = null;
        if (this.id == "id_rodeside") {
         	document.getElementById("xiala2").innerHTML="路侧占道";
            counts = rodesideCounts;
        } else if (id == "id_underBridge") {
         	document.getElementById("xiala2").innerHTML="立交桥下";
         	counts = underBridgeCounts;
        }else if (id == "id_rodePublic") {
         	document.getElementById("xiala2").innerHTML="路外公共";
         	counts = rodePublicCounts;
        }else if (id == "id_housing") {
         	document.getElementById("xiala2").innerHTML="居住小区";
         	counts = housingCounts;
        }else if (id == "id_public2") {
         	document.getElementById("xiala2").innerHTML="公建配建";
         	counts = public2Counts;
        }else if (id == "id_yard") {
         	document.getElementById("xiala2").innerHTML="单位大院";
         	counts = yardCounts;
        } else if (id == "id_other") {
         	document.getElementById("xiala2").innerHTML="其他类型";
         	counts = otherCounts;
        }
        if(id=="id_li_1"){
        	    document.getElementById("id_btn_group2").style.visibility = "hidden";
        		document.getElementById("xiala1").innerHTML="停车资源分布统计";
        		counts = totalCounts;
        }
        else if(id=="id_li_2"){
           	document.getElementById("id_btn_group2").style.visibility = "visible";
         	document.getElementById("xiala1").innerHTML="停车资源分类统计";
         	document.getElementById("xiala2").innerHTML="路侧占道";
         	counts = rodesideCounts;
         	
        }
        
        document.getElementById("id_p_count").innerHTML = "";
        if (counts != null) {
            var param = new optionParam(Math.min.apply(null, counts), Math.max.apply(null, counts), wrapData(parkingAreas, counts));
            chartUpdate(param);
            updataTable(counts);
            
            
		}

    });
});
