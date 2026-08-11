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

/** 스크롤 진입 시 내부 .reveal 요소들이 원근감 있게 세워지며 등장하는 래퍼 */
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
      gsap.fromTo(
        targets,
        { opacity: 0, y: 56, rotationX: 12, transformPerspective: 900 },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 1.15,
          ease: "power3.out",
          stagger,
          delay,
          transformOrigin: "center 80%",
          scrollTrigger: { trigger: ref.current, start: "top 78%" },
        }
      );
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={className} style={{ perspective: "1200px" }}>
      {children}
    </div>
  );
}
