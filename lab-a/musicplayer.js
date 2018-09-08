//author 윤수경

/* common */
//polyfill querySelectorAll
if (!document.querySelectorAll) {
 	document.querySelectorAll = function (selectors) {
	var style = document.createElement('style'), elements = [], element;
    document.documentElement.firstChild.appendChild(style);
    document._qsa = [];    
    style.styleSheet.cssText = selectors + '{x-qsa:expression(document._qsa && document._qsa.push(this))}';
    
    window.scrollBy(0, 0);
    style.parentNode.removeChild(style);

    while (document._qsa.length) {
      element = document._qsa.shift();
      element.style.removeAttribute('x-qsa');
      elements.push(element);
    }    
    document._qsa = null;
    return elements;
  };
}

if (!document.querySelector) {
	document.querySelector = function (selectors) {
		var elements = document.querySelectorAll(selectors);
		return (elements.length) ? elements[0] : null;
	};
}
//polyfill children
(function(constructor) {
    if (constructor &&
        constructor.prototype &&
        constructor.prototype.children == null) {
        Object.defineProperty(constructor.prototype, 'children', {
            get: function() {
                var i = 0, node, nodes = this.childNodes, children = [];
                while (node = nodes[i++]) {
                    if (node.nodeType === 1) {
                        children.push(node);
                    }
                }
                return children;
            }
        });
    }    
})(window.Node || window.Element);

//method
function elAll( selector ){ 	
	return document.querySelectorAll(selector);
	
}
function el( selector ){
	return document.querySelector(selector);
	
}
function addEvent(el, type, handler) { 
	if( typeof el === "array" ){  
		window.attachEvent ? evt( "attachEvent" , type, handler ) : evt( "addEventListener" , type, handler );
		function evt( etname ,type, handler ){
			var i = el.length;
			var etype = etname ==="addEventListener"? type :'on'+type;
			while (i--) {
			    el[i][etname](etype, handler, false);			    
			}
		}
	}else if( typeof el === "object" ){
		window.attachEvent ? el.attachEvent('on'+type, handler, false) : el.addEventListener(type, handler, false);
	}    
}

"use strict";
///////////////////
window.music = [];
(function(){
	var title = [
	'주인공','Roller Coaster','그날처럼','#첫사랑','instagram','답장','비밀정원','뿜뿜','선물','Havana (feat. Young Thug)',
	'미안해','Heart Shaker','비행운','좋니','떠나지마요','사랑한다 말해도 (Feat. 이소라)','기억의 빈자리','DNA','밤편지','좋았을걸',
	'피카부 (Peek-A-Boo)','LIKEY','all of my life','한숨','밤이 되니까','겨울소리','꽃이야','좋아','Tell Me','시차 (We Are) (Feat. 로꼬 & GRAY)',
	'이 별','덜덜덜','그리워하다','나의 사춘기에게','노력',"There's Nothing Holdin' Me Back","봄날","가시나","바보야","첫눈처럼 너에게 가겠다",
	"고민보다 Go","연애소설 (Feat. 아이유)","눈 (Feat. 이문세)","Lonely (Feat. 태연)","썸 탈꺼야","마지막처럼","Beautiful","Shape Of You","하루의 끝 (End of a day)","Perfect Duet (with Beyonce)"
	];
	title = title.sort(function(){return 0.7-Math.random()}).slice(0,20);
	for( i in title ){
		var time = Math.floor(Math.random() * (70 - 11)) + 10;
		time = time > 60? (time-60) < 10? '01:'+'0'+(time-60) : '01:'+ (time-60) : '00:'+time;
		window.music[i] = {"title": title[i] , "time": time };
	}
	var ul = document.getElementById("MusicList").getElementsByTagName("ul")[0];
	ul.innerHTML = "";	
	for( var j = 0 ; j< window.music.length ; j++ ){
		ul.innerHTML += '<li>'+
					'<input type="checkbox">'+
					'<a href="javascript:;">'+ window.music[j].title +'</a>'+
					'<span>'+window.music[j].time+'</span>'+
				'</li>';
	}
}());

