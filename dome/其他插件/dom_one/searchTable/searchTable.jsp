<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <title>STD数据大厨</title>
    <jsp:include page="../common/head.jsp"></jsp:include>
    <link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/webpage/searchTable/style/searchTable.css"/>
    <link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/webpage/searchTable/style/timePicker.css"/>
    <link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/webpage/carGear/style/pagination.css"/>
    <link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/ehlib/lib/jquery-ui/jquery-ui.css">
</head>
<body>
    <div class="main_content">
        <div id="heard_common">
            <div class="head_right">
                STDP<span>数据大厨</span>
            </div>
        </div>
        <div class="title_top">数据大厨</div>
        <div class="data_content">
            <div class="data_right">
                <div class="create_btn" class="btn btn-primary" data-toggle="modal" data-target="#myModal">
                    <img src="<%=request.getContextPath()%>/ehlib/img/cbtn.png" alt="">
                    <span id="new_show" >新建表</span>
                </div>
                <div class="create_nobtn">
                    <img src="<%=request.getContextPath()%>/ehlib/img/cbtn.png" alt="">
                    <span id="new_show1">新建表</span>
                </div>
                <div class="lot_tab">
                    <div class="ability_nobtn">
                        <button id="edit1" class="btn btn-xs" style="color: black">编辑</button>
                        <button id="delet1" class="btn btn-xs" style="color: black">删除</button>
                    </div>
                     <div class="ability_btn">
                         <button id="edit" class="btn btn-xs btn-primary" data-toggle="modal" data-target="#myModal">编辑</button>
                         <button id="delet" class="btn btn-xs btn-primary">删除</button>
                     </div>
                    <ul id="expose_tab">
                        <%--<li>vehichle_all/112111</li>--%>
                        <%--<li>vehichle_all2/112111</li>--%>
                        <%--<li>vehichle_all3/112111</li>--%>
                    </ul>
                    <%--<div id="trem_wirte" style="display: none">--%>
                        <%--<div id="index_name"><span>索引名 : </span> <input type="text"></div>--%>
                        <%--<div id="type_name"><span>类型名 : </span> <input type="text"></div>--%>
                        <%--<div id="original_name"><span>原始表 : </span> <input type="text" readonly="readonly">--%>
                             <%--<div class="original_sele" style="display: none;">--%>
                                 <%--<div class="all_sele"><img src="<%=request.getContextPath()%>/ehlib/img/xiao1.png" alt=""><input id="biao_all" type="checkbox" value="left1" name="all_one">全选 <button class="original_sure">确定</button><button class="original_no">取消</button></div>--%>
                                 <%--<div class="original_child">--%>
                                     <%--&lt;%&ndash;<div><input type="checkbox" value="biao1" name="all_one">原始表1</div>&ndash;%&gt;--%>
                                     <%--&lt;%&ndash;<div><input type="checkbox" value="biao2" name="all_one">原始表2</div>&ndash;%&gt;--%>
                                     <%--&lt;%&ndash;<div><input type="checkbox" value="biao3" name="all_one">原始表3</div>&ndash;%&gt;--%>
                                 <%--</div>--%>
                             <%--</div>--%>
                        <%--</div>--%>
                        <%--<button id="ensure_btn">确定</button>--%>
                        <%--<button id="noensure_btn"><img style="width: 13px;" src="<%=request.getContextPath()%>/ehlib/img/cha.png" alt=""></button>--%>
                    <%--</div>--%>
                    <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                        <div class="modal-body modal-dialog modal-content" style="margin-top:15%;width:330px;height: 346px;">
                            <div id="index_name"><span>索引名 : </span> <input type="text"></div>
                            <div id="type_name"><span>类型名 : </span> <input type="text"></div>
                            <div id="original_name"><span>原始表 : </span> <input type="text" readonly="readonly">
                                <div class="original_sele" style="display: none;">
                                    <div class="all_sele"><img src="<%=request.getContextPath()%>/ehlib/img/xiao1.png" alt=""><input id="biao_all" type="checkbox" value="left1" name="all_one">全选 <button class="original_sure">确定</button><button class="original_no">取消</button></div>
                                    <div class="original_child">
                                        <%--<div><input type="checkbox" value="biao1" name="all_one">原始表1</div>--%>
                                        <%--<div><input type="checkbox" value="biao2" name="all_one">原始表2</div>--%>
                                        <%--<div><input type="checkbox" value="biao3" name="all_one">原始表3</div>--%>
                                    </div>
                                </div>
                            </div>
                            <button id="ensure_btn" type="button" class="btn btn-primary" data-dismiss="modal">确定</button>
                            <button id="noensure_btn" type="button"class="btn btn-default" data-dismiss="modal"><img style="width: 13px;margin-top: -10px;margin-left: -5px;" src="<%=request.getContextPath()%>/ehlib/img/cha.png" alt="" ></button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="data_left">
                <div class="record_amount">
                     <div>表名称 : <span id="tab_name">无</span></div>
                    <div>表大小 : <span id="tab_size">0(0)</span></div>
                    <div>运行情况 : <span id="run_situation" class="run_situation">未运行</span></div>
                </div>
                <%--<button class="raise_literal">添加</button>--%>
                <%--<img src="<%=request.getContextPath()%>/ehlib/img/jia.png" alt="">--%>
                <div class="raise_literal" > <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal_one">添加</button></div>
                <%--<button class="raise_noliteral">添加</button>--%>
                <div class="trem_selet" style="display: none;" class="modal fade" id="myModal_one" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                    <div class="modal-body modal-dialog modal-content" style="width: 300px;height: 300px;margin: 0px;">
                        <div id="field_name"><span>字段名 : </span> <input type="text"></div>
                        <div id="china_name"><span>中文名 : </span> <input type="text"></div>
                        <div id="nature"><span>属性 : </span>
                            <select name="" id="string_selet">
                                <c:forEach var="temp" items="${zdsx}">
                                    <option value="${temp.ybh}" text="${temp.dmsm}">${temp.dmsm}</option>
                                </c:forEach>
                            </select>
                        </div>
                        <div id="styles"><span>类型 : </span>
                            <select name="" id="">
                                <c:forEach var="temp" items="${zdlx}">
                                    <option value="${temp.ybh}" text="${temp.dmsm}">${temp.dmsm}</option>
                                </c:forEach>
                            </select>
                        </div>
                        <div> <button id="sure_btn" class="btn btn-primary" data-dismiss="modal">确定</button> <button id="nosure_btn" class="btn btn-default" data-dismiss="modal">取消</button></div>
                    </div>
                </div>
                <div class="unit_value" style="display: none;z-index: 100;">
                    <div id="unit_top">字段选择 ( <span>单值字段</span> ) <span class="unit_close">[ 关闭 ]</span></div>
                    <div class="unit_content">
                        <div class="unit_left">
                            <p>可选表</p>
                            <div class="left_one">
                                <%--<div class="unit_one0"><img src="<%=request.getContextPath()%>/ehlib/img/wen.png" alt=""><span>数据表1</span></div>--%>
                                <%--<div class="one_write0">--%>
                                    <%--<div><input type="radio" value="one" name="unit1">字段1</div>--%>
                                    <%--<div><input type="radio" value="two" name="unit1">字段2</div>--%>
                                    <%--<div><input type="radio" value="three" name="unit1">字段3</div>--%>
                                <%--</div>--%>
                                <%--<div class="unit_one1"><img src="<%=request.getContextPath()%>/ehlib/img/wen.png" alt=""><span>数据表2</span></div>--%>
                                <%--<div class="one_write1">--%>
                                    <%--<div><input type="radio" value="one" name="unit2">字段1</div>--%>
                                    <%--<div><input type="radio" value="two" name="unit2">字段2</div>--%>
                                    <%--<div><input type="radio" value="three" name="unit2">字段3</div>--%>
                                <%--</div>--%>
                            </div>
                        </div>
                        <div class="unit_middle">
                            <div><button id="unit_add" class="btn btn-xs">添加</button></div>
                            <div><button id="unit_delt" class="btn btn-xs">删除</button></div>
                        </div>
                        <div class="unit_right">
                            <p>选中字段</p>
                            <table class="unit_selet">
                                <tbody>
                                    <tr style="background: #e4e4e4;">
                                        <td>表名</td>
                                        <td>字段名</td>
                                        <td>中文名</td>
                                    </tr>
                                    <tr class="unit_tr">
                                        <td>index1</td>
                                        <td>col1</td>
                                        <td>中文名</td>
                                    </tr>
                                    <tr class="unit_tr">
                                        <td>index2</td>
                                        <td>col1</td>
                                        <td>中文名</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div id="keep_hold">保存</div>
                    </div>
                </div>
                <div class="multiple_value" style="display: none;z-index: 100;">
                    <div id="multiple_top">字段选择 ( <span>多值字段</span> )<span class="multiple_close">[ 关闭 ]</span></div>
                    <div class="multiple_content">
                        <div class="multiple_left">
                            <p>可选表</p>
                            <div class="left_one1">
                                <%--<div id="multiple_one"><img src="<%=request.getContextPath()%>/ehlib/img/wen.png" alt=""> <input type="checkbox" value="all1" name="test1"><span>数据表1</span></div>--%>
                                <%--<div id="one_write1">--%>
                                    <%--<div><input type="checkbox" value="11" name="test1">字段1</div>--%>
                                    <%--<div><input type="checkbox" value="12" name="test1">字段2</div>--%>
                                    <%--<div><input type="checkbox" value="13" name="test1">字段3</div>--%>
                                <%--</div>--%>
                                <%--<div id="multiple_two"><img src="<%=request.getContextPath()%>/ehlib/img/wen.png" alt=""><input type="checkbox" value="all2" name="test2" style="margin-left: 3px"><span>数据表2</span></div>--%>
                                <%--<div id="two_write1">--%>
                                    <%--<div><input type="checkbox" value="21" name="test2">字段1</div>--%>
                                    <%--<div><input type="checkbox" value="22" name="test2">字段2</div>--%>
                                    <%--<div><input type="checkbox" value="23" name="test2">字段3</div>--%>
                                <%--</div>--%>
                            </div>
                        </div>
                        <div class="unit_middle">
                            <div><button id="multiple_add" class="btn btn-xs">添加</button></div>
                            <div><button id="multiple_delt" class="btn btn-xs">删除</button></div>
                        </div>
                        <div class="multiple_right">
                            <p>按顺序排列这些字段 <img id="multiple_top1" src="<%=request.getContextPath()%>/ehlib/img/top1.png" alt=""> <img id="multiple_bot1" src="<%=request.getContextPath()%>/ehlib/img/bot1.png" alt=""> </p>
                            <div class="multiple_order1">
                                <%--<div class="order_biao">序列1</div>--%>
                                <%--<table class="multiple_selet">--%>
                                    <%--<tbody>--%>
                                    <%--<tr style="background: #e4e4e4;">--%>
                                        <%--<td>表名</td>--%>
                                        <%--<td>字段名</td>--%>
                                        <%--<td>中文名</td>--%>
                                    <%--</tr>--%>
                                    <%--<tr>--%>
                                        <%--<td>index1</td>--%>
                                        <%--<td>col1</td>--%>
                                        <%--<td>中文名</td>--%>
                                    <%--</tr>--%>
                                    <%--<tr>--%>
                                        <%--<td>index2</td>--%>
                                        <%--<td>col1</td>--%>
                                        <%--<td>中文名</td>--%>
                                    <%--</tr>--%>
                                    <%--</tbody>--%>
                                <%--</table>--%>
                            </div>

                            <div class="multiple_order2">
                                <%--<div class="order_biao">序列2</div>--%>
                                <%--<table class="multiple_selet">--%>
                                    <%--<tbody>--%>
                                    <%--<tr style="background: #e4e4e4;">--%>
                                        <%--<td>表名</td>--%>
                                        <%--<td>字段名</td>--%>
                                        <%--<td>中文名</td>--%>
                                    <%--</tr>--%>
                                    <%--<tr>--%>
                                        <%--<td>index1</td>--%>
                                        <%--<td>col1</td>--%>
                                        <%--<td>中文名</td>--%>
                                    <%--</tr>--%>
                                    <%--<tr>--%>
                                        <%--<td>index2</td>--%>
                                        <%--<td>col1</td>--%>
                                        <%--<td>中文名</td>--%>
                                    <%--</tr>--%>
                                    <%--</tbody>--%>
                                <%--</table>--%>
                            </div>
                        </div>
                        <div id="keep_hold1">保存</div>
                    </div>
                </div>
                <div class="noresult_content">
                    <table class="noresult_tab">
                        <tr style="background:#0a4b92;">
                            <td>字段名</td>
                            <td>中文名</td>
                            <td>类型</td>
                            <td>配置规则</td>
                        </tr>
                    </table>
                </div>
                <div class="modal fade" id="loadingModal">
                    <div style="width: 200px;height:20px; z-index: 20000; position: absolute; text-align: center; left: 50%; top: 50%;margin-left:-100px;margin-top:-10px">
                        <div class="progress progress-striped active" style="margin-bottom: 0;">
                            <div class="progress-bar" style="width: 100%;"></div>
                        </div>
                        <h5>正在加载...</h5>
                    </div>
                </div>
                <div class="result_content" style="display: none">
                    <table class="result_tab">
                        <tbody>
                        <tr style="background:#0a4b92;">
                            <td>字段名</td>
                            <td>中文名</td>
                            <td>类型</td>
                            <td>配置规则</td>
                        </tr>
                        <tr>
                            <td>typename</td>
                            <td>中文名1</td>
                            <td>单值</td>
                            <td><img class="editor_tab" src="<%=request.getContextPath()%>/ehlib/img/xiu.png" alt=""><img class="del_tr" src="<%=request.getContextPath()%>/ehlib/img/shai.png" alt=""></td>
                        </tr>
                        <tr>
                            <td>typename</td>
                            <td>中文名1</td>
                            <td>单值</td>
                            <td><img class="editor_tab" src="<%=request.getContextPath()%>/ehlib/img/xiu.png" alt=""><img class="del_tr" src="<%=request.getContextPath()%>/ehlib/img/shai.png" alt=""></td>
                        </tr>
                        <tr>
                            <td>typename</td>
                            <td>中文名1</td>
                            <td>单值</td>
                            <td><img class="editor_tab" src="<%=request.getContextPath()%>/ehlib/img/xiu.png" alt=""><img class="del_tr" src="<%=request.getContextPath()%>/ehlib/img/shai.png" alt=""></td>
                        </tr>
                        <tr>
                            <td>typename</td>
                            <td>中文名1</td>
                            <td>单值</td>
                            <td><img class="editor_tab" src="<%=request.getContextPath()%>/ehlib/img/xiu.png" alt=""><img class="del_tr" src="<%=request.getContextPath()%>/ehlib/img/shai.png" alt=""></td>
                        </tr>
                        <tr>
                            <td>typename</td>
                            <td>中文名1</td>
                            <td>单值</td>
                            <td><img class="editor_tab" src="<%=request.getContextPath()%>/ehlib/img/xiu.png" alt=""><img class="del_tr" src="<%=request.getContextPath()%>/ehlib/img/shai.png" alt=""></td>
                        </tr>

                        </tbody>
                    </table>
                    <div class="act_page">
                        <div id="pagination_5"></div>
                    </div>
                </div>
                <div class="last_column">
                    <input type="hidden" id="searchTableID" value=""/>
                    <input type="hidden" id="jobID" value=""/>
                    <input type="hidden" id="jobGroupID" value=""/>
                    <input type="hidden" id="jobStatus" value=""/>
                    <div class="execute_elect">
                        <input type="radio" value="0" name="runMode" checked>立即执行
                        <input type="radio" value="1" name="runMode">周期执行
                    </div>
                    <div class="accident_time">
                        <div class="form-horizontal col-md-5" style="display: flex;">
                            <label class="col-md-3 control-label"> 从：</label>
                            <div id="start-date" class="input-group" style="width: 35%;"
                                 onclick="WdatePicker({el:'startTime', vel:'startTime',dateFmt:'yyyy-MM-dd HH:mm:ss',maxDate:'#F{$dp.$D(\'endTime\')}'})">
                                <input type="text" id="startTime" class="form-control" style="padding-left: 4px; padding-right: 4px;"
                                       placeholder="开始日期" /> <span class="input-group-addon btn btn-primary"><span
                                    class="glyphicon glyphicon-calendar"></span></span>
                            </div>
                            <label class="control-label" style="width: 2%; text-align: center;margin-left: 10px;"> 到 </label>
                            <div class="input-group" id="end-date" style="width: 35%;margin-left: 17px;"
                                 onclick="WdatePicker({el:'endTime',vel:'endTime',dateFmt:'yyyy-MM-dd HH:mm:ss',minDate:'#F{$dp.$D(\'startTime\')}'})">
                                <input type="text" id="endTime" class="form-control" style="padding-left: 4px; padding-right: 4px;"
                                       placeholder="结束日期" /> <span class="input-group-addon btn btn-primary"><span
                                    class="glyphicon glyphicon-calendar"></span></span>
                            </div>
                        </div>
                    </div>
                    <div class="select_period">
                        <label class="col-md-3 control-label">执行时间</label>
                        <input id="cronExpr" name="cronExpr" readonly/>
                        <button id="setup" class="btn btn-primary">设置</button>
                    </div>
                    <button id="startJob" class="btn btn-primary">启动</button>
                    <%--<button id="endJob" class="btn btn-danger">停止</button>--%>
                </div>
            </div>
        </div>
    </div>
 <!--引入cron表达式设置对话框-->
<%@include file="cron.jsp"%>
<jsp:include page="../common/footer.jsp"></jsp:include>
<script type="text/javascript" src="<%=request.getContextPath() %>/assets/lib/jquery-ui/jquery-ui.min.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/assets/lib/bootstrap-ajax-typeahead-master/js/bootstrap-typeahead.min.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/webpage/common/pageCtrl.js"></script>
<%--<script type="text/javascript" src="<%=request.getContextPath() %>/webpage/common/deptPeopleTree.js"></script>--%>
<script type="text/javascript" src="<%=request.getContextPath() %>/ehlib/js/showGJpage.js" ></script>

<script type="text/javascript" src="<%=request.getContextPath() %>/webpage/carGear/pagination.min.js" ></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/webpage/searchTable/jquery-timepicker.js" ></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/webpage/searchTable/searchTable.js" ></script>
<script type="text/javascript">
    var contextPath = "<%=request.getContextPath() %>";
</script>
</body>
</html>
