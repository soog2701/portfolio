//pc ver.
"use strict";
$(document).ready(function(){	
	//common
	dlayout.init();
	
	
	//상품가이드
	if( $('.lifeStyle01').length > 0 || $('.ageType02').length > 0 ){
		var lifelist = $('.lifeStyle01 a, .ageType02 a'), lifeSelect = $('<span class="sel">선택</span>');		
		lifelist.on('click', function(e){
			e.preventDefault();
			if( $(this).next().is('span') ) return false;
			lifeSelect.insertAfter( $(this) );
		});
		$(document).on('click', 'span.sel', function(e){
			e.preventDefault();
			$(this).remove();
		});
	}
});
$(window).load(function(){	
	//menu
	dlayout.gnb();
	//main
	dmian.init();
	//mainPage - 상품특징 : 추천상품 .mContent>.fl mRolling
	$('.mContent>.fl').dongbuBoxRolling({ autoplay:true });
	//subPage - 상품특징 : 추천상품 rollingBox rolling
	$('.rollingBox').dongbuBoxRolling({ autoplay:true });
	//subPage - 상품특징 statsBox rolling
	$('.statsBox').dongbuArrowRolling({ autoplay:true });
	//12-21
	dateFocus.init();
	
});

//layout & common
(function($){
	var module = window.dlayout = {};
	//menu
	module.gnb = function(){
		//page set on
		var setDepth = null;
		if( $('.lnb .lnb_title').length > 0 ){
			var title = $('.lnb .lnb_title').text();
			$('ul.gnb').children().each(function(e){				
				if( $(this).children('a').text() == title ){
					$(this).addClass('selected');
					setDepth = $(this).index();					
				}
			});
		}
		//gnb over
		var subDiv = '.snb.menu';
		$('ul.gnb').css({
			'margin-top': '0px',
			'padding-top':'25px'
		});
		//set snb_bg height
		$(subDiv).eq(0)
		    .css({
		        position:   'absolute', // Optional if #myDiv is already absolute
		        visibility: 'hidden',
		        display:    'block'
		    });		
		var optionHeight = $(subDiv).eq(0).outerHeight();		
		$('.snb_bg').height(optionHeight);
		$(subDiv).eq(0).removeAttr('style');
		$(subDiv).css('padding','0px');
		
		//set dimmed height
		$('.header_dimmed').height( $(document).height() );
		
		//1depth
		$('ul.gnb > li').children('a').on('click', function(e){	
			e.preventDefault();
			//if allmenu on
			if( $('a.btn_total').hasClass('on') ){
				$('.total_menu.layer_pop .btn_close').trigger('click');
			}
			var $this = $(this);
			
				if( $(subDiv).not(':hidden').length < 1 ){				
					setTimeout(function(){
						$this.parent().find(subDiv).slideDown(450);
						$('.snb_bg').slideDown(450);
						$('.header_dimmed').fadeIn();
					},10);
				}else{	
					if( $('.snb_bg').is(':animated') ){
						return false;
					}else{
						$this.parent().find(subDiv).show();
					}				
				}
				$this.parent().siblings().find(subDiv).hide();
				
				$this.parent().siblings().removeClass('selected');
				$this.parent().addClass('selected');				
				//$('.snb_bg').slideDown(450);
				//close btn 
				$('.gnbClose').fadeIn();			
			
		}).on('focus', function(){							//focus			
			$(this).trigger('click');			
			var idx = $(this).parent().index();			
			setTimeout(function(){				
				$(subDiv).filter(':visible').children().children().not(':eq('+idx+')').find('a').attr('tabIndex','1');		
				$(subDiv).filter(':visible').children().children().eq(idx).attr('tabIndex','0');		
				$(subDiv).filter(':visible').children().children().eq(idx).find('a').attr('tabIndex','');			
				$(subDiv).filter(':hidden').find('ul>li').removeAttr('tabIndex');
			},15);
		}).on('blur',function(){
			// || $(subDiv).filter(':visible').index() !== $(this).parent().index() 
			if( $('.snb_bg').is(':animated') ) return false;			
		});
		//close btn 
		var closeMd = false;
		$('.gnbClose').on('mousedown', function(e){
			closeMd = true;
		}).on('click', function(e){
			if( setDepth !== null ){
				$('ul.gnb > li').removeClass('selected');
				$('ul.gnb > li').eq(setDepth).addClass('selected');
			}else{
				$('ul.gnb > li').removeClass('selected');
			}			
			if( !closeMd ){							
				if( $(this).is(':focus') ) $('ul.gnb > li:last > a').focus();				
			}				
			$(subDiv).slideUp();
			$('.snb_bg').slideUp();
			$('.header_dimmed').fadeOut();
			
			//close btn 
			$('.gnbClose').fadeOut();
			closeMd = false;
		}); 	
		$('.util li:eq(0)>a , .header_logo').on('focusin', function(e){  //header_logo			
			$(".gnbClose").trigger('click');			
		});
		//2depth
		//sub a over
		$(subDiv+" a").on('mouseenter', function(e){
			var pIdx = $(this).parent().parent().parent().index();
			//$('ul.gnb > li:eq('+pIdx+') >a').trigger('click');
		});
		
		//totalmenu
		$('a.btn_total').on('click', function(e){
			e.preventDefault();
			$('a.btn_total').addClass('on');
			$('.header_dimmed').show();
			$('.total_menu.layer_pop').show();			
			$('.total_menu.layer_pop .btn_close').focus();							//focus
		});
		$('.total_menu.layer_pop .btn_close').on('click', function(e){
			e.preventDefault();
			$('a.btn_total').removeClass('on');
			$('.total_menu.layer_pop').hide();	
			$('.header_dimmed').hide();
			$('a.btn_total').focus();							//focus
		});		
		//prevent body scroll
		var deltaSave = 0;
		$(document).on('DOMMouseScroll mousewheel wheel',function(e){
			if( $('a.btn_total').hasClass('on') ){
				var elem = $('.total_menu.layer_pop .con.scroll_y');
				e.preventDefault();
				var wheelEvent = e.originalEvent;
        		var dY = wheelEvent.deltaY ? wheelEvent.deltaY : -(wheelEvent.wheelDelta);
        		if ( elem.scrollHeight - elem.scrollTop() == (elem.outerHeight()) ){
			        dY > 0 ? deltaSave : deltaSave--;
			    }else{
			    	dY > 0 ? deltaSave++ : deltaSave--;
			    	if( elem.scrollTop() == 0 ){
			    		dY < 0 ? deltaSave = 0 : deltaSave;
			    	}else if( elem.scrollTop() == (elem.find('>div').outerHeight()-elem.outerHeight()) ){
			    		dY > 0 ? deltaSave = deltaSave-1 : deltaSave--;			    		
			    	}
			    }			             
			    elem.scrollTop( deltaSave*100 );
			}
		});
	};
	//layer pop focus
	module.layerFocus = function(){
		var firstAelem = $('.total_menu.layer_pop a:first'),
		lastAelem = $('.total_menu.layer_pop a:last'),
		closeElem = $('.total_menu.layer_pop .btn_close');
		//allmenu		
		closeElem.on('keydown', function(e){
			if( e.keyCode == 9 ){						
				if( e.shiftKey ){					
					setTimeout(function(){
						lastAelem.focus();
					},10);		
				}else{					
					setTimeout(function(){
						firstAelem.focus();
					},10);
				}
			}
		});		
		firstAelem.on('keydown', function(e){
			if( e.keyCode == 9 ){						
				if( e.shiftKey ){					
					setTimeout(function(){
						closeElem.focus();
					},10);
				}
			}
		});
		
	};
	//faq
	module.faq = function(){
		$(document).on('click', '.qnaList .question', function(e){
			e.preventDefault();
			$(this).parent().toggleClass('on');
			//$(this).parent().siblings().removeClass('on');	//12-18
		});
	};
	//상담신청
	module.counsel = function(){		
		$('.personal_info button').on('click', function(e){
			e.preventDefault();			
			if( $(this).parent().hasClass('con_top') ){
				$(this).parent().next().show();
			}else{
				$(this).parent().hide();
				$(this).closest('.conBox').find('.btn_detail,.btn_open').focus();	//12-18
			}			
		});
	};
	//원 타입 마우스 오버
	module.cirOver = function(){
		var overElm = $('.mBtn02');
		//overElm.removeClass('btn02_01_over btn02_02_over').addClass('btn02_00_over');	
		overElm.removeClass('btn02_00_over btn02_02_over').addClass('btn02_01_over');	
		var saveTime1 = 0,saveTime2 = 0;
		overElm.each(function(i){
			$(this).find('a').first().hover(function(){
				saveTime1 = new Date().getTime();				
				$(this).parent().removeClass('btn02_00_over btn02_02_over').addClass('btn02_01_over');				
			},function(){				
				//if( new Date().getTime() - saveTime1 > 2 ){
				//	$(this).parent().removeClass('btn02_01_over btn02_02_over').addClass('btn02_00_over');			
				//}								
			});			
			$(this).find('a').last().hover(function(){
				saveTime2 = new Date().getTime();				
				$(this).parent().removeClass('btn02_00_over btn02_01_over').addClass('btn02_02_over');				
			},function(){
				//if( new Date().getTime() - saveTime2 > 2 ){
				//	$(this).parent().removeClass('btn02_02_over btn02_01_over').addClass('btn02_00_over');
				//}			
			});
		});
	};
	//Lnb 연령별 상품찾기 버튼선택
	module.lnbgender = function(){
		var span = $('<span class="hidden">선택</span>');
		var btn = $('.lnb .section02 ul button');
		btn.on('click', function(e){
			e.preventDefault();
			$(this).toggleClass('selected');
			$(this).parent().siblings().find('button').removeClass('selected');
			span.insertAfter( $(this) );			
			$(this).hasClass('selected') ? span.insertAfter( $(this) ) : span.remove();
		});		
	};
	//top btn
	module.topbtn = function(){
		var top = $('#footer .btn_top');
		/*		
		top.css({
			'background' : 'transparent',
		    '-ms-filter': "progid:DXImageTransform.Microsoft.gradient(startColorstr=#00FFFFFF,endColorstr=#00FFFFFF)",
		    'filter': 'progid:DXImageTransform.Microsoft.gradient(startColorstr=#00FFFFFF,endColorstr=#00FFFFFF)',
		    'zoom': '1'		
		});
		*/
		top.hide();
		top.css({
			'position':'fixed',
			'bottom':'96px',			
			'right':'0px',
			'margin-right': (($(window).width()- $('#footer .footer_con').width())/2)-90+'px'
		});
		$(window).resize(function(){
			top.css('margin-right', (($(window).width()- $('#footer .footer_con').width())/2)-90+'px'); 
		});
		if( $(window).scrollTop() > 0 ){
			top.fadeIn();				
		}else{
			top.fadeOut();				
		}
		$(window).scroll(function(){
			var wt = $(window).scrollTop();			
			if( wt > 0 ){
				top.fadeIn();
			}else{
				top.fadeOut();
			}
		});
		
	};
	//start 
	module.init = function(){
		module.layerFocus();
		module.faq();
		module.counsel();
		module.cirOver();
		module.lnbgender();
		module.topbtn();
	};
	
}(jQuery));

