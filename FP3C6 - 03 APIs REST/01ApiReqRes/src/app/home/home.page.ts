import { Component } from '@angular/core';
import { UsuarioService } from '../api/usuario.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(private usuarioService: UsuarioService) {
    this.usuarioService
      .getUsuarios()
      .then((resultado) => {
        // then, caso tenha sucesso
        console.log(resultado);
      })
      .catch(() => {
        // catch, caso ocorra algum erro
      });
  }
}
