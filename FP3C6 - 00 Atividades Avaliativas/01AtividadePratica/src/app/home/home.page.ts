import { Component } from '@angular/core';
import { ProdutoService } from '../api/produto.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public dadosAPI: any = {};
  public listaProdutos: any = [];
  public precoMaximo: number = 0;

  constructor(private produtoService: ProdutoService, private toastController: ToastController) {
    this.getProdutos();
  }

  public pesquisar() {
    this.listaProdutos = [...this.dadosAPI];
    if (this.precoMaximo > 0)
      this.listaProdutos = this.listaProdutos.filter((produto: any) => Number(produto.preco) <= this.precoMaximo);
    else if (this.precoMaximo < 0)
      this.exibirMensagem("Valor pesquisado deve ser maior que 0");
  }

  public excluirProduto(i: number) {
    this.listaProdutos.splice(i, 1);
  }

  public somatorio(): number {
    return this.listaProdutos.reduce((valor: number, produto: any) => valor + Number(produto.preco), 0);
  }

  private async getProdutos() {
    this.produtoService
      .getProdutos()
      .then((resultado: any) => {
        this.dadosAPI = [...resultado];
        this.listaProdutos = [...resultado];
      })
      .catch(() => {
      });
  }

  private async exibirMensagem(mensagem: string) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 550,
      position: 'bottom',
    });
    await toast.present();
  }
}
