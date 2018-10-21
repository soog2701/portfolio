"use strict";
// 페이스북 공유
function sharer_facebook(url){
	//window.open("http://www.facebook.com/sharer.php?u="+ encodeURIComponent(url),"_blank");
	var target_url = "http://www.facebook.com/sharer.php?u="+encodeURIComponent(url)
	var scriptTxt = "window.open('"+target_url+"','_blank');"
	var htmlTxt = "<div id='share_frame_popup135' style='width:0px;height:0px;position:absolute;' onClick=\""+scriptTxt+"\"></div>";
		
	$('body').prepend(htmlTxt);
	$("#share_frame_popup135").click();	
		
	setTimeout(function(){$("#share_frame_popup135").remove();},300);
}
// 트위터 공유
function sharer_twitter(url){
	//window.open("https://twitter.com/intent/tweet?text=&url="+ encodeURIComponent(url),"_blank");
	var target_url = "https://twitter.com/intent/tweet?text=&url="+ encodeURIComponent(url)
	var scriptTxt = "window.open('"+target_url+"','_blank');"
	var htmlTxt = "<div id='share_frame_popup136' style='width:0px;height:0px;position:absolute;' onClick=\""+scriptTxt+"\"></div>";
		
	$('body').prepend(htmlTxt);
	$("#share_frame_popup136").click();	
		
	setTimeout(function(){$("#share_frame_popup136").remove();},300);
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

function sharer_kakaotalk(url,txt,img) {
	Kakao.Link.sendTalkLink({
		label: url,
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

// 카카오톡 메세지
function sharer_kakaotalk2(url,title,txt,img) {
	
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
$(document).ready(function(){	
	
	Kakao.init('534f8430330abf808ebf8f8269ddae69');
	
	$("#test_s").click(function(){
		sharer_kakaotalk('http://www.henkelhomecare.co.kr/brandMain.do','헨켈 테스트','http://www.henkelhomecare.co.kr/resources/inc/home/images/common/h1_henkel.png');
	});

    //sharer_kakaotalk('url','헨켈 테스트','http://www.henkelhomecare.co.kr/resources/inc/home/images/common/h1_henkel.png');
	//////////////
	//	main	//
	//////////////	
	var HKmobile = (function(self,$){
		/*self.swipe = function(){
//			var div = $('div.tab-content.active .tab_brand'),
//			var div = $('div.tab-content.active'),
			var div = $('div.tab-content .tab_brand'),
				li = div.find('>ul>li'),
				wli = parseInt($(window).width()/3);
			
			li.width(wli);
			
			div.find('>ul').css({
				position: 'relative',				
				left : '0px',
				top: '0px'
			});
			
			div.find('>ul').width( parseInt(li.length*wli));		
			
			var touch_start_y = 0,
				touch_start_x = 0,
				save_x = 0,
				saveX = 0,					
				move_dx = 0,				
				divleft = parseInt(div.find('>ul').css('left')),
				xdis = 0,
				ydis = 0,
				lisArr = [],
				pstart_x = 0,
				pstart_y = 0,
				numb = 0;
							
			$(window).resize(function(){
				wli = parseInt($(window).width()/3);
				li.width(wli);				
				div.find('>ul').width( parseInt(li.length*wli) );				
				arrset();				
			});
			function arrset(){
				lisArr = [];
				li.each(function(i){
					lisArr.push( li.width()*i );
				});
			}; 
			arrset();			
			function toStart(e){
				e.preventDefault(); 
                save_x = e.originalEvent.touches[0].clientX; 
                saveX = parseInt(( save_x / div.width() ) * 100); 
               
                divleft = parseInt(div.find('>ul').css('left')); 
                pstart_x = e.originalEvent.touches[0].clientX - divleft;                
                pstart_y = e.originalEvent.touches[0].clientY - (parseInt(div.find('>ul').css('top')));
			}
			function toMove(e){
				var drag_dist = 0; 
                var scroll_dist = 0;             
                if ( e.type === 'touchmove' && e.originalEvent.touches.length === 1 || e.type === 'mousemove') { 
                	e.preventDefault(); 
                	var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
                    drag_dist = touch.clientX - touch_start_x; 
                    scroll_dist = touch.clientY - touch_start_y; 
                    move_dx = parseInt(( drag_dist / div.width() ) * 100);                    
                    
                    ydis =  touch.clientY - pstart_y;
                    xdis =  touch.clientX - pstart_x;                    
                    xdis < -(div.find('>ul').width()-(li.width()*3)) ? xdis = -(div.find('>ul').width()-(li.width()*3)) : xdis;
					xdis > 0 ? xdis = 0 : xdis;
                                                            
                    div.find('ul').css({left: xdis+'px'});   
                	var cof = 0;
					saveX > move_dx  ? cof = -xdis*1.5 : cof = -xdis/1;	//right:left
					for (var i=0, pLen = lisArr.length; i<pLen; i++) {
						if (parseInt( cof ) >= lisArr[i]){ //*2 ->right /2 ->left
							numb = i;
						}
					};					
					numb < 0 ? numb=0: numb;
					numb > li.length-3 ? numb = li.length-3 : numb;	
					
					if( Math.abs(ydis) > 40 ){						
						$('body').animate({scrollTop: (div.offset().top - ydis) - 350 },0);						
					}
					
				}
			}
			function toEnd(e){
				e.preventDefault();
               	divleft = parseInt(div.find('>ul').css('left'));
                numb < 0 ? numb=0: numb;
				numb > li.length-3 ? numb = li.length-3 : numb;				
                div.find('>ul').stop().animate({left : -li.width()*numb+'px'},100); 
                
			}			
            div.on('touchstart', toStart ).on('touchmove', toMove ).on('touchend', toEnd );
            
			var clickcount = 0;
			function listStart(e){
				e.preventDefault();	
				clickcount = 0;
				clickcount++;
			}
			function listEnd(e){
				clickcount++;				
				if( clickcount > 1 ){
					li.removeClass('on');
					$(this).parent().addClass('on');
				} 
			}
			function listMove(e){
				clickcount = 0;
			}
			li.on('click touchstart', '>a', listStart ).on('touchend', '>a',listEnd ).on('touchmove', listMove );	
											
		};*/
		self.slide = function(){
			var li = $('section.main_slide:eq(1) >ul >li'),
				arrow = $('section.main_slide:eq(1)> a.arrow'),
				wd = $(window).width();
				
			if ( li.length === 1 ){
				arrow.hide();
			}else{				
				li.css('float','left');
				li.eq(-1).prependTo(li.parent());
				li.width( wd );			
				li.parent().css('width', (li.width()*li.length)+'px');
				li = $('section.main_slide:eq(1) >ul >li');
				li.parent().css('margin-left', -wd+'px');			
			}
			
			$(window).resize(function(){				
				if( li.length > 1 ){ 
					wd = $(window).width();
					li.width( wd );
					li.parent().width(li.width()*li.length);
					li.parent().css('margin-left', -wd+'px');
				}
			});			
			arrow.on('click', function( e ){
				e.preventDefault();
				if( $(this).hasClass('prev') ){	
					if( li.parent().css('margin-left') === '0px' ){
							li.eq(-1).prependTo(li.parent());
							li = $('section.main_slide:eq(1) >ul >li');
							li.parent().css('margin-left', -wd+'px');
					}	
					tansition(-1,'prependTo',0);
					
				}else{
					if( li.length < 3 ){
						if( li.parent().css('margin-left') !== '0px' ){
							li.eq(0).appendTo(li.parent());
							li = $('section.main_slide:eq(1) >ul >li');
							li.parent().css('margin-left', 0+'px');							
						}
						li.parent().stop().animate({ marginLeft: -(li.width())+'px' }, function(){
							li.eq(0).appendTo(li.parent());
							li = $('section.main_slide:eq(1) >ul >li');
							li.parent().css('margin-left',0+'px');
						});						
					}else{						
						tansition(0,'appendTo',2);
					}					
				}
			});
			function tansition(m, dir, n){				
				li = $('section.main_slide:eq(1) >ul >li');								
				li.parent().stop().animate({ marginLeft: -(li.width())*n+'px' }, function(){
					li.eq(m)[dir](li.parent());
					li = $('section.main_slide:eq(1) >ul >li');
					li.parent().css('margin-left',-wd+'px');
				});
			};
			
		};
		self.init = function(){
//			self.swipe();
			self.slide();
		};
		
		return self;
	}(HKmobile||{},jQuery));
	HKmobile.init();
	
	//////////////////
	//	shopping	//
	//////////////////
	HKshop();
	
	//////////////
	//	member	//
	//////////////
	var HKmember = (function(self,$){
		self.form = function(){
			var textbox = $('div.form_box > span > input');
			
			textbox
			.on('focus',function(){
				$(this).prev().empty();
			})
			.on('blur', function(){				
				if( $(this).val() === "" ){
					if( $(this).prev().attr('for') === 'userID' ){
						$(this).prev().text('아이디');
					}else if( $(this).prev().attr('for') === 'userName' ){
						$(this).prev().text('이름');
					}else if( $(this).prev().attr('for') === 'userEmail' ){
						$(this).prev().text('이메일');
					}else if( $(this).prev().attr('for') === 'userPw' ){
						$(this).prev().text('비밀번호');
					}else if( $(this).prev().attr('for') === 'loginId' ){
						$(this).prev().text('아이디');
					}else if( $(this).prev().attr('for') === 'loginPw' ){
						$(this).prev().text('비밀번호');
					}
				}
			});
			
			
		};
		return self;
	}(HKmember||{},jQuery));
	
	HKmember.form();
		
});
//window load
$(window).load(function(){
	//////////////
	//	menu	//
	//////////////
	var HKmobilemenu = (function(self, Check, $){
		var menu = $('a.btn_menu'),
			div = $('div.allmenu').removeClass('on'),
			li = div.find('>ul>li').removeClass('on');			
		//모바일 메뉴중 하위메뉴 있는 것들
		self.menuView = function(num){
			return li.each(function(i){
				if( i === num ){
                    if($(this).hasClass("on")) $(this).removeClass('on');
                    else
					    $(this).addClass('on');
				}else{
					$(this).removeClass('on');
				}
			});
		};
		self.init = function(){
			var bh = $('body').height();
			div.height(bh);	//resize
			
			$(window).resize(function(){
				bh =$('body').height();
				div.height(bh);					
			});
			
			menu.on('click', function(){
				div.toggleClass('on');				 
			});
			
			li.on('click', '>a', function(){
				var idx = $(this).parent().index();
				self.menuView(idx);
			});
			
		};
		
		return self;
	}(HKmobilemenu||{}, window.check , jQuery));
	
	HKmobilemenu.init();
	
	
	//layer popup

	HKlayerpopup();
	
	//tab area
	var HKtabArea = function(){
		var tablist = $('ul.tab_area > li');
		var tabscontents = $('div.search_brand > div.sel');
		
		tablist.on('click', '> a', function(e){
			e.preventDefault();
			tablist.removeClass('on');
			$(this).parent().addClass('on');
			
			$("[data-href]").hide();
			$("[data-href='" + $(this).data("target") + "']").show();
		});
		
		$('div.search_brand > div.sel > ul > li > a').on('click', function(e){ 
			e.preventDefault(); 
		});
	};
	HKtabArea();
	
	// main slider
	if( $('section.main_slide:eq(0)').length > 0 ){
		var HKmainSlide = new Hkslider($('section.main_slide:eq(0)'),5);
		HKmainSlide.move();
	}
	//slider
	if($('section.rolling_spot').length > 0 ){
		var HKMslider = new Hkslider($('section.rolling_spot'),5);
		HKMslider.move();
	}
	//search submit
	$('input#s_txt').on('keydown', function(e){
		if(e.keyCode==13 ) {
			$(this).next().trigger('click');
		}
	});
	
	
	
	
});

//common
//////////////////////
//	browserCheck	//
//////////////////////
var check = (function(self){
	self.checkCon = false;
	self.clickconfing = function(){
		var ua = navigator.userAgent.toLowerCase();
    
        if(/iPhone|iPad|iPod/i.test(navigator.userAgent) ) {
            self.checkCon = true;
        } else {            
            if (ua.indexOf("chrome") != -1) {
                self.checkCon = true;
            } else {
                self.checkCon = false;    
            }
        };
	};		
	return self;
}(check||{}));

//layer popup
function HKlayerpopup(){
	var layer = new layerload();
	
	var src =  window.location.pathname;
	var loca = src.substring(src.lastIndexOf('/') + 1, src.lastIndexOf('.'));
	
	if ( loca.search( /event/g ) === -1  ){
		var list = $('ul.bbs_list > li > a');
		list.on('click', function(e){
			e.preventDefault();
			var num = $(this).parent().data('num');
			layer.load(num);			
		});	
	}
	
	var mainlist = $('div.goods_list > ul > li > a');
	mainlist.on('click', function(e){
		e.preventDefault();
		var num = $(this).parent().data('num');
		layer.load(num);
	});
	
};
//shopping
function HKshop(){
	var sc = $('fieldset.search > a'),
		br = $('div.search_brand > a');
	
	$('fieldset.search').removeClass('on');
	var tabscontents = $('div.search_brand > div.sel');
	
	sc.on('click', function(e){
		e.preventDefault();
		$(this).parent().toggleClass('on');
	});
	br.on('click', function(e){
		e.preventDefault();
		$(this).next().toggle();
	});	
};		


//slider fadeInOut
function Hkslider( ele, sc ){
	this.ele = ele;
	this.sc = sc;
	
	var li = this.ele.find('>ul > li');
	li.slice(1).hide();
}
Hkslider.prototype.move = function(){
	var $this = this,
		btn = $this.ele.find('div.banner_page'),
		li = $this.ele.find('>ul > li'),
		timer, count=0, sc= $this.sc*1000;
		
	if( btn.find('>a').length < 2 ){
		btn.find('>a').hide();
	}else{
		setTime();
	}
	
	btn.on('click', '>a', function( e ){
		e.preventDefault();
		var idx = $(this).index();		
		btn.find('a').removeClass('on');
		$(this).addClass('on');
		
		count = idx;
		li.each(function(i){
			if ( i === idx ){
				$(this).show();
			}else{
				$(this).hide();
			}
		});
	}).on('touchstart ','>a', timeover ).on('touchend','>a', timeout );
	
	function setTime(){
		clearInterval(timer);
		timer = setInterval( rollmoving, sc );			
	};
	function timeover( e ){
		clearInterval(timer);		
	};
	function timeout( e ){
		setTime();		
	};		
	function rollmoving(){
		count++;
		count>li.length ? count=0: count;
		btn.find('>a').eq(count).trigger('click');				
	};	
};

//layer popup load
function layerload(){}
layerload.prototype.load = function( num ){	
	if( $('div.productLayer') !== undefined ){
		$('div.productLayer').remove();
	}
	$('<div class="productLayer" style="width:100%;height:100%; position:absolute;top:0%;z-index:10001;display:none"></div>').appendTo('body');
	$('div.productLayer').show();
	$.ajax({
        type: 'POST',
        url: '/m_viewProduct.do',
        data : {"prdno": num },
        dataType: 'text'
	}).done(function ( data ) {
		var cont = $(data).filter('div.layer_area');
		var result = $('div.productLayer').html(cont);
		var close = result.find('div.goods_view > a.close');
		
		result.find('div.goods_view').wrapAll('<div class="conts" />');
		var goodshei = result.find('div.goods_view').height() + 70;
		$('div.conts').css('height', goodshei+'px' ).wrap('<div id="wscroll" />');
		
		check.clickconfing();
		$('div#wscroll').height($(window).height());		
		var myScroll = new IScroll( '#wscroll' , {  click: check.checkCon, bounce: false, resize: true });		
		myScroll.on('scrollStart',function(){			
			$('div.productLayer').css('top') !== '0px' ? $('div.productLayer').css('top',$(window).scrollTop()+'px') : $('div.productLayer').css('top',$(window).scrollTop()+'px');
		});	
		$('div.productLayer').css('top', $(window).scrollTop()+'px').height($(window).height()+200);
		$(window).scroll(function(){
			$('div.productLayer').css('top', $(this).scrollTop()+'px').height($(window).height()+200);
		});
		close.css({
			right:'1px',
			top:'2px',
			width:'35px',
			height:'35px'
		});
		close.on('click', function( e ){
    		e.preventDefault();
    		$('div.productLayer').remove();
    		$("body").removeAttr('style');
    	});
    	
	}).fail(function( jqXHR, textStatus ) {
		$('div.productLayer').remove();
	});
};

