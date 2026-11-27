export default function AiDisclosureBadge({ href, className }) {
  const Element = href ? "a" : "span";

  return (
    <Element className={`ai-disclosure-badge ${className}`} href={href} lang="en">
      <span>Disclaimer:</span>
      <span>AI-assisted art</span>
    </Element>
  );
}
