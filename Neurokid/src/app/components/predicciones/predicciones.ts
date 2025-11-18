import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { PrediccionesListar } from './predicciones-listar/predicciones-listar';

@Component({
  selector: 'app-predicciones',
  imports: [ RouterOutlet, PrediccionesListar ],
  templateUrl: './predicciones.html',
  styleUrl: './predicciones.css',
})
export class Predicciones {
  constructor(public route:ActivatedRoute) {}
}
