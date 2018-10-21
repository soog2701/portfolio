
//pc ver.
"use strict";


//cookie
/**
 * cookie
 * @createCookie(name,value,days)
 * @readCookie(name)
 * @eraseCookie(name)
 */
function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function eraseCookie(name) {
	createCookie(name,"",-1);
}

$(window).on("load", function() {	
	gspLayout.init();
	gspCompany.init();
	
	gspMain.init();
	gspCareer.init();
	
	if( $('.snsList').length > 0 ){
		//SOCIAL LOUNGE
		var snsList =  $('.snsList').masonry({
			percentPosition: true,
			columnWidth: '.boxSection',
			itemSelector: '.boxSection',
			transitionDuration: 0   //set animation duration 0 
		});
		/*
		$('.btnMore').on('click', function(e){		//more
			e.preventDefault();
			var elem = $('.snsList').contents().filter(":lt(4)").clone().removeAttr('style');
			snsList.append(elem).masonry('appended', elem).masonry();
		});
		*/	
	}
	$('.snsTab li:gt(6)').not(':last').hide();
	$(document).on('click', '.lounge li.ex a', function(e){
		e.preventDefault();		
		if( $('.snsTab li').length < 9 ) return false;
		if( $(this).hasClass('on') ){
			$(this).removeClass('on');			
			$('.snsTab li:gt(6)').not(':last').hide();	
		}else{
			$(this).addClass('on');
			$('.snsTab li:gt(6)').show();			
		}
	});
	
	//business
	if( $('.navBestsell').length > 0 ){
		var current = 0;		
		var sum = 0, sum5 = 0;
		setTimeout(function(){
			$('.yearList li').each(function(i){
				sum = sum + parseInt($(this).width());
				if( 5 > i ){
					sum5 = sum5 + parseInt($(this).width());
				}
			});		
			$('.yearList li').length > 5 ? $('.yearList').width(sum5-40): $('.yearList').width(sum5);
			$('.yearList ul').width(sum+5);
			if( sum5 > 468 ){
				$('.navBestsell').width( (202 + (sum5)) );
			}
		},100);		
		if( $('.yearList li').length < 6 ){ 			
			$('.navBestsell >a').filter('.btnPrev').addClass('end');
			$('.navBestsell >a').filter('.btnNext').addClass('end');
		}else{
			$('.navBestsell >a').filter('.btnPrev').addClass('end');
			$('.navBestsell >a').filter('.btnNext').removeClass('end');
		}
		$('.navBestsell >a').on('click', function(e){
			e.preventDefault();
			var cidx = 0;
			if( $('.yearList ul').width() > $('.yearList').width() && $('.yearList li').length > 5 ){				
				if( $(this).hasClass('btnPrev') ){
					current--;
					current < 0 ? current = 0 : current;
				}else{
					current++;
					current > $('.yearList li').length-4 ? current = $('.yearList li').length-4 : current;
				}
				$('.yearList li').each(function(i){					
					if( current > i ){
						cidx = cidx + parseInt($(this).width());
					}
				});
				$('.yearList ul').animate({'margin-left': -cidx+'px'}, function(){
					if( current == 0 ){ 
						$('.navBestsell >a').filter('.btnPrev').addClass('end');
					}else if( current == $('.yearList li').length-4 ){ 
						$('.navBestsell >a').filter('.btnNext').addClass('end');
					}else{  
						$('.navBestsell >a').filter('.btnPrev').removeClass('end'); 
						$('.navBestsell >a').filter('.btnNext').removeClass('end');
					}
				});
			}			
		});
	}
	//ir 
	if( $('.performance').length > 0 || $('.corpinfo').length > 0 || $('h1').text().match(/(입점안내)/) ){
		
		$(document).on('click', '.corpinfoList>li>a', function(e){	//기업정보
			e.preventDefault();
			$(this).toggleClass('on');		
			$(this).parent().siblings().find('a').removeClass('on');
			$(this).next('.infoA').slideToggle(250);
			$(this).parent().siblings().find('.infoA').slideUp(250);
		});
	}
	//10-28
	//tabType1 tab btn
	$('.tabType1 a').on('click', function(e){	//tabtype 1
		//e.preventDefault();		
		var idx = $(this).parent().index();
		$(this).parent().siblings().removeClass('on');
		$(this).parent().addClass('on');		
		if( $('h1').text().match(/(입점안내)/) ){
			e.preventDefault();	
			$(this).closest(".conDetail").find('.tabCont').hide();
			$(this).closest(".conDetail").find('.tabCont').eq(idx).show();			
		}
	});
});
$(document).ready(function(){	
	//jquery form stylish select
	$('.selectBox').sSelect();	
	
	// 2015-11-10 SELECTBOX ERROR CSS 추가
	$("select.error_selectBox").each(function(){
		$(this).next("div .select-list-box").addClass("error_selectBox");
	});
	
	//sharing
	gspSharing.init();
	//title text 	
	if(  $('#content > .conTitle > h1').length > 0 ){
		var tit = $('head > title').text();
		$('head > title').text( $('#content > .conTitle > h1').text()+" - "+ tit );
	}
	
	//main layer popup
	var checkcookieBanner = readCookie('checkcookieBanner');
	if( checkcookieBanner ){
		$('.popup').hide();
	}else{		
		if( $('.popup').length > 0 ){	
			$('.popup').show();
			//if( $('.popcon').height() > 420 ){				
				//$('.popcon').css({'overflow-y':'scroll', 'height':'420px'});
			//}			
			$('.popgid .close').on('click', function(e){
				e.preventDefault();
				if( $('.popgid input').prop('checked') ){
					createCookie('checkcookieBanner', 'days', 1);
				}
				$('.popup').hide();
			});
		}
	}
	//경력사항 placeholder
	$('.placeholder').find('textarea').on('focus', function(){
		$(this).prev('.ph').hide();
	}).on('blur',function(){
		if( $(this).val() ){
			$(this).prev('.ph').hide();
		}else{
			$(this).prev('.ph').show();
		}
	});
});
//gs main 
(function($){ //10-28
	var module = window.gspMain = {};
	//11-03
	var saveRight = $(window).height();
	var saveWidth = $(window).width();
	var saveThumH = 0;
	module.setHeight = function(){
		$('.mainOnair > .imgArea').css('height','320px');
		//11-09			
		if( $(window).height() > 800 ){	//930			
			$('body').css('overflow-y','hidden');
			$('.mainVisual').height( $(window).height()-$('#header').height()-$('#footer').height() );
			$('.mainBanner').height( $(window).height()-$('#header').height()-$('#footer').height()-$('.mainInfo').height() );
			$('.snsNowWrap').height( $(window).height()-$('#header').height()-$('#footer').height() );		//11-09			
			//11-03
			
			var rightHeight = ($(window).height()-$('#header').height()-$('#footer').height()-800)/2;			
			if( $(window).height() !== saveRight || $(window).width() !== saveWidth ){				
				var dif = ($(window).height()-$('#header').height()-$('#footer').height() -320 -((saveThumH*2)-160))/2;				
				if( saveThumH-160 +dif < 160 ){
					$('.mainOnair > .imgArea').height( $(window).height()-$('#header').height()-$('#footer').height() -320-160  );
					$('.mainSNS').height(160);
				}else{
					$('.mainOnair > .imgArea').height( saveThumH +dif);					
					$('.mainSNS').height( saveThumH-160 +dif );
				}
				$('.snsNowWrap .snsMove').height( $('.mainSNS').height() );
				$('.snsNowWrap .snsMove > a').height( $('.mainSNS').height() );		
				saveRight = $(window).height();
				saveWidth = $(window).width();
			}else{				
				if( $('.mainSNS').height()+rightHeight < 160 ){
					$('.mainOnair > .imgArea').height( $(window).height()-$('#header').height()-$('#footer').height() -320-160  );
					$('.mainSNS').height(160);
				}else{
					$('.mainOnair > .imgArea').height( $('.mainOnair > .imgArea').height()+rightHeight );
					$('.mainSNS').height( $('.mainSNS').height()+rightHeight );	
				}				
				$('.snsNowWrap .snsMove').height( $('.mainSNS').height() );
				$('.snsNowWrap .snsMove > a').height( $('.mainSNS').height() );			
				saveThumH = 320+rightHeight;			
					
			}						
			//
			$('.btnView3').css('top', ($('.mainOnair > .imgArea').height()/2)-20+'px');
			$('.snsDimm').height( $(window).height()-$('#header').height()-$('#footer').height() );
			$('.snsArea').css('max-height', $(window).height()-$('#header').height()-$('#footer').height()+'px');			
					
		}else{
			//min height : 800
			var minH = 800, headH = $('#header').height(), footH = $('#footer').height(), cont1H = 320, cont2H = 640;
			$('body').css('overflow-y','');
			$('.mainVisual').height( minH-(headH+footH) ); //""
			$('.mainBanner').height( minH-(headH+footH)-cont1H );
			//$('.mainOnair > .imgArea').height(minH-(headH+footH)-cont2H);		11-03
			$('.mainOnair > .imgArea').height(minH-(headH+footH)-cont1H-160);			
			$('.btnView3').css('top', 140+'px');
			//$('.mainSNS').height("");
			$('.mainSNS').height(160);	//11-03
			$('.snsDimm').height(minH-(headH+footH));
			$('.snsArea').css('max-height',minH-(headH+footH));	
		}
		
	};
	module.arrowSlide = function(e){
		e.preventDefault();	
		var lisHeight = $(this).closest('.ctrl').prev().find('li').outerHeight(true);		
		var cur = Math.abs(parseInt($(this).closest('.ctrl').prev().find('>ul').css('margin-top'))/ lisHeight);		
		var $this = $(this);
		if( $(this).closest('.ctrl').prev().find('>ul').is(":animated") ) return false;
		if( $(this).hasClass('prev') ){			
			cur--;
			cur < 0? cur = 0 : cur;
		}else{
			cur++;
			cur > $(this).closest('.ctrl').prev().find('li').length -1 ? cur = $(this).closest('.ctrl').prev().find('li').length -1 :cur;
		}		
		$(this).closest('.ctrl').prev().find('>ul').animate({'margin-top': -lisHeight*cur+'px'}, 250,function(){			
			if( cur == 0 ){ 
				$this.closest('.ctrl').find('.prev').addClass('end');
			}else if( cur == $this.closest('.ctrl').prev().find('li').length -1 ){ 
				$this.closest('.ctrl').find('.next').addClass('end');
			}else{  
				$this.closest('.ctrl').find('.prev').removeClass('end'); 
				$this.closest('.ctrl').find('.next').removeClass('end');
			}
		});
	};
	module.init = function(){
		if( $('body.main').length > 0 ){		
			//11-09
			$('.imgArea').each(function(i){	
				if( $(this).parent().hasClass('mainOnair') ) return false;
				$(this).css('background', "url("+$(this).find('img').attr('src')+") no-repeat center center ");  //10-30
				$(this).css({'-webkit-background-size':'cover','-moz-background-size':'cover','-o-background-size':'cover','background-size':'cover'}); 
				//$(this).css({filter:"progid:DXImageTransform.Microsoft.AlphaImageLoader(src="+$(this).find('img').attr('src')+",sizingMethod='scale')"});
				//$(this).css({'-ms-filter': "progid:DXImageTransform.Microsoft.AlphaImageLoader(src="+$(this).find('img').attr('src')+",sizingMethod='scale')"});
				$(this).find('img').hide();
			});
			//line 2 set		
			var lineElem = $('.recuitList a.link');
			var fontSize = parseInt(lineElem.css('font-size'));
	        var pHeight = parseInt(lineElem.css('height'));
	        var rowHeight = fontSize*0.15;
	        var showLine = 2;	        	        
			setTimeout(function(){	//font call
				module.setHeight();
				$('.mainVisual').gspSlide({autoplay:true});				        
		        ellipsisSet();		    	
			},50);
			
			$('.infoNews .ctrl>a').on('click', module.arrowSlide);
			$('.infoRecuit .ctrl>a').on('click', module.arrowSlide);
			//
			textColor();
			/*sns 2줄 //11-09			
			$('.snsBox').each(function(i){
				if( $(this).find('.snsTxt').text().length > 40 ){
					$(this).find('.snsTxt').text( $(this).find('.snsTxt').text().substring(0, 39) + "...");
				}
			});
*/
		}
		//text color set
		function textColor(){
			$('.txtArea').removeClass('wtxt');
			$('.txtArea strong').each(function(k){
				if( $(this).data('color') ){
					$(this).css('color',  $(this).data('color'));					
					$('body').append('<style>.visualList li:nth-child('+(k+1)+') .tit:after{ background :  '+$(this).data('color')+' !important }</style>');					
				}
			});			
			$('.txtArea p').each(function(k){	
				var btn = $(this).closest('.txtArea').find('a.btnView1').length > 0 ? btn = $(this).closest('.txtArea').find('a.btnView1') : btn = $(this).closest('.txtArea').next('a.btnView2');
				var $this = $(this);
				if( $(this).data('color') ){
					$(this).css('color',  $this.data('color'));
					btn.css({'color': $this.data('color'), 'border-color': $this.data('color') });
				}
			});
			
		}
	    var saveWidth = $(window).width();        
		$(window).resize(function(){			
			if( $('body.main').length > 0 ){
				module.setHeight();						
				if( saveWidth != $(window).width() ){	
					pHeight = parseInt(lineElem.css('height'));
					if( lineElem.next('.ellipsis_tail').length > 0 &&  $('.recuitList').width() < 370){
			    		pHeight = fontSize*(showLine+1)+1;
			    	}		
					ellipsisSet();
			    }
				saveWidth = $(window).width();
			}
		});
		function ellipsisSet(){				
			var elmWid = lineElem.parent().width()- 20;
	        if(pHeight > fontSize*(showLine+1)) { 
		        lineElem.css({			    
				    'overflow': 'hidden',			   
				    'word-wrap': 'break-word', 'word-break':'break-all','-ms-word-break':'break-all','-ms-word-wrap': 'break-word',
				    //'text-overflow':'ellipsis','white-space':'nowrap','word-wrap':'normal'
				    'display':'inline-block'//,			    
		        });		        		        
	        	lineElem.width( elmWid ).height( (fontSize*(showLine+1)) - Math.floor(rowHeight*showLine) );	        		
				if( $('.ellipsis_tail').length < 1 ){
	        		lineElem.after("<span class='ellipsis_tail' >...</span>");	        		
	        	}
	        	//11-09	 
				lineElem.parent().each(function(i){
        			if( $(this).find('em.new').length > 0 && $(this).find('.ellipsis_tail').length > 0){
        				$(this).find('a.link').width( elmWid - 48 );	        				
        			}
        		});        		
		    }else{
		    	lineElem.removeAttr('style');
		    	lineElem.next('.ellipsis_tail').remove();
		    }
		    //11-09
		    $('.newsList li').each(function(m){        			
		    	if( $(this).find('>a').outerWidth() + parseInt($(this).find('>a').css('margin-right')) +$(this).find('em').width() >= $(this).width() ){ 
	        		$(this).find('>a').addClass('over');	        		
	        	}else{
	        		$(this).find('>a').removeClass('over');	        		
	        	}	        	
	        });
		}
		
		$('.mainSNS a.snsLink').on('click', function(e){
			e.preventDefault();			
			//if( $('.snsDimm').is(":hidden") ){
				//$('.mainSNS').css('z-index','100');
				$('.snsNowWrap .snsMove').show();
				$('#content').animate({'left':'-640px'});
				$('.snsDimm').fadeIn();
			//}else{
				//$('.mainSNS').css('z-index','0');
				//$('.snsNowWrap .snsMove').hide();
				//$('#content').animate({'left':'0px'});
				//$('.snsDimm').fadeOut();
			//}
		});
		$('.snsNowWrap .snsMove >a:eq(0)').on('click', function(e){
			e.preventDefault();
			$('.snsNowWrap .snsMove').hide();
			$('#content').animate({'left':'0px'});
			$('.snsDimm').fadeOut();
		});
		/*
		//생방송
		if( $('.time').length > 0 ){
			var set = new Date("9/17/2015 14:55:10");	//처음시간	
			onAirTimer( set );
		}
		*/
				
	};
}(jQuery));
//gs menu 
(function($){
	var module = window.gspLayout = {};
	module.menu = function(){
		//css set 
		$("#gnb > ul").css({
			'overflow':'hidden'
		}).height(66);
		$('.gnbDimm').hide();
		$("#gnb li").removeClass('on');		
		//		
		$("#gnb >ul>li>a").on('click', function(e){
			e.preventDefault();
			var cf = false;
			var idx = $(this).parent().index();				
			if( $(this).is(":focus") || navigator.userAgent.match(/(iPhone)/) != null || navigator.userAgent.match(/(iPod)/) != null ){	//11-12
				// both click foucs				
				if( cf ){					
					cf = false;					
				}else{					
					if( $(this).parent().hasClass('on') ){
						$(this).parent().removeClass('on');
						$("#gnb > ul").animate({ 'height': '66px' });
						$('.gnbDimm').slideUp();
					}else{
						$(this).parent().addClass('on');
						$(this).parent().siblings().removeClass('on');
						$("#gnb > ul").animate({ 'height': '319px' });
						$('.gnbDimm').slideDown();
					}
				}
			}else{
				//only focus							
				if( gnbmo ) $(this).focus();
				cf = true;
			}			
			
		});
		var gnbmo = false;
		$("#gnb >ul>li>a").on('mousedown',function(e){			
			gnbmo = true;
		});
		$("#gnb >ul>li>a").focus(function(){			
			if( !gnbmo ){				
				$(this).parent().addClass('on');
				$(this).parent().siblings().removeClass('on');
				$("#gnb > ul").animate({ 'height': '319px' });
				$('.gnbDimm').slideDown();				
			}
		});
		//
		$("#gnb .depth a").focus(function(){
			$(this).closest('.depth').parent().addClass('on');
			$(this).closest('.depth').parent().siblings().removeClass('on');			
			$("#gnb > ul").height(319);
			$('.gnbDimm').show();
		});
		
		function gnbmove(){
			$("#gnb > ul").height() == 66 ? $("#gnb > ul").animate({ 'height': '319px' }) : $("#gnb > ul").animate({ 'height': '66px' });			
			$('.gnbDimm').slideToggle();
		}
		//		
		$('.langBox').on('click ', function(e){
			e.preventDefault();
			var cf = false;			
			if( $(this).is(":focus") || navigator.userAgent.match(/(iPhone)/) != null || navigator.userAgent.match(/(iPod)/) != null  ){  //11-12
				// both click foucs						
				if( cf ){					
					cf = false;
				}else{					
					if( $(this).hasClass('on') ){
						$(this).removeClass('on');		
						$(this).next('.langList').slideUp(200);
					}else{
						$(this).addClass('on');						
						$(this).next('.langList').slideDown(200);	
					}
				}
			}else{
				//only focus				
				if( langBox ) $(this).focus();
				cf = true;				
			}			
		});
		var langBox = false;
		$('.langBox').on('mousedown',function(e){			
			langBox = true;
		});
		$('.langBox').focus(function(){			
			if( !langBox ){
				$(this).addClass('on');						
				$(this).next('.langList').slideDown(200);	
			}			
		});
		$('#container a').first().focus(function(){
			$('.langList').hide();
			$('.langBox').removeClass('on');
		});
//		//10-30
//		$("#header >.gnbDimm , #gnb >.gnbMenu").on('mouseleave', function(e){
//			e.preventDefault();
//			if( $('#header >.gnbDimm').is(":visible") ) $('#gnb >.gnbMenu li.on >a').trigger('click');
//		});
		//11-19	수정
		var gdimcheck = false, gnbmenuMousEcheck = false;
		$("#header >.gnbDimm").on('mouseenter', function(e){			
			gdimcheck = true;			
			gnbmenuMousEcheck = false;			
		}).on('mouseout', function(e){
			setTimeout(function(){
				if( !gnbmenuMousEcheck ){
					$('#gnb >.gnbMenu li.on >a').trigger('click');
				}	
				gnbmenuMousEcheck = false;		
			},100);
		});		
		$(".headerIn").on('mouseenter', function(e){
			e.preventDefault();			
			if( $("#header >.gnbDimm").is(':visible') ){
				gnbmenuMousEcheck = true;
			}
		}).on('mouseleave', function(e){
			e.preventDefault();			
			setTimeout(function(){
				if( gdimcheck && $("#header >.gnbDimm").is(':visible') ){					
				}else{
					$('#gnb >.gnbMenu li.on >a').trigger('click');
				}				
				gdimcheck = false;
			},100);			
		});
		//
	};
	module.focusCtrl = function(){
		$('.utilMenu .contact , .logo>a').focus(function(){
			$("#gnb li").removeClass('on');
			$("#gnb > ul").height(66);
			$('.gnbDimm').hide();
		});
		$('.utilMenu> a.contact').focus(function(){
			$("#gnb li").removeClass('on');
			$("#gnb > ul").height(66);
			$('.gnbDimm').hide();
			$('.langBox').next('.langList').hide();			
			$('.langBox').removeClass('on');
		});
	};	
	module.familySite = function(){		
		$('.fmilySite > a').on('click', function(e){
			e.preventDefault();
			var cf = false;			
			if( $(this).is(":focus") || navigator.userAgent.match(/(iPhone)/) != null || navigator.userAgent.match(/(iPod)/) != null  ){   //11-12
				// both click foucs						
				if( cf ){					
					cf = false;
				}else{					
					if( $(this).hasClass('on') ){
						$(this).removeClass('on');				
						$('.fmilySite > .fmsList').slideUp(200);	
					}else{
						$(this).addClass('on');	
						$('.fmilySite > .fmsList').slideDown(200);	
					}
				}
			}else{
				//only focus				
				if( fmilySite ) $(this).focus();
				cf = true;				
			}		
		});
		var fmilySite = false;
		$('.fmilySite > a').on('mousedown',function(e){			
			fmilySite = true;
		});
		$('.fmilySite > a').focus(function(){			
			if( !fmilySite ){
				$(this).addClass('on');	
				$('.fmilySite > .fmsList').slideDown(200);	
			}			
		});
	};
	module.init = function(){
		module.familySite();
		module.focusCtrl();
		module.menu();
	};		
}(jQuery));

