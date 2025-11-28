import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { LinkedProfile } from '../../../models/LinkedProfile';
import { LinkedProfileservice } from '../../../services/linked-profileservice';

@Component({
  selector: 'app-linkedprofilelistar',
  imports: [MatTableModule,CommonModule,MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './linkedprofilelistar.html',
  styleUrl: './linkedprofilelistar.css',
})
export class Linkedprofilelistar {
  dataSource: MatTableDataSource<LinkedProfile> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5','c6','c7'];

  constructor(private lS: LinkedProfileservice) {
  }

  ngOnInit(): void {
    this.lS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });

    this.lS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });


  }
  eliminar(id: number) {
    this.lS.delete(id).subscribe((data) => {
      this.lS.list().subscribe((data) => {
        this.lS.setList(data);
      });
    });
  }

}
