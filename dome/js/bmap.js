var echarts = require("echarts");
 // var echarts = document.write("<script language='javascript' src='../js/echarts.js'></script>");
// 
// 
 // var BMapCoordSys = document.write("<script language='javascript' src='../js/BMapCoordSys.js'></script>");
 // document.write("<script language='javascript' src='../js/BMapModel.js'></script>");

var BMapCoordSys = require("./BMapCoordSys");
 
// document.write("<script language='javascript' src='../js/BMapView.js'></script>");

require("./BMapModel");

require("./BMapView");

/**
 * BMap component extension
 */
echarts.registerCoordinateSystem('bmap', BMapCoordSys); // Action

echarts.registerAction({
  type: 'bmapRoam',
  event: 'bmapRoam',
  update: 'updateLayout'
}, function (payload, ecModel) {
  ecModel.eachComponent('bmap', function (bMapModel) {
    var bmap = bMapModel.getBMap();
    var center = bmap.getCenter();
    bMapModel.setCenterAndZoom([center.lng, center.lat], bmap.getZoom());
  });
});
var version = '1.0.0';
exports.version = version;