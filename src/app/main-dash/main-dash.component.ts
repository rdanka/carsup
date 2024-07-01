import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { BehaviorSubject, Observable } from 'rxjs';
import _default from 'chart.js/dist/core/core.adapters';

@Component({
  selector: 'main-dash',
  templateUrl: './main-dash.component.html',
  styleUrls: ['./main-dash.component.scss'],
})
export class MainDashComponent implements OnInit {
  employers$: Observable<any>;
  mechanics$: Observable<any>;
  toggledMechanics$: BehaviorSubject<string[]> = new BehaviorSubject([] as string[]);
  toggledEmployers: string[] = [];
  wageProfit: number[] = [];

  constructor(private readonly _dataService: DataService) {}

  ngOnInit() {
    this.employers$ = this._dataService.getEmployers()

    this.mechanics$ = this._dataService.getMechanics()
    this._dataService.getMechanics().subscribe(console.log);
  }

  onToggle(person: any, type: string) {
    
    switch (type) {
      case 'mechanic':
        if (person.isToggled) {
          console.log('person')
          this.toggledMechanics$.next([...this.toggledMechanics$.getValue(), person.nev]);
        } else {
          this.toggledMechanics$.next(this.toggledMechanics$.getValue().splice(this.toggledMechanics$.getValue().indexOf(person.name), 1));
        }
        break;
      case 'employer':
        if (person.isToggled) {
          this.toggledEmployers = [...this.toggledEmployers, person.nev];
        } else {
          this.toggledEmployers.splice(this.toggledEmployers.indexOf(person.name), 1);
        }
        break;
    
      default:
        break;
    }
    console.log(this.toggledMechanics$.getValue())

  }

  onToggleAll(checked: boolean, type: string) {
    /* // do this with subject
     if (type === 'mechanic') {
      if (checked) {
        this.mechanics$.pipe(
          map((mechanic: any) => mechanic.name),
          tap((mechanic: any) => console.log(mechanic)),
          tap((mechanic: any) => this.toggledMechanics$.push(mechanic))
        );
        console.log(this.toggledMechanics$);
      } else {
        this.toggledMechanics$ = [];
      }
    } else {
      /*  if (person.isToggled) {
        this.toggledEmployers = [...this.toggledEmployers, person.name];
      } else {
        this.toggledEmployers.splice(this.toggledEmployers.indexOf(person.name), 1)
      }   
    }  */
  }


}
