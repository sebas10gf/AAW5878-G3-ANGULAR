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
import { ActivatedRoute } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-busquedas',
  imports: [MatTableModule,
    CommonModule,
    MatIconModule
  ],
  templateUrl: './busquedas.html',
  styleUrl: './busquedas.css',
})
export class Busquedas implements OnInit{
  dataSource: MatTableDataSource<Questions> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3'];
  mensaje: string = "";  
  Results:boolean=false;
  title: string = "Listado de preguntas";

  constructor(private qS: Questionsservice, private qsS: Questionnariesservice, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
        const id = params['questionnaireId'];
        if (id) {
            const questionnaireId = parseInt(id, 10);
            this.buscarPorId(questionnaireId);
        } else {
            this.title = "Todas las Preguntas";
            this.qS.list().subscribe((data) => {
                this.dataSource = new MatTableDataSource(data);
                this.Results = data.length === 0;
                if (this.Results) {
                    this.mensaje = 'No hay preguntas registradas en el sistema.';
                }
            });
        }
    });
  }
  
  buscarPorId(id: number) {
    this.qsS.listId(id).subscribe({
      next: (cuestionario) => {
        this.title = `Preguntas del Cuestionario: ${cuestionario.title}`;
      },
      error: () => {
        this.title = "Preguntas (Cuestionario no encontrado)";
      }
    });

    this.qS.search(id).subscribe({
      next: (data) => {
        this.dataSource = new MatTableDataSource(data);
        this.Results = data.length === 0;
        if (this.Results) {
            this.mensaje = `No se encontraron preguntas para el cuestionario ID: ${id}.`;
        }
      },
      error: (err) => {
        if (err.status === 404) {
          this.dataSource = new MatTableDataSource();
          this.Results = true;
          this.mensaje = `No se encontraron preguntas para el cuestionario ID: ${id}.`;
        } else {
          console.error('Error al buscar preguntas:', err);
          this.Results = true;
          this.mensaje = 'Ocurrió un error al cargar las preguntas.';
        }
      }
    });
  }
}
