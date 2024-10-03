'use client';

import { useInvitationsQuery } from '@/invitations/queries';
import { PageWrapper } from '@/ui/wrapper';
import { useEffect } from 'react';
import DashboardHeader from './DashboardHeader';

// 이 컴포넌트는 폴더 위치 및 구조에 대한 논의가 필요합니다.
function DashboardTemplate() {
  const { data: invitations } = useInvitationsQuery();

  useEffect(() => {
    console.log('계정주의 전체 청첩장 목록 ====>', invitations);
  }, [invitations]);

  return (
    <PageWrapper>
      <div className="mx-auto w-full max-w-2xl space-y-10">
        <DashboardHeader />
      </div>
    </PageWrapper>
  );
}

export default DashboardTemplate;
