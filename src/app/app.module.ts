import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MainDashComponent } from './main-dash/main-dash.component';
import { OverallStatsComponent } from './main-dash/overall-stats/overall-stats.component';
import { StatisticComponent } from './main-dash/overall-stats/statistic/statistic.component';
import { DataPickerComponent } from './main-dash/data-picker/data-picker.component';
import { BarChartComponent } from './main-dash/bar-chart/bar-chart.component';
import { MechanicsDashboardComponent } from './mechanics-dashboard/mechanics-dashboard.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { TimeSelectorComponent } from './main-dash/time-selector/time-selector.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({ declarations: [
        AppComponent,
        SidebarComponent,
        MainDashComponent,
        OverallStatsComponent,
        StatisticComponent,
        DataPickerComponent,
        BarChartComponent,
        MechanicsDashboardComponent,
        TimeSelectorComponent
    ],
    bootstrap: [AppComponent], imports: [BrowserModule, BrowserAnimationsModule, AppRoutingModule, FormsModule, ReactiveFormsModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule {}
