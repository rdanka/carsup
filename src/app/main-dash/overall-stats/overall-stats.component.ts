import { Component } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { OverallStatistics } from 'src/app/models/overall-statistics.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'overall-stats',
  templateUrl: './overall-stats.component.html',
  styleUrls: ['./overall-stats.component.scss']
})
export class OverallStatsComponent {
  
  totalCars$: Observable<any>;
  totalHours$: Observable<any>;
  lostTime$: Observable<any>;
  totalIncome$: Observable<any>;
  formatter = new Intl.NumberFormat('hu-HU', {
    style: 'currency',
    currency: 'HUF',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  
  constructor(
    private readonly _dataService: DataService
  ) {
    this.totalCars$ = this._dataService.getServicedCars().pipe(
      map((data: OverallStatistics) => data.ertek)
    );
    this.totalHours$ = this._dataService.getBilledTime().pipe(
      map((data: OverallStatistics) => data.ertek)
    );
    this.lostTime$ = this._dataService.getBlockedTime().pipe(
      map((data: OverallStatistics) => data.ertek)
    );
    this.totalIncome$ = this._dataService.getPartProfit().pipe(
      map((data: OverallStatistics) => this.formatter.format(data.ertek.netto_ertek))
    );
  }

  
}
