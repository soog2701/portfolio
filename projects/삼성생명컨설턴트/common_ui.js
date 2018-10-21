// JavaScript Document

$(function(){
	sGnbScroll();
	asideScroll();
	familySite();
	systemSite();
});

//브래드크럼
function sGnbScroll() {
	var jObj = $('#sGnb');
	if (jObj.length == 0) {
		return;
	}
	$(window).scroll(function(e) {
		if ( $(document).scrollTop() > 158){
			jObj.css({'position':'fixed','top':'0px','left':'50%','margin-left':'-485px','z-index':'9999'});
		}else{
			jObj.css({'position':'absolute','top':'158px','z-index':'1002'});
		}
	});
}

//TOP 버튼, 하단 이벤트 팝업
function asideScroll() {
	var jObj = $("#sslifeAside");
	if (jObj.length == 0) {
		return;
	}
	
	var topObj = jObj.find("> p.btnTop");
	topObj.find('> button').click(function () {
		$('body, html').animate({ scrollTop: 0 }, 800);
		return false;
	});
	$(window).scroll(function () {
		if ($(this).scrollTop() > 100) {
			//alert('11');
			topObj.fadeIn();
		} else {
			//alert('22');
			topObj.fadeOut();
		}
	});
}

//footer familysite
function familySite(){
	var jObj = $('#familySite');
	if (jObj.length == 0) {
		return;
	}
	jObj.children('.familyList').css('display','none');
	jObj.find("> a").click(function(){
		if (jObj.children('.familyList').hasClass("hidden")) {
			$(this).next().removeClass('hidden');
			$('#sslifeFooter').css('z-index','9999');
			$(this).addClass('on');
			jObj.children('.familyList').css('display','block');
		} else {
			$(this).next().addClass('hidden');
			$('#sslifeFooter').css('z-index','1000');
			jObj.children('.familyList').css('display','none');
			jObj.find("> a").removeClass('on');
			jObj.find("> a").focus();
		}
	});
	
	jObj.find("> div > p").click(function(){
		$(this).parent().addClass('hidden');
		$('#sslifeFooter').css('z-index','1000');
		jObj.children('.familyList').css('display','none');
		jObj.find("> a").removeClass('on');
		jObj.find("> a").focus();
	});
}

//footer 업무용시스템
function systemSite(){
	var jObj2 = $('#familySite');
	var jObj = $('#systemSite');
	if (jObj.length == 0) {
		return;
	}
	jObj.children('.systemList').css('display','none');
	jObj.find("> a").click(function(){
		if (jObj.children('.systemList').hasClass("hidden")) {
			$(this).next().removeClass('hidden');
			$('#sslifeFooter').css('z-index','9999');
			$(this).addClass('on');
			jObj.children('.systemList').css('display','block');
			jObj2.children('.familyList').addClass('hidden');
			jObj2.children('.familyList').css('display','none');
			jObj2.find("> a").removeClass('on');
		} else {
			$(this).next().addClass('hidden');
			$('#sslifeFooter').css('z-index','1000');
			jObj.children('.systemList').css('display','none');
			jObj.find("> a").removeClass('on');
			jObj.find("> a").focus();
		}
	});
	
	jObj.find("> div > p").click(function(){
		$(this).parent().addClass('hidden');
		$('#sslifeFooter').css('z-index','1000');
		jObj.children('.systemList').css('display','none');
		jObj.find("> a").removeClass('on');
		jObj.find("> a").focus();
	});
}

//레이어팝업 - LOAD이벤트
function detailView(url,id){
	$(id).click(function(){
		var $this = $(this);
		$(this).next('.laypopHolder').load(url,function(){

			$(this).find('.layerClose').click(function(){
				$(this).closest('.laypopHolder').empty();
				return false
			})
		})
		$(this).parent().css('z-index','9999');
		return false
	});
}

