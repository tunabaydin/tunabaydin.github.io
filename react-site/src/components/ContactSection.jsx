import { useParams } from "react-router-dom";
import { siteContent } from "../content/siteContent";


export default function ContactSection() {
  const { lang } = useParams();
  const content = siteContent[lang] || siteContent.en;

  return (
    <section id="home-contact">
      <div className="card">
        <h1 className="section-title-left">{content.contact.title}</h1>

        <p>{content.contact.intro}</p>

        <p style={{ marginTop: "2rem" }}>{content.contact.follow}</p>

        <p>
          <strong>Instagram:</strong>{" "}
          <a href="https://www.instagram.com/ttunartt/" target="_blank" rel="noreferrer">
            @ttunartt
          </a>
        </p>

        <p>
          <strong>TikTok:</strong>{" "}
          <a href="https://www.tiktok.com/@ttunartt" target="_blank" rel="noreferrer">
            @ttunartt
          </a>
        </p>

        <form
          className="contact-form"
          action="https://formspree.io/f/xovovaak"
          method="POST"
        >
          <input
            type="hidden"
            name="_subject"
            value="New message from tunabaydin.com"
          />

          <div className="form-group">
  <label htmlFor="name">{content.contact.name}</label>
  <input
    id="name"
    name="name"
    type="text"
    placeholder={content.contact.namePlaceholder}
    required
  />
</div>

          <div className="form-group">
  <label htmlFor="email">{content.contact.email}</label>
  <input
    id="email"
    name="email"
    type="email"
    placeholder={content.contact.emailPlaceholder}
    required
  />
</div>

          <div className="form-group">
  <label htmlFor="message">{content.contact.message}</label>
  <textarea
    id="message"
    name="message"
    placeholder={content.contact.messagePlaceholder}
    required
  ></textarea>
</div>

          <button type="submit">{content.contact.send}</button>
          <div id="form-status" className="form-status"></div>
        </form>
      </div>
    </section>
  );
}