//main
(function($){
	var module = window.dmian = {};
	module.setCss= function(){
		$('.mListCon').css({
			'position':'absolute',			
			'left': ($(window).width()/2)+'px',
			'margin-left' : -(1920/2)+'px',
			'top':'0px'//'top':'640px'
		}).width('1920');		
		$(window).resize(function(){
			$('.mListCon').css({						
				'left': ($(window).width()/2)+'px'				
			});
		});
	};	
	module.moveDiv = function( idx ,comp ){		
		var prevDiv = $('.mListCon').filter(':visible');	
		if ( idx == prevDiv.index('.mListCon')  ){			
			comp();	
			return false;
		} 	
		prevDiv.css('z-index','1');//.animate({ 'top': 640+'px' }, 800, function(){ $(this).hide(); });
		$('.mListCon').eq(idx).find('.question').show();
		$('.mListCon').eq(idx).find('.question').next().hide();		
		$('.mListCon').eq(idx).css('z-index','2').stop().fadeTo(300, 1, function(){
			comp();
			prevDiv.css('top', 0+'px').fadeTo(300,0).hide();	
		});
		
	};
	module.init = function(){
		module.setCss();
		//Bundle functions		
		var elemArr = [$('.recommend .mBtn_more'), $('.mListCon .question').find('a:first'), $('.mList a'), $('.mBtn_close') ]; //추천상품 더보기 , 질문 버튼, 카테고리버튼, 닫기버튼
		var elemMosOverArr = elemArr.slice(0,2),
			elemFosKeyDownArr = elemArr.slice(0,3),			
			elemMousDownArr = elemArr.slice(1,4);		
		var keyDownCheck = [0,1,1], mouseDownCheck = [false,false,false], mouseDownElem = [null,null,null];
		//
		
		var btn = $('.mList a');		
		//var sidx = null;		
		btn.on('click', function(e){
			var idx = $(this).parent().index();
			e.preventDefault();				
			if( $('.mListCon').filter(':animated').length > 0  ) return false; //sidx == idx
			$(this).parent().addClass('selected');
			$(this).parent().siblings().removeClass('selected');			
			if( mouseDownElem[1] == idx ){
				mouseDownCheck[1] = true;				
				keyDownCheck[1] = 0;	//question down check
			}			
			//sidx = idx;			
			module.moveDiv(idx, comp);			
			function comp(){
				$('.mListCon').eq(idx).find('a,button,input').first().focus();//.end().closest('.mBtn02').removeClass('btn02_01_over');
				if ( mouseDownCheck[1] ){					
					$('.mListCon').eq(idx).find('a,button,input').first().filter(':focus').attr("hideFocus", "true").css('outline','0');					
				}				
				mouseDownCheck[1] = false;
				mouseDownElem[1] = null;				
			}			
		});
		
		//close
		$('.mBtn_close').on('click', function(e){
			e.preventDefault();
			var idx = $('.mListCon:visible').index(".mListCon");
			btn.parent().removeClass('selected');			
			$('.mListCon:visible').fadeTo(300, 0,function(){
				$(this).hide();
			});
			//sidx = null;			
			btn.parent().eq(idx).find('a').focus();
			if( mouseDownElem[2] == $(this).index('.mBtn_close') ){ mouseDownCheck[2] = true; keyDownCheck[2] = 0;}	//list keydown check			
			if( mouseDownCheck[2] ){				
				btn.parent().eq( $(this).index('.mBtn_close') ).find('a').attr("hideFocus", "true").css('outline','0');
			} 
			mouseDownCheck[2] = false;
			mouseDownElem[2] = null;			
		});		
		
		//question
		$('.mListCon .question a').on('click', function(e){
			//e.preventDefault();			
			var idx = $(this).index();
			$(this).closest('.question').hide();	
			$(this).closest('.question').next().show();				
			if( $(this).closest('.mBtn02').length > 0 ){
				$(this).closest('.question').next().find('.fr>div').hide();
				$(this).closest('.question').next().find('.fr>div').eq(idx).show();
			}			
			$(this).closest('.question').next().find('a,button,input').first().focus();
			
		});		
		//question next focus		
		$('.mListCon .question').each(function(i){
			$(this).find('a:first').siblings('a,button').andSelf().on('click', function(e){				
				if( mouseDownElem[0] == $(this).closest('.question').index('.question') ){ mouseDownCheck[0] = true; keyDownCheck[0] = 0; }	//recommend keydown check
				if( mouseDownCheck[0] ){
					$(this).closest('.question').next().find('a,button,input').first().filter(':focus').attr("hideFocus", "true").css('outline','0');
				}				
				mouseDownCheck[0] = false;
				mouseDownElem[0] = null;				
			});			
		});
		
		//mouse enter leave
		$.each( elemMosOverArr , function(n){
			$(this).siblings('a,button').andSelf().on('mouseenter mouseleave',function(e){	// question a.length 2
				e.preventDefault();
				//$(this).attr("hideFocus", "true").css('outline','0');
				$(this).siblings('a,button').andSelf().attr("hideFocus", "true").css('outline','0');				
			});			
		});
		
		//mouse down check
		$.each( elemMousDownArr, function(l){	
			$(this).siblings('a,button').andSelf().on('mousedown', function(e){				
				var idx;				
				switch( l ){	// 0: question 1: list btn 2: close
					case 0: idx = $(this).closest('.question').index('.question');
						break;
					case 1: idx = $(this).parent().index();
						break;
					case 2: idx = $(this).index('.mBtn_close');
						break;
					default :
						break;
				}
				mouseDownElem[l] = idx;
			});
		});
		//focusin remove attr & keydown
		$.each( elemFosKeyDownArr , function(m){	// 0:recommend  1:question  2:list btn 
			$(this).siblings('a,button').andSelf().on('focus', function(e){
				//$(this).removeAttr('style');	
				//$(this).removeAttr('hideFocus');			
				$(this).siblings('a,button').andSelf().removeAttr('style');
				$(this).siblings('a,button').andSelf().removeAttr('hideFocus');
			})
			.on('keydown', function(e){
				if( e.keyCode == 9 ){
					if( e.shiftKey ){					
						if( m == 1 && $(this).index( $(this).parent().find('a') ) == 0 ){
							//this layer btn focus						
							var uidx = $(this).closest('.question').index('.question');
							setTimeout(function(){
								btn.parent().eq( uidx ).find('a').focus();								
							},10);
						}							
					}else{						
						if( m === 1 ) keyDownCheck[0] = 1;						
						if( keyDownCheck[m] == 0 ){
							e.preventDefault();								
							$(this).removeAttr('style');
							$(this).removeAttr('hideFocus');	
							$(this).siblings('a,button').andSelf().removeAttr('style');
							$(this).siblings('a,button').andSelf().removeAttr('hideFocus');
							keyDownCheck[m] = 1;
						}
					}
				}
			});			
		});		
		
		
	};
}(jQuery));

