import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GlobalAnalyticsComponent } from './global-analytics/global-analytics.component';
import { PlayerAnalyticsComponent } from './player-analytics/player-analytics.component'

const routes: Routes = [
  {path: 'global', component: GlobalAnalyticsComponent},
  {path: 'players', component: PlayerAnalyticsComponent},
  {path: '**', component: GlobalAnalyticsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
