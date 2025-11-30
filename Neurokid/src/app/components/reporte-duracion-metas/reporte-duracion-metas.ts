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
      plugins: {
        legend: {
          display: true,
        },
        tooltip: {
          callbacks: {
            label: (context) => {
              const label = context.dataset.label || '';
              if(context.parsed.y !== null) {
                return `${label}: ${context.parsed.y} días`;
              }
              return label;
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Promedio de Duración (días)'
          }
        }
      }
    };
    barChartLabels: string[] = [];
    barChartType: ChartType = 'line'; 
    barChartLegend = true;
    barChartData: ChartDataset[] = [];
  
    constructor(private uS: Userservice) {}

    private extractDays(durationStr: string): number {
      if(!durationStr || durationStr.trim() === '') {
        return 0;
      }

      const match = durationStr.match(/(\d+)\s+days/);

      if(match && match[1]) {
        return parseFloat(match[1]);
      } else if (durationStr.includes(':')) {
        return 0;
      }

      return parseFloat(durationStr.split(' ')[0] || '0');
    }
  
    ngOnInit(): void {
      this.uS.getRep2().subscribe((data) => {
        if (data.length > 0) {
          this.hasData = true;
          this.barChartLabels = data.map((item) => item.username);
          
          const durationData = data.map((item) => {
            return this.extractDays(item.promedio_duracion_dias);
          })

          this.barChartData=[
            {
               data: durationData,
               label: 'Promedio de Duración de Metas Activas (días)',
               borderColor: 'rgb(75, 192, 192)',
               backgroundColor: 'rgba(75, 192, 192, 0.2)',
               pointBackgroundColor: '#2f7912',
               pointBorderColor: '#fff',
               pointHoverBackgroundColor: '#fff',
               pointHoverBorderColor: '#2f7912',
               fill: 'origin', // Rellenar el área bajo la línea
            }
          ];
        } else {
          this.hasData=false
        }
      });
    }
}
