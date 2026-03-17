export default function Navbar() {
  return (
    <nav className="top-nav" aria-label="Primary">
      <div className="nav-inner">
        <div className="nav-main">
          <a className="nav-item" href="/en/#top">Home</a>
          <a className="nav-item" href="/en/#home-art">Art</a>
          <a className="nav-item" href="/en/#home-projects">Other Projects</a>
          <a className="nav-item" href="/en/#home-artist">Artist</a>
          <a className="nav-item" href="/en/#home-contact">Contact</a>
        </div>

        <div className="nav-lang" aria-label="Language">
          <a className="nav-item lang-item" href="/en/">EN</a>
          <a className="nav-item lang-item" href="/tr/">TR</a>
          <a className="nav-item lang-item" href="/no/">NO</a>
        </div>
      </div>
    </nav>
  );
}