//gs company 
(function($){
	var module = window.gspCompany = {};
	module.companySlide = function(){
		var con = $('.conIntro');
		function move(t , p , m, set ){
			var $this = this;
			t.stop().animate({
				'left' : m*(t.width())+'px'
			});
			if( set ){ p.css('left', -(t.width())+'px');  }
			p.stop().animate({
				'left' : '0px'
			},function(){
				t.siblings().not(p).css('left', (t.width())+'px');					
			});
		}
		con.find('>ul>li').not(':first').css('left',$(window).width()+'px');
		var sidx = 0;
		con.find('.visualTab>ul>li>a').on('click', function(e){
			e.preventDefault();			
			var idx = $(this).parent().index();
			count = idx;
			$(this).parent().siblings().removeClass('on');
			$(this).parent().addClass('on');			
			if( sidx > idx ){				
				move( con.find('.visualList>li').eq(sidx),con.find('.visualList>li').eq(idx),1,true );
			}else if( sidx < idx ){				
				move( con.find('.visualList>li').eq(sidx),con.find('.visualList>li').eq(idx),-1 );
			}
			sidx = idx;
		});
		var wwidth = $(window).width();
		$(window).resize(function(){
			if( wwidth !== $(window).width() ){
				con.find('>ul>li').not(':first').css('left',$(window).width()+'px');
			}			
		});
		var timeRol = null;
		var count = 0;		
		function play(){
			timeRol = setInterval(function(){
				count++;
				count > con.find('.visualTab>ul>li').length-1 ? count = 0: count;
				con.find('.visualTab>ul>li').eq(count).find('>a').trigger('click');
			},5000);
		}
		function stop(){
			clearInterval(timeRol);
		}
		//play();
	};
	module.history = function(){ //11-02
		var con = $('.historyIntro');		//conIntro		
		var timeRol = null;
		var count = 0;		
		function play(){			
			timeRol = setInterval(function(){
				if( count >= (con.find('.historySlide li').length/3)-2 ){ 
					stop();					
					if( $('a.btnStop').length > 0 ){
						$('a.btnStop').addClass('btnPlay').removeClass('btnStop');
					}					
				}				
				con.find('.btnSlide a.btnNext').trigger('click');
			},5000);
			
		}
		play();
		function stop(){
			clearInterval(timeRol);		
			
		}
		con.css('overflow','hidden');		
		con.find('.btnSlide a').on('click', function(e){
			e.preventDefault();
			var idx = count;
						
			if( $(this).hasClass('btnStop') || $(this).hasClass('btnPlay')  ){
				if( $(this).hasClass('btnStop') ){
					$(this).removeClass('btnStop').addClass('btnPlay');					
					stop();
				}else{					
					if( count >= (con.find('.historySlide li').length/3)-1 ){
						return false;
					}else{
						$(this).removeClass('btnPlay').addClass('btnStop');					
						play();
					}					
				}
				
			}else{
				if( $('.historySlide ul').is(":animated") ){
					return false;
				}else{
					if( $(this).hasClass('btnPrev') ){
						count--;						
						count < 0 ? count = 0 : count;	
						if( $('a.btnPlay').length > 0 ){
							$('a.btnPlay').addClass('btnStop').removeClass('btnPlay');
							play();
						}
					}else if( $(this).hasClass('btnNext') ){
						count++;						
						count > (con.find('.historySlide li').length/3)-1 ? count = (con.find('.historySlide li').length/3)-1 : count;
						if( count === (con.find('.historySlide li').length/3)-1 ){
							$('a.btnStop').removeClass('btnStop').addClass('btnPlay');					
							stop();
						}
					}					
					move(count);
				}				
			}			
		});
		
		function move( m ){ 
			var $this = this;			
			$('.historySlide ul').animate({ 'margin-left': -765*m+'px'},600,function(){				
				if( m == (con.find('.historySlide li').length/3)-1 ){
					$('.historySlide').addClass('last');
				}else{
					$('.historySlide').removeClass('last');
				}				
			});
		}
			
		//
		$('.conDetail.history >ul a').on('click', function(e){
			e.preventDefault();
			var idx = $(this).parent().index();
			$(this).parent().siblings().removeClass('on');
			$(this).parent().addClass('on');
			$('.conDetail.history >div').hide();
			$('.conDetail.history >div').eq(idx).show();
		});
	};	
	module.ethic = function(){	// 윤리경영
		$('.ethicTab a').on('click', function(e){
			e.preventDefault();
			var idx = $(this).parent().index();
			$(this).parent().addClass('on');
			$(this).parent().siblings().removeClass('on');
			$(this).closest('.ethicTab').nextAll('.tabCont').hide();
			$(this).closest('.ethicTab').nextAll('.tabCont').eq(idx).show();
		});
		
		$('.btnTipoff').on('click', function(e){			
			e.preventDefault();			
			var request = $.ajax('pop_company.html',{ dataType: "html" });
			request.done(function(data){				
				var result = $(data).filter('div.layerCon');
				var topset = ($(window).height()-800)/2;
				result.css({
					'position':'absolute',
					'top': $(window).scrollTop() + topset +'px',
					'left':'50%',
					'margin-left':'-500px'
				});
				result.appendTo('body');
				result.before('<div class="dimm"></div>');
				result.find('.btn_layer_close').on('click', function(e){
					e.preventDefault();
					result.prev('.dimm').remove();
					result.remove();
				});				
				result.find('.ethicScroll').mCustomScrollbar({theme:"gsShop", scrollInertia:0 });				
				result.find('.tab_ethics a').on('click', function(e){
					e.preventDefault();
					var idx = $(this).parent().index();
					$(this).parent().addClass('on');
					$(this).parent().siblings().removeClass('on');
					var topmargin = 0;
					idx == 0 ? topmargin = 0 : topmargin = 40;
					result.find('.ethicScroll').mCustomScrollbar('scrollTo', result.find('.ethicScroll h4').eq(idx).position().top +topmargin );
				});
			});
			
		});
		
	};
	module.locationLayer = function(){//10-28
		$('.mapTxt a').on('click', function(e){
			e.preventDefault();
			if( $('.layerPop').is(":animated") ) return false;		
			var url = location.pathname.substring(location.pathname.lastIndexOf('/')+1);				
			
			var setPage = 1;
			switch ( $('div.conDetail.station li.on').index() ){	// tab class 
				case 0 : setPage = 1;
				break;
				case 1 : setPage = 2;
				break;
				case 2 : setPage = 3;
				break;				
				default : 
				break;
			}
			if( $(this).closest('dl').index() == 0 ){	//첫번째
				url = "location"+setPage+"_pop1.html";								
			}else{		//두번째
				url = "location"+setPage+"_pop2.html";
			}
			var requset = $.ajax( url ,{ dataType: "html" } );			
			requset.done( function( data ){
				var result = $(data).filter(".layerCon");				
				$("body").append('<div class="dimm"></div>');			
				var ht,wd;	
				$.when( $("body").append(result) ).done(function(){							
					result.find('img').on('load', function(){
						ht = result.outerHeight(true);	
						wd = result.outerWidth(true);	
						result.css({					
							'position':'absolute',
							'top': $(window).scrollTop()+(($(window).height()-ht)/2)+'px',
							'left': (($(window).width()/2)-(wd/2))+'px'
						});
					});					
				});				
				$(window).resize(function(){
					result.css({						
						'top': $(window).scrollTop()+(($(window).height()-ht)/2)+'px',
						'left': (($(window).width()/2)-(wd/2))+'px'
					});
				});
				result.find('.btn_layer_close').on('click', function(){
					result.remove();
					$('body >.dimm').remove();
				});
			});
		});
	};
	module.init = function(){
		if( $('.company').length > 0 ){
			//module.companySlide();
			$('.conIntro').gspSlide();
		}
		if( $('.history').length > 0 ){
			module.history();
		}
		if( $('.conDetail.ethic').length > 0 ){
			module.ethic();
		}
		if( $('.mapTxt').length > 0 ){
			module.locationLayer();
		}
		$('.tipOff >a').on('click', function(e){
			e.preventDefault();
			$(this).toggleClass('on');
			$(this).next().slideToggle();
		});
		$('.btnShare >a').on('click', function(e){
			e.preventDefault();
			$(this).next('.shareList').toggle();
		});
		//shareList		
		if( $('.btnShare .shareList').length > 0 ){			
			if( $('script[src$="//developers.kakao.com/sdk/js/kakao.min.js"]').length < 1 ){
				$('body').append('<script src="https://developers.kakao.com/sdk/js/kakao.min.js"></script>');				
			}							
		}		
		//10-28
		$('.btnShare .shareList a').on('click', function(e){
			var url = encodeURIComponent(window.location.href);//encodeURIComponent(window.location.href);  window.location.href
			var title = encodeURIComponent(document.title);//encodeURIComponent(document.title);			//document.title
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
				case 'type3': window.open("http://www.facebook.com/sharer/sharer.php?u="+url);//페이스북
					break;
				case 'type4': window.open("https://twitter.com/intent/tweet?text="+title+"&url="+url);//트위터
					break;
				case 'type5': linkcopy(); //링크
					break;
				default:
					break;
			}			
		});
		
		function is_ie() {	//browser check
			if (navigator.userAgent.toLowerCase().indexOf("chrome") != -1)
				return false;
			if (navigator.userAgent.toLowerCase().indexOf("msie") != -1)
				return true;
			if (navigator.userAgent.toLowerCase().indexOf("windows nt") != -1)
				return true;
			return false;
		}
		function linkcopy(){
			var str = window.location.href;
			var r = confirm("현재 페이지의 정보를 복사하시겠습니까?");
			if (r == true) {					
				if( is_ie() ) {
					if(window.clipboardData.setData("Text", str)) alert("복사되었습니다.");
					else alert("작업이 중지되었습니다.");
					return;
				}
				prompt("Ctrl+C를 눌러 복사하세요.", str); 
			}
		}		
		function cacaolinkShare( ur, text ){			
			Kakao.Link.sendTalkLink({
				label : text,
				webButton : {
					text : "GS샵 기업홈페이지 바로가기",		
					image : {src: 'http://company.gsshop.com/images/common/kakao_gsshop.png', width: '300', height: '200'},			
					url : ur
				}
			});	
		}
		function cacaostoryShare( ur, text ){			//https://devtalk.kakao.com/t/topic/4041
			Kakao.Story.share({
	          url: ur,
	          text: text
	        });
		}
	};
	
}(jQuery));

