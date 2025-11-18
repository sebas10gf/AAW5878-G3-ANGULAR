import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { QuestionAnswers } from '../../../models/QuestionAnswers';
import { Questionanswersservice } from '../../../services/questionanswersservice';

@Component({
  selector: 'app-respuestas-listar',
  imports: [ MatTableModule, CommonModule, MatIconModule, MatButtonModule, RouterLink ],
  templateUrl: './respuestas-listar.html',
  styleUrl: './respuestas-listar.css',
})
export class RespuestasListar implements OnInit {
  dataSource: MatTableDataSource<QuestionAnswers> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7'];

  constructor(private qaS: Questionanswersservice) {}

  ngOnInit(): void {
      this.qaS.list().subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
      });

      this.qaS.getList().subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
      });
  }

  eliminar(id:number) {
    this.qaS.delete(id).subscribe(data => {
      this.qaS.list().subscribe(data => {
        this.qaS.setList(data)
      })
    })
  }
}
