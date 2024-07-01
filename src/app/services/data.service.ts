import { Injectable } from '@angular/core';
import { Observable, Subject, map } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { BackendData, OverallStatistics } from '../models/overall-statistics.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  private readonly _baseUrl = 'https://premium-autohaz.carsup.at/_stat_reload/elso.php'; 
  storedData = new Observable<BackendData>();
  toggledItem = new Subject<OverallStatistics>();
  wageProfit = new Subject<OverallStatistics>();
  partData = new Subject<OverallStatistics>();
  partPrice = new Subject<OverallStatistics>();
  headers = new HttpHeaders({
    'Content-Type': 'multipart/form-data'
  });

  constructor(
    private readonly http: HttpClient
  ) { 
    this.getData({"kezdo_datum": "2024-07-01", "zaro_datum": "2024-07-01"});
  }
  

  public getData(postBody?: any): void {
    const formData = new FormData();
    if (postBody) {
      for (const key in postBody) {
        if (postBody.hasOwnProperty(key)) {
          formData.append(key, postBody[key]);
        }
      }
    }
    this.storedData = this.http.post<BackendData>(this._baseUrl, formData);
  }

  public getStoredData() {
    return this.storedData;
  }

  public getServicedCars(): Observable<OverallStatistics> {
    return this.storedData.pipe(
      map((data: any) => data.jarmu_db)
    );
  }
 
  public getBilledTime(): Observable<OverallStatistics> {
    return this.storedData.pipe(
      map((data: any) => data.szamlazott_ido)
    );
  }

  public getBlockedTime(): Observable<OverallStatistics> {
    return this.storedData.pipe(
      map((data: any) => data.blokkolt_ido)
    );
  }

  public getPartData(): Observable<OverallStatistics> {
    return this.storedData.pipe(
      map((data: any) => data.alkatresz_adatok)
    );
  }

  public getEmployers(): Observable<OverallStatistics> {
    return this.storedData.pipe(
      map((data: any) => data.aktiv_munkafelvevok)
    );
  }

  public getMechanics(): Observable<OverallStatistics> {
    return this.storedData.pipe(
      map((data: any) => data.aktiv_szerelok)
    );
  }
  
  public getLabourFee(): Observable<OverallStatistics> {
    return this.storedData.pipe(
      map((data: any) => data.munkadij_adatok)
    );
  }

}
