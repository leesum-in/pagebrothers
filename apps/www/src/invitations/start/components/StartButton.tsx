'use client';

import { Button } from '@repo/shared';
import { v4 as uuidv4 } from 'uuid';

import { useInvitationMutation } from '@/invitations/mutations';
import type { IInvitation } from '@/types/Pagebrothers.type';

function StartButton() {
  const { mutateAsync: makeInvitation } = useInvitationMutation();

  const handleMakeClick = async () => {
    const invitation: Partial<IInvitation> = {
      eventAt: new Date().toISOString(),
      location: {
        address: '서울특별시 중구 태평로1가 31',
        roadAddress: '서울 중구 세종대로 110',
        placeName: '태평홀',
        placeDetail: '서울시민청',
        coord: [126.978563388844, 37.5668778859271],
      },
      owners: [
        {
          id: uuidv4(),
          name: '김철수',
          role: 'GROOM',
        },
        {
          id: uuidv4(),
          name: '박영희',
          role: 'BRIDE',
        },
      ],
    };

    const result = await makeInvitation(invitation);
    console.log(result);
    // '01924fd7-5fa2-4934-7bc9-fb7d7c331d70' 10.03 오전 09:47 에 생성되었습니다.
  };

  return (
    <div className="sticky bottom-0 ml-auto flex max-w-full items-center justify-end gap-4 p-4 desktop:p-8 ">
      <div className="sticky bottom-0 flex justify-end">
        <Button
          variants="fill_primary"
          size="large"
          onClick={handleMakeClick}
          className="h-12 rounded-md px-4 text-sm bg-indigo-600 text-white hover:bg-indigo-700 focus:ring center-flex gap-2 font-bold shadow-1 transition-colors disabled:opacity-40"
        >
          청첩장 만들기
        </Button>
      </div>
    </div>
  );
}

export default StartButton;
