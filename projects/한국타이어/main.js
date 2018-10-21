"use strict";
$(function(){
	//flicking	
	if( window.Hammer ){		
		if( $.fn.htswipe !== undefined ){
			$('.bannerImg .rollingArea').htswipe();
			$('.bannerImg_txt .rollingArea').htswipe();	
			//tab swipe
			$('.tabSingle').httabswipe();
		}else{			
			$.fn.htswipe = function(ot){
				return this.each(function(i){
					var $this = $(this);
					var data = $this.data('hantaswipe'); 
					if( !data ){
						$this.data('hantaswipe', (data = new HantaSwipe($.extend({'ele':$this},ot)) ) );
					}else{
						if( $this.data('hantaswipe').timer ){
							clearInterval( $this.data('hantaswipe').timer );
							$this.data('hantaswipe').timer = "none";
						}
						if( $this.data('hantaswipe').o.autoplay ){
							$this.data('hantaswipe').timeset = true;
							if( $this.data('hantaswipe').o.ele.is(':hidden') ){
								$this.data('hantaswipe').timeset = false;		
							}else{			
								$this.data('hantaswipe').rollingPlay();
							}
						}
						$this.data('hantaswipe').init();
					}
				});
			};
			$.fn.htswipe.Constructor = HantaSwipe;		

			$.fn.httabswipe = function(ot){
				return this.each(function(i){
					var $this = $(this);
					var data = $this.data('hantatabswipe');
					if( !data ){
						$this.data('hantatabswipe', (data = new HantaTabSwipe($.extend({'ele':$this},ot)) ) );
					}else{
						$this.removeData('hantatabswipe');
						$this.data('hantatabswipe', (data = new HantaTabSwipe($.extend({'ele':$this},ot)) ) );				
					}
				}); 
			};
			$.fn.httabswipe.Constructor = HantaTabSwipe;	
			//swipe	
			$('.bannerImg .rollingArea').htswipe();
			$('.bannerImg_txt .rollingArea').htswipe();	
			//tab swipe
			$('.tabSingle').httabswipe();	
		}
	}
	//gnb	
	if( !window.hanta.gnb.pub ) hanta.gnb.init();
	//hanta.gnb.init( depth1, depth2 );
	//linklayer
	hanta.linklayer.init();
	//accordion
	hanta.accordion.init();
	
	//img tab
	hanta.imgTab.init();
	//m-service :: kr-ut-guarantee-info input , etc..
	hanta.pages.init();
	//quickButton & top button
	hanta.quickButton.init();
	//textViewMore
	hanta.textViewMore.init();
	//scale img
	hanta.scaleimg.init();
	//coImg_fixed img height 
	hanta.coimgfixed.init();
});

//gnb
(function($){
	if( !window.hanta ) window.hanta = {};	
	var module = window.hanta.gnb = {}; var pubinit = module.pub = undefined;
	var saveDepth1 = $('.gnbInner>ul>li.on').index(), saveDepth2 = $('.gnbInner>ul>li.on li.on').index();
	module.gnbAccordion = function(e){		
		if( $(this).hasClass('btnOpen') ){
			if( !$(this).parent().parent().hasClass('on') ){
				 $(this).parent().parent().addClass('on');
				 $(this).parent().find('strong >a').length < 1 ? $(this).parent().find('strong').css('padding-right','0px') : 
				 $(this).parent().find('strong').css('padding-right','') ;
				 $(this).parent().next().hide();				 
				 $(this).parent().next().slideDown(200);
			}else{
				 $(this).parent().next().slideUp(200, function(){
				 	 $(this).parent().removeClass('on');
				 });
			}			
			$(this).parent().parent().siblings().find('>ul').slideUp(200, function(){
				$(this).parent().removeClass('on');
				$(this).find('li.on').removeClass('on');
				$(this).find('ul').hide();
			});

		}else if(  $(this).hasClass('subtit') && !$(this).hasClass('along') ){
			e.preventDefault();
			if( !$(this).parent().hasClass('on') ){
				$(this).parent().addClass('on');
				$(this).next().hide();
				$(this).next().slideDown(200);
			}else{
				$(this).next().slideUp(200,function(){
					$(this).parent().removeClass('on');
				});
			}
			$(this).parent().siblings().find('>ul').slideUp(200, function(){
				$(this).parent().removeClass('on');
			});
		}
		
	};
	module.gnbClose = function(e){
		e.preventDefault();
		var gnbDiv = $(this).closest('.gnb');
		$('body,html').removeAttr('style');
		$('header').next().show();$('footer').show();
		gnbDiv.animate({'left':'100%'},300,function(){
			gnbDiv.hide();
			$('.commoMn').fadeIn(); //quick btn
		});
		
		gnbDiv.find('.gnbBanner').animate({'left':'100%'},300);
	};
	module.gnbopen = function(e){	
		e.preventDefault();
		var gnbDiv = $(this).closest('.headWrap').next('.gnb');
		if( gnbDiv.is(':visible') ) return false;
		$('.commoMn').hide(); //quick btn
		
		$('body').css('height', $(window).height()+'px');
		gnbDiv.css({'visibility':'hidden'}).show();
		var op = ( !gnbDiv.find('.gnbBanner').outerHeight(true) ? 0 : gnbDiv.find('.gnbBanner').outerHeight(true)) + gnbDiv.find('.gnbHead').outerHeight(true);		
		gnbDiv.find('.gnbInner').height( $(window).height() - op );

		gnbDiv.find('.gnbInner li').removeClass('on');
		gnbDiv.find('.gnbInner li ul').hide();
		if( saveDepth1 !== -1 || saveDepth2 !== -1 ){			
			gnbDiv.find('.gnbInner>ul>li').eq(saveDepth1).addClass('on');
			gnbDiv.find('.gnbInner>ul>li').eq(saveDepth1).find('>ul').show();
			if( gnbDiv.find('.gnbInner>ul>li').eq(saveDepth1).find('>ul').length > 0 ){
				gnbDiv.find('.gnbInner>ul>li').eq(saveDepth1).find('>ul>li').eq(saveDepth2).addClass('on');
			}
			if( gnbDiv.find('.gnbInner>ul>li').eq(saveDepth1).find('>ul>li').eq(saveDepth2).find('>ul').length < 1 || saveDepth2 === -1 ){
				gnbDiv.find('.gnbInner>ul>li').eq(saveDepth1).find('>ul>li').removeClass('on');
			}
			if( saveDepth2 !== -1 ) gnbDiv.find('.gnbInner>ul>li').eq(saveDepth1).find('>ul>li').eq(saveDepth2).find('>ul').show();
		}		
		gnbDiv.css({'left':'100%'}).css({'visibility':'visible'}).animate({'left':'0%'},300, function(){
			$('header').next().hide();$('footer').hide();			
		});		
		gnbDiv.find('.gnbBanner').css({'left':'100%'}).show().animate({'left':'0%'},300);
		//		
		if( $('.gnb .gnbInner:visible >ul >li.on').length > 0 ){ 
			var h = $('.gnb .gnbInner:visible >ul >li.on').index()*$('.gnb .gnbInner:visible >ul >li.on >.titArea').outerHeight(true);		
			if( h ){
				$('.gnb .gnbInner:visible').scrollTop( h );
			}
		}
	};
	module.init = function( depth1, depth2 ){
		//saveDepth1 = $('.gnbInner>ul>li.on').index(); 
		//saveDepth2 = $('.gnbInner>ul>li.on li.on').index();
		saveDepth1 = depth1;
		saveDepth2 = depth2;
		module.pub = true;
		var gnbbtn = $('.headWrap aside .menuAll'), gnbclosebtn = $('.gnb .gnbClose'), gnblist = $('.gnb .gnbInner ul li .btnOpen ,.gnb .gnbInner ul li .subtit');
		gnbbtn.off('click').on('click', module.gnbopen);
		gnbclosebtn.off('click').on('click', module.gnbClose);
		gnblist.off('click').on('click', module.gnbAccordion );
		var w = $(window).width(), h = $(window).height();
		$(window).off('resize.gnbopen').on('resize.gnbopen', function(){
			if( w !== $(window).width() || h !== $(window).height() ){
				if( $('.gnb:visible').length > 0 ){
					var op = (!$('.gnb').find('.gnbBanner').outerHeight(true) ? 0 : $('.gnb').find('.gnbBanner').outerHeight(true) ) + $('.gnb').find('h1').outerHeight(true);	
					$('.gnb .gnbInner').height( $(window).height() - op );
				}				
			}
			w = $(window).width();
			h = $(window).height();
		});
		
	};

}(jQuery));

//quickButton & top button
(function($){
	if( !window.hanta ) window.hanta = {};	
	var module = window.hanta.quickButton = {};
	module.dim = $('<div class="dimmed" style="display:none;"></div>');
	module.btntopBt = 55;
	module.quickBt = 113;
	module.iosSEheight = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream ? $(window).height() === 460? 40 :0 : 0;
	module.ifheightsmall = function( btt ,qmt ){
		btt = !btt ? module.btntopBt : btt;
		qmt = !qmt ? module.quickBt : qmt;
		if( $('body').is(':animated') ) return false;
		var cntHeight = $('.commoMn .conQuick').height();		
		if( $(window).height() >= $('.commoMn .conQuick').height()+ ($('.commoMn .btnQuick').height()*2)+module.btntopBt ){
			$('.commoMn .btnTop').removeAttr('style'); $('.commoMn .quickMn').removeAttr('style');
			if( $(window).scrollTop() < 1 ){
				$('.commoMn .btnTop').height(0);$('.commoMn .quickMn').css('bottom', module.btntopBt+'px');
			}
		}

	}
	module.qucikToggle = function(e){
		e.preventDefault();
		var $this = $(this);		
		var h = $(this).next().css('visibility','hidden').show().height(); 
		$(this).next().css('visibility','visible').removeAttr('style');
		if( !$(this).parent().hasClass('on') ){
			$(this).text('close');
			var sct = $(window).scrollTop();
			var headt = $('header').height()- sct > 0? $('header').height()- sct : 0;
		
			if( $('.commoMn .btnQuick').offset().top-$('header').height() < h ){			
				if( $('.commoMn .btnTop').height() === 0 ){
					$('.commoMn .btnTop').height(""); $('.commoMn .quickMn').css('bottom','114px');					
				}				
				$('body,html').animate({ 'scrollTop' : sct+( Math.abs( h- $('.commoMn .btnQuick').offset().top+$('header').height()  ) )+'px' }, function(){
					module.ifheightsmall();
				});				
			}else{
				module.ifheightsmall();
				if( $(window).scrollTop() < 1 ){
					$('.commoMn .btnTop').height(0);$('.commoMn .quickMn').css('bottom', module.btntopBt+'px');
				}
			}			
		}else{			
			$(this).text('open');
			$('.commoMn .btnTop').css('bottom',''); $('.commoMn .quickMn').css('bottom','');
			$('.commoMn .btnTop').removeAttr('style'); $('.commoMn .quickMn').removeAttr('style');
			if( $(window).scrollTop() < 1 ){
				$('.commoMn .btnTop').height(0);
				$('.commoMn .quickMn').css('bottom', module.btntopBt+'px');
			}
		}
		$(this).parent().toggleClass('on');
		$(this).parent().hasClass('on') ? $(this).next().hide() : $(this).next().show();
		module.dim.appendTo($('body'));
		module.dim.height( $(document).height() );
		module.dim.fadeToggle(200);		
		$(this).next().slideToggle(300, function(){			
			if( !$(this).parent().hasClass('on') ){
				$('.commoMn .btnTop').css('bottom',''); $('.commoMn .quickMn').css('bottom','');
				$('.commoMn .btnTop').removeAttr('style'); $('.commoMn .quickMn').removeAttr('style');
				if( $(window).scrollTop() < 1 ){
					$('.commoMn .btnTop').height(0);
					$('.commoMn .quickMn').css('bottom', module.btntopBt+'px');
				}
			}
		});

	};
	module.scrollView = function(){
		if( $('.dealerMap:visible').length > 0 ) $('.commoMn').hide();
		if( $('.dealerResult:visible .viewType a:first').hasClass('on') ) $('.commoMn').hide();
		var quick = $('.commoMn .quickMn'), top = $('.commoMn .btnTop');
		var $win = $(window).scrollTop();		
		if( $('.commoMn .conQuick').filter(':visible').length < 1 ){
			$('.commoMn .btnTop').removeAttr('style'); $('.commoMn .quickMn').removeAttr('style');
			if( $win > 1 ){
				top.height("");		
				quick.css('bottom', module.quickBt+'px');
			}else{
				top.height(0); 
				quick.css('bottom', module.btntopBt+'px');			
			}
			if( $('.popLayer:visible').length > 0 ){ //layer
				$('.commoMn .quickMn').css('z-index','0');
			}else{
				$('.commoMn .quickMn').css('z-index','');
			}
		}
	};
	module.init = function(){
		//main
		if( $('.mainContent').length > 0 ) $('.commoMn .quickMn .btnQuick').hide();
		if( $('.lmainTab').length > 0 ) $('.commoMn').hide();
		//dealer-locator
		if( $('.dealerMap').length > 0 ) $('.commoMn').hide();
		if( $('.dealerResult:visible .viewType a:first').hasClass('on') ) $('.commoMn').hide();
		$(document).off('click.isdealerMap').on('click.isdealerMap', '.dealerResult .viewType a',function(e){
			if( $('.dealerResult:visible .viewType a:first').hasClass('on') ){
				$('.commoMn').hide();
			}else if( $('.dealerResult:visible .viewType a:last').hasClass('on') ){
				$('.commoMn').show();
			}
		});

 		var quick = $('.commoMn .quickMn .btnQuick'), top = $('.commoMn .btnTop');		
 		if( $('style[top]').length < 1 ){
 			$('head').append('<style top>.commoMn .quickMn,.commoMn .btnTop{-webkit-backface-visibility:hidden;}</style>');
 		}		
		top.off('click').on('click', function(e){
			e.preventDefault();
			$(window).scrollTop(0);
			$(this).height(0);
		});
		quick.off('click.quicktop').on('click.quicktop', module.qucikToggle );
		//
		module.scrollView();
		$(window).off('scroll.quicktop').on('scroll.quicktop', module.scrollView );
		var wd = $(window).width();
		$(window).off('resize.quicktop').on('resize.quicktop', function(e){
			if( wd !== $(window).width() ){
				module.iosSEheight = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream ? $(window).height() === 460? 40 :0 : 0;
				module.ifheightsmall();
				module.scrollView();			
				if( $('.commoMn .conQuick').is(':visible') && $('.commoMn .conQuick').offset().top < $('header').height() ){
					$('.commoMn .btnTop').css({
						'bottom' : ( - module.btntopBt - $('header').height() )+'px'
					});
					$('.commoMn .quickMn').css({
						'bottom' : ( - module.quickBt - $('header').height() )+'px'
						
					});
				}
				wd = $(window).width();
			}
		});
		var lastY;
		function preventmoveQuick(e){
			if( $('.commoMn .conQuick').is(':visible') ){
				e.preventDefault();
				if( $(window).height()+module.iosSEheight >= $('.commoMn .conQuick').height()+ ($('.commoMn .btnQuick').height()*2)+module.btntopBt ){					
				}else{					
					var deltaY = e.originalEvent.touches ? e.originalEvent.touches[0].clientY : e.clientY;
					var quickMnB = parseInt( $('.commoMn .quickMn').css('bottom') );					
					var btnTopB = parseInt( $('.commoMn .btnTop').css('bottom') );
					var dis = (deltaY - lastY);
					var sp = 55;
					if( deltaY > lastY ){ // down
						if( $('.commoMn .conQuick').offset().top -sp > $(window).scrollTop() ){
							dis = 0;
						}
					}else{ // up							
						if( $('.commoMn .btnTop').offset().top+$('.commoMn .btnTop').height() +sp < $(window).scrollTop() +$(window).height() ){
							dis = 0;
						}
					}
					$('.commoMn .quickMn').css('bottom' , quickMnB-(dis)+ "px");					
					$('.commoMn .btnTop').css('bottom' , (quickMnB-(dis)- $('.commoMn .btnTop').height()) + "px"); //btnTopB-(dis)
					lastY = deltaY;
				}
			}
		}
		
		module.dim.off('touchstart.qucik').on('touchstart.qucik', function(e){
			lastY = e.originalEvent.touches[0].clientY;
		});
		$('.commoMn').off('touchstart.qucik').on('touchstart.qucik', function(e){
			lastY = e.originalEvent.touches[0].clientY;
		});
		module.dim.off('touchmove.qucik').on('touchmove.qucik', preventmoveQuick);
		$('.commoMn').off('touchmove.qucik').on('touchmove.qucik' , preventmoveQuick);

	};

}(jQuery));


