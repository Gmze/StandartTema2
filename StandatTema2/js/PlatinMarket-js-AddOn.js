var PM_sid = PM.CSRFToken;
var skinFolder = "1041";

var tanitim_yazisi_ayar = {
	'stil' : 1,
	'style' : ''
};

var viewport = document.querySelector("meta[name=viewport]");
viewport.setAttribute('content', 'width=1200');

$('body').on('init.equal.height', function(e){
	e.preventDefault();
});

tanitim_yazisi_goster = function() {
	if (tanitim_yazisi_ayar.stil == 1){
		$(".urun").on('mouseenter', function(){
			if($(this).find("div").find(".tanitim_yazisi").length > 0){
				$(".popover").find(".popover-content").find("p").html($(this).find("div").find(".tanitim_yazisi").text());
				$(".popover").css("display","block").css("opacity",".9").width($(this).innerWidth()).css("top",$(this).offset().top - $(".popover").height()).css("left",$(this).offset().left);
			}
		}).on('mouseleave', function(){
			$(".popover").css("display","none").css("opacity",0);
		});
		$("body").append('<div class="popover top"><div class="arrow"></div><div class="popover-content"><p>&nbsp;</p></div></div>');
	} else {
		$(".tanitim_yazisi").css("display","block").css(tanitim_yazisi_ayar.style);
	}
}

var cartCount = $(".sepet_link span").text();
if (!cartCount == "0"){
	var ust_sepet_kismi_hover = 0;
	$('#ust_sepet_kismi').on('mouseenter', function(){
		$(this).find("a").addClass("active");
		$(this).addClass("active");
		if(ust_sepet_kismi_hover == 0){
			var cart_asp_page = "";
			if(location.protocol == "https:"){
				cart_asp_page = "success.asp";
			}else{
				cart_asp_page = "mini_cart.asp";
			}
			$("#ust_sepet_kismi div.mini_sepetim").load("/skin/_shared/asp/" + cart_asp_page ,function(){
				
				$(".sepete_git_buton").html('<a class="sepetime_a"href="/alisveris-sepetim" title="Sepete Git">Sepete Git</a><a class="satinal_a" href="/uye-teslimat-ve-fatura-bilgileri?sid='+ PM_sid +'" title="Sat�n Al">Sat�n Al</a>');
				var mini_sepet_urun_adeti_scroll = 3;
				if($("#ust_sepet_kismi .mini_sepetim .sepet_dolu .sepet_urunler .urun").length > mini_sepet_urun_adeti_scroll) {
					var mini_sepet_urun_adeti_yukseklik = 0;
					$("#ust_sepet_kismi .mini_sepetim .sepet_dolu .sepet_urunler .urun:lt("+ mini_sepet_urun_adeti_scroll +")").each(function() {
						mini_sepet_urun_adeti_yukseklik = mini_sepet_urun_adeti_yukseklik + $(this).outerHeight();
					});
					
					$("#ust_sepet_kismi .mini_sepetim .sepet_dolu").prepend('<div class="nano"></div>');
					$("#ust_sepet_kismi .mini_sepetim .sepet_dolu .sepet_urunler").appendTo(".nano").addClass("nano-content");
					$("#ust_sepet_kismi .mini_sepetim .sepet_dolu .nano").css("height",mini_sepet_urun_adeti_yukseklik);
					$("#ust_sepet_kismi .mini_sepetim .sepet_dolu .sepet_urunler .urun").css("margin-right","15px");
					$('#ust_sepet_kismi .nano').nanoScroller({preventPageScrolling: true, alwaysVisible: true});
				}
				
			});
			
			$(".sepet_urunler .nano-content").trigger('focus');
			ust_sepet_kismi_hover = 1;
			
		}
		$('#ust_sepet_kismi div.mini_sepetim').clearQueue().slideDown(200); 
		
	}).on('mouseleave', function(){
		$('#ust_sepet_kismi div.mini_sepetim').clearQueue().fadeOut(200);
		$(this).find("a").removeClass("active");
		$(this).removeClass("active");
	});
}

if($(".acilirmenu").length > 0) {
    $(".Popup").each(function(){
        $(this).removeAttr("id").removeAttr("class").children("li").slice(10).remove();
    });
}else{

}

$(".ust_ana_menu").each(function(){
	$(this).children("li").slice(5).remove();
});

$(".main_row").insertAfter("#PM_ust");

PM.OnPage("urun_detay",function(){
	PM.on('before-init-jq-zoom',function(){
		PM.Set('Configure', 'JqZoom.xOffset', 30);
	});
});

