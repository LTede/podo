"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, createPortal, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { simplex3D, curl3D, fbm2D } from "./noise";

/* ── 챕터: 섹션 id ↔ 카메라 위치/시선/컬러 팔레트 ─────────────
   스크롤 진행도에 따라 카메라가 z축 회랑을 전진하며
   섹션마다 공간의 색과 빛이 바뀐다 */
const SECTION_IDS = ["top", "philosophy", "services", "doctor", "care", "visit"];

type Chapter = {
  pos: [number, number, number];
  look: [number, number, number];
  bg: string; // 스모크 바탕
  wisp: string; // 연기 결
  pA: string; // 파티클 컬러 A
  pB: string; // 파티클 컬러 B
};

const CHAPTERS: Chapter[] = [
  { pos: [0, 0.2, 6.5],    look: [0, 0, 0],        bg: "#faf7f2", wisp: "#e2c9bc", pA: "#5c2a3d", pB: "#b08d57" },
  { pos: [-1.4, 0.5, 2.2], look: [0.6, -0.1, -3],  bg: "#f6eee5", wisp: "#d9bfae", pA: "#7b4b63", pB: "#cfb389" },
  { pos: [1.2, -0.3, -2.6],look: [-0.8, 0.3, -8],  bg: "#f4ebe2", wisp: "#d3b49f", pA: "#5c2a3d", pB: "#b08d57" },
  { pos: [-1.0, 0.4, -7.8],look: [0.6, -0.2, -13], bg: "#221018", wisp: "#6b3349", pA: "#c99bb3", pB: "#e0c08e" },
  { pos: [0.9, -0.2, -13], look: [-0.5, 0.3, -18], bg: "#f6efe8", wisp: "#dcc4ae", pA: "#7b4b63", pB: "#b08d57" },
  { pos: [0, 0.1, -18],    look: [0, 0, -24],      bg: "#efe5da", wisp: "#d2b8a0", pA: "#5c2a3d", pB: "#cfb389" },
];

/* 파티클이 뭉치는 포도송이 클러스터 — 카메라 경로 옆에 배치 */
const CLUSTERS: [number, number, number][] = [
  [1.6, 0.3, 3.8],
  [-1.8, -0.4, 0.2],
  [1.7, 0.5, -4.6],
  [-1.6, 0.2, -9.8],
  [1.5, -0.4, -15],
  [0, 0.3, -20.5],
];

const smoothstep = (t: number) => t * t * (3 - 2 * t);
/* 컬러 전환은 구간 중앙에서만 일어나도록 (섹션 경계 가독성 보호) */
const holdstep = (t: number) =>
  THREE.MathUtils.clamp((t - 0.32) / (0.78 - 0.32), 0, 1);

type Store = {
  progress: number;
  anchors: number[];
  mouse: THREE.Vector2;
  bg: THREE.Color;
  wisp: THREE.Color;
  pA: THREE.Color;
  pB: THREE.Color;
};