//linklayer
(function($){
	if( !window.hanta ) window.hanta = {};	
	var module = window.hanta.linklayer = {};
	module.layertops = 60;
	module.dim = $('<div class="dimmed" style="display:block"></div>');
	module.layerheight = function( layer ){
		layer.find('.popCon').css({	'height':'100%'	});
		layer.find('.popCon').css({	'height':''	});
		layer.find('.popCon').css({	'width':'100%'	});
		layer.find('.popCon').css({	'width':''	});
		layer.css({
			'padding-top' : layer.find('>.popTit').outerHeight(true)+'px'
		});
		
	}
	module.layershow = function(e){
		e.preventDefault();
		$(this).attr('href','javascript:;');		
		var data = "data-poplayer";
		var layer = $('.popLayer['+data+'= '+ $(this).attr(data) +']');
		if ( layer.length < 1 ) return false;
		layer.css('visibility','visible');
		var hpos = $(window).height() < layer.outerHeight(true) ? 0 : parseInt(($(window).height()-layer.outerHeight(true))/2);	
		var headt = $('header').height()-$(window).scrollTop() > 0? $('header').height()-$(window).scrollTop(): 0;
		$('.commoMn .quickMn').css('z-index','0');
				
		layer.show();
		layer.css({'top':'','bottom':'','margin-top':''});
		var layerothers = layer.find('>.popTit').outerHeight(true)+(layer.find('>.btnEc').height()||40);		
		var mxHeight = $(window).height() - (layerothers + parseInt(module.layertops));		
		module.layerheight(layer);
		var conScHeight = layer.find('.popCon').get(0).scrollHeight;

		if( conScHeight === layer.find('.popCon').outerHeight(true) && mxHeight > layer.find('.popCon').outerHeight(true) ){
			layer.css({
				'top':'50%',
				'bottom' :'inherit',
				'margin-top': - ( (layer.find('.popCon').outerHeight(true)/2)+ parseInt(layerothers/2) ) +'px'
			});
		}
		
		layer.css('visibility','');
		$('body').css('overflow','hidden');
		//if( $('body').find('.dimmed').length > 0 ){			
		//	if( $('.dimmed').is(':hidden') ) $('.dimmed').show();
		//}else{
			module.dim.insertAfter(layer).show();
		//}
		$('.dimmed:visible').height( hpos < 1 ? layer.offset().top+layer.outerHeight(true): $(window).height() );
		if(  $('.dimmed:visible').height() < $(document).height() ) $('.dimmed:visible').height( $(document).height() );
	}
	module.layerhide = function(e){ 
		var parent = $(this).closest('.popLayer');
		e.preventDefault();			
		$(this).attr('href','javascript:;');		
		parent.hide();
		if( $('.popLayer:visible').length < 1 ){
			$('.commoMn .quickMn').removeAttr('style');
			$('body').css('overflow','');
			if( parent.siblings('.popLayer:visible').length > 0 ) return false; 
			//if( $('body').find(module.dim).length > 0 ){
				module.dim.remove();
			//}else{
			//	$('.dimmed').hide();
			//}	
		}
			
	}	
	module.layerapply = function(e){  //gt- tire - detail
		var parent = $(this).closest('.popLayer');
		$('body').css('overflow','');
		var labelTxt = parent.find('input:checked').next().text();		
		if( parent.prev().hasClass('btnPop') ){
			$(this).attr('href','javascript:;');			
			parent.prev().text( labelTxt !== "" ?labelTxt : parent.prev().text() );
			parent.hide();
			//if( $('body').find(module.dim).length > 0 ){
				module.dim.remove();
			//}else{
			//	$('.dimmed').hide();
			//}
		}
		
	}
	var lastY;
	module.preventScroll = function(e){
		if( $('.popLayer:visible').length > 0 ){
			var deltaY = e.originalEvent.touches ? e.originalEvent.touches[0].clientY : e.clientY;
			if( $(e.target).closest('.popCon').length > 0 ){
				var doublescroll = $(e.target).closest('div').filter(function(e){
					if( $(this).css('overflow-y') === 'auto' && !$(this).hasClass('popCon')){return $(this);} });
			
				if( deltaY < lastY ){ // down 
					var end = $(e.target).closest('.popCon').get(0).scrollHeight - $(e.target).closest('.popCon').outerHeight(true);
					if( $(e.target).closest('.popCon')[0].scrollTop === end && doublescroll.length < 1  ){
						e.preventDefault();
					}
					if($(e.target).closest(doublescroll).length > 0){
						doublescroll.each(function(i){
							if( $(this).scrollTop() === $(this).get(0).scrollHeight - $(this).height() ){ 
								e.preventDefault();
							}
						});
					}
				}else{
					if( $(e.target).closest('.popCon')[0].scrollTop === 0 && doublescroll.length < 1 ){
						e.preventDefault();
					}
					if( $(e.target).closest(doublescroll).length > 0 ){
						doublescroll.each(function(i){
							if( $(this).scrollTop() === 0 ){
								e.preventDefault();
							}
						});	
					}
				}
				lastY = deltaY;
			}else{
				e.preventDefault();
			}
		}
	}
	module.changeLayerSet = function(){
		var layer = $('.popLayer:visible');
		if( layer.length > 0 ){ 
			var layerothers = layer.find('>.popTit').outerHeight(true)+(layer.find('>.btnEc').height()||40);					
			module.layerheight(layer);				
			if( layer.find('.popCon')[0].scrollHeight+layerothers+ module.layertops	>= $(window).height() ){
				layer.css({'top':'','bottom':'','margin-top':''});
			}else{
				layer.css({
					'top':'50%',
					'bottom' :'inherit',
					'margin-top': - ( (layer.find('.popCon').outerHeight(true)/2)+ layerothers/2 ) +'px'
				});
			}
			
		}
	};
	module.init = function(){
		$(document).off('click.poplayerbtn').on('click.poplayerbtn', '[data-poplayer]:not(div)', module.layershow );
		$(document).off('click.poplayerclose').on('click.poplayerclose', '.popLayer .popClose',module.layerhide );
		$(document).off('click.poplayerapply').on('click.poplayerapply', '.popLayer .btnEc a.btn.btnApply',module.layerapply ); //apply
		$(document).off('click.poplayerclosebottom').on('click.poplayerclosebottom', '.popLayer .btnEc a.btn.btnLevel1', module.layerhide ); //close
		
		var w = $(window).width(),  h = $(window).height();
		$(window).off('resize.linklayer').on('resize.linklayer', function(){
			if( w !== $(window).width() || h !== $(window).height() ){
				var layer = $('.popLayer:visible');
				
				var hpos = $(window).height() < layer.outerHeight(true) ? 0 : parseInt(($(window).height()-layer.outerHeight(true))/2);
				$('.dimmed:visible').height( hpos < 1 ? layer.offset().top+layer.outerHeight(true): $(window).height() );
				if(  $('.dimmed:visible').height() < $(document).height() ) $('.dimmed:visible').height( $(document).height() );
				//				
				module.changeLayerSet();	
				//layer.hide().show();		
			}			
			w = $(window).width();
			h = $(window).height();
		});		
		//change data
		var pheight = 0;
		$(document).off('DOMSubtreeModified.poplayersize').on('DOMSubtreeModified.poplayersize', '.popLayer .popCon',function(e){			
			if ( pheight !== $('.popLayer:visible .popCon').height() ){
				module.changeLayerSet();
			}
			pheight = $('.popLayer:visible .popCon').height();
		});		
		//prevent Scroll		
		$(document).off('DOMSubtreeModified.poplayerscroll click.poplayerscroll').on('DOMSubtreeModified.poplayerscroll click.poplayerscroll', function(e){			
			if( $('.popLayer:visible').length > 0 && $('.popLayer:visible').css('-webkit-backface-visibility') !=='hidden' ){ 
				$('.popLayer').css({'-webkit-backface-visibility':'hidden'});
				$('.popLayer').off('touchmove.poplayerscroll').on('touchmove.poplayerscroll', module.preventScroll);
				module.dim.off('touchmove.poplayerscroll').on('touchmove.poplayerscroll', function(e){
					if( $('.popLayer:visible').length > 0 ){ e.preventDefault(); }
				});
				$('.popLayer').off('touchstart.poplayerscroll').on('touchstart.poplayerscroll', function(e){
					lastY = e.originalEvent.touches[0].clientY;
				});
				
				$('.popLayer').off('touchend.poplayerscroll').on('touchend.poplayerscroll', function(e){
					return true;
				});
				module.dim.off('touchend.poplayerscroll').on('touchend.poplayerscroll', function(e){
					return true;
				});
				//				
			}			
		});
	} 
	 
}(jQuery));

//accordion
(function($){
	if( !window.hanta ) window.hanta = {};	
	var module = window.hanta.accordion = {};
	
	module.accordionOpen = function(e){ 
		e.preventDefault(); 
		if( $(this).parent().hasClass('on') ){
			$(this).next().slideUp(200,function(){
				$(this).closest('li').removeClass('on');
			});
		}else{
			if( $(this).parent().siblings().find('.accrCon').is(':animated').length > 0 ) return false;
			var next = $(this).parent().siblings().filter('.on');
			next.removeClass('on').find('.accrCon').show();
			next.find('.accrCon').slideUp(200);		
			$(this).parent().addClass('on');
			$(this).parent().find('.accrCon').hide();
			$(this).next().slideDown(200);
		}
		
	}
	module.accordionClose = function(e){
		e.preventDefault();
		$(this).parent().slideUp(200,function(){
			$(this).closest('li').removeClass('on');			
		});
		if( $(this).parent().prev('a').offset().top < $(window).scrollTop() ){			
			var sp =  $(this).parent().prev('a').offset().top ;
			$('body,html').animate({ 'scrollTop' : sp+'px'});
		}
	}	
	module.accordionagreeOpen = function(e){
		e.preventDefault();		
		$(this).closest('.tit').next().slideToggle(250, function(){
			$(this).closest('li').toggleClass('on');
		});
	};
	module.init = function(){
		var accordionlist = '.accrList .accrTit', //$('.accrList .accrTit'), 
		accordionclose = '.accrList .accrCon .close'; //$('.accrList .accrCon .close');		
		$(document).off('click.accrlist').on('click.accrlist', accordionlist, module.accordionOpen );
		$(document).off('click.accrlistclose').on('click.accrlistclose', accordionclose, module.accordionClose );

		//m-service : kr-ut-guarantee-info accordion 약관 동의 
		var accbtn = $('.accrAgree .btn');
		accbtn.off('click.accragree').on('click.accragree', module.accordionagreeOpen );
	} 
	 
}(jQuery));

//img Tab
(function($){
	if( !window.hanta ) window.hanta = {};	
	var module = window.hanta.imgTab = {};
	
	module.tabdep = function(e){
		e.preventDefault();
		var idx = $(this).parent().index();
		if( $(this).closest('.imgTab').hasClass('folder') ){
			$(this).closest('.imgTab').siblings('.imgTabCon').eq(idx).slideDown(300);
			$(this).closest('.imgTab').removeClass('folder');
			if( $('.imgTab.finder >ul>li.on').attr('style')  ){
				$(window).scrollTop( $('header').outerHeight() + $('h1').outerHeight() );
				$('.imgTab.finder >ul>li').css({'position':'',	'top':'','z-index':'','left':'','margin':''});
				$('.imgTab.finder').css('height',"");
			}
		}else{
			$(this).parent().addClass('on');
			$(this).parent().siblings().removeClass('on');
			$(this).closest('.imgTab').siblings('.imgTabCon').hide();
			$(this).closest('.imgTab').siblings('.imgTabCon').eq(idx).show();
		}		
	};
	module.tabdepcon = function(e){
		e.preventDefault();
		var idx = $(this).parent().index();
		$(this).parent().addClass('on');
		$(this).parent().siblings().removeClass('on');
		$(this).closest('ul').siblings('.finderForm').hide();
		$(this).closest('ul').siblings('.finderForm').eq(idx).show();		
	};
	module.tabdepfolder = function(e){
		e.preventDefault();
		$(this).closest('.imgTabCon').slideUp(300);
		var animTime = 0;
		$('.imgTab.finder').closest('.accrList.wide').length < 1? animTime = 0 : animTime = 300;
		if( $(this).closest('.imgTabCon').prev().offset().top < $(window).scrollTop() ){			
			var sp = $(this).closest('.imgTabCon').prev().offset().top;
			$('body,html').animate({ 'scrollTop' : sp+'px' },animTime);
		}
		//$('.imgTab.finder').addClass('folder');
		$(this).closest('.imgTabCon').prevAll().filter('.imgTab.finder').first().addClass('folder');		
	};
	module.fixedimgtab = function( pos ){
		if( $(window).scrollTop() === 0 ){
			pos = $('.imgTab.finder').offset().top;
		}
		if( $('.imgTab.finder.folder').closest('.accrList.wide').length < 1 ){
			if( $('.imgTab.finder.folder').length>0 ){ 
				if( $(window).scrollTop() > pos ){ 
					$('.imgTab.finder.folder >ul>.on').css({
						'position':'fixed',
						'top':'0px',
						'z-index':'100',
						'left':'0px',
						'margin':'0px'
					});
					$('.imgTab.finder.folder').height( $('.imgTab.finder.folder >ul>.on').height() );
				}else{
					$('.imgTab.finder >ul>li').css({'position':'','top':'','z-index':'','left':'','margin':''});
					$('.imgTab.finder.folder').height("");
				}
			}
			
		}
	}
	module.init = function(){
		var tabDep1 = $('.imgTab a');
		var tabDep2 = $('.imgTabCon .tabDepth a');
		var close = $('.imgTabCon .foldBtn .btnClose');
		
		tabDep1.off('click').on('click', module.tabdep );
		tabDep2.off('click').on('click', module.tabdepcon );
		close.off('click').on('click', module.tabdepfolder );

		//
		if( $('.imgTab.finder').length>0 ){
			var firsttoppos = $('.imgTab.finder').offset().top;
			module.fixedimgtab(firsttoppos);
			$(window).off('scroll.imgtabfolder').on('scroll.imgtabfolder',function(){
				module.fixedimgtab(firsttoppos);
			});
		}

	};
}(jQuery));

