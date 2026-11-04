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
    'Bezelye': 'Pea Stew',
    'Taze Fasulye': 'Green Bean Stew',
    'Pirinç Pilavı': 'Rice Pilaf',
    'Bulgur Pilavı': 'Bulgur Pilaf',
    'Yumurtalı Fasülye Piyazı': 'White Bean Salad with Egg',
    'Fasülye Piyazı': 'White Bean Salad',
    'Bakla Piyazı': 'Broad Bean Salad',
    'Izgara Köfte': 'Grilled Meatballs',
    'Izgara Köfte Porsiyon': 'Grilled Meatballs (Portion)',
    'Ekmek Arası Köfte': 'Meatball Sandwich',
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
    'Yedigün': 'Yedigün (Orange Soda)',
    'Sade Soda': 'Plain Sparkling Mineral Water',
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

  // Bir ürünün pişme günleri (eski tek gün kaydını da okur), hafta sırasıyla
  C.HAFTA=['Pazartesi','Salı','Çarşamba','Perşembe','Cuma','Cumartesi','Pazar'];
  C.gunler = function(u){
    var l = Array.isArray(u && u.gunler) ? u.gunler : ((u && u.gun) ? [u.gun] : []);
    return C.HAFTA.filter(function(g){ return l.indexOf(g)>=0; });
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

  // WhatsApp bağlantısı (0532…, 532…, +90 532… hepsi kabul edilir)
  C.waLink = function(no, mesaj){
    var d=String(no||'').replace(/\D/g,'');
    if(!d) return '';
    if(d.indexOf('00')===0) d=d.slice(2);
    if(d.charAt(0)==='0') d='90'+d.slice(1);
    else if(d.length===10) d='90'+d;
    return 'https://wa.me/'+d+(mesaj?'?text='+encodeURIComponent(mesaj):'');
  };

  // Haritada aranacak yer
  C.haritaSorgu = function(i){ i=i||{}; return (i.harita||'').trim() || ((i.ad||'Aran Lokantası')+', '+(i.adres||'Alanya')); };

  // Kampanyalar: panelde açık olanlar, bu sayfa seçiliyse ve bitiş tarihi geçmediyse; oturumda bir kez gösterilir.
  C.kampanyaListe = function(site, sayfa){
    var l = (site && site.kampanyalar) || (site && site.kampanya ? [site.kampanya] : []);
    var bugun = C.tarih();
    return l.filter(function(k){ return k && k.aktif && k.foto && k[sayfa]!==false && !(k.bitis && bugun > k.bitis); });
  };
  function gorulduAnahtar(l){ return l.map(function(k){ return k.foto; }).join('|'); }
  C.kampanyaVar = function(site, sayfa){
    var l=C.kampanyaListe(site, sayfa); if(!l.length) return false;
    try{ if(sessionStorage.getItem('aran-kampanya')===gorulduAnahtar(l)) return false; }catch(e){}
    return true;
  };
  C.kampanyaGoster = function(site, kok, ekButon, kapaninca, sayfa){
    var l=C.kampanyaListe(site, sayfa||'anasayfa'), onceki=document.activeElement;
    if(!l.length) return function(){};
    try{ sessionStorage.setItem('aran-kampanya',gorulduAnahtar(l)); }catch(e){}
    var d=document.createElement('div'); d.className='kmp'; d.setAttribute('role','dialog'); d.setAttribute('aria-modal','true'); d.setAttribute('aria-label','Kampanyalar');
    var kutu=document.createElement('div'); kutu.className='kmp-kutu';
    var x=document.createElement('button'); x.type='button'; x.className='kmp-kapat'; x.setAttribute('aria-label','Kapat'); x.innerHTML='&times;';
    var serit=document.createElement('div'); serit.className='kmp-serit'; serit.setAttribute('tabindex','0');
    l.forEach(function(k,i){
      var img=document.createElement('img'); img.alt=k.aciklama||('Kampanya '+(i+1)); img.draggable=false;
      img.src=/^(https?:|data:)/.test(k.foto)?k.foto:(kok||'')+k.foto;
      if(i>0) img.loading='lazy';
      serit.appendChild(img);
    });
    var cerceve=document.createElement('div'); cerceve.className='kmp-cerceve';
    cerceve.appendChild(serit); cerceve.appendChild(x);
    kutu.appendChild(cerceve);
    var noktalar=null;
    if(l.length>1){
      noktalar=document.createElement('div'); noktalar.className='kmp-nokta';
      l.forEach(function(k,i){
        var n=document.createElement('button'); n.type='button'; n.setAttribute('aria-label',(i+1)+'. kampanya');
        n.addEventListener('click',function(){ serit.scrollTo({left:i*serit.clientWidth,behavior:'smooth'}); });
        noktalar.appendChild(n);
      });
      kutu.appendChild(noktalar);
      var guncelle=function(){
        var i=Math.round(serit.scrollLeft/Math.max(1,serit.clientWidth));
        [].forEach.call(noktalar.children,function(n,j){ n.setAttribute('aria-current', j===i?'true':'false'); });
      };
      serit.addEventListener('scroll',guncelle,{passive:true}); guncelle();
      // Bilgisayarda ok tuşlarıyla
      serit.addEventListener('keydown',function(e){
        if(e.key==='ArrowRight'||e.key==='ArrowLeft'){ e.preventDefault(); serit.scrollBy({left:(e.key==='ArrowRight'?1:-1)*serit.clientWidth,behavior:'smooth'}); }
      });
      // Kendiliğinden ilerleme (dokunulunca durur)
      var oto=setInterval(function(){
        if(!d.parentNode){ clearInterval(oto); return; }
        var son=serit.scrollLeft+serit.clientWidth>=serit.scrollWidth-4;
        serit.scrollTo({left:son?0:serit.scrollLeft+serit.clientWidth,behavior:'smooth'});
      },5000);
      ['touchstart','pointerdown','wheel'].forEach(function(t){ serit.addEventListener(t,function(){ clearInterval(oto); },{passive:true}); });
    }
    if(ekButon) kutu.appendChild(ekButon);
    d.appendChild(kutu); document.body.appendChild(d);
    function kapat(){ if(!d.parentNode) return; d.parentNode.removeChild(d); document.removeEventListener('keydown',tus); if(onceki&&onceki.focus) try{onceki.focus({preventScroll:true});}catch(e){} if(kapaninca) kapaninca(); }
    function tus(e){ if(e.key==='Escape') kapat(); }
    x.addEventListener('click',kapat);
    d.addEventListener('click',function(e){ if(e.target===d||e.target===kutu) kapat(); });
    document.addEventListener('keydown',tus);
    setTimeout(function(){ try{ x.focus({preventScroll:true}); }catch(e){} },50);
    return kapat;
  };

  window.ARAN = C;
})();