PM.OnPage("ana_sayfa",function(){
	
	if($("#ust_ek_menu_2 li").height() == null) {
		$("#PM_sol").addClass("ustmenuyok")
	}	

	function modul_resim(modul_class){
		$.each($(modul_class), function(index) { 	
			$(this).attr("width","150").attr("height","150");
		});	
	}
	
	$(".menum > ul > li").each(function(){
		var $menu_li = $(this);
		if ($menu_li.children("ul").length > 0)
		$menu_li.children("a").append("<div class='arrow_right fa fa-angle-right'></div>"); 
	});

	$(".menum > ul > li > ul > li").each(function(){
		var $menu_li = $(this);
		if ($menu_li.children("ul").length > 0)
		$menu_li.children("a").append("<div class='arrow_right fa fa-angle-right'></div>"); 
	});
	
	$(".modul_buyuk_urun, .modul_kucuk_urun").addClass("urun");

	modul_resim(".modul_buyuk_urun div.urun_resmi a img");
	modul_resim(".modul_kucuk_urun div.urun_resmi a img");
		
	$.each($("#PM_anasayfa_urunler div.urun"), function(index) { 
		$.each($(this), function(index) { 			
				$(this).parent().attr("style","");
		});
	});

	$("#PM_anasayfa_urunler div.icerik").each(function(){
		$(this).children("div").not(".PM_clear").wrapAll('<div class="product_group"></div>');
	});
	$("body").trigger('resize');

	//$("#PM_anasayfa_urunler div.icerik > div").wrapAll('<div class="product_group"></div>');				
	
	$("#PM_doviz div.icerik .PB_USD").prepend('<i class="fa fa-dollar"></i>');
	$("#PM_doviz div.icerik .PB_EUR").prepend('<i class="fa fa-eur"></i>');
	$("#PM_doviz div.icerik .PB_GBP").prepend('<i class="fa fa-gbp"></i>');

	(function($){
		$.fn.bosMu = function(){
			var retVal = false;
			if ($(this).children().length === 0 || $(this).html().trim().length === 0) retVal = true;
			return retVal;
		}
	})(jQuery);

	if($("#PM_sag").bosMu()){
		$("#PM_anasayfa").removeAttr("class").addClass("sag_yok");
	}

	if($("#PM_sol").bosMu()){
		$("#PM_anasayfa").removeAttr("class").addClass("sol_yok");
	}

	if($("#PM_sol").bosMu() && $("#PM_sag").bosMu()){
		$("#PM_anasayfa").removeAttr("class").addClass("sag_sol_yok");
	}

	if($(".menum").length == 0){
		$(this).addClass("menum_ust");
	}

	var aciklama_genislik = $(".urun_aciklama").innerWidth();
	$(".urun_aciklama img").each(function() {
		if($(this).width() > aciklama_genislik){
			$(this).width("100%").height("100%");
		}
	});

	
	$("#PM_sol #PM_kategoriler").prependTo("#PM_sol");
	$("#PM_sag #PM_kategoriler").remove();
	
	if($("#anasayfa_yazisi").length > 0 ){
		if($("#anasayfa_yazisi").html().trim().length == 0 ){
			$("#anasayfa_yazisi").remove();
		}
	}
	
	$("#anasayfa_yazisi").insertAfter(".main_row");
	$("#PM_xml_banner").prependTo(".main_row .ic_tutucu");	
	$("#kayan_yazi_alani").prependTo(".main_row .ic_tutucu");
	
});

PM.OnPage(["urunler" ,"arama_sonuclari", "yeni_urunler", "indirimli_urunler", "tag"], function(){

	
	if ($(".urun_yok_kategoriler_resimli").length != 0){
	
		$(".kategori_urunleri_daraltma").remove();
		$("#PM_kategori_urunleri div.urunler_main").css("width","1200px").css("float","none");
		$("#PM_kategori_urunleri div.urunler_main div.urunler div.icerik").css("width","1200px");
		$(".urun_yok_kategoriler_resimli li a br").remove();
		$(".urun_yok_kategoriler_resimli li a").append("<span></span>");
		
		$( ".urun_yok_kategoriler_resimli li a" ).text(function( index ) {
			$(this).find("span").html($(this).text());
		});	
	}	

});	

PM.OnPage("haber_detay",function(){

	$("#PM_haber_detayi div.haber_paylas_butonlar a.paylas_facebook").prepend('<i class="fa fa-lg fa-facebook"></i>');
	$("#PM_haber_detayi div.haber_paylas_butonlar a.paylas_google").prepend('<i class="fa fa-lg fa-google"></i>');
	$("#PM_haber_detayi div.haber_paylas_butonlar a.paylas_twitter").prepend('<i class="fa fa-lg fa-twitter"></i>');
	
});

PM.OnPage(["ana_sayfa", "urunler", "arama_sonuclari", "yeni_urunler", "indirimli_urunler", "tag,sepet_detayi", "urun_detay"], function(){
		
	$.each($("#PM_orta div.urun div div.butonveikonlar"), function(index) { 
		$(this).find(".urun_ikonlar").find("a").find("img").each(function(){
			$(this).parent("a").addClass($(this).attr("class") + "_a");
		});	
	});	

	$(".kitik_stok_urun_ikon_a").prepend('<i class="fa fa-cube"></i>');
	$(".ayni_gun_kargo_urun_ikon_a").prepend('<i class="fa fa-calendar-check-o"></i>');
	$(".kargo_bedavali_urun_ikon_a").prepend('<i class="fa fa-truck"></i>');
	$(".kampanyali_urun_ikon_a").prepend('<i class="fa fa-star-o"></i>');
	$(".etiket_urunleri_daraltma p.baslik").prepend('<i class="fa fa-tags"></i>');
	$(".etiket_urunleri_daraltma div.icerik ul li a").prepend('<i class="fa fa-caret-right"></i>');
	
});
	
