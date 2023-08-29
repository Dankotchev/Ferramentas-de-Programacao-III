import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private urlBase = "https://reqres.in";

  constructor(private http: HttpClient) {}

  // Métodos
  //Obter lista de usuários da API
  public getUsuarios(){
    return this.http.get(`${this.urlBase}/api/users`).toPromise();
  }
}