/* ── 스크롤 → 카메라 + 팔레트 보간 ─────────────────────────── */
function CameraRig({ store }: { store: Store }) {
  const { camera } = useThree();
  const pos = useMemo(() => new THREE.Vector3(), []);
  const look = useMemo(() => new THREE.Vector3(), []);
  const tmpV = useMemo(() => new THREE.Vector3(), []);
  const tmpA = useMemo(() => new THREE.Color(), []);
  const tmpB = useMemo(() => new THREE.Color(), []);
  const chapterCols = useMemo(
    () =>
      CHAPTERS.map((c) => ({
        bg: new THREE.Color(c.bg),
        wisp: new THREE.Color(c.wisp),
        pA: new THREE.Color(c.pA),
        pB: new THREE.Color(c.pB),
      })),
    []
  );

  useFrame(({ clock, pointer }) => {
    const doc = document.documentElement;
    const total = doc.scrollHeight - window.innerHeight;
    const target = total > 0 ? window.scrollY / total : 0;
    // 관성 있는 카메라 추적
    store.progress += (target - store.progress) * 0.07;
    store.mouse.x += (pointer.x - store.mouse.x) * 0.04;
    store.mouse.y += (pointer.y - store.mouse.y) * 0.04;

    const p = THREE.MathUtils.clamp(store.progress, 0, 1);
    const a = store.anchors;
    let i = 0;
    while (i < a.length - 2 && p > a[i + 1]) i++;
    const span = Math.max(a[i + 1] - a[i], 1e-4);
    const t = THREE.MathUtils.clamp((p - a[i]) / span, 0, 1);
    const ts = smoothstep(t);
    const tc = holdstep(t);

    const c0 = CHAPTERS[i];
    const c1 = CHAPTERS[Math.min(i + 1, CHAPTERS.length - 1)];
    pos.fromArray(c0.pos).lerp(tmpV.fromArray(c1.pos), ts);
    const time = clock.elapsedTime;

    // 부유감 + 마우스 시차
    camera.position.set(
      pos.x + Math.sin(time * 0.4) * 0.12 + store.mouse.x * 0.45,
      pos.y + Math.cos(time * 0.31) * 0.09 + store.mouse.y * 0.28,
      pos.z
    );
    look.fromArray(c0.look).lerp(tmpV.fromArray(c1.look), ts);
    camera.lookAt(look);
    camera.rotation.z += Math.sin(time * 0.23) * 0.018 + store.mouse.x * 0.02;

    // 팔레트 보간
    const k0 = chapterCols[i];
    const k1 = chapterCols[Math.min(i + 1, CHAPTERS.length - 1)];
    store.bg.copy(tmpA.copy(k0.bg).lerp(k1.bg, tc));
    store.wisp.copy(tmpA.copy(k0.wisp).lerp(k1.wisp, tc));
    store.pA.copy(tmpA.copy(k0.pA).lerp(k1.pA, tc));
    store.pB.copy(tmpB.copy(k0.pB).lerp(k1.pB, tc));
  });

  return null;
}

