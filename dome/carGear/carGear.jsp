<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <title>河北省 一车一档</title>
    <jsp:include page="../common/head.jsp"></jsp:include>
    <link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/webpage/carGear/style/carGear.css"/>
</head>
<body>

    <div class="main_content">
        <div id="heard_common"></div>
        <div class="title_top">一车一档</div>
        <div class="search_same">
            <div class="record_search">
                <span class="record_text">号牌号码 : </span>
                 <span class="brief">冀</span><input type="text" class="search_case">

                <span class="hao_type">号牌种类 : </span>
                <select name="" id="" style="width: 204px; height: 37px;border:1px solid #a9a9a9;margin: 0 38px 0 37px;">
                    <option value="请选择号牌种类">请选择号牌种类</option>
                    <option value="小型汽车号牌">小型汽车号牌</option>
                    <option value="大型汽车号牌">大型汽车号牌</option>
                    <option value="使馆汽车号牌">使馆汽车号牌</option>
                    <option value="............">............</option>
                    <option value="其它汽车号牌">其它汽车号牌</option>
                </select>
                <img src="<%=request.getContextPath() %>/ehlib/img/search1.png" id="file_search" alt="">

            </div>
        </div>

        <div class="car_infomation">
            <div class="infomations">
                <img src="<%=request.getContextPath() %>/ehlib/img/car_one.png" alt="">
                <div class="car_one">
                    <p><span class="number1">号牌号码&nbsp;&nbsp;:&nbsp;&nbsp;</span><span>冀A12345</span></p>
                    <p><span class="number1">号牌种类&nbsp;&nbsp;:&nbsp;&nbsp;</span><span>小型汽车</span></p>
                    <p><span class="number1">车辆类型&nbsp;&nbsp;:&nbsp;&nbsp;</span><span>小型轿车</span></p>
                    <p><span class="number1">使用心智&nbsp;&nbsp;:&nbsp;&nbsp;</span><span>非营运</span></p>
                </div>
                <div class="car_one1">
                    <p><span class="number1">机动车辆状态&nbsp;&nbsp;:&nbsp;&nbsp;</span><span>正常</span></p>
                    <p><span class="number1">机动车所有人&nbsp;&nbsp;:&nbsp;&nbsp;</span><span>张三</span></p>
                    <p><span class="number1">联系方式&nbsp;&nbsp;:&nbsp;&nbsp;</span><span>1333333333</span></p>

                </div>

            </div>
            <div class="weifa">
                <div class="car_wei">
                    <p>多次违法未处理</p>
                    <p>多次违法未处理</p>
                    <p>多次违法未处理</p>
                </div>
                <div class="car_wei">
                    <p>逾期未年检</p>
                    <p>逾期未年检</p>
                    <p>逾期未年检</p>
                </div>
                <div class="car_wei">
                    <p>逾期未报废</p>
                    <p>逾期未报废</p>
                    <p>逾期未报废</p>
                </div>
            </div>
        </div>
        <div class="dao_data">
            <img src="<%=request.getContextPath() %>/ehlib/img/dao.png" alt="">
        </div>
        <div class="lot_content">
            <ul class="content_title">
                <li>车主信息</li>
                <li>登录信息</li>
                <li>物理特征/外观信息</li>
                <li>行驶轨迹信息</li>
                <li>违法信息</li>
                <li>事故信息</li>
                <li>业务办理信息</li>
            </ul>
            <ul class="content_log">
                <div class="log_info">
                   <li>车主信息<img src="<%=request.getContextPath() %>/ehlib/img/jiant.png" alt=""></li>
                    <div style="height: 100px;"> 1111111</div>
                </div>
                <div class="log_info">
                   <li>登录信息<img src="<%=request.getContextPath() %>/ehlib/img/jiant.png" alt=""></li>
                    <div style="height: 100px;"> 2222222</div>
                </div>
                <div class="log_info">
                     <li>物理特征/外观信息<img src="<%=request.getContextPath() %>/ehlib/img/jiant.png" alt=""></li>
                    <div style="height: 100px;"> 3333333</div>
                </div>
                <div class="log_info">
                    <li>行驶轨迹信息<img src="<%=request.getContextPath() %>/ehlib/img/jiant.png" alt=""></li>
                    <div style="height: 100px;"> 4444444</div>
                </div>
                <div class="log_info">
                     <li>违法信息<img src="<%=request.getContextPath() %>/ehlib/img/jiant.png" alt=""></li>
                    <div style="height: 100px;"> 55555555</div>
                </div>
                <div class="log_info">
                     <li>事故信息<img src="<%=request.getContextPath() %>/ehlib/img/jiant.png" alt=""></li>
                    <div style="height: 100px;"> 66666666</div>
                </div>
                <div class="log_info">
                    <li>业务办理信息<img src="<%=request.getContextPath() %>/ehlib/img/jiant.png" alt=""></li>
                    <div style="height: 100px;"> 77777777</div>
                </div>
            </ul>
        </div>
    </div>


<jsp:include page="../common/footer.jsp"></jsp:include>

<script type="text/javascript" src="<%=request.getContextPath() %>/assets/lib/bootstrap-ajax-typeahead-master/js/bootstrap-typeahead.min.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/webpage/common/pageCtrl.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/webpage/common/deptPeopleTree.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/ehlib/js/showGJpage.js" ></script>

<script type="text/javascript" src="<%=request.getContextPath() %>/webpage/carGear/carGear.js" ></script>
<script type="text/javascript">
    var contextPath = "<%=request.getContextPath() %>";
</script>
</body>
</html>
