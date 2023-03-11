import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { switchMap, map, tap, mapTo } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'main-dash',
  templateUrl: './main-dash.component.html',
  styleUrls: ['./main-dash.component.scss']
})
export class MainDashComponent implements OnInit {

  mechanics$!: Observable<any>;
  employers$!: Observable<any>;
  totalCars$: Observable<number>;
  totalHours$: Observable<any>;
  lostTime$: Observable<any>;
  customers$: Observable<any>;
  totalIncome$: Observable<any>;

  constructor(private readonly dataService: DataService) { }

  ngOnInit() {
    this.mechanics$ = this.dataService.loadInitialData().pipe(
      map(mechanics => mechanics.map((mechanic:any) => { return {name: mechanic.name, isToggled: true}})),
    );
    this.employers$ = this.dataService.loadInitialData().pipe(
      map(mechanics => mechanics.map((mechanic:any) => mechanic.employers.map((employer:any) =>  { return {name: employer.name, isToggled: true}}))),
      map((employers:any) => employers.flat()),
      map((employers: any[]) => employers.filter((employer, index) => employers.findIndex(e => e.name === employer.name && e.isToggled === employer.isToggled) === index)),
      tap((employers:any) => console.log(employers)),
    );

    this.totalCars$ = this.dataService.loadInitialData().pipe(
      map(mechanics => mechanics.reduce((sum:number,mechanic:any) => mechanic.totalCars + sum, 0))
    );

    this.totalHours$ = this.dataService.loadInitialData().pipe(
      map(mechanics => mechanics.reduce((sum:number,mechanic:any) => mechanic.totalHours + sum, 0))
    );

    this.lostTime$ = this.dataService.loadInitialData().pipe(
      map(mechanics => mechanics.reduce((sum:number,mechanic:any) => mechanic.lostTime + sum, 0))
    );

    /* this.totalIncome$ = this.dataService.loadInitialData().pipe(
      map(mechanics => mechanics.reduce((sum:number,mechanic:any) => mechanic.totalIncome + sum, 0))
    ); */


  }

  onToggle(text: string) {
    console.log(text);
    
  }

}
