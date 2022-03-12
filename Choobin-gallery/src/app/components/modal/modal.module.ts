import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalComponent } from './modal.component';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { ButtonsModule } from '@progress/kendo-angular-buttons';



@NgModule({
  declarations: [
    ModalComponent
  ],
  imports: [
    CommonModule,
    DialogModule,
    ButtonsModule
   ],
  exports: [ModalComponent],

})

export class ModalModule { }
