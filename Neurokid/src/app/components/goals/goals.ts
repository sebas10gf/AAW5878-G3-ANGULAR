import { Component } from '@angular/core';
import { Goallistar } from './goallistar/goallistar';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-goals',
  imports: [Goallistar,RouterOutlet],
  templateUrl: './goals.html',
  styleUrl: './goals.css',
})
export class Goals {
 constructor(public route:ActivatedRoute){}
}
