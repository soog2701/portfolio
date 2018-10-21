/*
* 메인_브랜드별 상품
 */
function goBrand(sdx){
	$("#s_cat").val(sdx);
	fncSearchMain();
}

function fncSearchMain(){
	$.ajax({
		type:"post",
		dataType:"text",
		url: "main_search.do",
		data:"s_cat="+$("#s_cat").val(),
//		async: true,
//		cache: false, 
//		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		success : function(data)
		{
			getMainProduct(data);
		},
	    error: function(data, status, error)
		{
			alert("검색 오류 발생");
		}
	});	
}

function getMainProduct(data)
{
	var activeTab = 0;
	$('.tabs .tab').each(function(i) {
		if ($(this).is(':visible')) {
			activeTab = i;
		}
	});
	$('.tabs .tab').eq(activeTab).find("#ul_main").empty();
	$('.tabs .tab').eq(activeTab).find("#ul_main").html(data);
}


/*
 * 브랜드 메인이동 
 */
function goMainpage(sdx){
	if(sdx == "B"){
		location.href="/brandMain.do";
	}else if(sdx == "P"){
		location.href="/shopping.do";
	}else if(sdx == "E"){
		location.href="/eventnow.do";
	}else if(sdx == "S"){
		location.href="/sns.do";
	}else if(sdx == "C"){
		location.href="/intro.do?fl=1";
	}
}

/**
 * 브랜드_제품군선택
 */
//function goBrand(cat){
//	location.href="/index.do?category="+cat;
//}

function brandSearch(sdx){
	$("#s_cat").val(sdx);
	$("#s_cnt").val('4');
	fncSearchBrand();
}

function brandSearchMore(sdx){
	$("#s_cnt").val(sdx);
	fncSearchBrand();
}

function fncSearchBrand(){
	$.ajax({
		type:"post",
		dataType:"text",
		url: "brand_search.do",
		data:"s_cat="+$("#s_cat").val()+"&s_cnt="+$("#s_cnt").val(),
		success : function(data)
		{
			getBrandProduct(data);
			HKlayerpopup(); 
		},
	    error: function(data, status, error)
		{
			alert("검색 오류 발생");
		}
	});	
}


function getBrandProduct(data)
{	
	 $("#ul_brand").empty();
	 $("#ul_brand").html(data);
}

/**
 * 쇼핑_제품 검색(정렬)
 */
function shoppingOrdby(ord){
	$("#s_ordby").val(ord);
	$("#currentpage").val("");
	$("#s_txt").val("");
	fncSearchShopping();
}

/**
 * 쇼핑_제품 검색(검색값입력)
 */
function shoppingSearch(){
	$("#currentpage").val("");
	$("#s_ordby").val("");
	fncSearchShopping();
}

/**
 * 쇼핑_제품 검색(탭)
 */
function shoppingTab(tab){
	$("#s_attr").val(tab);
	$("#s_ordby").val("");
	$("#currentpage").val("");
	$("#s_txt").val("");
	fncSearchShopping();
}

/**
 * 쇼핑_제품 검색(페이징)
 */
function movepage(idx){
	$("#currentpage").val(idx);
	fncSearchShopping();
}

function fncSearchShopping(){
	$.ajax({
		type:"post",
		dataType:"text",
		url: "shopping_search.do",
		data:"s_ordby="+$("#s_ordby").val()+"&currentpage="+$("#currentpage").val()+"&s_attr="+$("#s_attr").val()+"&s_txt="+$("#s_txt").val()+"&s_cat="+$("#s_cat").val(),
//		async: true,
//		cache: false, 
//		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		success : function(data)
		{
			getShoppingProduct(data);
			HKlayerpopup(); 
		},
	    error: function(data, status, error)
		{
			alert("검색 오류 발생");
		}
	});	
}

function fncSearchShopping2() {
	var ordBy = $("#sortingOrder").val();
	currentpage = $("#currentpage").val();
	sAttr = $("#sortingCategory").val();
	sTxt = $("#s_txt").val();
	sCat = $("#s_cat").val();
	
	var uCat = '';
	var sitCat = '';
	
	if(sCat.substr(0,1) === 'B'){
		sCat = $("#s_cat").val();
		u_cat = '';
		sitCat = '';
		currentpage = '1';
	}else if(sCat.substr(0,1) === 'C'){
		uCat = $("#s_cat").val();
		sCat = ''
		sitCat = '';
		currentpage = '1';
	}else if(sCat.substr(0,1) === 'S'){
		sitCat = $("#s_cat").val();
		bCat = ''
		sCat = '';
		currentpage = '1';
	}
	
	$.ajax({
		type:'POST',
		dataType:'text',
		url: "shopping_search.do",
		data:"s_ordby=" + ordBy + "&currentpage=" + currentpage + "&s_attr=" + sAttr + "&s_txt=" + sTxt + "&s_cat="+ sCat + "&u_cat="+ uCat + "&sit_cat="+ sitCat,
		success : function(data) {
			getShoppingProduct(data);
			HKlayerpopup(); 
			$('#ul_shopping .search_area2').remove();
			$('#ul_shopping .select_box').remove();
			$('#ul_shopping .edit').remove();
		},
	    error: function(data, status, error) {
			alert("검색 오류 발생");
		}
	});
}


function getShoppingProduct(data){
	 $("#ul_shopping").empty();
	 $("#ul_shopping").html(data);
}


/**
 * 뉴스 검색(검색값입력)
 */
function newsSearch(){
	$("#searchForm").attr("action", "/news.do");
	$("#searchForm").submit();
}

/**
 * 공지사항 검색(검색값입력)
 */
