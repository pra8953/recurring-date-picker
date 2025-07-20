import { addDays, addWeeks, addMonths, addYears,  getDay, getWeekOfMonth } from 'date-fns';

export const RECURRENCE_TYPES = {
  DAILY: 'daily',
  WEEKLY: 'weekly',
  MONTHLY: 'monthly',
  YEARLY: 'yearly',
  CUSTOM: 'custom'
};

export const DAYS_OF_WEEK = [
  { id: 'sun', label: 'Sun' },
  { id: 'mon', label: 'Mon' },
  { id: 'tue', label: 'Tue' },
  { id: 'wed', label: 'Wed' },
  { id: 'thu', label: 'Thu' },
  { id: 'fri', label: 'Fri' },
  { id: 'sat', label: 'Sat' }
];

export const MONTHLY_OPTIONS = [
  { id: 'day', label: 'On day' },
  { id: 'first', label: 'First' },
  { id: 'second', label: 'Second' },
  { id: 'third', label: 'Third' },
  { id: 'fourth', label: 'Fourth' },
  { id: 'last', label: 'Last' }
];

export const getRecurringDates = (startDate, endDate, recurrence) => {
  const dates = [];
  let currentDate = new Date(startDate);
  
  while (!endDate || currentDate <= endDate) {
    if (recurrence.type === RECURRENCE_TYPES.DAILY) {
      dates.push(new Date(currentDate));
      currentDate = addDays(currentDate, recurrence.interval || 1);
    }
    else if (recurrence.type === RECURRENCE_TYPES.WEEKLY) {
      if (recurrence.days.includes(DAYS_OF_WEEK[getDay(currentDate)].id)) {
        dates.push(new Date(currentDate));
      }
      currentDate = addDays(currentDate, 1);
      
      // Jump to next week if we've passed all selected days
      if (currentDate.getDay() === 0 && !recurrence.days.includes('sun')) {
        currentDate = addWeeks(currentDate, recurrence.interval || 1);
      }
    }
    else if (recurrence.type === RECURRENCE_TYPES.MONTHLY) {
      if (recurrence.monthlyOption === 'day') {
        if (currentDate.getDate() === startDate.getDate()) {
          dates.push(new Date(currentDate));
        }
      } else {
        // Handle "First Monday" type patterns
        const weekNum = recurrence.monthlyOption; // 'first', 'second', etc.
        const dayIndex = DAYS_OF_WEEK.findIndex(d => d.id === recurrence.dayOfWeek);
        
        if (getWeekOfMonth(currentDate) === weekNum && getDay(currentDate) === dayIndex) {
          dates.push(new Date(currentDate));
        }
      }
      currentDate = addMonths(currentDate, recurrence.interval || 1);
    }
    else if (recurrence.type === RECURRENCE_TYPES.YEARLY) {
      if (currentDate.getMonth() === startDate.getMonth() && 
          currentDate.getDate() === startDate.getDate()) {
        dates.push(new Date(currentDate));
      }
      currentDate = addYears(currentDate, recurrence.interval || 1);
    }
    
    // Safety check to prevent infinite loops
    if (dates.length > 365 * 5) break;
  }
  
  return dates;
};