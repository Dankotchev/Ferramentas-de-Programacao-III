import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService implements CanActivate {
  constructor(
    private authentication: AuthenticationService,
    private router: Router
  ) {}

  canActivate() {
    // Se usuário não estiver logado, é redirecionbado para login
    if (!this.authentication.isLogado()) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
