import Link from "next/link";
import { clinic, services } from "@/lib/clinic";

/** 나선 무대 위 챕터 패널들 — 포도줄기를 감아 도는, 각 페이지로 향하는 카드 */

const shell =
  "rounded-[2rem] border border-mist/10 bg-[rgba(24,13,20,0.82)] p-7 shadow-[0_0_90px_rgba(109,39,67,0.28)] md:p-11";

const eyebrow =
  "text-[10px] font-semibold tracking-[0.32em] text-gold md:text-[11px]";

/** 카드 하단 — 해당 서브페이지로 들어가는 포털 링크 */
function PageLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="group mt-7 inline-flex items-center gap-2.5 text-sm font-semibold text-gold-soft transition-colors hover:text-rose"
    >
      <span className="block h-1.5 w-1.5 rounded-full bg-gradient-to-br from-rose to-wine shadow-[0_0_8px_rgba(217,139,166,0.9)]" />
      {label}
      <span
        aria-hidden
        className="transition-transform duration-300 group-hover:translate-x-1.5"
      >
        →
      </span>
    </Link>
  );
}

export function ChapterHero() {
  return (
    <article className={shell}>
      <p className={eyebrow}>GANGNAM · PRIVATE WOMEN&apos;S CLINIC</p>
      <h1 className="font-display mt-5 text-4xl font-medium leading-[1.15] tracking-tight text-mist md:text-6xl">
        가장 사적인
        <br />
        아름다움까지,
        <br />
        <span className="text-glow-gradient">당당하게.</span>
      </h1>
      <p className="mt-6 max-w-md text-sm leading-relaxed text-mist/55 md:text-base">
        여성성형 교과서를 집필한 산부인과 전문의가 상담부터 회복까지 직접 —
        포도여성의원은 <span className="font-semibold text-rose">당신의 자신감</span>을
        설계합니다.
      </p>
      <div className="mt-8 flex flex-wrap items-center gap-3">
        <a
          href="#visit"
          className="rounded-full bg-gradient-to-r from-wine to-grape px-7 py-3.5 text-sm font-semibold text-mist shadow-[0_0_32px_rgba(141,68,103,0.55)] transition-transform hover:-translate-y-0.5"
        >
          나를 위한 상담 예약
        </a>
        <a
          href={clinic.phoneHref}
          className="rounded-full border border-mist/15 px-7 py-3.5 text-sm font-medium text-mist/80 transition-colors hover:border-rose/40 hover:text-rose"
        >
          {clinic.phone}
        </a>
      </div>
      <p className="mt-8 text-[10px] tracking-[0.25em] text-mist/30">
        연세대 의대 · 여성성형 교과서 저자 · 세계 100대 의료인 · VIP 입원실 6실
      </p>
    </article>
  );
}

export function ChapterPhilosophy() {
  return (
    <article className={shell}>
      <p className={eyebrow}>01 · PODO PHILOSOPHY</p>
      <blockquote className="font-display mt-6 text-xl font-medium leading-[1.65] text-mist md:text-3xl">
        아름다움은 보여주기 위한 것이 아니라,
        <br />
        <span className="text-glow-gradient">
          거울 앞의 나를 다시 사랑하기 위한 것.
        </span>
        <br />
        말하지 못했던 고민이 자신감이 되는 곳.
      </blockquote>
      <div className="mt-8 grid gap-4 border-t border-mist/10 pt-7 md:grid-cols-3">
        {[
          ["프라이빗", "누구와도 마주치지 않는 1:1 동선"],
          ["오리지널", "기준을 만든 교과서가 쓰인 곳"],
          ["감성케어", "수술보다 마음을 먼저 살피는 곳"],
        ].map(([t, d]) => (
          <div key={t}>
            <p className="font-display text-lg font-semibold text-rose">{t}</p>
            <p className="mt-1.5 text-[13px] leading-relaxed text-mist/50">
              {d}
            </p>
          </div>
        ))}
      </div>
      <PageLink href="/philosophy" label="포도 철학 자세히" />
    </article>
  );
}

