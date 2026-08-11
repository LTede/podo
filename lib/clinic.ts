/** 포도여성의원 기본 정보 — 공개 검색 결과 기준. 오기 발견 시 이 파일만 수정하면 전체 반영됨 */
export const clinic = {
  nameKo: "포도여성의원",
  nameEn: "PODO WOMEN'S CLINIC",
  phone: "02-3442-4454",
  phoneHref: "tel:0234424454",
  address: "서울 강남구 강남대로 428 만이빌딩 2층 (역삼동)",
  addressShort: "강남역 · 신논현역 도보권",
  naverMapUrl: "https://map.naver.com/p/search/강남포도여성의원",
  youtube: "모형진 의학박사의 여성의학",
  youtubeUrl: "https://www.youtube.com/@모형진의학박사의여성",
  /** TODO(운영): 카카오 채널 개설 후 URL 입력 — 입력 시 상담 바·채널 카드가 자동으로 카톡 연결로 전환됨 */
  kakaoUrl: "",
  hours: [
    { day: "월 – 금", time: "AM 10:00 – PM 7:00", note: "야간진료" },
    { day: "토요일", time: "AM 10:00 – PM 5:00", note: "" },
    { day: "일 · 공휴일", time: "휴진", note: "" },
  ],
  doctor: {
    name: "모형진",
    title: "대표원장 · 산부인과 전문의 · 의학박사",
    credentials: [
      "연세대학교 의과대학 졸업 · 의학박사",
      "연세의료원 세브란스병원 산부인과 전문의 수료",
      "연세대학교 산부인과학교실 외래교수 역임",
      "여성성형 교과서 집필 — 전문의들이 참고하는 표준서",
      "무봉합 100% 레이저 3D 소음순성형 개발",
      "반영구 골반인대접합술 · 요실금 수술 · 성감 증진 필러 등 다수 술식 개발",
      "IBC 선정 여성성형(Vulvovaginoplasty) 분야 세계 100대 의료인",
      "Marquis Who's Who 세계인명사전 등재",
      "독일 베를린·프랑크푸르트, 美 베벌리힐스 레이저센터 연수",
      "유튜브 채널 '모형진 의학박사의 여성의학' 운영",
    ],
  },
} as const;

/** 메인/허브에 노출되는 진료 대분류 — 기존 사이트의 실제 8개 센터 체계.
 *  key는 /services/[key] 상세 페이지와 1:1 대응 (lib/content.ts) */
export const services = [
  {
    key: "vulvar",
    label: "외음부성형",
    en: "Vulvar Surgery",
    desc: "무봉합 100% 레이저 3D 소음순성형 — 교과서를 쓴 손이 직접 집도합니다.",
    items: ["소음순성형", "소음순 재수술", "대음순성형", "음핵성형", "외음부 미백"],
  },
  {
    key: "vaginal",
    label: "질성형 · 질시술",
    en: "Vaginal Rejuvenation",
    desc: "레이저·고주파·필러부터 원장이 개발한 반영구 골반인대접합술까지, 13가지 해답.",
    items: ["골반인대접합술", "레이저 질타이트닝", "질쎄라 HIFU", "질축소 필러"],
  },
  {
    key: "incontinence",
    label: "요실금 클리닉",
    en: "Incontinence",
    desc: "TOT 표준 수술부터 비수술 에너지 치료까지 — 웃음이 편해지는 치료.",
    items: ["TOT 요실금 수술", "방광류 · 직장류 교정", "자궁탈출증"],
  },
  {
    key: "obgy",
    label: "산부인과 진료",
    en: "Gynecology",
    desc: "생리질환부터 검진, 웨딩·산전 검사까지 일상의 여성 건강을 지킵니다.",
    items: ["생리질환 · 생리통", "자궁경부암 검진 · 백신", "STD 패키지 검사", "웨딩 · 산전 검사"],
  },
  {
    key: "stemcell",
    label: "줄기세포 센터",
    en: "Stem Cell Center",
    desc: "재생의학 기반 안티에이징 — 질성형부터 스킨케어, 유전자 검사까지.",
    items: ["줄기세포 질성형", "줄기세포 스킨케어", "혈액줄기세포", "유전자 검사"],
  },
  {
    key: "hifu",
    label: "하이푸 센터",
    en: "HIFU Center",
    desc: "절개 없이 집속 초음파의 힘으로 — 여성 전용 하이푸 프로그램.",
    items: ["하이푸 클리닉", "질쎄라 연계"],
  },
  {
    key: "sexual",
    label: "성감 클리닉",
    en: "Intimacy Clinic",
    desc: "말하기 어려웠던 문제를 의학적으로, 처음부터 끝까지 비공개로.",
    items: ["성감 증진 필러", "음핵성형 연계", "질시술 연계"],
  },
  {
    key: "skin",
    label: "피부 클리닉",
    en: "Skin Clinic",
    desc: "동안 리프팅부터 여드름·미백까지 — 진료와 연계된 피부 설계.",
    items: ["동안 리프팅", "여드름 클리닉", "미백 · 토닝"],
  },
] as const;
