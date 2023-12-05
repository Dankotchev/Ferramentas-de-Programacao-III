import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private baseUrl: string = 'http://localhost:3333';
  private token: string = "";

  constructor(private http: HttpClient) {}

  async login(usuario: any): Promise<boolean> {
    if (usuario) {
      return this.http
        .post<boolean>(`${this.baseUrl}/login`, usuario)
        .toPromise()
        .then((resultado: any) => {
          this.token = resultado.token;
          return true;
        })
        .catch((err) => {
          this.token = "";
          return false;
        });
    }
    return false;
  }

  logout() {
    this.token = "";
  }

  getToken() {
    return this.token;
  }

  isLogado(): boolean {
    return this.token ? true : false;
  }
}
