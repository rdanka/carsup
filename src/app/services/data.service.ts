import { Injectable } from '@angular/core';
import { test } from './test';
import { of, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class DataService {

  toggledItem = new Subject();
  wageProfit = new Subject();
  partProfit = new Subject();
  partPrice = new Subject();

  constructor(
    private readonly http: HttpClient
  ) { }

  public loadInitialData() {
    return of(test.mechanics);
  }

  public getData() {
    return this.http.get<any>('https://premium-autohaz.carsup.at/_stat_reload/elso.php');
  }
}
