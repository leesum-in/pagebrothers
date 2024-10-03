'use client';

import { Button } from '@repo/shared';

function StartButton() {
  return (
    <div className="sticky bottom-0 ml-auto flex max-w-full items-center justify-end gap-4 p-4 desktop:p-8 ">
      <div className="sticky bottom-0 flex justify-end">
        <Button
          variants="fill_primary"
          size="large"
          className="h-12 rounded-md px-4 text-sm bg-indigo-600 text-white hover:bg-indigo-700 focus:ring center-flex gap-2 font-bold shadow-1 transition-colors disabled:opacity-40"
        >
          청첩장 만들기
        </Button>
      </div>
    </div>
  );
}

export default StartButton;
