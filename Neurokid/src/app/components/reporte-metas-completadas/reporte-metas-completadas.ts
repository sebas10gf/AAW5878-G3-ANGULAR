import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { Userservice } from '../../services/userservice';

@Component({
  selector: 'app-reporte-metas-completadas',
  imports: [ MatIconModule, BaseChartDirective ],
  templateUrl: './reporte-metas-completadas.html',
  styleUrl: './reporte-metas-completadas.css',
  providers: [provideCharts(withDefaultRegisterables())],
})
export class ReporteMetasCompletadas implements OnInit {
  hasData = false;
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'pie'; 
  barChartLegend = true;
  barChartData: ChartDataset[] = [];

  constructor(private uS: Userservice) {}

  ngOnInit(): void {
    this.uS.getRep1().subscribe((data) => {
      if (data.length > 0) {
        this.hasData = true;
        this.barChartLabels = data.map((item) => item.username);
        this.barChartData=[
          {
             data:data.map(item=>item.metas_completadas),
             label:'Cantidad de Metas Completadas',
             backgroundColor:[
              'green',
              'green'
             ]
          }
         
        ]
      } else {
        this.hasData=false
      }
    });
  }
}
