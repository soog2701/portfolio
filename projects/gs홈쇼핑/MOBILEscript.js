
"use strict";
//mobile ver.

$(window).on("load", function() {	
	//box ui
	if( $('.snsList').length > 0 ){
		snsBox.init();
	}	
	gsMain.init();
	gsCommon.init();
	gsIr.init();
	gsBusiness.init();
	//pc ver button
	$('footer .goPC').on('click', function(e){		
		window.location.href = "http://company.gsshop.com/#pc"; 
	});
});
//common
(function($) {
	var module = window.gsCommon = {};
	module.menu = function(){	//gnb
		$('nav.gnb').height(7);		
		$('nav.gnb').hide();
		var sScrollTop = null;
		$("header .btnMenu").on('click', function(e){
			e.preventDefault();			
			$('nav.gnb').fadeIn(function(){
				$('nav.gnb').animate({'height':'100%'});
			});
			sScrollTop = $(window).scrollTop();		
			var bottoms = 0;
			if( sScrollTop < $(document).height()-$(window).height() ){				
				//if( $('body').css('overflow') !== "hidden" ){ //main not
					$('footer').hide();
					bottoms = 0;
				//}				
			}else if( sScrollTop == $(document).height()-$(window).height() ){
				$('footer').show();
				bottoms = -$('footer').outerHeight(true);				
			}
			if ( $(document).height() > $(window).height()  ){				
				//if( $('body').css('overflow') !== "hidden" ){	//main not
								
				$('#content').wrap('<div class="menus" />');			
				if( $('body#main').length < 1 ){	//main not
					$('#content').css('margin-top', -( sScrollTop )+'px');//??					
				}else{					
					//$('#content').css('margin-top', -( sScrollTop )+'px');//??		
					$('#content').attr('style', 'margin-top: '+ -( sScrollTop ) +'px !important');			
				}				
				//$('#content').css('position','fixed');??
				$('.menus').css({'overflow':'hidden'}).height( $(window).height()+bottoms ).width('100%');	
			}			
		});
		$("header .btnClose").on('click', function(e){
			e.preventDefault();		
			if ( $("#content").parent().hasClass('menus') ){
				$.when( $("#content").unwrap() ).done(function(){					
					
					$("#content").removeAttr('style');	
					$(window).scrollTop(sScrollTop);
					$('footer').show();
				});	
			}			
			$('nav.gnb').animate({'height':'47px'},function(){
				$('nav.gnb').fadeOut();
			});
		});
		$("header .gnbMenu>li>a").on('click', function(e){
			e.preventDefault();					
			$(this).next().slideToggle(function(){
				$(this).parent().toggleClass('on');
			});
			
		});		
		
	};
	module.listView = function( url ){		//ajax
		var request = $.ajax( url ,{ //sns, news 
			dataType: "html"
		});
		request.done(function(data){			
			for( var i = 0; i<5;i++){
				$('.boardList').append(
					'<li class="boardL">'+
						'<a href="#" class="boardA">'+
							'<em class="sort">FACEBOOK'+i+'</em>'+
							'<strong class="title">한줄 말줄임 한줄 말줄임 한줄 말줄임 한줄 말줄임 한줄 말줄임 한줄 말줄임 한줄 말줄임 한줄 말줄임 한줄 말줄임 한줄 말줄임</strong>'+
						'</a>'+
					'</li>'
				);
			}
		});
		request.fail(function(jqXHR, textStatu){
			//console.log("Request failed: " + textStatus);    		
		});
	};
	module.acoView = function( url ){		//ajax
		var request = $.ajax( url ,{ //sns, news 
			dataType: "html"
		});
		request.done(function(data){			
			for( var k = 0 ; k<5 ;k++ ){
				$('.accordionList').append(
					'<li>'+
						'<a href="#" class="infoQ"><strong>제목입력</strong></a>'+
						'<div class="infoA accordionCont">'+
							'내용입력<br>'+
							'내용입력'+
						'</div>'+
					'</li>'
				);
			}
		});
		request.fail(function(jqXHR, textStatu){
			//console.log("Request failed: " + textStatus);    		
		});
	};	
	module.sharing = function(){			// gs sharing
		var top = [];
		$('.socialDrop').each(function(k){
			top.push( $(this).offset().top );
		});		
		//10-23
		$('.socialDrop>.dropTitle a').on('click', function(e){
			e.preventDefault();
			var idx = $(this).closest('.socialDrop').index('.socialDrop');
			//$('.socialDrop>.dropTitle a').removeClass('on');
			$(this).closest('.socialDrop').siblings().find('.dropTitle a').removeClass('on');
			$(this).toggleClass('on');
			$('body').animate({
				scrollTop: top[idx]-47 +'px'
			},300);			
			$('.socialDrop').each(function(i){
				if( i === idx ){					
					$(this).find('.dropCont').slideToggle(300);					
				}else{					
					$(this).find('.dropCont').slideUp(300);					
				}
			});
		});
		//10-23
		//$('.socialDrop>.dropTitle a') 사회공헌 링크
		if( window.location.hash.match(/(#contribution)/) ){			
			switch ( window.location.hash ){
				case "#contribution0": $('.socialDrop').eq(0).find('>.dropTitle a').trigger('click');
				break;
				case "#contribution1": $('.socialDrop').eq(2).find('>.dropTitle a').trigger('click');
				break;
				//case "#contribution2": $('.socialDrop').eq(2).find('>.dropTitle a').trigger('click');
				//break;
				default:
				break;
			}
		}
		
		
		
	};
	module.init = function() {
		module.menu();
		if( $('div.social').length > 0 ){
			module.sharing();
		}
		//10-23
		//contribution.html 사회공헌 링크	
		/*
		if($('body#main').length > 0){
			$('.shareList li').each(function(i){				
				if($(this).find('a').attr('href') === "#" ){
					//contribution.html
					$(this).find('a').attr('href', "contribution.html"+'#contribution'+i );
				}else{
					$(this).find('a').attr('href', $(this).find('a').attr('href')+'#contribution'+i );
				}
			});
		}	
		*/
		if( $('div.swiperContainer').length > 0 ){			
			if( $('#content>div.shop').length > 0 ){
				$('.swiperContainer').gsSwipe();	//auto roll {autoplay:true}
			}else{
				$('.swiperContainer').gsSwipe({set:"history"}); //historySlide
			}			
		}
		//정사각형 녹색 탭 
		$('.tabType1>li>a').on('click', function(e){
			$(this).parent().siblings().removeClass('on');
			$(this).parent().addClass('on');
			//if( $('.historyCont').length > 0 ){	//company - history
				e.preventDefault();
				$('.tabCont').hide();
				$('.tabCont').eq($(this).parent().index()).show();
			//}
		});
		//accordionList 10-16
		$(document).on('click', '.accordionList > li > a',function(e){
			e.preventDefault();
			$(this).toggleClass('on');
			$(this).parent().siblings().find('>a').removeClass('on');		
			var p = $(this).parent();				
			$(this).parent().find('.accordionCont').slideToggle(300,function(){
				if( !$(this).closest(".accordionList").hasClass("stationList") || !$(this).closest(".accordionList").hasClass("corpInfo")){
					//$(window).scrollTop( $(this).parent().offset().top - 47 );
					$('body').animate({ scrollTop: (p.offset().top - 47)+"px" },300);
				}
			});
			$(this).parent().siblings().find('.accordionCont').slideUp(300);			
		});
		//list view MORE						
		$(document).on('click', '.btnMore', function(e){
			e.preventDefault();				
			if( $(this).prev().hasClass('accordionList') ){					
				//ir 기업정보
				//module.acoView("newsview.html");	//더미
			}else{
				//module.listView("newsview.html");	//더미
			}
		});			
		$('.btnShare > a').on('click', function(e){
			e.preventDefault();
			$(this).next().toggle();
		});
		// sns tab all view
		$('.snsBox li:gt(5)').hide();
		$('.allBox a').on('click', function(e){
			e.preventDefault();
			if( $('.snsBox li').length < 7 ) return false;
			$(this).toggleClass('on');
			$('.snsBox li:gt(5)').toggle();
		});
		//shareList		
		if( $('.btnShare .shareList').length > 0 ){			
			if( $('script[src$="//developers.kakao.com/sdk/js/kakao.min.js"]').length < 1 ){
				$('body').append('<script src="https://developers.kakao.com/sdk/js/kakao.min.js"></script>');				
			}							
		}		
		//10-28
		$('.btnShare .shareList a').on('click', function(e){
			var url = window.location.href;//encodeURIComponent(window.location.href);			
			var title = document.title;//encodeURIComponent(document.title);			
			try {
				if (Kakao) {
					//Kakao.init('aa4161b1d82ecba4ae98c5c6e7bf22d6');	// 임시
					Kakao.init('3d6757ba3e4284f88b5a6e98b7575b20');	
				};
			} catch(e) {
			};
			switch( $(this).attr('class') ){
				case 'type1': cacaolinkShare( url, title );//카카오톡
					break;
				case 'type2': cacaostoryShare( url, document.title );//카카오스토리
					break;	
				case 'type3': window.open("https://m.facebook.com/sharer.php?m2w&u="+encodeURIComponent(url));//페이스북
					break;
				case 'type4': window.open("https://twitter.com/intent/tweet?text="+encodeURIComponent(document.title)+"&url="+url);//트위터
					break;
				case 'type5': linkcopy(); //링크
					break;
				default:
					break;
			}			
		});
		function linkcopy(){
			var r = confirm("현재 페이지의 정보를 복사하시겠습니까?");
			if (r == true) {					
				prompt( "아래의 URL을 눌러 복사해주세요",  window.location.href );
			}
		}		
		function cacaolinkShare( ur, text ){			
			Kakao.Link.sendTalkLink({
				label : text,
				webButton : {
					text : "GS샵 기업홈페이지 바로가기",
					url : ur
				},
				image : {
					src: 'http://company.gsshop.com/images/common/kakao_gsshop.png',
					width: '300',
					height: '200'
				}
			});		
		}
		function cacaostoryShare( ur, text ){			//https://devtalk.kakao.com/t/topic/4041
			Kakao.Story.share({
	          url: ur,
	          text: text
	        });
		}
		
		//company - station1		
		if( $('.mapTxt').length > 0 ){
			stationView();			
		}
		//10-28
		function stationView(){
			$('.mapTxt a').on('click', function(e){
				e.preventDefault();				
				if( $('.layerPop').is(":animated") ) return false;		
				var url = location.pathname.substring(location.pathname.lastIndexOf('/')+1);				
				
				var setPage = 1;
				switch ( $('div.station ul.tabType1 li.on').index() ){	// tab class 
					case 0 : setPage = 1;
					break;
					case 1 : setPage = 2;
					break;
					case 2 : setPage = 3;
					break;				
					default : 
					break;
				}
				if( $(this).index('.thumb') == 0 ){	//첫번째
					url = "station"+setPage+"_pop1.html";								
				}else{		//두번째
					url = "station"+setPage+"_pop2.html";
				}
				
				var requset = $.ajax( url ,{ dataType: "html" } );
				requset.done( function( data ){
					var result = $(data).filter(".layerPop");
					result.css({
						'background':"white",
						'position':'absolute',
						'top': $(window).height()+'px'
					});					
					$("body").append(result);
					$('body').animate({scrollTop:0},300);
					var topPos = 0;					
					$('#content').css('padding-top') !== '47px' ? topPos = 47: topPos = (47+51);
					result.animate({top: topPos+'px'},300, function(){
						$("body").find('footer').hide();						
						$("body #content .station").contents().not('.swipeNav').hide();
					});
					result.find('.close').on('click', function(){
						$("body").find('footer').show();
						$("body #content .station").contents().not('.swipeNav').show();						
						result.animate({top:$(window).height()+'px'},300, function(){
							result.remove();
						});
					});
				});
				
			});
		}
		
	};
})(jQuery);

//gs main 
(function($){
	var module = window.gsMain = {};
	module.scrollCtrl = function(){
		$('header').css({'position':'fixed','top':'0px'});		
		$('.linkArea a.wide').on('click', function(e){	//sns now btn
			e.preventDefault();
			$(window).scrollTop( $('.mainSNS').offset().top -47 );			
			
		});
		$('footer .goTop').on('click', function(e){	//top btn
			e.preventDefault();
			$(window).scrollTop(0);
			
		});
		var cur = 0;
		$('.mainNews ').css('z-index','30');		
		$('.mainNews .newsList ul').height($('.mainNews .newsList li').height()*($('.mainNews .newsList li').length+1));
		/*
		$('.mainNews .newsCtrl a').on('click', function(e){
			e.preventDefault();			
			if( $(this).hasClass('prev') ){
				cur--;
				cur < 0? cur = 0 : cur;
			}else{
				cur++;
				cur > $('.mainNews .newsList li').length - 1 ? cur = $('.mainNews .newsList li').length - 1 : cur;
			}					
			$('.mainNews .newsList ul').animate({'margin-top': (-$('.mainNews .newsList li').height()*cur)+'px'},function(){				
				if( cur == 0 ){ 
					$('.mainNews .newsCtrl').find('.prev').addClass('end');
				}else if( cur == $('.mainNews .newsList li').length -1 ){ 
					$('.mainNews .newsCtrl').find('.next').addClass('end');
				}else{					
					$('.mainNews .newsCtrl').find('.prev').removeClass('end'); 
					$('.mainNews .newsCtrl').find('.next').removeClass('end');
				}
			});			
		});
		*/
		var setTimes;
		function newsStart(){
			setTimes = setInterval(function(){				
				$('.mainNews .newsList ul').animate({'margin-top': (-$('.mainNews .newsList li').height())+'px'},function(){
					$('.mainNews .newsList ul').css('margin-top','0px');
					$('.mainNews .newsList li').first().appendTo($('.mainNews .newsList ul'));
				});
			}, 4000 );
		}
		newsStart();
	};
	
	module.init = function(){
		if( $('.mainSpot').length > 0 ){			
			module.scrollCtrl();
			$('.mainSpot').gsSwipe({autoplay:true});
			$('.linkSlide').gsSwipe();
			
			textColor();
			
		}		
		//text color set
		function textColor(){						
			$('p.txt').each(function(k){	
				var btn = $(this).next('.go');
				var $this = $(this);
				if( $(this).data('color') ){
					$(this).css('color',  $this.data('color'));
					btn.css({'color': $this.data('color'), 'border-color': $this.data('color') });
				}
			});		
			$('strong.desc').each(function(k){				
				var $this = $(this);
				if( $(this).data('color') ){
					$(this).css('color',  $this.data('color'));					
				}
			});			
		}
	};
	
}(jQuery));

//gs Business 
(function($){
	var module = window.gsBusiness = {};
	module.selectNavi = function(){
		var sumWidth = 0;
		var sum5 =0;
		var setCont = 4;
		$('.selectNavi >ul >li').each(function(i){
			sumWidth += $(this).outerWidth();
			if( 5 > i ){				
				sum5 = sum5 + parseInt($(this).outerWidth());
			}
		});		
		if( sum5 > $('.selectNavi').width()+6 ){
			setCont = 3;
		}
		$('.selectNavi >ul').width( sumWidth +1).height( $('.selectNavi >ul >li').height() );		
		var count = 0;
		//$('.selectNavi a').on('click', function(e){			e.preventDefault();		}); 10-16
		$('.selectNavi').on('swipeleft swiperight', function(e){
			if( $(this).find('>ul').width() > $(this).width() ){				
				if( e.type == "swipeleft" ){
					count--;
					count < ($('.selectNavi >ul>li').length -setCont)*-1 ? count = ($('.selectNavi >ul>li').length -setCont)*-1 : count;
				}else{
					count++;
					count > 0 ? count = 0 : count;
				}				
				selecSwipemove( count );
			}			
		});
		function selecSwipemove( count ){			
			var marginLefts = count == 0? 0 : -setCont;			
			var cidx = 0;
			$('.selectNavi li').each(function(i){					
				if( Math.abs(count) > i ){
					cidx = cidx + parseInt($(this).outerWidth());
				}
			});					
			$('.selectNavi >ul').stop().animate({'margin-left': (cidx*-1)-marginLefts+'px'},function(){
					if( count == 0 ){						
						$('.arrow.prev').addClass('stop');
						$('.arrow.next').removeClass('stop');
					}else if ( count == ($('.selectNavi >ul>li').length -setCont)*-1 ){						
						$('.arrow.next').addClass('stop');
						$('.arrow.prev').removeClass('stop');
					}else{
						$('.arrow.next').removeClass('stop');
						$('.arrow.prev').removeClass('stop');
					}
				});
		}
		$('.selectNavi').siblings().on('click', function(e){
			e.preventDefault();			
			if( $('.selectNavi').find('>ul').width() > $('.selectNavi').width() ){
				if( !$(this).hasClass('stop') ){
					if( $(this).hasClass('arrow prev') ){
						$('.selectNavi').trigger("swiperight");
					}else if( $(this).hasClass('arrow next') ){					
						$('.selectNavi').trigger("swipeleft");
					}
					selecSwipemove( count );
				}
			}
						
		});
	};
	module.init = function(){
		if( $('.selectNavi').length > 0 ){
			module.selectNavi();
		}		
	};
}(jQuery));

//gs ir 
(function($){
	var module = window.gsIr = {};
	module.performance = function(){
		if( $('h4.stit').text().match(/(주요 경영실적)/) ){
			$('.tabType3 a').on('click', function(){
				$(this).siblings().removeClass('on');
				$(this).addClass('on');
			});
		}
	};
	module.init = function(){
		module.performance();
		//전자공고
		/*
		$('.irBanner li:last >a').on('click', function(e){
			e.preventDefault();
			//call list
			gsCommon.listView("irlist.html");
		});
		*/
	};
}(jQuery));

//sns box ui
(function($) {
	var module = window.snsBox = {};	
	module.init = function() {		
		//main css set		
		if( $('.mainSNS .snsList .boxSection').length> 0 ) $('body').append("<style>.mainSNS .snsList .boxSection a{margin:10px;}.mainSNS .snsList .boxSection{padding:0px;width:49%;}</style>");		
		//$('.mainSNS .snsList').css('overflow-y','scroll');
		
		module.grid = $('.snsList').masonry({
			percentPosition: true,
			columnWidth: '.boxSection',
			itemSelector: '.boxSection',
			transitionDuration: 0   //set animation duration 0 
		});
		$(window).resize(function(){			
			module.grid.masonry('layout');
		});
		if( !$('body').attr('id') &&  $('.snsList').length > 0 ){						
			//snsScroll();
		}
		function snsScroll(){				
			$(window).scroll(function(){
				var wp = $(window).scrollTop();				
				if( $(document).height() <= wp + $(window).height() && $('.snsList >div').filter(':hidden').length > 0 ){					// && $('.snsList >div').filter(':hidden').length > 0
					setTimeout(function(){	//2개씩 보이게 하기
						$('.snsList >div').filter(":lt("+ ($('.snsList >div').filter(':visible').last().index() +3) +")").fadeIn(700);			
						/*
						var elem = $('.snsList>div').filter(":lt(2)").clone().appendTo( $('.snsList') );			
						module.grid.append(elem).masonry('appended', elem).masonry();
						elem.hide().fadeIn(700);						
						*/
						module.grid.masonry('layout');
					},50);
					
				}
			});
		}
		
	};
})(jQuery);


//swipe 10-28
/**
 * new GsSwipe()
 * ele : $('.swiperContainer')
 * USE : ele.gsSwipe();
 */
;(function($){
	$.fn.gsSwipe = function(option) {
	    return this.each(function() {
	    	var $this = $(this);	    	
	    	var data  = $this.data('gsSwipe');	    	
	    	if (!data) $this.data('gsSwipe', (data = new GsSwipe( $.extend({ele:$this},option) )) );
	    });
	};
	$.fn.gsSwipe.Constructor = GsSwipe;
}(jQuery));
function GsSwipe( op ){
	this.option = $.extend({
		ele: $.noop(),
		autoplay: false,
		set : "string"
	},op);	
    this.nowidx = 0;	
	this.reSized();
	
	this.rRime;	
	if( this.option.set === "history" ){
		this.swHistorySet();
		this.swHistory();
	}else{		
		this.swiping();	
	}
}
$.extend(GsSwipe.prototype, {
	swipemove: function(t , p , m, set ){
		var $this = this;
		t.stop().animate({
			'left' : m*(t.width())+'px'
		});		
		if( set ){ 
			p.css('left', -(t.width())+'px');  
		}		
		p.stop().animate({
			'left' : '0px'
		},function(){
			t.siblings().not(p).css('left', (t.width())+'px');
			if( $this.option.ele.find('.paging').length> 0 ){
				$('.paging>ul>li').find('>a').removeClass('on');
				$('.paging>ul>li').eq(p.index()).find('>a').addClass('on');				
			}else if( $this.option.ele.find('.slideNavi').length> 0  ){
				$('.slideNavi a').removeClass('on');
				$('.slideNavi a').eq(p.index()).addClass('on');
			}else if( $this.option.ele.find('.spotNavi').length> 0  ){
				$('.spotNavi a').removeClass('on');
				$('.spotNavi a').eq(p.index()).addClass('on');
			}else if( $this.option.ele.find('.shopPaging').length> 0  ){
				$('.shopPaging a').removeClass('on');
				$('.shopPaging a').eq(p.index()).addClass('on');
			}
			
		});
	},
	rollingstrat : function(){
		var $this = this;
		var lenDiv = this.option.ele.children("div,ul").children("div,li");
		$this.rRime = setInterval( function(){		
			var nCount = $this.nowidx+1;			
			nCount > lenDiv.length-1 ? nCount = 0 : nCount;		
			if(lenDiv.is(':animated')) return false;
			$this.swipemove( lenDiv.eq($this.nowidx), lenDiv.eq(nCount) , -1 );
			$this.nowidx++;
			$this.nowidx > lenDiv.length-1 ? $this.nowidx = 0 : $this.nowidx;			
		}, 7000);		
	},
	rollingstop : function(){
		var $this = this;		
		clearInterval($this.rRime);		
	},
	swHistorySet : function(){
		var $this = this;
		if( this.option.set === "history" ){
			var th = Math.ceil($(window).width()/3);
			var historyBar = this.option.ele.find('.historySlide');
			historyBar.find('li').width( th );			
			var len = historyBar.find('li').length %2 === 0? len = 0 : len = $(window).width() - historyBar.find('li').outerWidth(true)*2;
			historyBar.find('ul').width( (historyBar.find('li').outerWidth(true)*(historyBar.find('li').length)) + len );// odd even
			if ($this.option.ele.hasClass('swiperContainer') ){			
				$this.option.ele.css('overflow','hidden');
				if($this.option.ele.find('.swHistory').length < 1 ){
					//$this.option.ele.find('.historyPaging').css('top','-43px');
					$this.option.ele.find('>div.swiperWrapper').wrap('<div class="swHistory" />');
					$this.option.ele.find('.swHistory').height($this.option.ele.find('>div>div>div').height()).css({ 'position':'relative', 'left':'0px'});
				}				
				$this.option.ele.find('.swiperSlide').each(function(i){
					$(this).css('left', $(this).width()*i+'px');
				});
			}
		}
	},
	swHistoryMove: function( c ){
		var $this = this;
		var li = this.option.ele.find(".historySlide li");
		var sli = this.option.ele.find('.swiperSlide');
		var len = 0;		
		c > Math.ceil(li.length/2)-2 ? len = li.outerWidth(true) : len = 0;		
		this.option.ele.find(".historySlide ul").stop().animate({'margin-left' : (-(li.outerWidth(true)*2)*c)+len+"px"}, function(){
			$this.option.ele.find('.historyPaging li a').removeClass('on');
			$this.option.ele.find('.historyPaging li').eq(c).find('a').addClass('on');
		});
		if( c < 3 ){
			this.option.ele.find('.swHistory').stop().animate({'left': -sli.width()*c+'px'});
		}else{
			var cmax = 2;
			this.option.ele.find('.swHistory').stop().animate({'left': -sli.width()*cmax+'px'});
		}
		
	},
	swHistory: function(){
		var isSwipe = false;
		var lPos,lPos_bg;		
		var piece = this.option.ele.children(".historySlide");
		var $this = this;
		var count = 0, num = 0;
		var bgElem = this.option.ele.find('.swHistory');		
		var startX,startY,stopX,stopY,StartT,StopT,isClick;
		piece.on('touchstart touchmove touchend', function(e){			
			if( e.type == "touchmove"){
				var touches = e.originalEvent.touches,
					touch_x = touches[0].clientX,
					touch_y = touches[0].clientY;			
				e.stopPropagation();
				if( (Math.abs(touch_x - startX )/Math.abs(touch_y - startY ))>3 ){
					e.preventDefault();	
					isClick = true;					
					
					if( lPos ){						
						$(this).find('>ul').css('margin-left', touch_x-lPos+'px');
					}					
					var bgMove = (touch_x-lPos) - (($(this).width()-$(this).find('li').outerWidth(true)*2)*count);			
							
					if( bgMove > 0 || bgMove < parseInt($('.swiperSlide').last().css('left'))*-1 ){
						
					}else{						
						if( count > Math.ceil($(this).find('>ul li').length/2)-1 ){ //last							
						}else{							
							if ( num < 2 ) {				// count < 2 &&								
								if( count < 2 ){
									bgElem.css('left', (touch_x-lPos_bg)+((touch_x-lPos_bg)*-0.1)+'px');	
								}else if( count != 3 ){
									bgElem.css('left', (touch_x-lPos_bg)+((touch_x-lPos_bg)*0.1)+'px');	
								}
							}							
						}
					}
				}else{
					isClick = false;
				}				
			}else{				
				if( e.type == "touchend" ){			
					e.stopPropagation();
					if( isClick && (new Date()).getTime()- StartT < 1000 ){
						e.preventDefault();
					}
					isClick = false;	
					if( Math.abs(startY - e.originalEvent.changedTouches[0].clientY) < 100 ){
						if( startX - e.originalEvent.changedTouches[0].clientX > 0 ){	//->
							count++;					
							count > Math.ceil($(this).find('>ul li').length/2)-1 ? count = Math.ceil($(this).find('>ul li').length/2)-1 : count;
						}else{
							count--;
							count < 0 ? count = 0 : count;
						}
						if( parseInt($(this).find('>ul').css('margin-left')) > 0  ){
							$(this).find('>ul').animate({'margin-left': 0+'px'});							
						}else if( parseInt($(this).find('>ul').css('margin-left')) < (parseInt($(this).find('>ul').width() - $(window).width()))*-1 ){
							$(this).find('>ul').animate({'margin-left': (parseInt($(this).find('>ul').width() - $(window).width()))*-1+'px'});
						}
						$this.swHistoryMove(count);	
					}
					
									
				}else if( e.type == "touchstart" ){
					num = count;
					startX = e.originalEvent.touches[0].clientX;
					startY = e.originalEvent.touches[0].clientY;
					if( !$this.isIOS() ){		
						StartT = (new Date()).getTime();				
					}else{
						e.stopPropagation();
					}										
					lPos = e.originalEvent.touches[0].clientX - parseInt($(this).find('>ul').css('margin-left'));					
					lPos_bg = e.originalEvent.touches[0].clientX - parseInt(bgElem.css('left'));	
					
				}
			}
		});
		
		this.option.ele.find('.paging a').on('click', function(e){
			e.preventDefault();			
			var idx = $(this).parent().index();
			count = idx;
			$this.swHistoryMove(idx);
		});
		
	},
	isIOS: function(){		
		if( navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) ){
			return true;
		}else{
			return false;
		}		
	},
	swiping: function(){		
		var isSwipe = false;
		var lPos;		
		var piece = this.option.ele.children("div,ul").children("div,li");	//div or li
		var set = false;
		var $this = this;
		var nextIdx = 0;
		
		if ($this.option.ele.hasClass('swiperContainer') ){
			$this.option.ele.height(piece.height()).css('overflow','hidden');		
			piece.not(":first").css('left',piece.width()+'px');
		}
		if( piece.length < 2 ) return false;		
		var startX,startY,stopX,stopY,StartT,StopT,isClick;
		var pElm,nElm;
		
		piece.on('touchstart touchmove touchend', function(e){   //swipe			
			
			if( e.type == "touchmove"){				
				var touches = e.originalEvent.touches,
					touch_x = touches[0].clientX,
					touch_y = touches[0].clientY;
				e.stopPropagation();
				if( (Math.abs(touch_x - startX )/Math.abs(touch_y - startY ))>3 ){
					e.preventDefault();	
					isClick = true;
					$(this).css('left', touch_x-lPos+'px');					
					if( piece.length < 3 ){									
						if( touch_x - startX >0 ){	// <<<<<
							nElm.css('left',  $(this).width()+(touch_x-lPos)+'px' );
							pElm.css('left',  ($(this).width()-(touch_x-lPos))*-1+'px' );
						}else{							
							nElm.css('left',  $(this).width()+(touch_x-lPos)+'px' );
						}						
					}else{
						nElm.css('left',  $(this).width()+(touch_x-lPos)+'px' );
						pElm.css('left',  ($(this).width()-(touch_x-lPos))*-1+'px' );
					}					
				}else{
					isClick = false;
				}				
			}else{					
				if( e.type == "touchend" ){
					e.stopPropagation();
					if( isClick && (new Date()).getTime()- StartT < 1000 ){
						e.preventDefault();
					}
					isClick = false;					
					if( Math.abs(startY - e.originalEvent.changedTouches[0].clientY) < 100 && Math.abs(startX - e.originalEvent.changedTouches[0].clientX) > 1){
						if( parseInt($(this).css('left')) > 0  ){	//right		<<<			
							$this.swipemove( $(this),pElm,1 );	
							$this.nowidx = pElm.index();
						}else{							
							$this.swipemove( $(this),nElm,-1 );
							$this.nowidx = nElm.index();
						}						
						if( $this.option.autoplay && $this.rRime ){
							//$this.rollingstrat();
						}
					}					
					if( $this.option.autoplay ){//11-09	
						$this.rollingstrat();
					}				
				}else if( e.type == "touchstart" ){			
					if( piece.is(":animated").length > 0 ) return false;//11-09	
					if( $this.rRime ) $this.rollingstop();//11-09	
					pElm = $(this).prev().length > 0 ? $(this).prev() : $(this).parent().children().eq(-1);
					nElm = $(this).next().length > 0 ? $(this).next() : $(this).parent().children().eq(0);
					
					//css set
					if( !set ){						
						if ($this.option.ele.hasClass('swiperContainer') ){
							
						}else{
							$(this).parent().children().css('position','absolute');
							$(this).eq(0).css('left','0px');
							$(this).parent().children().not(":first").css('left', $(this).eq(0).width() +'px');
						}						
						set = true;						
					}					
					startX = e.originalEvent.touches[0].clientX;
					startY = e.originalEvent.touches[0].clientY;
					if( !$this.isIOS() ){		
						StartT = (new Date()).getTime();				
					}else{
						e.stopPropagation();
					}
					lPos = e.originalEvent.touches[0].clientX - parseInt($(this).css('left'));
				}
			}
			
		});
		if( !set ){
			piece.parent().children().css('position','absolute');
			piece.eq(0).css('left','0px');
			piece.parent().children().not(":first").css('left', piece.eq(0).width() +'px');
			set = true;
		}
		if( this.option.ele.children('a').length > 0 ){			
			var arrow = this.option.ele.children('a');
			arrow.css('z-index','10');
			arrow.on('click', function(e){				
				e.preventDefault();				
				if( !set ){
					piece.parent().children().css('position','absolute');
					piece.eq(0).css('left','0px');
					piece.parent().children().not(":first").css('left', piece.eq(0).width() +'px');
					set = true;
				}
				if( $(this).hasClass('nextImg') ){ 		//left					
					$this.nowidx > piece.length-1 ? $this.nowidx = 0: $this.nowidx;
					nextIdx = $this.nowidx+1;
					nextIdx > piece.length-1 ? nextIdx = 0 : nextIdx;	
					$this.swipemove( piece.eq($this.nowidx), piece.eq(nextIdx), -1 );
					$this.nowidx++;
				}else{					
					$this.nowidx < 0 ? $this.nowidx = piece.length-1: $this.nowidx;
					nextIdx = $this.nowidx-1;					
					nextIdx < 0 ? nextIdx = piece.length-1  : nextIdx;					
					$this.swipemove( piece.eq($this.nowidx), piece.eq(nextIdx), 1 , true);
					$this.nowidx--;
				}
			});
		}		
		
		if( this.option.ele.find('.paging, .spotNavi, .slideNavi, .shopPaging').length > 0  ){ //indicator
			if( !set ){
					piece.parent().children().css('position','absolute');
					piece.eq(0).css('left','0px');
					piece.parent().children().not(":first").css('left', piece.eq(0).width() +'px');
					set = true;
				}
			this.option.ele.find('.paging a, .spotNavi a, .slideNavi a , .shopPaging a').on('click', function(e){
				e.preventDefault();				
				if( $this.rRime ){
					$this.rollingstop();
				}				
				var idx; //= $(this).parent().index();
				var iidx; //= $(this).closest('.paging').find('a.on').parent().index();
				if( $(this).parent().hasClass('spotNavi') || $(this).parent().hasClass('slideNavi') || $(this).parent().hasClass('shopPaging') ){					
					idx = $(this).index();
					iidx = $(this).closest('.spotNavi,.slideNavi,.shopPaging').find('a.on').index();
				}else{					
					idx = $(this).parent().index();
					iidx = $(this).closest('.paging').find('a.on').parent().index();
				}
				if( piece.is(':animated') ) return false;
				if( idx > iidx  ){ //next				
					if ( piece.length < 3 ){
						piece.eq(idx).css('left', (piece.width())+'px');
					} 	
					$this.swipemove( piece.eq(iidx), piece.eq(idx) , -1 );
				}else if( idx < iidx  ){					
					$this.swipemove( piece.eq(iidx), piece.eq(idx) , 1 , true);
				}else{
					return false;
				}
			});
			
			
		}
		if( this.option.autoplay ){
			$this.rollingstrat();
		}
			
	},
	reSized : function(){
		var saveWidth = $(window).width();
		var $this = this;
		$(window).resize(function(){
			if( saveWidth !== $(window).width() ){
				$this.option.ele.children("div,ul").children("div,li").not(":eq("+$this.nowidx+")").css('left', $this.option.ele.children("div,ul").children("div,li").width() +'px');
				saveWidth = $(window).width();
				$this.swHistorySet();	
			}
		});
	}
});



