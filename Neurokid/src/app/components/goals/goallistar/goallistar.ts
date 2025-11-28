import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Goal } from '../../../models/Goal';
import { Goalservice } from '../../../services/goalservice';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-goallistar',
  imports: [MatTableModule,CommonModule,MatButtonModule, MatIconModule, RouterLink, MatPaginatorModule],
  templateUrl: './goallistar.html',
  styleUrl: './goallistar.css',
})
export class Goallistar implements OnInit{
  dataSource: MatTableDataSource<Goal> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5','c6','c7','c8'];

  constructor(private gS: Goalservice) { }

  private _snackBar = inject(MatSnackBar)

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.gS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });

    this.gS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  ngAfterViewInit() { 
    this.dataSource.paginator = this.paginator; 
  }

  eliminar(id: number) {
    this.gS.delete(id).subscribe((data) => {
      this.gS.list().subscribe((data) => {
        this.gS.setList(data);
      });
    });
  }

  openSnackBar() {
    this._snackBar.open("Eliminado correctamente", "Cerrar", {duration: 2000})
  }
}