//gs sharing
(function($){
	var module = window.gspSharing = {};
	module.socialDrop = function(){
		$('.socialDrop .dropTitle a').on('click', function(e){
			e.preventDefault();
			$(this).toggleClass('on');
			$(this).closest('.dropTitle').next().slideToggle(250);
		});
	};
	module.listType = function(){	//start up 10-28
		$('.listType2 li:gt(8)').not(':last').hide();
		var len = 9;//$('.listType2 li').filter(":visible").length-1;
		
		if( $('.listType2 li').length < 11 ){
			$('.listType2 li:last a').filter('.prev').addClass('end');
			$('.listType2 li:last a').filter('.next').addClass('end');
		}else{
			$('.listType2 li:last a').filter('.prev').addClass('end');
			$('.listType2 li:last a').filter('.next').removeClass('end');
		}
		$('.listType2 li:last div.arrow> a').on('click', function(e){
			e.preventDefault();		
			var idx = $('.listType2 li').not(":last").filter(':visible').last().index();
			if( $('.listType2 li').length < 11 ) return false;	//10개 이하일때
			if( $(this).hasClass('prev') ){				
				( $('.listType2 li').filter(":visible").length < 10 )? len = $('.listType2 li').filter(":visible").length-1 : len = 9;
				if( (idx-len+1) < 1 ) return false;
				$('.listType2 li').not(":last").filter(":lt("+(idx-len+1)+")").show();//8				
				$('.listType2 li').not(":last").filter(":lt("+(idx-8-len)+")").hide();				
				$('.listType2 li').not(":last").filter(":gt("+(idx-len)+")").hide();
			}else{				
				if( $('.listType2 li').filter(":visible").length < 10 ) return false;
				$('.listType2 li').not(":last").filter(":lt("+(idx+1)+")").hide();
				$('.listType2 li').not(":last").filter(":gt("+(idx)+")").show();
				$('.listType2 li').not(":last").filter(":gt("+(idx+len)+")").hide();
			}
			if( $('.listType2 li').first().is(':visible') ){
				$('.listType2 li:last a').filter('.prev').addClass('end');
				$('.listType2 li:last a').filter('.next').removeClass('end');
			}else if( $('.listType2 li').last().prev().is(':visible') ){
				$('.listType2 li:last a').filter('.prev').removeClass('end');
				$('.listType2 li:last a').filter('.next').addClass('end');
			}else{
				$('.listType2 li:last a').filter('.prev').removeClass('end');
				$('.listType2 li:last a').filter('.next').removeClass('end');
			}
		});
	};
	module.support = function(){
		$('.domestic .tabType1 a , .cooperate .cooperateTab a').on('click', function(e){	// 중기지원, 산학협력
			e.preventDefault();
			var idx = $(this).parent().index();
			$(this).parent().siblings().removeClass('on');
			$(this).parent().addClass('on');
			$(this).closest('.tabType1,.cooperateTab').nextAll('.tabCont').hide();
			$(this).closest('.tabType1,.cooperateTab').nextAll('.tabCont').eq(idx).show();
		});
		
		$('.domestic .btnSwitch a').on('click', function(e){
			e.preventDefault();			
			var li = $('.tabType1 > li.on').index();
			var idx = li;
			if( $(this).hasClass('btnPrev') ){
				idx--;
				idx < 0 ? idx = 0 : idx;				
			}else{
				idx++;
				idx > $('.tabType1 > li').length-1 ? idx = $('.tabType1 > li').length-1 : idx;
			}			
			$('.tabType1 > li').removeClass('on');
			$('.tabType1 > li').eq( idx ).addClass('on');
			$('.domestic .tabCont').hide();
			$('.domestic .tabCont').eq( idx ).show();
		});
	};
	module.init = function(){
		if( $('.socialCont').length > 0 ){
			module.socialDrop();
		}
		if( $('.support').length > 0 || $('.cooperate').length > 0 ){
			module.support();			
		}
		if( $('.startUp').length > 0 ){
			module.listType();
		}
	};
}(jQuery));

