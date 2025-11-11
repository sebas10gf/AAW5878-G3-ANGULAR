import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { Questionnaries } from '../../../models/Questionnaries';
import { Questionnariesservice } from '../../../services/questionnariesservice';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-cuestionarios-insert',
  imports: [ ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatDatepickerModule,
    MatButtonModule,],
  templateUrl: './cuestionarios-insert.html',
   providers: [provideNativeDateAdapter()],
  styleUrl: './cuestionarios-insert.css',
})
export class CuestionariosInsert implements OnInit{
  form: FormGroup = new FormGroup({});
  C: Questionnaries = new Questionnaries();

  edicion: boolean = false;
  id: number = 0;

  constructor(
    private cS: Questionnariesservice,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    this.form = this.formBuilder.group({
      codigo: [''],
      titulo: ['', Validators.required],
      version: ['', Validators.required],
    });
  }
  aceptar(): void {
    if (this.form.valid) {
      this.C.questionnaire_id = this.form.value.codigo;
      this.C.title = this.form.value.titulo;
      this.C.version_number = this.form.value.version;

      if (this.edicion) {
         this.cS.update(this.C).subscribe((data) => {
        this.cS.list().subscribe((data) => {
          this.cS.setList(data);
        });
      });
      } else {
        this.cS.insert(this.C).subscribe((data) => {
          this.cS.list().subscribe((data) => {
            this.cS.setList(data);
          });
        });
      }
      this.router.navigate(['Questionnaries']);
    }
  }
  init() {
    if (this.edicion) {
      this.cS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.questionnaire_id),
          titulo: new FormControl(data.title),
          version: new FormControl(data.version_number)
        });
      });
    }
  }

}
