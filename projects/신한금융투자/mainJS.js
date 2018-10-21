$(document).ready(function(){
	if(!window.si){//if( $('#contTop').length > 0 ){
		shMain.init();
	}
});
"use strict";
(function($){
	var module = window.shMain = {};
	//notice layer
	module.notice = function(){ //e.name = mainnotice;
		var div = $('.main_notice'),
			ps = parseInt(div.css('bottom'));
		div.animate({ 'bottom' : '0px' },800);
		setTimeout(function(){
			div.animate({ 'bottom' : '-270px' },800);
		},3000);
		div.off('mouseenter.mainnotice').on('mouseenter.mainnotice', function(e){
			e.preventDefault();
			div.stop().animate({ 'bottom' : '0px' });
		}).off('mouseleave.mainnotice').on('mouseleave.mainnotice', function(e){
			div.stop().animate({ 'bottom' : '-270px' });
		});
	};
	module.initMainNews = function() {
		var noticeDIV = $(".main_notice");
		var noticeH = noticeDIV.outerHeight();
		var titleH = noticeDIV.find(".tit").outerHeight();
		
		//init
		noticeDIV.css("bottom", -noticeH);
		
		//first
		noticeDIV.delay(500).animate(
		{
			"bottom": 0	
		}, {queue:true, duration: 700}).delay(3000).animate(
		{
			"bottom": -noticeH + titleH
		}, {queue:true, duration: 500});
		
		//event
		noticeDIV.on("mouseenter.initMainNews focusin.initMainNews", function (e) 
		{
			var target = $(e.currentTarget);
			
			noticeDIV.animate(
			{
				"bottom": 0	
			}, {queue:false, duration: 400, ease: "easeOutQuart"});
		});
		
		noticeDIV.on("mouseleave.initMainNews focusout.initMainNews", function (e) 
		{
			var target = $(e.currentTarget);
			
			noticeDIV.animate(
			{
				"bottom": -noticeH + titleH
			}, {queue:false, duration: 400, ease: "easeOutQuart"});
		});
		/*
		noticeDIV.find("button.close").on("click.initMainNews", function (e)
		{
			noticeDIV.hide();
		});
		*/
	}
	var topTabtimerG = null;
	module.topvisual = function(){ //e.name = maintoptab
		var topTab = $('#contTop .mainSide a'),
			topDiv = $('#contTop .contMain'),
			topTabArrow = $('.mainTopCont .sliderWrap > button');
		$('#contTop .bgTop p').css({
			'position' : 'absolute'
		});
		topDiv.css({
			'position' : 'absolute',
			'overflow':'hidden'
		});
		topDiv.find('>div').css({
			'position' : 'absolute',
			'left':'50%',
			'margin-left' :'-470px'
		});
		var topTabMouseIn = false;
		topTab.off('click.maintoptab').on('click.maintoptab', function(e){
			//alert(module.topvisualplay);
			
			clearInterval(topTabtimerG);
			topTabtimerG = setInterval(function(){
				module.topvisualmove();
			},7000);//5000
						
			e.preventDefault();
			var idx = $(this).parent().index();
			var now = topDiv.filter(':visible');

			if( $('#contTop .bgTop').is(':animated') ) return false;
			if( topDiv.eq(idx).is(':visible') ) return false;
			$(this).parent().addClass('on');
			$(this).parent().siblings().removeClass('on');

			$('#contTop .bgTop p').eq(idx).stop().fadeIn();
			$('#contTop .bgTop p').not(':eq('+idx+')').stop().fadeOut(600);
			topDiv.eq(idx).find('>div').hide();
			topDiv.eq(idx).find('>div:first').hide().stop().fadeIn(700);
			topDiv.eq(idx).show();

			topDiv.not(':eq('+idx+')').hide();
		}).off('focusin.maintoptab').on('focusin.maintoptab',function(){
			if( topTabMouseIn ){
			}else{
				module.topvisualstop();
				topTabMouseIn = false;
			}
		}).off('mousedown.maintoptab').on('mousedown.maintoptab',function(){
			topTabMouseIn = true;
		});
		var topTabArrowMouseIn = false;
		topTabArrow.off('click.maintoptab').on('click.maintoptab', function(e){
			var now = topDiv.filter(':visible').index('.contMain');
			var num;
			if( $(this).hasClass('prev') ){
				if( topDiv.filter(':visible').find('>div:visible').index() !== 0  ){
					var div = topDiv.filter(':visible').find('>div:visible');
					div.stop().fadeOut(300);
					div.prev().stop().fadeIn(500);
				}else{
					num = now-1 > -1? now-1 : topTab.length-1;
					topTab.eq( num ).trigger('click');
					if( now > num ){ //prev
						topDiv.eq(num).find('>div:first').hide();
						topDiv.eq(num).find('>div:last').hide().stop().fadeIn(500);
					}
				}
			}else if( $(this).hasClass('next') ){
				if( topDiv.filter(':visible').find('>div:visible').index() !== topDiv.filter(':visible').find('>div').length -1 ){
					var div = topDiv.filter(':visible').find('>div:visible');
					div.stop().fadeOut(300);
					div.next().stop().fadeIn(500);
				}else{
					num = now+1 > topTab.length-1 ? 0 : now+1;
					topTab.eq( num ).trigger('click');
				}
			}else if( $(this).hasClass('stop') ){
				module.topvisualstop();
			}else if( $(this).hasClass('play') ){
				module.topvisualplay();
			}
		}).off('focusin.maintoptab').on('focusin.maintoptab',function(){
			if( topTabArrowMouseIn ){
			}else{
				module.topvisualstop();
				topTabArrowMouseIn = false;
			}
		}).off('mousedown.maintoptab').on('mousedown.maintoptab',function(){
			topTabArrowMouseIn = true;
		});
		//// time play
		if( $('.mainTopCont .sliderWrap').data('rollmaintoptab' ) ){
			module.topvisualstop();
			module.topvisualplay();
		}else{
			module.topvisualplay();
		}

	};
	module.topvisualplay = function(){
		$('.mainTopCont .sliderWrap > button.play').hide();
		$('.mainTopCont .sliderWrap > button.stop').show();
		//var topTabtimer = setInterval(function(){
		topTabtimerG = setInterval(function(){
			module.topvisualmove();
		},7000);//5000
		$('.mainTopCont .sliderWrap').data('rollmaintoptab',topTabtimerG);
	};
	module.topvisualstop = function(){
		$('.mainTopCont .sliderWrap > button.play').show();
		$('.mainTopCont .sliderWrap > button.stop').hide();
		clearInterval( $('.mainTopCont .sliderWrap').data('rollmaintoptab' ));
		$('.mainTopCont .sliderWrap').removeData('rollmaintoptab' );
	};
	module.topvisualmove = function(){ //next
		var topDiv = $('#contTop .contMain');
		var topTab = $('#contTop .mainSide a');
		if( topDiv.filter(':visible').find('>div:visible').index() !== topDiv.filter(':visible').find('>div').length -1 ){
			if( topDiv.is(':animated') ) return false;
			var div = topDiv.filter(':visible').find('>div:visible');
			div.fadeOut(400);
			div.next().stop().fadeIn(500);
		}else{
			var now = topDiv.filter(':visible').index('.contMain');
			var num;
			num = now+1 > topTab.length-1 ? 0 : now+1;

			if( $('#contTop .bgTop').is(':animated') ) return false;
			if( topDiv.eq(num).is(':visible') ) return false;
			$('#contTop .mainSide li').eq(num).addClass('on');
			$('#contTop .mainSide li').not(':eq('+num+')').removeClass('on');

			$('#contTop .bgTop p').eq(num).fadeIn();
			$('#contTop .bgTop p').not(':eq('+num+')').stop().fadeOut(600);
			topDiv.eq(num).find('>div').hide();
			topDiv.eq(num).find('>div:first').hide().stop().fadeIn(700);
			topDiv.eq(num).show();

			topDiv.not(':eq('+num+')').hide();
		}
	};
	module.rightIndicator = function(){ //e.name = mainindicator
		//window scroll
		var contArr = ['#wrapper'];
		$('#container .contents').find('>div[id]').each(function(i){
			if( i !== 0 ) {
				contArr.push("#"+$(this).attr('id'));
			}
		});
		$(window).off('scroll.mainindicator').on('scroll.mainindicator', function(){
			var $wtop = $(window).scrollTop();
			for( o in contArr ){
				var next = $(contArr[o+1]);
				next = next.length > 0? next.offset().top : $(document).height();
				if( typeof contArr[o] === 'string'){
					if(  $(contArr[o]).offset().top < parseInt($(window).height()/2)+$wtop  ){
						$('.mainIndicator >a').removeClass('on');
						$('.mainIndicator >a').eq(o).addClass('on');
					}
				}
			}

		});
		//
		$('.mainIndicator a').off('click.mainindicator').on('click.mainindicator', function(e){
			e.preventDefault();
			var idx = $(this).index();
			$('html,body').stop().animate({ scrollTop : $( contArr[idx] ).offset().top+'px' },200);
		});
	};
	module.toplinkCont = function(){ //e.name = toplinkcont
		var tabli = $('#contTop .linkCont .linkTab>li>a'),
			more = $('#contTop .linkCont .tabCont button.more'),
			close = $('#contTop .linkCont .tabCont button.close');
		tabli.off('click.toplinkcont').on('click.toplinkcont',function(e){
			e.preventDefault();
			//$('#contTop .linkCont .tabCont').removeClass('open');
			if( $(this).parent().siblings().find('.tabCont').hasClass('open') ){
				$(this).parent().find('.tabCont').addClass('open');
			}else{
				$(this).parent().find('.tabCont').removeClass('open');
			}
			$(this).parent().addClass('tabON');
			$(this).parent().siblings().removeClass('tabON');
			$(this).parent().siblings().find('.tabCont').hide();
			$(this).next().show();
		});
		more.off('click.toplinkcont').on('click.toplinkcont',function(e){
			$(this).parent().addClass('open');
		});
		$('#contTop .linkCont .tabCont').off('click.toplinkcontclose').on('click.toplinkcontclose', '.close' ,function(e){
			$(this).parent().removeClass('open');
		});
	};
	module.mainstockInfoSlide = function(){
		var timer;

		function start(){
			timer = setInterval(function(){
				move();
			},4000);
			$('.sliderWrap.stockInfo .slider .list').data('rollmainstock',timer);

		}
		if( $('.sliderWrap.stockInfo .slider .list').data('rollmainstock' ) ){
			stop();
			start();
		}else{
			start();
		}
		function move(){
			var li = $('.sliderWrap.stockInfo .slider .list >li');
			$('.sliderWrap.stockInfo .slider .list').animate({ 'margin-top':-li.height()+'px'}, 300, function(){
				$('.sliderWrap.stockInfo .slider .list >li').first().appendTo( $('.sliderWrap.stockInfo .slider .list') );
				$('.sliderWrap.stockInfo .slider .list').css('margin-top','0px');
			});
		}
		function stop(){
			clearInterval( $('.sliderWrap.stockInfo .slider .list').data('rollmainstock' )  );
		}
	};
	module.topAllmenu = function(){ //e.name = maintopallmenu
		var arrow = $('.contMain.cont04>.inner>button');
		var center = $('.contMain.cont04>.inner .center');
		var listArr = [];
		$('.contMain.cont04>.inner').css({
			'height':'420px',
			'overflow':'hidden'
		});
		$('.contMain.cont04>.inner>.list>li').each(function(i){
			listArr.push($(this));
		});
		arrow.off('click.maintopallmenu').on('click.maintopallmenu', function(e){
			var dir;
			if( $(this).hasClass('prev') ){
				dir = 'top';
			}else{
				dir = 'bottom';
			}
			module.topAllmenuListmove( listArr , dir );
		});
		var maintopallmenuEvent = 'DOMMouseScroll.maintopallmenu mousewheel.maintopallmenu wheel.maintopallmenu';
		$('.contMain.cont04>.inner').off(maintopallmenuEvent).on(maintopallmenuEvent, function(e){
			e.preventDefault();
			var wheelEvent = e.originalEvent;
			var dY = wheelEvent.deltaY ? wheelEvent.deltaY : -(wheelEvent.wheelDelta);
			if( dY > 0 ){
				dir = 'bottom';
			}else{
				dir = 'top';
			}
			module.topAllmenuListmove( listArr , dir );
		}).off('mouseenter.maintopallmenu').on('mouseenter.maintopallmenu',function(e){
			if( $('.mainTopCont .sliderWrap').data('rollmaintoptab' ) ){ //play
				clearInterval( $('.mainTopCont .sliderWrap').data('rollmaintoptab' ));
				$('.mainTopCont .sliderWrap').removeData('rollmaintoptab' );
			}else{

			}
		}).off('mouseleave.maintopallmenu').on('mouseleave.maintopallmenu',function(e){
			if( $('.mainTopCont .sliderWrap').data('rollmaintoptab' ) ){

			}else{
				if( $('.mainTopCont .sliderWrap > button.stop').is(':visible') ){
					module.topvisualplay();
				}
			}
		});
		//
		$('.contMain.cont04>.inner').data('rollmaintopallmenuList',listArr);

		if( $('.contMain.cont04>.inner').data('rollmaintopallmenu' ) ){
			module.topAllmenuStop();
			module.topAllmenuPlay();
		}else{
			module.topAllmenuStop();
		}
		module.topAllmenuPlay();
		var isClick = false;
		$('.contMain.cont04>.inner>.list>li').off('mousedown.maintopallmenu').on('mousedown.maintopallmenu','a',function(e){
			isClick = true;
		}).off('focusin.maintopallmenu').on('focusin.maintopallmenu','a',function(e){
			if( isClick ){
				module.topAllmenuStop();
				module.topAllmenuPlay();
				isClick = false;
			}else{
				module.topAllmenuStop();
			}
		});

	};
	module.topAllmenuPlay = function(){
		var topTabtimer = setInterval(function(){
			if( $('.contMain.cont04').is(':visible') ){
				module.topAllmenuListmove( $('.contMain.cont04>.inner').data('rollmaintopallmenuList') ,'top');
			}
			
		},3000);
		$('.contMain.cont04>.inner').data('rollmaintopallmenu',topTabtimer);
	};
	module.topAllmenuStop = function(){
		clearInterval( $('.contMain.cont04>.inner').data('rollmaintopallmenu') );
		$('.contMain.cont04>.inner').removeData('rollmaintopallmenu' );
	};
	module.topAllmenuListmove = function( elem, dir ){
		if( $('.contMain.cont04>.inner .list a').is(':animated') ) return false;
			$.each(elem,function(k){
				var tp, dirappend, findelem;
				var hp = $(this).height();//elem.height();
				var centerClone;
				var updown;
				if( dir === 'bottom' ){
					dirappend = "prependTo";
					findelem = "last";
					tp = -hp;
					updown = "prev";
				}else if( dir === 'top' ){
					dirappend = "appendTo";
					findelem = "first";
					tp = hp;
					updown = "next";
				}
				if( $(this)[updown]().length < 1 ){
					if( k === 0 ){
						centerClone = elem[ elem.length-1 ].children().clone();
					}else{
						centerClone = elem[0].children().clone();
					}
				}else{
					centerClone = $(this)[updown]().children().clone();
				}
				//
				if( centerClone.length > 1 ){
					centerClone[findelem]()[dirappend]($(this)); //elem
				}else{
					centerClone[dirappend]($(this)); //elem
				}

				centerClone.css('top', tp +'px');
				var melem = $(this).find('>a:'+findelem);//elem.find('>a:'+findelem);
				melem.stop().animate({'top' : tp < 0? hp : -hp +'px'}, 300);
				centerClone.stop().animate({'top' : 0 +'px'}, 300, function(){
					melem.remove();
				});
			});
		
	};
	module.init = function(){
		setTimeout(function(){
			module.topvisual();
			module.rightIndicator();
			module.toplinkCont();
			module.mainstockInfoSlide();
			module.topAllmenu();
			//module.notice();
			//module.initMainNews();
			//
			if( $('.slideWrap.mainEvent').length > 0 ){
				$('.slideWrap.mainEvent').shSlide({autoplay:true});
			}
			
			//
			var midTab = $('#contMid .mainProdList > li>a'),
				midDiv = $('#contMid .mainProdList > li>div.tabCont');
			midTab.off('click.mainmidtab').on('click.mainmidtab', function(e){
				e.preventDefault();
				$(this).parent().addClass('tabON');
				$(this).parent().siblings().removeClass('tabON');
			});
		},1);
	};


}(jQuery));