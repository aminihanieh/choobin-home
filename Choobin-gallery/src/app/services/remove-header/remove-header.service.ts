import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RemoveHeaderService {

  constructor() {
    this.removeNavbar();
  }


  private removeNavbar() {
    try {
      document.querySelector('nav-bar')!.outerHTML = '';
    } catch (error) {
    }
  }

}
