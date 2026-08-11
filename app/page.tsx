import Header from "@/components/Header";
import IntroOverlay from "@/components/IntroOverlay";
import Nebula from "@/components/gl/Nebula";
import SpiralStage from "@/components/spiral/SpiralStage";
import {
  ChapterHero,
  ChapterPhilosophy,
  ChapterServices,
  ChapterDoctor,
  ChapterCare,
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
          <ChapterServices />
          <ChapterDoctor />
          <ChapterCare />
          <ChapterVisit />
        </SpiralStage>
      </main>
      <Footer />
    </>
  );
}
