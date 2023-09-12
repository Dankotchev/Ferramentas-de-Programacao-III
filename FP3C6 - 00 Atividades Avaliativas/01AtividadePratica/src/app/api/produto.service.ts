import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class ProdutoService {
  private urlBase = "https://ranekapi.origamid.dev/json/api/";

  constructor(private http: HttpClient) {}

  getProdutos() {
    return this.http.get(`${this.urlBase}produto`).toPromise();
  }
}
