import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'time-selector',
  templateUrl: './time-selector.component.html',
  styleUrl: './time-selector.component.scss'
})
export class TimeSelectorComponent {
  
  form: FormGroup = new FormGroup({
    timeFrame: new FormControl("Napi", [Validators.required]),
  });

  constructor(
    private readonly _dataService: DataService
  ) {
    this._dataService.getServicedCars().subscribe(console.log)
  }

}
