import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  status: boolean = false;
  statusChanged: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor() { }
  show() {
    this.status = true;
    this.statusChanged.emit(this.status);
  }

  hide() {
    this.status = false;
    this.statusChanged.emit(this.status);
  }
}
