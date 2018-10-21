
// 쿠키 생성
function setCookie(cName, cValue, cDay){
    var expire = new Date();
    expire.setDate(expire.getDate() + cDay);
    cookies = cName + '=' + escape(cValue) + '; path=/ '; // 한글 깨짐을 막기위해 escape(cValue)를 합니다.
    if(typeof cDay != 'undefined') cookies += ';expires=' + expire.toGMTString() + ';';
        document.cookie = cookies;
    }
 
    // 쿠키 가져오기
function getCookie(cName) {
    cName = cName + '=';
    var cookieData = document.cookie;
    var start = cookieData.indexOf(cName);
    var cValue = '';
    if(start != -1){
        start += cName.length;
        var end = cookieData.indexOf(';', start);
        if(end == -1)end = cookieData.length;
        cValue = cookieData.substring(start, end);
    }
    return unescape(cValue);
}
//check browser
function getBrowserType(){          
    var _ua = navigator.userAgent;
    var rv = -1;     
    //IE 11,10,9,8
    var trident = _ua.match(/Trident\/(\d.\d)/i);
    if( trident != null )
    {
        if( trident[1] == "7.0" ) return rv = "IE" + 11;
        if( trident[1] == "6.0" ) return rv = "IE" + 10;
        if( trident[1] == "5.0" ) return rv = "IE" + 9;
        if( trident[1] == "4.0" ) return rv = "IE" + 8;        
    }
    //other
    var agt = _ua.toLowerCase();    
    if (agt.indexOf("chrome") != -1) return 'Chrome';
    if (agt.indexOf("opera") != -1) return 'Opera'; 
    if (agt.indexOf("staroffice") != -1) return 'Star Office'; 
    if (agt.indexOf("webtv") != -1) return 'WebTV'; 
    if (agt.indexOf("beonex") != -1) return 'Beonex'; 
    if (agt.indexOf("chimera") != -1) return 'Chimera'; 
    if (agt.indexOf("netpositive") != -1) return 'NetPositive'; 
    if (agt.indexOf("phoenix") != -1) return 'Phoenix'; 
    if (agt.indexOf("firefox") != -1) return 'Firefox'; 
    if (agt.indexOf("safari") != -1) return 'Safari'; 
    if (agt.indexOf("skipstone") != -1) return 'SkipStone'; 
    if (agt.indexOf("netscape") != -1) return 'Netscape'; 
    if (agt.indexOf("mozilla/5.0") != -1) return 'Mozilla';
    if ( trident == null ) return rv = "IE" + 7;
}
"use strict";
$(document).ready(function(){	
	if( getBrowserType() === "IE7" || getBrowserType() === "IE8" ){
		if( !getCookie('ie') ){
			$.when( $.ajax('../html/upgrade.html') ).done( setBrowser ).fail(function( jqXHR, textStatus, error ) { });
		}				
	}
	function setBrowser(data){
		var dom = $(data).filter('div').find('.layerPop');
		dom.css('position','fixed');
		dom.appendTo('body');		
		dom.find('.closePop').on('click', function(e){
			e.preventDefault();			
			dom.hide();
			setCookie('ie', 'isie', 1);
		});
	}
	(new Image()).src = "../assets/img/main/bg_main_1.jpg";	
	(new Image()).src = "../assets/img/main/bg_main_2.jpg";	
	(new Image()).src = "../assets/img/main/bg_main_3.jpg";
});
$(window).load(function() {	
	inputIMG.init();	
	//sign up step1 all agree
	$('div.agree_all').find('input').on('change', function(e){
		var others = $('div.twoBlock').find('input');		
		$(this).prop('checked') ? others.prop('checked', true ) : others.prop('checked', false );
	});
	$('div.twoBlock').find('input').on('change', function(e){
		if( !$(this).prop('checked') ){ $('div.agree_all').find('input').prop('checked', false ); }
		if( $('div.twoBlock').find('input:checked').length > 1 ){ $('div.agree_all').find('input').prop('checked', true ); }
	});
	//tab	
	if( $('div.tabArea').hasClass('scrolling') ){
		$('div.tabArea').removeClass('scrolling');		
	}
	var tabTop;
	if( $('div.tabArea').length > 0 ){
		tabTop = $('div.tabArea').offset().top;
	}
	//maison store slide
	if( $('ul.storeList').length > 0 ){
		$('ul.storeList li').each(function(i){
			$(this).css('left', $(this).width()*i+'px' );
		});
		$('.btnArea >a').on('click', function(e){
			e.preventDefault();
			var idx = $('ul.storeList li').filter(function(){ if($(this).css('left') == '0px' ) return $(this); }).index();
			var cur = 0;			
			if( $('ul.storeList li').is(":animated") ) return false;
			if( $(this).hasClass('next') ){
				$('ul.storeList li').not(":eq("+idx+")").css('left', $('ul.storeList li').width() +'px' );
				$('ul.storeList li').eq(idx).stop().animate({ 'left': - $('ul.storeList li').width() +'px' });
				cur = idx+1 > $('ul.storeList li').length-1 ? cur = 0 : cur = idx+1;				
			}else{
				$('ul.storeList li').not(":eq("+idx+")").css('left', -$('ul.storeList li').width() +'px' );
				$('ul.storeList li').eq(idx).stop().animate({ 'left': $('ul.storeList li').width() +'px' });
				cur = idx-1 < 0 ? cur = $('ul.storeList li').length-1 : cur = idx-1;				
			}
			$('ul.storeList li').eq(cur).animate({ 'left': '0px' });
		});
	}
	//scrolling	
	vikingVisual.movement();
	if( $(window).scrollTop() < 2){
		vikingVisual.play();		
	}	
	leftFloatCss($(window).scrollTop());
	$(window).scroll(function(e){
		var t = $(window).scrollTop();
		vikingVisual.bb(t);		
		if( t < 2 ){			
   			if( !vikingVisual.settime && !vikingVisual.playCheck ){
   				vikingVisual.play();   				
   			}
   		}else{    	
   			$('div.subGnb').hide();		
   			vikingVisual.stop();   			
   		}
   		leftFloatCss(t);
		if( t > tabTop ){
			$('div.tabArea').addClass('scrolling');
		}else{
			$('div.tabArea').removeClass('scrolling');
		}
	});
	function leftFloatCss(t){
		if( $('div.mainArea').length > 0 ){
   			$('div.mainArea > div').each(function(i){
	   			if( $(this).offset().top < parseInt($(window).height()/2.5)+t ){
	   				$('.quickBar > a').removeClass('on');
					$('.quickBar > a').eq(i).addClass('on');
	   			}
	   		});
   		}   
	}
	//wheel	
	var contents = $('div[class^="con"]') , d = 0 , current = 0 , viewcont, cHa = [];
	contents.each(function(z){
		cHa.push( $(this).height() );
	});
	$(window).on('mousewheel DOMMouseScroll', function(event){
		if( $('.mainArea').length > 0  ){			
			if ( event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0 ) { //detail - ff	        
		        d = -1;
		    }
		    else {	        
		        d = 1;
		    }
		    var s = Math.min.apply( Math, cHa ); 
		    if( s < $(window).height() ){		    	
		    	contentsMovement();
		    }
		}
	});
	
	function contentsMovement(){
    	contents.each(function(i){
        	if( Math.round($(this).offset().top) === $(window).scrollTop() ){
        		return current = i;
        	}else{
				if( i === 0 && d === 1 ){
        			if( Math.round($(this).offset().top) +1 == $(window).scrollTop()  ) //why? -1
        			{        				
        				return current = i;
        			}
        		}        		
        		if( (i === contents.length-1 && d === -1) || (i === contents.length-1 && d === 1) ){
        			if( Math.round($(this).offset().top) - $(window).scrollTop() < contents.eq( contents.length - contents.length-2 ).height() ){        				
        				return current = i;
        			}
        		}				
        	}        	
        });
        try{        	
        	if( !$('body,html').is(":animated") ){        		
				$('body,html').stop().animate({'scrollTop': Math.round($(contents[current+d]).offset().top)+'px' }, {
					duration: 500, 
					easing: "easeOutCirc", 
					complete: function(){
        				viewcont = $(contents[current+d]);
        			}
        		});
        	}else{
        		$(window).one('mousewheel DOMMouseScroll', function(event){
	    			event.preventDefault();
	    		});
        	}
        	$(window).resize( function(){        		
        		if( viewcont ){
        			$(window).scrollTop(  Math.round(viewcont.offset().top)  );
        		}
        		
        	});
        }catch(e){ }
    }   
	//gnb
	VikingGNB.init();
	//main
	vikingVisual.init();
	//store
	vikingsStore.init();
});

