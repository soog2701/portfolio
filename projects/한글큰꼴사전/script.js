$(document).ready(function(e) { 
	initSelectBox();
	fontlayout.init();
	fontdynamiclayout.init();
});

	/****************************************************************
	* 셀렉트박스 외부 함수 호출 및 공통 적용 함수
	****************************************************************/
	function initSelectBox()
	{
		// 셀렉트 박스 일괄 적용
		$("select").each(function (idx)
		{
			var $t=$(this);
			var $p=$t.parent();
			var $d=$p.children('div.select');
			var o={height:145,zindex:1000,direction:$p.hasClass("selectBtm")?"up":"down"};
			if(!$d.length){	
				(new SelectBox($t, o)).initSB();
			}else{
				$d.getInstance().resetSB();
			}
			
		});
	}
	
//
"use strict";
(function($){
	var module = window.fontlayout = {};
	//main
	module.mainLayout = function(){
		if( $('.mainNav button').length < 1 ) return false;
		var headers = $('#wrapper'), conts = $(".wideCont");
		var mainNav = $('.mainNav button');
		var tab = $('.mainTab a,.mainTab02 a');
		var wh = $(window).height();
		tab.on('click', tabselect);
		function tabselect(e){
			e.preventDefault();
			var idx = $(this).parent().index();
			$(this).parent().addClass('on');
			$(this).parent().siblings().removeClass('on');
			$(this).closest('ul').nextAll('.tabCont').hide();
			$(this).closest('ul').nextAll('.tabCont').eq(idx).show();			
		}
		//wheel
		var wheelEvents = ('onwheel' in document || document.documentMode >= 9 ? 'wheel' : 'mousewheel DOMMouseScroll');		
		$(document).on( wheelEvents, wheelani );		
		var mainidx = 0;
		var basePoint = 859;
		$('body').data('ani', false); 
		function wheelani(e){
			//animate prevent
			if( $('body').data('ani') ) return false;
			var deltaY = e.originalEvent.deltaY;			
			var pi = deltaY > 0 ? 1 : -1;
			var windowset = $(window).scrollTop() + $(window).height();
			var contset = Math.round(conts.eq(mainidx).offset().top) + conts.eq(mainidx).outerHeight(true);
			var cur = $(window).height() -conts.eq(mainidx).outerHeight(true);//-71;
			//if( $(window).height() > basePoint ){
				if( deltaY > 0 ){ //down					
					if( windowset < contset || mainidx === conts.length-1  ){ 
					}else{
						if( mainidx === conts.length-1 ) pi = 0;
						mainNavAni(mainidx+pi);
					}
				}else{
					if( mainidx === 0 ) pi = 0;
					if( windowset -cur > contset ){	
					}else{							
						mainNavAni(mainidx+pi);
					}
				}
			//}else{
			//	smallClass();
			//}			
		}
		mainNav.on('click', function(e){
			var pi = $(this).index();			
			if( $(window).height()> basePoint ){ classform( pi ); }			
			mainNavAni(pi);
		});
		function mainNavAni(pi){
			var pt = conts.eq(pi).offset().top;// -71;
			$('body').data('ani', true);
			TweenLite.to( $(window), 0.8, {scrollTo:{y:pt,autoKill:true},ease:Power3.easeOut , onComplete: function(){ classform( pi ); mainidx = pi; $('body').data('ani', false); } });	
		}
		
		var observer = [];
		observer[0] = new IntersectionObserver(updateClass,{ rootMargin : '0px' , threshold: 1 });
		observer[1] = new IntersectionObserver(updateClass,{ rootMargin : '0px' , threshold: [0.5,1] });
		observer[2] = new IntersectionObserver(updateClass,{ rootMargin : '0px' , threshold: 1 });
		observer[3] = new IntersectionObserver(updateClass,{ rootMargin : '0px' , threshold: [0.6,1] });
		
		conts.each(function(i){ 
			observer[i].observe( this );
		});		
		function updateClass( entries,obs ){
			if( $(window).height() > basePoint ){	
				if( entries[0].boundingClientRect.top >= 0  ){ // //||(  entries[0].isIntersecting && $(window).scrollTop() > entries[0].boundingClientRect.top) 					
					if( entries[0].boundingClientRect.top+entries[0].boundingClientRect.bottom <= $(window).scrollTop()+$(window).height() ){
						mainidx = $(entries[0].target).index(); 						
						classform( mainidx );						
					}
				}				
			}
		};
		if( $(window).height() > basePoint ){
			smallClass();
		}
		function classform( idx ){
			headers.removeClass('mainWrap01 mainWrap02 mainWrap03 mainWrap04').addClass( 'mainWrap0'+(idx+1) );
			mainNav.removeClass('pageON');
			mainNav.eq(idx).addClass('pageON');	
		}		
		function smallClass(){
			for( var i=0; i<conts.length ; i++ ){
				if( $(window).scrollTop() >= conts.eq(i).offset().top  ){					
					classform( i );
				}
			}
		}
		
		//slide
		var arrow = $(".mainEvent button");
		var slidediv = $('.mainEvent .slider');
		arrow.eq(0).hide();
		slidediv.find('li').not(':first').hide();
		arrow.on('click',mainslide );
		slidediv.find('ul').data('ani',false);
		if( slidediv.find('li').length < 2 ) arrow.eq(1).hide();
		function mainslide(e){
			var now = slidediv.find('li:visible');
			var idx = now.index();
			if( slidediv.find('ul').data('ani') ) return false;
			slidediv.find('ul').data('ani',true);
			if( $(this).hasClass('prev') ){
				now.prev().show();
				slidediv.find('ul').css('margin-left', -now.width()+'px');
				TweenLite.to( slidediv.find('ul')[0], 0.8, {marginLeft: 0+'px',ease:Power3.easeOut , onComplete: function(){ 
					now.hide(); slidediv.find('ul').css('margin-left','0px'); slidediv.find('ul').data('ani',false);
				} });	
				if( now.prev().index() === 0 ){
					arrow.eq(0).hide(); arrow.eq(1).show();
				}else{
					arrow.eq(0).show(); arrow.eq(1).show();
				}				
			}else{
				now.next().show();
				TweenLite.to( slidediv.find('ul')[0], 0.8, {marginLeft: -now.width()+'px',ease:Power3.easeOut , onComplete: function(){ 
					now.hide(); slidediv.find('ul').css('margin-left','0px'); slidediv.find('ul').data('ani',false);
				} });				
				if( now.next().index() === slidediv.find('li').length-1 ){
					arrow.eq(0).show(); arrow.eq(1).hide();
				}else{
					arrow.eq(0).show(); arrow.eq(1).show();
				}
			}
		}
		
	};
	
	//member
	module.agreecheck = function(){
		var all = $('.chkTotal input[type="checkbox"]');
		var check = $('.withdrawWrap input[type="checkbox"]');		
		check.on('change', function(e){ check.filter(':checked').length === check.length ? all.prop('checked', true) : all.prop('checked', false);	 });		
		all.on('change', function(e){ $(this).prop('checked') ? check.prop('checked', true) : check.prop('checked', false); });				
	};
	//
	module.filename = function(){
		var inputfile = $('.attachFile [type="file"]'), del = $('.attachFile .del');
		inputfile.on('change', function(e){
			var txt = this.value.match(/[^\/\\]+$/);
			$(this).parent().find('[type="text"]')[0].value= txt;			
		});
		del.on('click', function(e){
			$(this).parent().find('[type="text"]')[0].value= "";	
		});	
	};
	
	module.modalpop = function(){
		var btn = $('.layerBtn[data-path]');
		btn.on('click', function(e){
			e.preventDefault();
			var pop = new ModalPop({url: $(this).data('path') ,elem:$(this)});
		});
	};
	module.searchPage = function(){
		if( $('.searchDetail').length > 0 ){
			var open = $('.searchBtn .btnFont.icoF_open'),
				close = $('.searchDetail .searchBtn .btnFont.icoF_open'),
				toggleBtn = $('.searchDetail .condition03 .toggleList>li>a');
			open.on('click', searchOpen);
			close.on('click', searchClose);
			toggleBtn.on('click', toggle);
		}
		
		function searchOpen(e){
			var div =$(".searchDetail"),
			cont = $("#fontSearch .inner");
			div.css('display','block');
			TweenMax.to( ".searchDetail .inner", 0.5, {left:'0%',ease:Power3.easeOut});
			cont.css('padding-right','275px').addClass('openSearch');
		}
		function searchClose(e){
			var div = $(".searchDetail"),
			cont = $("#fontSearch .inner");
			TweenMax.to( ".searchDetail .inner", 0.5, {left:'100%',ease:Power3.easeOut , onComplete:function(){ div.css('display','none'); }});
			cont.css('padding-right','0px').removeClass('openSearch');
			$('.searchDetail .condition03 .toggleList>li:not(:first)').removeClass('open');
			$('.searchDetail .condition03 .toggleList>li:first').addClass('open');
		}
		function toggle(e){
			e.preventDefault();
			$(this).parent().toggleClass('open');
		}
	};
	
	//font detail
	module.fontInfoDetail = function(){
		var btn = $('.fontIntro .btnOpen button');
		btn.on('click', toggle);
		function toggle(e){			
			var div = $(".fontIntro .fontCont");
			if( div.parent().is('.ani') ) return false;
			$(this).parent().toggleClass('close');			
			div.show();
			if( !div.parent().is('.ani') && $(this).parent().hasClass('close') ){				
				div.wrap('<div class="ani" style="height:0px;overflow:hidden;" />');
				TweenMax.to( ".fontIntro .ani", 0.5, {height: div.outerHeight(true)+'px',ease:Power3.easeOut , onComplete:function(){ div.unwrap(); } });
				$(this).text(  $(this).text().replace(/보기$/ ,"접기") );
			}else{
				div.wrap('<div class="ani" style="height:'+ div.outerHeight(true) +'px;overflow:hidden;" />');
				TweenMax.to( ".fontIntro .ani", 0.5, {height: 0+'px',ease:Power3.easeOut , onComplete:function(){ div.unwrap(); div.hide(); } });
				$(this).text(  $(this).text().replace(/접기$/ ,"보기") );
			}			
		}
		
	};
	
	module.tab = function(){
		var list = $('.tabType2 li a');
		list.on('click', open);
		function open(e){
			e.preventDefault();
			var idx = $(this).parent().index();
			var len = $(this).closest('.tabType2').find('li').length;
			$(this).parent().addClass('on');
			$(this).parent().siblings().removeClass('on');			
			var cont = $(this).closest('.tabType2').nextAll('.exampleCont.tabCont').slice(0,len);
			cont.hide();
			cont.eq(idx).show();
		}
	};
	
	//chart
	module.graphdrawSlide = function(){
		if( $('.chartArea').length > 0 ){
			var g = new DrawGraph({ data: [10,20,10,5,50,5] });
		}
		var indi = '.chartArea .controller a';		
		$(document).off('click.chart').on('click.chart', indi , changeChart );
		function changeChart(e){
			e.preventDefault();
			if( !$(this).hasClass('on') ){
				$(this).addClass('on');
				$(this).siblings().removeClass('on');				
				var ng = new DrawGraph({ data: [5,30,30,5,20,10] });
			}			
		}
	};
	
	//FAQ
	module.faq = function(){
		var list = $('.faqList>li>a');
		list.on('click', toggle );		
		function toggle(e){
			e.preventDefault();
			if( $(this).parent().hasClass('on') ){
				$(this).parent().removeClass('on');
			}else{
				$(this).parent().addClass('on');
				$(this).parent().siblings().removeClass('on');
			}
			
		}
	};
	
	//intro
	module.intropage = function(){
		var controller = new ScrollMagic.Controller();		
		$('.introList>li:eq(1)>div:eq(0)').addClass('scrollani1').css({'position':'absolute','top':'-30px','right':'0'});	
		$('.introList>li:eq(1)>div:eq(1)').addClass('scrollani3');
		$('.introList>li:eq(2)>div:eq(0)').addClass('scrollani2').css({'position':'absolute','top':'-55px','left':'0'});
		$('.introList>li:eq(2)>div:eq(1)').addClass('scrollani4');
		$('.introList>li:eq(0)>div:eq(0)').addClass('scrollani5').css({'position':'absolute','top':'0','left':'0'});
		$('.introList>li:eq(0)>div:eq(1)').addClass('scrollani6');
		$('.introList').parent().parent().prev().addClass('hook1');		
		$('.introList>li:eq(0)').addClass('hook2');
			
		if( $('.introList').length > 0 ){
			$('.wrapper').addClass('hook0');			
			setscroll( ".hook1" , ".scrollani1", 100 );
			setscroll( ".hook0" , ".scrollani5", 100 );
			setscroll( ".hook1" , ".scrollani2", 100 );
			setscroll( ".hook1" , ".scrollani3", 30 );
			setscroll( ".hook2" , ".scrollani4", 30 );		
			setscroll( ".hook0" , ".scrollani6", 30 );	
			function setscroll( hook , elem, yp ){
				var scrollani = new TimelineMax().fromTo( elem, 1.2, {y: yp+"px",opacity:0}, {y: "0px",opacity:1, ease: Power1.easeOut });				
				return new ScrollMagic.Scene({
					triggerElement: hook,
					triggerHook: "onLeave"
				})				
				.setTween(scrollani)
				//.addIndicators() // add indicators (requires plugin)
				.addTo(controller)
				.reverse(false);				
			}
		}
		
	};	
	
	module.init = function(){
		module.mainLayout();
		module.filename();		
		module.modalpop();
		module.searchPage();
		module.fontInfoDetail();
		module.tab();
		module.graphdrawSlide();
		module.agreecheck();
		module.faq();
		module.intropage();
	};
		
}(jQuery));

