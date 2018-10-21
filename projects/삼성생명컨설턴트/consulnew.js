
function fnChangeMailDomain() {
	if ( $("#newsmail_select").val() == "" ) {
		$("#newsMail2").val('');
		$("#newsMail2").attr("readOnly", false);
	} else {
		$("#newsMail2").val($("#newsmail_select option:selected").text());
		$("#newsMail2").attr("readOnly", true);
	}
}

$(window).load(function(){
	//job match
	var jobs = new JobMatch();
	//location bar
	smnf_WriteConsultantLocationhtml();
	$('img').css({
		'background' : 'transparent',
		'-ms-filter': 'progid:DXImageTransform.Microsoft.gradient(startColorstr=#00FFFFFF,endColorstr=#00FFFFFF)',
		'filter' : 'progid:DXImageTransform.Microsoft.gradient(startColorstr=#00FFFFFF,endColorstr=#00FFFFFF)',
		'Zoom' : '1'
	});
	(new Image()).src = "/img/consultant/main/bg_tab02.jpg";
	(new Image()).src = "/img/consultant/main/bg_tab03.jpg";
	//focus
	(function($, window){
		var parent = this.focusview = {};
		parent.ele;
		parent.toggleVideo = function(state){
			var div = $('.movieArea'),
			iframe = '<iframe src="http://www.youtube.com/embed/6hmPS3_lSko?version=3&hl=ko_KR&rel=0&amp;wmode=opaque" allowfullscreen title="당신이 아까워요 유투브 동영상" style="width:670px;height:378px;border:0"></iframe>',
			f = "";
			div.closest('.layerWrap').is(':hidden') ? f = div.empty() : div.empty().append(iframe);

		}
		parent.close = function(e){
			e.preventDefault();
			if( $('div.layerWrap:visible').length > 0 ){
				if( $('div.layerWrap:visible').find('form').length > 0 ){
					$('div.layerWrap:visible').find('form')[0].reset();
				}
				$('div.layerWrap:visible').hide();
				$('div.btn_support').css('z-index','99');
				$('div#container').removeAttr('style');
				if( $('div.layerWrap').find('.movieArea ').length > 0 ){
					parent.toggleVideo();
				}
			}
			if( $('div.jobcahnnelPop').length > 0 ){
				$('div.jobcahnnelPop:visible').find('.rollCon > a').eq(0).trigger('click');
				$('div.jobcahnnelPop:visible').hide();
			}
			parent.ele.focus();
		}
		parent.layerfocusmove = function(e){
			if( $('div.layerWrap:visible').length > 0 ){
				if( $('#movieLayer').is(':visible') ){
					$('#movieLayer').find('.movieArea').attr('tabindex','0').focus();
				}else{
					$('div.layerWrap:visible').find('.layerpop').find('a:first').focus();
					$('div.layerWrap:visible').find('.layerpop').find('input:first').focus();
				}

			}
			if( $('div.jobcahnnelPop:visible').length > 0 ){
				$('div.jobcahnnelPop:visible').find('a:first').focus();
			}
		}
		parent.contMiddle = function(){
			$('.mainTab02_list > div').attr('tabindex', '0');
			$('.mainTab02_list > div').on('focus', function(){
				var idx = $(this).index()+1,
				target = $(this);
				cont2in(target,idx);
			}).hover(function(){
				var idx = $(this).index()+1,
					target = $(this);
				cont2in(target,idx);
			},function(){
				cont2out();
			});
			$('.mainTab > li:eq(2) a').first().on('focus', function(){
				cont2out();
			});
			function cont2in(elem,idx){
				$('.mainTab02_list > div').find('div').hide();
				$('.mainTab02_list > div').each( function(i){
					if( idx-1 === i){
						$(this).css('z-index', 5 );
					}else {
						$(this).css('z-index', (4-i) );
					}
					$(this).css('background','url(../../img/consultant/main/img_human0'+ (i+1) +'.png)');
				});
				$(elem).css('background','url(../../img/consultant/main/img_human0'+ idx +'_over.png)');
				$(elem).find('div').show();
			}
			function cont2out(){
				$('.mainTab02_list > div').find('div').hide();
				$('.mainTab02_list > div').each( function(i){
					$(this).css('z-index', (4-i) );
					$(this).css('background','url(../../img/consultant/main/img_human0'+ (i+1) +'.png)');
				});
			}
		}
		parent.supportInput = function(){
			$('th').filter(function(i){ return $(this).text() === '지원분야'}).next().find('span >input').on('focus',function(){
				$(this).parent().next().show();
			});
			$('th').filter(function(i){ return $(this).text() === '지원분야'}).next().find('span>input').on('blur',function(){
				$(this).parent().next().hide();
			});
		}
		parent.init = function(){
			//$('.movieArea').empty();
			function close(e){ parent.close(e); };
			function layerfocusmove(e){ parent.layerfocusmove(e); };
			$('.btn_close').on('click', close );
			$('.btn_close').on('focusout', layerfocusmove );
			var cancel = $('.layerWrap').find('.center >a');
			cancel.on('click', close );
			parent.contMiddle();
			parent.supportInput();
		}

	}(jQuery, window));
	focusview.init();

	//menu
	(function($, window){
		var parent = this.scmenu = {};
		var lis = $('div.gnb >ul >li');

		parent.lo = function(){
			var div = $('div.location'),
				dep = div.find('.depCon > a');
			var chCount = 0,
				chch = false;
			dep.on('click', function(e){
				e.preventDefault();
				chch = true;
				if( chch ){
					if( $(this).parent().find('ul').is(':animated') ){
						$(this).parent().find('ul').slideDown(250);
					}else{
						dep.parent().find('ul').hide();
						$(this).parent().find('ul').slideDown(250);
					}
				}

			});
			dep.on('focus', function(e){
				//e.preventDefault();
				if( !chch ){
					dep.parent().find('ul').hide();
					$(this).parent().find('ul').slideDown(250);
				}
				chch = false;
			});
			div.find('.depCon:eq(1)').find('ul>li:last>a').on('focusout', function(e){
				e.preventDefault();
				div.find('.depCon > ul').hide();
			});
			div.on('mouseleave', function(e){
				e.preventDefault();
				dep.blur();
				div.find('.depCon > ul').hide();
			});
			div.find('.consalBtn > .btn01').on('click', function(e){
				e.preventDefault();
				focusview.ele = $(this);
				$('body>div.layerWrap.consaltjoppop').show();
				$('body>div.layerWrap.consaltjoppop').find('.jobmatching>.con>ol>li').not(':first').hide();
				$('body>div.layerWrap.consaltjoppop').find('.btn_close').focus();
			});

		}

		parent.init = function(){
			lis.find('>a').on('mouseenter', function(e){
				e.preventDefault();
				$('div.gnbTotal').slideDown();
			});
			$('#header').on('mouseleave', function(e){
				e.preventDefault();
				$('div.gnbTotal').hide();
			});
			//location
			parent.lo();
			//focus
			var lis_idx;
			lis.find('>a').focus(function(){
				$('div.gnbTotal').show();
				lis_idx= $(this).parent().index();
				$(this).keydown(function(e){
					if( e.keyCode == 9 ){
						if( e.shiftKey ){
							lis.eq(lis_idx).find('>a').focus();
						}else{
							$('div.submn').attr('tabindex','');
							$('div.submn').eq(lis_idx).attr('tabindex','0').focus();
						}
					}
				});

			});
			$('div.submn').find('a').focus(function(){
				var idx = $(this).closest('.submn').index();
				$(this).focusout(function(){
					if( $(this).parent().index() === $(this).closest('ul').find('li').length -1 ){
						lis.eq(idx).next().find('>a').focus();
					}
				});
			});
			$('div.topSearch > button').focus(function(){
				$('div.gnbTotal').hide();
			});
			$('div#container').find('a').first().focus(function(){
				$('div.gnbTotal').hide();
			});
		}

	}(jQuery, window));

	scmenu.init();

	//main cont
	(function($, window){
		var parent = this.mcont = {};
		var div = $('div.content'),
			tab = div.find('>ul>li>h2>a');
		$('div.btn_support').css('z-index','99');
		//tab contents youtube, recruiting box
		parent.viewdiv = function(){
			var pdiv1 = $('div.mainTab01_list');
			pdiv1.find('a.list02').on('click', function(e){
				e.preventDefault();
				$('div.layerWrap.moviepop').show();
				$('div#container').css('z-index','1000');
				$('div.btn_support').removeAttr('style');
				focusview.toggleVideo();
				focusview.ele = $(this);
				$('div.layerWrap:visible').find('.btn_close').focus();
			});

			var pdiv2 = $('div.recrutingMail > a');
			pdiv2.on('click', function(e){
				e.preventDefault();
				$('div.layerWrap.mailpop').show();
				$('div#container').css('z-index','1000');
				$('div.btn_support').removeAttr('style');
				focusview.ele = $(this);
				$('div.layerWrap:visible').find('.btn_close').focus();
			});
			// job match
			var pdivJob = $('div.consalJob > a');
			pdivJob.on('click', function(e){
				e.preventDefault();
				$('body>div.layerWrap.consaltjoppop').show();
				$('body>div.layerWrap.consaltjoppop').find('.jobmatching>.con>ol>li').not(':first').hide();
				focusview.ele = $(this);
				$('body>div.layerWrap.consaltjoppop').find('.btn_close').focus();
			});


		};
		var sh = 0;
		//tab control
		parent.init = function(){
			tab.on('click', function(e){
				e.preventDefault();
				var idx = $(this).closest('li').index(),
					num = idx + 1;

				div.find('>ul>li').removeClass('on');
				$(this).closest('li').addClass('on');

				if( sh === idx ){
					return false;
				}else{
					div.find('>ul>li').each(function(i){
						if( idx === i ){
							$(this).closest('li').find('.mainTab_con').show().css('left','970px');
							$(this).closest('li').find('.mainTab_con').stop().animate({
								left: '0px'
							});
						}else if( idx !== i ){
							div.find('>ul>li').eq(sh).find('.mainTab_con').show().stop().animate({
								left: '-970px'
							}, function(){
								$(this).hide();
							});
						}
					});
					sh = idx;
					$('div.consolCon.mainconsol').css({
						'background-image' : 'url(/img/consultant/main/bg_tab0'+ num +'.jpg)'
					});
				}
			});
			//
			parent.viewdiv();
		};
	}(jQuery, window));
	mcont.init();

	//faq
	(function($, window){
		var parent = this.contents = {};
		parent.faq = function(){
			var lis = $('ul.faqList > li > a');
			lis.parent().not(':first').removeClass('on');
			lis.parent().not(':first').find('.faqCont').addClass('hidden');
			lis.on('click', function(e){
				e.preventDefault();
				//lis.parent().removeClass('on');
				//$(this).parent().addClass('on');
				//lis.parent().find('.faqCont').addClass('hidden');
				//$(this).parent().find('.faqCont').removeClass('hidden');
				$(this).parent().toggleClass('on');
				$(this).parent().find('.faqCont').toggleClass('hidden');
			});

		}

		parent.init = function(){
			if( $('ul.faqList').length > 0){
				parent.faq();
			}
		}

	}(jQuery, window));
	contents.init();

	//window scroll
	(function($, window){
		var parent = this.wskroll = {};
		parent.conheight = $('div.bgArea >div').eq(0).height() + $('div.bgArea >div').eq(1).height() + $('div.bgArea >div').eq(2).height() + $('div.bgArea >div').eq(3).height();
		parent.chn = 0;
		parent.btnNum = 0;
		parent.whyNum = 2;
		parent.life_start = function(){
			$('div.timeArea').css({	'position':'absolute', 'top':'1033px' });
			$('div.rollArea').css({	'position':'absolute', 'top':'1164px' });
			$('div.btn_down').css({	'position':'absolute', 'top':'1600px' });
			if( $('div.consolCon').hasClass('gfclife') || $('div.consolCon').hasClass('fclife') || $('div.consolCon').hasClass('ptfclife') || $('div.consolCon').hasClass('sfplife') ){
				$('div.content').not(':first').css({ 'position':'absolute', 'top':'840px' });
				$('div.content').removeClass('hidden');
			}
			//$('div.content').not(':first').add().not(':eq(1)').addClass('hidden');
			$('div.sandtimeArea').css({	'position':'absolute', 'top': ((250-50)+840)+'px' });

			$('div.dayvisualArea').css({'position':'absolute', 'top': (310+840)+'px' });
			$('div.compassArea').css({'position':'absolute', 'top': (310+840)+'px' });
		}
		parent.life_skr = function(){
			$('div.timeArea').css({	'position':'fixed',	'top':'193px' });
			$('div.rollArea').css({	'position':'fixed',	'top':'324px' });
			$('div.btn_down').css({	'position':'fixed',	'top':'750px' });
			if( $('div.consolCon').hasClass('gfclife') || $('div.consolCon').hasClass('fclife') || $('div.consolCon').hasClass('ptfclife') || $('div.consolCon').hasClass('sfplife') ){
				$('div.content').not(':first').css({ 'position':'fixed', 'top':'0px' });
			}
			//$('div.content').not(':first').add().not(':eq(1)').addClass('hidden');
			$('div.sandtimeArea').css({	'position':'fixed',	'top': (250-50)+'px' });

			$('div.dayvisualArea').css({'position':'fixed',	'top': 310 +'px', 'left': '50%','margin-left':'-350px' });
			$('div.compassArea').css({'position':'fixed', 'top': 310 +'px', 'left': '50%','margin-left':'-350px' });
		}
		parent.life = function(wt){
			if( wt > $('div.bgArea >div').eq(1).offset().top && wt < $('div.bgArea >div').eq(4).offset().top ){
				parent.life_skr();

			}else if( wt < $('div.bgArea >div').eq(1).offset().top ){
				parent.life_start();

			}else if( wt > $('div.bgArea >div').eq(4).offset().top ){
				$('div.timeArea').css({	'position':'absolute', 'top': 193 + parent.conheight +'px' });
				$('div.rollArea').css({	'position':'absolute', 'top': 324 + parent.conheight +'px' });
				$('div.btn_down').css({	'position':'absolute', 'top': 830 + parent.conheight +'px' });
				if( $('div.consolCon').hasClass('gfclife') || $('div.consolCon').hasClass('fclife') || $('div.consolCon').hasClass('ptfclife') || $('div.consolCon').hasClass('sfplife') ){
					$('div.content').not(':first').css({'position':'absolute', 'top': parent.conheight +'px' });
				}
				$('div.sandtimeArea').css({	'position':'absolute', 'top': (250-50) + parent.conheight +'px' });
				$('div.dayvisualArea').css({'position':'absolute', 'top': 210 + parent.conheight +'px' });
				$('div.compassArea').css({'position':'absolute', 'top': 210 + parent.conheight +'px' });

			}
			var idx = 0;
			$('div.bgArea > div').each(function(i){
				if ( parseInt($(this).offset().top + 400) < wt ){
					idx = $(this).index();
				}
			});
			$('div.rollArea').find('a').removeClass('on').attr('title','');
			$('div.rollArea').find('a').eq(idx).addClass('on').attr('title','선택');

			if( idx !== parent.chn ){
				if( $('div.consolCon').hasClass('gfclife') || $('div.consolCon').hasClass('fclife') || $('div.consolCon').hasClass('ptfclife') || $('div.consolCon').hasClass('sfplife') ){
					$('div.content').not(':first').fadeTo('fast',0).addClass('hidden');
					$('div.content').eq(idx+1).fadeTo('fast',1).removeClass('hidden');
				}
				parent.chn = idx;
				parent.btnNum = parent.chn;

				if( $('div.timeArea').length > 0 ){
					parent.fc( idx );
				}else if( $('div.sandtimeArea').length > 0 ){
					parent.gfc( idx );
				}else if( $('div.dayvisual').length > 0 ){
					parent.pfc( idx );
				}else if( $('div.compass').length > 0 ){
					parent.sfp( idx );
				}

				if( idx > 2 ){
					//$('div.btn_down').hide();
				}else{
					$('div.btn_down').show();
				}
			}else{
				if( $('div.consolCon').hasClass('gfclife') || $('div.consolCon').hasClass('fclife') || $('div.consolCon').hasClass('ptfclife') || $('div.consolCon').hasClass('sfplife') ){
					$('div.content').not(':first').show().addClass('hidden');
					$('div.content').eq(idx+1).show().removeClass('hidden');
				}
				if( $('div.timeArea').length > 0 ){
					parent.fc( idx );
				}
			}

		}
		parent.fc = function( n ){
			if( n === 4 ) n = 3;
			var degArr = [0,20,170,291],
				t1 = [0, 0, 10, 10],
				t2 = [8, 9, 2, 6],
				t3 = [3, 10, 10, 10],
				t4 = [10, 10, 10, 10];
	    	TweenMax.to(".timeImg", 1, {
				rotation: parseInt( degArr[n] ),
				onComplete: function(){
					$('span.timeImg >img').removeAttr('style');
				}
		    });
	    	$('.timeArea').css('background-image' , 'url(/img/consultant/life/bg_time0'+ parseInt(n+1) +'.png)');
	    	$('.timetext0').stop().animate({
	    		'margin-top': - 40*t1[n] +'px'
	    	},600);
	    	$('.timetext1').stop().animate({
	    		'margin-top': - 40*t2[n] +'px'
	    	},600);
	    	$('.timetext2').stop().animate({
	    		'margin-top': - 40*t3[n] +'px'
	    	},600);
	    	$('.timetext3').stop().animate({
	    		'margin-top': - 40*t4[n] +'px'
	    	},600);
			switch ( n ){
				case 0 : $('p.lifetit').text('출발'); $('p.timetit').attr('title','오전'); $('p.timetit > img').attr({ src : '/img/consultant/life/txt_am.png', alt : 'AM' });
					break;
				case 1 : $('p.lifetit').text('아침조회'); $('p.timetit').attr('title','오전'); $('p.timetit > img').attr({ src : '/img/consultant/life/txt_am.png', alt : 'AM' });
					break;
				case 2 : $('p.lifetit').text('고객 미팅'); $('p.timetit').attr('title','오후'); $('p.timetit > img').attr({ src : '/img/consultant/life/txt_pm.png', alt : 'PM' });
					break;
				case 3 : $('p.lifetit').text('업무 정리'); $('p.timetit').attr('title','오후'); $('p.timetit > img').attr({ src : '/img/consultant/life/txt_pm.png', alt : 'PM' });
					break;
				default :
					break;
			}

		}
		parent.gfc = function( n ){
			var topArr = [ 0, -38, -58, -58 ],
				topArr1 = [ 67, 30, 10, 10 ],
				topArr2 = [ 0, 47, 67, 0 ],
				btmArr = [ 20, 40, 67, 67 ];
			if( n > 2 ){
				TweenMax.to(".sandtimeArea", 0.7, {
					rotation: parseInt( 180 )
			    });
				setTimeout( function(){
					TweenMax.to(".sandtime2", 0, {
						rotation: parseInt( 180 ),
						top: 44,
						onComplete: function(){ $('span.sandtime2 >img').removeAttr('style'); }
				    });
				}, 200 );

			}else if ( n < 3 ){
				TweenMax.to(".sandtimeArea", 0.7, {
					rotation: parseInt( 0 )
			    });
				setTimeout( function(){
					TweenMax.to(".sandtime2", 0, {
						rotation: parseInt( 0 ),
						top: 96
				    });
				}, 200 );
			}
			$('.sandTop ').stop().animate({ height : topArr1[n]+'px' , 'margin-top' : topArr2[n]+'px'},1000);
			$('.sandTop >img').stop().animate({ 'margin-top' : topArr[n]+'px' },1000);
			$('.sandbottom').stop().animate({ height: btmArr[n]+'px' },1000);
		}
		parent.pfc = function( n ){
			n > 3? n = 3 : n;
			$('div.dayvisualArea').css({
				'background-image' : 'url(/img/consultant/life/bg_dayvisual0'+ parseInt(n+1) +'.png)'
			});
		}
		parent.sfp = function( n ){
			n > 3? n = 3 : n;
			$('div.compassArea').css({
				'background-image' : 'url(/img/consultant/life/bg_compass0'+ parseInt(n+1) +'.png)'
			});
		}
		//life, location
		parent.init = function(){
			//common
			if( $('div.consolCon').hasClass('gfclife') || $('div.consolCon').hasClass('fclife') || $('div.consolCon').hasClass('ptfclife') || $('div.consolCon').hasClass('sfplife') ){
				$('.content').css('left','50%');
			}
			//fc
			var timeNum = $('.timeNum > span').filter(function(i){ if( ! $(this).hasClass('hidden') ){ return i !== 2; } });
			timeNum.css({
				'width':'28px',
				'height' : '40px',
				'overflow': "hidden",
				'display':'inline-block'
			});
			timeNum.each( function(i){
				$(this).empty();
				for ( var k=0, l = 10; k <l ; k++){
					$(this).append('<img src="/img/consultant/life/img_num'+k+'.png" alt="'+k+'" style="background: transparent;">');
					if( k === 9 ){
						$(this).append('<img src="/img/consultant/life/img_num0.png" alt="0" style="background: transparent;">');
					}
				}
				$(this).find('img').wrapAll('<div class=timetext'+i +' />');
			});
			//gfc
			$('.sandTop').css({'overflow':'hidden', 'height':'67px' });
			$('.sandbottom').css({'overflow':'hidden', 'height':'20px'});
			$('.sandtimeArea').css({'width':'340px', 'height':'340px', 'margin-left':'-170px'});
			$('.sandtimeCon').wrap('<div style="position:absolute; top:50%; left:50%; margin-left:-85px; margin-top:-125px;" />');

			if( $('div.bgArea >div').length > 0 ){
				parent.life($(window).scrollTop());
			}
			//location
			if( $(window).scrollTop() > $('div#header').height() ){
				$('div.location').css({	'position':'fixed' });
			}else{
				$('div.location').css({	'position':'absolute' });
			}
			$(window).scroll(function(){
				var wt = $(window).scrollTop();
				if( $('div.bgArea >div').length > 0 ){
					parent.life(wt);
				}
				//location
				if( wt > $('div#header').height() ){
					$('div.location').css({	'position':'fixed' });
				}else{
					$('div.location').css({	'position':'absolute' });
				}
				//why consultant
				if( $('div.whysamsung').length > 0 ){
					if( wt <= $('div.whysamsung.con01').offset().top  ){
						$('div.btn_scroll').show();
						$('div.btn_scroll').css({ 'top':'750px'});
						parent.whyNum = 2;
					}else if( wt >= $('div.whysamsung.con01').offset().top && wt <= $('div.whysamsung.con02').offset().top ){
						$('div.btn_scroll').show();
						$('div.btn_scroll').css({ 'top':'820px'});
						parent.whyNum = 3;
					}else if( wt > $('div.whysamsung.con02').offset().top + 200 ){
						$('div.btn_scroll').hide();
					}
				}
			});

			$('div.rollArea >a').on('click', function(e){
				e.preventDefault();
				var aidx = $(this).index()+ 1;
				$('html, body').animate({
					scrollTop:  ($('div.bgArea >div').eq(aidx).offset().top) + 'px'
				});
			});
			$('div.btn_down').on('click', function(e){
				e.preventDefault();
				parent.btnNum++;
				parent.btnNum > $('div.bgArea >div').length-1 ? parent.btnNum = $('div.bgArea >div').length-1 : parent.btnNum;
				$('div.rollArea >a').eq(parent.btnNum).trigger('click');
				if( parent.btnNum > 3 ){
					$('html, body').animate({
						scrollTop:  ($('.etc_lifeArea').offset().top -50) + 'px'
					});
				}
			});
			$('div.btn_start > a').on('click', function(e){
				e.preventDefault();
				$('div.rollArea >a').eq(0).trigger('click');
			});
		}

	}(jQuery, window));

	wskroll.init();
	//consultantjob
	(function($, window){
		var parent = this.consultantjob = {};

		parent.tab = function(){
			var li = $('.consuljob.con02 > .content > ul > li > a.lifego'),
				rolli = $('div.jobcahnnelPop').find('.rollCon>a'),
				arrow = $('div.jobcahnnelPop').find('.channelRoll > a');
			var cur = 0;
			li.on('click', function(e){
				e.preventDefault();
				var idx = $(this).parent().index();
				$(window).scrollTop( ($('.consuljob.con02').offset().top - 47) );
				focusview.ele = $(this);
				$('div.jobcahnnelPop').hide();
				$('div.jobcahnnelPop').eq(idx).show();
				$('div.jobcahnnelPop:visible').find('.btn_close').focus();
			});
			rolli.on('click', function(e){
				e.preventDefault();
				var idx = $(this).index();
				var box = $(this).closest('.channelRoll').find('>ul');
				$(this).siblings().removeClass('on').attr('title','');
				$(this).addClass('on').attr('title','선택');
				cur = idx;
				box.animate({
					marginLeft:  -($('.channelRoll').width() *idx) + 'px'
				});

			});
			arrow.on('click', function(e){
				e.preventDefault();
				var dot = $(this).closest('.channelRoll').find('.rollCon > a');
				if( $(this).hasClass('btn_l') ){//prev
					cur--;
					cur < 0 ? cur = 0 : cur;
				}else{
					cur++;
					cur > dot.length-1 ? cur = dot.length-1 : cur;
				}
				dot.eq(cur).trigger('click');
			});
		}
		parent.winloc = function(){
			window.location.href.split("#")[0];
			//life href
			if( $('div.consolCon').hasClass('gfclife') ){
				$('.etc_lifeArea > .con > a.list02').on('mouseenter', {h:"#gfc"}, hrefs);
			}else if( $('div.consolCon').hasClass('fclife') ){
				$('.etc_lifeArea > .con > a.list02').on('mouseenter', {h:"#fc"}, hrefs);
			}else if( $('div.consolCon').hasClass('ptfclife') ){
				$('.etc_lifeArea > .con > a.list02').on('mouseenter', {h:"#pfc"}, hrefs);
			}else if( $('div.consolCon').hasClass('sfplife') ){
				$('.etc_lifeArea > .con > a.list02').on('mouseenter', {h:"#sfp"}, hrefs);
			}
			function hrefs(event){
				$(event.currentTarget).attr('href').match(event.data.h)? $(event.currentTarget).attr('href', $(event.currentTarget).attr('href')) : $(event.currentTarget).attr('href',$(event.currentTarget).attr('href') + event.data.h );
			}
			if( location.hash.match(/(#fc)/) ){
				$('.consuljob.con02 > .content > ul > li').eq(0).find('a.lifego').trigger('click');
			}else if( location.hash.match(/(#gfc)/) ){
				$('.consuljob.con02 > .content > ul > li').eq(2).find('a.lifego').trigger('click');
			}else if( location.hash.match(/(#pfc)/) ){
				$('.consuljob.con02 > .content > ul > li').eq(3).find('a.lifego').trigger('click');
			}else if( location.hash.match(/(#sfp)/) ){
				$('.consuljob.con02 > .content > ul > li').eq(1).find('a.lifego').trigger('click');
			}
			$(window).on('hashchange', function(){
				if( location.hash.match(/(#fc)/) ){
					$('.consuljob.con02 > .content > ul > li').eq(0).find('a.lifego').trigger('click');
				}else if( location.hash.match(/(#gfc)/) ){
					$('.consuljob.con02 > .content > ul > li').eq(2).find('a.lifego').trigger('click');
				}else if( location.hash.match(/(#pfc)/) ){
					$('.consuljob.con02 > .content > ul > li').eq(3).find('a.lifego').trigger('click');
				}else if( location.hash.match(/(#sfp)/) ){
					$('.consuljob.con02 > .content > ul > li').eq(1).find('a.lifego').trigger('click');
				}
			});
		}
		parent.init = function(){
			parent.tab();
			parent.winloc();
			var num = 2;
			if( $('div.whyCon').length > 0 ){ //why
				$('div.btn_scroll').css({ 'position':'fixed','top':'750px'});
				num = wskroll.whyNum;
			}else{ //job
				num = 2;
			}
			$('div.btn_scroll > a').on('click', function(e){
				e.preventDefault();
				if( $('div.whyCon').length > 0  ){
					num = wskroll.whyNum;
				}
				$('html, body').animate({
					scrollTop:  ($('.con0'+num ).offset().top) + 'px'
				});
			});

		}
	}(jQuery, window));
	consultantjob.init();



});

function JobMatch( op ){
	this.option = $.extend({
	},op);
	this.init();
}

$.extend(JobMatch.prototype, {
	calllayer: function(){
		$.get( '/consultant/jobmatch.html' ).done( addhtml ); //현재페이지경로에서
		function addhtml( data ){
			var cont = $(data).filter('div.layerWrap.consaltjoppop');
			var result = $('body').append(cont),
				con = cont.find('div.jobmatching > div.con'),
				count = 0,
				saveArr = [];
			cont.find('>div').css('position','fixed');
			con.find('ol>li').hide();
			con.find('ol>li').eq(0).show();
			//close
			cont.find('.btn_close').on('click', function(e){
				e.preventDefault();
				cont.hide();
				focusview.ele.focus();
				//
				count = 0;
				saveArr = [];
				cont.find('.jobmatching').show().add().find('ol>li').eq(0).show();
				cont.find('.result').hide();
				cont.find('.jobmatching > a.btn_l').hide();
				cont.find('.jobmatching > a.btn_r').hide();
				con.find('a').siblings().removeClass('on');
				con.find('a').siblings().removeAttr('title');
			});
			cont.find('.result > .resultCon > .center > a').on('click', function(e){
				cont.find('.btn_close').trigger('click');
			});
			//focus
			var cliche = false;
			cont.find('.btn_close').on('focusin', function(e){
				cont.find('.btn_close').after('<a href="#"></a>');
			});
			cont.find('.btn_close').on('focusout', function(e){
				if( cont.is(':visible') ){
					if( cont.find('.jobmatching').is(':visible') ){
						if( count > 0 ){
							con.parent().find('a:first').focus();
						}else{
							if( !cliche ){
								con.find('ol>li').eq(count).find('.selectArea > a:first').focus();
							}
							cliche = false;
						}
					}else{
						cont.find('.result').find( matchArr( saveArr ) ).find('.center>a:first').focus();
					}
					setTimeout( function(){
						cont.find('.btn_close').next().remove();
					}, 10 );
				}
			});

			cont.find('.jobmatching > a').hide();
			con.find('a').on('click', function(e){
				e.preventDefault();
				var idx = $(this).closest('li').index();
				$(this).siblings().removeClass('on');
				$(this).siblings().removeAttr('title');
				$(this).addClass('on');
				$(this).attr('title','선택됨');
				$(this).focus();
				cont.find('.jobmatching > a.btn_r').show();
			}).on('mousedown', function(){
				cliche = true;
			});

			cont.find('.jobmatching > a').on('click', function(e){//arrow
				e.preventDefault();
				if( $(this).hasClass('btn_l') ){//prev
					count --;
					count < 0 ? count = 0 : count;
					saveArr.pop();
				}else{
					count ++;
					count > con.find('ol>li').length ? count = con.find('ol>li').length : count;
					saveArr.push( con.find('li:visible > .selectArea > a.on').index() ); //con.find('li:visible').index()-순서
				}

				if( count > 0 ){
					cont.find('.jobmatching > a.btn_l').show();
				}else{
					cont.find('.jobmatching > a.btn_l').hide();
				}
				if( count === 1 ){
					if( con.find('ol>li').eq(0).find('.selectArea > a.man').hasClass('on') ){
						con.find('ol>li').eq(1).find('.selectArea').removeClass('woman').addClass('man');
					}else{
						con.find('ol>li').eq(1).find('.selectArea').removeClass('man').addClass('woman');
					}
				}
				if( count === 4 ){
					var cls = matchArr( saveArr );
					lastleft( cls );

				}else{
					con.find('ol>li').hide();
					con.find('ol>li').eq(count).show();
					//con.find('ol>li').eq(count).find('.selectArea > a:first').focus();
					con.parent().find('a:first').focus();
					cont.find('.jobmatching > a.btn_r').hide();
					if( con.find('a.on').length > count ){
						cont.find('.jobmatching > a.btn_r').show();
					}
				}
				if( count === 0 ) con.find('ol>li').eq(0).find('.selectArea > a:first').focus();
			});
			function matchArr( arr ){
				
			}
			function lastleft( cl ){
				cont.find('.jobmatching').hide();
				cont.find('.result').show().add().find('.resultCon').hide().end().find( cl ).show().add().find('.center>a:first').focus();
			}
		}
	},
	init: function(){
		var parent = this;
		this.calllayer();
	}
});
//attach the .equals method to Array's prototype to call in on any array
Array.prototype.equals = function (array){
	//if the other array is a falsy value, return
	if( !array ) return false;
	//compare length - can save a lot of time
	if( this.length != array.length ){
		return false;
	}
	for( var i = 0, l=this.length; i<l ; i++ ){
		//check if we have nested arrays
		if( this[i] instanceof Array && array[i] instanceof Array ){
			//recurse into the nested arrays
			if( !this[i].equals(array[i]) ){
				return false;
			}
		}else if( this[i] != array[i] ){
			return false;
		}
	}
	return true;
}

/*** SNS 공유하기 ***/

/*
 var fbUrl;
 var fbTxt;
*/
function shareFB() {
	var fbUrl;
	if (window.fbUrl !== undefined && window.fbUrl != "") {
		fbUrl = window.fbUrl;
		fbUrl = encodeURIComponent(fbUrl);
	} else {
		fbUrl = encodeURIComponent(document.location.href);
	}
	window.open("http://www.facebook.com/sharer.php?u="+fbUrl);
}

/*
 var twUrl;
 var twTxt;
*/
function shareTwitter(){
	var twUrl, twTxt;
	if (window.twUrl !== undefined  && window.twUrl != "" ) {
		twUrl = encodeURIComponent(window.twUrl);
	} else {
		twUrl = encodeURIComponent(document.location.href);
	}
	if ( window.twTxt !== undefined  && window.twTxt != "" ) {
		twTxt = window.twTxt;
		twTxt = encodeURIComponent(twTxt);
	} else {
		twTxt = "삼성생명 컨설턴트";
	}
	window.open("http://twitter.com/share?url="+twUrl+"&text="+twTxt);
}