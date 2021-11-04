
	function  moveBanners() {
		var $div1;
		var $div2;
	/*	var $div4;*/
		var mq1 = window.matchMedia("(min-width: 1160px)");
		var mq2 = window.matchMedia("(min-width: 990px)");
		
		if (mq1.matches) {

		$div2 = $('.unit_main_banner_1_top > .unit_side_banner');
			if ($div2.length) {
				$div2.remove();
				$div2.prependTo('.unit_main_banner_1');
			}
			
/*			$div4 = $('.unit_news_banner_bottom_2_top > .unit_news_banner_bottom');
			if ($div4.length) {
				$div4.remove();
				$div4.prependTo('.unit_news_banner_bottom_2');
			}*/
			
		} else {

			$div2 = $('.unit_main_banner_1 > .unit_side_banner');
			if ($div2.length) {
				$div2.remove();
				$div2.eq(0).appendTo('.unit_main_banner_1_top');
			}
			
/*			$div4 = $('.unit_news_banner_bottom_2 > .unit_news_banner_bottom');
			if ($div4.length) {
				$div4.remove();
				$div4.eq(0).appendTo('.unit_news_banner_bottom_2_top');
			}*/
		}
/*
		if (mq2.matches) {
			$div1 = $('.unit_center_top_banner_top > .unit_center_banner');
			if ($div1.length) {
				$div1.remove();
				$div1.prependTo('.unit_center_top_banner');				
			}
		} else {
			$div1 = $('.unit_center_top_banner >.unit_center_banner');
			if ($div1.length) {
				$div1.remove();
				$div1.eq(0).appendTo('.unit_center_top_banner_top');				
			}
		}
*/
	}

	function  moveNews() {
		var $div3;
		var mq3 = window.matchMedia("(min-width: 800px)");
		
		if (mq3.matches) {
			$div3 = $('.post_other_news_side > .container_sub_top_news');
			if ($div3.length) {
				$div3.remove();
				$div3.prependTo('.post_other_news');				
			}
		} else {
			$div3 = $('.post_other_news >.container_sub_top_news');
			if ($div3.length) {
				$div3.remove();
				$div3.eq(0).appendTo('.post_other_news_side');				
			}
		}
				
	}



	$( window ).resize(function() {
		moveBanners();
		moveNews();
	}).resize();
	

	$( document ).ready(function() {
		moveBanners();
		moveNews();

	})


$( document ).ready(function() {
	
	$("#mode1 a").click(function() {
		if (  ! $(this).parent().hasClass("view_changer_item_active")  ) {
			$(".container_sub_news_list_wrapper").addClass("mode1");
            $(".container_sub_news_list_wrapper").removeClass("mode2");
            $(".container_sub_news_list_wrapper").removeClass("mode3");
			$(this).parent().addClass("view_changer_item_active");
			$("#mode2").removeClass("view_changer_item_active");
            $("#mode3").removeClass("view_changer_item_active")
		} 
	});
	
	$("#mode2 a").click(function() {
			if (  ! $(this).parent().hasClass("view_changer_item_active")  ) {
			$(".container_sub_news_list_wrapper").addClass("mode2");
            $(".container_sub_news_list_wrapper").removeClass("mode1");
            $(".container_sub_news_list_wrapper").removeClass("mode3");
			$(this).parent().addClass("view_changer_item_active");
			$("#mode1").removeClass("view_changer_item_active");
            $("#mode3").removeClass("view_changer_item_active")
		} 
	});
    
    $("#mode3 a").click(function() {
			if (  ! $(this).parent().hasClass("view_changer_item_active")  ) {
			$(".container_sub_news_list_wrapper").addClass("mode3");
            $(".container_sub_news_list_wrapper").removeClass("mode1");
            $(".container_sub_news_list_wrapper").removeClass("mode2");
			$(this).parent().addClass("view_changer_item_active");
			$("#mode1").removeClass("view_changer_item_active");
            $("#mode2").removeClass("view_changer_item_active")
		} 
	});
	
	

	})







/*
$(document).ready(function() {
  "use strict";

  var c,
    currentScrollTop = 0,
    navbar = $(".header");
  var p = navbar.position();

  $(window).scroll(function() {
    var a = $(window).scrollTop();
   
    if (a < p.top + 120) {		
      navbar.removeClass("fixed");
    }

    var b = navbar.height() + p.top + 50;

    currentScrollTop = a;

    if (c < currentScrollTop && a > b) {
		if (!($('body').hasClass('modal-active'))) {
      navbar.removeClass("fixed");
		}
    } else if (c > currentScrollTop && !(a <= b)) {
		if (!($('body').hasClass('modal-active'))) {
      navbar.addClass("fixed");
		}
    }
    c = currentScrollTop;
	  
  });
	
	 $(window).resize(function() {
		 var a = $(window).scrollTop();
		 if (a < 500) {
      navbar.removeClass("fixed");
		
    } 
	 });
});
*/







/*-------*/

var isNavigation = false;
var isSearch = false;
var isHideAll = false;

function HideAllDiv(calback)
{
	if (isHideAll) {
		if ( !isAnimate() ) {
			isHideAll= false;
			$(calback).trigger('click');
			return;
		} else
			setTimeout(function(){ HideAllDiv(calback); }, 100);
		
		return;
	}	

	if ($(".modal_menu").is(":visible") && !isNavigation) 
		setTimeout(function(){ $(".menu-link").trigger('click');}, 2);
		
	/*if ($(".modal_search").is(":visible") && !isSearch)
		setTimeout(function(){ $(".search-link").trigger('click');}, 2);*/

	isHideAll = true;
	setTimeout(function(){ HideAllDiv(calback); }, 100);
}

function isHideAllDiv(calback)
{
	if ($(".modal_menu").is(":visible") /*|| $(".modal_search").is(":visible")*/)  {
		setTimeout(function(){ HideAllDiv(calback); }, 2);
		return false;
	}
	
	return true;
}

function isAnimate() {
	if (isNavigation || isSearch)
		return true;

	return false;
}

$(document).ready(function () {
    $(".menu-link").click(function () {
		if (isAnimate())
			return;
		$("body").toggleClass("modal-active");

		if ($(".modal_menu").is(":hidden"))
			if ( !isHideAllDiv(".menu-link") )
				return;

		isNavigation = true;
		if ($(".modal_menu").is(":hidden"))
			$(".modal_menu").fadeIn(5, function() { isNavigation = false; });
		else
			$(".modal_menu").fadeOut(5, function() { isNavigation = false; });
	   $(".menu-link").toggleClass("menu-link_active");
    });


   	$('.close-link-menu').click(function(event){

		if ($(".modal_menu").is(":visible"))
			$(".menu-link").trigger('click');

	});
});
