//https://ng-bootstrap.github.io/#/components/datepicker/calendars

import { Component, OnInit, Input, Output, EventEmitter, HostListener, ViewChild, ElementRef } from '@angular/core';
import { CalendarTypes } from './calendar-toggle/models/calendar-types';
import { CalendarConvertorService } from '../services/date-picker/calendar-convertor.service';

@Component({
  selector: 'date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent implements OnInit {

  shamsiCalendar = CalendarTypes.Shamsi;
  isOpen: boolean = false;
  calendarType: string;
  timestamp: string;

  @ViewChild("popup") popup: ElementRef;

  @Input() placeHolder: string;
  @Input() value: string;
  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() calendarTypeChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() daySelect: EventEmitter<string> = new EventEmitter<string>();

  @HostListener('document:click', ['$event'])
  onClick(event: any) {
    if (!this.isElementDescendantsOfCalendar(event))
      this.isOpen = false;
  }

  private isElementDescendantsOfCalendar(element: any): boolean {
    try {
      if ((element.target["offsetParent"].id) !== null) {
        return (this.timestamp == element.target["offsetParent"].id ||
          this.popup.nativeElement.offsetParent.innerHTML.search(element.target["innerHTML"]) > -1);
      }
      else {
        return element.target["offsetParent"] == this.popup.nativeElement;
      }
    } catch (error) {
      return false;
    }
  }



  constructor(private convertorService: CalendarConvertorService) {
    this.timestamp = (new Date()).getTime().toString();

  }

  ngOnInit() {
    this.setCalendarTypeAccordingDate(this.value);
    this.setCalendarTypeListener();
  }

  private setCalendarTypeListener() {
    this.valueChange.subscribe((val) => {
      this.setCalendarTypeAccordingDate(val);
      this.daySelect.emit(val);
    });
  }

  private setCalendarTypeAccordingDate(val: any) {
    if (!val) return;

    this.calendarType = this.convertorService.isShamsi(val) ?
      CalendarTypes.Shamsi :
      CalendarTypes.Miladi;
    this.calendarTypeChange.emit(this.calendarType);
  }

  onSelectedDateChange(arg: string) {

    this.updateValue(arg);
    this.togglePopUp();
  }

  togglePopUp() {
    this.isOpen = !this.isOpen;
  }

  private updateValue(arg: string) {

    this.value = arg;
    this.valueChange.emit(arg);
  }

  onModelChange(arg: string) {
    this.updateValue(arg);
    this.togglePopUp();
  }
  onCalendarTypeChange(arg: string) {
    this.value = arg == this.shamsiCalendar ? this.convertorService.miladiToShamsiDate(this.value) :
      this.convertorService.shamsiToMiladiDate(this.value);
    this.valueChange.emit(this.value);
    this.calendarTypeChange.emit(arg);
  }

}
