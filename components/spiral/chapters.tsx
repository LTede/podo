import Link from "next/link";
import { clinic, services } from "@/lib/clinic";
import { careSystem } from "@/lib/content";
import { greeting, facilities } from "@/lib/about";
import Ornament from "@/components/Ornament";

/** 나선 무대 위 챕터 패널들 — 포도줄기를 감아 도는, 각 페이지로 향하는 8장의 카드 */

const shell =
  "rounded-[2rem] border border-mist/10 bg-gradient-to-b from-[rgba(30,17,25,0.9)] to-[rgba(20,11,17,0.86)] p-7 shadow-[0_0_90px_rgba(109,39,67,0.3)] ring-1 ring-gold/[0.08] md:p-10";

/** 장식 라인이 딸린 아이브로우 */
function Eyebrow({ children }: { children: string }) {
  return (
    <div>
      <p className="text-[10px] font-semibold tracking-[0.32em] text-gold md:text-[11px]">
        {children}
      </p>
      <Ornament className="mt-2 h-2.5 w-24" />
    </div>
  );
}

/** 카드 하단 — 해당 서브페이지로 들어가는 포털 링크 */
function PageLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="group mt-6 inline-flex items-center gap-2.5 text-sm font-semibold text-gold-soft transition-colors hover:text-rose"
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

/** 진료 센터 링크 행 */
function CenterRow({ s }: { s: (typeof services)[number] }) {
  return (
    <li>
      <Link
        href={`/services/${s.key}`}
        className="group block rounded-2xl border border-mist/10 bg-white/[0.03] px-5 py-3 transition-colors hover:border-rose/40"
      >
        <div className="flex items-baseline justify-between gap-3">
          <p className="font-display text-[15px] font-semibold text-mist group-hover:text-rose md:text-lg">
            {s.label}
          </p>
          <p className="text-[9px] tracking-[0.2em] text-gold">
            {s.en.toUpperCase()}
          </p>
        </div>
        <p className="mt-0.5 truncate text-[12px] text-mist/45">{s.desc}</p>
      </Link>
    </li>
  );
}

export function ChapterHero() {
  return (
    <article className={shell}>
      <Eyebrow>GANGNAM · PRIVATE WOMEN&apos;S CLINIC</Eyebrow>
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
        연세대 의대 · 여성성형 교과서 저자 · 수술 3만 례 · VIP 입원실 6실
      </p>
    </article>
  );
}

