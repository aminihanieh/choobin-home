import { Component, Input, Output, EventEmitter, ViewEncapsulation, ViewChild } from '@angular/core';
import { NgbDateStruct, NgbCalendar,  NgbDate,  NgbCalendarGregorian, NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'miladi-calendar',
  templateUrl: './miladi-calendar.component.html',
  styleUrls: ['./miladi-calendar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers:[
    {provide: NgbCalendar, useClass: NgbCalendarGregorian}
  ]
})
export class MiladiCalendarComponent {
  model: NgbDateStruct = { year: 1, month: 1, day: 1 };

  @ViewChild('datePickerInstance', { static: true }) datePickerInstance: NgbDatepicker;

  @Input() get text(): string {
    if (!this.model) return "";

    return `${this.model.year}-${this.model.month}-${this.model.day}`;
  }

  set text(value: string) {

    if (!value) return ;

    this.model = {
      year: parseInt(value.split('-')[0]),
      month: parseInt(value.split('-')[1]),
      day: parseInt(value.split('-')[2])
    };
    this.datePickerInstance.navigateTo(this.model);

  }
  @Output() textChange: EventEmitter<string> = new EventEmitter<string>();
  @Input() placeHolder: string;

constructor(){

}
  onDateSelected(arg: NgbDate) {
    this.model = arg;
    this.textChange.emit(this.text);
  }
}