//gs career
(function($){
	var module = window.gspCareer = {};
	module.boardToggle = function(){		//상세직무소개
		var iframeElem = [];
		setiframeElem();
		function setiframeElem(){			
			$('.dutyList >li').each(function(i){				
				iframeElem.push( $(this).find('.dutyVideo>iframe').detach() );
			});
		}
		$(document).on('click', '.dutyList div.inner >a',function(e){
			e.preventDefault();
			$(this).addClass('on');
			$(this).parent().parent().siblings().find('div.inner >a').removeClass('on');			
			$(this).parent().parent().siblings().find('.dutyCont').hide();
			$('.dutyList >li .dutyVideo>iframe').remove();
			var idx = $(this).parent().parent().index();			
			var $this = $(this);
			
			$.when( $this.parent().next('.dutyCont').show(), $this.parent().parent().find('.dutyCont .dutyVideo').append( iframeElem[idx] ) ).done(function(){
				$this.parent().parent().siblings().height("");				
				$this.parent().parent().height( $this.parent().next('.dutyCont').outerHeight(true) + $this.parent().outerHeight(true) );				
			});
		});		
		$(document).on('click', '.dutyCont .close', function(e){			
			e.preventDefault();
			$('.dutyList >li .dutyVideo>iframe').remove();
			$(this).parent().prev().find('>a').removeClass('on');
			$(this).parent().parent().height("");			
			$(this).parent().hide();
		});
	};
	module.init = function(){
		if( $('.conTitle h1').text().match(/(직무소개)/) ){
			module.boardToggle();
		}
		if( $('.conTitle h1').text().match(/(채용 STORY)/) ){
			$('.passList li>a').on('click', function(e){
				e.preventDefault();
				var idx = $(this).parent().index();
				$(this).addClass('on');
				$(this).parent().siblings().find('>a').removeClass('on');
				$('.passCont').hide();
				$('.passCont').eq(idx).show();
			});
			
		}		
		//행 추가 /행 삭제
		if( $('.applyStep li:eq(2).on').length > 0 || $('.applyStep li:eq(3).on').length > 0 ){	//학력사항 & 가족사항			
			/*
			//고등학교 class="Highschool"
			$('.Highschool td.tbutton >a').on('click',function(e){
				e.preventDefault();					
				if( $(this).hasClass('add') ){					
					tableAdd( "Highschool" );
				}else{					
					tableDel( "Highschool" );
				}
			});			
			//전문대학교 class="Puniv"
			$('.Puniv td.tbutton >a').on('click',function(e){
				e.preventDefault();					
				if( $(this).hasClass('add') ){					
					tableAdd( "Puniv" );
				}else{					
					tableDel( "Puniv" );
				}
			});
			//대학교 class="Univ"
			$('.Univ td.tbutton >a').on('click',function(e){
				e.preventDefault();	
				if( $(this).hasClass('add') ){
					tableAdd( "Univ" );
				}else{
					tableDel( "Univ" );
				}
			});
			//대학원 class="Gschool"
			$('.Gschool td.tbutton >a').on('click',function(e){
				e.preventDefault();	
				if( $(this).hasClass('add') ){
					tableAdd( "Gschool" );
				}else{
					tableDel( "Gschool" );
				}				
			});
			//
			//가족사항 class="Family"
			$('.Family .tright:first >a').on('click', function(e){	//add
				e.preventDefault();				
				rowAdd( "Family" );
			});
			$(document).on('click', '.Family .tright:gt(0) >a',function(e){	//delete
				e.preventDefault();				
				rowDel( $(this).closest('tr') );
			});
			
			//수상내역 class="Award"	
			$('.Award .tright:first >a').on('click', function(e){	//add
				e.preventDefault();
				rowAdd( "Award" );
			});
			$(document).on('click', '.Award .tright:gt(0) >a',function(e){	//delete
				e.preventDefault();		
				rowDel( $(this).closest('tr') );
			});
			
			//어학 class="Language"
			$('.Language .tright:first >a').on('click', function(e){	//add
				e.preventDefault();
				rowAdd( "Language" );
			});
			$(document).on('click', '.Language .tright:gt(0) >a',function(e){	//delete
				e.preventDefault();		
				rowDel( $(this).closest('tr') );
			});
			//자격증 class="Certification"
			$('.Certification .tright:first >a').on('click', function(e){	//add
				e.preventDefault();
				rowAdd( "Certification" );
			});
			$(document).on('click', '.Certification .tright:gt(0) >a',function(e){	//delete
				e.preventDefault();		
				rowDel( $(this).closest('tr') );
			});
			//해외경험 class="International"
			$('.International .tright:first >a').on('click', function(e){	//add
				e.preventDefault();
				rowAdd( "International" );
			});
			$(document).on('click', '.International .tright:gt(0) >a',function(e){	//delete
				e.preventDefault();		
				rowDel( $(this).closest('tr') );
			});
			//경력사항 class="Personalhistory"
			$('.Personalhistory .tright:first >a').on('click', function(e){	//add
				e.preventDefault();
				rowAdd( "Personalhistory" );				
			});
			$(document).on('click', '.Personalhistory .tright:gt(0) >a',function(e){	//delete
				e.preventDefault();				
				rowDel( $(this).closest('tr') );				
			});
			*/
			
		}
		
	};
}(jQuery));
//window popup
function popupView( url, width, height, scroll ){	
	var pop = window.open( url ,'','width='+width+',height='+height+',toolbar=0,resizable=0,scrollbars='+scroll );
	
	$(pop).load(function(){
		scroll === 'no'? $(pop.document).find('html').css('overflow-y','hidden') : $(pop.document).find('html').css('overflow-y','scroll');			
		$(pop.document).find('body').css('min-width','0px');
		pop.focus();		
	});
}
//table add , delete
function tableAdd( cl ){	
	var firstTR = $('tr.'+cl).last();	
	var cloneTR = firstTR.clone();
	cloneTR.find('td.tbutton>a').remove();
	cloneTR.insertAfter(firstTR);
	cloneTR.find("th").text( cloneTR.find("th").text().match(/\d/)? cloneTR.find("th").text().replace(/\d/,$('.'+cl).length) : cloneTR.find("th").text()+$('.'+cl).length );	//구분을 위해 임의로 넣어둔 값		
	cloneTR.find('input').val("");	
	cloneTR.find('.selectBox').resetSS();			//style select reset
}
function tableDel( cl ){
	if( $('tr.'+cl).length < 2 ) return false;
	$('tr.'+cl).last().remove();
	
}
function rowAdd( cl ){
	var rows;
	if( cl === "Personalhistory" ){ //경력사항
		var rows_1 = $('table.'+cl).find('>tbody>tr').last().clone();	//경력사항 테이블
		rows = $('table.'+cl).find('>tbody>tr').last().prev().clone(); //경력사항 행
		rows_1.insertAfter( $('table.'+cl).find('>tbody>tr').last() );
		rows.insertBefore( $('table.'+cl).find('>tbody>tr').last() );
		rows_1.find('input').val("");				
	}else{
		rows = $('table.'+cl).find('tr').last().clone();
		rows.insertAfter( $('table.'+cl).find('tr').last() );				
	}	
	rows.find('input').val("");
	rows.find('.selectBox').resetSS();
	if( rows.find('.btnMiddle.type1').length > 0 ){
		rows.find('.btnMiddle.type1').find('span').text("행삭제");
		rows.find('.btnMiddle.type1').find('span').removeClass('linePlus').addClass('lineMinus');
		rows.find('.btnMiddle.type1').removeClass('type1').addClass('type2');
		//html 페이지에 rowDel 을 바로 추가할 경우 주석지우고 사용하면 됩니다.
		//rows.find('.btnMiddle.type2').attr("onclick", "event.preventDefault();rowDel( $(this).closest('tr') );");	//삭제 함수추가
	}			
}
function rowDel( target ){
	if( $(target).closest('table').hasClass('Personalhistory') ){ //cl === "Personalhistory" ){//경력사항
		$(target).closest('tr').next().remove();
		$(target).closest('tr').remove();	
	}else{
		$(target).remove();
	}
}

