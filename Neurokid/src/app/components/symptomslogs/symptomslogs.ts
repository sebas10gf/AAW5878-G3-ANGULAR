import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { Symptomsloglistar } from './symptomsloglistar/symptomsloglistar';

@Component({
  selector: 'app-symptomslogs',
  imports: [Symptomsloglistar,RouterOutlet],
  templateUrl: './symptomslogs.html',
  styleUrl: './symptomslogs.css',
})
export class Symptomslogs {
 constructor(public route:ActivatedRoute){}
}
