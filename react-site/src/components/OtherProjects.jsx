import { otherProjectsData } from "../data/otherProjectsData";

export default function OtherProjects() {
  return (
    <section id="home-projects">
      <h1 className="section-title">Other Projects</h1>

      <div className="gallery">
        {otherProjectsData.map((project) => (
          <a
            key={project.slug}
            className="gallery-item"
            href={`/en/${project.slug}/`}
          >
            <div
              className="gallery-cover"
              style={{ backgroundImage: `url(${project.image})` }}
            ></div>

            <div className="gallery-title">
              {project.title}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}