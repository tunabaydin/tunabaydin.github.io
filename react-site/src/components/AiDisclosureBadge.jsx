import { useParams } from "react-router-dom";

const labels = {
  en: {
    assisted: ["AI-assisted art", "Read the AI disclosure"],
    generated: ["AI-generated", "Read the AI disclosure"],
  },
  tr: {
    assisted: ["Yapay zekâ destekli sanat", "Açıklamayı okuyun"],
    generated: ["Yapay zekâ ile üretildi", "Açıklamayı okuyun"],
  },
  no: {
    assisted: ["KI-assistert kunst", "Les KI-merkingen"],
    generated: ["KI-generert", "Les KI-merkingen"],
  },
};

export default function AiDisclosureBadge({ kind, href, className }) {
  const { lang } = useParams();
  const [label, action] = (labels[lang] || labels.en)[kind];

  return (
    <a
      className={`ai-disclosure-badge ${className}`}
      href={href}
      aria-label={`${label}. ${action}`}
    >
      {label}
    </a>
  );
}
