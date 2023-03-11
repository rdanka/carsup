import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'data-picker',
  templateUrl: './data-picker.component.html',
  styleUrls: ['./data-picker.component.scss']
})
export class DataPickerComponent {
  @Input() title!: string;
  @Input() options!: any[];
  @Output() onToggleEmitter = new EventEmitter<string>();
  
  constructor() { }

  onToggle(option: any) {
    option.isToggled = !option.isToggled;
    this.onToggleEmitter.emit(option);
  }

  onToggleAll(checked: MouseEvent) {
    this.options.forEach(element => {
      element.isToggled = (checked.target as HTMLInputElement).checked;
    });
  }
}