import type { Metadata } from "next";
import SubpageShell from "@/components/SubpageShell";
import Doctor from "@/components/sections/Doctor";

export const metadata: Metadata = {
  title: "의료진 소개 | 여성성형 교과서의 저자 — 포도여성의원",
  description:
    "연세대 의대 · 의학박사 모형진 원장. 여성성형 교과서 집필, 무봉합 레이저 3D 소음순성형 개발, 누적 수술 3만 례 — 강남 포도여성의원.",
  openGraph: {
    title: "의료진 소개 | 여성성형 교과서의 저자 — 포도여성의원",
    description: "연세대 의대 · 의학박사 모형진 원장. 여성성형 교과서 집필, 무봉합 레이저 3D 소음순성형 개발, 누적 수술 3만 례 — 강남 포도여성의원.",
    type: "website",
  },
};

export default function DoctorPage() {
  return (
    <SubpageShell>
      <Doctor />
    </SubpageShell>
  );
}
