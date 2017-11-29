//对IE的placeholder进行兼容
$(function() {
    // 如果不支持placeholder，用jQuery来完成
    if(!isSupportPlaceholder()) {
        // 遍历所有input对象, 除了密码框
        $('input').not("input[type='password']").each(
            function() {
                var self = $(this);
                var val = self.attr("placeholder");
                input(self, val);
            }
        );
        /*
        *  对password框的特殊处理
        * 1.创建一个text框 
        * 2.获取焦点和失去焦点的时候切换
        */
        $('input[type="password"]').each(
            function() {
                var pwdField    = $(this);
                var pwdVal      = pwdField.attr('placeholder');
                var pwdId       = pwdField.attr('id');
                // 重命名该input的id为原id后跟1
                pwdField.after('<input id="' + pwdId +'1" type="text" value='+pwdVal+' autocomplete="off" />');
                var pwdPlaceholder = $('#' + pwdId + '1');
                pwdPlaceholder.show();
                pwdField.hide();

                pwdPlaceholder.focus(function(){
                    pwdPlaceholder.hide();
                    pwdField.show();
                    pwdField.focus();
                });

                pwdField.blur(function(){
                    if(pwdField.val() == '') {
                      pwdPlaceholder.show();
                      pwdField.hide();
                    }
                });
            }
        );
    }
});
// 判断浏览器是否支持placeholder属性
function isSupportPlaceholder() {
    var input = document.createElement('input');
    return 'placeholder' in input;
}

// jQuery替换placeholder的处理
function input(obj, val) {
    var $input = obj,
        val = val;
    $input.attr({value:val});
    $input.focus(function() {
        if ($input.val() == val) {
            $(this).attr({value:""});
    }
    }).blur(function() {
        if ($input.val() == "") {
            $(this).attr({value:val});
        }
    });
}
/* 登陆 */
function login(ajaxUrl){
    var username = $("#username").val(),
        password = $("#password").val();
        if(username == ""||password == "") {
            layer.msg("用户名或密码为空 !", {
                time: 3000 //3s后自动关闭
              });
            return;
        }
        $.ajax({
            cache: false,
            type: "post",
            url:ajaxUrl,
            data:{
                "password":password,
                "username":username
            },
            dataType:"json",
            async: true,
            crossDomain: true == !(document.all),
            success:function(data){
                if(data.status == true) {
                	if(data.message.type=="1"){
						window.location.href="./main.html";
						window.sessionStorage.setItem("UserType",data.message.jxuser.userType);
						window.sessionStorage.setItem("UserName",data.message.jxuser.xm);
					}else if(data.message.type=="2"){
						window.location.href="/html/index.html";
					}
                }else if(data.status == false){
            		  layer.msg(data.message.msg, {
            		    time: 3000 //3s后自动关闭
            		  });
                } else {
                	layer.msg("服务器异常，请您稍后访问 !", {
            		    time: 3000 //3s后自动关闭
                	});
                }
            },
            error: function(data) {
                //错误回调
            	layer.msg("服务器异常，请您稍后访问 !", {
        		    time: 3000, //3s后自动关闭
        		  });
            }
        });
}
/* 点击登陆 */
$("#submit").click(function(){
    login(pcLogin);
})
/* 回车登陆 */
function KeyDown(e) {
    try{
        var currKey=0,e=e||event;   
        currKey=e.keyCode||e.which||e.charCode;  
        if(currKey==13){        
            login(pcLogin);
        }
    }catch(e) {
        return;
    }
}