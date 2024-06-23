import { AfterViewInit, Component, Input, OnInit} from '@angular/core';
import Chart from 'chart.js/auto';
import { Observable, of } from 'rxjs';
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

  constructor(private readonly dataService: DataService) { }

  ngOnInit(): void {
    this.createChart();
    this.labels.subscribe((labels => this._labels = labels));
  }

  ngAfterViewInit() {
    this.chart.update();
  }

  createChart() {
    this.chart = new Chart("MyChart", {
      type: 'bar',
      data: {
        labels: ['asd','asd'], 
         datasets: [
          {
            label: "Munkadíj nyereség",
            data: [1139732, 879216, 88888],
            backgroundColor: '#FF6384'
          },
          {
            label: "Alkatrész beszerzési ár",
            data: [989994, 27217],
            backgroundColor: '#36A2EB'
          },
          {
            label: "Alkatrész árrés",
            data: [836578, 36345],
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