PM.OnPage(["urunler", "arama_sonuclari", "indirimli_urunler", "yeni_urunler" ,"tag"], function(){
	
	$(".yeni_urunler_daraltma div.ana_icerik div.icerik ul li a, .arama_urunleri_daraltma div.ana_icerik div.icerik ul li a, .indirimli_urunler_daraltma div.ana_icerik div.icerik ul li a, .kategori_urunleri_daraltma div.ana_icerik div.icerik ul li a").prepend('<i class="fa fa-caret-right"></i>');

	$(".yeni_urunler_daraltma div.ana_icerik , .arama_urunleri_daraltma div.ana_icerik , .indirimli_urunler_daraltma div.ana_icerik , .kategori_urunleri_daraltma div.ana_icerik").find("p.baslik a").prepend('<i class="fa fa-sort-alpha-asc"></i>');
	
	if($(".ana_icerik div").length == 0 ){
		$(".ana_icerik").remove();
	}

	$(".urun_butonlar .urun_sepete_ekle img ").css("display","none");
	$(".urun_butonlar .urun_incele img ").css("display","none");

	$(".gosterim_secenekleri").find("a").first().addClass("liste_ikon");
	$(".gosterim_secenekleri").find("a").last().addClass("katalog_ikon");

	$(".gosterim_secenekleri a").each(function(){
		var liste_ikon = $(this).find("img").attr("src");
		var liste_class = liste_ikon.substring(liste_ikon.lastIndexOf("/") + 1, liste_ikon.length).replace(".jpg","");
		$(this).addClass(liste_class);
	});
	
	$(".sayfalama_baslik").remove();
	$(".urunler_main div.urunler div.icerik div.urun_liste td.urun_ismi div.urun_ikonlar img.yeni_urun_ikon").attr("src","skin/" + skinFolder + "/images/yenii.png");
	$(".urun_liste").each(function(i,el){
		if(i == $(".urun_liste").length -1){$(this).addClass("last_row");}
		if(i == 0){$(this).addClass("first_row");}
		if(i % 2 === 1){
			$(this).addClass("row_2");
		}
		
		$(this).find("table").find("tbody").find("tr").find("td.urun_ismi").find(".urun_ikonlar").find("a").find("img").each(function(){
			$(this).parent("a").addClass($(this).attr("class") + "_a");
		
		});
	});	



	$.each($("div.urunler_main div.urun"), function(index) { 
		$.each($(this), function(index) { 			
				$(this).parent().attr("style","");
		});
	});

	$(".urunler_main div.urunler div.icerik").each(function(){
		$(this).children("div").not(".PM_clear").not(".urunler_ust").not(".urunler_alt").wrapAll('<div class="product_group"></div>');
	});


	if($(".urunler_main div.urunler div.icerik div.urun_liste.first_row").width() > 0){
		$(".urunler_main div.urunler div.icerik .product_group").addClass("pg_list")
	}


	$(".urunler_main .sizin_icin_sectiklerimiz .PM_clear ,.urunler_main .yeni_urunler .PM_clear, .urunler_main .indirimli_urunler .PM_clear").remove();
	$(".urunler_main .sizin_icin_sectiklerimiz .icerik > div").slice(3).remove();
	$(".urunler_main .yeni_urunler .icerik > div").slice(3).remove();
	$(".urunler_main .indirimli_urunler .icerik > div").slice(3).remove();
	
	$(".urunler_ust").prepend('<div class="siralamabutonlar"><a href="javascript:void(0)" class="ismegore">�sme G�re S�rala</a><a href="javascript:void(0)" class="dusukfiyat">En D���k Fiyat</a><a href="javascript:void(0)" class="yuksekfiyat">En Y�ksek Fiyat</a><a href="javascript:void(0)" class="encoksatan">En �ok Satan �r�nler</a><a href="javascript:void(0)" class="enyeni">En Yeni �r�nler</a></div>')
	
	$( ".siralamabutonlar .ismegore" ).on('click', function() {
		$("#urun_siralama_secenekleri").val("0").triggerHandler("change");
	});	
	
	$( ".siralamabutonlar .dusukfiyat" ).on('click', function() {
		$("#urun_siralama_secenekleri").val("1").triggerHandler("change");
	});
	
	$( ".siralamabutonlar .yuksekfiyat" ).on('click', function() {
		$("#urun_siralama_secenekleri").val("2").triggerHandler("change");
	});
	
	$( ".siralamabutonlar .encoksatan" ).on('click', function() {
		$("#urun_siralama_secenekleri").val("3").triggerHandler("change");
	});	
	
	$( ".siralamabutonlar .enyeni" ).on('click', function() {
		$("#urun_siralama_secenekleri").val("5").triggerHandler("change");
	});	
	
});

