import { useState } from 'react';
import { format } from 'date-fns';

export default function DateRangePicker({ startDate, endDate, setStartDate, setEndDate }) {
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-medium mb-2">Start Date</h3>
        <div className="relative">
          <input
            type="date"
            value={format(startDate, 'yyyy-MM-dd')}
            onChange={(e) => setStartDate(new Date(e.target.value))}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-2">End Date (Optional)</h3>
        <div className="flex items-center space-x-4">
          <div className="relative flex-1">
            <input
              type="date"
              value={endDate ? format(endDate, 'yyyy-MM-dd') : ''}
              onChange={(e) => setEndDate(e.target.value ? new Date(e.target.value) : null)}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <button
            className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded"
            onClick={() => setEndDate(null)}
          >
            Never
          </button>
        </div>
      </div>
    </div>
  );
}