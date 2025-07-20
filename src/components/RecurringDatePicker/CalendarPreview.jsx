import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay } from 'date-fns';

export default function CalendarPreview({ startDate, endDate, recurrence, recurringDates }) {
  const monthStart = startOfMonth(startDate);
  const monthEnd = endOfMonth(startDate);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  return (
    <div className="border rounded-lg p-4">
      <h3 className="font-medium mb-4">
        {format(startDate, 'MMMM yyyy')} Preview
      </h3>
      
      <div className="grid grid-cols-7 gap-1">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="text-center font-medium text-sm py-1">
            {day}
          </div>
        ))}
        
        {monthDays.map((day) => {
          const isRecurring = recurringDates.some(d => isSameDay(d, day));
          return (
            <div
              key={day.toString()}
              className={`h-8 flex items-center justify-center rounded-full ${
                isSameDay(day, startDate)
                  ? 'bg-blue-500 text-white'
                  : isRecurring
                  ? 'bg-blue-100 text-blue-800'
                  : !isSameMonth(day, monthStart)
                  ? 'text-gray-300'
                  : 'hover:bg-gray-100'
              }`}
            >
              {format(day, 'd')}
            </div>
          );
        })}
      </div>
    </div>
  );
}