//레이어팝업 - 클릭이벤트
function layerpopOpen(){
	$('.laypopLauncher').children('.laypopHolder').hide();
	//var jObj = $('.laypopLauncher > a, .laypopLauncher .btnPack');
	$('.laypopLauncher > a, .laypopLauncher .btnPack').click(function(){
		var $this = $(this);
		if ($(this).next('.laypopHolder').hasClass("hidden")) {
			$('.laypopLauncher .laypopHolder').addClass('hidden');
			$('.laypopLauncher').css('z-index','10');
			$this.parent().children().removeClass('hidden');
			$this.parents('.laypopLauncher').css('z-index','100');
			$('.laypopLauncher').children('.laypopHolder').show();
			
		} else {
			$this.next().addClass('hidden');
			$this.parents('.laypopLauncher').css('z-index','10');
			$("#divDimedWrap").each(function() {
				$("#container").css('zIndex', 1000);
			}).hide();
			$('.laypopLauncher').children('.laypopHolder').hide();
			$this.parents('.laypopLauncher').find('>a').focus();
		}
	});
	$('.layerClose').click(function(){
		var $this = $(this);
		$this.parent().addClass('hidden');
		$this.parents('.laypopLauncher').css('z-index','10');
		$("#divDimedWrap").each(function() {
			$("#container").css('zIndex', 1000);
		}).hide();
		$('.laypopLauncher').children('.laypopHolder').hide();
		$this.parents('.laypopLauncher').find('>a').focus();
	})
}

function layerpopOpen2(){
	$('.laypopLauncher').children('.laypopHolder').hide();
	$('.laypopLauncher > a, .laypopLauncher .btnPack').bind('click',function(){
		var $this = $(this);
		$('.laypopLauncher .laypopHolder').addClass('hidden');
		$('.laypopLauncher').css('z-index','10');
		$this.parent().children().removeClass('hidden');
		$this.parents('.laypopLauncher').css('z-index','100');
		$('.laypopLauncher').children('.laypopHolder').show();
	});
	$('.layerClose').click(function(){
		var $this = $(this);
		$this.parent().addClass('hidden');
		$this.parents('.laypopLauncher').css('z-index','10');
		$("#divDimedWrap").each(function() {
			$("#container").css('zIndex', 1000);
		}).hide();
		$('.laypopLauncher').children('.laypopHolder').hide();
		$this.parents('.laypopLauncher').find('>a').focus();
	})
}


function layerPopupToggleDimed(contentExpr) {
	var jObj = $(contentExpr);
	if (jObj.children().hasClass("hidden")) {
		jObj.children().removeClass('hidden');
		jObj.children().show();
		jObj.css('zIndex', 10000);
		$("#container").css('z-index', 9998);
		$("#divDimedWrap").show();
	} else {
		jObj.find('.layerClose').trigger("click");
	}
}

//레이어팝업 - Hover이벤트
function layerpopHover(){
	$('.laypopHover').children('.laypopHolderS').hide();
	$('.laypopHover>a').bind('mouseover focusin',function(){
		$(this).next().removeClass('hidden');
		$('.laypopHover').children('.laypopHolderS').show();
	});

	$('.laypopHover>a').bind('mouseout focusout',function(){
		$(this).next().addClass('hidden');
		$('.laypopHover').children('.laypopHolderS').hide();
	});
}


//faq
function board_faq(selector) {
	var faq_cls = $(selector).children('li');
	var faq_tit = faq_cls.children('a');
	var faq_cont = faq_tit.next('.cont');


	$(faq_tit).bind('click',function(){
		var $this = $(this);

		if($this.next().hasClass('hiddenObj')) {// 펼치기
			$this.next().removeClass('hiddenObj');
			$this.parent().addClass('on');
			$this.parent().siblings().removeClass('on');
			$this.parent().siblings().find(faq_cont).addClass('hiddenObj');
		} else {
			$this.next().addClass('hiddenObj');
			$this.parent().removeClass('on');
			return false;
		}
	});
}

function faqTotal(selector) {

	var totalWrap = $('.disRateList');
	var totalBtn = totalWrap.find('.btnToggle').children();


	$(totalBtn).bind('click',function(){
		var $this = $(this);
		var togTotal = $this.parent().next(selector);

		if($this.parent().hasClass('btnToggleView')) {// 펼치기
			$this.attr('value', function() {
				return this.value.replace('전체보기','전체닫기');
			});

			$this.parent().removeClass('btnToggleView');

			togTotal.find('.cont').removeClass('hiddenObj');
			togTotal.children('li').addClass('on');
			togTotal.children('li').find('.cont').removeClass('hiddenObj');
		} else {
			$this.attr('value', function() {
				return this.value.replace('전체닫기','전체보기');
			});

			$this.parent().addClass('btnToggleView');
			togTotal.children('li').find('.cont').addClass('hiddenObj');
			togTotal.children('li').removeClass('on');
			return false;
		}
	});

}

