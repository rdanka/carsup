import { Component, Input, OnInit} from '@angular/core';
import Chart from 'chart.js/auto';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {
  @Input() labels: string[] = [];
  @Input() wageProfit: number[] = [];
  @Input() partProfit: number[] = [];
  @Input() partPrice: number[] = [];
  chart: any;

  constructor(private readonly dataService: DataService) { }

  ngOnInit(): void {
    this.createChart();
    this.dataService.toggledItem.subscribe((data: any) => {
      console.log(data);
      /* this.labels.splice(0,this.labels.length);
      this.labels.push(...data);  */
      this.chart.update();
    })
  }



  createChart() {
    this.chart = new Chart("MyChart", {
      type: 'bar',
      data: {
        labels: this.labels, 
         datasets: [
          {
            label: "Munkadíj nyereség",
            data: ['542', '542', '536', '327', '17',
            '0.00', '538', '541'],
            backgroundColor: '#FF6384'
          },
          {
            label: "Alkatrész beszerzési ár",
            data: ['542', '542', '536', '327', '17',
                   '0.00', '538', '541'],
            backgroundColor: '#36A2EB'
          },
          {
            label: "Alkatrész nyereség",
            data: ['542', '542', '536', '327', '17',
                   '0.00', '538', '541'],
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
          },
          y: {
            stacked: true
          }
        }
      }
    });
    
  }

  doStuff() {
    this.chart.update();
    this.chart.render();
  }

}


