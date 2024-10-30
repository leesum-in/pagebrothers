'use client';
import { useState } from 'react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

function IntroCalendar() {
  const [selected, setSelected] = useState<Date | undefined>();

  const handleOnChange = (date: Date | null) => {
    if (date) setSelected(date);
    console.log('asdt');
  };

  return (
    <div className="react-datepicker">
      <DatePicker
        selected={selected}
        onChange={handleOnChange}
        showTimeSelect
        dateFormat="MMMM d, yyyy h:mm aa"
        timeFormat="HH:mm"
        inline
      />
    </div>
  );
}

export default IntroCalendar;