//
(function($){
	if( !window.hanta ) window.hanta = {};	
	var module = window.hanta.pages = {};
	
	module.agreeCheck = function(){
		var all = $('.accrAgree .agreeAll input');
		var checklist = $('.accrAgree .agreeList input');
		all.off('change').on('change', function(e){
			if( $(this).prop('checked') ){
				$(this).closest('.accrAgree').find('.agreeList input').prop('checked', true);
			}else{
				$(this).closest('.accrAgree').find('.agreeList input').prop('checked', false);
			}
		});
		checklist.off('change').on('change', function(e){
			var len = $(this).closest('ul').find('li').length;
			var ilen = $(this).closest('ul').find('input:checked').length;
			if( len === ilen ){
				 $(this).closest('.accrAgree').find('.agreeAll input').prop('checked', true);
			}else{
				 $(this).closest('.accrAgree').find('.agreeAll input').prop('checked', false);
			}
		});
	}	
	module.cookieHide = function(e){
		//cookie close
		e.preventDefault();
		$('article.cookiepop').hide();	
	}
	module.listsort = function(){			
		function btnToggle(e){
			e.preventDefault();
			var $this = $(this), idx = $(this).parent().index(); 
			if( $(this).closest('.rangeArea').find('dl:visible').length < 1 || $(this).closest('.rangeArea').find('dl:visible').index('dl') === idx ){
				$(this).closest('.rangeArea').find('>dl').each(function(i){
					if( idx === i ){
						$(this).slideToggle(200,function(){
							$this.parent().toggleClass('on');
						});
					}
				});
			}else{ 
				$(this).closest('.rangeArea').find('dl:visible').hide();
				$(this).closest('.rangeArea').find('dl').eq(idx).show();
				$this.parent().siblings().removeClass('on');
				$this.parent().addClass('on');
			}
			
		};
		var btnSearch = '.rangeArea .btnSearch';		
		$(document).off('click.rangeareabtnsearch').on('click.rangeareabtnsearch', btnSearch, btnToggle );
		var btnFilter = '.rangeArea .btnFilter';
		$(document).off('click.rangeareabtnfilter').on('click.rangeareabtnfilter', btnFilter, btnToggle );	
	}
	module.dealernearTab = function(){
		/* //검색버튼
		$('.btnFind').off('click.dealernear').on('click.dealernear',function(e){
			e.preventDefault();
			$(this).closest('.dealerSearch').removeClass('open').addClass('find');
			var $this = $(this);
			setTimeout(function(){
				$(window).scrollTop( $this.closest('.dealerSearch').find('.btnAll').offset().top-10 );
			},50);			
		});*/
		//
		$(document).off('DOMNodeInserted.dealernear').on('DOMNodeInserted.dealernear',function(){
			if( $('.dealerMap:visible').length > 0 ){ 
				if( !$('.dealerSearch.find').filter(':visible').hasClass('open') && $('.dealerSearch.find').filter(':visible').length>0 ){
					$(window).scrollTop( $('.dealerSearch:visible').find('.btnAll').offset().top-10 );
				}
			}
		});
		$('.btnAll').off('click.dealernear').on('click.dealernear',function(e){
			$(this).closest('.dealerSearch').addClass('open');
			$(window).scrollTop( $('.imgTab.dealer:visible').offset().top );
		});
		$('.btnShort').off('click.dealernear').on('click.dealernear',function(e){
			e.preventDefault();
			$(this).closest('.dealerSearch').removeClass('open');
			var $this = $(this); 
			setTimeout(function(){
				$(window).scrollTop( $this.closest('.dealerSearch').find('.btnAll').offset().top-10 );
			},50);
		});
		$('.dealerResult .viewType a').off('click.dealernear').on('click.dealernear',function(e){
			$(this).siblings().removeClass('on');
			$(this).addClass('on');
		});
		//check input
		//$('.dealerSearch .detail').each(function(k){
			//$(this).find('.searchCon').eq(0).find('input:first').prop('checked',true);
			//$(this).find('.searchCon').eq(1).find('input:first').prop('checked',true);			
		//});
		$('.dealerSearch .detail input[type=checkbox]').off('change.dealernear').on('change.dealernear',function(e){
			if( $(this).closest('.searchCon').find('input').filter(':checked').length < 1 ) $(this).prop('checked',true);
			if( $(this).closest('.icoAll').length > 0 && $(this).prop('checked') ){
				$(this).closest('.searchCon').find('span:not(.icoAll) input').prop('checked',false);
			}
			if( $(this).closest('.icoAll').length < 1 ){
				$(this).closest('.searchCon').find('.icoAll input').prop('checked',false);
			}
		});
		//height 
		$('.dealerMap .map').height( $(window).height()-$('.dealerResult').height()-50 );
		var w = $(window).width();
		$(window).off('resize.dealernear').on('resize.dealernear', function(){
			if( w !== $(window).width() ){
				$('.dealerMap .map').height( $(window).height()-$('.dealerResult').height()-50 );
				w = $(window).width();
			}			
		});
	}
	module.removeplaceholder = function(){		
		$('input[type=text]').each(function(i){
			var m = $(this).attr('placeholder');		
			$(this).off('focus.removeplaceholder').on('focus.removeplaceholder',function(e){					
				if( $(this).val().length < 1 ){
					$(this).attr('placeholder','');
				}else{
					$(this).attr('placeholder',m);
				}
			}).off('blur.removeplaceholder').on('blur.removeplaceholder',function(e){
				if( $(this).val().length < 1 ){
					$(this).attr('placeholder',m);
				}
			});
		});
	}
	module.init = function(){
		//dealer-locator-near tab
		module.dealernearTab();
		//m-service : kr-ut-guarantee-info input check 약관 동의 
		module.agreeCheck();
		//list btnFilter btn : m-tire gt-pr-list etc..
		module.listsort();
		//cookie close
		$(document).off('click.gmainpop').on('click.gmainpop', 'article.cookiepop .close', module.cookieHide);
		//placeholder focus remove
		module.removeplaceholder();
	};

}(jQuery));

