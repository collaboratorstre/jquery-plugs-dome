<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!-- 时间设置dialog -->
<div class="modal fade" id="crontab_model" tabindex="-1">
    <div class="modal-dialog" style="width: 500px;">
        <div class="modal-content">
            <div class="modal-header">
                <h4>设置cron表达式</h4>
            </div>
            <div class="modal-body">
                <div id="crontab">
                    <ul>
                        <li><a href="#tabs-1">按分钟</a></li>
                        <li><a href="#tabs-2">按小时</a></li>
                        <li><a href="#tabs-3">按日</a></li>
                        <li><a href="#tabs-4">按月</a></li>
                        <li><a href="#tabs-5">按星期</a></li>
                    </ul>
                    <div id="tabs-1">
                        <input type="radio" name="mfz" id="mfz1" value="0" checked="true"/>
                        每分钟:
                        <select name="kaishi" id="kaishi">
                            <option value="">请选择</option>
                        </select>
                        开始时间
                        <select name="jiange" id="jiange">
                            <option value="">请选择</option>
                        </select>
                        间隔
                        <div id="mfz2div" class="entry_select">
                            <input type="radio" name="mfz" id="mfz2" value="1"/> 指定:
                            <br/>
                            <div class="c"></div>
                        </div>

                    </div>
                    <div id="tabs-2">
                        <input type="radio" name="mxs" id="mxs1" value="0" checked="true"> 每小时
                        <div id="mxs_div" class="entry_select">
                            <input type="radio" name="mxs" id="mxs2" value="1"> 指定:<br/>
                            <div class="c"></div>
                        </div>
                    </div>
                    <div id="tabs-3">
                        <input type="radio" name="meiri" id="meiri1" value="0" checked="true"> 每日<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(<font color="red">日期与星期不能同时选</font>)</span><br />
                        <div id="meiri_div" class="entry_select">
                            <input type="radio" name="meiri" id="meiri2" value="1"> 指定:</br>
                            <div class="c"></div>
                        </div>
                    </div>
                    <div id="tabs-4">
                        <input type="radio" name="meiyue" id="meiyue1" value="0" checked="true"> 每月
                        <div id="meiyue_div" class="entry_select">
                            <input type="radio" name="meiyue" id="meiyue2" value="1"> 指定:</br>
                            <div class="c"></div>
                        </div>
                    </div>
                    <div id="tabs-5">
                        <label><input type="checkbox" name="usexingqi" id="usexingqi" value="1" />使用星期 </label>
                        <hr/>
                        <input type="radio" name="mxq" id="mxq1" value="0" checked="true"> 每星期<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(<font color="red">日期与星期不能同时选</font>)</span>
                        <div id="meixq_div" class="entry_select">
                            <input type="radio" name="mxq" id="mxq2" value="1"> 指定:</br>
                            <div class="c"></div>
                        </div>
                    </div>
                </div>
                <div class="field-control">
                    <button id="setup_cron" type="button" class="btn btn-primary">保存</button>
                    <button type="button" class="btn btn-danger" data-dismiss="modal">关闭</button>
                </div>
            </div>
        </div>
    </div>
</div>

