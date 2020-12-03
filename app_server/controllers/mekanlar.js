const anaSayfa=function(req, res, next) {
  res.render('mekanlar-liste', 
  	{ 
  		'baslik': 'Anasayfa',
      'footer':'Aras Ateşer',
  	  'sayfaBaslik':{
  		'siteAd':'Mekan32',
  		'aciklama':'Tekirdag daki Tum Dukkanlar!'
  	},
  	'mekanlar':[
  	{
  	  'ad':'Ekkim',
  	  'adres':'Sanayi Sitesi Şarap Fabrikası Yolu No:63',
  	  'puan':5,
  	  'imkanlar':['yapi','malzeme','baba'],
  	  'mesafe':'1km'
  	},
  	{
  	  'ad':'Saras',
  	  'adres':'Sanayi Sitesi Şarap Fabrikası Yolu No:63',
  	  'puan':4,
  	  'imkanlar':['yapi','malzeme','baba'],
  	  'mesafe':'2km'
  	},
  	{
  	  'ad':'Uzay',
  	  'adres':'Sanayi Sitesi Şarap Fabrikası Yolu No:63',
  	  'puan':3,
  	  'imkanlar':['yapi','malzeme','baba'],
  	  'mesafe':'3km'
  	},
  	{
  	  'ad':'Salcano',
  	  'adres':'Sanayi Sitesi Şarap Fabrikası Yolu No:63',
  	  'puan':2,
  	  'imkanlar':['yapi','malzeme','baba'],
  	  'mesafe':'4km'
  	},
  	{
  	  'ad':'Sporcum',
  	  'adres':'Sanayi Sitesi Şarap Fabrikası Yolu No:63',
  	  'puan':5,
  	  'imkanlar':['yapi','malzeme','baba'],
  	  'mesafe':'5km'
  	},
  	]
  }
  );
}

const mekanBilgisi=function(req, res) {
  res.render('mekan-detay',{ 
  	'baslik':'Mekan Bilgisi',
  	'sayfaBaslik':'Ekkim',
    'footer':'Aras Ateşer',
  	'mekanBilgisi':{
      'ad':'Ekkim',
  	  'adres':'Sanayi Sitesi Şarap Fabrikası Yolu No:63',
  	  'puan':5,
  	  'imkanlar':['yapi', 'malzeme', 'baba'],
  	  'koordinatlar':{
  	  	'enlem':54.68023,
  	  	'boylam':25.28025
  	  },
  	  'saatler':[
        {
      	 'gunler':'Pazartesi-Cuma',
      	 'acilis':'5:00',
      	 'kapanis':'22:00',
      	 'kapali':false
        },
        {
      	 'gunler':'Pazar',
         'kapali':true
        }
  	  ],
  	  'yorumlar':[
  	    {
  	  	'yorumYapan': 'Aras Ateser',
  	  	'puan':5,
  	  	'tarih': '1 Aralik 2020',
  	  	'yorumMetni':'Harika'
  	    }
  	 ]
  	}
  });
}

const yorumEkle=function(req, res, next) {
  res.render('yorum-ekle', { title: 'Yorum Ekle',
                            'footer':'Aras Ateşer', });
}

module.exports={
	anaSayfa,
	mekanBilgisi,
	yorumEkle
}