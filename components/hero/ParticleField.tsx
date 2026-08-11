"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/** 부드러운 원형 스프라이트 텍스처 (radial gradient) */
function useSoftSprite() {
  return useMemo(() => {
    const size = 128;
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext("2d")!;
    const g = ctx.createRadialGradient(
      size / 2,
      size / 2,
      0,
      size / 2,
      size / 2,
      size / 2
    );
    g.addColorStop(0, "rgba(255,255,255,1)");
    g.addColorStop(0.4, "rgba(255,255,255,0.6)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
  }, []);
}

/** 포도송이처럼 몇 개의 구 클러스터에 파티클을 분산 배치 */
function makeCluster(count: number) {
  const centers = [
    new THREE.Vector3(0, 0.4, 0),
    new THREE.Vector3(-1.1, -0.3, 0.3),
    new THREE.Vector3(1.0, -0.5, -0.2),
    new THREE.Vector3(-0.3, -1.2, -0.4),
    new THREE.Vector3(0.6, 1.1, 0.2),
    new THREE.Vector3(-1.6, 0.8, -0.3),
    new THREE.Vector3(1.7, 0.6, 0.4),
  ];
  const palette = [
    new THREE.Color("#5c2a3d"), // wine
    new THREE.Color("#7b4b63"), // grape
    new THREE.Color("#a97f95"), // grape soft
    new THREE.Color("#b08d57"), // gold
    new THREE.Color("#cfb389"), // gold soft
  ];
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const sizes = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    const c = centers[i % centers.length];
    // 구 표면 근처에 가우시안스럽게 분포
    const dir = new THREE.Vector3(
      Math.random() * 2 - 1,
      Math.random() * 2 - 1,
      Math.random() * 2 - 1
    ).normalize();
    const r = 0.55 + Math.random() * 0.75;
    positions[i * 3] = c.x + dir.x * r;
    positions[i * 3 + 1] = c.y + dir.y * r;
    positions[i * 3 + 2] = c.z + dir.z * r * 0.6;

    const col =
      palette[
        Math.random() < 0.72
          ? Math.floor(Math.random() * 3) // 와인 계열 위주
          : 3 + Math.floor(Math.random() * 2) // 골드 포인트
      ];
    colors[i * 3] = col.r;
    colors[i * 3 + 1] = col.g;
    colors[i * 3 + 2] = col.b;
    sizes[i] = 0.5 + Math.random();
  }
  return { positions, colors, sizes };
}

function Cloud({ count }: { count: number }) {
  const points = useRef<THREE.Points>(null);
  const sprite = useSoftSprite();
  const { positions, colors } = useMemo(() => makeCluster(count), [count]);
  const mouse = useRef({ x: 0, y: 0 });
  const { viewport } = useThree();

  useFrame(({ clock, pointer }) => {
    if (!points.current) return;
    const t = clock.elapsedTime;
    // 느린 자전 + 숨쉬기
    points.current.rotation.y = t * 0.05;
    points.current.rotation.x = Math.sin(t * 0.12) * 0.08;
    points.current.position.y = Math.sin(t * 0.35) * 0.08;
    // 마우스 패럴랙스 (부드럽게 따라오기)
    mouse.current.x += (pointer.x - mouse.current.x) * 0.03;
    mouse.current.y += (pointer.y - mouse.current.y) * 0.03;
    points.current.rotation.z = mouse.current.x * 0.06;
    points.current.position.x = mouse.current.x * viewport.width * 0.02;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        map={sprite}
        vertexColors
        transparent
        opacity={0.55}
        size={0.09}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/** 히어로 배경 파티클 캔버스 — 라이트 톤 위에 와인/골드 입자 */
export default function ParticleField() {
  const isMobile =
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 768px)").matches;

  return (
    <Canvas
      className="pointer-events-none"
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 5], fov: 50 }}
      gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
    >
      <Cloud count={isMobile ? 550 : 1400} />
    </Canvas>
  );
}
