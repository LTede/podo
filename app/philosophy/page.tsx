import type { Metadata } from "next";
import SubpageShell from "@/components/SubpageShell";
import Philosophy from "@/components/sections/Philosophy";

export const metadata: Metadata = {
  title: "포도 철학 | 거울 앞의 나를 다시 사랑하기 위해 — 포도여성의원",
  description:
    "프라이빗 · 오리지널 · 감성케어. 아름다움은 보여주기 위한 것이 아니라 스스로 확신하기 위한 것 — 포도여성의원의 철학.",
  openGraph: {
    title: "포도 철학 | 거울 앞의 나를 다시 사랑하기 위해 — 포도여성의원",
    description: "프라이빗 · 오리지널 · 감성케어. 아름다움은 보여주기 위한 것이 아니라 스스로 확신하기 위한 것 — 포도여성의원의 철학.",
    type: "website",
  },
};

export default function PhilosophyPage() {
  return (
    <SubpageShell>
      <Philosophy />
    </SubpageShell>
  );
}
