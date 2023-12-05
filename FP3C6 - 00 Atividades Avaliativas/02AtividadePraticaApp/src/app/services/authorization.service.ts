import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService implements CanActivate{


  constructor(
    private authentication: AuthenticationService,
    private router: Router
  ) {}

  canActivate() {
    if (!this.authentication.isLogado()) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
