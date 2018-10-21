/**
 * @author sugyung
 */
"use strict";
// 페이스북 공유
function sharer_facebook(url){
	window.open("http://www.facebook.com/sharer.php?u="+ encodeURIComponent(url),"_blank");
}
// 트위터 공유
function sharer_twitter(url){
	window.open("https://twitter.com/intent/tweet?text=&url="+ encodeURIComponent(url),"_blank");
}
// 카카오스토리 공유

function sharer_kakaostory(url) {
	Kakao.Story.share({
		url: url,
		text: ''
	});
}
function sharer_kakaostory_text(url,txt) {
	Kakao.Story.share({
		url: url,
		text: txt
	});
}
// 카카오톡 메세지
function sharer_kakaotalk(url,title,txt,img) {
	Kakao.Link.sendTalkLink({
		label: title,
		image: {
			src: img,
			width: '300',
		height: '200'
	},
	webButton: {
		text: txt,
		url: url // 앱 설정의 웹 플랫폼에 등록한 도메인의 URL이어야 합니다.
		}
	});
}


//Event page bug fix 160609 JH
var view_event_list = function() {
	
	if(location.pathname=="/event.do" && location.search.indexOf("s_sts=R")>-1){
		
		var bbs2 = $('table.bbs_list tbody tr').find('>td.tit');		// bbs_list 공통
		
		bbs2.find('a').andSelf().click(function(event){
		    if(event.preventDefault){
		        event.preventDefault();
		    } else {
		        event.returnValue = false;
		    }
		    
		    $('table.bbs_list tbody tr').removeClass('on');
			$('table.bbs_list tbody tr').filter(':odd').removeClass('on');
			$(this).closest('tr').next().addClass('on');
		});

	}
};

