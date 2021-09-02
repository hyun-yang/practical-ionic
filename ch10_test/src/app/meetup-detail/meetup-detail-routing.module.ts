import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MeetupDetailPage } from './meetup-detail.page';

const routes: Routes = [
  {
    path: '',
    component: MeetupDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MeetupDetailPageRoutingModule {}