PM.OnPage("urun_detay",function(){

	$(".urun_taksit_secenekleri_kisa a").off("click").on("click", function(){
		$([document.documentElement, document.body]).animate({
			scrollTop: 750
		}, 200);
	});
	
	$('<div id="form-submit-loader" style="display: block;position: absolute;display:none;"></div>').prependTo(".urun_detay_orta");
	$("#form-submit-loader").width($(".urun_detay_orta").width()).height($(".urun_detay_orta").height());
 
	$("body").on('unload', function(e){
		$("#form-submit-loader").show();
	});
	
	
	
	var yorum_yap_link = $("#urun_detay_tab4 a").attr("href");
	var yorumsayisi = "0";
	if ($(".yorum_yap > b").length > 0) yorumsayisi = $(".yorum_yap > b").first().text();			
	$('<div class="staryorum"><a class="s_first"href="javascript:void(0)">Yorumlar<span>('+ yorumsayisi +')</span><a class="s_second" rel="sexylightbox nofollow" href="'+ yorum_yap_link +'">Yorum Yap</a></div>').appendTo("#PM_urun_detayi div.urun_detay_orta");	

	$(".staryorum .s_first").on('click', function(e){ 
			e.preventDefault(); 
			$(".urun_detay_tablar_ul li").removeClass("active");
			$(".tab_container .tab_content").css("display","none");
			$(".urun_detay_tablar_ul .link_4").parent("li").addClass("active");
			$("#urun_detay_tab4").css("display","block");
					
			window.scroll({
			  top: $("#urun_detay_tab4").offset().top,
			  left: 0,
			  behavior: 'smooth' 
			});
	}); 
	
	

	$("#PM_urun_detayi h1.urun_ismi").insertAfter(".urun_detay_sol");
	$('<div class="d_toplayici">').insertAfter("#PM_urun_detayi h1.urun_ismi");
	
	$("div.urun_oy").appendTo(".d_toplayici");
	$(".staryorum").appendTo(".d_toplayici");
	$(".urun_paylas_butonlar").appendTo(".d_toplayici");
	
	
	
	
	$("div.urun_oy").appendTo(".detaycontainer");
	
	
	$(".urun_paylas_butonlar a.paylas_facebook").prepend('<i class="fa fa-facebook"></i>');
	$(".urun_paylas_butonlar a.paylas_twitter").prepend('<i class="fa fa-twitter"></i>');
	$(".urun_paylas_butonlar a.paylas_google").prepend('<i class="fa fa-google"></i>');
	



	$('<div class="oklar"><a id="arttir" href="javascript:void(0);"><i class="fa fa-angle-up"></i></a><a id="azalt" href="javascript:void(0);"><i class="fa fa-angle-down"></i></a></div>').insertAfter($("#urun_miktar_secenekleri"));
	
	$("#arttir").on('click', function(){
		var miktar = parseInt($("#urun_miktar_secenekleri").val()) +1;
		$("#urun_miktar_secenekleri").val(miktar);
	});
	
	$("#azalt").on('click', function(){
		var miktar = parseInt($("#urun_miktar_secenekleri").val()) -1;
		if (miktar < 1){var miktar = 1;}else{var miktar = miktar;}
		$("#urun_miktar_secenekleri").val(miktar);
	});
	
	$(".urun_detay_orta .urun_fiyat + .urun_ikonlar img").each(function(){
		if ($(this).attr("alt") == "Ayn� G�n Kargo") {
			$(this).addClass("aynigunkargo");
		}else if($(this).attr("alt") == "Kargo Bedava" ) {
			$(this).addClass("kargobedava");
		}else {
			$(this).addClass("kritikstok");
		};
	});
	
	$('<i class="la la-archive"></i>').insertBefore(".kritikstok");
	$('<i class="la la-truck"></i>').insertBefore(".kargobedava");
	$('<i class="la la-clock-o"></i>').insertBefore(".aynigunkargo");
	$(".urun_temin_suresi").prepend('<i class="la la-calendar-check-o"></i>');
	
	$(".urun_sepete_ekle").append('<div class="sepete_ekle_adet_virt"><table></table></div>')
	$(".miktar_hatali").parent().prependTo(".sepete_ekle_adet_virt table");
	$(".oklar").parent().parent().prependTo(".sepete_ekle_adet_virt table");


	$('#PM_urun_detayi div.urun_detay_orta div.urun_fiyat').prepend('<div class="indirimliler"><div class="indirimli_hizala"></div></div><div class="indirimsizler"><div class="indirimsiz_hizala"></div></div><div class="indirimliler_gelsin"></div>');
	if ($('.urun_havale_fiyati').length > 0) {
		$('.indirimliler_gelsin').append('<div>Havale fiyat� : <div class="havale_hizala"></div></div>');
	}
	if ($('.urun_tekcekim_fiyati').length > 0) {
		$('.indirimliler_gelsin').append('<div>Kredi kart� tek �ekim : <div class="tekcekim_hizala"></div></div>');
	}
	
	if ($('.urun_detay_orta .urun_kdvdahil_fiyati').length > 0) {
		$('#PM_urun_detayi div.urun_detay_orta div.urun_fiyat .urun_kdvdahil_fiyati').append('<div class="kdvdahil_hizala"></div>').insertBefore('.indirimliler');
		$('.indirimliler').addClass("indirimli_yeni").insertBefore('.urun_fiyat .indirimsizler');
	}
	
	$('#PM_urun_detayi div.urun_detay_orta div.urun_fiyat .indirimsiz_urun_fiyati').insertBefore('.indirimsiz_hizala');
	$('#PM_urun_detayi div.urun_detay_orta div.urun_fiyat .urun_fiyati').insertBefore('.indirimli_hizala');
	$('#PM_urun_detayi div.urun_detay_orta div.urun_fiyat .urun_havale_fiyati').insertBefore('.havale_hizala');
	$('#PM_urun_detayi div.urun_detay_orta div.urun_fiyat .urun_tekcekim_fiyati').insertBefore('.tekcekim_hizala');
	$('#PM_urun_detayi div.urun_detay_orta div.urun_fiyat table td.urun_indirimli_kampanya_yazisi div.urun_indirimli_kampanya_yazisi_icerik').insertBefore('#PM_urun_detayi div.urun_detay_orta div.urun_fiyat div.indirimliler_gelsin');
	$('#PM_urun_detayi div.urun_detay_orta div.urun_fiyat table td div.kazanciniz').insertAfter('#PM_urun_detayi div.urun_detay_orta div.urun_fiyat div.indirimsiz_urun_fiyati');

	if($(".uye_indirimli_urun_fiyati").length > 0){
		$('#PM_urun_detayi div.urun_detay_orta div.urun_fiyat .urun_fiyati').addClass("urun_fiyati_ozel");
		$('#PM_urun_detayi div.urun_detay_orta div.urun_fiyat .indirimsiz_urun_fiyati').remove();
		$('#PM_urun_detayi div.urun_detay_orta div.urun_fiyat .uye_indirimli_urun_fiyati').insertBefore('.indirimliler');
	}

	if($(".fiyat_gorme_yetkim_yok").length > 0){
		$('#PM_urun_detayi div.urun_detay_orta div.urun_fiyat .fiyat_gorme_yetkim_yok').insertBefore('.indirimliler');
	}	
	
	if($(".urun_fiyati_yok").length > 0){
		$('#PM_urun_detayi div.urun_detay_orta div.urun_fiyat .urun_fiyati_yok').insertBefore('.indirimliler');
	}
	
	$('#PM_urun_detayi div.urun_detay_orta div.urun_fiyat table').remove();
	
	if($(".urun_secenekleri td").text() == ''){
		$(".urun_secenekleri").hide();
	}

	$("div.yorumlar").quickPagination({pageSize:"3"});
	
	$(".link_4").on('click', function(){
		$(".yorumlar_bilgi").css("top","auto").css("position","absolute");
		var offset_bottom = ($("body").height() - ($(".urun_detay_tablar").offset().top + $(".urun_detay_tablar").height()));
		$.lockfixed(".yorumlar_bilgi",{offset: {top: 20, bottom: offset_bottom + 20}});
	});
	
	$('.kampanya_urun img').removeAttr("align","").parent("a").attr("display","block").css("float","left").css("margin-right","10px");
	$('.urun_kampanyalari').append('<div class="kampanya_urunleri"></div>');
	$(".kampanya_urun").each(function(){
		$(this).appendTo(".kampanya_urunleri");
	});
	
	$('.kampanya_urunleri > .kampanya_urun').each(function(i) {
		if( i % 3 == 0 ) {
			$(this).nextAll().addBack().slice(0,3).wrapAll('<div class="kampanya_urunleri_row"></div>');
		}
	});	

	$(".banka_taksit_secenkeleri .PM_clear").remove();
	$(".banka_taksit_secenkeleri").append('<div class="banka_taksitleri"></div>');
	$(".haber_ver").insertAfter(".haber_ver_yazi");
	$(".banka_taksitler").each(function(){
		var banka_taksit_id = $(this).attr("id");
		$(".banka_taksitleri").append('<div class="virt_banka_taksitler virt_' + banka_taksit_id + '"></div>')
		$(this).appendTo(".virt_" + banka_taksit_id);
	});	
	
	$('.banka_taksitleri > .virt_banka_taksitler').each(function(i) {
		if( i % 4 == 0 ) {
			$(this).nextAll().addBack().slice(0,4).wrapAll('<div class="banka_taksitleri_row"></div>');
		}
	});
	
	$("#PM_urun_detayi div.urun_detay_orta div.urun_fiyat table td.baslik").each(function(){
		if ($(this).html().indexOf("�ndirimli") > -1) $(this).html($(this).html().replace(/\(.*\)/gi,"")); 
	})
	
	$(".banka_taksitleri").append('<div style="clear:both;"></div>');
	
	$(".urun_taksit_secenekleri_kisa a").attr("href","javascript:void(0);");
	
	$(".urun_ekstra_butonlar ul a.link_1").parent().remove();
	$(".urun_ekstra_butonlar ul a.link_2").parent().remove();
	$(".urun_ekstra_butonlar ul a.link_4").parent().remove();
	$(".urun_ekstra_butonlar ul a.link_5").parent().remove();
	$(".urun_ekstra_butonlar ul a.link_6").parent().remove();
	$(".urun_ekstra_butonlar ul a.link_7").parent().remove();
	
	$(".urun_ekstra_butonlar ul a.link_1").prepend("<i class='la la-phone'></i>");
	$(".urun_ekstra_butonlar ul a.link_2").prepend("<i class='la la-bars'></i>");
	$(".urun_ekstra_butonlar ul a.link_3").prepend("<i class='la la-heart-o'></i>");
	$(".urun_ekstra_butonlar ul a.link_4").prepend("<i class='fa fa-bell-o'></i>");
	$(".urun_ekstra_butonlar ul a.link_5").prepend("<i class='fa fa-thumbs-o-up'></i>");
	$(".urun_ekstra_butonlar ul a.link_6").prepend("<i class='fa fa-comment-o'></i>");
	$("div.stoktaki_benzer_urunler p.stoktaki_benzer_urunler_baslik").prepend('<i class="la la-refresh"></i>');

	$(".urun_ekstra_butonlar ul a.link_3").parent().appendTo(".urun_detay_orta .urun_sepete_ekle");
		
	$.each($(".stoktaki_benzer_urunler_icerik div.urun"), function(index) { 
		
		$(this).find(".urun_ikonlar").find("a").find("img").each(function(){
			$(this).parent("a").addClass($(this).attr("class") + "_a");
		});	
		
	});
	

	
	if ($(".urun_resmi_kucuk").length != 0) $(".urun_resmi_kucuk").slideByMouse({scanOffset: 50});
	
	
	if($("ul.urun_detay_tablar_ul li a.link_6").length > 0){
		$(".urun_fiyati_yok span").remove();
		$(".urun_fiyati_yok").append('<a href="javascript:void(0);">Teklif �stemek ��in T�klay�n�z</a>');
	}
	$(".urun_fiyati_yok a").on('click', function(){
		$(".urun_detay_tablar_ul li").removeClass("active");
		$(".tab_container .tab_content").css("display","none");
		$(".urun_detay_tablar_ul .link_6").parent("li").addClass("active");
		$("#urun_detay_tab6").css("display","block");
		window.scroll({
		  top: $(".urun_detay_tablar_ul").offset().top,
		  left: 0,
		  behavior: 'smooth' 
		});
	});
	
	$("#PM_urun_detayi div.urun_detay_orta > div.urun_ikonlar, .urun_ekstra_butonlar").wrapAll('<div class="detay_bottom"></div>');
	$(".detay_bottom").insertAfter("#PM_urun_detayi div.urun_detay_orta");
	$(".urun_detay_sag").remove();
	$("#PM_urun_detayi h1.urun_ismi, .d_toplayici, #PM_urun_detayi div.urun_detay_orta, .detay_bottom").wrapAll('<div class="detay_sag">');
	$(".urun_ekstra_butonlar li").appendTo(".detay_bottom .urun_ikonlar");
	$(".detay_bottom .urun_ikonlar .PM_Clear").remove();
	$(".urun_ekstra_butonlar").remove();
	
	
	
	$(".detay_bottom .urun_ikonlar").find("img").remove();
	
});

