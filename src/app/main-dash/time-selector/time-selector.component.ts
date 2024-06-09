import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'time-selector',
  templateUrl: './time-selector.component.html',
  styleUrl: './time-selector.component.scss'
})
export class TimeSelectorComponent {
  
  form: FormGroup = new FormGroup({
    timeFrame: new FormControl("Napi", [Validators.required]),
  });

  constructor() {}

}