// 탭컨텐츠이동
function tabCont(selecter,contents){
	
	$(selecter).click(function(){
		if(!$(this).hasClass('on')){
			$(this).addClass('on').siblings(this).removeClass('on');
			$($(this).find('a').attr('href')).removeClass('hidden').siblings(contents).addClass('hidden');
			//$($(this).find('a').attr('href')).show().siblings(contents).hide();
		}
		return false;
	});
}

// 컨텐츠 펼치기/닫기
function toggleCont(selector) {
	var totalWrap = $(selector);
	var totalBtn = totalWrap.find('.btnToggle');
	$(totalBtn).bind('click',function(){
		var $this = $(this);

		if($this.parents('.toggleBtn').next('.toggleCont').hasClass('hidden')) {// 펼치기
			$this.children().attr('value', function() {
				return this.value.replace('펼쳐보기','닫기');
			});

			$this.parents('.toggleBtn').next('.toggleCont').removeClass('hidden').siblings('.toggleCont').addClass('hidden');
			$this.addClass('btnToggleView').parents('.taxCont').siblings().find('.btnToggle').removeClass('btnToggleView');
			$this.parents('.taxCont').siblings().find('.btnToggle').children().attr('value', function() {
				return this.value.replace('닫기','펼쳐보기');
			});

		} else {
			$this.children().attr('value', function() {
				return this.value.replace('닫기','펼쳐보기');
			});

			$this.parents('.toggleBtn').next('.toggleCont').addClass('hidden');
			$this.removeClass('btnToggleView');

		}
	});

}

// 컨텐츠 펼치기/닫기2
function toggleCont2(selector) {

	var totalWrap = $(selector);
	var totalBtn = totalWrap.find('.btnToggle').children();


	$(totalBtn).bind('click',function(){

		var $this = $(this);
		var togTotal = totalWrap.find('.dispNone');

		if(togTotal.hasClass('hidden')) {// 펼치기
			$this.attr('value', function() {
				return this.value.replace('펼쳐보기','닫기');
			});
			togTotal.removeClass('hidden');
			$this.parent().addClass('btnToggleView');


		} else {
			$this.attr('value', function() {
				return this.value.replace('닫기','펼쳐보기');
			});

			togTotal.addClass('hidden');
			$this.parent().removeClass('btnToggleView');
			return false;
		}
	});

}
function insuToggle(selector, contents){
	var totalWrap = $(selector);
	var totalBtn = totalWrap.find('.btnToggle');


	$(totalBtn).bind('click',function(){
		var $this = $(this);			
		
		if($this.parent().next().hasClass('hidden')) {// 펼치기
			$(contents).addClass('hidden');
			$(totalBtn).children().text('더보기');
			$this.addClass('btnToggleOpen');
			$this.children().text('닫기');
			$this.parent().next().removeClass('hidden');

		
		} else {
			$this.children().text('더보기');
			$this.removeClass('btnToggleOpen');
			$this.parent().next().addClass('hidden');
		}
	});
}	

