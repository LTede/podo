import Header from "@/components/Header";
import IntroOverlay from "@/components/IntroOverlay";
import Nebula from "@/components/gl/Nebula";
import Hero from "@/components/sections/Hero";
import Philosophy from "@/components/sections/Philosophy";
import Services from "@/components/sections/Services";
import Doctor from "@/components/sections/Doctor";
import Care from "@/components/sections/Care";
import Visit from "@/components/sections/Visit";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nebula />
      <IntroOverlay />
      <Header />
      <main>
        <Hero />
        <Philosophy />
        <Services />
        <Doctor />
        <Care />
        <Visit />
      </main>
      <Footer />
    </>
  );
}
