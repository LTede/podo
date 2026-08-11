import type { Metadata } from "next";
import Link from "next/link";
import SubpageShell from "@/components/SubpageShell";
import Reveal from "@/components/Reveal";
import { greeting, facilities, academics, honors, press } from "@/lib/about";
import { milestones } from "@/lib/trust";

export const metadata: Metadata = {
  title: "포도 소개 | 포도여성의원",
};

export default function AboutPage() {
  return (
    <SubpageShell>
      {/* 인사말 */}
      <section className="relative py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <Reveal>
            <p className="reveal text-[11px] font-semibold tracking-[0.3em] text-gold md:text-xs">
              ABOUT PODO
            </p>
            <h1 className="reveal font-display mt-4 whitespace-pre-line text-3xl font-medium leading-snug tracking-tight text-mist md:text-5xl">
              {greeting.title.split("\n")[0]}
              {"\n"}
              <span className="text-glow-gradient">
                {greeting.title.split("\n")[1]}
              </span>
            </h1>
          </Reveal>
          <Reveal className="mt-10 max-w-2xl" stagger={0.1}>
            {greeting.paragraphs.map((p) => (
              <p
                key={p.slice(0, 12)}
                className="reveal mt-5 text-[15px] leading-loose text-mist/60 md:text-base"
              >
                {p}
              </p>
            ))}
            <p className="reveal font-display mt-8 text-lg font-semibold text-gold-soft">
              {greeting.sign}
            </p>
          </Reveal>
        </div>
      </section>

      {/* 연혁 타임라인 */}
      <section className="relative py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <Reveal>
            <p className="reveal text-[11px] font-semibold tracking-[0.3em] text-gold md:text-xs">
              MILESTONES
            </p>
            <h2 className="reveal font-display mt-4 text-2xl font-medium text-mist md:text-4xl">
              2003년부터, 기준이 되어온 시간
            </h2>
          </Reveal>
          <Reveal className="mt-10" stagger={0.07}>
            <ol className="relative ml-2 border-l border-rose/25">
              {milestones.map((m) => (
                <li key={m.text} className="reveal relative mb-8 pl-8 last:mb-0">
                  <span
                    aria-hidden
                    className="absolute -left-[5px] top-1.5 block h-2.5 w-2.5 rounded-full bg-gradient-to-br from-rose to-wine shadow-[0_0_10px_rgba(217,139,166,0.8)]"
                  />
                  {m.year && (
                    <p className="font-display text-sm font-semibold text-gold">
                      {m.year}
                    </p>
                  )}
                  <p className="mt-0.5 text-[15px] leading-relaxed text-mist/70">
                    {m.text}
                  </p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* 둘러보기 */}
      <section className="relative py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <Reveal>
            <p className="reveal text-[11px] font-semibold tracking-[0.3em] text-gold md:text-xs">
              CLINIC TOUR
            </p>
            <h2 className="reveal font-display mt-4 text-2xl font-medium text-mist md:text-4xl">
              당신만을 위해 설계된 공간
            </h2>
          </Reveal>
          {/* 시설 사진 슬롯 — 실제 사진 수급 시 /public/images/facility-*.jpg 로 교체 */}
          <Reveal className="mt-10 grid gap-5 md:grid-cols-4" stagger={0.08}>
            {facilities.map((f) => (
              <figure
                key={f.label}
                className="reveal group relative overflow-hidden rounded-3xl ring-1 ring-mist/10"
              >
                <div
                  className={`aspect-[3/4] bg-gradient-to-br ${f.tone} transition-transform duration-700 group-hover:scale-105`}
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-noir/85 to-transparent p-5">
                  <p className="font-display text-base font-semibold text-mist">
                    {f.label}
                  </p>
                  <p className="mt-1 text-[11px] leading-relaxed text-mist/50">
                    {f.desc}
                  </p>
                </figcaption>
              </figure>
            ))}
          </Reveal>
        </div>
      </section>

      {/* 학술 · 저서 / 수상 · 등재 */}
      <section className="relative py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="grid gap-12 md:grid-cols-2 md:gap-16">
            <Reveal stagger={0.06}>
              <p className="reveal text-[11px] font-semibold tracking-[0.3em] text-gold md:text-xs">
                ACADEMIC &amp; PUBLICATION
              </p>
              <h2 className="reveal font-display mt-4 text-2xl font-medium text-mist md:text-3xl">
                기준을 만들어온 기록
              </h2>
              <ul className="reveal mt-7 divide-y divide-mist/10 border-y border-mist/10">
                {academics.map((a) => (
                  <li
                    key={a}
                    className="flex items-baseline gap-3 py-3.5 text-sm leading-relaxed text-mist/70"
                  >
                    <span aria-hidden className="text-gold">◆</span>
                    {a}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal stagger={0.06}>
              <p className="reveal text-[11px] font-semibold tracking-[0.3em] text-gold md:text-xs">
                HONORS &amp; MEDIA
              </p>
              <h2 className="reveal font-display mt-4 text-2xl font-medium text-mist md:text-3xl">
                세계가 확인한 이름
              </h2>
              <ul className="reveal mt-7 divide-y divide-mist/10 border-y border-mist/10">
                {[...honors, ...press].map((h) => (
                  <li
                    key={h}
                    className="flex items-baseline gap-3 py-3.5 text-sm leading-relaxed text-mist/70"
                  >
                    <span aria-hidden className="text-rose">◆</span>
                    {h}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal className="mt-16">
            <div className="reveal flex flex-wrap gap-3">
              <Link
                href="/doctor"
                className="rounded-full border border-mist/15 px-6 py-3 text-sm text-mist/70 transition-colors hover:border-rose/40 hover:text-rose"
              >
                의료진 소개 →
              </Link>
              <Link
                href="/philosophy"
                className="rounded-full border border-mist/15 px-6 py-3 text-sm text-mist/70 transition-colors hover:border-rose/40 hover:text-rose"
              >
                포도 철학 →
              </Link>
              <Link
                href="/visit"
                className="rounded-full bg-gradient-to-r from-wine to-grape px-6 py-3 text-sm font-semibold text-mist shadow-[0_0_24px_rgba(141,68,103,0.5)]"
              >
                상담 예약
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </SubpageShell>
  );
}
