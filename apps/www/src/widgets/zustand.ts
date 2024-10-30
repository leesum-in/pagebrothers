import type { SubmitHandler } from 'react-hook-form';
import { create } from 'zustand';

import type { IInvitation, WidgetItem } from '@/types/pageBrothers.type';

import type { WidgetConfigs } from './types';

export type ModalState = {
  isOpen: boolean;
  widget: WidgetItem | Partial<WidgetItem> | null;
};

export type MultiModalState = {
  calendar?: boolean;
} & ModalState;

export type ModalStore = {
  modalState: ModalState;
  multiModalState: MultiModalState;
  invitation: IInvitation | null;
  isDragging: boolean;
  onSubmit: SubmitHandler<WidgetConfigs>;
  openModal: (widget: WidgetItem | Partial<WidgetItem>) => void;
  openMultiModal: ({
    widget,
    calendar,
  }: {
    widget: WidgetItem | Partial<WidgetItem> | null;
    calendar?: boolean;
  }) => void;
  closeModal: () => void;
  closeMultiModal: () => void;
  setOnSubmit: (onSubmit: SubmitHandler<WidgetConfigs>) => void;
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
  openModal: (widget: WidgetItem | Partial<WidgetItem>) => {
    set((state: ModalStore) => ({ modalState: { ...state.modalState, isOpen: true, widget } }));
  },
  openMultiModal: ({
    widget,
    calendar,
  }: {
    widget: WidgetItem | Partial<WidgetItem> | null;
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
    set((state: ModalStore) => ({
      modalState: { ...state.modalState, isOpen: false, widget: null },
    }));
  },
  closeMultiModal: () => {
    set((state: ModalStore) => ({
      multiModalState: { ...state.multiModalState, isOpen: false, widget: null, calendar: false },
    }));
  },
  setOnSubmit: (onSubmit: SubmitHandler<WidgetConfigs>) => {
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
