import { useParams, Navigate, useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { otherProjectDetailsData } from "../data/otherProjectDetailsData";
import { siteContent } from "../content/siteContent";
import ProjectImageCarousel from "../components/ProjectImageCarousel";


const turkishBaseContent = {
  en: {
    title: "The Base · Temel Harç",
    intro:
      "This dish starts with a cooking base I use in several Turkish home-style recipes.",
    paragraphs: [
      "Many everyday Turkish dishes start with a similar combination of ingredients. I usually begin by cooking onion with tomato paste and sweet red pepper paste in olive oil. When using minced beef, I cook it with the onion and salça.",
      "I then reduce the heat, add finely chopped garlic, and cook briefly before adding chopped or grated tomatoes. I season the mixture with salt, black pepper, and cumin.",
      "From here, I add the main ingredients for the dish. The amount of liquid and cooking time depend on what I'm preparing.",
      "For a meat-free version, I simply leave out the minced beef.",
    ],
  },
  tr: {
    title: "Temel Harç",
    intro:
      "Bu yemek, birçok ev yemeğinde kullandığım temel bir harçla hazırlanıyor.",
    paragraphs: [
      "Günlük Türk mutfağındaki birçok yemek benzer bir harçla başlar. Ben genellikle soğanı, domates salçasını ve tatlı biber salçasını zeytinyağında kavurarak başlıyorum. Kıyma kullanıyorsam onu da soğan ve salçayla birlikte pişiriyorum.",
      "Ardından ateşi biraz kısıp ince doğranmış sarımsağı ekliyorum. Kısa bir süre pişirdikten sonra doğranmış veya rendelenmiş domatesi ilave ediyorum. Tuz, karabiber ve kimyonla tatlandırıyorum.",
      "Bu aşamadan sonra yemeğin ana malzemelerini ekliyorum. Eklediğim su miktarı ve pişirme süresi yemeğe göre değişiyor.",
      "Etsiz bir versiyon hazırlamak istediğimde kıymayı kullanmıyorum.",
    ],
  },
  no: {
    title: "Grunnbasen · Temel Harç",
    intro:
      "Denne retten starter med en base jeg bruker i flere tyrkiske hverdagsretter.",
    paragraphs: [
      "Mange tyrkiske hverdagsretter starter med en lignende base. Jeg begynner vanligvis med å steke løk, konsentrert tomatpuré og søt paprikapuré i olivenolje. Hvis jeg bruker kjøttdeig, steker jeg den sammen med løken og puréene.",
      "Deretter senker jeg varmen litt, tilsetter finhakket hvitløk og lar den steke en kort stund før jeg har i hakkede eller revne tomater. Jeg smaker til med salt, svart pepper og spisskummen.",
      "Herfra tilsetter jeg hovedingrediensene i retten. Mengden væske og koketiden varierer etter hva jeg lager.",
      "Hvis jeg ønsker en kjøttfri variant, utelater jeg ganske enkelt kjøttdeigen.",
    ],
  },
};


export default function ProjectDetail() {
  const { lang, slug } = useParams();
  const currentLang = lang || "en";
  const content = siteContent[currentLang] || siteContent.en;
  const project = otherProjectDetailsData[slug];

const [searchParams, setSearchParams] = useSearchParams();

const recipeFilter = searchParams.get("category") || null;
const recipeSearch = searchParams.get("search") || "";

const selectedRecipeIndex = searchParams.get("recipe");
const selectedRecipe =
  slug === "recipes" &&
  selectedRecipeIndex !== null &&
  /^\d+$/.test(selectedRecipeIndex)
    ? project?.rows?.[Number(selectedRecipeIndex)] || null
    : null;

const openRecipe = (row) => {
  const next = new URLSearchParams(searchParams);
  next.set("recipe", String(project.rows.indexOf(row)));
  setSearchParams(next);
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const closeRecipe = () => {
  const next = new URLSearchParams(searchParams);
  next.delete("recipe");
  setSearchParams(next);
  window.scrollTo({ top: 0, behavior: "smooth" });
};


const setRecipeFilter = (value) => {
  setSearchParams((previous) => {
    const next = new URLSearchParams(previous);
    if (value) {
      next.set("category", value);
    } else {
      next.delete("category");
    }
    return next;
  }, { replace: true });
};

const setRecipeSearch = (value) => {
  setSearchParams((previous) => {
    const next = new URLSearchParams(previous);
    if (value) {
      next.set("search", value);
    } else {
      next.delete("search");
    }
    return next;
  }, { replace: true });
};




if (!project) {
    return <Navigate to={`/${currentLang}`} replace />;
  }

const filteredRows =
  slug === "recipes"
    ? project.rows.filter((row) => {
        const matchesFilter =
  recipeFilter === "all" ||
  (recipeFilter && row.categories?.includes(recipeFilter));

        const searchTerm = recipeSearch.trim().toLowerCase();

        const searchableText = [
          row.title?.[currentLang],
          row.text?.[currentLang]?.description,
          ...(row.text?.[currentLang]?.ingredients || []),
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        const matchesSearch =
  searchTerm !== "" && searchableText.includes(searchTerm);

if (!recipeFilter && searchTerm === "") {
  return false;
}

if (!recipeFilter) {
  return matchesSearch;
}

if (searchTerm === "") {
  return matchesFilter;
}

return matchesFilter && matchesSearch;
      })
    : project.rows;

  const getLocalizedText = (value) => {
    if (typeof value === "string") {
      return value;
    }

    return value?.[currentLang] || value?.en || "";
  };

  const getLocalizedArray = (value) => {
    if (Array.isArray(value)) {
      return value;
    }

    return value?.[currentLang] || value?.en || [];
  };

  const projectTitle = getLocalizedText(project.title);
  const dreamCarouselImages =
    project.layout === "dream" && project.useCarousel
      ? [...(project.leftImages || []), ...(project.rightImages || [])]
      : [];

  return (
    <>
      <Navbar />

      <div
        className="bg-image"
        style={{ backgroundImage: "url('/assets/backgroundphoto_1920x1080.jpg')" }}
      />

      <div
        style={{
          maxWidth: "1148px",
          margin: "40px auto 0",
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          alignItems: "center",
        }}
      >
        <div style={{ justifySelf: "start" }}>
          <div className="back-card">
            <a href={`/${currentLang}#home-projects`}>
              ← {content.detail.backToProjects}
            </a>
          </div>
        </div>

        <div style={{ textAlign: "center" }}>
          <h1 className="other-project-detail-title" style={{ margin: 0 }}>{projectTitle}</h1>
        </div>

        <div />
      </div>

      <div className="other-project-card">
  {project.intro && (
    <p className="other-project-intro">{getLocalizedText(project.intro)}</p>
  )}

    {slug === "recipes" && !selectedRecipe && (
    <div className="recipe-filter">
      <h2>
        {currentLang === "tr"
          ? "Ne yemek istersiniz?"
          : currentLang === "no"
          ? "Hva har du lyst på?"
          : "What are you in the mood for?"}
      </h2>

      <div className="recipe-filter-buttons">
        {[
          ["all", { en: "All recipes", tr: "Tüm tarifler", no: "Alle oppskrifter" }],
          ["savory", { en: "Savory", tr: "Tuzlu", no: "Salt" }],
          ["sweet", { en: "Sweet", tr: "Tatlı", no: "Søtt" }],  
          ["vegetarian", { en: "Vegetarian", tr: "Vejetaryen", no: "Vegetar" }],
          ["vegan", { en: "Vegan", tr: "Vegan", no: "Vegansk" }],
          ["breakfast", { en: "Breakfast", tr: "Kahvaltı", no: "Frokost" }],
          ["lunch", { en: "Lunch", tr: "Öğle yemeği", no: "Lunsj" }],
          ["dinner", { en: "Dinner", tr: "Akşam yemeği", no: "Middag" }],
          ["snack", { en: "Snack", tr: "Atıştırmalık", no: "Mellommåltid" }],
          ["turkish", { en: "Turkish Food", tr: "Türk Yemekleri", no: "Tyrkisk mat" }],
        ].map(([value, label]) => (
          <button
            key={value}
            type="button"
            className={recipeFilter === value ? "active" : ""}
            onClick={() => setRecipeFilter(value)}
          >
            {label[currentLang] || label.en}
          </button>
        ))}
      </div>

      <input
        type="search"
        className="recipe-search"
        value={recipeSearch}
        onChange={(e) => setRecipeSearch(e.target.value)}
        placeholder={
          currentLang === "tr"
            ? "Tariflerde ara..."
            : currentLang === "no"
            ? "Søk i oppskrifter..."
            : "Search recipes..."
        }
      />
    </div>
  )}

{slug === "recipes" && !selectedRecipe && (
  <div className="recipe-grid">
    {filteredRows.map((row) => (
      <button
        key={project.rows.indexOf(row)}
        type="button"
        className="recipe-grid-card"
        onClick={() => openRecipe(row)}
      >
        <img
          src={row.image || row.images?.[0]?.src}
          alt={getLocalizedText(row.title)}
          loading="lazy"
        />
        <div className="recipe-grid-card-content">
          <h3>{getLocalizedText(row.title)}</h3>
          <p>
            {row.text?.[currentLang]?.description ||
              row.text?.en?.description ||
              ""}
          </p>
        </div>
      </button>
    ))}
  </div>
)}

{slug === "recipes" && selectedRecipe && (
  <div className="recipe-back">
    <button type="button" onClick={closeRecipe}>
      ← {currentLang === "tr"
        ? "Tariflere dön"
        : currentLang === "no"
        ? "Tilbake til oppskriftene"
        : "Back to recipes"}
    </button>
  </div>
)}

  {project.layout === "photography" &&
  (slug !== "recipes" || selectedRecipe) && (
          <div className="photo-section">
            {(slug === "recipes" ? [selectedRecipe] : filteredRows).map((row, index) => (
              <div className={`photo-row ${row.rowClass || ""}`} key={index}>
                <div
                  className="photo-media"
                  style={row.images && row.type !== "carousel" ? {
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                    gap: "12px",
                    alignItems: "stretch",
                  } : undefined}
                >
                  {row.type === "carousel" ? (
                    <ProjectImageCarousel images={row.images} showDots={row.showDots} />
                  ) : row.images ? (
                    row.images.map((image, imageIndex) => (
                      <img
                        className="photo-img"
                        key={imageIndex}
                        src={image.src}
                        alt={image.alt}
                        style={{ height: "100%", objectFit: "cover" }}
                      />
                    ))
                  ) : (
                    <img
                      className="photo-img"
                      src={row.image}
                      alt={row.imageAlt}
                    />
                  )}
                </div>

                <div className="photo-text">
                  <h2>{getLocalizedText(row.title)}</h2>
                  {typeof row.text?.[currentLang] === "object" || typeof row.text?.en === "object" ? (
  (() => {
    const recipeText = row.text?.[currentLang] || row.text?.en || {};
    return (
      <div className="recipe-text">
        
{row.usesTurkishBase && (
  <details
    style={{
      border: "1px solid #ccc",
      borderRadius: "10px",
      padding: "14px 18px",
      marginBottom: "24px",
    }}
  >
  
<summary
  style={{
    cursor: "pointer",
    fontWeight: 600,
  }}
>
  {(turkishBaseContent[currentLang] || turkishBaseContent.en).title}
  <span
    style={{
      display: "block",
      marginTop: "5px",
      fontSize: "13px",
      fontWeight: 400,
      color: "#666",
    }}
  >
    {currentLang === "tr"
      ? "Daha fazlasını okumak için tıklayın."
      : currentLang === "no"
      ? "Klikk for å lese mer."
      : "Click to learn more."}
  </span>
</summary>


    <p style={{ marginTop: "12px" }}>
      {(turkishBaseContent[currentLang] || turkishBaseContent.en).intro}
    </p>

    {(turkishBaseContent[currentLang] || turkishBaseContent.en).paragraphs.map(
      (paragraph, index) => (
        <p key={index}>{paragraph}</p>
      )
    )}
  </details>
)}

        <p className="recipe-description">{recipeText.description}</p>

        <h3>{recipeText.ingredientsTitle}</h3>
        
          <ul>
            {(recipeText.ingredients || []).map((item, i) =>
              item.endsWith(":") ? (
                <li
                  key={i}
                  style={{
                    listStyleType: "none",
                    marginLeft: "-1.5rem",
                    marginTop: "12px",
                    fontWeight: 600,
                  }}
                >
                  {item}
                </li>
              ) : (
                <li key={i}>{item}</li>
              )
            )}
          </ul>


        
<h3>{recipeText.methodTitle}</h3>
<p>{recipeText.method}</p>

{row.foragingImage && (
  <img
    src={row.foragingImage}
    alt="Wild mushrooms collected in Norway"
    loading="lazy"
    style={{
      display: "block",
      width: "100%",
      maxWidth: "480px",
      height: "auto",
      marginTop: "28px",
      borderRadius: "12px",
    }}
  />
)}

{recipeText.note && (
  <p style={{ marginTop: "16px" }}>
    {recipeText.note}
  </p>
)}

      </div>
    );
  })()
) : (
  <p>{getLocalizedText(row.text)}</p>
)}

                  {row.link && (
                    <a
                      className="project-row-link"
                      href={`/${currentLang}/${row.link.slug}/`}
                    >
                      {getLocalizedText(row.link.label)}
                    </a>
                  )}

                  {row.video && (
                    <video
                      className="photo-video"
                      src={row.video}
                      autoPlay
                      loop
                      muted
                      playsInline
                      controls
                    />
                  )}
                  {row.audio && (
                    <audio
                      className="photo-audio"
                      controls
                      controlsList="nodownload"
                      onContextMenu={(e) => e.preventDefault()}
                      src={row.audio}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

              {project.layout === "dream" && (
  <div className="dream-section">
   {project.introBox && (
  <div className="dream-intro-box">
    <h2>{getLocalizedText(project.introBox.heading)}</h2>

    <div className="dream-intro-content">
      <button
        className="hero-ai-disclaimer dream-intro-disclaimer"
        type="button"
        aria-label="Disclaimer: AI-assisted art. Unless marked with this, my art is not generated through AI."
      >
        <span className="hero-ai-disclaimer-main">Disclaimer</span>
        <span className="hero-ai-disclaimer-hover">AI-assisted art</span>
        <span className="hero-ai-disclaimer-note">
          Unless marked with this, my art is not generated through AI.
        </span>
      </button>

      <div className="dream-intro-text">
        {getLocalizedArray(project.introBox.text).map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </div>
  </div>
)}

    <div className="dream-grid">
              <div className="dream-left">
                {project.useCarousel ? (
                  <ProjectImageCarousel images={dreamCarouselImages} showDots />
                ) : (
                  project.leftImages.map((image, index) => (
                    <img key={index} src={image.src} alt={image.alt} />
                  ))
                )}
              </div>

              <div className="dream-right">
                <div className="dream-text">
                  <h2>{getLocalizedText(project.textBox.heading)}</h2>

                  {getLocalizedArray(project.textBox.paragraphs).map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>

                {!project.useCarousel && (
                  <div className="dream-stack">
                    {project.rightImages.map((image, index) => (
                      <img key={index} src={image.src} alt={image.alt} />
                    ))}
                  </div>
                )}
              </div>
            </div>

            {project.additionalSections && (
              <div className="dream-additional-sections">
                {project.additionalSections.map((section, index) => (
                  <div className="dream-additional-section" key={index}>
                    <div className="dream-additional-media">
                      <img src={section.image} alt={section.imageAlt} />
                    </div>

                    <div className="dream-additional-text">
                      <h2>{getLocalizedText(section.title)}</h2>
                      <p>{getLocalizedText(section.text)}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
               )}
      </div>

      <Footer />
    </>
  );
}