import Header from "@/components/Header";
import IntroOverlay from "@/components/IntroOverlay";
import Nebula from "@/components/gl/Nebula";
import SpiralStage from "@/components/spiral/SpiralStage";
import {
  ChapterHero,
  ChapterPhilosophy,
  ChapterSignature,
  ChapterCenters,
  ChapterDoctor,
  ChapterCare,
  ChapterAbout,
  ChapterVisit,
} from "@/components/spiral/chapters";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nebula vine />
      <IntroOverlay />
      <Header />
      <main>
        <SpiralStage>
          <ChapterHero />
          <ChapterPhilosophy />
          <ChapterSignature />
          <ChapterCenters />
          <ChapterDoctor />
          <ChapterCare />
          <ChapterAbout />
          <ChapterVisit />
        </SpiralStage>
      </main>
      <Footer />
    </>
  );
}
