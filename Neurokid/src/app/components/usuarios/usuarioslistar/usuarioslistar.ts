import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { User } from '../../../models/User';
import { Userservice } from '../../../services/userservice';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-usuarioslistar',
  imports: [MatTableModule,CommonModule,MatButtonModule, MatIconModule, RouterLink, MatPaginatorModule],
  templateUrl: './usuarioslistar.html',
  styleUrl: './usuarioslistar.css',
})
export class Usuarioslistar implements OnInit {
  dataSource: MatTableDataSource<User> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6','c7','c8'];

  constructor(private sS: Userservice) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.sS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    
    this.sS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  ngAfterViewInit() { 
    this.dataSource.paginator = this.paginator; 
  }

  eliminar(id: number) {
    this.sS.delete(id).subscribe((data) => {
      this.sS.list().subscribe((data) => {
        this.sS.setList(data);
      });
    });
  }
}
