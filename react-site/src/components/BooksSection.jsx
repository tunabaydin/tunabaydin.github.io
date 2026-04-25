import { useParams } from "react-router-dom";
import { siteContent } from "../content/siteContent";

export default function BooksSection() {
  const { lang } = useParams();
  const content = siteContent[lang] || siteContent.en;
  const booksContent = content.books || siteContent.en.books;

  return (
    <section id="home-books" aria-labelledby="home-books-title">
      <div className="books-card">
        <h2 id="home-books-title">{booksContent.title}</h2>
        <ul>
          {booksContent.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
