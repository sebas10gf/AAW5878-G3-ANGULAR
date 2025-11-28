import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Roles } from '../../../models/Roles';
import { Rolesservice } from '../../../services/rolesservice';
import { Userservice } from '../../../services/userservice';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-roleslistar',
  imports: [MatTableModule,CommonModule,MatButtonModule, MatIconModule, RouterLink, MatPaginatorModule],
  templateUrl: './roleslistar.html',
  styleUrl: './roleslistar.css',
})
export class Roleslistar implements OnInit{
  dataSource: MatTableDataSource<Roles> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5'];

  constructor(private rS: Rolesservice,   private uS: Userservice) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.rS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });

    this.rS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  ngAfterViewInit() { 
    this.dataSource.paginator = this.paginator; 
  }
  
  eliminar(id: number) {
    this.rS.delete(id).subscribe((data) => {
      this.rS.list().subscribe((data) => {
        this.rS.setList(data);
      });
    });
  }

}
