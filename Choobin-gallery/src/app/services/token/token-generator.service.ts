import { Injectable } from '@angular/core';

@Injectable()
export class TokenGeneratorService {

  constructor() {
  }

  setCsrfTokenInLocalStorage(){
    // localStorage.setItem("CsrfToken","hdzIMj5EJ2GRPviCjpOWm5AlQnpuTPlrR7XSED0I");
    localStorage.setItem("CsrfToken","BcDRaPup2ZKhTosrF04rPLLA3XpAaFK3A9sNbX2O");
  }
}
