//获取多有的所有表信息
    var searchdata; //所有搜索表信息
    function getAjax1(url,data,callback){
        $.ajax({
            type: "POST",
            url: url,
            data:data,
            async:true,
            dataType: "json",
            contentType:'application/json',
            success: function (resultmsg) {
                if("ok"==resultmsg.status){
                   //  $("#expose_tab").empty();
                   // $.each(resultmsg.value,function(i,n){
                   //     $("#expose_tab").append($("<li value = " + n.tableID +  " rel=" + n.relateBaseTable + ">"+ n.tableName +"</li>"))
                   // })
                   //  console.log(resultmsg.value)
                    callback &&  callback(resultmsg.value);


                }else{
                    console.log(formatJson(JSON.stringify(resultmsg)));
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                alert("调用异常"+errorThrown);
            }
        });
    }
    getAjax1('/web-rsap/searchTable/findAllSearchTables',{},fun4);
    function fun4(res) {
        searchdata = res;
        $.each(searchdata,function(i,n){
            $("#expose_tab").append($("<li value = " + n.tableID +  " rel=" + n.relateBaseTable + ">"+ n.tableName +"</li>"))
        })
    }

//获取所有的基础表信息
var basedata; //基础表信息
getAjax1('/web-rsap/searchTable/findAllBaseTables',{},funo);
function funo(res){
    basedata =res;
    //遍历基础表信息
    $.each(basedata,function(i,n){
        $(".original_child").append($("<div><input type='checkbox' onclick='clickoncheckbox(this)' value='"+ n.tableID +"' name='all_one'><span>"+ n.tableNameCN +"</span></div>"))
    })
}

//添加和更新搜索表
function getAjax4josn(url,data){
    data = JSON.stringify(data);
    $.ajax({
        type: "POST",
        url: url,
        data:data,
        async:true,
        dataType: "json",
        contentType:'application/json',
        success: function (resultmsg) {
            if("ok"==resultmsg.status){
              console.log(resultmsg)
            }else{
               console.log(resultmsg)
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("调用异常"+errorThrown);
        }
    });
}

//所有搜索表信息的删除
function getAjax5(url,data){
    $.ajax({
        type: "POST",
        url: url,
        data:data,
        async:true,
        dataType: "json",
        success: function (resultmsg) {
            console.log(resultmsg)
            if("ok"==resultmsg.status){
                console.log(resultmsg)
            }else{
                console.log(resultmsg);
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("调用异常"+errorThrown);
        }
    });
}

function repeat(s, count) {
    return new Array(count + 1).join(s);
}

function formatJson(json) {
    var i           = 0,
        len          = 0,
        tab         = "    ",
        targetJson     = "",
        indentLevel = 0,
        inString    = false,
        currentChar = null;
    for (i = 0, len = json.length; i < len; i += 1) {
        currentChar = json.charAt(i);

        switch (currentChar) {
            case '{':
            case '[':
                if (!inString) {
                    targetJson += currentChar + "\n" + repeat(tab, indentLevel + 1);
                    indentLevel += 1;
                } else {
                    targetJson += currentChar;
                }
                break;
            case '}':
            case ']':
                if (!inString) {
                    indentLevel -= 1;
                    targetJson += "\n" + repeat(tab, indentLevel) + currentChar;
                } else {
                    targetJson += currentChar;
                }
                break;
            case ',':
                if (!inString) {
                    targetJson += ",\n" + repeat(tab, indentLevel);
                } else {
                    targetJson += currentChar;
                }
                break;
            case ':':
                if (!inString) {
                    targetJson += ": ";
                } else {
                    targetJson += currentChar;
                }
                break;
            case ' ':
            case "\n":
            case "\t":
                if (inString) {
                    targetJson += currentChar;
                }
                break;
            case '"':
                if (i > 0 && json.charAt(i - 1) !== '\\') {
                    inString = !inString;
                }
                targetJson += currentChar;
                break;
            default:
                targetJson += currentChar;
                break;
        }
    }
    return targetJson;
}


//新建表
var index1;
var ttl = true;//判断是添加还是修改
$("#new_show").click(function(){
    ttl = true;//true是新建
   $("#trem_wirte").css("display","block");
    $("#index_name>input").val("")
    $("#type_name>input").val("")
})

//新建 确定数据名的确定键
$('#delet1').attr("disabled",true);
$('#edit1').attr("disabled",true);
$('.raise_noliteral').attr("disabled",true);
$("#ensure_btn").click(function(){
    $("#trem_wirte").css("display","none");
    var suo = $("#index_name>input").val();
    var lei = $("#type_name>input").val();
     if(ttl == true){
        if( suo == "" || lei == ""){
            console.log(111)
        }else{
            // $("#expose_tab").empty();
            var str = $("<li>"+ suo  +"/"+ lei  +"</li>")
            $("#expose_tab").prepend(str)
            console.log(suo  +"/"+ lei)
            //添加总表
            var alltb = JSON.stringify({"tableName":suo  +"/"+ lei,"relateBaseTable":duo_id.join(',')})
            getAjax1('/web-rsap/searchTable/addOrUpdateSearchTable',alltb)
        }
     }else if(ttl == false){
         var str_one = suo  +"/"+ lei;
         var str_id = '';
        $("#expose_tab li")[index1].innerHTML = str_one;
        $.each(searchdata,function(i,n){
            if(n.tableName == str_one){
                str_id = n.tableID;
            }
        })
     }
    console.log(str_id)
     console.log(duo_id)
    getAjax4josn('/web-rsap/searchTable/addOrUpdateSearchTable',{"tableID":str_id,"tableName":str_one,"relateBaseTable":duo_id.join(',')});
})
//左边 原始表取消键
$("#noensure_btn").click(function(){
    $("#trem_wirte").css("display","none");
})

//左边删除
var pagetoll;
var fen_data;
$("#expose_tab").on("click","li",function(){
       for(var i=0; i<$("#expose_tab li").length;i++){
           $("#expose_tab li").removeClass("select_two")
       }
        if( $(this).css("backgroundColor")=="rgb(238, 238, 238)" ){
            $(".ability_nobtn").css("display","none");
            $(".raise_noliteral").css("display","none");
            // $(".create_nobtn").css("display","block");
            $(this).addClass("select_two");
            for(var i=0; i<$('#expose_tab li').length;i++){
                if ($('#expose_tab li')[i].className=='select_two'){
                    var xian_id = $(this).attr("value");
                    createtableguiji(1, 10);
                    function getAjax6(url,data,callback){
                        // console.log(data);
                        // console.log(url);
                        $.ajax({
                            type: "POST",
                            url: url,
                            data:data,
                            async:true,
                            dataType: "json",
                            success: function (resultmsg) {
                                      callback(resultmsg.data);
                            },
                            error: function(XMLHttpRequest, textStatus, errorThrown) {
                                alert("调用异常"+errorThrown);
                            }
                        });
                    }
                    // console.log(xian_id);
                    getAjax6('/web-rsap/searchTable/getSearchTableFieldList',{'queryParam':"{ 'tableID':'" + xian_id+  "','startIndex':'1','pageSize':'10'}"},fun6)
                    getJobInfo(xian_id);
                    getIndexInfo(xian_id);
                    function fun6(res){
                        pagetoll = res;
                        if(pagetoll.length == 0){
                            // console.log(111)
                            $(".noresult_content").css("display","block");
                            $(".result_content").css("display","none");
                        }else{
                            $(".result_content").css("display","block");
                            $(".result_tab tbody").empty();
                            $.each(pagetoll,function (i,n) {
                                $(".result_tab tbody").append($("<tr rel='"+ n.fieldId +"'><td>"+ n.fieldName +"</td><td>"+ n.fieldNameCN +"</td><td>"+ n.fieldESType +"</td><td><img class='editor_tab' src='/web-rsap/ehlib/img/xiu.png' alt=''><img class='del_tr' src='/web-rsap/ehlib/img/shai.png' alt=''></td></tr>"))
                            })
                        }
                    }
                }

            }
            var dan_name1 = '';
            var dan_id1 = '';

            for(var i=0; i<$('#expose_tab li').length;i++) {
                if ($('#expose_tab li')[i].className == 'select_two') {
                    dan_id1 = $('#expose_tab li')[i].getAttribute("value");

                    dan_name1 = $('#expose_tab li')[i].innerHTML;
                }
            }
            function fun41(url,data,callback){
                $.ajax({
                    type : "post",
                    url : url,
                    data : data,
                    dataType : "json", //返回数据形式为json
                    async: false, //同步传输，并添加返回值，返回值应为已定义的全局变量 如a
                    success : function(data) {

                        if("ok"==data.status){
                            if((data.value).length == 0){
                                console.log(444)
                            }else{
                                callback(data.value);
                            }
                        }else{
                            console.log(formatJson(JSON.stringify(data)));
                        }
                    }

                });
            }
            fun41("/web-rsap/searchTable/findRelateBaseTables",{'searchTableID':dan_id1},optb1);
            function optb1(res){
                fen_data = res;
                console.log(fen_data)
            }
            $(this).removeClass("select_one");
        }else{
            $(this).addClass("select_one");
            $(this).removeClass("select_two");
        }
})

//原始表的选择
    $("#original_name>input").focus(function(){
        // console.log(11)
        $(".original_sele").css("display","block")
    })
//左边原始表的多选
var str_xun = [];
var duo_id = [];
function clickoncheckbox(xuan){
    // console.log($(xuan));
     if($(xuan).is(":checked")){
         // console.log($(xuan).next().text())
         str_xun.push($(xuan).next().text())
         duo_id.push($(xuan).val())
         // console.log(duo_id);
     }else {
         var index = str_xun.indexOf($(xuan).next().text());
         if (index > -1) {
             str_xun.splice(index, 1);
             duo_id.splice(index,1);
             console.log(duo_id);
         }
     }
    if(str_xun.length>0){
         var str = str_xun.join(',');
       $("#original_name>input").val(str);
    }

}


$(".all_sele img").attr('flag','true');
//    console.log($(".all_sele img"))

$('.all_sele img').click(function(){
    if($(".all_sele img").attr('flag') == 'false'){
        $(".all_sele img").attr('flag','true');
        $(".all_sele img").attr('src','/web-rsap/ehlib/img/xiao1.png');
        $(".original_child").css("display","block")

    }else{
        $(".all_sele img").attr('flag','false');
        $(".all_sele img").attr('src','/web-rsap/ehlib/img/xiao2.png');
        $(".original_child").css("display","none")
    }
})




//原始表中的全选
$("#biao_all").click(function(){
    if (this.checked) {
        // console.log($(".original_child :checkbox").length)
        $(".original_child :checkbox").prop("checked",true);

        if($(".original_child :checkbox").is(":checked")){
            console.log($(".original_child :checkbox").next().text())
            str_xun.push($(".original_child :checkbox").next().text())
        }else {
            var index = str_xun.indexOf($(".original_child :checkbox").next().text());
            if (index > -1) {
                str_xun.splice(index, 1);
            }
        }
        if(str_xun.length>0){
            var str = str_xun.join(',');
            $("#original_name>input").val(str);
        }

    } else{
        $(".original_child :checkbox").prop("checked",false);
        // clickoncheckbox(xuan);
        $("#original_name>input").val("");
    };
});

$(".original_sure").click(function(){
    $(".original_sele").css("display","none")
})
$(".original_no").click(function(){
    $(".original_sele").css("display","none")
})

// 左边搜索表中的删除
$("#delet").click(function(){
    // console.log( $("#expose_tab li").hasClass("select_one"));
    var b = $('#expose_tab li')
    console.log(searchdata);
      for(var i=0; i<$('#expose_tab li').length;i++){
          if ($('#expose_tab li')[i].className=='select_two'){
              if(confirm("确定要删除吗？")){
                  var str_two = $('#expose_tab li')[i].innerHTML;
                  var delt_id = '';
                  function fun1(){
                      $.ajax({
                          type : "post",
                          url : "/web-rsap/searchTable/findAllSearchTables",
                          data : {
                          },
                          dataType : "json", //返回数据形式为json
                          async: false, //同步传输，并添加返回值，返回值应为已定义的全局变量 如a
                          success : function(data) {
                              if("ok"==data.status){
                                  $.each(data.value,function(i,n){
                                      if(n.tableName == str_two){
                                          delt_id = n.tableID;
                                      }
                                  })

                              }else{
                                  console.log(formatJson(JSON.stringify(data)));
                              }

                          }

                      });
                      return delt_id;
                  }
                  fun1();
                  // console.log(delt_id);
                  //所有搜索表信息的删除
                  getAjax5('/web-rsap/searchTable/deleteSearchTable',{'searchTableID':delt_id})
                  $('#expose_tab li')[i].remove();
              }
          }
      }
})

//左边编辑
$("#edit").click(function(){
    $("#trem_wirte").css("display","block");
    // console.log( $("#expose_tab li").hasClass("select_one"));
    var b = $('#expose_tab li')
    for(var i=0; i<$('#expose_tab li').length;i++){
        if ($('#expose_tab li')[i].className=='select_two'){
             var str1 = $('#expose_tab li')[i].innerHTML;
             var str_rel = $('#expose_tab li')[i].getAttribute('rel');
             var rel_arr = str_rel.split(',');
             $(".original_sele").css("display","block");
             for(var i = 0;i < rel_arr.length;i++){
                 for(var j=0; j<basedata.length; j++){
                    if(basedata[j].tableID == rel_arr[i]){
                        // console.log($(".original_child>div>input").length);
                        for(var k=0;k<$(".original_child>div>input").length;k++){
                            if( $(".original_child>div>input")[k].getAttribute("value") == rel_arr[i] ){
                                $(".original_child>div>input")[k].checked = true;
                                // var arr_one  = [];
                                // arr_one.push($(".original_child>div>span")[k].innerHTML);
                                // console.log(arr_one);
                                // var str_one = arr_one.join(',');
                                // $("#original_name>input").val(str_one);
                            }
                        }
                    }
                 }
             }
             var arr = str1.split("/");
             $("#index_name>input").val(arr[0]);
             $("#type_name>input").val(arr[1]);
             index1 = i;
        }
    }
    ttl = false;//false是修改
})

//右边添加
$(".raise_literal>button").click(function(){
    $(".trem_selet").css("display","block");
    $("#field_name>input").val('');
    $("#china_name>input").val('');
})

//判断出现的单值字段表还是多值字段表


var danm;   //字段名
var danty; //字段类型
var optiontb; //可选表内容
$("#sure_btn").click(function(){
    dancn =  $("#china_name>input").val();
    danm = $("#field_name>input").val();
    var pattern = /^[\u4e00-\u9fa5]*$/;
    var reg = /^\s*$/g;
    if(!pattern.test(dancn) || reg.test(dancn)){
        alert("中文名必须为中文且不能为空");
    }else if(reg.test(dancn) || reg.test(danm)){
        alert("字段名或中文名不能为空")
    }else{
        $(".trem_selet").css("display","none");
        var dan_id = '';
        if($("#string_selet").val() == "1"){
            $(".unit_value").css("display","block");
            var dan_name = '';
            for(var i=0; i<$('#expose_tab li').length;i++) {
                if ($('#expose_tab li')[i].className == 'select_two') {
                    dan_id = $('#expose_tab li')[i].getAttribute("value");
                    // console.log(dan_id);
                    dan_name = $('#expose_tab li')[i].innerHTML;
                }
            }
            function fun4(url,data,callback){
                $.ajax({
                    type : "post",
                    url : url,
                    data : data,
                    dataType : "json", //返回数据形式为json
                    async: false, //同步传输，并添加返回值，返回值应为已定义的全局变量 如a
                    success : function(data) {

                        if("ok"==data.status){
                            if((data.value).length == 0){
                                console.log(444)
                            }else{
                                callback(data.value);
                            }
                        }else{
                            console.log(formatJson(JSON.stringify(data)));
                        }
                    }

                });
            }
            fun4("/web-rsap/searchTable/findRelateBaseTables",{'searchTableID':dan_id},optb);
            function optb(res){
                optiontb = res;
                $('.left_one').empty();
                for(var idx in optiontb){
                    // console.log(n.tableName);
                    $("<div class='unit_one" + idx + "'><img src='/web-rsap/ehlib/img/wen.png' alt=''><span rel='"+ optiontb[idx].tableID +"'>" + optiontb[idx].tableName + "</span></div>").appendTo($('.left_one'));
                    $("<div class='one_write"+  idx + "'></div>").appendTo($('.left_one'))
                    // console.log($('.one_write'+ idx))
                    for(var index in optiontb[idx].tepTableFields){
                        // console.log(optiontb[idx].tepTableFields[index].fieldNameCN)
                        if(optiontb[idx].tepTableFields[index].fieldNameCN == null){
                            optiontb[idx].tepTableFields[index].fieldNameCN = '空';
                            $("<div><input type='radio' onclick='clickradio(this)' value='one' name='unit"+ idx +"'><span rel='"+ optiontb[idx].tepTableFields[index].fieldId  + "'>" + optiontb[idx].tepTableFields[index].fieldNameCN + "</span></div>").appendTo($('.one_write'+ idx))
                        }else{
                            $("<div><input type='radio' onclick='clickradio(this)' value='one' name='unit"+ idx +"'><span rel='"+ optiontb[idx].tepTableFields[index].fieldId  + "'>" + optiontb[idx].tepTableFields[index].fieldNameCN + "</span></div>").appendTo($('.one_write'+ idx))
                        }


                    }
                }
                $(".unit_selet tbody>.unit_tr").empty();
                //可选表奇数变色
               $(".left_one>div:even").css({"color":"#11759f","fontSize":"13px","fontWeight":"bold"});//奇数行
               //  console.log($(".left_one>div:odd").length)
            }
        }else{
            $(".multiple_value").css("display","block");
            var dan_name = '';
            for(var i=0; i<$('#expose_tab li').length;i++) {
                if ($('#expose_tab li')[i].className == 'select_two') {
                    dan_id = $('#expose_tab li')[i].getAttribute("value");
                    // console.log(dan_id);
                    dan_name = $('#expose_tab li')[i].innerHTML;
                }
            }
            function fun4(url,data){
                $.ajax({
                    type : "post",
                    url : url,
                    data : data,
                    dataType : "json", //返回数据形式为json
                    async: false, //同步传输，并添加返回值，返回值应为已定义的全局变量 如a
                    success : function(data) {
                        if("ok"==data.status){
                            if((data.value).length == 0){
                                console.log(444)
                            }else{
                                // console.log('-----------')
                                $('.left_one1').empty();
                                for(var idx in data.value){
                                    // console.log(n.tableName);
                                    $("<div class='multiple_one" + idx + "'><img src='/web-rsap/ehlib/img/wen.png' alt=''><span rel='"+ data.value[idx].tableID +"'><input type='checkbox'>" + data.value[idx].tableName + "</span></div>").appendTo($('.left_one1'));
                                    $("<div class='two_write"+  idx + "'></div>").appendTo($('.left_one1'))
                                    // console.log($('.one_write'+ idx))

                                    for(var index in data.value[idx].tepTableFields){
                                        if(data.value[idx].tepTableFields[index].fieldNameCN == null){
                                            data.value[idx].tepTableFields[index].fieldNameCN = '空'
                                            $("<div><input type='checkbox' onclick='clickbox(this)' value='one' name='multiple"+ idx +"'><span rel='"+ data.value[idx].tepTableFields[index].fieldId  + "'>" + data.value[idx].tepTableFields[index].fieldNameCN + "</span></div>").appendTo($('.two_write'+ idx))
                                        }else{
                                            $("<div><input type='checkbox' onclick='clickbox(this)' value='one' name='multiple"+ idx +"'><span rel='"+ data.value[idx].tepTableFields[index].fieldId  + "'>" + data.value[idx].tepTableFields[index].fieldNameCN + "</span></div>").appendTo($('.two_write'+ idx))
                                        }


                                    }
                                }
                                // console.log(data.value)
                            }


                        }else{
                            console.log(formatJson(JSON.stringify(data)));
                        }

                    }

                });
                // return tian_txt;
            }
            fun4("/web-rsap/searchTable/findRelateBaseTables",{'searchTableID':dan_id});
            $(".left_one1>div:even").css({"color":"#11759f","fontSize":"13px","fontWeight":"bold"});//奇数行

        }

         danty = $("#styles>select").val();
    }
})

//右边单值字段增加
var dantou = '';
var dantou1;
var dantouxia = '';
var fuid;  //基础表id
var childid; //基础表关联id
var keepfild = [];
function clickradio(dan){
    dantouxia = $(dan).next().text();
    // console.log(dantouxia);
    dantou = $(dan).parent().parent().prev().find('span').text();
    dantou1 =  $(dan).parent().parent().prev().find('span');
    fuid = $(dan).parent().parent().prev().find('span').attr("rel");
    childid = $(dan).next().attr("rel");
}
var dancn ;
var str_yy = '';
var result_one;
$("#unit_add").click(function(){
    if(dantou != '' && dantouxia != ''){
         $(".unit_selet tbody").append(" <tr class='unit_tr'><td>"+dantou+"</td><td>"+ dantouxia  +"</td><td>" + dancn +"</td></tr>")
        keepfild.push(fuid + '":"' + childid);
         // console.log(keepfild);

        for(var i=0;i<keepfild.length;i++){
            keepfild[i] = keepfild[i].replaceAll(keepfild[i],'"' + keepfild[i] + '"');
            str_yy += (keepfild[i]+',');
        }
        $(".left_one>div:even").each(function(i,n){
            console.log($(this).find('span')[0].innerHTML);
            if($(this).find('span')[0].innerHTML == dantou){
                // console.log(1111)
                // console.log($(dantou1).parent().next())
                $(dantou1).parent().next().css('display','none');
            }else{
                // console.log(333)
            }
        })
        keepfild = [];
    }
})

//右边多值字段增加
var duo_tou = '';
var duo_str = [];
var dx_id = [];
var dex_id = [];
var duo_touid = [];
function clickbox(duo){
    if($(duo).is(":checked")){
        duo_str.push($(duo).next().text())
        dx_id.push($(duo).parent().parent().prev().find("span").attr("rel"));
        duo_tou = $(duo).parent().parent().prev().find("span").text();
        // duo_touid.push($(duo).next().attr('rel'));
    }else {
        var index = duo_str.indexOf($(duo).next().text());
        if (index > -1) {
            duo_str.splice(index, 1);
            dx_id.splice(index,1);
            console.log(dx_id);
        }
    }
    if(duo_str.length>0){
        var str = duo_str.join(',');
        // $("#original_name>input").val(str);
    }
}
$("#multiple_add").click(function(){
     // console.log(dx_id);
     // console.log(duo_touid);
    if(duo_str != '' && dx_id != ''){
         // console.log($(".left_one1>div:even"));
        dex_id = [];
        duo_touid = [];
        $(".multiple_right>div").empty()
        $(".left_one1>div:even").each(function(i,n){

            $(".multiple_right").append("<div class='multiple_order"+ i +"' rel='"+ duo_touid +"'><div class='order_biao'>序列"+ (i+1) +"</div>" +
                "<table class='multiple_selet"+ i +"'><tbody rel='"+ duo_touid +"'><tr style='background: #e4e4e4;'>" +
                "<td>表名</td><td>字段名</td><td>中文名</td></tr></tbody></table></div>");
                n = $(this).text();
            $(".two_write"+ i +"").each(function(j,n1){
                dex_id.push([])
                $(".two_write"+ i +">div>input:checked").each(function(k,n2){
                    // console.log($(this).next().text());
                    if($(this).parent().parent().attr('class') == $(".two_write"+ i +"").attr('class')){
                        $(".multiple_selet"+ i +"").append("<tr class='sel_tr'><td>"+ n +"</td><td>"+ $(this).next().text() +"</td>" +
                                    "<td>"+ dancn +"</td></tr>")
                        // keep_fild.push(dex_id[i]+ '":"' +duo_touid[i])
                        // console.log($(this).next().attr('rel'));
                        var obj = {}
                        obj[$(".multiple_one"+ i +"").find('span').attr('rel')] = $(this).next().attr('rel')
                        dex_id[i].push(obj);
                        duo_touid.push($(this).next().attr('rel'));
                    }

                })
            })

        })
        // console.log(dex_id);
        // console.log(duo_touid);
        console.log($(".multiple_right div:nth-of-type(3)"))
    }
})

//单值字段表中选中效果
$(".unit_selet tbody").on("click",".unit_tr",function(){
    // console.log($(this).css("backgroundColor"));
    if( $(this).css("backgroundColor")=="rgb(255, 255, 255)" ){
        $(this).addClass("select_two");
        $(this).removeClass("select_thr");
    }else{
        $(this).addClass("select_thr");
        $(this).removeClass("select_two");
    }
})
//多值字段表中选中效果
$(".multiple_right").on("click",".order_biao",function(){
    // console.log($(this).css("backgroundColor"));
    if( $(this).css("backgroundColor")=="rgb(153, 153, 153)" ){
        $(this).addClass("select_two");
        $(this).removeClass("select_four");
    }else{
        $(this).addClass("select_four");
        $(this).removeClass("select_two");
    }
})
//多值字段表序列1的选中效果
$(".multiple_right").on("click","div:nth-of-type(3) .sel_tr",function(){
    if( $(this).css("backgroundColor")=="rgb(255, 255, 255)" ){
        $(this).addClass("select_two");
        $(this).removeClass("select_thr");
        console.log($(this).css("backgroundColor"));
    }else{
        $(this).addClass("select_thr");
        $(this).removeClass("select_two");
    }
})
//多值字段上移
$("#multiple_top1").click(function(){
    var len = $(".multiple_right div:nth-of-type(3) .sel_tr").length;

    $(".multiple_right div:nth-of-type(3) .sel_tr").each(function(i,n){
        if($(this).css("backgroundColor") == "rgb(10, 75, 146)"){
            var current = $(this);
            var prev = current.prev();
            if (current.index() > 0) {
                current.insertBefore(prev); //插入到当前<tr>前一个元素前
            }
        }
    })
    $(".multiple_right div:nth-of-type(4) .sel_tr").each(function(i,n){
        if($(this).css("backgroundColor") == "rgb(10, 75, 146)"){
            var current = $(this);
            var prev = current.prev();
            if (current.index() > 0) {
                current.insertBefore(prev); //插入到当前<tr>前一个元素前
            }
        }
    })
})
//多值字段下移
$("#multiple_bot1").click(function(){
    var len = $(".multiple_right div:nth-of-type(3) .sel_tr").length;

    $(".multiple_right div:nth-of-type(3) .sel_tr").each(function(i,n){
        if($(this).css("backgroundColor") == "rgb(10, 75, 146)"){
            var current = $(this);
            var next = current.next(); //获取当前<tr>后面一个元素
            if (next) {
                current.insertAfter(next);  //插入到当前<tr>后面一个元素后面
            }
        }
    })
    $(".multiple_right div:nth-of-type(4) .sel_tr").each(function(i,n){
        if($(this).css("backgroundColor") == "rgb(10, 75, 146)"){
            var current = $(this);
            var next = current.next(); //获取当前<tr>后面一个元素
            if (next) {
                current.insertAfter(next);  //插入到当前<tr>后面一个元素后面
            }
        }
    })
})

//多值字段表序列2的选中效果
$(".multiple_right").on("click","div:nth-of-type(4) .sel_tr",function(){
    if( $(this).css("backgroundColor")=="rgb(255, 255, 255)" ){
        $(this).addClass("select_two");
        $(this).removeClass("select_thr");
    }else{
        $(this).addClass("select_thr");
        $(this).removeClass("select_two");
    }
})

//多值字段表中的删除
$("#multiple_delt").click(function(){
    for(var i=0; i<$('.order_biao').length;i++){
        // console.log($('.unit_selet .unit_tr')[i].className);
        if ($('.order_biao')[i].className=='order_biao select_two'){
            if(confirm("确定要删除吗？")){
                $('.order_biao').next()[i].remove();
                console.log($('.order_biao').next());
            }
        }
    }
})

//单值字段表中的删除
$("#unit_delt").click(function(){
    // console.log( $('.unit_selet .unit_tr').hasClass("select_two"));
    // var b = $('#expose_tab li')
    // console.log($('.unit_selet .unit_tr').length);
   
    for(var i=0; i<$('.unit_selet .unit_tr').length;i++){
        // console.log($('.unit_selet .unit_tr')[i].className);
        if ($('.unit_selet .unit_tr')[i].className=='unit_tr select_two'){
            if(confirm("确定要删除吗？")){
                $('.unit_selet .unit_tr')[i].remove();
            }
        }
    }
    $(".left_one>div:even").each(function(i,n){
        console.log($(this).find('span')[0].innerHTML);
        if($(this).find('span')[0].innerHTML == dantou){
            console.log(222)
            console.log($(dantou1).parent().next())
            $(dantou1).parent().next().css('display','block');
        }else{
            console.log(444)
        }
    })
})


//单值字段关闭
$(".unit_close").click(function(){
    $(".unit_value").css("display","none");
})
//多值字段关闭
$(".multiple_close").click(function(){
    $(".multiple_value").css("display","none");
})

//多值字段中的序列选中效果
$(".multiple_right").on("click",".multiple_order .order_biao",function(){
    // console.log($(this).css("backgroundColor"));
    if( $(this).css("backgroundColor")=="rgb(153, 153, 153)" ){
        $(this).addClass("select_two");
        $(this).removeClass("select_four");
    }else{
        $(this).addClass("select_four");
        $(this).removeClass("select_two");
    }
})
//多值字段表中的删除
$("#multiple_delt").click(function(){
    for(var i=0; i<$('.multiple_order').length;i++){
        // console.log($('.multiple_order>div')[i])
        if ($('.multiple_order>div')[i].className=='order_biao select_two'){
            if(confirm("确定要删除吗？")){
                $('.multiple_order')[i].remove();
            }
        }
    }
})


$("#nosure_btn").click(function(){
    $(".trem_selet").css("display","none");

})


//右边保存

function getAjax7(url,data){
    $.ajax({
        type: "POST",
        url: url,
        data:data,
        async:false,
        dataType: "json",
        contentType : 'application/json',
        success: function (resultmsg) {
            console.log(resultmsg)
            console.log(444)
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("调用异常"+errorThrown);
            console.log(777);
        }
    });
}

var dancn1;
var danty1;
var danm1;
$("#keep_hold").click(function(){
    $(".unit_value").css("display","none");
    // $(".noresult_content").css("display","none");
   if(ttl == true) {
       for (var i = 0; i < $('#expose_tab li').length; i++) {
           if ($('#expose_tab li')[i].className == 'select_two') {

               var str_two = $('#expose_tab li')[i].innerHTML;
               var you_id1 = '';
               $.each(searchdata, function (i, n) {
                   if (n.tableName == str_two) {
                       you_id1 = n.tableID;
                   }
               })
               console.log(you_id1);
               str_yy = str_yy.slice(0, str_yy.length - 1);
               var resultjie = '';
               resultjie = "{" + str_yy + "}"
               // console.log(resultjie)
               var obj = JSON.stringify({
                   'tableId': you_id1,
                   'fieldType': '1',
                   'fieldNameCN': dancn,
                   'fieldESType': danty,
                   'fieldName': danm,
                   'mappingComments': resultjie
               })
               getAjax7('/web-rsap/searchTable/addSearchTableField', obj)
               str_yy = '';
           }
       }

       for (var i = 0; i < $('#expose_tab li').length; i++) {
           if ($('#expose_tab li')[i].className == 'select_two') {
               // console.log($(this).attr("value"));
               var xian_id = $('#expose_tab li')[i].getAttribute("value");

               function getAjax6(url, data) {
                   // console.log(data);
                   // console.log(url);
                   $.ajax({
                       type: "POST",
                       url: url,
                       data: data,
                       async: false,
                       dataType: "json",
                       success: function (resultmsg) {
                           if ((resultmsg.data).length == 0) {
                               // console.log(111)
                               $(".noresult_content").css("display", "block");
                               $(".result_content").css("display", "none");
                           } else {
                               // console.log(222);
                               // $(".noresult_content").css("display","none");
                               $(".result_content").css("display", "block");
                               $(".result_tab tbody").empty();
                               $.each(resultmsg.data, function (i, n) {
                                   $(".result_tab tbody").append($("<tr><td>" + n.fieldName + "</td><td>" + n.fieldNameCN + "</td><td>" + n.fieldESType + "</td><td><img class='editor_tab' src='/web-rsap/ehlib/img/xiu.png' alt=''><img class='del_tr' src='/web-rsap/ehlib/img/shai.png' alt=''></td></tr>"))
                               })

                           }
                           // console.log(resultmsg);
                       },
                       error: function (XMLHttpRequest, textStatus, errorThrown) {
                           alert("调用异常" + errorThrown);
                       }
                   });
               }

               getAjax6('/web-rsap/searchTable/getSearchTableFieldList', {'queryParam': "{ 'tableID':'" + xian_id + "','startIndex':'1','pageSize':'5'}"})
               getJobInfo(xian_id);
               getIndexInfo(xian_id);
           }

       }

       $(".result_content").css("display", "block");
   }else if(ttl == false){
       for (var i = 0; i < $('#expose_tab li').length; i++) {
           if ($('#expose_tab li')[i].className == 'select_two') {

               var str_two = $('#expose_tab li')[i].innerHTML;
               var you_id1 = '';
               $.each(searchdata, function (i, n) {
                   if (n.tableName == str_two) {
                       you_id1 = n.tableID;
                   }
               })
               console.log(you_id1);
               str_yy = str_yy.slice(0, str_yy.length - 1);
               var resultjie = '';
               resultjie = "{" + str_yy + "}"
               // console.log(resultjie)
               var obj = JSON.stringify({
                   'tableId': you_id1,
                   'fieldType': '1',
                   'fieldNameCN': dancn1,
                   'fieldESType': danty1,
                   'fieldName': danm1,
                   'mappingComments': resultjie
               })
               getAjax7('/web-rsap/searchTable/addSearchTableField', obj)
               str_yy = '';
           }
       }

       for (var i = 0; i < $('#expose_tab li').length; i++) {
           if ($('#expose_tab li')[i].className == 'select_two') {
               // console.log($(this).attr("value"));
               var xian_id = $('#expose_tab li')[i].getAttribute("value");

               function getAjax6(url, data) {
                   // console.log(data);
                   // console.log(url);
                   $.ajax({
                       type: "POST",
                       url: url,
                       data: data,
                       async: false,
                       dataType: "json",
                       success: function (resultmsg) {
                           if ((resultmsg.data).length == 0) {
                               // console.log(111)
                               $(".noresult_content").css("display", "block");
                               $(".result_content").css("display", "none");
                           } else {
                               // console.log(222);
                               // $(".noresult_content").css("display","none");
                               $(".result_content").css("display", "block");
                               $(".result_tab tbody").empty();
                               $.each(resultmsg.data, function (i, n) {
                                   $(".result_tab tbody").append($("<tr><td>" + n.fieldName + "</td><td>" + n.fieldNameCN + "</td><td>" + n.fieldESType + "</td><td><img class='editor_tab' src='/web-rsap/ehlib/img/xiu.png' alt=''><img class='del_tr' src='/web-rsap/ehlib/img/shai.png' alt=''></td></tr>"))
                               })

                           }
                           // console.log(resultmsg);
                       },
                       error: function (XMLHttpRequest, textStatus, errorThrown) {
                           alert("调用异常" + errorThrown);
                       }
                   });
               }

               getAjax6('/web-rsap/searchTable/getSearchTableFieldList', {'queryParam': "{ 'tableID':'" + xian_id + "','startIndex':'1','pageSize':'5'}"})
               getJobInfo(xian_id);
               getIndexInfo(xian_id);
           }

       }

       $(".result_content").css("display", "block");
   }
})
var keep_fild = [];
$("#keep_hold1").click(function(){
    $(".multiple_value").css("display","none");
    if(ttl == true) {


        for (var i = 0; i < $('#expose_tab li').length; i++) {
            if ($('#expose_tab li')[i].className == 'select_two') {

                var str_two = $('#expose_tab li')[i].innerHTML;
                var you_id1 = '';
                $.each(searchdata, function (i, n) {
                    if (n.tableName == str_two) {
                        you_id1 = n.tableID;
                    }
                })
                var resultjie;
                resultjie = JSON.stringify(dex_id);
                resultjie = resultjie.replace(/\"/g, '\\"');
                console.log(resultjie);
                var obj = JSON.stringify({
                    'tableId': you_id1,
                    'fieldType': '2',
                    'fieldNameCN': dancn,
                    'fieldESType': danty,
                    'fieldName': danm,
                    'mappingComments': resultjie
                })
                getAjax7('/web-rsap/searchTable/addSearchTableField', obj);
            }
        }

        for (var i = 0; i < $('#expose_tab li').length; i++) {
            if ($('#expose_tab li')[i].className == 'select_two') {
                var xian_id = $('#expose_tab li')[i].getAttribute("value");

                function getAjax6(url, data) {
                    console.log(data);
                    // console.log(url);
                    $.ajax({
                        type: "POST",
                        url: url,
                        data: data,
                        async: false,
                        dataType: "json",
                        success: function (resultmsg) {
                            if ((resultmsg.data).length == 0) {
                                // console.log(111)
                                $(".noresult_content").css("display", "block");
                                $(".result_content").css("display", "none");
                            } else {
                                // console.log(222);
                                // $(".noresult_content").css("display","none");
                                $(".result_content").css("display", "block");
                                $(".result_tab tbody").empty();
                                $.each(resultmsg.data, function (i, n) {
                                    $(".result_tab tbody").append($("<tr><td>" + n.fieldName + "</td><td>" + n.fieldNameCN + "</td><td>" + n.fieldESType + "</td><td><img class='editor_tab' src='/web-rsap/ehlib/img/xiu.png' alt=''><img class='del_tr' src='/web-rsap/ehlib/img/shai.png' alt=''></td></tr>"))
                                })

                            }
                            console.log(resultmsg);
                            // $("#edit").attr("disabled", true);
                        },
                        error: function (XMLHttpRequest, textStatus, errorThrown) {
                            alert("调用异常" + errorThrown);
                        }
                    });
                }

                getAjax6('/web-rsap/searchTable/getSearchTableFieldList', {'queryParam': "{ 'tableID':'" + xian_id + "','startIndex':'1','pageSize':'5'}"})
                getJobInfo(xian_id);
                getIndexInfo(xian_id);
            }

        }

        $(".result_content").css("display", "block");
    }else if(ttl == false){
        for (var i = 0; i < $('#expose_tab li').length; i++) {
            if ($('#expose_tab li')[i].className == 'select_two') {

                var str_two = $('#expose_tab li')[i].innerHTML;
                var you_id1 = '';
                $.each(searchdata, function (i, n) {
                    if (n.tableName == str_two) {
                        you_id1 = n.tableID;
                    }
                })
                var resultjie;
                resultjie = JSON.stringify(dex_id);
                resultjie = resultjie.replace(/\"/g, '\\"');
                console.log(resultjie);
                var obj = JSON.stringify({
                    'tableId': you_id1,
                    'fieldType': '2',
                    'fieldNameCN': dancn2,
                    'fieldESType': danty2,
                    'fieldName': danm2,
                    'mappingComments': resultjie
                })
                getAjax7('/web-rsap/searchTable/addSearchTableField', obj);
            }
        }

        for (var i = 0; i < $('#expose_tab li').length; i++) {
            if ($('#expose_tab li')[i].className == 'select_two') {
                var xian_id = $('#expose_tab li')[i].getAttribute("value");

                function getAjax6(url, data) {
                    console.log(data);
                    // console.log(url);
                    $.ajax({
                        type: "POST",
                        url: url,
                        data: data,
                        async: false,
                        dataType: "json",
                        success: function (resultmsg) {
                            if ((resultmsg.data).length == 0) {
                                // console.log(111)
                                $(".noresult_content").css("display", "block");
                                $(".result_content").css("display", "none");
                            } else {
                                // console.log(222);
                                // $(".noresult_content").css("display","none");
                                $(".result_content").css("display", "block");
                                $(".result_tab tbody").empty();
                                $.each(resultmsg.data, function (i, n) {
                                    $(".result_tab tbody").append($("<tr><td>" + n.fieldName + "</td><td>" + n.fieldNameCN + "</td><td>" + n.fieldESType + "</td><td><img class='editor_tab' src='/web-rsap/ehlib/img/xiu.png' alt=''><img class='del_tr' src='/web-rsap/ehlib/img/shai.png' alt=''></td></tr>"))
                                })

                            }
                            console.log(resultmsg);
                            // $("#edit").attr("disabled", true);
                        },
                        error: function (XMLHttpRequest, textStatus, errorThrown) {
                            alert("调用异常" + errorThrown);
                        }
                    });
                }

                getAjax6('/web-rsap/searchTable/getSearchTableFieldList', {'queryParam': "{ 'tableID':'" + xian_id + "','startIndex':'1','pageSize':'5'}"})
                getJobInfo(xian_id);
                getIndexInfo(xian_id);
            }

        }

        $(".result_content").css("display", "block");
    }
})
//结果列表中删除
$(".result_tab").on("click","tbody tr td .del_tr",function(){
    // console.log($(this));
    if(confirm("确定要删除吗？")) {
        $(this).parent().parent().remove();
    }
    var listid = $(this).parent().parent().attr("rel");
    getAjax5('/web-rsap/searchTable/deleteSearchTableField',{'fieldId':listid});

})
//结果列表中编辑

$(".result_tab").on("click","tbody tr td .editor_tab",function(){
    // console.log($(this).parent().parent().attr('rel'));
    // console.log(pagetoll);
    for(var i=0;i<pagetoll.length;i++){
        if(pagetoll[i].fieldId == $(this).parent().parent().attr('rel')){
            if(pagetoll[i].fieldType == '单值字段'){
                $(".unit_value").css("display","block");
                ttl = false;
                $('.left_one').empty();
                for(var idx in fen_data){
                    // console.log(n.tableName);
                    $("<div class='unit_one" + idx + "'><img src='/web-rsap/ehlib/img/wen.png' alt=''><span rel='"+ fen_data[idx].tableID +"'>" + fen_data[idx].tableName + "</span></div>").appendTo($('.left_one'));
                    $("<div class='one_write"+  idx + "'></div>").appendTo($('.left_one'))
                    // console.log($('.one_write'+ idx))
                    for(var index in fen_data[idx].tepTableFields){
                        // console.log(optiontb[idx].tepTableFields[index].fieldNameCN)
                        if(fen_data[idx].tepTableFields[index].fieldNameCN == null){
                            fen_data[idx].tepTableFields[index].fieldNameCN = '空';
                            $("<div><input type='radio' onclick='clickradio(this)' value='one' name='unit"+ idx +"'><span rel='"+ fen_data[idx].tepTableFields[index].fieldId  + "'>" + fen_data[idx].tepTableFields[index].fieldNameCN + "</span></div>").appendTo($('.one_write'+ idx))
                        }else{
                            $("<div><input type='radio' onclick='clickradio(this)' value='one' name='unit"+ idx +"'><span rel='"+ fen_data[idx].tepTableFields[index].fieldId  + "'>" + fen_data[idx].tepTableFields[index].fieldNameCN + "</span></div>").appendTo($('.one_write'+ idx))
                        }


                    }
                }
                dancn1 = $(this).parent().prev().prev().text();
                danty1 = $(this).parent().prev().text();
                danm1 = $(this).parent().prev().prev().prev().text();
                $(".unit_selet tbody>.unit_tr").empty();
                //可选表奇数变色
                $(".left_one>div:even").css({"color":"#11759f","fontSize":"13px","fontWeight":"bold"});//奇数行

            }else{
                $(".multiple_value").css("display","block");
                ttl = false;
                $('.left_one1').empty();
                for(var idx in fen_data){
                    // console.log(n.tableName);
                    $("<div class='multiple_one" + idx + "'><img src='/web-rsap/ehlib/img/wen.png' alt=''><span rel='"+ fen_data[idx].tableID +"'><input type='checkbox'>" + fen_data[idx].tableName + "</span></div>").appendTo($('.left_one1'));
                    $("<div class='two_write"+  idx + "'></div>").appendTo($('.left_one1'))
                    // console.log($('.one_write'+ idx))

                    for(var index in fen_data[idx].tepTableFields){
                        if(fen_data[idx].tepTableFields[index].fieldNameCN == null){
                            fen_data[idx].tepTableFields[index].fieldNameCN = '空'
                            $("<div><input type='checkbox' onclick='clickbox(this)' value='one' name='multiple"+ idx +"'><span rel='"+ fen_data[idx].tepTableFields[index].fieldId  + "'>" + fen_data[idx].tepTableFields[index].fieldNameCN + "</span></div>").appendTo($('.two_write'+ idx))
                        }else{
                            $("<div><input type='checkbox' onclick='clickbox(this)' value='one' name='multiple"+ idx +"'><span rel='"+ fen_data[idx].tepTableFields[index].fieldId  + "'>" + fen_data[idx].tepTableFields[index].fieldNameCN + "</span></div>").appendTo($('.two_write'+ idx))
                        }


                    }
                }
                dancn2 = $(this).parent().prev().prev().text();
                danty2 = $(this).parent().prev().text();
                danm2 = $(this).parent().prev().prev().prev().text();
                $(".unit_selet tbody>.unit_tr").empty();
                //可选表奇数变色
                $(".left_one1>div:even").css({"color":"#11759f","fontSize":"13px","fontWeight":"bold"});//奇数行

            }
        }

    }
});



//选择时间点
$("#timePicker").hunterTimePicker();

$(function(){
    //初始化cron页面
    // Tabs
    $('#crontab').tabs();
    //分钟
    for(var i = 0;i<=59;i++){
        $("#kaishi").append("<option value='"+i+"'>"+i+"</option>");
        $("#mfz2div").append("<label><input type='checkbox' name='fenzhong' value='"+i+"' >"+i+"</label>&nbsp;");
    }
    for(var i = 1;i<=59;i++){
        $("#jiange").append("<option value='"+i+"'>"+i+"</option>");
    }
    //小时
    for(var i=0;i<=23;i++){
        $("#mxs_div").append("<label><input type='checkbox' name='xiaoshi' value='"+i+"' >"+i+"点</label>&nbsp;");
    }
    //天
    for(var i=1;i<=31;i++){
        $("#meiri_div").append("<label><input type='checkbox' name='ri' value='"+i+"'>"+i+"日</label>&nbsp;");
    }
    //月
    for(var i = 1;i<=12;i++){
        $("#meiyue_div").append("<label><input type='checkbox' name='yue' value='"+i+"'>"+i+"月</label>&nbsp;");
    }
    //星期
    for(var i=1;i<=7;i++){
        $("#meixq_div").append("<label><input type='checkbox' name='xingqi' value='"+i+"' >"+i+"</label>&nbsp;");

    }
});
//打开设置cron表达式窗口
$("#setup").click(function(){
    $('#crontab_model').modal();
});
$('#crontab_model').on('click','#setup_cron',function(){
    var cron_expr = "";
    //秒
    cron_expr += "0";
    cron_expr += " ";
    //分钟
    if($("input[name='mfz']:checked").val()=="0"){
        var kaishi = "0";
        var jiange = "1";
        if($("#kaishi").val() != ""){
            kaishi = $("#kaishi").val()
        }
        if($("#jiange").val() != ""){
            jiange = $("#jiange").val();
        }
        cron_expr += kaishi+"/"+jiange+" ";
    }else{
        var fenOne = 0;
        $("input[name='fenzhong']:checked").each(function(){
            if(fenOne == 0){
                cron_expr +=  $(this).val();
            }else{
                cron_expr +=  ","+$(this).val();
            }
            fenOne++;
        });
        if(fenOne==0){
            cron_expr += "*";
        }
    }
    cron_expr += " ";
    //小时
    if($("input[name='mxs']:checked").val()=="0"){
        cron_expr += "*";
    }else{
        var xiaoshiOne = 0;
        $("input[name='xiaoshi']:checked").each(function(){
            if(xiaoshiOne == 0){
                cron_expr +=  $(this).val();
            }else{
                cron_expr +=  ","+$(this).val();
            }
            xiaoshiOne++;
        });
        if(xiaoshiOne==0){
            cron_expr += "*";
        }
    }
    cron_expr += " ";
    //日
    if($("input[name='usexingqi']").is(':checked')){
        cron_expr += "?";
    }else{
        if($("input[name='meiri']:checked").val()=="0"){
            cron_expr += "*";
        }else{
            var riOne = 0;
            $("input[name='ri']:checked").each(function(){
                if(riOne == 0){
                    cron_expr +=  $(this).val();
                }else{
                    cron_expr +=  ","+$(this).val();
                }
                riOne++;
            });
            if(riOne==0){
                cron_expr += "*";
            }
        }
    }
    cron_expr += " ";
    //月
    if($("input[name='meiyue']:checked").val()=="0"){
        cron_expr += "*";
    }else{
        var yueOne = 0;
        $("input[name='yue']:checked").each(function(){
            if(yueOne == 0){
                cron_expr +=  $(this).val();
            }else{
                cron_expr +=  ","+$(this).val();
            }
            yueOne++;
        });
        if(yueOne==0){
            cron_expr += "*";
        }
    }
    cron_expr += " ";
    //星期
    if(!$("input[name='usexingqi']").is(':checked')){
        cron_expr += "?";
    }else{
        if($("input[name='mxq']:checked").val()=="0"){
            cron_expr += "*";
        }else{
            var xqOne = 0;
            $("input[name='xingqi']:checked").each(function(){
                if(xqOne == 0){
                    cron_expr +=  $(this).val();
                }else{
                    cron_expr +=  ","+$(this).val();
                }
                xqOne++;
            });
            if(xqOne==0){
                cron_expr += "*";
            }
        }
    }
    cron_expr += " ";

    $("#cronExpr").val(cron_expr);
    $('#crontab_model').modal('hide');
});

//启动任务
$("#startJob").click(function(){
    //启动任务
    if($("#startJob").attr("class")=="btn btn-primary"){
        //校验输入信息
        if($("#searchTableID").val()=="" || $("#jobStatus").val()==""){
            sweetAlert("任务搜索表信息不能为空，请选中左侧搜索表，再次启动任务!");
            return false;
        }
        if($("#startTime").val()==""){
            sweetAlert("开始时间不能为空!");
            return false;
        }
        if($("#endTime").val()==""){
            sweetAlert("结束时间不能为空!");
            return false;
        }
        if($("#cronExpr").val()==""){
            sweetAlert("执行时间不能为空!");
            return false;
        }
        var data = {};
        data.searchTableID = $("#searchTableID").val();
        data.jobID = $("#jobID").val();
        data.jobGroupID = $("#jobGroupID").val();
        data.runMode = $("input[name='runMode']:checked").val();
        data.jobStatus = $("#jobStatus").val();
        data.startTime = $("#startTime").val();
        data.endTime = $("#endTime").val();
        data.cronExpr = $("#cronExpr").val();
        param = JSON.stringify(data);
        $("#loadingModal").modal('show');
        $.ajax({
            type: "POST",
            url: "/web-rsap/searchTable/startSearchTableJob",
            data:param,
            async:true,
            dataType: "json",
            contentType:'application/json',
            success: function (resultmsg) {
                if("ok"==resultmsg.status){
                    //回填任务信息
                    $("#searchTableID").val(resultmsg.value.searchTableID);
                    $("#jobID").val(resultmsg.value.jobID);
                    $("#jobGroupID").val(resultmsg.value.jobGroupID);
                    $("#jobStatus").val(resultmsg.value.jobStatus);
                    if(resultmsg.value.runMode == "1"){
                        $("input[name='runMode'][value='1']").prop("checked",true);
                    }else{
                        $("input[name='runMode'][value='0']").prop("checked",true);
                    }
                    $("#startTime").val(resultmsg.value.startTime);
                    $("#endTime").val(resultmsg.value.endTime);
                    $("#cronExpr").val(resultmsg.value.cronExpr);
                    if(resultmsg.value.jobStatus == "0"){
                        $("#run_situation").attr("class","run_situation");
                        $("#run_situation").html("未运行");
                    }else if(resultmsg.value.jobStatus == "1"){
                        $("#run_situation").attr("class","run_situation");
                        $("#run_situation").html("运行");
                    }else if(resultmsg.value.jobStatus == "2"){
                        $("#run_situation").attr("class","run_situation");
                        $("#run_situation").html("完成");
                    }else if(resultmsg.value.jobStatus == "3"){
                        $("#run_situation").attr("class","stop_situation");
                        $("#run_situation").html("停止");
                    }else if(resultmsg.value.jobStatus == "4"){
                        $("#run_situation").attr("class","stop_situation");
                        $("#run_situation").html("失败");
                    }
                    $("#processing").hide();
                    sweetAlert("任务启动成功！");
                    $("#startJob").attr("class","btn btn-danger");
                    $("#startJob").html("停止");
                    $("#loadingModal").modal('hide');
                }else{
                    sweetAlert("任务启动失败！"+resultmsg.value);
                    $("#loadingModal").modal('hide');
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                alert("调用异常"+errorThrown);
                $("#loadingModal").modal('hide');
            }
        });
    }
    //停止任务
    if($("#startJob").attr("class")=="btn btn-danger"){
        if($("#jobID").val()=="" || $("#jobGroupID").val()==""){
            sweetAlert("任务信息不能为空，请选中左侧搜索表，再次停止任务!");
            return false;
        }
        var data = {};
        data.jobID = $("#jobID").val();
        data.jobGroupID = $("#jobGroupID").val();
        param = JSON.stringify(data);
        $("#loadingModal").modal('show');
        $.ajax({
            type: "POST",
            url: "/web-rsap/searchTable/stopSearchTableJob",
            data:param,
            async:true,
            dataType: "json",
            contentType:'application/json',
            success: function (resultmsg) {
                if("ok"==resultmsg.status){
                    //回填任务信息
                    $("#searchTableID").val(resultmsg.value.searchTableID);
                    $("#jobID").val(resultmsg.value.jobID);
                    $("#jobGroupID").val(resultmsg.value.jobGroupID);
                    $("#jobStatus").val(resultmsg.value.jobStatus);
                    if(resultmsg.value.runMode == "1"){
                        $("input[name='runMode'][value='1']").prop("checked",true);
                    }else{
                        $("input[name='runMode'][value='0']").prop("checked",true);
                    }
                    if(resultmsg.value.jobStatus == "0"){
                        $("#run_situation").attr("class","run_situation");
                        $("#run_situation").html("未运行");
                    }else if(resultmsg.value.jobStatus == "1"){
                        $("#run_situation").attr("class","run_situation");
                        $("#run_situation").html("运行");
                    }else if(resultmsg.value.jobStatus == "2"){
                        $("#run_situation").attr("class","run_situation");
                        $("#run_situation").html("完成");
                    }else if(resultmsg.value.jobStatus == "3"){
                        $("#run_situation").attr("class","stop_situation");
                        $("#run_situation").html("停止");
                    }else if(resultmsg.value.jobStatus == "4"){
                        $("#run_situation").attr("class","stop_situation");
                        $("#run_situation").html("失败");
                    }
                    $("#startTime").val(resultmsg.value.startTime);
                    $("#endTime").val(resultmsg.value.endTime);
                    $("#cronExpr").val(resultmsg.value.cronExpr);
                    $("#processing").hide();
                    sweetAlert("任务停止成功！");
                    $("#startJob").attr("class","btn btn-primary");
                    $("#startJob").html("启动");
                    $("#loadingModal").modal('hide');
                }else{
                    sweetAlert("任务停止失败！"+resultmsg.value);
                    $("#loadingModal").modal('hide');
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                alert("调用异常"+errorThrown);
                $("#loadingModal").modal('hide');
            }
        });
    }
});
function getJobInfo(searchTableId){
    var data = {};
    data.searchTableID = searchTableId;
    $("#loadingModal").modal('show');
    $.ajax({
        type: "POST",
        url: "/web-rsap/searchTable/findSearchTableJobInfo",
        data:data,
        async:true,
        dataType: "json",
        success: function (resultmsg) {
            if("ok"==resultmsg.status){
                //回填任务信息
                $("#searchTableID").val(resultmsg.value.searchTableID);
                $("#jobID").val(resultmsg.value.jobID);
                $("#jobGroupID").val(resultmsg.value.jobGroupID);
                $("#jobStatus").val(resultmsg.value.jobStatus);
                if(resultmsg.value.runMode == "1"){
                    $("input[name='runMode'][value='1']").prop("checked",true);
                }else{
                    $("input[name='runMode'][value='0']").prop("checked",true);
                }
                $("#startTime").val(resultmsg.value.startTime);
                $("#endTime").val(resultmsg.value.endTime);
                $("#cronExpr").val(resultmsg.value.cronExpr);
                if(resultmsg.value.jobStatus == "0" || resultmsg.value.jobStatus == "3"){
                    $("#startJob").attr("class","btn btn-primary");
                    $("#startJob").html("启动");
                }else{
                    $("#startJob").attr("class","btn btn-danger");
                    $("#startJob").html("停止");
                }
                if(resultmsg.value.jobStatus == "0"){
                    $("#run_situation").attr("class","run_situation");
                    $("#run_situation").html("未运行");
                }else if(resultmsg.value.jobStatus == "1"){
                    $("#run_situation").attr("class","run_situation");
                    $("#run_situation").html("运行");
                }else if(resultmsg.value.jobStatus == "2"){
                    $("#run_situation").attr("class","run_situation");
                    $("#run_situation").html("完成");
                }else if(resultmsg.value.jobStatus == "3"){
                    $("#run_situation").attr("class","stop_situation");
                    $("#run_situation").html("停止");
                }else if(resultmsg.value.jobStatus == "4"){
                    $("#run_situation").attr("class","stop_situation");
                    $("#run_situation").html("失败");
                }

                $("#loadingModal").modal('hide');
            }else{
                sweetAlert("获取任务信息失败!"+resultmsg.value);
                $("#loadingModal").modal('hide');
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("调用异常"+errorThrown);
            $("#loadingModal").modal('hide');
        }
    });
}


function getIndexInfo(searchTableId){
    var data = {};
    data.searchTableID = searchTableId;
    $.ajax({
        type: "POST",
        url: "/web-rsap/searchTable/findESSearchTableInfo",
        data:data,
        async:true,
        dataType: "json",
        success: function (resultmsg) {
            if("ok"==resultmsg.status){
                //回填任务信息
                $("#tab_name").html(resultmsg.value.indexName);
                $("#tab_size").html(resultmsg.value.primaryIndexSize+"("+resultmsg.value.totalIndexSize+")");
            }else{
                $("#tab_name").html("无");
                $("#tab_size").html("0(0)");
                //sweetAlert("获取信息失败!"+resultmsg.value);
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("调用异常"+errorThrown);
        }
    });
}

//分页


$("#pagination_5").whjPaging({
    pageSizeOpt: [
        {'value': 10, 'text': '10条/页', 'selected': true}
    ],
    totalPage: 2,
    showPageNum: 10,
    firstPage: '首页',
    previousPage: '上一页',
    nextPage: '下一页',
    lastPage: '尾页',
    skip: '跳至',
    confirm: '确认',
    refresh: '刷新',
    totalPageText: '共{}页',
    isShowFL: true,
    isShowPageSizeOpt: true,
    isShowSkip: true,
    isShowRefresh: true,
    isShowTotalPage: true,
    isResetPage: false,
    callBack: function (currPage, pageSize) {
        createtableguiji(currPage, pageSize);
    }

});

 function createtableguiji(currPage, pageSize){
    // console.log(12212112)
     var pageNumber = currPage;
     for(var i=0; i<$('#expose_tab li').length;i++){
         if ($('#expose_tab li')[i].className=='select_two'){
             var xian_id = $('#expose_tab li')[i].getAttribute("value");
             function getAjax6(url,data,callback){
                 // console.log(data);
                 // console.log(url);
                 $.ajax({
                     type: "POST",
                     url: url,
                     data:data,
                     async:true,
                     dataType: "json",
                     success: function (resultmsg) {

                         callback(resultmsg);
                         // console.log(resultmsg);

                         // var totalPage = Math.ceil(result.total/pageSize);
                         // $("#pagination_5").whjPaging("setPage", result.pageNumber,totalPage );
                     },
                     error: function(XMLHttpRequest, textStatus, errorThrown) {
                         alert("调用异常"+errorThrown);
                     }
                 });
             }
             // console.log(xian_id);
             // console.log("看看是啥",currPage+',' + pageSize)
             getAjax6('/web-rsap/searchTable/getSearchTableFieldList',{'queryParam':"{ 'tableID':'" + xian_id+  "','startIndex':'"+ currPage +"','pageSize':'"+ pageSize +"'}"},fun6)
             getJobInfo(xian_id);
             getIndexInfo(xian_id);
             function fun6(res){
                 pagetoll = res.data;
                 if(pagetoll.length == 0){
                     // console.log(111)
                     $(".noresult_content").css("display","block");
                     $(".result_content").css("display","none");
                 }else{
                     $(".result_content").css("display","block");
                     $(".result_tab tbody").empty();
                     $.each(pagetoll,function (i,n) {
                         $(".result_tab tbody").append($("<tr rel='"+ n.fieldId +"'><td>"+ n.fieldName +"</td><td>"+ n.fieldNameCN +"</td><td>"+ n.fieldESType +"</td><td><img class='editor_tab' src='/web-rsap/ehlib/img/xiu.png' alt=''><img class='del_tr' src='/web-rsap/ehlib/img/shai.png' alt=''></td></tr>"))
                     })
                     var totalPage = Math.ceil(res.recordsTotal/pageSize);
                     // console.log(totalPage);
                     $("#pagination_5").whjPaging("setPage",pageNumber,totalPage);
                 }
             }
         }

     }
 }
//分页

