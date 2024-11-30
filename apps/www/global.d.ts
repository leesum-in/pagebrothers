/* eslint-disable @typescript-eslint/no-explicit-any -- Required for third-party Kakao SDK types which don't have TypeScript definitions */

declare global {
  interface Window {
    kakao: any;
  }
}

export {};
