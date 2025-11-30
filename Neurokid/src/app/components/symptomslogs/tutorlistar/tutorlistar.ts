import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Symptomslog } from '../../../models/SymptomsLog';
import { Symptomslogservice } from '../../../services/symptomslogservice';
import { MatSnackBar } from '@angular/material/snack-bar';
import { loginservice } from '../../../services/loginservice';
import { LinkedProfileservice } from '../../../services/linked-profileservice';
import { LinkedProfile } from '../../../models/LinkedProfile';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-tutorlistar',
  imports: [MatTableModule,CommonModule,MatButtonModule, MatIconModule, RouterLink, MatPaginatorModule],
  templateUrl: './tutorlistar.html',
  styleUrl: './tutorlistar.css',
})
export class TUTORlistar implements OnInit{
  dataSource: MatTableDataSource<Symptomslog> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5','c6','c7'];
  usuario:string = "";
  listalinks:LinkedProfile[] = [];
  listaSint:Symptomslog[] =[];
  sintomasFiltrados:Symptomslog[] =[];


  constructor(private sS: Symptomslogservice,private loginService: loginservice,private links:LinkedProfileservice ) { }

  private _snackBar = inject(MatSnackBar)

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {

    this.verificar();


    forkJoin({
    links: this.links.list(),
    sintomas: this.sS.list()
  }).subscribe(({ links, sintomas }) => {

    this.listalinks = links;
    this.listaSint = sintomas;

    // 🔥 filtrado final
    this.filtrarDatos();

    // cargar tabla filtrada
    this.dataSource = new MatTableDataSource(this.sintomasFiltrados);
    this.dataSource.paginator = this.paginator;
  });

   this.sS.getList().subscribe(nuevosDatos => {
    this.listaSint = nuevosDatos;
    this.aplicarFiltroYActualizarTabla();
  });

}

ngAfterViewInit() { 
  if (this.dataSource) {
    this.dataSource.paginator = this.paginator; 
  }
}
  eliminar(id: number) {
    this.sS.delete(id).subscribe((data) => {
      this.sS.list().subscribe((data) => {
        this.sS.setList(data);
      });
    });
  }

  verificar() {
    this.usuario = this.loginService.showName();
    return this.loginService.verificar();
  }


  openSnackBar() {
    this._snackBar.open("Eliminado correctamente", "Cerrar", {duration: 2000})
  }

  aplicarFiltroYActualizarTabla() {
  this.filtrarDatos(); // <--- tu función
  this.dataSource = new MatTableDataSource(this.sintomasFiltrados);
  this.dataSource.paginator = this.paginator;
}

  filtrarDatos() {

  // 1. buscar todos los perfiles donde el usuario es tutor
  const misPerfiles = this.listalinks.filter(lp =>
    lp.tutor.username === this.usuario
  );
  // 2. obtener lista de childs
  const childs = misPerfiles.map(lp => lp.child.username);

  // 3. filtrar síntomas solo de esos childs
  this.sintomasFiltrados = this.listaSint.filter(s =>
    childs.includes(s.user.username)
  );
  }
}
