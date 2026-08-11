import Header from "@/components/Header";
import IntroOverlay from "@/components/IntroOverlay";
import Nebula from "@/components/gl/Nebula";
import SpiralStage from "@/components/spiral/SpiralStage";
import LandingHero from "@/components/sections/LandingHero";
import {
  ChapterPhilosophy,
  ChapterSignature,
  ChapterCenters,
  ChapterDoctor,
  ChapterCare,
  ChapterAbout,
  ChapterVisit,
} from "@/components/spiral/chapters";
import MainTail from "@/components/MainTail";
import ConsultBar from "@/components/ConsultBar";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nebula vine />
      <IntroOverlay />
      <Header />
      <main className="pb-20 md:pb-0">
        <LandingHero />
        <SpiralStage>
          <ChapterPhilosophy />
          <ChapterSignature />
          <ChapterCenters />
          <ChapterDoctor />
          <ChapterCare />
          <ChapterAbout />
          <ChapterVisit />
        </SpiralStage>
        <MainTail />
      </main>
      <ConsultBar />
      <Footer />
    </>
  );
}
