'use client';

import { LabelWithSub } from '../../label';
import RsvpButtons from './RsvpButtons';
import RsvpFormHeader from './RsvpFormHeader';

interface RsvpRejectedProps {
  onClose: () => void;
  openToast: (message: string) => void;
  isThirdModal: boolean;
}

function RsvpRejected({ onClose, openToast, isThirdModal }: RsvpRejectedProps) {
  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isThirdModal) {
      openToast('미리보기에서는 참석 여부가 전달되지 않아요');
      onClose();
    }
  };

  return (
    <div className="bg-white">
      <RsvpFormHeader onClose={onClose} />
      <div className="px-6 py-4">
        <form>
          <input type="hidden" name="accepted" value="false" />
          <ul className="space-y-8">
            <li>
              <div className="space-y-2 ">
                <div>
                  <RsvpButtons options={['🤵 신랑 손님', '👰 신부 손님']} />
                </div>
              </div>
            </li>
            <li>
              <div className="space-y-2 ">
                <div>
                  <LabelWithSub label="참석자 이름" />
                </div>
                <div>
                  <label className="relative flex items-center overflow-hidden rounded-md border bg-white focus-within:ring border-slate-200 ">
                    <div className="flex flex-none items-center"></div>
                    <input
                      className="peer block h-12 w-full bg-white px-4 text-slate-600 placeholder:text-slate-300 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-200 "
                      spellCheck={false}
                      autoComplete="off"
                      placeholder="참석자 성함을 알려주세요."
                      required
                      name="formValues.3c2e1be4-c48b-4aa2-85a9-9e387d944177"
                    />
                    <div className="flex flex-none items-center"></div>
                  </label>
                </div>
              </div>
            </li>
            <li>
              <button
                type="submit"
                onClick={handleButtonClick}
                className="w-full h-12 rounded-md px-4 text-sm bg-indigo-600 text-white hover:bg-indigo-700 focus:ring center-flex gap-2 font-bold shadow-1 transition-colors disabled:opacity-40"
              >
                전달하기
              </button>
            </li>
          </ul>
        </form>
      </div>
    </div>
  );
}

export default RsvpRejected;
