import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewMeetUpPage } from './new-meet-up.page';

const routes: Routes = [
  {
    path: '',
    component: NewMeetUpPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewMeetUpPageRoutingModule {}
