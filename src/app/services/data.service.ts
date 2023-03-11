import { Injectable } from '@angular/core';
import { test } from './test';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  public loadInitialData() {
    return of(test.mechanics);
  }
}
