import { AfterViewInit, Component, Input, OnInit} from '@angular/core';
import Chart from 'chart.js/auto';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit, AfterViewInit {
  @Input() labels: string[] = [];
  chart: any;

  constructor(private readonly dataService: DataService) { }

  ngOnInit(): void {
    this.createChart();
    this.dataService.toggledItem.subscribe((data: any) => {
      const labels = data;
      this.chart.data.labels = labels.sort();
      this.chart.update(''); // none
    })

    this.dataService.wageProfit.subscribe((data: any) => {
      console.log(data)
      const wageProfit = data;
      this.chart.data.datasets[0].data = wageProfit;
      this.chart.update(''); // none
    })

    this.dataService.partProfit.subscribe((data: any) => {
      const partProfit = data;
      this.chart.data.datasets[2].data = partProfit;
      this.chart.update(''); // none
    })

    this.dataService.partPrice.subscribe((data: any) => {
      const partPrice = data;
      this.chart.data.datasets[1].data = partPrice;
      this.chart.update(''); // none
    })

    this.dataService.toggledItem.next(this.labels);
    this.dataService.wageProfit.next([1139732, 879216]);
    this.dataService.partProfit.next([989994, 27217]);
    this.dataService.partPrice.next([836578, 36345]);
    
  }

  ngAfterViewInit() {
    this.chart.update();
  }

  createChart() {
    this.chart = new Chart("MyChart", {
      type: 'bar',
      data: {
        labels: [], 
         datasets: [
          {
            label: "Munkadíj nyereség",
            data: [1139732, 879216],
            backgroundColor: '#FF6384'
          },
          {
            label: "Alkatrész beszerzési ár",
            data: [989994, 27217],
            backgroundColor: '#36A2EB'
          },
          {
            label: "Alkatrész nyereség",
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
        responsive: true,
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
                  return this.formatter.format(value as number);
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

}


