'use client';

import { cn } from '@repo/shared';
import {
  format,
  getDate,
  getMonth,
  getYear,
  isBefore,
  isSameDay,
  setHours,
  setMinutes,
  startOfDay,
} from 'date-fns';
import { ko } from 'date-fns/locale';
import type { PropsWithChildren } from 'react';
import { useEffect, useState } from 'react';
import type { ReactDatePickerCustomHeaderProps } from 'react-datepicker';
import DatePicker from 'react-datepicker';
import { useFormContext } from 'react-hook-form';

import type { IInvitation } from '@/types/pageBrothers.type';
import { Before, Next } from '@/ui/svgs';

import '../react-datepicker.css';
import { getCombinedDateTime } from '../utils';
import useModalStore from '../zustand';

const months = [
  '1월',
  '2월',
  '3월',
  '4월',
  '5월',
  '6월',
  '7월',
  '8월',
  '9월',
  '10월',
  '11월',
  '12월',
];

interface IntroCalendarProps {
  invitation: IInvitation;
}

function IntroCalendar({ invitation }: IntroCalendarProps) {
  const { setValue } = useFormContext();

  const [selectedDay, setSelectedDay] = useState<Date | undefined>(new Date(invitation.eventAt));
  const [selectedTime, setSelectedTime] = useState<Date | undefined>(new Date(invitation.eventAt));
  const [isTimeClicked, setIsTimeClicked] = useState<boolean>(false);

  const { closeMultiModal } = useModalStore();

  const handleOnChange = (date: Date | null) => {
    if (date) setSelectedDay(date);
  };

  const handleOnChangeTime = (date: Date | null) => {
    if (date) setSelectedTime(date);
    setIsTimeClicked(true);
  };

  useEffect(() => {
    const selectedTimeToCenter = document.querySelector(
      '.react-datepicker__time-list-item--selected',
    );
    if (selectedTimeToCenter) {
      selectedTimeToCenter.scrollIntoView({
        behavior: 'instant',
        block: 'center',
        inline: 'center',
      });
    }
  }, [selectedTime]);

  useEffect(() => {
    if (!isTimeClicked) return;
    if (selectedDay && selectedTime) {
      const originDate = getCombinedDateTime(
        new Date(invitation.eventAt),
        new Date(invitation.eventAt),
      );
      const combinedDateTime = getCombinedDateTime(selectedDay, selectedTime);

      const datesAreEqual = isSameDay(originDate, combinedDateTime);
      if (!datesAreEqual) {
        const formatted = format(combinedDateTime, "yyyy-MM-dd'T'HH:mm:ss");
        setValue('invitation.eventAt', formatted);
        closeMultiModal();
        return;
      }
      closeMultiModal();
    }
  }, [selectedDay, selectedTime, setValue, closeMultiModal, invitation, isTimeClicked]);

  return (
    <div>
      <div className="react-datepicker custom-calendar text-slate-600" style={{ height: 348 }}>
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
              cn(
                isBefore(startOfDay(date), startOfDay(new Date())) &&
                  'opacity-25 react-datepicker__day--disabled',
                selectedDay && isSameDay(date, selectedDay) && 'text-indigo-600 font-bold',
              ),
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

export default IntroCalendar;

function DatePickerDay(day: number, date: Date) {
  return <span>{getDate(date)}</span>;
}

function DatePickerCalendarContainer({ children }: PropsWithChildren) {
  return <section id="calendar">{children}</section>;
}

function DatePickerTimeContainer({ children }: PropsWithChildren) {
  return <section id="time">{children}</section>;
}

function DatePickerCalendarHeader({
  date,
  increaseYear,
  decreaseYear,
  decreaseMonth,
  increaseMonth,
  prevYearButtonDisabled,
  nextYearButtonDisabled,
  prevMonthButtonDisabled,
  nextMonthButtonDisabled,
  selectedDay,
}: ReactDatePickerCustomHeaderProps & { selectedDay: Date }) {
  return (
    <div className="react-datepicker__header--month">
      <button
        type="button"
        onClick={decreaseYear}
        disabled={getMonth(date) === getMonth(selectedDay) || prevYearButtonDisabled}
      >
        <Before className="text-xl" isDouble />
      </button>

      <button
        type="button"
        onClick={decreaseMonth}
        disabled={getMonth(date) === getMonth(selectedDay) || prevMonthButtonDisabled}
      >
        <Before className="text-xl" />
      </button>

      <div className="flex-1 text-center">{`${getYear(date)}년 ${months[getMonth(date)]}`}</div>

      <button type="button" onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
        <Next className="text-xl" />
      </button>

      <button type="button" onClick={increaseYear} disabled={nextYearButtonDisabled}>
        <Next className="text-xl" isDouble />
      </button>
    </div>
  );
}
