import Reveal from "@/components/Reveal";
import Tilt from "@/components/Tilt";
import { services } from "@/lib/clinic";

export default function Services() {
  const [signature, ...rest] = services;

  return (
    <section id="services" className="relative py-28 md:py-40">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <p className="reveal text-[11px] font-semibold tracking-[0.3em] text-gold md:text-xs">
            MEDICAL SERVICES
          </p>
          <div className="reveal mt-5 flex flex-wrap items-end justify-between gap-6">
            <h2 className="font-display text-3xl font-medium leading-snug tracking-tight text-mist md:text-5xl">
              오늘의 고민이 무엇이든,
              <br />
              <span className="text-glow-gradient">
                해답은 이미 준비되어 있습니다
              </span>
            </h2>
            <p className="max-w-xs pb-2 text-sm leading-relaxed text-mist/45">
              25년의 임상과 연구로 정립된 진료 체계 — 진단부터 회복까지 한
              공간에서 이루어집니다.
            </p>
          </div>
        </Reveal>

        <Reveal className="mt-14 grid gap-5 md:mt-20 md:grid-cols-3" stagger={0.09}>
          {/* 시그니처 카드 — 외음부성형 */}
          <Tilt className="reveal md:col-span-2" max={5}>
          <a
            href={`/services/${signature.key}`}
            className="group relative block h-full overflow-hidden rounded-3xl bg-gradient-to-br from-wine via-noir-3 to-grape p-8 shadow-[0_0_60px_rgba(141,68,103,0.35)] ring-1 ring-rose/20 md:p-12"
          >
            <div
              aria-hidden
              className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-rose/25 blur-3xl transition-transform duration-700 group-hover:scale-125"
            />
            <p className="text-[11px] font-semibold tracking-[0.28em] text-gold-soft">
              SIGNATURE · {signature.en.toUpperCase()}
            </p>
            <h3 className="font-display mt-4 text-3xl font-semibold text-mist md:text-4xl">
              {signature.label}
            </h3>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-mist/65">
              {signature.desc}
            </p>
            <ul className="mt-8 flex flex-wrap gap-2">
              {signature.items.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-mist/20 px-4 py-1.5 text-[13px] text-mist/80"
                >
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-10 inline-flex items-center gap-2 text-sm font-semibold text-gold-soft">
              자세히 보기
              <span className="transition-transform duration-300 group-hover:translate-x-1.5">
                →
              </span>
            </p>
          </a>
          </Tilt>

          {rest.map((s) => (
            <Tilt key={s.key} className="reveal" max={9}>
            <a
              href={`/services/${s.key}`}
              className="glass group block h-full rounded-3xl p-8 transition-colors duration-500 hover:border-rose/40"
            >
              <p className="text-[11px] font-semibold tracking-[0.28em] text-gold">
                {s.en.toUpperCase()}
              </p>
              <h3 className="font-display mt-3 text-2xl font-semibold text-mist transition-colors group-hover:text-rose">
                {s.label}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-mist/50">
                {s.desc}
              </p>
              <ul className="mt-6 flex flex-wrap gap-1.5">
                {s.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full bg-white/5 px-3 py-1 text-xs text-mist/55"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </a>
            </Tilt>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
