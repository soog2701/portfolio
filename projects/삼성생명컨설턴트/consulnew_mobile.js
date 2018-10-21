"use strict";

//
(function(win){
	var doc = win.document;
	if( !location.hash && win.addEventListener ){
		win.scrollTo(0,1);
		var scrollTop = 1,
			getScrollTop = function(){
				return win.pageYOffset || doc.compatMode === 'CSS1Compat' && doc.documentElement.scrollTop || doc.body.scrollTop || 0;
			},
			bodycheck = setInterval( function(){
				if( doc.body ){
					clearInterval(bodycheck);
					scrollTop = getScrollTop();
					win.scrollTo(0, scrollTop ===1?0 : 1);
				}
			},15);
		win.addEventListener('load', function(){
			setTimeout( function(){
				if( getScrollTop() > 20 ){
					win.scrollTo(0, scrollTop ===1?0 : 1)
				}
			},0);
		},false);
	}
}(this));
$(window).load(function(){	
	/*
	if( navigator.userAgent.match(/Android/i) ){
		document.body.style.height = (window.outerHeight+50)+'px';
		window.scrollTo(0,1);
	}
	*/
	function imgCoords( elem, width, x1, y1, x2, y2  ){
		var wi = elem.find('img').width();		
		var xp1 = wi/width*x1;
		var yp1 = wi/width*y1;
		var xp2 = wi/width*x2;
		var yp2 = wi/width*y2;
		elem.find('map > area').attr('coords', xp1+','+yp1+','+xp2+','+yp2 );
	}

	if( $('div.newbbs').length > 0 ){		
		imgCoords( $('p.event_center').eq(0), 640 , 40, 204,250,261);
		imgCoords( $('p.event_center').eq(2), 640 , 176, 208,464,286);
		$(window).resize( function(){
			imgCoords( $('p.event_center').eq(0), 640 , 40, 204,250,261);
			imgCoords( $('p.event_center').eq(2), 640 , 176, 208,464,286);
		});
	}
	
	fnGethpDDDList();
	//siwpe
	var consultantswipe = new SwipeList( $('ul.rollCon') );//main
	var consultantswipeBbs = new SwipeList( $('ul.eventList') , { btn : $('.event_btnRoll')} ); // new bbs
	var consultantswipeWhy = new SwipeList( $('div.benefitsCon>ul') ); // new bbs
	
	//header
	Consultanthtml_header();
	//footer
	Consultanthtml_footer();
	//menu
	var consultantmenu = new MenuContrl();
	
	//common
	(function($, window){
		var parent = window.mainApp = {};
		
		parent.sns = function( ){
			$('div.snsArea').find('>a').removeClass('on');
			$('div.snsArea').find('ul').hide();
			$('div.snsArea').on('click', function(e){
				e.preventDefault();
				$(this).find('>a').toggleClass('on');
				$(this).find('ul').slideToggle(300);				
			});			
		}
		var clichek;
		parent.arrow = function(){
			var count = 0;			
			count = $('.btnRoll > a.on').index();			
			$('.swipebox > ul >li').on('touchend', function(e){					
				setTimeout( function(){
					count = $('.btnRoll > a.on').index();					
				},400);
			});
			
			$('a.btnNavi.btn_l').hide();
			$('a.btnNavi').on('click', function(e){
				e.preventDefault();
				e.stopImmediatePropagation();				
				if( $(this).hasClass('btn_l') ){//prev					
					count--;
					count < 0? count = 0 : count;
				}else{
					count++;					
					count > $('.swipebox > ul > li').length-1 ? count = $('.swipebox > ul > li').length-1 : count;
				}				
				count === 0 ? $('a.btnNavi.btn_l').hide() : $('a.btnNavi.btn_l').show();							
				count === $('.swipebox > ul > li').length-1 ? $('a.btnNavi.btn_r').hide() : $('a.btnNavi.btn_r').show();
				$('.swipebox > ul').animate({ left: -100*count+'%' });
				$('.btnRoll > a').removeClass('on');
				$('.btnRoll > a').eq(count).addClass('on');
			});
			
		}
		parent.pop = function(){
			$('.dimmed').css('position','fixed').height( $('.dimmed').height()+100+'px' );
			$('.mailexplain').contents().wrapAll('<div />');
			$('.mailexplain > div').height( $('.mailexplain > div').height()+'px' );
			$('.layerWrap:visible').hide();			
			$('.dimmed:visible').hide();			
			var saveEle;
			//main
			$('.mainLink > ul > li:eq(2)>a').on('click', function(e){
				e.preventDefault();
				$('.layerWrap').show();
				$('.dimmed').show();												
				$('.btnClose > a').focus();
				saveEle = $(this);
			});
			//support - 개발
			
			$('div.btns > a.btnOrange').on('click', function(e){
				e.preventDefault();
				//$('.layerWrap').show();
				//$('.dimmed').show();
				//$('.btnClose > a').focus();
				saveEle = $(this);
			});
			
			$('.btnClose > a').on('click', function(e){
				e.preventDefault();
				if( $('div.layerWrap:visible').find('form').length > 0 ){
					$('div.layerWrap:visible').find('form')[0].reset();
				}
				$('.layerWrap:visible').next().hide();
				$('.layerWrap:visible').hide();				
				//$('.dimmed:visible').hide();
				saveEle.focus();
				saveEle = "";
			});
			$('.btnClose > a').on('focusout', function(e){
				if( $('div.layerWrap:visible').length > 0 ){
					$('div.layerWrap:visible').find('input:first'||'a:first').focus();
				}
			});
			//취소			
			var cancel = $('a').filter(function(i){ if( $(this).text().match(/(취소)/) ){ return $(this)} });
			cancel.on('click', function(e){
				e.preventDefault();
				if( $('div.layerWrap:visible').find('form').length > 0 ){
					$('div.layerWrap:visible').find('form')[0].reset();
				}	
				$('.layerWrap:visible').next().hide();
				$('.layerWrap:visible').hide();				
				//$('.dimmed:visible').hide();
				saveEle.focus();
				saveEle = "";
			}).on('focusout', function(e){
				if( $('div.layerWrap:visible').length > 0 ){
					$('div.layerWrap:visible').find('input:first'||'a:first').focus();
				}
			});
			//job matching
			/*
			$('.mainLink > div.btnArea > a:eq(0)').on('click', function(e){
				e.preventDefault();
				if( confirm('컨설턴트 JOB매칭은 PC버전에서 이용 가능합니다') ){
					window.location.href = "http://www.samsunglife.com/consultant/main.html";
				}else{
					//console.log('no');
				}
			});
			*/
		}
		parent.life = function(){
			var headH = 69;
			$('.btnstory').on('click', function(e){
				e.preventDefault();
				$('body').animate({
					scrollTop : ($('.lifeCon').eq(1).offset().top +2- headH) +'px'
				});
			});
			if( $(window).scrollTop() > ($('.lifeCon').eq(4).offset().top - headH) || $(window).scrollTop() < 200 ){
				$('.btn_down').css('position','absolute');
			}else{
				$('.btn_down').css('position','fixed');
			}
			var count = 0;
			$('.btn_down').on('click', function(e){
				e.preventDefault();				
				if( $(window).scrollTop()+67 >= $('.lifeCon').eq(count).offset().top ){					
					count++;
				}
				if( count > 4 ){
					$('body').animate({					
						scrollTop : ($('.etc_lifeArea').offset().top +2 - headH) +'px'
					});
				}else{
					$('body').animate({					
						scrollTop : ($('.lifeCon').eq(count).offset().top +2 - headH) +'px'
					});
				}
				
			});
			
			$(window).scroll(function(){
				$('.lifeCon').each( function(i){
					if( ($(window).scrollTop()+($(window).height())) >= parseInt(($(this).offset().top )) ){
						count = i;
					}
				});			
				if( $(window).scrollTop() > (($('.lifeCon').eq(4).offset().top+2 - headH )) || $(window).scrollTop() < 200 ){					
					//if( $(window).scrollTop() > (($('.lifeCon').eq(3).offset().top+2 - headH)+ ($(window).height()/2)) ){
						$('.btn_down').css('position','absolute');
					//}
				}else{
					$('.btn_down').show();
					$('.btn_down').css('position','fixed');
				}
				
			});
		}
		parent.support = function(){
			//more view
			$('div.termsBox').css('height','90px');
			$('div.agreeArea > button.slideBtn').find('span').text('펼쳐보기');
			$('div.agreeArea > button.slideBtn').find('span').removeClass('on');
			$('div.agreeArea > button.slideBtn').on('click', function(e){
				e.preventDefault();
				var curH = 90;				
				var box = $(this).parent().prev();				
				if( $(this).find('span').hasClass('on') ){
					box.css('height','auto');
					var autH = box.height();
					$(this).find('span').text('펼쳐보기');
					$(this).find('span').removeClass('on');
					box.height(autH).animate({					
						height: curH
					});					
				}else{
					box.css('height','auto');
					var autH = box.height();				
					$(this).find('span').text('접어두기');
					$(this).find('span').addClass('on');
					box.height(curH).animate({					
						height: autH
					});
				}
			});			
			//faq
			$('ul.faqList > li').not(':first').find('div.faqCont').addClass('hidden');
			$('ul.faqList > li > a').on('click', function(e){
				e.preventDefault();
				$(this).parent().toggleClass('on');
				$(this).next().toggleClass('hidden');
				//$('ul.faqList > li').removeClass('on');
				//$(this).parent().addClass('on');
				//$('ul.faqList > li').find('div.faqCont').addClass('hidden');
				//$(this).next().removeClass('hidden');
			});
			
			//agree
			var inum = 0;
			$('div.totalagree > input').on('click', function(){
				this.checked == true ? $(this).attr('checked',true) : $(this).attr('checked',false);				
				if( inum >= 1 ){
					if( inum == 1 ){
						$(this).attr('checked',false);	
					}					
					if ( inum%2 == 0 ){						
						inum = 0;						
					}
				}
				if( this.checked == true ){										
					$('div.agreeArea > #agree01').attr('checked',true).trigger('click');
					$('div.agreeArea > #agree02').attr('checked',true).trigger('click');					
				}else {					
					$('div.agreeArea > #agree01').trigger('click').attr('checked',false);
					$('div.agreeArea > #agree02').trigger('click').attr('checked',false);
				}				
				inum++;						
			});		
			
			$('div.agreeArea').find('input').on('change', function(){				
				$(this).siblings('input').attr('checked',false);
				$(this).attr('checked',true);
				if( $('div.agreeArea > #noagree01').is(':checked') == true || $('div.agreeArea > #noagree02').is(':checked') == true ){
					$('div.totalagree > input').attr('checked',false);
				}				
			});
			
		}
		parent.bbs = function(){			
			var lilen = $('ul.eventList > li').length,
				count = consultantswipeBbs.option.cur,
				time;
			if( lilen < 2 ){
				rollstop();
			}else{
				rollstart();				
			}					
			function rollstart(){
				time = setInterval( rollmove, 5000 );				
			}
			function rollmove(){						
				count++;
				count > lilen-1 ? count = 0 : count;				
				$('ul.eventList').animate({ left: -100*count+'%' });
				$('.event_btnRoll > a').not('.rollplay').removeClass('on').attr('title','');
				$('.event_btnRoll > a').not('.rollplay').eq(count).addClass('on').attr('title','선택');				
			}
			function rollstop(){
				clearInterval(time);
			}
			
			$('a.rollplay').on('click', function(e){
				e.preventDefault();
				var imgalt = $(this);
				if( imgalt.hasClass('stop') ){
					$(this).text('정지');
					$(this).removeClass('stop');
					rollstart();
				}else{
					$(this).text('재생');
					$(this).addClass('stop');					
					rollstop();
				}
			});			
			$('ul.eventList > li').on('touchend', function(e){
				count = consultantswipeBbs.option.cur;				
			});
			
		}
		parent.keyview = function(){			
			$('div').on('touchstart', function(e){
				var fo = $('input').filter(function(i){ if( $(this).is(':focus') ){ return $(this); } }).length;
				if( fo > 0 ){
					 $('input').blur();					
				}				
			});
		}
		parent.winloc = function(){
			window.location.href.split("#")[0];			
			//life href			
			var len = 0;
			if( location.hash.match(/(#fc)/) ){
				fitcon(len);
			}else if( location.hash.match(/(#gfc)/) ){				
				len = 2;
				fitcon(len);
			}else if( location.hash.match(/(#pfc)/) ){				
				len = 3;
				fitcon(len);
			}else if( location.hash.match(/(#sfp)/) ){				
				len = 1;
				fitcon(len);
			}			
			function fitcon( l ){				
				$('body').animate({ 'scrollTop':1495 });
				$('.swipebox > ul').animate({ left: -100*l+'%' },10);
				$('.btnRoll > a').removeClass('on');
				$('.btnRoll > a').eq(l).addClass('on');
				if( l == 0 ){
					$('a.btnNavi.btn_l').hide();
					$('a.btnNavi.btn_r').show();
				}else{					
					$('a.btnNavi.btn_l').show();
					if( l == $('.swipebox > ul > li').length-1 ){
						$('a.btnNavi.btn_r').hide();						
					}else{
						$('a.btnNavi.btn_r').show();						
					}
				}
			}			
			$(window).on('hashchange', function(){
				if( location.hash.match(/(#fc)/) ){
					fitcon(len);
				}else if( location.hash.match(/(#gfc)/) ){				
					len = 2;
					fitcon(len);
				}else if( location.hash.match(/(#pfc)/) ){				
					len = 3;
					fitcon(len);
				}else if( location.hash.match(/(#sfp)/) ){				
					len = 1;
					fitcon(len);
				}
			});
		}
		parent.init = function(){
			parent.winloc();
			parent.keyview();
			parent.sns();
			parent.arrow();
			parent.pop();
			parent.support();
			if( $('div#container').find('>div.lifeArea').length > 0 ){
				parent.life();	
			}
			if( $('ul.eventList > li').length > 0 ){
				parent.bbs();
			}
			$('.btn_top').hide();			
			var howScl;
			$(window).scroll(function(){
				var wt = $(window).scrollTop();
				howScl = clearTimeout(howScl);
				$('.btn_top').hide();
				if( wt < 50 ){					
					$('.btn_top').hide();					
					howScl = setTimeout( function(){
						if( $('.btn_top').is(':visible') ){
							$('.btn_top').fadeOut(800);
						}						
					}, 500 );					
				}else{					
					$('.btn_top').hide().fadeIn(800);					
				}
			});
			
		}
		
	}(jQuery, window));
	
	mainApp.init();
	
	Kakao.init('3aa33ad62a227be646b3fc0933e1ccf6');
	
});

function SwipeList( elem, op ){
	this.option = $.extend({
		ele : elem,
		left : parseInt( elem.css('left') ),
		left_save : 0,
		left_first : 0,
		x : 0,
		y : 0,
		cx : 0,
		cy : 0,
		rlt : 0,
		btn : elem.parent().find('.btnRoll'),
		cur: 0,
		cli : false
	},op);
	this.init();
}
$.extend(SwipeList.prototype, {
	fingdown: function(e){		
		e.stopPropagation();		
		var parent = this;		
		parent.option.left = parseInt( parent.option.ele.css('left') );
		parent.option.left_first = parseInt( parent.option.ele.css('left') );
		parent.option.left_save = e.originalEvent.touches[0].clientX - parent.option.left;
		parent.option.cx = e.originalEvent.touches[0].clientX;
		parent.option.cy = e.originalEvent.touches[0].clientY;// - $(window).scrollTop();		
		if( !detectmob() ){		
			parent.option.rlt = (new Date()).getTime();				
		}		
	},
	fingmove: function(e){		
		e.stopPropagation();		
		var parent = this,
			touches = e.originalEvent.touches,
			touch_x = touches[0].clientX,
			touch_y = touches[0].clientY,
			len = parent.option.ele.find('>li').length -1;
		
		//if( Math.abs(touch_x - parent.option.x ) > 10 ){
			if( (touch_x - parent.option.left_save) < 0 && (touch_x - parent.option.left_save) > $(window).width()*-len  ){				
				if( (Math.abs(touch_x - parent.option.cx )/Math.abs(touch_y - parent.option.cy ))>3 ){
					e.preventDefault();	
					parent.option.cli = true;
					parent.option.ele.css({
						'left': touch_x - parent.option.left_save + 'px'
					});					
				}else{
					parent.option.cli = false;
				}
				
			}
		//}		
		parent.option.y = touch_y;
		parent.option.x = touch_x; 
		
	},
	fingup: function(e){		
		e.stopPropagation();		
		var parent = this;	
		if( parent.option.cli && (new Date()).getTime()- parent.option.rlt < 1000 ){
			e.preventDefault();
		}
		parent.option.cli = false;
		parent.option.left = parseInt( parent.option.ele.css('left') );
		var moveleft = ( parent.option.left_first - parent.option.left ) + e.originalEvent.changedTouches[0].clientX,
			idx,
			num = ($(window).width()/2) - parseInt($(window).width()/7);
		if( parent.option.cx - e.originalEvent.changedTouches[0].clientX > 0 ){//->
			parent.option.ele.find('>li').each( function(i){				
				if( moveleft > ( $(this).offset().left - num ) ){
					idx = i;
				}
			});	
		}else{//<-		
			parent.option.ele.find('>li').each( function(i){			
				if( moveleft > ( $(this).offset().left + num ) ){
					idx = i;
				}
			});	
		}			
		if( Math.abs(moveleft - parent.option.x ) > 5 ){
			if( idx === undefined ){
				idx = 0;
			}
		}		
		if( parent.option.cx - e.originalEvent.changedTouches[0].clientX !== 0 ){
			parent.option.ele.animate({ left: -100*idx+'%' });
			parent.option.btn.find('a').removeClass('on').add().attr('title','');
			parent.option.btn.find('a').eq(idx).addClass('on').add().attr('title','선택');
			if( idx === 0 ){
				$('a.btnNavi.btn_l').hide();
			}else{
				$('a.btnNavi.btn_l').show();
			}
			if( idx === parent.option.ele.find('>li').length-1 ){
				$('a.btnNavi.btn_r').hide();
			}else{
				$('a.btnNavi.btn_r').show();
			}
		}	
		
		parent.option.cur = idx;
		
	},
	init: function(){		
		var parent = this;		
		parent.option.ele.find('>li').css('position','relative').show();
		parent.option.ele.wrap('<div class="swipebox" />');
		parent.option.ele.parent().css({
			'position':'relative',
			'width': '100%',
			'overflow':'hidden'
		});
		parent.option.ele.css({
			'position':'relative',			
			'left': '0px',			
			'overflow':'visible'
		});	
		parent.option.ele.width( $(window).width()*parent.option.ele.find('>li').length );
		parent.option.ele.find('>li').width( $(window).width() );
		$(window).resize(function(){
			parent.option.ele.width( $(window).width()*parent.option.ele.find('>li').length );
			parent.option.ele.find('>li').width( $(window).width() );
		});		
		function fingdown(e){ parent.fingdown(e); }
		function fingmove(e){ parent.fingmove(e); }
		function fingup(e){	parent.fingup(e); }
		
		parent.option.ele.on({
			'touchstart': fingdown,
			'touchmove': fingmove,
			'touchend': fingup
		});	
		parent.option.btn.find('a').on('click', function(e){
			e.preventDefault();
			if( $(this).hasClass('rollplay') ){
				return false;
			}else{
				var idx = $(this).index();
				if( idx === 0 ){
					$('a.btnNavi.btn_l').hide();
				}else{
					$('a.btnNavi.btn_l').show();
				}
				if( idx === parent.option.ele.find('>li').length-1 ){
					$('a.btnNavi.btn_r').hide();
				}else{
					$('a.btnNavi.btn_r').show();
				}
				parent.option.ele.animate({ left: -100*idx+'%' });
				parent.option.btn.find('a').removeClass('on').add().attr('title','');
				parent.option.btn.find('a').eq(idx).addClass('on').add().attr('title','선택');
			}			
		});
	}
});
function MenuContrl( op ){
	this.option = $.extend({		
	},op);
	this.init();
}
$.extend(MenuContrl.prototype, {
	load: function(data){
		var parent = this;
		var html = $.parseHTML(data);
		var cont = $(html).filter('div.totalWrap');
		var result = $('body').append(cont);		
		var consultMenu;
		var contHeight = cont.find('.total > div > h2').height() + cont.find('.total > div > ul').height() +50 ;
		var hheight = 67;
		
		cont.find('.total').css({ 'position':'fixed', 'top': hheight +'px' });
		cont.find('.total > div.totalCon').wrap('<div class="totaldiv" id="totaldiv" />');
		cont.find('.total > .totaldiv').height( (($(window).height())) - hheight );
		cont.find('.total > .totaldiv').wrap('<div class="totaldivin" />');
		cont.find('.total > .totaldivin ').css({ 'background-color':'#ffffff' }).height( (($(window).height())) - hheight +60);
		
		function set(){			
			cont.find('.total > div.totaldivin > div > div').css('height', 'auto' );
			cont.find('.total > .totaldivin > .totaldiv').height( (($(window).height())) - hheight );			
		}
		set();
		$('#head').find('a').css({ 'color':'transparent' });
		$('.mainrollArea > a').css({ 'color':'transparent' });
		$('.benefitsCon > a').css({ 'color':'transparent' });
		$('.btn_top > a').css({ 'color':'transparent' });
		$('#mailPop').find('th').eq(0).text('이름');
		$('#mailPop').find('th').eq(1).text('이메일');
		cont.hide();		
		$(window).resize(function(){			
			set();			
			if( consultMenu ){
				consultMenu.refresh();
			}			
		});		
		cont.find('.dimmed').on('touchstart', function(e){
			$('a.totalMenu').trigger('click');
		});
		
		$('a.totalMenu').on('click', function(e){
			e.preventDefault();			
			$(this).toggleClass('on');
			$(this).text('전체메뉴 보기');			
			
			if( cont.is(':hidden') ){				
				cont.show();
				set();					
				cont.find('.total').css('margin-left', cont.find('.total').outerWidth(true)+'px').stop().animate({ 'margin-left': 0+'px' },500);
				cont.find('.dimmed').css('opacity',0).animate({ 'opacity': 0.2 },700, function(){
					cont.find('.dimmed').css({ width:'130px', zIndex: 101 });
				});				
				consultMenu = new IScroll('#totaldiv', { click: true , bounce: false });
				
				$(this).text('전체메뉴 닫기');				
				cont.find('.dimmed').on('touchmove', function(e){e.preventDefault();});
				$('div#head').on('touchmove', function(e){e.preventDefault();});				
			}else{				
				cont.find('.total').stop().animate({ 'margin-left': cont.find('.total').outerWidth(true)+'px' },400);
				cont.find('.dimmed').css({ width:'100%', zIndex: 99 }).animate({ 'opacity': 0 },500, function(){					
					cont.hide();
				});			
				cont.hide();
				if( consultMenu ){
					consultMenu.destroy();					
					$('div#head').off('touchmove');
					cont.find('.dimmed').off('touchmove');
				}
			}
			
		});
		
	},
	init: function(){
		var parent = this;
		$('a.totalMenu').removeClass('on');
		$.get( '/mobile/consultant/sitemap/totalmenu.html' ).done( parent.load );		
	}
});

/*** SNS 공유하기 ***/

/*
 var snsUrl;
 var snsTxt;
 var snsCont;
*/
function shareFB() {
	var snsUrl;
	if (window.snsUrl !== undefined  && window.snsUrl != "") {
		snsUrl = window.snsUrl;
		snsUrl = encodeURIComponent(snsUrl);		
	} else {
		snsUrl = encodeURIComponent(document.location.href);
	}
	window.open("http://m.facebook.com/sharer.php?u="+snsUrl);
}

function shareTwitter() {
	var snsUrl;
	var snsTxt;
	if (window.snsUrl !== undefined  && window.snsUrl != "") {
		snsUrl = window.snsUrl;
		snsUrl = encodeURIComponent(snsUrl);		
	} else {
		var snsUrl = encodeURIComponent(document.location.href);
	}
	if (window.snsTxt != undefined  && window.snsTxt != "") {
		snsTxt = window.snsTxt;
		snsTxt = encodeURIComponent(snsTxt);
	} else {
		snsTxt = "삼성생명 컨설턴트";
	}
	window.open("http://twitter.com/share?url="+snsUrl+"&text="+snsTxt);
}

var tag = document.createElement('script');
	tag.src = "/mobile/consultant/js/kakao.min.js";	
var tag2 = document.createElement('script');
	tag2.src = "/mobile/consultant/js/kakao.link.js";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag,firstScriptTag);
firstScriptTag.parentNode.insertBefore(tag2,firstScriptTag);

function shareKakaoTalk() {
	var snsUrl;
	var snsTxt;
	var snsCont;
	if ( window.snsUrl === undefined  || window.snsUrl != "") {		
		snsUrl = document.location.href;
	}else{
		snsUrl = window.snsUrl;
	}
	if (window.snsTxt === undefined  || window.snsTxt == "") {
		snsTxt = "삼성생명 컨설턴트";
	}else{
		snsTxt = window.snsTxt;
	}
	if ( window.snsCont === undefined  || window.snsCont == "") {
		snsCont = "";
	}else{
		snsCont = window.snsCont;
	}
	Kakao.Link.sendTalkLink({
		label : snsCont,
		webButton : {
			text : snsTxt,
			
			url : snsUrl
		}
	});	
}  

function shareKakaoStory() {
	var snsUrl;
	var snsTxt;
	var snsCont;
	if (  window.snsUrl == undefined  ||  window.snsUrl != "") {
		snsUrl = document.location.href;
	}else{
		snsUrl = window.snsUrl;
	}
	if ( window.snsTxt == undefined  ||  window.snsTxt == "") {
		snsTxt = "삼성생명 컨설턴트";
	}else{
		snsTxt = window.snsTxt;
	}
	if ( window.snsCont == undefined  ||  window.snsCont == "") {
		snsCont = "";
	}else{
		snsCont = window.snsCont;
	}
	if ( window.snsImg == undefined  || window.snsImg == "") {
		kakao.link("story").send({
			post : snsUrl, 
			appid : location.host,
			appver : "1.0",
			appname : "삼성생명컨설턴트", 
			urlinfo : JSON.stringify({
				title : snsTxt,
				desc : snsCont,
				type : "article"
			})
		});	
	} else {
		kakao.link("story").send({
			post : snsUrl, 
			appid : location.host,
			appver : "1.0",
			appname : "삼성생명컨설턴트", 
			urlinfo : JSON.stringify({
				title : snsTxt,
				desc : snsCont,
				imageurl : [window.snsImg],
				type : "article"
			})
		});
	}
	
}