//text view more
(function($){
	if( !window.hanta ) window.hanta = {};	
	var module = window.hanta.textViewMore = {};
	
	module.viewmore = function(e){
		var hp = $(this).parent().get(0).scrollHeight;
		$(this).parent().animate({'height': hp+'px'},600);
		$(this).fadeOut(600, function(){
			$(this).parent().css('height','auto');
		});
		$(this).data('clicked', true);
	}
	module.viewmoreresize = function(){		
		var wd = $(window).width();
		return function(e){ 
			if( wd !== $(window).width() ){
				$('.txtMore').each(function(i){
					if( !$(this).data('clicked') ){
						if( $(this).parent().get(0).scrollHeight <= $(this).parent().height() ){
							$(this).hide();
						}else{
							$(this).show();
						}
					}
				});
				wd = $(window).width();
			}
		}
	}
	module.init = function(){
		var more = $('.txtMore');
		more.off('click').on('click', module.viewmore );		
		function setmore(){
			$('.txtEditMore:visible .txtMore').each(function(i){
				if( !$(this).data('clicked') ){
					if( $(this).parent().get(0).scrollHeight <= $(this).parent().height() ){
						$(this).hide();
					}else{
						$(this).show();
					}
				}
			});
		}
		setmore();
		$(document).off('DOMSubtreeModified.textviewmore').on('DOMSubtreeModified.textviewmore', function(e){
			if( $('.txtEditMore:visible').length >0 ){ 
				setmore(); 
			}
		});
		$(window).off('resize.textviewmore').on('resize.textviewmore', module.viewmoreresize() );
	};

}(jQuery));
//scale img
(function($){
	if( !window.hanta ) window.hanta = {};	
	var module = window.hanta.scaleimg = {};
	module.scaleCssadd = function(){
		if( $('style[scale]').length < 1 ){
			$('head').append('<style scale> .scale .img{ transition: all 400ms cubic-bezier(0.390, 0.575, 0.565, 1.000); }</style>');
		}		
	}
	module.init = function(){
		module.scaleCssadd();
		$(document).off('touchstart.scale touchmove.scale').on('touchstart.scale touchmove.scale','.scale', function(e){			
			$(document).find('.scale .img').css('transform', 'scale(1)');
			$(this).find('.img').css('transform', 'scale(1.1)');
		});
	}
}(jQuery));
//coImg_fixed img height 
(function($){
	if( !window.hanta ) window.hanta = {};	
	var module = window.hanta.coimgfixed = {};
	module.setheight = function(){
		var comp = $('.coImg_fixed .visualCon img');		
		var setimg = new Image(); 
		setimg.src = comp.attr('src');
		var setimgheight = setimg.height;
		if( $(document).width() < 350 ){ //해상도 
			comp.height( (setimgheight/2.5) );
		}else{
			comp.height( (setimgheight/2) );
		}
	}
	module.init = function(){
		if( $('.coImg_fixed .visualCon img').length >0 ){
			module.setheight();		
			$(window).off('resize.coimgheight').on('resize.coimgheight', module.setheight );
		}		
	}
}(jQuery));
//swipe
// element : swpie될 div>ul>li 구성의 div element
(function($){
	$.fn.htswipe = function(ot){
		return this.each(function(i){
			var $this = $(this);
			var data = $this.data('hantaswipe'); 
			if( !data ){
				$this.data('hantaswipe', (data = new HantaSwipe($.extend({'ele':$this},ot)) ) );
			}else{
				if( $this.data('hantaswipe').timer ){
					clearInterval( $this.data('hantaswipe').timer );
					$this.data('hantaswipe').timer = "none";
				}
				if( $this.data('hantaswipe').o.autoplay ){
					$this.data('hantaswipe').timeset = true;
					if( $this.data('hantaswipe').o.ele.is(':hidden') ){
						$this.data('hantaswipe').timeset = false;		
					}else{			
						$this.data('hantaswipe').rollingPlay();
					}
				}
				$this.data('hantaswipe').init();
			}
		});
	};
	$.fn.htswipe.Constructor = HantaSwipe;
}(jQuery));
function HantaSwipe(ot){
	this.o = $.extend({
		'ele': $.noop(),
		'indicate': $.noop(),
		'arrow': $.noop(),
		'autoplay': false,
		'pageNum' : $.noop()
	},ot);
	this.o.pageNum = this.o.ele.siblings('.pageNum');
	this.o.indicate = this.o.ele.siblings('.slideNavi').find('a');
	this.o.arrow = this.o.ele.siblings('.btn');
	this.timer = "none";
	this.timeBtn = this.o.ele.siblings('.slideNavi').find('button');
	if( this.o.autoplay ){
		this.timeset = true;
		if( this.o.ele.is(':hidden') ){
			this.timeset = false;		
		}else{			
			this.rollingPlay();
		}
	}	
	if ( this.o.ele.find('li').length < 2 ){
		this.o.ele.siblings('.slideNavi').hide();
		this.o.ele.siblings('.btn').hide();
		this.o.ele.siblings('.pageNum').hide();
		this.o.autoplay = false;
		this.timeset = false;
		this.rollingStop();
	}else{
		this.o.ele.siblings('.slideNavi').find('a').removeClass('on');
		this.o.ele.siblings('.slideNavi').find('a:first').addClass('on');
	}
	this.dirtrl = $('html[dir="rtl"]').length < 1 ? false : true;
	this.init();
}
$.extend(HantaSwipe.prototype,{
	setCss: function(){		
		var $this = this;
		this.o.ele.find('li img').each(function(i){
			var nimg = new Image();
			nimg.src = this.src;
			$this.o.ele.find('>ul').height( $this.o.ele.find('li').height() );
			if( $this.o.ele.find('.bannerIntxt').length > 0 ){
				$this.o.arrow.css('top', ($this.o.ele.find('li:visible .bannerIntxt').outerHeight()/2)-20 +'px');
			}else{
				$this.o.arrow.css('top', ($this.o.ele.find('li:visible .img').height()/2) +'px');
			}			
		});
		$(window).off('load.hantaswipe').on('load.hantaswipe',function(){
			$this.o.ele.find('>ul').height( $this.o.ele.find('li').height() );
			if( $this.o.ele.find('.bannerIntxt').length > 0 ){
				$this.o.arrow.css('top', ($this.o.ele.find('li:visible .bannerIntxt').outerHeight()/2)-20 +'px');
			}else{
				$this.o.arrow.css('top', ($this.o.ele.find('li:visible .img').height()/2) +'px');
			}
			if( $this.o.pageNum.length > 0 && $this.o.ele.parent().parent().filter(':not(.bannerImg_txt)').length >0 && $this.o.ele.find('li:visible .img').width() <$this.o.ele.width() ){			
				var pageNumdirtrl = ( $this.dirtrl ? "left" : "right"); 
				$this.o.pageNum.css(new String(pageNumdirtrl), ($this.o.ele.width()/2) +'px');
				var rightpos = parseInt($this.o.pageNum.css( new String(pageNumdirtrl)) ) - ($this.o.ele.find('li .img').width()/2);
				$this.o.pageNum.css(new String(pageNumdirtrl), rightpos+'px');
			}	
		});
		if( this.o.ele.filter(':visible').length > 0 ){
			$.get(this.o.ele.filter(':visible').find('li:visible img').attr('src'), function(data){  
				$this.o.ele.find('>ul').height( $this.o.ele.find('li:visible').height() );
				if( $this.o.ele.find('.bannerIntxt').length > 0 ){
					$this.o.arrow.css('top', ($this.o.ele.find('li:visible .bannerIntxt').outerHeight()/2)-20 +'px');
				}else{
					$this.o.arrow.css('top', ($this.o.ele.find('li:visible .img').height()/2) +'px');
				}
				if( $this.o.pageNum.length > 0 && $this.o.ele.parent().parent().filter(':not(.bannerImg_txt)').length >0 && $this.o.ele.find('li:visible .img').width() <$this.o.ele.width() ){			
					var pageNumdirtrl = ( $this.dirtrl ? "left" : "right"); 
					$this.o.pageNum.css(new String(pageNumdirtrl), ($this.o.ele.width()/2) +'px');
					var rightpos = parseInt($this.o.pageNum.css( new String(pageNumdirtrl)) ) - ($this.o.ele.find('li .img').width()/2);
					$this.o.pageNum.css(new String(pageNumdirtrl), rightpos+'px');
				}	
			});			
		}		
		this.o.ele.width('100%');
		
		this.o.ele.find('>ul').css('position','relative');
		//this.o.ele.find('li').width('100%');
		this.o.ele.find('li').css({'position':'absolute','left':'0px','overflow' : 'hidden'});			
		this.o.ele.find('li').not(':first').hide();
		this.o.ele.find('li').filter(':first').data('active','1');		
	},
	resetCss : function(){
		var $this = this;
		if( $this.o.ele.find('li:visible').length < 2 ) $this.o.ele.find('>ul').height( $this.o.ele.find('li:visible').height() );		
		if( $this.o.ele.find('.bannerIntxt').length > 0 ){
			$this.o.arrow.css('top', ($this.o.ele.find('li:visible .bannerIntxt').outerHeight()/2)-20 +'px');
		}else{ 
			$this.o.arrow.css('top', ($this.o.ele.find('li:visible .img').height()/2) +'px');
		}

		if( $this.o.pageNum.length > 0 && $this.o.ele.parent().parent().filter(':not(.bannerImg_txt)').length >0 && $this.o.ele.find('li:visible .img').width() <$this.o.ele.width() ){			
			var pageNumdirtrl = ($this.dirtrl ? "left" : "right");
			$this.o.pageNum.css( new String(pageNumdirtrl), ($this.o.ele.width()/2) +'px');
			var rightpos = parseInt($this.o.pageNum.css(new String(pageNumdirtrl))) - ($this.o.ele.find('li .img').width()/2);			
			$this.o.pageNum.css(new String(pageNumdirtrl), rightpos+'px');
		}	
	},
	rollingStop : function(){
		//this.timeBtn.filter('.stop').addClass('play').removeClass('stop');		
		clearInterval(this.timer); 
		this.timer = undefined;
	},
	rollingPlay : function(){ 
		clearInterval(this.timer);
		this.timer = setInterval( roll, 4800 );
		var $this = this;
		var $thiselem = $this.o.ele;		
		function roll(){ 
			var animated = $thiselem.find('li').filter(function(i){ if( $(this).data('animated') === true ){ return $(this); } });
	    	if( animated.length > 0 ) return false;	    	
			var $now = $thiselem.find('li:visible').filter(function(i){ if( $(this).data('active') === '1' ){ return $(this); } });			
			$this.timeBtn.filter('.play').addClass('stop').removeClass('play');
			var playdirtrl = ($this.dirtrl ? "right" : "left");
			$this.swipeAni( $now, playdirtrl );
		}
	},
	swipeAni : function( now,dir,dot ){		
		var $prev = now.prev(), $next = now.next(), winWidth = now.width(); //winWidth = $(window).width();		
		var elem, movepos, csspos;
		var $this = this;
		if( typeof dot ==="number" ){ //only left
			if( dot === now.index() ) return false;			
			movepos = -1;			
			csspos = 1;
			elem = now.parent().find('li').eq(dot);
		}else{
			var dirtrl = ($this.dirtrl ? "left" : "right");
			if( dir === dirtrl ){	
				if( $prev.length > 0 ){
					elem = $prev;
				}else{
					elem = now.siblings().last();
				}
				movepos = ($this.dirtrl ? -1 : 1 );
				csspos = ($this.dirtrl ? 1 : -1 );				
			}else{
				if( $next.length > 0 ){
					elem = $next;
				}else{
					elem = now.siblings().first();
				}
				movepos = ($this.dirtrl ? 1 : -1 );
				csspos = ($this.dirtrl ? -1 : 1 );
			}
		}
		//cm
		now.animate({'left': movepos*winWidth+'px'},300);
		//	
		if( $this.o.ele.data('active') === dir || $this.o.autoplay && $this.timer ) elem.css('left', csspos*winWidth+'px');
		elem.data('animated',true);
		elem.show().animate({'left': 0+'px'},300,function(){
			now.removeData('active').hide();
			//
			elem.siblings().hide();
			//
			$this.o.ele.find('>ul').stop().animate({ 'height' :  elem.height()+'px'  },200);
			//arrow top
			if( $this.o.arrow.length > 0 ){
				if( $this.o.ele.find('.bannerIntxt').length > 0 ){
					$this.o.arrow.css('top', ($this.o.ele.find('li:visible .bannerIntxt').outerHeight()/2)-20 +'px');
				}else{
					$this.o.arrow.css('top', ($this.o.ele.find('li .img:visible').height()/2) +'px');
				}			
			}
			//
			elem.data('active','1');
			if( $this.o.indicate.length > 0 ){
				$this.o.indicate.removeClass('on');
				$this.o.indicate.eq(elem.index()).addClass('on');
			}			
			elem.removeData('animated');
			//play interval			
			if( !$this.o.ele.data('hantaswipe').timer && $this.o.ele.data('hantaswipe').timeset && $this.o.autoplay ){ $this.rollingPlay();}
		});
				
		//page index		
		if( $this.o.pageNum.length > 0 ){
			$this.pageNum( elem.index() );
		}
		
				
	},
	swipeEventSide : function( $this ){
		return function (e){			
			if ( $this.o.ele.find('li').length < 2 ) return false;
			var $thiselem = $this.o.ele;			
			e.preventDefault();
			
	    	var animated = $thiselem.find('li').filter(function(i){ if( $(this).data('animated') === true ){ return $(this); } });
	    	if( animated.length > 0 ) return false;	    	
    		var $now = $thiselem.find('li:visible').filter(function(i){ if( $(this).data('active') === '1' ){ return $(this); } });	    
	    	if( $now.length < 1 ) $now = $thiselem.find('li:first');
	    	var deltaX = e.deltaX, 
	    	$prev = $now.prev() ,$next = $now.next();
	    	var dir = (deltaX < 0)? "left":"right";
	    	var elem = (deltaX < 0) ? ($this.dirtrl ? $prev : $next) : ($this.dirtrl ? $next : $prev);
	    	var pos = (deltaX < 0) ? 1: -1;
	    	var last = (deltaX < 0) ?($this.dirtrl ? $thiselem.find('li:last') : $thiselem.find('li:first')) : 
	    	($this.dirtrl ? $thiselem.find('li:first') : $thiselem.find('li:last'));
	    	var moveElem = ( elem.length < 1 ) ? last : elem;
	    	var ewidth = $now.width();//$(window).width()	    	
	    	var overpos = ( Math.abs(deltaX) > ewidth )?( deltaX < 0 )? ewidth:-ewidth: 0;
	    	
	    	if( e.srcEvent.type !== 'pointercancel' ){
	    		if( $(e.target).closest('.con').length > 0 ) return false; //text 영역 
	    		if( e.type === "panend" ){
	    			if( $now.css('left') !== '0px' ){
	    				if( Math.abs(deltaX) < 101 ){
			        		$now.show().animate({'left' :'0px'},100 ,function(){ 
			        			moveElem.hide(); 
			        			$thiselem.find('li').not(':eq('+$now.index()+')' ).hide();  
			        			//play interval			
								if( !$this.o.ele.data('hantaswipe').timer && $this.o.ele.data('hantaswipe').timeset && $this.o.autoplay ){ $this.rollingPlay();}
			        		});
			        		moveElem.show().animate({'left' : pos*ewidth +'px'},100);
			        		$this.o.ele.find('>ul').stop().animate({ 'height' : $now.height()+'px'  },200);
			        	}else{
			        		$this.swipeAni( $now, dir );
			        	}
	    			}
		        	
		        }
	    		if( (Math.abs(deltaX) > 0 && Math.abs(e.deltaY) < 10 ) || ($thiselem.find('li:visible').length > 1 ) ){ //Math.abs(deltaX) > 50||	    			    			
		    		//interval
					if( $this.timer ) $this.rollingStop(); 
	    			$this.o.ele.removeData('active');
		    		$now.css('left', (deltaX+overpos)+'px');
					moveElem.show().css('left', overpos+((pos*ewidth)+deltaX)+'px');
					
					$this.o.ele.find('>ul').stop().animate({ 'height' :  moveElem.height() > $now.height() ? moveElem.height() : $now.height()+'px'  },200);
								
					if( Math.abs(deltaX) > ewidth && e.isFirst ){ //lim+1	
						$now.removeData('active');
						$now.hide();
						$now = moveElem;
						$now.data('active','1');
						$prev = $now.prev();
						$next = $now.next();
						last = (deltaX < 0) ? $thiselem.find('li:first'): $thiselem.find('li:last');
						elem = (deltaX < 0) ? $next: $prev;
						moveElem = ( elem.length < 1 ) ? last : elem;
						$this.o.ele.find('>ul').stop().animate({ 'height' : moveElem.height()+'px'  },200);
					}
			        
	    		}
	    		
	        }	    	
	       
		}		
	},
	swipeControl : function(){
		var $thiselem = this.o.ele;
		var mc = new Hammer($thiselem[0]);		
		var $this = this;
		mc.get('pan').set({ direction: Hammer.DIRECTION_HORIZONTAL });
	  	mc.off("panleft panright panend").on("panleft panright panend", $this.swipeEventSide( $this ) );
	  	
	  	var click = false;
	  	$thiselem.off('mousedown mouseup').on('mousedown mouseup', function(e){
	  		e.preventDefault();
	  		if( e.type === "mousedown" ){
	  			click = true;
	  		}else if( e.type === "mouseup" ){
	  			click = false;
	  			$thiselem.trigger('panend');
	  		}	  		
	  	});
	},
	indicateEvent : function( $this ){
		return function(e){
			var $thiselem = $this.o.ele;
			var animated = $thiselem.find('li').filter(function(i){ if( $(this).data('animated') === true ){ return $(this); } });
	    	if( animated.length > 0 ) return false;	    	
			$this.o.ele.data('active','left');
			e.preventDefault();
			var $now = $thiselem.find('li:visible').filter(function(i){ if( $(this).data('active') === '1' ){ return $(this); } });
			var idx = $(this).index();
			var ardir = ($this.dirtrl ? 'right' : 'left');
			$this.swipeAni( $now, ardir , idx );
		}
	},
	arrowEvent : function( $this ){
		return function(e){			
			var $thiselem = $this.o.ele;
			e.preventDefault();
			var animated = $thiselem.find('li').filter(function(i){ if( $(this).data('animated') === true ){ return $(this); } });
	    	if( animated.length > 0 ) return false;
			var $now = $thiselem.find('li:visible').filter(function(i){ if( $(this).data('active') === '1' ){ return $(this); } });
			var dir = 'right';
			if( $(this).hasClass('btnprev') ){
				$this.o.ele.data('active','right');
				dir = 'right';
			}else{
				$this.o.ele.data('active','left');
				dir = 'left';
			}
			$this.swipeAni( $now, dir );
		}
	},
	pageNum : function( idx ){
		var $this = this;
		var pageSpan = $this.o.pageNum.find('span');
		if( pageSpan.find('em').length > 0 ){
			pageSpan.text("");
			pageSpan.prepend('<em>'+(idx+1)+'</em>');
			pageSpan.append( ' / '+ $this.o.ele.find('>ul>li').length );
		}else{
			pageSpan.text( (idx+1) +' / '+ $this.o.ele.find('>ul>li').length );
		}
	},
	init : function(){
		var $this = this;		
		var elenum = $this.o.ele.index( '.'+$this.o.ele.attr('class'));
		this.setCss();		
		this.swipeControl();
		if( this.o.indicate ){
			this.o.indicate.off('click').on('click', this.indicateEvent($this));
		}
		if( this.o.pageNum ){
			this.pageNum( 0 );
		}
		if( this.o.arrow ){
			this.o.arrow.off('click').on('click', this.arrowEvent($this));			
		}
		if( this.o.autoplay ){
			$this.timeBtn.off('click').on('click', function(e){ 
				if(	$(this).hasClass('stop') ){  
					$this.timeset = false;
					$(this).text("play").removeClass('stop').addClass('play');
					$this.rollingStop();
				}else{
					$this.timeset = true;
					$(this).text("stop").removeClass('play').addClass('stop');
					$this.rollingPlay();
				}
			});	
		}
		var $this = this;
		var w = $(window).width();
		$(window).off('resize.hantaswipe').on('resize.hantaswipe', function(){
			if( w !== $(window).width() ){
				//$this.o.ele.find('>ul').height("");
				setTimeout(function(){ $this.resetCss(); },10);						
			}
			w = $(window).width();
		});
		var eventTx = 'touchmove.hantaswipe'+elenum +' click.hantaswipe'+elenum +' mouseup.hantaswipe'+elenum ;
		$(document).off(eventTx).on(eventTx, function(e){
			setTimeout(function(){
				if( $this.o.ele.is(":visible") && $(e.target).closest('.img').length < 1 ){					
					$this.resetCss();
					if( $this.o.autoplay === true && $this.timer === "none" ){
						$this.timeset = true;
						$this.rollingPlay();
					}
				}
			},1);
			
		});
		
	}
});

