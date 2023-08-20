export const GROOM_NAME = "오성민"
export const BRIDE_NAME = "어희재"

export const WEDDING_DATE = new Date("2023-12-16T11:00:00.000")
export const WEDDING_DATE_TZ = new Date("2023-12-16T11:00:00.000+09:00")

export const WEDDING_VANUE = `
서울대학교 이라운지
(구. 라쿠치나)
`.trim()
export const WEDDING_VANUE_KAKAO_LINK = "https://place.map.kakao.com/12544261"
export const WEDDING_VANUE_NAVER_LINK = "https://map.naver.com/v5/entry/place/18720631"
export const WEDDING_VANUE_ADDRESS = `
서울대학교 관악캠퍼스
엔지니어하우스
`.trim()

interface VanueDirection {
  method: string;
  ways: string[];
  footer: string;
}
export const WEDDING_VANUE_DIRECTIONS: VanueDirection[] = [
    {
      method: '자가용 이용시',
      ways: [
        `남부순환로에서 낙성대 방면으로 진입
        → 서울대 후문 진입
        → 기숙사 삼거리에서 좌회전
        → 계속 직진하여 엔지니어 하우스(우측) 진입`,
        `남부순환로나 신림동 방면에서 진입
        → 서울대 정문 진입
        → 계속 직진하여 언덕을 돌아 엔지니어 하우스(좌측) 진입`,
      ],
      footer: '※ 주차는 예식장 앞 마당에 충분한 공간이 있으며 4시간 무료주차 제공됩니다.'
    },
  {
    method: '지하철 이용시',
    ways: [
      `2호선 낙성대역 4번출구
      → GS주유소 끼고 좌회전 후 우회전
      → 제과점 앞에서 마을버스 2번 탑승
      → 제2공학관(종점) 하차`,
      `2호선 서울대입구역 3번출구
      → 5511, 5513 버스 탑승
      → 제2공학관(종점) 하차`,
    ],
    footer: ''
  },
]


export const GREETING = `
함께 있을 때 가장 나다운 모습이 되고, 
함께 있을 때 미래를 꿈꾸게 하는 사람을 만나
함께 맞는 겨울, 결혼합니다. 
지금처럼 서로의 가장 친한 친구가 되어 
예쁘고 행복하게 잘 살겠습니다. 
저희의 새로운 시작을 함께 축복해주세요. 
`.trim()

export const TITLE = '결혼합니다♡'
export const GROOM_PARENTS = '(고) 오행식 · 성지영'
export const GROOM_SHORT_NAME = '성민'
export const GROOM_RELATION = '장남'
export const BRIDE_PARENTS = '어하준 · 임경원'
export const BRIDE_SHORT_NAME = '희재'
export const BRIDE_RELATION = '장녀'

export const GROOM_TEL = '010-4391-1948'
export const GROOM_KAKAO = 'http://qr.kakao.com/talk/3PfY2KNvrgJYDz9tUf4f.OIMkaw-'
export const BRIDE_TEL = '010-3307-4308'
export const BRIDE_KAKAO = ''

export const IMAGE_COUNT = 17
export const OG_IMAGE = "https://drive.google.com/uc?id=1uGRWP6JZlmaQLTEx1tiM1xjXVtG8FpU2"

export const GROOM_BANK = "aa은행 123-456-789"
export const GROOM_BANK_HOLDER = GROOM_NAME
export const BRIDE_BANK = "bb은행 123-456-789"
export const BRIDE_BANK_HOLDER = BRIDE_NAME


export const HOSTNAME = 'localhost'
export const LOGROCKET = '4pk7ni/wedding'

export const DATA_LINK = "https://docs.google.com/document/export?format=txt&id=1aQs1apIfZ05_NUduLXyRJonAL7IVgWrAachNExcSSS4"

export const MESSAGE_MAX_NAME_LENGTH = 20
export const MESSAGE_MIN_CONTENT_LENGTH = 5
export const MESSAGE_MAX_CONTENT_LENGTH = 200


export const NAVER_API_CLIENT_ID = "iqzth67per"

/**
 * NODE_ENV
 * GOOGLE_SERVICE_ACCOUNT_EMAIL
 * GOOGLE_PRIVATE_KEY
 * GUESTBOOK_SHEET_ID
 */