//input Background image / faq
(function($){
	var module = window.inputIMG = {};
	$('input').focus(function(){ $(this).css({'outline':'none'}); });
	$('textarea').focus(function(){ $(this).css({'outline':'none'}); });
	module.loop = function( ele ){
		switch ( ele.attr('title') ){
			case '아이디': ele.css('background-image', 'url(../assets/img/bg_id_1.png)');
			break;
			case '비밀번호': ele.css('background-image', 'url(../assets/img/bg_pw_1.png)');
			break;
			case '비밀번호 확인': ele.css('background-image', 'url(../assets/img/bg_pw_2.png)');
			break;
			case '이메일 아이디': ele.css('background-image', 'url(../assets/img/bg_email_1.png)');
			break;
			case '주소': ele.css('background-image', 'url(../assets/img/bg_add_1.png)');
			break;
			case '상세주소': ele.css('background-image', 'url(../assets/img/bg_add_2.png)');
			break;
			case '이름': ele.css('background-image', 'url(../assets/img/bg_name_1.png)');
			break;
			case '이메일': ele.css('background-image', 'url(../assets/img/bg_email_2.png)');
			break;
			case '제목': ele.css('background-image', 'url(../assets/img/bg_title_1.png)');
			break;
			case '카드번호 앞 4자리': ele.css('background-image', 'url(../assets/img/bg_cardnum_1.png)');
			break;
			case '카드번호 중간 4자리': ele.css('background-image', 'url(../assets/img/bg_cardnum_2.png)');
			break;
			case '카드번호 뒤 4자리': ele.css('background-image', 'url(../assets/img/bg_cardnum_3.png)');
			break;
			default: ele.css('background-image', '');
			break;
		}
	};	 
	module.init = function(){		
		var inputInBg = $('input').filter(function(i){ if( $(this).css('background-image') !=='none' ){ return $(this); } });		
		inputInBg.on('focus', function(e){			
			$(this).css({'background-image': '' });			
		}).on('blur change', function(e){			
			if( $(this).val().length === 0 ){
				module.loop( $(this) );
			}else{
				$(this).css('background-image','');
			}
		});
		inputInBg.each(function(i){			
			if( $(this).val() !== "" ){
				$(this).trigger("change");
			}
		});
		$('.inqWrite>textarea').on('focus', function(e){			
			$(this).css({'background-image': '' });			
		}).on('blur change', function(e){			
			if( $(this).val().length === 0 ){
				$(this).css('background-image', 'url(../assets/img/bg_content_1.png)');
			}else{
				$(this).css('background-image','');
			}
		});		
		if( $('.inqWrite>textarea').val() !== "" ){
			$('.inqWrite>textarea').css('background-image','');
		}
		// faq
		$(document).on('click', '.faqList > dt > a', function(e){
			e.preventDefault();
			var idx = $(this).parent().index('dt');
			$('.faqList > dt').removeClass('on');			
			$(this).parent().addClass('on');				
			$('.faqList > dd').each(function(i){				
				if( i === (idx) ){
					if( $(this).is(':visible') ){
						$(this).prev().removeClass('on');
						$(this).slideUp(250);
					}else{
						$(this).prev().addClass('on');
						$(this).slideDown(250);
					}					
				}else{
					$(this).slideUp(250);
				}
			});
		});
	};
}(jQuery));