//tab 형식의 swipe
// element : tab div wrap
(function($){
	$.fn.httabswipe = function(ot){
		return this.each(function(i){
			var $this = $(this);
			var data = $this.data('hantatabswipe');
			if( !data ){
				$this.data('hantatabswipe', (data = new HantaTabSwipe($.extend({'ele':$this},ot)) ) );
			}else{
				$this.removeData('hantatabswipe');
				$this.data('hantatabswipe', (data = new HantaTabSwipe($.extend({'ele':$this},ot)) ) );				
			}
		}); 
	};
	$.fn.httabswipe.Constructor = HantaTabSwipe;
}(jQuery));
function HantaTabSwipe(ot){
	this.o = $.extend({
		'ele': $.noop(),		
		'arrow': $.noop()		
	},ot);
	this.tab = this.o.ele.find('.tabList');
	this.tabcont = this.o.ele.find('.tabCon');
	this.o.arrow = this.o.ele.find('.btn');
	
	this.touchCont = $.noop();	
	this.dirtrl = $('html[dir="rtl"]').length < 1 ? false : true;
	this.init();
	
}
$.extend(HantaTabSwipe.prototype,{
	setCss: function(){
		var $this = this;		
		function setwid(){
			var sumListWidth = 0;
			$this.tab.find('li').each(function(i){
				sumListWidth += $(this).outerWidth(true);
			});
			$this.tab.width( Math.round(sumListWidth)+20 );
			if( Math.round(sumListWidth)+1 <= $this.tab.parent().outerWidth(true) ){ //$(window).width()
  				$this.tab.parent().find('.btn').hide();
  			}else{
  				var cssdirrtl = ($this.dirtrl ? 'margin-right' : 'margin-left');
  				var btndirrtl = ($this.dirtrl ? '.btn.btnprev' : '.btn.btnNext');
  				if( $this.tab.css(new String(cssdirrtl)) ==='0px' ){
  					$this.tab.parent().find('.btn').hide();
  					$this.tab.parent().find(btndirrtl).show();
  				} 
  			}
		}
		//setwid();
		$(document).off('DOMSubtreeModified.tabswipe').on('DOMSubtreeModified.tabswipe', '.tabList li', function(){
			setTimeout(function(){ setwid(); },100);
		});
		$(window).off('load.tabswipe').on('load.tabswipe',function(){
			setwid();
		});
		this.tabcont.not(":eq("+this.tab.find('li.on').index()+")").hide();
		this.tabcont.filter(':visible').data('active','1');
		this.tab.css({
			'transition' : 'all 150ms cubic-bezier(0.18, 0.35, 0.56, 1)'
		});		
		this.touchCont = this.tabcont.parent();
		
		this.tabcont.css('position','relative'); // relative absolute 2,3 top ; -this prev  height ::: block length 2 
		this.tabcont.css('left','0px');
		this.tabcont.parent().css({'overflow':'hidden'});
		
		//
		this.tab.parent().css({'overflow-x':'hidden', '-webkit-backface-visibility':'hidden' });
		
	},
	tabContAni :function( now , move, dir ){	
		var $this = this;
		var ewidth = $this.touchCont.width();
		var movepos = dir === "left"? -1 : dir === "right"? 1 : 0;
		
		var moveIndex = move.closest('.tabCon_area').length > 0 ? move.index() : move.closest('li').index();
		if( move.css('top') === '0px' && move.index() > now.index() ) move.css('top', now.outerHeight(true)+'px');
		now.animate({'left': movepos*ewidth+'px'},300);
		move.data('animated',true);
		var he = move.outerHeight(true)+ ( parseInt(move.css('top')) - $this.tab.height());
		
		move.show().animate({'left': 0+'px'},300,function(){			
			now.removeData('active').hide();
			$this.tabcont.not(':eq('+move.index()+')').hide();
			move.data('active','1');			
			move.removeData('animated');
			
			$this.touchCont.height("");			
			$this.tab.find('li.on').removeClass('on');
			$this.tab.find('li').eq(moveIndex).addClass('on');			
			if( move.closest('.tabCon_area').length > 0 ) {
				if( move.css('top') !== '0px'){
					move.css('top','0px');
				}
				$this.tabcont.css('top','0px');
			}
			now.css({'overflow':''});move.css({'overflow':''});
			//swipe 2
			move.find('.rollingArea >ul').height("");
			move.find('.rollingArea >ul').each(function(o){
				$(this).height( $(this).find('li:visible').height() );
			});
			move.show();
			//scroll
			if( $this.o.ele.offset().top < $(window).scrollTop() ){
				$(window).scrollTop( $this.o.ele.offset().top );
			}			
		});
		///+ list animation
		
		if(  $this.tab.find('li').eq(moveIndex).length >0 ){
			var liwsum = 0, lioffset = $this.tab.find('li').eq(moveIndex).offset().left, arrowbtns = parseInt($this.tab.parent().find('button:visible').length * 50);
			$this.tab.find('li').each(function(i){
				if( moveIndex > i ){
					liwsum = liwsum+$(this).outerWidth(true);
				}				
			});		
			var cssdirrtl = ($this.dirtrl ? 'margin-right' : 'margin-left');
			if( moveIndex === $this.tab.find('li').length-1 ){
				if( $this.tab.width() <= $this.tab.parent().outerWidth(true) ){//$(window).width()
	  				$this.tab.parent().find('.btn').hide();
	  			}else{
	  				if( $this.dirtrl ){
	  					$this.tab.parent().find('.btn.btnprev').hide();
						$this.tab.parent().find('.btn.btnNext').show();
	  				}else{
	  					$this.tab.parent().find('.btn.btnprev').show();
						$this.tab.parent().find('.btn.btnNext').hide();
	  				}
	  				
	  			}

				if( lioffset > 0 && lioffset+$this.tab.find('li').eq(moveIndex).width() < $this.o.ele.width()-arrowbtns ){
				}else{					
					$this.tab.css(new String(cssdirrtl) ,(-liwsum+$this.o.ele.width()-$this.tab.find('li').eq(moveIndex).outerWidth(true))+'px');
				}
				
			}else if( moveIndex === 0 ){
				if( $this.tab.width() <= $this.tab.parent().outerWidth(true) ){ //$(window).width()
	  				$this.tab.parent().find('.btn').hide();
	  			}else{
	  				if( $this.dirtrl ){
	  					$this.tab.parent().find('.btn.btnprev').show();
						$this.tab.parent().find('.btn.btnNext').hide();
	  				}else{
	  					$this.tab.parent().find('.btn.btnprev').hide();
						$this.tab.parent().find('.btn.btnNext').show();
	  				}
	  				
	  			}
				$this.tab.css( new String(cssdirrtl) , '0px');
			}else{
				if( lioffset> 0 && lioffset+$this.tab.find('li').eq(moveIndex).width() < $this.o.ele.width()-arrowbtns ){					
				}else{
					$this.tabListAni(dir);
				}
			}
		}
		
	},	
	tabListAni : function( dir ){
		var $this = this;
		var cssdirrtl = ($this.dirtrl ? 'margin-right' : 'margin-left');
		var ulLeft = parseInt($this.tab.css(cssdirrtl)); 
		var paddingleft = parseInt($this.tab.parent().css('padding-left')); 
		var leftElem = [], rightElem = [];
		$this.tab.find('li').each(function(i){ 
			if( $(this).offset().left - paddingleft < 0 ){ //$(this).offset().left - paddingleft === 0 ||
				leftElem.push($(this));
			}else if( $(this).offset().left+$(this).outerWidth(true) > $this.o.ele.width() ){
				rightElem.push($(this));
			}
		});

		var elem = dir === "left" ? rightElem ? rightElem[0] : false: leftElem ? leftElem[leftElem.length-1] :false ;
		if( $this.dirtrl ){
			elem = dir === "left" ? rightElem ? rightElem[rightElem.length-1] : false: leftElem ? leftElem[0] :false ;
		}else{
			elem = dir === "left" ? rightElem ? rightElem[0] : false: leftElem ? leftElem[leftElem.length-1] :false ;
		}
		if ( elem ){
			var liwsum = 0, leftsum = 0;
			$this.tab.find('li').each(function(i){
				if( elem.index() > i ){							
					liwsum = liwsum+ $(this).outerWidth(true);
				}
			});					
			var mdir = ($this.dirtrl ? 'right' : 'left');
			var moveps = dir === mdir? -liwsum+$this.o.ele.width()-elem.outerWidth(true) : -liwsum;
			
			var btns = 0;
			if( $this.tab.width() > $this.tab.parent().outerWidth(true) ){ //$(window).width()
				if( $this.dirtrl ){
					if( elem.index() === 0 ){
						$this.tab.parent().find('.btn.btnprev').show(); //ar-수정 :hide
						$this.tab.parent().find('.btn.btnNext').hide();	//ar-수정 :show
						btns = dir === "left" ? 0 : 0; //ar-수정 :-50 : 0
					}else if( elem.index() === $this.tab.find('li').length-1 ){ 
						$this.tab.parent().find('.btn.btnprev').hide(); //ar-수정 :show
						$this.tab.parent().find('.btn.btnNext').show(); //ar-수정 :hide
						btns = dir === "left" ? 0 : 0; //ar-수정 : 0 : 45
					}else{
						$this.tab.parent().find('.btn.btnprev').show();
						$this.tab.parent().find('.btn.btnNext').show();
						btns = dir === "left" ? 50 : -45; //ar-수정 : -50 : 45
					}
				}else{
					if( elem.index() === 0 ){
						$this.tab.parent().find('.btn.btnprev').hide();
						$this.tab.parent().find('.btn.btnNext').show();		
						btns = dir === "left" ? -50 : 0;
					}else if( elem.index() === $this.tab.find('li').length-1 ){
						$this.tab.parent().find('.btn.btnprev').show();
						$this.tab.parent().find('.btn.btnNext').hide();
						btns = dir === "left" ? 0 : 45;
					}else{
						$this.tab.parent().find('.btn.btnprev').show();
						$this.tab.parent().find('.btn.btnNext').show();
						btns = dir === "left" ? -50 : 45;
					}
				}				
			}
			
			$this.tab.css(new String(cssdirrtl), (moveps+btns)+'px' );
		}
	},
	tabListEvent : function( $this ){
		return function(e){
			e.preventDefault();
			if ( $this.tab.find('>li').length < 2 ) return false;
			if( e.srcEvent.type !== 'pointercancel' ){			
 				var dir = e.type ==='swipeleft' ? "left" : "right";
				$this.tabListAni(dir);				
			}
			
		};
	},
	tabContEvent : function( $this ){
		var magintop;
		return function(e){
			e.preventDefault();			
			if ( $this.tabcont < 2 ) return false;
			var animated = $this.tabcont.filter(function(i){ if( $(this).data('animated') === true ){ return $(this); } });
	    	if( animated.length > 0 ) return false;
	    	
			var $nowcont = $this.tabcont.filter(function(i){ if( $(this).data('active') === '1' ){ return $(this); } });
			var deltaX = e.deltaX;
			var $prev, $next, ewidth = $this.touchCont.width();			
			
			$prev = $nowcont.prev();
			$next = $nowcont.next();
			
			var elem = (deltaX < 0) ? ($this.dirtrl ? $prev : $next) : ($this.dirtrl ? $next : $prev);
			var last = (deltaX < 0) ? ($this.dirtrl ? $this.tabcont.last() : $this.tabcont.first()): 
			($this.dirtrl ? $this.tabcont.first() : $this.tabcont.last());
	    	var moveElem = ( elem.length < 1 ) ? last : elem; 
	    	
			var pos = (deltaX < 0) ? 1: -1;
			var dir = (deltaX < 0)? "left":"right";
			
			if( $(e.target).closest('.img').length>0 && $(e.target).closest('.swifeArea').length>0 ) return false;		
			if( $(e.target).closest('.popLayer').length>0 || $(e.target).closest('.dimmed').length>0 ) return false;

			if( e.srcEvent.type === 'pointercancel' ){
				if( $nowcont.css('left') !== '0px' ){
					//if( Math.abs(deltaX) < 101 ){
						$nowcont.animate({'left' :'0px'},100);
						$this.tabcont.css('top','0px');	$nowcont.css({'overflow':''});
						$this.tabcont.not(':eq('+$nowcont.index()+')').hide();
						$this.touchCont.height("");
					//}else{
						//$this.tabContAni( $nowcont , moveElem, dir );	
					//}
				}	
			}
			if( e.srcEvent.type !== 'pointercancel'){ // && e.srcEvent.type === "pointermove" 				
				if( $this.tabcont.length > 2 ){
					if ( $nowcont.index() === 0 && moveElem.index() === $this.tabcont.length-1 ) return false;
					if ( $nowcont.index() === $this.tabcont.length-1 && moveElem.index() === 0 ) return false;
				}else{ 
					if( dir === "left" ){
						if ( $nowcont.index() === $this.tabcont.length-1 ) return false;
					}else{
						if ( $nowcont.index() === 0 ) return false;
					}
				}
				if( e.type === "panend" ){ 
					if( $nowcont.css('left') !== '0px' ){
						if( Math.abs(deltaX) < 101 ){
							$nowcont.animate({'left' :'0px'},100);
							$this.tabcont.css('top','0px');	$nowcont.css({'overflow':''});
							$this.tabcont.not(':eq('+$nowcont.index()+')').hide();
							$this.touchCont.height("");
						}else{
							$this.tabContAni( $nowcont , moveElem, dir );	
						}
					}					
				}else{
					if( (Math.abs(deltaX) > 0 && Math.abs(e.deltaY) < 10 ) || ($this.tabcont.filter(':visible').length > 1 ) ){
						$this.tabcont.not(':eq('+$nowcont.index()+')').hide();
						$nowcont.css('left', deltaX+'px');
						moveElem.show().css('left', ((pos*ewidth)+deltaX)+'px');						
						magintop = 0;						
						if( $nowcont.index() < moveElem.index() ){
							$nowcont.css({'overflow':'hidden'});
							moveElem.css('top', (-1*($nowcont.outerHeight(true)) -magintop) +'px');
							$nowcont.css('top', 0 +'px');
							
						}else{
							moveElem.css({'overflow':'hidden'});
							$nowcont.css('top', (-1*(moveElem.outerHeight(true) )-magintop) +'px');
						}
						var viewh = moveElem.outerHeight(true) > $nowcont.outerHeight(true) ? moveElem.outerHeight(true) : $nowcont.outerHeight(true);
						$this.tabcont.parent().height( viewh -magintop );										
					}				
					
				}

			}		
		};	  	
	},	
	arrowEvent : function( $this ){
		return function(e){			
			var dir = $(e.target).hasClass('btnprev') ? "right" : "left";
			$this.tabListAni(dir);
		};
	},
	listClickEvent : function( $this ){
		return function(e){
			e.preventDefault();
			var idx = $(e.target).parent().index();
			$(e.target).parent().siblings().removeClass('on');
			$(e.target).parent().addClass('on');
			$this.tabcont.hide();
			$this.tabcont.removeData('active');
			$this.tabcont.eq(idx).show();
			$this.tabcont.eq(idx).css('left','0px');
			$this.tabcont.eq(idx).data('active','1');
		};
	},
	guideview : function( $this ){
		var tabmousedown = false, stime, etime,deviceAgent = window.navigator.userAgent.match(/Android\s([0-9\.]*)/i);
		clearTimeout(stime);clearTimeout(etime);
		function btnshow(){
			if( ($this.tab.find('>li.on').index() === 0) || ($this.tab.find('>li.on').index() === $this.tab.find('>li').length-1) ){
				if( $this.dirtrl ){
					if($this.tab.find('>li.on').index() === $this.tab.find('>li').length-1) $this.o.ele.find('.btnCon.conNext').stop().show(); //ar-수정
					if($this.tab.find('>li.on').index() === 0 ) $this.o.ele.find('.btnCon.conprev').stop().show(); //ar-수정
				}else{
					if($this.tab.find('>li.on').index() === 0) $this.o.ele.find('.btnCon.conNext').stop().show();
					if($this.tab.find('>li.on').index() === $this.tab.find('>li').length-1) $this.o.ele.find('.btnCon.conprev').stop().show();
				}
				
			}else{
				$this.o.ele.find('.btnCon').stop().show();
			}
		}
		return function(e){
			if( stime ){ clearTimeout(stime); }
			if( etime ){ clearTimeout(etime); }
			var notvisible = false;
			if( $(e.target).closest('.img').length>0 && $(e.target).closest('.swifeArea').length>0 ){
				$this.o.ele.find('.btnCon').stop().hide(); notvisible = true;
			}
			var focusElement = "a[href], area[href], label, input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]";			
			if( $(e.target).is(focusElement) ){
				$this.o.ele.find('.btnCon').stop().hide(); notvisible = true;				
			}
			if( e.type === "touchmove" || e.type === "touchstart" ){
				if( !notvisible ){
					if( deviceAgent !== null ){ 
						var androidversion = parseFloat(deviceAgent[1]);						
						if (androidversion < 5.5 ){// android 5.1 down							
							stime = setTimeout(function(){
								if(  $this.tabcont.filter(':visible').css('left') === '0px' ){
									btnshow();
								}
							},100);
							etime = setTimeout(function(){
								if( $this.o.ele.find('.btnCon:visible').length > 0 ){		
									$this.o.ele.find('.btnCon').stop().hide();
								}
							},700);
						}else{
							if( $this.tabcont.filter(':visible').css('left') === '0px' ){
								btnshow();
							}
						}
					}else{
						btnshow();
					}
				}
				
			}else if( e.type === "touchend" ){		
				$this.o.ele.find('.btnCon').stop().hide();				
				return true;
			}else if( e.type === "mousemove" ){ 
				if( !notvisible ){
					if( tabmousedown ){
					btnshow();					
					}
				}
				tabmousedown = false;  			
			}else if( e.type === "mouseup" ){ 
				$this.o.ele.find('.btnCon').stop().hide();	
				setTimeout(function(){
					if( $this.o.ele.find('.btnCon:visible').length > 0 ){		
						$this.o.ele.find('.btnCon').stop().hide();
					}
				},200);	  	
			}else if( e.type === "mousedown" ){
				tabmousedown = true;
			}	  		
		}
	},
	init : function(){
		var $this = this;
		this.setCss();
		
		var tabList = new Hammer( this.tab.parent()[0] );		
		var tabCont = new Hammer( this.touchCont[0] );
		var $this = this;
		tabList.get('swipe').set({ direction: Hammer.DIRECTION_HORIZONTAL });
	  	tabList.off("swipeleft swiperight").on("swipeleft swiperight", $this.tabListEvent( $this ) );
				
		tabCont.get('pan').set({ direction: Hammer.DIRECTION_HORIZONTAL });
	  	tabCont.off("panleft panright panend panstart pan").on("panleft panright panend panstart pan", $this.tabContEvent( $this ) );
	  	

	  	this.tab.parent().find('.btn').off('click').on('click', $this.arrowEvent( $this ) );
	  	this.tab.find('>li>a').off('click').on('click',  $this.listClickEvent( $this ) );

	  	//btns
	  	var wd = $(window).width();
	  	$(window).off('resize.tabswipe').on('resize.tabswipe', function(){
	  		if( wd !== $(window).width() ){
	  			if( $this.tab.width() <= $this.tab.parent().outerWidth(true) ){ //$(window).width()
	  				$this.tab.parent().find('.btn').hide();
	  			}
	  			wd = $(window).width();
	  		}	  		
	  	});
	  	//guide ui
	  	$this.o.ele.find('.btnCon').hide().css({'-webkit-backface-visibility':'hidden'});
	  	var touchevends = 'touchcancel.tabswipe touchstart.tabswipe touchmove.tabswipe touchend.tabswipe mousemove.tabswipe mouseup.tabswipe mousedown.tabswipe';	  	
	  	$(document).off(touchevends).on(touchevends, '.tabCon_area', $this.guideview($this));

	}
});
var console = window.console || {log:function(){},dir:function(){},error:function(){},warn:function(){}};

