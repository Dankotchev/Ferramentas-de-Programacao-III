import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor(
    private authentication: AuthenticationService,
    private router: Router
  ) {}
  ngOnInit(): void {}

  public email: string = '';
  public senha: string = '';

  async login() {
    const usuario = {
      email: this.email,
      senha: this.senha,
    };
    console.log(usuario);

    const retorno = await this.authentication.login(usuario);
    console.log(retorno);
    
    if (retorno) {
      console.log('Login OK');
      this.router.navigate(["/tabs/home"]);
    } else {
      console.log('Login failed.');
    }
  }
}
