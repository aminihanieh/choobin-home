import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PersianCalendarComponent } from './components/persian-calendar/persian-calendar.component';
import { MiladiCalendarComponent } from './components/miladi-calendar/miladi-calendar.component';
import { DatePickerComponent } from './components/date-picker.component';
import { CommonModule } from '@angular/common';
import { CalendarConvertorService } from './services/date-picker/calendar-convertor.service';
import { CalendarToggleComponent } from './components/calendar-toggle/calendar-toggle.component';


@NgModule({
  declarations: [
    PersianCalendarComponent,
    MiladiCalendarComponent,
    CalendarToggleComponent,
    DatePickerComponent,
  ],
  imports: [
    NgbModule,
    FormsModule,
    CommonModule
  ],
  exports: [DatePickerComponent],
  providers:[
    CalendarConvertorService
  ],
  bootstrap: [DatePickerComponent]
})
export class DatePickerModule { }
