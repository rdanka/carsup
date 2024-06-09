import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-mechanics-dashboard',
  templateUrl: './mechanics-dashboard.component.html',
  styleUrls: ['./mechanics-dashboard.component.scss']
})
export class MechanicsDashboardComponent implements OnInit {
  
  barChart: any;
  pieChart: any;
  lineChart: any;

  ngOnInit() {
    this.createBarChart();
    this.createLineChart();
    this.createPieChart();
  }


  createBarChart() {
    this.barChart = new Chart("barchart", {
      type: 'bar',
      data: {
        labels: ['Bányai Edvin', 'Murányi Róbert', 'Marsalkó Kristóf'], 
         datasets: [
          {
            label: "Munkadíj nyereség",
            data: [1139732, 879216, 971456],
            backgroundColor: '#FF6384'
          },
          {
            label: "Alkatrész beszerzési ár",
            data: [989994, 27217, 345221],
            backgroundColor: '#36A2EB'
          },
          {
            label: "Alkatrész nyereség",
            data: [836578, 36345, 33400],
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
            stacked: true,
          }
        }
      }
    });
    
  }

  createLineChart() {
    this.lineChart = new Chart("linechart", {
      type: 'line',
      data: {
        labels: ['Január', 'Február', 'Március', 'Április', 'Május'], 
         datasets: [
          {
            label: "Bányai Edvin",
            data: [1139732, 879216, 971456, 1234986, 879234],
            borderColor: '#FF6384',
            backgroundColor: '#FF6384'
          },
          {
            label: "Murányi Róbert",
            data: [989994, 27217, 345221, 234567, 345678],
            borderColor: '#36A2EB',
            backgroundColor: '#36A2EB'
          },
          {
            label: "Marsalkó Kristóf",
            data: [836578, 36345, 33400, 345678, 456789],
            borderColor: '#4BC0C0',
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
            stacked: true,
          }
        }
      }
    });
    
  }

  createPieChart() {
    this.lineChart = new Chart("piechart", {
      type: 'pie',
      data: {
        labels: ['Bányai Edvin', 'Murányi Róbert', 'Marsalkó Kristóf'], 
         datasets: [
          {
            label: "Netto nyereség",
            data: [1139732, 879216, 971456],
            
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
            stacked: true,
          }
        }
      }
    });
    
  }

}
