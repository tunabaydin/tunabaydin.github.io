import { useParams } from "react-router-dom";

const labels = {
  en: { badge: "AI-generated", link: "AI-generated image. Read the AI disclosure" },
  tr: { badge: "Yapay zekâ ile üretildi", link: "Yapay zekâ ile üretildi. Açıklamayı okuyun" },
  no: { badge: "KI-generert", link: "KI-generert bilde. Les KI-merkingen" },
};

export default function ProjectImage({
  src,
  alt,
  className,
  aiGenerated,
  hasEmbeddedAiStamp,
  disclosureHref,
}) {
  const { lang } = useParams();
  const text = labels[lang] || labels.en;
  const image = <img className={className} src={src} alt={alt} />;

  if (!aiGenerated || hasEmbeddedAiStamp || !disclosureHref) return image;

  return (
    <div className="project-image-disclosure">
      {image}
      <a
        className="image-ai-disclosure"
        href={disclosureHref}
        aria-label={text.link}
      >
        {text.badge}
      </a>
    </div>
  );
}
