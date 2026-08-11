import type { Metadata } from "next";
import SubpageShell from "@/components/SubpageShell";
import Care from "@/components/sections/Care";

export const metadata: Metadata = {
  title: "안전수술 · 감성케어 | 전 객실 VIP 1인실 — 포도여성의원",
  description:
    "안심종합검사부터 10년 무상 사후관리까지 6단계 안전 시스템. 전 객실 VIP 1인실, 예약제 프라이버시 동선 — 강남 포도여성의원.",
  openGraph: {
    title: "안전수술 · 감성케어 | 전 객실 VIP 1인실 — 포도여성의원",
    description: "안심종합검사부터 10년 무상 사후관리까지 6단계 안전 시스템. 전 객실 VIP 1인실, 예약제 프라이버시 동선 — 강남 포도여성의원.",
    type: "website",
  },
};

export default function CarePage() {
  return (
    <SubpageShell>
      <Care />
    </SubpageShell>
  );
}
