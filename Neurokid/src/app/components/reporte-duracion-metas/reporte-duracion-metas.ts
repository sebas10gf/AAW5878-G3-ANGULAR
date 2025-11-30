import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { Userservice } from '../../services/userservice';

@Component({
  selector: 'app-reporte-duracion-metas',
  imports: [ MatIconModule, BaseChartDirective ],
  templateUrl: './reporte-duracion-metas.html',
  styleUrl: './reporte-duracion-metas.css',
  providers: [provideCharts(withDefaultRegisterables())]
})
export class ReporteDuracionMetas implements OnInit {
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
      this.uS.getRep2().subscribe((data) => {
        if (data.length > 0) {
          this.hasData = true;
          this.barChartLabels = data.map((item) => item.userId.username);
          this.barChartData=[
            {
               data:data.map(item=>parseFloat(item.promedio_duracion_dias)),
               label:'Promedio de Duración de Metas Completadas',
               backgroundColor:[
                'green',
                'red',
                'blue'
               ]
            }
           
          ]
        } else {
          this.hasData=false
        }
      });
    }
}
