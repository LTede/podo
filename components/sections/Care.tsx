import Reveal from "@/components/Reveal";

const CARE_STEPS = [
  {
    step: "STEP 1",
    title: "1:1 프라이빗 상담",
    desc: "원장이 직접, 충분한 시간을 들여 듣습니다. 말하기 어려웠던 고민일수록 더 조심스럽게.",
  },
  {
    step: "STEP 2",
    title: "안전수술 시스템",
    desc: "마취과 협진과 응급 대응 체계, 수술 전 정밀 검사까지 — 안전은 타협하지 않습니다.",
  },
  {
    step: "STEP 3",
    title: "VIP 회복 케어",
    desc: "6개의 프리미엄 입원실에서 아무도 마주치지 않고 회복합니다. 퇴원이 아니라 일상 복귀까지가 치료입니다.",
  },
  {
    step: "STEP 4",
    title: "평생 사후관리",
    desc: "수술 후에도 정기 검진과 관리 프로그램으로 결과를 오래 지킵니다.",
  },
];

/* 시설 사진 슬롯 — 실제 사진 수급 시 /public/images/facility-*.jpg 로 교체 */
const FACILITY_SLOTS = [
  { label: "VIP 입원실", tone: "from-blush to-grape-soft/40" },
  { label: "프라이빗 상담실", tone: "from-ivory-deep to-gold-soft/40" },
  { label: "수술실 · 회복실", tone: "from-grape-soft/30 to-wine/30" },
];

export default function Care() {
  return (
    <section id="care" className="bg-ivory/55 py-28 md:py-40">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <p className="reveal text-[11px] font-semibold tracking-[0.3em] text-gold md:text-xs">
            SAFETY &amp; EMOTIONAL CARE
          </p>
          <h2 className="reveal font-display mt-5 max-w-3xl text-3xl font-medium leading-snug tracking-tight text-charcoal md:text-5xl">
            병원에 왔다는 사실조차
            <br />
            <span className="text-wine">아무도 모르게</span>
          </h2>
          <p className="reveal mt-6 max-w-xl text-[15px] leading-relaxed text-charcoal/60">
            접수부터 회복, 귀가까지 다른 환자와 마주치지 않는 프라이버시 동선.
            당신의 시간은 온전히 당신의 것입니다.
          </p>
        </Reveal>

        {/* 시설 이미지 슬롯 */}
        <Reveal className="mt-14 grid gap-5 md:mt-20 md:grid-cols-3" stagger={0.1}>
          {FACILITY_SLOTS.map((f, i) => (
            <figure
              key={f.label}
              className={`reveal group relative overflow-hidden rounded-3xl ${
                i === 0 ? "md:-translate-y-6" : i === 2 ? "md:translate-y-6" : ""
              }`}
            >
              <div
                className={`aspect-[4/5] bg-gradient-to-br ${f.tone} transition-transform duration-700 group-hover:scale-105`}
              />
              <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-charcoal/50 to-transparent p-6">
                <span className="font-display text-lg font-medium text-ivory">
                  {f.label}
                </span>
                <span className="text-[10px] tracking-[0.2em] text-ivory/60">
                  PHOTO
                </span>
              </figcaption>
            </figure>
          ))}
        </Reveal>

        {/* 케어 프로세스 */}
        <Reveal
          className="mt-20 grid gap-10 border-t border-line pt-14 md:mt-28 md:grid-cols-4 md:gap-8"
          stagger={0.08}
        >
          {CARE_STEPS.map((c) => (
            <div key={c.step} className="reveal">
              <p className="text-[11px] font-semibold tracking-[0.25em] text-gold">
                {c.step}
              </p>
              <h3 className="font-display mt-3 text-xl font-semibold text-charcoal">
                {c.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-charcoal/60">
                {c.desc}
              </p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
