import { useParams } from "react-router-dom";
import { siteContent } from "../content/siteContent";


export default function ArtistSection() {
  const { lang } = useParams();
  const content = siteContent[lang] || siteContent.en;

  return (
    <section id="home-artist">
      <main className="wrap">
        <div className="portrait">
          <img src="/tunartist.jpg" alt="Tuna Baydin portrait" />
        </div>

        <h1 className="section-title-left">{content.artist.title}</h1>

        <p>{content.artist.text1}</p>
<p>{content.artist.text2}</p>
<p>{content.artist.text3}</p>
<p>{content.artist.text4}</p>
<p>{content.artist.text5}</p>
      </main>
    </section>
  );
}