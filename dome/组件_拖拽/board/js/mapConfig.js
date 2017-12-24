/**
 *　　　　　　　　┏┓　　　┏┓+ +
 *　　　　　　　┏┛┻━━━┛┻┓ + +
 *　　　　　　　┃　　　　　　　┃ 　
 *　　　　　　　┃　　　━　　　┃ ++ + + +
 *　　　　　　 ████━████ ┃+
 *　　　　　　　┃　　　　　　　┃ +
 *　　　　　　　┃　　　┻　　　┃
 *　　　　　　　┃　　　　　　　┃ + +
 *　　　　　　　┗━┓　　　┏━┛
 *　　　　　　　　　┃　　　┃　　　　　　　　　　　
 *　　　　　　　　　┃　　　┃ + + + +
 *　　　　　　　　　┃　　　┃　　　　Code is far away from bug with the animal protecting　　　　　　　
 *　　　　　　　　　┃　　　┃ + 　　　　神兽保佑,代码无bug　　
 *　　　　　　　　　┃　　　┃
 *　　　　　　　　　┃　　　┃　　+　　　　　　　　　
 *　　　　　　　　　┃　 　　┗━━━┓ + +
 *　　　　　　　　　┃ 　　　　　　　┣┓
 *　　　　　　　　　┃ 　　　　　　　┏┛
 *　　　　　　　　　┗┓┓┏━┳┓┏┛ + + + +
 *　　　　　　　　　　┃┫┫　┃┫┫
 *　　　　　　　　　　┗┻┛　┗┻┛+ + + +
 */
/*
 *  类   描  述: 地图中间层API
 *  创建时间：2017-4-25
 *  作者:	 rxz
 *  操作: 增加全局地图配置信息
 */
//定义全局地图对象
var map = null;
/*var projectPath = "/EHL_BSFrame/";
var localObj = "192.168.2.41:7080";//window.location.host;
var localProt = "8080";
var maphost = "";*/
var themeLayer = null;
var trafficLayer = null;// 路况图层
//var JQLayer=null;//警情图层
//var JYLayer=null;//警员图层
//var SXJLayer=null;//摄像机图层
var ImgUrl4Gis=getRootPath()+"/gis/images/";//http://localhost:9080/Duty_CmdDispatch/gis/images/
var Url4GpsData="http://192.168.2.27:8080/EHL_GPS/gpsservice";//默认请求GPS定位数据的服务地址,可通过初始化参数传入
var array4JQ=new Array();//警情marker数组/暂时不用
var array4JY=new Array();//警员marker数组
var array4SXJ=new Array();//摄像机marker数组
//清空警情、警员、摄像机等数组
var clearArray=function(array){
	array.splice(0,array.length);//清空数组
};
var hashMap4JY = {  
    Set : function(key,value){this[key] = value;},  
    Get : function(key){return this[key];},  
    Contains : function(key){return this.Get(key) == null?false:true;},  
    Remove : function(key){delete this[key];},
    Clear:function(){
		for(var key in this){
			if(key=="Set"||key=="Get"||key=="Contains"||key=="Remove"||key=="Clear")
			continue;
			delete this[key];
		}
	}
};
var _infowindow=null;
var _circle4JQ=null;//显示某个警情范围时使用的圆marker
function getRootPath(){
	var strFullPath=window.document.location.href;
	var strPath=window.document.location.pathname;
	var pos=strFullPath.indexOf(strPath);
	var prePath=strFullPath.substring(0,pos);
	var postPath=strPath.substring(0,strPath.substr(1).indexOf('/')+1);
	return(prePath+postPath);
};
var _moveMarker;
var _lonlatArray;
var _allTime;
var _endEvt;
function repeatMoveMarker(){//lonlatArray,moveMarker,allTime
	map.closeInfoWindow();
	_moveMarker.moveToLonlat(_lonlatArray[0]);
	_moveMarker.startMove(_lonlatArray,_allTime);
}
function removeHistory(){
	map.closeInfoWindow();
	map.clearOverlays();
	_endEvt();
}
/**
 * 初始化GIS接口
 * @param {} opts
 * {
 * mapid、center、minZoom、maxZoom、initZoom、circleR
 * map_gpsService_url 请求GPS定位数据的服务地址
 * }
 */