$(document).ready(function() {	
	
	Kakao.init('534f8430330abf808ebf8f8269ddae69');
	
	$("#test_s").click(function(){
		sharer_kakaotalk('http://www.henkelhomecare.co.kr/brandMain.do','헨켈 테스트','http://www.henkelhomecare.co.kr/resources/inc/home/images/common/h1_henkel.png');
	});

	//////////////
	//	GNB		//
	//////////////
	var HKgnb = (function(self, $){	
		//20150206 reseed : main 상단고정 gnb -> header 수정
		var div = $('div#header'),
			dp1 = $('div#gnb > ul.menubar > li'),
			dep1 = $('div#gnb > div.menubox > div.menu > ul > li');
		
		self.gnbview =function(num){
			return dep1.each(function(i){
					if( num === i ){
						$(this).addClass('on');
					}else{
						$(this).removeClass('on');
					}
				});
		};
		self.tabbar = function(){
			//if( $('div.mainBlock1').length > 0 ){
			/*
				$(window).(function(){
					var po = $(this).scrollTop();
					
					if( po > 0 ){
						div.css({
							position:'fixed',
							top:'0px'
						});
					}else{
						div.css('position','');
					}
				});
				*/
			//}			
		};
		self.goodsview = function(){
			var li  = $('div.menu > div.banner_spot > ul > li'),
				dot = $('div.menu > div.banner_spot > div > a');				
			li.css('position','absolute');
			li.slice(1).hide();
			dot.on('click', function( e ){
				e.preventDefault();
				
				var idx = $(this).index();		
				dot.removeClass('on');
				$(this).addClass('on');
				
				li.each(function(i){
					if ( i === idx ){
						$(this).fadeIn( 300 );
					}else{
						$(this).fadeOut( 300 );
					}
				});
			});
			
		};
		self.init = function(){
			$('div.menubox').removeClass('open');
			self.tabbar();
			self.goodsview();
			
			var $idx = 0,
				allmenus = false;
			
			dp1.filter(function(index){return index < 5;}).on('mouseenter', '>a', function(e){				
				e.preventDefault();
				var idx = $(this).parent().index();				
				$('div.menubox').addClass('open');
				$idx = idx;
				self.gnbview(idx);
			}).on('mouseleave', '>a', function(){
				self.gnbview($idx);
			});
			
			$('div#gnb').on('mouseleave', function(){
				allmenus === true? $('div.menubox').addClass('open'):$('div.menubox').removeClass('open');
			});
			dp1.filter(function(index){return index > 4;}).on('mouseenter', function(){
				allmenus === true? $('div.menubox').addClass('open'):$('div.menubox').removeClass('open');
			});
			dp1.filter(':last').on('click', '>a', function(e){
				e.preventDefault();
				self.gnbview(0);
				allmenus === true? allmenus = false: allmenus = true;
				$('div.menubox').toggleClass('open');
				dp1.eq(6).find('>a').text() === '전체메뉴열기'? dp1.eq(6).find('>a').text('전체메뉴닫기'): dp1.eq(6).find('>a').text('전체메뉴열기');				
			});
			
			dep1.on('click', '>a', function(e){				
				//e.preventDefault();				
				var idx = $(this).parent().index();
				self.gnbview(idx);
			});
			dp1.filter(function(index){return index > 4;}).on('mouseenter', function(){
				allmenus === true? $('div.menubox').addClass('open'):$('div.menubox').removeClass('open');
			});			
		};
		
		return self;
	}(HKgnb||{},jQuery));
	
	HKgnb.init();
	
	//////////////
	//	main	//
	//////////////
	var HKmain = (function( self, $){
		self.news = function(){
			var li = $('div.newsBlock > div.news_area > ul > li'), 
				timer, count=1,
				span = $('div.news_area > div.ctrl > span.num'),
				arrow = $('div.newsBlock > div.news_area > div.ctrl > a'),
				litwid = li.eq(0).outerHeight(true);
				
			span.empty().append('<b>'+1+'</b>'+'/'+li.length);
			
			if($('div.newsBlock').length > 0 ){
				setTime();					
				
			}			
			function setTime(){
				clearInterval(timer);
				timer = setInterval( rollmoving, 5000 );			
			};
			function timeover( e ){
				clearInterval(timer);
			};
			function timeout( e ){
				setTime();
			};		
			function rollmoving(){
				arrow.eq(1).trigger('click');
			};
						
			li.on({
				'mouseenter':timeover,
				'mouseleave':timeout
			});
			
			li.eq(-1).prependTo(li.parent());
			li = $('div.newsBlock > div.news_area > ul > li');
			li.eq(0).css('margin-top',-litwid+'px');
						
			arrow.on('click', function(e){
				e.preventDefault();
				
				if( $(this).hasClass('prev') ){	
					count--;
					count<1 ? count=li.length: count;
					span.find('>b').text(count);
										
					if( li.css('margin-top') === '0px' ){
						li.eq(-1).prependTo(li.parent());
						li = $('div.newsBlock > div.news_area > ul > li');
						li.eq(0).css('margin-top', -litwid+'px').end().not(':eq(0)').css('margin-top','');
					}
					
					tansition(-1, 'prependTo', 0);		
					
				}else{
					count++;
					count>li.length ? count=1: count;					
					span.find('>b').text(count);
					
					if( li.length < 3 ){
						if( li.css('margin-top') !== '0px' ){
							li.eq(0).appendTo(li.parent());
							li = $('div.newsBlock > div.news_area > ul > li');
							li.eq(0).css('margin-top', 0+'px').end().not(':eq(0)').css('margin-top','');					
						}
						li.eq(0).stop().animate({ marginTop: -litwid+'px' }, function(){
							li.eq(0).appendTo(li.parent());
							li = $('div.newsBlock > div.news_area > ul > li');
							li.eq(0).css('margin-top',0+'px').end().not(':eq(0)').css('margin-top','');
						});	
					}else{
						tansition(0, 'appendTo', 2);
					}
				}
				
			}).on({
				'mouseenter':timeover,
				'mouseleave':timeout
			});
			
			function tansition(m, dir, n){				
				li = $('div.newsBlock > div.news_area > ul > li');
				li.eq(0).stop().animate({ marginTop: -litwid*n+'px' }, function(){
					li.eq(m)[dir](li.parent());
					li = $('div.newsBlock > div.news_area > ul > li');
					li.eq(0).css('margin-top',-litwid+'px').end().not(':eq(0)').css('margin-top','');
				});
			};			
		};
		self.tab = function(){
			var list = $('div.mainBlock3 > ul.main_goods > li'),
				view = $('div.mainBlock3 > div.goods_area');	//화면 붙이기
				
			list.on('click', '>a', function( e ){
				e.preventDefault();
				var idx = $(this).parent().index();
				
				list.each( function(i){
					if( idx === i ){
						$(this).addClass('on');
					}else{
						$(this).removeClass('on');
					}
					
				});
			});
		};
		
		self.slide = function(){
			var li = $('div.mainBlock2 > div.main_event > div.banner > div.event'),
				arrow = $('div.mainBlock2 > div.main_event > div.control > div.in > a.arrow'),
				wd = $(window).width();
				
			if ( li.length === 1 ){
				arrow.hide();
			}else{				
				li.css('float','left');
				li.eq(-1).prependTo(li.parent());
				li.width( wd );			
				li.parent().width( parseInt(li.width()*li.length) );
				li = $('div.mainBlock2 > div.main_event > div.banner > div.event');
				li.parent().css('margin-left', -wd+'px');			
			}
			
			$(window).resize(function(){				
				if( li.length > 1 ){
					wd = $(window).width();
					li.width( wd );
					li.parent().width( parseInt(li.width()*li.length) );
					li.parent().css('margin-left', -wd+'px');
				}
			});
			
			
			arrow.on('click', function( e ){
				e.preventDefault();
				if( $(this).hasClass('prev') ){	
					if( li.parent().css('margin-left') === '0px' ){
							li.eq(-1).prependTo(li.parent());
							li = $('div.mainBlock2 > div.main_event > div.banner > div.event');
							li.parent().css('margin-left', -wd+'px');
					}	
					tansition(-1,'prependTo',0);
					
				}else{
					if( li.length < 3 ){
						if( li.parent().css('margin-left') !== '0px' ){
							li.eq(0).appendTo(li.parent());
							li = $('div.mainBlock2 > div.main_event > div.banner > div.event');
							li.parent().css('margin-left', 0+'px');							
						}
						li.parent().stop().animate({ marginLeft: -(li.width())+'px' }, function(){
							li.eq(0).appendTo(li.parent());
							li = $('div.mainBlock2 > div.main_event > div.banner > div.event');
							li.parent().css('margin-left',0+'px');
						});						
					}else{						
						tansition(0,'appendTo',2);
					}					
				}
			});
			function tansition(m, dir, n){				
				li = $('div.mainBlock2 > div.main_event > div.banner > div.event');								
				li.parent().stop().animate({ marginLeft: -(li.width())*n+'px' }, function(){
					li.eq(m)[dir](li.parent());
					li = $('div.mainBlock2 > div.main_event > div.banner > div.event');
					li.parent().css('margin-left',-wd+'px');
				});
			};
			
		};
		self.mainvisual = function(){
			//easing 추가  ------
			var tag = document.createElement('script');
         	tag.src = "../js/jquery.easing.1.3.js";  
        	var firstScriptTag = document.getElementsByTagName('script')[0]; 
        	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag); 
        	
			$('div.main_spot').width('100%');		
			$('div.main_spot > ul > li').width('100%');	
			
			$('div.main_spot > ul > li').css({ position:'absolute' }).slice(1).css('left', $('div.main_spot').width()+'px');
			
			var btn = $('div.main_spot > div.banner_page > a').css('z-index','10');
			
			btn.on('click',function(e){				
				if( $('div.main_spot > ul > li:animated').length > 0 ){
					return false;
				}else{
					e.preventDefault();
					var idx = $(this).index();
					
					btn.each(function(i){
						if( i === idx ){
							$(this).addClass('on');
							$('div.main_spot > ul > li').eq(idx).stop().css('z-index','2').animate({ left:'0px' },{duration:1000, easing: 'easeOutQuint', complete:comp });
						}else{
							$(this).removeClass('on');						
						}
						function comp(){
							$('div.main_spot > ul > li').filter(function(n){ return n !== idx; } ).css({'left': $('div.main_spot').width()+'px',zIndex:0 }); // 
							$('div.main_spot > ul > li').eq(idx).css('z-index','1');						
						}					
					});	
				}
				
			});
			
		};
				
		self.init = function(){
			self.news();
			self.tab();
			self.slide();
			//self.mainvisual();
			
			//var maindvideo = $('div.mainBlock4 > div.in_wrap >div.ad > div > a');				
			/*maindvideo.on('click', function(e){
				e.preventDefault();				
				var id = $(this).parent().data('id');
				$(this).parent().empty();				
				swfobject.embedSWF('https://www.youtube.com/v/' + id + '&rel=0&border=0&fs=1&autoplay=1', 'mvideo' , '302', '256', '9.0.0', false, false, {
					allowfullscreen : 'true'
				});				
			});
			*/
			var maindvideo = $('div.mainBlock4 > div.in_wrap >div.ad > div');
			var id = maindvideo.data('id');			
			if( id ){
				maindvideo.empty();
				$('div.mainBlock4 > div.in_wrap > div.ad ').append('<div id="mvideo" style="position:absolute;top:0; width:302px; height:256px;z-index:-1;" />');	
				swfobject.embedSWF('https://www.youtube.com/v/' + id + '&rel=0&border=0&fs=1&autoplay=0', 'mvideo' , '302', '256', '9.0.0', false, false, {
					allowfullscreen : 'true',
					wmode:"opaque"
				});
			}
						
		};		
		
		return self;
	}( HKmain||{}, jQuery ));
	
	HKmain.init();
	
	//////////
	//	ad	//
	//////////	
	var HKadView = ( function(self, $) {
			$('div.video_area').find('>ul').slice(2).hide();
			
			self.click = function() {
				var vi = $('div.video_area > ul');
				vi.find('li').removeClass('on');
				
				$('div.viewer').find('div.youtube').each(function(i){
					$(this).attr('id','youtube'+i);
				});

				vi.find('li').on('click', '>a', function(e) {
					e.preventDefault();
					vi.find('li').removeClass('on');
					$(this).parent().addClass('on');
					
					var	idx = $(this).parent().index(), 
						name = $('div.viewer:visible').find('div.youtube').attr('id'),
						vdid = $(this).parent().data('id');
						
					$('div.viewer:hidden').find('div.youtube').empty();					
					self.addad(	vdid , name, false );

				});	
			};

			self.addad = function( id, name, autoplay ) {
				swfobject.embedSWF('https://www.youtube.com/v/' + id + '&rel=0&border=0&fs=1&autoplay=' + ( autoplay ? 1 : 0), name , '647', '393', '9.0.0', false, false, {
					allowfullscreen : 'true'					
				});

			};

			return self;

		}(HKadView || {}, jQuery));

	HKadView.click();
	
	//////////////////
	//	shopping	//
	//////////////////
	var HKshopping = (function( self, $ ){		
		self.product = function(){
			//count
			var arrow = $('div.shop_best > div.ctrl'),
				li = $('div.shop_best > ul > li'),
				span = $('div.shop_best > div.ctrl > span.num'),
				count = 1;
			span.empty().append('<b>'+count+'</b>'+'/'+(Math.ceil(li.length/3)));
			
			arrow.on('click', '>a', function( e ){
				if( $(this).hasClass('prev') ){
					count < 2 ? count : count--;					
				}else{
					count > (Math.ceil(li.length/3))-1 ? count : count++;
				}				
				span.find('>b').text(count);
				
				e.preventDefault();
			});
		};
		self.init = function(){			
			
			self.product();	
			var tabblack = $('ul.tab_type2 > li');
			
			tabblack.on('click', '>a', function(e){
				e.preventDefault();
				tabblack.removeClass('on');
				$(this).parent().addClass('on');
			});
			
			$('div.edit').on('click','>a', function(e){
				e.preventDefault();
			});
		};		
		return self;
	}( HKshopping||{}, jQuery ));
	
	HKshopping.init();
	
	//////////////
	//	brand	//
	//////////////
	var HKbrand = (function( self, $ ){		
		self.list = function(){
			var li = $('div.brand_list > ul > li');
			
			li.on('click','>a', function( e ){
				e.preventDefault();
				var idx = $(this).parent().index();
				li.removeClass('on');
				li.eq(idx).addClass('on');
			});			
		};
		self.main = function(){
			var btn = $('div.brand_main > ul > li'),
				view = $('div.brand_main > div');
			
			$('div.brand_main').css('background-color','gray');
			
			btn.on('mouseenter', function(){
				var idx = $(this).index();
				viewIMG( idx );
			});
			
			function viewIMG( num ){
				return view.each(function(i){
					if( i === num ){
						$(this).fadeIn();
					}else{
						$(this).fadeOut();
					}
				});
			}
		};
		self.init = function(){
			self.main();			
			self.list();			
			if( $('div.brand_adinfo').length > 0 ){
				$('div.brand_video').append('<div id="brand_video" />');
				var id = $('div.brand_adinfo > strong').data('id'),
					name = $('div.brand_video> div').attr('id');
					
				adinfo( id, name, false );
			};			
			function adinfo( id, name, autoplay ) {
				swfobject.embedSWF('https://www.youtube.com/v/' + id + '&rel=0&border=0&fs=1&autoplay=' + ( autoplay ? 1 : 0), name , '604', '348', '9.0.0', false, false, {
					allowfullscreen : 'true',
					wmode:"opaque"	
				});					
			};					
		};
		
		return self;
	}( HKbrand||{}, jQuery ));
	HKbrand.init();
	
	//////////////
	//	news	//
	//	event	//
	//////////////
	var viewlist = function() {
		var bbs = $('table.bbs_list tbody tr').filter(':even').find('>td.tit');		// bbs_list 공통
			
		//$('table.bbs_list tbody tr').filter(':odd').removeClass('on');
		bbs.find('a').andSelf().on('click', function(e) {
			e.preventDefault();
			$('table.bbs_list tbody tr').filter(':odd').removeClass('on');
			$(this).closest('tr').next().addClass('on');
		});
	};

	viewlist();
	view_event_list();

	
	//////////////////
	//	company		//
	//////////////////
	var HKcompany = function(){
		var tab = $('div.company_strategy > ul > li > a'),
			view = $('div.company_content > div.strategy_box');
		$('div.company_content > div.strategy_box').slice(1).hide();
			
		tab.on('click', function(e){
			e.preventDefault();
			var idx = $(this).parent().index();			
			tabview(idx);			
			tab.parent().removeClass('on');
			$(this).parent().addClass('on');
		});
		
		function tabview(num){
			return view.each(function(i){
				if( i === num ){
					$(this).show();
				}else{
					$(this).hide();
				}
			});
		};
	};
	HKcompany();
	
	//layer
	HKlayerpopup();
	
	//////////////
	//	more	//
	//////////////
	var moreView = function(){
		//brand
		/*
		if( $('div.goods_box > strong.brand') !== undefined ){
			$('div.goods_box > ul.goods_list >li').slice(4).hide();
		}		
		var more = $('div.goods_box > a.more');
		
		if( $('div.goods_box > ul.goods_list >li').filter(':hidden').length === 0 ){
			more.hide();
		}
		more.on('click', function(e){
			e.preventDefault();
			var list = $('div.goods_box > ul.goods_list >li');				
			list.filter(':hidden').not(':gt(3)').show();
			
			if( list.filter(':hidden').length === 0 ){
				$(this).hide();
			}
		});	
		*/
		//ad	
		var morevideo = $('div.video_area').next();
		if( $('div.video_area').find('>ul').filter(':hidden').length === 0 ){
			morevideo.hide();
		}
		morevideo.on('click', function(e) {
			e.preventDefault();
			$('div.video_area').find('>ul:hidden').eq(0).show();				
			if( $('div.video_area').find('>ul').filter(':hidden').length === 0 ){
				$(this).hide();
			}			
		});
		//sns
		$('div.social_bloger').find('>a').hide();
	};
	moreView();
	
	//////////////
	//	footer	//
	//////////////
	
	var sitemap = function(){
		var site = $('div.in_wrap > div.info > dl.policy > dd:last'),
			left = parseInt( (screen.width/2)-(944/2)),
	  		top_site = parseInt( (screen.height/2)-(365/2)),
	  		top_map = parseInt( (screen.height/2)-(666/2)),
	  		map = $('div.in_wrap > div.info > dl.policy > dd:eq(3)');
	  	
		site.on('click', function(e){
			e.preventDefault();
			window.open('/resources/html/sitemap.html','help','width=944,height=365,top='+top_site+',left='+left+',toolbar=0,resizable=0,scrollbars=no');			
		});
		/**map.on('click', function(e){
			e.preventDefault();
			window.open('/resources/html/location.html','help','width=944,height=666,top='+top_map+',left='+left+',toolbar=0,resizable=0,scrollbars=no');			
		});*/		
		//고객센터
		$('div#gnb > ul.menubar > li.help').on('click',function(e){
			e.preventDefault();	
			window.open('/customerPop.do','help','width=500,height=618,top='+top_map+',left='+left+',toolbar=0,resizable=0,scrollbars=no');
		});		
	};
	sitemap();
	
});
//widowLoad
$(window).load(function(){
	//////////////
	//	main	//
	//////////////

	if( $('div.main_spot').length > 0 ){
		var mibanner = new Hkfadeinslider( $('div.main_spot'), 6 );
		var playerBtn = $('<a href="javascript:void(0);" class="player-btn"></a>');
		var isPaused = false;
		var cycleBanner = null;
		var btns = $('div.main_spot .banner_page');
		btns.append(playerBtn);
        mibanner.move(800);

		//롤링배너 하단 버튼 클릭 시
        playerBtn.bind('click', function(e) {
			if (!isPaused) {
                $(this).addClass('paused');
                btns.trigger('pause');
			}else {
                $(this).removeClass('paused');
                btns.trigger('restart');
			}
			isPaused = !isPaused;
			return false;
		});

		$('div.main_spot').bind('mouseover', function() {
			btns.trigger('pause');
		});
		$('div.main_spot').bind('mouseleave', function() {
			if(!isPaused)
				btns.trigger('restart');
		});
	}
	
	
	//////////////////
	//	shopping	//
	//////////////////
	//banner	09-23
	var shopTopbanner = function(){		
		var li = $('div.shop_spot > ul > li'),
			arrow = $('div.shop_spot > div.banner_page > span > a'),
			liwd = li.width(),
			dot = $('div.shop_spot > div.banner_page > a'),
			count = 0,
			shTime;
			
			if ( li.length === 1 ){
				arrow.hide();
				dot.hide();
			}else{				
				li.css('position','absolute');							
				li.parent().width( parseInt(li.width()*li.length) );
				li = $('div.shop_spot > ul > li');				
				li.slice(1).hide();	
				dot.eq(0).addClass('on');
				setTime();
			}
			function setTime(){
				clearInterval(shTime);
				shTime = setInterval( rollmoving, 5000 );			
			};
			function timeover( e ){
				clearInterval(shTime);
			};
			function timeout( e ){
				setTime();
			};		
			function rollmoving(){				
				arrow.filter(function(i){return $(this).parent().hasClass('next');}).trigger('click');
			};			
			arrow.on('click', function( e ){
				e.preventDefault();
				if( $(this).parent().hasClass('prev') ){	
					count--;
					count < 0 ? count = li.length-1 : count;
					dot.eq(count).trigger('click');
				}else{
					count++;
					count > li.length-1 ? count = 0 : count;	
					dot.eq(count).trigger('click');
				}				
			});
			dot.on('click', function(e){
				e.preventDefault();				
				var idx = dot.filter('a').index(this),
					prv = $('div.shop_spot > ul > li').filter(':visible').index();				
				count = idx;
				if( $('div.shop_spot > ul > li').filter(':visible').length > 1){
					return false;
				}else{										
					tansition( idx , prv );
				}							
			});
			$('div.banner_page').find('a').on('mouseenter', function(e){
				timeover();
			}).on('mouseleave', function(){
				timeout();
			});
			
			function tansition(m, p){
				if( m === p ){
					return false;
				}else{
					dot.removeClass('on');
					dot.eq(m).addClass('on');
					li.eq(m).stop().fadeIn();
					li.eq(p).stop().fadeOut();
				}
			};		
	};
	if( $('div.shop_spot').length > 0 ){
		//var spbanner = new Hkfadeinslider( $('div.shop_spot'), 5 );	
		//spbanner.move();
		shopTopbanner();
	}	
	
	//Henkel Best Product
	if( $('div.shop_best').length > 0){
		var spproduct = new Hkarrowslider( $('div.shop_best'), $('div.shop_best > div.ctrl') );
		spproduct.slide( 3, -1, 1 );	
		
	}	
	//coupon
	var coupon = function(){
		var div = $('div.shop_coupon'),
			li = div.find('>ul>li'),
			span = div.find('span.num');
		
		li.parent().css({width:'10000px'});
		li.css({'float':'left'}).slice(1).hide();		
		var idx = li.filter(':visible').eq(0).index();			
		//span.empty().append('<b>'+(idx+1)+'</b>'+'/'+li.length);		
		function setTime(){
			clearInterval(timer);
			timer = setInterval( rollmoving, 5000 );			
		};
		function timeover( e ){
			clearInterval(timer);
		};
		function timeout( e ){
			setTime();
		};		
		function rollmoving(){				
			count>li.length ? count=1: count;			
			//span.find('>b').text(count);
			li.eq(0).next().show();			
			li.parent().stop().animate({ 'margin-left':-li.width() }, function(){
				li.eq(-1).after(li.eq(0));
				li = div.find('>ul>li');
				li.slice(1).hide();
				$(this).css('margin-Left','0px');
			});
			count++;
		};		
		if( li.length !== 1 ){
			var timer, count = 2;
			setTime();
		}		
	};
	coupon();
	
	//////////////
	//	brand	//
	//////////////
	//brand Tab
	var tabarr =[];		
	var HKbrandtab = function(){
		var tab = $('div.brand_tab').css({position:'absolute',zIndex:20}),
			taboffset, ht = $(window).scrollTop(), n=2.5;
		
		tab.find('ul>li').on('click', '>a',function( e ){
			e.preventDefault();
			var idx = $(this).parent().index();
							
			taboffset = $('div.brand_con').eq(idx).offset().top;				
			$('html,body').animate({ scrollTop: taboffset });
			
		});
		
		function tabofftop(){
			$('div.brand_con').each(function(i){
				var to = $(this).offset().top;
				tabarr.push(to);
			});
		};
		tabofftop();
		$('div.goods_box > a.more').on('click', function(){
			tabarr =[];
			tabofftop();			
		});
		
		$(window).scroll(function(){
			ht = $(this).scrollTop();
			var winHeight = $(window).height(),
				idx = 0;
			
			if( ht > 550 ){
				tab.css({position:'fixed',top:'0px'});
				tab.addClass('scrolling');
			}else if( ht < 550 ){
				tab.css({position:'absolute', top:''});
			}
			
			for (var i=0, pLen = tabarr.length; i<pLen; i++) {
				if (parseInt(ht + (winHeight / n)) >= tabarr[i]){ 
					idx = i;						
				}
			}
			
			tab.find('ul>li').removeClass('on');
			tab.find('ul>li').eq(idx).addClass('on');
			
		});			
		
	};
	HKbrandtab();
	
	//////////////
	//	event	//
	//	brand	//
	//	banner	//
	//////////////
	
	
	if( $('div.event_spot').length > 0){
		var evbanner = new Hkfadeinslider( $('div.event_spot'), 5 );	//div.event_spot 공통
		evbanner.move();
		
	}
	
	if( $('div.brand_list').length > 0 ){
		var brproduct = new Hkarrowslider( $('div.brand_list'), $('div.brand_goods') );
		brproduct.slide( 1, -12, 4);
	}	
	
	/* 2015-06-05 : reseed 상단 gnb 이벤트 롤링 추가*/
	if( $('div.banner_spot').length > 0) {
		var topbanner = new Hkfadeinslider( $('div.banner_spot'), 3 );	//div.banner_spot 공통
		topbanner.move();
	}
	
});
//////////////////
//	layer load	//
//////////////////	
function HKlayerpopup(){
	var layer = new layerload();
		
	var viewer = $('div.go_viewer > a');
	viewer.on('click', function( e ){
		e.preventDefault();
		var num = $(this).parent().data('num');
		layer.load(num);
	});	
};

