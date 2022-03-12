import { Injectable, EventEmitter } from '@angular/core';
import { ErrorNotificationInfo } from './models/error-notification';

@Injectable()
export class ErrorNotificationInfoService {

  change: EventEmitter<ErrorNotificationInfo | null> = new EventEmitter<ErrorNotificationInfo | null>();

  private _error: null | ErrorNotificationInfo = null;

  getError(): ErrorNotificationInfo | null {
    return this._error
  };

  setError(value: ErrorNotificationInfo) {
    this._error = value;
    this.change.emit(value);
  };

  setErrorMessage(message: string) {
    this._error = new ErrorNotificationInfo();
    this._error.message = message;
    this.change.emit(this._error);
  };
  clear() {
    this._error = null;
    this.change.emit(null);
  }
}
