$(document).ready(function() {
	var documentWidth = $(document.documentElement).width() || $(document.body).width();
	if(documentWidth <= 768) {
		$(".navbar-nav .page-scroll").eq(0).on("touchend", function() {
			$(".subNav").stop().slideToggle();
		});
		$(".page-scroll").eq(0).children("a").attr("href", "#")
	} else {
		$(".navbar-nav .page-scroll").eq(0).on("mouseenter", function() {
			$(".subNav").stop().slideDown();
		})
		$(".navbar-nav .page-scroll").eq(0).on("mouseleave", function() {
			$(".subNav").stop().slideUp();
		})
	}
	$(".navbar-nav li:first-child").on("click","a", function() {
		alert()
//		$(this).addClass("active");
//		$(this).parent().siblings().removeClass("active")
	})
})

$(function(){
//	alert()
	$(".league-wrap .area-sign-left").on("click",function(){
		
		$(".league-wrap .area-left").slideDown("fast",function(){});
		$(".league-wrap .area-right").css("display","none");
		$(".league-wrap .area-sign-left").removeClass("left-arow");
		$(".league-wrap .area-sign-right").addClass("right-arow")
	})
	$(".league-wrap .area-sign-right").on("click",function(){
		
		$(".league-wrap .area-right").slideDown("fast",function(){});
		$(".league-wrap .area-left").css("display","none");
		$(".league-wrap .area-sign-right").removeClass("right-arow");
		$(".league-wrap .area-sign-left").addClass("left-arow")
	})
	$(".league-wrap .hide-arow").on("click",function(){
		$(".league-wrap .area-wrap").slideUp("fast",function(){
			$(".league-wrap .show-arow").css("display","block");
			$(".league-wrap .area-sign-right").addClass("right-arow")
			$(".league-wrap .area-sign-left").addClass("left-arow")
		});
	})
})
$(function(){
	
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
	});
})

var index ;		
var count ;
$(function(){
	$(".honour-wrap").on("click",".col-md-4",function(){
//		alert();

		$(".comm-modal").css("display","block");
		$(document.documentElement).css("overflow-y","hidden");
		index = null ;
		count = null;
	});
	$(".comm-modal .clos-wrap").on("click",function(){
		$(".comm-modal").css("display","none");
		$(document.documentElement).css("overflow-y","auto");
		index = null ;
		count = null;
	});
	$(".comm-modal").on("click",".prev",function(){
		/*var a=document.getElementById("titl");
		alert(a.href);*/
		if(index==null){
			var id=$(this).attr('href').split('#');
			index = id[1] ;
			count = id[2];
		}
		if(index>0){
			index --;
			var a=document.getElementById("titl"+index+"");
			var hre = a.href.toString();
			var name = hre.split("'")[1]; 
			var tit = hre.split("'")[3];
			document.getElementById("titll").innerHTML=chineseFromUtf8Url(tit);
			document.getElementById("honour_img").src="./traceAction_getimg.action?status="+name+"_d";
		}
	});
	$(".comm-modal").on("click",".next",function(){
		if(index==null){
			var id=$(this).attr('href').split('#');
			index = id[1] ;
			count = id[2];
		} 
		if(index<count-1){
			index ++;
			var a=document.getElementById("titl"+index+"");
			var hre = a.href.toString();
			var name = hre.split("'")[1]; 
			var tit = hre.split("'")[3];
			document.getElementById("titll").innerHTML=chineseFromUtf8Url(tit);
			document.getElementById("honour_img").src="./traceAction_getimg.action?status="+name+"_d";
		}
		});
})
function   chineseFromUtf8Url(strUtf8){ 
var   bstr   =   ""; 
var   nOffset   =   0; //   processing   point   on   strUtf8 
if(   strUtf8   ==   ""   ) 
      return   ""; 
   
strUtf8   =   strUtf8.toLowerCase(); 
nOffset   =   strUtf8.indexOf("%e"); 
if(   nOffset   ==   -1   ) 
      return   strUtf8; 
while(   nOffset   !=   -1   ) 
{ 
      bstr   +=   strUtf8.substr(0,   nOffset); 
      strUtf8   =   strUtf8.substr(nOffset,   strUtf8.length   -   nOffset); 
      if(   strUtf8   ==   ""   ||   strUtf8.length   <   9   )       //   bad   string 
          return   bstr; 
       
      bstr   +=   utf8CodeToChineseChar(strUtf8.substr(0,   9)); 
      strUtf8   =   strUtf8.substr(9,   strUtf8.length   -   9); 
      nOffset   =   strUtf8.indexOf("%e"); 
} 
   
return   bstr   +   strUtf8; 
}
function   utf8CodeToChineseChar(strUtf8) { 
    var   iCode,   iCode1,   iCode2; 
    iCode   =   parseInt("0x"   +   strUtf8.substr(1,   2)); 
    iCode1   =   parseInt("0x"   +   strUtf8.substr(4,   2)); 
    iCode2   =   parseInt("0x"   +   strUtf8.substr(7,   2)); 
     
    return   String.fromCharCode(((iCode   &   0x0F)   <<   12)   |    
((iCode1   &   0x3F)   <<     6)   | 
(iCode2   &   0x3F)); 
} 
