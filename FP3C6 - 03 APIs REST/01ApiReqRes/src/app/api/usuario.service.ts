import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private readonly urlBase = 'https://reqres.in/api/';

  constructor(private http: HttpClient) {}

  // Métodos
  //Obter lista de usuários da API
  public getUsuarios(pagina: number) {
    return this.http
      .get(`${this.urlBase}users?page=${pagina}`)
      .toPromise();
  }
}