//슬라이딩
function jQscroller(){
	$.fn.JQscroller = function(option){
		var params = jQuery.extend({
			animate : true,
			displayNum : 5,
			interval : 0,
			paging : true,
			ajaxCall : false,
			animateDirection : {xy : 'horizontal', direction : 'left'},
			slideSpeed : 500,
			controller : true,
			prev : '.prev',
			next : '.next',
			stop : '.stop',
			//play : '.play',
			mask : '.scrollMask',
			unit : '.scrollMask li'
		}, option);

		$(this).each(function(){
			var $this = this;
			var $thisId = "#"+this.id;
			var $thisWrap = $thisId+' '+params.mask;
			var $thisUnit = $thisId+' '+params.unit;
			var isover = false;
			var pd = params.animateDirection;
			var ml = $($thisUnit).css('marginLeft');
			var mr = $($thisUnit).css('marginRight');
			var mt = $($thisUnit).css('marginTop');
			var mb = $($thisUnit).css('marginBottom');
			var unitWidth = $($thisUnit+':first').width()+parseInt(ml)+parseInt(mr);
			var unitHeight = $($thisUnit+':first').height()+parseInt(mt)+parseInt(mb);

			$($thisId).css('position','relative');
			$($thisWrap).parent().css('overflow','hidden');
			$($thisWrap).css({'position':'relative','overflow':'hidden','_zoom':1});

			if(pd.xy == 'horizontal')$($thisUnit,$thisWrap).css('float','left');

			if(params.displayNum > $($thisUnit).size()) {
				//alert("Please check displayNum's value ('"+$thisId+"')");
				params.displayNum = $($thisUnit).size();
			}

			if(params.displayNum < $($thisUnit).size()) $($thisUnit+':last').prependTo($thisWrap);
			if(pd.xy == 'horizontal'){
				$($thisWrap).css('width','9999px');
				if(params.displayNum < $($thisUnit).size()) $($thisWrap).css('left',-unitWidth+'px');
				$($thisId+' .mask').css({
					//'width'    : function(){return unitWidth*params.displayNum+'px'},
					//'height'   : function(){return unitHeight+'px'},
					'overflow' : 'hidden',
					'position' : 'relative'
				})
			} else if(pd.xy == 'vertical'){
				if(params.displayNum < $($thisUnit).size()) $($thisWrap).css('top',-unitHeight+'px');
				$($thisId+' .mask').css({
					'width'    : function(){return unitWidth+'px'},
					'height'   : function(){return unitHeight*params.displayNum+'px'},
					'overflow' : 'hidden',
					'position' : 'relative'
				});
			}

			$($this).hover(function(){isover=true;},function(){isover=false;});
			

			if((params.displayNum < $($thisUnit).size()) && params.controller) {
				$($thisId+' '+params.next).live('click focus',next);
				$($thisId+' '+params.prev).live('click focus',prev);
				$($thisId+' '+params.stop).live('click focus',stop);
				//$($thisId+' '+params.play).live('click',play);
			} else if((params.displayNum == $($thisUnit).size()) || !params.controller){
				if(params.next) $($thisId+' '+params.next).css('display','none');
				if(params.prev) $($thisId+' '+params.prev).css('display','none');
				if(params.stop) $($thisId+' '+params.stop).css('display','none');
				//if(params.play) $($thisId+' '+params.play).css('display','none');
			}

			if((params.displayNum < $($thisUnit).size()) && params.interval > 0) timer = setInterval(autoScroll,params.interval);

			function autoScroll(){
				if(!isover){
					//alert(isover);
					switch(pd.xy){
						case 'horizontal' :
							pd.direction == 'left' ? next() : prev() ;
							break;
						case 'vertical' :
							pd.direction == 'top' ? next() : prev() ;
							break;
					}
				}
			}

			function next(){
				if($($thisWrap).is(':animated')) return false;
				if(pd.xy == 'horizontal'){
					$($thisWrap).css('left',0);
					if(params.animate) $($thisWrap).animate({'left':-unitWidth+'px'},params.slideSpeed,params.easing);
					else $($thisWrap).css({'left':-unitWidth+'px'});
				}else if(pd.xy == 'vertical'){
					$($thisWrap).css('top',0);
					if(params.animate) $($thisWrap).animate({'top':-unitHeight+'px'},params.slideSpeed,params.easing);
					else $($thisWrap).css({'top':-unitHeight+'px'});
				}
				var $clone = $($thisUnit+':first').clone(true);
				$clone.appendTo($thisWrap);
				$($thisUnit+':first').remove();
			}

			function prev(){
				if($($thisWrap).is(':animated')) return false;
				var $clone = (params.animate) ? $($thisUnit+':last').clone(true) : $($thisUnit+':last');
				$clone.prependTo($thisWrap);

				if(pd.xy == 'horizontal'){
					$($thisWrap).css('left',-unitWidth*2+'px');
					if(params.animate){
						$($thisWrap).animate({'left':-unitWidth+'px'},params.slideSpeed,params.easing,function(){
							$($thisUnit+':last').remove();
						});
					} else {
						$($thisWrap).css({'left':-unitWidth+'px'},function(){
							$($thisUnit+':last').remove();
						});
					}
				}else if(pd.xy == 'vertical'){
					$($thisWrap).css('top',-unitHeight*2+'px');
					if(params.animate){
						$($thisWrap).animate({'top':-unitHeight+'px'},params.slideSpeed,params.easing,function(){
							$($thisUnit+':last').remove();
						});
					} else {
						$($thisWrap).css({'top':-unitHeight+'px'},function(){
							$($thisUnit+':last').remove();
						});
					}
				}
			}
			
			
			function stop(){
				$('.stop').toggle(
					function(){
						clearInterval(timer);
						$(this).addClass('btnPlay');
						$(this).text('재생');
					},
					function(){
						$(this).removeClass('btnPlay');
						$(this).text('일시정지');
						timer = setInterval(autoScroll,params.interval);
					}
				)
			
				
			}			
			//stop();
		});

	}
}

