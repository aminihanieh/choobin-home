import { Injectable } from '@angular/core';
import * as moment from 'jalali-moment';
//https://www.npmjs.com/package/jalali-moment

@Injectable()
export class CalendarConvertorService {


  isShamsi(date: string, seperator: string = "-"): boolean {

    const year: number = parseInt(date.split(seperator)[0]);
    if (year) {
      return year < 1900
    }
    else
      throw new Error(`the date  ${date} with ${seperator} as seperator has a problem!!!!`)
  }

  shamsiToMiladiDate(shamsiDate: string, format: string = "YYYY-MM-DD") {

    return moment.from(shamsiDate, 'fa', format).format(format);
  }

  miladiToShamsiDate(miladiDate: string, format: string = "YYYY-MM-DD") {

    return moment(miladiDate, format).locale("fa").format(format);
  }
  isMiladiValid(date: string, format: string = "YYYY-MM-DD") {

    return moment(date, format,true).isValid();
  }
}
