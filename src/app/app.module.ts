import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MainDashComponent } from './main-dash/main-dash.component';
import { OverallStatsComponent } from './main-dash/overall-stats/overall-stats.component';
import { StatisticComponent } from './main-dash/overall-stats/statistic/statistic.component';
import { DataPickerComponent } from './main-dash/data-picker/data-picker.component';
import { BarChartComponent } from './main-dash/bar-chart/bar-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    MainDashComponent,
    OverallStatsComponent,
    StatisticComponent,
    DataPickerComponent,
    BarChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
