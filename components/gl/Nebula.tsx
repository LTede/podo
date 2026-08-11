"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/** 부드러운 발광 스프라이트 텍스처 */
function makeGlowTexture(inner: string, outer: string) {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const g = ctx.createRadialGradient(
    size / 2, size / 2, 0,
    size / 2, size / 2, size / 2
  );
  g.addColorStop(0, inner);
  g.addColorStop(0.35, outer);
  g.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  return new THREE.CanvasTexture(canvas);
}

/** 성긴 발광 입자 — 다크 위에서 보석 가루처럼 */
function Dust({ count }: { count: number }) {
  const points = useRef<THREE.Points>(null);
  const sprite = useMemo(
    () => makeGlowTexture("rgba(255,255,255,0.9)", "rgba(255,255,255,0.25)"),
    []
  );
  const { positions, colors, sizes } = useMemo(() => {
    const palette = [
      new THREE.Color("#d98ba6"), // rose
      new THREE.Color("#b57795"), // grape soft
      new THREE.Color("#d4a763"), // gold
      new THREE.Color("#8d4467"), // grape
      new THREE.Color("#e6c896"), // gold soft
    ];
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      // 넓게 흩뿌리되 중앙 상단에 살짝 밀도
      positions[i * 3] = (Math.random() * 2 - 1) * 7;
      positions[i * 3 + 1] = (Math.random() * 2 - 1) * 4.2;
      positions[i * 3 + 2] = (Math.random() * 2 - 1) * 3;
      const c = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
      sizes[i] = Math.random();
    }
    return { positions, colors, sizes };
  }, [count]);

  const mouse = useRef({ x: 0, y: 0 });

  useFrame(({ clock, pointer }) => {
    if (!points.current) return;
    const t = clock.elapsedTime;
    // 스크롤과 함께 별가루도 나선으로 감긴다
    const doc = document.documentElement;
    const total = doc.scrollHeight - window.innerHeight;
    const sp = total > 0 ? window.scrollY / total : 0;
    points.current.rotation.z = t * 0.012 + sp * 2.4;
    points.current.position.y = Math.sin(t * 0.18) * 0.15;
    mouse.current.x += (pointer.x - mouse.current.x) * 0.03;
    mouse.current.y += (pointer.y - mouse.current.y) * 0.03;
    points.current.position.x = mouse.current.x * 0.35;
    points.current.rotation.x = mouse.current.y * 0.05;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        map={sprite}
        vertexColors
        transparent
        opacity={0.75}
        size={0.055}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/** 배경의 큰 오로라 발광 구름 */
function GlowOrbs() {
  const group = useRef<THREE.Group>(null);
  const texWine = useMemo(
    () => makeGlowTexture("rgba(141,68,103,0.55)", "rgba(109,39,67,0.22)"),
    []
  );
  const texGold = useMemo(
    () => makeGlowTexture("rgba(212,167,99,0.4)", "rgba(212,167,99,0.12)"),
    []
  );
  const texRose = useMemo(
    () => makeGlowTexture("rgba(217,139,166,0.45)", "rgba(178,95,128,0.16)"),
    []
  );

  useFrame(({ clock }) => {
    if (!group.current) return;
    const t = clock.elapsedTime;
    const doc = document.documentElement;
    const total = doc.scrollHeight - window.innerHeight;
    group.current.rotation.z =
      total > 0 ? (window.scrollY / total) * 0.9 : 0;
    group.current.children.forEach((child, i) => {
      child.position.y += Math.sin(t * (0.1 + i * 0.05) + i * 2) * 0.0015;
      child.position.x += Math.cos(t * (0.08 + i * 0.04) + i) * 0.0012;
    });
  });

  const orb = (
    tex: THREE.Texture,
    pos: [number, number, number],
    scale: number
  ) => (
    <sprite position={pos} scale={[scale, scale, 1]}>
      <spriteMaterial
        map={tex}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </sprite>
  );

  return (
    <group ref={group}>
      {orb(texWine, [-3.2, 1.2, -2], 9)}
      {orb(texRose, [3.4, -0.8, -2.5], 8)}
      {orb(texGold, [0.4, -2.2, -3], 7)}
    </group>
  );
}

/** 포도줄기 척추 — 나선 덩굴 튜브 + 챕터 노드의 포도알 클러스터.
 *  메인 나선 무대와 같은 위상(-f×60°)으로 회전해 공간의 중심축이 된다. */
function Vine({ chapters = 6 }: { chapters?: number }) {
  const group = useRef<THREE.Group>(null);
  const SPAN = 1.3; // 챕터당 세로 간격 (월드 단위)
  const topY = ((chapters - 1) * SPAN) / 2;
  const sprite = useMemo(
    () => makeGlowTexture("rgba(255,255,255,0.95)", "rgba(255,255,255,0.3)"),
    []
  );

  const { tube, glow, grapes, grapeColors } = useMemo(() => {
    // 살짝 굵기가 흔들리는 나선 곡선 = 덩굴
    const pts: THREE.Vector3[] = [];
    const turns = 1.7;
    const seg = 140;
    for (let s = 0; s <= seg; s++) {
      const t = s / seg;
      const y = topY - t * (chapters - 1) * SPAN;
      const a = t * turns * Math.PI * 2;
      const r = 0.42 + Math.sin(t * 12.7) * 0.05;
      pts.push(new THREE.Vector3(Math.cos(a) * r, y, Math.sin(a) * r));
    }
    const curve = new THREE.CatmullRomCurve3(pts);
    const tube = new THREE.TubeGeometry(curve, 220, 0.02, 8, false);
    const glow = new THREE.TubeGeometry(curve, 220, 0.06, 8, false);

    // 챕터 노드마다 포도알 송이
    const palette = [
      new THREE.Color("#d98ba6"),
      new THREE.Color("#8d4467"),
      new THREE.Color("#d4a763"),
      new THREE.Color("#b57795"),
    ];
    const per = 14;
    const positions = new Float32Array(chapters * per * 3);
    const colors = new Float32Array(chapters * per * 3);
    for (let i = 0; i < chapters; i++) {
      const node = curve.getPoint(i / (chapters - 1));
      for (let k = 0; k < per; k++) {
        const idx = (i * per + k) * 3;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const r = 0.06 + Math.random() * 0.13;
        positions[idx] = node.x + r * Math.sin(phi) * Math.cos(theta);
        positions[idx + 1] = node.y - 0.05 - Math.random() * 0.16; // 아래로 늘어지는 송이
        positions[idx + 2] = node.z + r * Math.cos(phi);
        const c = palette[Math.floor(Math.random() * palette.length)];
        colors[idx] = c.r;
        colors[idx + 1] = c.g;
        colors[idx + 2] = c.b;
      }
    }
    return { tube, glow, grapes: positions, grapeColors: colors };
  }, [chapters, topY]);

  useFrame(({ clock }) => {
    if (!group.current) return;
    const t = clock.elapsedTime;
    const doc = document.documentElement;
    const total = doc.scrollHeight - window.innerHeight;
    const p = total > 0 ? Math.min(1, window.scrollY / total) : 0;
    const f = p * (chapters - 1);
    // 나선 무대와 같은 위상으로 회전 + 현재 챕터 노드가 화면 중앙 높이로
    group.current.rotation.y = (-f * Math.PI) / 3 + Math.sin(t * 0.2) * 0.05;
    group.current.position.y = f * SPAN - topY;
  });

  return (
    <group ref={group}>
      <mesh geometry={tube}>
        <meshBasicMaterial color="#8d4467" transparent opacity={0.9} />
      </mesh>
      <mesh geometry={glow}>
        <meshBasicMaterial
          color="#d98ba6"
          transparent
          opacity={0.14}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[grapes, 3]} />
          <bufferAttribute attach="attributes-color" args={[grapeColors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          map={sprite}
          vertexColors
          transparent
          opacity={0.95}
          size={0.11}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

/** 다크 배경 위 발광 네뷸라 — 페이지 전체 고정 배경.
 *  vine=true면 나선 무대의 중심축인 포도줄기 척추를 함께 그린다. */
export default function Nebula({ vine = false }: { vine?: boolean }) {
  const [ready, setReady] = useState(false);
  const [count, setCount] = useState(850);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(max-width: 768px)").matches) setCount(380);
    setReady(true);
  }, []);

  if (!ready) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 5], fov: 55 }}
        gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
      >
        <GlowOrbs />
        <Dust count={count} />
        {vine && <Vine />}
      </Canvas>
    </div>
  );
}