//datepicker focus	//12-21
(function($) {
	var module = window.dateFocus = {};
	module.init = function() {		
		var prevA = false, buttonCl = false;		
		$("input[name='day']").next().attr('title', '달력열기');
		
		$("input[name='day']").on('focus', function(e) {		
			var $this = $(this);	
			$('select.ui-datepicker-month').attr('title', '월선택');
			$('select.ui-datepicker-year').attr('title', '연도선택');
			if( buttonCl ){				
				setTimeout(function(){				
					if( $('#ui-datepicker-div').is(':visible') && !prevA ){
						$('#ui-datepicker-div').find('a').first().attr('tabIndex','0').focus();
						$('#ui-datepicker-div').find('a').first().siblings().attr('tabIndex','0');							
					}					
					if( prevA ){
						$this.next().attr('title', '달력열기');
						$("input[name='day']").datepicker('hide');
					}							
					prevA = false;
					buttonCl = false;
				},100);				
			}
			if( $('#ui-datepicker-div').is(':visible') && !prevA ){				
				setTimeout(function(){									
					if( $('#ui-datepicker-div').is(':visible') && !prevA ){						
						if( $(".ui-datepicker-calendar TBODY A").filter("[tabIndex=0]").length > 0 ){			
							$(".ui-datepicker-calendar TBODY A").filter("[tabIndex=0]").attr('tabIndex','0').focus();	
							$('#ui-datepicker-div').find('a').first().attr('tabIndex','0');
						}else{
							$('#ui-datepicker-div').find('a').first().attr('tabIndex','0').focus();
						}						
						$('#ui-datepicker-div').find('a').first().siblings().attr('tabIndex','0');							
					}						
					if( prevA ){
						$this.next().attr('title', '달력열기');
						$("input[name='day']").datepicker('hide');
					}
							
					prevA = false;					
				},100);					
			}
		});
		
		var sp = '<a href="#"></a>';
		$(document).on('keydown', '#ui-datepicker-div a:last', function(e){
			if( e.keyCode == 9 ){
				if( e.shiftKey ){								
				}else{						
					$(sp).insertBefore($("input[name='day']").next());
					$("input[name='day']").next().focus();					
				}
			}
		});		
			
		$(document).on('focus', '.ui-datepicker-trigger', function(e){	//button
			$(this).prev('a').remove();
			buttonCl = true;			
		}).on('keydown', '.ui-datepicker-trigger', function(e){			
			if( e.keyCode == 9 ){
				if( e.shiftKey ){									
				}else{
					if( $('#ui-datepicker-div').is(':visible') ){
						setTimeout(function(){
							$('#ui-datepicker-div').find('a').first().attr('tabIndex','0').focus();
						},10);						
					}
				}
			}
		});
		
		$('.ui-datepicker-trigger').on('click', function(){			
			if( $(this).attr('title') == '달력닫기' ){				
				$(this).attr('title', '달력열기');
			}else{
				$(this).attr('title', '달력닫기');
			}			
		});
				
       	$(document).on('keyup',".ui-datepicker-header > a", function(e){ //arrow: keyboard enter down
       		if( e.keyCode === 13 ){
       			$(this).trigger('click');       			
       		}
       	});       	
       	$(document).on('keydown', '#ui-datepicker-div a:first', function(e){	//arrow first prev
			if( e.keyCode == 9 ){
				if( e.shiftKey ){			//prev focus					
					$("input[name='day']").next().next().focus();
					prevA = true;
				}
			}
		});	
	};
}(jQuery));


