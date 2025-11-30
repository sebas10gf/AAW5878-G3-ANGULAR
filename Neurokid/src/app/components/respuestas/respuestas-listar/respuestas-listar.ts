import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { QuestionAnswers } from '../../../models/QuestionAnswers';
import { Questionanswersservice } from '../../../services/questionanswersservice';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-respuestas-listar',
  imports: [ MatTableModule, CommonModule, MatIconModule, MatButtonModule, RouterLink, MatPaginatorModule ],
  templateUrl: './respuestas-listar.html',
  styleUrl: './respuestas-listar.css',
})
export class RespuestasListar implements OnInit {
  dataSource: MatTableDataSource<QuestionAnswers> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7'];

  constructor(private qaS: Questionanswersservice) {}

  private _snackBar = inject(MatSnackBar)
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {    
      this.qaS.list().subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
      });

      this.qaS.getList().subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
      });
  }

  ngAfterViewInit() { 
    this.dataSource.paginator = this.paginator; 
  }

  eliminar(id:number) {
    this.qaS.delete(id).subscribe(data => {
      this.qaS.list().subscribe(data => {
        this.qaS.setList(data)
      })
    })
  }

  openSnackBar() {
    this._snackBar.open("Eliminado correctamente", "Cerrar", {duration: 2000})
  }
}
