import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { Questions } from '../../../models/Questions';
import { Questionnaries } from '../../../models/Questionnaries';
import { Questionsservice } from '../../../services/questionsservice';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Questionnariesservice } from '../../../services/questionnariesservice';

@Component({
  selector: 'app-preguntas-insert',
  imports: [ ReactiveFormsModule, MatInputModule, MatDatepickerModule, MatSelectModule, CommonModule, MatRadioModule, MatNativeDateModule, MatButtonModule],
  templateUrl: './preguntas-insert.html',
  styleUrl: './preguntas-insert.css',
})
export class PreguntasInsert implements OnInit {
  form: FormGroup = new FormGroup({});
  que: Questions = new Questions(); 
  edicion: boolean = false;

  listaCuestionarios: Questionnaries[] = [];

  id:number = 0;

  constructor(private qS: Questionsservice,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private qsS: Questionnariesservice
  ) {}

  ngOnInit(): void {
      this.route.params.subscribe((data: Params) => {
        this.id = data['id'];
        this.edicion = data['id'] != null;
        this.init();
      });

      this.qsS.list().subscribe((data) => {
        this.listaCuestionarios = data;
      })

      this.form = this.formBuilder.group({
        id: [''],
        pregunta: ['', Validators.required],
        cuestionario: ['', Validators.required]
      });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.que.question_id = this.form.value.id;
      this.que.question_text = this.form.value.pregunta;
      this.que.questionnaire.title = this.form.value.cuestionario;

      if(this.edicion) {
        this.qS.update(this.que).subscribe(() => {
          this.qS.list().subscribe((data) => {
            this.qS.setList(data);
          });
        });
      } else {
        this.qS.insert(this.que).subscribe((data) => {
          this.qS.list().subscribe((data) => {
            this.qS.setList(data);
          });
        });
      }
      this.router.navigate(['Questions']);
    }
  }

  init() {
    if (this.edicion) {
      this.qS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          id: new FormControl(data.question_id),
          pregunta: new FormControl(data.question_text),
          cuestionario: new FormControl(data.questionnaire.title)
        });
      });
    }
  }
}