/**
 * dongbu mall box rolling  : 상품특징 상단 롤링
 */
;(function($){ 
    $.fn.dongbuArrowRolling= function(option) { 
        return this.each(function() { 
            var $this = $(this);             
            var data  = $this.data('dongbuArrowRolling');             
            if (!data) $this.data('dongbuArrowRolling', (data = new DongbuArrowRolling( $.extend({ele:$this},option) )) ); 
        }); 
    }; 
    $.fn.dongbuArrowRolling.Constructor = DongbuArrowRolling; 
}(jQuery)); 

function DongbuArrowRolling( op ){ 
    this.option = $.extend({ 
        ele: $.noop(), 
        autoplay: false, 
        set : "string" 
    },op);     
    this.timeVal;
    if( this.option.ele.find('li').length < 2 ){
    	this.option.ele.find('button').hide();
    	return false;    	
    }else{    	
    	this.rolling();    
	    if( this.option.autoplay ){
	    	if ( this.option.ele.closest('.content_area').is(':hidden') ){	    		//11-30
	    	}else{
	    		this.startTime();
	    	}	    	
	    }	    
    }   
} 
$.extend(DongbuArrowRolling.prototype, { 
	startTime : function(){		
		var $this = this;
		$this.timeVal = setInterval(function(){
			$this.moving( "next" );
		},5000);		
	},
	stopTime : function(){
		var $this = this;		
		clearInterval($this.timeVal);		
	},
	setCss : function(){		
		var ele = this.option.ele;
		var ul = ele.find('.statsList>ul');
		var $this = this;
		ul.height( ul.find('li:eq(0)').height() );
		ul.width( ul.find('li:eq(0)').width()*ul.find('li').length );		
		// 첫페이지가 상품특징이 아닐때 탭 클릭	11-30
		if( ul.closest('.content_area').is(':hidden') ){			
			if( $this.timeVal ) $this.stopTime();
			$('.tabType01 a').on('click', function(e){
				if( ul.closest('.content_area').is(':visible') ){
					ul.height( ul.find('li:eq(0)').height() );
					ul.width( ul.find('li:eq(0)').width()*ul.find('li').length );
					if( $this.timeVal ){
						$this.stopTime();
					}
					$this.startTime();							
				}				
			});
		}
	},
	moving : function( dir ){
		var ele = this.option.ele;
		var ul = ele.find('.statsList>ul');
		var mvpos = -1;
		if( dir == "prev" ){
			mvpos = 0;
			ul.prepend( ul.find('li:last') );
			ul.css('margin-left',(ul.find('>li:eq(0)').width()*-1) +'px');
		}else{
			mvpos = -1; 
		}		
		ul.animate({ 'margin-left': (ul.find('>li:eq(0)').width()*mvpos) +'px' },function(){
			$(this).css('margin-left','0px');			
			if( mvpos == -1 ) $(this).find('>li:eq(0)').appendTo($(this));			
		});
		
	},
	rolling : function(){
		//type : arrow
		var ele = this.option.ele;
		var arrow = ele.find('button');		//button != a click event 
		var $this = this;
		$this.setCss();
		
		var downCh = false, keyDownCheck = false;
		arrow.on('mousedown',function(e){			
			downCh = true;		
			$(this).data('clicked', true );
		}).on('click', function(e){
			e.preventDefault();						
			if( ele.find('.statsList>ul').is(':animated') )	return false;			
			if( !downCh ) $(this).data('clicked', true );			
			if( $(this).data('clicked') ){	// is click $(this).is(":focus") 
				// both click foucs				
				downCh = false;
				var dir;				
				$(this).hasClass('btn_prev') ? dir = "prev" : dir = "next";
				$this.moving(dir);			
				$(this).data('clicked', false );
			}else{
				//only focus				
				if( downCh ){ 
					$(this).focus();					
				}							
			}			
		}).focus(function(e){
			//e.preventDefault();			
			if( !downCh ){				
				keyDownCheck = true;
				$(this).data('clicked', true );			
				if( $this.timeVal ){
					$this.stopTime();
				}
			}
		}).on('keydown', function(e){
			keyDownCheck = true;
		}).on('mouseenter',function(e){
			e.preventDefault();			
			if( $this.timeVal ){
				$this.stopTime();
			}
		}).on('mouseleave',function(e){
			e.preventDefault();				
			if( !keyDownCheck ) $this.startTime();	//////
		});
		
		//mouse control
		ele.find('.statsList').on('mouseenter',function(e){
			e.preventDefault();			
			if( $this.timeVal ){
				$this.stopTime();
			}
		}).on('mouseleave',function(e){
			e.preventDefault();				
			if( !keyDownCheck ) $this.startTime();	//////
		});
	}	
});