PM.OnPage("uye_giris",function(){
	$(".bannerline").append('<h1 class="baslik">�ye Giri�i</h1>');
	$(".uye_giris table tr td").eq(1).remove();
	$(".uye_giris table tr td").eq(3).remove();
	$(".uye_giris table tr td").eq(1).css("clear","both");
	$(".uye_giris table tr td").eq(3).css("clear","both");
	$("<h3>�ye Kay�t</h3>").prependTo(".uye_kayit");
	$(".uye_giris table tr td").eq(4).remove();
	$(".uye_giris table tr td").eq(5).remove();
	$(".sifremi_unuttum").appendTo("#uye_giris_frm");
	$("#uye_giris_submit").prependTo(".sifremi_unuttum");
});

PM.OnPage(["uye_kayit", "uye_bilgileri", "sifre_degistir"], function(){

	$("#uye_kayit #uye_kayit_form1 table tbody tr td").eq(2).attr("style","margin-left:-7px;clear:both;margin-top:10px;");
	$("#uye_kayit #uye_kayit_form1 table tbody tr td[width='5']").remove();
	
	$("#uye_bilgileri_form1 table tbody tr td[width='5']").remove();
	$("#uye_bilgileri_form2 table tbody tr td[width='5']").remove();
	$("#sifre_degistirme_form1 table tbody tr td[width='5']").remove();
	
	$("#uye_kayit #uye_kayit_form2 table tbody tr td[width='5']").remove();
	$("#uye_kayit #uye_kayit_form3 table tbody tr td[width='5']").remove();
	$("#uye_kayit #uye_kayit_form1 table tbody tr td[width='150']").css("margin-top","10px");
	$("#uye_kayit #uye_kayit_form2 table tbody tr td[width='150']").css("margin-top","10px");
	$("#uye_kayit #uye_kayit_form3 table tbody tr td[width='150']").css("margin-top","10px");
	
	$("#uye_kayit_form4").appendTo("#uye_kayit_form3");
	$("#uye_kayit_buton").appendTo("#uye_kayit_form3");
	
});

