import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { injectable } from 'tsyringe';

import {
  compareUnits,
  IDateProvider,
} from '@shared/providers/date/IDateProvider';

@injectable()
export class DayJsDateProvider implements IDateProvider {
  constructor() {
    dayjs.extend(utc);
  }

  compare(startDate: Date, endDate: Date, unit: compareUnits): number {
    const startDateUTC = this.convertToUTC(startDate);
    const endDateUTC = this.convertToUTC(endDate);
    return dayjs(endDateUTC).diff(startDateUTC, unit);
  }

  convertToUTC(date: Date): string {
    return dayjs(date).utc().local().format();
  }

  getCurrentDate(): Date {
    return dayjs().toDate();
  }

  addDays(days: number): Date {
    return dayjs().add(days, 'days').toDate();
  }
}
