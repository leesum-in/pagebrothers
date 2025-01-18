'use client';

import { cn } from '@repo/shared';
import type { IInvitation } from '@repo/shared/src/types/pageBrothers.type';
import { getDate, isBefore, isSameDay, setHours, setMinutes, startOfDay } from 'date-fns';
import { ko } from 'date-fns/locale';
import type { PropsWithChildren } from 'react';
import DatePicker from 'react-datepicker';
import { useFormContext } from 'react-hook-form';

import DatePickerCalendarHeader from '../calendar/DatePickerCalendarHeader';
import { useCalendarSelection } from '../hooks';
import '../multi-modal-datepicker.css';

interface SelectableCalendarProps {
  invitation: IInvitation;
}

function SelectableCalendar({ invitation }: SelectableCalendarProps) {
  const { setValue } = useFormContext();
  const { selectedDay, selectedTime, handleOnChange, handleOnChangeTime } = useCalendarSelection({
    invitation,
    setValue,
  });

  return (
    <div>
      <div
        className="react-datepicker custom-calendar text-slate-600 font-sans"
        style={{ height: 348 }}
      >
        <DatePicker
          selected={selectedDay}
          onChange={handleOnChange}
          calendarContainer={DatePickerCalendarContainer}
          renderCustomHeader={(props) =>
            DatePickerCalendarHeader({ ...props, selectedDay: selectedDay ?? new Date() })
          }
          minDate={new Date()}
          dayClassName={(date) =>
            cn(
              isBefore(startOfDay(date), startOfDay(new Date())) &&
                'opacity-25 react-datepicker__day--disabled',
              selectedDay && isSameDay(date, selectedDay) && 'text-indigo-600 font-bold',
              isSameDay(date, new Date()) && 'text-indigo-600',
            )
          }
          renderDayContents={DatePickerDay}
          locale={ko}
          inline
        />
        <DatePicker
          selected={selectedTime}
          onChange={handleOnChangeTime}
          calendarContainer={DatePickerTimeContainer}
          showTimeSelect
          showTimeSelectOnly
          timeClassName={(date) =>
            cn(
              'react-datepicker__time-list-item',
              date.getMinutes() === 0 && date.getSeconds() === 0 && 'font-extrabold',
              selectedTime &&
                date.getMinutes() === selectedTime.getMinutes() &&
                date.getHours() === selectedTime.getHours() &&
                'text-white bg-indigo-600 font-bold',
            )
          }
          timeIntervals={10}
          timeCaption="시간"
          timeFormat="HH:mm"
          minTime={setHours(setMinutes(new Date(), 50), 9)}
          maxTime={setHours(setMinutes(new Date(), 0), 23)}
          inline
        />
      </div>
    </div>
  );
}

export default SelectableCalendar;

function DatePickerDay(day: number, date: Date) {
  return <span>{getDate(date)}</span>;
}

function DatePickerCalendarContainer({ children }: PropsWithChildren) {
  return <section id="calendar">{children}</section>;
}

function DatePickerTimeContainer({ children }: PropsWithChildren) {
  return <section id="time">{children}</section>;
}