PM.OnPage("pc_topla",function(){
	$(".toplam_fiyatlar").insertBefore(".butonlar");
	$(".pc_topla_sepete_ekle").insertAfter(".toplam_fiyatlar");
	$("#pc_topla_yazdir_btn").text("Yazd�r");
	$("#pc_topla_excell_btn").text("�ndir");

	if($(".pc_topla_sag").height() < $(".pc_topla_sol").height() && $(".pc_topla_sag").height() < $(window).height()){
		var offset_bottom = ($("body").height() - ($(".pc_topla_orta").offset().top + $(".pc_topla_orta").height()));
		$.lockfixed(".pc_topla_sag",{offset: {top: 20, bottom: offset_bottom - 15}});
	}
});

PM.OnPage("musteri_hizmetleri",function(){
	if($("#PM_musteri_hizmetleri_menu").height() < $("#PM_musteri_hizmetleri_menu").next().height() && $("#PM_musteri_hizmetleri_menu").height() < $(window).height()){
		var offset_bottom = ($("body").height() - ($("#PM_musteri_hizmetleri_menu").next().offset().top + $("#PM_musteri_hizmetleri_menu").next().height()));
		$.lockfixed("#PM_musteri_hizmetleri_menu",{offset: {top: 20, bottom: offset_bottom - 15}});
	}
	
	$("#PM_Musteri_Hizmetleri_Menu_UL span.home").prepend("<i class='fa fa-user-o'></i>");
	$("#PM_Musteri_Hizmetleri_Menu_UL span.about").prepend("<i class='fa fa-address-book-o'></i>");
	$("#PM_Musteri_Hizmetleri_Menu_UL span.contact").prepend("<i class='fa fa-envelope-o'></i>");
	$("#PM_Musteri_Hizmetleri_Menu_UL span.bank").prepend("<i class='fa fa-clone'></i>");
	$("#PM_Musteri_Hizmetleri_Menu_UL span.kvkk").prepend("<i class='fa fa-file-text-o'></i>");
	$(".expandable-hitarea, .collapsable-hitarea").prepend('<i class="fa fa-caret-right"></i>');
});

