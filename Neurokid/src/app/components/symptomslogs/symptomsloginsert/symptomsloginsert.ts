import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { Symptomslog } from '../../../models/SymptomsLog';
import { Symptomslogservice } from '../../../services/symptomslogservice';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Rolesservice } from '../../../services/rolesservice';
import { Roles } from '../../../models/Roles';

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
      usuario: ['', Validators.required],
      animo: ['', Validators.required],
      descripcion: ['', Validators.required],
      fecha: ['', Validators.required],
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
        this.sS.update(this.log).subscribe(() => {
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
