import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  // Atributos
  public nome: string = "Danilo Quirino";
  public show: boolean = true;
  public nomes: string[] = ["Danilo", "Daniele", "Giovana", "Samara"];

  // Construtor
  constructor() {}

  // Métodos
  public conveterMaiusculo(): string {
    return this.nome.toLocaleUpperCase();
  }

  public exibir() {
    console.log(this.conveterMaiusculo());
  }

  public alterarShow(){
    this.show = !this.show;
  }

  public excluir( indice: number){
    let valor = this.nomes.splice(indice, 1);
    console.log(`${valor} faltou!`);
  }

  public adicionar(){
    this.nomes.unshift(this.nome);
  }
}
