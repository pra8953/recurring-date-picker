import { useState, useEffect } from 'react';
import { RECURRENCE_TYPES, getRecurringDates } from './helpers';
import RecurringOptions from './RecurringOptions';
import CustomizeOptions from './CustomizeOptions';
import DateRangePicker from './DateRangePicker';
import CalendarPreview from './CalendarPreview';

export default function RecurringDatePicker() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const [recurrence, setRecurrence] = useState({
    type: RECURRENCE_TYPES.DAILY,
    interval: 1,
    days: ['mon', 'wed', 'fri'], // Default for weekly
    monthlyOption: 'day',
    dayOfWeek: 'mon'
  });
  
  const [recurringDates, setRecurringDates] = useState([]);

  useEffect(() => {
    const dates = getRecurringDates(startDate, endDate, recurrence);
    setRecurringDates(dates);
  }, [startDate, endDate, recurrence]);

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-6">Recurring Date Picker</h2>
      
      <div className="space-y-6">
        <RecurringOptions 
          recurrence={recurrence} 
          setRecurrence={setRecurrence} 
        />
        
        <CustomizeOptions 
          recurrence={recurrence} 
          setRecurrence={setRecurrence} 
        />
        
        <DateRangePicker
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
        />
        
        <CalendarPreview
          startDate={startDate}
          endDate={endDate}
          recurrence={recurrence}
          recurringDates={recurringDates}
        />
      </div>
      
      <div className="mt-6 p-4 bg-gray-50 rounded">
        <h3 className="font-medium mb-2">Selected Dates (next 10):</h3>
        <ul className="space-y-1">
          {recurringDates.slice(0, 10).map((date, i) => (
            <li key={i}>{date.toDateString()}</li>
          ))}
          {recurringDates.length > 10 && (
            <li>...and {recurringDates.length - 10} more</li>
          )}
        </ul>
      </div>
    </div>
  );
}