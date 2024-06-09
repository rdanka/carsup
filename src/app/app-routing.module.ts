import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainDashComponent } from './main-dash/main-dash.component';
import { MechanicsDashboardComponent } from './mechanics-dashboard/mechanics-dashboard.component';

const routes: Routes = [
  { path: 'dashboard', component: MainDashComponent },
  { path: 'mechanics', component: MechanicsDashboardComponent },
  { path: '', redirectTo:'/dashboard', pathMatch: 'full' },
  { path: '**', component: MainDashComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
