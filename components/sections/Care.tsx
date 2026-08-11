import Reveal from "@/components/Reveal";
import { careSystem, privacyProgram } from "@/lib/content";

/* 시설 사진 슬롯 — 실제 사진 수급 시 /public/images/facility-*.jpg 로 교체 */
const FACILITY_SLOTS = [
  { label: "VIP 입원실 6실", desc: "5성급 호텔룸 콘셉트", tone: "from-wine/70 via-wine-deep to-grape/50" },
  { label: "프라이빗 상담실", desc: "1:1 비공개 상담", tone: "from-grape/60 via-wine-deep to-gold/30" },
  { label: "수술실 · 회복실", desc: "방역 · 멸균관리 프로그램", tone: "from-noir-3 via-wine/60 to-rose-deep/40" },
];

export default function Care() {
  return (
    <section id="care" className="relative py-28 md:py-40">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <p className="reveal text-[11px] font-semibold tracking-[0.3em] text-gold md:text-xs">
            SAFETY &amp; EMOTIONAL CARE
          </p>
          <h2 className="reveal font-display mt-5 max-w-3xl text-3xl font-medium leading-snug tracking-tight text-mist md:text-5xl">
            병원에 왔다는 사실조차
            <br />
            <span className="text-glow-gradient">아무도 모르게</span>
          </h2>
          <p className="reveal mt-6 max-w-xl text-[15px] leading-relaxed text-mist/50">
            안전을 모든 진료의 최우선 가치로 — 개원 이래 지켜온 안전 원칙
            위에, 마음까지 살피는 감성케어를 더했습니다.
          </p>
        </Reveal>

        {/* 시설 이미지 슬롯 */}
        <Reveal className="mt-14 grid gap-5 md:mt-20 md:grid-cols-3" stagger={0.1}>
          {FACILITY_SLOTS.map((f, i) => (
            <figure
              key={f.label}
              className={`reveal group relative overflow-hidden rounded-3xl ring-1 ring-mist/10 ${
                i === 0 ? "md:-translate-y-6" : i === 2 ? "md:translate-y-6" : ""
              }`}
            >
              <div
                className={`aspect-[4/5] bg-gradient-to-br ${f.tone} transition-transform duration-700 group-hover:scale-105`}
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-noir/85 to-transparent p-6">
                <p className="font-display text-lg font-medium text-mist">
                  {f.label}
                </p>
                <p className="mt-1 text-[11px] text-mist/50">{f.desc}</p>
              </figcaption>
            </figure>
          ))}
        </Reveal>

        {/* 안전수술 · 감성케어 6단계 — 기존 사이트의 실제 케어 체계 */}
        <Reveal
          className="mt-20 grid gap-8 border-t border-mist/10 pt-14 md:mt-28 md:grid-cols-3 md:gap-x-8 md:gap-y-12"
          stagger={0.07}
        >
          {careSystem.map((c) => (
            <div key={c.step} className="reveal">
              <p className="text-[11px] font-semibold tracking-[0.25em] text-gold">
                STEP {c.step}
              </p>
              <h3 className="font-display mt-3 text-xl font-semibold text-mist">
                {c.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-mist/50">
                {c.desc}
              </p>
            </div>
          ))}
        </Reveal>

        {/* 프라이버시 보호 프로그램 */}
        <Reveal className="mt-16 md:mt-24">
          <div className="reveal rounded-3xl bg-gradient-to-br from-wine via-wine-deep to-grape p-8 ring-1 ring-rose/20 md:p-12">
            <p className="text-[11px] font-semibold tracking-[0.28em] text-gold-soft">
              PRIVACY PROTECTION PROGRAM
            </p>
            <h3 className="font-display mt-3 text-2xl font-semibold text-cream md:text-3xl">
              당신의 방문은 기록되지 않은 시간처럼
            </h3>
            <ul className="mt-7 grid gap-3 md:grid-cols-2">
              {privacyProgram.map((p) => (
                <li
                  key={p}
                  className="flex items-baseline gap-3 text-sm leading-relaxed text-mist/75"
                >
                  <span aria-hidden className="text-gold-soft">◆</span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