(function(){
	var module = window.controler = {};	
	module.timer = null;
	module.lastMusic = [];
	module.lastMusicList = null;
	module.playMusicTime = 0;
	module.play = function(target ,e){ 		
		var playing = [];
		for( var i = 0; i< elAll(".list li").length ; i++ ){
			if( elAll(".list li")[i].className.indexOf("playing") > -1 ){
				module.lastMusic[0] = elAll(".list li")[i].getElementsByTagName("a")[0].innerText;
				module.lastMusic[1] = document.getElementById("Playing").getElementsByTagName("span")[0].innerText;
				module.lastMusicList = elAll(".list li")[i].parentNode.parentNode.getAttribute('id');
			}else if( elAll(".list li")[i].className.indexOf("selected") > -1 ){
				if( playing.length < 1 ){
					elAll(".list li")[i].className = "playing";
					playing[0] = elAll(".list li")[i].getElementsByTagName("a")[0].innerText;
					playing[1] = elAll(".list li")[i].getElementsByTagName("span")[0].innerText;
					module.lastMusic = playing;
					module.lastMusicList = elAll(".list li")[i].parentNode.parentNode.getAttribute('id');
				}				
			}
		}
		var title = document.getElementById("Playing").getElementsByTagName("h2")[0];
		var time = document.getElementById("Playing").getElementsByTagName("span")[0];

		//target : li element
		if( target ){
			playing[0] = target.getElementsByTagName("a")[0].innerHTML;
			playing[1] = target.getElementsByTagName("span")[0].innerText;
			for( var i = 0; i< elAll(".list li").length ; i++ ){
				if( elAll(".list li")[i].className.indexOf("playing") > -1 ){
					elAll(".list li")[i].className = elAll(".list li")[i].className.replace("playing","");
					document.getElementById("Playing").getElementsByTagName("span")[0].innerText = elAll(".list li")[i].getElementsByTagName("span")[0].innerText;				
				}
			}
			target.className ="playing";			
			title.innerText = playing[0];
			time.innerText = playing[1];
			module.lastMusic = playing;
			module.lastMusicList = target.parentNode.parentNode.getAttribute('id');
			module.playMusic(playing[1]);
			elAll("#Playing .controler button")[2].innerText = "일시정지";
		}else{			
			if( playing.length < 1 && module.lastMusic.length < 1 ){ //선택곡없음 && 재생중이었던거 없음 
				if( document.getElementById("TabList").getElementsByTagName('li').length > 1 ){
					var id = document.getElementById("TabList").getElementsByTagName('li')[1].getElementsByTagName('a')[0].innerText;					
					var li = document.getElementById(id).getElementsByTagName('li')[0];
					li.className ="playing";			
					playing[0] = li.getElementsByTagName("a")[0].innerHTML.replace(/^\s+|\s+$/g, '');
					playing[1] = li.getElementsByTagName("span")[0].innerText;					
					title.innerText = playing[0];
					time.innerText = playing[1];
					module.lastMusic = playing;
					module.lastMusicList = id;
					module.playMusic(playing[1]);
					elAll("#Playing .controler button")[2].innerText = "일시정지";
				}else{
					console.log("재생목록 없음");
				}
			}else{				
				playing = module.lastMusic;
				title.innerText = playing[0];
				time.innerText = playing[1];
				var li = document.getElementById(module.lastMusicList).getElementsByTagName("li");
				for( var k =0; k < li.length ; k++ ){
					if( playing[0] == li[k].getElementsByTagName("a")[0].innerText ){
						li[k].className ="playing";
					}
				}
				module.playMusic(playing[1]);
				elAll("#Playing .controler button")[2].innerText = "일시정지";
			}			

		}
		
	}
	module.getList = function( dir ){
		var result;
		if( !module.lastMusicList ) return false;
		var li = document.getElementById(module.lastMusicList).getElementsByTagName('li');
		for( var i = 0; i < li.length ; i++ ){
			if( li[i].className.indexOf("playing") > -1 ){				
				if( dir ==="next" ){					
					i+1 !== li.length ? result = li[i+1] : result = li[0];
				}else{					
					i-1 > -1 ? result = li[i-1] : result = li[li.length-1];
				}
			}
		}
		return result;
	} 
	module.playMusic = function( time ){
		if( module.timer ){
			clearInterval(module.timer);
		}		
		module.timer = setInterval(function(){
			comp( time );
		},1000);		
		var n = time.split(":");
		parseInt(n[0]) > 0 ? n = 60+parseInt(n[1]) : n = parseInt(n[1]);
		module.playMusicTime = n;
		var end = module.lastMusic[1].split(":");
		parseInt(end[0]) > 0 ? end = 60+parseInt(end[1]) : end = parseInt(end[1]);
		function comp( time ){			
			if( module.playMusicTime > 0 ){
				module.playMusicTime--;
				var t = module.playMusicTime;
				t = t > 60? (t-60) < 10? '01:'+'0'+(t-60) : '01:'+ (t-60) : t < 10? '00:'+'0'+t : '00:'+t;				
				document.getElementById("Playing").getElementsByTagName("span")[0].innerText = t;
				var persent = parseInt((module.playMusicTime/end)*100);				
				document.getElementById("Playing").getElementsByTagName("div")[0].getElementsByTagName("p")[0].style.width = persent+"%";
			}else{
				//next
				var next = module.getList("next");
				var n = next.getElementsByTagName("span")[0].innerText.split(":");
				parseInt(n[0]) > 0 ? n = 60+parseInt(n[1]) : n = parseInt(n[1]);
				module.playMusicTime = n;
				for( var i = 0; i< next.parentNode.getElementsByTagName("li").length ; i++ ){
					if( next.parentNode.getElementsByTagName("li")[i].className.indexOf("playing") > -1 ){
						next.parentNode.getElementsByTagName("li")[i].className = "";
					}
				}
				next.className = "playing";
				document.getElementById("Playing").getElementsByTagName("h2")[0].innerText = next.getElementsByTagName("a")[0].innerText;
				
				comp( next.getElementsByTagName("span")[0].innerText );
			}
			
		}
	}
	module.prev = function(e){
		var prev = module.getList("prev");
		if( !prev ) return false;
		var playing = [prev.getElementsByTagName("a")[0].innerText,
			prev.getElementsByTagName("span")[0].innerText];
		module.lastMusic = playing;
		var title = document.getElementById("Playing").getElementsByTagName("h2")[0];
		var time = document.getElementById("Playing").getElementsByTagName("span")[0];
		title.innerText = playing[0];
		time.innerText = playing[1];
		for( var i = 0; i< prev.parentNode.getElementsByTagName("li").length ; i++ ){
			if( prev.parentNode.getElementsByTagName("li")[i].className.indexOf("playing") > -1 ){
				prev.parentNode.getElementsByTagName("li")[i].className = "";
			}
		}
		prev.className = "playing";
		if( module.timer != null ){
			module.playMusic(playing[1]);
		}
		
	}	
	module.next= function(e){
		var next = module.getList("next");
		if( !next ) return false;
		var playing = [next.getElementsByTagName("a")[0].innerText,
			next.getElementsByTagName("span")[0].innerText];
		module.lastMusic = playing;
		var title = document.getElementById("Playing").getElementsByTagName("h2")[0];
		var time = document.getElementById("Playing").getElementsByTagName("span")[0];
		title.innerText = playing[0];
		time.innerText = playing[1];		
		for( var i = 0; i< next.parentNode.getElementsByTagName("li").length ; i++ ){
			if( next.parentNode.getElementsByTagName("li")[i].className.indexOf("playing") > -1 ){
				next.parentNode.getElementsByTagName("li")[i].className = "";
			}
		}
		next.className = "playing";
		if( module.timer != null ){
			module.playMusic(playing[1]);
		}
	}
	
	module.stop = function(e){
		if( module.timer != null ){			
			clearInterval(module.timer);
			module.timer = null;
		}
		elAll("#Playing .controler button")[2].innerText = "재생";
		for( var i = 0; i< elAll(".list li").length ; i++ ){
			if( elAll(".list li")[i].className.indexOf("playing") > -1 ){
				elAll(".list li")[i].className = elAll(".list li")[i].className.replace("playing","");
				document.getElementById("Playing").getElementsByTagName("span")[0].innerText = elAll(".list li")[i].getElementsByTagName("span")[0].innerText;				
			}
		}
		document.getElementById("Playing").getElementsByTagName("div")[0].getElementsByTagName("p")[0].style.width = 0+"%";
	}
	module.pause = function(e){ 
		if( module.timer != null ){			
			clearInterval(module.timer);
			module.timer = null;
		}
		elAll("#Playing .controler button")[2].innerText = "재생";
	}
	module.init = function(){
		//play&stop
		addEvent(elAll("#Playing .controler button")[2],"click", function(e){
			elAll("#Playing .controler button")[2].innerText == "재생"? module.play() :module.pause();
		});
		//prev
		addEvent(elAll("#Playing .controler button")[0],"click", module.prev);
		//next
		addEvent(elAll("#Playing .controler button")[3],"click", module.next);
		//pause
		addEvent(elAll("#Playing .controler button")[1],"click", module.stop);
	}
}());

