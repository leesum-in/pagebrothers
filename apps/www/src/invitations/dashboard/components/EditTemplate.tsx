'use client';

import { Modal } from '@repo/shared';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { useShallow } from 'zustand/shallow';

import { useInvitationQuery } from '@/invitations/queries';
import ErrorTemplate from '@/ui/error/ErrorTemplate';
import { PageWrapper } from '@/ui/wrapper';
import { Widget, WidgetModal, WidgetModalFooter, WidgetModalHeader } from '@/widget/common';
import type { ModalStore } from '@/widget/zustand';
import useModalStore from '@/widget/zustand';

function EditTemplate() {
  const { id } = useParams<{ id: string }>();
  const { data: invitation, isPending, error } = useInvitationQuery(id);
  const { modalState, closeModal } = useModalStore(
    useShallow((state: ModalStore) => ({
      modalState: state.modalState,
      closeModal: state.closeModal,
    })),
  );
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
    <>
      <Modal
        isModalOpen={modalState.isOpen}
        onCloseModal={closeModal}
        onSubmit={(e) => {
          e.preventDefault();
          console.log('submit');
        }}
        modalHeader={<WidgetModalHeader type={modalState.type} />}
        modalFooter={<WidgetModalFooter />}
      >
        <WidgetModal type={modalState.type} />
      </Modal>

      <PageWrapper>
        <div className="desktop:flex-1">
          <div className="mx-auto w-full max-w-[26rem]">
            <div className="space-y-6">
              {/** 아래 그냥 예시입니다 */}
              {invitation?.widgets[0] ? (
                <Widget invitation={invitation} widgetItem={invitation.widgets[0]} />
              ) : null}
              {invitation?.widgets[1] ? (
                <Widget invitation={invitation} widgetItem={invitation.widgets[1]} />
              ) : null}
            </div>
          </div>
        </div>
        <div className="mx-auto w-full max-w-[26rem] desktop:max-w-[22.5rem] desktop:flex-none desktop:self-start sticky top-[5.5rem] hidden desktop:block" />
      </PageWrapper>
    </>
  );
}

export default EditTemplate;
