# Best Games & Shield - Proje Geliştirme Yol Haritası (60 Görev)

Bu belge, "Best Games & Shield" platformunu en üst düzey modern UI/UX standartlarına taşımak ve zengin özellikler eklemek için hazırlanmış devasa bir "Task" ve özellik listesi içeren bir Prompt/Roadmap dosyasıdır. Yapay zeka veya insan geliştiricilere verilebilir.

## Durum Göstergeleri
- 🟢 **ACTIVE / IN PROGRESS** (Şu an üzerinde çalışılabilecekler)
- 🟡 **PENDING / TODO** (Beklemede olan planlanmış görevler)
- 🔴 **BACKLOG** (İleriye dönük vizyon özellikleri)

---

## Aşama 1: Navigasyon ve Temel UI İyileştirmeleri (Navigation & Core UI)

- [ ] 🟡 **TASK-01:** Yan Menü (Sidebar / Drawer) ekle. Mobilde hamburger ikonuna tıklayınca açılan, kategorileri ve yasal sayfaları içeren modern bir drawer menü yap.
- [ ] 🟡 **TASK-02:** Desktop için üst navigasyon çubuğunu zenginleştir (Oyunlar, Kategoriler, Haberler, İletişim linklerini Header'a ekle).
- [ ] 🟡 **TASK-03:** "Sticky Header" scroll esnasında küçülerek (shrink) daha az alan kaplasın ve blur (glassmorphism) efekti daha pürüzsüz olsun.
- [ ] 🟡 **TASK-04:** Alt Bilgi (Footer) kısmını genişlet, sosyal medya ikonları (Twitter, Discord, Telegram vb.) ekle.
- [ ] 🟡 **TASK-05:** "Başa Dön" (Scroll to Top) butonu ekle, sayfa aşağı kaydırıldığında sağ altta belirsin.
- [ ] 🟡 **TASK-06:** Ekmek Kırıntısı (Breadcrumbs) navigasyonu ekle (Örn: Ana Sayfa > Aksiyon > Free Fire).
- [ ] 🟡 **TASK-07:** Çoklu tema desteği: Karanlık tema haricinde, sistem temasına göre otomatik uyum sağlayan (ve geçiş yapılabilen) aydınlık (Light) tema seçeneği ekle (Toggle butonu ile).

## Aşama 2: Modern UI/UX Mikro Etkileşimler (Micro-Interactions)

- [ ] 🟡 **TASK-08:** Oyun kartlarının üzerine gelindiğinde (hover), kart hafifçe yukarı kalksın ve 3D tilt (paralaks) efekti verilsin.
- [ ] 🟡 **TASK-09:** "İndir" butonlarına basıldığında (click/active) küçük bir "pulse" veya dalgalanma (ripple) animasyonu ekle.
- [ ] 🟡 **TASK-10:** Sayfalar arası geçişlere "Framer Motion" ile pürüzsüz fade-in/slide-up Page Transition animasyonları ekle.
- [ ] 🟡 **TASK-11:** Arama kutusuna yazarken anında sonuç getiren "Autocomplete / Dropdown" arama önerileri listesi (Typeahead) ekle.
- [ ] 🟡 **TASK-12:** Skeleton Loading: Oyunlar yüklenirken dönen ikon yerine oyun kartlarının iskelet (skeleton) yükleme ekranlarını göster.
- [ ] 🟡 **TASK-13:** İmajlar yüklenirken "Blur-up" efekti kullan (önce çok bulanık, yüklenince netleşen resimler).
- [ ] 🟡 **TASK-14:** Butonlar üzerinde hover olunca tooltip'ler (ipucu kutucukları) çıkar.

## Aşama 3: Oyun Detay Sayfası Geliştirmeleri (Game Details)

- [ ] 🟡 **TASK-15:** Oyun detay sayfasında arkaplan resminin üzerine "Parallax Scrolling" efekti ekle (sayfa kaydırıldıkça arkaplan daha yavaş kaysın).
- [ ] 🟡 **TASK-16:** "Ekran Görüntüleri" bölümüne Lightbox (Tam ekran resim görüntüleyici) ekle, resme tıklanınca büyüsün ve kaydırılabilsin.
- [ ] 🟡 **TASK-17:** Youtube veya video fragman (Trailer) desteği ekle. Oyun API'sinden video URL gelirse, hero kısmında veya medya kısmında oynatılabilir video bileşeni çıkar.
- [ ] 🟡 **TASK-18:** "Benzer Oyunlar" (Related Games) yatay kaydırılabilir (carousel) listesi ekle.
- [ ] 🟡 **TASK-19:** Uygulama Sürüm Geçmişi (Version History) sekmesi/modalı ekle, eski sürümlerin indirme linklerini listele.
- [ ] 🟡 **TASK-20:** Kullanıcı yorumları/incelemeleri (Reviews) için statik/fake bir görünüm tasarımı ekle veya ileride backend ile bağlamak üzere UI hazırla.
- [ ] 🟡 **TASK-21:** "Paylaş" (Share) butonu ekle. Tıklandığında Native Share API tetiklensin veya link kopyalama Toast mesajı versin.

## Aşama 4: İndirme Akışı & Bildirimler (Download Flow)

- [ ] 🟡 **TASK-22:** "İndir" butonuna basıldığında anında yönlendirmek yerine, 3-5 saniyelik şık bir "İndirmeniz Başlıyor..." (Countdown) modal ekranı göster.
- [ ] 🟡 **TASK-23:** Toast bildirim sistemi ekle (Örn: "Bağlantı kopyalandı", "Dil değiştirildi", "İndirme başlatıldı").
- [ ] 🟡 **TASK-24:** İndirme sunucuları arası manuel seçim yapabilme yeteneği ekle (Örn: "Mirror 1 (EU)", "Mirror 2 (US)", "Google Play").
- [ ] 🟡 **TASK-25:** QR Kod ile indirme seçeneği ekle (Masaüstünden girenler için oyunu telefona indirmeyi kolaylaştıran QR popup).

## Aşama 5: Kategori ve Filtreleme Sistemi (Advanced Filtering)

- [x] 🟢 **TASK-26:** Kategori (Genre) bazlı filtreleme sayfası (Aksiyon, RPG, Strateji vb.) ekle.
- [x] 🟢 **TASK-27:** Sıralama menüsü ekle: "En Yeniler", "Puana Göre", "İndirme Sayısına Göre", "A-Z" şeklinde Dropdown.
- [ ] 🟡 **TASK-28:** Çoklu dil desteği JSON verisindeki oyun açıklamalarını da çevirecek altyapıya (i18n key veya API dil parametresi) uygun hale getir.
- [ ] 🟡 **TASK-29:** Sadece "Editörün Seçimleri" (Editor's Choice) özel etiketi ve listesi ekle.
- [x] 🟢 **TASK-30:** Grid / List View geçiş (Toggle) butonu ekle. Kullanıcı oyunları yan yana kutular veya alt alta liste olarak görebilsin.
- [x] 🟢 **TASK-31:** Sadece "Offline Oynanabilen Oyunlar" veya "Düşük Boyutlu Oyunlar" gibi hızlı filtreleme hapları (chips/tags) ekle.

## Aşama 6: PWA (Progressive Web App) Özellikleri

- [x] 🟢 **TASK-32:** Manifest.json ekleyerek siteyi PWA (Telefona kurulabilir web uygulaması) haline getir.
- [x] 🟢 **TASK-33:** Servis Çalışanı (Service Worker) ekleyerek siteyi offline önbelleklemeye (caching) al, çevrimdışı girildiğinde özel bir hata sayfası göster.
- [x] 🟢 **TASK-34:** Ana sayfada PWA için "Uygulamayı Ana Ekrana Ekle" (Add to Home Screen) modern popup uyarısı ekle.
- [ ] 🟡 **TASK-35:** Splash Screen (Açılış ekranı) tasarımı ekle.
- [ ] 🟡 **TASK-36:** Push bildirim altyapısı (Firebase vb. entegrasyonu için) UI izin popup'ı ekle.

## Aşama 7: SEO, Performans ve Analitik (SEO & Perf)

- [ ] 🟡 **TASK-37:** React Helmet / Next-SEO benzeri yapı ile her oyun detay sayfası için dinamik `<title>`, `<meta description>` ve OpenGraph etiketleri oluştur.
- [ ] 🟡 **TASK-38:** Canonical URL etiketleri ekle (Duplicate content SEO cezasını önlemek için).
- [ ] 🟡 **TASK-39:** Resimler için WebP veya AVIF formatını tercih eden `picture` etiketine geçiş yap veya CDN image proxy parametreleri kullan.
- [x] 🟢 **TASK-40:** Kod bölme (Code Splitting) iyileştirmesi: Route'ları `React.lazy` ile böl.
- [x] 🟢 **TASK-41:** Lighthouse performans skorunu >95 yapmak için gereksiz CSS/JS bundle'larını izole et (mobile uyumluluk ve UI iyileştirmeleri yapıldı).
- [ ] 🟡 **TASK-42:** Google Analytics / Vercel Web Analytics entegrasyonu (Kullanıcı verisi toplamamak için anonimleştirilmiş ayarlarıyla).
- [ ] 🟡 **TASK-43:** Site Haritası (Sitemap.xml) dinamik üretim endpoint'i ekle.

## Aşama 8: Erişilebilirlik (Accessibility - a11y) & Uluslararasılaşma

- [ ] 🟡 **TASK-44:** Klavyeyle tam gezinilebilirlik (Focus ring'leri yeşil vurgularla görünür hale getir, Tab index'leri ayarla).
- [ ] 🟡 **TASK-45:** Tüm ikonlara ve resimlere ekran okuyucular (Screen readers) için açıklayıcı `aria-label` ve `alt` nitelikleri ekle.
- [ ] 🟡 **TASK-46:** Renk kontrast oranlarını denetle (özellikle Text-Faint renklerinin karanlık modda okunabilirliğini artır).
- [ ] 🟡 **TASK-47:** RTL (Sağdan Sola) okunan diller (Arapça vb.) için CSS flex-direction (RTL) uyumluluğu hazırlığı yap.
- [ ] 🟡 **TASK-48:** Kullanıcı tarayıcı diline göre başlangıç dilini akıllıca seçen i18n dedektör optimizasyonu (Zaten var, iyileştirilebilir).

## Aşama 9: Topluluk & Gamification (Gelecek Vizyon)

- [ ] 🔴 **TASK-49:** Kullanıcı giriş (Login) UI tasarımı (Google/Discord ile giriş butonu UI'si).
- [ ] 🔴 **TASK-50:** Kullanıcıların oyunlara 1-5 arası yıldız verebilmesi için oylama widget'ı (Backend gerektirir).
- [ ] 🔴 **TASK-51:** İstek Listesi (Wishlist) veya "Kaydedilen Oyunlar" özelliği (LocalStorage bazlı).
- [ ] 🔴 **TASK-52:** Yorumlara "Beğen" veya "Faydalı" oyu verme butonları.
- [ ] 🔴 **TASK-53:** Blog / Haberler bölümü: En son oyun güncellemelerini duyurmak için makale/blog UI'si.
- [ ] 🔴 **TASK-54:** Site içi arama sonuçlarında oyunlarla birlikte makale/haber sonuçlarının da listelenmesi.
- [ ] 🔴 **TASK-55:** Liderlik tablosu (Leaderboard): En çok indirilen top 10 oyun için özel altın/gümüş/bronz taçlı badge tasarımları.

## Aşama 10: Güvenlik, DevSecOps ve Hata Yönetimi

- [x] 🟢 **TASK-56:** "Hata Sınırı" (Error Boundary) bileşeni oluştur, bir React bileşeni çökerse tüm site yerine şık bir "Bir şeyler ters gitti" UI'si göster.
- [x] 🟢 **TASK-57:** Kullanıcı internet bağlantısını kaybettiğinde sayfanın üstünde "İnternet bağlantınız koptu" uyarısı banner'ı çıkar.
- [ ] 🟡 **TASK-58:** CDN API yavaş yanıt verdiğinde Timeout (Zaman Aşımı) hata state'i ve "Yeniden Dene" (Retry) butonu ekle.
- [ ] 🟡 **TASK-59:** API URL'i ve ayarları için daha katı bir `Zod` veya `Yup` şeması doğrulaması (Runtime Type Checking) ekle, böylece JSON hatalı formatta gelirse uygulama çökmesin.
- [x] 🟢 **TASK-60:** 404 Sayfası: "Aradığınız oyun bulunamadı" şeklinde esprili ve yönlendirici (Ana Sayfaya Dön) özel bir animasyonlu 404 ekranı oluştur.
