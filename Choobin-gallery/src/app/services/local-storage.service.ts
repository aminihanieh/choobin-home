import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  get(key: string): string {
    let keyValue = localStorage.getItem(key);

    if (!keyValue) {
      throw (`${key} not found in local storage.`);
    }

    return keyValue;
  }
  set(key: string, value: string) {
    localStorage.setItem(key, value);
  }
}