/* iframe resizing */
function reSize() {
	try {
		if (!document.getElementById('iframe_hera_post_script')){return false}
		var objBody = iframe_hera_post_script.document.getElementById('iframe_contents');
		var objFrame = document.getElementById('iframe_hera_post_script');
		
		//ifrmHeight = objBody.scrollHeight + (objBody.offsetHeight - objBody.clientHeight);
		ifrmHeight = objBody.scrollHeight + 20;
		
		objFrame.style.height=(ifrmHeight)+"px";
		

		if(objFrame != null || objFrame.style.height == "0px") {
			$(objFrame).css("min-height", "212px");			
		}
	} catch(e) {}
}
function init_iframe() {

	if (!document.getElementById('iframe_hera_post_script')){return false}
	else{
		reSize();
		setTimeout('init_iframe()');
	}
}

function insu_spendingHabit() {
	$('#consumeChk :checkbox').click(function () {
		if($(this).attr('checked','checked') && $(this).parents('li').hasClass('on')){
			$(this).removeAttr('checked');
			$(this).parents('li').removeClass("on");
		} else {
			//$(this).removeAttr('checked');
			$(this).parents('li').addClass("on");
			//return false;
		}
	});
}

//펀드검색 열기/닫기
function fund_detailview() {
	var $btn = $('#btnDetailview');
	var $obj = $('#searchTerms .detailOpen');

	$btn.toggle(
		function(){
			$(this).addClass('close');
			$obj.removeClass('hidden');
			$(this).children().text('상세검색닫기');
		},
		function(){
			$(this).removeClass('close');
			$obj.addClass('hidden');
			$(this).children().text('상세검색열기');
		}
	)
}

function insuStatistics(width) {
	var $slideBlock = $('#ulList');
	var $num = $('#ulList li').size();
	var $rBtns = $('.btnSlide a');
	var idx = 0;
	var oidx = 0;
	var isMoving = false;
	var vduration;
	

	var mainTimer = setInterval( mainSlideTimer, 12000);
	
	function resetTimer() { 
		mainTimer = setInterval( mainSlideTimer, 12000); 
	}
	
	function mainSlideTimer() { 
	    slideBox(); 
    };
        
	$slideBlock.css({left:0});
	
	$rBtns.click(function(e){
		e.preventDefault();	
		idx = $(this).index();
		slideBox();
		
	});

	function slideBox() {		
		vduration = 1000+(Math.abs(oidx-idx)*200);
		
		if (isMoving==true) { return; }
		
		var $timg = $rBtns.eq(idx);
			
		for (var i=0; i<$num; i++) {
			$rBtns.eq(i).removeClass('on');
		}
		$timg.addClass('on');
		
		$slideBlock.animate({ left : idx*(-width) }, {queue:false, duration: vduration,  complete:onCompMoving});
		
		isMoving = true;

		(idx < ($num-1)) ? idx++ : idx = 0;
	}
	
	function onCompMoving() {		
		isMoving = false;
		oidx = idx;			
	};
	
	function slideStop(){	
		$('#rolling0 .controller .stop').toggle(
			function(){
				clearInterval(mainTimer);
				$(this).addClass('btnPlay');
				$(this).text('재생');
			},
			function(){
				$(this).removeClass('btnPlay');
				$(this).text('일시정지');
				mainTimer = setInterval(mainSlideTimer, 12000);
			}
		)	
	}
	
	slideBox();	
	if ($num < 2) {
		$('#rolling0 .controller').hide();	
	} else {	slideStop(); }
		
}

