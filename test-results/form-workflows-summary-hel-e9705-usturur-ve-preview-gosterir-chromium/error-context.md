# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: form-workflows.spec.ts >> summary helper kontrol sonucu olusturur ve preview gosterir
- Location: tests/e2e/form-workflows.spec.ts:77:1

# Error details

```
Error: expect(locator).toHaveCount(expected) failed

Locator:  getByTestId('suggestion-draft')
Expected: 1
Received: 0
Timeout:  10000ms

Call log:
  - Expect "toHaveCount" with timeout 10000ms
  - waiting for getByTestId('suggestion-draft')
    14 × locator resolved to 0 elements
       - unexpected value "0"

```

# Page snapshot

```yaml
- main [ref=e3]:
  - generic [ref=e4]:
    - generic [ref=e5]:
      - paragraph [ref=e6]: ATS CV Builder
      - heading "ATS uyumlu CV oluştur, neden düşük/yüksek skor aldığını gör ve PDF olarak yazdır." [level=1] [ref=e7]
    - paragraph [ref=e8]: Tek sayfada CV'ni doldur, iş ilanı anahtar kelime eşleşmelerini kaynak bazlı incele, explainable ATS audit ile riskleri gör ve PDF al.
    - generic [ref=e10] [cursor=pointer]:
      - button "JSON taslağını buraya sürükleyin ya da Dosya seçin Yalnızca .json dosyaları" [ref=e11]
      - img [ref=e13]
      - paragraph [ref=e16]: JSON taslağını buraya sürükleyin
      - paragraph [ref=e17]: ya da
      - generic [ref=e18]: Dosya seçin
      - paragraph [ref=e19]: Yalnızca .json dosyaları
  - generic [ref=e20]:
    - generic [ref=e21]:
      - generic [ref=e22]:
        - generic [ref=e23]:
          - generic [ref=e24]:
            - paragraph [ref=e25]: Kişisel Bilgiler
            - heading "Kişisel ve iletişim bilgileri" [level=2] [ref=e26]
            - paragraph [ref=e27]: CV'nin en üstünde görünecek temel iletişim bilgisini tamamla. Fotoğraf ve ek kişisel alanlar isteğe bağlıdır; ATS export bunları otomatik olarak kritik içerikten ayırır.
          - paragraph [ref=e28]: Fotoğraf kayıtta kalabilir ama export için kapalı tutman önerilir.
        - generic [ref=e29]:
          - generic [ref=e30]:
            - generic [ref=e31]: Ad Soyad
            - textbox "Ad Soyad" [ref=e32]: Mehmet Fiskindal
          - generic [ref=e33]:
            - generic [ref=e34]: E-posta
            - textbox "E-posta" [ref=e35]: mehmet@example.com
          - generic [ref=e36]:
            - generic [ref=e37]: Telefon
            - textbox "Telefon" [ref=e38]: +90 555 000 00 00
          - generic [ref=e39]:
            - generic [ref=e40]: Şehir
            - textbox "Şehir" [ref=e41]
        - generic [ref=e42]:
          - generic [ref=e43]: Açık adres
          - textbox "Açık adres" [ref=e44]
        - generic [ref=e45]:
          - generic [ref=e46]:
            - generic [ref=e47]: LinkedIn
            - textbox "LinkedIn" [ref=e48]
          - generic [ref=e49]:
            - generic [ref=e50]: Web sitesi / portfolyo
            - textbox "Web sitesi / portfolyo" [ref=e51]
        - generic [ref=e52]:
          - generic [ref=e53]: Fotoğraf
          - button "Fotoğraf" [ref=e54]
        - generic [ref=e55]:
          - checkbox "Ek kişisel bilgi alanlarını göster" [ref=e56]
          - generic [ref=e57]: Ek kişisel bilgi alanlarını göster
      - generic [ref=e58]:
        - generic [ref=e59]:
          - generic [ref=e60]:
            - paragraph [ref=e61]: Profesyonel Özet
            - heading "Profesyonel özet" [level=2] [ref=e62]
            - paragraph [ref=e63]: Seçili output dilini önce doldur, sonra uzunluk, ilan uyumu ve ton kontrolleriyle özetin eksiklerini net biçimde gör.
          - paragraph [ref=e64]: 2-4 cümle, net anahtar kelimeler ve mümkünse ölçülebilir etki en iyi sonucu verir.
        - article [ref=e65]:
          - generic [ref=e66]:
            - generic [ref=e67]:
              - strong [ref=e68]: "Öncelikli dil: TR"
              - paragraph [ref=e69]: Bu kontroller metni değiştirmez; sadece eksikleri ve güçlü yanları gösterir.
            - generic [ref=e70]:
              - button "Özet uzunluk kontrolü" [ref=e71] [cursor=pointer]
              - button "İlana uyum kontrolü" [active] [ref=e72] [cursor=pointer]
              - button "Ton ve netlik kontrolü" [ref=e73] [cursor=pointer]
          - generic [ref=e74]:
            - generic [ref=e75]: Summary (TR)
            - textbox "Summary (TR)" [ref=e76]
        - group [ref=e77]:
          - 'generic "İkincil dil alanı: EN" [ref=e78] [cursor=pointer]'
      - generic [ref=e79]:
        - generic [ref=e80]:
          - generic [ref=e81]:
            - paragraph [ref=e82]: İş Deneyimi
            - heading "Deneyim" [level=2] [ref=e83]
            - paragraph [ref=e84]: İş ve staj kayıtlarını tek akışta düzenle. Her kayıt için mikro kontroller ile madde yapısını, profesyonellik düzeyini ve etki sinyallerini kontrol et.
          - paragraph [ref=e85]: Tek paragraf yerine en az 2 bullet, mümkünse metrik ve action verb ile yaz.
        - generic [ref=e86]:
          - paragraph [ref=e87]:
            - text: "Toplam kayıt:"
            - strong [ref=e88]: "2"
          - generic [ref=e89]:
            - button "Bir deneyim daha ekle" [ref=e90] [cursor=pointer]
            - button "Staj ekle" [ref=e91] [cursor=pointer]
        - heading "İş deneyimi" [level=3] [ref=e92]
        - article [ref=e93]:
          - generic [ref=e94]:
            - generic [ref=e95]:
              - generic [ref=e96]: Pozisyon unvanı
              - textbox "Pozisyon unvanı" [ref=e97]
            - generic [ref=e98]:
              - generic [ref=e99]: Kurum
              - textbox "Kurum" [ref=e100]
            - generic [ref=e101]:
              - generic [ref=e102]: Lokasyon
              - textbox "Lokasyon" [ref=e103]
            - generic [ref=e104]:
              - generic [ref=e105]: Başlangıç
              - textbox "Başlangıç" [ref=e106]
            - generic [ref=e107]:
              - generic [ref=e108]: Bitiş
              - textbox "Bitiş" [ref=e109]
            - generic [ref=e110]:
              - checkbox "Halen devam ediyor" [ref=e111]
              - generic [ref=e112]: Halen devam ediyor
          - generic [ref=e113]:
            - button "Madde yapısını kontrol et" [ref=e114] [cursor=pointer]
            - button "Profesyonellik kontrolü" [ref=e115] [cursor=pointer]
            - button "Etki odak kontrolü" [ref=e116] [cursor=pointer]
            - button "STAR kontrolü" [ref=e117] [cursor=pointer]
            - button "Zayıf kelime kontrolü" [ref=e118] [cursor=pointer]
          - generic [ref=e119]:
            - generic [ref=e120]:
              - generic [ref=e121]: Bullet satırları (TR)
              - textbox "Bullet satırları (TR)" [ref=e122]
            - generic [ref=e123]:
              - generic [ref=e124]: İkincil dil (EN)
              - textbox "İkincil dil (EN)" [ref=e125]
          - button "Kaydı kaldır" [ref=e127] [cursor=pointer]
        - heading "Stajlar" [level=3] [ref=e128]
        - article [ref=e129]:
          - generic [ref=e130]:
            - generic [ref=e131]:
              - generic [ref=e132]: Staj unvanı
              - textbox "Staj unvanı" [ref=e133]
            - generic [ref=e134]:
              - generic [ref=e135]: Kurum
              - textbox "Kurum" [ref=e136]
            - generic [ref=e137]:
              - generic [ref=e138]: Lokasyon
              - textbox "Lokasyon" [ref=e139]
            - generic [ref=e140]:
              - generic [ref=e141]: Başlangıç
              - textbox "Başlangıç" [ref=e142]
            - generic [ref=e143]:
              - generic [ref=e144]: Bitiş
              - textbox "Bitiş" [ref=e145]
            - generic [ref=e146]:
              - checkbox "Halen devam ediyor" [ref=e147]
              - generic [ref=e148]: Halen devam ediyor
          - generic [ref=e149]:
            - button "Madde yapısını kontrol et" [ref=e150] [cursor=pointer]
            - button "Profesyonellik kontrolü" [ref=e151] [cursor=pointer]
            - button "Etki odak kontrolü" [ref=e152] [cursor=pointer]
            - button "STAR kontrolü" [ref=e153] [cursor=pointer]
            - button "Zayıf kelime kontrolü" [ref=e154] [cursor=pointer]
          - generic [ref=e155]:
            - generic [ref=e156]:
              - generic [ref=e157]: Bullet satırları (TR)
              - textbox "Bullet satırları (TR)" [ref=e158]
            - generic [ref=e159]:
              - generic [ref=e160]: İkincil dil (EN)
              - textbox "İkincil dil (EN)" [ref=e161]
          - button "Kaydı kaldır" [ref=e163] [cursor=pointer]
      - generic [ref=e164]:
        - generic [ref=e165]:
          - generic [ref=e166]:
            - paragraph [ref=e167]: Projeler
            - heading "Projeler" [level=2] [ref=e168]
            - paragraph [ref=e169]: Projeleri ATS için yayın, stack, platform ve etki açısından açıkça yaz. App Store, Play Console, Firebase veya REST API gibi kelimeleri doğal biçimde görünür tut.
          - paragraph [ref=e170]: Her proje için yayın linki, anahtar kelimeler ve sonuç odaklı bullet seti en değerli sinyallerden biri.
        - article [ref=e171]:
          - generic [ref=e172]:
            - generic [ref=e173]:
              - generic [ref=e174]: Proje adı
              - textbox "Proje adı" [ref=e175]
            - generic [ref=e176]:
              - generic [ref=e177]: Rolün
              - textbox "Rolün" [ref=e178]
            - generic [ref=e179]:
              - generic [ref=e180]: Başlangıç
              - textbox "Başlangıç" [ref=e181]
            - generic [ref=e182]:
              - generic [ref=e183]: Bitiş
              - textbox "Bitiş" [ref=e184]
            - generic [ref=e185]:
              - generic [ref=e186]: Proje linki
              - textbox "Proje linki" [ref=e187]
            - generic [ref=e188]:
              - generic [ref=e189]: Anahtar kelimeler
              - textbox "Anahtar kelimeler" [ref=e190]:
                - /placeholder: Flutter, Firebase, REST API, App Store
            - generic [ref=e191]:
              - checkbox "Halen devam ediyor" [ref=e192]
              - generic [ref=e193]: Halen devam ediyor
          - generic [ref=e194]:
            - button "Madde yapısını kontrol et" [ref=e195] [cursor=pointer]
            - button "Profesyonellik kontrolü" [ref=e196] [cursor=pointer]
            - button "Etki odak kontrolü" [ref=e197] [cursor=pointer]
            - button "STAR kontrolü" [ref=e198] [cursor=pointer]
            - button "Zayıf kelime kontrolü" [ref=e199] [cursor=pointer]
          - generic [ref=e200]:
            - generic [ref=e201]:
              - generic [ref=e202]: Katkılar ve sonuç (TR)
              - textbox "Katkılar ve sonuç (TR)" [ref=e203]
            - generic [ref=e204]:
              - generic [ref=e205]: İkincil dil (EN)
              - textbox "İkincil dil (EN)" [ref=e206]
          - button "Kaydı kaldır" [ref=e208] [cursor=pointer]
        - button "Proje ekle" [ref=e209] [cursor=pointer]
      - generic [ref=e210]:
        - generic [ref=e211]:
          - generic [ref=e212]:
            - paragraph [ref=e213]: Eğitim ve Beceriler
            - heading "Eğitim ve beceriler" [level=2] [ref=e214]
            - paragraph [ref=e215]: Eğitim, kurslar ve beceri gruplarını tek adımda topla. Bu alanın amacı ATS'ye "neleri bildiğini" temiz başlıklar ve tekrar etmeyen skill bloklarıyla göstermek.
          - paragraph [ref=e216]: Yoğun virgüllü uzun skill satırları yerine grup başlığı + kısa açıklama düzeni daha okunaklıdır.
        - heading "Eğitim bilgileri" [level=3] [ref=e217]
        - article [ref=e219]:
          - generic [ref=e220]:
            - generic [ref=e221]:
              - generic [ref=e222]: Okul
              - textbox "Okul" [ref=e223]
            - generic [ref=e224]:
              - generic [ref=e225]: Derece
              - textbox "Derece" [ref=e226]
            - generic [ref=e227]:
              - generic [ref=e228]: Fakülte
              - textbox "Fakülte" [ref=e229]
            - generic [ref=e230]:
              - generic [ref=e231]: Bölüm
              - textbox "Bölüm" [ref=e232]
            - generic [ref=e233]:
              - generic [ref=e234]: Başlangıç
              - textbox "Başlangıç" [ref=e235]
            - generic [ref=e236]:
              - generic [ref=e237]: Bitiş
              - textbox "Bitiş" [ref=e238]
          - generic [ref=e239]:
            - generic [ref=e240]: Genel not ortalaması
            - textbox "Genel not ortalaması" [ref=e241]
          - generic [ref=e242]:
            - generic [ref=e243]:
              - generic [ref=e244]: Notlar / ilgili dersler (TR)
              - textbox "Notlar / ilgili dersler (TR)" [ref=e245]
            - generic [ref=e246]:
              - generic [ref=e247]: İkincil dil (EN)
              - textbox "İkincil dil (EN)" [ref=e248]
          - button "Kaydı kaldır" [ref=e250] [cursor=pointer]
        - button "Eğitim kaydı ekle" [ref=e251] [cursor=pointer]
        - heading "Alınan eğitimler" [level=3] [ref=e252]
        - article [ref=e254]:
          - generic [ref=e255]:
            - generic [ref=e256]:
              - generic [ref=e257]: Eğitim
              - textbox "Eğitim" [ref=e258]
            - generic [ref=e259]:
              - generic [ref=e260]: Kurum
              - textbox "Kurum" [ref=e261]
            - generic [ref=e262]:
              - generic [ref=e263]: Tarih
              - textbox "Tarih" [ref=e264]
            - generic [ref=e265]:
              - generic [ref=e266]: Süre
              - textbox "Süre" [ref=e267]
          - button "Kaydı kaldır" [ref=e269] [cursor=pointer]
        - button "Eğitim ekle" [ref=e270] [cursor=pointer]
        - heading "Kongreler ve etkinlikler" [level=3] [ref=e271]
        - article [ref=e273]:
          - generic [ref=e274]:
            - generic [ref=e275]:
              - generic [ref=e276]: Etkinlik / kongre
              - textbox "Etkinlik / kongre" [ref=e277]
            - generic [ref=e278]:
              - generic [ref=e279]: Konum
              - textbox "Konum" [ref=e280]
          - generic [ref=e281]:
            - generic [ref=e282]: Tarih
            - textbox "Tarih" [ref=e283]
          - button "Kaydı kaldır" [ref=e285] [cursor=pointer]
        - button "Kongre ekle" [ref=e286] [cursor=pointer]
        - heading "Yabancı diller" [level=3] [ref=e287]
        - article [ref=e288]:
          - generic [ref=e289]:
            - generic [ref=e290]:
              - generic [ref=e291]: Dil
              - textbox "Dil" [ref=e292]
            - generic [ref=e293]:
              - generic [ref=e294]: Seviye
              - textbox "Seviye" [ref=e295]
            - generic [ref=e296]:
              - generic [ref=e297]: Skor / belge
              - textbox "Skor / belge" [ref=e298]
          - generic [ref=e299]:
            - generic [ref=e300]:
              - generic [ref=e301]: Açıklama (TR)
              - textbox "Açıklama (TR)" [ref=e302]
            - generic [ref=e303]:
              - generic [ref=e304]: İkincil dil (EN)
              - textbox "İkincil dil (EN)" [ref=e305]
          - button "Kaydı kaldır" [ref=e307] [cursor=pointer]
        - button "Dil ekle" [ref=e308] [cursor=pointer]
        - heading "Bilgisayar becerileri" [level=3] [ref=e309]
        - article [ref=e310]:
          - generic [ref=e311]:
            - generic [ref=e312]: Grup başlığı
            - textbox "Grup başlığı" [ref=e313]
          - generic [ref=e314]:
            - generic [ref=e315]:
              - generic [ref=e316]: Açıklama (TR)
              - textbox "Açıklama (TR)" [ref=e317]
            - generic [ref=e318]:
              - generic [ref=e319]: İkincil dil (EN)
              - textbox "İkincil dil (EN)" [ref=e320]
          - button "Kaydı kaldır" [ref=e322] [cursor=pointer]
        - button "Bilgisayar becerisi ekle" [ref=e323] [cursor=pointer]
        - heading "Diğer beceriler" [level=3] [ref=e324]
        - article [ref=e325]:
          - generic [ref=e326]:
            - generic [ref=e327]: Grup başlığı
            - textbox "Grup başlığı" [ref=e328]
          - generic [ref=e329]:
            - generic [ref=e330]:
              - generic [ref=e331]: Açıklama (TR)
              - textbox "Açıklama (TR)" [ref=e332]
            - generic [ref=e333]:
              - generic [ref=e334]: İkincil dil (EN)
              - textbox "İkincil dil (EN)" [ref=e335]
          - button "Kaydı kaldır" [ref=e337] [cursor=pointer]
        - button "Diğer beceri ekle" [ref=e338] [cursor=pointer]
      - generic [ref=e339]:
        - generic [ref=e340]:
          - generic [ref=e341]:
            - paragraph [ref=e342]: ATS Analizi
            - heading "İş ilanı eşleştirme" [level=2] [ref=e343]
            - paragraph [ref=e344]: Skoru tek sayı olarak değil, nedenleriyle birlikte gör. Bu adım ilan anahtar kelimelerini, eksik eşleşmeleri ve iş ilanına özel kontrol sonuçlarını tek panelde toplar.
          - paragraph [ref=e345]: En iyi sonuç için job description satır satır veya virgülle ayrılmış net gereksinimlerle girilmeli.
        - generic [ref=e346]:
          - generic [ref=e347]:
            - generic [ref=e348]: Hedef job title
            - textbox "Hedef job title" [ref=e349]:
              - /placeholder: Flutter Developer
              - text: Flutter Developer
          - generic [ref=e350]:
            - generic [ref=e351]: ATS output language
            - combobox "ATS output language" [ref=e352]:
              - option "English output"
              - option "Turkish output" [selected]
        - generic [ref=e353]:
          - generic [ref=e354]: Job description / keywords
          - textbox "Job description / keywords" [ref=e355]:
            - /placeholder: "Flutter\nFirebase\nREST API\nApp Store\nPlay Console"
            - text: Flutter Firebase REST API Play Console
        - generic [ref=e356]:
          - article [ref=e357]:
            - paragraph [ref=e358]: Explainable ATS score
            - strong [ref=e359]: 3/100
            - paragraph [ref=e360]:
              - text: "Tespit edilen keyword:"
              - strong [ref=e361]: "0"
            - paragraph [ref=e362]:
              - text: "Eşleşen keyword:"
              - strong [ref=e363]: "0"
            - paragraph [ref=e364]:
              - text: "Ölçülebilir satır:"
              - strong [ref=e365]: "0"
          - article [ref=e366]:
            - paragraph [ref=e367]:
              - text: "Export profili:"
              - strong [ref=e368]: ATS Safe Template
            - list [ref=e369]:
              - listitem [ref=e370]: "Şablon: ATS Safe Template"
              - listitem [ref=e371]: "Font: Arial, Calibri, Helvetica, Georgia"
              - listitem [ref=e372]: "Tek sütun: Evet"
              - listitem [ref=e373]: "Gerçek metin export: Evet"
        - article [ref=e374]:
          - heading "Skor kırılımı" [level=3] [ref=e375]
          - generic [ref=e376]:
            - article [ref=e377]:
              - generic [ref=e378]:
                - strong [ref=e379]: Başlık yapısı doğru
                - paragraph [ref=e380]: Özetten sonra en az bir ana ATS bölümü dolu olmalı.
              - generic [ref=e381]: "-10"
            - article [ref=e382]:
              - generic [ref=e383]:
                - strong [ref=e384]: İletişim bilgileri tamam
                - paragraph [ref=e385]: Ad, e-posta ve telefon alanları ATS için kritik.
              - generic [ref=e386]: "-10"
            - article [ref=e387]:
              - generic [ref=e388]:
                - strong [ref=e389]: Profesyonel özet mevcut
                - paragraph [ref=e390]: Seçili output dili için profesyonel özet eklenmeli.
              - generic [ref=e391]: "-8"
            - article [ref=e392]:
              - generic [ref=e393]:
                - strong [ref=e394]: Deneyim/proje maddeleri bullet yapısında
                - paragraph [ref=e395]: Bazı deneyim veya proje blokları tek paragrafa sıkışmış.
              - generic [ref=e396]: "0"
            - article [ref=e397]:
              - generic [ref=e398]:
                - strong [ref=e399]: Action verb kullanımı
                - paragraph [ref=e400]: Daha fazla bullet satırını güçlü fiillerle başlatmak gerekir.
              - generic [ref=e401]: "0"
            - article [ref=e402]:
              - generic [ref=e403]:
                - strong [ref=e404]: Ölçülebilir sonuç varlığı
                - paragraph [ref=e405]: Henüz ölçülebilir sonuç içeren satır bulunamadı.
              - generic [ref=e406]: "-8"
            - article [ref=e407]:
              - generic [ref=e408]:
                - strong [ref=e409]: İş ilanı anahtar kelime eşleşmesi
                - paragraph [ref=e410]: İlan metni eklenmedi ya da net anahtar kelime çıkarılamadı.
              - generic [ref=e411]: "+6"
            - article [ref=e412]:
              - generic [ref=e413]:
                - strong [ref=e414]: Teknik beceri gruplama ve tekrar kontrolü
                - paragraph [ref=e415]: Beceri blokları gruplu ve tekrar oranı düşük.
              - generic [ref=e416]: "+8"
            - article [ref=e417]:
              - generic [ref=e418]:
                - strong [ref=e419]: Uzun paragraf tespiti
                - paragraph [ref=e420]: Uzun tek paragraf riski görünmüyor.
              - generic [ref=e421]: "+6"
            - article [ref=e422]:
              - generic [ref=e423]:
                - strong [ref=e424]: Tarih formatı tutarlılığı
                - paragraph [ref=e425]: Formdaki tarih alanları tutarlı.
              - generic [ref=e426]: "+6"
            - article [ref=e427]:
              - generic [ref=e428]:
                - strong [ref=e429]: İngilizce CV için dil tutarlılığı
                - paragraph [ref=e430]: Türkçe output seçildi; İngilizce tutarlılık kuralı bilgilendirici olarak geçildi.
              - generic [ref=e431]: "+5"
            - article [ref=e432]:
              - generic [ref=e433]:
                - strong [ref=e434]: Gereksiz görsel/ikon riski
                - paragraph [ref=e435]: Görsel ağırlıklı ATS riski görünmüyor.
              - generic [ref=e436]: "+3"
            - article [ref=e437]:
              - generic [ref=e438]:
                - strong [ref=e439]: Tablo/çok kolon riski
                - paragraph [ref=e440]: ATS Safe template tek sütun ve gerçek metin export kullanıyor.
              - generic [ref=e441]: "+5"
        - article [ref=e442]:
          - heading "Düzeltme uyarıları" [level=3] [ref=e443]
          - generic [ref=e444]:
            - article [ref=e445]:
              - strong [ref=e446]: İletişim alanı puan kaybettiriyor
              - paragraph [ref=e447]:
                - strong [ref=e448]: "Alan:"
              - paragraph [ref=e449]: Ad, e-posta veya telefon eksik olduğunda ATS temel iletişim bilgisini doğrulayamaz.
              - paragraph [ref=e450]:
                - strong [ref=e451]: "Ne yapmalı:"
            - article [ref=e452]:
              - strong [ref=e453]: Özet alanı boş ya da zayıf
              - paragraph [ref=e454]:
                - strong [ref=e455]: "Alan:"
              - paragraph [ref=e456]: Seçili output dilinde özet yoksa CV ilk taramada bağlam kaybeder.
              - paragraph [ref=e457]:
                - strong [ref=e458]: "Ne yapmalı:"
            - article [ref=e459]:
              - strong [ref=e460]: Tek paragraf veya yetersiz madde yapısı
              - paragraph [ref=e461]:
                - strong [ref=e462]: "Alan:"
              - paragraph [ref=e463]: Deneyim ya da proje girdileri iki satırdan az olduğunda ATS okunabilirliği düşer.
              - paragraph [ref=e464]:
                - strong [ref=e465]: "Ne yapmalı:"
            - article [ref=e466]:
              - strong [ref=e467]: Maddeler güçlü fiillerle başlamıyor
              - paragraph [ref=e468]:
                - strong [ref=e469]: "Alan:"
              - paragraph [ref=e470]: Görev cümleleri zayıf başladığında katkı net görünmez ve skor düşer.
              - paragraph [ref=e471]:
                - strong [ref=e472]: "Ne yapmalı:"
            - article [ref=e473]:
              - strong [ref=e474]: Ölçülebilir sonuç görünmüyor
              - paragraph [ref=e475]:
                - strong [ref=e476]: "Alan:"
              - paragraph [ref=e477]: Sayı, yüzde veya hacim içermeyen maddeler etkiyi zayıf gösterir.
              - paragraph [ref=e478]:
                - strong [ref=e479]: "Ne yapmalı:"
            - article [ref=e480]:
              - strong [ref=e481]: İlan anahtar kelimeleri yeterince görünmüyor
              - paragraph [ref=e482]:
                - strong [ref=e483]: "Alan:"
              - paragraph [ref=e484]: Job description alanı boş ya da sistem net anahtar kelime çıkaramadı.
              - paragraph [ref=e485]:
                - strong [ref=e486]: "Ne yapmalı:"
        - generic [ref=e487]:
          - article [ref=e488]:
            - heading "İş ilanından tespit edilen anahtar kelimeler" [level=3] [ref=e489]
            - paragraph [ref=e490]: Henüz tespit edilen keyword yok.
          - article [ref=e491]:
            - heading "Eksik geçen beceriler" [level=3] [ref=e492]
            - paragraph [ref=e493]: İlanda eksik görünüp skill önerisine dönüşen ek bir beceri yok.
        - generic [ref=e494]:
          - article [ref=e495]:
            - heading "CV’de bulunanlar" [level=3] [ref=e496]
            - paragraph [ref=e497]: Henüz eşleşen keyword bulunamadı.
          - article [ref=e498]:
            - heading "CV’de bulunmayanlar" [level=3] [ref=e499]
            - paragraph [ref=e500]: Eksik keyword görünmüyor.
        - article [ref=e501]:
          - generic [ref=e502]:
            - generic [ref=e503]:
              - heading "İlana özel kontroller" [level=3] [ref=e504]
              - paragraph [ref=e505]: "Bu kartlar metni değiştirmez; yalnızca eksikleri ve mevcut eşleşmeleri gösterir. Varsayılan dil: TR"
            - generic [ref=e506]:
              - button "Özet eşleşmesini kontrol et" [ref=e507] [cursor=pointer]
              - button "Beceri eşleşmesini kontrol et" [ref=e508] [cursor=pointer]
              - button "Eksik becerileri listele" [ref=e509] [cursor=pointer]
              - button "TR → EN hazırlık kontrolü" [ref=e510] [cursor=pointer]
        - article [ref=e511]:
          - heading "Kontrol detayları" [level=3] [ref=e512]
          - generic [ref=e513]:
            - article [ref=e514]:
              - strong [ref=e515]: Başlık yapısı doğru
              - paragraph [ref=e516]: Özetten sonra en az bir ana ATS bölümü dolu olmalı.
              - list [ref=e517]:
                - listitem [ref=e518]: Beceri, deneyim, proje veya eğitim bölümlerinden en az biri doldurulmalı.
            - article [ref=e519]:
              - strong [ref=e520]: İletişim bilgileri tamam
              - paragraph [ref=e521]: Ad, e-posta ve telefon alanları ATS için kritik.
              - list [ref=e522]:
                - listitem [ref=e523]: "Eksik alanlar: ad soyad, e-posta veya telefon."
            - article [ref=e524]:
              - strong [ref=e525]: Profesyonel özet mevcut
              - paragraph [ref=e526]: Seçili output dili için profesyonel özet eklenmeli.
              - list [ref=e527]:
                - listitem [ref=e528]: Özet alanı boşsa eşleşme ve okunabilirlik puanı düşer.
            - article [ref=e529]:
              - strong [ref=e530]: Deneyim/proje maddeleri bullet yapısında
              - paragraph [ref=e531]: Bazı deneyim veya proje blokları tek paragrafa sıkışmış.
              - list [ref=e532]:
                - listitem [ref=e533]: Bullet yapısı ATS tarafından daha kolay okunur.
            - article [ref=e534]:
              - strong [ref=e535]: Action verb kullanımı
              - paragraph [ref=e536]: Daha fazla bullet satırını güçlü fiillerle başlatmak gerekir.
              - list [ref=e537]:
                - listitem [ref=e538]: "Action verb ile başlayan satır oranı: 0/1."
            - article [ref=e539]:
              - strong [ref=e540]: Ölçülebilir sonuç varlığı
              - paragraph [ref=e541]: Henüz ölçülebilir sonuç içeren satır bulunamadı.
              - list [ref=e542]:
                - listitem [ref=e543]: "%, adet, kullanıcı sayısı, gelir veya hız kazanımı gibi metrikler ekle."
            - article [ref=e544]:
              - strong [ref=e545]: İş ilanı anahtar kelime eşleşmesi
              - paragraph [ref=e546]: İlan metni eklenmedi ya da net anahtar kelime çıkarılamadı.
              - list [ref=e547]:
                - listitem [ref=e548]: Eksik anahtar kelime görünmüyor.
            - article [ref=e549]:
              - strong [ref=e550]: Teknik beceri gruplama ve tekrar kontrolü
              - paragraph [ref=e551]: Beceri blokları gruplu ve tekrar oranı düşük.
            - article [ref=e552]:
              - strong [ref=e553]: Uzun paragraf tespiti
              - paragraph [ref=e554]: Uzun tek paragraf riski görünmüyor.
              - list [ref=e555]:
                - listitem [ref=e556]: Uzun paragraflar bullet yapısına çevrilebilir.
            - article [ref=e557]:
              - strong [ref=e558]: Tarih formatı tutarlılığı
              - paragraph [ref=e559]: Formdaki tarih alanları tutarlı.
            - article [ref=e560]:
              - strong [ref=e561]: İngilizce CV için dil tutarlılığı
              - paragraph [ref=e562]: Türkçe output seçildi; İngilizce tutarlılık kuralı bilgilendirici olarak geçildi.
            - article [ref=e563]:
              - strong [ref=e564]: Gereksiz görsel/ikon riski
              - paragraph [ref=e565]: Görsel ağırlıklı ATS riski görünmüyor.
              - list [ref=e566]:
                - listitem [ref=e567]: Print layout sade metin odaklı.
            - article [ref=e568]:
              - strong [ref=e569]: Tablo/çok kolon riski
              - paragraph [ref=e570]: ATS Safe template tek sütun ve gerçek metin export kullanıyor.
              - list [ref=e571]:
                - listitem [ref=e572]: Current export profile header/footer içine kritik bilgi saklamaz.
                - listitem [ref=e573]: Şablon görsel progress bar veya tablo kullanmaz.
      - generic [ref=e575]:
        - button "JSON olarak kaydet" [ref=e576] [cursor=pointer]
        - button "PDF olarak yazdır" [ref=e577] [cursor=pointer]
    - generic [ref=e578]:
      - generic [ref=e580]:
        - paragraph [ref=e581]: Canlı önizleme
        - text: Bu önizleme ATS yazdırma çıktısıyla aynı içeriği gösterir
      - generic [ref=e584]:
        - heading "Ad Soyad" [level=2] [ref=e585]
        - paragraph [ref=e586]: Target Role
```