//GNB 
(function($){                 
	var module = window.VikingGNB = {};
	var gnb, depth, box;
	module.set = function(){
		gnb = $('div.gnb>.inner>.menu');		
		depth = $('div.subGnb');
		depth.hide();		
		gnb.find('li').removeClass('on');
		if( $('li.global').hasClass('on') ){
			$('li.global').removeClass('on');
		}
	};
	module.tab = function(){
		gnb.find('li').each(function(i){			
			$(this).find('a').on('keydown', function(e){		
				depth.find('>ul>li').find('ul').removeAttr('tabindex');
				if( e.keyCode === 9 ){					
					if( !e.shiftKey ){						
						depth.find('>ul>li').eq(i).find('ul').attr('tabindex','0').focus();	
					}
				}
			});
		});		
		depth.find('>ul>li').each(function(k){			
			var ls = $(this).find('>ul>li').last();
			ls.find('a').on('keydown', function(e){
				gnb.find('li').removeAttr('tabindex');
				if( e.keyCode === 9 ){
					if( !e.shiftKey ){						
						gnb.find('li').eq(k+1).attr('tabindex','0').focus();
					}
				}
			});
		});
		
	};
	module.pageon = function( page ){
		var pagearr = ['story','storetype','member', 'service', 'event'], src = window.location.pathname;
		if( page ){
			gnb.find('li').removeClass('on');
			gnb.find('li').eq(page).addClass('on');
			depth.find('>ul>li').removeClass('on');
			//depth.find('>ul>li').eq(i).addClass('on');
		}else{
			gnb.find('li').removeClass('on');
			//depth.find('>ul>li').find('strong').removeClass('on');
			for( var i in pagearr ){				
				if ( src.split('/').indexOf(pagearr[i]) ){
					depth.find('>ul>li').eq(i).addClass('on');	
					gnb.find('li').eq(i).addClass('on');
					if( pagearr[i] == 'member' ){
						gnb.find('li').removeClass('on');
						depth.find('>ul>li').removeClass('on');						
						if( src.split('/')[src.split('/').length-1].indexOf('benefit') === 0 || src.split('/')[src.split('/').length-1].indexOf('membership') === 0 || src.split('/')[src.split('/').length-1].indexOf('mypoint') === 0 ){
							depth.find('>ul>li').eq(i).addClass('on');	
							gnb.find('li').eq(i).addClass('on');
						}
					}					
				}
			}
		}
		
	};
	module.init = function(){
		module.set();
		module.pageon();
		module.tab();	
		var ddd = false;
		$('.gnb').css('padding-bottom','0px');
		gnb.height(45);
		$('li.global > a').on('mousedown focus', function(e){		e.preventDefault();	$(this).parent().toggleClass('on');		});
		gnb.find('li > a').on('focus', function(e){		depth.slideDown();		});
		gnb.on('mouseenter', function(e){		ddd = true;depth.slideDown();		});
		//$('div.gnb').on('mouseenter', function(e){		ddd = true; depth.slideDown();		});
		//depth.on('mouseleave', function(e){			depth.stop().slideUp(300); 		});
		depth.on('mouseleave', function(e){			if(!ddd){depth.stop().slideUp(300);  }		});
		depth.find('a').on('mouseenter', function(e){		ddd = false;  		});
		$('.quickBar a:first').on('focus', function(e){		depth.stop().slideUp(300);		});
		
		$('div.utility').on('mouseenter focus', function(e){			depth.stop().slideUp(300);		});
		$('a.home').on('focus', function(e){			depth.stop().slideUp(300);		});
		$('a.logo').on('focus', function(e){			$('li.global').removeClass('on'); depth.stop().slideUp(300);		});
		$('li.member>a').on('focus', function(e){			$('li.global').removeClass('on');		});
		$('div.location > a').first().on('focus', function(e){			depth.slideUp(300);		});
		$('p.des').on('mouseenter', function(e){			depth.stop().slideUp(300);		});
		depth.find('>ul>li>ul>li>a').on('click', function(e){			
			depth.find('>ul>li>ul>li').removeClass('on');
			$(this).parent().addClass('on');
		});
	};
	
}(jQuery)); 

