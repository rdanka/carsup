import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { switchMap, map, tap, mapTo } from 'rxjs/operators';
import { combineLatest, Observable } from 'rxjs';

@Component({
  selector: 'main-dash',
  templateUrl: './main-dash.component.html',
  styleUrls: ['./main-dash.component.scss']
})
export class MainDashComponent implements OnInit {

  mechanics$!: Observable<any>;
  employers$!: Observable<any>;
  totalCars$: Observable<number>;
  totalHours$: Observable<number>;
  lostTime$: Observable<number>;
  totalIncome$: Observable<any>;

  toggledMechanics: string[] = [];
  toggledEmployers: string[] = [];
  wageProfit: number[] = [];

  constructor(private readonly dataService: DataService) { }

  ngOnInit() {
    this.mechanics$ = this.dataService.loadInitialData().pipe(
      map(mechanics => mechanics.map((mechanic:any) => { return {name: mechanic.name, isToggled: true}})),
      tap((mechanics:any) => mechanics.forEach((mechanic:any) => this.toggledMechanics.push(mechanic.name)))
    );
    this.employers$ = this.dataService.loadInitialData().pipe(
      map(mechanics => mechanics.map((mechanic:any) => mechanic.employers.map((employer:any) =>  { return { name: employer.name, isToggled: true }}))),
      map((employers:any) => employers.flat()),
      map((employers: any[]) => employers.filter((employer, index) => employers.findIndex(e => e.name === employer.name && e.isToggled === employer.isToggled) === index)),
      tap((employers: any[]) => employers.sort((a, b) => a.name.localeCompare(b.name))),
      tap((employers:any) => employers.forEach((employer:any) => this.toggledEmployers.push(employer.name))),
    );

    this.totalCars$ = this.dataService.loadInitialData().pipe(
      map(mechanics => mechanics.reduce((sum:number,mechanic:any) => mechanic.totalCars + sum, 0))
    );

    this.totalHours$ = this.dataService.loadInitialData().pipe(
      map(mechanics => mechanics.reduce((sum:number,mechanic:any) => mechanic.totalHours + sum, 0)),
    );

    this.lostTime$ = this.dataService.loadInitialData().pipe(
      map(mechanics => mechanics.reduce((sum:number,mechanic:any) => mechanic.lostTime + sum, 0))
    );

    this.totalIncome$ = this.dataService.loadInitialData().pipe(
      map(mechanics => mechanics.map((mechanic:any) => mechanic.employers.map((employer:any) => employer.totalIncome))),
      map((totalIncomes:number[]) => totalIncomes.flat()),
      map(totalIncomes => totalIncomes.reduce((sum:number,totalIncome:number) => totalIncome + sum, 0)),
      map((totalHours:number) => this.formatter.format(totalHours))
    );
  }

