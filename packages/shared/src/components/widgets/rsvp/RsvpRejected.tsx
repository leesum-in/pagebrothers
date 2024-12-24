'use client';

import { LabelWithSub } from '../../label';
import RsvpRejectedHeader from './RsvpRejectedHeader';

interface RsvpRejectedProps {
  onClose: () => void;
}

function RsvpRejected({ onClose }: RsvpRejectedProps) {
  return (
    <div className="bg-white">
      <RsvpRejectedHeader onClose={onClose} />
      <div className="px-6 py-4">
        <form>
          <input type="hidden" name="accepted" value="false" />
          <ul className="space-y-8">
            <li>
              <div className="space-y-2 ">
                <div>
                  <div className="relative z-0 flex h-12 items-stretch -space-x-[1px] bg-white ">
                    <label className="group relative h-full w-full cursor-pointer text-sm leading-relaxed">
                      <input
                        required
                        name="formValues.db0cd3a3-50af-46a0-b0fb-7c67e6b78272"
                        type="radio"
                        className="peer absolute inset-0 opacity-0"
                        value="🤵 신랑 손님"
                      />
                      <span className="center-flex relative h-full w-full gap-2 border border-slate-200 px-3 text-slate-600 group-first-of-type:rounded-l-sm group-last-of-type:rounded-r-sm peer-checked:z-10 peer-checked:border-indigo-600 peer-checked:text-indigo-600 peer-focus:ring">
                        🤵 신랑 손님
                      </span>
                    </label>
                    <label className="group relative h-full w-full cursor-pointer text-sm leading-relaxed">
                      <input
                        required
                        name="formValues.db0cd3a3-50af-46a0-b0fb-7c67e6b78272"
                        type="radio"
                        className="peer absolute inset-0 opacity-0"
                        value="👰 신부 손님"
                      />
                      <span className="center-flex relative h-full w-full gap-2 border border-slate-200 px-3 text-slate-600 group-first-of-type:rounded-l-sm group-last-of-type:rounded-r-sm peer-checked:z-10 peer-checked:border-indigo-600 peer-checked:text-indigo-600 peer-focus:ring">
                        👰 신부 손님
                      </span>
                    </label>
                  </div>
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
