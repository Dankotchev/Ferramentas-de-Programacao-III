import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  // Atributos
  public usuarios: any = {};
  public user: any = {};

  // Construtor
  constructor(
    private toastController: ToastController,
    private usuarioService: UserService
  ) {
    this.getUsuarios();
  }

  // Métodos
  private async getUsuarios() {
    // Requisição assincrona
    this.usuarioService
      .getUsers()
      .then((resultado) => {
        this.usuarios = resultado;
        console.log(resultado);
        console.log(this.usuarios);
      })
      .catch(() => {});
  }

  public exibir() {
    if (this.usuarios) return false;
    else return true;
  }

  public async excluirPessoa(id: number) {
    const resposta = await this.usuarioService.deletarUser(id);
    this.usuarios.splice(id, 1);
    if (resposta) this.exibirMensagem('Usuário excluido');
    else this.exibirMensagem('Usuário não existe');
  }

  async exibirMensagem(mensagem: string) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 550,
      position: 'bottom',
    });

    await toast.present();
  }
}
