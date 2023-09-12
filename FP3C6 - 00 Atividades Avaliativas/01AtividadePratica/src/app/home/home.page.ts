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
    if (this.precoMaximo > 0)
      this.listaProdutos = this.listaProdutos.filter((produto:any) => produto.preco <= this.precoMaximo);
    else if (this.precoMaximo == 0)
      this.getProdutos();
    else
      this.exibirMensagem("Valor pesquisado deve ser maior que 0");
  }

  public excluirProduto(i: number) {
    this.listaProdutos.splice(i, 1);
  }

  public somaPesquisa() {
    let soma : number = 0;

    this.listaProdutos.forEach((element:any) => {
      console.log(element);
      soma += element.preco;
    });



    //soma = this.listaProdutos.reduce((somatoria: number, produto: any) => somatoria + produto.preco);

    // let soma = this.listaProdutos.preco.reduce((somatoria: any, valorAtual: any) => somatoria + valorAtual, 0);
    //console.log(soma);
  }

  private async getProdutos() {
    this.produtoService
      .getProdutos()
      .then((resultado: any) => {
        this.dadosAPI = resultado;
        this.listaProdutos = resultado;
      })
      .catch(() => {
      });
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
