import { getMonth, getYear } from 'date-fns';
import type { ReactDatePickerCustomHeaderProps } from 'react-datepicker';

import { Before, Next } from '@/www/ui/svgs';

interface DatePickerCalendarHeaderProps extends ReactDatePickerCustomHeaderProps {
  selectedDay: Date;
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
}: DatePickerCalendarHeaderProps) {
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

      <div className="flex-1 text-center">{`${getYear(date)}년 ${getMonth(date) + 1}월`}</div>

      <button type="button" onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
        <Next className="text-xl" />
      </button>

      <button type="button" onClick={increaseYear} disabled={nextYearButtonDisabled}>
        <Next className="text-xl" isDouble />
      </button>
    </div>
  );
}

export default DatePickerCalendarHeader;
