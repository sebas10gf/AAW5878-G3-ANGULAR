import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule, MAT_DATE_LOCALE, MAT_DATE_FORMATS, DateAdapter, NativeDateAdapter, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { QuestionAnswers } from '../../../models/QuestionAnswers';
import { Questions } from '../../../models/Questions';
import { Questionanswersservice } from '../../../services/questionanswersservice';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Questionsservice } from '../../../services/questionsservice';
import { Rolesservice } from '../../../services/rolesservice';
import { Roles } from '../../../models/Roles';

export const MY_DATE_FORMATS = {
  parse: { dateInput: 'DD/MM/YYYY' },
  display: {
    dateInput: 'DD/MM/YYYY'
  }
}

@Component({
  selector: 'app-respuestas-insert',
  imports: [ ReactiveFormsModule, MatInputModule, MatDatepickerModule, MatSelectModule, CommonModule, MatRadioModule, MatNativeDateModule, MatButtonModule ],
  templateUrl: './respuestas-insert.html',
  providers: [provideNativeDateAdapter(), 
    { provide: DateAdapter, useClass: NativeDateAdapter },
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
  ],
  styleUrl: './respuestas-insert.css',
})
export class RespuestasInsert implements OnInit {
  form: FormGroup = new FormGroup({});
  ans: QuestionAnswers = new QuestionAnswers();
  edicion: boolean = false;

  listaPreguntas: Questions[] = [];
  listaUsers: Roles[] = [];

  opciones: { value: number; viewValue: string }[] = [
    { value: 1, viewValue: 'Muy en desacuerdo' },
    { value: 2, viewValue: 'En desacuerdo' },
    { value: 3, viewValue: 'indiferente' },
    { value: 4, viewValue: 'De acuerdo' },
    { value: 5, viewValue: 'Muy de acuerdo' },
  ];

  id: number = 0;
  today = new Date();

  constructor(private qaS: Questionanswersservice,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private qS: Questionsservice,
    private rS: Rolesservice
  ) {}

  ngOnInit(): void {
      this.route.params.subscribe((data: Params) => {
        this.id = data['id'];
        this.edicion = data['id'] != null;
        this.init();
      });

      this.rS.list().subscribe((data) => {
      this.listaUsers = data.filter(u => u.role_name === "CHILD");;
    });


      this.qS.list().subscribe((data) => {
        this.listaPreguntas = data;
      })

      this.form = this.formBuilder.group({
        id: [''],
        valor: ['', Validators.required],
        fecha: ['', Validators.required],
        usuario: ['', Validators.required],
        pregunta: ['', Validators.required],
      });
  }

  aceptar(): void{
    if (this.form.valid) {
      this.ans.answer_id = this.form.value.id;
      this.ans.answer_value = this.form.value.valor;
      this.ans.answered_at = this.form.value.fecha;
      this.ans.user.userId = this.form.value.usuario;
      this.ans.questions.question_id = this.form.value.pregunta;

      if(this.edicion) {
        this.qaS.update(this.ans).subscribe(() => {
          this.qaS.list().subscribe((data) => {
            this.qaS.setList(data);
          });
        });
      } else {
        this.qaS.insert(this.ans).subscribe((data) => {
          this.qaS.list().subscribe((data) => {
            this.qaS.setList(data);
          });
        });
      }
      this.router.navigate(['QuestionsAnswers'])
    }
  }

  init() {
    if(this.edicion) {
      this.qaS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          id: new FormControl(data.answer_id),
          valor: new FormControl(data.answer_value),
          fecha: new FormControl(data.answered_at),
          usuario: new FormControl(data.user.userId),
          pregunta: new FormControl(data.questions.question_id)
        });
      });
    }
  }
}