/**
 * dongbu mall box rolling  : 추천상품 롤링
 */
;(function($){ 
    $.fn.dongbuBoxRolling= function(option) { 
        return this.each(function() { 
            var $this = $(this);             
            var data  = $this.data('dongbuBoxRolling');             
            if (!data) $this.data('dongbuBoxRolling', (data = new DongbuBoxRolling( $.extend({ele:$this},option) )) ); 
        }); 
    }; 
    $.fn.dongbuBoxRolling.Constructor = DongbuBoxRolling; 
}(jQuery)); 

function DongbuBoxRolling( op ){ 
    this.option = $.extend({ 
        ele: $.noop(), 
        autoplay: false, 
        set : "string" 
    },op);     
    //element 
    if( this.option.ele.hasClass('rollingBox') ){
    	this.ul = this.option.ele.find('.rolling>ul');
    	this.control = this.option.ele.find('.r_control >a');
    }else{
    	this.ul = this.option.ele.find('.mRolling>ul');
    	this.control = this.option.ele.find('.rControl >a');
    }
    this.timeVal;
    if( this.option.ele.find('li').length < 2 ){
    	this.control.hide();
    	return false;    	
    }else{    	
    	this.rolling();    
	    if( this.option.autoplay ){
	    	if ( this.option.ele.closest('.content_area').is(':hidden') ){	    		//11-30
	    	}else{
	    		this.startTime();
	    	}	    	
	    }  
    }
    
} 
$.extend(DongbuBoxRolling.prototype, { 
	startTime : function(){
		var $this = this;		
		$this.timeVal = setInterval(function(){			
			var count = $this.control.filter('.selected').next().index() < $this.control.length-1 ? count = $this.control.filter('.selected').next().index() : count = 0;			
			$this.control.eq(count).addClass('selected');
			$this.control.eq(count).siblings().removeClass('selected');
			$this.moving(count, 400);		
		},5000);		
	},
	stopTime : function(){
		var $this = this;		
		clearInterval($this.timeVal);
	},
	setCss : function(){
		var ele = this.option.ele;		
		var ul = this.ul;		
		var $this = this;//12-17
		ul.height( ul.find('li:eq(0)').height() );
		ul.width( ul.find('li:eq(0)').width()*ul.find('li').length );
		ul.css('position','relative');
		ul.find('li').css('position', 'absolute');
		ul.find('li').first().css('left', 0+'px');
		ul.find('li').not(':first').css('left', ul.find('li').width()+'px');
		//indicator
		this.control.parent().css('z-index','10');
		// 첫페이지가 상품특징이 아닐때 탭 클릭	11-30
		if( ul.closest('.content_area').is(':hidden') ){			
			if( $this.timeVal ) $this.stopTime();
			$('.tabType01 a').on('click', function(e){
				if( ul.closest('.content_area').is(':visible') ){
					ul.height( ul.find('li:eq(0)').height() );
					ul.width( ul.find('li:eq(0)').width()*ul.find('li').length );
					if( $this.timeVal ){
						$this.stopTime();
					}
					$this.startTime();			
				}				
			});
		}
	},
	moving : function( idx, sec ){
		var ele = this.option.ele;
		var ul = this.ul, li = ul.find('li');		
		var viewLi = li.filter(function(){ if( parseInt($(this).css('left')) == 0 ){ return $(this); } });
		if( viewLi.index() == idx ) return false;
		viewLi.animate({ left : -ul.find('li').width()+'px' }, sec , function(){
			$(this).css('left', ul.find('li').width()+'px');
		});
		//ul.animate({ 'margin-left': ul.find('li:eq(0)').width()*-idx+'px'}, sec );
		if( parseInt(li.filter(':eq('+idx+')').css('left')) < 0 ){
			li.filter(':eq('+idx+')').css('left' , ul.find('li').width()+'px' );			
		}
		li.filter(':eq('+idx+')').animate({ left : '0px' }, sec);				
	},
	rolling : function(){
		//type : indicate
		var ele = this.option.ele;		
		var indi = this.control;
		var $this = this;
		$this.setCss();
		var downCh = false;
		indi.on('mousedown',function(e){			
			downCh = true;		
			$(this).data('clicked', true );			
			if( $this.control.filter(':last.stop').length > 0 ){
				$this.stopTime();
			}			
		}).on('mouseup',function(e){		
			//downCh = false;	
			if( $this.control.filter(':last.stop').length > 0 ){
				$this.startTime();
			}
		}).on('click', function(e){
			e.preventDefault();			
			var idx, sec;					
			if( !downCh ) $(this).data('clicked', true );		
			if( $(this).data('clicked' ) ){	// is click
				// both click foucs								
				if( $(this).hasClass('stop') || $(this).hasClass('play') ){
					//stop. play.
					if( $(this).hasClass('stop') ){
						$(this).removeClass('stop').addClass('play');
						$(this).text("재생");
						if( $this.timeVal ){
							$this.stopTime();
						}
					}else{
						$(this).removeClass('play').addClass('stop');
						$(this).text("정지");
						$this.startTime();
					}					
				}else{
					if( $this.ul.find('li').is(':animated') ) return false;		
					idx = $(this).index();
					$(this).addClass('selected');
					$(this).siblings().removeClass('selected');
					//move					
					if( !downCh ){												
						setTimeout(function(){
							$this.ul.find('li').filter(':eq('+idx+')').find('a,button').first().focus();							
						},10);
						sec = 0;
					}else{
						sec = 400;
					}
					downCh = false;
					$this.moving(idx, sec);
					$(this).data('clicked', false );		
				}
				
			}else{				
				//only focus				
				if( downCh ){ 
					$(this).focus();					
				}							
			}					
		}).focus(function(){			
			if( !downCh ){
				//off				
				indi.filter('.stop').removeClass('stop').addClass('play');
				$(this).data('clicked', true );		
				$(this).text("재생");
				if( $this.timeVal ){
					$this.stopTime();
				}				
			}
		});		
		ele.find('a,button').first().focus(function(){			
			if( !downCh ){
				//off				
				indi.filter('.stop').removeClass('stop').addClass('play');
				$(this).text("재생");
				if( $this.timeVal ){
					$this.stopTime();
				}				
			}
		});
		//list btn focus set view
		//ele.find('.btnArea').each(function(i){
		$this.ul.find('li').each(function(i){			
			$(this).find('a,button').on('focusin', function(){
				var idx = $(this).closest('li').index();				
				//if( $this.ul.find('li:eq(0)').width()*-idx !== parseInt($this.ul.css('margin-left')) ){
				if( $(this).closest('li').css('left') !== '0px' ){
					$this.moving(idx, 0);					
					indi.eq(idx).addClass('selected');
					indi.eq(idx).siblings().removeClass('selected');
				}				
			});			
		});
	}	
});



