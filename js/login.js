$(function(){
	window.info = {
		a:1//登录状态
	}
	
	//判断 卡号 积分展示
	if(window.info.a){
//		console.log(1)
			$("#vip").removeClass("hide")
			$(".hostWrap .container").css("width","1172");
			
	}
	//判断是否需要登录
	$(".exchange-btn").on("click",function(){
		if(!window.info.a){
				$(this).attr("data-toggle","modal");
				$(this).attr("data-target","#myModal");
				$("body").css("padding-right","0px");
		}else{
			
			
			//已登录 进行积分兑换
			cardOrTreat($(this));
		}
	})
	//验证信息 进行登录
	$(".vip-btn").on("click",function(){
		
		var $viptel = parseInt($("#vip-tel").val()),$vipverify = parseInt($("#vip-verify").val()),$cardnum = parseInt($("#card-num").val());
		if(!util.isMobel($viptel)){
			$(".vip-tip").css("display","block");
			$(".vip-tip p").html("手机号输入有误");
			return false;
		} else if(!util.isVerifyNum($vipverify)){
			$(".vip-tip").css("display","block");
			$(".vip-tip p").html("验证码格式错误");
			return false;
		}else if(!util.isCardNum($cardnum)){
			$(".vip-tip").css("display","block");
			$(".vip-tip p").html("会员卡号格式错误");
			return false;
		}else{
			
			$(".vip-tip").css("display","block");
			$.ajax({
				type:"post",
				headers:{
					"Accept":"application/json;charset = utf-8",
					"Content-Type":"application/json;charset = utf-8"
				},
				url:"https://192.168.1.105:443/api/login/pushregistersms",
				data:{"phone":'18300708687',"pushType":'RegisterMsg'},
				async:true,
				success:function(data){
					console.log(data)
					$(".hostWrap .container").css("width","1172");
					$("#vip").removeClass("hide");
					
					$(".vip-number").html("12345678");
					$(".vip-point").html("1000");
					
					$(".host-modle").css("display","none");
					$(".modal-backdrop").css("display","none");
					
				}
			});
			$(".vip-tip p").html("");
		}
		
	})
//	积分兑换 还是定制会员卡
	function cardOrTreat(ob){
		if (ob.hasClass("swiper-slide")) {
			console.log(1)
			location.href = "customMade.html";
		} else{
			util.exchange()
		}
		
		
	}
	
	
//	var test = function(){
//		console.log(a);
//		console.log(wx_lock)
//	}
	
	
})