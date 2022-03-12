import { Component, OnInit } from '@angular/core';
import { SpinnerService } from '../../services/spinner/spinner.service';

@Component({
  selector: 'spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent {

  constructor(public spinnerService: SpinnerService) {
    spinnerService.statusChanged.subscribe((status) => {
      this.bodyScrollHidden(status);

    })
  }


  private bodyScrollHidden(status: any) {
    if (status)
      document.body.classList.add("modal-open");
    else
      document.body.classList.remove("modal-open");
  }
}
