export default function ContactSection() {
  return (
    <section id="home-contact">
      <div className="card">
        <h1 className="section-title-left">Contact</h1>

        <p>
          If you’d like to inquire about artwork, exhibitions, or collaborations,
          feel free to reach out.
        </p>

        <p style={{ marginTop: "2rem" }}>And follow me!</p>

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
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Your name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              placeholder="Write your message here..."
              required
            ></textarea>
          </div>

          <button type="submit">Send</button>
          <div id="form-status" className="form-status"></div>
        </form>
      </div>
    </section>
  );
}