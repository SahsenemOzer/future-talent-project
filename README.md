# Future Talent - QR Portfolio Builder

Bu proje, Future Talent basvurusu icin gelistirilmis tek sayfa bir **QR tabanli portfolyo olusturucu** uygulamasidir.  
Amac, kullanicinin girdigi temel bilgileri hizli bir sekilde portfolio arayuzune donusturmek ve bu arayuzu QR ile farkli cihazlarda acabilmektir.

## Proje Ozeti

Uygulama su akisla calisir:

1. Kullanici form alanlarina bilgilerini girer.
2. Sistem bu bilgilerden kisa ve paylasilabilir bir URL uretir.
3. URL'den otomatik QR kod olusturulur.
4. QR okutuldugunda hedef cihazda **dogrudan portfolio gorunumu** acilir.

Boylece hem masaustu hem mobilde hizli bir tanitim deneyimi saglanir.

## Gelistirilen Ozellikler

### 1) Basit Portfolio Builder

- Ad Soyad
- Unvan
- Profil fotografi URL'si (opsiyonel)
- Egitim bilgileri
- Yetenekler
- Projeler

Tum bu alanlar tek sayfada hizlica duzenlenebilir.

### 2) Fotograf Yukleme + Surukle Birak

- Dosya secme destegi
- Drag-and-drop destegi
- Yuklenen fotografin portfolio ekraninda gosterimi

> Not: QR okunabilirligini korumak icin buyuk `data:` gorseller QR linkine dahil edilmez. QR tarafinda foto icin URL kullanimi onerilir.

### 3) Egitim Bolumu

Portfolio ekranina ayri bir **Egitim** alani eklendi.  
Format: `Okul|Bolum|Yil`

### 4) QR ve Paylasim Deneyimi

- QR, uygulama icinde olusturulur.
- Kisa ve okunabilir URL yapisi kullanilir.
- URL parametreleri sade tutulur; bu sayede cihazlarin okuma basarisi artar.
- QR okutuldugunda `view=portfolio` modu ile form degil portfolio acilir.

### 5) Arayuz Davranisi

- Formdan olusturma sonrasi ekran otomatik portfolio moduna gecer.
- Isteyen kullanici "duzenleme" ekranina geri donebilir.
- Koyu tema ve sade, odakli bir arayuz korunur.

## Klasor Yapisi

```txt
future_talent_project/
├── index.html
├── README.md
├── script.js
└── style.css
```

> Aktif uygulama mantigi tek dosyada (`index.html`) tutulacak sekilde sadeleştirilmistir.  
`script.js` ve `style.css` onceki iterasyonlardan kalmis dosyalardir.

## Kullanilan Teknolojiler

- HTML5
- Tailwind CSS (CDN)
- Vanilla JavaScript
- QRCode.js (client-side QR olusturma)
- GitHub Pages (deployment)

## Yerelde Calistirma

1. Repo'yu klonlayin veya dosyalari indirin.
2. `index.html` dosyasini tarayicida acin.
3. Formu doldurup QR olusturun.

## Canliya Alma (GitHub Pages)

1. Repo'yu GitHub'a pushlayin.
2. `Settings -> Pages` altina gidin.
3. `Source: Deploy from a branch` secin.
4. `Branch: main`, `Folder: / (root)` secin.
5. Kaydedin ve olusan URL'yi alin.

Ornek canli URL:

`https://sahsenemozer.github.io/future-talent-project/`

## QR Hata Notlari ve Cozum

`No usable data found` hatasi genelde asagidaki sebeplerden gelir:

- `file://` adresinden QR uretmek (gecersiz)
- Cok uzun / karmasik QR payload'i
- Canli URL yerine lokal yol kullanimi

Uygulamada bu duruma karsi:

- Gecerli web adresi kontrolu eklendi
- Veri uzunlugu kisitlandi
- Parametre yapisi sade tutuldu

## Yol Haritasi (Opsiyonel)

- Fotograf yuklemeyi otomatik cloud URL'e cevirme
- Hazir tema secenekleri
- JSON export/import ile portfolio kaydetme
- Coklu dil destegi (TR/EN)
