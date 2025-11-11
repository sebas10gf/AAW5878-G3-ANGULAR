import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { Usuarioslistar } from './usuarioslistar/usuarioslistar';

@Component({
  selector: 'app-usuarios',
  imports: [RouterOutlet,Usuarioslistar],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.css',
})
export class Usuarios {
 constructor(public route:ActivatedRoute){}
}
