import { Component } from '@angular/core';
import { CuestionariosListar } from "./cuestionarios-listar/cuestionarios-listar";
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-cuestionarios',
  imports: [CuestionariosListar,RouterOutlet],
  templateUrl: './cuestionarios.html',
  styleUrl: './cuestionarios.css',
})
export class Cuestionarios {
  constructor(public route:ActivatedRoute){}
}
