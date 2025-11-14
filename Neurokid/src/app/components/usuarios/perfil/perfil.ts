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
  selector: 'app-perfil',
  imports: [ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatDatepickerModule,
    MatButtonModule,],
  templateUrl: './perfil.html',
     providers: [provideNativeDateAdapter()],
  styleUrl: './perfil.css',
})
export class Perfil implements OnInit{
form: FormGroup = new FormGroup({});
  u: User = new User();

    id: number = 0;


  constructor(
    private sS: Userservice,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
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

  init() {
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
      this.form.disable();
      });
    }
}