(function($){
	var module = window.fontdynamiclayout = {};
	module.layerClose = function(e){		
		if( $('#popLayer:visible').length > 0 ){
			$('#popLayer').children().remove();
			$('.dimmed').hide();
			/*if( $('body').css('top') !== "auto" ){
				var sc = parseInt($('body').css('top'));
				$('body').css({
					    'position': '',
					    'top': '',
					    'overflow-y': '',
					    'width': ''
				});
				$(window).scrollTop(-sc);
			}*/			
		}		
	};	
	module.layerTab = function(e){
		e.preventDefault();
		var idx = $(this).parent().index();
		$(this).parent().addClass('on');
		$(this).parent().siblings().removeClass('on');
		$(this).closest('.popTab').nextAll('.layCont.tabCont').hide();
		$(this).closest('.popTab').nextAll('.layCont.tabCont').eq(idx).show();
	};
	module.layerSlide = function(e){
		var now = $(this).siblings('.slider').find("li.on"),
			prev = now.prev().length>0 ? now.prev() : now.siblings().last() ,
			next = now.next().length>0 ? now.next() : now.siblings().first() ;
			
		if( $(this).hasClass('prev') ){
			prev.css('left','-100%');
			TweenMax.to( now[0] , 0.5, {left: "100%",ease:Power3.easeOut  });
			TweenMax.to( prev[0] , 0.5, {left: "0%",ease:Power3.easeOut , onComplete:function(){ now.removeClass('on'); prev.addClass('on'); } });
			$(this).siblings('.pageNum').find("b").text(prev.index()+1);
		}else{
			next.css('left','100%');
			TweenMax.to( now[0] , 0.5, {left: "-100%",ease:Power3.easeOut  });
			TweenMax.to( next[0] , 0.5, {left: "0%",ease:Power3.easeOut , onComplete:function(){ now.removeClass('on'); next.addClass('on'); } });
			$(this).siblings('.pageNum').find("b").text(next.index()+1);
		}
	};
		
	module.init = function(){		
		var closeClass = '.popLayer .close ,.popLayer .popClose';
		$(document).off('click.layerclose').on('click.layerclose', closeClass , module.layerClose );
		var tabClass = '.popLayer .popTab a';
		$(document).off('click.layertab').on('click.layertab', tabClass , module.layerTab );
		var slideClass = '.popLayer .sliderWrap button';
		$(document).off('click.layerslide').on('click.layerslide', slideClass , module.layerSlide );		
	};
	
}(jQuery));

