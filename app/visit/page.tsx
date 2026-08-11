import type { Metadata } from "next";
import SubpageShell from "@/components/SubpageShell";
import Visit from "@/components/sections/Visit";
import ConsultForm from "@/components/ConsultForm";
import Reveal from "@/components/Reveal";
import Ornament from "@/components/Ornament";

export const metadata: Metadata = {
  title: "예약 · 오시는길 | 강남역 야간진료 — 포도여성의원",
  description:
    "강남역·신논현역 도보권, 평일 저녁 7시까지 야간진료. 비공개 상담 신청 — 가명 상담 가능, 02-3442-4454.",
};

export default function VisitPage() {
  return (
    <SubpageShell>
      <Visit />
      {/* 비공개 상담 폼 — 플로팅 바의 '상담 신청' 도착 지점 */}
      <section id="consult" className="relative scroll-mt-24 pb-28">
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          <Reveal>
            <p className="reveal text-[11px] font-semibold tracking-[0.3em] text-gold md:text-xs">
              PRIVATE CONSULT
            </p>
            <Ornament className="reveal mt-2 h-2.5 w-24" />
            <h2 className="reveal font-display mt-4 text-2xl font-medium text-mist md:text-3xl">
              비공개 상담 신청
            </h2>
            <p className="reveal mt-3 text-sm leading-relaxed text-mist/50">
              가명으로 남기셔도 됩니다. 확인 후 원하시는 시간대에 조용히
              연락드립니다.
            </p>
            <div className="reveal mt-7">
              <ConsultForm />
            </div>
          </Reveal>
        </div>
      </section>
    </SubpageShell>
  );
}