//main
(function($){                 
	var module = window.vikingVisual = {};	
	module.bb = function( scTop ){
		var bg = $("div[class*='mainBg']").not(':hidden'),
			opacityVal = (scTop / 500.0);		
   		bg.find('.imgBlur').css('opacity', opacityVal);   		
	};
	module.cont = function(){
		var icl = 0;
		if( $('div.mainArea > div.con1').length > 0 ){
			contstart();
			menu();			
			$(window).resize(function(){
				contstart();
				//quick menu
				var right = ($(window).width()-1600)/2;
				if( $(window).width() > 1600 ){
					$('.quickBar').css('right',right+'px');
					$('.facebookLink').css('right',right+60+'px');
				}else{
					$('.quickBar').css('right','0px');
					$('.facebookLink').css('right','60px');
				}
				$('.quickBar').show();
        		$(window).scrollTop(  Math.round( $('div[class^="con"]').eq(icl).offset().top)  );
				
			});
			if( $(window).width() > 1600 ){
				$('.quickBar').css('right',($(window).width()-1600)/2+'px');
				$('.facebookLink').css('right',(($(window).width()-1600)/2)+60+'px');
				$('.quickBar').show();
			}else{
				$('.quickBar').css('right','0px');
				$('.facebookLink').css('right','60px');
				$('.quickBar').show();
			}
		}
		$('.quickBar > a').on('click', function(e){
			e.preventDefault();			
			var idx = $(this).index();
			if( idx < 4 ){
				icl = idx;
				$('body,html').animate({ 'scrollTop': Math.round( $('div[class^="con"]').eq(idx).offset().top )+'px' },{
						duration: 500, 
						easing: "easeOutCirc"
	        		});
			}			
		});
		var quickCheck = false;
		$('.quickBar > a').last().on('mouseenter', function(){			
			$('.facebookLink').fadeIn();
		}).on('mouseleave', function(){
			setTimeout( function(){
				if( !quickCheck ){
					$('.facebookLink').hide();
				}			
			},200);
		});
		$('.facebookLink >a').on('mouseenter', function(){
			quickCheck = true;
			$('.facebookLink').show();
		}).on('mouseleave', function(){
			quickCheck = false;
			$('.facebookLink').hide();
		});
		function contstart(){
			var div = $('div.mainArea > div.con1');
			//img size limit
			//if( $(window).height() < 905 ){
				div.height( $(window).height() );
			//}			
		}
		function menu(){
			var lis = $('div#menu > ul a');					
			lis.each(function(i){
				$(this).find('.imgDefault').css({
					'display': 'block',				
					'overflow':'hidden',
					'height': ($(this).find('img').height())+'px',
					'width': ($(this).find('img').width())+'px'
				});
			});
			if( getBrowserType() ==='IE9' || getBrowserType() ==='IE8' ){
				isie9();
			}else{
				notie9();				
			}
			function notie9(){
				lis.find('.imgHover').css({	'display':'block','-webkit-transition-duration':'0.5s',	'-moz-transition-duration':'0.5s','-ms-transition-duration':'0.5s','transition-duration':'0.5s'	});	
				lis.hover(function(){
					var ov = $(this).find('.imgHover'),
						df = $(this).find('.imgDefault');
					df.find('>img').css({'-webkit-transition-duration':'1s','-webkit-transform': 'scale(1.1,1.1)','-moz-transition-duration':'1s','-moz-transform': 'scale(1.1,1.1)','transition-duration':'1s','transform': 'scale(1.1,1.1)'});				
					ov.css({'opacity': '1'});
				}, function(){
					var ov = $(this).find('.imgHover'),
						df = $(this).find('.imgDefault');
					df.find('>img').css({'-webkit-transition-duration':'1s','-webkit-transform': 'scale(1,1)','-moz-transition-duration':'1s','-moz-transform': 'scale(1,1)','transition-duration':'1s','transform': 'scale(1,1)'});				
					ov.css({'opacity': '0'});
				});
			}
			function isie9(){
				lis.find('.imgHover').css('opacity','0');
				lis.hover(function(){
					var ov = $(this).find('.imgHover'),
						df = $(this).find('.imgDefault');						
					ov.animate({ 'opacity': 1}, 500);
					df.find('>img').animate({
						'width': '110%',
						'margin-left': -(parseInt(df.find('>img').width()*1.1/2) - (df.width()/2) ) +'px',
						'margin-top': -(parseInt(df.find('>img').height()*1.1/2) - (df.height()/2) )+'px'
					},600);					
				}, function(){
					var ov = $(this).find('.imgHover'),
						df = $(this).find('.imgDefault');
					ov.stop().animate({ 'opacity': 0}, 200);
					df.find('>img').stop().animate({
						'width': '100%','margin-left':'0px','margin-top':'0px'
					},300);
				});
			}
			
		}
		
	};	
	module.event = function(){
		if ($('#eventNews').length > 0 ){
			eventnewsRoll();
		}
		function eventnewsRoll(){
			var dot = $('#eventNews > div:eq(0) > div.bannerPaging > a'),
				arrow = $('#eventNews > div:eq(0) > a'),
				ul = $('#eventNews > div:eq(0) > div.bannerArea > ul');
			$('#eventNews > div:eq(0) > div.bannerPaging').empty();
			if( ul.find('li').length > 1 ){
				ul.find('li').each(function(i){
					$(this).attr('data-list', i );
					//if( dot.length ){				
						$('#eventNews > div:eq(0) > div.bannerPaging').append('<a href="#" class="page'+i+'"><span class="hiddenConts">'+(i+1)+'번째 배너 목록</span></a>');
					//}				
				});
			}
			if( ul.find('li').length < 2 ){
				arrow.remove();
			}
			
			dot = $('#eventNews > div:eq(0) > div.bannerPaging > a');
			dot.eq(0).addClass('on');
			var count = 0, arrowDir, arrowCh = false;
			arrow.on('click', function(e){				
				e.preventDefault();
				arrowCh = true;				
				if( ul.find('li').length > 1 ){
					if( !ul.is(':animated') ){
						if( $(this).hasClass('btnNext') ){
							count++;
							count > ul.find('>li').length-1 ? count = 0 : count;
							arrowDir = 'right';
						}else{
							count--;
							count < 0 ? count = ul.find('>li').length-1 : count;
							arrowDir = 'left';
						}				
						dot.eq(count).trigger('click');					
					}	
				}
							
			});
			dot.on('click', function(e){
				e.preventDefault();
				if( ul.find('li').length > 1 ){
					if( !ul.is(':animated') ){
						var idx = $(this).index(), dotDir; 
						count = idx;
						dot.removeClass('on');
						$(this).addClass('on');
						if( idx !== ul.find('li').first().data('list') ){						
							ul.find('li').first().data('list') < idx ? dotDir = 'right': dotDir = 'left';
							if( dotDir && !arrowCh ){							
								listMovement( idx , dotDir );
							}
							if( arrowCh ){							
								listMovement( idx , arrowDir );							
								dotDir = null;
							}
							arrowCh = false;
						}
					}
				}
				
			});			
			function listMovement( idx , dir ){
				var m = 0;
				if( dir == 'left' ){
					ul.find('li').filter(function(){ if( $(this).data('list') === idx ){ return $(this); } }).insertBefore(ul.find('li').first());
					ul.css('margin-left','-890px');
					m = 0;
				}else{
					m = -890;
				}
				if( ul.find('li').length > 2 && dir == 'right' ){
					ul.find('li').filter(function(){ if( $(this).data('list') === idx ){ return $(this); } }).insertAfter(ul.find('li').first());	
				}				
				ul.animate({ 'margin-left': m+'px' }, 600 , function(){					
					if( dir == 'right' ){
						ul.find('li').length < 3 ? ul.find('li').first().insertAfter( ul.find('li').last() ) : ul.find('li').first().insertBefore( ul.find('li').last() );
						ul.css('margin-left','0px');
					}
				});
			}
		}
	};
	
	module.init = function(){                     
		module.bb($(window).scrollTop());
		module.cont();
		module.event();		
	};             
}(jQuery));
//linked vikingsVisual
(function ($, window, visualtime) {
	visualtime.settime;	
	visualtime.setcur = 0;
	visualtime.dot = $('div.con1 > .brandPaging > a[class^="page"]');
	visualtime.arrow = $('div.con1 > a');
	visualtime.btn = $('div.con1 > .brandPaging > a[class^="btn"]');
	visualtime.playCheck = false;
	visualtime.stop = function(){
		clearInterval(visualtime.settime);
		$('div.con1 > .brandPaging > a.btnStop').addClass('off');
		$('div.con1 > .brandPaging > a.btnPlay').removeClass('off');
		visualtime.settime = null;		
	};
	visualtime.play = function(){		
		$('div.con1 > .brandPaging > a.btnStop').removeClass('off');
		$('div.con1 > .brandPaging > a.btnPlay').addClass('off');
		visualtime.settime = setInterval( function(){			
			$("div[class*='mainBg']").find('.imgBlur').css('opacity','0');
			visualtime.setcur++;
			visualtime.setcur > visualtime.dot.length-1 ? visualtime.setcur = 0: visualtime.setcur;
			visualtime.dot.eq(visualtime.setcur).trigger('click');  
		}, 8000);		
	};
	visualtime.movement = function(){
		//logos
		$('.brandArea > li').css('float','');
		$('.brandArea > li').css('position','absolute');
		$('.brandArea > li').not(':first').hide();
		visualtime.btn.on('click', function(e){
			e.preventDefault();
			if( $(window).scrollTop() < 2 ){				
				if( $(this).hasClass('btnStop') ){						
					visualtime.stop();
					visualtime.playCheck = true;
				}else{
					if( !visualtime.settime ){						
	   					visualtime.play();
	   					visualtime.playCheck = false;
	   				}
				}
			}
			
		});
		visualtime.dot.on('click', function(e){
			e.preventDefault();
			if( $("div[class*='mainBg']").not(":animated").length > 2 ){
				var idx = $(this).index('a[class^="page"]');
				visualtime.setcur = idx;
				visualtime.dot.removeClass('on');
				$(this).addClass('on');
				var vop = $("div[class*='mainBg']").not(':hidden').find('.imgBlur').css('opacity');			
				if( $(window).scrollTop() > 0 ){
					$("div[class*='mainBg']").eq(idx).find('.imgBlur').css('opacity',vop );
				}
				if( $("div[class*='mainBg']").eq(idx).is(':hidden') ){				
					$("div[class*='mainBg']").fadeOut(900);
					$("div[class*='mainBg']").eq(idx).stop().fadeIn(700);
					$(".brandArea > li").fadeOut(600);
					$(".brandArea > li").eq(idx).stop().fadeIn(500);
				}
			}					
		});
		visualtime.arrow.on('click',function(e){
			e.preventDefault();
			if( $("div[class*='mainBg']").not(":animated").length > 2 ){
				if( $(this).hasClass('btnNext') ){ //right
					visualtime.setcur++;
					visualtime.setcur > visualtime.dot.length-1 ? visualtime.setcur = 0: visualtime.setcur;
				}else{
					visualtime.setcur--;
					visualtime.setcur < 0 ? visualtime.setcur = visualtime.dot.length-1: visualtime.setcur;
				}				
				visualtime.dot.eq(visualtime.setcur).trigger('click');
			}
			if( visualtime.settime ){
				visualtime.stop();
			}
			
		});
		
	};
}(jQuery, window, window.vikingVisual));


