/* Aran Lokantası – ortak çeviri ve yardımcılar (menü sayfası ve panel kullanır).
   Panelde bir ürünün "İngilizce adı" doldurulursa o kullanılır; boşsa buradaki karşılık kullanılır. */
(function(){
  var C = {};

  // Kategori adları
  C.kategori = {
    'Çorbalar': 'Soups',
    'Yemekler': 'Main Dishes',
    'Pilavlar': 'Rice & Bulgur',
    'Piyazlar': 'Bean Salads (Piyaz)',
    'Izgaralar': 'Grills',
    'Salata ve Mezeler': 'Salads & Starters',
    'Tatlılar': 'Desserts',
    'İçecekler': 'Drinks'
  };

  // Ürün adları
  C.urun = {
    'Mercimek Çorbası': 'Red Lentil Soup',
    'Tavuk Çorbası': 'Chicken Soup',
    'Tas Kebap': 'Tas Kebab (Beef Stew)',
    'Tavuk Haşlama': 'Poached Chicken with Vegetables',
    'Salçalı Köfte': 'Meatballs in Tomato Sauce',
    'Tavuk Sote': 'Chicken Sauté',
    'Yoğurtlu Köfte': 'Meatballs with Yogurt',
    'Patlıcan Musakka': 'Eggplant Moussaka',
    'Kuru Fasülye': 'White Bean Stew',
    'Kuru Fasulye': 'White Bean Stew',
    'Nohut': 'Chickpea Stew',
    'Yoğurtlu Kızartma': 'Fried Vegetables with Yogurt',
    'Bamya': 'Okra Stew',
    'Biber Dolma': 'Stuffed Peppers',
    'Göleviz': 'Taro Stew with Meat (Gölevez)',
    'Gölevez': 'Taro Stew with Meat (Gölevez)',
    'Börülce': 'Black-Eyed Pea Stew',
    'Taze Fasülye': 'Green Bean Stew',
    'Taze Fasulye': 'Green Bean Stew',
    'Pirinç Pilavı': 'Rice Pilaf',
    'Bulgur Pilavı': 'Bulgur Pilaf',
    'Yumurtalı Fasülye Piyazı': 'White Bean Salad with Egg',
    'Fasülye Piyazı': 'White Bean Salad',
    'Bakla Piyazı': 'Broad Bean Salad',
    'Izgara Köfte': 'Grilled Meatballs',
    'Şiş Köfte': 'Meatball Skewer',
    'Tavuk Şiş': 'Chicken Shish Kebab',
    'Çoban Salata': "Shepherd's Salad",
    'Cacık': 'Cacık (Yogurt with Cucumber & Garlic)',
    'Yoğurt': 'Plain Yogurt',
    'Tel Kadayıf': 'Kadayıf (Shredded Pastry in Syrup)',
    'Sütlaç': 'Rice Pudding',
    'Kemalpaşa': 'Kemalpaşa (Cheese Dumplings in Syrup)',
    'Kutu Kola': 'Cola (Can)',
    'Şişe Kola': 'Cola (Bottle)',
    'Kola': 'Cola',
    'Fanta': 'Fanta',
    'Niğde Gazozu': 'Niğde Gazoz (Turkish Soda)',
    'Ayran': 'Ayran (Salted Yogurt Drink)',
    'Su': 'Water',
    'Çay': 'Turkish Tea'
  };

  // Gün adları
  C.gun = {
    'Pazartesi':'Monday','Salı':'Tuesday','Çarşamba':'Wednesday','Perşembe':'Thursday',
    'Cuma':'Friday','Cumartesi':'Saturday','Pazar':'Sunday'
  };

  // Menü sayfasındaki yazılar (panelden İngilizceleri değiştirilebilir)
  C.arayuz = {
    tr: {
      anasayfa:'Ana Sayfa', gunun_yemegi:'Günün yemeği', bugun:'Bugün', tukendi:'Tükendi',
      aciklama_gun:'Günün yemeği, sadece o gün pişer.', aciklama_yildiz:'Her gün pişmez, lütfen sorunuz.',
      gun_etiketi:'Gün', paket:'Paket Servis', yol:'Yol Tarifi', yukleniyor:'Menü yükleniyor…',
      hata:'Menü yüklenemedi. Lütfen sayfayı yenileyin.', buyut:'Fotoğrafı büyüt', kapat:'Kapat'
    },
    en: {
      anasayfa:'Home', gunun_yemegi:'Dish of the day', bugun:'Today', tukendi:'Sold out',
      aciklama_gun:'Dish of the day – cooked only on that day.', aciklama_yildiz:'Not cooked every day, please ask.',
      gun_etiketi:'Day', paket:'Takeaway', yol:'Directions', yukleniyor:'Loading menu…',
      hata:'The menu could not be loaded. Please refresh the page.', buyut:'Enlarge photo', kapat:'Close'
    }
  };
  // Panelde düzenlenebilen İngilizce yazılar ve Türkçe açıklamaları
  C.arayuzEtiket = {
    anasayfa:'"Ana Sayfa" butonu', gunun_yemegi:'"Günün yemeği"', bugun:'"Bugün" etiketi', tukendi:'"Tükendi" etiketi',
    aciklama_gun:'Gün etiketi açıklaması', aciklama_yildiz:'* açıklaması', gun_etiketi:'"Gün" kelimesi',
    paket:'"Paket Servis"', yol:'"Yol Tarifi"'
  };

  // İstanbul saatine göre bugünün tarihi (YYYY-MM-DD) ve gün adı
  C.tarih = function(d){
    d = d || new Date();
    try { return new Intl.DateTimeFormat('en-CA',{timeZone:'Europe/Istanbul',year:'numeric',month:'2-digit',day:'2-digit'}).format(d); }
    catch(e){ return d.toISOString().slice(0,10); }
  };
  C.bugunGun = function(){
    var g=['Pazar','Pazartesi','Salı','Çarşamba','Perşembe','Cuma','Cumartesi'];
    try {
      var s=new Intl.DateTimeFormat('tr-TR',{weekday:'long',timeZone:'Europe/Istanbul'}).format(new Date());
      return s.charAt(0).toLocaleUpperCase('tr')+s.slice(1);
    } catch(e){ return g[new Date().getDay()]; }
  };

  // Ziyaret sayacı: her sayfa her oturumda bir kez sayılır. Adres panelden girilir (boşsa sayılmaz).
  C.say = function(sayfa, adres){
    if(!adres || !window.fetch) return;
    try { if(sessionStorage.getItem('aran-sayildi-'+sayfa)) return; sessionStorage.setItem('aran-sayildi-'+sayfa,'1'); } catch(e){}
    var u = adres.replace(/\/+$/,'') + '/ziyaret/' + C.tarih() + '/' + sayfa + '.json';
    fetch(u,{method:'PUT',body:JSON.stringify({'.sv':{'increment':1}})})
      .then(function(r){ if(!r.ok) throw new Error(r.status); })
      .catch(function(){
        fetch(u).then(function(r){ return r.json(); })
          .then(function(v){ return fetch(u,{method:'PUT',body:JSON.stringify((Number(v)||0)+1)}); })
          .catch(function(){});
      });
  };

  window.ARAN = C;
})();
