import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Questions } from '../../../models/Questions';
import { Questionsservice } from '../../../services/questionsservice';

@Component({
  selector: 'app-preguntas-listar',
  imports: [ MatTableModule, MatIconModule, MatButtonModule, CommonModule, RouterLink ],
  templateUrl: './preguntas-listar.html',
  styleUrl: './preguntas-listar.css',
})
export class PreguntasListar implements OnInit{
  dataSource: MatTableDataSource<Questions> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5'];

  constructor(private qS: Questionsservice) {}

  ngOnInit(): void {
      this.qS.list().subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
      });

      this.qS.getList().subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
      })
  }

  eliminar(id:number) {
    this.qS.delete(id).subscribe(data => {
      this.qS.list().subscribe(data => {
        this.qS.setList(data)
      })
    })
  }
}
