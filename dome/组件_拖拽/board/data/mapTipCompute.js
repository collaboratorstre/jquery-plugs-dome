/**
 * 坐标对象
 */
var lonLat = {
	lon : 0,
	lat : 0
};

/**
 * 获取地图气泡矩形 （气泡样式 ）
 * 
 * ********************* * * * * * * * * *********************
 */
function getTipRectRange(x, y, width, height) {
	 //x = 116.63;
	 //y = 36.69;
	 //width = 0.12;
	 //height = 0.06;
	var rectRange = getPointsByStart(x, y, width, height);
	 //x = 116.63;
	 //y = 36.69; 
	var rectRange2 = getPointsByStart(x, y, width, height); 
}

function getPointsByStart(x, y, width, height) {
	// x = 116.63;
	// y = 36.69;
	// width = 0.12;
	// height = 0.06;
	var rectRange = [];
	var point1 = new lonLat(x, y);
	var point2 = new lonLat(x, y - height + 0.1);
	var point3 = new lonLat(x + 0.1, y - height);
	var point4 = new lonLat(x + width, y - height);
	var point5 = new lonLat(x + width, y - 0.1);
	var point6 = new lonLat(x + width, y);

	rectRange.push(point1);
	rectRange.push(point2);
	rectRange.push(point3);
	rectRange.push(point4);
	rectRange.push(point5);
	rectRange.push(point6);
}