export function ChapterPhilosophy() {
  return (
    <article className={shell}>
      <Eyebrow>01 · PODO PHILOSOPHY</Eyebrow>
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

/** 수술 중심 시그니처 진료 4센터 */
export function ChapterSignature() {
  return (
    <article className={shell}>
      <Eyebrow>02 · SIGNATURE</Eyebrow>
      <h2 className="font-display mt-5 text-2xl font-medium leading-snug text-mist md:text-4xl">
        수술의 기준을 만든
        <br />
        <span className="text-glow-gradient">시그니처 진료</span>
      </h2>
      <ul className="mt-6 space-y-2.5">
        {services.slice(0, 4).map((s) => (
          <CenterRow key={s.key} s={s} />
        ))}
      </ul>
      <PageLink href="/services" label="진료 안내 전체 보기" />
    </article>
  );
}

/** 재생·에너지 스페셜 4센터 */
export function ChapterCenters() {
  return (
    <article className={shell}>
      <Eyebrow>03 · SPECIAL CENTERS</Eyebrow>
      <h2 className="font-display mt-5 text-2xl font-medium leading-snug text-mist md:text-4xl">
        몸이 스스로 회복하도록,
        <br />
        <span className="text-glow-gradient">스페셜 센터</span>
      </h2>
      <ul className="mt-6 space-y-2.5">
        {services.slice(4).map((s) => (
          <CenterRow key={s.key} s={s} />
        ))}
      </ul>
      <PageLink href="/services" label="진료 안내 전체 보기" />
    </article>
  );
}

export function ChapterDoctor() {
  const { doctor } = clinic;
  return (
    <article className={shell}>
      <Eyebrow>04 · MEDICAL DIRECTOR</Eyebrow>
      <h2 className="font-display mt-5 text-2xl font-medium leading-snug text-mist md:text-4xl">
        전문의들이 펼쳐보는 교과서,
        <br />
        <span className="text-glow-gradient">그 저자에게 받는 진료</span>
      </h2>
      <div className="mt-6 flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <p className="font-display text-2xl font-semibold text-mist">
          {doctor.name} <span className="text-base font-normal">원장</span>
        </p>
        <p className="text-[13px] text-mist/50">{doctor.title}</p>
      </div>
      {/* 모바일은 3개, 데스크톱은 5개 — 카드 고정 높이 안에 들어오도록 */}
      <ul className="mt-4 space-y-2 border-t border-mist/10 pt-4">
        {doctor.credentials.slice(0, 5).map((c, i) => (
          <li
            key={c}
            className={`items-baseline gap-3 text-[13px] leading-relaxed text-mist/70 md:text-sm ${
              i >= 3 ? "hidden md:flex" : "flex"
            }`}
          >
            <span aria-hidden className="text-gold">◆</span>
            {c}
          </li>
        ))}
      </ul>
      <div className="mt-6 grid grid-cols-4 gap-3 border-t border-mist/10 pt-5 text-center">
        {[
          ["25+", "임상 연차"],
          ["3만+", "누적 수술 례"],
          ["100인", "세계 선정"],
          ["1st", "교과서 집필"],
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
      <Eyebrow>05 · SAFETY &amp; EMOTIONAL CARE</Eyebrow>
      <h2 className="font-display mt-5 text-2xl font-medium leading-snug text-mist md:text-4xl">
        병원에 왔다는 사실조차
        <br />
        <span className="text-glow-gradient">아무도 모르게</span>
      </h2>
      <p className="mt-4 max-w-md text-[13px] leading-relaxed text-mist/50 md:text-sm">
        전 객실 VIP 1인실, 예약제 프라이버시 동선 — 접수부터 귀가까지 다른
        환자와 마주치지 않습니다.
      </p>
      {/* 모바일에서도 2열 유지 — 카드 고정 높이(88svh) 안에 들어오도록 */}
      <div className="mt-6 grid grid-cols-2 gap-2.5">
        {careSystem.map((c) => (
          <div
            key={c.step}
            className="rounded-2xl border border-mist/10 bg-white/[0.03] px-3.5 py-2.5"
          >
            <p className="text-[9px] font-semibold tracking-[0.25em] text-gold">
              STEP {c.step}
            </p>
            <p className="font-display mt-1 text-[13px] font-semibold text-mist md:text-[15px]">
              {c.title}
            </p>
          </div>
        ))}
      </div>
      <p className="mt-4 text-[11px] text-gold-soft">
        수술 후 10년 무상 사후관리 — 결과를 오래 책임집니다
      </p>
      <PageLink href="/care" label="안전수술 · 감성케어 자세히" />
    </article>
  );
}

export function ChapterAbout() {
  return (
    <article className={shell}>
      <Eyebrow>06 · ABOUT PODO</Eyebrow>
      <blockquote className="font-display mt-6 text-xl font-medium leading-[1.6] text-mist md:text-3xl">
        &ldquo;여성은 그 자체만으로
        <br />
        <span className="text-glow-gradient">사랑받기에 충분합니다&rdquo;</span>
      </blockquote>
      <p className="mt-4 max-w-md text-[13px] leading-relaxed text-mist/50 md:text-sm">
        2003년부터 여성성형의 기준을 만들어온 병원 — 교과서가 쓰이고, 술식이
        개발된 곳. {greeting.sign}
      </p>
      <div className="mt-6 grid grid-cols-2 gap-2.5 md:grid-cols-4">
        {facilities.map((f) => (
          <div
            key={f.label}
            className={`rounded-2xl bg-gradient-to-br ${f.tone} px-3 py-5 text-center ring-1 ring-mist/10`}
          >
            <p className="font-display text-[13px] font-semibold text-mist">
              {f.label}
            </p>
          </div>
        ))}
      </div>
      <PageLink href="/about" label="포도 소개 자세히" />
    </article>
  );
}

export function ChapterVisit() {
  return (
    <article className={shell}>
      <Eyebrow>07 · RESERVATION</Eyebrow>
      <h2 className="font-display mt-5 text-2xl font-medium leading-snug text-mist md:text-4xl">
        고민하는 시간이 가장 깁니다.
        <br />
        <span className="text-glow-gradient">시작은 전화 한 통.</span>
      </h2>
      <ul className="mt-6 divide-y divide-mist/10 border-y border-mist/10">
        {clinic.hours.map((h) => (
          <li key={h.day} className="flex items-baseline justify-between py-2.5">
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
      <p className="mt-4 text-[13px] leading-relaxed text-mist/60">
        {clinic.address}
        <br />
        <span className="text-gold-soft">{clinic.addressShort}</span>
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
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
