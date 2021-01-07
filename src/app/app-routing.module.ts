import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RankedRecordComponent } from './ranked-record/ranked-record.component'

const routes: Routes = [
  {path: 'ranked-record', component: RankedRecordComponent},
  {path: '**', component: RankedRecordComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
