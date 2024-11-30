declare namespace NodeJS {
  interface ProcessEnv {
    BASE_URL: string;
    API_URL: string;
    // 필요한 다른 환경 변수들도 여기에 추가
  }
}

declare global {
  interface Window {
    kakao: any;
  }
}

export {};
