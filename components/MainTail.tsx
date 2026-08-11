import Reveal from "@/components/Reveal";
import SymptomNav from "@/components/SymptomNav";
import TrustStrip from "@/components/TrustStrip";
import FaqList from "@/components/Faq";
import ConsultForm from "@/components/ConsultForm";
import Ornament from "@/components/Ornament";
import { generalFaq } from "@/lib/faq";

/** 메인 신뢰 테일 — 나선 여정이 끝난 뒤 이어지는 전환·신뢰 구간 */
export default function MainTail() {
  return (
    <>
      {/* 증상 기반 진입 */}
      <section className="relative border-t border-mist/10 py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <Reveal>
            <p className="reveal text-[11px] font-semibold tracking-[0.3em] text-gold md:text-xs">
              WHAT BRINGS YOU HERE
            </p>
            <Ornament className="reveal mt-2 h-2.5 w-24" />
            <h2 className="reveal font-display mt-4 max-w-2xl text-2xl font-medium leading-snug text-mist md:text-4xl">
              오늘, 어떤 고민으로
              <br />
              <span className="text-glow-gradient">여기까지 오셨나요?</span>
            </h2>
            <p className="reveal mt-4 max-w-xl text-sm leading-relaxed text-mist/50">
              고민의 문장을 눌러보세요 — 같은 고민을 지나온 수많은 분들이 걸었던
              길로 안내합니다.
            </p>
          </Reveal>
          <Reveal className="mt-10">
            <div className="reveal">
              <SymptomNav />
            </div>
          </Reveal>
        </div>
      </section>

      {/* 숫자 신뢰 스트립 */}
      <section className="relative border-t border-mist/10 py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <Reveal>
            <div className="reveal">
              <TrustStrip />
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ + 상담 폼 */}
      <section className="relative border-t border-mist/10 py-24 md:py-32">
        <div className="mx-auto grid max-w-6xl gap-14 px-5 md:grid-cols-2 md:gap-16 md:px-8">
          <Reveal>
            <p className="reveal text-[11px] font-semibold tracking-[0.3em] text-gold md:text-xs">
              FAQ
            </p>
            <Ornament className="reveal mt-2 h-2.5 w-24" />
            <h2 className="reveal font-display mt-4 text-2xl font-medium leading-snug text-mist md:text-3xl">
              묻기 어려웠던 질문들,
              <br />
              먼저 답해 드립니다
            </h2>
            <div className="reveal mt-8">
              <FaqList items={generalFaq} />
            </div>
          </Reveal>
          <Reveal>
            <p className="reveal text-[11px] font-semibold tracking-[0.3em] text-gold md:text-xs">
              PRIVATE CONSULT
            </p>
            <Ornament className="reveal mt-2 h-2.5 w-24" />
            <h2 className="reveal font-display mt-4 text-2xl font-medium leading-snug text-mist md:text-3xl">
              비공개 상담 신청
            </h2>
            <p className="reveal mt-3 text-sm leading-relaxed text-mist/50">
              가명으로 남기셔도 됩니다. 확인 후 원하시는 시간대에 조용히
              연락드립니다.
            </p>
            <div className="reveal mt-6">
              <ConsultForm />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