(function(){
	var module = window.listEvent = {};	
	module.tablist = function(){
		var li = elAll('#TabList li');	
		var divlist = elAll(".list");
		//set
		for(var i = 0; i<li.length ; i++ ){
			if( li[i] !== undefined ) li[i].setAttribute('index',i);			
			if( divlist[i] !== undefined ) divlist[i].setAttribute('index',i);
		}
		addEvent( document.querySelector("#TabList") ,"click", click);		
		function click(e){
			var target = e.target || e.srcElement;		
			if( target.parentNode.nodeName == "LI" ){
				//tab
				var index = target.parentNode.getAttribute('index');
				divlist = elAll(".list");
				li = elAll('#TabList li');
				for(var j = 0; j<li.length ; j++ ){
					li[j].setAttribute('index',j);			
					divlist[j].setAttribute('index',j);
				}			
				for(var k = 0; k <divlist.length ; k++){ 				
					if( divlist[k].getAttribute('index') == index ){					
						divlist[k].style.height ="";
						if( target.nodeName != "INPUT" ){
							target.parentNode.className ="on";
						}						
					}else{
						divlist[k].style.height = 0;
						li[k].className ="";
					}
				}	
				//rename doublclick			
				var findplaying = divlist[ target.parentNode.getAttribute('index') ];
				var isplaying = false;
				for( var z = 0; z < findplaying.getElementsByTagName('li').length; z++ ){
					if(  findplaying.getElementsByTagName('li')[z].className.indexOf('playing') > -1 ){
						isplaying = true;
					}
				}				
				if( !target.clicks ) target.clicks = 0;
				++target.clicks;
				if( target.clicks === 2 ){
					target.clicks = 0;					
					if( target.parentNode.getAttribute('index') != 0 && !isplaying ){
						target.parentNode.className ="";						
						target.parentNode.setAttribute('txt', target.innerText);						
						target.parentNode.innerHTML = '<input type="text" >';						
					}
				}
				setTimeout(function(){
					target.clicks = 0;
				},500);
			}else if( target.nodeName == "INPUT" ){
				target.parentNode.className ="";
			}			
		}
		//rename doublclick			
		addEvent( document.querySelector("#TabList") ,"focusout", function(e){
			var target = e.target || e.srcElement;		
			if( target.nodeName == "INPUT" ){
				var parent = target.parentNode;
				target.parentNode.className ="on";
				//if( target.value.length < 1 ){
					parent.innerHTML = '<a href="javascript:;">'+parent.getAttribute('txt')+'</a>';
				//}				
			}
		});
		
		addEvent( document.querySelector("#TabList") ,"keyup", function(e){
			var target = e.target || e.srcElement;		
			if( target.nodeName == "INPUT" ){
				if( e.keyCode === 13 ){
					if( target.value.length < 1 ){
						target.parentNode.className ="on";
						target.parentNode.innerHTML = '<a href="javascript:;">'+target.parentNode.getAttribute('txt')+'</a>';
					}else{
						var parent = target.parentNode;						
						if( el("#"+target.value) == null ){
							parent.setAttribute('txt', target.value );
							parent.className ="on"; 
							parent.innerHTML = "";
							parent.innerHTML ='<a href="javascript:;">'+target.value +'</a>';	
							elAll(".list")[parent.getAttribute('index')].setAttribute('id',target.value );
						}else{
							parent.className ="on";
							parent.innerHTML = '<a href="javascript:;">'+parent.getAttribute('txt')+'</a>';
						}
					}
				}
			}
		});
	}
	module.makePlaylist = function(selectlist){
		var divset = '<div class="list playList" style="height: 0px;">'+
					'<button>가나다 정렬</button><button>랜덤 정렬</button><button>삭제</button>'+
					'<ul></ul></div>';
		var len = elAll(".playList").length;
		
		document.getElementById("playlistDiv").innerHTML += divset;
		el("#TabList ul").innerHTML += '<li><a href="javascript:;">'+"playlist"+(len+1)+'</a></li>';
		elAll(".list")[elAll(".list").length-1].setAttribute('id', "playlist"+(len+1) );
		var ul = elAll(".list")[elAll(".list").length-1].getElementsByTagName("ul")[0];
		ul.innerHTML +=  selectlist;
		for(var j = 0; j<elAll('#TabList li').length ; j++ ){
			elAll('#TabList li')[j].setAttribute('index',j);			
			elAll(".list")[j].setAttribute('index',j);
		}
	}
	module.musiclistEvent = function(){
		var addbtn = el("#MusicList button:first-child");
		var deletebtn = elAll("#MusicList button")[1];
		addEvent(addbtn , "click", add);		
		function add(e){
			var input = elAll("#MusicList input");
			var cur = 0;
			var selectlist = "";
			for( var i = 0; i< input.length ; i++ ){
				if( input[i].checked ){ 
					cur++;
					var title = input[i].parentNode.getElementsByTagName('a')[0].innerText;
					var time = input[i].parentNode.getElementsByTagName('span')[0].innerText;
					selectlist += '<li><a href="javascript:;">'+title+'</a><span>'+time+'</span></li>';
				}
			}
			if( cur < 1 ){
				alert("음원을 선택해 주세요.");
			}else{
				module.makePlaylist(selectlist);
				for( var i = 0 ; i <input.length; i++){
					input[i].checked = false;
				}
			}

		}
		//delete
		addEvent(deletebtn , "click", deleteMusic);
		function deleteMusic(e){
			var input = elAll("#MusicList input");
			var cur = 0;
			var remveinput = [];
			for( var i = 0; i< input.length ; i++ ){
				if( input[i].checked ){ 
					cur++;
					remveinput.push(input[i]);
				}
			}
			if( cur < 1 ){
				alert("음원을 선택해 주세요.");
			}else{
				for( var j = 0; j<remveinput.length ; j++ ){
					var title = remveinput[j].parentNode.getElementsByTagName("a")[0].innerText;	
					var pl = elAll(".playList");
					
					for( var m = 0; m<pl.length ; m++){						
						var other =  pl[m].getElementsByTagName("a");
						for( var n = 0; n < other.length ; n++ ){
							if( other[n].innerHTML === title ){
								var id = other[n].parentNode.parentNode.parentNode.getAttribute('id');
								if( id !== undefined ){
									var ch = confirm( id+"에 있는 "+title+"음원도 삭제됩니다." );
									if( ch ){
										if( document.getElementById("Playing").getElementsByTagName("h2")[0].innerText === title ){
											controler.lastMusic = [];
											controler.stop();
											document.getElementById("Playing").getElementsByTagName("h2")[0].innerText ="Title";
											document.getElementById("Playing").getElementsByTagName("span")[0].innerText ="00:00";
										}
										other[n].parentNode.parentNode.removeChild(other[n].parentNode);
									}
								}
							}
						}

					}
					
					remveinput[j].parentNode.parentNode.removeChild(remveinput[j].parentNode);
					
				}
				
			}			
		}
		
	}
	
	module.playlistEvent = function(){
		//sort
		addEvent( document.getElementById("playlistDiv") ,"click", sort );
		function sort(e){
			var target = e.target || e.srcElement;
			if( target.innerText !== '가나다 정렬' ) return false;			
			sorted( target ,"sort" );
		}
		//sortrandom 
		addEvent( document.getElementById("playlistDiv") ,"click", sortrandom );
		function sortrandom(e){
			var target = e.target || e.srcElement;
			if( target.innerText !== '랜덤 정렬' ) return false;			
			sorted( target ,"random" );
		}
		function sorted( target ,type ){			
			var list = [];
			for( var i=0; i< target.parentNode.getElementsByTagName('li').length ; i++ ){				
				var title = target.parentNode.getElementsByTagName('li')[i].getElementsByTagName('a')[0].innerText.replace(/^\s+|\s+$/g, '');
				var time = target.parentNode.getElementsByTagName('li')[i].getElementsByTagName('span')[0].innerText.replace(/^\s+|\s+$/g, '');
				var nclass = target.parentNode.getElementsByTagName('li')[i].className;
				list[i] = [title,time,nclass];
			}
			if( type ==="sort" ){
				if( !target.set ) target.set = false;
				if( target.set ){
					list.sort().reverse();
					target.set = false;
				}else{
					list.sort();
					target.set = true;
				}
			}else if( type ==="random" ){
				list.sort(function() {return 0.5-Math.random()});				
			}				
			var ul = target.parentNode.getElementsByTagName('ul')[0];
			ul.innerHTML = "";
			for( i in list ){
				var c = list[i][2].length >0 ? 'class="'+list[i][2]+'"' : "";				
				ul.innerHTML += '<li '+c+'>'+
								'<a href="javascript:;">'+list[i][0]+'</a>'+
								'<span>'+list[i][1]+'</span>'+
								'</li>';
			}			
		}
		//deleteMusic
		addEvent( document.getElementById("playlistDiv") ,"click", deleteMusic);
		function deleteMusic(e){
			var target = e.target || e.srcElement;
			if( target.innerText !== '삭제' ) return false;
			var lis = target.parentNode.getElementsByTagName('li');
			if( lis.length < 1 ){
				el("#playlistDiv").removeChild(target.parentNode);
				var idx = target.parentNode.getAttribute('id');				
				for( var i= 0; i < elAll("#TabList li").length; i++ ){
					if( elAll("#TabList li")[i].getElementsByTagName("a")[0].innerText === idx ){						
						el("#TabList ul").removeChild(elAll("#TabList li")[i]);
						elAll("#TabList li")[0].className = "on";
						elAll(".list")[0].style.height ="";
					}
				}
			}else{
				var nl = "";
				for( var k = 0; k< lis.length ; k++ ){				
					if( lis[k].className.indexOf("selected") > -1 ){
						//lis[k].parentNode.removeChild( lis[k] );
						if( document.getElementById("Playing").getElementsByTagName("h2")[0].innerText === lis[k].getElementsByTagName("a")[0].innerHTML ){
							controler.lastMusic = [];
							controler.stop();
							document.getElementById("Playing").getElementsByTagName("h2")[0].innerText ="Title";
							document.getElementById("Playing").getElementsByTagName("span")[0].innerText ="00:00";
						}
					}else{
						nl += "<li class='"+lis[k].className+"'>"+ lis[k].innerHTML+"</li>";						
					}
				}
				target.parentNode.getElementsByTagName("ul")[0].innerHTML = nl;
			}			

		}

	}
	module.liclick = function(){
		//highlight
		addEvent( document.getElementById("playlistDiv") ,"click", highlight);
		function highlight(e){
			var target = e.target || e.srcElement;
			if( target.nodeName === "A" || target.nodeName === "LI" ){				
				if( target.nodeName === "LI" ){					
					comp( target );
				}else{					
					comp( target.parentNode );
				}
			}
			function comp( elm ){
				if( elm.className.indexOf("selected") > -1 ){
					if( elm.getAttribute("playing") ){
						elm.className = "playing";
						elm.setAttribute('playing',false);
					}else{
						elm.className = "";
					}						
				}else{						
					if( elm.className.indexOf("playing") > -1 ){
						elm.setAttribute('playing',true);
						setTimeout(function(){
							elm.className = "playing";
							elm.setAttribute('playing',false);
						},3000);
					}
					elm.className = "selected";
				}
			}
		}
		
		//double click playlist
		addEvent( document.getElementById("playlistDiv") ,"click", pdoubleClick);
		function pdoubleClick(e){
			var target = e.target || e.srcElement;
			if( target.nodeName === "A" || target.nodeName === "LI" ){
				if( !target.clicks ) target.clicks = 0;
				++target.clicks;
				if( target.clicks === 2 ){
					target.clicks = 0;
					//music play
					var li = target.nodeName === "A" ? target.parentNode : target;
					controler.play( li );
				}
				setTimeout(function(){
					target.clicks = 0;
				},500);
			}
		}
		//double click musiclist
		addEvent( document.getElementById("MusicList") ,"click", mdoubleClick);
		function mdoubleClick(e){
			var target = e.target || e.srcElement;
			if( target.nodeName === "A" || target.nodeName === "LI" ){
				if( !target.clicks ) target.clicks = 0;
				++target.clicks;
				if( target.clicks === 2 ){
					target.clicks = 0;					
					//list add - prevent overlap					
					var txt = target.nodeName === "A" ? target.innerText : target.getElementsByTagName("a")[0].innerText;
					var time = target.nodeName === "A"? target.parentNode.getElementsByTagName("span")[0].innerText : target.getElementsByTagName("span")[0].innerText;
					
					if( document.getElementById("playlistDiv").getElementsByTagName("div").length < 1 ){
						var selectlist = '<li><a href="javascript:;">'+ txt +'</a><span>'+ time +'</span></li>';
						listEvent.makePlaylist(selectlist);
						controler.lastMusicList = document.getElementById("playlistDiv").getElementsByTagName("div")[0].getAttribute("id");
					}else{
						if( controler.lastMusicList != null ){
							var ul = document.getElementById(controler.lastMusicList).getElementsByTagName("ul")[0];
							var ischeck = 0;
							for(var m = 0; m < ul.getElementsByTagName("li").length ;m++ ){
								if( ul.getElementsByTagName("li")[m].getElementsByTagName("a")[0].innerHTML === txt ){
									ischeck++;									
								}
							}
							if( ischeck == 0 ){
								ul.innerHTML += '<li><a href="javascript:;">'+ txt +'</a><span>'+ time +'</span></li>';
							}							
						}else{							
							var ul = document.getElementById("playlistDiv").getElementsByTagName("div")[0].getElementsByTagName("ul")[0];
							var ischeck = 0;
							controler.lastMusicList = document.getElementById("playlistDiv").getElementsByTagName("div")[0].getAttribute("id");
							for(var m = 0; m < ul.getElementsByTagName("li").length ;m++ ){
								if( ul.getElementsByTagName("li")[m].getElementsByTagName("a")[0].innerHTML === txt ){
									ischeck++;									
								}
							}
							if( ischeck == 0 ){
								ul.innerHTML += '<li><a href="javascript:;">'+ txt +'</a><span>'+ time +'</span></li>';
							}
						}
					}
					//music play					
					var li = document.getElementById(controler.lastMusicList).getElementsByTagName("li");
					var playli;		
					for( var i=0 ; i <li.length ; i++ ){
						if( li[i].getElementsByTagName("a")[0].innerHTML === txt ){
							playli = li[i];
						}
					}
					
					controler.play( playli );
				}
				setTimeout(function(){
					target.clicks = 0;
				},500);
			}
			
		}
		//keyboard arrow 
	}
	module.init = function(){
		module.tablist();
		module.playlistEvent();
		module.musiclistEvent();
		module.liclick();
	}
}());

if(document.addEventListener){	
	document.addEventListener('DOMContentLoaded', ready);
}else{	
	document.attachEvent('onreadystatechange', function(){
		if (document.readyState=='complete') ready();
	});
}

//ready
function ready(){
	listEvent.init();
	controler.init();
	//console.log("ready");
}

