import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { loginservice } from '../../services/loginservice';

@Component({
  selector: 'app-menu',
  imports: [MatIconModule, MatButtonModule, MatToolbarModule, MatMenuModule, RouterLink],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class Menu {
  role: string = '';
  usuario: string = '';
  constructor(private loginService: loginservice,) {}

  cerrar() {
    sessionStorage.clear();
  }

  verificar() {
    this.role = this.loginService.showRole();
    this.usuario = this.loginService.showName();
    return this.loginService.verificar();
  }


  isAdmin() {
    return this.role === 'ADMIN';
  }

  isProfesional() {
    return this.role === 'PROFESIONAL';
  }

  isTutor() {
    return this.role === 'TUTOR';
  }
}