function noticeSearch(){
	$("#searchForm").attr("action", "/notice.do");
	$("#searchForm").submit();
}

/**
 * 광고 검색(검색값입력)
 */
function adSearch(){
	$("#searchForm").attr("action", "/ad.do");
	$("#searchForm").submit();
}

/**
 * 페이스북연결
 */
function facebookConnect(idx){
	for(var i = 1; i < 4; i++){
		var face= "fb"+i;
		var id= "a_"+i;
		
		if(i == idx){
			document.getElementById(face).style.display = "block"; //facebook1
			$("#a_"+i).attr("class", "on"); //facebook1
		} else {
			document.getElementById(face).style.display = "none";
			$("#a_"+i).attr("class", ""); //facebook1
		}
	}
}
/**
 * faq 검색(검색값입력)
 */
function faqSearch(){
	$("#searchForm").attr("action", "/faq.do");
	$("#searchForm").submit();
}

/**
 * faq 검색(탭)
 */
function faqTab(sdx){
	$("#s_cat").val(sdx);
	$("#searchForm").attr("action", "/faq.do");
	$("#searchForm").submit();
}

/**
 * faq 검색(페이징)
 */
function faqpage(sdx, idx){
	$("#currentpage").val(idx);
	$("#s_cat").val(sdx);
	$("#searchForm").attr("action", "/faq.do");
	$("#searchForm").submit();
}

/**
 * Q&A연결
 */
function goMyqna(){
	if($("#id").val() == ""){
		if(confirm("로그인이 필요합니다. 로그인하시겠습니까?")){
			window.location.href="/login.do";
		}
	}else{
		window.location.href="/myQna.do";
	}
}

/**
 * Q&A연결
 */
function chkMyqna(){
	if(confirm("로그인이 필요합니다. 로그인하시겠습니까?")){
		window.location.href="/login.do?endUrl=q";
	}
}

//--------------------------------------------------------------------------------------------------------------------------------------//
//오늘날짜 계산
function getTimeStampNow() {
	var d = new Date();
	var s =	leadingZerosNow(d.getFullYear(), 4) + '-' +	leadingZerosNow(d.getMonth() + 1, 2) + '-' +	leadingZerosNow(d.getDate(), 2);
	return s;
}
function leadingZerosNow(n, digits) {
	var zero = '';
	n = n.toString();

	if (n.length < digits) {
		for (i = 0; i < digits - n.length; i++)
			zero += '0';
	}
	return zero + n;
}

//오늘 날짜 ex) 2015-11-03
var nowday = getTimeStampNow();

//메인 팝업 쿠키 가져오기
function notice_getCookie( name ){
 var nameOfCookie = name + "=";
 var x = 0;
 
 while ( x <= document.cookie.length ){
	var y = (x+nameOfCookie.length);
	if ( document.cookie.substring( x, y ) == nameOfCookie ) {
	 if ( (endOfCookie=document.cookie.indexOf( ";", y )) == -1 )
		endOfCookie = document.cookie.length;
	 return unescape( document.cookie.substring( y, endOfCookie ) );
	}
	x = document.cookie.indexOf( " ", x ) + 1;
	if ( x == 0 )
	 break;
 }
 return "";
}

// 2015-06-09 reseed : 메인 팝업
$(document).ready(function(){
	if(nowday < '2015-06-19'){
		//메인 팝업 노출
		if(notice_getCookie( "notice" ) != "done" ){	
			window.open("henkel_popup1.do","mainpop1","width=410px, height=640px,top=200px, left=200px, toolbar=no,menubar=no,status=no,scrollbars=1,resizable=no");
		}
	}
	
	$('.search-sorting-tabs .tab-link').each(function(i) {
		$(this).bind('click', function(e) {
			e.preventDefault();
			$('#s_cat').val($(this).attr('val'));
			$('.search-sorting-tabs .tab-item').removeClass('active');
			$(this).parents('.tab-item').eq(0).addClass('active');
			fncSearchShopping2();
			return false;
		});
	});
	
	$('.search-tab .tab-link').each(function(i) {
		$(this).bind('click', function(e) {
			e.preventDefault();
			$('.search-tab .tab-item').removeClass('active');
			$(this).parents('.tab-item').eq(0).addClass('active');
			$('.tabs-content .tab-content').removeClass('active').eq(i).addClass('active');

            //카테고리 탭 초기화
            $('.search-sorting-tabs .tab-item').removeClass('active');
            $('.search-sorting-tabs .tab-item.first').addClass('active');
            var s_cat = $('#s_cat').val();
            if(s_cat != '') {
                $('#s_cat').val('');
                // $('#s_txt').val('');
                fncSearchShopping2();
            }
			return false;
		});
	});
});

//--------------------------------------------------------------------------------------------------------------------------------------//

// V2 - JH

/*
 * 메인_브랜드별 상품
 */
function main_search_brand_v2(sdx, type){
	$("#s_cat").val(sdx);
	
	// console.log(sdx,type);
	
	var q_data = "";
	
	if(type=="B"){//brand
		q_data = "s_cat="+sdx;
	}else if(type=="U"){//usage
		q_data = "u_cat="+sdx;
	}else if(type=="S"){//situation
		q_data = "sit_cat="+sdx;
	}else{
		q_data = "s_cat="+sdx;
	}
	
	// console.log(q_data);
	
	$.ajax({
		type:"post",
		dataType:"text",
		url: "main_search_v2.do",
		data: q_data,
//		async: true,
//		cache: false, 
//		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		success : function(data)
		{
			getMainProduct(data);
		},
	    error: function(data, status, error)
		{
			alert("검색 오류 발생");
		}
	});	

}

