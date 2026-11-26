import useFixedElementHeight from "../hooks/useFixedElementHeight";

export default function Footer() {
  const footerRef = useFixedElementHeight("--footer-height");

  return (
    <footer ref={footerRef} className="footer">
      © {new Date().getFullYear()} Tuna Baydin — All rights reserved.{" "}
      <span className="tag">@ttunartt</span>
    </footer>
  );
}