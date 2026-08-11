# 포도여성의원 홈페이지 리뉴얼

강남 포도여성의원(podowoman.com) 홈페이지 리빌딩 프로젝트 — PODO NOIR 디자인 시스템.

## 스택

Next.js 16 · React 19 · Tailwind CSS v4 · GSAP(ScrollTrigger) · Lenis · Three.js(R3F)

## 실행

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # 프로덕션 빌드 검증
```

Windows에서는 `dev.bat` 더블클릭으로 실행 가능.

## 프로젝트 문서

- `PLAN.md` — 추진·설계·디자인 전략과 감사 체크리스트
- `VERSIONS.md` — 브랜치 전략(main=프로덕션 / 작업 브랜치=테스트), 버전 태그 규칙, 히스토리
- `.claude/agents/podo-audit.md` — 계획 대비 구현을 검증하는 감사 에이전트

## 콘텐츠 수정 위치

병원 정보·진료·FAQ 등 모든 텍스트는 `lib/` 아래 데이터 파일에 모여 있음:
`clinic.ts`(기본정보) · `content.ts`(진료 8센터) · `faq.ts` · `trust.ts` · `about.ts`
