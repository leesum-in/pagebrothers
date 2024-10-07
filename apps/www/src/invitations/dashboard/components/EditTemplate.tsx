'use client';

import { useParams } from 'next/navigation';
import { useEffect } from 'react';

import { useInvitationQuery } from '@/invitations/queries';
import ErrorTemplate from '@/ui/error/ErrorTemplate';
import { PageWrapper } from '@/ui/wrapper';
import { Widget } from '@/widget/common';

function EditTemplate() {
  const { id } = useParams<{ id: string }>();
  const { data: invitation, isPending, error } = useInvitationQuery(id);

  useEffect(() => {
    if (invitation) console.log('invitation ====>', invitation);
  }, [invitation]);

  if (isPending) {
    // 로딩 중일 때 표시할 컴포넌트 수정 요망
    return <div>Loading...</div>;
  }

  if (error) {
    return <ErrorTemplate />;
  }

  return (
    <PageWrapper>
      <div className="desktop:flex-1">
        <div className="mx-auto w-full max-w-[26rem]">
          <div className="space-y-6">
            {/** 아래 그냥 예시입니다 */}
            {invitation?.widgets[1] ? (
              <Widget widgetType={invitation.widgets[1].type} widgetItem={invitation.widgets[1]} />
            ) : null}
          </div>
        </div>
      </div>
      <div className="mx-auto w-full max-w-[26rem] desktop:max-w-[22.5rem] desktop:flex-none desktop:self-start sticky top-[5.5rem] hidden desktop:block" />
    </PageWrapper>
  );
}

export default EditTemplate;
