import { Injectable } from '@angular/core';
import { Observable, Subject, map } from 'rxjs';
import { HttpClient } from '@angular/common/http'
import { OverallStatistics } from '../models/overall-statistics.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  private readonly _baseUrl = 'https://premium-autohaz.carsup.at/_stat_reload/elso.php'; 
  toggledItem = new Subject();
  wageProfit = new Subject();
  partProfit = new Subject();
  partPrice = new Subject();
  constructor(
    private readonly http: HttpClient
  ) { }

  public getData() {
    return this.http.get<any>(this._baseUrl);
  }

  public getServicedCars(): Observable<OverallStatistics> {
    return this.http.get<any>(this._baseUrl).pipe(
      map((data: any) => data.jarmu_db)
    );
  }
 
  public getBilledTime(): Observable<OverallStatistics> {
    return this.http.get<any>(this._baseUrl).pipe(
      map((data: any) => data.szamlazott_ido)
    );
  }

  public getBlockedTime(): Observable<OverallStatistics> {
    return this.http.get<any>(this._baseUrl).pipe(
      map((data: any) => data.blokkolt_ido)
    );
  }

  public getPartProfit(): Observable<OverallStatistics> {
    return this.http.get<any>(this._baseUrl).pipe(
      map((data: any) => data.alkatresz_adatok)
    );
  }

  public getEmployers(): Observable<OverallStatistics> {
    return this.http.get<any>(this._baseUrl).pipe(
      map((data: any) => data.aktiv_munkafelvevok)
    );
  }

  public getMechanics(): Observable<OverallStatistics> {
    return this.http.get<any>(this._baseUrl).pipe(
      map((data: any) => data.aktiv_szerelok)
    );
  }
}