function MapConfig(opts) {
	this.currentLevel = 11;
	this.toolBar = null; // 工具栏
	
	//rxz
	this.mapid='map';
	this.projection='EPSG:4326';
	this.center=[125.3542515,43.844127];
	this.minZoom=9;
	this.maxZoom=21;
	this.initZoom=15;//初始縮放等級
	this.circleR=500;//警情圈范围，单位米
	if(opts){
		if(opts.map_gpsService_url)
		Url4GpsData=opts.map_gpsService_url;
		jQuery.extend(this,opts);
	}
	

}
MapConfig.InitGpsUrl=function(url){
	Url4GpsData=url;
};
MapConfig.prototype = {
	// 加载地图
	loadMap : function() {
		if (typeof map == "undefined") {
			window.setTimeout("onLoad()", 100);
			return;
		}
		map = new DMap.Map(document.getElementById(this.mapid));
		map.setZoom(this.initZoom);
		//map.showZoomBarControl();//Google
//		/map.showScaleControl();// 比例尺addControl(new DMap.ScaleControl());
		// map.showZoomBarControl();//缩放等级
		//map.showOverviewMap();// 鹰眼
		// map.showMapTypeControl();//地图addControl(new DMap.MapTypeControl());
		// map.showScaleControl();// 比例尺addControl(new DMap.ScaleControl());
		// map.showCopyright();//版权
		//mapConfig.addMarkLayer();
		// 创建工具栏
		// this.toolBar = new DMap.ToolBarControl();
		// map.addControl(this.toolBar);
		// mapConfig.addUserToolBox();//添加自定义工具箱
		// mapConfig.addDefaultTool();//添加地图默认工具
		this.ifBindZoomEnd4PointGw=false;

	},
	// 移动到中心点
	initCenterPoint : function() {
		var centerpoint = new DMap.LonLat(this.center[0], this.center[1]);
		map.panTo(centerpoint);// 居中
	},
	// 地图操作按钮
	mapOperate : function(name) {
		if (name == "pan") {// 平移
			map.deactivate();
		} else if (name == "zoomIn") {// 放大
			map.zoomIn();
			// map.activateRecZoomIn();
		} else if (name == "zoomOut") {// 缩小
			map.zoomOut();
			// map.activateRecZoomOut();
		} else if (name == "fullExtent") {// 全图
			map.fullExtent();
		} else if (name == "distance") {// 测量长度
			map.activateMeaturePolyline();
		} else if (name == "area") {// 测量面积
			map.activateMeaturePolygon();
		} else if (name == "print") {// 打印地图
			map.print();
		}
	},

	// 添加自定义工具
	addUserToolBox : function() {
		if (!$("#map_nav") || $("#map_nav").length == 0) {
			return;
		}
		var toolBarHtml = "";
		toolBarHtml += '<div id="user_tool_box" class="tools_icon" >';
		toolBarHtml += '<a id="EHL_Map_ToolBar">';
		toolBarHtml += '<img  align=absBottom src="' + projectPath + 'imgs/tool_icon.jpg" width=16 height=16>';
		toolBarHtml += '操作工具';
		toolBarHtml += '<img border=0  src="' + projectPath + 'imgs/xialasanjiao.png" width=9 height=12>';
		toolBarHtml += '</a>';
		toolBarHtml += '<a id="EHL_Map_ToolBar_Lock">';
		toolBarHtml += '<img alt="锁定工具箱" align=absBottom src="' + projectPath + 'imgs/shuding.jpg" width=16 height=16>';
		toolBarHtml += '</a>';
		toolBarHtml += '</div>';
		$("#map_nav").append($(toolBarHtml));
		var toolBoxHtml = "";
		toolBoxHtml += '<div style="display: none;" id="EHL_Map_ToolBox" class=tools_box ><img style="Z-INDEX: 509" src="' + projectPath
				+ 'imgs/tools_box_top.png"> ';
		toolBoxHtml += '<div class="tools" id="ehl_map_tool_box" ></div>';
		toolBoxHtml += '</div>';
		$("#map_nav").append($(toolBoxHtml));
		$("#EHL_Map_ToolBar").click(function() {
			$("#EHL_Map_ToolBox").toggle();
		}).css({
			"cursor" : "pointer"
		});
		$("#EHL_Map_ToolBox").hover(function() {
			// 什么都不做
		}, function() {
			$(this).hide();
		});
		$("#EHL_Map_ToolBar_Lock").click(function() {
			var flag = $(this).data("flag") || "unlock"
			if (flag == "unlock") {
				$(this).data("flag", "lock").find("img").attr("src", "" + projectPath + "imgs/xieding.jpg");
				$("#EHL_Map_ToolBox").unbind("hover");
			} else if (flag == "lock") {
				$(this).data("flag", "unlock").find("img").attr("src", "" + projectPath + "imgs/shuding.jpg");
				$("#EHL_Map_ToolBox").hover(function() {
					// 什么都不做
				}, function() {
					$(this).hide();
				});
			}
		});
	},
	/**
	 * 添加自定义工具
	 * 
	 * @param img1
	 *            默认显示图片
	 * @param img2
	 *            鼠标over时显示图片
	 * @param f1
	 *            点击工具时调用的函数
	 * @param title
	 *            工具提示信息
	 * @param id
	 *            工具栏自定义id
	 */
	addUserTool : function(img1, img2, f1, title, id) {
		if (!$("#ehl_map_tool_box") || $("#ehl_map_tool_box").length == 0) {
			return;
		}
		img2 = img2 || img1;
		var imgHtml = '<img width="26px" height="26px" src="' + img1 + '" ';
		if (id) {
			imgHtml += 'id="' + id + '"/>';
		} else {
			imgHtml += '/>';
		}
		var tool = $(imgHtml);
		$("#ehl_map_tool_box").append(tool);
		tool.css({
			"cursor" : "pointer"
		}).attr("alt", title);
		tool.hover(function() {
			$(this).attr("src", img2);
		}, function() {
			$(this).attr("src", img1);
		}).click(f1);
	},
	/**
	 * 增加自定义工具
	 */
	addDefaultTool : function() {
		this.addUserTool("" + projectPath + "imgs/tool-icon/extent.jpg", '' + projectPath + 'imgs/tool-icon/extent-hover.jpg', function() {
			map.fullExtent();
		}, "全图");// 全图
		this.addUserTool("" + projectPath + "imgs/tool-icon/pan.jpg", '' + projectPath + 'imgs/tool-icon/pan-hover.jpg', function() {
			map.deactivate();
		}, "平移");// 平移
		this.addUserTool("" + projectPath + "imgs/tool-icon/zoomin.jpg", "" + projectPath + "imgs/tool-icon/zoomin-hover.jpg", function() {
			map.activateRecZoomIn();
		}, "放大");// 放大
		this.addUserTool("" + projectPath + "imgs/tool-icon/zoomout.jpg", "" + projectPath + "imgs/tool-icon/zoomout-hover.jpg", function() {
			map.activateRecZoomOut();
		}, "缩小");// 缩小
		this.addUserTool("" + projectPath + "imgs/tool-icon/print.jpg", "" + projectPath + "imgs/tool-icon/print-hover.jpg", function() {
			map.print();
		}, "打印");// 打印
		this.addUserTool("" + projectPath + "imgs/tool-icon/measure-len.jpg", "" + projectPath + "imgs/tool-icon/measure-len-hover.jpg", function() {
			map.activateMeaturePolyline();
		}, "测距");// 测量长度
		this.addUserTool("" + projectPath + "imgs/tool-icon/measure-area.jpg", "" + projectPath + "imgs/tool-icon/measure-area-hover.jpg",
				function() {
					map.activateMeaturePolygon();
				}, "测面积");// 测量面积
	},
	/**
	 * 清除所有工具
	 */
	clearUserTools : function() {
		map.deactivate();
		$("#ehl_map_tool_box").html("");
	},
	/**
	 * 删除特定工具
	 * 
	 * @param id
	 */
	clearUserTool : function(id) {
		$("#ehl_map_tool_box").find("img[id='" + id + "']").remove();
	},
	/**
	 * 卸载工具箱
	 */
	disposeToolBox : function() {
		$("#user_tool_box").remove();
	},
	addMarkLayer : function() {
		if (mapConfig.marktlayer != null && mapConfig.marktlayer != "") {
			map.removeOverlay(mapConfig.marktlayer);
		}
		var mapurl = 'http://' + localObj + '/EHL_MapServer/DCMap?mapname=bs';

		// alert(mapurl);
		mapConfig.marktlayer = new DMap.TileLayer(mapurl); // 图片图层
		map.addOverlay(mapConfig.marktlayer);
		DMap.$("#" + mapConfig.marktlayer.idPrefix).css("z-index", 102);

	},
	addBreakMarkLayer : function() {
		if (mapConfig.marktlayer != null && mapConfig.marktlayer != "") {
			map.removeOverlay(mapConfig.marktlayer);
		}
		mapConfig.marktlayer = new DMap.TileLayer('http://' + localObj + '/EHL_MapServer/DCMap?mapname=hsbz'); // 图片图层
		map.addOverlay(mapConfig.marktlayer);
	},
	addbreakTrafficLayer : function() {
		if (themeLayer != null) {
			// themeLayer.refresh();
			map.removeOverlay(themeLayer);
		}

		// var strURL= 'http://'+ip+'/webroota/trap.dll';
		themeLayer = new DMap.TrafficLayer(maptrap);
		themeLayer.setHack(true);
		map.addOverlay(themeLayer)// 将专题图层叠加到地图对象
		if (mapConfig.marktlayer != null && mapConfig.marktlayer != "") {
			map.removeOverlay(mapConfig.marktlayer);
		}
		mapConfig.marktlayer = new DMap.TileLayer('http://' + localObj + '/EHL_MapServer/DCMap?mapname=hsbz'); // 图片图层
		map.addOverlay(mapConfig.marktlayer);

		SaveIntervalValuebk = setInterval(function() {
			if (themeLayer) {
				themeLayer.refresh();
			}
		}, 60000);
	},
	/**
	 * 添加路况图层(30秒定时刷新)
	 * 
	 * @param map_roadstatus_url
	 *            路况图层访问URL
	 */
	addTrafficLayer : function(map_roadstatus_url) {
		if (trafficLayer != null) {
			map.removeOverlay(trafficLayer);
		}
		trafficLayer = new DMap.TrafficLayer(map_roadstatus_url);
		map.addOverlay(trafficLayer);// 将专题图层叠加到地图对象
		// if (mapConfig.marktlayer != null && mapConfig.marktlayer != "") {
		// map.removeOverlay(mapConfig.marktlayer);
		// }
		setInterval(function() {
			if (trafficLayer) {
				trafficLayer.refresh();
			}
		}, 30000);
	},
	removeTileLayer : function() {
		if (mapConfig.marktlayer != null) {
			map.removeOverlay(mapConfig.marktlayer);
		}
	},

	mapToPt : function(ptx, pty, level, all) {
		if (ptx != "" && ptx != null) {
			var point = new DMap.LonLat(ptx, pty);
			if (all) {
				level = 14;
			}
			map.setCenter(point, level);
			document.getElementById("top_roadDiv").style.display = "none";
			document.getElementById("top_pointDiv").style.display = "none";
		} else {

		}
	},

	divDisplay : function(divId) {
		var dptObj = document.getElementById("top_dptDiv");
		var roadObj = document.getElementById("top_roadDiv");
		var crossObj = document.getElementById("top_crossDiv");
		var pointObj = document.getElementById("top_pointDiv");

		if (divId == "top_dptDiv") {
			if (dptObj.style.display != "none") {
				dptObj.style.display = 'none';
			} else {
				pointObj.style.display = 'none';
				crossObj.style.display = 'none';
				roadObj.style.display = "none";
				dptObj.style.right = "650px";
				dptObj.style.top = window.event.clientY + 15;
				dptObj.style.display = 'block';
			}
		} else if (divId == "top_roadDiv") {
			if (roadObj.style.display != "none") {
				roadObj.style.display = 'none';
			} else {
				pointObj.style.display = 'none';
				crossObj.style.display = 'none';
				dptObj.style.display = "none";
				roadObj.style.right = "400px";
				roadObj.style.top = window.event.clientY + 15;
				roadObj.style.display = 'block';
			}
		} else if (divId == "top_pointDiv") {
			if (pointObj.style.display != "none") {
				pointObj.style.display = 'none';
			} else {
				roadObj.style.display = 'none';
				crossObj.style.display = 'none';
				dptObj.style.display = "none";
				pointObj.style.right = "10px";
				pointObj.style.top = window.event.clientY + 15;
				pointObj.style.display = 'block';
			}
		} else if (divId == "top_crossDiv") {
			if (crossObj.style.display != "none") {
				crossObj.style.display = 'none';
			} else {
				roadObj.style.display = 'none';
				pointObj.style.display = 'none';
				dptObj.style.display = "none";
				crossObj.style.right = "160px";
				crossObj.style.top = window.event.clientY + 15;
				crossObj.style.display = 'block';
			}
		}
	},
	/**
	 * 添加警情图层
	 */
	addJQLayer:function(){
		if (mapConfig.JQLayer != null && mapConfig.JQLayer != "") {
			map.removeOverlay(mapConfig.JQLayer);
		}
		mapConfig.JQLayer = new DMap.TileLayer('http://' + localObj + '/EHL_MapServer/DCMap?mapname=hsbz'); // 图片图层
		map.addOverlay(mapConfig.JQLayer);
	},
	//移除警情图层
	removeJQLayer : function() {
		if (mapConfig.JQLayer != null) {
			map.removeOverlay(mapConfig.JQLayer);
		}
	},
	/**
	 * 地图上显示一组警情图标
	 * @param {} jsonArr(必选)  [{x:,y:...},{}] 警情信息数组
	 * @param {} opts(可选)  {ifClear:是否先清除所有覆盖物,clickEvt:点击警情的回调函数}
	 * @param {} _symbol(可选) {size:,url:等等}
	 */
	addJQs:function(jsonArr,opts,_symbol){
		var options={
			ifClear:false,
			clickEvt:null//警情点击事件
		};
		options=DMap.$.extend(options,opts);
		if(options.ifClear){
			map.clearOverlays();
		}
		options.ifClear=false;
		var _markerSize=this.getImgSizeByZoom();
		_symbol.size = new DMap.Size(_markerSize, _markerSize);
		for(var i=0;i<jsonArr.length;i++){
			this.addJQ(jsonArr[i],options,_symbol,false);//this.addJQ(json[i].x,json[i].y,options,_symbol);
		}
	},
	/**
	 * 添加警情图标
	 * @param {} lon 经度	
	 * @param {} lat 纬度
	 * @param {} opts
	 */
	addJQ:function(jsonObj,opts,_symbol,ifPanTo){
		//DMap.$.extend({},symbol);
		var options={
			ifClear:false,
			JQType:1,
			ifFlash:false,
			clickEvt:null//警情点击事件
		};
		var symbol={size:new DMap.Size(24,24)};//默认图标大小为24
		DMap.$.extend(options,opts);
		if(options.ifClear){
			map.clearOverlays();
		}
		DMap.$.extend(symbol,_symbol);
		//拼接img路径
		var imgUrl=this.getImgUrlByJqJson(jsonObj);
		/*var imgUrl=null;
		imgUrl=ImgUrl4Gis+jsonObj.eventtypename;//"特殊事件-ov.png";
		if(jsonObj.eventstate=="1"){
			imgUrl+="未处理";
		}
		if(jsonObj.overtime=="1"){
			imgUrl+="超时";
		}
		imgUrl+=".png";*/
		if(imgUrl!=null)
		DMap.$.extend(symbol,{url:imgUrl,animateUrl:ImgUrl4Gis+"jq.png"});
		var marker=new DMap.SizableMarker(new DMap.LonLat(jsonObj.x,jsonObj.y),symbol);
		marker.alarmid=jsonObj.alarmid;
		map.addOverlay(marker);
		marker.setCommonEvent();//设置通用事件，比如moveover变为小手
		DMap.$(marker).bind("click",function(e){//(marker._dom
			if(options.clickEvt){
				options.clickEvt(e.target);
			}
		});
		//marker.addAnimate({animateUrl:ImgUrl4Gis+"jq.png"},500);//鼠标放上去闪烁
		if(options.ifFlash)marker.flash();//图标一直闪烁clearFlash
		//marker.attention(10,1000);//添加醒目效果
		array4JQ.push(marker);
		if(ifPanTo){
			map.setCenter(marker._lonlat, 16);
		}
		return marker;
	},
	//移除警情marker
	removeJQ:function(marker){
		for (var i = 0; i < array4JQ.length; i++) {
			if (array4JQ[i] === marker) {
				array4JQ.splice(i,1); 
				map.removeOverlay(marker);
				break;
			};
		} 
	},
	//移除警情marker
	removeJY:function(marker){
		for (var i = 0; i < array4JY.length; i++) {
			if (array4JY[i] === marker) {
				array4JY.splice(i,1); 
				map.removeOverlay(marker);
				break;
			};
		} 
	},
	//清空警情、警员、摄像机等数组
	/*clearArray:function(array){
		array.splice(0,array.length);//清空数组
	},*/
	/**
	 * 添加带光圈的警情
	 * @param {} lon
	 * @param {} lat
	 *@param {} JQType
	 *@param {} symbol
	 *@param {} opts{
	 *	ifClear:是否清除地图上原有的覆盖物
	 *	clickEvt：点击此覆盖物触发的事件
	 *	r:圆形区域半径
	 *}
 	 */
	addJqWithCircle:function(jsonObj,opts,_symbol){
		var self=this;
		var options={
			ifClear:false,
			JQType:1,
			r:this.circleR,
			clickEvt:null,//警情点击事件
			ifShowSxj:true,
			ifShowJy:true,
			clickEvt4SXJ:null//摄像头点击事件
		};
		var symbol={};
		DMap.$.extend(symbol,_symbol);
		options=DMap.$.extend(options,opts);
		if(options.ifClear){
			map.clearOverlays();
		}
		//根据缩放等级确定图标大小
		var zoom=map.getZoom();
		var _markSize=self.getImgSizeByZoom();
		/*if(zoom<=12){
			_markSize=24;
		}else if(zoom<=16){
			_markSize=24;
		}else{
			_markSize=32;
		}*/
		var imgUrl=this.getImgUrlByJqJson(jsonObj);
		//imgUrl=ImgUrl4Gis+"交通事故.png";
		var lonlat=new DMap.LonLat(jsonObj.x,jsonObj.y);
		var marker=new DMap.SizableMarker(lonlat,{url:imgUrl,size : new DMap.Size(_markSize,_markSize)});//,type:3,markText:"2017-05-28-12:43"
		map.addOverlay(marker);
		marker.setCommonEvent();
		DMap.$(marker).bind("click",function(e){//(marker._dom
			//map.setCursor("pointer");
			if(options.clickEvt){
				options.clickEvt(e.target);
			}
		});
		_circle4JQ=new DMap.Round([lonlat,options.r],{fillOpacity:0.3,fillColor:'red',color:'pink'});
		map.addOverlay(_circle4JQ);
		//alert(circle.getLonLats());
		var wktstr=this.getCircleWkt(_circle4JQ);
		//map.panTo()
		map.setCenter(lonlat, 16);
		if(options.ifShowJy)
		this.addJyInCircle({wktStr:wktstr,clickEvt:options.paiJingEvt});//显示圈内警员
		if(options.ifShowSxj)
		this.addSXJWithWkt({wktStr:wktstr,clickEvt:options.clickEvt4SXJ});//显示圈内摄像机
		return [marker,_circle4JQ];
	},
	/**
	 * 根据条件查询设备实时gps位置信息（如警员的实时信息）
	 * @param {} opts ：wktStr deviceID deviceType stateID returnType
	 */
	func:null,
	_timer4JyInCirlce:null,//自动刷新圈内警员的定时器
	//jyList:new Array(),
	addJyInCircle:function(opts){
		var self=this;
		var options={
			serviceMethod:"sbinfo",//"locateinfo",
				returnType:1,
				SBLX:"2,3"
				//deviceID:102838
		};
		DMap.$.extend(options,opts);
		/*var url=Url4GpsData+"?serviceMethod="+options.serviceMethod+"&returnType="+options.returnType;
		if(options.deviceID)url+="&deviceID="+options.deviceID;
		if(options.wktStr)url+="&wktStr="+options.wktStr;
		if(options.stateID)url+="&stateID="+options.stateID;
		if(options.deviceType)url+="&deviceType="+options.deviceType;*/
		var url=Url4GpsData+"?serviceMethod="+options.serviceMethod+"&returnType="+options.returnType;
		if(options.GLJG)url+="&GLJG="+options.GLJG;//管理机构
		if(options.wktStr)url+="&wktStr="+options.wktStr;
		if(options.SBZT)url+="&SBZT="+options.SBZT;//设备状态
		if(options.SBLX)url+="&SBLX="+options.SBLX;//设备类型
		if(options.SSBH)url+="&SSBH="+options.SSBH;//设备编号
		if(options.HJHM)url+="&HJHM="+options.HJHM;//呼叫号码
		if(options.GZZT)url+="&GZZT="+options.GZZT;//工作状态
		if(options.DWSBBH)url+="&DWSBBH="+options.DWSBBH;//定位设备编号
		//var listener=window.setInterval("alert(123)",30000);
		var rootpath=this.getRootPath();
		func=function(){
			/*for(var j=0;j<array4JY.length;j++){
				map.removeOverlay(array4JY[j]);
			}
			clearArray(array4JY);*/
			jQuery.ajax({
			url:rootpath+"/GisDataQuery/queryGpsData.do",
			data:{'url':url},//"http://192.168.2.27:8080/EHL_GPS/gpsservice?serviceMethod=locateinfo&returnType=1&deviceID=102838"
			dataType:"json",
			type:"post",
			success:function(data){
				var result=JSON.parse(data);//JSON.parse(data);
				var locateinfo=result.sbinfo;
				var _markSize=self.getImgSizeByZoom();
				//alert(result.allCount);
				//map.clearOverlays();
				//如果警员定位信息不是实时信息，则忽略当前警员
				var now=new Date();
				//var strStartTime=Date.parse(now)-(1000*60*5000);//1000*60*5
				for(var i=0;i<result.allCount;i++){
					var curlocateinfo=null;
					if(result.allCount==1){
						curlocateinfo=locateinfo;
					}else{
						curlocateinfo=locateinfo[i];
					}
					//如果警员定位信息不是实时信息，则忽略当前警员
					/*if(locateinfo[i].gpstime.trim()==""){
						continue;
					}else{
						//var date = new Date(locateinfo[i].gpstime.replace(/-/g,"/"));
						var time=Date.parse(locateinfo[i].gpstime);
						if(time<strStartTime) continue;
					}*/
					if(curlocateinfo.gpsSTATEID==undefined){
						if(curlocateinfo.gpsstateid  instanceof Array)
							continue;
						if(curlocateinfo.gpsstateid.trim()!="1"){//如果gps设备状态不是在线状态，则忽略
							continue;
						}
					}else{
						if(curlocateinfo.gpsSTATEID  instanceof Array)
							continue;
						if(curlocateinfo.gpsSTATEID.trim()!="1"){//如果gps设备状态不是在线状态，则忽略
							continue;
						}
					}
					
					var imgUrl = null;
					imgUrl = ImgUrl4Gis + "警员.png";
					var lonlat = new DMap.LonLat(curlocateinfo.longtitude, curlocateinfo.latitude);
					var marker;
					//如果有则移动，没有则新建并添加
					if(hashMap4JY.Contains(curlocateinfo.gpsdeviceid)){
						marker=hashMap4JY.Get(curlocateinfo.gpsdeviceid);
						
					}else{
						marker = new DMap.SizableMarker(lonlat, {
								type:3,
								//markText:locateinfo[i].syjymc,
								labelText:curlocateinfo.syjymc,
								labelFontSize:12,
								url : imgUrl,
								size : new DMap.Size(_markSize, _markSize)
							});
						map.addOverlay(marker);
						hashMap4JY.Set(curlocateinfo.gpsdeviceid,marker);
					}
					marker.moveToLonlat(lonlat);
					marker.gpsstateid=curlocateinfo.gpsstateid;
					marker.gpstime=curlocateinfo.gpstime;
					marker.gpsdeviceid=curlocateinfo.gpsdeviceid;
					marker.syjy=curlocateinfo.syjy;
					marker.GLJG=curlocateinfo.GLJG;
					marker.syjymc=curlocateinfo.syjymc;
					marker.GLJGMC=curlocateinfo.GLJGMC;
					marker.HJHM=curlocateinfo.HJHM;
					marker.carpda350SBBH=curlocateinfo.carpda350SBBH;
					marker.carpda350GZZT=curlocateinfo.carpda350GZZT;
					/*var marker = new DMap.Marker(lonlat, {
								url : imgUrl,
								size : new DMap.Size(16, 16)
							});
					map.addOverlay(marker);*/
					//array4JY.push(marker);
					
					//alert(marker.deviceid);
					marker.setCommonEvent();
					marker.pixel=map.fromLonLatToContainerPixel(lonlat);
					DMap.$(marker).unbind();
					DMap.$(marker).bind("click", function(e) {//._dom
						//alert(options.clickEvt);
						//alert(e.target.deviceid);
						if (options.clickEvt) {
							options.clickEvt(e.target);//marker
						}
						return;
						alert('点击了'+marker.deviceid+'这个警员！'+$(this).gpstime+e.target.gpstime+this.gpstime+jQuery(this).gpstime);
					});
				}
			}
			
		});
		};
		func();
		if(self._timer4JyInCirlce!=null)clearInterval(self._timer4JyInCirlce);
		self._timer4JyInCirlce=window.setInterval("this.func()",5000);
	},
	stopAutoFreshJyInCircle:function(){
		var self=this;
		if(this._timer4JyInCirlce!=null)clearInterval(self._timer4JyInCirlce);
	},
	/**
	 * 单独移除所有警员
	 */
	removeJy:function(){
		var self=this;
		self.stopAutoFreshJyInCircle();
		for(var key in hashMap4JY){
			if(key=="Set"||key=="Get"||key=="Contains"||key=="Remove"||key=="Clear")
			continue;
			map.removeOverlay(hashMap4JY.Get(key));
			delete hashMap4JY[key];
		}
	},
	/**
	 * 获取坐标点附近的在线警员信息
	 * @param {} x
	 * @param {} y
	 * @param {} callback
	 * @param {} opts
	 */
	getJyNearBy:function(x,y,callback,opts){
		var self=this;
		var r=500;
		if(opts&&opts.r)r=opts.r;
		var wktStr=self.getCircleWktByLonlat(x,y,r);
		var options={
			serviceMethod:"sbinfo",//"locateinfo",
				returnType:1,
				SBLX:"2,3"
				//deviceID:102838
		};
		DMap.$.extend(options,opts);
		/*var url=Url4GpsData+"?serviceMethod="+options.serviceMethod+"&returnType="+options.returnType;
		if(options.deviceID)url+="&deviceID="+options.deviceID;
		if(options.wktStr)url+="&wktStr="+options.wktStr;
		if(options.stateID)url+="&stateID="+options.stateID;
		if(options.deviceType)url+="&deviceType="+options.deviceType;*/
		var url=Url4GpsData+"?serviceMethod="+options.serviceMethod+"&returnType="+options.returnType;
		if(options.GLJG)url+="&GLJG="+options.GLJG;//管理机构
		if(wktStr){
			url+="&wktStr="+wktStr;
		}else{
			return null;
		}
		if(options.SBZT)url+="&SBZT="+options.SBZT;//设备状态
		if(options.SBLX)url+="&SBLX="+options.SBLX;//设备类型
		if(options.SSBH)url+="&SSBH="+options.SSBH;//设备编号
		if(options.HJHM)url+="&HJHM="+options.HJHM;//呼叫号码
		if(options.GZZT)url+="&GZZT="+options.GZZT;//工作状态
		if(options.DWSBBH)url+="&DWSBBH="+options.DWSBBH;//定位设备编号
		//var listener=window.setInterval("alert(123)",30000);
		var rootpath=this.getRootPath();
		/*for(var j=0;j<array4JY.length;j++){
			map.removeOverlay(array4JY[j]);
		}
		clearArray(array4JY);*/
		jQuery.ajax({
		url:rootpath+"/GisDataQuery/queryGpsData.do",
		data:{'url':url},//"http://192.168.2.27:8080/EHL_GPS/gpsservice?serviceMethod=locateinfo&returnType=1&deviceID=102838"
		dataType:"json",
		type:"post",
		success:function(data){
			var result=JSON.parse(data);//JSON.parse(data);
			var locateinfo=result.sbinfo;
			//如果警员定位信息不是实时信息，则忽略当前警员
			/*for(var i=result.allCount-1;i>=0;i--){
				if(locateinfo[i].gpsSTATEID.trim()=="1"){//如果gps设备状态不是在线状态，则忽略
					continue;
				}else{
					locateinfo.splice(i, 1);
				}
			}*/
			if(typeof locateinfo=="undefined"){
				locateinfo=[];
			}
			callback(locateinfo);
		}
			
		});
		
	},
	//===========================================================================================
	//警员轨迹回放相关
	//===========================================================================================
	arrJy4GJHF:new Array(),//轨迹回放中的警员marker
	arrLines4GJHF:new Array(),//轨迹回放中的线
	_timer4JYGJ:null,
	/**
	 * 在地图上显示警情处置警员的实时位置和历史轨迹
	 * @param {} dataArr
	 * @param {} opts
	 */
	showJygjInCircle:function(dataArr,opts){
		//var arrJy4GJHF=this.arrJy4GJHF;
		//var arrLines4GJHF=this.arrLines4GJHF;
		//var addSpecificJyWithLineInCircle=
		this.clearJyAndGj(this.arrJy4GJHF,this.arrLines4GJHF);
		//var funcClearJyAndGj=this.clearJyAndGj;
		var self=this;
		//每隔五秒刷新一次轨迹以及警员实时位置
		this.addSpecificJyWithLineInCircle(dataArr,opts);
		_timer4JYGJ=setInterval(function(){
			self.clearJyAndGj(self.arrJy4GJHF,self.arrLines4GJHF);
			self.addSpecificJyWithLineInCircle(dataArr,opts);
		},5000);
	},
	/**
	 * 停止显示警情的处置警员的历史轨迹，并从地图上清除
	 */
	stopShowJygjInCircle:function(){
		if(_timer4JYGJ){
			clearInterval(_timer4JYGJ);
		}
		this.clearJyAndGj(this.arrJy4GJHF,this.arrLines4GJHF);
	},
	//清除上次显示的历史轨迹以及警员实时位置 （内部使用，不对外）
	clearJyAndGj:function(arrJy4GJHF,arrLines4GJHF){
		//循环遍历，清除地图上的覆盖物
		for(var i=0;i<arrJy4GJHF.length;i++){
			map.removeOverlay(arrJy4GJHF[i]);
			map.removeOverlay(arrLines4GJHF[i]);
		}
		//map.clearOverlays();
		clearArray(arrJy4GJHF);
		clearArray(arrLines4GJHF);
	},
	/**
	 * 画出警情圈内相应的处置警员的实时位置和三分钟内的轨迹
	 * @param {Array} dataArr
	 * @param {jsonObject} opts
	 */
	addSpecificJyWithLineInCircle:function(dataArr,opts){
		var self=this;
		var arrJy4GJHF=this.arrJy4GJHF;
		var arrLines4GJHF=this.arrLines4GJHF;
		var data4jy;
		var gpsId;
		var now=new Date();
		var strEndTime=now.format('yyyy-MM-dd HH:mm:ss');
		var strStartTime=new Date(Date.parse(now)-(1000*60*3)).format('yyyy-MM-dd HH:mm:ss');  
		//strStartTime="2017-05-10 10:59:09";//测试临时使用
		var rootpath=this.getRootPath();
		var _markerSize=self.getImgSizeByZoom();
/*		alert(strStartTime);
		alert(strEndTime);return;*/
		for(var i=0;i<dataArr.length;i++){
			data4jy=dataArr[i];
			gpsId=data4jy.deviceId;
			//2015-01-19 17:40:23
			var url=Url4GpsData+"?serviceMethod=recordinfo&returnType=1&deviceID="+gpsId+"&gpsStartTime="+strStartTime+"&gpsEndTime="+strEndTime;
			//http://192.168.2.27:8080/EHL_GPS/gpsservice?serviceMethod=recordinfo&deviceID=104137&gpsStartTime=2017-05-9%2017:40:23&gpsEndTime=2017-05-10%2017:40:23&returnType=1
			var arrLonlats=[];
			//查询历史轨迹数据
			jQuery.ajax({
				url:rootpath+"/GisDataQuery/queryGpsData.do",
				data:{'url':url},//"http://192.168.2.27:8080/EHL_GPS/gpsservice?serviceMethod=locateinfo&returnType=1&deviceID=102838"
				dataType:"json",
				type:"post",
				success:function(data){
					var result=JSON.parse(data);//JSON.parse(data);
					var recordinfo=result.recordinfo;
					var lastStrLonlat=null;//上条记录第二个坐标字符串，用来判断是否当前条是否与之一致
//					var arrLonlats=[];
					if(recordinfo==undefined)return;
					recordinfo.forEach(function(obj) {
						var linegeometry=obj.linegeometry;
						var strLonlats=linegeometry.split(',');
						if(strLonlats.length==1){//如果坐标数量为1
							var strLonlat1=strLonlats[0].split(' ');
							if(lastStrLonlat){
								if(lastStrLonlat!=strLonlats[0]){//如果当前第一个坐标与上条记录最后一条不一致，则划线
									arrLonlats.push(new DMap.LonLat(strLonlat1[0],strLonlat1[1]));
								}
							}else{
								arrLonlats.push(new DMap.LonLat(strLonlat1[0],strLonlat1[1]));
							}
							lastStrLonlat=strLonlats[0];//将本条第二个坐标字符串传给变量
						}/*else if(strLonlats.length==2){//如果坐标数量为2
							var strLonlat1=strLonlats[0].split(' ');
							var strLonlat2=strLonlats[1].split(' ');
							if(lastStrLonlat){
								if(lastStrLonlat!=strLonlats[0]){//如果当前第一个坐标与上条记录最后一条不一致，则划线
									arrLonlats.push(new DMap.LonLat(strLonlat1[0],strLonlat1[1]));
								}
							}else{
								arrLonlats.push(new DMap.LonLat(strLonlat1[0],strLonlat1[1]));
							}
							if(strLonlats[0]!=strLonlats[1]){
								arrLonlats.push(new DMap.LonLat(strLonlat2[0],strLonlat2[1]));
							}
							lastStrLonlat=strLonlats[1];//将本条第二个坐标字符串传给变量
						}*/else if(strLonlats.length>=2){//如果坐标数量为其它
							//alert("strLonlats.length:"+strLonlats.length);
							for(var j=0;j<strLonlats.length;j++){
								var strLonlat_x=strLonlats[j].split(' ');
								if(0==j){
									if(lastStrLonlat){
										if(lastStrLonlat!=strLonlats[0]){//如果当前第一个坐标与上条记录最后一条不一致，则划线
											arrLonlats.push(new DMap.LonLat(strLonlat_x[0],strLonlat_x[1]));
										}
									}else{
										arrLonlats.push(new DMap.LonLat(strLonlat_x[0],strLonlat_x[1]));
									}
								}else{
									if(lastStrLonlat!=strLonlats[j]){
										arrLonlats.push(new DMap.LonLat(strLonlat_x[0],strLonlat_x[1]));
									}
								}
								lastStrLonlat=strLonlats[j];//将本条第二个坐标字符串传给变量
							}
						}else{
							alert("strLonlats.length:"+strLonlats.length);
						}
						
					});
					var polyline=new DMap.Polyline(arrLonlats,{});
					map.addOverlay(polyline);
					arrLines4GJHF.push(polyline);
					//如果该警员marker已经存在，则更新其位置，若不存在则新建并添加到地图上
					if(arrLonlats.length>0){
						var marker=new DMap.SizableMarker(arrLonlats[arrLonlats.length-1],{	
								type:3,
								labelText:data4jy.syjymc,
								url:ImgUrl4Gis+"警员.png",
								size : new DMap.Size(_markerSize,_markerSize)
							});//获取警员实时位置
						map.addOverlay(marker);
						arrJy4GJHF.push(marker);
					}
					//设置定时器，每隔固定时间请求服务器获取该警员最新实时位置，并更新其位置到地图上
					/*var timer4JYGJ=setInterval(function(){
						
					},5000);*/
				}//end success
			});//end jquery
			
			
		}//end for
	},
	/**
	 * 根据接收到的警员数据将其显示到地图上（包括实时位置）
	 */
	//arrJy4XSJY:new Array(),//勤务考核显示警员中的警员marker
	showJyByData:function(dataArr,clickEvt){
		/*var arrJy4XSJY=this.arrJy4XSJY;
		for(var i=0;i<arrJy4XSJY.length;i++){
			map.removeOverlay(arrJy4XSJY[i]);
		}
		clearArray(arrJy4XSJY);*/
		var self=this;
		var _markSize=self.getImgSizeByZoom();
		for(var i=0;i<dataArr.length;i++){
			var imgUrl = null;
			imgUrl = ImgUrl4Gis + "警员.png";
//			var lonlat = new DMap.LonLat(dataArr[i].lon, dataArr[i].lat);
			var marker;
			//如果有则移动，没有则新建并添加
			if(hashMap4JY.Contains(dataArr[i].jynum)){
				marker=hashMap4JY.Get(dataArr[i].jynum);
				if(dataArr[i].lon!=null&&dataArr[i].lon!=""){
					var lonlat = new DMap.LonLat(dataArr[i].lon, dataArr[i].lat);
					marker.moveToLonlat(lonlat);//这个方法报的错误
				}
				marker.setLabelColor(dataArr[i].color);//setTextColor
			}else{
				var lonlat = new DMap.LonLat(dataArr[i].lon, dataArr[i].lat);
				marker = new DMap.SizableMarker(lonlat, {
						type:3,
						//markText:locateinfo[i].syjymc,
						//markText:dataArr[i].sthm,
						sthm:dataArr[i].sthm,
						labelText:dataArr[i].jymc,
						labelFontSize:12,
						/*markTextColor:'green',//dataArr[i].color
						textColor:'green',
						labelColor:'green',*/
						labelColor:dataArr[i].color,
						//textBackgroundColor:'green',
						labelBackgroundColor:'white',
						url : imgUrl,
						size : new DMap.Size(_markSize, _markSize)

					});
				marker.jymc=dataArr[i].jymc;
				marker.jynum=dataArr[i].jynum;
				map.addOverlay(marker);
				marker.setCommonEvent();
				hashMap4JY.Set(dataArr[i].jynum,marker);
				if(clickEvt){
					DMap.$(marker).unbind();
					DMap.$(marker).bind("click", function(e) {//._dom
						clickEvt(dataArr[i],e.target);
					});
				}
			}	
		}
	},
	clearAllJy:function(){
		hashMap4JY.Clear();
		map.clearOverlays();
	},
	/*
	 * 移动对象
	 */
	//pcs:{'type':1,'person':person,'imgUrl':imgUrl,'points':null,'times':null,'timeStart':null,'timeEnd':null},
	startGJHF:function(jymc,jsonGwArr,dataArr,endEvt){
		var self=this;
		//map.clearOverlays();
		self.showGwsOnMap(jsonGwArr);
		var lonlatArray=new Array();
		var imgUrl = ImgUrl4Gis + "警员.png";
			
		var lastStrLonlat=null;//上条记录第二个坐标字符串，用来判断是否当前条是否与之一致
		for(var i=0;i<dataArr.length;i++){
			var linegeometry=dataArr[i].linegeometry;
						var strLonlats=linegeometry.split(',');
						if(strLonlats.length>=1){//如果坐标数量为1
							var strLonlat1=strLonlats[0].split(' ');
							if(lastStrLonlat){
								if(lastStrLonlat!=strLonlats[0]){//如果当前第一个坐标与上条记录最后一条不一致，则划线
									lonlatArray.push(new DMap.LonLat(strLonlat1[0],strLonlat1[1]));
								}
							}else{
								lonlatArray.push(new DMap.LonLat(strLonlat1[0],strLonlat1[1]));
							}
							lastStrLonlat=strLonlats[0];//将本条第二个坐标字符串传给变量
						}
						/*else if(strLonlats.length>=2){//如果坐标数量为其它
							for(var j=0;j<strLonlats.length;j++){
								var strLonlat_x=strLonlats[j].split(' ');
								if(0==j){
									if(lastStrLonlat){
										if(lastStrLonlat!=strLonlats[0]){//如果当前第一个坐标与上条记录最后一条不一致，则划线
											arrLonlats.push(new DMap.LonLat(strLonlat_x[0],strLonlat_x[1]));
										}
									}else{
										arrLonlats.push(new DMap.LonLat(strLonlat_x[0],strLonlat_x[1]));
									}
								}else{
									if(lastStrLonlat!=strLonlats[j]){
										arrLonlats.push(new DMap.LonLat(strLonlat_x[0],strLonlat_x[1]));
									}
								}
								lastStrLonlat=strLonlats[j];//将本条第二个坐标字符串传给变量
							}
						}else{
							alert("strLonlats.length:"+strLonlats.length);
						}*/
			//lonlatArray.push();
		}
		if(dataArr.length<=0||lonlatArray.length<=0)return;
		//map.panTo(lonlatArray[0]);// 居中
		map.setCenter(lonlatArray[0], 14);
		var polyline=new DMap.Polyline(lonlatArray,{});
		map.addOverlay(polyline);
		var moveMarker=new DMap.MoveMarker(new DMap.LonLat(),
			{
				type:3,
				labelText:jymc,
				text:jymc,
				markText:jymc,
				labelFontSize:12,
				labelColor:"black",
				labelBackgroundColor:'white',
				markText:dataArr[0].gpstime,url:imgUrl,size:new DMap.Size(32,32)}
			);
		map.addOverlay(moveMarker);
		moveMarker.setCommonEvent();
		moveMarker.setRepeat(false);//是否重复
		//根据移动点设置地图中心
		var i = 1;
		DMap.$(moveMarker).bind("move",function(e,lonlat){
			map.panTo(lonlat);// 居中
			/*if( i<lonlatArray.length&&Math.abs(lonlat.lon - lonlatArray[i].lon) < 0.000025 && Math.abs(lonlat.lat - lonlatArray[i].lat) < 0.000025 ){
				moveMarker.setSymbol({type:3,markText: jymc+"\<br\>"+dataArr[i].gpstime});
				i++;
			}*/
		});
		DMap.$(moveMarker).bind("movestep",function(e,lonlat){
			moveMarker.setSymbol({type:3,markText: jymc+"\<br\>"+dataArr[i].gpstime});
			i++;
		});
		var timestart = dataArr[0].gpstime.replace(/-/g,"/");
		var timeend = dataArr[dataArr.length-1].gpstime.replace(/-/g,"/");
		//var date = new Date(timestart );
		var alltime=new Date(timeend).getTime()-new Date(timestart).getTime();
		alltime=dataArr.length*500;
		//绑定移动结束事件
		DMap.$(moveMarker).bind("moveend",function(e,lonlat){
			//showMoveEndInfoWindow(this.getLonlat());
			//endEvt(this.getLonlat());
			i = 1;
			_lonlatArray=lonlatArray;
			_moveMarker=moveMarker;
			_allTime=alltime;
			_endEvt=endEvt;
			self.showMoveEndInfoWindow(lonlat,lonlatArray,endEvt,moveMarker,alltime);
		});
		//self.showMoveEndInfoWindow(lonlatArray[0],lonlatArray,endEvt,moveMarker);
		/*//绑定点击事件
		DMap.$(moveMarker).bind("click",function(e){
			showMoveEndInfoWindow(this.getLonlat());
		});*/
		
		
		moveMarker.startMove(lonlatArray,alltime);
	},
	
showMoveEndInfoWindow:function(lonlat,lonlatArray,endEvt,moveMarker,alltime){
	var html="";
	/*if(pcs.type==0){
		html = "<table style='font-size:12px;' ><tr ><td><b>车牌号码：</b>" + pcs.car.carnumber + "<br /></td></tr>" +
		"<tr ><td><b>部门名称：</b>" + pcs.car.department + "<br /></td></tr>";
		// + "<tr ><td><b>类型：</b>" + pcs.car.platetypeText + "<br /></td></tr>"
		// + "<tr ><td><b>在线状态：</b>" + pcsStateList[pcs.car.carstate] + "<br /></td></tr>";
	}else{
		html = "<table style='font-size:12px;' ><tr ><td><b>警员编号：</b>" + pcs.person.policeid + "<br /></td></tr>" +
		"<tr ><td><b>警员姓名：</b>" + pcs.person.personName + "<br /></td></tr>" +
		"<tr ><td><b>部门名称：</b>" + pcs.person.department + "<br /></td></tr>"
		+ "<tr ><td><b>GPS时间：</b>" + pcs.person.gpstime + "<br /></td></tr>"
		+ "<tr ><td><b>联系电话：</b>" + pcs.person.telnumber + "<br /></td></tr>";
		// + "<tr ><td><b>设备状态：</b>" + pcsStateList[pcs.person.personstate] + "<br /></td></tr>";
	}
	
	html+="<tr><td><b>开始时间：</b>" + pcs.timeStart + "<br /></td></tr>" ;
	html+="<tr><td><b>结束时间：</b>" + pcs.timeEnd + "<br /></td></tr>" ;*/
	//"+lonlatArray+","+moveMarker+","+ alltime+"
	html+="<table style='font-size:12px;color:black;margin-top:20px;margin-left:50px;' ><tr><td><input type='button'  onclick='repeatMoveMarker()' value='轨迹重播'/></td><td><input type='button' style='margin-left:10px;' onclick='removeHistory();' value='完成'/></td></tr>";
	//html+="<tr><td><input type='button' onclick='repeatMarker()' value='轨迹重播'/></td><td><input type='button' onclick='removeHistory();' value='轨迹移除'/></td></tr>";
	html+="</table>";
	map.openInfoWindowHtml(lonlat,html);
},
/*repeatMoveMarker:function(lonlatArray){
	map.closeInfoWindow();
	moveMarker.moveToLonlat(lonlatArray[0]);
	moveMarker.startMove(lonlatArray);
},
removeHistory:function(){
	map.closeInfoWindow();
	map.clearOverlays();
},*/
	/**
	 * 添加警情范围内岗位相关警员
	 */
	addGwJyInCircle:function(opts){
		if(!opts.wktStr){
			alert("err：没有传入范围");
			return;
		}
		//获取各个勤务图层的岗位信息qw_pt,qw_pl,qw_pg
		var options={
			layerName:"qw_pt"
			,colList:"all"
			,beginRecord:0
			,featureLimit:10000
			,returnProjectionId:0
		};
		DMap.$.extend(options,opts);
		var mapData=new DMap.MapData({
			serviceMethod:"spatialSearch",
			returnType:1,
			layerName:options.layerName,
			wktStr:options.wktStr,
			colList:options.colList,
			beginRecord:options.beginRecord,
			featureLimit:options.featureLimit,
			returnProjectionId:options.returnProjectionId
		});
		mapData.sendRequest(function(data,config){
			if(data.Result=='Error'){// 出错了
				alert(data.Msg);// 数据访问更新服务返回的错误信息
				return;
			}
			// 在这里添加你的实现代码，data是返回的数据对象，config是你发送请求的参数信息
			//根据获取的岗位信息在勤务系统接口中获取相应的人员信息，最后根据人员信息在GPS数据里获取定位信息（GPS接口）
		});
	},
	/**
	 * 用于存储视频专题图中的摄像头设备，以便单独移除所有摄像头
	 */
	sxjList:new Array(),
	/**
	 * 添加所有的摄像机信息
	 * @param {} clickEvt
	 */
	addSXJ:function(clickEvt){
		var self=this;
		var mapData=new DMap.MapData({
			serviceMethod:"search"
			,returnType:1
			,layerName:"sp_pt"
			,colList:"all"
			,beginRecord:0
			,featureLimit:10000
			,returnProjectionId:0
		});
		mapData.sendRequest(function(data,config){
			if(data.Result=='Error'){// 出错了
				alert(data.Msg);// 数据访问更新服务返回的错误信息
				return;
			}
			// 在这里添加你的实现代码，data是返回的数据对象，config是你发送请求的参数信息
			for(var i=0;i<data[0].rowList.length;i++){
				/*var point=DMap.Overlay.createByWKT(data[0].rowList[i].values.SHAPE,
					{
						url:ImgUrl4Gis+"摄像头.png",
						size : new DMap.Size(32,32)
					});*/
				var wkt=data[0].rowList[i].values.SHAPE;
				var point = new DMap.SizableMarker(DMap.Util.wkt2lonlatArray(wkt)[0],
					{	
						url:ImgUrl4Gis+"摄像头.png",
						size : new DMap.Size(16,16)
					});
				point.gType="POINT";
				point.wktStr=wkt;
				point.JLBH=data[0].rowList[i].values.JLBH;
				point.getWktStr=function(){
					return this.wktStr;
				};
				//map.addOverlay(line,{color:"red"});
				point.setCommonEvent();
				map.addOverlay(point);
				self.sxjList.push(point);
				if(clickEvt)
				DMap.$(point).bind("click",function(e,p){
					clickEvt(e.target);
				});
			}
			
		});
	},
	removeSXJ:function(){
		var self=this;
		for(sxj in self.sxjList){
			map.removeOverlay(self.sxjList[sxj]);
		}
		self.sxjList.splice(0,self.sxjList.length);
	},
	addSXJWithWkt:function(opts){
		if(!opts.wktStr){
			alert("err：没有传入范围");
			return;
		}
		var options={
			layerName:"sp_pt"
			,colList:"all"
			,beginRecord:0
			,featureLimit:10000
			,returnProjectionId:0
		};
		DMap.$.extend(options,opts);
		var mapData=new DMap.MapData({
			serviceMethod:"spatialSearch",
			returnType:1,
			layerName:options.layerName,
			wktStr:options.wktStr,
			colList:options.colList,
			beginRecord:options.beginRecord,
			featureLimit:options.featureLimit,
			returnProjectionId:options.returnProjectionId
		});
		mapData.sendRequest(function(data,config){
			if(data.Result=='Error'){// 出错了
				alert(data.Msg);// 数据访问更新服务返回的错误信息
				return;
			}
			// 在这里添加你的实现代码，data是返回的数据对象，config是你发送请求的参数信息
			for(var i=0;i<data[0].rowList.length;i++){
				/*var point=DMap.Overlay.createByWKT(data[0].rowList[i].values.SHAPE,
					{
						url:ImgUrl4Gis+"摄像头.png",
						size : new DMap.Size(16,16)
					});*/
				var wkt=data[0].rowList[i].values.SHAPE;
				var point = new DMap.SizableMarker(DMap.Util.wkt2lonlatArray(wkt)[0],
					{	
						url:ImgUrl4Gis+"摄像头.png",
						size : new DMap.Size(16,16)
					});
				point.gType="POINT";
				point.JLBH=data[0].rowList[i].values.JLBH;
				point.wktStr=wkt;
				point.getWktStr=function(){
					return this.wktStr;
				};

				//map.addOverlay(line,{color:"red"});
				map.addOverlay(point);
				point.setCommonEvent();
				if(opts.clickEvt)
				DMap.$(point).bind("click",function(e,p){
					opts.clickEvt(e.target);
				});
			}
			
		});
	},
	/**
	 * 在地图上标注新的警情
	 */
	addJqOnMap:function(callback){
		var self=this;
		map.setCursor("crosshair");
		//方式一
		map.activateTool('POINT',function(e,lonlats){
			map.deactivate();
			map.setCursor("url("+gisapi.getImageUrl('openhand.cur')+"), default");
			var imgUrl=ImgUrl4Gis + "通用.png";
			var _markerSize=self.getImgSizeByZoom();
			var markerJQ=new DMap.SizableMarker(lonlats, {
				url : imgUrl,
				size : new DMap.Size(_markerSize,_markerSize)
			});
			//markerJQ._dom.style={};
			//markerJQ._dom.src="";markerJQ._dom.className = 'abc';
			markerJQ.setCommonEvent();
			map.addOverlay(markerJQ);
			//获取离警情最近的一条路
			var mapData=new DMap.MapData({
				serviceMethod:"searchMinDistance"
				,returnType:1
				,layerName:"csdlw_pl"
				,wktStr:"POINT("+lonlats.lon+" "+ lonlats.lat+")"
				,colList:"all"
				,beginRecord:0
				,featureLimit:10
				,r:1000
				});
			mapData.sendRequest(function(data,config){
				var road=null;
				if(data.Result=='Error'){//出错了
					//alert(data.Msg);//数据访问更新服务返回的错误信息
//					callback(e,lonlats,null,markerJQ);//当获取不到符合要求的道路信息时，传递的road参数为空
//					return;
				}else{
					road=data[0].rowList[0].values;
				}	
				//在这里添加你的实现代码，data是返回的数据对象，config是你发送请求的参数信息
				//callback(e,lonlats,road,markerJQ);//values.DLMC
				var mapData4XQ=new DMap.MapData({
					serviceMethod:"spatialSearch"
					,returnType:1
					,layerName:"JJXQ_PG"
					,wktStr:"POINT("+lonlats.lon+" "+ lonlats.lat+")"
					,colList:"all"
					,beginRecord:0
					,featureLimit:10
				});
				mapData4XQ.sendRequest(function(dataResult,config){
					var xq=null;
					if(dataResult.Result!='Error'&&dataResult.length>0&&dataResult[0].rowList.length>0){
						xq=dataResult[0].rowList[0].values;
					}
					callback(e,lonlats,road,xq,markerJQ);
				});
			});
			
			//callback(e,lonlats,"这里传递最近的一条路的名称",markerJQ);
		},null,{"start":'点击地图进行标绘',"move":'点击地图进行标绘',"end":'点击地图进行标绘'});
		//map.hideFloatHelper();
		//方式二
		/*DMap.$(map._dom).one("mousedown",{},function(e){
			map.setCursor("url("+gisapi.getImageUrl('openhand.cur')+"), default");
			var lonlat=map.fromMouseEventToLonLat(e);
			alert(lonlat);
			callback(e);
		});*/
	},
	//====================================================================================
	//                             勤务系统标注岗位相关
	//====================================================================================
	_gwOverlayTemp:null,//临时存放画的点线面等
	/**
	 * 存放岗位信息
	 * id-overlay（点线面）
	 * @type 
	 */
	hashMap4Gw : {
		Set : function(key, value) {this[key] = value;},
		Get : function(key) {return this[key];},
		Contains : function(key) {return this.Get(key) == null ? false : true;},
		Remove : function(key) {delete this[key];},
		Clear:function(){
			for(var key in this){
				if(key=="Set"||key=="Get"||key=="Contains"||key=="Remove"||key=="Clear")
				continue;
				delete this[key];
			}
		}
	},
	hashMap4Jc : {
		Set : function(key, value) {this[key] = value;},
		Get : function(key) {return this[key];},
		Contains : function(key) {return this.Get(key) == null ? false : true;},
		Remove : function(key) {delete this[key];},
		Clear:function(){
			for(var key in this){
				if(key=="Set"||key=="Get"||key=="Contains"||key=="Remove"||key=="Clear")
				continue;
				delete this[key];
			}
		}
	},
	turnToDrawingStatus:function(){
		DMap.$("#TileLayer11").css("z-index",188);
	},
	turnToNormalStatus:function(){
		DMap.$("#TileLayer11").css("z-index",88);
	},
	/**
	 * 标绘点类型岗位
	 * @param {} _symbol
	 * @param {} callback
	 * @param {} clickEvt
	 */
	drawGwPointOnMap:function(uuid,_symbol,callback,clickEvt){
		var self=this;
		var arr=null;
		self.turnToDrawingStatus();
		if(self.hashMap4Gw.Contains(uuid)){
			//map.removeOverlay(self.hashMap4Gw.Get(uuid));
			arr=self.hashMap4Gw.Get(uuid);
		}else{
			arr=new Array();
		}
		map.setCursor("crosshair");
		var symbol={
			fillOpacity:(_symbol&&_symbol.fillOpacity)?_symbol.fillOpacity:0.3,
			fillColor:(_symbol&&_symbol.color)?_symbol.color:"blue",
			color:"red",
			weight:0,
			r:(_symbol&&_symbol.r)?_symbol.r:30
		};
		//方式一
		map.activateTool('POINT',function(e,lonlats){
			//self.removeMarker(self._gwOverlayTemp);
			self.turnToNormalStatus();
			map.deactivate();
			map.setCursor("url("+gisapi.getImageUrl('openhand.cur')+"), default");
			//var point =new DMap.Point
			//return;
			/*var imgUrl=ImgUrl4Gis + "通用.png";
			var _markerSize=self.getImgSizeByZoom();
			var markerJQ=new DMap.SizableMarker(lonlats, {
				url : imgUrl,
				size : new DMap.Size(_markerSize,_markerSize)
			});
			map.addOverlay(markerJQ);*/
			//================================================================
			//根据缩放级别改变半径，防止画点岗位时特别小的情况
			var curzoom=map.getZoom();
			var R=symbol.r;
			if(curzoom<=16&&curzoom>10){
				R=R*2*(17-curzoom);
			}
			//======================================================================
			var point=new DMap.Round([lonlats,R],{weight:0,fillOpacity:symbol.opacity,fillColor:symbol.fillColor,color:symbol.color});
			arr.push(point);
			self.hashMap4Gw.Set(uuid,arr);
			//self.hashMap4Gw.Set(uuid,point);
			point.areaid=uuid;
			point.setCommonEvent();
			point.areaType=0;
			point.centerPoint=lonlats;
			point.r=symbol.r;
			if(clickEvt){
				DMap.$(point).bind("click",function(e,p){
					clickEvt(e.target);
				});
			}
			map.addOverlay(point);
			self._gwOverlayTemp=point;
			callback(MapConfig.Lanlats2Wkt("point",lonlats),point);
		},null,{"start":'点击地图进行标绘',"move":'点击地图进行标绘',"end":'点击地图进行标绘'});
		//map.hideFloatHelper();
	},
	/**
	 * 
	 * @param {} plateNumber 车牌号
	 * @param {} callback 标注回调事件
	 * @param {} clickEvt 单击事件
	 */
	drawJcPointOnMap:function(uuid,plateNumber,callback,clickEvt){
		var self=this;
		var arr=null;
		self.turnToDrawingStatus();
		if(self.hashMap4Jc.Contains(uuid)){
			//map.removeOverlay(self.hashMap4Gw.Get(uuid));
			arr=self.hashMap4Jc.Get(uuid);
		}else{
			arr=new Array();
		}
		var overlay=null;
		for(var i=0;i<arr.length;i++){
			overlay=arr[i];
			if(overlay.getLabelText()==plateNumber){
				map.removeOverlay(overlay);
				arr.splice(i, 1);
				break;
			}
		}
		map.setCursor("crosshair");
		//方式一
		map.activateTool('POINT',function(e,lonlats){
			//self.removeMarker(self._gwOverlayTemp);
			self.turnToNormalStatus();
			map.deactivate();
			map.setCursor("url("+gisapi.getImageUrl('openhand.cur')+"), default");
			var _markSize=self.getImgSizeByZoom();
			var imgUrl = ImgUrl4Gis + "警车.png";
			var point = new DMap.SizableMarker(lonlats, {
				type:3,
				//markText:locateinfo[i].syjymc,
				labelText:plateNumber,
				labelFontSize:12,
				url : imgUrl,
				size : new DMap.Size(_markSize, _markSize)
			});
			arr.push(point);
			self.hashMap4Jc.Set(uuid,arr);
			//self.hashMap4Gw.Set(uuid,point);
			point.areaid=uuid;
			point.setCommonEvent();
			point.centerPoint=lonlats;
			if(clickEvt){
				DMap.$(point).bind("click",function(e,p){
					clickEvt(e.target);
				});
			}
			map.addOverlay(point);
			//self._gwOverlayTemp=point;
			callback(MapConfig.Lanlats2Wkt("point",lonlats),point);
		},null,{"start":'点击地图进行标绘',"move":'点击地图进行标绘',"end":'点击地图进行标绘'});
	},
	drawGwPolylineOnMap:function(uuid,_symbol,callback,clickEvt){
		var self=this;
		var arr=null;
		self.turnToDrawingStatus();
		if(self.hashMap4Gw.Contains(uuid)){
			//map.removeOverlay(self.hashMap4Gw.Get(uuid));
			arr=self.hashMap4Gw.Get(uuid);
		}else{
			arr=new Array();
		}
		map.setCursor("crosshair");
		map.activateTool('POLYLINE',function(e,lonlats){
			self.turnToNormalStatus();
		 //map.clearOverlays();
		 //self.removeMarker(self._gwOverlayTemp);
		 map.deactivate();
		 map.setCursor("url("+gisapi.getImageUrl('openhand.cur')+"), default");
		 var symbol={color: '#008040',weight:4,startarrow:"none",endarrow:"none",startarrowlength:"medium",endarrowwidth:"medium",endarrowlength:"medium",animateFromColor:"#FF0000",opacity:255};
		 DMap.$.extend(symbol,_symbol);
		 // polyline=new DMap.Polyline(lonlats,{color: 'blue',endarrow: "Classic",dashstyle:"dashdot",weight: 5,animateFromColor: 'red'});
		 var polyline=new DMap.Polyline(lonlats,symbol);
		 arr.push(polyline);
		 self.hashMap4Gw.Set(uuid,arr);
		 //self.hashMap4Gw.Set(uuid,polyline);
		 polyline.areaid=uuid;
		 polyline.setCommonEvent();
		 polyline.areaType=1;
		 //polyline.setSymbol({fillColor :"white",color : "blue"});//设置样式
			if(clickEvt){
				DMap.$(polyline).bind("click",function(e,p){
					clickEvt(e.target);
				});
			}
			map.addOverlay(polyline);
			self._gwOverlayTemp=polyline;
			callback(MapConfig.Lanlats2Wkt("polyline",polyline.getLonLats()),polyline);//polyline.getWktStr();

		});
	},
	drawGwPolygonOnMap:function(uuid,_symbol,callback,clickEvt){
		var self=this;
		var arr=null;
		self.turnToDrawingStatus();
		if(self.hashMap4Gw.Contains(uuid)){
			//map.removeOverlay(self.hashMap4Gw.Get(uuid));
			arr=self.hashMap4Gw.Get(uuid);
		}else{
			arr=new Array();
		}
		map.setCursor("crosshair");
		map.activateTool('POLYGON',function(e,lonlats){
			self.turnToNormalStatus();
			 //map.clearOverlays();
			 //self.removeMarker(self._gwOverlayTemp);
			 map.deactivate();
		 	 map.setCursor("url("+gisapi.getImageUrl('openhand.cur')+"), default");
		 	 var symbol={color: 'black',fillColor:'orange',fillOpacity:0.6,opacity:0.7,weight:2,fillType:"ForwardDiagonal"};
		 	 DMap.$.extend(symbol,_symbol);
			 var polygon=new DMap.Polygon(lonlats,symbol);//添加多边形
			 arr.push(polygon);
		 	 self.hashMap4Gw.Set(uuid,arr);
			 //self.hashMap4Gw.Set(uuid,polygon);
		     polygon.areaid=uuid;
			 polygon.setCommonEvent();
			 polygon.areaType=2;
				/*DMap.$(polygon).bind("click",function(e,p){
					 polygon.hide();//点击隐藏
						setTimeout(function(){polygon.show();}, 1000);
				});*/
				if(clickEvt){
					DMap.$(polygon).bind("click",function(e,p){
						//e.preventDefault();e.stopPropagation();
						clickEvt(e.target);
					});
				}
				/*
				DMap.$(polygon).bind("mouseover",function(e){DMap.log(e.type+':'+this.getLonlats())});
				DMap.$(polygon).bind("mouseout",function(e){DMap.log(e.type+':'+this.getLonlats())});
				DMap.$(polygon).bind("clear",function(e){DMap.log(e.type+':'+this.getLonlats())});
				DMap.$(polygon).bind("visibilitychanged",function(e){DMap.log(e.type+':'+this.getLonlats())});
				*/
				map.addOverlay(polygon);
				self._gwOverlayTemp=polygon;
				callback(MapConfig.Lanlats2Wkt("polygon",polygon.getLonLats()),polygon);
			});
	},
	//确认添加刚画的岗位
	addGwOnMap:function(id,overlay,symbol,clickEvt){
		var self=this;
		if(overlay==null){//如果没有传overlay参数，则取内存里存的最近的一个
			overlay=self._gwOverlayTemp;
		}
		if(self.hashMap4Gw.Contains(id)){
			self.removeMarker(overlay);
		}
		self.hashMap4Gw.Set(id,overlay);
		if(symbol)overlay.setSymbol(symbol);
		overlay.setCommonEvent();
		overlay.areaid=id;
		if(clickEvt){
					DMap.$(overlay).bind("click",function(e,p){
						clickEvt(e.target);
					});
				}
		map.addOverlay(overlay);
		self._gwOverlayTemp=null;
		return overlay;
	},
	/**
	 * 存储岗位文字标注 marker
	 */
	gwLabelList:new Array(),//或用hastable存储
	hashMap4GwLabel : {
		Set : function(key, value) {this[key] = value;},
		Get : function(key) {return this[key];},
		Contains : function(key) {return this.Get(key) == null ? false : true;},
		Remove : function(key) {delete this[key];},
		Clear:function(){
			for(var key in this){
				if(key=="Set"||key=="Get"||key=="Contains"||key=="Remove"||key=="Clear")
				continue;
				delete this[key];
			}
		}
	},
	ifBindZoomEnd4PointGw:false,
	/**
	 * 在地图上显示所有岗位信息（根据json数组）
	 * @param {} jsonArr
	 */
	showGwsOnMap:function(jsonArr,clickEvt){
		var self=this;
		var hashMap4Gw=self.hashMap4Gw;
		var hashMap4GwLabel=self.hashMap4GwLabel;
		var hashMap4Jc=self.hashMap4Jc;
		var symbol;
		map.clearOverlays();
		hashMap4Gw.Clear();
		hashMap4GwLabel.Clear();
		hashMap4Jc.Clear();
		for(var i=0;i<jsonArr.length;i++){//wktStr,areaID,areaType(点线面),symbol
			if(jsonArr[i].areaType==3||jsonArr[i].areaType=='3')continue;
			symbol=null;
			switch(jsonArr[i].areaType){
				case 0:
				case "0"://点
					symbol={
						fillOpacity:0.8,
						fillColor:(jsonArr[i].bZColor)?jsonArr[i].bZColor:"blue",r:jsonArr[i].r?jsonArr[i].r:30,weight:0
					};
					break;
				case 1:
				case "1"://线
					symbol={
					color: jsonArr[i].bZColor,
					weight:jsonArr[i].bzThinckness,
					opacity:jsonArr[i].bzAlpha
					};
					break;
				case 2:
				case "2"://面
				symbol={color:"black",fillColor:jsonArr[i].bZColor,fillOpacity:jsonArr[i].bzAlpha,opacity:jsonArr[i].bzAlpha,weight:jsonArr[i].bzThinckness};
					break;
				default:
					break;
			}
			var overlay=null;
			var overlayArr=new Array();
			var lonlat4Point=null;
			var gwLabel=null;
			//bz有可能是多个wkt
			var wktArr=jsonArr[i].bZ.split('|');
			for(var j=0;j<wktArr.length;j++){
				if(jsonArr[i].areaType==0||jsonArr[i].areaType=="0"){
				lonlat4Point=MapConfig.Wkt2LonLat(wktArr[j]);//jsonArr[i].bZ
				overlay=new DMap.Round([lonlat4Point,symbol.r],symbol);
				}else{
					overlay=DMap.Overlay.createByWKT(wktArr[j],symbol);
				}
				overlay.areaType=jsonArr[i].areaType;
				overlay.areaID=jsonArr[i].areaID;
				//获取岗位对应的样式属性并赋值
				switch(jsonArr[i].areaType){
					case 0:
					case "0"://点
						overlay.fillOpacity=symbol.fillOpacity;
						overlay.fillColor=symbol.fillColor;
						overlay.r=symbol.r;
						overlay.weight=symbol.weight;
						overlay.centerPoint=lonlat4Point;
						break;
					case 1:
					case "1"://线
						overlay.color=symbol.color;
						overlay.opacity=symbol.opacity;
						overlay.weight=symbol.weight;
						break;
					case 2:
					case "2"://面
						overlay.color=symbol.color;
						overlay.fillOpacity=symbol.fillOpacity;
						overlay.opacity=symbol.opacity;
						overlay.weight=symbol.weight;
						break;
					default:
						break;
				}
				
				overlay.setCommonEvent();
				overlayArr.push(overlay);
				if(clickEvt){
						DMap.$(overlay).bind("click",function(e,p){
							clickEvt(e.target);
						});
					}
				map.addOverlay(overlay);
			}
			if(overlayArr.length>0){
				//创建岗位标注并显示   ----------------还要在removebyid时删除hashMap4GwLabel对应项
				/*gwLabel=new DMap.SizableMarker(new DMap.LonLat(overlayArr[0].x,jsonObj.y),{type:2,text:jsonArr[i].jymc});
				map.addOverlay(gwLabel);
				hashMap4GwLabel.Set(jsonArr[i].areaID,gwLabel);*/
				hashMap4Gw.Set(jsonArr[i].areaID,overlayArr);
			}
			
			//=============================将岗位对应的警车画到地图==================================================
			//bz有可能是多个wkt
			if(null!=jsonArr[i].carCoordinate){
				var _markSize=self.getImgSizeByZoom();
				var imgUrl = ImgUrl4Gis + "警车.png";
				overlayArr=new Array();
				wktArr=jsonArr[i].carCoordinate.split(',');//jcWkt
				var palateNumArr=jsonArr[i].carNo.split(',');//palateNums
				for(var j=0;j<wktArr.length;j++){
					lonlat4Point=MapConfig.Wkt2LonLat(wktArr[j]);//jsonArr[i].bZ
					var point = new DMap.SizableMarker(lonlat4Point, {
						type:3,
						//markText:locateinfo[i].syjymc,
						labelText:palateNumArr[j],
						labelFontSize:12,
						url : imgUrl,
						size : new DMap.Size(_markSize, _markSize)
					});
					//overlay.areaType=jsonArr[i].areaType;
					point.areaID=jsonArr[i].areaID;	
					point.setCommonEvent();
					overlayArr.push(point);
					/*if(clickEvt){
							DMap.$(overlay).bind("click",function(e,p){
								clickEvt(e.target);
							});
						}*/
					map.addOverlay(point);
				}
				if(overlayArr.length>0){
					hashMap4Jc.Set(jsonArr[i].areaID,overlayArr);
				}
			}
			
		}
		//防止点岗位地图缩小后消失看不到
		if(self.ifBindZoomEnd4PointGw==false){
			//DMap.$(map).unbind("zoomend");
			DMap.$(map).bind("zoomend", function() {//.mapChangeListener
				//alert(map.getZoom());
				//alert(Object.getOwnPropertyNames(hashMap4Gw).length);
				var n=Object.getOwnPropertyNames(hashMap4Gw).length;
				if(n>5){
					var curzoom=map.getZoom();
					if(curzoom<=16&&curzoom>12){
						var overlay=null;
						var overlayArr=null;
						var newoverlay={};
						for(var key in hashMap4Gw){
							if(key=="Set"||key=="Get"||key=="Contains"||key=="Remove"||key=="Clear")
							continue;
							overlayArr=hashMap4Gw.Get(key);
							var ifPoint=false;
							for(var i=0;i<overlayArr.length;i++){
								overlay=overlayArr[i];
								if(overlay.areaType==0||overlay.areaType=="0"){
								ifPoint=true;
								//newoverlay=DMap.Overlay.clone(overlay);
								//newoverlay=deepCopy(overlay);
								newoverlay.centerPoint=overlay.centerPoint;
								newoverlay.r=overlay.r;
								newoverlay.symbol=overlay.getSymbol();
								map.removeOverlay(overlay);
								overlay=new DMap.Round([newoverlay.centerPoint,newoverlay.r*2*(17-curzoom)],newoverlay.symbol);
								overlay.areaType=0;
								overlay.areaID=key;
								overlay.fillOpacity=newoverlay.symbol.fillOpacity;
								overlay.fillColor=newoverlay.symbol.fillColor;
								overlay.r=newoverlay.r;
								overlay.weight=newoverlay.symbol.weight;
								overlay.centerPoint=newoverlay.centerPoint;
								overlay.setCommonEvent();
								//newoverlay.remove();
								//overlayArr.push(overlay);
								overlayArr[i]=overlay;
								if(clickEvt){
										DMap.$(overlay).bind("click",function(e,p){
											clickEvt(e.target);
										});
									}
								map.addOverlay(overlay);
								
							}
							}
							//this[key]=overlayArr;
							if(ifPoint)
							hashMap4Gw.Set(key,overlayArr);
						}
					}else if(17==curzoom){
						var overlay=null;
						var overlayArr=null;
						var newoverlay={};
						for(var key in hashMap4Gw){
							if(key=="Set"||key=="Get"||key=="Contains"||key=="Remove"||key=="Clear")
							continue;
							overlayArr=hashMap4Gw.Get(key);
							var ifPoint=false;
							for(var i=0;i<overlayArr.length;i++){
								overlay=overlayArr[i];
								if(overlay.areaType==0||overlay.areaType=="0"){
								ifPoint=true;
								//newoverlay=DMap.Overlay.clone(overlay);
								//newoverlay=deepCopy(overlay);
								newoverlay.centerPoint=overlay.centerPoint;
								newoverlay.r=overlay.r;
								newoverlay.symbol=overlay.getSymbol();
								map.removeOverlay(overlay);
								overlay=new DMap.Round([newoverlay.centerPoint,newoverlay.r],newoverlay.symbol);
								overlay.areaType=0;
								overlay.areaID=key;
								overlay.fillOpacity=newoverlay.symbol.fillOpacity;
								overlay.fillColor=newoverlay.symbol.fillColor;
								overlay.r=newoverlay.r;
								overlay.weight=newoverlay.symbol.weight;
								overlay.centerPoint=newoverlay.centerPoint;
								overlay.setCommonEvent();
								//newoverlay.remove();
								//overlayArr.push(overlay);
								overlayArr[i]=overlay;
								if(clickEvt){
										DMap.$(overlay).bind("click",function(e,p){
											clickEvt(e.target);
										});
									}
								map.addOverlay(overlay);
								
							}
							}
							//this[key]=overlayArr;
							if(ifPoint)
							hashMap4Gw.Set(key,overlayArr);
						}
					}
				}
			});
			self.ifBindZoomEnd4PointGw=true;
		}
		
	},
	/**
	 * 根据uuid移除该岗位中最后一个覆盖物（点线面）
	 * @param {} id
	 */
	removeLastGw:function(id){
		var self=this;
		if(self.hashMap4Gw.Contains(id)){
			var overlayArr=self.hashMap4Gw.Get(id);
			if(overlayArr!=null&&overlayArr.length>0){
				map.removeOverlay(overlayArr[overlayArr.length-1]);
				overlayArr.pop();
				self.hashMap4Gw.Set(id,overlayArr);
			}
		}
	},
	removeGwById:function(id){
		var self=this;
		var marker=null;
		var overlayArr=null;
		if(self.hashMap4Gw.Contains(id)){
			//marker=self.hashMap4Gw.Get(id);
			overlayArr=self.hashMap4Gw.Get(id);
		}
		/*if(marker){
			self.hashMap4Gw.Remove(id);
			map.removeOverlay(marker);
		}*/
		if(overlayArr!=null&&overlayArr.length>0){
			for(var i=0;i<overlayArr.length;i++){
				overlay=overlayArr[i];
				map.removeOverlay(overlay);
			}
		}
		self.hashMap4Gw.Remove(id);
		//移除该岗位对应的警车============================================
		if(self.hashMap4Jc.Contains(id)){
			//marker=self.hashMap4Gw.Get(id);
			overlayArr=self.hashMap4Jc.Get(id);
		}
		if(overlayArr!=null&&overlayArr.length>0){
			for(var i=0;i<overlayArr.length;i++){
				overlay=overlayArr[i];
				map.removeOverlay(overlay);
			}
		}
		self.hashMap4Jc.Remove(id);
	},
	removeJcByUuidAndCarNo:function(uuid,carNo){
		var self=this;
		var marker=null;
		var overlayArr=null;
		if(self.hashMap4Jc.Contains(uuid)){
			//marker=self.hashMap4Gw.Get(id);
			overlayArr=self.hashMap4Jc.Get(uuid);
		}
		/*if(marker){
			self.hashMap4Gw.Remove(id);
			map.removeOverlay(marker);
		}*/
		if(overlayArr!=null&&overlayArr.length>0){
			for(var i=0;i<overlayArr.length;i++){
				overlay=overlayArr[i];
				if(overlay.getLabelText()==carNo){
					map.removeOverlay(overlay);
					overlayArr.splice(i, 1);
					break;
				}
				
			}
			self.hashMap4Jc.Set(uuid,overlayArr);
		}else{
			self.hashMap4Jc.Remove(uuid);
		}
	},
	showGwPointOnMap:function(callback){
		
	},
	showGwPolylineOnMap:function(callback){
		
	},
	showGwPolygonOnMap:function(callback){
		
	},
	_SelectedOverlay:new Array(),//临时存放选中的点线面等 //null
	/**
	 * 高亮显示某个覆盖物
	 * @param {} id
	 */
	highlightOverlayOmMap:function(id,zoomlv){
		var self=this;
		if(self.hashMap4Gw.Contains(id)){
			//var overlay=self.hashMap4Gw.Get(id);
			var overlayArr=self.hashMap4Gw.Get(id);
			var overlay;
			this._SelectedOverlay.splice(0,this._SelectedOverlay.length);
			var lonlat=null;
			/*if(overlay){
				var symbol={};
				switch(overlay.areaType){
					case 0://点
					case "0":
						symbol={
							color:"yellow",
							weight:4,
							opacity:1
						};
						lonlat=overlay.centerPoint;
						break;
					case 1://线
					case "1":
						lonlat=overlay.getLonLats()[0];
						symbol={
						color: "yellow",
						weight:4,
						opacity:1
						};
						break;
					case 2://面
					case "2":
						lonlat=overlay.getLonLats()[0];
						symbol={color:"yellow",opacity:1,weight:4};
						//fillColor:jsonArr[i].fillColor,fillOpacity:jsonArr[i].fillOpacity,
						break;
					default:
						break;
				}	
				overlay.setSymbol(symbol);
				this._SelectedOverlay=overlay;
				map.panTo(lonlat);
			}*/
			for(var i=0;i<overlayArr.length;i++){
				overlay=overlayArr[i];
				var symbol={};
				switch(overlay.areaType){
					case 0://点
					case "0":
						symbol={
							color:"#EE00EE",
							weight:3,
							opacity:1
						};
						lonlat=overlay.centerPoint;
						break;
					case 1://线
					case "1":
						lonlat=overlay.getLonLats()[0];
						symbol={
						color: "#EE00EE",
						weight:3,
						opacity:1
						};
						break;
					case 2://面
					case "2":
						lonlat=overlay.getLonLats()[0];
						symbol={color:"#EE00EE",opacity:1,weight:3};
						//fillColor:jsonArr[i].fillColor,fillOpacity:jsonArr[i].fillOpacity,
						break;
					default:
						break;
				}	
				overlay.setSymbol(symbol);
				overlay.setAnimate(true);//设置闪烁
				if(!overlay.getAnimate()){
					overlay.addAnimate({
						animateFromColor:"blue",
						animateColor:"green"
					},1000);
				}
				this._SelectedOverlay.push(overlay);
				if(zoomlv){
					map.setCenter(lonlat, zoomlv);
				}else{
					map.panTo(lonlat);
				}
			}
			
		}
	},
	/**
	 * 取消高亮选中状态
	 * @param {} id 可选
	 */
	cancelHighlight:function(id){//OverlayOmMap
		var self=this;
		var overlay=null;
		var overlayArr=null;
		if(id==null){
			if(this._SelectedOverlay!=null&&this._SelectedOverlay.length>0){
				//overlay=this._SelectedOverlay;
				overlayArr=this._SelectedOverlay;
			}
		}else if(self.hashMap4Gw.Contains(id)){
			overlayArr=self.hashMap4Gw.Get(id);
			
		}
		if(overlayArr!=null){
				for(var i=0;i<overlayArr.length;i++){
					overlay=overlayArr[i];
					var symbol={};
				switch(overlay.areaType){
					case 0://点
					case "0":
						symbol={
							color:overlay.color,
							weight:0,
							opacity:overlay.opacity
						};
						lonlat=overlay.centerPoint;
						break;
					case 1://线
					case "1":
						symbol={
						color: overlay.color,
						weight:overlay.weight,
						opacity:overlay.opacity
						};
						break;
					case 2://面
					case "2":
						symbol={color:overlay.color,opacity:overlay.opacity,weight:overlay.weight};
						//fillColor:jsonArr[i].fillColor,fillOpacity:jsonArr[i].fillOpacity,
						break;
					default:
						break;
				}	
				overlay.setSymbol(symbol);
				overlay.setAnimate(false);//取消闪烁
				overlay.isAnimate=false;
				//this._SelectedOverlay=null;
				this._SelectedOverlay.splice(0,this._SelectedOverlay.length);
				}
			}
	},
	/**
	 * 改变某个岗位的颜色
	 * @param {} id
	 * @param {} color
	 */
	changeColorOfGw:function(id,color){
		var self=this;
		var overlay=null;
		var overlayArr=null;
		if(self.hashMap4Gw.Contains(id)){
			//overlay=self.hashMap4Gw.Get(id);
			overlayArr=self.hashMap4Gw.Get(id);
		}
		if(overlayArr!=null&&overlayArr.length>0){
			for(var i=0;i<overlayArr.length;i++){
				overlay=overlayArr[i];
				var symbol={};
				switch(overlay.areaType){
					case 0://点
					case "0":
						symbol={
							fillColor:color
						};
						break;
					case 1://线
					case "1":
						symbol={
						color: color
						};
						break;
					case 2://面
					case "2":
						symbol={fillColor:color};
						break;
					default:
						break;
				}	
				overlay.setSymbol(symbol);
			}
			
		}
	},
	changeWeightOfGw:function(id,weight){
		var self=this;
		var overlay=null;
		var overlayArr=null;
		if(self.hashMap4Gw.Contains(id)){
			//overlay=self.hashMap4Gw.Get(id);
			overlayArr=self.hashMap4Gw.Get(id);
		}
		if(overlayArr!=null&&overlayArr.length>0){
			var symbol={weight:weight};
			for(var i=0;i<overlayArr.length;i++){
				overlay=overlayArr[i];
				overlay.setSymbol(symbol);
			}
		}
			
	},
	changeOpacityOfGw:function(id,opacity){
		var self=this;
		var overlay=null;
		var overlayArr=null;
		if(self.hashMap4Gw.Contains(id)){
			//overlay=self.hashMap4Gw.Get(id);
			overlayArr=self.hashMap4Gw.Get(id);
		}
		if(overlayArr!=null&overlayArr.length>0){
			var symbol={};
				switch(overlayArr[0].areaType){
					case 0://点
					case "0":
						symbol={
							fillOpacity:opacity
						};
						break;
					case 1://线
					case "1":
						symbol={
						opacity:opacity
						};
						break;
					case 2://面
					case "2":
						symbol={fillOpacity:opacity,opacity:opacity};
						break;
					default:
						break;
				}
				
				for(var i=0;i<overlayArr.length;i++){
					overlay=overlayArr[i];
					overlay.setSymbol(symbol);
				}
				
			}
	},
	/**
	 * 将某个警员居中地图显示并进行缩放
	 * @param {} jy 要居中显示的警员对象
	 * @param {} zoom (可选)缩放级别，默认为16
	 */
	showJyOnCenterOfMap:function(jy,zoom){
		var point = new DMap.LonLat(jy.x, jy.y);
		var level=16;
		if (zoom) {
			level = zoom;
		}
		map.setCenter(point, level);
	},
	/**
	 * 根据辖区编号获取辖区边界的wkt串
	 * @param {} xqbh 辖区编号
	 */
	getXqWktByXqbh:function(xqbh){
		var self=this;
		var mapData=new DMap.MapData({
			serviceMethod:"search"
			,returnType:1
			,sqlWhere:"xqbh="+xqbh
			,layerName:"jjxq_pg"
			,colList:"all"
			,beginRecord:0
			,featureLimit:10000
			,returnProjectionId:0
		});
		mapData.sendRequest(function(data,config){
			if(data.Result=='Error'){// 出错了
				alert(data.Msg);// 数据访问更新服务返回的错误信息
				return;
			}
			// 在这里添加你的实现代码，data是返回的数据对象，config是你发送请求的参数信息
			for(var i=0;i<data[0].rowList.length;i++){
				if(0==i){
					var wkt=data[0].rowList[i].values.SHAPE;
					return wkt;
				}
			}
			
		});
	},
	/**
	 * 移除地图中某个marker，不作其它任何操作
	 * @param {} marker
	 */
	removeMarker:function(marker){
		if(marker)
		map.removeOverlay(marker);
	},
	
	removeOverlays:function(){
		map.clearOverlays();
	},
	getCircleWktByLonlat:function(x,y,r){
		var circleTemp=new DMap.Round([new DMap.LonLat(x,y),r]);
		return this.getCircleWkt(circleTemp);
	},
	/**
	 * 从圆对象获取wkt字符串
	 * @param {} circle DMap.Round对象
	 * @return {} 圆对应的wkt字符串
	 */
	getCircleWkt:function(circle){//center,r
		var arrayLonlats=circle.getLonLats();
		var result="POLYGON((";
		for(var i=0;i<arrayLonlats.length;i++){
			result+=arrayLonlats[i].lon+' '+arrayLonlats[i].lat+',';
		}
		result=result.substring(0,result.length-1)+"))";
		return result;
	},
	/**
	 * 根据当前map的缩放等级来获取相应的图标尺寸
	 */
	getImgSizeByZoom:function(){
		if(map){
			var zoom=map.getZoom();
			var _markSize;
				var _fontSize;
				if (zoom <= 15) {
					_markSize = 16;
					//_fontSize=8;
				} else if (zoom <= 18) {
					_markSize = 24;
					//_fontSize=10;
				} else {
					_markSize = 32;
					//_fontSize=12;
				}
				return _markSize;
		}else{
			return 24;
		}
		
	},
	getImgUrlByJqJson:function(jsonObj){
		var imgUrl=ImgUrl4Gis+jsonObj.eventtypename;//"特殊事件-ov.png";
		if(jsonObj.eventtypename==""){
			imgUrl=ImgUrl4Gis+"通用";
			if(jsonObj.eventstate=="1"){
				imgUrl+="未处理";
			}
			imgUrl+=".png";
			return imgUrl;
		}
		if(jsonObj.eventstate=="1"){
			imgUrl+="未处理";
		}
		/*else{
			return ImgUrl4Gis+"通用.png";
		}*/
		if(jsonObj.overtime=="1"||jsonObj.overtime=="2"||jsonObj.overtime=="3"){
			imgUrl+="超时";
		}
		imgUrl+=".png";
		return imgUrl;
	},
	//js获取项目根路径，如： http://localhost:8083/uimcardprj  
	getRootPath:function (){  
	    //获取当前网址，如： http://localhost:8083/uimcardprj/share/meun.jsp  
	    var curWwwPath=window.document.location.href;  
	    //获取主机地址之后的目录，如： uimcardprj/share/meun.jsp  
	    var pathName=window.document.location.pathname;  
	    var pos=curWwwPath.indexOf(pathName);  
	    //获取主机地址，如： http://localhost:8083  
	    var localhostPaht=curWwwPath.substring(0,pos);  
	    //获取带"/"的项目名，如：/uimcardprj  
	    var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1);  
	    return(localhostPaht+projectName);  
	},
	test:function(){
		alert('fff');
	},
	/**
	 * 
	 * @param {} obj
	 */
	ShowTheObject:function (obj){  
	  	var des = "";  
	    for(var name in obj){  
	    des += name + ":" + obj[name] + ";";  
	     }  
	  	alert(des);  
	},
	loadScript : function(url, func) {
		var head = document.head || document.getElementByTagName('head')[0];
		var script = document.createElement('script');
		script.src = url;

		script.onload = script.onreadystatechange = function() {
			if (!this.readyState || this.readyState == 'loaded'
					|| this.readyState == 'complete') {
				func();
				script.onload = script.onreadystatechange = null;
			}
		};
  		head.append(script, 0);
	}
};
MapConfig.Wkt2LonLat=function(wkt){
	var match = /^[^\d\.]*\(([\d\.]+)\s+([\d\.]+)\)/.exec(wkt);
	var lonlat = new DMap.LonLat(match[1], match[2]);
	return lonlat;
};
/**
 * 根据坐标或者坐标数组生成相应的wkt字符串
 * @param {} type
 * @param {} lonlats
 * @return {}
 */