# Test source

```ts
  1   | import { expect, test } from '@playwright/test'
  2   | import { readFile, writeFile } from 'node:fs/promises'
  3   | 
  4   | test('kongre kaydi egitim ve beceriler bolumunde gorunur', async ({ page }) => {
  5   |   await page.goto('/')
  6   | 
  7   |   await expect(page.getByTestId('congress-card').first()).toBeVisible()
  8   | })
  9   | 
  10  | test('export edilen json kongre kaydini icerir', async ({ page }, testInfo) => {
  11  |   await page.goto('/')
  12  | 
  13  |   const title = `Export Kongre ${Date.now()}`
  14  |   const congressCard = page.getByTestId('congress-card').first()
  15  |   await congressCard.getByLabel('Etkinlik / kongre').fill(title)
  16  | 
  17  |   const downloadPromise = page.waitForEvent('download')
  18  |   await page.getByTestId('export-json').click()
  19  |   const download = await downloadPromise
  20  | 
  21  |   const outputPath = testInfo.outputPath('cv-export.json')
  22  |   await download.saveAs(outputPath)
  23  |   const content = await readFile(outputPath, 'utf-8')
  24  | 
  25  |   const normalized = content.replace(/^\uFEFF/, '')
  26  |   const parsed = JSON.parse(normalized) as { coursesOrCongresses?: Array<{ title?: string }> }
  27  |   expect(parsed.coursesOrCongresses?.some((item) => item.title === title)).toBeTruthy()
  28  | })
  29  | 
  30  | test('import edilen json aktif taslagi ezerek export edilir', async ({ page }, testInfo) => {
  31  |   await page.goto('/')
  32  | 
  33  |   await page.getByLabel('Ad Soyad').fill('Eski Taslak Adi')
  34  | 
  35  |   const importedName = `Import Kisi ${Date.now()}`
  36  |   const importedCongress = `Import Kongre ${Date.now()}`
  37  |   const importPath = testInfo.outputPath('cv-import.json')
  38  |   await writeFile(
  39  |     importPath,
  40  |     JSON.stringify({
  41  |       contact: {
  42  |         fullName: importedName,
  43  |         email: 'import@example.com',
  44  |         phone: '+90 555 111 22 33',
  45  |       },
  46  |       coursesOrCongresses: [
  47  |         {
  48  |           id: 'import-congress',
  49  |           title: importedCongress,
  50  |           location: 'Istanbul',
  51  |           date: '2026-05',
  52  |         },
  53  |       ],
  54  |     }),
  55  |     'utf-8',
  56  |   )
  57  | 
  58  |   await page.locator('.drop-zone-hidden-input').setInputFiles(importPath)
  59  |   await expect(page.getByText('Taslak başarıyla içe aktarıldı.')).toBeVisible()
  60  | 
  61  |   const downloadPromise = page.waitForEvent('download')
  62  |   await page.getByTestId('export-json').click()
  63  |   const download = await downloadPromise
  64  | 
  65  |   const outputPath = testInfo.outputPath('cv-import-export.json')
  66  |   await download.saveAs(outputPath)
  67  |   const content = await readFile(outputPath, 'utf-8')
  68  | 
  69  |   const parsed = JSON.parse(content.replace(/^\uFEFF/, '')) as {
  70  |     contact?: { fullName?: string }
  71  |     coursesOrCongresses?: Array<{ title?: string }>
  72  |   }
  73  |   expect(parsed.contact?.fullName).toBe(importedName)
  74  |   expect(parsed.coursesOrCongresses?.some((item) => item.title === importedCongress)).toBeTruthy()
  75  | })
  76  | 
  77  | test('summary helper kontrol sonucu olusturur ve preview gosterir', async ({ page }) => {
  78  |   await page.goto('/')
  79  | 
  80  |   await page.getByLabel('Ad Soyad').fill('Mehmet Fiskindal')
  81  |   await page.getByLabel('E-posta').fill('mehmet@example.com')
  82  |   await page.getByLabel('Telefon').fill('+90 555 000 00 00')
  83  | 
  84  |   await page.getByLabel('Hedef job title').fill('Flutter Developer')
  85  |   await page.getByLabel('Job description / keywords').fill('Flutter\nFirebase\nREST API\nPlay Console')
  86  | 
  87  |   await page.getByTestId('summary-action-summary-job-rewrite').click()
> 88  |   await expect(page.getByTestId('suggestion-draft')).toHaveCount(1)
      |                                                      ^ Error: expect(locator).toHaveCount(expected) failed
  89  | 
  90  |   const previewButton = page.locator('[data-testid^="draft-preview-"]').first()
  91  |   await previewButton.click()
  92  |   await expect(page.locator('.draft-preview-text')).toBeVisible()
  93  |   await expect(page.getByText('Bu kart kontrol sonucudur; metni otomatik değiştirmez.')).toBeVisible()
  94  | 
  95  |   await expect(page.locator('[data-testid^="draft-apply-"]')).toHaveCount(0)
  96  | })
  97  | 
  98  | test('preview renders without object placeholders', async ({ page }) => {
  99  |   await page.goto('/')
  100 | 
  101 |   await expect(page.getByText(/\[object Object\]/)).toHaveCount(0)
  102 |   await expect(page.getByText('Canlı önizleme')).toBeVisible()
  103 | })
  104 | 
```