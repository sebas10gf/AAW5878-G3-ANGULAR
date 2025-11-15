import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { Roles } from '../../../models/Roles';
import { User } from '../../../models/User';
import { Rolesservice } from '../../../services/rolesservice';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Userservice } from '../../../services/userservice';

@Component({
  selector: 'app-roleslinsert',
  imports: [ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule,
    CommonModule,
    MatRadioModule,
    MatNativeDateModule,
    MatButtonModule,],
  templateUrl: './roleslinsert.html',
  styleUrl: './roleslinsert.css',
})
export class Roleslinsert implements OnInit{
  form: FormGroup = new FormGroup({});
  rol: Roles = new Roles();
  edicion: boolean = false;

  listaUsers: User[] = [];

  id: number = 0;

  constructor(
    private rS: Rolesservice,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private uS: Userservice
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    this.uS.list().subscribe((data) => {
      this.listaUsers = data;
    });

    this.form = this.formBuilder.group({
      id: [''],
      nombre: ['', Validators.required],
      usuario: ['', Validators.required],
    });
  }
  aceptar(): void {
    if (this.form.valid) {
      this.rol.roleId = this.form.value.id;
      this.rol.role_name = this.form.value.nombre;
      this.rol.user.userId = this.form.value.usuario;
      if (this.edicion) {
        this.rS.update(this.rol).subscribe(() => {
          this.rS.list().subscribe((data) => {
            this.rS.setList(data);
          });
        });
      } else {
        this.rS.insert(this.rol).subscribe((data) => {
          this.rS.list().subscribe((data) => {
            this.rS.setList(data);
          });
        });
      }
      this.router.navigate(['Roles']);
    }
  }
  init() {
    if (this.edicion) {
      this.rS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          id: new FormControl(data.roleId),
          nombre: new FormControl(data.role_name),
          usuario:new FormControl(data.user.userId)
        });
      });
    }
  }
}
