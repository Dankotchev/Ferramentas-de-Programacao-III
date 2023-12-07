import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly urlBase = 'http://localhost:3000/users/19470000';

  constructor(private http: HttpClient) {}

  public deletarUser(id: number) {
    return this.http.get(`${this.urlBase}/{id}`).toPromise();
  }

  public getUsers() {
    return this.http.get(`${this.urlBase}`).toPromise();
  }
}
