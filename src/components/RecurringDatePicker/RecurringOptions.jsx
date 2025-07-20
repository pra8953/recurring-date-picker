import { RECURRENCE_TYPES } from './helpers';

export default function RecurringOptions({ recurrence, setRecurrence }) {
  return (
    <div className="space-y-4">
      <h3 className="font-medium">Repeat</h3>
      <div className="grid grid-cols-2 gap-2">
        {Object.values(RECURRENCE_TYPES).map((type) => (
          <button
            key={type}
            className={`px-4 py-2 rounded-md ${
              recurrence.type === type
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
            onClick={() => setRecurrence({ ...recurrence, type })}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}