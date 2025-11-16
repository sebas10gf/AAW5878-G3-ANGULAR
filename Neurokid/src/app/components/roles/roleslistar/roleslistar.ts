import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Roles } from '../../../models/Roles';
import { Rolesservice } from '../../../services/rolesservice';
import { Userservice } from '../../../services/userservice';

@Component({
  selector: 'app-roleslistar',
  imports: [MatTableModule,CommonModule,MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './roleslistar.html',
  styleUrl: './roleslistar.css',
})
export class Roleslistar implements OnInit{
  dataSource: MatTableDataSource<Roles> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5'];

  constructor(private rS: Rolesservice,   private uS: Userservice) {
  }

  ngOnInit(): void {
    this.rS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });

    this.rS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });


  }
  eliminar(id: number) {
    this.rS.delete(id).subscribe((data) => {
      this.rS.list().subscribe((data) => {
        this.rS.setList(data);
      });
    });
  }

}
