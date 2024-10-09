import type { SubmitHandler } from 'react-hook-form';
import { create } from 'zustand';

import type { WidgetItem } from '@/types/pageBrothers.type';

export type VideoWidgetForm = {
  url: string;
  aspectWidth: number;
  aspectHeight: number;
};

export type SubmitHandlers = VideoWidgetForm;

export type ModalStore = {
  modalState: {
    isOpen: boolean;
    widget: WidgetItem | null;
  };
  invitationId: string;
  onSubmit: SubmitHandler<SubmitHandlers>;
  openModal: (type: WidgetItem) => void;
  closeModal: () => void;
  setOnSubmit: (onSubmit: SubmitHandler<SubmitHandlers>) => void;
  setInvitationId: (invitationId: string) => void;
};

const useModalStore = create<ModalStore>((set) => ({
  modalState: {
    isOpen: false,
    widget: null,
  },
  invitationId: '',
  onSubmit: () => {},
  openModal: (widget: WidgetItem) => {
    set((state: ModalStore) => ({ modalState: { ...state.modalState, isOpen: true, widget } }));
  },
  closeModal: () => {
    set((state: ModalStore) => ({
      modalState: { ...state.modalState, isOpen: false, widget: null },
    }));
  },
  setOnSubmit: (onSubmit: SubmitHandler<SubmitHandlers>) => {
    set((state: ModalStore) => ({ ...state, onSubmit }));
  },
  setInvitationId: (invitationId: string) => {
    set((state: ModalStore) => ({ ...state, invitationId }));
  },
}));

export default useModalStore;
