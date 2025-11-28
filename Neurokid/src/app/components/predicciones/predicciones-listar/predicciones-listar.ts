import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Prediction } from '../../../models/Prediction';
import { Predictionservice } from '../../../services/predictionservice';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-predicciones-listar',
  imports: [ MatTableModule, CommonModule, MatIconModule, MatButtonModule, RouterLink, MatPaginatorModule ],
  templateUrl: './predicciones-listar.html',
  styleUrl: './predicciones-listar.css',
})
export class PrediccionesListar implements OnInit {
  dataSource: MatTableDataSource<Prediction> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7'];

  constructor(private pS: Predictionservice) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
      this.pS.list().subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
      });

      this.pS.getList().subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
      });
  }

  ngAfterViewInit() { 
    this.dataSource.paginator = this.paginator; 
  }

  eliminar(id:number) {
    this.pS.delete(id).subscribe(data => {
      this.pS.list().subscribe(data => {
        this.pS.setList(data)
      })
    })
  }
}
