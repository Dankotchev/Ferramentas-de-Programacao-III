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
  public usuarios: any[] = [];

  // Construtor
  constructor(
    private toastController: ToastController,
    private usuarioService: UserService
  ) {
    this.getUsuarios();
  }

  // Métodos
  private async getUsuarios() {
    this.usuarioService
      .getUsers()
      .then((resultado: any) => {
        this.usuarios = resultado;
      })
      .catch(() => {});
  }

  public exibir() {
    if (this.usuarios.length != 0) return true;
    else return false;
  }

  public async excluirPessoa(id: number, posicao: number) {
    try {
      const resposta = await this.usuarioService.deletarUser(id);
      this.usuarios.splice(posicao, 1);
      if (resposta) this.exibirMensagem('Usuário excluido');
    } catch (error) {
      this.exibirMensagem('Usuário não existe');
    }
  }

  async exibirMensagem(mensagem: string) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 750,
      position: 'bottom',
    });
    await toast.present();
  }
}
