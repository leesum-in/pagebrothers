'use client';

import Link from 'next/link';
import { useEffect } from 'react';

import { PageWrapper } from '@/ui/wrapper';

import { useInvitationsQuery } from '../queries';
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
        {/** 아래 완전 임시입니다 ~ */}
        {invitations?.items.map((invitation, index) => (
          <div key={invitation.id}>
            <Link href={`/dashboard/${invitation.id}/edit`}>{`${index + 1}번째 청첩장`}</Link>
          </div>
        ))}
      </div>
    </PageWrapper>
  );
}

export default DashboardTemplate;