//image slider 1: fadeInOut
function Hkfadeinslider( ele, sc ){
	this.ele = ele;
	this.sc = sc;
	
	var li = this.ele.find('>ul > li');
	li.css({ position :'absolute' }).slice(1).hide();
	
	var btn = this.ele.find('div.banner_page');
	
	btn.find('a').removeClass('on');
	btn.find('a').eq(0).addClass('on');
}
Hkfadeinslider.prototype.move = function( ss ){
	if ( !ss ){
		ss = 700;
	}
	var $this = this,
		btn = $this.ele.find('div.banner_page'),
		li = $this.ele.find('>ul > li'),
		timer, count=0, sc= $this.sc*1000;
		
	if( btn.find('>a').length < 2 ){
		btn.find('>a').hide();
	}else{
		setTime();
	};
	
	btn.on('click', '>.rolling', function( e ){
		e.preventDefault();
		var idx = $(this).index();
		btn.find('a').removeClass('on');
		$(this).addClass('on');
		
		count = idx;
		li.each(function(i){
			if ( i === idx ){
				$(this).fadeIn( ss );
			}else{
				$(this).fadeOut( ss );
			}
		});
	}).on('mouseenter', '>.rolling', function(){
		clearInterval(timer);
	}).on('mouseleave', '>.rolling', function(){
		setTime();
	});
	
	btn.on('pause', function() {
		clearInterval(timer);
	});
	btn.on('restart', function() {
		setTime();
	});
	
	function setTime() {
		clearInterval(timer);
		timer = setInterval( rollmoving, sc);			
	};
	function timeover( e ) {
		clearInterval(timer);
	};
	function timeout( e ) {
		setTime();
	};
	function rollmoving() {
		count++;
		count>li.length-1 ? count=0: count;
		btn.find('>a').eq(count).trigger('click');				
	};	
};

