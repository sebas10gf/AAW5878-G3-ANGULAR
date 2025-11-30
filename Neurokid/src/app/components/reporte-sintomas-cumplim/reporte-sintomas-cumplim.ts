import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { Symptomslogservice } from '../../services/symptomslogservice';

@Component({
  selector: 'app-reporte-sintomas-cumplim',
  imports: [ MatIconModule, BaseChartDirective ],
  templateUrl: './reporte-sintomas-cumplim.html',
  styleUrl: './reporte-sintomas-cumplim.css',
  providers: [provideCharts(withDefaultRegisterables())],
})
export class ReporteSintomasCumplim implements OnInit {
  hasData = false;
      barChartOptions: ChartOptions = {
        responsive: true,
      };
      barChartLabels: string[] = [];
      barChartType: ChartType = 'pie'; 
      barChartLegend = true;
      barChartData: ChartDataset[] = [];
    
      constructor(private sS: Symptomslogservice) {}
    
      ngOnInit(): void {
        this.sS.getRep4().subscribe((data) => {
          if (data.length > 0) {
            this.hasData = true;
            this.barChartLabels = data.map((item) => item.mood_entry);
            this.barChartData=[
              {
                 data:data.map(item=>item.porcentaje),
                 label:'Cumplimiento de Síntomas',
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
