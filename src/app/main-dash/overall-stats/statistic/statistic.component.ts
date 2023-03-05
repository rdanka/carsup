import { Component, Input } from '@angular/core';

@Component({
  selector: 'statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.scss']
})
export class StatisticComponent {
  @Input() title: string = '';
  @Input() value: number = 0;
  @Input() color: string = '';
  @Input() icon: string = '';
}
