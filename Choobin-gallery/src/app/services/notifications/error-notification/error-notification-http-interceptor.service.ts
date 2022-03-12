import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ErrorNotificationInfoService } from './error-notification-info.service';
import { ErrorNotificationInfo } from './models/error-notification';


@Injectable()
export class ErrorNotificationHttpInterceptorService implements HttpInterceptor {
  constructor(private errorNotificationInfo: ErrorNotificationInfoService) {

  }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(tap(event => {
        if (event instanceof HttpResponse) {

        }
      },
        (error: HttpErrorResponse) => {
          let errorInfo = new ErrorNotificationInfo();
          errorInfo.message = JSON.stringify(error.error.ErrorMessage),
            errorInfo.id = error.error["TraceId"];
          this.errorNotificationInfo.setError(errorInfo);
        }
      )
      );
  }




}
