import { Injectable } from '@angular/core';
import { LocalStorageService } from '../local-storage.service';
import { CalendarTypeEnum } from './calendar-type-enum';

@Injectable()
export class CalendarTypeStorageService {
  private KeyName = "CalendarType";
  get isShamsi(): boolean {
    return this.get() == CalendarTypeEnum.shamsi
  };
  constructor(private _locaStorageService: LocalStorageService) {
  }
  get(): string {
    return this._locaStorageService.get(this.KeyName);
  }
  set() {
    this._locaStorageService.set(this.KeyName, CalendarTypeEnum.shamsi);
  }
}
