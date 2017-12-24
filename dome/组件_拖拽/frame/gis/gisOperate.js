function Point() {
	this.x = 0;
	this.y = 0;
}

function isInPolygon(lon, lat, points, n) {
	var nCross = 0;
	for (var i = 0; i < n; i++) {
		var p1 = points[i];
		var p2 = points[(i + 1) % n];
		// 求解 y=p.y 与 p1 p2 的交点  
		// p1p2 与 y=p0.y平行  
		if (p1.y == p2.y)
			continue;
		// 交点在p1p2延长线上  
		if (point.y < Math.min(p1.y, p2.y))
			continue;
		// 交点在p1p2延长线上  
		if (point.y >= Math.max(p1.y, p2.y))
			continue;
		// 求交点的 X 坐标  
		var x = (double)(point.y - p1.y) * (double)(p2.x - p1.x)
		/ (double)(p2.y - p1.y) + p1.x;
		// 只统计单边交点  
		if (x > point.x)
			nCross++;
	}
	return (nCross % 2 == 1);
}

/**java 代码 **/
/*public boolean isInPolygon(Point point, Point[] points, int n) {  
    int nCross = 0;  
    for (int i = 0; i < n; i++) {  
        Point p1 = points[i];  
        Point p2 = points[(i + 1) % n];  
        // 求解 y=p.y 与 p1 p2 的交点  
        // p1p2 与 y=p0.y平行  
        if (p1.y == p2.y)  
            continue;  
        // 交点在p1p2延长线上  
        if (point.y < Math.min(p1.y, p2.y))  
            continue;  
        // 交点在p1p2延长线上  
        if (point.y >= Math.max(p1.y, p2.y))  
            continue;  
        // 求交点的 X 坐标  
        double x = (double) (point.y - p1.y) * (double) (p2.x - p1.x)  
                / (double) (p2.y - p1.y) + p1.x;  
        // 只统计单边交点  
        if (x > point.x)  
            nCross++;  
    }  
    return (nCross % 2 == 1);  
}  */