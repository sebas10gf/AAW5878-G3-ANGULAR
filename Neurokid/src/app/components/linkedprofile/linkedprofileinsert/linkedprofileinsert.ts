import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Params, Router} from '@angular/router';
import { LinkedProfile } from '../../../models/LinkedProfile';
import { Roles } from '../../../models/Roles';
import { LinkedProfileservice } from '../../../services/linked-profileservice';
import { Rolesservice } from '../../../services/rolesservice';

@Component({
  selector: 'app-linkedprofileinsert',
  imports: [ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule,
    CommonModule,
    MatRadioModule,
    MatNativeDateModule,
    MatButtonModule,],
  templateUrl: './linkedprofileinsert.html',
  styleUrl: './linkedprofileinsert.css',
})
export class Linkedprofileinsert implements OnInit{
  form: FormGroup = new FormGroup({});
  link: LinkedProfile = new LinkedProfile();
  edicion: boolean = false;

  listaUsersT: Roles[] = [];
  listaUsersC: Roles[] = [];
  listaUsersP: Roles[] = [];
  listalink: LinkedProfile[] = [];

  id: number = 0;

  constructor(
    private lS: LinkedProfileservice,
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
      this.listaUsersT = data.filter(u => u.role_name === "TUTOR");
      this.listaUsersC = data.filter(u => u.role_name === "CHILD");
      this.listaUsersP = data.filter(u => u.role_name === "PROFESIONAL");
    });

    this.lS.list().subscribe((data) => {
      this.listalink = data;
    })




    this.form = this.formBuilder.group({
      id: [''],
      tutor: ['', Validators.required],
      niño: ['', Validators.required],
      psicologo: ['', Validators.required],
      estado: ['', Validators.required],
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.link.linkId = this.form.value.id;
      this.link.tutor.userId = this.form.value.tutor;
      this.link.child.userId = this.form.value.niño;
      this.link.professional.userId = this.form.value.psicologo;
      this.link.status = this.form.value.estado;
      if (this.edicion) {
        this.lS.update(this.link).subscribe((data) => {
          this.lS.list().subscribe((data) => {
            this.lS.setList(data);
          });
        });
      } else {
        this.lS.insert(this.link).subscribe((data) => {
          this.lS.list().subscribe((data) => {
            this.lS.setList(data);
          });
        });
      }
      this.router.navigate(['LinkedProfile']);
    }
  }
  init() {
    if (this.edicion) {
      this.lS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          id: new FormControl(data.linkId),
          tutor:new FormControl(data.tutor.userId),
          niño: new FormControl(data.child.userId),
          profesional: new FormControl(data.professional.userId),
          estado: new FormControl(data.status),
        });
      });
    }
  }
}
