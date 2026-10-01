# Zeynep'li Astroloji

Astrolog Zeynep Özel için hazırlanmış statik, tek sayfalık kişisel marka sitesi.

Canlıya alma hedefi: **GitHub + Vercel**.

## Yerel önizleme

Klasörde bir statik sunucu yeterli:

```bash
npx serve .
```

veya:

```bash
python3 -m http.server 8080
```

Ardından tarayıcıda `http://localhost:8080` adresini açın.

## Yapı

```text
/
├── index.html
├── kvkk.html
├── css/styles.css
├── js/config.js
├── js/main.js
├── assets/
│   ├── images/
│   ├── icons/
│   └── logo/
├── robots.txt
├── vercel.json
└── README.md
```

## Bilgileri güncellemek

Telefon, Instagram, adres ve marka adı `js/config.js` dosyasındadır.

- Sitede görünen WhatsApp hattı: `0532 265 70 86`
- Instagram: `zeynepliastroloji`
- Adres: Buca / İzmir (Denizkent Sitesi)

Firma sahibine ait ikinci numara (`0532 375 41 36`) bilinçli olarak sitede yayımlanmadı. Meta doğrulamasında bu numaranın görünmesi gerekirse `config.js` içindeki `phoneDisplay` / `whatsapp` alanlarını değiştirin.

E-posta, çalışma saatleri, rezervasyon linki, TikTok ve YouTube verilmediği için eklenmedi.

## KVKK

`kvkk.html` gerçek kişi bilgileriyle (ad, adres, WhatsApp, Instagram) hazırlandı. Ticaret unvanı, vergi numarası ve MERSİS bilgisi uydurulmadı; vergi levhası site için zorunlu değildir. Bu alanlar gelirse KVKK sayfasındaki “Veri sorumlusu” bölümüne eklenebilir.

## Vercel

1. Bu klasörü GitHub’a yükleyin.
2. [vercel.com](https://vercel.com) üzerinde projeyi import edin.
3. Framework preset: **Other**
4. Build komutu boş bırakılabilir; çıktı dizini kök klasördür.

Özel alan adı bağladıktan sonra `js/config.js` içindeki `domain` alanına tam adresi yazın (ör. `https://ornek-alan-adi.com/`).

## Fotoğraf

Hero görseli, sağlanan hizmetler afişinden kırpılmıştır. Daha yüksek çözünürlüklü stüdyo portre gelirse `assets/images/zeynep-ozel-portrait.jpg` dosyasını değiştirmeniz yeterlidir.
