import AiDisclosureBadge from "./AiDisclosureBadge";

export default function ProjectImage({
  src,
  alt,
  className,
  aiGenerated,
  hasEmbeddedAiStamp,
  disclosureHref,
}) {
  const image = <img className={className} src={src} alt={alt} />;

  if (!aiGenerated || hasEmbeddedAiStamp || !disclosureHref) return image;

  return (
    <div className="project-image-disclosure">
      {image}
      <AiDisclosureBadge kind="generated" className="image-ai-disclosure" href={disclosureHref} />
    </div>
  );
}
