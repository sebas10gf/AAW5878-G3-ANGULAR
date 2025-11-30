import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Prediction } from '../../../models/Prediction';
import { Predictionservice } from '../../../services/predictionservice';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { loginservice } from '../../../services/loginservice';
import { LinkedProfileservice } from '../../../services/linked-profileservice';
import { forkJoin } from 'rxjs';
import { LinkedProfile } from '../../../models/LinkedProfile';
@Component({
  selector: 'app-tutorlistar',
  imports: [ MatTableModule, CommonModule, MatIconModule, MatButtonModule, MatPaginatorModule],
  templateUrl: './tutorlistar.html',
  styleUrl: './tutorlistar.css',
})
export class Tutorlistar implements OnInit{
dataSource: MatTableDataSource<Prediction> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5'];

  usuario:string = "";
  listalinks:LinkedProfile[] = [];
  listaPred:Prediction[] =[];
  PredFiltrados:Prediction[] =[];

  

  constructor(private pS: Predictionservice,private loginService: loginservice,private links:LinkedProfileservice) {}

  private _snackBar = inject(MatSnackBar)

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {

    this.verificar();

       forkJoin({
              links: this.links.list(),
              predictions: this.pS.list()
            }).subscribe(({ links, predictions }) => {
          
              this.listalinks = links;
              this.listaPred = predictions;
          
              // 🔥 filtrado final
              this.filtrarDatos();
          
              // cargar tabla filtrada
              this.dataSource = new MatTableDataSource(this.PredFiltrados);
              this.dataSource.paginator = this.paginator;
            });
          
             this.pS.getList().subscribe(nuevosDatos => {
              this.listaPred = nuevosDatos;
              this.aplicarFiltroYActualizarTabla();
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

  verificar() {
    this.usuario = this.loginService.showName();
    return this.loginService.verificar();
  }


  openSnackBar() {
    this._snackBar.open("Eliminado correctamente", "Cerrar", {duration: 2000})
  }

  aplicarFiltroYActualizarTabla() {
  this.filtrarDatos(); // <--- tu función
  this.dataSource = new MatTableDataSource(this.PredFiltrados);
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
  this.PredFiltrados = this.listaPred.filter(s =>
    childs.includes(s.log.user.username)
  );
  }
}
