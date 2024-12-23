'use client';

import { Modal } from '@repo/shared';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import type { FieldValues, SubmitHandler } from 'react-hook-form';
import { FormProvider, useForm } from 'react-hook-form';
import { useShallow } from 'zustand/shallow';

import { ErrorTemplate, FixedLoader, PageWrapper } from '@/www/ui';
import {
  SelectableCalendar,
  Widget,
  WidgetModal,
  WidgetModalFooter,
  WidgetModalHeader,
  WidgetNotFound,
} from '@/www/widgets/components';
import { useInvitationQuery } from '@/www/widgets/queries';
import type { HookFormValues } from '@/www/widgets/types';
import type { ModalStore } from '@/www/widgets/zustand';
import useModalStore from '@/www/widgets/zustand';

function EditTemplate() {
  const { id } = useParams<{ id: string }>();
  const { data: invitation, isPending, error } = useInvitationQuery(id);
  const {
    isDragging,
    modalState,
    multiModalState,
    thirdModalState,
    closeModal,
    closeMultiModal,
    closeThirdModal,
    setInvitation,
    onSubmit,
  } = useModalStore(
    useShallow((state: ModalStore) => ({
      isDragging: state.isDragging,
      multiModalState: state.multiModalState,
      modalState: state.modalState,
      thirdModalState: state.thirdModalState,
      closeModal: state.closeModal,
      closeMultiModal: state.closeMultiModal,
      closeThirdModal: state.closeThirdModal,
      setInvitation: state.setInvitation,
      onSubmit: state.onSubmit,
    })),
  );
  const methods = useForm<HookFormValues>({
    defaultValues: {
      invitation: null,
    },
  });

  useEffect(() => {
    console.log('invitation ====>', invitation);
    if (invitation) {
      setInvitation(invitation);
      methods.reset({ invitation });
    }
  }, [invitation, setInvitation, methods]);

  if (isPending || !invitation) {
    return <FixedLoader />;
  }

  if (error) {
    return <ErrorTemplate />;
  }

  return (
    <FormProvider {...methods}>
      {modalState.isOpen ? (
        <>
          <Modal
            isModalOpen={modalState.isOpen}
            isDragging={isDragging}
            onCloseModal={closeModal}
            onSubmit={methods.handleSubmit(onSubmit as SubmitHandler<FieldValues>)}
            modalHeader={
              modalState.widget?.type ? <WidgetModalHeader type={modalState.widget.type} /> : null
            }
            modalFooter={
              modalState.widget ? <WidgetModalFooter widgetItem={modalState.widget} /> : null
            }
          >
            <WidgetModal widgetItem={modalState.widget ? modalState.widget : null} />
          </Modal>
          <Modal
            isModalOpen={multiModalState.isOpen}
            // isDragging={isDragging} // 멀티모달에서는 필요없을 수도 있어서 우선 주석처리
            onCloseModal={closeMultiModal}
            isMultiModal
            isCalendar={multiModalState.calendar}
            widgetType={multiModalState.widget?.type}
          >
            {multiModalState.calendar ? <SelectableCalendar invitation={invitation} /> : null}
            {multiModalState.widget ? (
              <Widget widgetItem={multiModalState.widget} isMultiModal invitation={invitation} />
            ) : null}
          </Modal>
          <Modal isModalOpen={thirdModalState.isOpen} onCloseModal={closeThirdModal}>
            {thirdModalState.isRejected ? (
              <div>
                <p>신랑 손님이 참여하지 않을 것 같아요.</p>
                <p>신랑 손님이 참여하지 않을 것 같아요.</p>
              </div>
            ) : null}
            {!thirdModalState.isRejected && thirdModalState.extraFields
              ? thirdModalState.extraFields.map((field) => <div key={field.id}>{field.label}</div>)
              : null}
          </Modal>
        </>
      ) : null}

      {invitation.widgets.length === 0 ? <WidgetNotFound /> : null}
      {invitation.widgets.length > 0 ? (
        <PageWrapper>
          <div className="desktop:flex-1">
            <div className="mx-auto w-full max-w-[26rem]">
              <div className="space-y-6">
                {invitation.widgets.map((widget) => (
                  <Widget key={widget.id} invitation={invitation} widgetItem={widget} />
                ))}
              </div>
            </div>
          </div>
          <div className="mx-auto w-full max-w-[26rem] desktop:max-w-[22.5rem] desktop:flex-none desktop:self-start sticky top-[5.5rem] hidden desktop:block" />
        </PageWrapper>
      ) : null}
    </FormProvider>
  );
}

export default EditTemplate;