//onAir setTime
/**
 *	 onAirTimer( timeset )
 *   @param { new Date } timeset
 */
function onAirTimer( timeset ){			
	var settimes;	
	function showCountdown( TimeSecond ){
		var now = new Date();
		var difference = parseInt(((TimeSecond - now.getTime()) / 1000) + 0.999);				
		var count;				
		if ( difference > 0 ) {
            var secs = difference % 60;		            
            difference = parseInt(difference / 60);
            var minutes = difference % 60; 		 
            difference = parseInt(difference / 60); 
            var hours = difference % 24; 		 
            
            hours < 10 ? hours = "0"+hours: hours;
	        minutes < 10 ? minutes = "0"+minutes: minutes;
	        secs < 10 ? secs = "0"+secs: secs;
			count = hours + ":" + minutes + ":" + secs ;		
        }else{		        	
        	if( settimes ) clearInterval(settimes);	
        	//다음함수
        	nextTimes();	        	
        	count = "00:00:00";
        }		        
		$('.time').text(count);
	}
	settimes = setInterval(function(){
		showCountdown( timeset.getTime()-1 );
	},1000);	
}		
function nextTimes(){			
		$.ajax({
		url : '/liveinfo',
		datatype : 'json',
		success : function(data, textStatus, XMLHttpRequest) {
			$("#liveTitle").text(data.title);
			$("#liveLink").attr("href", data.url);
			$('.mainOnair .imgArea').each(function(i) {
				$(this).css('background', "url(" + data.img + ") no-repeat center top ");
				$(this).css({
					'-webkit-background-size' : 'cover',
					'-moz-background-size' : 'cover',
					'-o-background-size' : 'cover',
					'background-size' : 'cover'
				});
			});
			if(data.title){
				var set = new Date(data.endTime);
				if (set != null) onAirTimer(set);
			}
		}
	});
}
 
