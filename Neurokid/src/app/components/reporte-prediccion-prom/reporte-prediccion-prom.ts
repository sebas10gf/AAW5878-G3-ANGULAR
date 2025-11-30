import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { Predictionservice } from '../../services/predictionservice';

@Component({
  selector: 'app-reporte-prediccion-prom',
  imports: [ MatIconModule, BaseChartDirective ],
  templateUrl: './reporte-prediccion-prom.html',
  styleUrl: './reporte-prediccion-prom.css',
  providers: [provideCharts(withDefaultRegisterables())],
})
export class ReportePrediccionProm implements OnInit {
  hasData = false;
    barChartOptions: ChartOptions = {
      responsive: true,
    };
    barChartLabels: string[] = [];
    barChartType: ChartType = 'pie'; 
    barChartLegend = true;
    barChartData: ChartDataset[] = [];
  
    constructor(private pS: Predictionservice) {}
  
    ngOnInit(): void {
      this.pS.getRep3().subscribe((data) => {
        if (data.length > 0) {
          this.hasData = true;
          this.barChartLabels = data.map((item) => item.mes);
          this.barChartData=[
            {
               data:data.map(item=>item.scorePromedioMensual),
               label:'Promedio de Predicciones',
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