/* ── fbm 연기 배경 — 카메라를 따라다니는 풀스크린 쿼드 ───────── */
function SmokeBackdrop({ store }: { store: Store }) {
  const { camera } = useThree();
  const mat = useRef<THREE.ShaderMaterial>(null);
  const mesh = useRef<THREE.Mesh>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uAspect: { value: 1 },
      uBg: { value: new THREE.Color("#faf7f2") },
      uWisp: { value: new THREE.Color("#e2c9bc") },
      uScroll: { value: 0 },
    }),
    []
  );

  useFrame(({ clock, size }) => {
    if (!mat.current || !mesh.current) return;
    mat.current.uniforms.uTime.value = clock.elapsedTime;
    mat.current.uniforms.uScroll.value = store.progress;
    mat.current.uniforms.uAspect.value = size.width / size.height;
    (mat.current.uniforms.uBg.value as THREE.Color).copy(store.bg);
    (mat.current.uniforms.uWisp.value as THREE.Color).copy(store.wisp);
    // 카메라 fov를 덮도록 스케일
    const dist = 40;
    const cam = camera as THREE.PerspectiveCamera;
    const h = 2 * dist * Math.tan(THREE.MathUtils.degToRad(cam.fov) / 2) * 1.15;
    mesh.current.scale.set(h * (size.width / size.height), h, 1);
  });

  return createPortal(
    <mesh ref={mesh} position={[0, 0, -40]} renderOrder={-10}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={mat}
        uniforms={uniforms}
        depthWrite={false}
        depthTest={false}
        vertexShader={/* glsl */ `
          varying vec2 vUv;
          void main(){
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={/* glsl */ `
          uniform float uTime;
          uniform float uAspect;
          uniform float uScroll;
          uniform vec3 uBg;
          uniform vec3 uWisp;
          varying vec2 vUv;
          ${fbm2D}
          void main(){
            vec2 uv = (vUv - 0.5) * vec2(uAspect, 1.0);
            float t = uTime * 0.028 + uScroll * 2.4;
            // 도메인 워핑으로 유체 같은 결
            vec2 q = vec2(
              fbm(uv * 2.1 + vec2(t * 0.55, -t * 0.35)),
              fbm(uv * 2.1 + vec2(-t * 0.4, t * 0.5) + 5.2)
            );
            float n = fbm(uv * 2.6 + q * 1.35 + vec2(t * 0.22, 0.0));
            float wisps = smoothstep(0.36, 0.86, n);
            vec3 col = mix(uBg, uWisp, wisps * 0.5);
            // 중앙으로 은은한 빛
            float glow = smoothstep(0.95, 0.1, length(uv));
            col = mix(col, mix(uBg, uWisp, 0.18), glow * 0.35);
            // 가장자리 비네트
            float vig = smoothstep(1.35, 0.55, length(uv));
            col *= mix(0.94, 1.0, vig);
            gl_FragColor = vec4(col, 1.0);
          }
        `}
      />
    </mesh>,
    camera as unknown as THREE.Object3D
  );
}

/* ── 컬 노이즈 파티클 — 회랑 + 포도송이 클러스터 ───────────── */
function FlowParticles({ store, count }: { store: Store; count: number }) {
  const mat = useRef<THREE.ShaderMaterial>(null);

  const { positions, seeds, sizes, mixes } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const seeds = new Float32Array(count);
    const sizes = new Float32Array(count);
    const mixes = new Float32Array(count);
    const clusterShare = Math.floor(count * 0.45);

    for (let i = 0; i < count; i++) {
      let x: number, y: number, z: number;
      if (i < clusterShare) {
        // 포도송이: 클러스터 중심 주변 구형 분포
        const c = CLUSTERS[i % CLUSTERS.length];
        const r = 0.5 + Math.random() * 1.1;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        x = c[0] + r * Math.sin(phi) * Math.cos(theta);
        y = c[1] + r * Math.sin(phi) * Math.sin(theta) * 0.8;
        z = c[2] + r * Math.cos(phi) * 0.7;
      } else {
        // 회랑 전체에 성긴 안개처럼
        x = (Math.random() * 2 - 1) * 5.5;
        y = (Math.random() * 2 - 1) * 3.2;
        z = 8 - Math.random() * 31;
      }
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      seeds[i] = Math.random() * 100;
      sizes[i] = 0.35 + Math.random() * 1.05;
      mixes[i] = Math.random();
    }
    return { positions, seeds, sizes, mixes };
  }, [count]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPixelRatio: { value: 1 },
      uSize: { value: 95 },
      uColA: { value: new THREE.Color("#5c2a3d") },
      uColB: { value: new THREE.Color("#b08d57") },
      uOpacity: { value: 0.62 },
    }),
    []
  );

  useFrame(({ clock, gl }) => {
    if (!mat.current) return;
    mat.current.uniforms.uTime.value = clock.elapsedTime;
    mat.current.uniforms.uPixelRatio.value = gl.getPixelRatio();
    (mat.current.uniforms.uColA.value as THREE.Color).copy(store.pA);
    (mat.current.uniforms.uColB.value as THREE.Color).copy(store.pB);
  });

  return (
    <points frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aSeed" args={[seeds, 1]} />
        <bufferAttribute attach="attributes-aSize" args={[sizes, 1]} />
        <bufferAttribute attach="attributes-aMix" args={[mixes, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={mat}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.NormalBlending}
        vertexShader={/* glsl */ `
          attribute float aSeed;
          attribute float aSize;
          attribute float aMix;
          uniform float uTime;
          uniform float uPixelRatio;
          uniform float uSize;
          varying float vMix;
          varying float vAlpha;
          ${simplex3D}
          ${curl3D}
          void main(){
            vec3 p = position;
            // 컬 노이즈 흐름장 — 발산 없는 유체 드리프트
            vec3 flow = curl(p * 0.22 + vec3(0.0, 0.0, uTime * 0.045));
            p += flow * (0.65 + sin(aSeed) * 0.25);
            p.y += sin(uTime * 0.5 + aSeed * 3.1) * 0.06;

            vec4 mv = modelViewMatrix * vec4(p, 1.0);
            float dist = max(-mv.z, 0.001);
            gl_PointSize = aSize * uSize * uPixelRatio / dist;
            // 카메라 통과 시 부드럽게 사라지고, 멀면 안개 속으로
            vAlpha = smoothstep(0.7, 3.2, dist) * (1.0 - smoothstep(15.0, 28.0, dist));
            // 미세한 반짝임
            vAlpha *= 0.75 + 0.25 * sin(uTime * (0.6 + fract(aSeed) * 0.7) + aSeed);
            vMix = aMix;
            gl_Position = projectionMatrix * mv;
          }
        `}
        fragmentShader={/* glsl */ `
          uniform vec3 uColA;
          uniform vec3 uColB;
          uniform float uOpacity;
          varying float vMix;
          varying float vAlpha;
          void main(){
            float d = length(gl_PointCoord - 0.5);
            float a = smoothstep(0.5, 0.06, d) * vAlpha * uOpacity;
            if(a < 0.004) discard;
            gl_FragColor = vec4(mix(uColA, uColB, vMix), a);
          }
        `}
      />
    </points>
  );
}

function Scene({ store, count }: { store: Store; count: number }) {
  const { camera } = useThree();
  return (
    <>
      {/* 카메라를 씬 그래프에 추가해야 카메라 자식(스모크)이 렌더됨 */}
      <primitive object={camera} />
      <CameraRig store={store} />
      <SmokeBackdrop store={store} />
      <FlowParticles store={store} count={count} />
    </>
  );
}

/* ── 진입점: 고정 풀스크린 캔버스 ──────────────────────────── */
export default function JourneyScene() {
  const [ready, setReady] = useState(false);
  const [count, setCount] = useState(5200);

  const store = useMemo<Store>(
    () => ({
      progress: 0,
      anchors: [0, 0.18, 0.36, 0.56, 0.76, 1],
      mouse: new THREE.Vector2(),
      bg: new THREE.Color("#faf7f2"),
      wisp: new THREE.Color("#e2c9bc"),
      pA: new THREE.Color("#5c2a3d"),
      pB: new THREE.Color("#b08d57"),
    }),
    []
  );

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(max-width: 768px)").matches) setCount(2400);
    setReady(true);

    // 실제 섹션 위치를 측정해 챕터 앵커를 스크롤 진행도로 변환
    const measure = () => {
      const total =
        document.documentElement.scrollHeight - window.innerHeight;
      if (total <= 0) return;
      const next = SECTION_IDS.map((id, idx) => {
        if (idx === 0) return 0;
        const el = document.getElementById(id);
        if (!el) return store.anchors[idx] ?? 1;
        return THREE.MathUtils.clamp(
          (el.offsetTop - window.innerHeight * 0.35) / total,
          0,
          1
        );
      });
      next[next.length - 1] = Math.max(next[next.length - 1], 0.99);
      store.anchors = next;
    };
    measure();
    const t1 = setTimeout(measure, 800);
    const t2 = setTimeout(measure, 2500);
    window.addEventListener("resize", measure);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener("resize", measure);
    };
  }, [store]);

  if (!ready) return null;

  return (
    <div className="fade-in-slow fixed inset-0 -z-10 opacity-0" aria-hidden>
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 0.2, 6.5], fov: 50, near: 0.1, far: 200 }}
        gl={{ antialias: false, alpha: false, powerPreference: "high-performance" }}
        onCreated={({ gl }) => gl.setClearColor("#faf7f2")}
      >
        <Scene store={store} count={count} />
      </Canvas>
    </div>
  );
}
