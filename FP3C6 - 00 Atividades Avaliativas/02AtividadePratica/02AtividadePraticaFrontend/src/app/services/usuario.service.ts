import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private baseUrl: string = 'http://localhost:3333';

  constructor(
    private http: HttpClient,
    private authentication: AuthenticationService
  ) {}

  private getHttpOptions() {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.authentication.getToken(),
      }),
    };
    return httpOptions;
  }

  findAll() {
    return this.http
      .get(`${this.baseUrl}/usuario`, this.getHttpOptions())
      .toPromise();
  }
}
