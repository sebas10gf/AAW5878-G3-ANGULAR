import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router, RouterLink } from '@angular/router';
import { Questionnaries } from '../../../models/Questionnaries';
import { Questionnariesservice } from '../../../services/questionnariesservice';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cuestionarios-listar',
  imports: [MatTableModule, MatButtonModule, MatIconModule, RouterLink, CommonModule, MatPaginatorModule],
  templateUrl: './cuestionarios-listar.html',
  styleUrl: './cuestionarios-listar.css',
})
export class CuestionariosListar implements OnInit{
  dataSource: MatTableDataSource<Questionnaries> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5','c6'];

  constructor(private cS: Questionnariesservice, private router: Router) { }

  private _snackBar = inject(MatSnackBar)

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.cS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });

    this.cS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  ngAfterViewInit() { 
    this.dataSource.paginator = this.paginator; 
  }

  eliminar(id: number) {
    this.cS.delete(id).subscribe((data) => {
      this.cS.list().subscribe((data) => {
        this.cS.setList(data);
      });
    });
  }

  openSnackBar() {
    this._snackBar.open("Eliminado correctamente", "Cerrar", {duration: 2000})
  }

  Preguntas(id:number): void {
  this.router.navigate(['Questions','busquedas']);
  }
}
