export const otherProjectDetailsData = {
  coloranalysis: {
    slug: "coloranalysis",
    title: {
      en: "Color Analysis",
      tr: "Renk Analizi",
      no: "Fargeanalyse",
    },
    layout: "photography",
    rows: [
      {
        type: "carousel",
        showDots: true,
        title: {
          en: "Draping Examples",
          tr: "Draping Örnekleri",
          no: "Draperings-eksempler",
        },
        text: {
          en: "After being analyzed in person as a Cool Winter, I started rebuilding my wardrobe around contrast, cool undertones, and colors that feel visually aligned with me. This page follows that process as a personal case study in color, style, and self-presentation.",
          tr: "Yüz yüze yapılan analizde Cool Winter olarak değerlendirildikten sonra gardırobumu kontrast, soğuk alt tonlar ve bana görsel olarak daha uyumlu gelen renkler etrafında yeniden düzenlemeye başladım. Bu sayfa, renk, stil ve kendini ifade etme üzerine kişisel bir vaka çalışması olarak bu süreci takip ediyor.",
          no: "Etter at jeg ble analysert som Cool Winter i en fysisk fargeanalyse, begynte jeg å bygge garderoben min rundt kontrast, kalde undertoner og farger som føles visuelt riktige for meg. Denne siden følger prosessen som en personlig case-studie i farge, stil og selvpresentasjon.",
        },
        images: [
          { src: "/assets/otherprojects/blues.png", alt: "Blue draping comparison" },
          { src: "/assets/otherprojects/reds.png", alt: "Red draping comparison" },
          { src: "/assets/otherprojects/greens.png", alt: "Green draping comparison" },
          { src: "/assets/otherprojects/oranges.png", alt: "Orange draping comparison" },
          { src: "/assets/otherprojects/darkneutrals.png", alt: "Dark neutral draping comparison" },
          { src: "/assets/otherprojects/lightneutrals.png", alt: "Light neutral draping comparison" },
        ],
      },
    ],
  },

  photography: {
    slug: "photography",
    title: {
      en: "Photography",
      tr: "Fotoğrafçılık",
      no: "Fotografi",
    },
    layout: "photography",
    rows: [
      {
        title: {
          en: "The Universe Winks",
          tr: "Evren Göz Kırpıyor",
          no: "Universet blunker",
        },
        text: {
          en: "A moment when the sun aligned perfectly with the cave opening.",
          tr: "Güneşin mağara açıklığıyla kusursuz biçimde hizalandığı bir an.",
          no: "Et øyeblikk da solen sto helt perfekt i linje med åpningen i hulen.",
        },
        image: "/assets/otherprojects/theuniversewinks.jpg",
        imageAlt: "The Universe Winks",
      },
      {
        title: {
          en: "Aromatherapy",
          tr: "Aromaterapi",
          no: "Aromaterapi",
        },
        text: {
          en: "Essential oil vaporizer.",
          tr: "Uçucu yağ difüzörü.",
          no: "Diffuser for eteriske oljer.",
        },
        image: "/assets/otherprojects/aromatherapy.jpg",
        imageAlt: "Aromatherapy",
        video: "/assets/otherprojects/aromatherapyvideo.mp4",
      },
    ],
  },

  crochet: {
    slug: "crochet",
    title: {
      en: "Crochet",
      tr: "Tığ İşi",
      no: "Hekling",
    },
    layout: "photography",
    rows: [
      {
        title: {
          en: "Blanket",
          tr: "Battaniye",
          no: "Teppe",
        },
        text: {
          en: "I made this blanket.",
          tr: "Bu battaniyeyi ben yaptım.",
          no: "Jeg lagde dette teppet.",
        },
        image: "/assets/otherprojects/blanket.jpg",
        imageAlt: "Blanket",
      },
    ],
  },

  dreamreconstruction: {
    slug: "dreamreconstruction",
    title: {
      en: "Dream Reconstruction",
      tr: "Rüya Rekonstrüksiyonu",
      no: "Drømmerekonstruksjon",
    },
    layout: "dream",
    leftImages: [
      {
        src: "/assets/otherprojects/dream1.png",
        alt: "Dream reconstruction 1",
      },
      {
        src: "/assets/otherprojects/dream2.png",
        alt: "Dream reconstruction 2",
      },
      {
        src: "/assets/otherprojects/dream3.png",
        alt: "Dream reconstruction 3",
      },
      {
        src: "/assets/otherprojects/dream4.png",
        alt: "Dream reconstruction 4",
      },
    ],
    textBox: {
      heading: {
        en: "About the project",
        tr: "Proje hakkında",
        no: "Om prosjektet",
      },
      paragraphs: {
        en: [
          "I dreamt of an awe inspiring place. I was traveling in a safari style vehicle, riding along the coast. I was fascinated by the black sand beach and the ancient sculptures. Once I caught my breath, I was told to turn around and that is when I saw the majestic 3 peaks.",
          "Upon waking up, I remembered this place in utmost detail and decided to recreate it. I described the scene to AI and generated the image on the top of the page. Once I started telling AI what to fix in this image, I realized that AI fails to contain the details which were correct in the first image. It simply can not not change something. So I worked on the prompt text to include as much detail as possible about the scene. The rest of the images here are a byproduct of this quest.",
          "In the meantime, I am creating the scene in Blender, a 3D model creation software. I am aiming to create a short video, implement the camera as me experiencing the scene.",
        ],
        tr: [
          "Beni hayran bırakan bir yer gördüm rüyamda. Safari tarzı bir araçla sahil boyunca ilerliyordum. Siyah kumlu plajdan ve kadim heykellerden büyülenmiştim. Biraz kendime geldikten sonra arkamı dönmem söylendi; işte o anda görkemli üç zirveyi gördüm.",
          "Uyandığımda bu yeri en ince ayrıntısına kadar hatırlıyordum ve onu yeniden yaratmaya karar verdim. Sahneyi yapay zekâya anlattım ve sayfanın en üstündeki görüntüyü oluşturdum. Sonra bu görüntüde neyin düzeltilmesi gerektiğini yapay zekâya söylemeye başlayınca, ilk görüntüde doğru olan ayrıntıları koruyamadığını fark ettim. Bir şeyi değiştirmeden bırakamıyor. Bu yüzden, sahneyle ilgili olabildiğince çok ayrıntıyı içeren bir komut metni üzerinde çalıştım. Buradaki diğer görüntüler de bu arayışın bir yan ürünü.",
          "Bu arada sahneyi, bir 3D modelleme yazılımı olan Blender'da da kuruyorum. Kısa bir video üretmeyi ve kamerayı sahneyi bizzat deneyimliyormuşum gibi kurgulamayı hedefliyorum.",
        ],
        no: [
          "Jeg drømte om et sted som tok pusten fra meg. Jeg reiste i et safarilignende kjøretøy langs kysten. Jeg var fascinert av den svarte sandstranden og de gamle skulpturene. Da jeg endelig fikk hentet meg inn, fikk jeg beskjed om å snu meg, og det var da jeg så de majestetiske tre toppene.",
          "Da jeg våknet, husket jeg dette stedet i minste detalj og bestemte meg for å gjenskape det. Jeg beskrev scenen for KI og genererte bildet øverst på siden. Da jeg begynte å fortelle KI hva som burde justeres i dette bildet, innså jeg at KI ikke klarer å bevare detaljene som faktisk var riktige i det første bildet. Den klarer rett og slett ikke å la noe være uendret. Derfor jobbet jeg videre med prompten for å få med så mange detaljer som mulig fra scenen. Resten av bildene her er et biprodukt av denne jakten.",
          "Samtidig bygger jeg scenen i Blender, et program for 3D-modellering. Målet mitt er å lage en kort video og bruke kameraet som om det er meg som opplever scenen.",
        ],
      },
    },
    rightImages: [
      {
        src: "/assets/otherprojects/dream5.png",
        alt: "Dream reconstruction 5",
      },
      {
        src: "/assets/otherprojects/dream6.png",
        alt: "Dream reconstruction 6",
      },
      {
        src: "/assets/otherprojects/dream7.png",
        alt: "Dream reconstruction 7",
      },
      {
        src: "/assets/otherprojects/dream8.png",
        alt: "Dream reconstruction 8",
      },
    ],
  },

 music: {
  slug: "music",
  title: {
    en: "Music",
    tr: "Müzik",
    no: "Musikk",
  },
  layout: "photography",
  rows: [
    {
      rowClass: "music-intro-row",
      title: {
        en: "Music",
        tr: "Müzik",
        no: "Musikk",
      },
      text: {
        en: "I really like listening to and creating music. I have experience singing in a choir and in a band, as well as playing the piano and drums during my developmental years. As an adult, I took some vocal lessons and enjoy singing and composing in my free time. I still have a lot to learn and I am excited to keep improving my music skills.",
        tr: "Müzik dinlemeyi ve üretmeyi gerçekten çok seviyorum. Gelişim yıllarımda koroda ve bir grupta şarkı söyleme, ayrıca piyano ve davul çalma deneyimim oldu. Yetişkinliğimde bir süre vokal dersleri de aldım ve boş zamanlarımda şarkı söyleyip beste yapmaktan keyif alıyorum. Hala öğrenecek çok şeyim var ve müzik becerilerimi geliştirmek için heyecanlıyım.",
        no: "Jeg liker veldig godt å høre på og lage musikk. I oppveksten har jeg erfaring med å synge i kor og i band, i tillegg til å spille piano og trommer. Som voksen har jeg også tatt noen sangtimer, og jeg liker å synge og komponere på fritiden. Jeg har fortsatt mye å lære, og jeg gleder meg til å fortsette å utvikle mine musikalske ferdigheter.",
      },
      image: "/assets/otherprojects/littlehuman.jpg",
      imageAlt: "Childhood photo",
    },
    {
      rowClass: "music-song-row",
      title: {
        en: "Spanish-inspired composition",
        tr: "İspanyol esintili beste",
        no: "Spansk-inspirert komposisjon",
      },
      text: {
        en: "This song is inspired by flamenco music and traditional Andalusian sounds. I made this song back in 2021 using Soundtrap, which is an online music production software. The program is beginner-friendly because it has a very simple user interface, but it does not offer the highest-quality virtual instruments. I am currently looking for a new software to learn so I can create higher-quality sounds.",
        tr: "Bu şarkı flamenko müziği ve geleneksel Endülüs tınılarından ilham alıyor. Bu şarkıyı 2021 yılında, çevrim içi bir müzik prodüksiyon yazılımı olan Soundtrap kullanarak yaptım. Program, çok basit bir kullanıcı arayüzüne sahip olduğu için başlangıç için oldukça uygun; ancak en yüksek kalitede sanal enstrümanları sunmuyor. Daha yüksek kaliteli sesler üretebilmek için şu anda öğrenebileceğim yeni bir yazılım arıyorum.",
        no: "Denne sangen er inspirert av flamenco-musikk og tradisjonelle andalusiske lyder. Jeg laget denne sangen i 2021 ved å bruke Soundtrap, som er et nettbasert program for musikkproduksjon. Programmet er nybegynnervennlig fordi det har et veldig enkelt brukergrensesnitt, men det tilbyr ikke virtuelle instrumenter av høyeste kvalitet. Jeg ser nå etter et nytt program å lære, slik at jeg kan lage lyd av høyere kvalitet.",
      },
      image: "/assets/otherprojects/spanishprocess.png",
      imageAlt: "Spanish-inspired music process",
      audio: "/assets/otherprojects/spanish.mp3",
    },
  ],
},

  sculpture: {
    slug: "sculpture",
    title: {
      en: "Sculpture",
      tr: "Heykel",
      no: "Skulptur",
    },
    layout: "photography",
    rows: [
      {
        title: {
          en: "Head",
          tr: "Kafa",
          no: "Hodet",
        },
        text: {
  en: "This clay sculpture is a prototype for the upcoming scaled up version. I am amazed by how different and beautiful our human faces are. In this project, I am attempting to create a new face.",

  tr: "Bu kil heykel, ileride daha büyük ölçekte yapılacak versiyon için bir prototiptir. İnsan yüzlerinin ne kadar farklı ve güzel olduğuna hayranım. Bu projede yeni bir yüz yaratmayı deniyorum.",

  no: "Denne leireskulpturen er en prototype for en kommende oppskalert versjon. Jeg er fascinert av hvor forskjellige og vakre menneskelige ansikter er. I dette prosjektet forsøker jeg å skape et nytt ansikt."
},
        image: "/assets/otherprojects/sculpture-cover.jpg",
        imageAlt: "Sculpture",
      },
    ],
  },

  recipes: {
    slug: "recipes",
    title: {
      en: "Recipes",
      tr: "Tarifler",
      no: "Oppskrifter",
    },
    layout: "photography",
    rows: [
      {
        title: {
          en: "Salty Chia Pudding (Tzatziki Chia)",
          tr: "Tuzlu Chia Puding (Cacık Chia)",
          no: "Saltet Chia Pudding (tzatziki-chia)",
        },
       text: {
  en: {
    description: "We have all had or heard of sweet chia puddings before. As a person who loves savory snacks, I came up with a salty chia pudding, which is essentially a more nutritious tzatziki.",
    ingredientsTitle: "Ingredients",
    ingredients: ["Greek/Turkish yogurt", "Chia seeds", "Cucumber", "Garlic", "Fresh mint leaves", "Olive oil", "Salt", "Dried mint"],
    methodTitle: "Preparation",
    method: "Hydrate the chia seeds for 5–10 minutes until you obtain a thick pudding. Then add Greek yogurt, grated or diced cucumber, chopped garlic, chopped fresh mint leaves, olive oil, salt, and dried mint to taste. There are no exact measurements for this recipe.",
  },
  tr: {
    description: "Hepimiz daha önce tatlı chia pudingleri yemiş ya da duymuşuzdur. Tuzlu atıştırmalıkları seven biri olarak, aslında daha besleyici bir cacık olan bu tuzlu chia pudingi geliştirdim.",
    ingredientsTitle: "Malzemeler",
    ingredients: ["Yoğurt", "Chia tohumu", "Salatalık", "Sarımsak", "Taze nane", "Zeytinyağı", "Tuz", "Kuru nane"],
    methodTitle: "Yapılışı",
    method: "Chia tohumlarını 5–10 dakika bekleterek koyu bir puding elde edin. Ardından yoğurt, rendelenmiş veya doğranmış salatalık, doğranmış sarımsak, taze nane yaprakları, zeytinyağı, tuz ve kuru naneyi damak tadınıza göre ekleyin. Bu tarifte kesin ölçüler kullanmadım çünkü herkesin kendine özgü bir cacık tarifi vardır.",
  },
  no: {
    description: "Vi har alle smakt eller hørt om søte chia puddinger før. Som en person som liker salte snacks, fant jeg på en salt chia pudding, som egentlig er en mer næringsrik tzatziki.",
    ingredientsTitle: "Ingredienser",
    ingredients: ["Gresk/tyrkisk yoghurt", "Chiafrø", "Agurk", "Hvitløk", "Ferske mynteblader", "Olivenolje", "Salt", "Tørket mynte"],
    methodTitle: "Fremgangsmåte",
    method: "La chiafrøene hydrere i 5–10 minutter til du får en tykk pudding. Tilsett deretter gresk yoghurt, revet eller hakket agurk, hakket hvitløk, ferske mynteblader, olivenolje, salt og tørket mynte etter smak. Det finnes ingen eksakte mål i denne oppskriften.",
  },
},
        image: "/assets/otherprojects/saltychia.jpg",
        imageAlt: "Recipes",
        video: "/assets/otherprojects/saltychiaprocess.mp4",
      },
    ],
  },

  collage: {
    slug: "collage",
    title: {
      en: "Collage",
      tr: "Kolaj",
      no: "Kollasj",
    },
    layout: "photography",
    rows: [
      {
        title: {
          en: "Snowflake",
          tr: "Snowflake",
          no: "Snowflake",
        },
        text: {
          en: "The main inspiration for this piece was repurposing chocolate bar wrappers. The packaging consists of two layers: a hard colorful printed paper and a thinner shiny foil layer, both containing patterns. I cut out pieces, outlined some of them with black marker, and arranged them into the final composition.\n\nThere are five different patterns/colors which correspond to five different flavors of chocolate. They all form an individual \"family\" within the work. The content of every family is similar to our human family members. In the center of the piece is a human being (the child) which is also the source (but more about that later). On each side of the child, we have two sides of the family, stemming from our two parents. These individuals symbolize the genetic (and sometimes cultural) material we inherit. As we go further back in generations, our grandparents and then more distant relatives contribute less directly to this inheritance. As this hazy shift occurs, the materials go from distinct colorful ones to shiny (universal) ones. They become our \"ancestors\" whose stories we hear growing up.\n\nI believe as human beings, we all carry a fragment of the source within us. In this piece, all of the components that make us who we are originate from the same source. All the pieces form a unique mandala style pattern. Just like a unique snowflake. What makes us unique is also universal. We all share a collective unconscious.",
          tr: "Bu işin ana ilhamı, çikolata ambalajlarını yeniden değerlendirmekti. Paketleme iki katmandan oluşuyor: desenler taşıyan sert, renkli, baskılı bir kâğıt ve daha ince, parlak bir folyo katmanı. Parçaları kesip çıkardım, bazılarını siyah kalemle belirginleştirdim ve son kompozisyonda bir araya getirdim.\n\nBeş farklı desen/renk var ve bunlar beş farklı çikolata aromasına karşılık geliyor. Her biri işin içinde ayrı bir \"aile\" oluşturuyor. Her ailenin içeriği, bizim insan aile üyelerimize benziyor. Eserin merkezinde bir insan var (çocuk); aynı zamanda kaynak da o (ama buna birazdan geleceğim). Çocuğun iki yanında, iki ebeveynimizden köklenen ailenin iki tarafı yer alıyor. Bu figürler bize miras kalan genetik (ve bazen kültürel) malzemeyi simgeliyor. Kuşaklar geriye gittikçe, önce büyükanne ve büyükbabalarımız, sonra daha uzak akrabalar bu mirasa daha dolaylı biçimde katkıda bulunuyor. Bu puslu geçiş yaşanırken malzemeler, belirgin ve renkli olandan parlak (evrensel) olana dönüşüyor. Büyürken hikâyelerini duyduğumuz \"atalarımıza\" dönüşüyorlar.\n\nİnsan olarak hepimizin içinde kaynaktan bir parça taşıdığına inanıyorum. Bu işte, bizi biz yapan tüm bileşenler aynı kaynaktan doğuyor. Tüm parçalar mandalayı andıran benzersiz bir desen kuruyor. Tıpkı eşsiz bir kar tanesi gibi. Bizi benzersiz kılan şey aynı zamanda evrensel. Hepimiz ortak bir bilinçdışını paylaşıyoruz.",
          no: "Hovedinspirasjonen for dette verket var å gi sjokoladepapir nytt liv. Innpakningen består av to lag: et hardt, fargerikt, trykket papir og et tynnere, skinnende folielag, begge med mønstre. Jeg klippet ut biter, markerte noen av dem med svart tusj og satte dem sammen til den endelige komposisjonen.\n\nDet finnes fem ulike mønstre/farger som svarer til fem forskjellige sjokoladesmaker. Sammen danner de hver sin \"familie\" i verket. Innholdet i hver familie ligner våre menneskelige familiemedlemmer. I sentrum av verket er et menneske (barnet), som også er kilden (men mer om det senere). På hver side av barnet finner vi to sider av familien, som springer ut fra våre to foreldre. Disse skikkelsene symboliserer det genetiske (og noen ganger kulturelle) materialet vi arver. Jo lenger tilbake i generasjonene vi går, desto mindre direkte bidrar besteforeldrene våre og deretter fjernere slektninger til denne arven. I denne tåkete overgangen går materialene fra tydelige, fargerike former til skinnende (universelle) former. De blir våre \"forfedre\", hvis historier vi vokser opp med å høre.\n\nJeg tror at vi som mennesker alle bærer et fragment av kilden i oss. I dette verket springer alle bestanddelene som gjør oss til dem vi er, ut fra den samme kilden. Alle delene danner et unikt, mandalalignende mønster. Som et unikt snøfnugg. Det som gjør oss unike, er også universelt. Vi deler alle et kollektivt ubevisst.",
        },
        image: "/assets/art/snowflake.jpg",
        imageAlt: "Snowflake artwork by Tuna Baydin",
        video: "/assets/art/snowflakeprocess2.mp4",
      },
      {
        rowClass: "collage-cherry-row",
        title: {
          en: "Cherry on top",
          tr: "Cherry on top",
          no: "Cherry on top",
        },
        text: {
          en: "I made this collage at a workshop. It reminds me of the problems our brain creates to keep us busy. Sometimes I find myself anxious for a reason I already forgot about, trying to remember why I was anxious. Staying present in the moment and being aware of the tools our minds use to keep us occupied is a promising starting point to overcome anxiety.",
          tr: "Bu kolajı bir atölyede yaptım. Bana zihnimizin bizi meşgul etmek için yarattığı sorunları hatırlatıyor. Bazen kendimi, nedenini çoktan unuttuğum bir sebeple kaygılı hissederken buluyorum; neden kaygılandığımı hatırlamaya çalışıyorum. Anda kalmak ve zihnimizin bizi meşgul etmek için kullandığı araçların farkında olmak, kaygının üstesinden gelmek için umut verici bir başlangıç noktası olabilir.",
          no: "Jeg laget denne collagen på en workshop. Den minner meg om problemene hjernen vår skaper for å holde oss opptatt. Noen ganger opplever jeg at jeg er engstelig av en grunn jeg allerede har glemt, og prøver å huske hvorfor jeg var engstelig. Å være til stede i øyeblikket og være bevisst på verktøyene sinnet bruker for å holde oss opptatt, er et lovende utgangspunkt for å overvinne angst.",
        },
        image: "/assets/otherprojects/cherryontop.jpg",
        imageAlt: "Collage",
      },
    ],
  },
};