function insuStatisticsAlly(width) {
	var $slideBlock = $('#ulList');
	var $num = $('#ulList dt').size();
	var $rBtns = $('.btnSlideAlly a');
	var $slideDts = $('.btnSlideAlly');
	var $slideDds = $('#ulList dd');
	var idx = 0;
	var oidx = 0;
	var isMoving = false;
	var vduration;
	var mainTimer = setInterval( mainSlideTimer, 12000);
	
	function resetTimer() { 
		mainTimer = setInterval( mainSlideTimer, 12000); 
	}
	
	function mainSlideTimer() { 
	    slideBox(); 
    };
        
	$slideBlock.css({left:0});
	
	$rBtns.click(function(e){
		e.preventDefault();	
		idx = $rBtns.index(this);
		slideBox();
		
	});

	var setSliddsLeft = 0;
	for (var i=0; i<$num; i++) {
		$slideDds.eq(i).css({left:setSliddsLeft});
		setSliddsLeft += 450;
	}

	function btnPosition() {
		var positionLeft = 0;
		for (var i=0; i<$num; i++) {
			$slideDts.eq(i).css({left:positionLeft});
			positionLeft += $slideDts.eq(i).width();
		}
	}

	function slideBox() {		
		vduration = 1000+(Math.abs(oidx-idx)*200);
		
		if (isMoving==true) { return; }
		
		var $timg = $rBtns.eq(idx);
			
		for (var i=0; i<$num; i++) {
			$rBtns.eq(i).removeClass('on');
		}
		$timg.addClass('on');
		btnPosition();
		
		//$slideBlock.animate({ left : idx*(-width) }, {queue:false, duration: vduration,  complete:onCompMoving});
		for (var i=0; i<$num; i++) {
			$slideDds.eq(i).animate({ left : idx*(-width)+(i*width) }, {queue:false, duration: vduration,  complete:onCompMoving});
		}
		
		isMoving = true;

		(idx < ($num-1)) ? idx++ : idx = 0;
	}
	
	function onCompMoving() {		
		isMoving = false;
		oidx = idx;			
	};
	
	function slideStop(){	
		$('#rolling0 .controller .stop').toggle(
			function(){
				clearInterval(mainTimer);
				$(this).addClass('btnPlay');
				$(this).text('재생');
			},
			function(){
				$(this).removeClass('btnPlay');
				$(this).text('일시정지');
				mainTimer = setInterval(mainSlideTimer, 12000);
			}
		)	
	}
	
	slideBox();	
	if ($num < 2) {
		$('#rolling0 .controller').hide();	
	} else {	slideStop(); }
		
}

function eventBanner(slideMov,interval) {
	var $slideBlock = $('#ulList');
	var $num = $('#ulList li').size();
	var $rBtns = $('.btnSlide a');
	var idx = 0;
	var oidx = 0;
	var isMoving = false;
	var vduration;
	

	var mainTimer = setInterval( mainSlideTimer, interval);
	
	function resetTimer() { 
		mainTimer = setInterval( mainSlideTimer, interval); 
	}
	
	function mainSlideTimer() { 
	    slideBox(); 
    };
        
	$slideBlock.css({left:0});
	
	$rBtns.click(function(e){
		e.preventDefault();	
		idx = $(this).index();
		slideBox();
		
	});

	function slideBox() {		
		vduration = 1000+(Math.abs(oidx-idx)*200);
		
		if (isMoving==true) { return; }
		
		var $timg = $rBtns.eq(idx);
			
		for (var i=0; i<$num; i++) {
			$rBtns.eq(i).removeClass('on');
		}
		$timg.addClass('on');
		
		$slideBlock.animate({ top : idx*(-slideMov) }, {queue:false, duration: vduration,  complete:onCompMoving});
		
		isMoving = true;

		(idx < ($num-1)) ? idx++ : idx = 0;
	}
	
	function onCompMoving() {		
		isMoving = false;
		oidx = idx;			
	};
	
	function slideStop(){	
		$('#eventBanner .controller .stop').toggle(
			function(){
				clearInterval(mainTimer);
				$(this).addClass('btnPlay');
				$(this).text('재생');
			},
			function(){
				$(this).removeClass('btnPlay');
				$(this).text('일시정지');
				mainTimer = setInterval(mainSlideTimer, interval);
			}
		)	
	}
	
	slideBox();	
	if ($num < 2) {
		$('#eventBanner .controller').hide();	
	} else {	slideStop(); }
		
}
