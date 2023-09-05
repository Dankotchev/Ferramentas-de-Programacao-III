import { Component } from '@angular/core';
import { UsuarioService } from '../api/usuario.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public dadosAPI: any = {};
  public dadosUsers: any = {};
  private paginaAtual: number = 1;

  constructor(private usuarioService: UsuarioService) {
    this.getUsuarios(this.paginaAtual);
  }

  // Métodos
  public paginaAnterior() {
    if (this.paginaAtual != 1)
      this.paginaAtual--;
    this.getUsuarios(this.paginaAtual);
  }

  public paginaProxima() {
    if (this.paginaAtual != this.dadosAPI.total_pages)
      this.paginaAtual++;
    this.getUsuarios(this.paginaAtual);
  }

  public getPaginaAtual () : number{
    return this.paginaAtual;
  }

  public pesquisar(event: any){
    const consulta = event.target.value.toLowerCase();
    this.dadosUsers = this.dadosAPI.data.filter((d: any) => d.first_name.toLowerCase().indexOf(consulta) > -1);
  }

  private async getUsuarios(pagina: number) {
    // Requisição assincrona
    this.usuarioService
      .getUsuarios(pagina)
      .then((resultado) => {
        // then, caso tenha sucesso
        this.dadosAPI = resultado;
        this.dadosUsers = this.dadosAPI.data;
        console.log(resultado);
      })
      .catch(() => {
        // catch, caso ocorra algum erro
      });

    // // Sincrona, utilizando o await
    // const resultado = await this.usuarioService.getUsuarios(pagina);
    // console.log(resultado);
    // console.log('2222');
    // console.log('33333');
  }
}
