import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LogInComponent } from './log-in.component';
import { LogInService } from './services/log-in.service';
import { FormsModule } from '@angular/forms';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';



@NgModule({
  declarations: [
    LogInComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    DropDownsModule,
    RouterModule.forChild([{
      path: "", component: LogInComponent
    }])
  ],
  providers: [
    LogInService
  ]
})
export class LogInModule { }
