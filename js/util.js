/**
 * cookie 相关
 * @type {{prefix: string, set: cookie.set, get: cookie.get, del: cookie.del, name: cookie.name}}
 */
var cookie = {
    prefix: "",
    set: function (name, val, timeout) {
        expires = new Date, expires.setTime(expires.getTime() + 1e3 * timeout), document.cookie = this.name(name) + "=" + escape(val) + "; expires=" + expires.toGMTString() + "; path=/"
    },
    get: function (name) {
        for (cookie_name = this.name(name) + "=", cookie_length = document.cookie.length, cookie_begin = 0; cookie_begin < cookie_length;) {
            if (value_begin = cookie_begin + cookie_name.length, document.cookie.substring(cookie_begin, value_begin) == cookie_name) {
                var valStr = document.cookie.indexOf(";", value_begin);
                return -1 == valStr && (valStr = cookie_length), unescape(document.cookie.substring(value_begin, valStr))
            }
            if (cookie_begin = document.cookie.indexOf(" ", cookie_begin) + 1, 0 == cookie_begin)break
        }
        return null
    },
    del: function (name) {
        new Date;
        document.cookie = this.name(name) + "=; expires=Thu, 01-Jan-70 00:00:01 GMT; path=/"
    },
    name: function (name) {
        return this.prefix + name
    }
};

/**
 * 微信锁,防止方法重复提交.
 */
var wx_lock = {
    open: function (fname) {
        if (wx_lock[fname + "_lock"] == "on") {
            return true;
        } else {
            wx_lock[fname + "_lock"] = "on";
            return false;
        }
    },
    close: function (fname) {
        wx_lock[fname + "_lock"] = "";
    }
};
/**
 * 通用
 * @type {{tips: util.tips}}
 */
