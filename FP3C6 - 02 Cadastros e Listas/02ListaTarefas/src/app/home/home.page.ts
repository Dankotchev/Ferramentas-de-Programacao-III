import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  // Atributos
  public listaTarefas: any[] = [];
  public tarefa: any = {};

  // Construtor
  constructor(private toastController: ToastController) { }

  // Métodos
  public showComandos(posicao: number): boolean {
    if (this.listaTarefas[posicao].status === "Cadastrada")
      return true;
    else
      return false;
  }

  public adicionar() {
    console.log(this.tarefa.descricao);
    if (this.tarefa.descricao == undefined || this.tarefa.descricao.length < 3) {
      this.exibirMensagem('Nome deve conter mais de 3 caracteres');
      return;
    } 
    if (this.listaTarefas.find(tarefa => tarefa.descricao === this.tarefa.descricao) != undefined) {
      this.exibirMensagem('Tarefa com descrição já adicionada.');
      return;
    }

    console.log(this.listaTarefas);
    this.tarefa.status = "Cadastrada";
    this.listaTarefas.unshift(this.tarefa);
    this.ordenarTarefas();
    this.exibirMensagem('Tarefa adicionada');
    this.tarefa = {};
  }

  public excluir(posicao: number) {
    this.listaTarefas.splice(posicao,1);
    this.ordenarTarefas();
  }

  public finalizar(posicao: number) {
    this.listaTarefas[posicao].status = "Finalizada";
    this.ordenarTarefas();
  }

  public cancelar(posicao: number) {
    this.listaTarefas[posicao].status = "Cancelada";
    this.ordenarTarefas();
  }

  async exibirMensagem(mensagem: string) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 550,
      position: 'bottom',
    });

    await toast.present();
  }

  ordenarTarefas() {
    this.listaTarefas.sort((a, b) => {
      if (a.status === b.status) {
        return 0;
      } else if (a.status === "Cadastrada") {
        return -1;
      } else if (b.status === "Cadastrada") {
        return 1;
      } else if (a.status === "Finalizada") {
        return -1;
      } else {
        return 1;
      }
    });
  }
}
