import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Questions } from '../../../models/Questions';
import { Questionsservice } from '../../../services/questionsservice';
import { Questionnaries } from '../../../models/Questionnaries';
import { Questionnariesservice } from '../../../services/questionnariesservice';

@Component({
  selector: 'app-busquedas',
  imports: [MatTableModule,
    ReactiveFormsModule,
    CommonModule,
    MatLabel,
    MatFormFieldModule,
    MatInputModule],
  templateUrl: './busquedas.html',
  styleUrl: './busquedas.css',
})
export class Busquedas implements OnInit{
  dataSource: MatTableDataSource<Questions> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3'];
  nombrebusqueda: string = "";
  mensaje: string = "";  
  form: FormGroup; 
  listaCuestionarios: Questionnaries[] = [];
  Cuestionario: any = new Questionnaries();
  id:number=0;
  Results:boolean=false;

  constructor(private qS: Questionsservice, private fb: FormBuilder,private qsS: Questionnariesservice) {

    this.form = this.fb.group({
      nombrebusqueda: [''],
    });

  }
  ngOnInit(): void {
    this.qS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
      this.form.get('nombrebusqueda')?.valueChanges.subscribe((value) => {
      this.nombrebusqueda = value; 
      this.buscar(); 
    });

    this.qsS.list().subscribe((data) => {
      this.Cuestionario = data.find(c=>c.title === this.nombrebusqueda)
        this.qsS.listId(this.Cuestionario.questionnaire_id).subscribe((data2)=>{
          this.id = data2.questionnaire_id;
        })
      })

  }
  
buscar() {

 const termino = this.nombrebusqueda.trim();

  if (termino === '') {
    // Si el campo está vacío → listar todos los registros
    this.qS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    return;
  }

  this.qS.search(this.id).subscribe(
  (data) => {
    this.dataSource = new MatTableDataSource(data);
    this.Results = data.length === 0; // si no hay resultados, mostrar mensaje
  },
  (err) => {
    if (err.status === 404) {
      this.dataSource = new MatTableDataSource(); // limpiar tabla
      this.Results = true; // activar mensaje de “no hay resultados”
    } else {
      console.error('Error inesperado:', err);
    }
  }
);
}

}
