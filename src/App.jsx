import { useState } from 'react';

import './App.css';
import RecurringDatePicker from './components/RecurringDatePicker';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="min-h-screen bg-gray-50 p-4">
        <RecurringDatePicker />
      </div>
    </>
  );
}

export default App;