export function ChapterServices() {
  return (
    <article className={shell}>
      <p className={eyebrow}>02 · MEDICAL SERVICES</p>
      <h2 className="font-display mt-5 text-2xl font-medium leading-snug text-mist md:text-4xl">
        오늘의 고민이 무엇이든,
        <br />
        <span className="text-glow-gradient">해답은 준비되어 있습니다</span>
      </h2>
      <ul className="mt-7 grid gap-2.5 md:grid-cols-2">
        {services.map((s) => (
          <li
            key={s.key}
            className="group rounded-2xl border border-mist/10 bg-white/[0.03] px-5 py-3.5 transition-colors hover:border-rose/40"
          >
            <div className="flex items-baseline justify-between gap-3">
              <p className="font-display text-base font-semibold text-mist group-hover:text-rose md:text-lg">
                {s.label}
              </p>
              <p className="text-[9px] tracking-[0.2em] text-gold">
                {s.en.toUpperCase()}
              </p>
            </div>
            <p className="mt-1 truncate text-[12px] text-mist/45">{s.desc}</p>
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-between">
        <PageLink href="/services" label="진료 안내 자세히" />
        <p className="mt-7 text-sm font-semibold text-mist/50">
          <a href="#visit" className="transition-colors hover:text-rose">
            상담 예약 →
          </a>
        </p>
      </div>
    </article>
  );
}

export function ChapterDoctor() {
  const { doctor } = clinic;
  return (
    <article className={shell}>
      <p className={eyebrow}>03 · MEDICAL DIRECTOR</p>
      <h2 className="font-display mt-5 text-2xl font-medium leading-snug text-mist md:text-4xl">
        전문의들이 펼쳐보는 교과서,
        <br />
        <span className="text-glow-gradient">그 저자에게 받는 진료</span>
      </h2>
      <div className="mt-7 flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <p className="font-display text-2xl font-semibold text-mist">
          {doctor.name} <span className="text-base font-normal">원장</span>
        </p>
        <p className="text-[13px] text-mist/50">{doctor.title}</p>
      </div>
      <ul className="mt-5 space-y-2.5 border-t border-mist/10 pt-5">
        {doctor.credentials.slice(0, 5).map((c) => (
          <li
            key={c}
            className="flex items-baseline gap-3 text-[13px] leading-relaxed text-mist/70 md:text-sm"
          >
            <span aria-hidden className="text-gold">◆</span>
            {c}
          </li>
        ))}
      </ul>
      <div className="mt-7 grid grid-cols-4 gap-3 border-t border-mist/10 pt-6 text-center">
        {[
          ["25+", "임상 연차"],
          ["100인", "세계 선정"],
          ["1st", "교과서 집필"],
          ["6실", "VIP 입원실"],
        ].map(([v, l]) => (
          <div key={l}>
            <p className="text-glow-gradient font-display text-xl font-semibold md:text-3xl">
              {v}
            </p>
            <p className="mt-1 text-[10px] text-mist/45 md:text-[11px]">{l}</p>
          </div>
        ))}
      </div>
      <PageLink href="/doctor" label="의료진 소개 자세히" />
    </article>
  );
}

export function ChapterCare() {
  return (
    <article className={shell}>
      <p className={eyebrow}>04 · SAFETY &amp; EMOTIONAL CARE</p>
      <h2 className="font-display mt-5 text-2xl font-medium leading-snug text-mist md:text-4xl">
        병원에 왔다는 사실조차
        <br />
        <span className="text-glow-gradient">아무도 모르게</span>
      </h2>
      <p className="mt-4 max-w-md text-[13px] leading-relaxed text-mist/50 md:text-sm">
        접수부터 회복, 귀가까지 다른 환자와 마주치지 않는 프라이버시 동선 —
        당신의 시간은 온전히 당신의 것입니다.
      </p>
      <div className="mt-7 grid gap-4 md:grid-cols-2">
        {[
          ["STEP 1", "1:1 프라이빗 상담", "원장이 직접, 충분한 시간을 들여"],
          ["STEP 2", "안전수술 시스템", "마취과 협진 · 응급 대응 · 정밀 검사"],
          ["STEP 3", "VIP 회복 케어", "프리미엄 입원실 6실, 비공개 회복"],
          ["STEP 4", "평생 사후관리", "정기 검진과 관리로 결과를 오래"],
        ].map(([s, t, d]) => (
          <div
            key={s}
            className="rounded-2xl border border-mist/10 bg-white/[0.03] p-4"
          >
            <p className="text-[9px] font-semibold tracking-[0.25em] text-gold">
              {s}
            </p>
            <p className="font-display mt-1.5 text-base font-semibold text-mist">
              {t}
            </p>
            <p className="mt-1 text-[12px] text-mist/45">{d}</p>
          </div>
        ))}
      </div>
      <PageLink href="/care" label="안전수술 · 감성케어 자세히" />
    </article>
  );
}

export function ChapterVisit() {
  return (
    <article className={shell}>
      <p className={eyebrow}>05 · RESERVATION</p>
      <h2 className="font-display mt-5 text-2xl font-medium leading-snug text-mist md:text-4xl">
        고민하는 시간이 가장 깁니다.
        <br />
        <span className="text-glow-gradient">시작은 전화 한 통.</span>
      </h2>
      <ul className="mt-7 divide-y divide-mist/10 border-y border-mist/10">
        {clinic.hours.map((h) => (
          <li key={h.day} className="flex items-baseline justify-between py-3">
            <span className="text-sm font-medium text-mist">{h.day}</span>
            <span className="text-sm text-mist/55">
              {h.time}
              {h.note && (
                <em className="ml-2 not-italic text-[11px] font-semibold text-gold">
                  {h.note}
                </em>
              )}
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-5 text-[13px] leading-relaxed text-mist/60">
        {clinic.address}
        <br />
        <span className="text-gold-soft">{clinic.addressShort}</span>
      </p>
      <div className="mt-7 flex flex-wrap gap-3">
        <a
          href={clinic.phoneHref}
          className="rounded-full bg-gradient-to-r from-wine to-grape px-7 py-3.5 text-sm font-semibold text-mist shadow-[0_0_32px_rgba(141,68,103,0.55)] transition-transform hover:-translate-y-0.5"
        >
          {clinic.phone} 전화 상담
        </a>
        <a
          href={clinic.naverMapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-mist/15 px-7 py-3.5 text-sm font-medium text-mist/80 transition-colors hover:border-rose/40 hover:text-rose"
        >
          네이버 지도 ↗
        </a>
      </div>
      <PageLink href="/visit" label="예약 · 오시는길 자세히" />
    </article>
  );
}
