import { Injectable } from '@angular/core';
import { test } from './test';
import { of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  toggledItem = new Subject();
  wageProfit = new Subject();
  partProfit = new Subject();
  partPrice = new Subject();

  constructor() { }

  public loadInitialData() {
    return of(test.mechanics);
  }
}
