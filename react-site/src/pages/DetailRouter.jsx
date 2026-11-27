import { useParams } from "react-router-dom";
import ArtDetail from "./ArtDetail";
import { artData } from "../data/artData";
import { otherProjectDetailsData } from "../data/otherProjectDetailsData";
import ProjectDetail from "./ProjectDetail";

export default function DetailRouter({ missingPage }) {
  const { slug } = useParams();

  if (Object.hasOwn(otherProjectDetailsData, slug)) return <ProjectDetail />;
  if (artData.some((artwork) => artwork.slug === slug)) return <ArtDetail />;

  return missingPage;
}