(function($) {

    // Global
    $.htgm = $.htgm || {};

    // Common Json Function
    $.htgm.GET = function(url, params) {
        var dfd = $.Deferred();
        params.deviceType="mobile";
        $.ajax({
            type : "GET",
            url : url,
            data : params,
            dataType : 'json'
        }).done(function(data) {
            dfd.resolve(data.data);
        }).fail(function(request, status, error) {
            dfd.fail(false);
        });
        return dfd.promise();
    };

    // Common post Function
    $.htgm.POST = function(url, params) {
        var dfd = $.Deferred();
        params.deviceType="mobile";
        $.ajax({
            type : "POST",
            url : url,
            data : params,
            dataType : 'json'
        }).done(function(data) {
            dfd.resolve(data.data);
        }).fail(function(request, status, error) {
            dfd.fail(false);
        });
        return dfd.promise();
    };

    $.htgm.JSONP = function(url, params, type) {
        var requestType = 'GET';
        params.deviceType="mobile";
        if (typeof type != 'undefined')
            requestType = type;
        var dfd = $.Deferred();
        $.ajax({
            type : requestType,
            url : url,
            data : params,
            dataType : 'jsonp',
            contentType : 'application/json; charset=utf-8'
        }).done(function(data) {
            dfd.resolve(data);
        }).fail(function(request, status, error) {
            dfd.fail(false);
        });
        return dfd.promise();
    };

    // convertDate
    $.htgm.convertDate = function(time) {
        return new Date(time);
    };

    // date to string date
    $.htgm.toStringDate = function(time) {
        if (time == null)
            return '';
        var date = $.htgm.convertDate(time);
        return date == null ? '' : date.getFullYear() + '.' + ('0' + (date.getMonth() + 1)).substr(-2, 2) + '.' + ('0' + date.getDate()).substr(-2, 2);
    };

    // date to string date time
    $.htgm.toStringDateTime = function(time) {
        if (time == null)
            return '';
        var date = $.htgm.common.convertDate(time);
        return date == null ? '' : date.getFullYear() + '.' + ('0' + (date.getMonth() + 1)).substr(-2, 2) + '.' + ('0' + date.getDate()).substr(-2, 2) + ' '
                + ('0' + (date.getHours())).substr(-2, 2) + ':' + ('0' + (date.getMinutes())).substr(-2, 2) + ':' + ('0' + (date.getSeconds())).substr(-2, 2);
    };

    // return past date
    // 검색 UI에서 현재 날짜 기준으로 과거 일수나 년수 , 월수로 검색 조건을 설정하는 UI에서 사용하면 좋음.
    // type - 'd':일/'m':월/'y':년 (toLowerCase('y') - char(1))
    // gap - 차이 number
    // sFormat - 날짜형식 (변수:YYYY(년), MM(월), DD(일))
    // isFirst - 해당하는 날짜의 첫날(1일) 반환
    // 현재날짜가  2017-02-02라면  > $.htgm.getPastDate('m', 2, 'YYYY-MM-DD', false) => 2016-12-02
    $.htgm.getPastDate = function (type, gap, sFormat, isFirst) {
    	var sDate = null;
    	var toDay = new Date();
    	var nDate = new Date(toDay);
    	var strDateType = "YYYYMMDD";

    	if (sFormat != undefined)
    	{
    		strDateType = sFormat;
    	}

    	switch (type) {
    		case "d": //일수
    			nDate.setDate(nDate.getDate() - gap);
    			break;
    		case "m": //달수
    			nDate.setMonth(nDate.getMonth() - gap);
    			break;
    		case "y": //년수
    			nDate.setFullYear(nDate.getFullYear() - gap);
    			break;
    	}
    	sDate = new Date(nDate);

    	var strMonth = sDate.getMonth() + 1;
    	strMonth = (strMonth < 10) ? ("0" + strMonth) : strMonth;

    	var strDate = sDate.getDate();
    	if (isFirst) {
    		strDate = "01";
    	} else {
    		strDate = (strDate < 10) ? ("0" + strDate) : strDate;
    	}

    	strDateType = strDateType.replace("YYYY", sDate.getFullYear());
    	strDateType = strDateType.replace("MM", strMonth);
    	strDateType = strDateType.replace("DD", strDate);

    	return strDateType;
    };

    // return document info
    $.htgm.getDocInfo = function (key) {
    	var doc = document;
    	var loc = doc.location;
    	var info = {
    		href : loc.href,
    		host : loc.host,
    		hash : loc.hash,
    		hostname : loc.hostname,
    		pathname : loc.pathname,
    		port : loc.port,
    		origin : loc.origin,
    		protocol : (loc.protocol.indexOf(":") > -1) ? loc.protocol.replace(":", "") : loc.protocol,
    		querystring : (loc.search.indexOf("?") > -1) ? loc.search.replace("?", "") : loc.search,
    		title : encodeURIComponent(doc.title)
    	};
    	info["querystringJSON"] = $.htgm.serializeToJson(info.querystring, "&", "=");

    	if (key != undefined) {
    		return info[key];
    	}
    	return info;
    };

    // return string length (size)
    $.htgm.getByte = function (str) {
    	var bytes = 0;
    	if (typeof str === "string") {
    		var strLen = str.length;
    		if (strLen > 0) {
    			for (var i = 0 ; i < strLen ; i++) {
    				var charCode = str.charCodeAt(i);
    		        if (charCode <= 0x00007F) {
    		        	bytes += 1;
    		        } else if (charCode <= 0x0007FF) {
    		        	bytes += 2;
    		        } else if (charCode <= 0x00FFFF) {
    		        	bytes += 3;
    		        } else {
    		        	bytes += 4;
    		        }
    			}
    		}
    	}
    	return bytes;
    };

    // convent number
    $.htgm.numberFormat = function (val) {
		if (typeof(val) == "number") {
			val += "";
		}
		if (val.substring(0, 1) == '-') { //minus number
			val = val.substring(1);
			return '-' + val.split(/(?=(?:\d{3})+(?:\.|$))/g).join(',');
		}
		return val.split(/(?=(?:\d{3})+(?:\.|$))/g).join(',');
    };

    // convert suffix to json
    // AEM에서 지원하는 파라미터 전달 방식 중의 하나인 suffix 방식 파라미터를 사용하기 쉽도록 json으로 반환함.
    // page.html/a/b/c/d > {a: "b", c: "d"}
    $.htgm.getSuffix = function () {
    	var rt = null;
    	var docUrl = $.htgm.getDocInfo("pathname");
    	var suffixMap = {};
    	var suffix = (docUrl.indexOf(".html/") > -1) ? true : false;

    	if(suffix) {
    		var suffixArray = docUrl.split(".html/")[1].split("/");
    		for(var i = 0, iCnt = suffixArray.length; i < iCnt ; i += 2) {
    			suffixMap[suffixArray[i]] =  suffixArray[i+1];
    		}
    		rt = suffixMap;
    	}
    	return rt;
    };

    // return serialized json
    // console.log($.htgm.jsonToSerialize($.htgm.getDocInfo(), "|", "kv"));
    $.htgm.jsonToSerialize = function (target, sp, type) {
    	var sSerial = "";
        $.each(target, function(k, v) {
            switch(type) {
                case "k": //key만
    				sSerial += (k + sp);
                    break;
                case "v": //value만
    				sSerial += (v + sp);
                    break;
                case "kv": //key=value 로
    				sSerial += ((k + "=" + v) + sp);
                    break;
            }
        });
        return sSerial.substr(0, (sSerial.length - 1));
    };

    // return json
    // serialized String convent json
    $.htgm.serializeToJson = function (target, k1, k2) {
    	var json = {};
    	if ($.htgm.isNotEmpty(target)) {
	    	if (target.indexOf(k1) > -1) {
				target = target.split(k1);
				$.each(target, function (i, e) {
					if (e.indexOf(k2) > -1) {
						var ae = e.split(k2);
						json[ae[0]] = ae[1];
					}
				});
			} else {
				if (target.indexOf(k2) > -1) {
					var ae = target.split(k2);
					json[ae[0]] = ae[1];
				}
			}
    	}
		return json;
    };

    // compare json
    // console.log($.htgm.compareJson({}, {a:1}); => {a:1}
    $.htgm.compareJson = function (oriJson, targetJson) {
    	//비교 결과 JSON (다른 것 또는 oriJson에 없는 targetJson의 값이 들어감)
    	var rJson = {};

    	//oriJson과 값이 다른 targetJson값
    	$.each(oriJson, function(k, v) {
    		if (targetJson[k] != undefined)
    		{
    			if (oriJson[k] != targetJson[k]) rJson[k] = targetJson[k];
    		}
    	});

    	//targetJson에만 있는거
    	$.each(targetJson, function(k, v) {
    		if (oriJson[k] == undefined) rJson[k] = v;
    	});

    	return rJson;
    };

    // Extract file information
    $.htgm.extractFileInfo = function (filename) {
    	var lastIndex = filename.lastIndexOf(".");
    	var len = filename.length;
    	var ext = null;
    	var name = filename;
    	if (lastIndex > -1) {
    		ext = filename.substr((lastIndex + 1), len);
    		name = filename.substr(0, lastIndex);
    	}
    	return {
			len : len,
			ext : ext,
			name : name
		};
    };

    // 일반 링크를 셀렉터가 붙은 링크로 변환한다.
    // 만약 확장자가 없으면 html을 붙여주고, html이 아니면 suffix로 반환한다.
    $.htgm.makeSelectorLink = function (url, selector) {
    	var linkInfo = $.htgm.extractFileInfo(url);
    	var link = linkInfo.name;
    	if (linkInfo.ext != null && linkInfo.ext == "html") {
    		link += "." + selector + "." +  linkInfo.ext;
    	} else if (linkInfo.ext != null && linkInfo.ext != "html") {
    		link += "." +  linkInfo.ext + "/" + selector;
    	} else {
    		link += "." + selector + ".html";
    	}
    	return link;
    };

    // 문자열이 null인지 확인한다.
    $.htgm.isEmpty = function (str) {
    	if (str == "" || str == null || str == undefined ) {
			return true;
		}
    	return false;
    };

    // 문자열이 null이 아닌지 확인한다.
    $.htgm.isNotEmpty = function (str) {
    	return !$.htgm.isEmpty(str);
    };

    // 문자열이 null일때 대체 문자열을 반환한다.
    $.htgm.nvl = function (str, repl) {
    	if ($.htgm.isEmpty(str)) {
    		return repl;
    	}
    	return str;
    };

    // 쿠키를 생성한다.
    $.htgm.setCookie = function (key, value, expire, secure) {
    	expire = (expire == undefined) ? 365 : expire;
    	secure = (secure == undefined) ? false : secure;
    	domain = $.htgm.getDocInfo("hostname");
		$.cookie(key, value, { path: '/', expires: expire, domain: domain, secure: secure });
    };

    // 쿠키의 값을 읽어 온다.
    $.htgm.getCookie = function (key) {
    	return $.cookie(key);
    };

})(jQuery);
/*!
 * clipboard.js v1.6.1
 * https://zenorocha.github.io/clipboard.js
 *
 * Licensed MIT © Zeno Rocha
 */
