"use strict";
$(function(){
	//Tire	
	//prdetail	
	/*
	$('#perforGraph').prRadarChart({
		'data':{
			'Dry': 5,
			'Wet' : 5,
			'Snow' : 3,
			'Ice' : 7,
			'Noise' : 2,
			'Comfort' : 6,
			'Wear' : 3,
			'Eco' : 6			
		},
		'type' : 1
	});
	*/
	//var option = {};
	//prRadarDraw( $('#perforGraph'),ot );
	
	//specArea
	hanta.tire.specarea.init();
	//table view more 
	hanta.tire.tablemore.init();
});
(function($){
	if( !window.hanta ) window.hanta = {};
	if( !window.hanta.tire ) window.hanta.tire = {};
	var module = window.hanta.tire.specarea = {};
	module.init = function(){
		if( $('.specArea').length > 0 ){
			$('.specArea ul li').each(function(i){
				if( $(this).find('strong').length > 1 ){
					$(this).parent().addClass('maSet');
				}
				if( $(this).find('strong.smallTxt').length > 1 ){
					$(this).parent().addClass('maSetStxt');
				}
			});
		}
	};
}(jQuery));
//table view more 
(function($){
	if( !window.hanta ) window.hanta = {};
	if( !window.hanta.tire ) window.hanta.tire = {};
	var module = window.hanta.tire.tablemore = {};
	module.dim = $('<div class="dimmed" style="display:none;"></div>');
	module.setTable = function(){		
		$('.tblWrap .tblFix thead').each(function(n){			
			var scrollheadtr = $('.tblWrap .tblScroll thead');
			$(this).height() > scrollheadtr.eq(n).height() ? scrollheadtr.eq(n).find('tr:first').height( $(this).height() ) :
				$(this).find('tr:first').height( scrollheadtr.eq(n).height() );
		});
		$('.tblWrap .tblFix tbody>tr').each(function(m){
			var scrolltr = $('.tblWrap .tblScroll tbody>tr');			
			$(this).height() > scrolltr.eq(m).height() ? scrolltr.eq(m).height( $(this).height() ) :
				$(this).height( scrolltr.eq(m).height() );
		});	

	};
	module.tablescroll = function(){
		//tblGrad
		var events = "touchmove.tiretablemorescroll touchend.tiretablemorescroll mousedown.tiretablemorescroll mouseup.tiretablemorescroll";
		var eventsTime;
		$(document).off(events).on(events,'.tblWrap', function(e){
			if( $(e.target).closest('.tblScroll').length > 0 ){
				clearTimeout(eventsTime);
				eventsTime = setTimeout(function(){
					var end = $(e.target).closest('.tblScroll')[0].scrollWidth - $(e.target).closest('.tblScroll').width();
					if( $('html[dir="rtl"]').length < 1 ){ // lang = ar
						if( $(e.target).closest('.tblScroll').scrollLeft() === end ){
							$(e.target).closest('.tblWrap').addClass('tblGrad');
						}else{
							$(e.target).closest('.tblWrap').removeClass('tblGrad');
						}
					}else{
						if( $(e.target).closest('.tblScroll').scrollLeft() === 0 ){
							$(e.target).closest('.tblWrap').addClass('tblGrad');
						}else{
							$(e.target).closest('.tblWrap').removeClass('tblGrad');
						}
					}
					
				},50);
			}
		});
	};
	var lastY,lastX;
	module.preventScroll = function(e){
		if( $('.allSizeLayer:visible').length > 0 ){
			var deltaY = e.originalEvent.touches ? e.originalEvent.touches[0].clientY : e.clientY;
			var deltaX = e.originalEvent.touches ? e.originalEvent.touches[0].clientX : e.clientX;
			if( $(e.target).closest('.popCon').length > 0 ){
				var end = $(e.target).closest('.popCon').get(0).scrollHeight - $(e.target).closest('.popCon').outerHeight(true);
				if( deltaY < lastY ){ // down 					
					if( $(e.target).closest('.popCon')[0].scrollTop === end	){						
						if( end === 0 ){
							e.preventDefault();
							var le = $(e.target).closest('.tblScroll')[0].scrollLeft; 
							$(e.target).closest('.tblScroll')[0].scrollLeft = le+(((deltaX-lastX)/3)*-1);							
						}else{
							e.preventDefault();
						}						
					}
				}else{
					if( $(e.target).closest('.popCon')[0].scrollTop === 0 ){						
						if( end === 0 ){
							e.preventDefault();
							var le = $(e.target).closest('.tblScroll')[0].scrollLeft; 
							$(e.target).closest('.tblScroll')[0].scrollLeft = le+(((deltaX-lastX)/3)*-1);							
						}else{
							e.preventDefault();
						}
					}
				}
				lastY = deltaY;							
			}else{
				e.preventDefault();
			}
		}
	}
	module.tablepagelayer = function(){
		var saveTop;
		$(document).off('click.tablepagelayer').on('click.tablepagelayer', '.btnAllsize',function(e){
			e.preventDefault();			
			$('.allSizeLayer').show(1,function(){
				module.setTable(); 
				$('.commoMn').hide();
				
				if( $('.allSizeLayer:visible .tblWrap').outerHeight(true) +80 +40 > $(window).height() ){
					$('.allSizeLayer:visible').css({
						'top':'',
						'bottom' : '',
						'margin-top' : ''
					});
				}else{ 
					$('.allSizeLayer:visible').css({
						'top':'50%',
						'bottom' : 'inherit',
						'margin-top' : -( ($('.allSizeLayer .popCon').outerHeight(true)+80)/2)+'px'
					});
				}
			
			});
			if( $('body').find('.dimmed').length > 0 ){			
				if( $('.dimmed').is(':hidden') ) $('.dimmed').show();
			}else{			
				//$('body').append(module.dim).show();
				module.dim.insertAfter($('.allSizeLayer:visible')).show();
			}
			$('.dimmed').show().css({ 'height': $(document).height()+'px' });
			//

			
		});
		$(document).off('click.tablepagelayerclose').on('click.tablepagelayerclose', '.allSizeLayer .popClose, .allSizeLayer .btnEc .btnLevel1',function(e){
			e.preventDefault();
			$('.allSizeLayer').hide();
			$('.commoMn').show();
			if( $('body').find(module.dim).length > 0 ){
				module.dim.remove();
			}else{
				$('.dimmed').hide();
			}
		});

	};
	module.init = function(){
		module.setTable();		module.tablescroll();
		module.tablepagelayer();
		var w = $(window).width();
		$(window).off('resize.tiretablemorwindow').on('resize.tiretablemorwindow', function(){
			if( w !== $(window).width() ){
				module.setTable();
				setTimeout(function(){
					if( $('.allSizeLayer:visible .tblWrap').outerHeight(true) +80 +40 > $(window).height() ){
						$('.allSizeLayer:visible').css({
							'top':'',
							'bottom' : '',
							'margin-top' : ''
						});
					}else{ 
						$('.allSizeLayer:visible').css({
							'top':'50%',
							'bottom' : 'inherit',
							'margin-top' : -( ($('.allSizeLayer .popCon').outerHeight(true)+80)/2)+'px'
						});
					}
				},10);
				w = $(window).width();
			}
		});
		$(document).off('DOMSubtreeModified.tiretablemore').on('DOMSubtreeModified.tiretablemore',  function(e){
			if( $('.allSizeLayer:visible').length > 0 ){
				//module.setTable();
				$('.allSizeLayer').off('touchmove.poplayerscroll').on('touchmove.poplayerscroll', module.preventScroll );
				$('.allSizeLayer').off('touchstart.poplayerscroll').on('touchstart.poplayerscroll', function(e){
					lastY = e.originalEvent.touches[0].clientY;
					lastX = e.originalEvent.touches[0].clientX;
				});
				$('.dimmed').off('touchmove.poplayerscroll').on('touchmove.poplayerscroll',function(e){
					if( $('.allSizeLayer:visible').length > 0 ){ e.preventDefault(); }
				});
				
			}		
			
		});
	};

}(jQuery));
//rgraph radar
(function($){
	$.fn.prRadarChart = function(ot){
		return this.each(function(i){
			var $this = $(this);
			var data = $this.data('prradarchart');
			if( !data ) $this.data('prradarchart', (data = new PrRadarChart($.extend({'ele':$this},ot)) ) );
		});
	};
	$.fn.prRadarChart.Constructor = PrRadarChart;
}(jQuery));
function prRadarDraw( elem,ot ){ 
	var draw = new PrRadarChart($.extend({'ele':elem},ot));
}
function PrRadarChart(ot){
	this.o = $.extend({
		'ele': $.noop(),
		'data' : {},
		'type' : 0
	},ot);
	this.label = [];
	this.data = [];
	this.imgName = [];	
	this.imgNames = ['dry','wet','snow','ice','noise','comfort','wear','eco'];
	this.sp = [];
	var $this = this;
	var cur = 0;
	$.each(this.o.data , function(k,v){
		if( v === '0' || v === 0 ){
		}else{
			$this.label.push( k );
			$this.data.push( v );
			$this.sp.push(" ");
			$this.imgName.push( $this.imgNames[cur] );
		}
		cur++;
	});	
	this.datalength = this.data.length;
	if( RGraph ){
		this.init();
	}	
}
$.extend(PrRadarChart.prototype,{
	setdefault : function(){
		var canvas = this.o.ele;
		
		$('.perforGraph').parent().find('.btnFc').hide();
		var textSpan = this.o.ele.nextAll().slice(0, this.datalength); //data 값
		
		this.o.ele.nextAll().slice(this.datalength, this.datalength+8).css({
			'font-size' : 8+'pt'
		});
		var imgName = this.imgName;
		var $this = this;
		setTimeout(function(){
			textSpan.each(function(i) {			//label 위치조정 //label img
				var setimg = i > Math.floor(textSpan.length/2) ? "append" : "prepend";
				if( $('html[dir="rtl"]').length < 1 ){ // lang = ar
					setimg = i > Math.floor(textSpan.length/2) ? "append" : "prepend";
				}else{
					setimg = i > Math.floor(textSpan.length/2) ? "prepend" : "append";
				}
				$(this)[setimg](' <img src="/etc/designs/htg-mobile/gt/images/ico-performance-'+imgName[i]+'.png" alt="'+ $this.label[i]+'" /> ');
				
				var left = parseInt( $(this).css('left') );
				var top = parseInt( $(this).css('top') );			
				var leftset = i > Math.floor(textSpan.length/2) ? -16 : 0;
				
				$(this).css('left', (left+leftset)+'px');
				if( i === 0 ) $(this).css({'top': (top-8)+'px' , 'left': (left-8)+'px' });
				if( i === Math.floor(textSpan.length/2) ) $(this).css({ 'left': (left-8)+'px' });
				if( i === 1 ){
					textSpan.length < 8 ? $(this).css({'left': (left+1)+'px' }) : $(this).css({'left': (left+5)+'px' });
				}
				if( i === Math.floor(textSpan.length/2)+1 ) $(this).css({'left': (left-19)+'px' });
				if( textSpan.length === 5 ){
					if( i === 2 ) $(this).css({'left': (left+1)+'px' });
				}
			});	
		},10);
	},
	setbtntype : function(){
		var canvas = this.o.ele;
		
		$('.perforGraph').parent().find('.btnFc').show();
		var textSpan = this.o.ele.nextAll().slice(0, this.datalength); //data 값 
		this.o.ele.nextAll().slice(this.datalength, this.datalength+8).css({
			'font-size' : 8+'pt'
		});
		var imgName = this.imgName;
		var $this = this;
		setTimeout(function(){
			textSpan.each(function(i) {			//label 위치조정 //label img				
				var setimg = i > Math.floor(textSpan.length/2) ? "append" : "prepend";
				if( $('html[dir="rtl"]').length < 1 ){ // lang = ar
					setimg = i > Math.floor(textSpan.length/2) ? "append" : "prepend";
				}else{
					setimg = i > Math.floor(textSpan.length/2) ? "prepend" : "append";
				}
				$(this)[setimg](' <img src="/etc/designs/htg-mobile/gt/images/ico-performance-'+imgName[i]+'.png" alt="'+ $this.label[i]+'"/> ');				
				var left = parseInt( $(this).css('left') );
				var top = parseInt( $(this).css('top') );
				var leftset = i > (textSpan.length/2) ? -15 : 0;
				$(this).css({'left' : (left+leftset)+'px' , 'top': (top-8)+'px' });
				if( i === 0 ) $(this).css({'top': (top-18)+'px' , 'left': (left-7)+'px' });
				if( i === Math.floor(textSpan.length/2) ) $(this).css({'top': (top-3)+'px','left': (left-8)+'px' });
				if( i === 1 ) $(this).css({'top': (top-10)+'px' ,'left': (left+2)+'px' });
				if( i === Math.floor(textSpan.length/2)+1 ) $(this).css({'top': (top-2)+'px' ,'left': (left-15)+'px' });
			});		
		},10);
	},
	draw : function( callback ){
		var canvas = this.o.ele, $this = this;
		canvas.attr('width', 295 + 'px');
		canvas.attr('height', 219 + 'px');
		var data = this.data,
			label;
			
		var radar = new RGraph.Radar({
			id : this.o.ele.attr('id'),
			data : $this.data ,
			options : {				
				colors : ["rgba(0,0,0,0)"], //data color
				backgroundCirclesColor : "rgba(225,225,225,0.3)", //bg color
				colorsAlpha: 0.9,
				labels : $this.o.type === 0 ? $this.label : this.sp,				
				axesColor : 'rgba(0,0,0,0)',
				accumulative : true,
				labelsAxes : 'n', //- n : north 위쪽만
				labelsOffset : $this.o.type === 0 ? 8 : 9, //text 위치				
				strokestyle : 'rgba(0,0,0,0)',
				textAccessible : true,
				textSize : 10,
				backgroundCirclesPoly : true, 
				backgroundCirclesCount : 7,
				backgroundGridSpokes : 7,
				backgroundAxes : false,
				backgroundCircles : true, 
				labelsBoxed : false,
				labelsAxesBoxedBackground : 'rgba(0,0,0,0)',				
				textColor : "white",
				gutterLeft : 25,
				gutterRight : 25,
				gutterTop : 25,
				gutterBottom : 25,
				labelsCount : 7, // 값 나타내는 숫자 개수
				ymax : 7 //최대 값 범위
			}
		}).draw();		
	},
	drawData :function(){
		var $this = this;
		var data = this.data,
			label;
		var radarData = new RGraph.Radar({
			id : this.o.ele.attr('id'),
			data : $this.data ,
			options : {				
				colors : ["rgba(137,137,145,100)"], //data color
				backgroundCirclesColor : "rgba(0,0,0,0)", //bg color
				colorsAlpha: 0.9,
				labels : $this.o.type === 0 ? $this.label : this.sp,				
				axesColor : 'rgba(0,0,0,0)',
				accumulative : true,
				labelsAxes : 'n', //- n : north 위쪽만
				labelsOffset : $this.o.type === 0 ? 8 : 9, //text 위치				
				strokestyle : 'rgba(0,0,0,0)',
				textAccessible : true,
				textSize : 0,
				backgroundCirclesPoly : true, 
				backgroundCirclesCount : 7,
				backgroundGridSpokes : 7,
				backgroundAxes : false,
				backgroundCircles : true, 
				labelsBoxed : false,
				labelsAxesBoxedBackground : 'rgba(0,0,0,0)',				
				textColor : 'rgba(0,0,0,0)',
				gutterLeft : 25,
				gutterRight : 25,
				gutterTop : 25,
				gutterBottom : 25,
				labelsCount : 7, // 값 나타내는 숫자 개수
				ymax : 7 //최대 값 범위
			}
		}).grow();
		this.o.ele.data('chart','set');
	},
	init: function(){		
		var $this = this;
		var comp;
		$this.draw();		
		$(window).off('scroll.radarchart').on('scroll.radarchart', function(e){
			if( $(window).scrollTop()+$(window).height() > $this.o.ele.offset().top+$this.o.ele.height() ){
				if( $this.o.ele.data('chart') !== 'set' ){
					$this.drawData();
				}
			}
		});
		if( $(window).scrollTop()+$(window).height() > $this.o.ele.offset().top+$this.o.ele.height() ){
			if( $this.o.ele.data('chart') !== 'set' ){
				$this.drawData();
			}
		}
		if( $this.o.type === 0 ){
			comp = $this.setdefault();
		}else if( $this.o.type === 1 ){
			comp = $this.setbtntype();
		}
		
	}
});