function DrawGraph( option ){	
	this.o = $.extend({
		data: []
	},option);
	this.init();
}
DrawGraph.prototype = {	
	draw : function(){
		//if( $('.canvas canvas').length < 1 ){ 
			$('.canvas').empty().append('<canvas id="graph" width="248" height="248"></canvas>');
		//}
		var data = this.o.data;
		setTimeout(function(){
			RGraph.Clear($('.canvas canvas')[0]);
			RGraph.Reset($('.canvas canvas')[0]);
		    var pie = pies( "bg" ,data).on('draw', function (obj){	
				var co  = obj.canvas.getContext('2d');
				co.globalCompositeOperation = "destination-out";				
				co.arc(124, 124, 75, 0, 2 * Math.PI, false);
			    co.fillStyle = 'green';
			    co.fill();
			}).roundRobin({'radius': false});			
			var pie2 = pies( "line" ,data ).roundRobin({'radius': false});		
	    },25);
	    
	    function pies( type , data ){
	    	var color ,strstyle, ctx;
	    	if( type =="line" ){
	    		color = ["transparent", "transparent", "transparent", "transparent", "transparent", "transparent"] ;
	    		strstyle ='rgba(0,0,0,1)';
	    		ctx = "pie";
	    	}else{
	    		color = ["#ff8a00", "#fec413", "#ffe084", "#777", "#999", "#ddd"]  ;
	    		strstyle ='rgba(0,0,0,0)';
	    		ctx = 'donut';
	    	}
	    	return new RGraph.Pie({
		        id: "graph",		        
		        data: data,
		        options: {		            
		            //variant: 'donut',
		            radius : 118,
		            //variantDonutWidth: 44,
	                linewidth: 4,                
	                exploded: 0,
	                strokestyle: strstyle,        
	                align: 'left',
	                shadow : false,
	                textSize : 0,
	                textAccessible : false,
	                colors : color
		        }
		    });
	    }
	},
	init: function(){
		var $this = this;		
		var sarr = Array.prototype.slice.call( document.querySelectorAll('script') );
		while( sarr.length > 0 ){
			var check = false;
			if( sarr[0].src.indexOf("rgraph") !== -1 ){
				check = true;
			}
			sarr.shift();			
			if( !check && sarr.length < 1 ) $('head').append('<script src="../js/rgraph.js"></script>');
		}
		
		var end = false;
		if( $('.canvas').length > 0 && RGraph ){
			$(window).off('scroll.canvas').on('scroll.canvas', start);
			start();
		}		
		function start(){ 			
			if( $(window).scrollTop()+parseInt($(window).height()/1.2) >= $('.canvas').offset().top && !end ){
				$this.draw();
				end = true;
			}
		}
		
	}
};

