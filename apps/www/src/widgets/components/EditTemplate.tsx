'use client';

import { Modal } from '@repo/shared';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import type { FieldValues, SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { useShallow } from 'zustand/shallow';

import type { WidgetItem } from '@/types/pageBrothers.type';
import ErrorTemplate from '@/ui/error/ErrorTemplate';
import { PageWrapper } from '@/ui/wrapper';
import {
  Widget,
  WidgetModal,
  WidgetModalFooter,
  WidgetModalHeader,
  WidgetNotFound,
} from '@/widgets/components';

import IntroCalendar from '../intro/IntroCalendar';
import { useInvitationQuery } from '../queries';
import type { ModalStore } from '../zustand';
import useModalStore from '../zustand';

function EditTemplate() {
  const { id } = useParams<{ id: string }>();
  const { data: invitation, isPending, error } = useInvitationQuery(id);
  const {
    isDragging,
    modalState,
    multiModalState,
    closeModal,
    closeMultiModal,
    setInvitation,
    onSubmit,
  } = useModalStore(
    useShallow((state: ModalStore) => ({
      isDragging: state.isDragging,
      multiModalState: state.multiModalState,
      modalState: state.modalState,
      closeModal: state.closeModal,
      closeMultiModal: state.closeMultiModal,
      setInvitation: state.setInvitation,
      onSubmit: state.onSubmit,
    })),
  );
  const { handleSubmit } = useForm();

  useEffect(() => {
    console.log('invitation ====>', invitation);
    if (invitation) {
      setInvitation(invitation);
    }
  }, [invitation, setInvitation]);

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
        isDragging={isDragging}
        onCloseModal={closeModal}
        onSubmit={handleSubmit(onSubmit as SubmitHandler<FieldValues>)}
        modalHeader={
          modalState.widget?.type ? <WidgetModalHeader type={modalState.widget.type} /> : null
        }
        modalFooter={
          modalState.widget ? <WidgetModalFooter widgetItem={modalState.widget} /> : null
        }
      >
        <WidgetModal widget={modalState.widget as WidgetItem | null} />
      </Modal>
      <Modal
        isModalOpen={multiModalState.isOpen}
        isDragging={isDragging}
        onCloseModal={closeMultiModal}
        isMultiModal
        isCalendar={multiModalState.calendar}
      >
        {multiModalState.calendar ? <IntroCalendar /> : null}
        {multiModalState.widget ? (
          <Widget widgetItem={multiModalState.widget} isMultiModal />
        ) : null}
      </Modal>

      {invitation?.widgets.length === 0 ? (
        <WidgetNotFound />
      ) : (
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
      )}
    </>
  );
}

export default EditTemplate;
