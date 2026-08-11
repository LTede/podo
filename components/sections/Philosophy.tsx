"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Reveal from "@/components/Reveal";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const MANIFESTO = [
  "아름다움은 누군가에게 보여주기 위한 것이 아니라,",
  "거울 앞의 나를 다시 사랑하기 위한 것입니다.",
  "아무에게도 말하지 못했던 고민이",
  "가장 빛나는 자신감이 되는 곳 —",
  "포도여성의원이 그 여정을 함께합니다.",
];

const VALUES = [
  {
    no: "01",
    title: "프라이빗",
    en: "Private",
    desc: "상담실부터 회복실까지 당신만을 위한 동선. 누구와도 마주치지 않는 1:1 프라이버시를 설계했습니다.",
  },
  {
    no: "02",
    title: "오리지널",
    en: "Original",
    desc: "유행을 따라 하는 곳이 아니라 기준을 만든 곳. 전문의들이 배우는 여성성형 교과서가 이곳에서 쓰였습니다.",
  },
  {
    no: "03",
    title: "감성케어",
    en: "Emotional Care",
    desc: "수술보다 마음을 먼저 살핍니다. 수술 전 불안부터 회복 후 일상까지 이어지는 사후관리 시스템.",
  },
];

export default function Philosophy() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
        return;
      // 스크롤에 따라 문장이 빛으로 차오르는 연출
      gsap.utils
        .toArray<HTMLElement>("[data-manifesto-line]")
        .forEach((line) => {
          gsap.fromTo(
            line,
            { opacity: 0.12, y: 14 },
            {
              opacity: 1,
              y: 0,
              ease: "none",
              scrollTrigger: {
                trigger: line,
                start: "top 82%",
                end: "top 55%",
                scrub: 0.6,
              },
            }
          );
        });
    },
    { scope: ref }
  );

  return (
    <section
      id="philosophy"
      ref={ref}
      className="relative overflow-hidden py-28 md:py-40"
    >
      {/* 워터마크 */}
      <p
        aria-hidden
        className="font-display pointer-events-none absolute -top-6 left-1/2 -translate-x-1/2 select-none whitespace-nowrap text-[22vw] font-semibold leading-none tracking-tight text-rose/[0.04]"
      >
        PODO
      </p>

      <div className="relative mx-auto max-w-6xl px-5 md:px-8">
        <p className="mb-12 text-[11px] font-semibold tracking-[0.3em] text-gold md:mb-16 md:text-xs">
          PODO PHILOSOPHY
        </p>

        <blockquote className="font-display max-w-4xl text-2xl font-medium leading-[1.6] tracking-tight text-mist md:text-[2.6rem] md:leading-[1.55]">
          {MANIFESTO.map((line) => (
            <span key={line} data-manifesto-line className="block">
              {line}
            </span>
          ))}
        </blockquote>

        <div className="hairline mt-20 md:mt-28" />

        <Reveal className="mt-16 grid gap-12 md:mt-20 md:grid-cols-3 md:gap-10">
          {VALUES.map((v) => (
            <div key={v.no} className="reveal">
              <p className="text-xs font-semibold tracking-[0.25em] text-gold">
                {v.no}
              </p>
              <h3 className="font-display mt-4 text-2xl font-semibold text-rose">
                {v.title}
                <span className="ml-3 text-sm font-normal tracking-widest text-mist/35">
                  {v.en.toUpperCase()}
                </span>
              </h3>
              <p className="mt-4 text-[15px] leading-relaxed text-mist/55">
                {v.desc}
              </p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
