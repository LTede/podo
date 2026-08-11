import Reveal from "@/components/Reveal";
import { services } from "@/lib/clinic";

export default function Services() {
  const [signature, ...rest] = services;

  return (
    <section id="services" className="bg-ivory/55 py-28 md:py-40">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <p className="reveal text-[11px] font-semibold tracking-[0.3em] text-gold md:text-xs">
            MEDICAL SERVICES
          </p>
          <div className="reveal mt-5 flex flex-wrap items-end justify-between gap-6">
            <h2 className="font-display text-3xl font-medium leading-snug tracking-tight text-charcoal md:text-5xl">
              오늘의 고민이 무엇이든,
              <br />
              <span className="text-wine">해답은 이미 준비되어 있습니다</span>
            </h2>
            <p className="max-w-xs pb-2 text-sm leading-relaxed text-charcoal/55">
              25년의 임상과 연구로 정립된 진료 체계 — 진단부터 회복까지 한
              공간에서 이루어집니다.
            </p>
          </div>
        </Reveal>

        <Reveal className="mt-14 grid gap-5 md:mt-20 md:grid-cols-3" stagger={0.09}>
          {/* 시그니처 카드 — 외음부성형 */}
          <a
            href="#visit"
            className="reveal group relative overflow-hidden rounded-3xl bg-wine p-8 text-ivory shadow-2xl shadow-wine/25 transition-transform duration-500 hover:-translate-y-1.5 md:col-span-2 md:p-12"
          >
            <div
              aria-hidden
              className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-grape-soft/30 blur-3xl transition-transform duration-700 group-hover:scale-125"
            />
            <p className="text-[11px] font-semibold tracking-[0.28em] text-gold-soft">
              SIGNATURE · {signature.en.toUpperCase()}
            </p>
            <h3 className="font-display mt-4 text-3xl font-semibold md:text-4xl">
              {signature.label}
            </h3>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-ivory/75">
              {signature.desc}
            </p>
            <ul className="mt-8 flex flex-wrap gap-2">
              {signature.items.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-ivory/25 px-4 py-1.5 text-[13px] text-ivory/85"
                >
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-10 inline-flex items-center gap-2 text-sm font-semibold text-gold-soft">
              상담 예약하기
              <span className="transition-transform duration-300 group-hover:translate-x-1.5">
                →
              </span>
            </p>
          </a>

          {rest.map((s) => (
            <a
              key={s.key}
              href="#visit"
              className="reveal group rounded-3xl border border-line bg-white/60 p-8 transition-all duration-500 hover:-translate-y-1.5 hover:border-wine/30 hover:shadow-xl hover:shadow-wine/10"
            >
              <p className="text-[11px] font-semibold tracking-[0.28em] text-gold">
                {s.en.toUpperCase()}
              </p>
              <h3 className="font-display mt-3 text-2xl font-semibold text-charcoal transition-colors group-hover:text-wine">
                {s.label}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-charcoal/60">
                {s.desc}
              </p>
              <ul className="mt-6 flex flex-wrap gap-1.5">
                {s.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full bg-ivory-deep px-3 py-1 text-xs text-charcoal/60"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </a>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