//slide / indicater 11-12 
/**
 * new GspSlide()
 * ele : $('div')
 * USE : ele.gspSlide();
 */
;(function($){
	$.fn.gspSlide = function(option) {
	    return this.each(function() {
	    	var $this = $(this);	    	
	    	var data  = $this.data('gspSlide');	    	
	    	if (!data) $this.data('gspSlide', (data = new GspSlide( $.extend({ele:$this},option) )) );
	    });
	};
	$.fn.gspSlide.Constructor = GspSlide;
}(jQuery));
function GspSlide( op ){
	this.option = $.extend({
		ele: $.noop(),
		autoplay: false,
		set : "string"
	},op);	
    this.nowidx = 0;
    this.option.ele.find('>div>a, >div li>a').eq(this.nowidx).addClass('on');
    //indicon
	
	this.reSized();
	
	this.rRime;	
	this.sliding();	
	if( this.option.autoplay ){
		this.rstrat();
	}
}
$.extend(GspSlide.prototype, {
	rstrat:function(){
		var $this = this;
		//var count = 0;		
		$this.rRime = setInterval(function(){
			$this.option.ele.find('.btnSlide li:last >a').trigger('click');	
		}, 7000);		
	},
	rstop:function(){
		var $this = this;		
		clearInterval($this.rRime);
	},
	smove:function(t , p , m, set ){
		var $this = this;		
		t.siblings().not(p).css('z-index','-1');
		t.stop().animate({
			'left' : m*(t.width())+'px'
		});
		if( set ){ p.css('left', -(t.width())+'px');  }
		else{ 
			if( p.siblings().andSelf().length < 3 )	p.css('left', (t.width())+'px');
		}
		p.stop().animate({
			'left' : '0px'
		},function(){			
			t.siblings().not(p).css('left', (t.width())+'px');			
			t.siblings().not(p).css('z-index','');
		});
	},
	sliding:function(){
		var $this = this;		
		var imgs = $this.option.ele.find('>ul:eq(0)>li');
		imgs.css('position','absolute');		
		imgs.not(':first').css('left', imgs.width()+'px');		
		var indicon = $this.option.ele.find('>div>a, >div li>a');
		if( imgs.length < 2 ) return false; 
		
		indicon.on('click', function(e){			
			e.preventDefault();

			var idx;			
			if( imgs.is(":animated") ) return false;					
			if( $(this).parent().prop("tagName").toLowerCase() == "li" ){
				idx = $(this).parent().index();
				$(this).parent().siblings().removeClass('on');
				$(this).parent().addClass('on');	
			}else{
				idx = $(this).index();
				$(this).siblings().removeClass('on');
				$(this).addClass('on');	
			}			
			//count = idx;			
			//11-12 한방향			
			if( $this.nowidx > idx ){				
				$this.smove( imgs.eq($this.nowidx),imgs.eq(idx),1,true );
			}else if( $this.nowidx < idx ){				
				$this.smove( imgs.eq($this.nowidx),imgs.eq(idx),-1 );
			}			
			$this.nowidx = idx;
			
			timeReset();
			
		});
		if( $this.option.ele.find('.btnSlide').length > 0 ){
			var dot = 0;
			$this.option.ele.find('.btnSlide li').not(":eq(1)").find('a').on('click',function(e){
				e.preventDefault();
				
				dot = $this.nowidx;				
				var idx;
				if( imgs.is(":animated") ) return false;		
				if( $(this).hasClass('btnPrev') ){
					idx = indicon.filter('.on').prev().index();
					idx < 0 ? idx = indicon.length-1 : idx;
					$this.smove( imgs.eq($this.nowidx),imgs.eq(idx),1,true );					
				}else{
					idx = indicon.filter('.on').next().index();
					idx < 0 ? idx = 0 : idx;					
					$this.smove( imgs.eq($this.nowidx),imgs.eq(idx),-1 );					
				}
				indicon.not(":eq("+idx+")").removeClass('on');
				indicon.eq(idx).addClass('on');
				$this.nowidx = idx;		
				
				timeReset();
				
			});
			$this.option.ele.find('.btnSlide li:eq(1) >a').on('click',function(e){
				e.preventDefault();
				if( $(this).hasClass('btnStop') ){
					$(this).removeClass('btnStop');
					$(this).addClass('btnPlay');
					$this.rstop();					
				}else{
					$(this).addClass('btnStop');
					$(this).removeClass('btnPlay');
					$this.rstrat();					
				}
				
			});
		}
		function timeReset(){
			if( $this.option.ele.find('.btnSlide li:eq(1) >a.btnStop').length > 0 ){
				if( $this.rRime ) $this.rstop();
				setTimeout( function(){
					$this.rstrat();	
				},0);
			}
		}
	},
	reSized:function(){
		var saveWidth = $(window).width(); 
		var $this = this;
		$(window).resize(function(){
			if( saveWidth !== $(window).width() ){
				$this.option.ele.find('>ul:eq(0)>li').not(":eq("+$this.nowidx+")").css('left',$this.option.ele.find('>ul:eq(0)>li').width()+'px');
				saveWidth = $(window).width();
			}			
		});
	}
});