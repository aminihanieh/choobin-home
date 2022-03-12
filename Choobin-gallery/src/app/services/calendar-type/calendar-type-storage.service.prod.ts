import { Injectable } from '@angular/core';
import { CalendarTypeEnum } from './calendar-type-enum';
import { LocalStorageService } from '../local-storage.service';

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
   //do nothing
  }
}
