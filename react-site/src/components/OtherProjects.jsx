import { otherProjectsData } from "../data/otherProjectsData";
import { useParams } from "react-router-dom";
import { siteContent } from "../content/siteContent";

export default function OtherProjects() {
  const { lang } = useParams();
  const content = siteContent[lang] || siteContent.en;
  const currentLang = lang || "en";
  return (
    <section id="home-projects">
      <h1 className="section-title">{content.sections.projects}</h1>

      <div className="gallery">
        {otherProjectsData.map((project) => (
          <a
            key={project.slug}
            className="gallery-item"
            href={`/${currentLang}/${project.slug}/`}
          >
            <div
              className="gallery-cover"
              style={{ backgroundImage: `url(${project.image})` }}
            ></div>

            <div className="gallery-title">
              {project.title[currentLang] || project.title.en}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}