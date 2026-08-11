import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SubpageShell from "@/components/SubpageShell";
import Reveal from "@/components/Reveal";
import Tilt from "@/components/Tilt";
import { categories, getCategory } from "@/lib/content";
import { clinic } from "@/lib/clinic";

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.key }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const cat = getCategory((await params).category);
  return { title: cat ? `${cat.label} | 포도여성의원` : "포도여성의원" };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const cat = getCategory((await params).category);
  if (!cat) notFound();

  return (
    <SubpageShell>
      <section className="relative py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <Reveal>
            <p className="reveal text-[11px] font-semibold tracking-[0.3em] text-gold md:text-xs">
              {cat.en.toUpperCase()}
            </p>
            <h1 className="reveal font-display mt-4 text-3xl font-medium leading-snug tracking-tight text-mist md:text-5xl">
              {cat.label}
              <br />
              <span className="text-glow-gradient">{cat.tagline}</span>
            </h1>
            <p className="reveal mt-6 max-w-2xl text-[15px] leading-relaxed text-mist/55 md:text-base">
              {cat.intro}
            </p>
          </Reveal>

          {cat.highlights && (
            <Reveal className="mt-10 flex flex-wrap gap-2.5" stagger={0.06}>
              {cat.highlights.map((h) => (
                <p
                  key={h}
                  className="reveal rounded-full border border-rose/25 bg-rose/5 px-4 py-1.5 text-[12px] font-medium text-rose"
                >
                  {h}
                </p>
              ))}
            </Reveal>
          )}

          {/* 시술 목록 */}
          <Reveal
            className="mt-14 grid gap-5 md:mt-20 md:grid-cols-2"
            stagger={0.08}
          >
            {cat.treatments.map((t) => (
              <Tilt key={t.name} className="reveal" max={6}>
                <div className="glass h-full rounded-3xl p-7 transition-colors duration-500 hover:border-rose/40 md:p-9">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h2 className="font-display text-xl font-semibold text-mist md:text-2xl">
                      {t.name}
                    </h2>
                    {t.en && (
                      <p className="text-[10px] tracking-[0.22em] text-gold">
                        {t.en.toUpperCase()}
                      </p>
                    )}
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-mist/55">
                    {t.desc}
                  </p>
                  {t.points && (
                    <ul className="mt-5 flex flex-wrap gap-1.5">
                      {t.points.map((p) => (
                        <li
                          key={p}
                          className="rounded-full bg-white/5 px-3 py-1 text-xs text-mist/60"
                        >
                          {p}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </Tilt>
            ))}
          </Reveal>

          {/* 다른 진료 보기 */}
          <Reveal className="mt-16 border-t border-mist/10 pt-10">
            <p className="reveal mb-4 text-[10px] font-semibold tracking-[0.3em] text-mist/35">
              다른 진료 보기
            </p>
            <div className="reveal flex flex-wrap gap-2">
              {categories
                .filter((c) => c.key !== cat.key)
                .map((c) => (
                  <Link
                    key={c.key}
                    href={`/services/${c.key}`}
                    className="rounded-full border border-mist/15 px-4 py-2 text-[13px] text-mist/60 transition-colors hover:border-rose/40 hover:text-rose"
                  >
                    {c.label}
                  </Link>
                ))}
            </div>
          </Reveal>

          {/* CTA */}
          <Reveal className="mt-14">
            <div className="reveal rounded-3xl bg-gradient-to-br from-wine via-noir-3 to-grape p-8 ring-1 ring-rose/20 md:p-12">
              <div className="flex flex-wrap items-center justify-between gap-6">
                <div>
                  <h2 className="font-display text-2xl font-semibold text-mist md:text-3xl">
                    고민은 상담에서 답이 됩니다
                  </h2>
                  <p className="mt-2 text-sm text-mist/60">
                    비공개 1:1 상담 · 원장이 직접 답합니다 · 평일 저녁 7시까지
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <a
                    href={clinic.phoneHref}
                    className="rounded-full bg-mist px-7 py-3.5 text-sm font-bold text-wine-deep transition-transform hover:-translate-y-0.5"
                  >
                    {clinic.phone}
                  </a>
                  <Link
                    href="/visit"
                    className="rounded-full border border-mist/30 px-7 py-3.5 text-sm font-medium text-mist transition-colors hover:border-mist/60"
                  >
                    오시는 길
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>

          <p className="mt-8 text-[11px] leading-relaxed text-mist/30">
            시술·수술의 효과와 회복 기간은 개인에 따라 다를 수 있으며, 부작용이
            발생할 수 있습니다. 반드시 전문의와 충분한 상담 후 결정하시기
            바랍니다.
          </p>
        </div>
      </section>
    </SubpageShell>
  );
}
