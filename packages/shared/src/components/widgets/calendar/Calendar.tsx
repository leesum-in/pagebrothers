import { differenceInDays, format, getDate, getMonth, getYear, isSameDay } from 'date-fns';
import { ko } from 'date-fns/locale';
import DatePicker from 'react-datepicker';
import { IInvitation } from '../../../types';
import { cn } from '../../../utils';
import { Button } from '../../button';
import './datepicker.css';

interface CalendarProps {
  invitation: IInvitation;
}

function Calendar({ invitation }: CalendarProps) {
  const weddingDay = new Date(invitation.eventAt);
  const widget = invitation.widgets.find((widget) => widget.type === 'CALENDAR');

  return (
    <div className="space-y-6 py-12 px-6 text-center no-interaction">
      <header
        className={cn(
          widget?.config.align === 'CENTER' && 'text-center',
          widget?.config.align === 'LEFT' && 'text-left',
          widget?.config.align === 'RIGHT' && 'text-right',
        )}
      >
        <p>{widget?.config.title}</p>
        <p className="text-em-lg font-bold text-theme-inter/70">
          {getYear(weddingDay)}년 {getMonth(weddingDay) + 1}월
        </p>
      </header>
      <div>
        <div className="react-datepicker inline-calendar text-sm">
          <div className="react-datepicker__triangle"></div>
          <DatePicker
            selected={weddingDay}
            disabled
            locale={ko}
            inline
            renderCustomHeader={DatePickerCalendarHeader}
            renderDayContents={(day, date) => DatePickerDay(day, date, weddingDay)}
            dayClassName={(date) => {
              return cn(weddingDay && isSameDay(date, weddingDay) && 'custom-selected');
            }}
          />
        </div>
      </div>
      {widget?.config.differenceFormat !== 'NONE' && (
        <div className="text-0 leading-0">
          <hr className="inline-block w-8 border-t border-theme-colored/40" />
        </div>
      )}
      <footer className="space-y-4">
        {widget?.config.differenceFormat === 'SENTENCE' && (
          <p>
            앞으로{' '}
            <strong className="text-theme-inter/70">
              {differenceInDays(weddingDay, new Date()) + 1}일
            </strong>{' '}
            남았어요
          </p>
        )}
        {widget?.config.differenceFormat === 'DDAY' && (
          <p>
            예식일{' '}
            <strong className="text-theme-inter/70">
              D-{differenceInDays(weddingDay, new Date()) + 1}
            </strong>
          </p>
        )}
        <a
          type="button"
          target="_blank"
          className="inline-block"
          href="https://yy-api.pagesisters.cc/invitations/019319d5-b501-95a7-4ee1-888711f2b742/invitation.ics"
        >
          <Button
            variants="fill_primary"
            size="medium"
            type="button"
            className="!bg-theme-colored/90 hover:!bg-theme-colored"
          >
            내 캘린더에 저장하기
          </Button>
        </a>
      </footer>
    </div>
  );
}

export default Calendar;

function DatePickerCalendarHeader() {
  return <></>;
}

function DatePickerDay(day: number, date: Date, selectedDay: Date) {
  // text black 추후 수정 요망
  return (
    <>
      <span>{getDate(date)}</span>
      {isSameDay(date, selectedDay) && (
        <span className="center-flex !absolute inset-0 top-auto m-auto translate-y-2 text-em-xs !leading-none !text-theme-inter/70 font-noto !text-black">
          {format(selectedDay, 'aa HH:mm')}
        </span>
      )}
    </>
  );
}
