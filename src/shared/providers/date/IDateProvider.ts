export type compareUnits =
  | 'milliseconds'
  | 'seconds'
  | 'minutes'
  | 'hours'
  | 'days'
  | 'months'
  | 'years';

export interface IDateProvider {
  compare(startDate: Date, endDate: Date, unit: compareUnits): number;
  convertToUTC(date: Date): string | Date;
  getCurrentDate(): Date;
}
