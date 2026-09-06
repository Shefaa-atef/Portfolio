import { useEffect } from "react";
import DesignsHero from "./components/DesignsHero";
import ToolkitSection from "./components/ToolkitSection";
import LogoGallery from "./components/LogoGallery";
import InfographicGallery from "./components/InfographicGallery";
import SocialMediaGallery from "./components/SocialMediaGallery";
import VectorArtGallery from "./components/VectorArtGallery";
import CollaborationsSection from "./components/CollaborationsSection";
import DesignsContact from "./components/DesignsContact";
import SpiderCursor from "../../animations/cursor/spider/SpiderCursor.jsx";
import InvertedSelection from "../../components/common/InvertedSelection.jsx";
import "../About/AboutPage.css";
import "./DesignsPage.css";

export default function DesignsPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  return (
    <div className="min-h-full bg-white text-black">
      <SpiderCursor />
      <InvertedSelection />

      {/* Return to home button */}
      <a
        className="cv-return"
        href={import.meta.env.BASE_URL}
        aria-label="Return to the main portfolio"
      >
        <span className="cv-return__arrow" aria-hidden="true">←</span>
        <span>Back</span>
      </a>

      {/* Sections */}
      <DesignsHero />
      <ToolkitSection />
      <LogoGallery />
      <InfographicGallery />
      <SocialMediaGallery />
      <VectorArtGallery />
      <CollaborationsSection />
      <DesignsContact />
    </div>
  );
}
