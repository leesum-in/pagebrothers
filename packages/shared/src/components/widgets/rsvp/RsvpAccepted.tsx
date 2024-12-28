'use client';

import { RsvpExtraField } from '@/shared/types';
import RsvpExtraFields from './RsvpExtraFields';
import RsvpFormHeader from './RsvpFormHeader';

interface RsvpAcceptedProps {
  onClose: () => void;
  extraFields: RsvpExtraField[];
}

function RsvpAccepted({ onClose, extraFields }: RsvpAcceptedProps) {
  return (
    <div className="bg-white">
      <RsvpFormHeader onClose={onClose} />
      <div className="px-6 py-4">
        <form>
          <input type="hidden" name="accepted" value="true" />
          <ul className="space-y-8">
            {/** 질문 문항들 */}
            {extraFields.map((field) => (
              <RsvpExtraFields key={field.id} extraField={field} />
            ))}
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

export default RsvpAccepted;
