'use client';

import { useEffect } from 'react';

import { PageWrapper } from '@/www/ui';
import { CatalogHeader } from '@/www/widgets/components';
import { useTemplatesQuery } from '@/www/widgets/queries';

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
