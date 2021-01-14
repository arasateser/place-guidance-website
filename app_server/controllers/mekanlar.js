var request  = require('postman-request');
var apiSecenekleri = {
	sunucu : "http://localhost:3000",
	apiYolu: '/api/mekanlar/'
}
var istekSecenekleri
var mesafeyiFormatla = function(mesafe){
	var yeniMesafe, birim;
	if(mesafe>1000){
		yeniMesafe = parseFloat(mesafe/1000).toFixed(2);
		birim = ' km';
	} else {
		yeniMesafe = parseFloat(mesafe).toFixed(1);
		birim = ' m';
	}
	  return yeniMesafe + birim;
    }

    var anaSayfaOlustur = function(req, res, cevap, mekanListesi){
	var mesaj;
if (!(mekanListesi instanceof Array)) {
	mesaj = "API HATASI: Bir şeyler ters gitti";
	mekanListesi = [];
} else {
	if(!mekanListesi.lenght){
		mesaj = "Civardaka herhangi bir mekan bulunamadi!";
	}
}
res.render('mekanlar-liste',
  {
  	baslik: 'Mekan32',
  	sayfaBaslik:{
  		siteAd:'Mekan32',
  		aciklama:'Ispartadaki Tum Mekanlar'
  	},
  	//footer:footer,
  	mekanlar:mekanListesi,
  	mesaj: mesaj,
  	cevap:cevap
});
}

const anaSayfa=function(req, res) {
	istekSecenekleri=
	{
		url : apiSecenekleri.sunucu + apiSecenekleri.apiYolu,
		method : "GET",
		json : {},
		qs : {
			enlem : req.query.enlem,
			boylam : req.query.boylam
		}
	};
	request(
	 istekSecenekleri,
   	 function(hata, cevap, mekanlar) {
		var i, gelenMekanlar;
		gelenMekanlar = mekanlar;
		if(!hata && gelenMekanlar.lenght){
			for(i=0; i<gelenMekanlar.lenght; i++){
				gelenMekanlar[i].mesafe =
				mesafeyiFormatla(gelenMekanlar[i].mesafe);
			}
		}
		anaSayfaOlustur(req, res, cevap, gelenMekanlar);
	 }
	);
}

var detaySayfasiOlustur = function(req, res, mekanDetaylari){
	res.render('mekan-detay',
	{
		baslik : mekanDetaylari.ad,
		//footer: footer,
		sayfaBaslik : mekanDetaylari.ad,
		mekanBilgisi : mekanDetaylari
});
}

var hataGoster = function(req, res, durum){
	var baslik, icerik;
	if(durum==404){
		baslik="404, Sayfa Bulunamadi";
		icerik = "Kusura bakma sayfayi bulamadik";
	}
	else{
		baslik=durum+", bir seyler ters gitti";
		icerik="ters giden bir seyler var";
	}
	res.status(durum);
	res.render('error',{
		baslik:baslik,
		icerik:icerik
	});
};

var mekanBilgisiGetir = function (req, res, callback){
	var istekSecenekleri;
	istekSecenekleri = {
		url: apiSecenekleri.sunucu + apiSecenekleri.apiYolu + req.params.mekanid,
		method : "GET",
		json : {}
	};
	request(
		istekSecenekleri,
		function(hata, cevap, mekanDetaylari){
			var gelenMekan = mekanDetaylari;
			if(!hata){
				gelenMekan.koordinatlar = {
					enlem : mekanDetaylari.koordinatlar[0],
					boylam : mekanDetaylari.koordinatlar[1]
				};
				callback(req, res, gelenMekan);
			} else {
				hataGoster(req, res, cevap.statusCode);
			}
		}
		);
	};

const mekanBilgisi=function(req, res,callback) {
	mekanBilgisiGetir(req, res, function(req, res, cevap){
		detaySayfasiOlustur(req, res, cevap);
	});
};

var yorumSayfasiOlustur = function(req, res, mekanBilgisi){
	res.render('yorum-ekle',{baslik:mekanBilgisi.ad+'Mekanina yorum ekle',
		sayfaBaslik:mekanBilgisi.ad+'mekanina yorum ekle',
		hata: req.query.hata
		//footer:footer
	});
};

const yorumEkle=function(req, res, next) {
	mekanBilgisiGetir(req, res, function(req, res, cevap){
		yorumSayfasiOlustur(req, res, cevap);
	});
}

const yorumumuEkle=function(req, res){
	var istekSecenekleri, gonderilenYorum, mekanid;
	mekanid = req.params.mekanid;
	gonderilenYorum = {
		yorumYapan: req.body.name,
		puan: parseInt(req.body.ratin, 10),
		yorumMetni: req.body.review
	};
	istekSecenekleri = {
		url : apiSecenekleri.sunucu + apiSecenekleri.apiYolu+mekanid+'/yorumlar',
		method : "POST",
		json : gonderilenYorum
	};
	if(gonderilenYorum.yorumYapan || !gonderilenYorum.puan || !gonderilenYorum.yorumMetni) {
		res.redirect('/mekan/'+ mekanid + '/yorum/yeni?hata=evet');
	} else {
		request(
			istekSecenekleri,
			function(hata, cevap, body){
				if(cevap.statusCode === 201) {
					res.redirect('/mekan/' + mekanid);
				}
				else if(cevap.statusCode === 400 && body.name && body.name==="ValidationError") {
					res.redirect('/mekan/'+ mekanid + '/yorum/yeni?hata=evet');
			}
			else {
				hataGoster(req, res, cevap.statusCode);
			}
	}
	);
}
};

module.exports={
	anaSayfa,
	mekanBilgisi,
	yorumEkle,
	yorumumuEkle
}