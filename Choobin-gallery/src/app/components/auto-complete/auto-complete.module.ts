import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutoCompleteModule as KendoAutoCompleteModule } from '@progress/kendo-angular-dropdowns';
import { AutoCompleteComponent } from './components/auto-complete/auto-complete.component';


@NgModule({
  declarations: [
    AutoCompleteComponent
  ],
  imports: [
   // BrowserAnimationsModule,
    CommonModule,
    KendoAutoCompleteModule
  ],
  exports:[
    AutoCompleteComponent
  ],
   bootstrap: [ AutoCompleteComponent ]
})
export class AutoCompleteModule { }
