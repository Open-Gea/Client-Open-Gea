import { format, subMonths, startOfWeek, endOfWeek } from 'date-fns';
import capitalize from 'lodash.capitalize';

// Note: date-fns respects the capitalization of dates according to the language rules.
// By default, date-fns uses English locale (which is why the dates are capitalized, this is a language rule).
// But in Spanish, the language rules dictate that dates should not be capitalized, hence of why the use of
// the capitalize() function here.

const weeklyConfig = {
  weekStartsOn: 0, // Week should start on Monday (0 = Sunday, 1 = Monday, 2 = Tuesday...)
}

const getFormattedQuarterRange = (t) => {
  // in this case, function will get the first date from removing 2 months of the final date, creating a quarter range.
  const firstDate = subMonths(new Date(Number(t)), 2);
  const lastDate = new Date(Number(t));

  return `${capitalize(format(firstDate, 'MMMM yyyy'))} - ${capitalize(format(lastDate, 'MMMM yyyy'))}`;
};

const getFormattedMonthRange = t => {
  const tDate = new Date(Number(t));
  return capitalize(format(tDate, 'MMMM yyyy'));
};

const getFormattedWeekRange = (t) => {
  // the function will get the start and end of the week using the provided date.
  // (Note: according to TWC API, week starts on Monday)
  const weekStart = startOfWeek(new Date(Number(t)), weeklyConfig);
  const weekEnd = endOfWeek(new Date(Number(t)), weeklyConfig);
  return `${capitalize(format(weekStart, 'dd MMMM, yyyy'))} - ${capitalize(format(weekEnd, 'dd MMMM, yyyy'))}`;
};

export const getDateLabelBySelectedRange = (timeRangeLabel, t) => {
  if (!timeRangeLabel || !t) return null;

  switch (timeRangeLabel) {
    case 'quarterly':
      return getFormattedQuarterRange(t);
    case 'monthly':
      return getFormattedMonthRange(t);
    case 'weekly':
      return getFormattedWeekRange(t);
    default:
      return null;
  }
};
