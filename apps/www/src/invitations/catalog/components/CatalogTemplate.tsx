'use client';

import { useEffect } from 'react';

import { useTemplatesQuery } from '@/invitations/queries';
import { PageWrapper } from '@/ui/wrapper';

import CatalogHeader from './CatalogHeader';

// 이 컴포넌트는 폴더 위치 및 구조에 대한 논의가 필요합니다.
function CatalogTemplate() {
  const { data: templates } = useTemplatesQuery();

  useEffect(() => {
    console.log('청첩장 템플릿 목록 ====>', templates);
  }, [templates]);

  return (
    <PageWrapper>
      <div className="mx-auto w-full space-y-14 desktop:max-w-6xl">
        <CatalogHeader />
      </div>
    </PageWrapper>
  );
}

export default CatalogTemplate;
