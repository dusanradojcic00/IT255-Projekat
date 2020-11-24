import { DateTime } from 'luxon';

export class DateHelper {
    static millisToDate(millis: number): string {
        return DateTime.fromMillis(millis).toLocaleString({ locale: 'en-gb' });
    }

    static getMonth(): string {
        return DateTime.local().toLocaleString({ month: 'short' });
    }
}