//image slider 2: side arrow
function Hkarrowslider( ele , arrow ){
	this.ele = ele;
	this.arrow = arrow;
	
	var k = 10000;
	
	if(location.pathname == "/shopping.do"){
		
		if(ele.hasClass("shop_best")){
			k = (ele.find(".goods_list li").width()+21) * ele.find(".goods_list li").length;
		}else if(ele.hasClass("goods_area")){
			k = (ele.find("li").width()+1) * ele.find("li").length;			
		}
	}	
	
	ele.find('>ul').css({ width :k+"px" });
	
}
Hkarrowslider.prototype.slide = function( num, margin, last ){
	var arbtn = this.arrow,
		li = this.ele.find('>ul>li'),
		count = 0,
		liwid = li.outerWidth(true),
		margin = margin,
		num = num;
		
	if( li.length-1 < last ){
		arbtn.find('>a').hide();
	}else{
		arbtn.on('click', '>a', function( e ){
		
			if( $(this).hasClass('prev') ){
				count--;
				count < 0 ? count=0 : count;				
			}else{
				count++;
				count > (Math.ceil(li.length/num))-last ? count = (Math.ceil(li.length/num))-last : count;
			}		
			li.parent().stop().animate({ marginLeft: (-(liwid*num)*count)+margin+'px' });
			
			e.preventDefault();
		});
	}	
	
};
//layer popup load
function layerload(){}
layerload.prototype.load = function( num ){	
	if( $('div.productLayer') !== undefined ){
		$('div.productLayer').remove();
	}
	$('<div class="productLayer" style="position:fixed;left:50%;top:50%;margin-left:-364px;margin-top:-320px;background-color:white;z-index:15;display:none"></div>').appendTo('body');	
	$('div.productLayer').show();
	$('div.productLayer').css({
		position:'absolute',
		top:$(window).scrollTop()+parseInt($(window).height()/2)+'px'
	});
	$.ajax({
        type: 'POST',
        url: '/viewProduct.do',
        data : {"prdno": num },
        dataType: 'text'
	}).done(function ( data ) {
		var cont = $(data).filter('div.goods_view');
		var result = $('div.productLayer').html(cont);
		var close = result.find('div.goods_view > a.close');
		var div = result.find('div.r_goods > div'),
			btn = result.find('div.r_goods');
		
		var shSlide = new Hkarrowslider( div, btn );
			shSlide.slide( 1, -1, 3);
		
		result.find('div.goods_tmb > a').on('click', function(e){ 
			e.preventDefault(); 
		});
		
		close.on('click', function( e ){
    		e.preventDefault();
    		$('div.productLayer').remove();
    	});
	});
};


