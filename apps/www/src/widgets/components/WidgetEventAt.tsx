import { Label } from '@repo/shared';
import { useFormContext } from 'react-hook-form';
import { MdOutlineCalendarToday } from 'react-icons/md';

import type { HookFormValues } from '../types';
import { formatDate } from '../utils';
import useModalStore from '../zustand';
import WidgetLabelWithInput from './WidgetLabelWithInput';

function WidgetEventAt() {
  const { openMultiModal } = useModalStore();
  const { watch } = useFormContext<HookFormValues>();

  const handleClickCalendar = () => {
    openMultiModal({ widget: null, calendar: true });
  };

  return (
    <>
      <div>
        <Label label="예식 일시" />
      </div>
      <div onClick={handleClickCalendar}>
        <WidgetLabelWithInput
          labelClassName="relative flex items-center overflow-hidden rounded-md border bg-white focus-within:ring border-slate-200 "
          inputClassName="peer block h-12 w-full bg-white px-4 text-slate-600 placeholder:text-slate-300 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-200"
          inputValue={formatDate(watch('invitation.eventAt'), 'KO')}
          registerOption="invitation.eventAt"
          readonly
          placeholder="예식일을 선택해주세요."
        >
          <div className="flex flex-none items-center">
            <div className="center-flex h-12 w-12 text-slate-400">
              <MdOutlineCalendarToday />
            </div>
          </div>
        </WidgetLabelWithInput>
      </div>
    </>
  );
}

export default WidgetEventAt;
