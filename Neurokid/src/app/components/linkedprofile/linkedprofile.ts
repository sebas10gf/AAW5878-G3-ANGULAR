import { Component } from '@angular/core';
import { Linkedprofilelistar } from "./linkedprofilelistar/linkedprofilelistar";
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-linkedprofile',
  imports: [Linkedprofilelistar,RouterOutlet],
  templateUrl: './linkedprofile.html',
  styleUrl: './linkedprofile.css',
})
export class Linkedprofile {
   constructor(public route:ActivatedRoute) {}
}
