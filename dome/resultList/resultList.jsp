<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>

    <!-- title可变 -->
    <title>河北省交通要素结果列表</title>
    <jsp:include page="../common/head.jsp"></jsp:include>
    <link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/webpage/resultList/style/resultList.css"/>
</head>
<body>
   <div class="main_content">
       <div id="heard_common"></div>
       <div class="title_top">结果列表</div>
       <div class="search_same">
            <div class="record_search">
                <span class="record_text">搜索档案 : </span>
                <input type="text" placeholder="如：张三" class="search_case">
                <img src="<%=request.getContextPath() %>/ehlib/img/search1.png" id="file_search" alt="">
                <p>支持模糊搜索，"%"表示任意位,"?"表示任意一位</p>
            </div>
       </div>
       <div class="search_same">
           <div class="screen_two">
                <span class="screen_text">二次筛选 : </span>
                <span class="inspect_sele">逾期未年检</span>
                <span class="reject_sele">逾期未报废</span>
                <span class="handle_sele">多次违法未处理</span> <br/>
               <span class="inspect_nosele">逾期未年检</span>
               <span class="reject_nosele">逾期未报废</span>
               <span class="handle_nosele">多次违法未处理</span>

           </div>
       </div>

       <ul class="info_top">
           <li class="select_color movetive_car">机动车</li>
           <li class="dirver_car">驾驶人</li>
           <li class="company">企业</li>
           <li class="roads">道路</li>
           <li class="affair_shi">事件</li>
       </ul>

       <div class="info_car">
           <div class="info_tou">
             <p>共搜到<span id="car_total">234</span>条结果 : </p>
              <p><img src="<%=request.getContextPath() %>/ehlib/img/shuju.png"alt=""></p>
           </div>
           <div class="info_content">
               <p class="car_type">冀A12345&nbsp;&nbsp;&nbsp;小型汽车</p>
               <p><a href="#">查看详细> ></a></p>

           </div>
           <div class="car_information">
               <div class="car_img"><img src="<%=request.getContextPath() %>/ehlib/img/small_car.png" alt=""></div>
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
           <div class="result_car">2017年9月1日扣6分 ; 超速违法 ; <span>张三</span> ; 扣6分 ; 2017年9月1日扣6分 ; 超速违法 ; <span>张三</span> ; 扣6分 ; 2017年9月1日扣6分 ; 超速违法 ; <span>张三</span> ; 扣6分 ; </div>

           <div class="info_content">
               <p class="car_type">冀A12345&nbsp;&nbsp;&nbsp;小型汽车</p>
               <p><a href="#">查看详细> ></a></p>

           </div>
           <div class="car_information">
               <div class="car_img"><img src="<%=request.getContextPath() %>/ehlib/img/small_car.png" alt=""></div>
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
           <div class="result_car">2017年9月1日扣6分 ; 超速违法 ; <span>张三</span> ; 扣6分 ; 2017年9月1日扣6分 ; 超速违法 ; <span>张三</span> ; 扣6分 ; 2017年9月1日扣6分 ; 超速违法 ; <span>张三</span> ; 扣6分 ; </div>
       </div>


       <div class="dirvers_pep"  style="display: none">
           <div class="info_tou">
               <p>共搜到<span id="car_total1">14</span>条结果 : </p>
               <p><img src="<%=request.getContextPath() %>/ehlib/img/shuju.png"alt=""></p>
           </div>
           <div class="info_content">
               <p class="car_type">冀A12345&nbsp;&nbsp;&nbsp;小型汽车</p>
               <p><a href="#">查看详细> ></a></p>

           </div>
           <div class="car_information">
               <div class="car_img"><img src="<%=request.getContextPath() %>/ehlib/img/small_car.png" alt=""></div>
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
           <div class="result_car">2017年9月1日扣6分 ; 超速违法 ; <span>张三</span> ; 扣6分 ; 2017年9月1日扣6分 ; 超速违法 ; <span>张三</span> ; 扣6分 ; 2017年9月1日扣6分 ; 超速违法 ; <span>张三</span> ; 扣6分 ; </div>

           <div class="info_content">
               <p class="car_type">冀A12345&nbsp;&nbsp;&nbsp;小型汽车</p>
               <p><a href="#">查看详细> ></a></p>

           </div>
           <div class="car_information">
               <div class="car_img"><img src="<%=request.getContextPath() %>/ehlib/img/small_car.png" alt=""></div>
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
           <div class="result_car">2017年9月1日扣6分 ; 超速违法 ; <span>张三</span> ; 扣6分 ; 2017年9月1日扣6分 ; 超速违法 ; <span>张三</span> ; 扣6分 ; 2017年9月1日扣6分 ; 超速违法 ; <span>张三</span> ; 扣6分 ; </div>
       </div>




   </div>

<jsp:include page="../common/footer.jsp"></jsp:include>
 <script type="text/javascript" src="<%=request.getContextPath() %>/webpage/resultList/resultList.js" ></script>
 <script type="text/javascript">
     var contextPath = "<%=request.getContextPath() %>";
 </script>
</body>
</html>

