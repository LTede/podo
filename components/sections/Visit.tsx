import Reveal from "@/components/Reveal";
import { clinic } from "@/lib/clinic";
import { consultChannels } from "@/lib/content";

export default function Visit() {
  return (
    <section id="visit" className="relative py-28 md:py-40">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="grid gap-14 md:grid-cols-2 md:gap-20">
          <Reveal>
            <p className="reveal text-[11px] font-semibold tracking-[0.3em] text-gold md:text-xs">
              RESERVATION
            </p>
            <h2 className="reveal font-display mt-5 text-3xl font-medium leading-snug tracking-tight text-mist md:text-5xl">
              고민하는 시간이
              <br />
              가장 깁니다.
              <br />
              <span className="text-glow-gradient">시작은 전화 한 통.</span>
            </h2>
            <p className="reveal mt-6 max-w-md text-[15px] leading-relaxed text-mist/50">
              어떤 질문이든 편하게 물어보세요. 상담은 비공개로 진행되며, 원장이
              직접 답합니다. 평일 저녁 7시까지 — 퇴근 후에도 늦지 않습니다.
            </p>
            <div className="reveal mt-10 flex flex-wrap gap-4">
              <a
                href={clinic.phoneHref}
                className="rounded-full bg-gradient-to-r from-wine to-grape px-8 py-4 text-[15px] font-semibold text-cream shadow-[0_0_36px_rgba(92,36,64,0.28)] transition-all hover:-translate-y-0.5 hover:shadow-[0_0_48px_rgba(168,78,110,0.3)]"
              >
                {clinic.phone}
              </a>
              <a
                href={clinic.naverMapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="glass rounded-full px-8 py-4 text-[15px] font-medium text-mist/85 transition-colors hover:border-rose/40 hover:text-rose"
              >
                네이버 지도로 길찾기 ↗
              </a>
            </div>
          </Reveal>

          <Reveal stagger={0.08}>
            <div className="glass reveal rounded-3xl p-8 md:p-10">
              <h3 className="font-display text-xl font-semibold text-mist">
                진료 시간
              </h3>
              <ul className="mt-6 divide-y divide-mist/10">
                {clinic.hours.map((h) => (
                  <li
                    key={h.day}
                    className="flex items-baseline justify-between py-4"
                  >
                    <span className="text-[15px] font-medium text-mist">
                      {h.day}
                    </span>
                    <span className="text-[15px] text-mist/55">
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
            <div className="reveal mt-5 rounded-3xl bg-gradient-to-br from-wine via-wine-deep to-grape p-8 ring-1 ring-rose/20 md:p-10">
              <h3 className="font-display text-xl font-semibold text-cream">
                오시는 길
              </h3>
              <p className="mt-4 text-[15px] leading-relaxed text-cream/75">
                {clinic.address}
              </p>
              <p className="mt-2 text-[13px] text-gold-soft">
                {clinic.addressShort} — 지하철 2호선 · 신분당선
              </p>
            </div>
          </Reveal>
        </div>

        {/* 상담 채널 4종 — 기존 사이트의 상담 체계 계승 */}
        <Reveal
          className="mt-16 grid gap-4 border-t border-mist/10 pt-12 md:grid-cols-4"
          stagger={0.07}
        >
          {consultChannels.map((c) => {
            // 채널별 실제 목적지: 온라인 상담 → 비공개 폼, 카톡 → 채널 개설 전까지 전화, 그 외 → 전화
            const href =
              c.action === "online"
                ? "#consult"
                : c.action === "kakao" && clinic.kakaoUrl
                  ? clinic.kakaoUrl
                  : clinic.phoneHref;
            return (
              <a
                key={c.label}
                href={href}
                className="glass reveal group rounded-2xl p-6 transition-colors hover:border-rose/40"
              >
                <p className="font-display text-lg font-semibold text-mist group-hover:text-rose">
                  {c.label}
                </p>
                <p className="mt-2 text-[13px] leading-relaxed text-mist/50">
                  {c.desc}
                </p>
                {c.action === "kakao" && !clinic.kakaoUrl && (
                  <p className="mt-3 text-[10px] tracking-wide text-gold">
                    채널 연결 준비 중 — 지금은 전화로 연결됩니다
                  </p>
                )}
              </a>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
