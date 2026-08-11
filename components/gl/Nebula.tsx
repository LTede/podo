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

/** 꽃잎 느낌의 타원형 소프트 텍스처 */
function makePetalTexture() {
  const size = 128;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  ctx.translate(size / 2, size / 2);
  ctx.scale(1, 0.55);
  const g = ctx.createRadialGradient(0, 0, 0, 0, 0, size / 2);
  g.addColorStop(0, "rgba(255,255,255,0.95)");
  g.addColorStop(0.5, "rgba(255,255,255,0.4)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(-size / 2, -size / 2, size, size);
  return new THREE.CanvasTexture(canvas);
}

/** 성긴 발광 입자 — 다크 위에서 보석 가루처럼 */
function Dust({ count }: { count: number }) {
  const points = useRef<THREE.Points>(null);
  const sprite = useMemo(
    () => makeGlowTexture("rgba(255,255,255,0.9)", "rgba(255,255,255,0.25)"),
    []
  );
  const { positions, colors } = useMemo(() => {
    const palette = [
      new THREE.Color("#b2607f"),
      new THREE.Color("#95627b"),
      new THREE.Color("#a8823f"),
      new THREE.Color("#7d3f60"),
      new THREE.Color("#b98d4a"),
    ];
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() * 2 - 1) * 7;
      positions[i * 3 + 1] = (Math.random() * 2 - 1) * 4.2;
      positions[i * 3 + 2] = (Math.random() * 2 - 1) * 3;
      const c = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    return { positions, colors };
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
        opacity={0.55}
        size={0.055}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/** 배경의 큰 오로라 발광 구름 */
function GlowOrbs() {
  const group = useRef<THREE.Group>(null);
  const texWine = useMemo(
    () => makeGlowTexture("rgba(92,36,64,0.28)", "rgba(109,39,67,0.22)"),
    []
  );
  const texGold = useMemo(
    () => makeGlowTexture("rgba(168,130,63,0.3)", "rgba(168,130,63,0.1)"),
    []
  );
  const texRose = useMemo(
    () => makeGlowTexture("rgba(178,95,128,0.3)", "rgba(178,95,128,0.12)"),
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
      />
    </sprite>
  );

  return (
    <group ref={group}>
      {orb(texWine, [-3.2, 1.2, -2], 9)}
      {orb(texRose, [3.4, -0.8, -2.5], 8)}
      {orb(texGold, [0.4, -2.2, -3], 7)}
      {orb(texRose, [-2.4, -2.6, -3.2], 6)}
    </group>
  );
}

/** 포도줄기 척추 — 나선 덩굴 + 꼭대기 꽃관 + 흩날리는 꽃잎 + 바닥 빛웅덩이.
 *  나선 무대(SpiralStage, #spiral-track)와 같은 챕터 수·위상으로 회전하며,
 *  랜딩 히어로 동안은 화면 아래 숨어 있다가 스크롤과 함께 자라 올라온다. */
function Vine({ chapters = 7 }: { chapters?: number }) {
  const group = useRef<THREE.Group>(null);
  const crown = useRef<THREE.Group>(null);
  const petalsRef = useRef<THREE.Points>(null);
  const rippleRefs = useRef<(THREE.Mesh | null)[]>([]);
  const trackEl = useRef<HTMLElement | null>(null);
  const STEP_RAD = (Math.PI * 2) / chapters;
  const SPAN = 1.15; // 챕터당 세로 간격 (월드 단위)
  const topY = ((chapters - 1) * SPAN) / 2;

  const sprite = useMemo(
    () => makeGlowTexture("rgba(255,255,255,0.95)", "rgba(255,255,255,0.3)"),
    []
  );
  const petalTex = useMemo(() => makePetalTexture(), []);

  /* 덩굴 본체 + 포도알 송이 */
  const { tube, glow, grapes, grapeColors } = useMemo(() => {
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

    const palette = [
      new THREE.Color("#b2607f"),
      new THREE.Color("#7d3f60"),
      new THREE.Color("#a8823f"),
      new THREE.Color("#95627b"),
    ];
    const per = 16;
    const positions = new Float32Array(chapters * per * 3);
    const colors = new Float32Array(chapters * per * 3);
    for (let i = 0; i < chapters; i++) {
      const node = curve.getPoint(i / (chapters - 1));
      for (let k = 0; k < per; k++) {
        const idx = (i * per + k) * 3;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const r = 0.06 + Math.random() * 0.14;
        positions[idx] = node.x + r * Math.sin(phi) * Math.cos(theta);
        positions[idx + 1] = node.y - 0.05 - Math.random() * 0.17;
        positions[idx + 2] = node.z + r * Math.cos(phi);
        const c = palette[Math.floor(Math.random() * palette.length)];
        colors[idx] = c.r;
        colors[idx + 1] = c.g;
        colors[idx + 2] = c.b;
      }
    }
    return { tube, glow, grapes: positions, grapeColors: colors };
  }, [chapters, topY]);

  /* 꼭대기 꽃관 — 3겹 후광 링 */
  const crownData = useMemo(() => {
    const rings = [
      { r: 0.28, n: 10, color: new THREE.Color("#b98d4a"), size: 1 },
      { r: 0.55, n: 16, color: new THREE.Color("#b2607f"), size: 0.8 },
      { r: 0.85, n: 22, color: new THREE.Color("#95627b"), size: 0.6 },
    ];
    const total = rings.reduce((s, r) => s + r.n, 0);
    const positions = new Float32Array(total * 3);
    const colors = new Float32Array(total * 3);
    const sizes: number[] = [];
    let i = 0;
    for (const ring of rings) {
      for (let k = 0; k < ring.n; k++) {
        const a = (k / ring.n) * Math.PI * 2;
        positions[i * 3] = Math.cos(a) * ring.r;
        positions[i * 3 + 1] = (Math.random() - 0.3) * 0.12;
        positions[i * 3 + 2] = Math.sin(a) * ring.r;
        colors[i * 3] = ring.color.r;
        colors[i * 3 + 1] = ring.color.g;
        colors[i * 3 + 2] = ring.color.b;
        sizes.push(ring.size);
        i++;
      }
    }
    return { positions, colors };
  }, []);

  /* 흩날리는 꽃잎 */
  const PETALS = 90;
  const petalState = useMemo(() => {
    const positions = new Float32Array(PETALS * 3);
    const colors = new Float32Array(PETALS * 3);
    const seeds = new Float32Array(PETALS);
    const speeds = new Float32Array(PETALS);
    const baseX = new Float32Array(PETALS);
    const palette = [
      new THREE.Color("#cf8fa8"),
      new THREE.Color("#b2607f"),
      new THREE.Color("#b98d4a"),
    ];
    for (let i = 0; i < PETALS; i++) {
      baseX[i] = (Math.random() * 2 - 1) * 1.7;
      positions[i * 3] = baseX[i];
      positions[i * 3 + 1] = topY + 1.4 - Math.random() * (topY * 2 + 2.8);
      positions[i * 3 + 2] = (Math.random() * 2 - 1) * 1.1;
      seeds[i] = Math.random() * Math.PI * 2;
      speeds[i] = 0.12 + Math.random() * 0.22;
      const c = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    return { positions, colors, seeds, speeds, baseX };
  }, [topY]);

  useFrame(({ clock }, delta) => {
    const t = clock.elapsedTime;
    // 나선 트랙(#spiral-track) 기준 진행도 — 히어로·테일 구간과 분리
    if (!trackEl.current) {
      trackEl.current = document.getElementById("spiral-track");
    }
    const vh = window.innerHeight;
    let p = 0;
    let heroP = 1; // 트랙 진입 전 0→1 (줄기가 자라 올라오는 정도)
    if (trackEl.current) {
      const top = trackEl.current.offsetTop;
      const scrollable = Math.max(trackEl.current.offsetHeight - vh, 1);
      p = Math.min(1, Math.max(0, (window.scrollY - top) / scrollable));
      heroP = Math.min(1, Math.max(0, window.scrollY / Math.max(top, 1)));
    }
    const f = p * (chapters - 1);

    if (group.current) {
      // 나선 무대와 같은 위상으로 회전 + 현재 챕터 노드가 화면 중앙으로
      group.current.rotation.y = -f * STEP_RAD + Math.sin(t * 0.2) * 0.05;
      // 히어로 동안 화면 아래(-9)에 숨었다가 스크롤과 함께 자라 올라온다
      const ease = heroP * heroP * (3 - 2 * heroP);
      group.current.position.y = f * SPAN - topY + (1 - ease) * -9;
    }
    if (crown.current) {
      // 꽃관은 천천히 자전하며 숨을 쉰다
      crown.current.rotation.y = t * 0.18;
      const s = 1 + Math.sin(t * 0.9) * 0.06;
      crown.current.scale.set(s, 1, s);
    }
    if (petalsRef.current) {
      // 꽃잎 낙하 — 살랑이며 떨어지고, 바닥에 닿으면 다시 위에서
      const pos = petalsRef.current.geometry.attributes.position
        .array as Float32Array;
      const { seeds, speeds, baseX } = petalState;
      for (let i = 0; i < PETALS; i++) {
        pos[i * 3 + 1] -= speeds[i] * delta;
        pos[i * 3] = baseX[i] + Math.sin(t * 0.6 + seeds[i]) * 0.3;
        if (pos[i * 3 + 1] < -topY - 1.4) pos[i * 3 + 1] = topY + 1.4;
      }
      petalsRef.current.geometry.attributes.position.needsUpdate = true;
    }
    // 바닥 물결 — 퍼지며 사라지는 동심원
    rippleRefs.current.forEach((m, i) => {
      if (!m) return;
      const tt = (t * 0.22 + i / 3) % 1;
      const s = 0.4 + tt * 2.6;
      m.scale.set(s, s, 1);
      (m.material as THREE.MeshBasicMaterial).opacity = (1 - tt) * 0.28;
    });
  });

  return (
    <group ref={group}>
      {/* 덩굴 본체 */}
      <mesh geometry={tube}>
        <meshBasicMaterial color="#7d3f60" transparent opacity={0.9} />
      </mesh>
      <mesh geometry={glow}>
        <meshBasicMaterial
          color="#b2607f"
          transparent
          opacity={0.14}
            depthWrite={false}
        />
      </mesh>

      {/* 포도알 송이 */}
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
          />
      </points>

      {/* 꼭대기 꽃관 — 피어나는 후광 */}
      <group ref={crown} position={[0, topY + 0.35, 0]}>
        <sprite scale={[2.4, 2.4, 1]}>
          <spriteMaterial
            map={sprite}
            color="#b2607f"
            transparent
            opacity={0.32}
            depthWrite={false}
              />
        </sprite>
        <sprite scale={[1.1, 1.1, 1]} position={[0, 0.05, 0]}>
          <spriteMaterial
            map={sprite}
            color="#b98d4a"
            transparent
            opacity={0.5}
            depthWrite={false}
              />
        </sprite>
        <points>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[crownData.positions, 3]}
            />
            <bufferAttribute
              attach="attributes-color"
              args={[crownData.colors, 3]}
            />
          </bufferGeometry>
          <pointsMaterial
            map={petalTex}
            vertexColors
            transparent
            opacity={0.9}
            size={0.16}
            sizeAttenuation
            depthWrite={false}
              />
        </points>
      </group>

      {/* 흩날리는 꽃잎 */}
      <points ref={petalsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[petalState.positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[petalState.colors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          map={petalTex}
          vertexColors
          transparent
          opacity={0.55}
          size={0.13}
          sizeAttenuation
          depthWrite={false}
          />
      </points>

      {/* 바닥 — 빛웅덩이와 물결 */}
      <group position={[0, -topY - 0.55, 0]}>
        <sprite scale={[3.2, 3.2, 1]}>
          <spriteMaterial
            map={sprite}
            color="#a8823f"
            transparent
            opacity={0.22}
            depthWrite={false}
              />
        </sprite>
        <sprite scale={[1.6, 1.6, 1]}>
          <spriteMaterial
            map={sprite}
            color="#b2607f"
            transparent
            opacity={0.3}
            depthWrite={false}
              />
        </sprite>
        {[0, 1, 2].map((i) => (
          <mesh
            key={i}
            ref={(el) => {
              rippleRefs.current[i] = el;
            }}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <ringGeometry args={[0.47, 0.5, 48]} />
            <meshBasicMaterial
              color="#b2607f"
              transparent
              opacity={0.2}
              side={THREE.DoubleSide}
              depthWrite={false}
                  />
          </mesh>
        ))}
      </group>
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
