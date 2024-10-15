'use client';

import { Button } from '@repo/shared';
import { AiOutlinePlusCircle } from 'react-icons/ai';

function WidgetNotFound() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 desktop:flex-row desktop:gap-8 desktop:p-8 ">
      <div className="desktop:flex-1 ">
        <div className="mx-auto w-full max-w-[26rem]">
          <div className="py-16 desktop:py-24">
            <div className="mx-auto w-full max-w-[16rem] space-y-4 whitespace-pre-line text-center">
              <p className="text-2xl font-bold">차근차근 시작해볼까요?</p>
              <p className="text-slate-400">
                여러가지 위젯들을 조합해서 나만의 청첩장을 꾸밀 수 있어요
              </p>
              <Button
                type="button"
                variants="fill_primary"
                size="medium"
                className="mx-auto w-auto gap-2 h-12 rounded-md px-4 text-sm bg-indigo-600 text-white hover:bg-indigo-700 focus:ring center-flex font-bold shadow-1 transition-colors disabled:opacity-40"
              >
                <AiOutlinePlusCircle />
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
