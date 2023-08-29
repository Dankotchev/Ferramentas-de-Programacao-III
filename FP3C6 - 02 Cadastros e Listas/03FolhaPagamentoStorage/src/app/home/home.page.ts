import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  // Atributos
  public listaPessoas: any[] = [];
  public pessoa: any = {};

  // Construtor
  constructor(private toastController: ToastController, private storage: Storage) { }

  // Métodos
  public showButton(): boolean {
    if (this.listaPessoas.length > 0)
      return true;
    else
      return false;
  }

  public maiorSalario() {
    let maior = this.listaPessoas[1].salario;
    this.listaPessoas.forEach(pessoa => {
      if (pessoa.salario > maior)
        maior = pessoa.salario;
    });
    this.exibirMensagem(`Maior salário: ${maior}`);
  }

  public medioSalario() {
    let somatorio = 0;
    this.listaPessoas.forEach(pessoa => somatorio += pessoa.salario);
    this.exibirMensagem(`Salário médio: ${somatorio / this.listaPessoas.length}`);
  }

  public menorSalario() {
    let menor = this.listaPessoas[1].salario;
    this.listaPessoas.forEach(pessoa => {
      if (pessoa.salario < menor)
        menor = pessoa.salario;
    });
    this.exibirMensagem(`Menor salário: ${menor}`);
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

  // Ao criar a classe, automaticamente é executado este método do Ionic Storage
  async ngOnInit() {
    await this.storage.create();
  }
}
