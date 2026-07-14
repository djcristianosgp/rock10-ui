import { useState, ChangeEvent, useEffect } from 'react';
import { cn } from '../utils/cn';

export interface DatePickerProps {
  onDateSelect: (date: string) => void;
  label?: string;
  maxDate?: string;
  minDate?: string;
  initialDate?: string;
}

export const DatePicker = ({ 
  onDateSelect, 
  label = 'Selecione uma data',
  maxDate,
  minDate,
  initialDate
}: DatePickerProps): JSX.Element => {
  const [selectedDate, setSelectedDate] = useState<string>(initialDate || '');

  useEffect(() => {
    setSelectedDate(initialDate || '');
  }, [initialDate]);

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value;
    setSelectedDate(newDate);
    onDateSelect(newDate);
  };

  return (
    <div className="flex flex-col gap-2.5 w-full max-w-[400px] md:max-w-full">
      <label htmlFor="date-picker" className="font-sans text-xs font-semibold text-gray-700 dark:text-dark-text-muted uppercase tracking-wider">
        {label}
      </label>
      <input
        id="date-picker"
        type="date"
        value={selectedDate}
        onChange={handleDateChange}
        max={maxDate}
        min={minDate}
        className={cn(
          "w-full px-4 py-3 font-sans text-base font-medium border-2 border-gray-300 dark:border-dark-border rounded-xl bg-white dark:bg-dark-surface text-gray-900 dark:text-dark-text shadow-sm cursor-pointer outline-none transition-all duration-200",
          "hover:border-primary-400 hover:shadow-md focus:border-primary-500 focus:ring-3 focus:ring-primary-100 dark:focus:ring-primary-900/30",
          "webkit-calendar-picker-indicator:cursor-pointer webkit-calendar-picker-indicator:p-1 webkit-calendar-picker-indicator:rounded-md webkit-calendar-picker-indicator:transition-colors hover:webkit-calendar-picker-indicator:bg-primary-50"
        )}
      />
    </div>
  );
};

export default DatePicker;