MapConfig.Lanlats2Wkt=function(type,lonlats){
	var wktStr='';
	if("point"==type.toLowerCase()){
		wktStr+="POINT("+lonlats.lon+" "+lonlats.lat+")";
	}else if("polyline"==type.toLowerCase()){
		wktStr+="LINESTRING(";
		for(var i=0;i<lonlats.length;i++){
			wktStr+=lonlats[i].lon+" "+lonlats[i].lat;
			if(i!=lonlats.length-1)wktStr+=",";
		}
		wktStr+=")";
	}else if("polygon"==type.toLowerCase()){
		wktStr+="POLYGON((";
		for(var i=0;i<lonlats.length;i++){
			wktStr+=lonlats[i].lon+" "+lonlats[i].lat;
			if(i!=lonlats.length-1)wktStr+=",";
		}
		wktStr+="))";
	}
	return wktStr;
};
// 说明：JS时间Date格式化参数
// 参数：格式化字符串如：'yyyy-MM-dd HH:mm:ss'
// 结果：如2016-06-01 10:09:00
Date.prototype.format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, 
        "d+": this.getDate(), 
        "H+": this.getHours(),  
        "m+": this.getMinutes(),  
        "s+": this.getSeconds(), 
        "q+": Math.floor((this.getMonth() + 3) / 3), 
        "S": this.getMilliseconds()  
    };
    var year = this.getFullYear();
    var yearstr = year + '';
    yearstr = yearstr.length >= 4 ? yearstr : '0000'.substr(0, 4 - yearstr.length) + yearstr;
    
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (yearstr + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};


// 加载全局配置信息
//var mapConfig = new MapConfig({'map_gpsService_url':url});//{'initZoom':99}
/*DMap.$(map).bind("zoomend.mapChangeListener", function() {
			alert(123);alert(map.getZoom());
		});
DMap.$(map).bind('moveend',function(){
	alert(map.getZoom());
});*/
//map.addMapChangeListener(function(){alert('kkk');});
//map.addMapChangeListener(function(){alert('移动或缩放地图');});