  onToggle(person: any, type: string) {
    if (type === 'mechanic') {
      if (person.isToggled) {
        this.toggledMechanics = [...this.toggledMechanics, person.name];
      } else {
        this.toggledMechanics.splice(this.toggledMechanics.indexOf(person.name), 1)
      }
    } else {
      if (person.isToggled) {
        this.toggledEmployers = [...this.toggledEmployers, person.name];
      } else {
        this.toggledEmployers.splice(this.toggledEmployers.indexOf(person.name), 1)
      }
    }

    this.dataService.loadInitialData().pipe(
      map(mechanics => mechanics.filter((mechanic:any) => this.toggledMechanics.includes(mechanic.name))),
      map(mechanics => mechanics.map((mechanic:any) => mechanic.employers.filter((employer:any) => this.toggledEmployers.includes(employer.name)))),
      map(mechanics => mechanics.map((employers:any) => employers.reduce((sum:number, employer:any) => employer.wageProfit + sum, 0))),
      tap((wageProfits:number[]) => this.wageProfit = wageProfits),
      tap((wageProfits:number[]) => console.log(wageProfits)),
    ).subscribe(data => this.dataService.wageProfit.next(data)); 

    this.dataService.loadInitialData().pipe(
      map(mechanics => mechanics.filter((mechanic:any) => this.toggledMechanics.includes(mechanic.name))),
      map(mechanics => mechanics.map((mechanic:any) => mechanic.employers.filter((employer:any) => this.toggledEmployers.includes(employer.name)))),
      map(mechanics => mechanics.map((employers:any) => employers.reduce((sum:number, employer:any) => employer.partsProfit + sum, 0))),
      tap((partsProfits:number[]) => console.log(partsProfits)),
    ).subscribe(data => this.dataService.partProfit.next(data));

    this.dataService.loadInitialData().pipe(
      map(mechanics => mechanics.filter((mechanic:any) => this.toggledMechanics.includes(mechanic.name))),
      map(mechanics => mechanics.map((mechanic:any) => mechanic.employers.filter((employer:any) => this.toggledEmployers.includes(employer.name)))),
      map(mechanics => mechanics.map((employers:any) => employers.reduce((sum:number, employer:any) => employer.partsPurchasePrice + sum, 0))),
      tap((partPrices:number[]) => console.log(partPrices)),
    ).subscribe(data => this.dataService.partPrice.next(data));
    

    this.dataService.toggledItem.next(this.toggledMechanics);
    

    this.totalCars$ = this.dataService.loadInitialData().pipe(
      map(mechanics => mechanics.filter((mechanic:any) => this.toggledMechanics.includes(mechanic.name))),
      map(mechanics => mechanics.reduce((sum:number,mechanic:any) => mechanic.totalCars + sum, 0))
    );

    this.totalHours$ = this.dataService.loadInitialData().pipe(
      map(mechanics => mechanics.filter((mechanic:any) => this.toggledMechanics.includes(mechanic.name))),
      map(mechanics => mechanics.reduce((sum:number,mechanic:any) => mechanic.totalHours + sum, 0)),
    );

    this.lostTime$ = this.dataService.loadInitialData().pipe(
      map(mechanics => mechanics.filter((mechanic:any) => this.toggledMechanics.includes(mechanic.name))),
      map(mechanics => mechanics.reduce((sum:number,mechanic:any) => mechanic.lostTime + sum, 0))
    );

    this.totalIncome$ = this.dataService.loadInitialData().pipe(
      map(mechanics => mechanics.filter((mechanic:any) => this.toggledMechanics.includes(mechanic.name))),
      map(mechanics => mechanics.map((mechanic:any) => mechanic.employers.filter((employer:any) => this.toggledEmployers.includes(employer.name)))),
      map((mechanics) => mechanics.flat()),
      map(employers => employers.map((employer:any) => employer.totalIncome)),
      map(totalIncomes => totalIncomes.reduce((sum:number,totalIncome:number) => totalIncome + sum, 0)),
      map((totalIncomes:number) => this.formatter.format(totalIncomes))
    );
    
  }

  onToggleAll(checked:  boolean, type: string) { // do this with subject
    if (type === 'mechanic') {
      if (checked) {
        this.mechanics$.pipe(
          map((mechanic:any) => mechanic.name),
          tap((mechanic:any) => console.log(mechanic)),
          tap((mechanic:any) => this.toggledMechanics.push(mechanic))
        );
        console.log(this.toggledMechanics)
      } else {
        this.toggledMechanics = [];
      }
    } else {
      /* if (person.isToggled) {
        this.toggledEmployers = [...this.toggledEmployers, person.name];
      } else {
        this.toggledEmployers.splice(this.toggledEmployers.indexOf(person.name), 1)
      }  */
    }
  }

  formatter = new Intl.NumberFormat('hu-HU', {
    style: 'currency',
    currency: 'HUF',
    minimumFractionDigits: 0, 
    maximumFractionDigits: 0, 
  });

}