$(document).ready(function() {
	var tabs = $('.mainBlock3 .tab-links');
	var tabsContent = $('.mainBlock3 .tabs .tab');
	tabsContent.hide().eq(0).show();
	/* 브랜드, 제품, 상황별 선택시 이벤트 발생*/
	tabs.find('.tab-link').each(function(i, e) {
		$(this).bind('click', function(e) {
			e.preventDefault();
			tabs.find('.tab-link').removeClass('active');
			$(this).addClass('active');
			tabsContent.hide().eq(i).show();
			tabsContent.find('main_goods').find('li').eq(0); 
			
//			console.log($('.mainBlock3 .tab-links').find('.tab-item.three').children().is('a.active'));
//			console.log(tabsContent.find('li').is('.on.fst'));
			if(tabs.find('.tab-item.three').children().is('a.active')){
				if(tabsContent.find('li').is('.on.fst')){
					main_search_brand_v2('S001','S');
				}
			}
			return false;
		});
	});
	
	/* 브랜드,제품,상황별 카테고리 클릭시 이벤트 발생*/
	tabsContent.find('.main_goods a').bind('click', function(e) {
		e.preventDefault();
		$(this).parents('.main_goods').find('li').removeClass('on');
		$(this).parent().addClass('on');
		return false;
	});	
	
	$('.mainBlock1 .banner .image img').each(function() {
		$(this).css('margin-left', '-' + $(this).outerWidth(true)/2 + 'px');
	});
});