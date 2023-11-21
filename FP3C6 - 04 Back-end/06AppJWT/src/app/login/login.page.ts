import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor(private authentication: AuthenticationService,
    private router: Router) {
    this.login();
  }

  ngOnInit() {}

  async login() {
    const usuario = {
      email: 'user1@email.com',
      senha: 'user1',
    };
    const retorno = await this.authentication.login(usuario);

    if (retorno) {
      console.log('Login OK');
      this.router.navigate(["/home"]);
    } else {
      console.log('Login failed.');
    }
  }
}
