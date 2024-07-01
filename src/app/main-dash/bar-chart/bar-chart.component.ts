import { AfterViewInit, Component, Input, OnInit} from '@angular/core';
import Chart from 'chart.js/auto';
import { Observable, of, tap } from 'rxjs';
import { GrossNetPrice, OverallStatistics } from 'src/app/models/overall-statistics.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit, AfterViewInit {
  @Input() labels: Observable<string[]> = of([]);
  chart: any;
  private _labels: string[] = [];
  private _partProfit: number[] = [];
  private _partPrice: number[] = [];
  private _labourFeeProfit: number[] = [];

  constructor(private readonly dataService: DataService) { }

  ngOnInit(): void {
    this.createChart();
    this.labels.subscribe((labels => {
      this._labels = labels;
      //this.chart.data.labels = this._labels;
      this.dataService.getStoredData().subscribe((data) => {
        const munkadij_nyereseg = (data.munkadij_adatok.ertek as GrossNetPrice).netto_ertek - (data.munkadij_adatok.ertek as GrossNetPrice).bekerar;
        const alkatresz_arres = (data.alkatresz_adatok.ertek as GrossNetPrice).netto_ertek -  (data.alkatresz_adatok.ertek as GrossNetPrice).bekerar;
        this.chart.data.datasets[0].data = [munkadij_nyereseg];
        this.chart.data.datasets[1].data = [(data.munkadij_adatok.ertek as GrossNetPrice).bekerar];
        this.chart.data.datasets[2].data = [alkatresz_arres];
      })
      this.chart.update();
    }));
   
  }

  ngAfterViewInit() {
    this.chart.update();
  }

  createChart() {
    this.chart = new Chart("MyChart", {
      type: 'bar',
      data: {
        labels: ["Összesített"], 
         datasets: [
          {
            label: "Munkadíj nyereség",
            data: [],
            backgroundColor: '#FF6384'
          },
          {
            label: "Alkatrész beszerzési ár",
            data: [],
            backgroundColor: '#36A2EB'
          },
          {
            label: "Alkatrész árrés",
            data: [],
            backgroundColor: '#4BC0C0'
          }  
        ]
      },
      options: {
        plugins: {
          title: {
            display: false,
          },
        },
        scales: {
          x: {
            stacked: true,
            title: {
              display: true,
              text: 'Szerelő'
            }
          },
          y: {
            stacked: true,
            ticks: {
              callback: (value, index, values) => {
                return this.customFormatter(value as number);
              }
            }
          }
        }
      }
    });
    
  }

  formatter = new Intl.NumberFormat('hu-HU', {
    style: 'currency',
    currency: 'HUF',
    minimumFractionDigits: 0, 
    maximumFractionDigits: 0, 
  });

  customFormatter = (value: number) => {
    if (window.innerWidth <= 768) { 
      if (value >= 1000000) {
        return `${(value / 1000000).toFixed(1)}M`; 
      }
      if (value >= 1000) {
        return `${(value / 1000).toFixed(0)}K`; 
      }
      return `${value} Ft`;
    } else {
      return new Intl.NumberFormat('hu-HU', {
        style: 'currency',
        currency: 'HUF',
        minimumFractionDigits: 0, 
        maximumFractionDigits: 0, 
      }).format(value);
    }
  };

}


