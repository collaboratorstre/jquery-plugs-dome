 //  地图
 var map = new AMap.Map('map_container', {
			    resizeEnable: true,
			    zoom:12,
			    center: [115.469381,35.246531],
			    // mapStyle:'amap://styles/9520d22f7b2eb0a9dee2d26724da5f94'
			    //前往创建自定义地图样式：http://lbs.amap.com/dev/mapstyle/index
			    mapStyle: 'amap://styles/abf7911b652cccee6db8380c46d8e987'
			    // mapStyle: 'amap://styles/dark'
			});
            var icon = new AMap.Icon({
            	image: 'dian1.png',
            	size: new AMap.Size(15,15)
            });
            var markers = [];

            var infoWindow = new AMap.InfoWindow();

            $.get('json/execute.json',function(data){
            	console.log(data);
            	$.each(data.impCurGps,function(i,n){
            		console.log(n)
            		markers.push([n.lon,n.lat]);
            	})
            	console.log(markers.length);
            	for(var i = 0,len=markers.length; i<len;  i++){
               var marker;

                   marker = new AMap.Marker({
                   	icon: icon,
                   	position: markers[i],
                   	offset: new AMap.Pixel(-12,-12),
                   	zIndex: 101,
                   	map: map
                   })

                   // marker.content = data.impCurGps[i].regionName+'<br>'+data.impCurGps[i].gpsTime;
                   marker.content = '<div class="info_box">'+
                     '<div>卡口名称 : <span style="color:white;"> '+ data.impCurGps[i].plateNum +'</span></div>' +
                     '<div>预警时间 : <span style="color:white;"> '+ data.impCurGps[i].gpsTime +'</span></div>' +
                     '<div>预警类型 : <span style="color:white;"> '+ data.impCurGps[i].regionName +'</span></div>' +
                     '<div>车主姓名 : <span style="color:white;"> '+ data.impCurGps[i].pepName +'</span></div>' +
                     '<div>号牌号码 : <span style="color:white;"> '+ data.impCurGps[i].regionId +'</span></div>' +
                     '<div>号牌种类 : <span style="color:white;"> '+ data.impCurGps[i].plateType +'</span></div>' +
                   
                   '<div>'

                   marker.on('click',markerClick);
            	}
            	function markerClick(e){
                  infoWindow.setContent(e.target.content);
                  infoWindow.open(map, e.target.getPosition());
              }
            })
			var trafficLayer;
			var addTrafficLayer = function() {
			    // 实时路况图层
			    trafficLayer = new AMap.TileLayer.Traffic({
			        zIndex: 10
			    });
			    trafficLayer.setMap(map);
			};
	var addHeZe = function() {
			    // 加载行政区划插件
    AMap.service('AMap.DistrictSearch', function() {
		        var opts = {
		            subdistrict: 1,   // 返回下一级行政区
		            extensions: 'all',  // 返回行政区边界坐标组等具体信息
		            level: 'city'  // 查询行政级别为 市
		        };
		        // 实例化DistrictSearch
		        district = new AMap.DistrictSearch(opts);
		        district.setLevel('district');
		        // 行政区查询
		        district.search('菏泽市', function(status, result) {
		            var bounds = result.districtList[0].boundaries;
		            var polygons = [];
		            if (bounds) {
		                for (var i = 0, l = bounds.length; i < l; i++) {
		                    // 生成行政区划polygon
		                    var polygon = new AMap.Polygon({
		                        map: map,
		                        strokeWeight: 2,
		                        path: bounds[i],
		                        fillOpacity: 0.3,
		                        strokeWeight: 3,
		                        shadowOffsetX: 4,
		                        shadowOffsetY: 4,
		                        shadowBlur: 5,
		                        shadowColor: '#26e7e7',
		                        fillColor: '#000000',
		                        strokeColor: '#26e7e7'
		                    });
		                    polygons.push(polygon);
		                }
		                map.setFitView();// 地图自适应
		            }
		        });
		       
		    });
         } 
          $(document).ready(function(){
       	      addTrafficLayer();
	          addHeZe();
       })


 // 敏感区域车辆
 // 近30日主要时段分布
   var distru_title1=function(containerId,data){
    $("#"+containerId).empty();
     $.each(data,function(i,n){
     	var progressStr='<div class="progress-container">';
               progressStr+='<div class="progress-content">'
                + '<div class="totalFlow" style="width:'+n.value+'%;height:100%;background:#00ffff;border-radius:10px;"></div></div>'
                +'</div>'
                +'<div style="color: white;text-align: right;">'+ n.name +'<div>';
            $("#"+containerId).append($(progressStr));
     })

   }

