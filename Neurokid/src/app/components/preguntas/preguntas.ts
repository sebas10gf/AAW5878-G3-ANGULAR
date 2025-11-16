import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { PreguntasListar } from './preguntas-listar/preguntas-listar';

@Component({
  selector: 'app-preguntas',
  imports: [ RouterOutlet, PreguntasListar ],
  templateUrl: './preguntas.html',
  styleUrl: './preguntas.css',
})
export class Preguntas {
  constructor(public route:ActivatedRoute) {}
}
