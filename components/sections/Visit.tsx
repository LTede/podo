import Reveal from "@/components/Reveal";
import { clinic } from "@/lib/clinic";

export default function Visit() {
  return (
    <section id="visit" className="bg-ivory/45 py-28 md:py-40">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="grid gap-14 md:grid-cols-2 md:gap-20">
          <Reveal>
            <p className="reveal text-[11px] font-semibold tracking-[0.3em] text-gold md:text-xs">
              RESERVATION
            </p>
            <h2 className="reveal font-display mt-5 text-3xl font-medium leading-snug tracking-tight text-charcoal md:text-5xl">
              고민하는 시간이
              <br />
              가장 깁니다.
              <br />
              <span className="text-wine">시작은 전화 한 통.</span>
            </h2>
            <p className="reveal mt-6 max-w-md text-[15px] leading-relaxed text-charcoal/60">
              어떤 질문이든 편하게 물어보세요. 상담은 비공개로 진행되며, 원장이
              직접 답합니다. 평일 저녁 7시까지 — 퇴근 후에도 늦지 않습니다.
            </p>
            <div className="reveal mt-10 flex flex-wrap gap-4">
              <a
                href={clinic.phoneHref}
                className="rounded-full bg-wine px-8 py-4 text-[15px] font-semibold text-ivory shadow-xl shadow-wine/25 transition-all hover:-translate-y-0.5 hover:bg-wine-deep"
              >
                {clinic.phone}
              </a>
              <a
                href={clinic.naverMapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-charcoal/15 bg-white/60 px-8 py-4 text-[15px] font-medium text-charcoal transition-colors hover:border-wine/40 hover:text-wine"
              >
                네이버 지도로 길찾기 ↗
              </a>
            </div>
          </Reveal>

          <Reveal stagger={0.08}>
            <div className="reveal rounded-3xl border border-line bg-white/70 p-8 md:p-10">
              <h3 className="font-display text-xl font-semibold text-charcoal">
                진료 시간
              </h3>
              <ul className="mt-6 divide-y divide-line">
                {clinic.hours.map((h) => (
                  <li
                    key={h.day}
                    className="flex items-baseline justify-between py-4"
                  >
                    <span className="text-[15px] font-medium text-charcoal">
                      {h.day}
                    </span>
                    <span className="text-[15px] text-charcoal/65">
                      {h.time}
                      {h.note && (
                        <em className="ml-2 not-italic text-[12px] font-semibold text-gold">
                          {h.note}
                        </em>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="reveal mt-5 rounded-3xl bg-wine p-8 text-ivory md:p-10">
              <h3 className="font-display text-xl font-semibold">오시는 길</h3>
              <p className="mt-4 text-[15px] leading-relaxed text-ivory/80">
                {clinic.address}
              </p>
              <p className="mt-2 text-[13px] text-gold-soft">
                {clinic.addressShort} — 지하철 2호선 · 신분당선
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
