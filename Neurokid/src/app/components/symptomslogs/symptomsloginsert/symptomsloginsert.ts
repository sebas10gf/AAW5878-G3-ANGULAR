import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule, MAT_DATE_LOCALE, MAT_DATE_FORMATS, DateAdapter, NativeDateAdapter, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { Symptomslog } from '../../../models/SymptomsLog';
import { Symptomslogservice } from '../../../services/symptomslogservice';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Rolesservice } from '../../../services/rolesservice';
import { Roles } from '../../../models/Roles';

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
  selector: 'app-symptomsloginsert',
  imports: [ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule,
    CommonModule,
    MatRadioModule,
    MatNativeDateModule,
    MatButtonModule,],
  templateUrl: './symptomsloginsert.html',
  providers: [provideNativeDateAdapter(), 
        { provide: DateAdapter, useClass: NativeDateAdapter },
        { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
        { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
      ],
  styleUrl: './symptomsloginsert.css',
})
export class Symptomsloginsert implements OnInit{
form: FormGroup = new FormGroup({});
  log: Symptomslog = new Symptomslog();
  edicion: boolean = false;

  listaUsers: Roles[] = [];

  id: number = 0;

  constructor(
    private sS: Symptomslogservice,
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
      usuario: ['',Validators.required],
      animo: ['', [Validators.required,Validators.maxLength(50)]],
      descripcion: ['', Validators.required],
      fecha: ['', [Validators.required,fechaMenorIgualHoy]],
    });
  }
  aceptar(): void {
    if (this.form.valid) {
      this.log.logId = this.form.value.id;
      this.log.user.userId = this.form.value.usuario;
      this.log.moodEntry = this.form.value.animo;
      this.log.symptomNotes = this.form.value.descripcion;
      this.log.logDate = this.form.value.fecha;
      if (this.edicion) {
        this.sS.update(this.log).subscribe((data) => {
          this.sS.list().subscribe((data) => {
            this.sS.setList(data);
          });
        });
      } else {
        this.sS.insert(this.log).subscribe((data) => {
          this.sS.list().subscribe((data) => {
            this.sS.setList(data);
          });
        });
      }
      this.router.navigate(['SymptomsLog']);
    }
  }
  init() {
    if (this.edicion) {
      this.sS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          id: new FormControl(data.logId),
          usuario:new FormControl(data.user.userId),
          animo: new FormControl(data.moodEntry),
          descripcion: new FormControl(data.symptomNotes),
          fecha: new FormControl(data.logDate),
        });
      });
    }
  }
}
