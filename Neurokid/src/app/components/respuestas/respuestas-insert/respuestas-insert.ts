import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { QuestionAnswers } from '../../../models/QuestionAnswers';
import { Questions } from '../../../models/Questions';
import { User } from '../../../models/User';
import { Questionanswersservice } from '../../../services/questionanswersservice';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Userservice } from '../../../services/userservice';
import { Questionsservice } from '../../../services/questionsservice';

@Component({
  selector: 'app-respuestas-insert',
  imports: [ ReactiveFormsModule, MatInputModule, MatDatepickerModule, MatSelectModule, CommonModule, MatRadioModule, MatNativeDateModule, MatButtonModule ],
  templateUrl: './respuestas-insert.html',
  styleUrl: './respuestas-insert.css',
})
export class RespuestasInsert implements OnInit {
  form: FormGroup = new FormGroup({});
  ans: QuestionAnswers = new QuestionAnswers();
  edicion: boolean = false;

  listaPreguntas: Questions[] = [];
  listaUsuario: User[] = [];

  id: number = 0;
  today = new Date();

  constructor(private qaS: Questionanswersservice,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private uS: Userservice,
    private qS: Questionsservice
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
      this.ans.user.username = this.form.value.usuario;
      this.ans.question.question_text = this.form.value.pregunta;

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
          usuario: new FormControl(data.user.username),
          pregunta: new FormControl(data.question.question_text)
        });
      });
    }
  }
}
