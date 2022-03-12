import { Injectable } from '@angular/core';

@Injectable()
export class TokenGeneratorService {

  constructor() {}

  setCsrfTokenInLocalStorage(){
    //do nothing in prod mode
  }
}
