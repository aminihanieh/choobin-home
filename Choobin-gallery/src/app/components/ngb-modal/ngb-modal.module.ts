import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModalComponent } from './ngb-modal.component';
import { NgbModalModule as NgModalModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    NgbModalComponent
  ],
  imports: [
    CommonModule,
    NgModalModule,
  ],
  exports: [
    NgbModalComponent
  ],

})

export class NgbModalModule { }
