'use client';

import { useParams } from 'next/navigation';
import { useEffect } from 'react';

import { useInvitationQuery } from '@/invitations/queries';
import ErrorTemplate from '@/ui/error/ErrorTemplate';
import { PageWrapper } from '@/ui/wrapper';
import { VideoWidget } from '@/widget/video';

function EditTemplate() {
  const { id } = useParams<{ id: string }>();
  const { data: invitation, isPending, error } = useInvitationQuery(id);

  // 에러 시 정말 throw Error 해서는 안되고 그냥 client 에서 처리해야 하는것 같아요
  // useEffect(() => {
  //   if (error) throw new Error('error');
  // }, [error]);

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
            <VideoWidget />
          </div>
        </div>
      </div>
      <div className="mx-auto w-full max-w-[26rem] desktop:max-w-[22.5rem] desktop:flex-none desktop:self-start sticky top-[5.5rem] hidden desktop:block" />
    </PageWrapper>
  );
}

export default EditTemplate;
