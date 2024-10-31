'use client';

import { cn } from '@repo/shared';
import { getDate, getMonth, getYear, setHours, setMinutes } from 'date-fns';
import { ko } from 'date-fns/locale';
import type { PropsWithChildren } from 'react';
import { useEffect, useState } from 'react';
import type { ReactDatePickerCustomHeaderProps } from 'react-datepicker';
import DatePicker from 'react-datepicker';

import type { IInvitation } from '@/types/pageBrothers.type';
import '../react-datepicker.css';

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
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(new Date(invitation.eventAt));
  const [selectedTime, setSelectedTime] = useState<Date | undefined>(new Date(invitation.eventAt));

  const handleOnChange = (date: Date | null) => {
    if (date) setSelectedDay(date);
  };

  const handleOnChangeTime = (date: Date | null) => {
    if (date) setSelectedTime(date);
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
          dayClassName={(date) =>
            cn(
              selectedDay && getDate(date) < getDate(selectedDay) && 'opacity-25',
              selectedDay && getDate(date) === getDate(selectedDay)
                ? 'text-indigo-600 font-bold'
                : '',
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
        <svg
          stroke="currentColor"
          fill="none"
          strokeWidth="2"
          viewBox="0 0 24 24"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-xl"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polyline points="11 17 6 12 11 7" />
          <polyline points="18 17 13 12 18 7" />
        </svg>
      </button>

      <button
        type="button"
        onClick={decreaseMonth}
        disabled={getMonth(date) === getMonth(selectedDay) || prevMonthButtonDisabled}
      >
        <svg
          stroke="currentColor"
          fill="none"
          strokeWidth="2"
          viewBox="0 0 24 24"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-xl"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      <div className="flex-1 text-center">{`${getYear(date)}년 ${months[getMonth(date)]}`}</div>

      <button type="button" onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
        <svg
          stroke="currentColor"
          fill="none"
          strokeWidth="2"
          viewBox="0 0 24 24"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-xl"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      <button type="button" onClick={increaseYear} disabled={nextYearButtonDisabled}>
        <svg
          stroke="currentColor"
          fill="none"
          strokeWidth="2"
          viewBox="0 0 24 24"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-xl"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polyline points="13 17 18 12 13 7" />
          <polyline points="6 17 11 12 6 7" />
        </svg>
      </button>
    </div>
  );
}
