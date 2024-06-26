import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  // Atributos
  public nome: string = 'Danilo Quirino';
  public salario: number = 1000.0;
  public show: boolean = false;
  public nomes: String[] = ['Danilo', 'Daniele', 'Giovana', 'Samara'];
  public listaPessoas: any[] = [];
  public pessoa: any = {};

  // Construtor
  constructor(private toastController: ToastController) { }

  // Métodos
  public conveterMaiusculo(): string {
    return this.nome.toLocaleUpperCase();
  }

  public exibir() {
    console.log(this.conveterMaiusculo());
  }

  public alterarShow() {
    this.show = !this.show;
  }

  public excluirLista(indice: number) {
    let valor = this.nomes.splice(indice, 1);
    console.log(`${valor} faltou!`);
  }

  public excluirPessoa(indice: number) {
    let valor = this.listaPessoas.splice(indice, 1);
    console.log(valor);
  }

  public adicionar() {
    console.log(this.pessoa.nome);
    if (this.pessoa.nome == undefined || this.pessoa.nome.length < 3) {
      this.exibirMensagem('Nome deve conter mais de 3 caracteres');
      return;
    }
    if (this.pessoa.salario == undefined || this.pessoa.salario <= 0) {
      this.exibirMensagem('Salário deve ser maior que 0');
      return;
    }
    this.listaPessoas.unshift(this.pessoa);
    this.exibirMensagem('Pessoa adicionada');
    this.pessoa = {};

    // if (this.pessoa.nome.length < 3) {
    //   this.exibirMensagem('Nome deve conter mais de 3 caracteres');
    // } else if (this.pessoa.salario <= 0) {
    //   this.exibirMensagem('Salário deve ser maior que 0');
    // } else {
    //   this.listaPessoas.unshift(this.pessoa);
    //   this.exibirMensagem('Pessoa adicionada');
    //   this.pessoa = {};
    // }
  }

  //  Exibir mensagem utilizando Toast
  //  'top' | 'middle' | 'bottom' 3 parameros únicos possiveis para a posição
  async exibirMensagem(mensagem: string) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 550,
      position: 'bottom',
    });

    await toast.present();
  }
}
