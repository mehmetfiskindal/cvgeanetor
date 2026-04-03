# Katki Rehberi

Bu projeye katkida bulunmak istedigin icin tesekkurler. Amacimiz ATS uyumlu CV olusturma deneyimini sade, hizli ve guvenilir tutmak.

## Hangi katkilari bekliyoruz

- Bug fix
- Yeni form alanlari veya UX iyilestirmeleri
- ATS analizi iyilestirmeleri
- Test kapsami artisi
- Dokumantasyon iyilestirmeleri
- GitHub Actions ve yayin akisi iyilestirmeleri

## Baslamadan once

1. Repo'yu fork et veya yetkin varsa yeni bir branch ac.
2. Bagimliliklari kur:

```bash
npm install
```

3. Gelistirme sunucusunu baslat:

```bash
npm run dev
```

## Onerecegimiz branch isimleri

- `feat/kisa-aciklama`
- `fix/kisa-aciklama`
- `docs/kisa-aciklama`
- `test/kisa-aciklama`

## Kod degisikligi yaparken

- Var olan yapiyi ve isimlendirmeyi korumaya calis.
- UI degisikliklerinde ATS onizleme akisini kontrol et.
- JSON import/export davranisini bozma.
- Mumkunse davranis degisikligi icin test ekle.

## Gondermeden once kontrol listesi

Asagidaki komutlarin basarili calismasi beklenir:

```bash
npm test
npm run build
```

Eger degisiklik form akisini etkiliyorsa ve Playwright kuruluysa su komut da faydalidir:

```bash
npm run test:e2e
```

## Pull request akisi

1. Degisikligini kucuk ve odakli tut.
2. Neyi degistirdigini ve nedenini PR aciklamasinda yaz.
3. UI degisikligi varsa ekran goruntusu veya kisa video ekle.
4. Ilgili issue varsa PR'a bagla.

## Issue acmadan once

- README'yi kontrol et.
- Benzer bir issue veya PR var mi bak.
- Tekrarlanabilir adimlar ve beklenen davranisi yaz.

## Iyi ilk katkilar

Asagidaki alanlar yeni katkicilar icin uygundur:

- Form alanlarinda metin ve erisimlilik iyilestirmeleri
- Test eksiklerinin kapatilmasi
- README ve kullanim rehberi iyilestirmeleri
- ATS bulgu mesajlarinin netlestirilmesi

## Iletisim ve kararlar

Buyuk degisikliklerde once issue acip cozum yonunu konusmak en sagliklisidir. Bu sayede uygulamanin veri modeli ve ATS cikti mantigi korunur.
