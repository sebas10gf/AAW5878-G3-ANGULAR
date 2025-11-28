import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule, MAT_DATE_LOCALE, MAT_DATE_FORMATS, DateAdapter, NativeDateAdapter, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { Goal } from '../../../models/Goal';
import { Goalservice } from '../../../services/goalservice';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Roles } from '../../../models/Roles';
import { Rolesservice } from '../../../services/rolesservice';

function fechaMenorIgualHoy(control: FormControl) {
  if (!control.value) return null;

  const fecha = new Date(control.value);
  const hoy = new Date();
  hoy.setHours(0,0,0,0);
  fecha.setHours(0,0,0,0);

  return fecha <= hoy ? null : { fechaMayorQueHoy: true };
}

export const MY_DATE_FORMATS = {
  parse: { dateInput: 'DD/MM/YYYY' },
  display: {
    dateInput: 'DD/MM/YYYY'
  }
}

@Component({
  selector: 'app-goalinsert',
  imports: [ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule,
    CommonModule,
    MatRadioModule,
    MatNativeDateModule,
    MatButtonModule,],
  templateUrl: './goalinsert.html',
  providers: [provideNativeDateAdapter(), 
        { provide: DateAdapter, useClass: NativeDateAdapter },
        { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
        { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
      ],
  styleUrl: './goalinsert.css',
})
export class Goalinsert implements OnInit {
  form: FormGroup = new FormGroup({});
  goal: Goal = new Goal();
  edicion: boolean = false;

  listaUsers: Roles[] = [];

  id: number = 0;

  constructor(
    private gS: Goalservice,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private rS: Rolesservice
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    this.rS.list().subscribe((data) => {
      this.listaUsers = data.filter(u => u.role_name === "KID");;
    });

    this.form = this.formBuilder.group({
      id: [''],
      usuario: ['', Validators.required],
      descripcion: ['', Validators.required],
      inicio: ['',[Validators.required,fechaMenorIgualHoy]],
      fin: ['', [Validators.required,fechaMenorIgualHoy]],
      estado: ['', Validators.required],
    });
  }

  get minActualizado() {
  return this.form.get('inicio')?.value || null;
  }

  aceptar(): void {
    if (this.form.valid) {
      this.goal.goalId = this.form.value.id;
      this.goal.user.userId = this.form.value.usuario;
      this.goal.goalDescription = this.form.value.descripcion;
      this.goal.startDate = this.form.value.inicio;
      this.goal.endDate = this.form.value.fin;
      this.goal.status = this.form.value.estado;
      if (this.edicion) {
        this.gS.update(this.goal).subscribe((data) => {
          this.gS.list().subscribe((data) => {
            this.gS.setList(data);
          });
        });
      } else {
        this.gS.insert(this.goal).subscribe((data) => {
          this.gS.list().subscribe((data) => {
            this.gS.setList(data);
          });
        });
      }
      this.router.navigate(['Goal']);
    }
  }
  init() {
    if (this.edicion) {
      this.gS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          id: new FormControl(data.goalId),
          usuario:new FormControl(data.user.userId),
          descripcion: new FormControl(data.goalDescription),
          inicio: new FormControl(data.startDate),
          fin: new FormControl(data.endDate),
          estado: new FormControl(data.status),
        });
      });
    }
  }
}
