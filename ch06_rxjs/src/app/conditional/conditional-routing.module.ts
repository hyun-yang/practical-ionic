import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConditionalPage } from './conditional.page';

const routes: Routes = [
  {
    path: '',
    component: ConditionalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConditionalPageRoutingModule {}
