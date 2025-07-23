export const STAY_DURATION_VALUE_MAP: Record<string, number> = {
  justAirport: 1,
  lessThanWeek: 2,
  lessThanMonth: 3,
  lessThanSixMonths: 4,
  longStay: 5,
};

export const STAY_DURATION_VALUE_DESCRIPTION_MAP: Record<string, string> = {
  0: 'Not Visited',
  1: 'Just Airport',
  2: 'Less than a Week',
  3: 'Less than a Month',
  4: 'Less than Six Months',
  5: 'Long Stay',
};
