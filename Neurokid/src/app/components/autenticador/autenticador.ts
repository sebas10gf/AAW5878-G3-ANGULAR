import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JwtRequestDTO } from '../../models/JwtRequestDTO';
import { loginservice } from '../../services/loginservice';
import { Userservice } from '../../services/userservice';
import { User } from '../../models/User';

@Component({
  selector: 'app-autenticador',
  imports: [ MatFormFieldModule, FormsModule, MatInputModule, MatButtonModule ],
  templateUrl: './autenticador.html',
  styleUrl: './autenticador.css',
})
export class Autenticador implements OnInit {
  constructor(
    private loginService: loginservice,
    private router: Router,
    private snackBar: MatSnackBar,
    private uS: Userservice
  ) {}

  username: string = '';
  password: string = '';
  email: string = '';
  mensaje: string = '';
  confirmPassword: string = '';
  isRegister: boolean = false;

  ngOnInit(): void { }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  login() {
    let request = new JwtRequestDTO();
    request.username = this.username;
    request.password = this.password;
    
    this.loginService.login(request).subscribe(
      (data: any) => {
        sessionStorage.setItem('token', data.jwttoken);
        this.router.navigate(['homes']);
      },
      (error) => {
        this.mensaje = 'Credenciales incorrectas';
        this.snackBar.open(this.mensaje, 'Cerrar', {duration: 2000 });
      }
    )
  }

  registrar() {
    if (this.password !== this.confirmPassword) {
      this.snackBar.open('Las contraseñas no coinciden', 'Cerrar', { duration: 2000 });
      return;
    }

    if (!this.username || !this.email || !this.password) {
      this.snackBar.open('Todos los campos son obligatorios', 'Cerrar', { duration: 2000 });
      return;
    }

    if (!this.isValidEmail(this.email)) {
      this.snackBar.open('El formato del correo no es válido', 'Cerrar', { duration : 2000 });
      return;
    }

    let newUser = new User();
    newUser.username = this.username;
    newUser.email = this.email;
    newUser.passwordHash = this.password;
    newUser.createdAt = new Date();
    newUser.updatedAt = new Date();
    newUser.enabled = true;

    this.uS.insert(newUser).subscribe(() => {
      this.snackBar.open('Registro exitoso. Inicie sesión', 'Cerrar', { duration: 3000 });
      this.username = '';
      this.email = '';
      this.password = '';
      this.confirmPassword = '';
      this.isRegister = false;
    },
    (error) => {
      const errorMessage = error.error || 'Error desconocido al registrar';
      this.mensaje = 'Error al registrar el usuario: ' + errorMessage;
      this.snackBar.open(this.mensaje, 'Cerrar', { duration: 3000 });
    })
  }
}
