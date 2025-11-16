import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Symptomslog } from '../../../models/SymptomsLog';
import { Symptomslogservice } from '../../../services/symptomslogservice';

@Component({
  selector: 'app-symptomsloglistar',
  imports: [MatTableModule,CommonModule,MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './symptomsloglistar.html',
  styleUrl: './symptomsloglistar.css',
})
export class Symptomsloglistar implements OnInit{
  dataSource: MatTableDataSource<Symptomslog> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5','c6','c7'];

  constructor(private sS: Symptomslogservice) {
  }

  ngOnInit(): void {
    this.sS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });

    this.sS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });


  }
  eliminar(id: number) {
    this.sS.delete(id).subscribe((data) => {
      this.sS.list().subscribe((data) => {
        this.sS.setList(data);
      });
    });
  }
}
