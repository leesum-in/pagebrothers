import { create } from 'zustand';

import type { WidgetType } from '@/types/pageBrothers.type';

export type ModalStore = {
  modalState: {
    isOpen: boolean;
    type: WidgetType | null;
  };
  openModal: (type: WidgetType) => void;
  closeModal: () => void;
};

const useModalStore = create<ModalStore>((set) => ({
  modalState: {
    isOpen: false,
    type: null,
  },
  openModal: (type: WidgetType) => {
    set((state: ModalStore) => ({ modalState: { ...state.modalState, isOpen: true, type } }));
  },
  closeModal: () => {
    set((state: ModalStore) => ({
      modalState: { ...state.modalState, isOpen: false, type: null },
    }));
  },
}));

export default useModalStore;