!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var t;t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,t.Clipboard=e()}}(function(){var e,t,n;return function e(t,n,o){function i(a,c){if(!n[a]){if(!t[a]){var l="function"==typeof require&&require;if(!c&&l)return l(a,!0);if(r)return r(a,!0);var u=new Error("Cannot find module '"+a+"'");throw u.code="MODULE_NOT_FOUND",u}var s=n[a]={exports:{}};t[a][0].call(s.exports,function(e){var n=t[a][1][e];return i(n?n:e)},s,s.exports,e,t,n,o)}return n[a].exports}for(var r="function"==typeof require&&require,a=0;a<o.length;a++)i(o[a]);return i}({1:[function(e,t,n){function o(e,t){for(;e&&e.nodeType!==i;){if(e.matches(t))return e;e=e.parentNode}}var i=9;if("undefined"!=typeof Element&&!Element.prototype.matches){var r=Element.prototype;r.matches=r.matchesSelector||r.mozMatchesSelector||r.msMatchesSelector||r.oMatchesSelector||r.webkitMatchesSelector}t.exports=o},{}],2:[function(e,t,n){function o(e,t,n,o,r){var a=i.apply(this,arguments);return e.addEventListener(n,a,r),{destroy:function(){e.removeEventListener(n,a,r)}}}function i(e,t,n,o){return function(n){n.delegateTarget=r(n.target,t),n.delegateTarget&&o.call(e,n)}}var r=e("./closest");t.exports=o},{"./closest":1}],3:[function(e,t,n){n.node=function(e){return void 0!==e&&e instanceof HTMLElement&&1===e.nodeType},n.nodeList=function(e){var t=Object.prototype.toString.call(e);return void 0!==e&&("[object NodeList]"===t||"[object HTMLCollection]"===t)&&"length"in e&&(0===e.length||n.node(e[0]))},n.string=function(e){return"string"==typeof e||e instanceof String},n.fn=function(e){var t=Object.prototype.toString.call(e);return"[object Function]"===t}},{}],4:[function(e,t,n){function o(e,t,n){if(!e&&!t&&!n)throw new Error("Missing required arguments");if(!c.string(t))throw new TypeError("Second argument must be a String");if(!c.fn(n))throw new TypeError("Third argument must be a Function");if(c.node(e))return i(e,t,n);if(c.nodeList(e))return r(e,t,n);if(c.string(e))return a(e,t,n);throw new TypeError("First argument must be a String, HTMLElement, HTMLCollection, or NodeList")}function i(e,t,n){return e.addEventListener(t,n),{destroy:function(){e.removeEventListener(t,n)}}}function r(e,t,n){return Array.prototype.forEach.call(e,function(e){e.addEventListener(t,n)}),{destroy:function(){Array.prototype.forEach.call(e,function(e){e.removeEventListener(t,n)})}}}function a(e,t,n){return l(document.body,e,t,n)}var c=e("./is"),l=e("delegate");t.exports=o},{"./is":3,delegate:2}],5:[function(e,t,n){function o(e){var t;if("SELECT"===e.nodeName)e.focus(),t=e.value;else if("INPUT"===e.nodeName||"TEXTAREA"===e.nodeName){var n=e.hasAttribute("readonly");n||e.setAttribute("readonly",""),e.select(),e.setSelectionRange(0,e.value.length),n||e.removeAttribute("readonly"),t=e.value}else{e.hasAttribute("contenteditable")&&e.focus();var o=window.getSelection(),i=document.createRange();i.selectNodeContents(e),o.removeAllRanges(),o.addRange(i),t=o.toString()}return t}t.exports=o},{}],6:[function(e,t,n){function o(){}o.prototype={on:function(e,t,n){var o=this.e||(this.e={});return(o[e]||(o[e]=[])).push({fn:t,ctx:n}),this},once:function(e,t,n){function o(){i.off(e,o),t.apply(n,arguments)}var i=this;return o._=t,this.on(e,o,n)},emit:function(e){var t=[].slice.call(arguments,1),n=((this.e||(this.e={}))[e]||[]).slice(),o=0,i=n.length;for(o;o<i;o++)n[o].fn.apply(n[o].ctx,t);return this},off:function(e,t){var n=this.e||(this.e={}),o=n[e],i=[];if(o&&t)for(var r=0,a=o.length;r<a;r++)o[r].fn!==t&&o[r].fn._!==t&&i.push(o[r]);return i.length?n[e]=i:delete n[e],this}},t.exports=o},{}],7:[function(t,n,o){!function(i,r){if("function"==typeof e&&e.amd)e(["module","select"],r);else if("undefined"!=typeof o)r(n,t("select"));else{var a={exports:{}};r(a,i.select),i.clipboardAction=a.exports}}(this,function(e,t){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var i=n(t),r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},a=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),c=function(){function e(t){o(this,e),this.resolveOptions(t),this.initSelection()}return a(e,[{key:"resolveOptions",value:function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};this.action=t.action,this.emitter=t.emitter,this.target=t.target,this.text=t.text,this.trigger=t.trigger,this.selectedText=""}},{key:"initSelection",value:function e(){this.text?this.selectFake():this.target&&this.selectTarget()}},{key:"selectFake",value:function e(){var t=this,n="rtl"==document.documentElement.getAttribute("dir");this.removeFake(),this.fakeHandlerCallback=function(){return t.removeFake()},this.fakeHandler=document.body.addEventListener("click",this.fakeHandlerCallback)||!0,this.fakeElem=document.createElement("textarea"),this.fakeElem.style.fontSize="12pt",this.fakeElem.style.border="0",this.fakeElem.style.padding="0",this.fakeElem.style.margin="0",this.fakeElem.style.position="absolute",this.fakeElem.style[n?"right":"left"]="-9999px";var o=window.pageYOffset||document.documentElement.scrollTop;this.fakeElem.style.top=o+"px",this.fakeElem.setAttribute("readonly",""),this.fakeElem.value=this.text,document.body.appendChild(this.fakeElem),this.selectedText=(0,i.default)(this.fakeElem),this.copyText()}},{key:"removeFake",value:function e(){this.fakeHandler&&(document.body.removeEventListener("click",this.fakeHandlerCallback),this.fakeHandler=null,this.fakeHandlerCallback=null),this.fakeElem&&(document.body.removeChild(this.fakeElem),this.fakeElem=null)}},{key:"selectTarget",value:function e(){this.selectedText=(0,i.default)(this.target),this.copyText()}},{key:"copyText",value:function e(){var t=void 0;try{t=document.execCommand(this.action)}catch(e){t=!1}this.handleResult(t)}},{key:"handleResult",value:function e(t){this.emitter.emit(t?"success":"error",{action:this.action,text:this.selectedText,trigger:this.trigger,clearSelection:this.clearSelection.bind(this)})}},{key:"clearSelection",value:function e(){this.target&&this.target.blur(),window.getSelection().removeAllRanges()}},{key:"destroy",value:function e(){this.removeFake()}},{key:"action",set:function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"copy";if(this._action=t,"copy"!==this._action&&"cut"!==this._action)throw new Error('Invalid "action" value, use either "copy" or "cut"')},get:function e(){return this._action}},{key:"target",set:function e(t){if(void 0!==t){if(!t||"object"!==("undefined"==typeof t?"undefined":r(t))||1!==t.nodeType)throw new Error('Invalid "target" value, use a valid Element');if("copy"===this.action&&t.hasAttribute("disabled"))throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');if("cut"===this.action&&(t.hasAttribute("readonly")||t.hasAttribute("disabled")))throw new Error('Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes');this._target=t}},get:function e(){return this._target}}]),e}();e.exports=c})},{select:5}],8:[function(t,n,o){!function(i,r){if("function"==typeof e&&e.amd)e(["module","./clipboard-action","tiny-emitter","good-listener"],r);else if("undefined"!=typeof o)r(n,t("./clipboard-action"),t("tiny-emitter"),t("good-listener"));else{var a={exports:{}};r(a,i.clipboardAction,i.tinyEmitter,i.goodListener),i.clipboard=a.exports}}(this,function(e,t,n,o){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function c(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function l(e,t){var n="data-clipboard-"+e;if(t.hasAttribute(n))return t.getAttribute(n)}var u=i(t),s=i(n),f=i(o),d=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),h=function(e){function t(e,n){r(this,t);var o=a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return o.resolveOptions(n),o.listenClick(e),o}return c(t,e),d(t,[{key:"resolveOptions",value:function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};this.action="function"==typeof t.action?t.action:this.defaultAction,this.target="function"==typeof t.target?t.target:this.defaultTarget,this.text="function"==typeof t.text?t.text:this.defaultText}},{key:"listenClick",value:function e(t){var n=this;this.listener=(0,f.default)(t,"click",function(e){return n.onClick(e)})}},{key:"onClick",value:function e(t){var n=t.delegateTarget||t.currentTarget;this.clipboardAction&&(this.clipboardAction=null),this.clipboardAction=new u.default({action:this.action(n),target:this.target(n),text:this.text(n),trigger:n,emitter:this})}},{key:"defaultAction",value:function e(t){return l("action",t)}},{key:"defaultTarget",value:function e(t){var n=l("target",t);if(n)return document.querySelector(n)}},{key:"defaultText",value:function e(t){return l("text",t)}},{key:"destroy",value:function e(){this.listener.destroy(),this.clipboardAction&&(this.clipboardAction.destroy(),this.clipboardAction=null)}}],[{key:"isSupported",value:function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:["copy","cut"],n="string"==typeof t?[t]:t,o=!!document.queryCommandSupported;return n.forEach(function(e){o=o&&!!document.queryCommandSupported(e)}),o}}]),t}(s.default);e.exports=h})},{"./clipboard-action":7,"good-listener":4,"tiny-emitter":6}]},{},[8])(8)});
/*
 * magnumvint
 */
//"use strict";
$(function(){
	hanta.glmain.init();
	hanta.usamain.init();
});

(function($){
	if( !window.hanta ) window.hanta = {};
	var module = window.hanta.glmain = {};
	module.scrollcss = function(){		
		setTimeout(function(){		
			$('.mainScroll >ul').each(function(i){
				var li = $(this).find('>li');
				if( $(this).is(":visible") ){ 
					$(this).css({							
						'width' : ((li.eq(1).outerWidth(true))*li.length +20) +'px'
					});
				}
			});
		},50);
	}
	module.newsBox = function(){
		//news
		module.scrollcss();
		$(window).off('load.scrollcss').on('load.scrollcss',function(){
			module.scrollcss();
		});
		var wd = $(window).width();
		$(window).off('resize.newsboxswipe').on('resize.newsboxswipe', function(){
	  		if( wd !== $(window).width() ){
	  			module.scrollcss();
	  			wd = $(window).width();
	  		}
	  	});
	}

	module.init = function(){
		if( $('.lmainTab').length < 1 ){ 
			module.newsBox();			
			$(document).off('DOMNodeInserted.glmain').on('DOMNodeInserted.glmain', '.mainScroll li', function(){
				module.newsBox();
			});
			if( window.Hammer ){
				//main visual
				if( $('.lmainTab_list').length < 1 ) $('.mainKeyvisual .rollingArea').htswipe({"autoplay":true});		//global main
				//
				//$('.sproduct .rollingArea').htswipe();
			}
		}

	}
}(jQuery));

(function($){
	if( !window.hanta ) window.hanta = {};
	var module = window.hanta.usamain = {};
	module.timer = [];
	module.tabElem = $('.lmainTab_list');

	function Timer(){
		this.time;
	}
	Timer.prototype.stop = function(){
		clearInterval( this.time );
		this.time = undefined;
	}
	Timer.prototype.play = function( roll ){
		clearInterval( this.time );
		this.time = setInterval( roll, 4800 );
	}
	module.scrollcss = function(){		
		setTimeout(function(){		
			var sum = 0;			
			$('.mainScroll >ul').each(function(i){ 				
				var li = $(this).find('>li'); 
				$(this).find('>li').each(function(j){
					sum = sum+$(this).outerWidth(true);
				});
				if( $(this).is(":visible") ){
					var mar = 20 ;
					$(this).closest('.mahorizScroll').length > 0? mar = 20 : mar =0;
					$(this).css({							
						'width' : ( sum -mar ) +'px'
					});
				}
			});

		},50);
	}
	module.setCss = function(){
		module.tabElem.find('.lmainTab_con').css({ 'position' :'relative' ,'left':'0px'});
		module.tabElem.find('.lmainTab_con').not(':eq('+$('.lmainTab:visible li.on').index()+')').hide();		
		module.tabElem.find('.lmainTab_con:visible').data('activetab','1');
		//depth
		module.tabElem.find('.rollingArea').each(function(k){
			$(this).find('li:first').data('activedepth','1');
			var nimg = new Image();
			if( $(this).find('li .img').attr('src') ) nimg.src = $(this).find('li .img').attr('src');			
		});
		module.setCssHeight();
	  	module.tabElem.find('.lmainTab_con').each(function(m){
	  		if( $(this).find('.rollingArea>ul>li').length < 2  ){
	  			$(this).find('.slideNavi').hide().remove();
	  		}else{
	  			$(this).find('.slideNavi').show();
	  			$(this).find('.slideNavi').children().show();
	  			$(this).find('.slideNavi').children().removeClass('on');
	  			$(this).find('.slideNavi').children().first().addClass('on');
	  		}
	  	});
	  	module.tabElem.find('.slideNavi').css('z-index','99');
	  
	}
	module.setCssHeight = function(){
		module.tabElem.find('.rollingArea').each(function(i){
			if( $(this).find('li').length > 1 ){
				$(this).find('ul').height( $(this).find('li').outerHeight(true) );
				$(this).find('li').css({
					'position':'absolute',
					'left':'0px',
					'overflow':'hidden'
				});
			}
		});
	}
	module.tabrollStop = function( idx ){
		module.tabElem.find('.lmainTab_con').eq(idx).removeData('play');
		if( module.timer[idx] ) module.timer[idx].stop();		
	}
	module.tabrollPlay = function( idx ){
		module.tabrollStop(idx);
		module.timer[idx].play( roll );
		var $targetElem = module.tabElem.find('.lmainTab_con').eq(idx);
		$targetElem.data('play',1);
		function roll(){
			var animated = module.tabElem.find('.lmainTab_con').filter(function(i){ if( $(this).data('animated') === true ){ return $(this); } }).length ||
				module.tabElem.find('.lmainTab_con .swifeArea li').filter(function(i){ if( $(this).data('animated') === true ){ return $(this); } }).length ;
	    	if( animated > 0 ) return false;
			var $now = $targetElem.find('li:visible').filter(function(i){ if( $(this).data('activedepth') === '1' ){ return $(this); } });
			if( $now.length < 1 ) $now = $targetElem.find('li:visible').first();
			$targetElem.find('.slideNavi .play').addClass('stop').removeClass('play');
			module.tabDepthEndAni( $now, "left" ); 
		}
	}
	module.tabDepthEndAni = function( now,dir,dot ){
		var $this = module.tabElem;
		var $prev = now.prev(), $next = now.next(), winWidth = now.width(); //winWidth = $(window).width();
		var elem, movepos, csspos;

		if( typeof dot ==="number" ){ //only left
			if( dot === now.index() ) return false;
			movepos = -1;
			csspos = 1;
			elem = now.parent().find('li').eq(dot);
		}else{
			if( dir === "right" ){
				if( $prev.length > 0 ){
					elem = $prev;
				}else{
					elem = now.siblings().last();
				}
				movepos = 1;
				csspos = -1;
			}else{
				if( $next.length > 0 ){
					elem = $next;
				}else{
					elem = now.siblings().first();
				}
				movepos = -1;
				csspos = 1;
			}
		} 
		//cm
		now.animate({'left': movepos*winWidth+'px'},300);
		//elem.siblings().filter(':visible').not(':eq('+ now.index() +')').animate({'left': movepos*winWidth+'px'},100);
		//
		if( now.closest(".lmainTab_con").data('activedepth') === dir || now.closest(".lmainTab_con").data('play') === 1 ) elem.css('left', csspos*winWidth+'px'); //|| $this.o.autoplay && $this.timer
		elem.data('animated',true);
		elem.show().animate({'left': 0+'px'},300,function(){
			now.removeData('activedepth').hide();
			//
			elem.siblings().hide();
			elem.data('activedepth','1');
			elem.removeData('animated');
			//interval time
			if( elem.closest(".lmainTab_con").find('.slideNavi button.stop').length > 0 && elem.closest(".lmainTab_con").data('play') !== 1 ){
				module.tabrollPlay( elem.closest(".lmainTab_con").index() );
			}
		});

		//indi
		now.closest(".swifeArea").find('.slideNavi a').removeClass('on');
		now.closest(".swifeArea").find('.slideNavi a').eq(elem.index()).addClass('on');
	}

	module.tabEndAni = function( now , move, dir ){ 
		var $this = module.tabElem;
		var ewidth = $this.width();
		var movepos = dir === "left"? -1 : dir === "right"? 1 : 0;
		now.animate({'left': movepos*ewidth+'px'},300);
		move.data('animated',true);
		var he = move.outerHeight(true);
		var viewh = move.outerHeight(true) > now.outerHeight(true) ? move.outerHeight(true) : now.outerHeight(true);

		$this.height( viewh );
		move.show().animate({'left': 0+'px'},300,function(){
			now.removeData('activetab').hide();
			$this.find('.lmainTab_con').not(':eq('+move.index()+')').hide();
			move.data('activetab','1');
			move.removeData('animated');

			$this.height("");
			if( move.css('top') !== '0px'){
				move.css('top','0px');
			}
			$this.find('.lmainTab_con').css('top','0px');

			//interval time
			if( move.find('.slideNavi button.stop').length > 0  && move.data('play') !== 1 ){
				module.tabrollPlay( move.index() ); 
			}
			//fixed list
	  		module.fixedlist();
	  		//
	  		setTimeout(function(){
	  			module.scrollcss();	  			
	  		},10);	  		
	  		$('body,html').animate({'scrollTop' : '0px'},150);
	  		move.show();
		});

		if( move.find('.rollingArea ul').height() === 0 ){
			module.setCssHeight();
		}
		$('.lmainTab li').removeClass('on');
		//$('.lmainTab li').eq( move.index() ).addClass('on');
		$('.lmainTab ul').each(function(l){
			$(this).find('li').eq( move.index() ).addClass('on');
		});

	}
	var endF;
	module.tabSide = function( e ){
		e.preventDefault();
		var $this = module.tabElem;
		var animated = $this.find('.lmainTab_con').filter(function(i){ if( $(this).data('animated') === true ){ return $(this); } }).length ||
			$this.find('.lmainTab_con .swifeArea li').filter(function(i){ if( $(this).data('animated') === true ){ return $(this); } }).length ;
    	if( animated > 0 ) return false;
    	
		var depthDiv = '.swifeArea .rollingArea li';
		var $nowcont = $this.find('.lmainTab_con:visible').filter(function(i){ if( $(this).data('activetab') === '1' ){ return $(this); } });

		var deltaX = e.deltaX,
	    	$prev = $nowcont.prev() , $next = $nowcont.next();
    	var dir = (deltaX < 0)? "left":"right";
    	var elem = (deltaX < 0) ? $next: $prev;
    	var pos = (deltaX < 0) ? 1: -1;
    	var last = (deltaX < 0) ? $this.find('.lmainTab_con:first'): module.tabElem.find('.lmainTab_con:last');
    	var moveElem = ( elem.length < 1 ) ? last : elem;
    	var ewidth = $nowcont.width();
    	var overpos = ( Math.abs(deltaX) > ewidth )?( deltaX < 0 )? ewidth:-ewidth: 0;

    	var nowKeyvisual = $nowcont.find(depthDiv+":visible").filter(function(i){ if( $(this).data('activedepth') === '1' ){ return $(this); } });
    	if( nowKeyvisual.length < 1 ) nowKeyvisual = $nowcont.find(depthDiv+":visible").first();
    	function notmove(){
    		$nowcont.animate({'left' :'0px'},100);
			$this.find('.lmainTab_con').css('top','0px');
			$this.find('.lmainTab_con').not(':eq('+$nowcont.index()+')').hide();
			$this.find('.lmainTab_con').hide();
			$nowcont.show();
			$this.height("");
    		if( $nowcont.closest(".lmainTab_con").find('.slideNavi button.stop').length > 0 && $nowcont.closest(".lmainTab_con").data('play') !== 1 ){
				module.tabrollPlay( $nowcont.closest(".lmainTab_con").index() );
			}
    	}
    	function de1(){ 
			$nowcont.css('left', deltaX+'px');
			moveElem.show().css('left', ((pos*ewidth)+deltaX)+'px');
			////////////ul height --- 0
			if( moveElem.find('.rollingArea ul').height() === 0 ){
				module.setCssHeight();
			}
			//var hmtop = moveElem.find('.rollingArea ul').height() === 0? $nowcont.find('.rollingArea ul').height() : 0;

			$nowcont.index() < moveElem.index() ? moveElem.css('top', -1*($nowcont.outerHeight(true)) +'px') :
			$nowcont.css('top', -1*(moveElem.outerHeight(true) ) +'px');
			var viewh = moveElem.outerHeight(true) > $nowcont.outerHeight(true) ? moveElem.outerHeight(true) : $nowcont.outerHeight(true);
			$this.height( viewh );

		}
		function de2(){ 
			$nowcont.removeData('activedepth');
			var d = dir === "left"? "next" : "prev"; 			
			nowKeyvisual.css('left', (deltaX+overpos)+'px');
			nowKeyvisual[d]().first().show().css('left', overpos+((pos*ewidth)+deltaX)+'px');
		}
		if( e.srcEvent.type === 'pointerup' ){
    		if( $this.find('.lmainTab_con:visible').length > 1 && parseInt($nowcont.css('left')) < 60 ){
				if( Math.abs(deltaX) < 101 ){
					notmove();
				}
    		}
    	}
		if( e.srcEvent.type !== 'pointercancel' ){
			if( $(e.target).closest('.mainScroll').length > 0 ) return false;
			//interval
			module.tabrollStop($nowcont.index());
			if( e.type === "panend" ){
				
				if( endF === false ){ 
					module.tabDepthEndAni( nowKeyvisual ,dir );
				}else if( endF === true ){
					if( Math.abs(deltaX) < 51 ){
						notmove();
					}else{
						module.tabEndAni( $nowcont , moveElem, dir );
					}
				}
			}
			if( Math.abs(deltaX) > 10 || (e.deltaTime > 300 && Math.abs(e.deltaY) < 0) ){
				if( e.type === "panend" ){
					//
				}else{ 
					if( dir === "left" ){
						if( $nowcont.find(depthDiv).length > 1 ){							
							if( nowKeyvisual.index() < $nowcont.find(depthDiv).length-1  ){
								if( $this.find('.lmainTab_con:visible').length < 2 ){
									de2();
									endF = false;
								}								
							}else{
								if ( ($nowcont.index() === $this.find('.lmainTab_con').length-1) && (nowKeyvisual.index() ===  $nowcont.find(depthDiv).length-1) ){endF = undefined; return false; }
								if ( $nowcont.index() === $this.find('.lmainTab_con').length-1 ) return false;
								de1();
								endF = true;
							}
						}else{
							if ( ($nowcont.index() === $this.find('.lmainTab_con').length-1) && (nowKeyvisual.index() ===  $nowcont.find(depthDiv).length-1) ){ endF = undefined; }// return false;
							if ( $nowcont.index() === $this.find('.lmainTab_con').length-1 ) return false;
							de1();
							endF = true;
						}
					}else{ //right
						if( $nowcont.find(depthDiv).length > 1 ){							
							if( nowKeyvisual.index() !== 0 ){
								if( $this.find('.lmainTab_con:visible').length < 2 ){
									de2();
									endF = false;
								}
							}else{
								if ( $nowcont.index() === 0 && nowKeyvisual.index() === 0 ){ endF = undefined; return false; }
								if ( $nowcont.index() === 0 ) return false;
								de1();
								endF = true;
							}
						}else{
							if ( $nowcont.index() === 0 && nowKeyvisual.index() === 0 ){ endF = undefined; return false; }
							if ( $nowcont.index() === 0 ) return false;
							de1();
							endF = true;
						}

					}//end panend
					//e.isFinal = true;
				} //end deltaX
			} //end pointercancel
		}

	}
	module.tabSideList = function(e){
		var dir = e.type ==='swipeleft' ? "left" : "right";
		var $nowcont = module.tabElem.find('.lmainTab_con:visible').filter(function(i){ if( $(this).data('activetab') === '1' ){ return $(this); } });
		var $prev = $nowcont.prev() ; var $next = $nowcont.next();
    	var dir = e.type ==='swipeleft' ? "left" : "right";
    	var elem =  e.type ==='swipeleft' ? $next: $prev;
    	var last =  e.type ==='swipeleft' ? module.tabElem.find('.lmainTab_con:first'): module.tabElem.find('.lmainTab_con:last');
    	var moveElem = ( elem.length < 1 ) ? last : elem;
    	var idx = moveElem.index();
		module.tabSideListEvent( dir, idx, "swipe", e );
	}
	module.tabSideBottom = function(e){
		e.preventDefault();
		var $this = module.tabElem;
		var animated = $this.find('.lmainTab_con').filter(function(i){ if( $(this).data('animated') === true ){ return $(this); } }).length ||
			$this.find('.lmainTab_con .swifeArea li').filter(function(i){ if( $(this).data('animated') === true ){ return $(this); } }).length ;
    	if( animated > 0 ) return false;
    	if( $this.find('.lmainTab_con').length < 2 ) return false;
		var $nowcont = $this.find('.lmainTab_con:visible').filter(function(i){ if( $(this).data('activetab') === '1' ){ return $(this); } });

		var deltaX = e.deltaX,
	    	$prev = $nowcont.prev() , $next = $nowcont.next();
    	var dir = (deltaX < 0)? "left":"right";
    	var elem = (deltaX < 0) ? $next: $prev;
    	var pos = (deltaX < 0) ? 1: -1;
    	var last = (deltaX < 0) ? $this.find('.lmainTab_con:first'): module.tabElem.find('.lmainTab_con:last');
    	var moveElem = ( elem.length < 1 ) ? last : elem;
    	var ewidth = $nowcont.width();
    	var overpos = ( Math.abs(deltaX) > ewidth )?( deltaX < 0 )? ewidth:-ewidth: 0;
    	function notmove(){
			$nowcont.animate({'left' :'0px'},100);
			$this.find('.lmainTab_con').css('top','0px');
			$this.find('.lmainTab_con').not(':eq('+$nowcont.index()+')').hide();
			$this.find('.lmainTab_con').hide();
			$nowcont.show();
			$this.height("");
			if( $nowcont.closest(".lmainTab_con").find('.slideNavi button.stop').length > 0 && $nowcont.closest(".lmainTab_con").data('play') !== 1 ){
				module.tabrollPlay( $nowcont.closest(".lmainTab_con").index() );
			}
		}
    	if( e.srcEvent.type === 'pointerup' ){
    		if( $this.find('.lmainTab_con:visible').length > 1 && parseInt($nowcont.css('left')) < 60 ){
    			if( Math.abs(deltaX) < 101 ){
					notmove();
				}
	    	}
		}
    	if( e.srcEvent.type !== 'pointercancel' ){
    		if( $nowcont.index() === 0 && dir === "right" ) return false;
			if( $nowcont.index() === module.tabElem.find('.lmainTab_con').length-1 && dir === "left" ) return false;
			//interval
			module.tabrollStop($nowcont.index());

    		if( Math.abs(deltaX) > 50 || (e.deltaTime > 300 && Math.abs(e.deltaY) < 0) ){ //|| (e.deltaTime > 300 && Math.abs(e.deltaY) < 10)
    			if( e.type === "panend" ){
    				if( dir === 'left' ){
						if ( $nowcont.index() === $this.find('.lmainTab_con').length-1 ) return false;
					}else{
						if ( $nowcont.index() === 0 ) return false;
					}
    				if( Math.abs(deltaX) < 51 ){
						notmove();
					}else{
						module.tabEndAni( $nowcont , moveElem, dir );
					}
    			}else{
    				$nowcont.css('left', deltaX+'px');
					moveElem.show().css('left', ((pos*ewidth)+deltaX)+'px');
					////////////ul height --- 0
					if( moveElem.find('.rollingArea ul').height() === 0 ){
						module.setCssHeight();
					}
					//var hmtop = moveElem.find('.rollingArea ul').height() === 0? $nowcont.find('.rollingArea ul').height() : 0;
					$nowcont.index() < moveElem.index() ? moveElem.css('top', -1*($nowcont.outerHeight(true)) +'px') :
					$nowcont.css('top', -1*(moveElem.outerHeight(true) ) +'px');
					var viewh = moveElem.outerHeight(true) > $nowcont.outerHeight(true) ? moveElem.outerHeight(true) : $nowcont.outerHeight(true);
					$this.height( viewh );
					e.isFinal = true;
    			}
    		}
    	}
	}
	module.tabSideListEvent = function( dir, idx, type , e ){
  		var animated = module.tabElem.find('.lmainTab_con').filter(function(i){ if( $(this).data('animated') === true ){ return $(this); } }).length ;
    	if( animated > 0 ) return false;
		if( idx === $('.lmainTab_list .lmainTab_con:visible').index() ) return false;

		var $nowcont = $('.lmainTab_list .lmainTab_con:visible').filter(function(i){ if( $(this).data('activetab') === '1' ){ return $(this); } }),
			moveElem =  $('.lmainTab_list .lmainTab_con').eq(idx);
			if( $nowcont.length < 1 ) $nowcont = $('.lmainTab_list .lmainTab_con:visible');
			moveElem.show();
		var isCancel;
		if( type === "swipe" ){
			isCancel = e.srcEvent.type !== 'pointercancel';
		}else{
			isCancel = true;
		}
		if( isCancel ){
			if( type === "swipe" ){
				if( $nowcont.index() === 0 && dir === "right" ) return false;
				if( $nowcont.index() === module.tabElem.find('.lmainTab_con').length-1 && dir === "left" ) return false;
			} 
			moveElem.css('left', dir === "right"? -$nowcont.width() : $nowcont.width() +'px');
			var sh = moveElem.find('.rollingArea ul').height() === 0 ? $nowcont.find('.rollingArea ul').height() : 0;
			( dir === "right" ) ? $nowcont.css('top', -(moveElem.outerHeight(true))+'px' ) : moveElem.css('top', -$nowcont.outerHeight(true) +'px');
			
			//interval
			module.tabrollStop( $nowcont.index() );
			module.tabEndAni( $nowcont , moveElem, dir );
			
			//fixed list
	  		module.fixedlist();
	  		//
		}
	}
	module.fixedlist = function(){  		
  		var iosHeight = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream ? 30 : 0 ;
  		$('.lmainTab').css({
  			'-webkit-backface-visibility': 'hidden'
  		});		
  		tabpostion();
  		function tabpostion(){
  			if( iosHeight+$(window).scrollTop()+$(window).height()-$('footer').position().top > 0 ){  				
	  			$('.lmainTab >ul').css({'position':'','bottom':''});
	  		}else{	  			
	  			$('.lmainTab>ul').css({'position':'fixed','bottom':'0px'});
	  		}
  		}
  		setTimeout(function(){
  			tabpostion();
  		},50);
	}
	module.mainTabset = function(){ 		
	  	$('.lmainTab').each(function(k){
	  		var tablist = new Hammer( this );
			tablist.get('swipe').set({ direction: Hammer.DIRECTION_HORIZONTAL });
		  	tablist.off("swipeleft swiperight").on("swipeleft swiperight", module.tabSideList );
	  	});
		$('.lmainKeyvisual').each(function(i){ 
			var tab = new Hammer( this ); //$('.lmainTab_list')[0]  areadiv[0]
			tab.get('pan').set({ direction: Hammer.DIRECTION_HORIZONTAL });
		  	tab.off("panleft panright panend").on("panleft panright panend", module.tabSide );
		});
	  	//service tab bottom area	  	
	  	if ($('.lmainTab_con:eq(0) .lmainSearch')[0]) {
		  	var tab1Search1 = new Hammer( $('.lmainTab_con:eq(0) .lmainSearch .srchTire')[0] );
			tab1Search1.get('pan').set({ direction: Hammer.DIRECTION_HORIZONTAL });
		  	tab1Search1.off("panleft panright panend").on("panleft panright panend", module.tabSideBottom );
		  	var tab1Search2 = new Hammer( $('.lmainTab_con:eq(0) .lmainSearch .srchDealer.search')[0] );
			tab1Search2.get('pan').set({ direction: Hammer.DIRECTION_HORIZONTAL });
		  	tab1Search2.off("panleft panright panend").on("panleft panright panend", module.tabSideBottom );
	  	}
	  	if ( $('.lmainTab_con:eq(2) .tabContent').children().length > 1 ) {
	  		$('.lmainTab_con:eq(2) .tabContent').children().each(function(i){
	  			if( i !== 0 ){
	  				var tab3Content = new Hammer( this );
					tab3Content.get('pan').set({ direction: Hammer.DIRECTION_HORIZONTAL });
			  		tab3Content.off("panleft panright panend").on("panleft panright panend", module.tabSideBottom );
	  			}
	  		});		  	
	  	}
	}
	module.mainTab = function(){
		module.tabElem = $('.lmainTab_list');
		//time
		module.tabElem.find('.lmainTab_con').each(function(i){
			module.timer[i] = new Timer();
		});
		//fixed list
	  	module.fixedlist();
		module.setCss();
		module.mainTabset();

	  	$(document).off('click.lmainTab').on('click.lmainTab', '.lmainTab a',function(e){
	  		e.preventDefault(); 
	  		var idx = $(this).parent().index();
	  		var $nowcont = $('.lmainTab_list .lmainTab_con:visible') ,
				moveElem =  $('.lmainTab_list .lmainTab_con').eq(idx) ;
	  		var dir = $nowcont.index() > moveElem.index() ? "right" :"left";
	  		module.tabSideListEvent( dir, idx, "click", e );
	  	});
	  	//indicater
	  	$('.slideNavi a').off('click').on('click', function(e){
	  		e.preventDefault();
	  		var targetList = $(e.target).closest('.lmainTab_con');
	  		var animated = module.tabElem.find('.lmainTab_con').filter(function(i){ if( $(this).data('animated') === true ){ return $(this); } }).length ||
				module.tabElem.find('.lmainTab_con .swifeArea li').filter(function(i){ if( $(this).data('animated') === true ){ return $(this); } }).length ;
	    	if( animated > 0 ) return false;
			targetList.data('activedepth','left');
			e.preventDefault();
			var $now = targetList.find('li:visible').filter(function(i){ if( $(this).data('activedepth') === '1' ){ return $(this); } });
			var idx = $(this).index();
			module.tabDepthEndAni( $now, 'left' , idx );
	  	});
	  	//playstop
	  	$('.slideNavi button').off('click').on('click', function(e){
	  		e.preventDefault();
	  		var idx = $(this).closest('.lmainTab_con').index();
	  		if( $(this).hasClass('stop') ){ //stop
	  			$(this).addClass('play').removeClass('stop');
	  			module.tabrollStop(idx);
	  		}else{	//play
	  			$(this).addClass('stop').addClass('play');
	  			module.tabrollPlay(idx);
	  		}
	  	});
	  	if( $('.lmainTab_list .lmainTab_con:first .swifeArea li').length > 0 && $('.lmainTab_list .lmainTab_con:first .slideNavi .stop').length > 0  ){
	  		//interval time
	  		module.tabrollPlay(0);
	  	}
	  	
	  	$(window).off('scroll.lmainTab').on('scroll.lmainTab', module.fixedlist );
	  	//pc test
	  	var click = false;
	  	module.tabElem.off('mousedown mouseup').on('mousedown mouseup', function(e){
	  		e.preventDefault();
	  		if( e.type === "mousedown" ){
	  			click = true;
	  		}else if( e.type === "mouseup" || e.type === "touchend" ){
	  			click = false;
	  			module.tabElem.trigger('panend');
	  		}
	  	});
	  	//resize
	  	var wd = $(window).width();
	  	$(window).off('resize.lmainTab').on('resize.lmainTab', function(){
	  		if( wd !== $(window).width() ){
	  			module.fixedlist();
	  			module.setCssHeight();
	  			module.scrollcss();
	  			wd = $(window).width();
	  		}
	  	});

	}
	module.init = function(){
		if( $('.lmainTab').length > 0 ){
			module.scrollcss();
			module.mainTab();
		}
	}

}(jQuery));

