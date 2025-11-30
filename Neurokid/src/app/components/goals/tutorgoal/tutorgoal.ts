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
import { loginservice } from '../../../services/loginservice';
import { LinkedProfileservice } from '../../../services/linked-profileservice';
import { LinkedProfile } from '../../../models/LinkedProfile';
import { forkJoin } from 'rxjs';
@Component({
  selector: 'app-tutorgoal',
  imports: [MatTableModule,CommonModule,MatButtonModule, MatIconModule, RouterLink, MatPaginatorModule],
  templateUrl: './tutorgoal.html',
  styleUrl: './tutorgoal.css',
})
export class Tutorgoal implements OnInit{
dataSource: MatTableDataSource<Goal> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5','c6','c7','c8'];
  usuario:string = "";
  listalinks:LinkedProfile[] = [];
  listaGoal:Goal[] =[];
  GoalFiltrados:Goal[] =[];
  constructor(private gS: Goalservice,private loginService: loginservice,private links:LinkedProfileservice) { }

  private _snackBar = inject(MatSnackBar)

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {

    this.verificar();
    
    
        forkJoin({
        links: this.links.list(),
        goals: this.gS.list()
      }).subscribe(({ links, goals }) => {
    
        this.listalinks = links;
        this.listaGoal = goals;
    
        // 🔥 filtrado final
        this.filtrarDatos();
    
        // cargar tabla filtrada
        this.dataSource = new MatTableDataSource(this.GoalFiltrados);
        this.dataSource.paginator = this.paginator;
      });
    
       this.gS.getList().subscribe(nuevosDatos => {
        this.listaGoal = nuevosDatos;
        this.aplicarFiltroYActualizarTabla();
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

  verificar() {
    this.usuario = this.loginService.showName();
    return this.loginService.verificar();
  }

  openSnackBar() {
    this._snackBar.open("Eliminado correctamente", "Cerrar", {duration: 2000})
  }

  aplicarFiltroYActualizarTabla() {
  this.filtrarDatos(); // <--- tu función
  this.dataSource = new MatTableDataSource(this.GoalFiltrados);
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
  this.GoalFiltrados = this.listaGoal.filter(s =>
    childs.includes(s.user.username)
  );
  }
}
