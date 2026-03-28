import { Navigate, useParams } from "react-router-dom";
import ArtDetail from "./ArtDetail";
import { otherProjectDetailsData } from "../data/otherProjectDetailsData";
import ProjectDetail from "./ProjectDetail";

export default function DetailRouter() {
  const { lang, slug } = useParams();

  if (otherProjectDetailsData[slug]) {
  return <ProjectDetail />;
}

  return <ArtDetail />;
}