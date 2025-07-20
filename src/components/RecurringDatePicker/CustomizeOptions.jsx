import { DAYS_OF_WEEK, MONTHLY_OPTIONS } from './helpers';

export default function CustomizeOptions({ recurrence, setRecurrence }) {
  return (
    <div className="space-y-4">
      {recurrence.type === 'daily' && (
        <div>
          <label className="block mb-1">Every</label>
          <div className="flex items-center">
            <input
              type="number"
              min="1"
              value={recurrence.interval || 1}
              onChange={(e) => setRecurrence({
                ...recurrence,
                interval: parseInt(e.target.value)
              })}
              className="w-16 px-2 py-1 border rounded"
            />
            <span className="ml-2">day(s)</span>
          </div>
        </div>
      )}

      {recurrence.type === 'weekly' && (
        <div>
          <div className="flex items-center mb-2">
            <label className="mr-2">Every</label>
            <input
              type="number"
              min="1"
              value={recurrence.interval || 1}
              onChange={(e) => setRecurrence({
                ...recurrence,
                interval: parseInt(e.target.value)
              })}
              className="w-16 px-2 py-1 border rounded"
            />
            <span className="ml-2">week(s) on:</span>
          </div>
          <div className="flex space-x-2">
            {DAYS_OF_WEEK.map((day) => (
              <button
                key={day.id}
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  recurrence.days?.includes(day.id)
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
                onClick={() => {
                  const newDays = recurrence.days?.includes(day.id)
                    ? recurrence.days.filter(d => d !== day.id)
                    : [...(recurrence.days || []), day.id];
                  setRecurrence({ ...recurrence, days: newDays });
                }}
              >
                {day.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {recurrence.type === 'monthly' && (
        <div className="space-y-4">
          <div className="flex items-center">
            <label className="mr-2">Every</label>
            <input
              type="number"
              min="1"
              value={recurrence.interval || 1}
              onChange={(e) => setRecurrence({
                ...recurrence,
                interval: parseInt(e.target.value)
              })}
              className="w-16 px-2 py-1 border rounded"
            />
            <span className="ml-2">month(s)</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {MONTHLY_OPTIONS.map((option) => (
              <button
                key={option.id}
                className={`px-3 py-2 rounded-md ${
                  recurrence.monthlyOption === option.id
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
                onClick={() => setRecurrence({
                  ...recurrence,
                  monthlyOption: option.id
                })}
              >
                {option.label}
              </button>
            ))}
          </div>

          {recurrence.monthlyOption !== 'day' && (
            <div className="flex space-x-2">
              {DAYS_OF_WEEK.map((day) => (
                <button
                  key={day.id}
                  className={`px-3 py-1 rounded-md ${
                    recurrence.dayOfWeek === day.id
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                  onClick={() => setRecurrence({
                    ...recurrence,
                    dayOfWeek: day.id
                  })}
                >
                  {day.label}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {recurrence.type === 'yearly' && (
        <div className="flex items-center">
          <label className="mr-2">Every</label>
          <input
            type="number"
            min="1"
            value={recurrence.interval || 1}
            onChange={(e) => setRecurrence({
              ...recurrence,
              interval: parseInt(e.target.value)
            })}
            className="w-16 px-2 py-1 border rounded"
          />
          <span className="ml-2">year(s)</span>
        </div>
      )}
    </div>
  );
}