import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutoCompleteModule as KendoAutoCompleteModule } from '@progress/kendo-angular-dropdowns';
import { AutoCompleteComponent as AutoCompleteV2Component } from './components/auto-complete/auto-complete.component';


@NgModule({
  declarations: [
    AutoCompleteV2Component
  ],
  imports: [
   // BrowserAnimationsModule,
    CommonModule,
    KendoAutoCompleteModule
  ],
  exports:[
    AutoCompleteV2Component
  ],
   bootstrap: [ AutoCompleteV2Component ]
})
export class AutoCompleteV2Module { }
