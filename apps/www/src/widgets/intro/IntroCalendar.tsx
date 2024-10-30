'use client';
import { useState } from 'react';
import DatePicker from 'react-datepicker';

function IntroCalendar() {
  const [startDate, setStartDate] = useState(new Date());

  return <DatePicker selected={startDate} onChange={(date) => date && setStartDate(date)} />;
}

export default IntroCalendar;
