import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.isLoggedIn()) {
      this.navigateToTheRightLoginPage(state);
    }
    return this.isLoggedIn()
  }

  private navigateToTheRightLoginPage(state: RouterStateSnapshot) {
    if (state.url.includes('B2m'))
      this.router.navigate(['/fa/IAM/B2m/Login']);
  }

  private isLoggedIn(): boolean {
    return localStorage.getItem('CsrfToken') ? true : false;
  }
}
