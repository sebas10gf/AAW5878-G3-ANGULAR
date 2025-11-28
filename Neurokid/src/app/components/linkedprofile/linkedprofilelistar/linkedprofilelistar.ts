import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { LinkedProfile } from '../../../models/LinkedProfile';
import { LinkedProfileservice } from '../../../services/linked-profileservice';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-linkedprofilelistar',
  imports: [MatTableModule,CommonModule,MatButtonModule, MatIconModule, RouterLink, MatPaginatorModule],
  templateUrl: './linkedprofilelistar.html',
  styleUrl: './linkedprofilelistar.css',
})
export class Linkedprofilelistar {
  dataSource: MatTableDataSource<LinkedProfile> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5','c6','c7'];

  constructor(private lS: LinkedProfileservice) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.lS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });

    this.lS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  ngAfterViewInit() { 
    this.dataSource.paginator = this.paginator; 
  }

  eliminar(id: number) {
    this.lS.delete(id).subscribe((data) => {
      this.lS.list().subscribe((data) => {
        this.lS.setList(data);
      });
    });
  }

}
