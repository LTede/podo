/** 포도여성의원 기본 정보 — 공개 검색 결과 기준. 오기 발견 시 이 파일만 수정하면 전체 반영됨 */
export const clinic = {
  nameKo: "포도여성의원",
  nameEn: "PODO WOMEN'S CLINIC",
  phone: "02-3442-4454",
  phoneHref: "tel:0234424454",
  address: "서울 강남구 강남대로 428 만이빌딩 2층 (역삼동)",
  addressShort: "강남역 · 신논현역 도보권",
  naverMapUrl: "https://map.naver.com/p/search/강남포도여성의원",
  hours: [
    { day: "월 – 금", time: "AM 10:00 – PM 7:00", note: "야간진료" },
    { day: "토요일", time: "AM 10:00 – PM 5:00", note: "" },
    { day: "일 · 공휴일", time: "휴진", note: "" },
  ],
  doctor: {
    name: "모형진",
    title: "대표원장 · 산부인과 전문의 · 의학박사",
    credentials: [
      "연세대학교 의과대학 졸업",
      "연세의료원 세브란스병원 산부인과 전공의 수료",
      "연세대학교 대학원 의학박사",
      "연세대학교 산부인과 외래교수",
      "여성성형 교과서 저자 — 전문의들이 참고하는 표준서",
      "IBC 선정 여성성형(Vulvovaginoplasty) 분야 세계 100대 의료인",
      "Marquis Who's Who 세계인명사전 등재",
      "독일 베를린·프랑크푸르트, 美 베벌리힐스 레이저센터 연수",
    ],
  },
} as const;

export const services = [
  {
    key: "outside",
    label: "외음부성형",
    en: "Vulvar Surgery",
    desc: "소음순·대음순·음핵성형, 외음부 미백까지 — 교과서를 쓴 손이 집도합니다.",
    items: ["소음순성형", "소음순 재수술", "대음순성형", "음핵성형", "외음부 미백"],
  },
  {
    key: "inside",
    label: "질성형 · 질시술",
    en: "Vaginal Rejuvenation",
    desc: "레이저 질타이트닝 등 회복이 빠른 시술부터 수술까지, 단계별 맞춤 설계.",
    items: ["레이저 질타이트닝", "질성형", "질필러", "HIFU 리프팅"],
  },
  {
    key: "stemcell",
    label: "줄기세포 · 재생",
    en: "Regenerative Care",
    desc: "재생의학 기반의 안티에이징 — 근본부터 젊어지는 선택.",
    items: ["줄기세포 치료", "재생 시술", "안티에이징 프로그램"],
  },
  {
    key: "urology",
    label: "요실금 클리닉",
    en: "Incontinence",
    desc: "웃을 때마다 신경 쓰이던 순간들과 이별하세요.",
    items: ["요실금 수술", "레이저 요실금 치료", "비수술 치료"],
  },
  {
    key: "obgy",
    label: "산부인과 진료",
    en: "Gynecology",
    desc: "생리질환부터 자궁경부암 백신까지, 일상의 여성 건강을 지킵니다.",
    items: ["생리질환 · 생리통", "자궁경부암 검진 · 백신", "여성 검진"],
  },
  {
    key: "skin",
    label: "스킨 클리닉",
    en: "Skin Clinic",
    desc: "산부인과 전문의가 함께 관리하는 피부 — 겉과 속이 같이 빛나도록.",
    items: ["레이저 토닝", "미백 관리", "스킨 부스터"],
  },
] as const;
