import { Component, Input } from '@angular/core';

@Component({
  selector: 'statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.scss']
})
export class StatisticComponent {
  @Input() title: string = '';
  @Input() value: number | null  = 0;
  @Input() color: string = '';
  @Input() icon: string = '';
  @Input() viewBox: string = '';
  @Input() suffix?: string = '';
}
