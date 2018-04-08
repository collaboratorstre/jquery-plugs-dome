<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html lang="en">
<head>

<!-- title可变 -->
<title>河北省交通要素结果列表</title>
<jsp:include page="../common/head.jsp"></jsp:include>

	<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/webpage/common/fileResultList.css" />
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/webpage/resultList/style/resultList.css" />
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/webpage/carGear/style/pagination.css" />
</head>
<body>
	<!-- 页头 -->
	<div id="head-nav" class="navbar navbar-default navbar-fixed-top">
		<jsp:include page="../common/head-nav.jsp"></jsp:include>
	</div>
	<div class="page-title">结果列表</div>
	<!-- 页面内容 -->
	<div id="cl-wrapper" class="fixed-menu sb-collapsed" style="padding-top: 110px;">

		<div class="page-main">
			<div id="pcont" class="container-fluid">
				<!-- page content，内容可变-->
				<div class="page-content">
					<div class="search-panel">
						<div class="record-search">
							<span>搜索档案 : </span>
							<input type="text" value="${keyword}" id="info">
							<button class="btn btn-primary" id="file_search"><i class="fa fa-search"></i>搜索</button>
							<p>支持模糊搜索，"%"表示任意位,"?"表示任意一位</p>
						</div>
					</div>
					<div class="search-panel2">
						<table>
							<tr>
								<td rowspan="2" width="95px">
									<span class="search2-title">二次筛选：</span>
								</td>
								<td width="45px">
									<span>已选</span>
								</td>
								<td id="selected_labels">
									<div class="label-container" id="div_label_selected"></div>
								</td>
							</tr>
							<tr>
								<td>
									<span>待选</span>
								</td>
								<td id="selecting_labels">
									<div class="label-more-container">
										<div class="label-more" id="btn_more">更多标签</div>
										<div class="label-container" id="div_label_selecting">
											<label class="label-show label-normal" labelId="1">逾期未年检</label>
											<label class="label-show label-normal" labelId="2">逾期未报废</label>
											<label class="label-show label-normal" labelId="3">多次违法未处理</label>
											<label class="label-show label-normal" labelId="4">逾期未年检</label>
											<label class="label-show label-normal" labelId="5">逾期未报废</label>
											<label class="label-show label-normal" labelId="6">多次违法未处理</label>
											<label class="label-show label-normal" labelId="7">逾期未年检</label>
											<label class="label-show label-normal" labelId="8">逾期未报废</label>
											<label class="label-show label-normal" labelId="9">多次违法未处理</label>
											<label class="label-show label-normal" labelId="10">逾期未年检</label>
											<label class="label-show label-normal" labelId="11">逾期未报废</label>
											<label class="label-show label-normal" labelId="12">多次违法未处理</label>
											<label class="label-show label-normal" labelId="13">逾期未年检</label>
											<label class="label-show label-normal" labelId="14">逾期未报废</label>
										</div>
										<label class="label-show label-normal">逾期未年检</label>
										<label class="label-show label-normal">逾期未报废</label>
										<label class="label-show label-normal">多次违法未处理</label>
										<label class="label-show label-normal">逾期未年检</label>
										<label class="label-show label-normal">逾期未报废</label>
										<label class="label-show label-normal">多次违法未处理</label>
											<div id = "showdiv" style="display:none;">
												<label class="label-show label-normal">逾期未年检</label>
												<label class="label-show label-normal">逾期未报废</label>
												<label class="label-show label-normal">多次违法未处理</label>
												<label class="label-show label-normal">逾期未年检</label>
												<label class="label-show label-normal">逾期未报废</label>
												<label class="label-show label-normal">多次违法未处理</label>
												<label class="label-show label-normal">逾期未年检</label>
												<label class="label-show label-normal">逾期未报废</label>
												<label class="label-show label-normal">多次违法未处理</label>
											</div>
									</div>
								</td>
							</tr>
						</table>
					</div>

					<div class="tab-container tab-left result-panel">
						<ul class="nav nav-tabs">
							<li class="active"><a href="#result_vehicle" data-toggle="tab" aria-expanded="false">机动车</a></li>
							<li><a href="#result_driver" data-toggle="tab" aria-expanded="false">驾驶人</a></li>
							<li><a href="#result_company" data-toggle="tab" aria-expanded="false">企业</a></li>
							<li><a href="#result_road" data-toggle="tab" aria-expanded="false">道路</a></li>
							<li><a href="#result_event" data-toggle="tab" aria-expanded="false">事件</a></li>
						</ul>
						<div class="tab-content">

							<div id="result_vehicle" class="tab-pane active">
								<div class="result-head">
									<label>共搜到<span id="car_total">0</span>辆机动车:</label>
									<button class="btn btn-warning"><i class="fa fa-share-square"></i>导出数据</button>
								</div>
								<div class="result-data">
									<div class="result-list-item">
										<div class="data-img"><img src="<%=request.getContextPath()%>/ehlib/img/small_car.png"></div>
										<div class="data-detail">
											<p class="data-head"><span class="data-title">冀A12345</span><a href="#">查看详细>></a></p>
											<p class="data-fields">
												<label><span class="data-field-name">号牌种类：</span><span class="data-field-value">小型汽车</span></label>
												<label><span class="data-field-name">车辆类型：</span><span class="data-field-value">小型轿车</span></label>
												<label><span class="data-field-name">机动车辆状态：</span><span class="data-field-value">正常</span></label>
												<label><span class="data-field-name">使用性质：</span><span class="data-field-value">非营运</span></label>
												<label><span class="data-field-name">机动车所有人：</span><span class="data-field-value"><span class="text-red">张三</span></span></label>
												<label><span class="data-field-name">联系方式：</span><span class="data-field-value">13333333333</span></label>
											</p>
											<p class="data-text"><span class="text-red">通知：</span>2017年9月1日扣6分；超速违法；<span class="text-red">张三</span>；扣6分；2017年9月1日扣6分；超速违法；张三；扣6分；2017年9月1日扣6分；超速违法；张三；扣6分；</p>
											<p class="data-labels">
												<label class="label-show label-danger">多次违法未处理</label>
												<label class="label-show label-primary">逾期未年检</label>
												<label class="label-show label-primary">逾期未报废</label>
											</p>
										</div>
									</div>
									<div class="result-list-item">
										<div class="data-img"><img src="<%=request.getContextPath()%>/ehlib/img/small_car.png"></div>
										<div class="data-detail">
											<p class="data-head"><span class="data-title">冀A12345</span><a href="#">查看详细>></a></p>
											<p class="data-fields">
												<label><span class="data-field-name">号牌种类：</span><span class="data-field-value">小型汽车</span></label>
												<label><span class="data-field-name">车辆类型：</span><span class="data-field-value">小型轿车</span></label>
												<label><span class="data-field-name">机动车辆状态：</span><span class="data-field-value">正常</span></label>
												<label><span class="data-field-name">使用性质：</span><span class="data-field-value">非营运</span></label>
												<label><span class="data-field-name">机动车所有人：</span><span class="data-field-value"><span class="text-red">张三</span></span></label>
												<label><span class="data-field-name">联系方式：</span><span class="data-field-value">13333333333</span></label>
											</p>
											<p class="data-text"><span class="text-red">通知：</span>2017年9月1日扣6分；超速违法；<span class="text-red">张三</span>；扣6分；2017年9月1日扣6分；超速违法；张三；扣6分；2017年9月1日扣6分；超速违法；张三；扣6分；</p>
											<p class="data-labels">
												<label class="label-show label-danger">多次违法未处理</label>
												<label class="label-show label-primary">逾期未年检</label>
												<label class="label-show label-primary">逾期未报废</label>
											</p>
										</div>
									</div>
									<div class="result-list-item">
										<div class="data-img"><img src="<%=request.getContextPath()%>/ehlib/img/small_car.png"></div>
										<div class="data-detail">
											<p class="data-head"><span class="data-title">冀A12345</span><a href="#">查看详细>></a></p>
											<p class="data-fields">
												<label><span class="data-field-name">号牌种类：</span><span class="data-field-value">小型汽车</span></label>
												<label><span class="data-field-name">车辆类型：</span><span class="data-field-value">小型轿车</span></label>
												<label><span class="data-field-name">机动车辆状态：</span><span class="data-field-value">正常</span></label>
												<label><span class="data-field-name">使用性质：</span><span class="data-field-value">非营运</span></label>
												<label><span class="data-field-name">机动车所有人：</span><span class="data-field-value"><span class="text-red">张三</span></span></label>
												<label><span class="data-field-name">联系方式：</span><span class="data-field-value">13333333333</span></label>
											</p>
											<p class="data-text"><span class="text-red">通知：</span>2017年9月1日扣6分；超速违法；<span class="text-red">张三</span>；扣6分；2017年9月1日扣6分；超速违法；张三；扣6分；2017年9月1日扣6分；超速违法；张三；扣6分；</p>
											<p class="data-labels">
												<label class="label-show label-danger">多次违法未处理</label>
												<label class="label-show label-primary">逾期未年检</label>
												<label class="label-show label-primary">逾期未报废</label>
											</p>
										</div>
									</div>
									<div class="result-list-item">
										<div class="data-img"><img src="<%=request.getContextPath()%>/ehlib/img/small_car.png"></div>
										<div class="data-detail">
											<p class="data-head"><span class="data-title">冀A12345</span><a href="#">查看详细>></a></p>
											<p class="data-fields">
												<label><span class="data-field-name">号牌种类：</span><span class="data-field-value">小型汽车</span></label>
												<label><span class="data-field-name">车辆类型：</span><span class="data-field-value">小型轿车</span></label>
												<label><span class="data-field-name">机动车辆状态：</span><span class="data-field-value">正常</span></label>
												<label><span class="data-field-name">使用性质：</span><span class="data-field-value">非营运</span></label>
												<label><span class="data-field-name">机动车所有人：</span><span class="data-field-value"><span class="text-red">张三</span></span></label>
												<label><span class="data-field-name">联系方式：</span><span class="data-field-value">13333333333</span></label>
											</p>
											<p class="data-text"><span class="text-red">通知：</span>2017年9月1日扣6分；超速违法；<span class="text-red">张三</span>；扣6分；2017年9月1日扣6分；超速违法；张三；扣6分；2017年9月1日扣6分；超速违法；张三；扣6分；</p>
											<p class="data-labels">
												<label class="label-show label-danger">多次违法未处理</label>
												<label class="label-show label-primary">逾期未年检</label>
												<label class="label-show label-primary">逾期未报废</label>
											</p>
										</div>
									</div>
									<div class="result-list-item">
										<div class="data-img"><img src="<%=request.getContextPath()%>/ehlib/img/small_car.png"></div>
										<div class="data-detail">
											<p class="data-head"><span class="data-title">冀A12345</span><a href="#">查看详细>></a></p>
											<p class="data-fields">
												<label><span class="data-field-name">号牌种类：</span><span class="data-field-value">小型汽车</span></label>
												<label><span class="data-field-name">车辆类型：</span><span class="data-field-value">小型轿车</span></label>
												<label><span class="data-field-name">机动车辆状态：</span><span class="data-field-value">正常</span></label>
												<label><span class="data-field-name">使用性质：</span><span class="data-field-value">非营运</span></label>
												<label><span class="data-field-name">机动车所有人：</span><span class="data-field-value"><span class="text-red">张三</span></span></label>
												<label><span class="data-field-name">联系方式：</span><span class="data-field-value">13333333333</span></label>
											</p>
											<p class="data-text"><span class="text-red">通知：</span>2017年9月1日扣6分；超速违法；<span class="text-red">张三</span>；扣6分；2017年9月1日扣6分；超速违法；张三；扣6分；2017年9月1日扣6分；超速违法；张三；扣6分；</p>
											<p class="data-labels">
												<label class="label-show label-danger">多次违法未处理</label>
												<label class="label-show label-primary">逾期未年检</label>
												<label class="label-show label-primary">逾期未报废</label>
											</p>
										</div>
									</div>
								</div>

								<div class="result-page" id="pagination_3"></div>
							</div>

							<div id="result_driver" class="tab-pane">
								<div class="result-head">
									<label>共搜到<span id="car_total1">0</span>位驾驶人:</label>
									<button class="btn btn-warning"><i class="fa fa-share-square"></i>导出数据</button>
								</div>
								<div class="result-data">
									<div class="info_content">
										<p class="car_type">123456789101112131&nbsp;&nbsp;&nbsp;张三</p>
										<p>
											<a href="#">查看详细> ></a>
										</p>

									</div>
									<div class="car_information">
										<div class="car_totals">
											<div class="car_img">
												<img src="<%=request.getContextPath()%>/ehlib/img/girl.png" alt="">
											</div>
											<div class="car_one">
												<p>
													<span class="number1">证件号码&nbsp;&nbsp;:&nbsp;&nbsp;</span><span>12345678910112131</span>
												</p>
												<p>
													<span class="number1">证件类型&nbsp;&nbsp;:&nbsp;&nbsp;</span><span>居民身份证</span>
												</p>
												<p>
													<span class="number1">准驾车型&nbsp;&nbsp;:&nbsp;&nbsp;</span><span>小型轿车</span>
												</p>
												<p>
													<span class="number1">联系地址&nbsp;&nbsp;:&nbsp;&nbsp;</span><span>河北省保定市涿州西关</span>
												</p>
											</div>
											<div class="car_one1">
												<p>
													<span class="number1">姓名&nbsp;&nbsp;:&nbsp;&nbsp;</span><span>张三</span>
												</p>
												<p>
													<span class="number1">性别&nbsp;&nbsp;:&nbsp;&nbsp;</span><span>女</span>
												</p>
												<p>
													<span class="number1">初次领证日期&nbsp;&nbsp;:&nbsp;&nbsp;</span><span>20101101</span>
												</p>
												<p>
													<span class="number1">联系方式&nbsp;&nbsp;:&nbsp;&nbsp;</span><span>1333333333</span>
												</p>
											</div>
										</div>
										<div class="weifa">

											<div class="car_wei">
												<p>逾期未换证</p>
												<p>逾期未换证</p>
												<p>逾期未换证</p>
											</div>

										</div>


									</div>
									<div class="result_car">
										2017年9月1日扣6分 ; 超速违法 ; <span>张三</span> ; 扣6分 ; 2017年9月1日扣6分 ; 超速违法 ; <span>张三</span> ; 扣6分 ; 2017年9月1日扣6分 ; 超速违法 ; <span>张三</span>
										; 扣6分 ;
									</div>

									<div class="info_content">
										<p class="car_type">101112131123456789&nbsp;&nbsp;&nbsp;张三栋</p>
										<p>
											<a href="#">查看详细> ></a>
										</p>

									</div>
									<div class="car_information">
										<div class="car_totals">
											<div class="car_img">
												<img src="<%=request.getContextPath()%>/ehlib/img/boy.png" alt="">
											</div>
											<div class="car_one">
												<p>
													<span class="number1">证件号码&nbsp;&nbsp;:&nbsp;&nbsp;</span><span>101112131123456789</span>
												</p>
												<p>
													<span class="number1">证件类型&nbsp;&nbsp;:&nbsp;&nbsp;</span><span>居民身份证</span>
												</p>
												<p>
													<span class="number1">准驾车型&nbsp;&nbsp;:&nbsp;&nbsp;</span><span>小型轿车</span>
												</p>
												<p>
													<span class="number1">联系地址&nbsp;&nbsp;:&nbsp;&nbsp;</span><span>北京市石景山区阜石路</span>
												</p>
											</div>
											<div class="car_one1">
												<p>
													<span class="number1">姓名&nbsp;&nbsp;:&nbsp;&nbsp;</span><span>张三栋</span>
												</p>
												<p>
													<span class="number1">性别&nbsp;&nbsp;:&nbsp;&nbsp;</span><span>男</span>
												</p>
												<p>
													<span class="number1">初次领证日期&nbsp;&nbsp;:&nbsp;&nbsp;</span><span>20131101</span>
												</p>
												<p>
													<span class="number1">联系方式&nbsp;&nbsp;:&nbsp;&nbsp;</span><span>1813333333</span>
												</p>
											</div>
										</div>
										<div class="weifa"></div>
									</div>
									<div class="result_car">
										2017年9月1日扣6分 ; 超速违法 ; <span>张三</span>栋 ; 扣6分 ; 2017年9月1日扣6分 ; 超速违法 ; <span>张三</span>栋 ; 扣6分 ; 2017年9月1日扣6分 ; 超速违法 ;
										<span>张三</span>栋 ; 扣6分 ;
									</div>
								</div>
								<div class="result-page" id="pagination_2"></div>
							</div>

							<div id="result_company" class="tab-pane">
								<div class="result-head">
									<label>共搜到<span id="car_total2">0</span>个企业:</label>
									<button class="btn btn-warning"><i class="fa fa-share-square"></i>导出数据</button>
								</div>
								<div class="result-data">
									<div class="info_content">
										<p class="car_type">12345678910111213&nbsp;&nbsp;&nbsp;AAA危险品运输公司</p>
										<p>
											<a href="#">查看详细> ></a>
										</p>

									</div>
									<div class="company_information">
										<div class="car_totals">
											<div class="car_img">
												<img src="<%=request.getContextPath()%>/ehlib/img/company.png" alt="">
											</div>
											<div class="car_one">
												<p>
													<span class="number1">企业社会信用代码&nbsp;&nbsp;:&nbsp;&nbsp;</span><span>12345678910111213</span>
												</p>
												<p>
													<span class="number1">企业名称&nbsp;&nbsp;:&nbsp;&nbsp;</span><span>AAA危险品运输公司</span>
												</p>
												<p>
													<span class="number1">企业类型&nbsp;&nbsp;:&nbsp;&nbsp;</span><span></span>
												</p>
												<p>
													<span class="number1">法人代表&nbsp;&nbsp;:&nbsp;&nbsp;</span><span>张三</span>
												</p>
												<p>
													<span class="number1">联系地址&nbsp;&nbsp;:&nbsp;&nbsp;</span><span>河北省保定市涿州西关</span>
												</p>
												<p>
													<span class="number1">联系人&nbsp;&nbsp;:&nbsp;&nbsp;</span><span>张三</span>
												</p>
											</div>
											<div class="car_one1"></div>
										</div>
										<div class="weifa_com">
											<div class="car_wei">
												<p>违法行为突出企业</p>
												<p>违法行为突出企业</p>
												<p>违法行为突出企业</p>
												<p>违法行为突出企业</p>
											</div>

										</div>


									</div>
									<div class="result_car">
										2017年9月1日扣6分 ; 超速违法 ; <span>张三</span> ; 扣6分 ;
									</div>
								</div>
								<div class="result-page" id="pagination_4"></div>
							</div>

							<div id="result_road" class="tab-pane">
								<div class="result-head">
									<label>共搜到<span id="road_total">0</span>条道路:</label>
									<button class="btn btn-warning"><i class="fa fa-share-square"></i>导出数据</button>
								</div>
								<div class="result-data">

								</div>
								<div class="result-page"></div>
							</div>

							<div id="result_event" class="tab-pane">
								<div class="result-head">
									<label>共搜到<span id="event_total">0</span>个事件:</label>
									<button class="btn btn-warning"><i class="fa fa-share-square"></i>导出数据</button>
								</div>
								<div class="result-data">

								</div>
								<div class="result-page"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<jsp:include page="../common/footer.jsp"></jsp:include>

	<script type="text/javascript" src="<%=request.getContextPath()%>/assets/lib/bootstrap-ajax-typeahead-master/js/bootstrap-typeahead.min.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/webpage/common/pageCtrl.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/ehlib/js/showGJpage.js"></script>

	<script type="text/javascript" src="<%=request.getContextPath()%>/webpage/carGear/pagination.min.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/webpage/common/fileResultList.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/webpage/resultList/resultList.js"></script>
	<script type="text/javascript">
    	var contextPath = "<%=request.getContextPath()%>";
	</script>
</body>
</html>

