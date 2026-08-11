"use client";

import { ReactNode, useRef } from "react";
import gsap from "gsap";

type Props = {
  children: ReactNode;
  className?: string;
  /** 최대 기울기 (deg) */
  max?: number;
};

/** 마우스를 따라 카드가 3D로 기우는 래퍼 (터치 기기에는 영향 없음) */
export default function Tilt({ children, className, max = 8 }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    gsap.to(el, {
      rotationY: px * max,
      rotationX: -py * max,
      z: 10,
      transformPerspective: 900,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  const onLeave = () => {
    if (!ref.current) return;
    gsap.to(ref.current, {
      rotationX: 0,
      rotationY: 0,
      z: 0,
      duration: 0.8,
      ease: "power3.out",
    });
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className}
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </div>
  );
}
