import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { Prediction } from '../../../models/Prediction';
import { User } from '../../../models/User';
import { Predictionservice } from '../../../services/predictionservice';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Userservice } from '../../../services/userservice';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE, MAT_DATE_FORMATS, DateAdapter, NativeDateAdapter, provideNativeDateAdapter } from '@angular/material/core';

export const MY_DATE_FORMATS = {
  parse: { dateInput: 'DD/MM/YYYY' },
  display: {
    dateInput: 'DD/MM/YYYY'
  }
}

@Component({
  selector: 'app-predicciones-insert',
  imports: [ ReactiveFormsModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule, CommonModule, MatRadioModule, MatButtonModule ],
  templateUrl: './predicciones-insert.html',
  providers: [provideNativeDateAdapter(), 
      { provide: DateAdapter, useClass: NativeDateAdapter },
      { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
      { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
    ],
  styleUrl: './predicciones-insert.css',
})
export class PrediccionesInsert implements OnInit {
  form: FormGroup = new FormGroup({});
  pre: Prediction = new Prediction();
  edicion: boolean = false;

  listaUsuario: User[] = [];

  id:number = 0;

  constructor(private pS: Predictionservice,
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
        this.listaUsuario = data;
      });

      this.form = this.formBuilder.group({
        id: [''],
        puntaje: ['', Validators.required],
        texto: ['', Validators.required],
        prediccion: ['', Validators.required],
        usuario: ['', Validators.required]
      });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.pre.predictionId = this.form.value.id;
      this.pre.predictionScore = this.form.value.puntaje;
      this.pre.explanationText = this.form.value.texto;
      this.pre.predictedAt = this.form.value.prediccion;
      this.pre.usuario.userId = this.form.value.usuario;

      if(this.edicion) {
        this.pS.update(this.pre).subscribe(() => {
          this.pS.list().subscribe((data) => {
            this.pS.setList(data);
          });
        });
      } else {
        this.pS.insert(this.pre).subscribe((data) => {
          this.pS.list().subscribe((data) => {
            this.pS.setList(data);
          });
        });
      }
      this.router.navigate(['Prediction']);
    }
  }

  init() {
    if (this.edicion) {
      this.pS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          id: new FormControl(data.predictionId),
          puntaje: new FormControl(data.predictionScore),
          texto: new FormControl(data.explanationText),
          prediccion: new FormControl(data.predictedAt),
          usuario: new FormControl(data.usuario.userId)
        });
      });
    }
  }
}
