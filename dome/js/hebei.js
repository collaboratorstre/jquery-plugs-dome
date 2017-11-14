//天气
 var showLocale = function(objD) {
				    var str, colorhead, colorfoot;
				    var yy = objD.getYear();
				    if (yy < 1900) yy = yy + 1900;
				    var MM = objD.getMonth() + 1;
				    if (MM < 10) MM = '0' + MM;
				    var dd = objD.getDate();
				    if (dd < 10) dd = '0' + dd;
				    var hh = objD.getHours();
				    if (hh < 10) hh = '0' + hh;
				    var mm = objD.getMinutes();
				    if (mm < 10) mm = '0' + mm;
				    var ss = objD.getSeconds();
				    if (ss < 10) ss = '0' + ss;
				    var ww = objD.getDay();
				    if (ww == 0) colorhead = "";
				    if (ww > 0 && ww < 6) colorhead = "";
				    if (ww == 6) colorhead = "";
				    if (ww == 0) ww = "星期日";
				    if (ww == 1) ww = "星期一";
				    if (ww == 2) ww = "星期二";
				    if (ww == 3) ww = "星期三";
				    if (ww == 4) ww = "星期四";
				    if (ww == 5) ww = "星期五";
				    if (ww == 6) ww = "星期六";
				    colorfoot = ""
				    str = "<div class='rj' style='font-size:14px;font-weight:bold;line-height:40px;'>" + colorhead + yy + "-" + MM + "-" + dd + " " + ww + colorfoot + "</div>"
				        + "<div class='sj' style='font-size:41px;font-weight:bold;line-height:35px;'>" + colorhead + hh + ":" + mm + " " + colorfoot + "</div>";
				    return (str);
				}

				var tick = function(cssSelector) {
				    var today;
				    today = new Date();
				    $(cssSelector).html(showLocale(today));
				    window.setTimeout("tick('" + cssSelector + "')", 60*1000);
				};
				//天气
				var getWeather = function(){
				    $.getScript('http://php.weather.sina.com.cn/iframe/index/w_cl.php?code=js&day=0&city=北京&dfc=1&charset=utf-8',function(a){
				        var weatherCode = {};
				        weatherCode["晴"] = "0.png";
				        weatherCode["多云"] = "1.png";
				        weatherCode["阴"] = "2.png";
				        weatherCode["阵雨"] = "3.png";
				        weatherCode["雷阵雨"] = "4.png";
				        weatherCode["雷阵雨伴有冰雹"] = "5.png";
				        weatherCode["雨夹雪"] = "6.png";
				        weatherCode["小雨"] = "7.png";
				        weatherCode["中雨"] = "8.png";
				        weatherCode["大雨"] = "9.png";
				        weatherCode["暴雨"] = "10.png";
				        weatherCode["大暴雨"] = "11.png";
				        weatherCode["特大暴雨"] = "12.png";
				        weatherCode["阵雪"] = "13.png";
				        weatherCode["小雪"] = "14.png";
				        weatherCode["中雪"] = "15.png";
				        weatherCode["大雪"] = "16.png";
				        weatherCode["暴雪"] = "17.png";
				        weatherCode["雾"] = "18.png";
				        weatherCode["冻雨"] = "19.png";
				        weatherCode["沙尘暴"] = "20.png";
				        weatherCode["小雨-中雨"] = "21.png";
				        weatherCode["中雨-大雨"] = "22.png";
				        weatherCode["大雨-暴雨"] = "23.png";
				        weatherCode["暴雨-大暴雨"] = "24.png";
				        weatherCode["大暴雨-特大暴雨"] = "25.png";
				        weatherCode["小雪-中雪"] = "26.png";
				        weatherCode["中雪-大雪"] = "27.png";
				        weatherCode["大雪-暴雪"] = "28.png";
				        weatherCode["浮尘"] = "29.png";
				        weatherCode["扬沙"] = "30.png";
				        weatherCode["强沙尘暴"] = "31.png";
				        weatherCode["浓雾"] = "32.png";
				        weatherCode["台风"] = "39.png";
				        weatherCode["强浓雾"] = "49.png";
				        weatherCode["霾"] = "53.png";
				        weatherCode["中毒霾"] = "54.png";
				        weatherCode["重度霾"] = "55.png";
				        weatherCode["严重霾"] = "56.png";
				        weatherCode["大雾"] = "57.png";
				        weatherCode["特强浓雾"] = "58.png";
				        weatherCode["无"] = "99.png";
				        weatherCode["雨"] = "301.png";
				        weatherCode["雪"] = "302.png";

				        var s="重庆",r="",q="";
				        for(s in window.SWther.w){
				            q=SWther.w[s][0];
				//	        r={city:s,date:SWther.add.now.split(" ")[0]||"",day_weather:q.s1,night_weather:q.s2,day_temp:q.t1,night_temp:q.t2,day_wind:q.p1,night_wind:q.p2};
				            if(weatherCode[q.s1] != null && weatherCode[q.s1] != undefined){
				                $("#img").html("<img alt='"+q.s1+"' src='../weather/"+weatherCode[q.s1]+"' style='width:60px;'>");
				                $("#msg").html(q.s1+q.t2+"-"+q.t1+"℃");
				//	        	alert(q.s1+" "+q.t1+"-"+q.t2)
				            }
				        }
				    });
				}
	//调转
	$("#zdclxq").click(function(){
    window.open("http://localhost/dome/%E6%B2%B3%E5%8C%97/flow.html")
    })
    
	$("#jrwfxq").click(function(){
    window.open("http://localhost/dome/%E6%B2%B3%E5%8C%97/transgress.html")
    })
    
    //  地图
 var map = new AMap.Map('hebei_map', {
			    resizeEnable: true,
			    zoom:12,
			    center: [114.48,38.03],
			    // mapStyle:'amap://styles/9520d22f7b2eb0a9dee2d26724da5f94'
			    //前往创建自定义地图样式：http://lbs.amap.com/dev/mapstyle/index
			    mapStyle: 'amap://styles/b7060f3c169f3bbd73b5deccdc9942bf'
			    // mapStyle: 'amap://styles/dark'
			});
            var icon = new AMap.Icon({
            	image: '../img/fenliu.png',
            	size: new AMap.Size(20,20)
            });
            // console.log(icon);
           
            var icon1 = new AMap.Icon({
            	image: '../img/yidu.png',
            	size: new AMap.Size(20,20)
            });

            var icon2 = new AMap.Icon({
            	image: '../img/wuqu.png',
            	size: new AMap.Size(20,20)
            });
            
             var markers = [];
            var markers1 = [];
            var markers2 = [];

    
            
              // 
         $.get('../json/hebeishuju.json',function(data){

		    //地图中的单选和多选
		    $('.select_head').click(function() {
		    	if($("#more_select").css("display")=="none"){
		    		$("#more_select").css("display","block")
		    	}else {
		    		$("#more_select").css("display","none")
		    	}
		    })

		    var  selectArr = [];
		    $(".select_conent").click(function() {
		    	console.log($(this).siblings("span").text())
		    	var spanText = $(this).siblings("span").text();
		    	console.log($(this).prop("checked"));
		    	var check = $(this).prop("checked");
		    	if(check == true) {
		    		selectArr.push(spanText);
		    		console.log(selectArr);
                    $.each(selectArr,function(i,n){
                    	// if(n == '分流点' || n == '易堵点' || n == '雾区'){
                              if(n == '分流点'){
                     //          	     $.each(data.fenliudian,function(i,n){
							              // markers.push([n.lon,n.lat]);

							              // 						             })
                              	      for(var i = 0,len=data.fenliudian.length; i<len;  i++){
										               var marker;

										               marker = new AMap.Marker({
										                icon: icon,
										                position: [data.fenliudian[i].lon,data.fenliudian[i].lat],
										                offset: new AMap.Pixel(-12,-12),
										                zIndex: 101,
										                map: map
										               })
										               markers.push(marker);
										               console.log(markers);
										             
										           }
                              }else if(n == '易堵点'){
                   //            	 $.each(data.yidudian,function(i,n){
						             //      markers1.push([n.lon,n.lat]);
						             // })
                              	   for(var i = 0,len=data.yidudian.length; i<len; i++){
						           	    marker = new AMap.Marker({
						                icon: icon1,
						                position: [data.yidudian[i].lon,data.yidudian[i].lat],
						                offset: new AMap.Pixel(-12,-12),
						                zIndex: 101,
						                map: map
						               })
						           	    markers1.push(marker);
						           	    console.log(markers1);
						           }
                              }else if(n == '雾区'){
                  //             	$.each(data.wuqu,function(i,n){
					             //      markers2.push([n.lon,n.lat]);
					             // })
                              	 for(var i = 0,len=data.wuqu.length; i<len; i++){
						           	    marker = new AMap.Marker({
						                icon: icon2,
						                position: [data.wuqu[i].lon,data.wuqu[i].lat],
						                offset: new AMap.Pixel(-12,-12),
						                zIndex: 101,
						                map: map
						               })
						           	    markers2.push(marker);
						           	    console.log(markers2);
						           }
                              }
                    	// }
                    })
                  // console.log(AMap)
		    	}else { 
		    		for(var i=0;i<selectArr.length;i++) {
		　　　　　　　　　　if(selectArr[i]==spanText) {
		                        selectArr.splice(i,1);
		                       if (spanText == '分流点') {
		                       	       for(var i =0; i<markers.length;i++){
										           markers[i].setMap(null);
										       }
		                       	
		                       }else if(spanText == '易堵点'){
		                       	 for(var i =0; i<markers1.length;i++){
										           markers1[i].setMap(null);
										       }
		                       }else{
		                       	 for(var i =0; i<markers2.length;i++){
										           markers2[i].setMap(null);
										       }
		                       }
		                      
		                      
                                 
		                    }	
		    		}
		       
		          //      for(var i =0; i<markers.length;i++){
					       //     markers[i].setMap(null);
					       // }
					}

		    })

           
           //   $.each(data.fenliudian,function(i,n){
           //    markers.push([n.lon,n.lat]);
           //   })
           //    $.each(data.yidudian,function(i,n){
           //        markers1.push([n.lon,n.lat]);
           //   })
           //    $.each(data.wuqu,function(i,n){
           //        markers2.push([n.lon,n.lat]);
           //   })

             
           //  for(var i = 0,len=markers.length; i<len;  i++){
           //     var marker;

           //     marker = new AMap.Marker({
           //      icon: icon,
           //      position: markers[i],
           //      offset: new AMap.Pixel(-12,-12),
           //      zIndex: 101,
           //      map: map
           //     })
             
           // }
           // for(var i = 0,len=markers1.length; i<len; i++){
           // 	    marker = new AMap.Marker({
           //      icon: icon1,
           //      position: markers1[i],
           //      offset: new AMap.Pixel(-12,-12),
           //      zIndex: 101,
           //      map: map
           //     })
           // }
           //  for(var i = 0,len=markers2.length; i<len; i++){
           // 	    marker = new AMap.Marker({
           //      icon: icon2,
           //      position: markers2[i],
           //      offset: new AMap.Pixel(-12,-12),
           //      zIndex: 101,
           //      map: map
           //     })
           // }
          
          $("#sle").change(function(){
          	var options = $(this).val();
          	console.log(options);
          	if (options == '全省高速路网') {
          		map.setZoomAndCenter(9, [114.48,38.03]);
          	}else if(options == '环京高速路网'){
          		map.setZoomAndCenter(9, [116.3,39.9]);
          	}else if(options == '涉署高速路网'){
          		map.setZoomAndCenter(9,[115.464589,38.874434]);
          	}
          })

       })
    
            // var infoWindow = new AMap.InfoWindow();

            // $.get('json/execute.json',function(data){
            	// console.log(data);
            	// $.each(data.impCurGps,function(i,n){
            	// 	console.log(n)
            	// 	markers.push([n.lon,n.lat]);
            	// })
            	// console.log(markers.length);
            	// for(var i = 0,len=markers.length; i<len;  i++){
             //   var marker;

             //       marker = new AMap.Marker({
             //       	icon: icon,
             //       	position: markers[i],
             //       	offset: new AMap.Pixel(-12,-12),
             //       	zIndex: 101,
             //       	map: map
             //       })

             //       // marker.content = data.impCurGps[i].regionName+'<br>'+data.impCurGps[i].gpsTime;
             //       marker.content = '<div class="info_box">'+
             //         '<div>卡口名称 : <span style="color:white;"> '+ data.impCurGps[i].plateNum +'</span></div>' +
             //         '<div>预警时间 : <span style="color:white;"> '+ data.impCurGps[i].gpsTime +'</span></div>' +
             //         '<div>预警类型 : <span style="color:white;"> '+ data.impCurGps[i].regionName +'</span></div>' +
             //         '<div>车主姓名 : <span style="color:white;"> '+ data.impCurGps[i].pepName +'</span></div>' +
             //         '<div>号牌号码 : <span style="color:white;"> '+ data.impCurGps[i].regionId +'</span></div>' +
             //         '<div>号牌种类 : <span style="color:white;"> '+ data.impCurGps[i].plateType +'</span></div>' +
                   
             //       '<div>'

             //       marker.on('click',markerClick);
            	// }
            	// function markerClick(e){
             //      infoWindow.setContent(e.target.content);
             //      infoWindow.open(map, e.target.getPosition());
             //  }
            // })
			// var trafficLayer;
			// var addTrafficLayer = function() {
			//     // 实时路况图层
			//     trafficLayer = new AMap.TileLayer.Traffic({
			//         zIndex: 10
			//     });
			//     trafficLayer.setMap(map);
			// };
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
		        district.search('河北省', function(status, result) {
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
		                map.setZoomAndCenter(9, [114.48,38.03]);
		            }
		        });
		       
		    });
         } 
          $(document).ready(function(){
       	      // addTrafficLayer();
	          addHeZe();
       })
          
     
    // 卡口排名
          var kakoupaiming = function(containerId,data){
		    $("#"+containerId).empty();
		    if(data && data.length > 0){
		        var maxValue = data[0].count;
		        if(maxValue < 1) maxValue = 1;
		        $.each(data,function(i,n){
		            var progress = $("<div class='progress-container'><div class='progress-title'>" + n.name + "</div>"
		                + "<div class='progress-content'>"
		                + "<div class='legalRate' style='width:" + (n.count/maxValue)*100 + "%;'>"
		                + "<div class='shuzi' style='color: white;'>" + n.count + "</div></div></div>"
		                + "<div style='width: 20%;box-sizing: border-box;padding: 2.4% 6%;'><i class='fa fa-lg'></i></div></div>");
		            if(n.trend > 0) {
		                var icon = progress.find("i");
		                icon.addClass("fa-arrow-up");
		                icon.css("color", "red");
		            }
		            else if(n.trend < 0) {
		                var icon = progress.find("i");
		                icon.addClass("fa-arrow-down");
		                icon.css("color", "green");
		            }
		            else {
		                var icon = progress.find("i");
		                icon.addClass("fa-minus");
		                icon.css("color", "#2678d7");
		            }
		            $("#"+containerId).append(progress);
		        })
		    }else{
		        $("#"+containerId).html("<span>暂时没有数据</span>")
		    }
		};
       //收费站流量排名
          var totel_pm = function(containerId,data){
		    $("#"+containerId).empty();
		    if(data && data.length > 0){
		        var maxValue = data[0].count;
		        if(maxValue < 1) maxValue = 1;
		        $.each(data,function(i,n){
		            var progress = $("<div class='progress-container'><div class='progress-title'>" + n.name + "</div>"
		                + "<div class='progress-content'>"
		                + "<div class='legalRate' style='width:" + (n.count/maxValue)*100 + "%;'>"
		                + "<div class='shuzi' style='color: white;'>" + n.count + "</div></div></div>"
		                + "<div style='width: 20%;box-sizing: border-box;padding: 2.4% 6%;'><i class='fa fa-lg'></i></div></div>");
		            if(n.trend > 0) {
		                var icon = progress.find("i");
		                icon.addClass("fa-arrow-up");
		                icon.css("color", "red");
		            }
		            else if(n.trend < 0) {
		                var icon = progress.find("i");
		                icon.addClass("fa-arrow-down");
		                icon.css("color", "green");
		            }
		            else {
		                var icon = progress.find("i");
		                icon.addClass("fa-minus");
		                icon.css("color", "#2678d7");
		            }
		            $("#"+containerId).append(progress);
		        })
		    }else{
		        $("#"+containerId).html("<span>暂时没有数据</span>")
		    }
		};   

   //车辆类型排名top10
    var cllxpm = function(containerId,data){
	    $("#"+containerId).empty();
	    // console.log(data);
	     var chart_type = echarts.init(document.getElementById(containerId));
	     var arr1 = [];
	    $.each(data,function(i,n){
	        arr1.push(n.name);
	    })
	    // console.log(arr1);
	     option = {
	                 color:["#f7ca43","#fd6354","#79a5c7","#46d3be","#70cf28","#c78127","#d27d6b","#bf3037","#2a3f5a"],

	               tooltip : {
	                          trigger: 'item',
	                            // formatter: "{a} <br/>{b} : {c} ({d}%)",
	                          formatter:  function(data){
	                                  return  '全省'+data.name +'通行总量<br><span style="color: yellow;font-size: 20px;margin-left: 40px;">'+data.value + '</span>辆';
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

 //外省外埠车辆来源排名
var traveltime = function(containerId,data){
 
        $("#"+containerId).empty();
       data = data.sort(function(a,b){
        return a.value<b.value;
        })
          if(data){
            $.each(data,function(i,n){
               progressStr = "<tr><td>"+(i+1)+"</td><td>"+n.name+"</td><td>"+n.value+"</td></tr>"
              $("#"+containerId).append($(progressStr));
            })
    }else{
      $("#"+containerId).html("<span>暂时没有数据</span>")
    }
 }


  //数据的统一处理
  var refreshData = function(){
    $.get("../json/hebeishuju.json",function(data){
      // console.log(data);
        //top 实时流量 外埠机动车 重点车辆流量 今日违法
    $('#ssll_Total').html(data.ssll + '<span>辆</span>');
    $('#wbjdc_Total').html(data.wbjdc + '<span>辆</span>');
    $('#zdc_Total').html(data.zdclll+'<span>辆</span>')
    $('#jrwf_Total').html(data.jrsf+'<span>辆</span>')
     // 卡口排名
        kakoupaiming("bay_rank",data.kkllpm); 
     // 收费站流量排名
        totel_pm("totel_pm",data.sfzllpm);
     //车辆类型排名top10
        cllxpm('cllxpm',data.cllxpm); 
     //外省外埠车辆来源排名
        traveltime('hour_content',data.wswbclpm);
    	    });
 
}; 
    
     //地图中的单选和多选
//     $('.select_head').click(function() {
//     	if($("#more_select").css("display")=="none"){
//     		$("#more_select").css("display","block")
//     	}else {
//     		$("#more_select").css("display","none")
//     	}
//     })

//     var  selectArr = [];
//     $(".select_conent").click(function() {
//     	console.log($(this).siblings("span").text())
//     	var spanText = $(this).siblings("span").text();
//     	console.log($(this).prop("checked"));
//     	var check = $(this).prop("checked");
//     	if(check == true) {
//     		selectArr.push(spanText);
//     		console.log(selectArr);

//     	}else { 
//     		for(var i=0;i<selectArr.length;i++) {
// 　　　　　　　　　　if(selectArr[i]==spanText) {
//                         selectArr.splice(i,1);
//                         console.log(selectArr)
//                     }
//     		}
//     	}

//     })

    $(document).ready(function(){
    	          refreshData();
		          tick("#time");
		          getWeather();
		       })  