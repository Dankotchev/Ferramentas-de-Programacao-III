import { Component } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {

  constructor(private usuarioService: UsuarioService) {
    this.findAll();
  }

  findAll() {
    this.usuarioService.findAll().then((resultado) => {
      console.log(resultado);
    });
  }

}