PM.OnPage(["order_step_1" ,"order_step_2", "order_step_3"], function(){
	$("table tbody tr td[width='5']").remove();
	
	$(".gizlilik_politikasi").find("input").on("change", function(){
		$(this).parent(".gizlilik_politikasi").removeClass("secili_false").removeClass("secili_true");
		var check_val = "secili_" + $(this).attr("checked");
		$(this).parent(".gizlilik_politikasi").addClass(check_val);
	});	
	
	
	PM.OnPage("order_step_1",function(){
		$(".siparis_sayfasi_adimlar").append('<div class="list-group"><a href="/alisveris-sepetim" class="first list-group-item done"><h1 class="la la-shopping-cart"></h1><p>Al��veris Sepetim</p></a><a href="javascript:void(0);" class="list-group-item active"><h1 class="la la-file-text"></h1><p>�ye, Teslimat ve Fatura</p></a><a href="javascript:void(0);" class="list-group-item"><h1 class="la la-truck"></h1><p>Kargo ve �deme Se�imi</p></a><a href="javascript:void(0);" class="last list-group-item"><h1 class="la la-check-circle"></h1><p>Sipari� Onay�</p></a></div>');	
	});
	
	PM.OnPage("order_step_2",function(){
		$(".siparis_sayfasi_adimlar").append('<div class="list-group"><a href="/alisveris-sepetim" class="first list-group-item done"><h1 class="la la-shopping-cart"></h1><p>Al��veris Sepetim</p></a><a href="/uye-teslimat-ve-fatura-bilgileri?sid='+ PM_sid +'" class="list-group-item done"><h1 class="la la-file-text"></h1><p>�ye, Teslimat ve Fatura</p></a><a href="javascript:void(0);" class="list-group-item active"><h1 class="la la-truck"></h1><p>Kargo ve �deme Se�imi</p></a><a href="javascript:void(0);" class="last list-group-item"><h1 class="la la-check-circle"></h1><p>Sipari� Onay�</p></a></div>');	
		$(".son_tutar_div").prependTo(".sonraki_adim_div");
		$(".sonraki_adim_div").append('<div style="clear:both;" />');
		
		$.each( $(".tab_content table") , function( i, val ){
			if($(this).find("tbody").find("tr").length == 1){
				$(this).find("tbody").find("tr").addClass("tek_secenek");
			}
		});
		
		$(".banka_taksit_secenekleri").after('<div style="clear:both;" />');
		$("#taksit_seceneklerim_icerik_kredi_karti_select").attr("size","10");
		
		$(".taksit_seceneklerim_icerik_taksit_sayisi").prepend('<div class="kredi_karti_taksit_tabs_sections"></div>')
		$(".banka_taksit_secenekleri").after('<div style="clear:both;"></div>')
		
		$.each( $("#taksit_seceneklerim_icerik_kredi_karti_select option") , function( i, val ){
			var aktif_taksit_bankasi = "";
			if($(this).selected()){var aktif_taksit_bankasi = " active";}
			
			$(".kredi_karti_taksit_tabs_sections").append('<div class="'+ aktif_taksit_bankasi + '"><a href="javascript:void(0);" data-bank-index="'+ i +'"><img src="' + $(this).attr("data-image-src") + '" /><span>' + $(this).text().replace(/\s*\(.*\)/i, "") + '</span></a></div>')
		});
		
		$('.kredi_karti_taksit_tabs_sections > div').each(function(i) {
			if( i % 7 == 0 ) {
				$(this).nextAll().addBack().slice(0,7).wrapAll('<div class="taksit_banka_row"></div>');
			}
		});	
		
		$(".kredi_karti_taksit_tabs_sections a").on('click', function(){
			if(!$(this).parent().hasClass("active")){
				$("#taksit_seceneklerim_icerik_kredi_karti_select option").eq($(this).attr("data-bank-index")).prop('selected', true).trigger("change");
				$(".taksit_banka_row").find("div").removeClass("active");
				$(this).parent("div").addClass("active");
			}
		});
	});
	
	PM.OnPage("order_step_3",function(){
		
		$(".siparis_sayfasi_adimlar").append('<div class="list-group"><a href="/alisveris-sepetim" class="list-group-item done"><h1 class="la la-shopping-cart"></h1><p>Al��veris Sepetim</p></a><a href="/uye-teslimat-ve-fatura-bilgileri?sid='+ PM_sid +'" class="list-group-item done"><h1 class="la la-file-text"></h1><p>�ye, Teslimat ve Fatura</p></a><a href="/kargo-ve-odeme-secenekleri?sid='+ PM_sid +'" class="list-group-item done"><h1 class="la la-truck"></h1><p>Kargo ve �deme Se�imi</p></a><a href="javascript:void(0);" class="list-group-item active last"><h1 class="la la-check-circle"></h1><p>Sipari� Onay�</p></a></div>');	
		$('.siparis_onayi_sepet_bilgilerim, .siparis_onayi_adres_bilgilerim').wrapAll('<div class="siparis_onayi_first_table"><div class="siparis_onayi_first_row" /></div>'); 
		$(".siparis_onayi_odeme_bilgilerim_icerik_havale_banka_logo img").attr("align","right").css("margin-left","10px").height("20px").appendTo($("tr.odeme_tipi td.deger"));
		$(".siparis_onayi_odeme_bilgilerim_icerik_kk_taksitli_banka_logo img").attr("align","right").css("margin-left","10px").height("20px").appendTo($("tr.odeme_tipi td.deger"));
		$(".vade_farki_aciklama").hide();
		if($(".vade_farki_aciklama").length != 0){
			$(".siparis_onayi_odeme_bilgilerim_icerik_kk_taksitli_banka_bilgileri").append('<div class="fade_farki_aciklama"><i class="fa fa-info-circle"></i> ' + $(".vade_farki_aciklama").text() + '</div>');
		}
	});
});

PM.OnPage("siparis_sonu",function(){
	$("#PM_siparis_sonu div.siparis_sayfasi_icerik ul li:eq(0)").prepend('<i class="la la-caret-square-o-left"></i>');
	$("#PM_siparis_sonu div.siparis_sayfasi_icerik ul li:eq(1)").prepend('<i class="la la-user"></i>');
	$("#PM_siparis_sonu div.siparis_sayfasi_icerik ul li:eq(2)").prepend('<i class="la la-exclamation-circle"></i>');
});

