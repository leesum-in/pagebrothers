'use client';

import { cn } from '@repo/shared';
import { getDate, getMonth, getYear } from 'date-fns';
import type { PropsWithChildren } from 'react';
import { useState } from 'react';
import type { ReactDatePickerCustomHeaderProps } from 'react-datepicker';
import DatePicker from 'react-datepicker';

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

function IntroCalendar() {
  const [selected, setSelected] = useState<Date | undefined>();

  const handleOnChange = (date: Date | null) => {
    if (date) setSelected(date);
    console.log('asdt');
  };

  return (
    <div>
      <div className="react-datepicker custom-calendar text-slate-600" style={{ height: 348 }}>
        <DatePicker
          selected={selected}
          onChange={handleOnChange}
          calendarContainer={DatePickerContainer}
          renderCustomHeader={DatePickerHeader}
          dayClassName={(date) =>
            cn(
              getDate(date) < Math.random() * 31 ? 'random' : '',
              selected && getDate(date) === getDate(selected)
                ? 'react-datepicker__day--selected'
                : '',
            )
          }
          renderDayContents={DatePickerDay}
          inline
        />
        <DatePicker
          selected={selected}
          onChange={handleOnChange}
          calendarContainer={DatePickerContainer}
          showTimeSelect
          showTimeSelectOnly
          dateFormat="MMMM d, yyyy h:mm aa"
          timeFormat="HH:mm"
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

function DatePickerContainer({ children }: PropsWithChildren) {
  return <section>{children}</section>;
}

function DatePickerHeader({
  date,
  increaseYear,
  decreaseYear,
  decreaseMonth,
  increaseMonth,
  prevYearButtonDisabled,
  nextYearButtonDisabled,
  prevMonthButtonDisabled,
  nextMonthButtonDisabled,
}: ReactDatePickerCustomHeaderProps) {
  return (
    <div className="react-datepicker__header--month">
      <button type="button" onClick={decreaseYear} disabled={prevYearButtonDisabled}>
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

      <button type="button" onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
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
