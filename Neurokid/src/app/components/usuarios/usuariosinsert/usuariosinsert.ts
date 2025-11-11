import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { User } from '../../../models/User';
import { Userservice } from '../../../services/userservice';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-usuariosinsert',
  imports: [ ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatDatepickerModule,
    MatButtonModule,],
  templateUrl: './usuariosinsert.html',
   providers: [provideNativeDateAdapter()],
  styleUrl: './usuariosinsert.css',
})
export class Usuariosinsert implements OnInit {
  form: FormGroup = new FormGroup({});
  u: User = new User();

  edicion: boolean = false;
  id: number = 0;
  fecha: Date = new Date();
  actual: Date = new Date();
  update: Date = new Date();
  error1: boolean = false;
  error2: boolean = false;

  constructor(
    private sS: Userservice,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    this.form = this.formBuilder.group({
      codigo: [''],
      nombre: ['', Validators.required],
      email: ['', Validators.required],
      passwordhash: ['', Validators.required],
      creado: ['', Validators.required],
      actualizado: ['', Validators.required],
      estado: [false, Validators.required],
    });
  }
  aceptar(): void {
    if (this.form.valid) {
      this.u.userId = this.form.value.codigo;
      this.u.username = this.form.value.nombre;
      this.u.email = this.form.value.email;
      this.u.passwordHash = this.form.value.passwordhash;
      this.u.createdAt = this.form.value.creado;
      this.u.updatedAt = this.form.value.actualizado;
      this.u.enabled = this.form.value.estado;

      this.fecha = this.form.value.creado;
      this.update = this.form.value.actualizado;

      if (this.fecha > this.actual){
        this.error1 = true;
      }

      if (this.fecha > this.update){
        this.error2 = true;
      }


      if (this.edicion) {
         this.sS.update(this.u).subscribe((data) => {
        this.sS.list().subscribe((data) => {
          this.sS.setList(data);
        });
      });
      } else {
        this.sS.insert(this.u).subscribe((data) => {
          this.sS.list().subscribe((data) => {
            this.sS.setList(data);
          });
        });
      }
      this.router.navigate(['Users']);
    }
  }
  init() {
    if (this.edicion) {
      this.sS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.userId),
          nombre: new FormControl(data.username),
          email: new FormControl(data.email),
          passwordhash: new FormControl(data.passwordHash),
          creado: new FormControl(data.createdAt),
          actualizado: new FormControl(data.updatedAt),
          estado: new FormControl(data.enabled),
        });
      });
    }
  }
}
