import { Component, Input, Output, EventEmitter, ViewEncapsulation, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { NgbDateStruct, NgbCalendar, NgbDate, NgbCalendarPersian, NgbDatepickerI18n, NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { PersianDatePickerService } from '../../services/persian-date-picker.service';

@Component({
  selector: 'persian-calendar',
  templateUrl: './persian-calendar.component.html',
  styleUrls: ['./persian-calendar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    { provide: NgbCalendar, useClass: NgbCalendarPersian },
    { provide: NgbDatepickerI18n, useClass: PersianDatePickerService }
  ]
})
export class PersianCalendarComponent implements AfterViewInit {
  model: NgbDateStruct = { year: 1, month: 1, day: 1 };


  @ViewChild('container', { static: true }) container: ElementRef;
  @ViewChild('datePickerInstance', { static: true }) datePickerInstance: NgbDatepicker;

  @Input() get text(): string {

    if (!this.model) return "";

    return `${this.model.year}-${this.model.month}-${this.model.day}`;
  }

  set text(value: string) {

    if (!value) return;

    this.model = {
      year: parseInt(value.split('-')[0]),
      month: parseInt(value.split('-')[1]),
      day: parseInt(value.split('-')[2])
    };
    this.datePickerInstance.navigateTo(this.model);

  }
  @Output() textChange: EventEmitter<string> = new EventEmitter<string>();
  @Input() placeHolder: string;


  ngAfterViewInit(): void {
    this.setPersianTooltip();

  }
  private setPersianTooltip() {

    this.setPersianToolTipForButtonNavigation();

    this.setPersianToolTipForSelectNavigation();
  }

  private setPersianToolTipForButtonNavigation() {
    this.container.nativeElement.querySelectorAll("ngb-datepicker-navigation .ngb-dp-arrow button")[0]
      .setAttribute("title", "ماه قبل"),
      this.container.nativeElement.querySelectorAll("ngb-datepicker-navigation .ngb-dp-arrow button")[1]
        .setAttribute("title", "ماه بعد");
  }

  private setPersianToolTipForSelectNavigation() {
    this.container.nativeElement.querySelectorAll("ngb-datepicker-navigation select.custom-select")[0]
      .setAttribute("title", "ماه را انتخاب کنید"),
      this.container.nativeElement.querySelectorAll("ngb-datepicker-navigation select.custom-select")[1]
        .setAttribute("title", "سال را انتخاب کنید");
  }

  onDateSelected(arg: NgbDate) {
    this.model = arg;
    this.textChange.emit(this.text);
  }


}
