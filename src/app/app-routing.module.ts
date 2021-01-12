import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlayerAnalyticsComponent } from './player-analytics/player-analytics.component'

const routes: Routes = [
  {path: 'player-civs', component: PlayerAnalyticsComponent},
  {path: '**', component: PlayerAnalyticsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
