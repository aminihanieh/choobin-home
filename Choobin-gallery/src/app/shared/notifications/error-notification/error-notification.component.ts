import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorNotificationInfoService } from '../../../services/notifications/error-notification/error-notification-info.service';
import { ErrorNotificationInfo } from '../../../services/notifications/error-notification/models/error-notification';

@Component({
  selector: 'error-notification',
  templateUrl: './error-notification.component.html',
  styleUrls: ['./error-notification.component.scss']
})
export class ErrorNotificationComponent {

  errorInfo: ErrorNotificationInfo | null = new ErrorNotificationInfo;

  constructor(private errorNotificationInfoService: ErrorNotificationInfoService, router: Router) {
    this.errorNotificationInfoService.change.subscribe((errorInfo) => {
      this.errorInfo = errorInfo;
    });
    router.events.subscribe(() => {
      errorNotificationInfoService.clear();
    })
  }

  onCloseClick() {
    this.errorNotificationInfoService.clear();
  }

}
