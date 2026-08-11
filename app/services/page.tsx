import type { Metadata } from "next";
import SubpageShell from "@/components/SubpageShell";
import Services from "@/components/sections/Services";

export const metadata: Metadata = {
  title: "진료 안내 | 8개 센터 — 강남 포도여성의원",
  description:
    "외음부성형·질성형·요실금·산부인과·줄기세포·하이푸·성감·피부 — 25년 임상으로 정립된 8개 센터 진료 체계.",
  openGraph: {
    title: "진료 안내 | 8개 센터 — 강남 포도여성의원",
    description: "외음부성형·질성형·요실금·산부인과·줄기세포·하이푸·성감·피부 — 25년 임상으로 정립된 8개 센터 진료 체계.",
    type: "website",
  },
};

export default function ServicesPage() {
  return (
    <SubpageShell>
      <Services />
    </SubpageShell>
  );
}
