import { Component } from '@angular/core';
import { Roleslistar } from "./roleslistar/roleslistar";
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-roles',
  imports: [Roleslistar,RouterOutlet],
  templateUrl: './roles.html',
  styleUrl: './roles.css',
})
export class Roles {
 constructor(public route:ActivatedRoute){}
}
