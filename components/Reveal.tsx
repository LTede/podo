"use client";

import { ReactNode, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Props = {
  children: ReactNode;
  className?: string;
  /** 자식 중 .reveal 클래스가 순차 등장 */
  stagger?: number;
  delay?: number;
};

/** 스크롤 진입 시 내부 .reveal 요소들을 순차적으로 띄우는 래퍼 */
export default function Reveal({
  children,
  className,
  stagger = 0.12,
  delay = 0,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (
        window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
        !ref.current
      )
        return;
      const targets = ref.current.querySelectorAll(".reveal");
      if (!targets.length) return;
      gsap.to(targets, {
        opacity: 1,
        y: 0,
        duration: 1.1,
        ease: "power3.out",
        stagger,
        delay,
        scrollTrigger: { trigger: ref.current, start: "top 78%" },
      });
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
