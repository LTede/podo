import Reveal from "@/components/Reveal";
import { clinic } from "@/lib/clinic";

const STATS = [
  { value: "25+", label: "여성성형 임상 연차" },
  { value: "100인", label: "세계 여성성형 의료인 선정" },
  { value: "1st", label: "여성성형 교과서 집필" },
  { value: "6실", label: "프리미엄 VIP 입원실" },
];

export default function Doctor() {
  const { doctor } = clinic;

  return (
    <section
      id="doctor"
      className="relative overflow-hidden bg-wine-deep/85 py-28 text-ivory md:py-40"
    >
      {/* 배경 장식 */}
      <div
        aria-hidden
        className="absolute -right-40 top-0 h-[36rem] w-[36rem] rounded-full bg-wine/60 blur-[130px]"
      />
      <div
        aria-hidden
        className="absolute -left-40 bottom-0 h-[28rem] w-[28rem] rounded-full bg-grape/30 blur-[130px]"
      />

      <div className="relative mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <p className="reveal text-[11px] font-semibold tracking-[0.3em] text-gold-soft md:text-xs">
            MEDICAL DIRECTOR
          </p>
          <h2 className="reveal font-display mt-5 max-w-3xl text-3xl font-medium leading-snug tracking-tight md:text-5xl">
            전문의들이 펼쳐보는 교과서,
            <br />
            <span className="text-gold-soft">그 저자에게 직접 받는 진료</span>
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-12 md:mt-24 md:grid-cols-[2fr_3fr] md:gap-20">
          {/* 프로필 이미지 슬롯 — 실제 사진 수급 시 /public/images/doctor.jpg 로 교체 */}
          <Reveal>
            <figure className="reveal relative aspect-[3/4] overflow-hidden rounded-3xl border border-ivory/10 bg-gradient-to-br from-wine via-wine-deep to-grape/40">
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <span className="font-display text-5xl font-semibold tracking-widest text-ivory/20">
                  PODO
                </span>
                <span className="text-[11px] tracking-[0.3em] text-ivory/30">
                  DR. MO HYUNG-JIN
                </span>
              </div>
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-wine-deep to-transparent p-6">
                <p className="font-display text-2xl font-semibold">
                  {doctor.name} <span className="text-base font-normal">원장</span>
                </p>
                <p className="mt-1 text-[13px] text-ivory/60">{doctor.title}</p>
              </figcaption>
            </figure>
          </Reveal>

          {/* 이력 */}
          <Reveal stagger={0.06}>
            <ul className="reveal divide-y divide-ivory/10 border-y border-ivory/10">
              {doctor.credentials.map((c) => (
                <li
                  key={c}
                  className="flex items-baseline gap-4 py-4 text-[15px] leading-relaxed text-ivory/80"
                >
                  <span aria-hidden className="text-gold-soft">
                    ◆
                  </span>
                  {c}
                </li>
              ))}
            </ul>
            <p className="reveal mt-8 text-sm leading-relaxed text-ivory/50">
              레이저 3D 소음순성형 등 다수 술식을 직접 개발 — 수술의 처음과
              끝을 원장이 책임집니다.
            </p>
          </Reveal>
        </div>

        {/* 스탯 */}
        <Reveal className="mt-20 grid grid-cols-2 gap-8 border-t border-ivory/10 pt-12 md:mt-28 md:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="reveal text-center md:text-left">
              <p className="font-display text-4xl font-semibold text-gold-soft md:text-5xl">
                {s.value}
              </p>
              <p className="mt-2 text-[12px] tracking-wide text-ivory/55 md:text-[13px]">
                {s.label}
              </p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
