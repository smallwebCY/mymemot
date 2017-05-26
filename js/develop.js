$(function(){
//	$(".de-btn").find("a").eq(0).on("click",function(){
//		if($(this).hasClass("active")){
//			return;
//		}else{
//			alert()
//		}
//	})
alert()
	$(".activB").on("click",function(){
		if($(this).hasClass("active")){
			return;
		}else{
//			alert()
			$(this).addClass("active").siblings().removeClass("active");
			$(".develop-wrap .honour-wrap").addClass("hide");
			$(".develop-wrap .active-wrap").removeClass("hide");
			
		}
	});
	$(".honourB").on("click",function(){
		if($(this).hasClass("active")){
			return;
		}else{
//			alert()
			$(this).addClass("active").siblings().removeClass("active");
			$(".develop-wrap .active-wrap").addClass("hide");
			$(".develop-wrap .honour-wrap").removeClass("hide")
			
		}
	})
var creatActive =function(){
		$.ajax({
		type:"get",
		url:"../testdata1.json",
		data:"page = 1",
		async:true,
		success:function(sucdata){
			console.log(sucdata)
			var total = requestSuccess(sucdata,$(".active-wrap"));
			$(".m-pagination-page").on("click","li",function(){
				
//				console.log(history.pushState)
				var ur = $(this).find("a").html();
				if($(this).hasClass("active")){
					return;
				}else{
					$(".active-wrap").empty();
					$.ajax({
						type:"get",
						url:"../testdata"+ur+".json",
						data:"page = 2",
						async:true,
						success:function(sucdata){
//							var hreftest = window.location.href;
							var query = sucdata.page;
//							console.log(query)
							var title = "yiming test";
        					document.title = title;
        					history.pushState({ title: title }, title, location.href.split("?")[0] + "?" + query);
							requestSuccess(sucdata,$(".active-wrap"));
						}
					});
				}
			})
			
		}
	});
}
creatActive();

	
	
	function requestSuccess(sucdata,selec){
		
			var total = sucdata.total;
			
			sucdata.data.forEach(function(value,index){
//				var ss = '<img src="../img/develop/' +value.imgsrc+' "/>';
				
				var activestr ='<div class="col-md-4">'+
								'<div class="ac-img">'+
									'<img src="../img/develop/'+value.imgsrc+'"  />'+
								'</div>'+
								'<div class="ac-main">'+
									'<p>'+ value.activetxt+'</p>'+
								'</div>'+
								'<div class="ac-point">'+
									'<span>'+ value.time+'</span>'+
									'<span>'+ value.point+'</span>'+
								'</div>'+
							'</div>';
							
				selec.append(activestr);
				
			})
			return total;
			
	}
})