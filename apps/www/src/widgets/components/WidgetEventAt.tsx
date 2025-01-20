import { Label } from '@repo/shared';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { MdOutlineCalendarToday } from 'react-icons/md';

import type { HookFormValues } from '../types';
import { formatDate } from '../utils';
import useModalStore from '../zustand';
import WidgetLabelWithInput from './WidgetLabelWithInput';

function WidgetEventAt() {
  const { openMultiModal } = useModalStore();
  const { watch, getValues, register } = useFormContext<HookFormValues>();
  const [eventAt, setEventAt] = useState(formatDate(getValues('invitation.eventAt'), 'KO'));

  const handleClickCalendar = () => {
    openMultiModal({ widget: null, calendar: true });
  };
  const watchedEventAt = watch('invitation.eventAt');

  useEffect(() => {
    if (watchedEventAt.includes('년')) return;
    setEventAt(formatDate(watchedEventAt, 'KO'));
  }, [watchedEventAt]);

  return (
    <>
      <div>
        <Label label="예식 일시" />
      </div>
      <div onClick={handleClickCalendar}>
        <WidgetLabelWithInput
          labelClassName="relative flex items-center overflow-hidden rounded-md border bg-white focus-within:ring border-slate-200 "
          inputClassName="peer block h-12 w-full bg-white px-4 text-slate-600 placeholder:text-slate-300 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-200"
          inputValue={eventAt}
          register={register}
          registerOption="invitation.eventAt"
          readonly
          placeholder="예식일을 선택해주세요."
        >
          <div className="flex flex-none items-center">
            <div className="center-flex h-12 w-12 text-slate-400 cursor-pointer">
              <MdOutlineCalendarToday />
            </div>
          </div>
        </WidgetLabelWithInput>
      </div>
    </>
  );
}

export default WidgetEventAt;
