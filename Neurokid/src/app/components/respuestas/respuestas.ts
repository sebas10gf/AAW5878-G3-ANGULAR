import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { RespuestasListar } from './respuestas-listar/respuestas-listar';

@Component({
  selector: 'app-respuestas',
  imports: [ RouterOutlet, RespuestasListar],
  templateUrl: './respuestas.html',
  styleUrl: './respuestas.css',
})
export class Respuestas {
  constructor(public route:ActivatedRoute) {}
}
