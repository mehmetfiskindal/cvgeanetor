# cvgeanetor

ATS uyumlu CV olusturmak, denetlemek ve PDF olarak yazdirmak icin gelistirilmis adim-adim web uygulamasi.

## Ozellikler

- Adim bazli CV formu (kisisel bilgi, ozet, egitim, deneyim, projeler, beceriler, faaliyetler, referanslar)
- ATS kontrol paneli:
  - Anahtar kelime eslesmesi ve eksik kelimeler
  - Olculebilir sonuc (metric) kontrolu
  - Maddeleme (bullet) uygunlugu
  - Dil kapsami ve fallback kontrolu
- TR/EN lokalize metin girisi ve cikti dili secimi
- JSON taslak disa aktarma / ice aktarma
- Tek sutun ATS odakli yazdirma gorunumu (PDF icin)
- Gea framework ile hafif ve reaktif mimari

## Teknolojiler

- [Gea](https://www.npmjs.com/package/@geajs/core)
- [Vite](https://vitejs.dev/)
- TypeScript
- Node.js test runner (`node --test`)

## Baslangic

### Gereksinimler

- Node.js 20+ (onerilir)
- npm

### Kurulum

```bash
npm install
```

### Gelistirme Ortami

```bash
npm run dev
```

Ardindan terminalde verilen local URL'i tarayicida acin (genelde `http://localhost:5173`).

## Komutlar

- `npm run dev`: Gelistirme sunucusunu baslatir
- `npm run dev:ssr`: SSR (server-side rendering) modunda gelistirme sunucusunu baslatir
- `npm run build`: Production build olusturur (`dist/`)
- `npm run build:ssr`: Client build + SSR server bundle olusturur (`dist/` ve `dist/server/`)
- `npm run preview`: Build cikisini lokal olarak onizler
- `npm test`: ATS yardimci fonksiyon testlerini calistirir

## Proje Yapisi

```text
src/
  app.tsx                  # Ana uygulama kabugu
  cv-store.ts              # Tum CV verisi + adim yonetimi + export/import + print
  ats-utils.ts             # ATS analiz, anahtar kelime cikarimi, print section olusturma
  components/              # Adim formlari ve onizleme bilesenleri
tests/
  ats-utils.test.mjs       # ATS utility testleri
```

## GitHub'da Paylasim

1. Bu depoyu olusturun veya fork alin.
2. Dosyalari push edin:

```bash
git add .
git commit -m "Add cvgeanetor project"
git push origin main
```

3. Isterseniz Vercel/Netlify gibi bir statik hosting servisine `dist/` cikisini deploy edin:

```bash
npm run build
```

## GitHub Pages ile Otomatik Yayin

Bu proje icin `.github/workflows/deploy-pages.yml` dosyasi eklendi.

1. Kodu `main` dalina push edin.
2. GitHub repo ayarlarinda **Settings > Pages > Build and deployment** bolumunde **Source = GitHub Actions** secin.
3. `Actions` sekmesinde `Deploy to GitHub Pages` workflow'unun basarili calistigini dogrulayin.

Yayin adresi genel olarak su formatta olur:

- `https://<kullanici-adi>.github.io/cvgeanetor/`

## Katki

Pull request'ler memnuniyetle kabul edilir. Buyuk degisiklikler icin once bir issue acip neyi degistirmek istediginizi tartisabilirsiniz.

Katki surecini kolaylastirmak icin su GitHub entegrasyonlari eklendi:

- `CONTRIBUTING.md`: Katki akisi, branch adlandirma ve kontrol listesi
- GitHub issue template'leri: bug report ve feature request
- Pull request template'i: test ve degisiklik ozeti icin standart format
- CI workflow: PR'larda test ve build dogrulamasi
- GitHub Pages workflow: `master` branch uzerinden otomatik yayin

Katki vermeden once [CONTRIBUTING.md](./CONTRIBUTING.md) dosyasini incelemeniz onerilir.

## Lisans

Bu proje icin henuz bir lisans dosyasi eklenmemistir. Acik kaynak paylasim dusunuyorsaniz `LICENSE` dosyasi eklemeniz onerilir.
