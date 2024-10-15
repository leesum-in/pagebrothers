import type { SubmitHandler } from 'react-hook-form';
import { create } from 'zustand';

import type { WidgetConfigs } from '@/invitations/types';
import type { IInvitation, WidgetItem } from '@/types/pageBrothers.type';

export type ModalState = {
  isOpen: boolean;
  widget: WidgetItem | Partial<WidgetItem> | null;
};

export type ModalStore = {
  modalState: ModalState;
  multiModalState: ModalState;
  invitation: IInvitation | null;
  onSubmit: SubmitHandler<WidgetConfigs>;
  openModal: (widget: WidgetItem | Partial<WidgetItem>) => void;
  openMultiModal: (widget: WidgetItem | Partial<WidgetItem>) => void;
  closeModal: () => void;
  closeMultiModal: () => void;
  setOnSubmit: (onSubmit: SubmitHandler<WidgetConfigs>) => void;
  setInvitation: (invitation: IInvitation) => void;
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
  invitation: null,
  onSubmit: () => {},
  openModal: (widget: WidgetItem | Partial<WidgetItem>) => {
    set((state: ModalStore) => ({ modalState: { ...state.modalState, isOpen: true, widget } }));
  },
  openMultiModal: (widget: WidgetItem | Partial<WidgetItem>) => {
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
  setOnSubmit: (onSubmit: SubmitHandler<WidgetConfigs>) => {
    set((state: ModalStore) => ({ ...state, onSubmit }));
  },
  setInvitation: (invitation: IInvitation) => {
    set((state: ModalStore) => ({ ...state, invitation }));
  },
}));

export default useModalStore;
