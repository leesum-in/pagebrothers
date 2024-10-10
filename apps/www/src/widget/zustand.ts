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
  multiModalState: {
    isOpen: boolean;
    widget: WidgetItem | null;
  };
  invitationId: string;
  onSubmit: SubmitHandler<SubmitHandlers>;
  openModal: (widget: WidgetItem) => void;
  openMultiModal: (widget: WidgetItem) => void;
  closeModal: () => void;
  closeMultiModal: () => void;
  setOnSubmit: (onSubmit: SubmitHandler<SubmitHandlers>) => void;
  setInvitationId: (invitationId: string) => void;
};

const useModalStore = create<ModalStore>((set) => ({
  modalState: {
    isOpen: false,
    widget: null,
  },
  multiModalState: {
    isOpen: false,
    widget: null,
  },
  invitationId: '',
  onSubmit: () => {},
  openModal: (widget: WidgetItem) => {
    set((state: ModalStore) => ({ modalState: { ...state.modalState, isOpen: true, widget } }));
  },
  openMultiModal: (widget: WidgetItem) => {
    set((state: ModalStore) => ({
      multiModalState: { ...state.multiModalState, isOpen: true, widget },
    }));
  },
  closeModal: () => {
    set((state: ModalStore) => ({
      modalState: { ...state.modalState, isOpen: false, widget: null },
    }));
  },
  closeMultiModal: () => {
    set((state: ModalStore) => ({
      multiModalState: { ...state.multiModalState, isOpen: false, widget: null },
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
