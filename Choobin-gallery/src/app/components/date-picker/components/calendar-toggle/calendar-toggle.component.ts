import { Component, Input, EventEmitter, Output } from "@angular/core";
import { CalendarTypes } from "./models/calendar-types";

@Component({
  selector: 'calendar-toggle',
  templateUrl: 'calendar-toggle.component.html',
  moduleId: module.id,
  styleUrls: ['calendar-toggle.component.scss'],
})
export class CalendarToggleComponent {
  calendarTypes = CalendarTypes;
  id: string;
  get switch(): boolean {
    return (this.value == CalendarTypes.Shamsi ? true : false);
  }
  set switch(value: boolean) {

    this.value = value ? CalendarTypes.Shamsi : CalendarTypes.Miladi;
    this.valueChange.emit(this.value);
    this.onChange.emit(this.value);
  }

  @Input() value: string;
  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();

  @Output() onChange: EventEmitter<string> = new EventEmitter<string>();

  constructor() {
    this.id = new Date().getMilliseconds() + "-switch";
  }
}
