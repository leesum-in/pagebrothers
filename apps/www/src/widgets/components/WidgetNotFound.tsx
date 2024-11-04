'use client';

import { Button } from '@repo/shared';
import { useEffect, useMemo } from 'react';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { useShallow } from 'zustand/shallow';

import type { WidgetItem } from '@/types/pageBrothers.type';

import type { ModalStore } from '../zustand';
import useModalStore from '../zustand';

function WidgetNotFound() {
  const { openModal, invitation } = useModalStore(
    useShallow((state: ModalStore) => ({
      openModal: state.openModal,
      invitation: state.invitation,
    })),
  );

  const introDefaultWidget: Partial<WidgetItem> = useMemo(() => {
    return {
      type: 'INTRO',
      config: {
        title: `신랑 ${invitation?.owners[0].name}, 신부 ${invitation?.owners[1].name}`,
        layoutKey: 'IMAGE_ROUND_FRAME',
        subTitle: 'wedding day',
        coverImage: null,
        align: 'LEFT',
        customTextColor: '',
        showEventInformation: true,
        dateFormatKey: 'KO',
      },
    };
  }, [invitation]);

  const handleOpenClick = () => {
    openModal(introDefaultWidget);
  };

  useEffect(() => {
    openModal(introDefaultWidget);
  }, [openModal, introDefaultWidget]);

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 desktop:flex-row desktop:gap-8 desktop:p-8 ">
      <div className="desktop:flex-1 ">
        <div className="mx-auto w-full max-w-[26rem]">
          <div className="py-16 desktop:py-24">
            {/* 아래 max-w-[16rem] 였는데 줄바꿈 안되서 줄여봄 */}
            <div className="mx-auto w-full max-w-[12rem] space-y-4 whitespace-pre-line text-center">
              <p className="text-2xl font-bold">차근차근 시작해볼까요?</p>
              <p className="text-slate-400">
                여러가지 위젯들을 조합해서 나만의 청첩장을 꾸밀 수 있어요
              </p>
              <Button
                type="button"
                variants="fill_primary"
                size="medium"
                className="mx-auto w-auto gap-2 h-12 rounded-md px-4 text-sm bg-indigo-600 text-white hover:bg-indigo-700 focus:ring center-flex font-bold shadow-1 transition-colors disabled:opacity-40"
                onClick={handleOpenClick}
              >
                <AiOutlinePlusCircle className="w-5 h-5" />
                <span>인트로 위젯 추가하기</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WidgetNotFound;