function ModalPop( option ){
	this.o = $.extend({
		url: "",
		elem : ""
	},option);	
	this.init();
}
ModalPop.prototype = {	
	loaded : function(url){ 
		var request = $.get( encodeURI(url) );
		var $this = this;
		request.done(function(data){ 
			var div = $(data).filter('.popLayer');
			var dim = $('.dimmed');
			var pdiv = $('#popLayer');
			div.css({display:'none'});			
			pdiv.append(div);
			div.show().css('visibility', 'hidden');
			setTimeout(function(){
				div.css('margin-top', Math.floor(-div.height()/2)+'px').css('visibility', '');
			},50);		
			dim.show();			
			/*var sc = $(window).scrollTop();
			$('body').css({
				    'position': 'fixed',
				    'top': - sc + 'px',
				    'overflow-y': 'scroll',
				    'width': '100%'
			});*/
			//login Tab
			if( div.find('.popTab').length > 0 ){
				div.find('.popTab li').removeClass('on');
				div.find('.popTab li:first').addClass('on');			
			}
			//slide
			if( div.find('.sliderWrap').length > 0 ){			
				var idx = $this.o.elem.parent().index(), len = div.find('.slider li').length;
				div.find('.pageNum b').text((idx+1));
				div.find('.pageNum span').text( len );
				div.find('.slider li.on').removeClass('on');
				div.find('.slider li').eq(idx).addClass('on');				
			}
			//multi layer
			if( div.find('.layerBtn[data-path]').length > 0 ){
				var otherURL = div.find('.layerBtn[data-path]').data('path');				
				div.find('.layerBtn[data-path]').on('click', function(e){
					pdiv.empty();
					$this.loaded(otherURL);
				});
			}
		});		
	},	
	init: function(){
		var url = this.o.url;
		this.loaded(url);
	}
};