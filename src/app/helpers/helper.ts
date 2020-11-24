import { DateTime } from 'luxon';
import * as XLSX from 'xlsx';
export class DateHelper {
    static millisToDate(millis: number): string {
        return DateTime.fromMillis(millis).toLocaleString({ locale: 'en-gb' });
    }

    static getMonth(): string {
        return DateTime.local().toLocaleString({ month: 'short' });
    }

}

export class ExcelHelper {
    static exportToFile(array: any[], fileName: string) {
        const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(array);
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'products');
        XLSX.writeFile(wb, fileName + ".xlsx");
    }
}