//geolocation
(function($){                 
	var module = window.vikingsStore = {};	
	module.defaultSelect = function(){
   		var df;
        if( $('div.storeArea').find('div.result>ul>li').length > 1 ){
        	df = $('div.storeArea').find('div.result>ul>li').filter(function(i){
	        	if( $(this).data('idx') == 20 || $(this).data('idx') == 40 || $(this).data('idx') == 25 || $(this).data('idx') == 48 ){
	        		return this;
	        	}
	        }).find('a');
        }else{
        	df = $('div.storeArea').find('div.result>ul>li').first().find('a');
        }
        df.trigger('click');
        $('div.result').scrollTop(df.parent().offset().top - 721);
   	};
	module.initialize = function( x , y) {
        var mapLocation = new google.maps.LatLng(x, y); // 지도에서 가운데로 위치할 위도와 경도     
         
        var mapOptions = {
          center: mapLocation, // 지도에서 가운데로 위치할 위도와 경도(변수)
          zoom: 16, // 지도 zoom단계
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        $('div.map').attr('id','map-canvas');
    	var map = new google.maps.Map(document.getElementById("map-canvas"), // id: map-canvas, body에 있는 div태그의 id와 같아야 함
            mapOptions);       
   		if (brand_cd = "V001" ) {
	       	var image = '../assets/img/service/marker2.png';       	
	    } else if (brand_cd = "V002") {	        
	        var image = '../assets/img/service/marker.png';
	    } else { var image = '../assets/img/service/ico_store_1.png'; 
		}
         
        var marker;
        marker = new google.maps.Marker({
               position: mapLocation, // 마커가 위치할 위도와 경도(변수)
               map: map,
               icon: image,
               title: 'vikings' 
        });         
   	};   	
   	
   	module.mylocation = function(){
   		if (navigator.geolocation) {
	       	navigator.geolocation.getCurrentPosition(showPosition);	       	
	    } else {	        
	        module.defaultSelect();   
	    }	    
	    function toRad(Value) {
		    /** Converts numeric degrees to radians */
		    return Value * Math.PI / 180;
		}
		function CalcDistanceBetween(lat1, lon1, lat2, lon2) {
		    //Radius of the earth in:  1.609344 miles,  6371 km  | var R = (6371 / 1.609344);
		    var R = 3958.7558657440545; // Radius of earth in Miles 
		    var dLat = toRad(lat2-lat1);
		    var dLon = toRad(lon2-lon1); 
		    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
		            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * 
		            Math.sin(dLon/2) * Math.sin(dLon/2); 
		    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
		    var d = R * c;
		    return d;
		}
	    function showPosition(position) {
	    	var x = position.coords.latitude;
	    	var y = position.coords.longitude;	    	
	    	console.log( x+" : "+y);
	    	//select code	    	
	    	var z = [];
	    	var minindex = 0;
	    	$('div.storeArea').find('div.result>ul>li').each(function(i){
	    		z.push( CalcDistanceBetween( x, y, $(this).data('lat'), $(this).data('lon') ) );	    		    		
	    	});	    	
	    	minindex = z.indexOf(Math.min.apply(Math, z));
	    	$('div.storeArea').find('div.result>ul>li').eq(minindex).find('a').trigger('click');	    	
	    	$('div.result').scrollTop( ($('div.storeArea').find('div.result>ul>li').eq(minindex).offset().top -160 ));
		}
		
   	};
   	module.phone = function(){
   		//$('div.infoArea>div>a.phoneNum').css('cursor','initial');
   		$('div.infoArea>div>a.phoneNum').attr('href', 'tel:'+ $('div.infoArea>div>a.phoneNum').text().replace( /[~!\#$^&*\=+|:;?"<,.>'\s]/g, '') );
   		if (navigator.userAgent.match(/iPhone|iPod|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i) != null || navigator.userAgent.match(/LG|SAMSUNG|Samsung/) != null){
   			$('div.infoArea>div>a.phoneNum').off('click');
   			$('ul.storeArea2 span.call a').off('click');
   		}else{	   			
   			$('div.infoArea>div>a.phoneNum').on('click', function(e){
	   			e.preventDefault();
	   		});
	   		$('ul.storeArea2 span.call a').on('click', function(e){
	   			e.preventDefault();
	   		});
   		}	
   	};
   	module.loadAf = function(){
   		var onTab = $('ul.brandTab > li.on').index();   		
		$('div.map').attr('id','map-canvas');			
		module.defaultSelect();
   	};
	module.init = function(){		
		if( $('div.map').length > 0 ){	   		
	   		$(document).on('click', 'div.result>ul>li > a' , function(e){
	   			e.preventDefault();
	   			$('div.storeArea').find('div.result>ul>li').removeClass('on');
	   			$(this).parent().addClass('on');
	   			if( $(this).parent().data('on') ){
	   				module.initialize( $(this).parent().data('lat'), $(this).parent().data('on') );
	   			}else{
	   				module.initialize( $(this).parent().data('lat'), $(this).parent().data('lon') );
	   			}	   			
	   		});	   		
			$('ul.storeArea2 > li > a').on('click', function(e){
				e.preventDefault();
				var idx = $(this).parent().index();
				window.open('../html/maps'+(idx+1)+'.html','', 'width=700, height=500');
			});			
			$('ul.storeArea2 span.call a').css('cursor','default');
			var lo = window.location.href.split("?");			
			$('div.storeArea').find('div.result>ul>li').promise().done(function(){				
				module.defaultSelect();
				module.mylocation();				
			});			
		}
	};
}(jQuery));