//console.log(c)
var util = {
	
    //提示
    tips: function (content, timeout) {
        $(".indexct_tips").remove();
        var msgHtml = '<div class="indexct_tips">' +
            '<p>' + content + '</p>' +
            '<div class="indexct_tips_overlay"></div>' +
            '</div>';
        $(msgHtml).appendTo("body").fadeOut(timeout || 3000);
    },
    coverModle: function (content, timeout) {
        $(".indexct_tips").remove();
        var msgHtml = '<div class="comm-modal">' +
            '<p>' + content + '</p>' +
            '<div class="indexct_tips_overlay"></div>' +
            '</div>';
        $(msgHtml).appendTo("body").fadeOut(timeout || 3000);
    },
    //提示
    confirm: function (content, callback) {
        $(".weui_dialog_confirm").remove();
        var msgHtml = '<div class="weui_dialog_confirm"><div class="weui_mask"></div><div class="weui_dialog">' +
            '<div class="weui_dialog_hd"><strong class="weui_dialog_title">确认</strong></div>' +
            '<div class="weui_dialog_bd">' + content + '</div>' +
            '<div class="weui_dialog_ft"><a href="javascript:;" class="weui_btn_dialog primary">确定</a>' +
            '<a href="javascript:;" class="weui_btn_dialog default" onclick="$(\'.weui_dialog_confirm\').remove();">取消</a></div></div>' +
            '</div>';
        $(msgHtml).appendTo("body");
        $(".weui_btn_dialog.primary").one("click", function () {
            $.isFunction(callback) && callback();
            $('.weui_dialog_confirm').remove();
        })
    },
    exchange:function(){
    	$(".indexct_tips").remove();
        var msgHtml = '<div class="indexct_tips">' +
            '<p>' + "content" + '</p>' +
            '<div class="indexct_tips_overlay"></div>' +
            '</div>';
        $(msgHtml).appendTo("body");
    },
    //修改信息
    changeinfo: function (content,index,callback) {
        $(".weui_dialog_confirm").remove();
        var msgHtml = '<div class="weui_dialog_confirm"><div class="weui_mask"></div><div class="weui_dialog">' +
            '<div class="weui_dialog_bd">' + '<input class="changeIfor" type= "text" value="'+content+'">'  + '</div>' +
            '<div class="weui_dialog_ft"><a href="javascript:;" class="weui_btn_dialog primary">确定</a>' +
            '<a href="javascript:;" class="weui_btn_dialog default" onclick="$(\'.weui_dialog_confirm\').remove();">取消</a></div></div>' +
            '</div>';
        $(msgHtml).appendTo("body");
        $(".weui_btn_dialog.primary").on("click", function () {
			
            $.isFunction(callback) && callback();
            $('.weui_dialog_confirm').remove();
        })
        $(".primary").on("touchend",function(){
        	if(index==0){
        		var _userName = $('.userName').val().replace(/\s+/g,"");
        		var _passWord = $('.passWord').val().replace(/\s+/g,"");
        		var _rePassWord = $('.rePassWord').val().replace(/\s+/g,"");
        		var reg = true;
        		if(!/^\w{3,16}$/.test(_userName)){
//      			$('.userName').val('');
        			$('.erroTips').html("用户名格式不正确");
        			return false;
        		}
        		if (!/^\w{6,16}$/.test(_passWord)) {
//              	$('.passWord').val('');
                	$('.erroTips').html("密码格式不正确");
//      			$('.passWord').prop("placeholder","密码格式不正确");
                	return false;
            	}
        		if(_passWord!=_rePassWord){
//      			$('.rePassWord').val('');
        			$('.erroTips').html("两次密码不一致");
//      			$('.rePassWord').prop("placeholder","两次密码不一致");
        			return false;
        		}
        		
        		$.post("?c=member&a=profile",{username:_userName,password:_passWord,do:'moduser'},function(){
        		
        			},'json');
        		window.location.reload();
        	}else if(index==1){
        		var realname = $('.changeIfor').val().replace(/\s+/g,"");
        		if(realname ==''){
        			$('.txt_tips').eq(index).html(content);
        			return ;
        		}else{
        			$('.txt_tips').eq(index).html(realname);
        			$.post("?c=member&a=profile",{realname:realname,do:'modname'},function(){
        		
        			},'json');
        		}
        	}else if(index==3){
        		var gender=parseInt($('input:radio[name="sex"]:checked').val());
        		//console.log(gender)
        		gender==1?$('.txt_tips').eq(index).html('男'):(gender==2?$('.txt_tips').eq(index).html('女'):$('.txt_tips').eq(index).html("保密"));
        		if(!gender==''){
        			$.post("?c=member&a=profile",{gender:gender,do:'modgender'},function(){
        		
        			},'json');
        		}
        	}else if(index == 4){
        		
        		var birthyear = $('.weui_dialog_bd').find('.year1').find("option:selected").text();
        		var birthmonth = $('.weui_dialog_bd').find('.month1').find("option:selected").text();
        		var birthday = $('.weui_dialog_bd').find('.day1').find("option:selected").text();
        		var _birthyear = birthyear.substring(0,birthyear.length-1);
        		var _birthmonth = birthmonth.substring(0,birthmonth.length-1);
        		var _birthday = birthday.substring(0,birthday.length-1);
        		if(_birthmonth.length == 1&&!isNaN(parseInt(_birthmonth))){
        			_birthmonth = '0'+_birthmonth;
        		}
        		else{
        			_birthmonth = _birthmonth;
        		}
        		if(_birthday.length == 1&&!isNaN(parseInt(_birthday))){
        			_birthday = '0'+_birthday;
        			
        		}
        		else{
        			_birthday = _birthday;
//      			console.log(_birthday.length);
        		}
        		
        		if(!isNaN(parseInt(_birthyear))&&!isNaN(parseInt(_birthmonth))&&!isNaN(parseInt(_birthday))){
        			$('.txt_tips').eq(index).html(_birthyear+'-'+_birthmonth+'-'+_birthday);
        			$('.txt_tips').eq(index).next().remove();
        			$.post("?c=member&a=profile",{birthyear:birthyear,birthmonth:_birthmonth,birthday:_birthday,do:'modbirth'},function(){
        			
        			},'json');
        			window.location.reload();
        		}else{
        			$('.erroTips').html("请填写完整的年月日信息");
        			return false;
        		}
        		

        	}else if(index==5){
        		var email = $('.changeIfor').val();
        		var reg = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
        		if(email == ''){
        			$('.txt_tips').eq(index).html(content);
        			$('.erroTips').html("邮箱内容不能为空");
//      			$('.changeIfor').prop("placeholder","邮箱内容不能为空");
        			return false;
        		}else{
        			if(reg.test(email)){
        				$('.txt_tips').eq(index).html(email);
        				$.post("?c=member&a=profile",{email:email,do:'modemail'},function(){
        		
        				},'json');
        			}else{
//      				$('.changeIfor').val('');
						$('.erroTips').html("请输入正确的邮箱格式");
//      				$('.changeIfor').prop("placeholder","请输入正确的邮箱格式");
//      				alert($('.changeIfor').val())
        				return false;
        			}
        			
        		}
        	}
		});
//      alert(realname)
    },
    //是否微信
    isWeixn: function () {
        var ua = navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
            return true;
        } else {
            return false;
        }
    },
    //验证手机号
    isMobel: function (value) {
        if (/^(1)\d{10}$/g.test(value)) {
            return true;
        } else {
            return false;
        }
    },
    isVerifyNum:function(value,n){
    	
    		
    		if (/^\d{4}$/.test(value)) {
            	return true;
        	} else {
            	return false;
        	}
        	
    },
    isCardNum:function(value,n){
    		if (/^\d{6}$/.test(value)) {
            	return true;
        	} else {
            	return false;
        	}
    },
    //截取字符串 str：字符串  ，len 需要截取的长度
    cutString: function (str, len) {
        if (str.length > len) {
            str = str.substring(0, len);
            return str;
        } else {
            return str;
        }
    },
    //截取掉最后一个字符
    cutLastOne:function(str){
    	str = str.substring(0,str.length-1);
    	return str;
    },
    //获取url参数
    getQueryString: function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    },
    //判断是否有特殊字符
    matchSpecial: function (str) {
        var containSpecial = RegExp(/[(\~)(\!)(\@)(\#)(\$)(\%)(\s)(\^)(\&)(\*)(\()(\))(\-)(\_)(\+)(\=)(\[)(\])(\{)(\})(\|)(\\)(\;)(\:)(\,)(\')(\")(\.)(\/)(\<)(\>)(\?)(\【)(\】)(\（)(\）)]/gi);
        return ( str.match(containSpecial) );
    },
    //判断是否有特殊字符
    containSpecial: function (s) {
        var containSpecial = RegExp(/[(\~)(\!)(\@)(\#)(\$)(\%)(\^)(\&)(\*)(\()(\))(\-)(\_)(\+)(\=)(\[)(\])(\{)(\})(\|)(\\)(\;)(\:)(\,)(\')(\")(\.)(\/)(\<)(\>)(\?)(\【)(\】)(\（)(\）)]+/);
        return ( containSpecial.test(s) );
    }
};
$(function(){
    window.sysinfo && window.sysinfo.cookie && window.sysinfo.cookie.pre && (cookie.prefix = window.sysinfo.cookie.pre);
})