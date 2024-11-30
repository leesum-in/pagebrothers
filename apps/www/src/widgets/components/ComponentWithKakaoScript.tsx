/* eslint-disable @typescript-eslint/no-unsafe-assignment -- Required for third-party Kakao SDK types which don't have TypeScript definitions*/

'use client';

import Script from 'next/script';
import { Children, cloneElement, useState } from 'react';

interface ComponentWithScriptProps {
  children: React.ReactNode;
}

function ComponentWithKakaoScript({ children }: ComponentWithScriptProps) {
  const [kakaoObject, setKakaoObject] = useState<Window['kakao']>(null);

  const renderChildren = () => {
    return Children.map(children, (child) => {
      return cloneElement(child as React.ReactElement, {
        kakaoObject,
      });
    });
  };

  return (
    <>
      <Script
        src={`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_APP_JAVASCRIPT_KEY}&autoload=false`}
        onReady={() => {
          setKakaoObject(window.kakao);
        }}
      />
      {renderChildren()}
    </>
  );
}

export default ComponentWithKakaoScript;