PM.on("before.init.platinmarket", function(){


	$("#PopupMenu1").on("click",function(e){
		e.stopPropagation();
	}); 

	$(document).on("click",function(e){
		$("#PopupMenu1").hide();
	});

	$(".menum").on('click', function(e){
		$("#PopupMenu1").toggle();
		e.stopPropagation();
    });

	$(".sepet_oneriler_bu_urunleri_gordunuzmu_baslik").text("�NER�LEN �R�NLER");
	
	$("#ust_ek_menu_2").prepend($(".tum_kategoriler"));

	$(function(){$.fn.scrollToTop=function(){$(this).hide().removeAttr("href");if($(window).scrollTop()!="0"){$(this).fadeIn("slow")}var scrollDiv=$(this);$(window).on('scroll', function(){if($(window).scrollTop()=="0"){$(scrollDiv).fadeOut("slow")}else{$(scrollDiv).fadeIn("slow")}});$(this).on('click', function(){$("html, body").animate({scrollTop:0},"slow")})}});
	$(function(){$("#toTop").scrollToTop();});

	$(window).on('scroll', function(){
		if($(this).scrollTop() > 160) {
			$(".ucan_header").slideDown('fast');
		}else{
			
			$(".ucan_header").slideUp('fast');
		}
	});

	$("#PM_orta div.urun .urun_stok_yok").each(function(){ 
		if ($(this).length = 1) {
			$(this).parent().parent().addClass("removehover");
		}	
	});

	$(".acilirmenu > ul > li").each(function(){
		var $menu_li = $(this);
		if ($menu_li.children("ul").length > 0)
		$menu_li.children("a").append("<div class='arrow_down fa fa-angle-down'></div>"); 
	});

	$(".acilirmenu > ul > li > ul > li").each(function(){
		var $menu_li = $(this);
		if ($menu_li.children("ul").length > 0)
		$menu_li.children("a").append("<div class='arrow_right fa fa-angle-right'></div>"); 
	});

	$("#PM_orta div.urun div.indirimli_urun").each(function(){ $(this).html($(this).html().replace(/,.*/gi, "")); });

	if($(".uyelikisim2").length == 1){
		$(".uyelikisim1").remove();
	}

	$(".urunler .icerik .urun").each(function(){ 
		if ($(this).width() < 150) 
		$(this).find(".urun_butonlar").addClass("block_button"); 
	});

	$(".PM_cerceveli_modul .urun .urun_butonlar").addClass("block_button"); 


	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
	 $("#PM_ust").css("width","1200px");
	 $("#PM_alt").css("width","1180px");
	}
	$("#ust_ek_menu_3").prependTo(".row4");

	$(".kategori_urunleri_kategori_agaci").appendTo(".bannerline");
	$(".urun_detay_kategori_agaci").appendTo(".bannerline");

	
	$("#PM_musteri_hizmetleri h1.baslik, #siparis_takibi h1.baslik, #PM_yeni_urunler h1.baslik, #PM_indirimli_urunler h1.baslik, #PM_arama_urunleri h1.baslik, #sepet_detay h1.baslik, #siparislerim h1.baslik, #siparis_detayi h1.baslik, #pc_topla h1.baslik, #uye_kayit h1.baslik, #uye_bilgileri h1.baslik, #sifre_degistirme h1.baslik, #PM_haber_detayi div.haber_detay h1.baslik, #PM_haber_detayi div.diger_haberler p.baslik, #PM_link_detayi div.link_detay h1.baslik, #PM_link_detayi div.diger_linkler p.baslik, #PM_anket_sonuclari div.anket_sonuclari h1.baslik, #PM_anket_sonuclari div.diger_anketler p.baslik , #bildirim_listesi h1.baslik, #alisveris_listesi h1.baslik, #fiyat_alarm_listesi h1.baslik, #kiyaslama_listesi h1.baslik, #stok_alarm_listesi h1.baslik, #puanlarim h1.baslik, #ceklerim h1.baslik, #takip h1.baslik, #adres_bilgileri h1.baslik").appendTo(".bannerline");	
	$("#puanlarim .tablo_1 th").slice(3,6).css("width","130px");

	$.each($(".yeni_urun_ikon"), function(index) { 
	  $(this).appendTo($(this).parent().parent().parent().parent().parent().find(".ikonlar"));
	});

	$(".pm_telif").appendTo("body");
	
	$(".bannerline").insertAfter("#PM_ust");
	$("#kayan_yazi_alani").insertAfter(".bannerline");
});

PM.OnPage(["ana_sayfa", "urunler", "arama_sonuclari", "indirimli_urunler", "yeni_urunler", "tag"], function(){

	$(window).on('load', function(){
		$("div.urun_butonlar").each(function(){
			$(this).css("width", $(this).parent("div").parent("div.urun").innerWidth() + "px");
		});
		
		var checkDisplay = setInterval(function(){	

			var totalCheckCount = $(".st_tab_view").length;
			
			$(".st_tab_view").each(function(){
				if ($(this).css("display") != "none") {
					$(this).find("div.urun_butonlar").each(function(){
						$(this).css("width", $(this).parent("div").parent("div.urun").innerWidth() + "px");
					});
					$(this).addClass("width_ok");
				}
			});
			
			if ($(".st_tab_view.width_ok").length >= totalCheckCount && totalCheckCount != 0){
				clearTimeout(checkDisplay);
			}

		},500);

		tanitim_yazisi_goster();
	
	});
});

$(function() {
	$("body").addClass("render");
});

$(window).on('error', function(e){
	console.log(e);
	e.preventDefault();
	$("body").addClass("render");
});  

window.onerror = function(){
	console.log(arguments);
	return true;
	$("body").addClass("render");
}