//近30日主要出现卡口分布
 var bayonet_title1=function(containerId,data){
 	console.log(data);
    $("#"+containerId).empty();
     $.each(data,function(i,n){
     	var progressStr='<div class="progress-container">';
               progressStr+='<div class="progress-content">'
                + '<div class="totalFlow" style="height:'+(100-n.value)+'%;width:100%;background:#181717;"></div></div>'
                +'</div>'
                +'<div style="color: white;margin-top:58px;font-size:10px;float:left;width:13px;height:60px;margin-right: 3px;margin-left:2px;">'+ n.name +'<div>';
            $("#"+containerId).append($(progressStr));
     })

 }
 //敏感区域数据
 var sensitive_data=function(containerId,data){
 	
 	 $("#"+containerId).empty();
 	  $.each(data,function(i,n){
        var trStr = "<tr class='no-border no-border-x no-border-y'><td>"+n.region+"</td><td>"+n.numbers+"</td><td>"+n.types+"</td><td>"+n.times+"</td><td>"+((n.pos).substr(0,5)+'...')+"</td></tr>";
        
        $("#"+containerId).append(trStr);
    });
 }

 //逾期未年检车辆
//近30日主要出现卡口分布
 var overdue_title1=function(containerId,data){
 	console.log(data);
    $("#"+containerId).empty();
     $.each(data,function(i,n){
     	var progressStr='<div class="progress-container">';
               progressStr+='<div class="progress-content">'
                + '<div class="totalFlow" style="height:'+(100-n.value)+'%;width:100%;background:#181717;"></div></div>'
                +'</div>'
                +'<div style="color: white;margin-top:58px;font-size:10px;float:left;width:13px;height:60px;margin-right: 3px;margin-left:2px;">'+ n.name +'<div>';
            $("#"+containerId).append($(progressStr));
     })

 }
  // 近30日主要时段分布
   var distru_title2=function(containerId,data){
   	console.log(data);
    $("#"+containerId).empty();
     $.each(data,function(i,n){
     	var progressStr='<div class="progress-container">';
               progressStr+='<div class="progress-content">'
                + '<div class="totalFlow" style="width:'+n.value+'%;height:100%;background:#00ffff;border-radius:10px;"></div></div>'
                +'</div>'
                +'<div style="color: white;text-align: right;">'+ n.name +'<div>';
            $("#"+containerId).append($(progressStr));
     })

   }
 //未年检车辆数据
 var overdue_data=function(containerId,data){
 	
 	 $("#"+containerId).empty();
 	  $.each(data,function(i,n){
        var trStr = "<tr class='no-border no-border-x no-border-y'><td></td><td>"+n.numbers+"</td><td>"+n.types+"</td><td>"+n.times+"</td><td>"+((n.pos).substr(0,5)+'...')+"</td></tr>";
        
        $("#"+containerId).append(trStr);
    });
 }

 //假套牌车辆
 //近30日主要出现卡口分布
 var fake_title1=function(containerId,data){
 	console.log(data);
    $("#"+containerId).empty();
     $.each(data,function(i,n){
     	var progressStr='<div class="progress-container">';
               progressStr+='<div class="progress-content">'
                + '<div class="totalFlow" style="height:'+(100-n.value)+'%;width:100%;background:#181717;"></div></div>'
                +'</div>'
                +'<div style="color: white;margin-top:58px;font-size:10px;float:left;width:13px;height:60px;margin-right: 3px;margin-left:2px;">'+ n.name +'<div>';
            $("#"+containerId).append($(progressStr));
     })

 }
// 近30日主要时段分布
   var distru_title3=function(containerId,data){
   	console.log(data);
    $("#"+containerId).empty();
     $.each(data,function(i,n){
     	var progressStr='<div class="progress-container">';
               progressStr+='<div class="progress-content">'
                + '<div class="totalFlow" style="width:'+n.value+'%;height:100%;background:#00ffff;border-radius:10px;"></div></div>'
                +'</div>'
                +'<div style="color: white;text-align: right;">'+ n.name +'<div>';
            $("#"+containerId).append($(progressStr));
     })

   }
 //套牌数据
  var fake_data=function(containerId,data){
 	
 	 $("#"+containerId).empty();
 	  $.each(data,function(i,n){
        var trStr = "<tr class='no-border no-border-x no-border-y'><td></td><td>"+n.numbers+"</td><td>"+n.types+"</td><td>"+n.times+"</td><td>"+((n.pos).substr(0,5)+'...')+"</td></tr>";
        
        $("#"+containerId).append(trStr);
    });
 }
 
 //数据的统一处理
 var refreshData = function(){
    $.get("json/execute.json",function(data){
            
     distru_title1("distru_title1",data.timetru);
     bayonet_title1("bayonet_title1",data.bayonet);  
     sensitive_data("sensitive_data",data.sensitive); 
     
     overdue_title1("overdue_title1",data.overdue);
     distru_title2("distru_title2",data.timetru_one);
     overdue_data("overdue_data",data.overdue_data); 
     
     fake_title1("fake_title1",data.fake);
     distru_title3("distru_title3",data.timetru_two);
     fake_data("fake_data",data.fake_data);

		    	    });
		};
$(document).ready(function(){
    refreshData();
    // setInterval(function(){
    //     refreshData();
    // },30*1000);
});


