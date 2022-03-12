import { Injectable } from '@angular/core';
import { NgbDatepickerI18n, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { WEEKDAYS_SHORT_GR } from '../constants/week-days-short';
import { MONTHS_GR } from '../constants/months';
import { TranslationWidth } from '@angular/common';

@Injectable()
export class MiladiDatePickerService extends NgbDatepickerI18n {
  getWeekdayLabel(weekday: number, width?: TranslationWidth): string {
    return WEEKDAYS_SHORT_GR[weekday - 1];
  }
  getWeekdayShortName(weekday: number) {
    return WEEKDAYS_SHORT_GR[weekday - 1];
  }
  getMonthShortName(month: number) {
    return MONTHS_GR[month - 1];
  }
  getMonthFullName(month: number) {
    return MONTHS_GR[month - 1];
  }
  getDayAriaLabel(date: NgbDateStruct): string {
    return `${date.year}-${this.getMonthFullName(date.month)}-${date.day}`;
  }



}
