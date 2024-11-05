import type { SubmitHandler } from 'react-hook-form';
import { create } from 'zustand';

import type { IInvitation, WidgetItem } from '@/types/pageBrothers.type';

import type { HookFormValues } from './types';

export type ModalState = {
  isOpen: boolean;
  widget: WidgetItem | Omit<WidgetItem, 'id'> | null;
};

export type MultiModalState = {
  calendar?: boolean;
} & ModalState;

export type ModalStore = {
  modalState: ModalState;
  multiModalState: MultiModalState;
  invitation: IInvitation | null;
  isDragging: boolean;
  onSubmit: SubmitHandler<HookFormValues>;
  openModal: (widget: WidgetItem | Omit<WidgetItem, 'id'>) => void;
  openMultiModal: ({
    widget,
    calendar,
  }: {
    widget: WidgetItem | Omit<WidgetItem, 'id'> | null;
    calendar?: boolean;
  }) => void;
  closeModal: () => void;
  closeMultiModal: () => void;
  setOnSubmit: (onSubmit: SubmitHandler<HookFormValues>) => void;
  setInvitation: (invitation: IInvitation) => void;
  setIsDragging: (isDragging: boolean) => void;
};

const useModalStore = create<ModalStore>((set) => ({
  modalState: {
    isOpen: false,
    widget: null,
  },
  multiModalState: {
    isOpen: false,
    widget: null,
    calendar: false,
  },
  isDragging: false,
  invitation: null,
  onSubmit: () => {},
  openModal: (widget: WidgetItem | Omit<WidgetItem, 'id'>) => {
    set((state: ModalStore) => ({ modalState: { ...state.modalState, isOpen: true, widget } }));
  },
  openMultiModal: ({
    widget,
    calendar,
  }: {
    widget: WidgetItem | Omit<WidgetItem, 'id'> | null;
    calendar?: boolean;
  }) => {
    set((state: ModalStore) => ({
      multiModalState: {
        ...state.multiModalState,
        isOpen: true,
        widget,
        calendar: calendar ? calendar : false,
      },
    }));
  },
  closeModal: () => {
    set((state: ModalStore) => ({ modalState: { ...state.modalState, isOpen: false } }));
    setTimeout(() => {
      set((state: ModalStore) => ({
        modalState: { ...state.modalState, widget: null },
      }));
    }, 300);
  },
  closeMultiModal: () => {
    set((state: ModalStore) => ({ multiModalState: { ...state.multiModalState, isOpen: false } }));
    setTimeout(() => {
      set((state: ModalStore) => ({
        multiModalState: { ...state.multiModalState, widget: null, calendar: false },
      }));
    }, 300);
  },
  setOnSubmit: (onSubmit: SubmitHandler<HookFormValues>) => {
    set((state: ModalStore) => ({ ...state, onSubmit }));
  },
  setInvitation: (invitation: IInvitation) => {
    set((state: ModalStore) => ({ ...state, invitation }));
  },
  setIsDragging: (isDragging: boolean) => {
    set((state: ModalStore) => ({ ...state, isDragging }));
  },
}));

export default useModalStore;
